import {
	__export
} from "./chunk-RPIPBOPC.js";

// ../code/node_modules/zod/v4/core/util.js
var util_exports = {};
__export(util_exports, {
	BIGINT_FORMAT_RANGES: () => BIGINT_FORMAT_RANGES,
	CONSTANT_CATCH: () => CONSTANT_CATCH,
	Class: () => Class,
	NUMBER_FORMAT_RANGES: () => NUMBER_FORMAT_RANGES,
	aborted: () => aborted,
	allowsEval: () => allowsEval,
	assert: () => assert,
	assertEqual: () => assertEqual,
	assertIs: () => assertIs,
	assertNever: () => assertNever,
	assertNotEqual: () => assertNotEqual,
	assignProp: () => assignProp,
	attachSchema: () => attachSchema,
	base64ToUint8Array: () => base64ToUint8Array,
	base64urlToUint8Array: () => base64urlToUint8Array,
	cached: () => cached,
	captureStackTrace: () => captureStackTrace,
	cleanEnum: () => cleanEnum,
	cleanRegex: () => cleanRegex,
	clone: () => clone,
	cloneDef: () => cloneDef,
	codePointLength: () => codePointLength,
	constantCatch: () => constantCatch,
	createTransparentProxy: () => createTransparentProxy,
	defineLazy: () => defineLazy,
	defineLazyInternal: () => defineLazyInternal,
	derived: () => derived,
	esc: () => esc,
	escapeRegex: () => escapeRegex,
	explicitlyAborted: () => explicitlyAborted,
	extend: () => extend,
	finalizeIssue: () => finalizeIssue,
	floatSafeRemainder: () => floatSafeRemainder,
	getElementAtPath: () => getElementAtPath,
	getEnumValues: () => getEnumValues,
	getLengthableOrigin: () => getLengthableOrigin,
	getParsedType: () => getParsedType,
	getSizableOrigin: () => getSizableOrigin,
	hexToUint8Array: () => hexToUint8Array,
	hide: () => hide,
	installLazyProp: () => installLazyProp,
	isObject: () => isObject,
	isPlainObject: () => isPlainObject,
	issue: () => issue,
	joinValues: () => joinValues,
	jsonStringifyReplacer: () => jsonStringifyReplacer,
	members: () => members,
	merge: () => merge,
	mergeDefs: () => mergeDefs,
	normalizeParams: () => normalizeParams,
	nullish: () => nullish,
	numKeys: () => numKeys,
	objectClone: () => objectClone,
	omit: () => omit,
	optionalKeys: () => optionalKeys,
	own: () => own,
	parsedType: () => parsedType,
	partial: () => partial,
	pick: () => pick,
	prefixIssues: () => prefixIssues,
	primitiveTypes: () => primitiveTypes,
	promiseAllObject: () => promiseAllObject,
	propertyKeyTypes: () => propertyKeyTypes,
	randomString: () => randomString,
	rawShape: () => rawShape,
	required: () => required,
	safeExtend: () => safeExtend,
	shallowClone: () => shallowClone,
	sizeCaps: () => sizeCaps,
	slugify: () => slugify,
	stringifyPrimitive: () => stringifyPrimitive,
	toZod: () => toZod,
	uint8ArrayToBase64: () => uint8ArrayToBase64,
	uint8ArrayToBase64url: () => uint8ArrayToBase64url,
	uint8ArrayToHex: () => uint8ArrayToHex,
	unwrapMessage: () => unwrapMessage
});

// ../code/node_modules/zod/v4/core/core.js
var _a, NEVER = /* @__PURE__ */ Object.freeze({
	status: "aborted"
}), _zodDesc = { value: void 0, enumerable: !1 }, _E = "captureStackTrace" in Error ? Error : null;
function newError(Definition) {
	let E = _E;
	if (E) {
		let saved = E.stackTraceLimit;
		if (typeof saved == "number") {
			try {
				E.stackTraceLimit = 0;
			} catch {
				return _E = null, new Definition();
			}
			try {
				return new Definition();
			} finally {
				E.stackTraceLimit = saved;
			}
		}
	}
	return new Definition();
}
// @__NO_SIDE_EFFECTS__
function $constructor(name, initializer, proto, params) {
	let zodProto = {};
	function Internals(def) {
		this.def = def, this.constr = _, this.traits = /* @__PURE__ */ new Set();
	}
	Internals.prototype = zodProto;
	let protoMembers = proto, initialized = protoMembers && /* @__PURE__ */ new WeakSet();
	function init(inst, def) {
		if (inst._zod) {
			if (inst._zod.traits.has(name))
				return;
		} else {
			_zodDesc.value = new Internals(def);
			try {
				Object.defineProperty(inst, "_zod", _zodDesc);
			} finally {
				_zodDesc.value = void 0;
			}
		}
		if (inst._zod.traits.add(name), initializer(inst, def), initialized) {
			let own2 = Object.getPrototypeOf(inst), ctorProto = inst._zod.constr.prototype, up = own2;
			for (; up && up !== ctorProto; )
				up = Object.getPrototypeOf(up);
			let target = up ?? own2;
			initialized.has(target) || (initialized.add(target), members(target, protoMembers));
		}
		let proto2 = _.prototype;
		for (let k in proto2)
			Object.prototype.hasOwnProperty.call(proto2, k) && (k in inst || (inst[k] = proto2[k].bind(inst)));
	}
	let Parent = params?.Parent ?? Object;
	class Definition extends Parent {
	}
	Object.defineProperty(Definition, "name", { value: name });
	function _(def) {
		let inst = params?.Parent ? newError(Definition) : this;
		init(inst, def);
		let deferred = inst._zod.deferred;
		if (deferred) {
			for (let fn of deferred)
				fn();
			inst._zod.deferred = void 0;
		}
		let pp = globalThis.__zod_globalConfig?.postProcessor;
		return pp && pp(inst), inst;
	}
	return Object.defineProperty(_, "init", { value: init }), Object.defineProperty(_, Symbol.hasInstance, {
		value: (inst) => params?.Parent && inst instanceof params.Parent ? !0 : inst?._zod?.traits?.has(name)
	}), Object.defineProperty(_, "name", { value: name }), _;
}
var $brand = /* @__PURE__ */ Symbol("zod_brand"), $ZodAsyncError = class extends Error {
	constructor() {
		super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
	}
}, $ZodEncodeError = class extends Error {
	constructor(name) {
		super(`Encountered unidirectional transform during encode: ${name}`), this.name = "ZodEncodeError";
	}
};
(_a = globalThis).__zod_globalConfig ?? (_a.__zod_globalConfig = {});
var globalConfig = globalThis.__zod_globalConfig;
function config(newConfig) {
	return newConfig && Object.assign(globalConfig, newConfig), globalConfig;
}

// ../code/node_modules/zod/v4/core/util.js
function assertEqual(val) {
	return val;
}
function assertNotEqual(val) {
	return val;
}
function toZod() {
	return (schema) => schema;
}
function assertIs(_arg) {
}
function assertNever(_x) {
	throw new Error("Unexpected value in exhaustive check");
}
function assert(_) {
}
function getEnumValues(entries) {
	let numericValues = Object.values(entries).filter((v) => typeof v == "number");
	return Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
}
function joinValues(array, separator = "|") {
	return array.map((val) => stringifyPrimitive(val)).join(separator);
}
function jsonStringifyReplacer(_, value) {
	return typeof value == "bigint" ? value.toString() : value;
}
var Cached = class {
	constructor(getter) {
		this._getter = getter, this._value = void 0;
	}
	get value() {
		let getter = this._getter;
		return getter !== void 0 && (this._value = getter(), this._getter = void 0), this._value;
	}
};
function cached(getter) {
	return new Cached(getter);
}
function nullish(input) {
	return input == null;
}
function cleanRegex(source) {
	let start = source.startsWith("^") ? 1 : 0, end = source.endsWith("$") ? source.length - 1 : source.length;
	return source.slice(start, end);
}
function floatSafeRemainder(val, step) {
	let ratio = val / step, roundedRatio = Math.round(ratio), tolerance = 4 * Number.EPSILON * Math.max(Math.abs(ratio), 1);
	return Math.abs(ratio - roundedRatio) < tolerance ? 0 : ratio - roundedRatio;
}
var EVALUATING = /* @__PURE__ */ Symbol("evaluating");
function defineLazy(object, key, getter) {
	let value;
	Object.defineProperty(object, key, {
		get() {
			if (value !== EVALUATING)
				return value === void 0 && (value = EVALUATING, value = getter()), value;
		},
		set(v) {
			Object.defineProperty(object, key, {
				value: v
				// configurable: true,
			});
		},
		configurable: !0
	});
}
function objectClone(obj) {
	return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
}
function assignProp(target, prop, value) {
	Object.defineProperty(target, prop, {
		value,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function rawShape(def) {
	let desc = Object.getOwnPropertyDescriptor(def, "shape");
	return desc?.get ? desc.get.raw : desc?.value;
}
function sourceShape(schema) {
	return rawShape(schema._zod.def) ?? schema._zod.def.shape;
}
function deferProp(target, key, getter) {
	Object.defineProperty(target, key, {
		get() {
			let value = getter();
			return assignProp(this, key, value), value;
		},
		enumerable: !0,
		configurable: !0
	});
}
function putProp(target, key, value) {
	key in target ? assignProp(target, key, value) : target[key] = value;
}
function mirrorShape(target, source, keys, wrap) {
	let raw = sourceShape(source);
	for (let key of keys) {
		let desc = Object.getOwnPropertyDescriptor(raw, key);
		desc.enumerable && (desc.get ? deferProp(target, key, () => {
			let value = source._zod.def.shape[key];
			return wrap ? wrap(value, key) : value;
		}) : putProp(target, key, wrap ? wrap(desc.value, key) : desc.value));
	}
}
function mirrorProps(target, source) {
	for (let key of Reflect.ownKeys(source)) {
		let desc = Object.getOwnPropertyDescriptor(source, key);
		desc.enumerable && (desc.get ? deferProp(target, key, () => source[key]) : putProp(target, key, desc.value));
	}
}
function mergeDefs(...defs) {
	let mergedDescriptors = {};
	for (let def of defs) {
		let descriptors = Object.getOwnPropertyDescriptors(def);
		Object.assign(mergedDescriptors, descriptors);
	}
	return Object.defineProperties({}, mergedDescriptors);
}
function cloneDef(schema) {
	return mergeDefs(schema._zod.def);
}
function getElementAtPath(obj, path) {
	return path ? path.reduce((acc, key) => acc?.[key], obj) : obj;
}
function promiseAllObject(promisesObj) {
	let keys = Object.keys(promisesObj), promises = keys.map((key) => promisesObj[key]);
	return Promise.all(promises).then((results) => {
		let resolvedObj = {};
		for (let i = 0; i < keys.length; i++)
			resolvedObj[keys[i]] = results[i];
		return resolvedObj;
	});
}
function randomString(length = 10) {
	let chars = "abcdefghijklmnopqrstuvwxyz", str = "";
	for (let i = 0; i < length; i++)
		str += chars[Math.floor(Math.random() * chars.length)];
	return str;
}
function esc(str) {
	return JSON.stringify(str);
}
function slugify(input) {
	return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
var captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {
};
function isObject(data) {
	return typeof data == "object" && data !== null && !Array.isArray(data);
}
var allowsEval = /* @__PURE__ */ cached(() => {
	if (globalConfig.jitless || typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))
		return !1;
	try {
		let F = Function;
		return new F(""), !0;
	} catch {
		return !1;
	}
});
function isPlainObject(o) {
	if (isObject(o) === !1)
		return !1;
	let ctor = o.constructor;
	if (ctor === void 0 || typeof ctor != "function")
		return !0;
	let prot = ctor.prototype;
	return !(isObject(prot) === !1 || Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === !1);
}
function shallowClone(o) {
	return isPlainObject(o) ? { ...o } : Array.isArray(o) ? [...o] : o instanceof Map ? new Map(o) : o instanceof Set ? new Set(o) : o;
}
function numKeys(data) {
	let keyCount = 0;
	for (let key in data)
		Object.prototype.hasOwnProperty.call(data, key) && keyCount++;
	return keyCount;
}
var getParsedType = (data) => {
	let t = typeof data;
	switch (t) {
		case "undefined":
			return "undefined";
		case "string":
			return "string";
		case "number":
			return Number.isNaN(data) ? "nan" : "number";
		case "boolean":
			return "boolean";
		case "function":
			return "function";
		case "bigint":
			return "bigint";
		case "symbol":
			return "symbol";
		case "object":
			return Array.isArray(data) ? "array" : data === null ? "null" : data.then && typeof data.then == "function" && data.catch && typeof data.catch == "function" ? "promise" : typeof Map < "u" && data instanceof Map ? "map" : typeof Set < "u" && data instanceof Set ? "set" : typeof Date < "u" && data instanceof Date ? "date" : typeof File < "u" && data instanceof File ? "file" : "object";
		default:
			throw new Error(`Unknown data type: ${t}`);
	}
}, propertyKeyTypes = /* @__PURE__ */ new Set(["string", "number", "symbol"]), primitiveTypes = /* @__PURE__ */ new Set([
	"string",
	"number",
	"bigint",
	"boolean",
	"symbol",
	"undefined"
]);
function escapeRegex(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function clone(inst, def, params) {
	let cl = new inst._zod.constr(def ?? inst._zod.def);
	return (!def || params?.parent) && (cl._zod.parent = inst), cl;
}
function normalizeParams(_params) {
	let params = _params;
	if (!params)
		return {};
	if (typeof params == "string")
		return { error: () => params };
	if (params?.message !== void 0) {
		if (params?.error !== void 0)
			throw new Error("Cannot specify both `message` and `error` params");
		params.error = params.message;
	}
	return delete params.message, typeof params.error == "string" ? { ...params, error: () => params.error } : params;
}
function createTransparentProxy(getter) {
	let target;
	return new Proxy({}, {
		get(_, prop, receiver) {
			return target ?? (target = getter()), Reflect.get(target, prop, receiver);
		},
		set(_, prop, value, receiver) {
			return target ?? (target = getter()), Reflect.set(target, prop, value, receiver);
		},
		has(_, prop) {
			return target ?? (target = getter()), Reflect.has(target, prop);
		},
		deleteProperty(_, prop) {
			return target ?? (target = getter()), Reflect.deleteProperty(target, prop);
		},
		ownKeys(_) {
			return target ?? (target = getter()), Reflect.ownKeys(target);
		},
		getOwnPropertyDescriptor(_, prop) {
			return target ?? (target = getter()), Reflect.getOwnPropertyDescriptor(target, prop);
		},
		defineProperty(_, prop, descriptor) {
			return target ?? (target = getter()), Reflect.defineProperty(target, prop, descriptor);
		}
	});
}
function stringifyPrimitive(value) {
	return typeof value == "bigint" ? value.toString() + "n" : typeof value == "string" ? `"${value}"` : `${value}`;
}
function optionalKeys(shape) {
	return Object.keys(shape).filter((k) => shape[k]._zod.optin !== void 0 && shape[k]._zod.optout === "optional");
}
var NUMBER_FORMAT_RANGES = {
	safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
}, BIGINT_FORMAT_RANGES = {
	int64: [/* @__PURE__ */ BigInt("-9223372036854775808"), /* @__PURE__ */ BigInt("9223372036854775807")],
	uint64: [/* @__PURE__ */ BigInt(0), /* @__PURE__ */ BigInt("18446744073709551615")]
};
function pick(schema, mask) {
	let currDef = schema._zod.def, checks = currDef.checks;
	if (checks && checks.length > 0)
		throw new Error(".pick() cannot be used on object schemas containing refinements");
	let newShape = {};
	return mirrorShape(newShape, schema, maskedKeys(schema, mask)), clone(schema, mergeDefs(currDef, { shape: newShape, checks: [] }));
}
function maskedKeys(schema, mask) {
	let raw = sourceShape(schema), keys = [];
	for (let key of Reflect.ownKeys(mask)) {
		if (!Object.getOwnPropertyDescriptor(raw, key)?.enumerable)
			throw new Error(`Unrecognized key: "${String(key)}"`);
		mask[key] && keys.push(key);
	}
	return keys;
}
function omit(schema, mask) {
	let currDef = schema._zod.def, checks = currDef.checks;
	if (checks && checks.length > 0)
		throw new Error(".omit() cannot be used on object schemas containing refinements");
	let omitted = new Set(maskedKeys(schema, mask)), newShape = {};
	return mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)).filter((key) => !omitted.has(key))), clone(schema, mergeDefs(currDef, { shape: newShape, checks: [] }));
}
function extend(schema, shape) {
	if (!isPlainObject(shape))
		throw new Error("Invalid input to extend: expected a plain object");
	let checks = schema._zod.def.checks;
	if (checks && checks.length > 0) {
		let existingShape = sourceShape(schema);
		for (let key of Reflect.ownKeys(shape))
			if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0)
				throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return clone(schema, mergeDefs(schema._zod.def, { shape: extended(schema, shape) }));
}
function extended(schema, shape) {
	let newShape = {};
	return mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema))), mirrorProps(newShape, shape), newShape;
}
function safeExtend(schema, shape) {
	if (!isPlainObject(shape))
		throw new Error("Invalid input to safeExtend: expected a plain object");
	return clone(schema, mergeDefs(schema._zod.def, { shape: extended(schema, shape) }));
}
function merge(a, b) {
	if (!b?._zod?.def)
		throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
	if (a._zod.def.checks?.length)
		throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	let newShape = {};
	mirrorShape(newShape, a, Reflect.ownKeys(sourceShape(a))), mirrorShape(newShape, b, Reflect.ownKeys(sourceShape(b)));
	let def = mergeDefs(a._zod.def, {
		shape: newShape,
		get catchall() {
			return b._zod.def.catchall;
		},
		checks: b._zod.def.checks ?? []
	});
	return clone(a, def);
}
function partial(Class2, schema, mask, name = "partial") {
	let checks = schema._zod.def.checks;
	if (checks && checks.length > 0)
		throw new Error(`.${name}() cannot be used on object schemas containing refinements`);
	let selected = mask ? new Set(maskedKeys(schema, mask)) : void 0, newShape = {};
	return mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)), Class2 && ((value, key) => selected && !selected.has(key) ? value : new Class2({ type: "optional", innerType: value }))), clone(schema, mergeDefs(schema._zod.def, { shape: newShape, checks: [] }));
}
function required(Class2, schema, mask) {
	let selected = mask ? new Set(maskedKeys(schema, mask)) : void 0, newShape = {};
	return mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)), (value, key) => (
		// overwrite with non-optional
		selected && !selected.has(key) ? value : new Class2({ type: "nonoptional", innerType: value })
	)), clone(schema, mergeDefs(schema._zod.def, { shape: newShape }));
}
function aborted(x, startIndex = 0) {
	if (x.aborted === !0)
		return !0;
	for (let i = startIndex; i < x.issues.length; i++)
		if (x.issues[i]?.continue !== !0)
			return !0;
	return !1;
}
function explicitlyAborted(x, startIndex = 0) {
	if (x.aborted === !0)
		return !0;
	for (let i = startIndex; i < x.issues.length; i++)
		if (x.issues[i]?.continue === !1)
			return !0;
	return !1;
}
function prefixIssues(path, issues) {
	return issues.map((iss) => {
		var _a2;
		return (_a2 = iss).path ?? (_a2.path = []), iss.path.unshift(path), iss;
	});
}
function unwrapMessage(message) {
	return typeof message == "string" ? message : message?.message;
}
function sizeCaps(defChecks) {
	let caps = [];
	for (let ch of defChecks ?? []) {
		let d = ch._zod.def;
		if (!/_(length|size)$|_equals$/.test(d.check))
			break;
		let max = d.maximum ?? d.length ?? d.size;
		max >= 0 && caps.push([max, ch]);
	}
	return caps;
}
function attachSchema(issues, start, inst) {
	var _a2;
	for (let i = start; i < issues.length; i++)
		(_a2 = issues[i]).schema ?? (_a2.schema = inst);
}
function finalizeIssue(iss, ctx, config2) {
	var _a2;
	let traits = iss.inst?._zod?.traits;
	traits?.has("$ZodType") && (traits.has("$ZodCheck") ? (_a2 = iss).schema ?? (_a2.schema = iss.inst) : iss.schema = iss.inst);
	let schemaError = iss.schema !== iss.inst ? iss.schema?._zod.def?.error : void 0, message = iss.message ? iss.message : unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(schemaError?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config2.customError?.(iss)) ?? unwrapMessage(config2.localeError?.(iss)) ?? "Invalid input", full = {};
	for (let k of Object.keys(iss))
		k === "inst" || k === "schema" || k === "continue" || k === "input" || k === "__proto__" || (full[k] = iss[k]);
	return full.path ?? (full.path = []), full.message = message, ctx?.reportInput && (full.input = iss.input), full;
}
function getSizableOrigin(input) {
	return input instanceof Set ? "set" : input instanceof Map ? "map" : input instanceof File ? "file" : "unknown";
}
var highSurrogate = /[\uD800-\uDBFF]/;
function codePointLength(str) {
	let units = str.length;
	if (!highSurrogate.test(str))
		return units;
	let count = units;
	for (let i = 0; i < units - 1; i++)
		(str.charCodeAt(i) & 64512) === 55296 && (str.charCodeAt(i + 1) & 64512) === 56320 && (count--, i++);
	return count;
}
function getLengthableOrigin(input) {
	return Array.isArray(input) ? "array" : typeof input == "string" ? "string" : "unknown";
}
function parsedType(data) {
	let t = typeof data;
	switch (t) {
		case "number":
			return Number.isNaN(data) ? "nan" : "number";
		case "object": {
			if (data === null)
				return "null";
			if (Array.isArray(data))
				return "array";
			let obj = data;
			if (obj && Object.getPrototypeOf(obj) !== Object.prototype && "constructor" in obj && obj.constructor)
				return obj.constructor.name;
		}
	}
	return t;
}
function issue(...args) {
	let [iss, input, inst] = args;
	return typeof iss == "string" ? {
		message: iss,
		code: "custom",
		input,
		inst
	} : { ...iss };
}
function cleanEnum(obj) {
	return Object.entries(obj).filter(([k, _]) => Number.isNaN(Number.parseInt(k, 10))).map((el) => el[1]);
}
function base64ToUint8Array(base64) {
	let binaryString = atob(base64), bytes = new Uint8Array(binaryString.length);
	for (let i = 0; i < binaryString.length; i++)
		bytes[i] = binaryString.charCodeAt(i);
	return bytes;
}
function uint8ArrayToBase64(bytes) {
	let binaryString = "";
	for (let i = 0; i < bytes.length; i++)
		binaryString += String.fromCharCode(bytes[i]);
	return btoa(binaryString);
}
function base64urlToUint8Array(base64url) {
	let base64 = base64url.replace(/-/g, "+").replace(/_/g, "/"), padding = "=".repeat((4 - base64.length % 4) % 4);
	return base64ToUint8Array(base64 + padding);
}
function uint8ArrayToBase64url(bytes) {
	return uint8ArrayToBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function hexToUint8Array(hex) {
	let cleanHex = hex.replace(/^0x/, "");
	if (cleanHex.length % 2 !== 0)
		throw new Error("Invalid hex string length");
	let bytes = new Uint8Array(cleanHex.length / 2);
	for (let i = 0; i < cleanHex.length; i += 2)
		bytes[i / 2] = Number.parseInt(cleanHex.slice(i, i + 2), 16);
	return bytes;
}
function uint8ArrayToHex(bytes) {
	return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}
var Class = class {
	constructor(..._args) {
	}
};
function members(proto, table) {
	for (let key in table) {
		let desc = Object.getOwnPropertyDescriptor(table, key);
		desc.get ? Object.defineProperty(proto, key, { ...desc, enumerable: !1 }) : defineBound(proto, key, desc.value);
	}
}
function own(inst, key, value, enumerable = !0) {
	return Object.defineProperty(inst, key, { configurable: !0, writable: !0, enumerable, value }), value;
}
function hide(inst, key, value) {
	return own(inst, key, value, !1);
}
// @__NO_SIDE_EFFECTS__
function derived(computes, table) {
	for (let key in computes) {
		let compute = computes[key];
		Object.defineProperty(table, key, {
			configurable: !0,
			enumerable: !0,
			get() {
				return own(this, key, compute(this));
			},
			set(value) {
				own(this, key, value);
			}
		});
	}
	return table;
}
function defineBound(proto, key, fn) {
	Object.defineProperty(proto, key, {
		configurable: !0,
		get() {
			return this == null ? fn : own(this, key, fn.bind(this));
		},
		set(value) {
			own(this, key, value);
		}
	});
}
function claim(inst, sentinel) {
	let proto = Object.getPrototypeOf(inst);
	return sentinel in proto ? void 0 : proto;
}
var installing, broke = !1, breaker = {
	configurable: !0,
	get() {
		broke = !0;
	}
};
function defineLazyInternal(inst, key, compute) {
	let proto = Object.getPrototypeOf(inst._zod);
	if (key in proto && installing !== inst._zod) {
		installing = void 0;
		return;
	}
	installing = inst._zod, Object.defineProperty(proto, key, {
		configurable: !0,
		get() {
			Object.defineProperty(this, key, breaker);
			let outer = broke;
			broke = !1;
			try {
				let value = compute(this);
				return broke ? delete this[key] : Object.defineProperty(this, key, { configurable: !0, writable: !0, value }), broke = broke || outer, value;
			} catch (err) {
				throw delete this[key], broke = broke || outer, err;
			}
		},
		set(value) {
			Object.defineProperty(this, key, { configurable: !0, writable: !0, value });
		}
	});
}
function installLazyProp(inst, key, make, enumerable) {
	let proto = claim(inst, key);
	proto && Object.defineProperty(proto, key, {
		configurable: !0,
		get() {
			let desc = { configurable: !0, writable: !0, enumerable, value: void 0 };
			return Object.defineProperty(this, key, desc), desc.value = make(this), Object.defineProperty(this, key, desc), desc.value;
		},
		set(value) {
			Object.defineProperty(this, key, { configurable: !0, writable: !0, enumerable, value });
		}
	});
}
var CONSTANT_CATCH = "~constantCatch";
function constantCatch(value) {
	let fn = () => value;
	return fn[CONSTANT_CATCH] = !0, fn;
}

export {
	toZod,
	getEnumValues,
	joinValues,
	jsonStringifyReplacer,
	cached,
	nullish,
	cleanRegex,
	floatSafeRemainder,
	defineLazy,
	assignProp,
	rawShape,
	mergeDefs,
	esc,
	slugify,
	captureStackTrace,
	isObject,
	allowsEval,
	isPlainObject,
	shallowClone,
	propertyKeyTypes,
	primitiveTypes,
	escapeRegex,
	clone,
	normalizeParams,
	stringifyPrimitive,
	optionalKeys,
	NUMBER_FORMAT_RANGES,
	BIGINT_FORMAT_RANGES,
	aborted,
	explicitlyAborted,
	prefixIssues,
	sizeCaps,
	attachSchema,
	finalizeIssue,
	getSizableOrigin,
	codePointLength,
	getLengthableOrigin,
	parsedType,
	issue,
	own,
	hide,
	defineLazyInternal,
	CONSTANT_CATCH,
	constantCatch,
	util_exports,
	NEVER,
	$constructor,
	$brand,
	$ZodAsyncError,
	$ZodEncodeError,
	globalConfig,
	config
};
