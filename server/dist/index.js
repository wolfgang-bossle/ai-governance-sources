import {
	serveStdio
} from "./chunk-4GIEVTJN.js";
import {
	Server
} from "./chunk-HFIRSANS.js";
import "./chunk-5BMIAFWP.js";
import {
	ProtocolError,
	ProtocolErrorCode
} from "./chunk-DXZU47XG.js";
import "./chunk-H7BS6QOO.js";
import "./chunk-WYXYRM26.js";
import "./chunk-VBCKWWY5.js";
import "./chunk-VADXITWQ.js";
import {
	loadRemoteCatalog
} from "./chunk-O4UYYSBN.js";
import {
	SourceError,
	digest,
	key,
	provisionOutput,
	provisionRef,
	searchInput,
	searchOutput
} from "./chunk-PMHNZ5IN.js";
import "./chunk-4GCRVLOZ.js";
import {
	external_exports
} from "./chunk-CZ2J6RDZ.js";
import "./chunk-ILAEVQ4R.js";
import "./chunk-KYS4QYPM.js";
import "./chunk-PMKFZG7C.js";
import "./chunk-SMHQI3TP.js";
import "./chunk-CYVO7TAD.js";
import "./chunk-7PWPJMHI.js";
import "./chunk-SUOJDBTC.js";
import "./chunk-NNCWGSDJ.js";
import "./chunk-Y5MNTA67.js";
import "./chunk-NCKYCQGW.js";
import "./chunk-BXYOQJJO.js";
import "./chunk-GMDU246W.js";
import "./chunk-XFHKWAYL.js";
import "./chunk-XGFNBJPD.js";
import "./chunk-WLJWSMPO.js";
import "./chunk-YPAIRU7A.js";
import "./chunk-D2OZMKV7.js";
import "./chunk-6HWHFBLW.js";
import "./chunk-B4GUC5EW.js";
import "./chunk-OZXHNIAX.js";
import "./chunk-5AKCN5NA.js";
import "./chunk-6GA5JZB3.js";
import "./chunk-76E5NUJG.js";
import "./chunk-66ETLZRN.js";
import "./chunk-ZVPJY6KO.js";
import "./chunk-7CKVIFTI.js";
import "./chunk-AQCNGR5T.js";
import "./chunk-UD33RM2U.js";
import "./chunk-YFBCKYG3.js";
import "./chunk-OPEW54HV.js";
import "./chunk-6XV43R3C.js";
import "./chunk-C23HTKB4.js";
import "./chunk-ZEPWG67X.js";
import "./chunk-5HBE6QWX.js";
import "./chunk-NOXOM5KX.js";
import "./chunk-65K6FDWT.js";
import "./chunk-TJGDU3RU.js";
import "./chunk-WURQXS57.js";
import "./chunk-VKPDTISH.js";
import "./chunk-I4YBMNNB.js";
import "./chunk-BV4E6OA4.js";
import "./chunk-F2HCXYXF.js";
import "./chunk-QF4A67KG.js";
import "./chunk-MYGQBUHT.js";
import "./chunk-OEOZYYHT.js";
import "./chunk-DXKNAE4D.js";
import "./chunk-4ZVP3B77.js";
import "./chunk-G5OQZQQE.js";
import "./chunk-ZBXM7N6T.js";
import "./chunk-7QSOHLYR.js";
import "./chunk-63A2FK66.js";
import "./chunk-PTFS76HK.js";
import "./chunk-UMAZDHIH.js";
import "./chunk-PK3WKZI7.js";
import "./chunk-PZVLL7ZY.js";
import "./chunk-VMV2HN2I.js";
import "./chunk-C4TID327.js";
import "./chunk-5OCPSI74.js";
import "./chunk-T6HPJXTT.js";
import "./chunk-EX7Y2G7U.js";
import "./chunk-B3MB2CJQ.js";
import "./chunk-7JDA6ZPN.js";
import "./chunk-DYRTYYT7.js";
import "./chunk-5OH45ZV6.js";
import "./chunk-DT4P5VO3.js";
import "./chunk-GDOFOZMB.js";
import "./chunk-AYRWRYEI.js";
import "./chunk-RPIPBOPC.js";

// ../code/node_modules/@modelcontextprotocol/server/dist/index.mjs
var DEFAULT_MAX_REQUEST_BODY_SIZE = 4 * 1024 * 1024;

// server/src/search.ts
var PAGE_SIZE = 10;
function excerpts(text, terms) {
	let lower = text.toLowerCase(), ranges = terms.map((term) => {
		let start = lower.indexOf(term.toLowerCase());
		return { start: Math.max(0, start - 140), end: Math.min(text.length, start + term.length + 220) };
	});
	ranges.sort((a, b) => a.start - b.start);
	let merged = [];
	for (let range of ranges) {
		let prev = merged.at(-1);
		prev && range.start <= prev.end ? prev.end = Math.max(prev.end, range.end) : merged.push({ ...range });
	}
	return merged.map((r) => ({ text: text.slice(r.start, r.end), omitted_before: r.start > 0, omitted_after: r.end < text.length }));
}
function selected(catalog, query) {
	let all = catalog.sources.filter((s) => !query.source_id || s.source_id === query.source_id);
	if (!all.length) throw new SourceError("SOURCE_NOT_INCLUDED", "The requested source is not included.");
	return all.filter((s) => s.language === query.preferred_language || !all.some((other) => other.source_id === s.source_id && other.language === query.preferred_language));
}
function search(catalog, input) {
	let { cursor, ...query } = input, terms = [...new Map(query.terms.map((term) => [term.toLowerCase(), term])).values()], sources = selected(catalog, input), hits = sources.flatMap((source) => {
		let provisions = source.provisions.map((p) => ({
			hit_id: key(p),
			hit_type: "provision",
			provision_ref: {
				source_id: p.source_id,
				language: p.language,
				provision_type: p.provision_type,
				provision_id: p.provision_id
			},
			source_id: p.source_id,
			language: p.language,
			citation: p.citation,
			source_version: p.source_version,
			text: p.text
		})), entries = source.entries.map((e) => ({
			hit_id: e.entry_id,
			hit_type: "curated_entry",
			entry_id: e.entry_id,
			provision_refs: e.provision_refs,
			source_id: source.source_id,
			language: e.language,
			citation: `${source.source_id}, ${e.provision_refs.map((r) => `${r.provision_type} ${r.provision_id}`).join("; ")} (curated entry)`,
			source_version: e.source_version,
			text: e.text
		}));
		return [...provisions, ...entries].flatMap(({ text, ...hit }) => {
			let matched_terms = terms.filter((term) => text.toLowerCase().includes(term.toLowerCase()));
			return matched_terms.length ? [{ ...hit, matched_terms, excerpts: excerpts(text, matched_terms) }] : [];
		});
	}), cmp = (a, b) => a < b ? -1 : a > b ? 1 : 0;
	hits.sort((a, b) => b.matched_terms.length - a.matched_terms.length || cmp(a.source_id, b.source_id) || cmp(a.language, b.language) || cmp(a.hit_type, b.hit_type) || cmp(a.hit_id, b.hit_id));
	let signature = digest(JSON.stringify([catalog.fingerprint, query])), offset = 0;
	if (cursor)
		try {
			let decoded = Buffer.from(cursor, "base64url").toString("utf8"), data = JSON.parse(decoded);
			if (data.signature !== signature || !Number.isInteger(data.offset) || data.offset <= 0 || data.offset >= hits.length || data.offset % PAGE_SIZE !== 0 || Buffer.from(JSON.stringify({ signature, offset: data.offset })).toString("base64url") !== cursor) throw Error();
			offset = data.offset;
		} catch {
			throw new SourceError("INVALID_CURSOR", "Cursor is invalid for these search parameters and source version.");
		}
	let searched_scope = sources.flatMap((s) => [...new Map(s.provisions.map((p) => [JSON.stringify(p.source_version), p.source_version]))].map(([versionKey, source_version]) => ({
		source_id: s.source_id,
		language: s.language,
		source_version,
		provision_refs: s.provisions.filter((p) => JSON.stringify(p.source_version) === versionKey).map((p) => ({
			provision_type: p.provision_type,
			provision_id: p.provision_id
		})),
		entry_ids: JSON.stringify(s.source_version) === versionKey ? s.entries.map((e) => e.entry_id) : []
	})));
	return {
		source_commit: catalog.source_commit,
		query,
		searched_scope,
		hits: hits.slice(offset, offset + PAGE_SIZE),
		next_cursor: offset + PAGE_SIZE < hits.length ? Buffer.from(JSON.stringify({ signature, offset: offset + PAGE_SIZE })).toString("base64url") : null
	};
}
function getProvision(catalog, ref) {
	let sources = catalog.sources.filter((s) => s.source_id === ref.source_id);
	if (!sources.length) throw new SourceError("SOURCE_NOT_INCLUDED", "The requested source is not included.");
	let source = sources.find((s) => s.language === ref.language);
	if (!source) throw new SourceError("LANGUAGE_NOT_AVAILABLE", "The requested source language is not available.");
	let provision = source.provisions.find((p) => key(p) === key(ref));
	if (!provision) throw new SourceError("PROVISION_NOT_FOUND", "The requested provision is not present in this source version.");
	let curated_entries = source.entries.filter((e) => e.provision_refs.some((r) => key(r) === key(ref)));
	return { ...provision, source_commit: catalog.source_commit, curated_entries, curation_status: curated_entries.length ? "available" : "not_available" };
}

// server/src/index.ts
var jsonSchema = (schema) => ({ ...external_exports.toJSONSchema(schema), type: "object" }), annotations = { readOnlyHint: !0, destructiveHint: !1, idempotentHint: !0, openWorldHint: !0 };
async function result(operation) {
	try {
		let data = await operation();
		return { content: [{ type: "text", text: JSON.stringify(data) }], structuredContent: data };
	} catch (error) {
		let fault = error instanceof SourceError ? error : new SourceError("SOURCE_ACCESS_ERROR", "Source access failed."), data = { error: { code: fault.code, message: fault.message } };
		return { isError: !0, content: [{ type: "text", text: JSON.stringify(data) }], structuredContent: data };
	}
}
function createServer() {
	let catalog = loadRemoteCatalog().then((value) => ({ value }), (error) => ({ error })), ready = async () => {
		let loaded = await catalog;
		if ("error" in loaded) throw loaded.error;
		return loaded.value;
	}, server = new Server({ name: "ai-governance-sources", version: "0.2.5" }, { capabilities: { tools: {} } }), tools = [{
		name: "search_sources",
		description: "Search retrieved original provisions and curated entries by literal terms. The local server loads and verifies released source data from a fixed public GitHub repository over HTTPS at startup and keeps that source commit for its lifetime. Returns citations, actual source languages, excerpts, source versions and the source commit. Search scope is technical coverage, not legal assessment.",
		inputSchema: jsonSchema(searchInput),
		outputSchema: jsonSchema(searchOutput),
		annotations
	}, {
		name: "get_provision",
		description: "Read a complete retrieved provision in its exact source language, with citation, source version, source commit and separately returned curated entries. Uses the source data loaded and verified over HTTPS at server startup. Returns an explicit error when source access fails or the requested source, language or provision is unavailable.",
		inputSchema: jsonSchema(provisionRef),
		outputSchema: jsonSchema(provisionOutput),
		annotations
	}];
	return server.setRequestHandler("tools/list", async () => ({ tools })), server.setRequestHandler("tools/call", async (request) => {
		if (!tools.some((t) => t.name === request.params.name))
			throw new ProtocolError(ProtocolErrorCode.InvalidParams, "Unknown tool.");
		return result(async () => {
			if (request.params.name === "search_sources") {
				let parsed2 = searchInput.safeParse(request.params.arguments);
				if (!parsed2.success) throw new SourceError("INVALID_ARGUMENT", "Expected nonempty terms, preferred_language and only supported fields.");
				return searchOutput.parse(search(await ready(), parsed2.data));
			}
			let parsed = provisionRef.safeParse(request.params.arguments);
			if (!parsed.success) throw new SourceError("INVALID_ARGUMENT", "Expected source_id, language, provision_type and provision_id only.");
			return provisionOutput.parse(getProvision(await ready(), parsed.data));
		});
	}), server;
}
serveStdio(createServer, { legacy: "serve", onerror: () => {
	process.stderr.write(`MCP transport error.
`);
} });
export {
	createServer
};
