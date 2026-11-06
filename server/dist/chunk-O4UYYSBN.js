import {
	SourceError,
	loadCatalog,
	parseMetadata
} from "./chunk-PMHNZ5IN.js";
import {
	external_exports
} from "./chunk-CZ2J6RDZ.js";

// server/src/https-sources.ts
var sourceBase = "https://raw.githubusercontent.com/wolfgang-bossle/ai-governance-sources/", sourceLimits = { requestMs: 15e3, totalMs: 12e4, fileBytes: 1024 * 1024, totalBytes: 16 * 1024 * 1024 }, releaseSchema = external_exports.strictObject({ commit: external_exports.string().regex(/^[a-f0-9]{40}$/) });
async function bounded(operation, signal) {
	let abort = () => {
	}, stopped = new Promise((_, reject) => {
		abort = () => reject(signal.reason), signal.aborted ? abort() : signal.addEventListener("abort", abort, { once: !0 });
	});
	try {
		return await Promise.race([operation, stopped]);
	} finally {
		signal.removeEventListener("abort", abort);
	}
}
async function loadRemoteCatalog(options = {}) {
	let request = options.fetch ?? globalThis.fetch, limits = options.limits ?? sourceLimits, overall = AbortSignal.timeout(limits.totalMs), bytes = 0;
	async function read(path) {
		let signal = AbortSignal.any([overall, AbortSignal.timeout(limits.requestMs)]), reader, response;
		try {
			if (signal.throwIfAborted(), response = await bounded(request(sourceBase + path, { redirect: "error", signal, credentials: "omit" }), signal), response.status !== 200 || response.redirected || !response.body || response.url && response.url !== sourceBase + path)
				throw new Error("Source HTTP response rejected.");
			let declared = response.headers.get("content-length");
			if (declared !== null && (!/^\d+$/.test(declared) || Number(declared) > limits.fileBytes))
				throw new Error("Source file exceeds the size limit.");
			reader = response.body.getReader();
			let chunks = [], size = 0;
			for (; ; ) {
				signal.throwIfAborted();
				let part = await bounded(reader.read(), signal);
				if (signal.throwIfAborted(), part.done) break;
				if (size += part.value.byteLength, bytes += part.value.byteLength, size > limits.fileBytes || bytes > limits.totalBytes) throw new Error("Source size limit exceeded.");
				chunks.push(part.value);
			}
			return new TextDecoder("utf-8", { fatal: !0 }).decode(Buffer.concat(chunks));
		} catch {
			throw new SourceError("SOURCE_ACCESS_ERROR", "The released source data could not be retrieved within the access limits.");
		} finally {
			reader ? reader.cancel().catch(() => {
			}) : response?.body && response.body.cancel().catch(() => {
			});
		}
	}
	let releaseText = await read("sources/release.json"), commit;
	try {
		commit = releaseSchema.parse(JSON.parse(releaseText)).commit;
	} catch {
		throw new SourceError("SOURCE_METADATA_ERROR", "The source release file is invalid.");
	}
	let raw = await read(`${commit}/sources.json`), metadata = parseMetadata(raw), texts = /* @__PURE__ */ new Map();
	for (let source of metadata) for (let file of [...source.files, ...source.layer ? [source.layer] : []])
		texts.set(file.path, await read(`${commit}/${file.path}`));
	return loadCatalog(raw, texts, commit);
}

export {
	sourceBase,
	sourceLimits,
	loadRemoteCatalog
};
