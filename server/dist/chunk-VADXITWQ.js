// ../code/node_modules/@modelcontextprotocol/server/dist/chunk-vYduTEsO.mjs
var __create = Object.create, __defProp = Object.defineProperty, __getOwnPropDesc = Object.getOwnPropertyDescriptor, __getOwnPropNames = Object.getOwnPropertyNames, __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty, __commonJSMin = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports), __exportAll = (all, symbols) => {
	let target = {};
	for (var name in all)
		__defProp(target, name, {
			get: all[name],
			enumerable: !0
		});
	return symbols && __defProp(target, Symbol.toStringTag, { value: "Module" }), target;
}, __copyProps = (to, from, except, desc) => {
	if (from && typeof from == "object" || typeof from == "function")
		for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++)
			key = keys[i], !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, {
				get: ((k) => from[k]).bind(null, key),
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
	return to;
}, __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: !0
}) : target, mod));

// ../code/node_modules/@modelcontextprotocol/server/dist/dialects-CDpMbily.mjs
var DRAFT_2020_12_URIS = /* @__PURE__ */ new Set(["https://json-schema.org/draft/2020-12/schema", "http://json-schema.org/draft/2020-12/schema"]), DRAFT_2019_09_URIS = /* @__PURE__ */ new Set(["https://json-schema.org/draft/2019-09/schema", "http://json-schema.org/draft/2019-09/schema"]), DRAFT_07_URIS = /* @__PURE__ */ new Set(["https://json-schema.org/draft-07/schema", "http://json-schema.org/draft-07/schema"]), DRAFT_06_URIS = /* @__PURE__ */ new Set(["https://json-schema.org/draft-06/schema", "http://json-schema.org/draft-06/schema"]);
function declares2019Dialect($schema) {
	return typeof $schema == "string" && DRAFT_2019_09_URIS.has($schema.replace(/#$/, ""));
}
function declaredDialect(schema, remedy) {
	if (!("$schema" in schema) || typeof schema.$schema != "string") return "2020-12";
	let declared = schema.$schema.replace(/#$/, "");
	if (DRAFT_2020_12_URIS.has(declared)) return "2020-12";
	if (DRAFT_2019_09_URIS.has(declared)) return "2019-09";
	if (DRAFT_07_URIS.has(declared) || DRAFT_06_URIS.has(declared)) return "draft-7";
	throw new Error(`JSON Schema declares an unsupported dialect ("$schema": "${schema.$schema.slice(0, 200)}"). The default validator supports JSON Schema 2020-12, 2019-09, draft-07, and draft-06; ${remedy}`);
}

export {
	__commonJSMin,
	__exportAll,
	__toESM,
	declares2019Dialect,
	declaredDialect
};
