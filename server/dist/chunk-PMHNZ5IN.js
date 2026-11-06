import {
	external_exports
} from "./chunk-CZ2J6RDZ.js";

// server/src/catalog.ts
import { createHash } from "node:crypto";

// server/src/schemas.ts
var id = external_exports.string().trim().min(1), language = id.regex(/^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/), provisionRef = external_exports.strictObject({
	source_id: id,
	language,
	provision_type: external_exports.enum(["article", "recital", "annex"]),
	provision_id: id
}), searchInput = external_exports.strictObject({
	terms: external_exports.array(id).min(1),
	preferred_language: language,
	source_id: id.optional(),
	cursor: id.optional()
}), sourceVersion = external_exports.strictObject({ identifier: id, date: external_exports.iso.date(), url: external_exports.url() }), curatedEntry = external_exports.strictObject({
	entry_id: id,
	language,
	provision_refs: external_exports.array(provisionRef).min(1),
	source_version: sourceVersion,
	text: external_exports.string()
}), errorData = external_exports.strictObject({ error: external_exports.strictObject({
	code: external_exports.enum([
		"INVALID_ARGUMENT",
		"SOURCE_NOT_INCLUDED",
		"LANGUAGE_NOT_AVAILABLE",
		"PROVISION_NOT_FOUND",
		"INVALID_CURSOR",
		"SOURCE_ACCESS_ERROR",
		"SOURCE_METADATA_ERROR"
	]),
	message: id
}) }), hitBase = {
	hit_id: id,
	source_id: id,
	language,
	citation: id,
	source_version: sourceVersion,
	matched_terms: external_exports.array(id).min(1),
	excerpts: external_exports.array(external_exports.strictObject({ text: external_exports.string(), omitted_before: external_exports.boolean(), omitted_after: external_exports.boolean() })).min(1)
}, hit = external_exports.discriminatedUnion("hit_type", [
	external_exports.strictObject({ ...hitBase, hit_type: external_exports.literal("provision"), provision_ref: provisionRef }),
	external_exports.strictObject({ ...hitBase, hit_type: external_exports.literal("curated_entry"), entry_id: id, provision_refs: external_exports.array(provisionRef) })
]), searchSuccess = external_exports.strictObject({
	source_commit: external_exports.string().regex(/^[a-f0-9]{40}$/),
	query: searchInput.omit({ cursor: !0 }),
	searched_scope: external_exports.array(external_exports.strictObject({
		source_id: id,
		language,
		source_version: sourceVersion,
		provision_refs: external_exports.array(provisionRef.pick({ provision_type: !0, provision_id: !0 })),
		entry_ids: external_exports.array(id)
	})),
	hits: external_exports.array(hit),
	next_cursor: id.nullable()
}), provisionSuccess = provisionRef.extend({
	source_commit: external_exports.string().regex(/^[a-f0-9]{40}$/),
	citation: id,
	source_version: sourceVersion,
	source_notes: external_exports.string(),
	text: external_exports.string(),
	curated_entries: external_exports.array(curatedEntry),
	curation_status: external_exports.enum(["available", "not_available"])
}), searchOutput = external_exports.union([searchSuccess, errorData]), provisionOutput = external_exports.union([provisionSuccess, errorData]), SourceError = class extends Error {
	constructor(code, message) {
		super(message);
		this.code = code;
	}
	code;
};

// server/src/catalog.ts
var sourcePath = external_exports.string().regex(/^skills\/finding-obligations\/(references|assets)\/[A-Za-z0-9_-][A-Za-z0-9._/-]*\.md$/).refine((path) => path.split("/").every((part) => part !== "." && part !== ".." && part !== "")), fileSchema = external_exports.strictObject({ path: sourcePath, sha256: external_exports.string().regex(/^[a-f0-9]{64}$/), source_version: sourceVersion, source_notes: external_exports.string() }), catalogSchema = external_exports.array(external_exports.strictObject({
	source_id: id,
	language,
	source_version: sourceVersion,
	files: external_exports.array(fileSchema).min(1),
	layer: fileSchema.nullable()
})).min(1), digest = (text) => createHash("sha256").update(text).digest("hex"), key = (r) => `${r.source_id}/${r.language}/${r.provision_type}/${r.provision_id}`;
function loadText(texts, file) {
	let text = texts.get(file.path)?.replace(/\r\n/g, `
`);
	if (text === void 0) throw new SourceError("SOURCE_ACCESS_ERROR", "A required source file cannot be read.");
	if (digest(text) !== file.sha256) throw new SourceError("SOURCE_METADATA_ERROR", "Source content does not match its metadata.");
	return text;
}
function parseProvisions(text, source_id, lang, version, source_notes) {
	let pattern = /^### (Article|Artikel|Recital|Erwägungsgrund|ANNEX|ANHANG) ([\dA-Za-z]+)(?::[^\n]*)?\n\n/gm, matches = [...text.matchAll(pattern)];
	return matches.map((m, i) => {
		let provision_type = {
			Article: "article",
			Artikel: "article",
			Recital: "recital",
			Erw\u00E4gungsgrund: "recital",
			ANNEX: "annex",
			ANHANG: "annex"
		}[m[1]], provision_id = m[2];
		return {
			source_id,
			language: lang,
			provision_type,
			provision_id,
			citation: `${source_id}, ${m[1]} ${provision_id}`,
			text: text.slice(m.index, matches[i + 1]?.index ?? text.length).trimEnd(),
			source_version: version,
			source_notes
		};
	});
}
function parseEntries(text, source) {
	return text.split(`
`).filter((line) => line.startsWith("| ") && !line.startsWith("| Obligation")).map((line) => {
		let cells = line.slice(1, -1).split("|").map((s) => s.trim());
		if (cells.length !== 5) throw new SourceError("SOURCE_METADATA_ERROR", "Invalid curated row.");
		let primary = /\b(Article|Annex)\s+([\dA-Za-z]+)/.exec(cells[2]);
		if (!primary) throw new SourceError("SOURCE_METADATA_ERROR", "Curated row has no provision reference.");
		let provision_refs = [primary, ...cells[4].matchAll(/(Article|Annex)\s+([\dA-Za-z]+):/g)].map((m) => ({
			source_id: source.source_id,
			language: source.language,
			provision_type: m[1] === "Article" ? "article" : "annex",
			provision_id: m[2]
		}));
		if (provision_refs.some((r) => !source.provisions.some((p) => key(p) === key(r))))
			throw new SourceError("SOURCE_METADATA_ERROR", "Curated row references a missing provision.");
		return {
			entry_id: `${source.source_id}/${source.language}/curated/${digest(line).slice(0, 24)}`,
			language: source.language,
			provision_refs,
			source_version: source.source_version,
			text: line
		};
	});
}
function parseMetadata(raw) {
	let metadata;
	try {
		metadata = catalogSchema.parse(JSON.parse(raw));
	} catch {
		throw new SourceError("SOURCE_METADATA_ERROR", "Source metadata is invalid.");
	}
	if (new Set(metadata.map((s) => `${s.source_id}/${s.language}`)).size !== metadata.length)
		throw new SourceError("SOURCE_METADATA_ERROR", "Duplicate source and language.");
	let files = metadata.flatMap((s) => [...s.files, ...s.layer ? [s.layer] : []]);
	if (new Set(files.map((f) => f.path)).size !== files.length)
		throw new SourceError("SOURCE_METADATA_ERROR", "Duplicate source file paths.");
	return metadata;
}
function loadCatalog(raw, texts, source_commit) {
	return { sources: parseMetadata(raw).map((item) => {
		let source = {
			source_id: item.source_id,
			language: item.language,
			source_version: item.source_version,
			provisions: [],
			entries: []
		};
		for (let file of item.files) {
			let units = parseProvisions(loadText(texts, file), item.source_id, item.language, file.source_version, file.source_notes);
			if (!units.length) throw new SourceError("SOURCE_METADATA_ERROR", "A source file contains no provision.");
			source.provisions.push(...units);
		}
		if (source.entries = item.layer ? parseEntries(loadText(texts, item.layer), source) : [], new Set(source.provisions.map(key)).size !== source.provisions.length || new Set(source.entries.map((e) => e.entry_id)).size !== source.entries.length)
			throw new SourceError("SOURCE_METADATA_ERROR", "Duplicate source identifiers.");
		return source;
	}), fingerprint: digest(JSON.stringify([source_commit, raw])), source_commit };
}

export {
	provisionRef,
	searchInput,
	searchOutput,
	provisionOutput,
	SourceError,
	digest,
	key,
	parseProvisions,
	parseMetadata,
	loadCatalog
};
