import {
	locales_exports
} from "./chunk-ILAEVQ4R.js";
import {
	en_default
} from "./chunk-63A2FK66.js";
import {
	$ZodCyclicError,
	INVALID,
	ZodCompileAsyncError,
	ZodCompileUnsupportedError,
	compile,
	compileFn,
	isBackEdge,
	isRecursiveSchema,
	memoizer,
	withParser
} from "./chunk-DT4P5VO3.js";
import {
	$ZodAny,
	$ZodArray,
	$ZodBase64,
	$ZodBase64URL,
	$ZodBigInt,
	$ZodBigIntFormat,
	$ZodBoolean,
	$ZodCIDRv4,
	$ZodCIDRv6,
	$ZodCUID,
	$ZodCUID2,
	$ZodCatch,
	$ZodCheck,
	$ZodCheckBigIntFormat,
	$ZodCheckEndsWith,
	$ZodCheckGreaterThan,
	$ZodCheckIncludes,
	$ZodCheckLengthEquals,
	$ZodCheckLessThan,
	$ZodCheckLowerCase,
	$ZodCheckMaxLength,
	$ZodCheckMaxSize,
	$ZodCheckMimeType,
	$ZodCheckMinLength,
	$ZodCheckMinSize,
	$ZodCheckMultipleOf,
	$ZodCheckNumberFormat,
	$ZodCheckOverwrite,
	$ZodCheckProperties,
	$ZodCheckProperty,
	$ZodCheckRegex,
	$ZodCheckSizeEquals,
	$ZodCheckStartsWith,
	$ZodCheckStringFormat,
	$ZodCheckUpperCase,
	$ZodCodec,
	$ZodCreditCard,
	$ZodCustom,
	$ZodCustomStringFormat,
	$ZodDate,
	$ZodDefault,
	$ZodDiscriminatedUnion,
	$ZodE164,
	$ZodEmail,
	$ZodEmoji,
	$ZodEnum,
	$ZodError,
	$ZodExactOptional,
	$ZodFile,
	$ZodFunction,
	$ZodGUID,
	$ZodIBAN,
	$ZodIPv4,
	$ZodIPv6,
	$ZodISODate,
	$ZodISODateTime,
	$ZodISODuration,
	$ZodISOTime,
	$ZodIntersection,
	$ZodJWT,
	$ZodKSUID,
	$ZodLazy,
	$ZodLiteral,
	$ZodMAC,
	$ZodMap,
	$ZodNaN,
	$ZodNanoID,
	$ZodNever,
	$ZodNonOptional,
	$ZodNull,
	$ZodNullable,
	$ZodNumber,
	$ZodNumberFormat,
	$ZodObject,
	$ZodObjectJIT,
	$ZodOptional,
	$ZodPipe,
	$ZodPrefault,
	$ZodPreprocess,
	$ZodPromise,
	$ZodReadonly,
	$ZodRealError,
	$ZodRecord,
	$ZodSet,
	$ZodString,
	$ZodStringFormat,
	$ZodSuccess,
	$ZodSymbol,
	$ZodTemplateLiteral,
	$ZodTransform,
	$ZodTuple,
	$ZodType,
	$ZodULID,
	$ZodURL,
	$ZodUUID,
	$ZodUndefined,
	$ZodUnion,
	$ZodUnknown,
	$ZodVoid,
	$ZodXID,
	$ZodXor,
	Doc,
	URL_BAD_FORMAT,
	URL_UNPARSEABLE,
	_decode,
	_decodeAsync,
	_encode,
	_encodeAsync,
	_parse,
	_parseAsync,
	_safeDecode,
	_safeDecodeAsync,
	_safeEncode,
	_safeEncodeAsync,
	_safeParse,
	_safeParseAsync,
	base64,
	base64Charset,
	base64url,
	base64urlCharset,
	canParseURL,
	currencyCode,
	decode,
	decodeAsync,
	domain,
	encode,
	encodeAsync,
	flattenError,
	formatError,
	getDiscriminatedOption,
	hex,
	hostname,
	httpProtocol,
	integer,
	isValidBase64,
	isValidBase64URL,
	isValidCIDRv6,
	isValidCreditCard,
	isValidIBAN,
	isValidIPv6,
	isValidJWT,
	mergeValues,
	number,
	parse,
	parseAsync,
	parseURLObject,
	prettifyError,
	regexes_exports,
	safeDecode,
	safeDecodeAsync,
	safeEncode,
	safeEncodeAsync,
	safeParse,
	safeParseAsync,
	standardProps,
	stripTabAndNewline,
	toDotPath,
	treeifyError,
	urlHostnameOk,
	urlProtocolOk,
	validate,
	validateAsync,
	validateURL,
	version
} from "./chunk-GDOFOZMB.js";
import {
	$ZodAsyncError,
	$ZodEncodeError,
	$brand,
	$constructor,
	BIGINT_FORMAT_RANGES,
	NEVER,
	NUMBER_FORMAT_RANGES,
	assignProp,
	clone,
	config,
	constantCatch,
	getEnumValues,
	globalConfig,
	isPlainObject,
	issue,
	jsonStringifyReplacer,
	mergeDefs,
	normalizeParams,
	shallowClone,
	slugify,
	toZod,
	util_exports
} from "./chunk-AYRWRYEI.js";
import {
	__export
} from "./chunk-RPIPBOPC.js";

// ../code/node_modules/zod/v4/core/registries.js
var _a, $output = /* @__PURE__ */ Symbol("ZodOutput"), $input = /* @__PURE__ */ Symbol("ZodInput"), $ZodRegistry = class {
	constructor() {
		this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
	}
	add(schema, ..._meta) {
		let meta3 = _meta[0];
		return this._map.set(schema, meta3), meta3 && typeof meta3 == "object" && "id" in meta3 && this._idmap.set(meta3.id, schema), this;
	}
	clear() {
		return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
	}
	remove(schema) {
		let meta3 = this._map.get(schema);
		return meta3 && typeof meta3 == "object" && "id" in meta3 && this._idmap.delete(meta3.id), this._map.delete(schema), this;
	}
	get(schema) {
		let p = schema._zod.parent;
		if (p) {
			let pm = { ...this.get(p) ?? {} };
			delete pm.id;
			let f = { ...pm, ...this._map.get(schema) };
			return Object.keys(f).length ? f : void 0;
		}
		return this._map.get(schema);
	}
	has(schema) {
		return this._map.has(schema);
	}
};
function registry() {
	return new $ZodRegistry();
}
(_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
var globalRegistry = globalThis.__zod_globalRegistry;

// ../code/node_modules/zod/v4/core/api.js
function snapshotChecks(def) {
	return def.checks && (def.checks = [...def.checks]), def;
}
// @__NO_SIDE_EFFECTS__
function _string(Class, params) {
	return new Class(snapshotChecks({ type: "string", ...normalizeParams(params) }));
}
// @__NO_SIDE_EFFECTS__
function _coercedString(Class, params) {
	return new Class(snapshotChecks({ type: "string", coerce: !0, ...normalizeParams(params) }));
}
// @__NO_SIDE_EFFECTS__
function _email(Class, params) {
	return new Class({
		type: "string",
		format: "email",
		check: "string_format",
		abort: !1,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _guid(Class, params) {
	return new Class({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: !1,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uuid(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uuidv4(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v4",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uuidv6(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v6",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uuidv7(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v7",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _url(Class, params) {
	return new Class({
		type: "string",
		format: "url",
		check: "string_format",
		abort: !1,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _emoji(Class, params) {
	return new Class({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: !1,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _nanoid(Class, params) {
	return new Class({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: !1,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _cuid(Class, params) {
	return new Class({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: !1,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _cuid2(Class, params) {
	return new Class({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: !1,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _ulid(Class, params) {
	return new Class({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: !1,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _xid(Class, params) {
	return new Class({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: !1,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _ksuid(Class, params) {
	return new Class({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: !1,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _ipv4(Class, params) {
	return new Class({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: !1,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _ipv6(Class, params) {
	return new Class({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: !1,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _mac(Class, params) {
	return new Class({
		type: "string",
		format: "mac",
		check: "string_format",
		abort: !1,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _cidrv4(Class, params) {
	return new Class({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: !1,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _cidrv6(Class, params) {
	return new Class({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: !1,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _base64(Class, params) {
	return new Class({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: !1,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _base64url(Class, params) {
	return new Class({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: !1,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _e164(Class, params) {
	return new Class({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: !1,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _creditCard(Class, params) {
	return new Class({
		type: "string",
		format: "credit_card",
		check: "string_format",
		abort: !1,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _iban(Class, params) {
	return new Class({
		type: "string",
		format: "iban",
		check: "string_format",
		abort: !1,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _jwt(Class, params) {
	return new Class({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: !1,
		...normalizeParams(params)
	});
}
var TimePrecision = {
	Any: null,
	Minute: -1,
	Second: 0,
	Millisecond: 3,
	Microsecond: 6
};
// @__NO_SIDE_EFFECTS__
function _isoDateTime(Class, params) {
	return new Class({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: !1,
		local: !1,
		precision: null,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _isoDate(Class, params) {
	return new Class({
		type: "string",
		format: "date",
		check: "string_format",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _isoTime(Class, params) {
	return new Class({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _isoDuration(Class, params) {
	return new Class({
		type: "string",
		format: "duration",
		check: "string_format",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _number(Class, params) {
	return new Class(snapshotChecks({ type: "number", checks: [], ...normalizeParams(params) }));
}
// @__NO_SIDE_EFFECTS__
function _coercedNumber(Class, params) {
	return new Class(snapshotChecks({ type: "number", coerce: !0, checks: [], ...normalizeParams(params) }));
}
// @__NO_SIDE_EFFECTS__
function _int(Class, params) {
	return new Class({
		type: "number",
		check: "number_format",
		abort: !1,
		format: "safeint",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _float32(Class, params) {
	return new Class({
		type: "number",
		check: "number_format",
		abort: !1,
		format: "float32",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _float64(Class, params) {
	return new Class({
		type: "number",
		check: "number_format",
		abort: !1,
		format: "float64",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _int32(Class, params) {
	return new Class({
		type: "number",
		check: "number_format",
		abort: !1,
		format: "int32",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uint32(Class, params) {
	return new Class({
		type: "number",
		check: "number_format",
		abort: !1,
		format: "uint32",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _boolean(Class, params) {
	return new Class({
		type: "boolean",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _coercedBoolean(Class, params) {
	return new Class({
		type: "boolean",
		coerce: !0,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _bigint(Class, params) {
	return new Class({
		type: "bigint",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _coercedBigint(Class, params) {
	return new Class({
		type: "bigint",
		coerce: !0,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _int64(Class, params) {
	return new Class({
		type: "bigint",
		check: "bigint_format",
		abort: !1,
		format: "int64",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uint64(Class, params) {
	return new Class({
		type: "bigint",
		check: "bigint_format",
		abort: !1,
		format: "uint64",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _symbol(Class, params) {
	return new Class({
		type: "symbol",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _undefined(Class, params) {
	return new Class({
		type: "undefined",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _null(Class, params) {
	return new Class({
		type: "null",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _any(Class) {
	return new Class({
		type: "any"
	});
}
// @__NO_SIDE_EFFECTS__
function _unknown(Class) {
	return new Class({
		type: "unknown"
	});
}
// @__NO_SIDE_EFFECTS__
function _never(Class, params) {
	return new Class({
		type: "never",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _void(Class, params) {
	return new Class({
		type: "void",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _date(Class, params) {
	return new Class({
		type: "date",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _coercedDate(Class, params) {
	return new Class({
		type: "date",
		coerce: !0,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _nan(Class, params) {
	return new Class({
		type: "nan",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _lt(value, params) {
	return new $ZodCheckLessThan({
		check: "less_than",
		...normalizeParams(params),
		value,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function _lte(value, params) {
	return new $ZodCheckLessThan({
		check: "less_than",
		...normalizeParams(params),
		value,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function _gt(value, params) {
	return new $ZodCheckGreaterThan({
		check: "greater_than",
		...normalizeParams(params),
		value,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function _gte(value, params) {
	return new $ZodCheckGreaterThan({
		check: "greater_than",
		...normalizeParams(params),
		value,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function _positive(params) {
	return /* @__PURE__ */ _gt(0, params);
}
// @__NO_SIDE_EFFECTS__
function _negative(params) {
	return /* @__PURE__ */ _lt(0, params);
}
// @__NO_SIDE_EFFECTS__
function _nonpositive(params) {
	return /* @__PURE__ */ _lte(0, params);
}
// @__NO_SIDE_EFFECTS__
function _nonnegative(params) {
	return /* @__PURE__ */ _gte(0, params);
}
// @__NO_SIDE_EFFECTS__
function _multipleOf(value, params) {
	return new $ZodCheckMultipleOf({
		check: "multiple_of",
		...normalizeParams(params),
		value
	});
}
// @__NO_SIDE_EFFECTS__
function _maxSize(maximum, params) {
	return new $ZodCheckMaxSize({
		check: "max_size",
		...normalizeParams(params),
		maximum
	});
}
// @__NO_SIDE_EFFECTS__
function _minSize(minimum, params) {
	return new $ZodCheckMinSize({
		check: "min_size",
		...normalizeParams(params),
		minimum
	});
}
// @__NO_SIDE_EFFECTS__
function _size(size, params) {
	return new $ZodCheckSizeEquals({
		check: "size_equals",
		...normalizeParams(params),
		size
	});
}
// @__NO_SIDE_EFFECTS__
function _maxLength(maximum, params) {
	return new $ZodCheckMaxLength({
		check: "max_length",
		...normalizeParams(params),
		maximum
	});
}
// @__NO_SIDE_EFFECTS__
function _minLength(minimum, params) {
	return new $ZodCheckMinLength({
		check: "min_length",
		...normalizeParams(params),
		minimum
	});
}
// @__NO_SIDE_EFFECTS__
function _length(length, params) {
	return new $ZodCheckLengthEquals({
		check: "length_equals",
		...normalizeParams(params),
		length
	});
}
// @__NO_SIDE_EFFECTS__
function _regex(pattern, params) {
	return new $ZodCheckRegex({
		check: "string_format",
		format: "regex",
		...normalizeParams(params),
		pattern
	});
}
// @__NO_SIDE_EFFECTS__
function _lowercase(params) {
	return new $ZodCheckLowerCase({
		check: "string_format",
		format: "lowercase",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uppercase(params) {
	return new $ZodCheckUpperCase({
		check: "string_format",
		format: "uppercase",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _includes(includes, params) {
	return new $ZodCheckIncludes({
		check: "string_format",
		format: "includes",
		...normalizeParams(params),
		includes
	});
}
// @__NO_SIDE_EFFECTS__
function _startsWith(prefix, params) {
	return new $ZodCheckStartsWith({
		check: "string_format",
		format: "starts_with",
		...normalizeParams(params),
		prefix
	});
}
// @__NO_SIDE_EFFECTS__
function _endsWith(suffix, params) {
	return new $ZodCheckEndsWith({
		check: "string_format",
		format: "ends_with",
		...normalizeParams(params),
		suffix
	});
}
// @__NO_SIDE_EFFECTS__
function _property(property, schema, params) {
	return new $ZodCheckProperty({
		check: "property",
		property,
		schema,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _properties(shape, params) {
	return new $ZodCheckProperties({
		check: "properties",
		shape,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _mime(types, params) {
	return new $ZodCheckMimeType({
		check: "mime_type",
		mime: types,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _overwrite(tx) {
	return new $ZodCheckOverwrite({
		check: "overwrite",
		tx
	});
}
// @__NO_SIDE_EFFECTS__
function _normalize(form) {
	return /* @__PURE__ */ _overwrite((input2) => input2.normalize(form));
}
// @__NO_SIDE_EFFECTS__
function _trim() {
	return /* @__PURE__ */ _overwrite((input2) => input2.trim());
}
// @__NO_SIDE_EFFECTS__
function _toLowerCase() {
	return /* @__PURE__ */ _overwrite((input2) => input2.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function _toUpperCase() {
	return /* @__PURE__ */ _overwrite((input2) => input2.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function _slugify() {
	return /* @__PURE__ */ _overwrite((input2) => slugify(input2));
}
// @__NO_SIDE_EFFECTS__
function _array(Class, element, params) {
	return new Class({
		type: "array",
		element,
		// get element() {
		//   return element;
		// },
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _union(Class, options, params) {
	return new Class({
		type: "union",
		options,
		...normalizeParams(params)
	});
}
function _xor(Class, options, params) {
	return new Class({
		type: "union",
		options,
		inclusive: !1,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _discriminatedUnion(Class, discriminator, options, params) {
	return new Class({
		type: "union",
		options,
		discriminator,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _intersection(Class, left, right) {
	return new Class({
		type: "intersection",
		left,
		right
	});
}
// @__NO_SIDE_EFFECTS__
function _tuple(Class, items, _paramsOrRest, _params) {
	let hasRest = _paramsOrRest instanceof $ZodType, params = hasRest ? _params : _paramsOrRest, rest = hasRest ? _paramsOrRest : null;
	return new Class({
		type: "tuple",
		items,
		rest,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _record(Class, keyType, valueType, params) {
	return new Class({
		type: "record",
		keyType,
		valueType,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _map(Class, keyType, valueType, params) {
	return new Class({
		type: "map",
		keyType,
		valueType,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _set(Class, valueType, params) {
	return new Class({
		type: "set",
		valueType,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _enum(Class, values, params) {
	let entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
	return new Class({
		type: "enum",
		entries,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _nativeEnum(Class, entries, params) {
	return new Class({
		type: "enum",
		entries,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _literal(Class, value, params) {
	return new Class({
		type: "literal",
		values: Array.isArray(value) ? value : [value],
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _file(Class, params) {
	return new Class({
		type: "file",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _transform(Class, fn) {
	return new Class({
		type: "transform",
		transform: fn
	});
}
// @__NO_SIDE_EFFECTS__
function _optional(Class, innerType) {
	return new Class({
		type: "optional",
		innerType
	});
}
// @__NO_SIDE_EFFECTS__
function _nullable(Class, innerType) {
	return new Class({
		type: "nullable",
		innerType
	});
}
// @__NO_SIDE_EFFECTS__
function _default(Class, innerType, defaultValue) {
	return new Class({
		type: "default",
		innerType,
		get defaultValue() {
			return typeof defaultValue == "function" ? defaultValue() : shallowClone(defaultValue);
		}
	});
}
// @__NO_SIDE_EFFECTS__
function _nonoptional(Class, innerType, params) {
	return new Class({
		type: "nonoptional",
		innerType,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _success(Class, innerType) {
	return new Class({
		type: "success",
		innerType
	});
}
// @__NO_SIDE_EFFECTS__
function _catch(Class, innerType, catchValue) {
	return new Class({
		type: "catch",
		innerType,
		catchValue: typeof catchValue == "function" ? catchValue : constantCatch(catchValue)
	});
}
// @__NO_SIDE_EFFECTS__
function _pipe(Class, in_, out) {
	return new Class({
		type: "pipe",
		in: in_,
		out
	});
}
// @__NO_SIDE_EFFECTS__
function _readonly(Class, innerType) {
	return new Class({
		type: "readonly",
		innerType
	});
}
// @__NO_SIDE_EFFECTS__
function _templateLiteral(Class, parts, params) {
	return new Class({
		type: "template_literal",
		parts,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _lazy(Class, getter) {
	return new Class({
		type: "lazy",
		getter
	});
}
// @__NO_SIDE_EFFECTS__
function _promise(Class, innerType) {
	return new Class({
		type: "promise",
		innerType
	});
}
// @__NO_SIDE_EFFECTS__
function _custom(Class, fn, _params) {
	let norm = normalizeParams(_params);
	return norm.abort ?? (norm.abort = !0), new Class({
		type: "custom",
		check: "custom",
		fn,
		...norm
	});
}
// @__NO_SIDE_EFFECTS__
function _refine(Class, fn, _params) {
	return new Class({
		type: "custom",
		check: "custom",
		fn,
		...normalizeParams(_params)
	});
}
// @__NO_SIDE_EFFECTS__
function _superRefine(fn, params) {
	let ch = /* @__PURE__ */ _check((payload) => (payload.addIssue = (issue2) => {
		if (typeof issue2 == "string")
			payload.issues.push(issue(issue2, payload.value, ch._zod.def));
		else {
			let _issue = issue2;
			_issue.fatal && (_issue.continue = !1), _issue.code ?? (_issue.code = "custom"), "input" in _issue || (_issue.input = payload.value), _issue.inst ?? (_issue.inst = ch), _issue.continue ?? (_issue.continue = !ch._zod.def.abort), payload.issues.push(issue(_issue));
		}
	}, fn(payload.value, payload)), params);
	return ch;
}
// @__NO_SIDE_EFFECTS__
function _check(fn, params) {
	let ch = new $ZodCheck({
		check: "custom",
		...normalizeParams(params)
	});
	return ch._zod.check = fn, ch;
}
// @__NO_SIDE_EFFECTS__
function describe(description) {
	let ch = new $ZodCheck({ check: "describe" });
	return ch._zod.onattach = [
		(inst) => {
			let existing = globalRegistry.get(inst) ?? {};
			globalRegistry.add(inst, { ...existing, description });
		}
	], ch._zod.check = () => {
	}, ch;
}
// @__NO_SIDE_EFFECTS__
function meta(metadata) {
	let ch = new $ZodCheck({ check: "meta" });
	return ch._zod.onattach = [
		(inst) => {
			let existing = globalRegistry.get(inst) ?? {};
			globalRegistry.add(inst, { ...existing, ...metadata });
		}
	], ch._zod.check = () => {
	}, ch;
}
// @__NO_SIDE_EFFECTS__
function _stringbool(Classes, _params) {
	let params = normalizeParams(_params), truthyArray = params.truthy ?? ["true", "1", "yes", "on", "y", "enabled"], falsyArray = params.falsy ?? ["false", "0", "no", "off", "n", "disabled"];
	params.case !== "sensitive" && (truthyArray = truthyArray.map((v) => typeof v == "string" ? v.toLowerCase() : v), falsyArray = falsyArray.map((v) => typeof v == "string" ? v.toLowerCase() : v));
	let truthySet = new Set(truthyArray), falsySet = new Set(falsyArray), _Codec = Classes.Codec ?? $ZodCodec, _Boolean = Classes.Boolean ?? $ZodBoolean, _String = Classes.String ?? $ZodString, stringSchema = new _String({ type: "string", error: params.error }), booleanSchema = new _Boolean({ type: "boolean", error: params.error }), codec2 = new _Codec({
		type: "pipe",
		in: stringSchema,
		out: booleanSchema,
		transform: ((input2, payload) => {
			let data = input2;
			return params.case !== "sensitive" && (data = data.toLowerCase()), truthySet.has(data) ? !0 : falsySet.has(data) ? !1 : (payload.issues.push({
				code: "invalid_value",
				expected: "stringbool",
				values: [...truthySet, ...falsySet],
				input: payload.value,
				inst: codec2,
				continue: !1
			}), {});
		}),
		reverseTransform: ((input2, _payload) => input2 === !0 ? truthyArray[0] || "true" : falsyArray[0] || "false"),
		error: params.error
	});
	return codec2._zod.bag.truthy = truthyArray, codec2._zod.bag.falsy = falsyArray, codec2._zod.bag.case = params.case ?? "insensitive", codec2;
}
// @__NO_SIDE_EFFECTS__
function _stringFormat(Class, format, fnOrRegex, _params = {}) {
	let params = normalizeParams(_params), def = {
		check: "string_format",
		type: "string",
		format,
		fn: typeof fnOrRegex == "function" ? fnOrRegex : (val) => fnOrRegex.test(val),
		...params
	};
	return fnOrRegex instanceof RegExp && (def.pattern = fnOrRegex), new Class(def);
}

// ../code/node_modules/zod/v4/core/to-json-schema.js
function assignProps(target, ...sources) {
	for (let source of sources)
		for (let key of Reflect.ownKeys(source))
			Object.prototype.propertyIsEnumerable.call(source, key) && assignProp(target, key, source[key]);
	return target;
}
function initializeContext(params) {
	let target = params?.target ?? "draft-2020-12";
	return target === "draft-4" && (target = "draft-04"), target === "draft-7" && (target = "draft-07"), {
		processors: params.processors ?? {},
		metadataRegistry: params?.metadata ?? globalRegistry,
		target,
		unrepresentable: params?.unrepresentable ?? "throw",
		override: params?.override ?? (() => {
		}),
		io: params?.io ?? "output",
		counter: 0,
		seen: /* @__PURE__ */ new Map(),
		sharedDefsExtractedFor: void 0,
		sharedEmitDoneFor: void 0,
		cycles: params?.cycles ?? "ref",
		reused: params?.reused ?? "inline",
		intersections: [],
		deferred: [],
		external: params?.external ?? void 0
	};
}
function handleUnrepresentable(schema, ctx, json2, params, message) {
	let result = typeof ctx.unrepresentable == "function" ? ctx.unrepresentable({ zodSchema: schema, path: params.path, message }) : ctx.unrepresentable;
	if (result === "any")
		return !1;
	if (result === void 0 || result === "throw")
		throw new Error(message);
	return Object.assign(json2, result), !0;
}
function processSchema(schema, ctx, _params = { path: [], schemaPath: [] }) {
	var _a2;
	let def = schema._zod.def, seen = ctx.seen.get(schema);
	if (seen)
		return seen.count++, _params.schemaPath.includes(schema) && (seen.cycle = _params.path), seen.schema;
	let result = { schema: {}, count: 1, cycle: void 0, path: _params.path };
	ctx.seen.set(schema, result), ctx.sharedDefsExtractedFor = void 0, ctx.sharedEmitDoneFor = void 0;
	let overrideSchema = schema._zod.toJSONSchema?.();
	if (overrideSchema)
		result.schema = overrideSchema;
	else {
		let params = {
			..._params,
			schemaPath: [..._params.schemaPath, schema],
			path: _params.path
		};
		if (schema._zod.processJSONSchema)
			schema._zod.processJSONSchema(ctx, result.schema, params);
		else {
			let _json = result.schema, processor = ctx.processors[def.type];
			if (!processor)
				throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
			processor(schema, ctx, _json, params);
		}
		let parent = schema._zod.parent;
		parent && (result.ref || (result.ref = parent), processSchema(parent, ctx, params), ctx.seen.get(parent).isParent = !0);
	}
	let meta3 = ctx.metadataRegistry.get(schema);
	return meta3 && assignProps(result.schema, meta3), ctx.io === "input" && isTransforming(schema) && (delete result.schema.examples, delete result.schema.default), ctx.io === "input" && "_prefault" in result.schema && ((_a2 = result.schema).default ?? (_a2.default = result.schema._prefault)), delete result.schema._prefault, ctx.seen.get(schema).schema;
}
function encodeJSONPointerSegment(segment) {
	return segment.replace(/~/g, "~0").replace(/\//g, "~1");
}
function extractDefs(ctx, schema) {
	let root = ctx.seen.get(schema);
	if (!root)
		throw new Error("Unprocessed schema. This is a bug in Zod.");
	if (ctx.external && ctx.sharedDefsExtractedFor === ctx.external)
		return;
	let idToSchema = /* @__PURE__ */ new Map();
	for (let entry of ctx.seen.entries()) {
		let id = ctx.metadataRegistry.get(entry[0])?.id;
		if (id) {
			let existing = idToSchema.get(id);
			if (existing && existing !== entry[0])
				throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
			idToSchema.set(id, entry[0]);
		}
	}
	let makeURI = (entry) => {
		let defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
		if (ctx.external) {
			let externalId = ctx.external.registry.get(entry[0])?.id, uriGenerator = ctx.external.uri ?? ((id2) => id2);
			if (externalId)
				return { ref: uriGenerator(externalId) };
			let id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
			return entry[1].defId = id, { defId: id, ref: `${uriGenerator("__shared")}#/${defsSegment}/${encodeJSONPointerSegment(id)}` };
		}
		let uriPrefix = "#", defUriPrefix = `${uriPrefix}/${defsSegment}/`;
		if (entry[1] === root && !entry[1].schema.id)
			return { ref: uriPrefix };
		let defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
		return { defId, ref: defUriPrefix + encodeJSONPointerSegment(defId) };
	}, extractToDef = (entry) => {
		if (entry[1].schema.$ref)
			return;
		let seen = entry[1], { ref, defId } = makeURI(entry);
		seen.def = { ...seen.schema }, defId && (seen.defId = defId);
		let schema2 = seen.schema;
		for (let key in schema2)
			delete schema2[key];
		schema2.$ref = ref;
	};
	if (ctx.cycles === "throw")
		for (let entry of ctx.seen.entries()) {
			let seen = entry[1];
			if (seen.cycle)
				throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
		}
	for (let entry of ctx.seen.entries()) {
		let seen = entry[1];
		if (schema === entry[0]) {
			extractToDef(entry);
			continue;
		}
		if (ctx.external) {
			let ext = ctx.external.registry.get(entry[0])?.id;
			if (schema !== entry[0] && ext) {
				extractToDef(entry);
				continue;
			}
		}
		if (ctx.metadataRegistry.get(entry[0])?.id) {
			extractToDef(entry);
			continue;
		}
		if (seen.cycle) {
			extractToDef(entry);
			continue;
		}
		seen.count > 1 && ctx.reused === "ref" && extractToDef(entry);
	}
	ctx.external && (ctx.sharedDefsExtractedFor = ctx.external);
}
function compactTypeUnion(schema) {
	let options = schema.anyOf;
	if (!Array.isArray(options) || options.length === 0 || schema.type !== void 0)
		return;
	let types = [];
	for (let option of options) {
		if (!option || typeof option != "object")
			return;
		compactTypeUnion(option);
		let keys = Object.keys(option);
		if (keys.length !== 1 || keys[0] !== "type")
			return;
		let type = option.type;
		for (let member of Array.isArray(type) ? type : [type]) {
			if (typeof member != "string")
				return;
			types.includes(member) || types.push(member);
		}
	}
	delete schema.anyOf, schema.type = types.length === 1 ? types[0] : types;
}
var FOLDABLE_KEYS = /* @__PURE__ */ new Set(["type", "properties", "required", "additionalProperties"]), UNION_KEYS = ["oneOf", "anyOf"];
function undeclaredConstraint(member) {
	let extra = member.additionalProperties;
	return extra === void 0 || extra === !1 || typeof extra != "object" || extra === null ? null : Object.keys(extra).length ? extra : null;
}
function foldObjects(members) {
	let objects = [];
	for (let member of members) {
		if (typeof member != "object" || member.type !== "object")
			return null;
		for (let key in member)
			if (!FOLDABLE_KEYS.has(key))
				return null;
		objects.push(member);
	}
	let properties = {}, required = /* @__PURE__ */ new Set();
	for (let object2 of objects) {
		for (let key in object2.properties) {
			if (Object.prototype.hasOwnProperty.call(properties, key))
				continue;
			let parts = [];
			for (let other of objects) {
				let part = other.properties?.[key] ?? undeclaredConstraint(other);
				part != null && (parts.some((seen) => JSON.stringify(seen) === JSON.stringify(part)) || parts.push(part));
			}
			let merged = parts.length === 1 ? parts[0] : foldObjects(parts) ?? { allOf: parts };
			assignProp(properties, key, merged);
		}
		for (let key of object2.required ?? [])
			required.add(key);
	}
	let folded = { type: "object", properties };
	if (required.size && (folded.required = [...required]), objects.every((object2) => object2.additionalProperties === !1))
		folded.additionalProperties = !1;
	else {
		let constraints = [];
		for (let object2 of objects) {
			let constraint = undeclaredConstraint(object2);
			constraint && !constraints.some((seen) => JSON.stringify(seen) === JSON.stringify(constraint)) && constraints.push(constraint);
		}
		constraints.length === 1 ? folded.additionalProperties = constraints[0] : constraints.length > 1 && (folded.additionalProperties = { allOf: constraints });
	}
	return folded;
}
function foldIntersection(json2) {
	let allOf = json2.allOf;
	if (!Array.isArray(allOf) || allOf.length < 2)
		return;
	for (let key of FOLDABLE_KEYS)
		if (key in json2)
			return;
	let unions = allOf.filter((m) => UNION_KEYS.some((k) => Array.isArray(m[k]))), folded = null;
	if (!unions.length)
		folded = foldObjects(allOf);
	else {
		let union2 = unions[0], keyword = UNION_KEYS.find((k) => Array.isArray(union2[k]));
		if (Object.keys(union2).length !== 1)
			return;
		let rest = allOf.filter((m) => m !== union2), branches = union2[keyword].map((branch) => foldObjects([...rest, branch]));
		if (branches.some((b) => !b))
			return;
		folded = { [keyword]: branches };
	}
	folded && (delete json2.allOf, assignProps(json2, folded));
}
function finalize(ctx, schema) {
	let root = ctx.seen.get(schema);
	if (!root)
		throw new Error("Unprocessed schema. This is a bug in Zod.");
	let flattenRef = (zodSchema) => {
		let seen = ctx.seen.get(zodSchema);
		if (seen.ref === null)
			return;
		let schema2 = seen.def ?? seen.schema, _cached = { ...schema2 }, ref = seen.ref;
		if (seen.ref = null, ref) {
			flattenRef(ref);
			let refSeen = ctx.seen.get(ref), refSchema = refSeen.schema;
			if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0") ? (schema2.allOf = schema2.allOf ?? [], schema2.allOf.push(refSchema)) : assignProps(schema2, refSchema), assignProps(schema2, _cached), zodSchema._zod.parent === ref)
				for (let key in schema2)
					key === "$ref" || key === "allOf" || key in _cached || delete schema2[key];
			if (refSchema.$ref && refSeen.def)
				for (let key in schema2)
					key === "$ref" || key === "allOf" || key in refSeen.def && JSON.stringify(schema2[key]) === JSON.stringify(refSeen.def[key]) && delete schema2[key];
		}
		let parent = zodSchema._zod.parent;
		if (parent && parent !== ref) {
			flattenRef(parent);
			let parentSeen = ctx.seen.get(parent);
			if (parentSeen?.schema.$ref && (schema2.$ref = parentSeen.schema.$ref, parentSeen.def))
				for (let key in schema2)
					key === "$ref" || key === "allOf" || key in parentSeen.def && JSON.stringify(schema2[key]) === JSON.stringify(parentSeen.def[key]) && delete schema2[key];
		}
		ctx.override({
			zodSchema,
			jsonSchema: schema2,
			path: seen.path ?? []
		});
	};
	if (!ctx.external || ctx.sharedEmitDoneFor !== ctx.external) {
		for (let entry of [...ctx.seen.entries()].reverse())
			flattenRef(entry[0]);
		if (ctx.target !== "openapi-3.0")
			for (let entry of ctx.seen.entries())
				compactTypeUnion(entry[1].def ?? entry[1].schema);
		for (let rewrite of ctx.deferred)
			rewrite();
		if (ctx.intersections.length) {
			let carriers = /* @__PURE__ */ new Map();
			for (let seen of ctx.seen.values())
				for (let json2 of [seen.schema, seen.def]) {
					let allOf = json2?.allOf;
					if (!Array.isArray(allOf))
						continue;
					let existing = carriers.get(allOf);
					existing ? existing.push(json2) : carriers.set(allOf, [json2]);
				}
			for (let allOf of ctx.intersections)
				for (let json2 of carriers.get(allOf) ?? [])
					foldIntersection(json2);
		}
	}
	let result = {};
	if (ctx.target === "draft-2020-12" ? result.$schema = "https://json-schema.org/draft/2020-12/schema" : ctx.target === "draft-07" ? result.$schema = "http://json-schema.org/draft-07/schema#" : ctx.target === "draft-04" ? result.$schema = "http://json-schema.org/draft-04/schema#" : ctx.target, ctx.external?.uri) {
		let id = ctx.external.registry.get(schema)?.id;
		if (!id)
			throw new Error("Schema is missing an `id` property");
		result.$id = ctx.external.uri(id);
	}
	assignProps(result, root.defId ? root.schema : root.def ?? root.schema);
	let rootMetaId = ctx.metadataRegistry.get(schema)?.id;
	rootMetaId !== void 0 && result.id === rootMetaId && delete result.id;
	let defs = ctx.external?.defs ?? {};
	if (!ctx.external || ctx.sharedEmitDoneFor !== ctx.external)
		for (let entry of ctx.seen.entries()) {
			let seen = entry[1];
			seen.def && seen.defId && (seen.def.id === seen.defId && delete seen.def.id, assignProp(defs, seen.defId, seen.def));
		}
	ctx.external && (ctx.sharedEmitDoneFor = ctx.external), ctx.external || Object.keys(defs).length > 0 && (ctx.target === "draft-2020-12" ? result.$defs = defs : result.definitions = defs);
	try {
		let finalized = JSON.parse(JSON.stringify(result));
		return Object.defineProperty(finalized, "~standard", {
			value: {
				...schema["~standard"],
				jsonSchema: {
					input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
					output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
				}
			},
			enumerable: !1,
			writable: !1
		}), finalized;
	} catch {
		throw new Error("Error converting schema to JSON.");
	}
}
function isTransforming(_schema, _ctx) {
	let ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
	if (ctx.seen.has(_schema))
		return !1;
	ctx.seen.add(_schema);
	let def = _schema._zod.def;
	if (def.type === "transform")
		return !0;
	if (def.type === "array")
		return isTransforming(def.element, ctx);
	if (def.type === "set")
		return isTransforming(def.valueType, ctx);
	if (def.type === "lazy")
		return isTransforming(def.getter(), ctx);
	if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault" || def.type === "catch")
		return isTransforming(def.innerType, ctx);
	if (def.type === "intersection")
		return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
	if (def.type === "record" || def.type === "map")
		return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
	if (def.type === "pipe")
		return _schema._zod.traits.has("$ZodCodec") ? !0 : isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
	if (def.type === "object") {
		for (let key in def.shape)
			if (isTransforming(def.shape[key], ctx))
				return !0;
		return !1;
	}
	if (def.type === "union") {
		for (let option of def.options)
			if (isTransforming(option, ctx))
				return !0;
		return !1;
	}
	if (def.type === "tuple") {
		for (let item of def.items)
			if (isTransforming(item, ctx))
				return !0;
		return !!(def.rest && isTransforming(def.rest, ctx));
	}
	return !1;
}
var createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
	let ctx = initializeContext({ ...params, processors });
	return processSchema(schema, ctx), extractDefs(ctx, schema), finalize(ctx, schema);
}, createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
	let { libraryOptions, target } = params ?? {}, ctx = initializeContext({ ...libraryOptions ?? {}, target, io, processors });
	return processSchema(schema, ctx), extractDefs(ctx, schema), finalize(ctx, schema);
};

// ../code/node_modules/zod/v4/core/json-schema-processors.js
var narrowMin = (agg, key, value) => {
	(agg[key] === void 0 || value > agg[key]) && (agg[key] = value);
}, narrowMax = (agg, key, value) => {
	(agg[key] === void 0 || value < agg[key]) && (agg[key] = value);
}, narrowBoth = (agg, value) => {
	narrowMin(agg, "minimum", value), narrowMax(agg, "maximum", value);
}, addDivisor = (agg, value) => {
	agg.multipleOf ?? (agg.multipleOf = []), agg.multipleOf.includes(value) || agg.multipleOf.push(value);
}, addPattern = (agg, pattern) => {
	agg.patterns ?? (agg.patterns = /* @__PURE__ */ new Set()), agg.patterns.add(pattern);
}, intersectMime = (agg, mime) => {
	agg.mime = agg.mime ? agg.mime.filter((m) => mime.includes(m)) : [...mime];
}, setFormat = (agg, format) => {
	agg.format = format, format.includes("int") && (agg.isInt = !0);
}, minContributor = (agg, def) => narrowMin(agg, "minimum", def.minimum), maxContributor = (agg, def) => narrowMax(agg, "maximum", def.maximum), formatContributor = (ranges) => (agg, def) => {
	setFormat(agg, def.format);
	let [minimum, maximum] = ranges[def.format];
	narrowMin(agg, "minimum", minimum), narrowMax(agg, "maximum", maximum);
}, contributors = {
	greater_than: (agg, def) => narrowMin(agg, def.inclusive ? "minimum" : "exclusiveMinimum", def.value),
	less_than: (agg, def) => narrowMax(agg, def.inclusive ? "maximum" : "exclusiveMaximum", def.value),
	multiple_of: (agg, def) => addDivisor(agg, def.value),
	number_format: formatContributor(NUMBER_FORMAT_RANGES),
	bigint_format: formatContributor(BIGINT_FORMAT_RANGES),
	min_length: minContributor,
	max_length: maxContributor,
	length_equals: (agg, def) => narrowBoth(agg, def.length),
	min_size: minContributor,
	max_size: maxContributor,
	size_equals: (agg, def) => narrowBoth(agg, def.size),
	string_format: (agg, def) => {
		setFormat(agg, def.format), def.pattern && addPattern(agg, def.pattern), (def.format === "base64" || def.format === "base64url") && (agg.contentEncoding = def.format), (def.local || def.precision === -1) && (agg.laxFormat = !0);
	},
	mime_type: (agg, def) => intersectMime(agg, def.mime)
};
function aggregateChecks(schema) {
	let agg = {}, def = schema._zod.def, list = schema._zod.traits.has("$ZodCheck") ? [schema, ...def.checks ?? []] : def.checks ?? [];
	for (let ch of list)
		contributors[ch._zod.def.check]?.(agg, ch._zod.def);
	let bag = schema._zod.bag;
	bag.minimum !== void 0 && narrowMin(agg, "minimum", bag.minimum), bag.exclusiveMinimum !== void 0 && narrowMin(agg, "exclusiveMinimum", bag.exclusiveMinimum), bag.maximum !== void 0 && narrowMax(agg, "maximum", bag.maximum), bag.exclusiveMaximum !== void 0 && narrowMax(agg, "exclusiveMaximum", bag.exclusiveMaximum), bag.multipleOf !== void 0 && addDivisor(agg, bag.multipleOf), bag.format !== void 0 && (agg.format ?? (agg.format = bag.format), bag.format.includes("int") && (agg.isInt = !0)), bag.mime && intersectMime(agg, bag.mime);
	for (let pattern of bag.patterns ?? [])
		addPattern(agg, pattern);
	return agg;
}
var formatMap = {
	guid: "uuid",
	url: "uri",
	datetime: "date-time",
	json_string: "json-string",
	regex: ""
	// do not set
}, exactPatterns = /* @__PURE__ */ new Map([
	[base64Charset, base64],
	[base64urlCharset, base64url]
]), exactPattern = (p) => exactPatterns.get(p) ?? p, stringProcessor = (schema, ctx, _json, _params) => {
	let json2 = _json;
	json2.type = "string";
	let { minimum, maximum, format, patterns, contentEncoding, laxFormat } = aggregateChecks(schema);
	if (typeof minimum == "number" && (json2.minLength = minimum), typeof maximum == "number" && (json2.maxLength = maximum), format && (json2.format = formatMap[format] ?? format, json2.format === "" && delete json2.format, (format === "time" || laxFormat) && delete json2.format), contentEncoding && (json2.contentEncoding = contentEncoding), patterns && patterns.size > 0) {
		let patternList = [...patterns].map(exactPattern);
		patternList.length === 1 ? json2.pattern = patternList[0].source : patternList.length > 1 && (json2.allOf = [
			...patternList.map((regex) => ({
				...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
				pattern: regex.source
			}))
		]);
	}
}, numberProcessor = (schema, ctx, _json, params) => {
	let json2 = _json, { minimum, maximum, multipleOf, exclusiveMaximum, exclusiveMinimum, isInt } = aggregateChecks(schema);
	json2.type = isInt ? "integer" : "number";
	let exMin = typeof exclusiveMinimum == "number" && exclusiveMinimum >= (minimum ?? Number.NEGATIVE_INFINITY), exMax = typeof exclusiveMaximum == "number" && exclusiveMaximum <= (maximum ?? Number.POSITIVE_INFINITY), legacy = ctx.target === "draft-04" || ctx.target === "openapi-3.0";
	if (exMin ? legacy ? (json2.minimum = exclusiveMinimum, json2.exclusiveMinimum = !0) : json2.exclusiveMinimum = exclusiveMinimum : typeof minimum == "number" && (json2.minimum = minimum), exMax ? legacy ? (json2.maximum = exclusiveMaximum, json2.exclusiveMaximum = !0) : json2.exclusiveMaximum = exclusiveMaximum : typeof maximum == "number" && (json2.maximum = maximum), multipleOf) {
		let divisors = /* @__PURE__ */ new Set();
		for (let divisor of multipleOf)
			Number.isFinite(divisor) && divisor !== 0 ? divisors.add(Math.abs(divisor)) : handleUnrepresentable(schema, ctx, json2, params, `A multipleOf divisor of ${divisor} cannot be represented in JSON Schema`);
		let [first, ...rest] = divisors;
		first !== void 0 && (json2.multipleOf = first), rest.length && (json2.allOf = [...json2.allOf ?? [], ...rest.map((m) => ({ multipleOf: m }))]);
	}
}, booleanProcessor = (_schema, _ctx, json2, _params) => {
	json2.type = "boolean";
}, bigintProcessor = (schema, ctx, json2, params) => {
	handleUnrepresentable(schema, ctx, json2, params, "BigInt cannot be represented in JSON Schema");
}, symbolProcessor = (schema, ctx, json2, params) => {
	handleUnrepresentable(schema, ctx, json2, params, "Symbols cannot be represented in JSON Schema");
}, nullProcessor = (_schema, ctx, json2, _params) => {
	ctx.target === "openapi-3.0" ? (json2.type = "string", json2.nullable = !0, json2.enum = [null]) : json2.type = "null";
}, undefinedProcessor = (schema, ctx, json2, params) => {
	handleUnrepresentable(schema, ctx, json2, params, "Undefined cannot be represented in JSON Schema");
}, voidProcessor = (schema, ctx, json2, params) => {
	handleUnrepresentable(schema, ctx, json2, params, "Void cannot be represented in JSON Schema");
}, neverProcessor = (_schema, _ctx, json2, _params) => {
	json2.not = {};
}, anyProcessor = (_schema, _ctx, _json, _params) => {
}, unknownProcessor = (_schema, _ctx, _json, _params) => {
}, dateProcessor = (schema, ctx, json2, params) => {
	handleUnrepresentable(schema, ctx, json2, params, "Date cannot be represented in JSON Schema");
}, enumProcessor = (schema, _ctx, json2, _params) => {
	let def = schema._zod.def, values = getEnumValues(def.entries);
	if (values.length === 0) {
		json2.not = {};
		return;
	}
	values.every((v) => typeof v == "number") && (json2.type = "number"), values.every((v) => typeof v == "string") && (json2.type = "string"), json2.enum = values;
}, literalProcessor = (schema, ctx, json2, params) => {
	let def = schema._zod.def;
	if (def.values.length === 0) {
		json2.not = {};
		return;
	}
	let vals = [];
	for (let val of def.values)
		if (val === void 0) {
			if (handleUnrepresentable(schema, ctx, json2, params, "Literal `undefined` cannot be represented in JSON Schema"))
				return;
		} else if (typeof val == "bigint") {
			if (handleUnrepresentable(schema, ctx, json2, params, "BigInt literals cannot be represented in JSON Schema"))
				return;
			vals.push(Number(val));
		} else
			vals.push(val);
	if (vals.length !== 0)
		if (vals.length === 1) {
			let val = vals[0];
			json2.type = val === null ? "null" : typeof val, ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? json2.enum = [val] : json2.const = val;
		} else
			vals.every((v) => typeof v == "number") && (json2.type = "number"), vals.every((v) => typeof v == "string") && (json2.type = "string"), vals.every((v) => typeof v == "boolean") && (json2.type = "boolean"), vals.every((v) => v === null) && (json2.type = "null"), json2.enum = vals;
}, nanProcessor = (schema, ctx, json2, params) => {
	handleUnrepresentable(schema, ctx, json2, params, "NaN cannot be represented in JSON Schema");
}, templateLiteralProcessor = (schema, _ctx, json2, _params) => {
	let _json = json2, pattern = schema._zod.pattern;
	if (!pattern)
		throw new Error("Pattern not found in template literal");
	_json.type = "string", _json.pattern = pattern.source;
}, fileProcessor = (schema, _ctx, json2, _params) => {
	let _json = json2;
	_json.type = "string", _json.format = "binary", _json.contentEncoding = "binary";
	let { minimum, maximum, mime } = aggregateChecks(schema);
	minimum !== void 0 && (_json.minLength = minimum), maximum !== void 0 && (_json.maxLength = maximum), mime && (mime.length === 0 ? _json.not = {} : mime.length === 1 ? _json.contentMediaType = mime[0] : _json.anyOf = mime.map((m) => ({ contentMediaType: m })));
}, successProcessor = (_schema, _ctx, json2, _params) => {
	json2.type = "boolean";
}, customProcessor = (schema, ctx, json2, params) => {
	handleUnrepresentable(schema, ctx, json2, params, "Custom types cannot be represented in JSON Schema");
}, functionProcessor = (schema, ctx, json2, params) => {
	handleUnrepresentable(schema, ctx, json2, params, "Function types cannot be represented in JSON Schema");
}, transformProcessor = (schema, ctx, json2, params) => {
	handleUnrepresentable(schema, ctx, json2, params, "Transforms cannot be represented in JSON Schema");
}, mapProcessor = (schema, ctx, json2, params) => {
	handleUnrepresentable(schema, ctx, json2, params, "Map cannot be represented in JSON Schema");
}, setProcessor = (schema, ctx, json2, params) => {
	handleUnrepresentable(schema, ctx, json2, params, "Set cannot be represented in JSON Schema");
}, arrayProcessor = (schema, ctx, _json, params) => {
	let json2 = _json, def = schema._zod.def, { minimum, maximum } = aggregateChecks(schema);
	typeof minimum == "number" && (json2.minItems = minimum), typeof maximum == "number" && (json2.maxItems = maximum), json2.type = "array", json2.items = processSchema(def.element, ctx, {
		...params,
		path: [...params.path, "items"]
	});
};
function inputOptin(schema) {
	let def = schema._zod.def;
	return def.type === "pipe" && def.in._zod.traits.has("$ZodTransform") ? inputOptin(def.out) : def.type === "catch" ? inputOptin(def.innerType) : schema._zod.optin;
}
var objectProcessor = (schema, ctx, _json, params) => {
	let json2 = _json, def = schema._zod.def, shape = def.shape;
	if (Object.getOwnPropertySymbols(shape).length && handleUnrepresentable(schema, ctx, json2, params, "Symbol keys cannot be represented in JSON Schema"))
		return;
	json2.type = "object", json2.properties = {};
	for (let key in shape)
		assignProp(json2.properties, key, processSchema(shape[key], ctx, {
			...params,
			path: [...params.path, "properties", key]
		}));
	let requiredKeys = [];
	for (let key of Object.keys(shape)) {
		let field = def.shape[key];
		(ctx.io === "input" ? inputOptin(field) === void 0 : field._zod.optout === void 0) && requiredKeys.push(key);
	}
	requiredKeys.length > 0 && (json2.required = requiredKeys), def.catchall?._zod.def.type === "never" ? json2.additionalProperties = !1 : def.catchall ? def.catchall && (json2.additionalProperties = processSchema(def.catchall, ctx, {
		...params,
		path: [...params.path, "additionalProperties"]
	})) : ctx.io === "output" && (json2.additionalProperties = !1);
}, unionProcessor = (schema, ctx, json2, params) => {
	let def = schema._zod.def, isExclusive = def.inclusive === !1, options = def.options.map((x, i) => processSchema(x, ctx, {
		...params,
		path: [...params.path, isExclusive ? "oneOf" : "anyOf", i]
	}));
	isExclusive ? json2.oneOf = options : json2.anyOf = options;
}, intersectionProcessor = (schema, ctx, json2, params) => {
	let def = schema._zod.def, a = processSchema(def.left, ctx, {
		...params,
		path: [...params.path, "allOf", 0]
	}), b = processSchema(def.right, ctx, {
		...params,
		path: [...params.path, "allOf", 1]
	}), isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1, allOf = [
		...isSimpleIntersection(a) ? a.allOf : [a],
		...isSimpleIntersection(b) ? b.allOf : [b]
	];
	json2.allOf = allOf, ctx.intersections.push(allOf);
}, tupleProcessor = (schema, ctx, _json, params) => {
	let json2 = _json, def = schema._zod.def;
	json2.type = "array";
	let prefixPath = ctx.target === "draft-2020-12" ? "prefixItems" : "items", restPath = ctx.target === "draft-2020-12" || ctx.target === "openapi-3.0" ? "items" : "additionalItems", prefixItems = def.items.map((x, i) => processSchema(x, ctx, {
		...params,
		path: [...params.path, prefixPath, i]
	})), rest = def.rest ? processSchema(def.rest, ctx, {
		...params,
		path: [...params.path, restPath, ...ctx.target === "openapi-3.0" ? [def.items.length] : []]
	}) : null, minItems = def.items.length;
	for (; minItems > 0; ) {
		let item = def.items[minItems - 1];
		if (!(ctx.io === "input" ? inputOptin(item) !== void 0 : item._zod.optout === "optional"))
			break;
		minItems--;
	}
	let maxItems = def.items.length, isClosed = !def.rest;
	ctx.target === "draft-2020-12" ? (json2.prefixItems = prefixItems, isClosed ? json2.items = !1 : rest && (json2.items = rest), minItems > 0 && (json2.minItems = minItems), isClosed && (json2.maxItems = maxItems)) : ctx.target === "openapi-3.0" ? (json2.items = {
		anyOf: prefixItems
	}, rest && json2.items.anyOf.push(rest), minItems > 0 && (json2.minItems = minItems), isClosed && (json2.maxItems = maxItems)) : (json2.items = prefixItems, isClosed ? json2.additionalItems = !1 : rest && (json2.additionalItems = rest), minItems > 0 && (json2.minItems = minItems), isClosed && (json2.maxItems = maxItems));
	let { minimum, maximum } = aggregateChecks(schema);
	typeof minimum == "number" && (json2.minItems = minimum), typeof maximum == "number" && (json2.maxItems = maximum);
};
function stringifyKeyNames(bySchema, json2, visited) {
	if (json2.$ref) {
		if (visited.has(json2))
			return json2;
		visited.add(json2);
		let def = bySchema.get(json2)?.def;
		if (!def)
			return json2;
		let inlined = stringifyKeyNames(bySchema, def, visited);
		return inlined === def ? json2 : inlined;
	}
	for (let keyword of ["anyOf", "oneOf"]) {
		let branches = json2[keyword];
		if (!Array.isArray(branches))
			continue;
		let mapped = branches.map((branch) => stringifyKeyNames(bySchema, branch, visited));
		mapped.some((branch, i) => branch !== branches[i]) && (json2 = { ...json2, [keyword]: mapped });
	}
	let types = Array.isArray(json2.type) ? json2.type : [json2.type], numericType = !types.includes("string") && types.some((t) => t === "number" || t === "integer"), values = json2.enum ?? (json2.const !== void 0 ? [json2.const] : void 0);
	if (!numericType && !values?.some((v) => typeof v == "number"))
		return json2;
	let { minimum, maximum, exclusiveMinimum, exclusiveMaximum, multipleOf, format, id, ...rest } = json2;
	return rest.enum ? rest.enum = rest.enum.map((v) => typeof v == "number" ? String(v) : v) : typeof rest.const == "number" && (rest.const = String(rest.const)), numericType && (rest.type = "string", values || (rest.pattern = (types.includes("number") ? number : integer).source)), rest;
}
var pendingRecords = /* @__PURE__ */ new WeakMap();
function rewriteKeyNames(ctx) {
	let bySchema = /* @__PURE__ */ new Map();
	for (let entry of ctx.seen.values())
		entry.def && !bySchema.has(entry.schema) && bySchema.set(entry.schema, entry);
	let rewrites = /* @__PURE__ */ new Map();
	for (let record2 of pendingRecords.get(ctx) ?? []) {
		let seen = ctx.seen.get(record2), names = (seen?.def ?? seen?.schema)?.propertyNames;
		if (!names || names === !0 || rewrites.has(names))
			continue;
		let rewritten = stringifyKeyNames(bySchema, names, /* @__PURE__ */ new Set());
		rewritten !== names && rewrites.set(names, rewritten);
	}
	if (rewrites.size)
		for (let entry of ctx.seen.values())
			for (let carrier of [entry.schema, entry.def]) {
				let rewritten = carrier && rewrites.get(carrier.propertyNames);
				rewritten && (carrier.propertyNames = rewritten);
			}
}
var recordProcessor = (schema, ctx, _json, params) => {
	let json2 = _json, def = schema._zod.def;
	json2.type = "object";
	let keyType = def.keyType, patterns = aggregateChecks(keyType).patterns;
	if (def.mode === "loose" && patterns && patterns.size > 0) {
		let valueSchema = processSchema(def.valueType, ctx, {
			...params,
			path: [...params.path, "patternProperties", "*"]
		});
		json2.patternProperties = {};
		for (let pattern of patterns)
			assignProp(json2.patternProperties, exactPattern(pattern).source, valueSchema);
	} else {
		if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") {
			json2.propertyNames = processSchema(def.keyType, ctx, {
				...params,
				path: [...params.path, "propertyNames"]
			});
			let pending = pendingRecords.get(ctx);
			pending || (pending = [], pendingRecords.set(ctx, pending), ctx.deferred.push(() => rewriteKeyNames(ctx))), pending.push(schema);
		}
		json2.additionalProperties = processSchema(def.valueType, ctx, {
			...params,
			path: [...params.path, "additionalProperties"]
		});
	}
	let keyValues = keyType._zod.values, omittableOnInput = ctx.io === "input" && inputOptin(def.valueType) !== void 0;
	if (keyValues && !def.partial && !omittableOnInput) {
		let validKeyValues = [...keyValues].filter((v) => typeof v == "string" || typeof v == "number");
		validKeyValues.length > 0 && (json2.required = validKeyValues.map(String));
	}
}, nullableProcessor = (schema, ctx, json2, params) => {
	let def = schema._zod.def, inner = processSchema(def.innerType, ctx, params), seen = ctx.seen.get(schema);
	ctx.target === "openapi-3.0" ? (seen.ref = def.innerType, json2.nullable = !0) : json2.anyOf = [inner, { type: "null" }];
}, nonoptionalProcessor = (schema, ctx, _json, params) => {
	let def = schema._zod.def;
	processSchema(def.innerType, ctx, params);
	let seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
}, UNREPRESENTABLE_DEFAULT = /* @__PURE__ */ Symbol();
function serializeDefaultValue(value, schema, ctx, json2, params) {
	let unrepresentable = !1, serialized = JSON.stringify(value, (_, val) => typeof val != "bigint" ? val : (unrepresentable = !0, null));
	return unrepresentable ? (handleUnrepresentable(schema, ctx, json2, params, "BigInt defaults cannot be represented in JSON Schema"), UNREPRESENTABLE_DEFAULT) : JSON.parse(serialized);
}
var defaultProcessor = (schema, ctx, json2, params) => {
	let def = schema._zod.def;
	processSchema(def.innerType, ctx, params);
	let seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	let value = serializeDefaultValue(def.defaultValue, schema, ctx, json2, params);
	value !== UNREPRESENTABLE_DEFAULT && (json2.default = value);
}, prefaultProcessor = (schema, ctx, json2, params) => {
	let def = schema._zod.def;
	processSchema(def.innerType, ctx, params);
	let seen = ctx.seen.get(schema);
	if (seen.ref = def.innerType, ctx.io !== "input")
		return;
	let value = serializeDefaultValue(def.defaultValue, schema, ctx, json2, params);
	value !== UNREPRESENTABLE_DEFAULT && (json2._prefault = value);
}, catchProcessor = (schema, ctx, json2, params) => {
	let def = schema._zod.def;
	processSchema(def.innerType, ctx, params);
	let seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	let catchValue;
	try {
		catchValue = def.catchValue(void 0);
	} catch {
		handleUnrepresentable(schema, ctx, json2, params, "Dynamic catch values are not supported in JSON Schema");
		return;
	}
	json2.default = catchValue;
}, pipeProcessor = (schema, ctx, _json, params) => {
	let def = schema._zod.def, inIsTransform = def.in._zod.traits.has("$ZodTransform"), innerType = ctx.io === "input" ? inIsTransform ? def.out : def.in : def.out;
	processSchema(innerType, ctx, params);
	let seen = ctx.seen.get(schema);
	seen.ref = innerType;
}, readonlyProcessor = (schema, ctx, json2, params) => {
	let def = schema._zod.def;
	processSchema(def.innerType, ctx, params);
	let seen = ctx.seen.get(schema);
	seen.ref = def.innerType, json2.readOnly = !0;
}, promiseProcessor = (schema, ctx, _json, params) => {
	let def = schema._zod.def;
	processSchema(def.innerType, ctx, params);
	let seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
}, optionalProcessor = (schema, ctx, _json, params) => {
	let def = schema._zod.def;
	processSchema(def.innerType, ctx, params);
	let seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
}, lazyProcessor = (schema, ctx, _json, params) => {
	let innerType = schema._zod.innerType;
	processSchema(innerType, ctx, params);
	let seen = ctx.seen.get(schema);
	seen.ref = innerType;
}, allProcessors = {
	string: stringProcessor,
	number: numberProcessor,
	boolean: booleanProcessor,
	bigint: bigintProcessor,
	symbol: symbolProcessor,
	null: nullProcessor,
	undefined: undefinedProcessor,
	void: voidProcessor,
	never: neverProcessor,
	any: anyProcessor,
	unknown: unknownProcessor,
	date: dateProcessor,
	enum: enumProcessor,
	literal: literalProcessor,
	nan: nanProcessor,
	template_literal: templateLiteralProcessor,
	file: fileProcessor,
	success: successProcessor,
	custom: customProcessor,
	function: functionProcessor,
	transform: transformProcessor,
	map: mapProcessor,
	set: setProcessor,
	array: arrayProcessor,
	object: objectProcessor,
	union: unionProcessor,
	intersection: intersectionProcessor,
	tuple: tupleProcessor,
	record: recordProcessor,
	nullable: nullableProcessor,
	nonoptional: nonoptionalProcessor,
	default: defaultProcessor,
	prefault: prefaultProcessor,
	catch: catchProcessor,
	pipe: pipeProcessor,
	readonly: readonlyProcessor,
	promise: promiseProcessor,
	optional: optionalProcessor,
	lazy: lazyProcessor
};
function toJSONSchema(input2, params) {
	if ("_idmap" in input2) {
		let registry2 = input2, ctx2 = initializeContext({ ...params, processors: allProcessors }), defs = {};
		for (let entry of registry2._idmap.entries()) {
			let [_, schema] = entry;
			processSchema(schema, ctx2);
		}
		let schemas = {}, external = {
			registry: registry2,
			uri: params?.uri,
			defs
		};
		ctx2.external = external;
		for (let entry of registry2._idmap.entries()) {
			let [key, schema] = entry;
			extractDefs(ctx2, schema), assignProp(schemas, key, finalize(ctx2, schema));
		}
		if (Object.keys(defs).length > 0) {
			let defsSegment = ctx2.target === "draft-2020-12" ? "$defs" : "definitions";
			schemas.__shared = {
				[defsSegment]: defs
			};
		}
		return { schemas };
	}
	let ctx = initializeContext({ ...params, processors: allProcessors });
	return processSchema(input2, ctx), extractDefs(ctx, input2), finalize(ctx, input2);
}

// ../code/node_modules/zod/v4/core/index.js
var core_exports = {};
__export(core_exports, {
	$ZodAny: () => $ZodAny,
	$ZodArray: () => $ZodArray,
	$ZodAsyncError: () => $ZodAsyncError,
	$ZodBase64: () => $ZodBase64,
	$ZodBase64URL: () => $ZodBase64URL,
	$ZodBigInt: () => $ZodBigInt,
	$ZodBigIntFormat: () => $ZodBigIntFormat,
	$ZodBoolean: () => $ZodBoolean,
	$ZodCIDRv4: () => $ZodCIDRv4,
	$ZodCIDRv6: () => $ZodCIDRv6,
	$ZodCUID: () => $ZodCUID,
	$ZodCUID2: () => $ZodCUID2,
	$ZodCatch: () => $ZodCatch,
	$ZodCheck: () => $ZodCheck,
	$ZodCheckBigIntFormat: () => $ZodCheckBigIntFormat,
	$ZodCheckEndsWith: () => $ZodCheckEndsWith,
	$ZodCheckGreaterThan: () => $ZodCheckGreaterThan,
	$ZodCheckIncludes: () => $ZodCheckIncludes,
	$ZodCheckLengthEquals: () => $ZodCheckLengthEquals,
	$ZodCheckLessThan: () => $ZodCheckLessThan,
	$ZodCheckLowerCase: () => $ZodCheckLowerCase,
	$ZodCheckMaxLength: () => $ZodCheckMaxLength,
	$ZodCheckMaxSize: () => $ZodCheckMaxSize,
	$ZodCheckMimeType: () => $ZodCheckMimeType,
	$ZodCheckMinLength: () => $ZodCheckMinLength,
	$ZodCheckMinSize: () => $ZodCheckMinSize,
	$ZodCheckMultipleOf: () => $ZodCheckMultipleOf,
	$ZodCheckNumberFormat: () => $ZodCheckNumberFormat,
	$ZodCheckOverwrite: () => $ZodCheckOverwrite,
	$ZodCheckProperties: () => $ZodCheckProperties,
	$ZodCheckProperty: () => $ZodCheckProperty,
	$ZodCheckRegex: () => $ZodCheckRegex,
	$ZodCheckSizeEquals: () => $ZodCheckSizeEquals,
	$ZodCheckStartsWith: () => $ZodCheckStartsWith,
	$ZodCheckStringFormat: () => $ZodCheckStringFormat,
	$ZodCheckUpperCase: () => $ZodCheckUpperCase,
	$ZodCodec: () => $ZodCodec,
	$ZodCreditCard: () => $ZodCreditCard,
	$ZodCustom: () => $ZodCustom,
	$ZodCustomStringFormat: () => $ZodCustomStringFormat,
	$ZodCyclicError: () => $ZodCyclicError,
	$ZodDate: () => $ZodDate,
	$ZodDefault: () => $ZodDefault,
	$ZodDiscriminatedUnion: () => $ZodDiscriminatedUnion,
	$ZodE164: () => $ZodE164,
	$ZodEmail: () => $ZodEmail,
	$ZodEmoji: () => $ZodEmoji,
	$ZodEncodeError: () => $ZodEncodeError,
	$ZodEnum: () => $ZodEnum,
	$ZodError: () => $ZodError,
	$ZodExactOptional: () => $ZodExactOptional,
	$ZodFile: () => $ZodFile,
	$ZodFunction: () => $ZodFunction,
	$ZodGUID: () => $ZodGUID,
	$ZodIBAN: () => $ZodIBAN,
	$ZodIPv4: () => $ZodIPv4,
	$ZodIPv6: () => $ZodIPv6,
	$ZodISODate: () => $ZodISODate,
	$ZodISODateTime: () => $ZodISODateTime,
	$ZodISODuration: () => $ZodISODuration,
	$ZodISOTime: () => $ZodISOTime,
	$ZodIntersection: () => $ZodIntersection,
	$ZodJWT: () => $ZodJWT,
	$ZodKSUID: () => $ZodKSUID,
	$ZodLazy: () => $ZodLazy,
	$ZodLiteral: () => $ZodLiteral,
	$ZodMAC: () => $ZodMAC,
	$ZodMap: () => $ZodMap,
	$ZodNaN: () => $ZodNaN,
	$ZodNanoID: () => $ZodNanoID,
	$ZodNever: () => $ZodNever,
	$ZodNonOptional: () => $ZodNonOptional,
	$ZodNull: () => $ZodNull,
	$ZodNullable: () => $ZodNullable,
	$ZodNumber: () => $ZodNumber,
	$ZodNumberFormat: () => $ZodNumberFormat,
	$ZodObject: () => $ZodObject,
	$ZodObjectJIT: () => $ZodObjectJIT,
	$ZodOptional: () => $ZodOptional,
	$ZodPipe: () => $ZodPipe,
	$ZodPrefault: () => $ZodPrefault,
	$ZodPreprocess: () => $ZodPreprocess,
	$ZodPromise: () => $ZodPromise,
	$ZodReadonly: () => $ZodReadonly,
	$ZodRealError: () => $ZodRealError,
	$ZodRecord: () => $ZodRecord,
	$ZodRegistry: () => $ZodRegistry,
	$ZodSet: () => $ZodSet,
	$ZodString: () => $ZodString,
	$ZodStringFormat: () => $ZodStringFormat,
	$ZodSuccess: () => $ZodSuccess,
	$ZodSymbol: () => $ZodSymbol,
	$ZodTemplateLiteral: () => $ZodTemplateLiteral,
	$ZodTransform: () => $ZodTransform,
	$ZodTuple: () => $ZodTuple,
	$ZodType: () => $ZodType,
	$ZodULID: () => $ZodULID,
	$ZodURL: () => $ZodURL,
	$ZodUUID: () => $ZodUUID,
	$ZodUndefined: () => $ZodUndefined,
	$ZodUnion: () => $ZodUnion,
	$ZodUnknown: () => $ZodUnknown,
	$ZodVoid: () => $ZodVoid,
	$ZodXID: () => $ZodXID,
	$ZodXor: () => $ZodXor,
	$brand: () => $brand,
	$constructor: () => $constructor,
	$input: () => $input,
	$output: () => $output,
	Doc: () => Doc,
	INVALID: () => INVALID,
	JSONSchema: () => json_schema_exports,
	JSONSchemaGenerator: () => JSONSchemaGenerator,
	NEVER: () => NEVER,
	TimePrecision: () => TimePrecision,
	URL_BAD_FORMAT: () => URL_BAD_FORMAT,
	URL_UNPARSEABLE: () => URL_UNPARSEABLE,
	ZodCompileAsyncError: () => ZodCompileAsyncError,
	ZodCompileUnsupportedError: () => ZodCompileUnsupportedError,
	_any: () => _any,
	_array: () => _array,
	_base64: () => _base64,
	_base64url: () => _base64url,
	_bigint: () => _bigint,
	_boolean: () => _boolean,
	_catch: () => _catch,
	_check: () => _check,
	_cidrv4: () => _cidrv4,
	_cidrv6: () => _cidrv6,
	_coercedBigint: () => _coercedBigint,
	_coercedBoolean: () => _coercedBoolean,
	_coercedDate: () => _coercedDate,
	_coercedNumber: () => _coercedNumber,
	_coercedString: () => _coercedString,
	_creditCard: () => _creditCard,
	_cuid: () => _cuid,
	_cuid2: () => _cuid2,
	_custom: () => _custom,
	_date: () => _date,
	_decode: () => _decode,
	_decodeAsync: () => _decodeAsync,
	_default: () => _default,
	_discriminatedUnion: () => _discriminatedUnion,
	_e164: () => _e164,
	_email: () => _email,
	_emoji: () => _emoji,
	_encode: () => _encode,
	_encodeAsync: () => _encodeAsync,
	_endsWith: () => _endsWith,
	_enum: () => _enum,
	_file: () => _file,
	_float32: () => _float32,
	_float64: () => _float64,
	_gt: () => _gt,
	_gte: () => _gte,
	_guid: () => _guid,
	_iban: () => _iban,
	_includes: () => _includes,
	_int: () => _int,
	_int32: () => _int32,
	_int64: () => _int64,
	_intersection: () => _intersection,
	_ipv4: () => _ipv4,
	_ipv6: () => _ipv6,
	_isoDate: () => _isoDate,
	_isoDateTime: () => _isoDateTime,
	_isoDuration: () => _isoDuration,
	_isoTime: () => _isoTime,
	_jwt: () => _jwt,
	_ksuid: () => _ksuid,
	_lazy: () => _lazy,
	_length: () => _length,
	_literal: () => _literal,
	_lowercase: () => _lowercase,
	_lt: () => _lt,
	_lte: () => _lte,
	_mac: () => _mac,
	_map: () => _map,
	_max: () => _lte,
	_maxLength: () => _maxLength,
	_maxSize: () => _maxSize,
	_mime: () => _mime,
	_min: () => _gte,
	_minLength: () => _minLength,
	_minSize: () => _minSize,
	_multipleOf: () => _multipleOf,
	_nan: () => _nan,
	_nanoid: () => _nanoid,
	_nativeEnum: () => _nativeEnum,
	_negative: () => _negative,
	_never: () => _never,
	_nonnegative: () => _nonnegative,
	_nonoptional: () => _nonoptional,
	_nonpositive: () => _nonpositive,
	_normalize: () => _normalize,
	_null: () => _null,
	_nullable: () => _nullable,
	_number: () => _number,
	_optional: () => _optional,
	_overwrite: () => _overwrite,
	_parse: () => _parse,
	_parseAsync: () => _parseAsync,
	_pipe: () => _pipe,
	_positive: () => _positive,
	_promise: () => _promise,
	_properties: () => _properties,
	_property: () => _property,
	_readonly: () => _readonly,
	_record: () => _record,
	_refine: () => _refine,
	_regex: () => _regex,
	_safeDecode: () => _safeDecode,
	_safeDecodeAsync: () => _safeDecodeAsync,
	_safeEncode: () => _safeEncode,
	_safeEncodeAsync: () => _safeEncodeAsync,
	_safeParse: () => _safeParse,
	_safeParseAsync: () => _safeParseAsync,
	_set: () => _set,
	_size: () => _size,
	_slugify: () => _slugify,
	_startsWith: () => _startsWith,
	_string: () => _string,
	_stringFormat: () => _stringFormat,
	_stringbool: () => _stringbool,
	_success: () => _success,
	_superRefine: () => _superRefine,
	_symbol: () => _symbol,
	_templateLiteral: () => _templateLiteral,
	_toLowerCase: () => _toLowerCase,
	_toUpperCase: () => _toUpperCase,
	_transform: () => _transform,
	_trim: () => _trim,
	_tuple: () => _tuple,
	_uint32: () => _uint32,
	_uint64: () => _uint64,
	_ulid: () => _ulid,
	_undefined: () => _undefined,
	_union: () => _union,
	_unknown: () => _unknown,
	_uppercase: () => _uppercase,
	_url: () => _url,
	_uuid: () => _uuid,
	_uuidv4: () => _uuidv4,
	_uuidv6: () => _uuidv6,
	_uuidv7: () => _uuidv7,
	_void: () => _void,
	_xid: () => _xid,
	_xor: () => _xor,
	base64Charset: () => base64Charset,
	base64urlCharset: () => base64urlCharset,
	canParseURL: () => canParseURL,
	clone: () => clone,
	compile: () => compile,
	compileFn: () => compileFn,
	config: () => config,
	createStandardJSONSchemaMethod: () => createStandardJSONSchemaMethod,
	createToJSONSchemaMethod: () => createToJSONSchemaMethod,
	decode: () => decode,
	decodeAsync: () => decodeAsync,
	describe: () => describe,
	encode: () => encode,
	encodeAsync: () => encodeAsync,
	extractDefs: () => extractDefs,
	finalize: () => finalize,
	flattenError: () => flattenError,
	formatError: () => formatError,
	getDiscriminatedOption: () => getDiscriminatedOption,
	globalConfig: () => globalConfig,
	globalRegistry: () => globalRegistry,
	handleUnrepresentable: () => handleUnrepresentable,
	initializeContext: () => initializeContext,
	isBackEdge: () => isBackEdge,
	isRecursiveSchema: () => isRecursiveSchema,
	isValidBase64: () => isValidBase64,
	isValidBase64URL: () => isValidBase64URL,
	isValidCIDRv6: () => isValidCIDRv6,
	isValidCreditCard: () => isValidCreditCard,
	isValidIBAN: () => isValidIBAN,
	isValidIPv6: () => isValidIPv6,
	isValidJWT: () => isValidJWT,
	locales: () => locales_exports,
	memoizer: () => memoizer,
	mergeValues: () => mergeValues,
	meta: () => meta,
	parse: () => parse,
	parseAsync: () => parseAsync,
	parseURLObject: () => parseURLObject,
	prettifyError: () => prettifyError,
	process: () => processSchema,
	processSchema: () => processSchema,
	regexes: () => regexes_exports,
	registry: () => registry,
	safeDecode: () => safeDecode,
	safeDecodeAsync: () => safeDecodeAsync,
	safeEncode: () => safeEncode,
	safeEncodeAsync: () => safeEncodeAsync,
	safeParse: () => safeParse,
	safeParseAsync: () => safeParseAsync,
	standardProps: () => standardProps,
	stripTabAndNewline: () => stripTabAndNewline,
	toDotPath: () => toDotPath,
	toJSONSchema: () => toJSONSchema,
	toZod: () => toZod,
	treeifyError: () => treeifyError,
	urlHostnameOk: () => urlHostnameOk,
	urlProtocolOk: () => urlProtocolOk,
	util: () => util_exports,
	validate: () => validate,
	validateAsync: () => validateAsync,
	validateURL: () => validateURL,
	version: () => version,
	withParser: () => withParser
});

// ../code/node_modules/zod/v4/core/json-schema-generator.js
var JSONSchemaGenerator = class {
	/** @deprecated Access via ctx instead */
	get metadataRegistry() {
		return this.ctx.metadataRegistry;
	}
	/** @deprecated Access via ctx instead */
	get target() {
		return this.ctx.target;
	}
	// annotated so the .d.cts emits an indexed access rather than an inline `import()` of an ESM path
	/** @deprecated Access via ctx instead */
	get unrepresentable() {
		return this.ctx.unrepresentable;
	}
	/** @deprecated Access via ctx instead */
	get override() {
		return this.ctx.override;
	}
	/** @deprecated Access via ctx instead */
	get io() {
		return this.ctx.io;
	}
	/** @deprecated Access via ctx instead */
	get counter() {
		return this.ctx.counter;
	}
	set counter(value) {
		this.ctx.counter = value;
	}
	/** @deprecated Access via ctx instead */
	get seen() {
		return this.ctx.seen;
	}
	constructor(params) {
		let normalizedTarget = params?.target ?? "draft-2020-12";
		normalizedTarget === "draft-4" && (normalizedTarget = "draft-04"), normalizedTarget === "draft-7" && (normalizedTarget = "draft-07"), this.ctx = initializeContext({
			processors: allProcessors,
			target: normalizedTarget,
			...params?.metadata && { metadata: params.metadata },
			...params?.unrepresentable && { unrepresentable: params.unrepresentable },
			...params?.override && { override: params.override },
			...params?.io && { io: params.io }
		});
	}
	/**
	 * Process a schema to prepare it for JSON Schema generation.
	 * This must be called before emit().
	 */
	process(schema, _params = { path: [], schemaPath: [] }) {
		return processSchema(schema, this.ctx, _params);
	}
	/**
	 * Emit the final JSON Schema after processing.
	 * Must call process() first.
	 */
	emit(schema, _params) {
		_params && (_params.cycles && (this.ctx.cycles = _params.cycles), _params.reused && (this.ctx.reused = _params.reused), _params.external && (this.ctx.external = _params.external)), this.ctx.sharedDefsExtractedFor = void 0, this.ctx.sharedEmitDoneFor = void 0, extractDefs(this.ctx, schema);
		let result = finalize(this.ctx, schema), { "~standard": _, ...plainResult } = result;
		return plainResult;
	}
};

// ../code/node_modules/zod/v4/core/json-schema.js
var json_schema_exports = {};

// ../code/node_modules/zod/v4/classic/checks.js
var checks_exports2 = {};
__export(checks_exports2, {
	endsWith: () => _endsWith,
	gt: () => _gt,
	gte: () => _gte,
	includes: () => _includes,
	length: () => _length,
	lowercase: () => _lowercase,
	lt: () => _lt,
	lte: () => _lte,
	maxLength: () => _maxLength,
	maxSize: () => _maxSize,
	mime: () => _mime,
	minLength: () => _minLength,
	minSize: () => _minSize,
	multipleOf: () => _multipleOf,
	negative: () => _negative,
	nonnegative: () => _nonnegative,
	nonpositive: () => _nonpositive,
	normalize: () => _normalize,
	overwrite: () => _overwrite,
	positive: () => _positive,
	properties: () => _properties,
	property: () => _property,
	regex: () => _regex,
	size: () => _size,
	slugify: () => _slugify,
	startsWith: () => _startsWith,
	toLowerCase: () => _toLowerCase,
	toUpperCase: () => _toUpperCase,
	trim: () => _trim,
	uppercase: () => _uppercase
});

// ../code/node_modules/zod/v4/classic/errors.js
var _installedErrorProtos = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
function _lazyMethod(proto, key, make) {
	Object.defineProperty(proto, key, {
		configurable: !0,
		enumerable: !1,
		get() {
			let value = make(this);
			return Object.defineProperty(this, key, { value, configurable: !0, writable: !0 }), value;
		},
		set(value) {
			Object.defineProperty(this, key, { value, configurable: !0, writable: !0 });
		}
	});
}
var initializer = (inst, issues) => {
	$ZodError.init(inst, issues), inst.name = "ZodError";
	let proto = Object.getPrototypeOf(inst);
	_installedErrorProtos.has(proto) || (_installedErrorProtos.add(proto), _lazyMethod(proto, "format", (self) => (mapper) => formatError(self, mapper)), _lazyMethod(proto, "flatten", (self) => (mapper) => flattenError(self, mapper)), _lazyMethod(proto, "addIssue", (self) => (issue2) => {
		self.issues.push(issue2), self.message = JSON.stringify(self.issues, jsonStringifyReplacer, 2);
	}), _lazyMethod(proto, "addIssues", (self) => (issues2) => {
		self.issues.push(...issues2), self.message = JSON.stringify(self.issues, jsonStringifyReplacer, 2);
	}), Object.defineProperty(proto, "isEmpty", {
		configurable: !0,
		enumerable: !1,
		get() {
			return this.issues.length === 0;
		}
	}));
}, ZodError = /* @__PURE__ */ $constructor("ZodError", initializer), ZodRealError = /* @__PURE__ */ $constructor("ZodError", initializer, void 0, {
	Parent: Error
});

// ../code/node_modules/zod/v4/classic/parse.js
var parse2 = /* @__PURE__ */ _parse(ZodRealError), parseAsync2 = /* @__PURE__ */ _parseAsync(ZodRealError), safeParse2 = /* @__PURE__ */ _safeParse(ZodRealError), safeParseAsync2 = /* @__PURE__ */ _safeParseAsync(ZodRealError), encode2 = /* @__PURE__ */ _encode(ZodRealError), decode2 = /* @__PURE__ */ _decode(ZodRealError), encodeAsync2 = /* @__PURE__ */ _encodeAsync(ZodRealError), decodeAsync2 = /* @__PURE__ */ _decodeAsync(ZodRealError), safeEncode2 = /* @__PURE__ */ _safeEncode(ZodRealError), safeDecode2 = /* @__PURE__ */ _safeDecode(ZodRealError), safeEncodeAsync2 = /* @__PURE__ */ _safeEncodeAsync(ZodRealError), safeDecodeAsync2 = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);

// ../code/node_modules/zod/v4/classic/schemas.js
var schemas_exports2 = {};
__export(schemas_exports2, {
	ZodAny: () => ZodAny,
	ZodArray: () => ZodArray,
	ZodBase64: () => ZodBase64,
	ZodBase64URL: () => ZodBase64URL,
	ZodBigInt: () => ZodBigInt,
	ZodBigIntFormat: () => ZodBigIntFormat,
	ZodBoolean: () => ZodBoolean,
	ZodCIDRv4: () => ZodCIDRv4,
	ZodCIDRv6: () => ZodCIDRv6,
	ZodCUID: () => ZodCUID,
	ZodCUID2: () => ZodCUID2,
	ZodCatch: () => ZodCatch,
	ZodCodec: () => ZodCodec,
	ZodCreditCard: () => ZodCreditCard,
	ZodCustom: () => ZodCustom,
	ZodCustomStringFormat: () => ZodCustomStringFormat,
	ZodDate: () => ZodDate,
	ZodDefault: () => ZodDefault,
	ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
	ZodE164: () => ZodE164,
	ZodEmail: () => ZodEmail,
	ZodEmoji: () => ZodEmoji,
	ZodEnum: () => ZodEnum,
	ZodExactOptional: () => ZodExactOptional,
	ZodFile: () => ZodFile,
	ZodFunction: () => ZodFunction,
	ZodGUID: () => ZodGUID,
	ZodIBAN: () => ZodIBAN,
	ZodIPv4: () => ZodIPv4,
	ZodIPv6: () => ZodIPv6,
	ZodISODate: () => ZodISODate,
	ZodISODateTime: () => ZodISODateTime,
	ZodISODuration: () => ZodISODuration,
	ZodISOTime: () => ZodISOTime,
	ZodInstanceOf: () => ZodInstanceOf,
	ZodIntersection: () => ZodIntersection,
	ZodJWT: () => ZodJWT,
	ZodKSUID: () => ZodKSUID,
	ZodLazy: () => ZodLazy,
	ZodLiteral: () => ZodLiteral,
	ZodMAC: () => ZodMAC,
	ZodMap: () => ZodMap,
	ZodNaN: () => ZodNaN,
	ZodNanoID: () => ZodNanoID,
	ZodNever: () => ZodNever,
	ZodNonOptional: () => ZodNonOptional,
	ZodNull: () => ZodNull,
	ZodNullable: () => ZodNullable,
	ZodNumber: () => ZodNumber,
	ZodNumberFormat: () => ZodNumberFormat,
	ZodObject: () => ZodObject,
	ZodOptional: () => ZodOptional,
	ZodPipe: () => ZodPipe,
	ZodPrefault: () => ZodPrefault,
	ZodPreprocess: () => ZodPreprocess,
	ZodPromise: () => ZodPromise,
	ZodReadonly: () => ZodReadonly,
	ZodRecord: () => ZodRecord,
	ZodSet: () => ZodSet,
	ZodString: () => ZodString,
	ZodStringFormat: () => ZodStringFormat,
	ZodSuccess: () => ZodSuccess,
	ZodSymbol: () => ZodSymbol,
	ZodTemplateLiteral: () => ZodTemplateLiteral,
	ZodTransform: () => ZodTransform,
	ZodTuple: () => ZodTuple,
	ZodType: () => ZodType,
	ZodULID: () => ZodULID,
	ZodURL: () => ZodURL,
	ZodUUID: () => ZodUUID,
	ZodUndefined: () => ZodUndefined,
	ZodUnion: () => ZodUnion,
	ZodUnknown: () => ZodUnknown,
	ZodVoid: () => ZodVoid,
	ZodXID: () => ZodXID,
	ZodXor: () => ZodXor,
	_ZodString: () => _ZodString,
	_default: () => _default2,
	_function: () => _function,
	any: () => any,
	array: () => array,
	base64: () => base642,
	base64url: () => base64url2,
	bigint: () => bigint,
	boolean: () => boolean,
	catch: () => _catch2,
	check: () => check,
	cidrv4: () => cidrv4,
	cidrv6: () => cidrv6,
	codec: () => codec,
	creditCard: () => creditCard,
	cuid: () => cuid,
	cuid2: () => cuid2,
	currencyCode: () => currencyCode2,
	custom: () => custom,
	date: () => date,
	describe: () => describe2,
	discriminatedUnion: () => discriminatedUnion,
	e164: () => e164,
	email: () => email,
	emoji: () => emoji,
	enum: () => _enum2,
	exactOptional: () => exactOptional,
	file: () => file,
	float32: () => float32,
	float64: () => float64,
	function: () => _function,
	guid: () => guid,
	hash: () => hash,
	hex: () => hex2,
	hostname: () => hostname2,
	httpUrl: () => httpUrl,
	iban: () => iban,
	instanceof: () => _instanceof,
	int: () => int,
	int32: () => int32,
	int64: () => int64,
	intersection: () => intersection,
	invertCodec: () => invertCodec,
	ipv4: () => ipv4,
	ipv6: () => ipv6,
	json: () => json,
	jwt: () => jwt,
	keyof: () => keyof,
	ksuid: () => ksuid,
	lazy: () => lazy,
	literal: () => literal,
	looseObject: () => looseObject,
	looseRecord: () => looseRecord,
	mac: () => mac,
	map: () => map,
	meta: () => meta2,
	nan: () => nan,
	nanoid: () => nanoid,
	nativeEnum: () => nativeEnum,
	never: () => never,
	nonoptional: () => nonoptional,
	null: () => _null2,
	nullable: () => nullable,
	nullish: () => nullish,
	number: () => number2,
	object: () => object,
	optional: () => optional,
	partialRecord: () => partialRecord,
	pipe: () => pipe,
	prefault: () => prefault,
	preprocess: () => preprocess,
	promise: () => promise,
	readonly: () => readonly,
	record: () => record,
	refine: () => refine,
	set: () => set,
	strictObject: () => strictObject,
	string: () => string,
	stringFormat: () => stringFormat,
	stringbool: () => stringbool,
	success: () => success,
	superRefine: () => superRefine,
	symbol: () => symbol,
	templateLiteral: () => templateLiteral,
	transform: () => transform,
	tuple: () => tuple,
	uint32: () => uint32,
	uint64: () => uint64,
	ulid: () => ulid,
	undefined: () => _undefined2,
	union: () => union,
	unknown: () => unknown,
	url: () => url,
	uuid: () => uuid,
	uuidv4: () => uuidv4,
	uuidv6: () => uuidv6,
	uuidv7: () => uuidv7,
	void: () => _void2,
	xid: () => xid,
	xor: () => xor
});
function _ensureDefaultLocale() {
	globalConfig.localeError || config(en_default());
}
function _ensureDefaultMemoizer() {
	globalConfig.memoizer || config({ memoizer: memoizer() });
}
var ZodType = /* @__PURE__ */ $constructor("ZodType", (inst, def) => (_ensureDefaultLocale(), $ZodType.init(inst, def), inst.def = def, inst.type = def.type, inst), {
	check(...chks) {
		let def = this.def;
		return this.clone(util_exports.mergeDefs(def, {
			checks: [
				...def.checks ?? [],
				...chks.map((ch) => typeof ch == "function" ? { _zod: { check: ch, def: { check: "custom" }, onattach: [] } } : ch)
			]
		}), { parent: !0 });
	},
	with(...chks) {
		return this.check(...chks);
	},
	clone(def, params) {
		return clone(this, def, params);
	},
	brand() {
		return this;
	},
	register(reg, meta3) {
		return reg.add(this, meta3), this;
	},
	refine(check2, params) {
		return this.check(refine(check2, params));
	},
	superRefine(refinement, params) {
		return this.check(superRefine(refinement, params));
	},
	overwrite(fn) {
		return this.check(_overwrite(fn));
	},
	optional() {
		return optional(this);
	},
	exactOptional() {
		return exactOptional(this);
	},
	nullable() {
		return nullable(this);
	},
	nullish() {
		return optional(nullable(this));
	},
	nonoptional(params) {
		return nonoptional(this, params);
	},
	array() {
		return array(this);
	},
	or(arg) {
		return union([this, arg]);
	},
	and(arg) {
		return intersection(this, arg);
	},
	transform(tx) {
		return pipe(this, transform(tx));
	},
	default(d) {
		return _default2(this, d);
	},
	prefault(d) {
		return prefault(this, d);
	},
	catch(params) {
		return _catch2(this, params);
	},
	pipe(target) {
		return pipe(this, target);
	},
	readonly() {
		return readonly(this);
	},
	describe(description) {
		let cl = this.clone();
		return globalRegistry.add(cl, { description }), cl;
	},
	meta(...args) {
		if (args.length === 0)
			return globalRegistry.get(this);
		let cl = this.clone();
		return globalRegistry.add(cl, args[0]), cl;
	},
	isOptional() {
		return this.safeParse(void 0).success;
	},
	isNullable() {
		return this.safeParse(null).success;
	},
	apply(fn, ...args) {
		return args.length === 0 ? fn(this) : fn(this, ...args);
	},
	// Overrides core's `~standard` to add `jsonSchema`. Must stay a prototype entry: redefining it per instance demotes instances to dictionary mode.
	get "~standard"() {
		return util_exports.hide(this, "~standard", {
			...standardProps(this),
			jsonSchema: {
				input: createStandardJSONSchemaMethod(this, "input"),
				output: createStandardJSONSchemaMethod(this, "output")
			}
		});
	},
	set "~standard"(value) {
		util_exports.own(this, "~standard", value);
	},
	parse: function _parse2(data, params) {
		return parse2(this, data, params, { callee: _parse2 });
	},
	parseAsync: async function _parseAsync2(data, params) {
		return await parseAsync2(this, data, params, { callee: _parseAsync2 });
	},
	safeParse(data, params) {
		return safeParse2(this, data, params);
	},
	async safeParseAsync(data, params) {
		return safeParseAsync2(this, data, params);
	},
	// `spa` is an alias: same function object as `safeParseAsync`, as before.
	get spa() {
		return this?.safeParseAsync;
	},
	set spa(value) {
		util_exports.own(this, "spa", value);
	},
	validate(data, params) {
		return validate(this, data, params);
	},
	validateAsync(data, params) {
		return validateAsync(this, data, params);
	},
	encode: function _encode2(data, params) {
		return encode2(this, data, params, { callee: _encode2 });
	},
	decode: function _decode2(data, params) {
		return decode2(this, data, params, { callee: _decode2 });
	},
	encodeAsync: async function _encodeAsync2(data, params) {
		return await encodeAsync2(this, data, params, { callee: _encodeAsync2 });
	},
	decodeAsync: async function _decodeAsync2(data, params) {
		return await decodeAsync2(this, data, params, { callee: _decodeAsync2 });
	},
	safeEncode(data, params) {
		return safeEncode2(this, data, params);
	},
	safeDecode(data, params) {
		return safeDecode2(this, data, params);
	},
	async safeEncodeAsync(data, params) {
		return safeEncodeAsync2(this, data, params);
	},
	async safeDecodeAsync(data, params) {
		return safeDecodeAsync2(this, data, params);
	},
	toJSONSchema(params) {
		return createToJSONSchemaMethod(this, {})(params);
	},
	// Reads through to the registry on every access, so it must not cache.
	get description() {
		return globalRegistry.get(this)?.description;
	},
	// No setter: `schema._def = x` throws, as it did when `_def` was a non-writable own property.
	get _def() {
		return this._zod.def;
	}
}), _ZodString = /* @__PURE__ */ $constructor(
	"_ZodString",
	(inst, def) => {
		$ZodString.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => stringProcessor(inst, ctx, json2, params);
	},
	/* @__PURE__ */ util_exports.derived({
		format: (inst) => aggregateChecks(inst).format ?? null,
		minLength: (inst) => aggregateChecks(inst).minimum ?? null,
		maxLength: (inst) => aggregateChecks(inst).maximum ?? null
	}, {
		regex(...args) {
			return this.check(_regex(...args));
		},
		includes(...args) {
			return this.check(_includes(...args));
		},
		startsWith(...args) {
			return this.check(_startsWith(...args));
		},
		endsWith(...args) {
			return this.check(_endsWith(...args));
		},
		min(...args) {
			return this.check(_minLength(...args));
		},
		max(...args) {
			return this.check(_maxLength(...args));
		},
		length(...args) {
			return this.check(_length(...args));
		},
		nonempty(...args) {
			return this.check(_minLength(1, ...args));
		},
		lowercase(params) {
			return this.check(_lowercase(params));
		},
		uppercase(params) {
			return this.check(_uppercase(params));
		},
		trim() {
			return this.check(_trim());
		},
		normalize(...args) {
			return this.check(_normalize(...args));
		},
		toLowerCase() {
			return this.check(_toLowerCase());
		},
		toUpperCase() {
			return this.check(_toUpperCase());
		},
		slugify() {
			return this.check(_slugify());
		}
	})
), ZodString = /* @__PURE__ */ $constructor("ZodString", (inst, def) => {
	$ZodString.init(inst, def), _ZodString.init(inst, def);
}, {
	email(params) {
		return this.check(_email(ZodEmail, params));
	},
	url(params) {
		return this.check(_url(ZodURL, params));
	},
	jwt(params) {
		return this.check(_jwt(ZodJWT, params));
	},
	emoji(params) {
		return this.check(_emoji(ZodEmoji, params));
	},
	guid(params) {
		return this.check(_guid(ZodGUID, params));
	},
	uuid(params) {
		return this.check(_uuid(ZodUUID, params));
	},
	uuidv4(params) {
		return this.check(_uuidv4(ZodUUID, params));
	},
	uuidv6(params) {
		return this.check(_uuidv6(ZodUUID, params));
	},
	uuidv7(params) {
		return this.check(_uuidv7(ZodUUID, params));
	},
	nanoid(params) {
		return this.check(_nanoid(ZodNanoID, params));
	},
	cuid(params) {
		return this.check(_cuid(ZodCUID, params));
	},
	cuid2(params) {
		return this.check(_cuid2(ZodCUID2, params));
	},
	ulid(params) {
		return this.check(_ulid(ZodULID, params));
	},
	base64(params) {
		return this.check(_base64(ZodBase64, params));
	},
	base64url(params) {
		return this.check(_base64url(ZodBase64URL, params));
	},
	xid(params) {
		return this.check(_xid(ZodXID, params));
	},
	ksuid(params) {
		return this.check(_ksuid(ZodKSUID, params));
	},
	ipv4(params) {
		return this.check(_ipv4(ZodIPv4, params));
	},
	ipv6(params) {
		return this.check(_ipv6(ZodIPv6, params));
	},
	cidrv4(params) {
		return this.check(_cidrv4(ZodCIDRv4, params));
	},
	cidrv6(params) {
		return this.check(_cidrv6(ZodCIDRv6, params));
	},
	e164(params) {
		return this.check(_e164(ZodE164, params));
	},
	datetime(params) {
		return this.check(_isoDateTime(ZodISODateTime, params));
	},
	date(params) {
		return this.check(_isoDate(ZodISODate, params));
	},
	time(params) {
		return this.check(_isoTime(ZodISOTime, params));
	},
	duration(params) {
		return this.check(_isoDuration(ZodISODuration, params));
	}
});
function string(params) {
	return _string(ZodString, params);
}
var ZodStringFormat = /* @__PURE__ */ $constructor("ZodStringFormat", (inst, def) => {
	$ZodStringFormat.init(inst, def), _ZodString.init(inst, def);
}), ZodISODateTime = /* @__PURE__ */ $constructor("ZodISODateTime", (inst, def) => {
	$ZodISODateTime.init(inst, def), ZodStringFormat.init(inst, def);
}), ZodISODate = /* @__PURE__ */ $constructor("ZodISODate", (inst, def) => {
	$ZodISODate.init(inst, def), ZodStringFormat.init(inst, def);
}), ZodISOTime = /* @__PURE__ */ $constructor("ZodISOTime", (inst, def) => {
	$ZodISOTime.init(inst, def), ZodStringFormat.init(inst, def);
}), ZodISODuration = /* @__PURE__ */ $constructor("ZodISODuration", (inst, def) => {
	$ZodISODuration.init(inst, def), ZodStringFormat.init(inst, def);
}), ZodEmail = /* @__PURE__ */ $constructor("ZodEmail", (inst, def) => {
	$ZodEmail.init(inst, def), ZodStringFormat.init(inst, def);
});
function email(params) {
	return _email(ZodEmail, params);
}
var ZodGUID = /* @__PURE__ */ $constructor("ZodGUID", (inst, def) => {
	$ZodGUID.init(inst, def), ZodStringFormat.init(inst, def);
});
function guid(params) {
	return _guid(ZodGUID, params);
}
var ZodUUID = /* @__PURE__ */ $constructor("ZodUUID", (inst, def) => {
	$ZodUUID.init(inst, def), ZodStringFormat.init(inst, def);
});
function uuid(params) {
	return _uuid(ZodUUID, params);
}
function uuidv4(params) {
	return _uuidv4(ZodUUID, params);
}
function uuidv6(params) {
	return _uuidv6(ZodUUID, params);
}
function uuidv7(params) {
	return _uuidv7(ZodUUID, params);
}
var ZodURL = /* @__PURE__ */ $constructor("ZodURL", (inst, def) => {
	$ZodURL.init(inst, def), ZodStringFormat.init(inst, def);
});
function url(params) {
	return _url(ZodURL, params);
}
function httpUrl(params) {
	return _url(ZodURL, {
		protocol: httpProtocol,
		hostname: domain,
		...util_exports.normalizeParams(params)
	});
}
var ZodEmoji = /* @__PURE__ */ $constructor("ZodEmoji", (inst, def) => {
	$ZodEmoji.init(inst, def), ZodStringFormat.init(inst, def);
});
function emoji(params) {
	return _emoji(ZodEmoji, params);
}
var ZodNanoID = /* @__PURE__ */ $constructor("ZodNanoID", (inst, def) => {
	$ZodNanoID.init(inst, def), ZodStringFormat.init(inst, def);
});
function nanoid(params) {
	return _nanoid(ZodNanoID, params);
}
var ZodCUID = /* @__PURE__ */ $constructor("ZodCUID", (inst, def) => {
	$ZodCUID.init(inst, def), ZodStringFormat.init(inst, def);
});
function cuid(params) {
	return _cuid(ZodCUID, params);
}
var ZodCUID2 = /* @__PURE__ */ $constructor("ZodCUID2", (inst, def) => {
	$ZodCUID2.init(inst, def), ZodStringFormat.init(inst, def);
});
function cuid2(params) {
	return _cuid2(ZodCUID2, params);
}
var ZodULID = /* @__PURE__ */ $constructor("ZodULID", (inst, def) => {
	$ZodULID.init(inst, def), ZodStringFormat.init(inst, def);
});
function ulid(params) {
	return _ulid(ZodULID, params);
}
var ZodXID = /* @__PURE__ */ $constructor("ZodXID", (inst, def) => {
	$ZodXID.init(inst, def), ZodStringFormat.init(inst, def);
});
function xid(params) {
	return _xid(ZodXID, params);
}
var ZodKSUID = /* @__PURE__ */ $constructor("ZodKSUID", (inst, def) => {
	$ZodKSUID.init(inst, def), ZodStringFormat.init(inst, def);
});
function ksuid(params) {
	return _ksuid(ZodKSUID, params);
}
var ZodIPv4 = /* @__PURE__ */ $constructor("ZodIPv4", (inst, def) => {
	$ZodIPv4.init(inst, def), ZodStringFormat.init(inst, def);
});
function ipv4(params) {
	return _ipv4(ZodIPv4, params);
}
var ZodMAC = /* @__PURE__ */ $constructor("ZodMAC", (inst, def) => {
	$ZodMAC.init(inst, def), ZodStringFormat.init(inst, def);
});
function mac(params) {
	return _mac(ZodMAC, params);
}
var ZodIPv6 = /* @__PURE__ */ $constructor("ZodIPv6", (inst, def) => {
	$ZodIPv6.init(inst, def), ZodStringFormat.init(inst, def);
});
function ipv6(params) {
	return _ipv6(ZodIPv6, params);
}
var ZodCIDRv4 = /* @__PURE__ */ $constructor("ZodCIDRv4", (inst, def) => {
	$ZodCIDRv4.init(inst, def), ZodStringFormat.init(inst, def);
});
function cidrv4(params) {
	return _cidrv4(ZodCIDRv4, params);
}
var ZodCIDRv6 = /* @__PURE__ */ $constructor("ZodCIDRv6", (inst, def) => {
	$ZodCIDRv6.init(inst, def), ZodStringFormat.init(inst, def);
});
function cidrv6(params) {
	return _cidrv6(ZodCIDRv6, params);
}
var ZodBase64 = /* @__PURE__ */ $constructor("ZodBase64", (inst, def) => {
	$ZodBase64.init(inst, def), ZodStringFormat.init(inst, def);
});
function base642(params) {
	return _base64(ZodBase64, params);
}
var ZodBase64URL = /* @__PURE__ */ $constructor("ZodBase64URL", (inst, def) => {
	$ZodBase64URL.init(inst, def), ZodStringFormat.init(inst, def);
});
function base64url2(params) {
	return _base64url(ZodBase64URL, params);
}
var ZodE164 = /* @__PURE__ */ $constructor("ZodE164", (inst, def) => {
	$ZodE164.init(inst, def), ZodStringFormat.init(inst, def);
});
function e164(params) {
	return _e164(ZodE164, params);
}
var ZodCreditCard = /* @__PURE__ */ $constructor("ZodCreditCard", (inst, def) => {
	$ZodCreditCard.init(inst, def), ZodStringFormat.init(inst, def);
});
function creditCard(params) {
	return _creditCard(ZodCreditCard, params);
}
var ZodIBAN = /* @__PURE__ */ $constructor("ZodIBAN", (inst, def) => {
	$ZodIBAN.init(inst, def), ZodStringFormat.init(inst, def);
});
function iban(params) {
	return _iban(ZodIBAN, params);
}
var ZodJWT = /* @__PURE__ */ $constructor("ZodJWT", (inst, def) => {
	$ZodJWT.init(inst, def), ZodStringFormat.init(inst, def);
});
function jwt(params) {
	return _jwt(ZodJWT, params);
}
var ZodCustomStringFormat = /* @__PURE__ */ $constructor("ZodCustomStringFormat", (inst, def) => {
	$ZodCustomStringFormat.init(inst, def), ZodStringFormat.init(inst, def);
});
function stringFormat(format, fnOrRegex, _params = {}) {
	return _stringFormat(ZodCustomStringFormat, format, fnOrRegex, _params);
}
function hostname2(_params) {
	return _stringFormat(ZodCustomStringFormat, "hostname", hostname, _params);
}
function hex2(_params) {
	return _stringFormat(ZodCustomStringFormat, "hex", hex, _params);
}
function currencyCode2(_params) {
	return _stringFormat(ZodCustomStringFormat, "currency_code", currencyCode, _params);
}
function hash(alg, params) {
	let enc = params?.enc ?? "hex", format = `${alg}_${enc}`, regex = regexes_exports[format];
	if (!regex)
		throw new Error(`Unrecognized hash format: ${format}`);
	return _stringFormat(ZodCustomStringFormat, format, regex, params);
}
var ZodNumber = /* @__PURE__ */ $constructor(
	"ZodNumber",
	(inst, def) => {
		$ZodNumber.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => numberProcessor(inst, ctx, json2, params), inst.isFinite = !0;
	},
	/* @__PURE__ */ util_exports.derived({
		minValue: (inst) => {
			let { minimum, exclusiveMinimum } = aggregateChecks(inst);
			return Math.max(minimum ?? Number.NEGATIVE_INFINITY, exclusiveMinimum ?? Number.NEGATIVE_INFINITY);
		},
		maxValue: (inst) => {
			let { maximum, exclusiveMaximum } = aggregateChecks(inst);
			return Math.min(maximum ?? Number.POSITIVE_INFINITY, exclusiveMaximum ?? Number.POSITIVE_INFINITY);
		},
		isInt: (inst) => {
			let { isInt, multipleOf } = aggregateChecks(inst);
			return !!isInt || !!multipleOf?.some(Number.isSafeInteger);
		},
		format: (inst) => aggregateChecks(inst).format ?? null
	}, {
		gt(value, params) {
			return this.check(_gt(value, params));
		},
		gte(value, params) {
			return this.check(_gte(value, params));
		},
		min(value, params) {
			return this.check(_gte(value, params));
		},
		lt(value, params) {
			return this.check(_lt(value, params));
		},
		lte(value, params) {
			return this.check(_lte(value, params));
		},
		max(value, params) {
			return this.check(_lte(value, params));
		},
		int(params) {
			return this.check(int(params));
		},
		safe(params) {
			return this.check(int(params));
		},
		positive(params) {
			return this.check(_gt(0, params));
		},
		nonnegative(params) {
			return this.check(_gte(0, params));
		},
		negative(params) {
			return this.check(_lt(0, params));
		},
		nonpositive(params) {
			return this.check(_lte(0, params));
		},
		multipleOf(value, params) {
			return this.check(_multipleOf(value, params));
		},
		step(value, params) {
			return this.check(_multipleOf(value, params));
		},
		finite() {
			return this;
		}
	})
);
function number2(params) {
	return _number(ZodNumber, params);
}
var ZodNumberFormat = /* @__PURE__ */ $constructor("ZodNumberFormat", (inst, def) => {
	$ZodNumberFormat.init(inst, def), ZodNumber.init(inst, def);
});
function int(params) {
	return _int(ZodNumberFormat, params);
}
function float32(params) {
	return _float32(ZodNumberFormat, params);
}
function float64(params) {
	return _float64(ZodNumberFormat, params);
}
function int32(params) {
	return _int32(ZodNumberFormat, params);
}
function uint32(params) {
	return _uint32(ZodNumberFormat, params);
}
var ZodBoolean = /* @__PURE__ */ $constructor("ZodBoolean", (inst, def) => {
	$ZodBoolean.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => booleanProcessor(inst, ctx, json2, params);
});
function boolean(params) {
	return _boolean(ZodBoolean, params);
}
var ZodBigInt = /* @__PURE__ */ $constructor(
	"ZodBigInt",
	(inst, def) => {
		$ZodBigInt.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => bigintProcessor(inst, ctx, json2, params);
	},
	/* @__PURE__ */ util_exports.derived({
		minValue: (inst) => aggregateChecks(inst).minimum ?? null,
		maxValue: (inst) => aggregateChecks(inst).maximum ?? null,
		format: (inst) => aggregateChecks(inst).format ?? null
	}, {
		gte(value, params) {
			return this.check(_gte(value, params));
		},
		min(value, params) {
			return this.check(_gte(value, params));
		},
		gt(value, params) {
			return this.check(_gt(value, params));
		},
		lt(value, params) {
			return this.check(_lt(value, params));
		},
		lte(value, params) {
			return this.check(_lte(value, params));
		},
		max(value, params) {
			return this.check(_lte(value, params));
		},
		positive(params) {
			return this.check(_gt(BigInt(0), params));
		},
		negative(params) {
			return this.check(_lt(BigInt(0), params));
		},
		nonpositive(params) {
			return this.check(_lte(BigInt(0), params));
		},
		nonnegative(params) {
			return this.check(_gte(BigInt(0), params));
		},
		multipleOf(value, params) {
			return this.check(_multipleOf(value, params));
		}
	})
);
function bigint(params) {
	return _bigint(ZodBigInt, params);
}
var ZodBigIntFormat = /* @__PURE__ */ $constructor("ZodBigIntFormat", (inst, def) => {
	$ZodBigIntFormat.init(inst, def), ZodBigInt.init(inst, def);
});
function int64(params) {
	return _int64(ZodBigIntFormat, params);
}
function uint64(params) {
	return _uint64(ZodBigIntFormat, params);
}
var ZodSymbol = /* @__PURE__ */ $constructor("ZodSymbol", (inst, def) => {
	$ZodSymbol.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => symbolProcessor(inst, ctx, json2, params);
});
function symbol(params) {
	return _symbol(ZodSymbol, params);
}
var ZodUndefined = /* @__PURE__ */ $constructor("ZodUndefined", (inst, def) => {
	$ZodUndefined.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => undefinedProcessor(inst, ctx, json2, params);
});
function _undefined2(params) {
	return _undefined(ZodUndefined, params);
}
var ZodNull = /* @__PURE__ */ $constructor("ZodNull", (inst, def) => {
	$ZodNull.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => nullProcessor(inst, ctx, json2, params);
});
function _null2(params) {
	return _null(ZodNull, params);
}
var ZodAny = /* @__PURE__ */ $constructor("ZodAny", (inst, def) => {
	$ZodAny.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => anyProcessor(inst, ctx, json2, params);
});
function any() {
	return _any(ZodAny);
}
var ZodUnknown = /* @__PURE__ */ $constructor("ZodUnknown", (inst, def) => {
	$ZodUnknown.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => unknownProcessor(inst, ctx, json2, params);
});
function unknown() {
	return _unknown(ZodUnknown);
}
var ZodNever = /* @__PURE__ */ $constructor("ZodNever", (inst, def) => {
	$ZodNever.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => neverProcessor(inst, ctx, json2, params);
});
function never(params) {
	return _never(ZodNever, params);
}
var ZodVoid = /* @__PURE__ */ $constructor("ZodVoid", (inst, def) => {
	$ZodVoid.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => voidProcessor(inst, ctx, json2, params);
});
function _void2(params) {
	return _void(ZodVoid, params);
}
var ZodDate = /* @__PURE__ */ $constructor(
	"ZodDate",
	(inst, def) => {
		$ZodDate.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => dateProcessor(inst, ctx, json2, params), inst.min = (value, params) => inst.check(_gte(value, params)), inst.max = (value, params) => inst.check(_lte(value, params));
	},
	/* @__PURE__ */ util_exports.derived({
		minDate: (inst) => {
			let { minimum } = aggregateChecks(inst);
			return minimum ? new Date(minimum) : null;
		},
		maxDate: (inst) => {
			let { maximum } = aggregateChecks(inst);
			return maximum ? new Date(maximum) : null;
		}
	}, {})
);
function date(params) {
	return _date(ZodDate, params);
}
var ZodArray = /* @__PURE__ */ $constructor("ZodArray", (inst, def) => {
	_ensureDefaultMemoizer(), $ZodArray.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => arrayProcessor(inst, ctx, json2, params), inst.element = def.element;
}, {
	min(n, params) {
		return this.check(_minLength(n, params));
	},
	nonempty(params) {
		return this.check(_minLength(1, params));
	},
	max(n, params) {
		return this.check(_maxLength(n, params));
	},
	length(n, params) {
		return this.check(_length(n, params));
	},
	unwrap() {
		return this.element;
	}
});
function array(element, params) {
	return _array(ZodArray, element, params);
}
function keyof(schema) {
	let shape = schema._zod.def.shape;
	return _enum2(Object.keys(shape));
}
var ZodObject = /* @__PURE__ */ $constructor("ZodObject", (inst, def) => {
	_ensureDefaultMemoizer(), $ZodObjectJIT.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => objectProcessor(inst, ctx, json2, params), util_exports.installLazyProp(inst, "shape", (self) => self._zod.def.shape, !1);
}, {
	keyof() {
		return _enum2(Object.keys(this._zod.def.shape));
	},
	catchall(catchall) {
		return this.clone(util_exports.mergeDefs(this._zod.def, { catchall }));
	},
	passthrough() {
		return this.clone(util_exports.mergeDefs(this._zod.def, { catchall: unknown() }));
	},
	loose() {
		return this.clone(util_exports.mergeDefs(this._zod.def, { catchall: unknown() }));
	},
	strict() {
		return this.clone(util_exports.mergeDefs(this._zod.def, { catchall: never() }));
	},
	strip() {
		return this.clone(util_exports.mergeDefs(this._zod.def, { catchall: void 0 }));
	},
	extend(incoming) {
		return util_exports.extend(this, incoming);
	},
	safeExtend(incoming) {
		return util_exports.safeExtend(this, incoming);
	},
	merge(other) {
		return util_exports.merge(this, other);
	},
	pick(mask) {
		return util_exports.pick(this, mask);
	},
	omit(mask) {
		return util_exports.omit(this, mask);
	},
	partial(...args) {
		return util_exports.partial(ZodOptional, this, args[0]);
	},
	exactPartial(...args) {
		return util_exports.partial(ZodExactOptional, this, args[0], "exactPartial");
	},
	required(...args) {
		return util_exports.required(ZodNonOptional, this, args[0]);
	}
});
function object(shape, params) {
	let def = {
		type: "object",
		shape: shape ?? {},
		...util_exports.normalizeParams(params)
	};
	return new ZodObject(def);
}
function strictObject(shape, params) {
	return new ZodObject({
		type: "object",
		shape,
		catchall: never(),
		...util_exports.normalizeParams(params)
	});
}
function looseObject(shape, params) {
	return new ZodObject({
		type: "object",
		shape,
		catchall: unknown(),
		...util_exports.normalizeParams(params)
	});
}
var ZodUnion = /* @__PURE__ */ $constructor("ZodUnion", (inst, def) => {
	$ZodUnion.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => unionProcessor(inst, ctx, json2, params), inst.options = def.options;
});
function union(options, params) {
	return new ZodUnion({
		type: "union",
		options,
		...util_exports.normalizeParams(params)
	});
}
var ZodXor = /* @__PURE__ */ $constructor("ZodXor", (inst, def) => {
	ZodUnion.init(inst, def), $ZodXor.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => unionProcessor(inst, ctx, json2, params), inst.options = def.options;
});
function xor(options, params) {
	return new ZodXor({
		type: "union",
		options,
		inclusive: !1,
		...util_exports.normalizeParams(params)
	});
}
var ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("ZodDiscriminatedUnion", (inst, def) => {
	ZodUnion.init(inst, def), $ZodDiscriminatedUnion.init(inst, def);
});
function discriminatedUnion(discriminator, options, params) {
	return new ZodDiscriminatedUnion({
		type: "union",
		options,
		discriminator,
		...util_exports.normalizeParams(params)
	});
}
var ZodIntersection = /* @__PURE__ */ $constructor("ZodIntersection", (inst, def) => {
	$ZodIntersection.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => intersectionProcessor(inst, ctx, json2, params);
});
function intersection(left, right) {
	return new ZodIntersection({
		type: "intersection",
		left,
		right
	});
}
var ZodTuple = /* @__PURE__ */ $constructor("ZodTuple", (inst, def) => {
	_ensureDefaultMemoizer(), $ZodTuple.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => tupleProcessor(inst, ctx, json2, params);
}, {
	rest(rest) {
		return this.clone({
			...this._zod.def,
			rest
		});
	},
	partial() {
		let def = this._zod.def;
		if (def.checks?.length)
			throw new Error(".partial() cannot be used on tuple schemas containing refinements");
		return this.clone({
			...def,
			items: def.items.map((item) => new ZodOptional({ type: "optional", innerType: item }))
		});
	}
});
function tuple(items, _paramsOrRest, _params) {
	let hasRest = _paramsOrRest instanceof $ZodType, params = hasRest ? _params : _paramsOrRest, rest = hasRest ? _paramsOrRest : null;
	return new ZodTuple({
		type: "tuple",
		items,
		rest,
		...util_exports.normalizeParams(params)
	});
}
var ZodRecord = /* @__PURE__ */ $constructor("ZodRecord", (inst, def) => {
	_ensureDefaultMemoizer(), $ZodRecord.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => recordProcessor(inst, ctx, json2, params), inst.keyType = def.keyType, inst.valueType = def.valueType;
});
function record(keyType, valueType, params) {
	return !valueType || !valueType._zod ? new ZodRecord({
		type: "record",
		keyType: string(),
		valueType: keyType,
		...util_exports.normalizeParams(valueType)
	}) : new ZodRecord({
		type: "record",
		keyType,
		valueType,
		...util_exports.normalizeParams(params)
	});
}
function partialRecord(keyType, valueType, params) {
	return new ZodRecord({
		type: "record",
		keyType,
		valueType,
		...util_exports.normalizeParams(params),
		partial: !0
	});
}
function looseRecord(keyType, valueType, params) {
	return new ZodRecord({
		type: "record",
		keyType,
		valueType,
		mode: "loose",
		...util_exports.normalizeParams(params)
	});
}
var ZodMap = /* @__PURE__ */ $constructor("ZodMap", (inst, def) => {
	_ensureDefaultMemoizer(), $ZodMap.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => mapProcessor(inst, ctx, json2, params), inst.keyType = def.keyType, inst.valueType = def.valueType, inst.min = (...args) => inst.check(_minSize(...args)), inst.nonempty = (params) => inst.check(_minSize(1, params)), inst.max = (...args) => inst.check(_maxSize(...args)), inst.size = (...args) => inst.check(_size(...args));
});
function map(keyType, valueType, params) {
	return new ZodMap({
		type: "map",
		keyType,
		valueType,
		...util_exports.normalizeParams(params)
	});
}
var ZodSet = /* @__PURE__ */ $constructor("ZodSet", (inst, def) => {
	_ensureDefaultMemoizer(), $ZodSet.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => setProcessor(inst, ctx, json2, params), inst.min = (...args) => inst.check(_minSize(...args)), inst.nonempty = (params) => inst.check(_minSize(1, params)), inst.max = (...args) => inst.check(_maxSize(...args)), inst.size = (...args) => inst.check(_size(...args));
});
function set(valueType, params) {
	return new ZodSet({
		type: "set",
		valueType,
		...util_exports.normalizeParams(params)
	});
}
var ZodEnum = /* @__PURE__ */ $constructor("ZodEnum", (inst, def) => {
	$ZodEnum.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => enumProcessor(inst, ctx, json2, params), inst.enum = def.entries, inst.options = [...inst._zod.values];
	let keys = new Set(Object.keys(def.entries));
	inst.extract = (values, params) => {
		let newEntries = {};
		for (let value of values)
			if (keys.has(value))
				newEntries[value] = def.entries[value];
			else
				throw new Error(`Key ${value} not found in enum`);
		return new ZodEnum({
			...def,
			checks: [],
			...util_exports.normalizeParams(params),
			entries: newEntries
		});
	}, inst.exclude = (values, params) => {
		let newEntries = { ...def.entries };
		for (let value of values)
			if (keys.has(value))
				delete newEntries[value];
			else
				throw new Error(`Key ${value} not found in enum`);
		return new ZodEnum({
			...def,
			checks: [],
			...util_exports.normalizeParams(params),
			entries: newEntries
		});
	};
});
function _enum2(values, params) {
	let entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
	return new ZodEnum({
		type: "enum",
		entries,
		...util_exports.normalizeParams(params)
	});
}
function nativeEnum(entries, params) {
	return new ZodEnum({
		type: "enum",
		entries,
		...util_exports.normalizeParams(params)
	});
}
var ZodLiteral = /* @__PURE__ */ $constructor("ZodLiteral", (inst, def) => {
	$ZodLiteral.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => literalProcessor(inst, ctx, json2, params), inst.values = new Set(def.values), Object.defineProperty(inst, "value", {
		get() {
			if (def.values.length > 1)
				throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
			return def.values[0];
		}
	});
});
function literal(value, params) {
	return new ZodLiteral({
		type: "literal",
		values: Array.isArray(value) ? value : [value],
		...util_exports.normalizeParams(params)
	});
}
var ZodFile = /* @__PURE__ */ $constructor("ZodFile", (inst, def) => {
	$ZodFile.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => fileProcessor(inst, ctx, json2, params), inst.min = (size, params) => inst.check(_minSize(size, params)), inst.max = (size, params) => inst.check(_maxSize(size, params)), inst.mime = (types, params) => inst.check(_mime(Array.isArray(types) ? types : [types], params));
});
function file(params) {
	return _file(ZodFile, params);
}
var ZodTransform = /* @__PURE__ */ $constructor("ZodTransform", (inst, def) => {
	_ensureDefaultMemoizer(), $ZodTransform.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => transformProcessor(inst, ctx, json2, params), inst._zod.parse = (payload, _ctx) => {
		if (_ctx.direction === "backward")
			throw new $ZodEncodeError(inst.constructor.name);
		payload.addIssue = (issue2) => {
			if (typeof issue2 == "string")
				payload.issues.push(util_exports.issue(issue2, payload.value, def));
			else {
				let _issue = issue2;
				_issue.fatal && (_issue.continue = !1), _issue.code ?? (_issue.code = "custom"), "input" in _issue || (_issue.input = payload.value), _issue.inst ?? (_issue.inst = inst), payload.issues.push(util_exports.issue(_issue));
			}
		};
		let output2 = def.transform(payload.value, payload);
		return output2 instanceof Promise ? output2.then((output3) => (payload.value = output3, payload)) : (payload.value = output2, payload);
	};
});
function transform(fn) {
	return new ZodTransform({
		type: "transform",
		transform: fn
	});
}
var ZodOptional = /* @__PURE__ */ $constructor("ZodOptional", (inst, def) => {
	$ZodOptional.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => optionalProcessor(inst, ctx, json2, params), inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
	return new ZodOptional({
		type: "optional",
		innerType
	});
}
var ZodExactOptional = /* @__PURE__ */ $constructor("ZodExactOptional", (inst, def) => {
	$ZodExactOptional.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => optionalProcessor(inst, ctx, json2, params), inst.unwrap = () => inst._zod.def.innerType;
});
function exactOptional(innerType) {
	return new ZodExactOptional({
		type: "optional",
		innerType
	});
}
var ZodNullable = /* @__PURE__ */ $constructor("ZodNullable", (inst, def) => {
	$ZodNullable.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => nullableProcessor(inst, ctx, json2, params), inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
	return new ZodNullable({
		type: "nullable",
		innerType
	});
}
function nullish(innerType) {
	return optional(nullable(innerType));
}
var ZodDefault = /* @__PURE__ */ $constructor("ZodDefault", (inst, def) => {
	$ZodDefault.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => defaultProcessor(inst, ctx, json2, params), inst.unwrap = () => inst._zod.def.innerType, inst.removeDefault = inst.unwrap;
});
function _default2(innerType, defaultValue) {
	return new ZodDefault({
		type: "default",
		innerType,
		get defaultValue() {
			return typeof defaultValue == "function" ? defaultValue() : util_exports.shallowClone(defaultValue);
		}
	});
}
var ZodPrefault = /* @__PURE__ */ $constructor("ZodPrefault", (inst, def) => {
	$ZodPrefault.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => prefaultProcessor(inst, ctx, json2, params), inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
	return new ZodPrefault({
		type: "prefault",
		innerType,
		get defaultValue() {
			return typeof defaultValue == "function" ? defaultValue() : util_exports.shallowClone(defaultValue);
		}
	});
}
var ZodNonOptional = /* @__PURE__ */ $constructor("ZodNonOptional", (inst, def) => {
	$ZodNonOptional.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => nonoptionalProcessor(inst, ctx, json2, params), inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
	return new ZodNonOptional({
		type: "nonoptional",
		innerType,
		...util_exports.normalizeParams(params)
	});
}
var ZodSuccess = /* @__PURE__ */ $constructor("ZodSuccess", (inst, def) => {
	$ZodSuccess.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => successProcessor(inst, ctx, json2, params), inst.unwrap = () => inst._zod.def.innerType;
});
function success(innerType) {
	return new ZodSuccess({
		type: "success",
		innerType
	});
}
var ZodCatch = /* @__PURE__ */ $constructor("ZodCatch", (inst, def) => {
	$ZodCatch.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => catchProcessor(inst, ctx, json2, params), inst.unwrap = () => inst._zod.def.innerType, inst.removeCatch = inst.unwrap;
});
function _catch2(innerType, catchValue) {
	return new ZodCatch({
		type: "catch",
		innerType,
		catchValue: typeof catchValue == "function" ? catchValue : util_exports.constantCatch(catchValue)
	});
}
var ZodNaN = /* @__PURE__ */ $constructor("ZodNaN", (inst, def) => {
	$ZodNaN.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => nanProcessor(inst, ctx, json2, params);
});
function nan(params) {
	return _nan(ZodNaN, params);
}
var ZodPipe = /* @__PURE__ */ $constructor("ZodPipe", (inst, def) => {
	$ZodPipe.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => pipeProcessor(inst, ctx, json2, params), inst.in = def.in, inst.out = def.out;
});
function pipe(in_, out) {
	return new ZodPipe({
		type: "pipe",
		in: in_,
		out
		// ...util.normalizeParams(params),
	});
}
var ZodCodec = /* @__PURE__ */ $constructor("ZodCodec", (inst, def) => {
	ZodPipe.init(inst, def), $ZodCodec.init(inst, def);
});
function codec(in_, out, params) {
	return new ZodCodec({
		type: "pipe",
		in: in_,
		out,
		transform: params.decode,
		reverseTransform: params.encode
	});
}
function invertCodec(codec2) {
	let def = codec2._zod.def;
	return new ZodCodec({
		type: "pipe",
		in: def.out,
		out: def.in,
		transform: def.reverseTransform,
		reverseTransform: def.transform
	});
}
var ZodPreprocess = /* @__PURE__ */ $constructor("ZodPreprocess", (inst, def) => {
	ZodPipe.init(inst, def), $ZodPreprocess.init(inst, def);
}), ZodReadonly = /* @__PURE__ */ $constructor("ZodReadonly", (inst, def) => {
	$ZodReadonly.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => readonlyProcessor(inst, ctx, json2, params), inst.unwrap = () => inst._zod.def.innerType;
});
function readonly(innerType) {
	return new ZodReadonly({
		type: "readonly",
		innerType
	});
}
var ZodTemplateLiteral = /* @__PURE__ */ $constructor("ZodTemplateLiteral", (inst, def) => {
	$ZodTemplateLiteral.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => templateLiteralProcessor(inst, ctx, json2, params);
});
function templateLiteral(parts, params) {
	return new ZodTemplateLiteral({
		type: "template_literal",
		parts,
		...util_exports.normalizeParams(params)
	});
}
var ZodLazy = /* @__PURE__ */ $constructor("ZodLazy", (inst, def) => {
	$ZodLazy.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => lazyProcessor(inst, ctx, json2, params), inst.unwrap = () => inst._zod.def.getter();
});
function lazy(getter) {
	return new ZodLazy({
		type: "lazy",
		getter
	});
}
var ZodPromise = /* @__PURE__ */ $constructor("ZodPromise", (inst, def) => {
	$ZodPromise.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => promiseProcessor(inst, ctx, json2, params), inst.unwrap = () => inst._zod.def.innerType;
});
function promise(innerType) {
	return new ZodPromise({
		type: "promise",
		innerType
	});
}
var ZodFunction = /* @__PURE__ */ $constructor("ZodFunction", (inst, def) => {
	$ZodFunction.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => functionProcessor(inst, ctx, json2, params);
});
function _function(params) {
	return new ZodFunction({
		type: "function",
		input: Array.isArray(params?.input) ? tuple(params?.input) : params?.input ?? array(unknown()),
		output: params?.output ?? unknown()
	});
}
var ZodCustom = /* @__PURE__ */ $constructor("ZodCustom", (inst, def) => {
	$ZodCustom.init(inst, def), ZodType.init(inst, def), inst._zod.processJSONSchema = (ctx, json2, params) => customProcessor(inst, ctx, json2, params);
});
function check(fn) {
	let ch = new $ZodCheck({
		check: "custom"
		// ...util.normalizeParams(params),
	});
	return ch._zod.check = fn, ch;
}
function custom(fn, _params) {
	return _custom(ZodCustom, fn ?? (() => !0), _params);
}
function refine(fn, _params = {}) {
	return _refine(ZodCustom, fn, _params);
}
function superRefine(fn, params) {
	return _superRefine(fn, params);
}
var describe2 = describe, meta2 = meta, ZodInstanceOf = /* @__PURE__ */ $constructor("ZodInstanceOf", (inst, def) => {
	ZodCustom.init(inst, def);
}, {
	properties(shape, params) {
		return this.check(_properties(shape, params));
	}
});
function _instanceof(cls, params = {}) {
	let inst = new ZodInstanceOf({
		type: "custom",
		check: "custom",
		fn: (data) => data instanceof cls,
		abort: !0,
		...util_exports.normalizeParams(params)
	});
	return inst._zod.bag.Class = cls, inst._zod.check = (payload) => {
		payload.value instanceof cls || payload.issues.push({
			code: "invalid_type",
			expected: cls.name,
			input: payload.value,
			inst,
			path: [...inst._zod.def.path ?? []]
		});
	}, inst;
}
var stringbool = (...args) => _stringbool({
	Codec: ZodCodec,
	Boolean: ZodBoolean,
	String: ZodString
}, ...args);
function json(params) {
	let jsonSchema = lazy(() => union([string(params), number2(), boolean(), _null2(), array(jsonSchema), record(string(), jsonSchema)]));
	return jsonSchema;
}
function preprocess(fn, schema) {
	return new ZodPreprocess({
		type: "pipe",
		in: transform(fn),
		out: schema
	});
}

// ../code/node_modules/zod/v4/classic/compat.js
var ZodIssueCode = {
	invalid_type: "invalid_type",
	too_big: "too_big",
	too_small: "too_small",
	invalid_format: "invalid_format",
	not_multiple_of: "not_multiple_of",
	unrecognized_keys: "unrecognized_keys",
	invalid_union: "invalid_union",
	invalid_key: "invalid_key",
	invalid_element: "invalid_element",
	invalid_value: "invalid_value",
	custom: "custom"
};
function setErrorMap(map2) {
	config({
		customError: map2
	});
}
function getErrorMap() {
	return config().customError;
}
var ZodFirstPartyTypeKind;
ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {});

// ../code/node_modules/zod/v4/classic/iso.js
var iso_exports = {};
__export(iso_exports, {
	ZodISODate: () => ZodISODate,
	ZodISODateTime: () => ZodISODateTime,
	ZodISODuration: () => ZodISODuration,
	ZodISOTime: () => ZodISOTime,
	date: () => date2,
	datetime: () => datetime,
	duration: () => duration,
	time: () => time
});
function datetime(params) {
	return _isoDateTime(ZodISODateTime, params);
}
function date2(params) {
	return _isoDate(ZodISODate, params);
}
function time(params) {
	return _isoTime(ZodISOTime, params);
}
function duration(params) {
	return _isoDuration(ZodISODuration, params);
}

// ../code/node_modules/zod/v4/classic/from-json-schema.js
var z = {
	...schemas_exports2,
	...checks_exports2,
	iso: iso_exports
}, RECOGNIZED_KEYS = /* @__PURE__ */ new Set([
	// Schema identification
	"$schema",
	"$ref",
	"$defs",
	"definitions",
	// Core schema keywords
	"$id",
	"id",
	"$comment",
	"$anchor",
	"$vocabulary",
	"$dynamicRef",
	"$dynamicAnchor",
	// Type
	"type",
	"enum",
	"const",
	// Composition
	"anyOf",
	"oneOf",
	"allOf",
	"not",
	// Object
	"properties",
	"required",
	"additionalProperties",
	"patternProperties",
	"propertyNames",
	"minProperties",
	"maxProperties",
	// Array
	"items",
	"prefixItems",
	"additionalItems",
	"minItems",
	"maxItems",
	"uniqueItems",
	"contains",
	"minContains",
	"maxContains",
	// String
	"minLength",
	"maxLength",
	"pattern",
	"format",
	// Number
	"minimum",
	"maximum",
	"exclusiveMinimum",
	"exclusiveMaximum",
	"multipleOf",
	// Already handled metadata
	"description",
	"default",
	// Content
	"contentEncoding",
	"contentMediaType",
	"contentSchema",
	// Unsupported (error-throwing)
	"unevaluatedItems",
	"unevaluatedProperties",
	"if",
	"then",
	"else",
	"dependentSchemas",
	"dependentRequired",
	// OpenAPI
	"nullable",
	"readOnly"
]);
function detectVersion(schema, defaultTarget) {
	let $schema = schema.$schema;
	return $schema === "https://json-schema.org/draft/2020-12/schema" ? "draft-2020-12" : $schema === "http://json-schema.org/draft-07/schema#" ? "draft-7" : $schema === "http://json-schema.org/draft-04/schema#" ? "draft-4" : defaultTarget ?? "draft-2020-12";
}
function applyMinItems(items, minItems) {
	return items.map((item, index) => index < minItems ? item : item.optional());
}
function decodeJSONPointerSegment(segment) {
	return segment.replace(/~1/g, "/").replace(/~0/g, "~");
}
function resolveRef(ref, ctx) {
	if (!ref.startsWith("#"))
		throw new Error("External $ref is not supported, only local refs (#/...) are allowed");
	let path = ref.slice(1).split("/").filter(Boolean);
	if (path.length === 0)
		return ctx.rootSchema;
	let defsKey = ctx.version === "draft-2020-12" ? "$defs" : "definitions";
	if (path[0] === defsKey) {
		let key = path[1] === void 0 ? void 0 : decodeJSONPointerSegment(path[1]);
		if (!key || !ctx.defs[key])
			throw new Error(`Reference not found: ${ref}`);
		return ctx.defs[key];
	}
	throw new Error(`Reference not found: ${ref}`);
}
function checkObjectGuards(objectSchema, guards) {
	return z.transform((value) => value).check((payload) => {
		let value = payload.value;
		if (typeof value != "object" || value === null || Array.isArray(value))
			return;
		let keys = Object.getOwnPropertyNames(value);
		if (guards.minProperties !== void 0 && keys.length < guards.minProperties && payload.issues.push({
			origin: "object",
			code: "too_small",
			minimum: guards.minProperties,
			inclusive: !0,
			message: `Too small: expected object to have >=${guards.minProperties} properties`,
			input: value,
			inst: objectSchema,
			continue: !0
		}), guards.maxProperties !== void 0 && keys.length > guards.maxProperties && payload.issues.push({
			origin: "object",
			code: "too_big",
			maximum: guards.maxProperties,
			inclusive: !0,
			message: `Too big: expected object to have <=${guards.maxProperties} properties`,
			input: value,
			inst: objectSchema,
			continue: !0
		}), guards.keySchema)
			for (let key of keys) {
				let result = guards.keySchema.safeParse(key);
				result.success || payload.issues.push({
					code: "invalid_key",
					origin: "record",
					issues: result.error.issues,
					input: key,
					path: [key],
					continue: !0
				});
			}
	}).pipe(objectSchema);
}
function canonicalKey(value, seen) {
	if (value === null)
		return "z";
	let type = typeof value;
	if (type !== "object") {
		if (type === "number" && Number.isNaN(value))
			return null;
		let raw = String(value);
		return `${type[0]}${raw.length}:${raw}`;
	}
	if (seen.has(value))
		return null;
	seen.add(value);
	try {
		if (Array.isArray(value)) {
			let parts2 = [];
			for (let item of value) {
				let key = canonicalKey(item, seen);
				if (key === null)
					return null;
				parts2.push(key);
			}
			return `a${parts2.length}:[${parts2.join(",")}]`;
		}
		let keys = Object.keys(value).sort(), parts = [];
		for (let k of keys) {
			let key = canonicalKey(value[k], seen);
			if (key === null)
				return null;
			parts.push(`${k.length}:${k}=${key}`);
		}
		return `o${parts.length}:{${parts.join(",")}}`;
	} finally {
		seen.delete(value);
	}
}
var SCHEMA_KEYWORDS = /* @__PURE__ */ new Set([
	"items",
	"prefixItems",
	"additionalItems",
	"additionalProperties",
	"contains",
	"propertyNames",
	"not",
	"if",
	"then",
	"else",
	"allOf",
	"anyOf",
	"oneOf",
	"unevaluatedItems",
	"unevaluatedProperties",
	"contentSchema"
]), SCHEMA_MAP_KEYWORDS = /* @__PURE__ */ new Set([
	"properties",
	"patternProperties",
	"dependentSchemas",
	"dependencies",
	"$defs",
	"definitions"
]);
function containsRef(value) {
	return typeof value != "object" || value === null ? !1 : Array.isArray(value) ? value.some(containsRef) : typeof value.$ref == "string" ? !0 : Object.entries(value).some(([key, sub]) => SCHEMA_KEYWORDS.has(key) ? containsRef(sub) : !SCHEMA_MAP_KEYWORDS.has(key) || typeof sub != "object" || sub === null ? !1 : Object.values(sub).some(containsRef));
}
function plural(n) {
	return n === 1 ? "element" : "elements";
}
function checkArrayGuards(arraySchema, guards) {
	return z.transform((value) => value).check((payload) => {
		let items = payload.value;
		if (Array.isArray(items)) {
			if (guards.uniqueItems === !0) {
				let firstSeen = /* @__PURE__ */ new Map();
				for (let i = 0; i < items.length; i++) {
					let key = canonicalKey(items[i], /* @__PURE__ */ new Set());
					if (key === null)
						continue;
					let first = firstSeen.get(key);
					if (first === void 0) {
						firstSeen.set(key, i);
						continue;
					}
					payload.issues.push({
						code: "custom",
						message: `Array items must be unique: element at index ${i} duplicates the one at index ${first}`,
						input: items,
						path: [i],
						continue: !0
					});
				}
			}
			if (guards.containsSchema) {
				let minContains = guards.minContains ?? 1, ceiling = guards.maxContains !== void 0 ? guards.maxContains + 1 : Number.POSITIVE_INFINITY, matches = 0;
				for (let item of items)
					if (guards.containsSchema.safeParse(item).success && ++matches >= ceiling)
						break;
				matches < minContains && payload.issues.push({
					code: "custom",
					message: `Array must contain at least ${minContains} matching ${plural(minContains)}; found ${matches}`,
					input: items,
					continue: !0
				}), guards.maxContains !== void 0 && matches > guards.maxContains && payload.issues.push({
					code: "custom",
					message: `Array must contain at most ${guards.maxContains} matching ${plural(guards.maxContains)}`,
					input: items,
					continue: !0
				});
			}
		}
	}).pipe(arraySchema);
}
function getTupleRest(restSchema, ctx) {
	if (restSchema !== !1)
		return restSchema === void 0 || restSchema === !0 ? z.any() : convertSchema(restSchema, ctx);
}
var fullTime = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)$/;
function convertBaseSchema(schema, ctx) {
	if (schema.not !== void 0) {
		if (typeof schema.not == "object" && Object.keys(schema.not).length === 0)
			return z.never();
		throw new Error("not is not supported in Zod (except { not: {} } for never)");
	}
	if (schema.unevaluatedItems !== void 0)
		throw new Error("unevaluatedItems is not supported");
	if (schema.unevaluatedProperties !== void 0)
		throw new Error("unevaluatedProperties is not supported");
	if (schema.if !== void 0 || schema.then !== void 0 || schema.else !== void 0)
		throw new Error("Conditional schemas (if/then/else) are not supported");
	if (schema.dependentSchemas !== void 0 || schema.dependentRequired !== void 0)
		throw new Error("dependentSchemas and dependentRequired are not supported");
	if (schema.$ref) {
		let refPath = schema.$ref;
		if (ctx.refs.has(refPath))
			return ctx.refs.get(refPath);
		if (ctx.processing.has(refPath))
			return z.lazy(() => {
				if (!ctx.refs.has(refPath))
					throw new Error(`Circular reference not resolved: ${refPath}`);
				return ctx.refs.get(refPath);
			});
		ctx.processing.add(refPath);
		let resolved = resolveRef(refPath, ctx), zodSchema2 = convertSchema(resolved, ctx);
		return ctx.refs.set(refPath, zodSchema2), ctx.processing.delete(refPath), zodSchema2;
	}
	if (schema.enum !== void 0) {
		let enumValues = schema.enum;
		if (ctx.version === "openapi-3.0" && schema.nullable === !0 && enumValues.length === 1 && enumValues[0] === null)
			return z.null();
		if (enumValues.length === 0)
			return z.never();
		if (enumValues.length === 1)
			return z.literal(enumValues[0]);
		if (enumValues.every((v) => typeof v == "string"))
			return z.enum(enumValues);
		let literalSchemas = enumValues.map((v) => z.literal(v));
		return literalSchemas.length < 2 ? literalSchemas[0] : z.union([literalSchemas[0], literalSchemas[1], ...literalSchemas.slice(2)]);
	}
	if (schema.const !== void 0)
		return z.literal(schema.const);
	let type = schema.type;
	if (Array.isArray(type)) {
		let typeSchemas = type.map((t) => {
			let typeSchema = { ...schema, type: t };
			return convertBaseSchema(typeSchema, ctx);
		});
		return typeSchemas.length === 0 ? z.never() : typeSchemas.length === 1 ? typeSchemas[0] : z.union(typeSchemas);
	}
	if (!type)
		return z.any();
	let zodSchema;
	switch (type) {
		case "string": {
			let stringSchema = z.string();
			if (schema.format) {
				let format = schema.format;
				format === "email" ? stringSchema = stringSchema.check(z.email()) : format === "uri" || format === "uri-reference" ? stringSchema = stringSchema.check(z.url()) : format === "uuid" || format === "guid" ? stringSchema = stringSchema.check(z.uuid()) : format === "date-time" ? stringSchema = stringSchema.check(z.iso.datetime({ offset: !0 })) : format === "date" ? stringSchema = stringSchema.check(z.iso.date()) : format === "time" ? stringSchema = stringSchema.check(z.regex(fullTime)) : format === "duration" ? stringSchema = stringSchema.check(z.iso.duration()) : format === "hostname" ? stringSchema = stringSchema.check(z.hostname()) : format === "ipv4" ? stringSchema = stringSchema.check(z.ipv4()) : format === "ipv6" ? stringSchema = stringSchema.check(z.ipv6()) : format === "mac" ? stringSchema = stringSchema.check(z.mac()) : format === "cidr" ? stringSchema = stringSchema.check(z.cidrv4()) : format === "cidr-v6" ? stringSchema = stringSchema.check(z.cidrv6()) : format === "base64" ? stringSchema = stringSchema.check(z.base64()) : format === "base64url" ? stringSchema = stringSchema.check(z.base64url()) : format === "e164" ? stringSchema = stringSchema.check(z.e164()) : format === "credit_card" ? stringSchema = stringSchema.check(z.creditCard()) : format === "iban" ? stringSchema = stringSchema.check(z.iban()) : format === "jwt" ? stringSchema = stringSchema.check(z.jwt()) : format === "emoji" ? stringSchema = stringSchema.check(z.emoji()) : format === "nanoid" ? stringSchema = stringSchema.check(z.nanoid()) : format === "cuid" ? stringSchema = stringSchema.check(z.cuid()) : format === "cuid2" ? stringSchema = stringSchema.check(z.cuid2()) : format === "ulid" ? stringSchema = stringSchema.check(z.ulid()) : format === "xid" ? stringSchema = stringSchema.check(z.xid()) : format === "ksuid" && (stringSchema = stringSchema.check(z.ksuid()));
			}
			typeof schema.minLength == "number" && (stringSchema = stringSchema.min(schema.minLength)), typeof schema.maxLength == "number" && (stringSchema = stringSchema.max(schema.maxLength)), schema.pattern && (stringSchema = stringSchema.regex(new RegExp(schema.pattern))), zodSchema = stringSchema;
			break;
		}
		case "number":
		case "integer": {
			let numberSchema = type === "integer" ? z.number().int() : z.number();
			typeof schema.minimum == "number" && schema.exclusiveMinimum !== !0 && (numberSchema = numberSchema.min(schema.minimum)), typeof schema.maximum == "number" && schema.exclusiveMaximum !== !0 && (numberSchema = numberSchema.max(schema.maximum)), typeof schema.exclusiveMinimum == "number" ? numberSchema = numberSchema.gt(schema.exclusiveMinimum) : schema.exclusiveMinimum === !0 && typeof schema.minimum == "number" && (numberSchema = numberSchema.gt(schema.minimum)), typeof schema.exclusiveMaximum == "number" ? numberSchema = numberSchema.lt(schema.exclusiveMaximum) : schema.exclusiveMaximum === !0 && typeof schema.maximum == "number" && (numberSchema = numberSchema.lt(schema.maximum)), typeof schema.multipleOf == "number" && (numberSchema = numberSchema.multipleOf(schema.multipleOf)), zodSchema = numberSchema;
			break;
		}
		case "boolean": {
			zodSchema = z.boolean();
			break;
		}
		case "null": {
			zodSchema = z.null();
			break;
		}
		case "object": {
			let shape = {}, properties = schema.properties || {}, requiredSet = new Set(schema.required || []), additionalSchema = typeof schema.additionalProperties == "object" ? convertSchema(schema.additionalProperties, ctx) : void 0;
			for (let [key, propSchema] of Object.entries(properties)) {
				let propZodSchema = convertSchema(propSchema, ctx);
				assignProp(shape, key, requiredSet.has(key) ? propZodSchema : propZodSchema.optional());
			}
			if (schema.patternProperties) {
				let patternProps = schema.patternProperties, patternKeys = Object.keys(patternProps), looseRecords = [];
				for (let pattern of patternKeys) {
					let patternValue = convertSchema(patternProps[pattern], ctx), keySchema = z.string().regex(new RegExp(pattern));
					looseRecords.push(z.looseRecord(keySchema, patternValue));
				}
				let schemasToIntersect = [];
				if (Object.keys(shape).length > 0 && schemasToIntersect.push(z.object(shape).passthrough()), schemasToIntersect.push(...looseRecords), schemasToIntersect.length === 0)
					zodSchema = z.object({}).passthrough();
				else if (schemasToIntersect.length === 1)
					zodSchema = schemasToIntersect[0];
				else {
					let result = z.intersection(schemasToIntersect[0], schemasToIntersect[1]);
					for (let i = 2; i < schemasToIntersect.length; i++)
						result = z.intersection(result, schemasToIntersect[i]);
					zodSchema = result;
				}
				if (schema.additionalProperties === !1) {
					let propertyKeys = Object.keys(shape), patterns = patternKeys.map((p) => new RegExp(p)), basePatternSchema = zodSchema;
					zodSchema = zodSchema.check((payload) => {
						if (!isPlainObject(payload.value))
							return;
						let unrecognized = [];
						for (let key of Object.keys(payload.value))
							propertyKeys.includes(key) || patterns.some((regex) => regex.test(key)) || unrecognized.push(key);
						unrecognized.length && payload.issues.push({
							code: "unrecognized_keys",
							keys: unrecognized,
							input: payload.value,
							inst: basePatternSchema
						});
					});
				}
			} else {
				let objectSchema = z.object(shape);
				schema.additionalProperties === !1 ? zodSchema = objectSchema.strict() : additionalSchema ? zodSchema = objectSchema.catchall(additionalSchema) : zodSchema = objectSchema.passthrough();
			}
			let hasKeyGuard = schema.propertyNames !== void 0 && schema.propertyNames !== !0, minProperties = typeof schema.minProperties == "number" ? schema.minProperties : void 0, maxProperties = typeof schema.maxProperties == "number" ? schema.maxProperties : void 0;
			if (hasKeyGuard || minProperties !== void 0 || maxProperties !== void 0) {
				let keySchema;
				if (hasKeyGuard) {
					let keyJSONSchema = typeof schema.propertyNames == "object" && schema.propertyNames.type === void 0 ? { type: "string", ...schema.propertyNames } : schema.propertyNames;
					keySchema = convertSchema(keyJSONSchema, ctx);
				}
				zodSchema = checkObjectGuards(zodSchema, { keySchema, minProperties, maxProperties });
			}
			break;
		}
		case "array": {
			let prefixItems = schema.prefixItems, items = schema.items;
			if (prefixItems && Array.isArray(prefixItems)) {
				let minItems = typeof schema.minItems == "number" ? schema.minItems : 0, tupleItems = prefixItems.map((item) => convertSchema(item, ctx)), positionalItems = applyMinItems(tupleItems, minItems), rest = Array.isArray(items) ? void 0 : getTupleRest(items, ctx), tupleSchema = z.tuple(positionalItems);
				zodSchema = rest ? tupleSchema.rest(rest) : tupleSchema, typeof schema.minItems == "number" && (zodSchema = zodSchema.check(z.minLength(schema.minItems))), typeof schema.maxItems == "number" && (zodSchema = zodSchema.check(z.maxLength(schema.maxItems)));
			} else if (Array.isArray(items)) {
				let minItems = typeof schema.minItems == "number" ? schema.minItems : 0, tupleItems = items.map((item) => convertSchema(item, ctx)), positionalItems = applyMinItems(tupleItems, minItems), rest = getTupleRest(schema.additionalItems, ctx), tupleSchema = z.tuple(positionalItems);
				zodSchema = rest ? tupleSchema.rest(rest) : tupleSchema, typeof schema.minItems == "number" && (zodSchema = zodSchema.check(z.minLength(schema.minItems))), typeof schema.maxItems == "number" && (zodSchema = zodSchema.check(z.maxLength(schema.maxItems)));
			} else if (items !== void 0) {
				let element = convertSchema(items, ctx), arraySchema = z.array(element);
				typeof schema.minItems == "number" && (arraySchema = arraySchema.min(schema.minItems)), typeof schema.maxItems == "number" && (arraySchema = arraySchema.max(schema.maxItems)), zodSchema = arraySchema;
			} else
				zodSchema = z.array(z.any());
			(schema.uniqueItems === !0 || schema.contains !== void 0) && (zodSchema = checkArrayGuards(zodSchema, {
				uniqueItems: schema.uniqueItems === !0,
				containsSchema: schema.contains !== void 0 ? convertSchema(schema.contains, ctx) : void 0,
				minContains: typeof schema.minContains == "number" ? schema.minContains : void 0,
				maxContains: typeof schema.maxContains == "number" ? schema.maxContains : void 0
			}));
			break;
		}
		default:
			throw new Error(`Unsupported type: ${type}`);
	}
	return zodSchema;
}
function convertSchema(schema, ctx) {
	if (typeof schema == "boolean")
		return schema ? z.any() : z.never();
	let baseSchema = convertBaseSchema(schema, ctx), hasExplicitType = schema.type || schema.enum !== void 0 || schema.const !== void 0;
	if (schema.anyOf && Array.isArray(schema.anyOf)) {
		let options = schema.anyOf.map((s) => convertSchema(s, ctx)), anyOfUnion = z.union(options);
		baseSchema = hasExplicitType ? z.intersection(baseSchema, anyOfUnion) : anyOfUnion;
	}
	if (schema.oneOf && Array.isArray(schema.oneOf)) {
		let options = schema.oneOf.map((s) => convertSchema(s, ctx)), oneOfUnion = z.xor(options);
		baseSchema = hasExplicitType ? z.intersection(baseSchema, oneOfUnion) : oneOfUnion;
	}
	if (schema.allOf && Array.isArray(schema.allOf))
		if (schema.allOf.length === 0)
			baseSchema = hasExplicitType ? baseSchema : z.any();
		else {
			let result = hasExplicitType ? baseSchema : convertSchema(schema.allOf[0], ctx), startIdx = hasExplicitType ? 0 : 1;
			for (let i = startIdx; i < schema.allOf.length; i++)
				result = z.intersection(result, convertSchema(schema.allOf[i], ctx));
			baseSchema = result;
		}
	schema.nullable === !0 && ctx.version === "openapi-3.0" && (baseSchema = z.nullable(baseSchema)), schema.readOnly === !0 && (baseSchema = z.readonly(baseSchema)), schema.default !== void 0 && (baseSchema = baseSchema.default(schema.default));
	let extraMeta = {}, coreMetadataKeys = ["$id", "id", "$comment", "$anchor", "$vocabulary", "$dynamicRef", "$dynamicAnchor"];
	for (let key of coreMetadataKeys)
		key in schema && (extraMeta[key] = schema[key]);
	let contentMetadataKeys = ["contentEncoding", "contentMediaType", "contentSchema"];
	for (let key of contentMetadataKeys)
		key in schema && (extraMeta[key] = schema[key]);
	if (schema.type === "object" && schema.$ref === void 0) {
		schema.propertyNames !== void 0 && !containsRef(schema.propertyNames) && (extraMeta.propertyNames = schema.propertyNames);
		for (let key of ["minProperties", "maxProperties"])
			schema[key] !== void 0 && (extraMeta[key] = schema[key]);
	}
	if (schema.type === "array" && schema.$ref === void 0) {
		schema.contains !== void 0 && !containsRef(schema.contains) && (extraMeta.contains = schema.contains);
		for (let key of ["uniqueItems", "minContains", "maxContains"])
			schema[key] !== void 0 && (extraMeta[key] = schema[key]);
	}
	for (let key of Object.keys(schema))
		RECOGNIZED_KEYS.has(key) || assignProp(extraMeta, key, schema[key]);
	return Object.keys(extraMeta).length > 0 && ctx.registry.add(baseSchema, extraMeta), schema.description && (baseSchema = baseSchema.describe(schema.description)), baseSchema;
}
function fromJSONSchema(schema, params) {
	if (typeof schema == "boolean")
		return schema ? z.any() : z.never();
	let normalized;
	try {
		normalized = JSON.parse(JSON.stringify(schema));
	} catch {
		throw new Error("fromJSONSchema input is not valid JSON (possibly cyclic); use $defs/$ref for recursive schemas");
	}
	let version2 = detectVersion(normalized, params?.defaultTarget), defs = normalized.$defs || normalized.definitions || {}, ctx = {
		version: version2,
		defs,
		refs: /* @__PURE__ */ new Map(),
		processing: /* @__PURE__ */ new Set(),
		rootSchema: normalized,
		registry: params?.registry ?? globalRegistry
	};
	return convertSchema(normalized, ctx);
}

// ../code/node_modules/zod/v4/core/visit.js
var RESOLVING = /* @__PURE__ */ Symbol("z.visit/resolving");
function visit(schema, fnOrHandlers) {
	let fn = typeof fnOrHandlers == "function" ? fnOrHandlers : (node, rewritten) => {
		let h = fnOrHandlers[node._zod.def.type];
		return h ? h(node, rewritten) : node;
	}, cache = /* @__PURE__ */ new Map();
	function run(s) {
		let cached = cache.get(s);
		if (cached === RESOLVING)
			return new $ZodLazy({
				type: "lazy",
				getter: () => cache.get(s)
			});
		if (cached !== void 0)
			return cached;
		cache.set(s, RESOLVING);
		let inner = mapInner(s), mapped = fn(inner, inner !== s);
		return cache.set(s, mapped), mapped;
	}
	function mapInner(s) {
		let def = s._zod.def, kind = def.type;
		switch (kind) {
			case "object": {
				let oldShape = def.shape, keys = Object.keys(oldShape), changed = !1, newShape = {};
				for (let k of keys) {
					let mapped = run(oldShape[k]);
					mapped !== oldShape[k] && (changed = !0), newShape[k] = mapped;
				}
				let newCatchall = def.catchall;
				return def.catchall && (newCatchall = run(def.catchall), newCatchall !== def.catchall && (changed = !0)), changed ? clone(s, { ...def, shape: newShape, catchall: newCatchall }) : s;
			}
			case "array": {
				let mapped = run(def.element);
				return mapped === def.element ? s : clone(s, { ...def, element: mapped });
			}
			case "tuple": {
				let oldItems = def.items, changed = !1, newItems = [];
				for (let item of oldItems) {
					let mapped = run(item);
					mapped !== item && (changed = !0), newItems.push(mapped);
				}
				let newRest = def.rest;
				return def.rest && (newRest = run(def.rest), newRest !== def.rest && (changed = !0)), changed ? clone(s, { ...def, items: newItems, rest: newRest }) : s;
			}
			case "record":
			case "map": {
				let newKey = run(def.keyType), newVal = run(def.valueType);
				return newKey === def.keyType && newVal === def.valueType ? s : clone(s, { ...def, keyType: newKey, valueType: newVal });
			}
			case "set": {
				let newVal = run(def.valueType);
				return newVal === def.valueType ? s : clone(s, { ...def, valueType: newVal });
			}
			case "union": {
				let oldOptions = def.options, changed = !1, newOptions = [];
				for (let opt of oldOptions) {
					let mapped = run(opt);
					mapped !== opt && (changed = !0), newOptions.push(mapped);
				}
				return changed ? clone(s, { ...def, options: newOptions }) : s;
			}
			case "intersection": {
				let newLeft = run(def.left), newRight = run(def.right);
				return newLeft === def.left && newRight === def.right ? s : clone(s, { ...def, left: newLeft, right: newRight });
			}
			case "optional":
			case "nullable":
			case "default":
			case "prefault":
			case "catch":
			case "readonly":
			case "nonoptional":
			case "promise":
			case "success": {
				let newInner = run(def.innerType);
				return newInner === def.innerType ? s : clone(s, { ...def, innerType: newInner });
			}
			case "pipe": {
				let newIn = run(def.in), newOut = run(def.out);
				return newIn === def.in && newOut === def.out ? s : clone(s, { ...def, in: newIn, out: newOut });
			}
			case "function": {
				let newInput = run(def.input), newOutput = run(def.output);
				return newInput === def.input && newOutput === def.output ? s : clone(s, { ...def, input: newInput, output: newOutput });
			}
			case "lazy": {
				let original = def.getter, { _cachedInner, ...rest } = def;
				return clone(s, { ...rest, getter: () => run(original()) });
			}
			// A leaf by choice: `parts` are regex fragments, not data positions.
			case "template_literal":
			// Leaves.
			case "string":
			case "number":
			case "int":
			case "boolean":
			case "bigint":
			case "symbol":
			case "undefined":
			case "null":
			case "void":
			case "never":
			case "any":
			case "unknown":
			case "date":
			case "nan":
			case "enum":
			case "literal":
			case "file":
			case "transform":
			case "custom":
				return s;
			default:
				return s;
		}
	}
	return run(schema);
}

// ../code/node_modules/zod/v4/classic/deep-partial.js
function deepPartial(schema) {
	return visit(schema, {
		object: (s) => s.partial(),
		// Every partialed option now admits `undefined`, which the constructor rejects as a duplicate.
		union: (s) => {
			let def = s._zod.def;
			return def.discriminator === void 0 ? s : union(def.options);
		}
	});
}

// ../code/node_modules/zod/v4/classic/in-out.js
function withChecks(side, checks) {
	if (!checks?.length)
		return side;
	let def = side._zod.def;
	return clone(side, mergeDefs(def, { checks: [...def.checks ?? [], ...checks] }), { parent: !0 });
}
function outSide(def) {
	return withChecks(def.out, def.checks);
}
function inSide(def) {
	return def.in._zod.traits.has("$ZodTransform") ? outSide(def) : def.in;
}
function input(schema) {
	return visit(schema, {
		pipe: (s) => inSide(s._zod.def),
		// A default value belongs to the output side, so a rewritten inner type leaves it stranded. `.default()` widens the declared input type with `undefined`, and `optional` is what carries that across.
		default: (s, rewritten) => rewritten ? optional(s._zod.def.innerType) : s,
		// A catch value is output-side too, but `.catch()` leaves the declared input type alone, so the inner schema stands on its own.
		catch: (s, rewritten) => rewritten ? s._zod.def.innerType : s
	});
}
function output(schema) {
	return visit(schema, {
		pipe: (s) => outSide(s._zod.def),
		// A prefault value is fed through the schema, which makes it input-side, so a rewritten inner type leaves it stranded.
		prefault: (s, rewritten) => rewritten ? s._zod.def.innerType : s
	});
}

// ../code/node_modules/zod/v4/classic/coerce.js
var coerce_exports = {};
__export(coerce_exports, {
	bigint: () => bigint2,
	boolean: () => boolean2,
	date: () => date3,
	number: () => number3,
	string: () => string2
});
function string2(params) {
	return _coercedString(ZodString, params);
}
function number3(params) {
	return _coercedNumber(ZodNumber, params);
}
function boolean2(params) {
	return _coercedBoolean(ZodBoolean, params);
}
function bigint2(params) {
	return _coercedBigint(ZodBigInt, params);
}
function date3(params) {
	return _coercedDate(ZodDate, params);
}

// ../code/node_modules/zod/v4/classic/external.js
var external_exports = {};
__export(external_exports, {
	$brand: () => $brand,
	$input: () => $input,
	$output: () => $output,
	INVALID: () => INVALID,
	NEVER: () => NEVER,
	TimePrecision: () => TimePrecision,
	ZodAny: () => ZodAny,
	ZodArray: () => ZodArray,
	ZodBase64: () => ZodBase64,
	ZodBase64URL: () => ZodBase64URL,
	ZodBigInt: () => ZodBigInt,
	ZodBigIntFormat: () => ZodBigIntFormat,
	ZodBoolean: () => ZodBoolean,
	ZodCIDRv4: () => ZodCIDRv4,
	ZodCIDRv6: () => ZodCIDRv6,
	ZodCUID: () => ZodCUID,
	ZodCUID2: () => ZodCUID2,
	ZodCatch: () => ZodCatch,
	ZodCodec: () => ZodCodec,
	ZodCompileAsyncError: () => ZodCompileAsyncError,
	ZodCompileUnsupportedError: () => ZodCompileUnsupportedError,
	ZodCreditCard: () => ZodCreditCard,
	ZodCustom: () => ZodCustom,
	ZodCustomStringFormat: () => ZodCustomStringFormat,
	ZodDate: () => ZodDate,
	ZodDefault: () => ZodDefault,
	ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
	ZodE164: () => ZodE164,
	ZodEmail: () => ZodEmail,
	ZodEmoji: () => ZodEmoji,
	ZodEnum: () => ZodEnum,
	ZodError: () => ZodError,
	ZodExactOptional: () => ZodExactOptional,
	ZodFile: () => ZodFile,
	ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
	ZodFunction: () => ZodFunction,
	ZodGUID: () => ZodGUID,
	ZodIBAN: () => ZodIBAN,
	ZodIPv4: () => ZodIPv4,
	ZodIPv6: () => ZodIPv6,
	ZodISODate: () => ZodISODate,
	ZodISODateTime: () => ZodISODateTime,
	ZodISODuration: () => ZodISODuration,
	ZodISOTime: () => ZodISOTime,
	ZodInstanceOf: () => ZodInstanceOf,
	ZodIntersection: () => ZodIntersection,
	ZodIssueCode: () => ZodIssueCode,
	ZodJWT: () => ZodJWT,
	ZodKSUID: () => ZodKSUID,
	ZodLazy: () => ZodLazy,
	ZodLiteral: () => ZodLiteral,
	ZodMAC: () => ZodMAC,
	ZodMap: () => ZodMap,
	ZodNaN: () => ZodNaN,
	ZodNanoID: () => ZodNanoID,
	ZodNever: () => ZodNever,
	ZodNonOptional: () => ZodNonOptional,
	ZodNull: () => ZodNull,
	ZodNullable: () => ZodNullable,
	ZodNumber: () => ZodNumber,
	ZodNumberFormat: () => ZodNumberFormat,
	ZodObject: () => ZodObject,
	ZodOptional: () => ZodOptional,
	ZodPipe: () => ZodPipe,
	ZodPrefault: () => ZodPrefault,
	ZodPreprocess: () => ZodPreprocess,
	ZodPromise: () => ZodPromise,
	ZodReadonly: () => ZodReadonly,
	ZodRealError: () => ZodRealError,
	ZodRecord: () => ZodRecord,
	ZodSet: () => ZodSet,
	ZodString: () => ZodString,
	ZodStringFormat: () => ZodStringFormat,
	ZodSuccess: () => ZodSuccess,
	ZodSymbol: () => ZodSymbol,
	ZodTemplateLiteral: () => ZodTemplateLiteral,
	ZodTransform: () => ZodTransform,
	ZodTuple: () => ZodTuple,
	ZodType: () => ZodType,
	ZodULID: () => ZodULID,
	ZodURL: () => ZodURL,
	ZodUUID: () => ZodUUID,
	ZodUndefined: () => ZodUndefined,
	ZodUnion: () => ZodUnion,
	ZodUnknown: () => ZodUnknown,
	ZodVoid: () => ZodVoid,
	ZodXID: () => ZodXID,
	ZodXor: () => ZodXor,
	_ZodString: () => _ZodString,
	_default: () => _default2,
	_function: () => _function,
	any: () => any,
	array: () => array,
	base64: () => base642,
	base64url: () => base64url2,
	bigint: () => bigint,
	boolean: () => boolean,
	catch: () => _catch2,
	check: () => check,
	cidrv4: () => cidrv4,
	cidrv6: () => cidrv6,
	clone: () => clone,
	codec: () => codec,
	coerce: () => coerce_exports,
	compile: () => compile,
	config: () => config,
	core: () => core_exports,
	creditCard: () => creditCard,
	cuid: () => cuid,
	cuid2: () => cuid2,
	currencyCode: () => currencyCode2,
	custom: () => custom,
	date: () => date,
	decode: () => decode2,
	decodeAsync: () => decodeAsync2,
	deepPartial: () => deepPartial,
	describe: () => describe2,
	discriminatedUnion: () => discriminatedUnion,
	e164: () => e164,
	email: () => email,
	emoji: () => emoji,
	encode: () => encode2,
	encodeAsync: () => encodeAsync2,
	endsWith: () => _endsWith,
	enum: () => _enum2,
	exactOptional: () => exactOptional,
	file: () => file,
	flattenError: () => flattenError,
	float32: () => float32,
	float64: () => float64,
	formatError: () => formatError,
	fromJSONSchema: () => fromJSONSchema,
	function: () => _function,
	getDiscriminatedOption: () => getDiscriminatedOption,
	getErrorMap: () => getErrorMap,
	globalRegistry: () => globalRegistry,
	gt: () => _gt,
	gte: () => _gte,
	guid: () => guid,
	hash: () => hash,
	hex: () => hex2,
	hostname: () => hostname2,
	httpUrl: () => httpUrl,
	iban: () => iban,
	includes: () => _includes,
	input: () => input,
	instanceof: () => _instanceof,
	int: () => int,
	int32: () => int32,
	int64: () => int64,
	intersection: () => intersection,
	invertCodec: () => invertCodec,
	ipv4: () => ipv4,
	ipv6: () => ipv6,
	iso: () => iso_exports,
	json: () => json,
	jwt: () => jwt,
	keyof: () => keyof,
	ksuid: () => ksuid,
	lazy: () => lazy,
	length: () => _length,
	literal: () => literal,
	locales: () => locales_exports,
	looseObject: () => looseObject,
	looseRecord: () => looseRecord,
	lowercase: () => _lowercase,
	lt: () => _lt,
	lte: () => _lte,
	mac: () => mac,
	map: () => map,
	maxLength: () => _maxLength,
	maxSize: () => _maxSize,
	memoizer: () => memoizer,
	meta: () => meta2,
	mime: () => _mime,
	minLength: () => _minLength,
	minSize: () => _minSize,
	multipleOf: () => _multipleOf,
	nan: () => nan,
	nanoid: () => nanoid,
	nativeEnum: () => nativeEnum,
	negative: () => _negative,
	never: () => never,
	nonnegative: () => _nonnegative,
	nonoptional: () => nonoptional,
	nonpositive: () => _nonpositive,
	normalize: () => _normalize,
	null: () => _null2,
	nullable: () => nullable,
	nullish: () => nullish,
	number: () => number2,
	object: () => object,
	optional: () => optional,
	output: () => output,
	overwrite: () => _overwrite,
	parse: () => parse2,
	parseAsync: () => parseAsync2,
	partialRecord: () => partialRecord,
	pipe: () => pipe,
	positive: () => _positive,
	prefault: () => prefault,
	preprocess: () => preprocess,
	prettifyError: () => prettifyError,
	promise: () => promise,
	properties: () => _properties,
	property: () => _property,
	readonly: () => readonly,
	record: () => record,
	refine: () => refine,
	regex: () => _regex,
	regexes: () => regexes_exports,
	registry: () => registry,
	safeDecode: () => safeDecode2,
	safeDecodeAsync: () => safeDecodeAsync2,
	safeEncode: () => safeEncode2,
	safeEncodeAsync: () => safeEncodeAsync2,
	safeParse: () => safeParse2,
	safeParseAsync: () => safeParseAsync2,
	set: () => set,
	setErrorMap: () => setErrorMap,
	size: () => _size,
	slugify: () => _slugify,
	startsWith: () => _startsWith,
	strictObject: () => strictObject,
	string: () => string,
	stringFormat: () => stringFormat,
	stringbool: () => stringbool,
	success: () => success,
	superRefine: () => superRefine,
	symbol: () => symbol,
	templateLiteral: () => templateLiteral,
	toJSONSchema: () => toJSONSchema,
	toLowerCase: () => _toLowerCase,
	toUpperCase: () => _toUpperCase,
	toZod: () => toZod,
	transform: () => transform,
	treeifyError: () => treeifyError,
	trim: () => _trim,
	tuple: () => tuple,
	uint32: () => uint32,
	uint64: () => uint64,
	ulid: () => ulid,
	undefined: () => _undefined2,
	union: () => union,
	unknown: () => unknown,
	uppercase: () => _uppercase,
	url: () => url,
	util: () => util_exports,
	uuid: () => uuid,
	uuidv4: () => uuidv4,
	uuidv6: () => uuidv6,
	uuidv7: () => uuidv7,
	validate: () => validate,
	validateAsync: () => validateAsync,
	void: () => _void2,
	withParser: () => withParser,
	xid: () => xid,
	xor: () => xor
});

export {
	$output,
	$input,
	registry,
	globalRegistry,
	TimePrecision,
	_lt,
	_lte,
	_gt,
	_gte,
	_positive,
	_negative,
	_nonpositive,
	_nonnegative,
	_multipleOf,
	_maxSize,
	_minSize,
	_size,
	_maxLength,
	_minLength,
	_length,
	_regex,
	_lowercase,
	_uppercase,
	_includes,
	_startsWith,
	_endsWith,
	_property,
	_properties,
	_mime,
	_overwrite,
	_normalize,
	_trim,
	_toLowerCase,
	_toUpperCase,
	_slugify,
	toJSONSchema,
	core_exports,
	ZodError,
	ZodRealError,
	parse2 as parse,
	parseAsync2 as parseAsync,
	safeParse2 as safeParse,
	safeParseAsync2 as safeParseAsync,
	encode2 as encode,
	decode2 as decode,
	encodeAsync2 as encodeAsync,
	decodeAsync2 as decodeAsync,
	safeEncode2 as safeEncode,
	safeDecode2 as safeDecode,
	safeEncodeAsync2 as safeEncodeAsync,
	safeDecodeAsync2 as safeDecodeAsync,
	ZodType,
	_ZodString,
	ZodString,
	string,
	ZodStringFormat,
	ZodISODateTime,
	ZodISODate,
	ZodISOTime,
	ZodISODuration,
	ZodEmail,
	email,
	ZodGUID,
	guid,
	ZodUUID,
	uuid,
	uuidv4,
	uuidv6,
	uuidv7,
	ZodURL,
	url,
	httpUrl,
	ZodEmoji,
	emoji,
	ZodNanoID,
	nanoid,
	ZodCUID,
	cuid,
	ZodCUID2,
	cuid2,
	ZodULID,
	ulid,
	ZodXID,
	xid,
	ZodKSUID,
	ksuid,
	ZodIPv4,
	ipv4,
	ZodMAC,
	mac,
	ZodIPv6,
	ipv6,
	ZodCIDRv4,
	cidrv4,
	ZodCIDRv6,
	cidrv6,
	ZodBase64,
	base642 as base64,
	ZodBase64URL,
	base64url2 as base64url,
	ZodE164,
	e164,
	ZodCreditCard,
	creditCard,
	ZodIBAN,
	iban,
	ZodJWT,
	jwt,
	ZodCustomStringFormat,
	stringFormat,
	hostname2 as hostname,
	hex2 as hex,
	currencyCode2 as currencyCode,
	hash,
	ZodNumber,
	number2 as number,
	ZodNumberFormat,
	int,
	float32,
	float64,
	int32,
	uint32,
	ZodBoolean,
	boolean,
	ZodBigInt,
	bigint,
	ZodBigIntFormat,
	int64,
	uint64,
	ZodSymbol,
	symbol,
	ZodUndefined,
	_undefined2 as _undefined,
	ZodNull,
	_null2 as _null,
	ZodAny,
	any,
	ZodUnknown,
	unknown,
	ZodNever,
	never,
	ZodVoid,
	_void2 as _void,
	ZodDate,
	date,
	ZodArray,
	array,
	keyof,
	ZodObject,
	object,
	strictObject,
	looseObject,
	ZodUnion,
	union,
	ZodXor,
	xor,
	ZodDiscriminatedUnion,
	discriminatedUnion,
	ZodIntersection,
	intersection,
	ZodTuple,
	tuple,
	ZodRecord,
	record,
	partialRecord,
	looseRecord,
	ZodMap,
	map,
	ZodSet,
	set,
	ZodEnum,
	_enum2 as _enum,
	nativeEnum,
	ZodLiteral,
	literal,
	ZodFile,
	file,
	ZodTransform,
	transform,
	ZodOptional,
	optional,
	ZodExactOptional,
	exactOptional,
	ZodNullable,
	nullable,
	nullish,
	ZodDefault,
	_default2 as _default,
	ZodPrefault,
	prefault,
	ZodNonOptional,
	nonoptional,
	ZodSuccess,
	success,
	ZodCatch,
	_catch2 as _catch,
	ZodNaN,
	nan,
	ZodPipe,
	pipe,
	ZodCodec,
	codec,
	invertCodec,
	ZodPreprocess,
	ZodReadonly,
	readonly,
	ZodTemplateLiteral,
	templateLiteral,
	ZodLazy,
	lazy,
	ZodPromise,
	promise,
	ZodFunction,
	_function,
	ZodCustom,
	check,
	custom,
	refine,
	superRefine,
	describe2 as describe,
	meta2 as meta,
	ZodInstanceOf,
	_instanceof,
	stringbool,
	json,
	preprocess,
	ZodIssueCode,
	setErrorMap,
	getErrorMap,
	ZodFirstPartyTypeKind,
	iso_exports,
	fromJSONSchema,
	deepPartial,
	input,
	output,
	coerce_exports,
	external_exports
};
