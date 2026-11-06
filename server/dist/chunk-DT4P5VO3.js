import {
	Doc,
	isValidBase64,
	isValidBase64URL,
	isValidCIDRv6,
	isValidCreditCard,
	isValidIBAN,
	isValidIPv6,
	isValidJWT,
	mergeValues,
	number,
	stripTabAndNewline,
	urlHostnameOk,
	urlProtocolOk,
	validateURL
} from "./chunk-GDOFOZMB.js";
import {
	$ZodAsyncError,
	CONSTANT_CATCH,
	clone,
	codePointLength,
	esc,
	floatSafeRemainder,
	isPlainObject,
	rawShape,
	shallowClone,
	sizeCaps
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/core/memoizer.js
var $ZodCyclicError = class extends Error {
	constructor() {
		super("Cannot parse a reference cycle that closes through a transform"), this.name = "ZodCyclicError";
	}
}, STATE = "~memo", NO_ISSUES = [];
function isRef(value) {
	return value !== null && typeof value == "object";
}
function cloneIssues(issues) {
	return issues.map((iss) => iss.path ? { ...iss, path: iss.path.slice() } : { ...iss });
}
var recursive = /* @__PURE__ */ new WeakMap(), NONE = 0, ASSUMED = 1, PROVEN = 2;
function isRecursive(inst, stack, resolve) {
	let cached = recursive.get(inst);
	if (cached !== void 0)
		return cached ? PROVEN : NONE;
	if (stack.has(inst))
		return PROVEN;
	stack.add(inst);
	let result = NONE, check = (child) => {
		if (result !== PROVEN && child?._zod) {
			let answer = isRecursive(child, stack, resolve);
			answer > result && (result = answer);
		}
	}, shape = (sh, spread) => {
		let answer = NONE;
		for (let key of Reflect.ownKeys(sh)) {
			let desc = Object.getOwnPropertyDescriptor(sh, key);
			if (spread && !desc.enumerable)
				continue;
			let child = desc.get ? ASSUMED : desc.value?._zod ? isRecursive(desc.value, stack, resolve) : NONE;
			child > answer && (answer = child);
		}
		return answer;
	}, merge = (answer) => {
		answer > result && (result = answer);
	}, def = inst._zod.def, kind = def.type;
	switch (kind) {
		case "object": {
			let raw = rawShape(def);
			merge(raw ? shape(raw, !0) : ASSUMED), check(def.catchall);
			break;
		}
		case "array":
			check(def.element);
			break;
		case "tuple":
			for (let el of def.items)
				check(el);
			check(def.rest);
			break;
		case "record":
		case "map":
			check(def.keyType), check(def.valueType);
			break;
		case "set":
			check(def.valueType);
			break;
		case "union":
			for (let el of def.options)
				check(el);
			break;
		case "intersection":
			check(def.left), check(def.right);
			break;
		case "optional":
		case "nullable":
		case "default":
		case "prefault":
		case "catch":
		case "readonly":
		case "nonoptional":
		case "promise":
		case "success":
			check(def.innerType);
			break;
		case "pipe":
			check(def.in), check(def.out);
			break;
		case "function":
			check(def.input), check(def.output);
			break;
		// `$ZodLazy` caches its inner on the def, so a resolved edge is followed exactly
		case "lazy": {
			let inner = def._cachedInner ?? (resolve ? inst._zod.innerType : void 0);
			merge(inner ? isRecursive(inner, stack, !1) : ASSUMED);
			break;
		}
		// a leaf by choice: `parts` are regex fragments, not data positions
		case "template_literal":
		// leaves
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
			break;
		default:
			for (let key in def) {
				let desc = Object.getOwnPropertyDescriptor(def, key);
				if (!desc || desc.get)
					continue;
				let value = desc.value;
				if (!(!value || typeof value != "object")) {
					if (value._zod)
						check(value);
					else if (Array.isArray(value))
						for (let el of value)
							check(el);
				}
			}
	}
	return stack.delete(inst), settle(inst, result);
}
function settle(inst, answer) {
	return answer !== ASSUMED && recursive.set(inst, answer === PROVEN), answer;
}
function isRecursiveSchema(inst) {
	return isRecursive(inst, /* @__PURE__ */ new Set(), !0) !== NONE;
}
function bucketFor(state, inst) {
	let bucket = state.buckets.get(inst);
	return bucket || (bucket = /* @__PURE__ */ new WeakMap(), state.buckets.set(inst, bucket)), bucket;
}
var handoff, open = [], memo = {
	alloc(_inst, payload, empty) {
		let bucket = handoff;
		if (!bucket)
			return empty;
		handoff = void 0;
		let entry = { value: empty, issues: null };
		return bucket.set(payload.value, entry), open.push(entry), empty;
	},
	guard(inst) {
		var _a;
		(_a = inst._zod).deferred ?? (_a.deferred = []), inst._zod.deferred.push(() => {
			let base = inst._zod.parse, wrapped = (payload, ctx) => {
				if (ctx.direction !== "backward" && isBackEdge(ctx, payload.value))
					throw new $ZodCyclicError();
				return base(payload, ctx);
			};
			inst._zod.parse = wrapped, inst._zod.run === base && (inst._zod.run = wrapped);
		});
	},
	attach(inst) {
		var _a;
		let isRecursiveInst, rechecked = !1, lastCtx, lastBucket;
		(_a = inst._zod).deferred ?? (_a.deferred = []), inst._zod.deferred.push(() => {
			let base = inst._zod.parse, wrapped = (payload, ctx) => {
				if (isRecursiveInst === void 0) {
					let walked = isRecursive(inst, /* @__PURE__ */ new Set(), !1);
					if (walked === NONE)
						return inst._zod.parse = base, inst._zod.run === wrapped && (inst._zod.run = base), base(payload, ctx);
					walked === PROVEN || rechecked ? isRecursiveInst = !0 : rechecked = !0;
				}
				let input = payload.value;
				if (!isRef(input))
					return base(payload, ctx);
				let state = ctx[STATE];
				state || (state = { buckets: /* @__PURE__ */ new WeakMap(), backEdges: void 0 }, ctx[STATE] = state);
				let bucket;
				lastCtx === ctx ? bucket = lastBucket : (bucket = bucketFor(state, inst), lastCtx = ctx, lastBucket = bucket);
				let hit = bucket.get(input);
				if (hit)
					return payload.value = hit.value, hit.issues ? hit.issues.length && payload.issues.push(...cloneIssues(hit.issues)) : (payload.memo = !0, state.backEdges ?? (state.backEdges = /* @__PURE__ */ new WeakSet()), state.backEdges.add(hit.value)), payload;
				handoff = bucket;
				let depth = open.length, result = base(payload, ctx);
				handoff = void 0;
				let entry = open.length > depth ? open.pop() : void 0;
				return result instanceof Promise ? result.then((r) => (entry && (entry.issues = r.issues.length ? cloneIssues(r.issues) : NO_ISSUES), r)) : (entry && (entry.issues = result.issues.length ? cloneIssues(result.issues) : NO_ISSUES), result);
			};
			inst._zod.parse = wrapped, inst._zod.run === base && (inst._zod.run = wrapped);
		});
	}
};
function memoizer() {
	return memo;
}
function isBackEdge(ctx, value) {
	let backEdges = ctx[STATE]?.backEdges;
	return backEdges !== void 0 && isRef(value) && backEdges.has(value);
}

// ../code/node_modules/zod/v4/core/compile.js
var INVALID = /* @__PURE__ */ Symbol.for("zod.compile.invalid"), FALLBACK_FLAG = /* @__PURE__ */ Symbol.for("zod.compile.fallback"), ZodCompileAsyncError = class extends Error {
	constructor(message = "z.compile does not support async refinements, transforms, or checks") {
		super(message), this.name = "ZodCompileAsyncError";
	}
}, ZodCompileUnsupportedError = class extends Error {
	constructor(feature, islandable = !0) {
		super(`z.compile does not support ${feature}; this schema must use the runtime parser`), this.name = "ZodCompileUnsupportedError", this.islandable = islandable;
	}
};
function compileValidator(schema, parser) {
	try {
		return compileFn(schema, { assertOnly: !0 });
	} catch {
		return parser;
	}
}
function compile(schema, options) {
	try {
		let parser = compileFn(schema), clone2 = withParser(schema, parser);
		return clone2._zod.bag.validator = compileValidator(schema, parser), clone2;
	} catch (err) {
		if (options?.strict)
			throw err;
		return schema;
	}
}
function withParser(schema, parser) {
	if (isRecursiveSchema(schema))
		throw new ZodCompileUnsupportedError("a schema whose subtree contains a reference cycle");
	let clone2 = clone(schema), liveRun = schema._zod.run, originalRun = liveRun.__originalRun ?? liveRun, wrapped = (payload, ctx) => {
		if (ctx?.async || ctx?.direction === "backward" || ctx?.skipChecks || ctx?.[FALLBACK_FLAG] || ctx && isBackEdge(ctx, payload.value))
			return originalRun(payload, ctx);
		let out = parser(payload.value);
		return out !== INVALID ? (payload.value = out, payload) : (ctx && (ctx[FALLBACK_FLAG] = !0), originalRun(payload, ctx));
	};
	return wrapped.__originalRun = originalRun, clone2._zod.bag.fallbackRun = originalRun, clone2._zod.bag.validator = parser, clone2._zod.run = wrapped, liveRun.__originalRun || installCompiledUserMethods(clone2, schema, parser), clone2;
}
function installCompiledUserMethods(target, source, parser) {
	let targetAny = target, sourceAny = source;
	if (typeof sourceAny.safeParse == "function") {
		let originalSafeParse = sourceAny.safeParse;
		targetAny.safeParse = (data, params) => {
			let out = parser(data);
			return out !== INVALID ? { success: !0, data: out } : originalSafeParse(data, params);
		};
	}
	if (typeof sourceAny.parse == "function") {
		let originalParse = sourceAny.parse;
		targetAny.parse = (data, params) => {
			let out = parser(data);
			return out !== INVALID ? out : originalParse(data, params);
		};
	}
}
function compileFn(schema, options) {
	let recursive2 = !0;
	try {
		recursive2 = isRecursiveSchema(schema);
	} catch {
	}
	if (recursive2)
		throw new ZodCompileUnsupportedError("a schema whose subtree contains a reference cycle");
	let ctx = {
		constants: /* @__PURE__ */ new Map(),
		constantCounter: 0,
		varCounter: 0,
		definite: !0
	}, doc = new Doc(["input"]), outputAccessor = generateCheck(doc, ctx, schema, "input", !options?.assertOnly);
	doc.write(outputAccessor === null ? "return true;" : `return ${outputAccessor};`);
	let constantNames = ["INVALID", ...ctx.constants.keys()], constantValues = [INVALID, ...ctx.constants.values()], code = doc.content.join(`
`), fullCode = options?.debug ? constantNames.length > 0 ? `// Constants: ${constantNames.join(", ")}
${code}` : code : "", F = Function, factoryCode = `return (input) => {
${code}
}`, fn;
	try {
		fn = new F(...constantNames, factoryCode)(...constantValues);
	} catch (err) {
		throw new ZodCompileUnsupportedError(`this schema (generated code failed to evaluate: ${err.message})`);
	}
	return options?.debug && (fn.code = fullCode), fn.definite = ctx.definite, fn;
}
function addConstant(ctx, value) {
	for (let [name2, v] of ctx.constants)
		if (v === value)
			return name2;
	let name = `c${ctx.constantCounter++}`;
	return ctx.constants.set(name, value), name;
}
function addUserConstant(ctx, fn) {
	return ctx.definite = !1, addConstant(ctx, fn);
}
function newVar(ctx) {
	return `v${ctx.varCounter++}`;
}
function runtimeRun(schema, value) {
	let result = schema._zod.run({ value, issues: [] }, {});
	if (result && typeof result.then == "function")
		return INVALID;
	let r = result;
	return r.issues.length === 0 ? r.value : INVALID;
}
function compileChild(doc, ctx, schema, accessor, needsValue = !0) {
	let contentLen = doc.content.length, constantCount = ctx.constants.size, constantCounter = ctx.constantCounter, varCounter = ctx.varCounter;
	try {
		return generateCheck(doc, ctx, schema, accessor, needsValue);
	} catch (err) {
		if (!(err instanceof ZodCompileUnsupportedError) || !err.islandable)
			throw err;
		if (doc.content.length = contentLen, ctx.constants.size > constantCount) {
			let trailing = Array.from(ctx.constants.keys()).slice(constantCount);
			for (let k of trailing)
				ctx.constants.delete(k);
		}
		return ctx.constantCounter = constantCounter, ctx.varCounter = varCounter, emitRuntimeIsland(doc, ctx, schema, accessor);
	}
}
function emitRuntimeIsland(doc, ctx, schema, accessor) {
	ctx.definite = !1;
	let schemaConst = addConstant(ctx, schema), runConst = addConstant(ctx, runtimeRun), outVar = newVar(ctx);
	return doc.write(`const ${outVar} = ${runConst}(${schemaConst}, ${accessor});`), doc.write(`if (${outVar} === INVALID) return INVALID;`), outVar;
}
var WHEN_DEFAULTED_CHECKS = /* @__PURE__ */ new Set([
	"max_size",
	"min_size",
	"size_equals",
	"max_length",
	"min_length",
	"length_equals"
]);
function generateChecks(doc, ctx, schema, accessor) {
	let schemaChecks = schema._zod.def.checks;
	if (!schemaChecks || schemaChecks.length === 0)
		return accessor;
	let currentAccessor = accessor;
	for (let check of schemaChecks) {
		let def = check._zod.def;
		if (def.when && !WHEN_DEFAULTED_CHECKS.has(def.check))
			throw new ZodCompileUnsupportedError('check with a custom "when" condition');
		switch (def.check) {
			case "greater_than":
				generateGreaterThanCheck(doc, ctx, def, currentAccessor);
				break;
			case "less_than":
				generateLessThanCheck(doc, ctx, def, currentAccessor);
				break;
			case "multiple_of":
				generateMultipleOfCheck(doc, ctx, def, currentAccessor);
				break;
			case "number_format":
				generateNumberFormatCheck(doc, def, currentAccessor);
				break;
			case "min_length": {
				let min = numericOperand(def.minimum, "min_length"), len = codePointLengthVar(doc, ctx, currentAccessor, `${currentAccessor}.length >= ${min} && ${currentAccessor}.length < ${def.minimum * 2}`);
				doc.write(`if (${len} < ${min}) return INVALID;`);
				break;
			}
			case "max_length": {
				let max = numericOperand(def.maximum, "max_length"), len = codePointLengthVar(doc, ctx, currentAccessor, `${currentAccessor}.length > ${max}`);
				doc.write(`if (${len} > ${max}) return INVALID;`);
				break;
			}
			case "length_equals": {
				let exact = numericOperand(def.length, "length_equals"), len = codePointLengthVar(doc, ctx, currentAccessor, `${currentAccessor}.length >= ${exact} && ${currentAccessor}.length <= ${def.length * 2}`);
				doc.write(`if (${len} !== ${exact}) return INVALID;`);
				break;
			}
			case "min_size":
				doc.write(`if (${currentAccessor}.size < ${numericOperand(def.minimum, "min_size")}) return INVALID;`);
				break;
			case "max_size":
				doc.write(`if (${currentAccessor}.size > ${numericOperand(def.maximum, "max_size")}) return INVALID;`);
				break;
			case "size_equals":
				doc.write(`if (${currentAccessor}.size !== ${numericOperand(def.size, "size_equals")}) return INVALID;`);
				break;
			case "string_format":
				currentAccessor = generateStringFormatCheck(doc, ctx, def, currentAccessor);
				break;
			case "custom":
				currentAccessor = generateCustomRefineCheck(doc, ctx, check, currentAccessor);
				break;
			case "bigint_format":
				generateBigIntFormatCheck(doc, def, currentAccessor);
				break;
			case "mime_type":
				generateMimeTypeCheck(doc, ctx, def, currentAccessor);
				break;
			case "property":
				generatePropertyCheck(doc, ctx, def, currentAccessor);
				break;
			case "properties":
				generatePropertiesChecks(doc, ctx, def, currentAccessor);
				break;
			case "overwrite": {
				let newAccessor = newVar(ctx);
				generateOverwriteCheck(doc, ctx, check, currentAccessor, newAccessor), currentAccessor = newAccessor;
				break;
			}
			default:
				throw new ZodCompileUnsupportedError(`check type ${def.check}`);
		}
	}
	return currentAccessor;
}
function codePointLengthVar(doc, ctx, accessor, inDoubt) {
	let cpLen = addConstant(ctx, codePointLength), v = newVar(ctx);
	return doc.write(`const ${v} = typeof ${accessor} === "string" && ${inDoubt} ? ${cpLen}(${accessor}) : ${accessor}.length;`), v;
}
function numericOperand(value, label) {
	if (typeof value != "number" || !Number.isFinite(value))
		throw new ZodCompileUnsupportedError(`${label} bound of type ${typeof value}`);
	return `${value}`;
}
function comparisonOperand(ctx, value) {
	if (typeof value == "bigint")
		return `${value}n`;
	if (typeof value == "number") {
		if (Number.isNaN(value))
			throw new ZodCompileUnsupportedError("comparison check with NaN bound");
		return `${value}`;
	}
	if (value instanceof Date) {
		if (Number.isNaN(value.getTime()))
			throw new ZodCompileUnsupportedError("comparison check with Invalid Date bound");
		return addConstant(ctx, value);
	}
	throw new ZodCompileUnsupportedError(`comparison check bound of type ${typeof value}`);
}
function generateGreaterThanCheck(doc, ctx, def, accessor) {
	let op = def.inclusive ? "<" : "<=";
	doc.write(`if (${accessor} ${op} ${comparisonOperand(ctx, def.value)}) return INVALID;`);
}
function generateLessThanCheck(doc, ctx, def, accessor) {
	let op = def.inclusive ? ">" : ">=";
	doc.write(`if (${accessor} ${op} ${comparisonOperand(ctx, def.value)}) return INVALID;`);
}
function generateMultipleOfCheck(doc, ctx, def, accessor) {
	if (typeof def.value == "bigint") {
		if (def.value === BigInt(0))
			throw new ZodCompileUnsupportedError("multiple_of check with a zero divisor");
		doc.write(`if (${accessor} % ${def.value}n !== 0n) return INVALID;`);
	} else {
		let remainder = addConstant(ctx, floatSafeRemainder);
		doc.write(`if (${remainder}(${accessor}, ${numericOperand(def.value, "multiple_of")}) !== 0) return INVALID;`);
	}
}
function generateNumberFormatCheck(doc, def, accessor) {
	let format = def.format;
	switch (format) {
		case "safeint":
			doc.write(`if (!Number.isSafeInteger(${accessor})) return INVALID;`);
			break;
		case "int32":
			doc.write(`if (!Number.isInteger(${accessor}) || ${accessor} < -2147483648 || ${accessor} > 2147483647) return INVALID;`);
			break;
		case "uint32":
			doc.write(`if (!Number.isInteger(${accessor}) || ${accessor} < 0 || ${accessor} > 4294967295) return INVALID;`);
			break;
		case "float32":
			doc.write(`if (!Number.isFinite(${accessor}) || ${accessor} < -3.4028234663852886e38 || ${accessor} > 3.4028234663852886e38) return INVALID;`);
			break;
		case "float64":
			doc.write(`if (!Number.isFinite(${accessor})) return INVALID;`);
			break;
		default:
			throw new ZodCompileUnsupportedError(`number format ${format}`);
	}
}
function generateBigIntFormatCheck(doc, def, accessor) {
	let format = def.format;
	if (format)
		switch (format) {
			case "int64":
				doc.write(`if (${accessor} < -9223372036854775808n || ${accessor} > 9223372036854775807n) return INVALID;`);
				break;
			case "uint64":
				doc.write(`if (${accessor} < 0n || ${accessor} > 18446744073709551615n) return INVALID;`);
				break;
			default:
				throw new ZodCompileUnsupportedError(`bigint format ${format}`);
		}
}
function generateMimeTypeCheck(doc, ctx, def, accessor) {
	let mimeTypes = def.mime;
	if (mimeTypes && mimeTypes.length > 0) {
		let mimeSet = addConstant(ctx, new Set(mimeTypes));
		doc.write(`if (!${mimeSet}.has(${accessor}.type)) return INVALID;`);
	}
}
function generatePropertiesChecks(doc, ctx, def, accessor) {
	if (def.when)
		throw new ZodCompileUnsupportedError('check with a custom "when" condition');
	doc.write(`if (${accessor} == null) return INVALID;`);
	let shape = def.shape;
	for (let key of Reflect.ownKeys(shape)) {
		let keyExpr = typeof key == "symbol" ? addConstant(ctx, key) : esc(key), inputVar = newVar(ctx);
		doc.write(`const ${inputVar} = ${accessor}[${keyExpr}];`), compileChild(doc, ctx, shape[key], inputVar, !1);
	}
}
function generatePropertyCheck(doc, ctx, def, accessor) {
	let propAccessor = `${accessor}[${JSON.stringify(def.property)}]`;
	generateCheck(doc, ctx, def.schema, propAccessor);
}
function generateOverwriteCheck(doc, ctx, check, currentAccessor, newAccessor) {
	let tx = check._zod.def.tx;
	if (!tx)
		throw new ZodCompileUnsupportedError("overwrite check without a transform function");
	if (isAsyncFunction(tx))
		throw new ZodCompileAsyncError("z.compile: async overwrite transforms are not supported");
	let txConst = addConstant(ctx, tx);
	doc.write(`const ${newAccessor} = ${txConst}(${currentAccessor});`);
}
function throwAsync() {
	throw new $ZodAsyncError();
}
function pushIssue(issue) {
	this.issues.push(issue);
}
function generateCustomRefineCheck(doc, ctx, check, accessor) {
	let def = check._zod.def;
	if (def.fn) {
		if (isAsyncFunction(def.fn))
			throw new ZodCompileAsyncError("z.compile: async .refine() predicates are not supported");
		let fnConst = addUserConstant(ctx, def.fn), throwAsyncConst = addConstant(ctx, throwAsync), resVar = newVar(ctx);
		return doc.write(`const ${resVar} = ${fnConst}(${accessor});`), doc.write(`if (${resVar} instanceof Promise) ${throwAsyncConst}();`), doc.write(`if (!${resVar}) return INVALID;`), accessor;
	}
	if (check._zod.check) {
		if (isAsyncFunction(check._zod.check))
			throw new ZodCompileAsyncError("z.compile: async .superRefine() / check functions are not supported");
		let checkFn = check._zod.check, helperConst = addUserConstant(ctx, (value) => {
			let fakePayload = { value, issues: [], addIssue: pushIssue };
			return checkFn(fakePayload) instanceof Promise && throwAsync(), fakePayload.issues.length === 0 ? fakePayload.value : INVALID;
		}), outVar = newVar(ctx);
		return doc.write(`const ${outVar} = ${helperConst}(${accessor});`), doc.write(`if (${outVar} === INVALID) return INVALID;`), outVar;
	}
	throw new ZodCompileUnsupportedError("custom check without a predicate or check function");
}
var PATTERN_IS_COMPLETE = /* @__PURE__ */ new Set([
	"cidrv4",
	"cuid",
	"cuid2",
	"date",
	"datetime",
	"duration",
	"e164",
	"email",
	"emoji",
	"ends_with",
	"guid",
	"includes",
	"ipv4",
	"ksuid",
	"lowercase",
	"mac",
	"nanoid",
	"regex",
	"starts_with",
	"time",
	"ulid",
	"uppercase",
	"uuid",
	"xid"
]);
function generateStringFormatCheck(doc, ctx, def, accessor, needsValue = !0) {
	let fmt = def.format;
	if (fmt === "base64") {
		let validator = addConstant(ctx, isValidBase64);
		return doc.write(`if (!${validator}(${accessor})) return INVALID;`), accessor;
	}
	if (fmt === "base64url") {
		let validator = addConstant(ctx, isValidBase64URL);
		return doc.write(`if (!${validator}(${accessor})) return INVALID;`), accessor;
	}
	if (fmt === "jwt") {
		let validator = addConstant(ctx, isValidJWT), alg = addConstant(ctx, def.alg ?? null);
		return doc.write(`if (!${validator}(${accessor}, ${alg})) return INVALID;`), accessor;
	}
	if (fmt === "ipv6") {
		let validator = addConstant(ctx, isValidIPv6);
		return doc.write(`if (!${validator}(${accessor})) return INVALID;`), accessor;
	}
	if (fmt === "cidrv6") {
		let validator = addConstant(ctx, isValidCIDRv6);
		return doc.write(`if (!${validator}(${accessor})) return INVALID;`), accessor;
	}
	if (fmt === "credit_card") {
		let validator = addConstant(ctx, isValidCreditCard);
		return doc.write(`if (!${validator}(${accessor})) return INVALID;`), accessor;
	}
	if (fmt === "iban") {
		let validator = addConstant(ctx, isValidIBAN);
		return doc.write(`if (!${validator}(${accessor})) return INVALID;`), accessor;
	}
	let formatDef = def;
	if (fmt === "url" || fmt === "httpurl" || formatDef.normalize || formatDef.hostname !== void 0 || formatDef.protocol !== void 0) {
		let parseConst = addConstant(ctx, validateURL), defConst = addConstant(ctx, def), trimVar = newVar(ctx), urlVar = newVar(ctx);
		if (doc.write(`const ${trimVar} = ${accessor}.trim();`), doc.write(`const ${urlVar} = ${parseConst}(${trimVar}, ${defConst});`), doc.write(`if (typeof ${urlVar} === "number") return INVALID;`), formatDef.hostname !== void 0) {
			let hostnameConst = addConstant(ctx, urlHostnameOk);
			doc.write(`if (!${hostnameConst}(${urlVar}, ${defConst}.hostname)) return INVALID;`);
		}
		if (formatDef.protocol !== void 0) {
			let protocolConst = addConstant(ctx, urlProtocolOk);
			doc.write(`if (!${protocolConst}(${urlVar}, ${defConst}.protocol)) return INVALID;`);
		}
		if (!needsValue)
			return null;
		let outputVar = newVar(ctx), outputExpr = formatDef.normalize ? `${urlVar}.href` : `${addConstant(ctx, stripTabAndNewline)}(${trimVar})`;
		return doc.write(`const ${outputVar} = ${outputExpr};`), outputVar;
	}
	let customFn = def.fn;
	if (customFn) {
		if (isAsyncFunction(customFn))
			throw new ZodCompileUnsupportedError(`async string format ${fmt}`);
		let fnConst = addConstant(ctx, customFn);
		return doc.write(`if (!${fnConst}(${accessor})) return INVALID;`), accessor;
	}
	if (PATTERN_IS_COMPLETE.has(fmt) && def.pattern) {
		let patternConst = addConstant(ctx, def.pattern);
		return doc.write(`${patternConst}.lastIndex = 0;`), doc.write(`if (!${patternConst}.test(${accessor})) return INVALID;`), accessor;
	}
	let format = def.format;
	switch (format) {
		case "regex":
			throw new ZodCompileUnsupportedError("regex format without a pattern");
		case "lowercase":
			doc.write(`if (${accessor} !== ${accessor}.toLowerCase()) return INVALID;`);
			break;
		case "uppercase":
			doc.write(`if (${accessor} !== ${accessor}.toUpperCase()) return INVALID;`);
			break;
		case "includes":
			doc.write(`if (!${accessor}.includes(${esc(def.includes)})) return INVALID;`);
			break;
		case "starts_with": {
			let prefix = def.prefix;
			doc.write(`if (${accessor}.slice(0, ${prefix.length}) !== ${esc(prefix)}) return INVALID;`);
			break;
		}
		case "ends_with": {
			let suffix = def.suffix;
			doc.write(`if (${accessor}.slice(-${suffix.length}) !== ${esc(suffix)}) return INVALID;`);
			break;
		}
		default:
			throw new ZodCompileUnsupportedError(`string format ${format}`);
	}
	return accessor;
}
function generateCheck(doc, ctx, schema, accessor, needsValue = !0) {
	let def = schema._zod.def, type = def.type;
	if (def.coerce)
		throw new ZodCompileUnsupportedError(`coercion (z.coerce.${type}())`);
	let buildsValue = needsValue || !!def.checks?.length, typeAccessor;
	switch (type) {
		case "string":
			typeAccessor = generateStringCheck(doc, ctx, schema, accessor, buildsValue);
			break;
		case "number":
			typeAccessor = generateNumberCheck(doc, schema, accessor);
			break;
		case "boolean":
			typeAccessor = generateBooleanCheck(doc, accessor);
			break;
		case "bigint":
			typeAccessor = generateBigIntCheck(doc, schema, accessor);
			break;
		case "symbol":
			typeAccessor = generateSymbolCheck(doc, accessor);
			break;
		case "undefined":
			typeAccessor = generateUndefinedCheck(doc, accessor);
			break;
		case "null":
			typeAccessor = generateNullCheck(doc, accessor);
			break;
		case "any":
		case "unknown":
			typeAccessor = accessor;
			break;
		case "never":
			doc.write("return INVALID;"), typeAccessor = accessor;
			break;
		case "void":
			typeAccessor = generateVoidCheck(doc, accessor);
			break;
		case "nan":
			typeAccessor = generateNaNCheck(doc, accessor);
			break;
		case "date":
			typeAccessor = generateDateCheck(doc, accessor);
			break;
		case "object":
			typeAccessor = generateObjectCheck(doc, ctx, schema, accessor, buildsValue);
			break;
		case "optional":
			typeAccessor = generateOptionalCheck(doc, ctx, schema, accessor, buildsValue);
			break;
		case "nullable":
			typeAccessor = generateNullableCheck(doc, ctx, schema, accessor, buildsValue);
			break;
		case "array":
			typeAccessor = generateArrayCheck(doc, ctx, schema, accessor, buildsValue);
			break;
		case "literal":
			typeAccessor = generateLiteralCheck(doc, ctx, schema, accessor);
			break;
		case "enum":
			typeAccessor = generateEnumCheck(doc, ctx, schema, accessor);
			break;
		case "readonly": {
			let innerOut = generateWrapperCheck(doc, ctx, schema, accessor), frozenVar = newVar(ctx);
			doc.write(`const ${frozenVar} = Object.freeze(${innerOut});`), typeAccessor = frozenVar;
			break;
		}
		case "success":
			generateWrapperCheck(doc, ctx, schema, accessor), typeAccessor = "true";
			break;
		case "default":
		case "prefault":
			typeAccessor = generateDefaultCheck(doc, ctx, schema, accessor);
			break;
		case "nonoptional":
			typeAccessor = generateNonOptionalCheck(doc, ctx, schema, accessor);
			break;
		case "tuple":
			typeAccessor = generateTupleCheck(doc, ctx, schema, accessor);
			break;
		case "union":
			typeAccessor = generateUnionCheck(doc, ctx, schema, accessor);
			break;
		case "intersection":
			typeAccessor = generateIntersectionCheck(doc, ctx, schema, accessor);
			break;
		case "record":
			typeAccessor = generateRecordCheck(doc, ctx, schema, accessor);
			break;
		case "map":
			typeAccessor = generateMapCheck(doc, ctx, schema, accessor);
			break;
		case "set":
			typeAccessor = generateSetCheck(doc, ctx, schema, accessor);
			break;
		case "file":
			typeAccessor = generateFileCheck(doc, accessor);
			break;
		case "template_literal":
			typeAccessor = generateTemplateLiteralCheck(doc, ctx, schema, accessor);
			break;
		case "lazy":
			typeAccessor = generateLazyCheck(doc, ctx, schema, accessor);
			break;
		case "pipe":
			typeAccessor = generatePipeCheck(doc, ctx, schema, accessor);
			break;
		case "custom":
			typeAccessor = generateCustomCheck(doc, ctx, schema, accessor);
			break;
		case "transform":
			typeAccessor = generateTransformCheck(doc, ctx, schema, accessor);
			break;
		case "catch":
			typeAccessor = generateCatchCheck(doc, ctx, schema, accessor);
			break;
		default:
			throw new ZodCompileUnsupportedError(`schema type ${type}`);
	}
	return typeAccessor === null ? null : generateChecks(doc, ctx, schema, typeAccessor);
}
function generateStringCheck(doc, ctx, schema, accessor, needsValue = !0) {
	doc.write(`if (typeof ${accessor} !== "string") return INVALID;`);
	let def = schema._zod.def;
	return def.format === void 0 ? accessor : generateStringFormatCheck(doc, ctx, def, accessor, needsValue);
}
function generateNumberCheck(doc, schema, accessor) {
	doc.write(`if (typeof ${accessor} !== "number" || !Number.isFinite(${accessor})) return INVALID;`);
	let def = schema._zod.def;
	return def.check === "number_format" && def.format && generateNumberFormatCheck(doc, { format: def.format }, accessor), accessor;
}
function generateBooleanCheck(doc, accessor) {
	return doc.write(`if (typeof ${accessor} !== "boolean") return INVALID;`), accessor;
}
function generateBigIntCheck(doc, schema, accessor) {
	doc.write(`if (typeof ${accessor} !== "bigint") return INVALID;`);
	let def = schema._zod.def;
	if (def.format)
		switch (def.format) {
			case "int64":
				doc.write(`if (${accessor} < -9223372036854775808n || ${accessor} > 9223372036854775807n) return INVALID;`);
				break;
			case "uint64":
				doc.write(`if (${accessor} < 0n || ${accessor} > 18446744073709551615n) return INVALID;`);
				break;
		}
	return accessor;
}
function generateSymbolCheck(doc, accessor) {
	return doc.write(`if (typeof ${accessor} !== "symbol") return INVALID;`), accessor;
}
function generateUndefinedCheck(doc, accessor) {
	return doc.write(`if (${accessor} !== undefined) return INVALID;`), accessor;
}
function generateNullCheck(doc, accessor) {
	return doc.write(`if (${accessor} !== null) return INVALID;`), accessor;
}
function generateVoidCheck(doc, accessor) {
	return doc.write(`if (${accessor} !== undefined) return INVALID;`), accessor;
}
function generateNaNCheck(doc, accessor) {
	return doc.write(`if (typeof ${accessor} !== "number" || !Number.isNaN(${accessor})) return INVALID;`), accessor;
}
function generateDateCheck(doc, accessor) {
	return doc.write(`if (!(${accessor} instanceof Date) || Number.isNaN(${accessor}.getTime())) return INVALID;`), accessor;
}
function generateObjectCheck(doc, ctx, schema, accessor, buildsValue = !0) {
	let def = schema._zod.def;
	doc.write(`if (typeof ${accessor} !== "object" || ${accessor} === null || Array.isArray(${accessor})) return INVALID;`);
	let shape = def.shape, keys = Object.keys(shape), symbolKeys = Object.getOwnPropertySymbols(shape), allKeys = symbolKeys.length ? [...keys, ...symbolKeys] : keys, keyExpr = (k) => typeof k == "symbol" ? addConstant(ctx, k) : esc(k), propKey = (k) => typeof k == "symbol" ? `[${keyExpr(k)}]` : esc(k), propShape = shape;
	if (keys.includes("__proto__"))
		throw new ZodCompileUnsupportedError('object shape key "__proto__"');
	let propOutputs = /* @__PURE__ */ new Map();
	for (let key of allKeys) {
		let propSchema = propShape[key], kx = keyExpr(key), inputVar = newVar(ctx);
		if (doc.write(`const ${inputVar} = ${accessor}[${kx}];`), propSchema._zod.optin !== void 0) {
			let outputVar2 = newVar(ctx);
			doc.write(`let ${outputVar2} = (() => {`), doc.indented((d) => {
				let outputAccessor = compileChild(d, ctx, propSchema, inputVar);
				d.write(`return ${outputAccessor};`);
			}), doc.write("})();"), propSchema._zod.optout === "optional" ? (doc.write(`if (${outputVar2} === INVALID) {`), doc.indented((d) => {
				d.write(`if (${kx} in ${accessor}) return INVALID;`), d.write(`${outputVar2} = undefined;`);
			}), doc.write("}")) : doc.write(`if (${outputVar2} === INVALID) return INVALID;`), propOutputs.set(key, outputVar2);
		} else {
			requiresPresenceCheck(propSchema) && doc.write(`if (!(${kx} in ${accessor})) return INVALID;`);
			let outputAccessor = compileChild(doc, ctx, propSchema, inputVar, buildsValue);
			outputAccessor !== null && propOutputs.set(key, outputAccessor);
		}
	}
	let catchall = def.catchall, unknownKeysMode = "none";
	if (catchall) {
		let catchallType = catchall._zod.def.type;
		if (catchallType === "never") {
			let condition = keys.map((k) => `k !== ${esc(k)}`).join(" && ") || "true";
			doc.write(`for (const k in ${accessor}) {`), doc.indented((d) => {
				d.write(`if (${condition}) return INVALID;`);
			}), doc.write("}");
		} else (catchallType === "unknown" || catchallType === "any") && !catchall._zod.def.checks?.length ? unknownKeysMode = "passthrough" : unknownKeysMode = "schema";
	}
	let outputVar = newVar(ctx), hasConditionalKeys = allKeys.some((k) => mayOmitUndefined(propShape[k]) || dropsWhenAbsent(propShape[k]));
	if (!buildsValue) {
		if (unknownKeysMode === "schema") {
			let knownSet = keys.length > 0 ? addConstant(ctx, new Set(keys)) : null;
			doc.write(`for (const k in ${accessor}) {`), doc.indented((d) => {
				d.write('if (k === "__proto__") continue;'), knownSet && d.write(`if (${knownSet}.has(k)) continue;`);
				let valVar = newVar(ctx);
				d.write(`const ${valVar} = ${accessor}[k];`), compileChild(d, ctx, catchall, valVar, !1);
			}), doc.write("}");
		}
		return null;
	}
	if (hasConditionalKeys) {
		doc.write(`const ${outputVar} = {};`);
		for (let k of allKeys) {
			let kx = keyExpr(k), out = propOutputs.get(k);
			dropsWhenAbsent(propShape[k]) ? doc.write(`if (${kx} in ${accessor}) ${outputVar}[${kx}] = ${out};`) : mayOmitUndefined(propShape[k]) ? doc.write(`if (${out} !== undefined || ${kx} in ${accessor}) ${outputVar}[${kx}] = ${out};`) : doc.write(`${outputVar}[${kx}] = ${out};`);
		}
	} else {
		let propLiterals = allKeys.map((k) => `${propKey(k)}: ${propOutputs.get(k)}`).join(", ");
		doc.write(`const ${outputVar} = { ${propLiterals} };`);
	}
	if (unknownKeysMode !== "none") {
		let knownSet = keys.length > 0 ? addConstant(ctx, new Set(keys)) : null;
		doc.write(`for (const k in ${accessor}) {`), doc.indented((d) => {
			if (d.write('if (k === "__proto__") continue;'), knownSet && d.write(`if (${knownSet}.has(k)) continue;`), unknownKeysMode === "passthrough")
				d.write(`${outputVar}[k] = ${accessor}[k];`);
			else {
				let valVar = newVar(ctx);
				d.write(`const ${valVar} = ${accessor}[k];`);
				let catchallOut = compileChild(d, ctx, catchall, valVar);
				d.write(`${outputVar}[k] = ${catchallOut};`);
			}
		}), doc.write("}");
	}
	return outputVar;
}
function generateOptionalCheck(doc, ctx, schema, accessor, buildsValue = !0) {
	let def = schema._zod.def;
	if (isExactOptional(schema))
		return generateCheck(doc, ctx, def.innerType, accessor, buildsValue);
	if (def.innerType._zod.optin === "defaulted") {
		let outputVar2 = newVar(ctx), branchVar = newVar(ctx);
		return doc.write(`let ${outputVar2};`), doc.write(`if (${accessor} === undefined) {`), doc.indented((d) => {
			d.write(`const ${branchVar} = (() => {`), d.indented((d2) => {
				let innerOutput = generateCheck(d2, ctx, def.innerType, accessor);
				d2.write(`return ${innerOutput};`);
			}), d.write("})();"), d.write(`if (${branchVar} !== INVALID) ${outputVar2} = ${branchVar};`);
		}), doc.write("} else {"), doc.indented((d) => {
			let innerOutput = generateCheck(d, ctx, def.innerType, accessor);
			d.write(`${outputVar2} = ${innerOutput};`);
		}), doc.write("}"), outputVar2;
	}
	let outputVar = buildsValue ? newVar(ctx) : null;
	return outputVar && doc.write(`let ${outputVar};`), doc.write(`if (${accessor} !== undefined) {`), doc.indented((d) => {
		let innerOutput = generateCheck(d, ctx, def.innerType, accessor, buildsValue);
		outputVar && innerOutput !== null && d.write(`${outputVar} = ${innerOutput};`);
	}), doc.write("}"), outputVar;
}
function isExactOptional(schema) {
	return schema._zod.traits?.has("$ZodExactOptional") === !0;
}
function requiresPresenceCheck(schema) {
	return schema._zod.optin === void 0 && fastPathAcceptsAbsence(schema);
}
function fastPathAcceptsAbsence(schema) {
	if (schema._zod.def.coerce)
		return !0;
	let def = schema._zod.def;
	switch (def.type) {
		case "any":
		case "unknown":
		case "undefined":
		case "void":
		case "default":
		case "prefault":
		case "transform":
		case "custom":
		case "lazy":
			return !0;
		case "string":
		case "number":
		case "boolean":
		case "bigint":
		case "symbol":
		case "null":
		case "never":
		case "nan":
		case "date":
		case "object":
		case "array":
		case "tuple":
		case "record":
		case "map":
		case "set":
		case "file":
		case "template_literal":
			return !1;
		case "nonoptional":
			return def.innerType ? fastPathAcceptsAbsence(def.innerType) : !1;
		case "literal":
			return !!def.values?.includes(void 0);
		case "enum":
			return !!schema._zod.values?.has(void 0);
		case "optional":
		case "nullable":
		case "readonly":
		case "success":
			return def.innerType ? fastPathAcceptsAbsence(def.innerType) : !0;
		case "catch":
			return !0;
		case "union":
			return def.options ? def.options.some(fastPathAcceptsAbsence) : !0;
		case "intersection":
			return !def.left || !def.right ? !0 : fastPathAcceptsAbsence(def.left) && fastPathAcceptsAbsence(def.right);
		case "pipe":
			return def.in ? fastPathAcceptsAbsence(def.in) : !0;
		default:
			return !0;
	}
}
function dropsWhenAbsent(schema) {
	return schema._zod.optin === "optional" && schema._zod.optout === "optional";
}
function mayOmitUndefined(schema) {
	return (schema._zod.optin !== "defaulted" || schema._zod.optout === "optional") && mayOutputUndefined(schema);
}
function mayOutputUndefined(schema) {
	let def = schema._zod.def;
	switch (def.type) {
		case "string":
		case "number":
		case "boolean":
		case "bigint":
		case "symbol":
		case "null":
		case "nan":
		case "date":
		case "object":
		case "array":
		case "tuple":
		case "record":
		case "map":
		case "set":
		case "file":
		case "template_literal":
		case "never":
		case "success":
			return !1;
		case "literal":
			return !!def.values?.includes(void 0);
		case "enum":
			return !!schema._zod.values?.has(void 0);
		case "optional":
			return !0;
		case "nullable":
		case "readonly":
		case "nonoptional":
			return def.innerType ? mayOutputUndefined(def.innerType) : !0;
		case "union":
			return def.options ? def.options.some(mayOutputUndefined) : !0;
		case "intersection":
			return !def.left || !def.right || mayOutputUndefined(def.left) || mayOutputUndefined(def.right);
		case "pipe":
			return def.out ? mayOutputUndefined(def.out) : !0;
		default:
			return !0;
	}
}
function generateNullableCheck(doc, ctx, schema, accessor, buildsValue = !0) {
	let def = schema._zod.def, outputVar = buildsValue ? newVar(ctx) : null;
	return outputVar && doc.write(`let ${outputVar} = null;`), doc.write(`if (${accessor} !== null) {`), doc.indented((d) => {
		let innerOutput = generateCheck(d, ctx, def.innerType, accessor, buildsValue);
		outputVar && innerOutput !== null && d.write(`${outputVar} = ${innerOutput};`);
	}), doc.write("}"), outputVar;
}
function generateSizeGate(doc, schema, size) {
	for (let [max, check] of sizeCaps(schema._zod.def.checks))
		doc.write(`if (${size} > ${numericOperand(max, check._zod.def.check)}) return INVALID;`);
}
function generateArrayCheck(doc, ctx, schema, accessor, buildsValue = !0) {
	let def = schema._zod.def;
	doc.write(`if (!Array.isArray(${accessor})) return INVALID;`), generateSizeGate(doc, schema, `${accessor}.length`);
	let outputVar = buildsValue ? newVar(ctx) : null, iVar = newVar(ctx), elemVar = newVar(ctx);
	return outputVar && doc.write(`const ${outputVar} = new Array(${accessor}.length);`), doc.write(`for (let ${iVar} = 0; ${iVar} < ${accessor}.length; ${iVar}++) {`), doc.indented((d) => {
		d.write(`const ${elemVar} = ${accessor}[${iVar}];`);
		let elemOutput = compileChild(d, ctx, def.element, elemVar, buildsValue);
		outputVar && elemOutput !== null && d.write(`${outputVar}[${iVar}] = ${elemOutput};`);
	}), doc.write("}"), outputVar;
}
function generateLiteralCheck(doc, ctx, schema, accessor) {
	let values = schema._zod.def.values;
	if (values.length !== 1) {
		let literalSet = addConstant(ctx, new Set(values));
		return doc.write(`if (!${literalSet}.has(${accessor})) return INVALID;`), accessor;
	}
	let value = values[0];
	if (typeof value == "number" && Number.isNaN(value)) {
		let literalSet = addConstant(ctx, new Set(values));
		return doc.write(`if (!${literalSet}.has(${accessor})) return INVALID;`), accessor;
	}
	if (typeof value == "string")
		doc.write(`if (${accessor} !== ${esc(value)}) return INVALID;`);
	else if (typeof value == "number" || typeof value == "boolean")
		doc.write(`if (${accessor} !== ${value}) return INVALID;`);
	else if (value === null)
		doc.write(`if (${accessor} !== null) return INVALID;`);
	else if (value === void 0)
		doc.write(`if (${accessor} !== undefined) return INVALID;`);
	else if (typeof value == "bigint")
		doc.write(`if (${accessor} !== ${value}n) return INVALID;`);
	else
		throw new ZodCompileUnsupportedError(`literal type ${typeof value}`);
	return accessor;
}
function generateEnumCheck(doc, ctx, schema, accessor) {
	let values = schema._zod.values;
	if (!values)
		throw new ZodCompileUnsupportedError("enum schema without enumerated values");
	let enumSet = addConstant(ctx, values);
	return doc.write(`if (!${enumSet}.has(${accessor})) return INVALID;`), accessor;
}
function generateWrapperCheck(doc, ctx, schema, accessor) {
	let def = schema._zod.def;
	return generateCheck(doc, ctx, def.innerType, accessor);
}
function generateDefaultCheck(doc, ctx, schema, accessor) {
	let def = schema._zod.def, defaultGetter = Object.getOwnPropertyDescriptor(schema._zod.def, "defaultValue") ? () => schema._zod.def.defaultValue : void 0;
	if (schema._zod.def.type === "prefault") {
		if (!defaultGetter)
			return generateCheck(doc, ctx, def.innerType, accessor);
		let defaultFn = addConstant(ctx, defaultGetter), inputVar = newVar(ctx);
		return doc.write(`let ${inputVar} = ${accessor};`), doc.write(`if (${accessor} === undefined) ${inputVar} = ${defaultFn}();`), generateCheck(doc, ctx, def.innerType, inputVar);
	}
	let outputVar = newVar(ctx);
	if (defaultGetter) {
		let defaultFn = addConstant(ctx, defaultGetter), cloneFn = addConstant(ctx, shallowClone);
		doc.write(`let ${outputVar};`), doc.write(`if (${accessor} === undefined) {`), doc.indented((d) => {
			d.write(`${outputVar} = ${cloneFn}(${defaultFn}());`);
		}), doc.write("} else {"), doc.indented((d) => {
			let innerOutput = generateCheck(d, ctx, def.innerType, accessor);
			d.write(`${outputVar} = ${innerOutput} === undefined ? ${cloneFn}(${defaultFn}()) : ${innerOutput};`);
		}), doc.write("}");
	} else
		doc.write(`let ${outputVar};`), doc.write(`if (${accessor} !== undefined) {`), doc.indented((d) => {
			let innerOutput = generateCheck(d, ctx, def.innerType, accessor);
			d.write(`${outputVar} = ${innerOutput};`);
		}), doc.write("}");
	return outputVar;
}
function generateNonOptionalCheck(doc, ctx, schema, accessor) {
	let def = schema._zod.def, innerOutput = generateCheck(doc, ctx, def.innerType, accessor), outputVar = newVar(ctx);
	return doc.write(`const ${outputVar} = ${innerOutput};`), doc.write(`if (${outputVar} === undefined) return INVALID;`), outputVar;
}
function generateTupleCheck(doc, ctx, schema, accessor) {
	let def = schema._zod.def, items = def.items, rest = def.rest;
	doc.write(`if (!Array.isArray(${accessor})) return INVALID;`);
	let optinStart = getTupleOptStart(items, "optin"), optoutStart = getTupleOptStart(items, "optout");
	rest ? doc.write(`if (${accessor}.length < ${optinStart}) return INVALID;`) : doc.write(`if (${accessor}.length < ${optinStart} || ${accessor}.length > ${items.length}) return INVALID;`);
	let outputVar = newVar(ctx);
	doc.write(`const ${outputVar} = [];`);
	for (let i = 0; i < items.length; i++) {
		let itemSchema = items[i];
		if (i >= optoutStart)
			doc.write(`if (${outputVar}.length === ${i}) {`), doc.indented((d) => {
				d.write(`if (${i} < ${accessor}.length) {`), d.indented((d2) => {
					let elemVar = newVar(ctx);
					d2.write(`const ${elemVar} = ${accessor}[${i}];`);
					let elemOutput = compileChild(d2, ctx, itemSchema, elemVar);
					d2.write(`${outputVar}[${i}] = ${elemOutput};`);
				}), d.write("} else {"), d.indented((d2) => {
					if (dropsWhenAbsent(itemSchema)) {
						d2.write(`${outputVar}.length = ${i};`);
						return;
					}
					let elemVar = newVar(ctx), branchVar = newVar(ctx);
					d2.write(`const ${elemVar} = undefined;`), d2.write(`const ${branchVar} = (() => {`), d2.indented((d3) => {
						let elemOutput = compileChild(d3, ctx, itemSchema, elemVar);
						d3.write(`return ${elemOutput};`);
					}), d2.write("})();"), d2.write(`if (${branchVar} === INVALID || ${branchVar} === undefined) ${outputVar}.length = ${i};`), d2.write(`else ${outputVar}[${i}] = ${branchVar};`);
				}), d.write("}");
			}), doc.write("}");
		else {
			let elemVar = newVar(ctx);
			doc.write(`const ${elemVar} = ${accessor}[${i}];`);
			let elemOutput = compileChild(doc, ctx, itemSchema, elemVar);
			doc.write(`${outputVar}[${i}] = ${elemOutput};`);
		}
	}
	if (rest) {
		let iVar = newVar(ctx), elemVar = newVar(ctx);
		doc.write(`for (let ${iVar} = ${items.length}; ${iVar} < ${accessor}.length; ${iVar}++) {`), doc.indented((d) => {
			d.write(`const ${elemVar} = ${accessor}[${iVar}];`);
			let elemOutput = compileChild(d, ctx, rest, elemVar);
			d.write(`${outputVar}[${iVar}] = ${elemOutput};`);
		}), doc.write("}");
	}
	return outputVar;
}
function getTupleOptStart(items, key) {
	for (let i = items.length - 1; i >= 0; i--)
		if (!(key === "optin" ? items[i]._zod.optin !== void 0 : items[i]._zod.optout === "optional"))
			return i + 1;
	return 0;
}
function generateUnionCheck(doc, ctx, schema, accessor) {
	let def = schema._zod.def, options = def.options;
	if (def.discriminator)
		return generateDiscriminatedUnionCheck(doc, ctx, def, accessor);
	if (def.inclusive === !1)
		throw new ZodCompileUnsupportedError("exclusive unions (z.xor)");
	if (options.length === 0)
		return doc.write("return INVALID;"), accessor;
	if (options.length === 1)
		return generateCheck(doc, ctx, options[0], accessor);
	if (options.every((opt) => opt._zod.def.type === "literal" && !opt._zod.def.checks?.length)) {
		let values = new Set(options.flatMap((opt) => opt._zod.def.values)), valuesConst = addConstant(ctx, values);
		return doc.write(`if (!${valuesConst}.has(${accessor})) return INVALID;`), accessor;
	}
	let outputVar = newVar(ctx);
	doc.write(`let ${outputVar};`);
	for (let i = 0; i < options.length; i++) {
		let opt = options[i];
		i === 0 ? doc.write(`${outputVar} = (() => {`) : doc.write(`if (${outputVar} === INVALID) ${outputVar} = (() => {`), doc.indented((d) => {
			let branchOutput = generateCheck(d, ctx, opt, accessor);
			d.write(`return ${branchOutput};`);
		}), doc.write("})();");
	}
	return doc.write(`if (${outputVar} === INVALID) return INVALID;`), outputVar;
}
function generateDiscriminatedUnionCheck(doc, ctx, def, accessor) {
	if (def.unionFallback)
		throw new ZodCompileUnsupportedError("discriminated union with unionFallback");
	if (def.options.length === 0)
		return doc.write("return INVALID;"), accessor;
	let discVar = newVar(ctx), outputVar = newVar(ctx);
	doc.write(`const ${discVar} = ${accessor}?.[${esc(def.discriminator)}];`), doc.write(`let ${outputVar};`);
	let firstBranch = !0, claimed = /* @__PURE__ */ new Set();
	for (let option of def.options) {
		let values = option._zod.propValues?.[def.discriminator];
		if (!values || values.size === 0)
			throw new ZodCompileUnsupportedError("discriminated union option without static discriminator values");
		for (let value of values) {
			if (claimed.has(value))
				throw new ZodCompileUnsupportedError(`duplicate discriminator value ${String(value)}`);
			claimed.add(value);
		}
		let conditions = Array.from(values, (value) => literalEquality(ctx, discVar, value)), prefix = firstBranch ? "if" : "else if";
		doc.write(`${prefix} (${conditions.join(" || ")}) {`), doc.indented((d) => {
			let branchOutput = generateCheck(d, ctx, option, accessor);
			d.write(`${outputVar} = ${branchOutput};`);
		}), doc.write("}"), firstBranch = !1;
	}
	return doc.write("else { return INVALID; }"), outputVar;
}
function literalEquality(ctx, accessor, value) {
	if (typeof value == "string")
		return `${accessor} === ${esc(value)}`;
	if (typeof value == "number")
		return Number.isNaN(value) ? `Number.isNaN(${accessor})` : `${accessor} === ${value}`;
	if (typeof value == "boolean")
		return `${accessor} === ${value}`;
	if (value === null)
		return `${accessor} === null`;
	if (value === void 0)
		return `${accessor} === undefined`;
	if (typeof value == "bigint")
		return `${accessor} === ${value}n`;
	if (typeof value == "symbol") {
		let symbolConst = addConstant(ctx, value);
		return `${accessor} === ${symbolConst}`;
	}
	throw new ZodCompileUnsupportedError(`literal discriminator value ${String(value)}`);
}
function generateIntersectionCheck(doc, ctx, schema, accessor) {
	let def = schema._zod.def;
	ctx.definite = !1;
	let leftOutput = compileChild(doc, ctx, def.left, accessor), rightOutput = compileChild(doc, ctx, def.right, accessor), mergeConst = addConstant(ctx, mergeValues), mergedVar = newVar(ctx);
	return doc.write(`const ${mergedVar} = ${mergeConst}(${leftOutput}, ${rightOutput});`), doc.write(`if (!${mergedVar}.valid) return INVALID;`), `${mergedVar}.data`;
}
function generateRecordCheck(doc, ctx, schema, accessor) {
	let def = schema._zod.def, isPlainObjectConst = addConstant(ctx, isPlainObject);
	doc.write(`if (!${isPlainObjectConst}(${accessor})) return INVALID;`);
	let outputVar = newVar(ctx), kVar = newVar(ctx), valVar = newVar(ctx);
	doc.write(`const ${outputVar} = {};`);
	let recordDef = def, keyValues = recordDef.partial ? void 0 : def.keyType._zod.values;
	if (keyValues) {
		let inputKeys = [];
		for (let key of keyValues) {
			if (!(typeof key == "string" || typeof key == "number" || typeof key == "symbol"))
				throw new ZodCompileUnsupportedError(`record key value ${String(key)}`);
			let inputKey = typeof key == "number" ? key.toString() : key;
			if (inputKey === "__proto__")
				throw new ZodCompileUnsupportedError('record key "__proto__"');
			inputKeys.push(inputKey);
			let keyConst = addConstant(ctx, key), outKey = generateCheck(doc, ctx, def.keyType, keyConst), valueVar = newVar(ctx);
			doc.write(`const ${valueVar} = ${accessor}[${literalPropertyKey(ctx, inputKey)}];`);
			let valOutput = compileChild(doc, ctx, def.valueType, valueVar);
			doc.write(`${outputVar}[${outKey}] = ${valOutput};`);
		}
		let knownKeysConst = addConstant(ctx, new Set(inputKeys));
		return doc.write(`for (const ${kVar} in ${accessor}) {`), doc.indented((d) => {
			d.write(`if (${knownKeysConst}.has(${kVar})) continue;`), recordDef.mode === "loose" ? d.write(`if (${kVar} !== "__proto__") ${outputVar}[${kVar}] = ${accessor}[${kVar}];`) : d.write("return INVALID;");
		}), doc.write("}"), outputVar;
	}
	let keyDef = def.keyType._zod.def;
	if (!(keyDef.type === "string" && keyDef.format === void 0 && !keyDef.coerce && (keyDef.checks?.length ?? 0) === 0)) {
		let isLoose = def.mode === "loose", keyFn = compileFn(def.keyType);
		keyFn.definite === !1 && (ctx.definite = !1);
		let keyFast = addConstant(ctx, keyFn), numericConst = addConstant(ctx, number), outKeyVar = newVar(ctx);
		return emitOwnKeys(doc, ctx, accessor, kVar, (d) => {
			d.write(`let ${outKeyVar} = ${keyFast}(${kVar});`), d.write(`if (${outKeyVar} === INVALID && typeof ${kVar} === "string" && ${numericConst}.test(${kVar})) ${outKeyVar} = ${keyFast}(Number(${kVar}));`), isLoose ? d.write(`if (${outKeyVar} === INVALID) { ${outputVar}[${kVar}] = ${accessor}[${kVar}]; continue; }`) : d.write(`if (${outKeyVar} === INVALID) return INVALID;`), d.write(`if (${outKeyVar} === "__proto__") continue;`);
			let valueVar = newVar(ctx);
			d.write(`const ${valueVar} = ${accessor}[${kVar}];`);
			let valOutput = compileChild(d, ctx, def.valueType, valueVar);
			d.write(`${outputVar}[${outKeyVar}] = ${valOutput};`);
		}), outputVar;
	}
	return emitOwnKeys(doc, ctx, accessor, kVar, (d) => {
		d.write(`const ${valVar} = ${accessor}[${kVar}];`);
		let valOutput = compileChild(d, ctx, def.valueType, valVar);
		d.write(`${outputVar}[${kVar}] = ${valOutput};`);
	}, "return INVALID;"), outputVar;
}
function emitOwnKeys(doc, ctx, accessor, kVar, body, onSymbol) {
	let propIsEnumerableConst = addConstant(ctx, Object.prototype.propertyIsEnumerable), symsVar = newVar(ctx), keysVar = newVar(ctx), iVar = newVar(ctx);
	doc.write(`const ${symsVar} = Object.getOwnPropertySymbols(${accessor});`), doc.write(`const ${keysVar} = Object.getOwnPropertyNames(${accessor});`), doc.write(`for (let ${iVar} = 0; ${iVar} < ${keysVar}.length; ${iVar}++) {`), doc.indented((d) => {
		d.write(`const ${kVar} = ${keysVar}[${iVar}];`), d.write(`if (${kVar} === "__proto__" || !${propIsEnumerableConst}.call(${accessor}, ${kVar})) continue;`), body(d);
	}), doc.write("}"), doc.write(`for (let ${iVar} = 0; ${iVar} < ${symsVar}.length; ${iVar}++) {`), doc.indented((d) => {
		d.write(`const ${kVar} = ${symsVar}[${iVar}];`), d.write(`if (!${propIsEnumerableConst}.call(${accessor}, ${kVar})) continue;`), onSymbol ? d.write(onSymbol) : body(d);
	}), doc.write("}");
}
function literalPropertyKey(ctx, key) {
	return typeof key == "string" ? esc(key) : addConstant(ctx, key);
}
function generateMapCheck(doc, ctx, schema, accessor) {
	let def = schema._zod.def;
	doc.write(`if (!(${accessor} instanceof Map)) return INVALID;`), generateSizeGate(doc, schema, `${accessor}.size`);
	let outputVar = newVar(ctx), kVar = newVar(ctx), valVar = newVar(ctx);
	return doc.write(`const ${outputVar} = new Map();`), doc.write(`for (const [${kVar}, ${valVar}] of ${accessor}) {`), doc.indented((d) => {
		let keyOutput = generateCheck(d, ctx, def.keyType, kVar), valOutput = generateCheck(d, ctx, def.valueType, valVar);
		d.write(`${outputVar}.set(${keyOutput}, ${valOutput});`);
	}), doc.write("}"), outputVar;
}
function generateSetCheck(doc, ctx, schema, accessor) {
	let def = schema._zod.def;
	doc.write(`if (!(${accessor} instanceof Set)) return INVALID;`), generateSizeGate(doc, schema, `${accessor}.size`);
	let outputVar = newVar(ctx), valVar = newVar(ctx);
	return doc.write(`const ${outputVar} = new Set();`), doc.write(`for (const ${valVar} of ${accessor}) {`), doc.indented((d) => {
		let valOutput = generateCheck(d, ctx, def.valueType, valVar);
		d.write(`${outputVar}.add(${valOutput});`);
	}), doc.write("}"), outputVar;
}
function generateFileCheck(doc, accessor) {
	return doc.write(`if (!(${accessor} instanceof File)) return INVALID;`), accessor;
}
function generateTemplateLiteralCheck(doc, ctx, schema, accessor) {
	doc.write(`if (typeof ${accessor} !== "string") return INVALID;`);
	let pattern = schema._zod.pattern;
	if (pattern) {
		let patternConst = addConstant(ctx, pattern);
		doc.write(`${patternConst}.lastIndex = 0;`), doc.write(`if (!${patternConst}.test(${accessor})) return INVALID;`);
	}
	return accessor;
}
function generateLazyCheck(doc, ctx, schema, accessor) {
	let def = schema._zod.def, getterConst = addUserConstant(ctx, def.getter), cacheConst = addConstant(ctx, { parser: null });
	doc.write(`if (!${cacheConst}.parser) {`), doc.indented((d) => {
		d.write(`const inner = ${getterConst}();`), d.write(`${cacheConst}.parser = function(input) {`), d.indented((d2) => {
			d2.write("const result = inner._zod.run({ value: input, issues: [] }, {});"), d2.write("return result.issues.length === 0 ? result.value : INVALID;");
		}), d.write("};");
	}), doc.write("}");
	let outputVar = newVar(ctx);
	return doc.write(`const ${outputVar} = ${cacheConst}.parser(${accessor});`), doc.write(`if (${outputVar} === INVALID) return INVALID;`), outputVar;
}
function generatePipeCheck(doc, ctx, schema, accessor) {
	let def = schema._zod.def, inputOutput = generateCheck(doc, ctx, def.in, accessor);
	if (def.transform) {
		if (isAsyncFunction(def.transform))
			throw new ZodCompileAsyncError("z.compile: async transforms in pipes are not supported");
		let transformFn = def.transform, helperConst = addUserConstant(ctx, (value) => {
			let fakePayload = { value, issues: [], addIssue: pushIssue }, result = transformFn(value, fakePayload);
			return result instanceof Promise ? INVALID : fakePayload.issues.length === 0 ? result : INVALID;
		}), transformedVar = newVar(ctx);
		return doc.write(`const ${transformedVar} = ${helperConst}(${inputOutput});`), doc.write(`if (${transformedVar} === INVALID) return INVALID;`), generateCheck(doc, ctx, def.out, transformedVar);
	} else
		return generateCheck(doc, ctx, def.out, inputOutput);
}
function isAsyncFunction(fn) {
	return typeof fn == "function" && (fn.constructor.name === "AsyncFunction" || fn[Symbol.toStringTag] === "AsyncFunction");
}
function generateCustomCheck(doc, ctx, schema, accessor) {
	let def = schema._zod.def;
	if (def.fn) {
		if (isAsyncFunction(def.fn))
			throw new ZodCompileAsyncError("z.compile: async custom predicates are not supported");
		let fnConst = addUserConstant(ctx, def.fn), throwAsyncConst = addConstant(ctx, throwAsync), resVar = newVar(ctx);
		doc.write(`const ${resVar} = ${fnConst}(${accessor});`), doc.write(`if (${resVar} instanceof Promise) ${throwAsyncConst}();`), doc.write(`if (!${resVar}) return INVALID;`);
	} else
		throw new ZodCompileUnsupportedError("custom schema without a predicate function");
	return accessor;
}
function runtimeCatch(innerSchema, catchValue, value) {
	let result = innerSchema._zod.run({ value, issues: [] }, {});
	if (result && typeof result.then == "function")
		return INVALID;
	let r = result;
	return r.issues.length === 0 ? r.value : catchValue();
}
function generateCatchCheck(doc, ctx, schema, accessor) {
	let def = schema._zod.def;
	if (!def.catchValue[CONSTANT_CATCH])
		throw new ZodCompileUnsupportedError("catch with a callback (only a constant catch value compiles)", !1);
	let outputVar = newVar(ctx);
	doc.write(`let ${outputVar} = (() => {`), doc.indented((d) => {
		let innerOut = compileChild(d, ctx, def.innerType, accessor);
		d.write(`return ${innerOut};`);
	}), doc.write("})();");
	let innerConst = addConstant(ctx, def.innerType), catchConst = addUserConstant(ctx, def.catchValue), catchHelperConst = addConstant(ctx, runtimeCatch);
	return doc.write(`if (${outputVar} === INVALID) {`), doc.indented((d) => {
		d.write(`${outputVar} = ${catchHelperConst}(${innerConst}, ${catchConst}, ${accessor});`), d.write(`if (${outputVar} === INVALID) return INVALID;`);
	}), doc.write("}"), outputVar;
}
function generateTransformCheck(doc, ctx, schema, accessor) {
	let def = schema._zod.def;
	if (def.transform) {
		if (isAsyncFunction(def.transform))
			throw new ZodCompileAsyncError("z.compile: async transforms are not supported");
		let transformFn = def.transform, helperConst = addUserConstant(ctx, (value) => {
			let fakePayload = { value, issues: [], addIssue: pushIssue }, result = transformFn(value, fakePayload);
			return result instanceof Promise ? INVALID : fakePayload.issues.length === 0 ? result : INVALID;
		}), outputVar = newVar(ctx);
		return doc.write(`const ${outputVar} = ${helperConst}(${accessor});`), doc.write(`if (${outputVar} === INVALID) return INVALID;`), outputVar;
	}
	return accessor;
}

export {
	$ZodCyclicError,
	isRecursiveSchema,
	memoizer,
	isBackEdge,
	INVALID,
	ZodCompileAsyncError,
	ZodCompileUnsupportedError,
	compile,
	withParser,
	compileFn
};
