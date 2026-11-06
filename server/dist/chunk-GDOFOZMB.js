import {
	$ZodAsyncError,
	$ZodEncodeError,
	$constructor,
	BIGINT_FORMAT_RANGES,
	NUMBER_FORMAT_RANGES,
	aborted,
	allowsEval,
	assignProp,
	attachSchema,
	cached,
	captureStackTrace,
	cleanRegex,
	codePointLength,
	config,
	defineLazy,
	defineLazyInternal,
	esc,
	escapeRegex,
	explicitlyAborted,
	finalizeIssue,
	floatSafeRemainder,
	getEnumValues,
	getLengthableOrigin,
	getSizableOrigin,
	globalConfig,
	hide,
	isObject,
	isPlainObject,
	issue,
	jsonStringifyReplacer,
	nullish,
	optionalKeys,
	own,
	prefixIssues,
	primitiveTypes,
	propertyKeyTypes,
	rawShape,
	sizeCaps
} from "./chunk-AYRWRYEI.js";
import {
	__export
} from "./chunk-RPIPBOPC.js";

// ../code/node_modules/zod/v4/core/regexes.js
var regexes_exports = {};
__export(regexes_exports, {
	anyString: () => anyString,
	base64: () => base64,
	base64url: () => base64url,
	bigint: () => bigint,
	boolean: () => boolean,
	browserEmail: () => browserEmail,
	cidrv4: () => cidrv4,
	cidrv6: () => cidrv6,
	creditCard: () => creditCard,
	cuid: () => cuid,
	cuid2: () => cuid2,
	currencyCode: () => currencyCode,
	date: () => date,
	datetime: () => datetime,
	domain: () => domain,
	duration: () => duration,
	e164: () => e164,
	email: () => email,
	emoji: () => emoji,
	extendedDuration: () => extendedDuration,
	guid: () => guid,
	hex: () => hex,
	hostname: () => hostname,
	html5Email: () => html5Email,
	httpProtocol: () => httpProtocol,
	iban: () => iban,
	idnEmail: () => idnEmail,
	integer: () => integer,
	ipv4: () => ipv4,
	ipv6: () => ipv6,
	ksuid: () => ksuid,
	lowercase: () => lowercase,
	mac: () => mac,
	md5_base64: () => md5_base64,
	md5_base64url: () => md5_base64url,
	md5_hex: () => md5_hex,
	nanoid: () => nanoid,
	nanoidOfLength: () => nanoidOfLength,
	null: () => _null,
	number: () => number,
	rfc5322Email: () => rfc5322Email,
	sha1_base64: () => sha1_base64,
	sha1_base64url: () => sha1_base64url,
	sha1_hex: () => sha1_hex,
	sha256_base64: () => sha256_base64,
	sha256_base64url: () => sha256_base64url,
	sha256_hex: () => sha256_hex,
	sha384_base64: () => sha384_base64,
	sha384_base64url: () => sha384_base64url,
	sha384_hex: () => sha384_hex,
	sha512_base64: () => sha512_base64,
	sha512_base64url: () => sha512_base64url,
	sha512_hex: () => sha512_hex,
	string: () => string,
	time: () => time,
	ulid: () => ulid,
	undefined: () => _undefined,
	unicodeEmail: () => unicodeEmail,
	uppercase: () => uppercase,
	uuid: () => uuid,
	uuid4: () => uuid4,
	uuid6: () => uuid6,
	uuid7: () => uuid7,
	xid: () => xid
});
var cuid = /^[cC][0-9a-z]{6,}$/, cuid2 = /^[0-9a-z]+$/, ulid = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/, xid = /^[0-9a-vA-V]{20}$/, ksuid = /^[A-Za-z0-9]{27}$/, nanoid = /^[a-zA-Z0-9_-]{21}$/;
function nanoidOfLength(length) {
	return new RegExp(`^[a-zA-Z0-9_-]{${length}}$`);
}
var duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, extendedDuration = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, uuid = (version2) => version2 ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version2}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, uuid4 = /* @__PURE__ */ uuid(4), uuid6 = /* @__PURE__ */ uuid(6), uuid7 = /* @__PURE__ */ uuid(7), email = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, html5Email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, rfc5322Email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, unicodeEmail = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u, idnEmail = unicodeEmail, browserEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, _emoji = "^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$";
function emoji() {
	return new RegExp(_emoji, "u");
}
var ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, mac = (delimiter) => {
	let escapedDelim = escapeRegex(delimiter ?? ":");
	return new RegExp(`^(?:[0-9A-F]{2}${escapedDelim}){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}${escapedDelim}){5}[0-9a-f]{2}$`);
}, cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, base64url = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/, hostname = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/, domain = /^(?=.{1,253}$)([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}$/, httpProtocol = /^https?$/, e164 = /^\+[1-9]\d{6,14}$/, creditCard = /^\d(?:[ -]?\d){11,18}$/, currencyCode = /^(?:AED|AFN|ALL|AMD|AOA|ARS|AUD|AWG|AZN|BAM|BBD|BDT|BHD|BIF|BMD|BND|BOB|BOV|BRL|BSD|BTN|BWP|BYN|BZD|CAD|CDF|CHE|CHF|CHW|CLF|CLP|CNY|COP|COU|CRC|CUP|CVE|CZK|DJF|DKK|DOP|DZD|EGP|ERN|ETB|EUR|FJD|FKP|GBP|GEL|GHS|GIP|GMD|GNF|GTQ|GYD|HKD|HNL|HTG|HUF|IDR|ILS|INR|IQD|IRR|ISK|JMD|JOD|JPY|KES|KGS|KHR|KMF|KPW|KRW|KWD|KYD|KZT|LAK|LBP|LKR|LRD|LSL|LYD|MAD|MDL|MGA|MKD|MMK|MNT|MOP|MRU|MUR|MVR|MWK|MXN|MXV|MYR|MZN|NAD|NGN|NIO|NOK|NPR|NZD|OMR|PAB|PEN|PGK|PHP|PKR|PLN|PYG|QAR|RON|RSD|RUB|RWF|SAR|SBD|SCR|SDG|SEK|SGD|SHP|SLE|SOS|SRD|SSP|STN|SVC|SYP|SZL|THB|TJS|TMT|TND|TOP|TRY|TTD|TWD|TZS|UAH|UGX|USD|USN|UYI|UYU|UYW|UZS|VED|VES|VND|VUV|WST|XAD|XAF|XAG|XAU|XBA|XBB|XBC|XBD|XCD|XCG|XDR|XOF|XPD|XPF|XPT|XSU|XTS|XUA|XXX|YER|ZAR|ZMW|ZWG)$/, iban = /^[A-Z]{2}(?!00|01|99)\d{2}[A-Z0-9]{11,30}$/, dateSource = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";
function anchor(source) {
	return new RegExp(`^${source}$`);
}
var date = /* @__PURE__ */ anchor(dateSource);
function timeSource(args) {
	let hhmm = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof args.precision == "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : args.seconds ? `${hhmm}:[0-5]\\d(?:\\.\\d+)?` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function time(args) {
	return new RegExp(`^${timeSource(args)}$`);
}
function datetime(args) {
	let opts = ["Z"];
	args.offset && opts.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
	let qualified = `${timeSource({ precision: args.precision, seconds: !0 })}(?:${opts.join("|")})`, timeRegex = args.local ? `${qualified}|${timeSource({ precision: args.precision })}` : qualified;
	return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
}
var anyString = /^[\s\S]{0,}$/, string = (params) => {
	let regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : "[\\s\\S]*";
	return new RegExp(`^${regex}$`);
}, bigint = /^-?\d+n?$/, integer = /^-?\d+$/, number = /^-?\d+(?:\.\d+)?$/, boolean = /^(?:true|false)$/i, _null = /^null$/i;
var _undefined = /^undefined$/i;
var lowercase = /^[^A-Z]*$/, uppercase = /^[^a-z]*$/, hex = /^[0-9a-fA-F]*$/;
function fixedBase64(bodyLength, padding) {
	return new RegExp(`^[A-Za-z0-9+/]{${bodyLength}}${padding}$`);
}
function fixedBase64url(length) {
	return new RegExp(`^[A-Za-z0-9_-]{${length}}$`);
}
var md5_hex = /^[0-9a-fA-F]{32}$/, md5_base64 = /* @__PURE__ */ fixedBase64(22, "=="), md5_base64url = /* @__PURE__ */ fixedBase64url(22), sha1_hex = /^[0-9a-fA-F]{40}$/, sha1_base64 = /* @__PURE__ */ fixedBase64(27, "="), sha1_base64url = /* @__PURE__ */ fixedBase64url(27), sha256_hex = /^[0-9a-fA-F]{64}$/, sha256_base64 = /* @__PURE__ */ fixedBase64(43, "="), sha256_base64url = /* @__PURE__ */ fixedBase64url(43), sha384_hex = /^[0-9a-fA-F]{96}$/, sha384_base64 = /* @__PURE__ */ fixedBase64(64, ""), sha384_base64url = /* @__PURE__ */ fixedBase64url(64), sha512_hex = /^[0-9a-fA-F]{128}$/, sha512_base64 = /* @__PURE__ */ fixedBase64(86, "=="), sha512_base64url = /* @__PURE__ */ fixedBase64url(86);

// ../code/node_modules/zod/v4/core/checks.js
var $ZodCheck = /* @__PURE__ */ $constructor("$ZodCheck", (inst, def) => {
	var _a;
	inst._zod ?? (inst._zod = {}), inst._zod.def = def, (_a = inst._zod).onattach ?? (_a.onattach = []);
}), _whenHasSize = (payload) => {
	let val = payload.value;
	return !nullish(val) && val.size !== void 0;
}, _whenHasLength = (payload) => {
	let val = payload.value;
	return !nullish(val) && val.length !== void 0;
}, numericOriginMap = {
	number: "number",
	bigint: "bigint",
	object: "date"
}, $ZodCheckLessThan = /* @__PURE__ */ $constructor("$ZodCheckLessThan", (inst, def) => {
	$ZodCheck.init(inst, def);
	let origin = numericOriginMap[typeof def.value];
	inst._zod.check = (payload) => {
		(def.inclusive ? payload.value <= def.value : payload.value < def.value) || payload.issues.push({
			origin: numericOriginMap[typeof payload.value] ?? origin,
			code: "too_big",
			maximum: typeof def.value == "object" ? def.value.getTime() : def.value,
			input: payload.value,
			inclusive: def.inclusive,
			inst,
			continue: !def.abort
		});
	};
}), $ZodCheckGreaterThan = /* @__PURE__ */ $constructor("$ZodCheckGreaterThan", (inst, def) => {
	$ZodCheck.init(inst, def);
	let origin = numericOriginMap[typeof def.value];
	inst._zod.check = (payload) => {
		(def.inclusive ? payload.value >= def.value : payload.value > def.value) || payload.issues.push({
			origin: numericOriginMap[typeof payload.value] ?? origin,
			code: "too_small",
			minimum: typeof def.value == "object" ? def.value.getTime() : def.value,
			input: payload.value,
			inclusive: def.inclusive,
			inst,
			continue: !def.abort
		});
	};
}), $ZodCheckMultipleOf = /* @__PURE__ */ $constructor("$ZodCheckMultipleOf", (inst, def) => {
	$ZodCheck.init(inst, def), inst._zod.check = (payload) => {
		if (typeof payload.value != typeof def.value)
			throw new Error("Cannot mix number and bigint in multiple_of check.");
		(typeof payload.value == "bigint" ? (
			// `value % 0n` throws, and nothing is a multiple of zero — the number branch already fails this way via NaN
			def.value !== BigInt(0) && payload.value % def.value === BigInt(0)
		) : floatSafeRemainder(payload.value, def.value) === 0) || payload.issues.push({
			origin: typeof payload.value,
			code: "not_multiple_of",
			divisor: def.value,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
}), $ZodCheckNumberFormat = /* @__PURE__ */ $constructor("$ZodCheckNumberFormat", (inst, def) => {
	$ZodCheck.init(inst, def), def.format = def.format || "float64";
	let isInt = def.format?.includes("int"), origin = isInt ? "int" : "number", [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
	inst._zod.check = (payload) => {
		let input = payload.value;
		if (isInt) {
			if (!Number.isInteger(input)) {
				payload.issues.push({
					expected: origin,
					format: def.format,
					code: "invalid_type",
					continue: !1,
					input,
					inst
				});
				return;
			}
			if (!Number.isSafeInteger(input)) {
				input > 0 ? payload.issues.push({
					input,
					code: "too_big",
					maximum: Number.MAX_SAFE_INTEGER,
					note: "Integers must be within the safe integer range.",
					inst,
					origin,
					inclusive: !0,
					continue: !def.abort
				}) : payload.issues.push({
					input,
					code: "too_small",
					minimum: Number.MIN_SAFE_INTEGER,
					note: "Integers must be within the safe integer range.",
					inst,
					origin,
					inclusive: !0,
					continue: !def.abort
				});
				return;
			}
		}
		input < minimum && payload.issues.push({
			origin: "number",
			input,
			code: "too_small",
			minimum,
			inclusive: !0,
			inst,
			continue: !def.abort
		}), input > maximum && payload.issues.push({
			origin: "number",
			input,
			code: "too_big",
			maximum,
			inclusive: !0,
			inst,
			continue: !def.abort
		});
	};
}), $ZodCheckBigIntFormat = /* @__PURE__ */ $constructor("$ZodCheckBigIntFormat", (inst, def) => {
	$ZodCheck.init(inst, def);
	let [minimum, maximum] = BIGINT_FORMAT_RANGES[def.format];
	inst._zod.check = (payload) => {
		let input = payload.value;
		input < minimum && payload.issues.push({
			origin: "bigint",
			input,
			code: "too_small",
			minimum,
			inclusive: !0,
			inst,
			continue: !def.abort
		}), input > maximum && payload.issues.push({
			origin: "bigint",
			input,
			code: "too_big",
			maximum,
			inclusive: !0,
			inst,
			continue: !def.abort
		});
	};
}), $ZodCheckMaxSize = /* @__PURE__ */ $constructor("$ZodCheckMaxSize", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def), (_a = inst._zod.def).when ?? (_a.when = _whenHasSize), inst._zod.check = (payload) => {
		let input = payload.value;
		input.size <= def.maximum || payload.issues.push({
			origin: getSizableOrigin(input),
			code: "too_big",
			maximum: def.maximum,
			inclusive: !0,
			input,
			inst,
			continue: !def.abort
		});
	};
}), $ZodCheckMinSize = /* @__PURE__ */ $constructor("$ZodCheckMinSize", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def), (_a = inst._zod.def).when ?? (_a.when = _whenHasSize), inst._zod.check = (payload) => {
		let input = payload.value;
		input.size >= def.minimum || payload.issues.push({
			origin: getSizableOrigin(input),
			code: "too_small",
			minimum: def.minimum,
			inclusive: !0,
			input,
			inst,
			continue: !def.abort
		});
	};
}), $ZodCheckSizeEquals = /* @__PURE__ */ $constructor("$ZodCheckSizeEquals", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def), (_a = inst._zod.def).when ?? (_a.when = _whenHasSize), inst._zod.check = (payload) => {
		let input = payload.value, size = input.size;
		if (size === def.size)
			return;
		let tooBig = size > def.size;
		payload.issues.push({
			origin: getSizableOrigin(input),
			...tooBig ? { code: "too_big", maximum: def.size } : { code: "too_small", minimum: def.size },
			inclusive: !0,
			exact: !0,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
}), $ZodCheckMaxLength = /* @__PURE__ */ $constructor("$ZodCheckMaxLength", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def), (_a = inst._zod.def).when ?? (_a.when = _whenHasLength), inst._zod.check = (payload) => {
		let input = payload.value, units = input.length;
		if ((typeof input == "string" && units > def.maximum ? codePointLength(input) : units) <= def.maximum)
			return;
		let origin = getLengthableOrigin(input);
		payload.issues.push({
			origin,
			code: "too_big",
			maximum: def.maximum,
			inclusive: !0,
			input,
			inst,
			continue: !def.abort
		});
	};
}), $ZodCheckMinLength = /* @__PURE__ */ $constructor("$ZodCheckMinLength", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def), (_a = inst._zod.def).when ?? (_a.when = _whenHasLength), inst._zod.check = (payload) => {
		let input = payload.value, units = input.length;
		if ((typeof input == "string" && units >= def.minimum && units < def.minimum * 2 ? codePointLength(input) : units) >= def.minimum)
			return;
		let origin = getLengthableOrigin(input);
		payload.issues.push({
			origin,
			code: "too_small",
			minimum: def.minimum,
			inclusive: !0,
			input,
			inst,
			continue: !def.abort
		});
	};
}), $ZodCheckLengthEquals = /* @__PURE__ */ $constructor("$ZodCheckLengthEquals", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def), (_a = inst._zod.def).when ?? (_a.when = _whenHasLength), inst._zod.check = (payload) => {
		let input = payload.value, units = input.length, length = typeof input == "string" && units >= def.length && units <= def.length * 2 ? codePointLength(input) : units;
		if (length === def.length)
			return;
		let origin = getLengthableOrigin(input), tooBig = length > def.length;
		payload.issues.push({
			origin,
			...tooBig ? { code: "too_big", maximum: def.length } : { code: "too_small", minimum: def.length },
			inclusive: !0,
			exact: !0,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
}), $ZodCheckStringFormat = /* @__PURE__ */ $constructor("$ZodCheckStringFormat", (inst, def) => {
	var _a, _b;
	$ZodCheck.init(inst, def), def.pattern ? (_a = inst._zod).check ?? (_a.check = (payload) => {
		def.pattern.lastIndex = 0, !def.pattern.test(payload.value) && payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: def.format,
			input: payload.value,
			...def.pattern ? { pattern: def.pattern.toString() } : {},
			inst,
			continue: !def.abort
		});
	}) : (_b = inst._zod).check ?? (_b.check = () => {
	});
}), $ZodCheckRegex = /* @__PURE__ */ $constructor("$ZodCheckRegex", (inst, def) => {
	$ZodCheckStringFormat.init(inst, def), inst._zod.check = (payload) => {
		def.pattern.lastIndex = 0, !def.pattern.test(payload.value) && payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "regex",
			input: payload.value,
			pattern: def.pattern.toString(),
			inst,
			continue: !def.abort
		});
	};
}), $ZodCheckLowerCase = /* @__PURE__ */ $constructor("$ZodCheckLowerCase", (inst, def) => {
	def.pattern ?? (def.pattern = lowercase), $ZodCheckStringFormat.init(inst, def);
}), $ZodCheckUpperCase = /* @__PURE__ */ $constructor("$ZodCheckUpperCase", (inst, def) => {
	def.pattern ?? (def.pattern = uppercase), $ZodCheckStringFormat.init(inst, def);
}), $ZodCheckIncludes = /* @__PURE__ */ $constructor("$ZodCheckIncludes", (inst, def) => {
	$ZodCheck.init(inst, def);
	let escapedRegex = escapeRegex(def.includes), pattern = new RegExp(typeof def.position == "number" ? `^.{${def.position},}${escapedRegex}` : escapedRegex);
	def.pattern = pattern, inst._zod.check = (payload) => {
		payload.value.includes(def.includes, def.position) || payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "includes",
			includes: def.includes,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
}), $ZodCheckStartsWith = /* @__PURE__ */ $constructor("$ZodCheckStartsWith", (inst, def) => {
	$ZodCheck.init(inst, def);
	let pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
	def.pattern ?? (def.pattern = pattern), inst._zod.check = (payload) => {
		payload.value.startsWith(def.prefix) || payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "starts_with",
			prefix: def.prefix,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
}), $ZodCheckEndsWith = /* @__PURE__ */ $constructor("$ZodCheckEndsWith", (inst, def) => {
	$ZodCheck.init(inst, def);
	let pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
	def.pattern ?? (def.pattern = pattern), inst._zod.check = (payload) => {
		payload.value.endsWith(def.suffix) || payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "ends_with",
			suffix: def.suffix,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
function handleCheckPropertyResult(result, payload, property) {
	result.issues.length && payload.issues.push(...prefixIssues(property, result.issues));
}
var $ZodCheckProperty = /* @__PURE__ */ $constructor("$ZodCheckProperty", (inst, def) => {
	$ZodCheck.init(inst, def), inst._zod.check = (payload) => {
		let result = def.schema._zod.run({
			value: payload.value[def.property],
			issues: []
		}, {});
		if (result instanceof Promise)
			return result.then((result2) => handleCheckPropertyResult(result2, payload, def.property));
		handleCheckPropertyResult(result, payload, def.property);
	};
}), $ZodCheckProperties = /* @__PURE__ */ $constructor("$ZodCheckProperties", (inst, def) => {
	$ZodCheck.init(inst, def), hide(inst, Symbol.iterator, function* () {
		yield inst;
	});
	let entries;
	inst._zod.check = (payload) => {
		if (payload.value == null) {
			payload.issues.push({ expected: "object", code: "invalid_type", input: payload.value, inst });
			return;
		}
		entries ?? (entries = Reflect.ownKeys(def.shape).map((key) => [key, def.shape[key]]));
		let input = payload.value, proms;
		for (let [key, schema] of entries) {
			let result = schema._zod.run({ value: input[key], issues: [] }, {});
			result instanceof Promise ? (proms ?? (proms = []), proms.push(result.then((result2) => handleCheckPropertyResult(result2, payload, key)))) : handleCheckPropertyResult(result, payload, key);
		}
		if (proms)
			return Promise.all(proms).then(() => {
			});
	};
}), $ZodCheckMimeType = /* @__PURE__ */ $constructor("$ZodCheckMimeType", (inst, def) => {
	$ZodCheck.init(inst, def);
	let mimeSet = new Set(def.mime);
	inst._zod.check = (payload) => {
		mimeSet.has(payload.value.type) || payload.issues.push({
			code: "invalid_value",
			values: def.mime,
			input: payload.value.type,
			inst,
			continue: !def.abort
		});
	};
}), $ZodCheckOverwrite = /* @__PURE__ */ $constructor("$ZodCheckOverwrite", (inst, def) => {
	$ZodCheck.init(inst, def), inst._zod.check = (payload) => {
		payload.value = def.tx(payload.value);
	};
});

// ../code/node_modules/zod/v4/core/doc.js
var Doc = class {
	constructor(args = [], closed = {}) {
		this.content = [], this.indent = 0, this.args = args, this.closed = closed;
	}
	// the compiler catches a child's throw and keeps writing into this doc, so the indent has to unwind with it
	indented(fn) {
		this.indent += 1;
		try {
			fn(this);
		} finally {
			this.indent -= 1;
		}
	}
	write(arg) {
		if (typeof arg == "function") {
			arg(this, { execution: "sync" }), arg(this, { execution: "async" });
			return;
		}
		let lines = arg.split(`
`).filter((x) => x), minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length)), dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
		for (let line of dedented)
			this.content.push(line);
	}
	compile() {
		let F = Function, content = this?.content ?? [""];
		return new F(...Object.keys(this.closed), `return function (${this.args.join(", ")}) {
${content.join(`
`)}
};`)(...Object.values(this.closed));
	}
};

// ../code/node_modules/zod/v4/core/errors.js
function _getMessage() {
	let internals = this._zod;
	return internals.message ?? (internals.message = JSON.stringify(internals.def, jsonStringifyReplacer, 2)), internals.message;
}
function _setMessage(value) {
	this._zod.message = value;
}
var _messageDesc = {
	get: _getMessage,
	set: _setMessage,
	enumerable: !0,
	configurable: !0
}, _issuesDesc = { value: void 0, enumerable: !1 }, _installedToString = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), initializer = (inst, def) => {
	inst.name = "$ZodError", _issuesDesc.value = def, Object.defineProperty(inst, "issues", _issuesDesc), _issuesDesc.value = void 0, Object.defineProperty(inst, "message", _messageDesc);
	let proto = Object.getPrototypeOf(inst);
	_installedToString.has(proto) || (_installedToString.add(proto), Object.defineProperty(proto, "toString", {
		configurable: !0,
		enumerable: !1,
		get() {
			let value = () => this.message;
			return Object.defineProperty(this, "toString", { value, configurable: !0, writable: !0 }), value;
		},
		set(value) {
			Object.defineProperty(this, "toString", { value, configurable: !0, writable: !0 });
		}
	}));
}, $ZodError = $constructor("$ZodError", initializer), $ZodRealError = $constructor("$ZodError", initializer, void 0, {
	Parent: Error
});
function node(obj, key, make) {
	return Object.prototype.hasOwnProperty.call(obj, key) || (key === "__proto__" ? Object.defineProperty(obj, key, { value: make(), writable: !0, enumerable: !0, configurable: !0 }) : obj[key] = make()), obj[key];
}
function flattenError(error, mapper = (issue2) => issue2.message) {
	let fieldErrors = {}, formErrors = [];
	for (let sub of error.issues)
		sub.path.length > 0 ? node(fieldErrors, sub.path[0], () => []).push(mapper(sub)) : formErrors.push(mapper(sub));
	return { formErrors, fieldErrors };
}
function formatError(error, mapper = (issue2) => issue2.message) {
	let fieldErrors = { _errors: [] }, processError = (error2, path = []) => {
		for (let issue2 of error2.issues)
			if (issue2.code === "invalid_union" && issue2.errors.length)
				issue2.errors.map((issues) => processError({ issues }, [...path, ...issue2.path]));
			else if (issue2.code === "invalid_key")
				processError({ issues: issue2.issues }, [...path, ...issue2.path]);
			else if (issue2.code === "invalid_element")
				processError({ issues: issue2.issues }, [...path, ...issue2.path]);
			else {
				let fullpath = [...path, ...issue2.path];
				if (fullpath.length === 0)
					fieldErrors._errors.push(mapper(issue2));
				else {
					let curr = fieldErrors, i = 0;
					for (; i < fullpath.length; ) {
						let el = fullpath[i], terminal = i === fullpath.length - 1;
						if (el === "_errors") {
							terminal && curr._errors.push(mapper(issue2)), i++;
							continue;
						}
						Object.prototype.hasOwnProperty.call(curr, el) || Object.defineProperty(curr, el, {
							value: { _errors: [] },
							enumerable: !0,
							writable: !0,
							configurable: !0
						});
						let node2 = curr[el];
						terminal && node2._errors.push(mapper(issue2)), curr = node2, i++;
					}
				}
			}
	};
	return processError(error), fieldErrors;
}
function treeifyError(error, mapper = (issue2) => issue2.message) {
	let result = { errors: [] }, processError = (error2, path = []) => {
		var _a;
		for (let issue2 of error2.issues)
			if (issue2.code === "invalid_union" && issue2.errors.length)
				issue2.errors.map((issues) => processError({ issues }, [...path, ...issue2.path]));
			else if (issue2.code === "invalid_key")
				processError({ issues: issue2.issues }, [...path, ...issue2.path]);
			else if (issue2.code === "invalid_element")
				processError({ issues: issue2.issues }, [...path, ...issue2.path]);
			else {
				let fullpath = [...path, ...issue2.path];
				if (fullpath.length === 0) {
					result.errors.push(mapper(issue2));
					continue;
				}
				let curr = result, i = 0;
				for (; i < fullpath.length; ) {
					let el = fullpath[i], terminal = i === fullpath.length - 1;
					typeof el == "string" ? (curr.properties ?? (curr.properties = {}), Object.prototype.hasOwnProperty.call(curr.properties, el) || Object.defineProperty(curr.properties, el, {
						value: { errors: [] },
						enumerable: !0,
						writable: !0,
						configurable: !0
					}), curr = curr.properties[el]) : (curr.items ?? (curr.items = []), (_a = curr.items)[el] ?? (_a[el] = { errors: [] }), curr = curr.items[el]), terminal && curr.errors.push(mapper(issue2)), i++;
				}
			}
	};
	return processError(error), result;
}
function toDotPath(_path) {
	let segs = [], path = _path.map((seg) => typeof seg == "object" ? seg.key : seg);
	for (let seg of path)
		typeof seg == "number" ? segs.push(`[${seg}]`) : typeof seg == "symbol" ? segs.push(`[${JSON.stringify(String(seg))}]`) : /[^\w$]/.test(seg) ? segs.push(`[${JSON.stringify(seg)}]`) : (segs.length && segs.push("."), segs.push(seg));
	return segs.join("");
}
function prettifyError(error) {
	let lines = [], issues = [...error.issues].sort((a, b) => (a.path ?? []).length - (b.path ?? []).length);
	for (let issue2 of issues)
		lines.push(`\u2716 ${issue2.message}`), issue2.path?.length && lines.push(`  \u2192 at ${toDotPath(issue2.path)}`);
	return lines.join(`
`);
}

// ../code/node_modules/zod/v4/core/parse.js
function finalizeParams(callee, params) {
	return { callee: params?.callee ?? callee, Err: params?.Err };
}
var _parse = (_Err) => {
	let fn = (schema, value, _ctx, _params) => {
		let ctx = _ctx ? { ..._ctx, async: !1 } : { async: !1 }, result = schema._zod.run({ value, issues: [] }, ctx);
		if (result instanceof Promise)
			throw new $ZodAsyncError();
		if (result.issues.length) {
			let e = new (_params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
			throw captureStackTrace(e, _params?.callee ?? fn), e;
		}
		return result.value;
	};
	return fn;
}, parse = /* @__PURE__ */ _parse($ZodRealError), _parseAsync = (_Err) => {
	let fn = async (schema, value, _ctx, params) => {
		let ctx = _ctx ? { ..._ctx, async: !0 } : { async: !0 }, result = schema._zod.run({ value, issues: [] }, ctx);
		if (result instanceof Promise && (result = await result), result.issues.length) {
			let e = new (params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
			throw captureStackTrace(e, params?.callee ?? fn), e;
		}
		return result.value;
	};
	return fn;
}, parseAsync = /* @__PURE__ */ _parseAsync($ZodRealError), _safeParse = (_Err) => (schema, value, _ctx) => {
	let ctx = _ctx ? { ..._ctx, async: !1 } : { async: !1 }, result = schema._zod.run({ value, issues: [] }, ctx);
	if (result instanceof Promise)
		throw new $ZodAsyncError();
	return result.issues.length ? failure(_Err, result.issues, ctx) : { success: !0, data: result.value };
}, safeParse = /* @__PURE__ */ _safeParse($ZodRealError);
function failure(Err, issues, ctx) {
	let error;
	return {
		success: !1,
		get error() {
			return error || (error = new Err(issues.map((iss) => finalizeIssue(iss, ctx, config()))), issues = void 0, ctx = void 0), error;
		},
		set error(e) {
			error = e, issues = void 0, ctx = void 0;
		}
	};
}
var _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
	let ctx = _ctx ? { ..._ctx, async: !0 } : { async: !0 }, result = schema._zod.run({ value, issues: [] }, ctx);
	return result instanceof Promise && (result = await result), result.issues.length ? failure(_Err, result.issues, ctx) : { success: !0, data: result.value };
}, safeParseAsync = /* @__PURE__ */ _safeParseAsync($ZodRealError), COMPILE_INVALID = /* @__PURE__ */ Symbol.for("zod.compile.invalid"), COMPILE_FALLBACK = /* @__PURE__ */ Symbol.for("zod.compile.fallback"), validate = ((schema, value, _ctx) => {
	let validator = schema._zod.bag.validator;
	if (validator !== void 0) {
		if (validator(value) !== COMPILE_INVALID)
			return !0;
		if (validator.definite === !0 && _ctx === void 0)
			return !1;
	}
	return validateFallback(schema, value, _ctx);
});
function validateFallback(schema, value, _ctx) {
	let ctx = _ctx ? { ..._ctx, async: !1, abortEarly: !0 } : { async: !1, abortEarly: !0 }, fallbackRun = schema._zod.bag.fallbackRun, result;
	if (fallbackRun ? (ctx[COMPILE_FALLBACK] = !0, result = fallbackRun({ value, issues: [] }, ctx)) : result = schema._zod.run({ value, issues: [] }, ctx), result instanceof Promise)
		throw new $ZodAsyncError();
	return result.issues.length === 0;
}
var validateAsync = async (schema, value, _ctx) => {
	let ctx = _ctx ? { ..._ctx, async: !0, abortEarly: !0 } : { async: !0, abortEarly: !0 }, result = schema._zod.run({ value, issues: [] }, ctx);
	return result instanceof Promise && (result = await result), result.issues.length === 0;
}, _encode = (_Err) => {
	let parse2 = _parse(_Err), fn = (schema, value, _ctx, _params) => {
		let ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
		return parse2(schema, value, ctx, finalizeParams(fn, _params));
	};
	return fn;
}, encode = /* @__PURE__ */ _encode($ZodRealError), _decode = (_Err) => {
	let parse2 = _parse(_Err), fn = (schema, value, _ctx, _params) => parse2(schema, value, _ctx, finalizeParams(fn, _params));
	return fn;
}, decode = /* @__PURE__ */ _decode($ZodRealError), _encodeAsync = (_Err) => {
	let parseAsync2 = _parseAsync(_Err), fn = async (schema, value, _ctx, _params) => {
		let ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
		return await parseAsync2(schema, value, ctx, finalizeParams(fn, _params));
	};
	return fn;
}, encodeAsync = /* @__PURE__ */ _encodeAsync($ZodRealError), _decodeAsync = (_Err) => {
	let parseAsync2 = _parseAsync(_Err), fn = async (schema, value, _ctx, _params) => await parseAsync2(schema, value, _ctx, finalizeParams(fn, _params));
	return fn;
}, decodeAsync = /* @__PURE__ */ _decodeAsync($ZodRealError), _safeEncode = (_Err) => (schema, value, _ctx) => {
	let ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
	return _safeParse(_Err)(schema, value, ctx);
}, safeEncode = /* @__PURE__ */ _safeEncode($ZodRealError), _safeDecode = (_Err) => (schema, value, _ctx) => _safeParse(_Err)(schema, value, _ctx), safeDecode = /* @__PURE__ */ _safeDecode($ZodRealError), _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
	let ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
	return _safeParseAsync(_Err)(schema, value, ctx);
}, safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync($ZodRealError), _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => _safeParseAsync(_Err)(schema, value, _ctx), safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync($ZodRealError);

// ../code/node_modules/zod/v4/core/versions.js
var version = {
	major: 4,
	minor: 6,
	patch: 7
};

// ../code/node_modules/zod/v4/core/schemas.js
var $ZodType = /* @__PURE__ */ $constructor("$ZodType", (inst, def) => {
	var _a;
	inst ?? (inst = {}), inst._zod.def = def, inst._zod.bag = inst._zod.bag || {}, inst._zod.version = version;
	let defChecks = inst._zod.def.checks, checks = inst._zod.traits.has("$ZodCheck") ? [inst, ...defChecks ?? []] : defChecks?.length ? [...defChecks] : [];
	for (let ch of checks)
		for (let fn of ch._zod.onattach)
			fn(inst);
	if (checks.length === 0)
		(_a = inst._zod).deferred ?? (_a.deferred = []), inst._zod.deferred?.push(() => {
			inst._zod.run = inst._zod.parse;
		});
	else {
		let runChecks = (payload, checks2, ctx) => {
			if (payload.memo)
				return payload;
			let isAborted = aborted(payload), asyncResult;
			for (let ch of checks2) {
				if (ch._zod.def.when) {
					if (explicitlyAborted(payload) || !ch._zod.def.when(payload))
						continue;
				} else if (isAborted)
					continue;
				let currLen = payload.issues.length, _ = ch._zod.check(payload);
				if (_ instanceof Promise && ctx?.async === !1)
					throw new $ZodAsyncError();
				if (asyncResult || _ instanceof Promise)
					asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
						await _, payload.issues.length !== currLen && (attachSchema(payload.issues, currLen, inst), isAborted || (isAborted = aborted(payload, currLen)));
					});
				else {
					if (payload.issues.length === currLen)
						continue;
					attachSchema(payload.issues, currLen, inst), isAborted || (isAborted = aborted(payload, currLen));
				}
			}
			return asyncResult ? asyncResult.then(() => payload) : payload;
		}, handleCanaryResult = (canary, payload, ctx) => {
			if (aborted(canary))
				return canary.aborted = !0, canary;
			let checkResult = runChecks(payload, checks, ctx);
			if (checkResult instanceof Promise) {
				if (ctx.async === !1)
					throw new $ZodAsyncError();
				return checkResult.then((checkResult2) => inst._zod.parse(checkResult2, ctx));
			}
			return inst._zod.parse(checkResult, ctx);
		};
		inst._zod.run = (payload, ctx) => {
			if (ctx.skipChecks)
				return inst._zod.parse(payload, ctx);
			if (ctx.direction === "backward") {
				let canary = inst._zod.parse({ value: payload.value, issues: [] }, { ...ctx, skipChecks: !0 });
				return canary instanceof Promise ? canary.then((canary2) => handleCanaryResult(canary2, payload, ctx)) : handleCanaryResult(canary, payload, ctx);
			}
			let result = inst._zod.parse(payload, ctx);
			if (result instanceof Promise) {
				if (ctx.async === !1)
					throw new $ZodAsyncError();
				return result.then((result2) => runChecks(result2, checks, ctx));
			}
			return runChecks(result, checks, ctx);
		};
	}
}, {
	// Wrappers extend this by installing a richer factory over it; reading it eagerly would defeat the laziness.
	get "~standard"() {
		return hide(this, "~standard", standardProps(this));
	},
	set "~standard"(value) {
		own(this, "~standard", value);
	}
}), toStandardResult = (r, ctx) => r.issues.length ? { issues: r.issues.map((iss) => finalizeIssue(iss, ctx, config())) } : { value: r.value };
async function validateAsync2(inst, value) {
	let ctx = { async: !0 };
	return toStandardResult(await inst._zod.run({ value, issues: [] }, ctx), ctx);
}
function standardProps(inst) {
	return {
		validate: (value) => {
			let ctx = { async: !1 };
			try {
				let r = inst._zod.run({ value, issues: [] }, ctx);
				if (!(r instanceof Promise))
					return toStandardResult(r, ctx);
			} catch {
			}
			return validateAsync2(inst, value);
		},
		vendor: "zod",
		version: 1
	};
}
var $ZodString = /* @__PURE__ */ $constructor("$ZodString", (inst, def) => {
	$ZodType.init(inst, def), inst._zod.pattern = def.pattern ?? anyString, inst._zod.parse = (payload, _) => {
		if (def.coerce)
			try {
				payload.value = String(payload.value);
			} catch {
			}
		return typeof payload.value == "string" || payload.issues.push({
			expected: "string",
			code: "invalid_type",
			input: payload.value,
			inst
		}), payload;
	};
}), $ZodStringFormat = /* @__PURE__ */ $constructor("$ZodStringFormat", (inst, def) => {
	$ZodCheckStringFormat.init(inst, def), $ZodString.init(inst, def);
}), $ZodGUID = /* @__PURE__ */ $constructor("$ZodGUID", (inst, def) => {
	def.pattern ?? (def.pattern = guid), $ZodStringFormat.init(inst, def);
}), $ZodUUID = /* @__PURE__ */ $constructor("$ZodUUID", (inst, def) => {
	if (def.version) {
		let v = {
			v1: 1,
			v2: 2,
			v3: 3,
			v4: 4,
			v5: 5,
			v6: 6,
			v7: 7,
			v8: 8
		}[def.version];
		if (v === void 0)
			throw new Error(`Invalid UUID version: "${def.version}"`);
		def.pattern ?? (def.pattern = uuid(v));
	} else
		def.pattern ?? (def.pattern = uuid());
	$ZodStringFormat.init(inst, def);
}), $ZodEmail = /* @__PURE__ */ $constructor("$ZodEmail", (inst, def) => {
	def.pattern ?? (def.pattern = email), $ZodStringFormat.init(inst, def);
}), URL_BAD_FORMAT = 1, URL_UNPARSEABLE = 2;
function canParseURL(input) {
	try {
		return typeof URL < "u" && typeof URL.canParse == "function" ? URL.canParse(input) : (new URL(input), !0);
	} catch {
		return !1;
	}
}
function validateURL(trimmed, def) {
	return !("normalize" in def) && !("hostname" in def) && !("protocol" in def) ? canParseURL(trimmed) || URL_UNPARSEABLE : parseURLObject(trimmed, def);
}
function parseURLObject(trimmed, def) {
	if (!def.normalize && def.protocol?.source === httpProtocol.source && !/^https?:\/\//i.test(trimmed))
		return URL_BAD_FORMAT;
	try {
		if (typeof URL < "u") {
			let URLStatic = URL;
			if (typeof URLStatic.parse == "function")
				return URLStatic.parse(trimmed) ?? URL_UNPARSEABLE;
		}
		return new URL(trimmed);
	} catch {
		return URL_UNPARSEABLE;
	}
}
var asciiTabOrNewline = /[\t\n\r]/g;
function stripTabAndNewline(value) {
	return value.replace(asciiTabOrNewline, "");
}
function urlHostnameOk(url, hostname2) {
	return hostname2.lastIndex = 0, hostname2.test(url.hostname);
}
function urlProtocolOk(url, protocol) {
	return protocol.lastIndex = 0, protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol);
}
var $ZodURL = /* @__PURE__ */ $constructor("$ZodURL", (inst, def) => {
	$ZodStringFormat.init(inst, def), inst._zod.check = (payload) => {
		try {
			let trimmed = payload.value.trim(), url = validateURL(trimmed, def);
			if (url === URL_BAD_FORMAT) {
				payload.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid URL format",
					input: payload.value,
					inst,
					continue: !def.abort
				});
				return;
			}
			if (url === URL_UNPARSEABLE) {
				payload.issues.push({
					code: "invalid_format",
					format: "url",
					input: payload.value,
					inst,
					continue: !def.abort
				});
				return;
			}
			if (url === !0) {
				payload.value = stripTabAndNewline(trimmed);
				return;
			}
			def.hostname && !urlHostnameOk(url, def.hostname) && payload.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid hostname",
				pattern: def.hostname.source,
				input: payload.value,
				inst,
				continue: !def.abort
			}), def.protocol && !urlProtocolOk(url, def.protocol) && payload.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid protocol",
				pattern: def.protocol.source,
				input: payload.value,
				inst,
				continue: !def.abort
			}), payload.value = def.normalize ? url.href : stripTabAndNewline(trimmed);
			return;
		} catch {
			payload.issues.push({
				code: "invalid_format",
				format: "url",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		}
	};
}), $ZodEmoji = /* @__PURE__ */ $constructor("$ZodEmoji", (inst, def) => {
	def.pattern ?? (def.pattern = emoji()), $ZodStringFormat.init(inst, def);
}), $ZodNanoID = /* @__PURE__ */ $constructor("$ZodNanoID", (inst, def) => {
	if (def.length !== void 0 && (!Number.isInteger(def.length) || def.length < 1))
		throw new Error(`Invalid nanoid length: ${def.length}`);
	def.pattern ?? (def.pattern = def.length === void 0 ? nanoid : nanoidOfLength(def.length)), $ZodStringFormat.init(inst, def);
}), $ZodCUID = /* @__PURE__ */ $constructor("$ZodCUID", (inst, def) => {
	def.pattern ?? (def.pattern = cuid), $ZodStringFormat.init(inst, def);
}), $ZodCUID2 = /* @__PURE__ */ $constructor("$ZodCUID2", (inst, def) => {
	def.pattern ?? (def.pattern = cuid2), $ZodStringFormat.init(inst, def);
}), $ZodULID = /* @__PURE__ */ $constructor("$ZodULID", (inst, def) => {
	def.pattern ?? (def.pattern = ulid), $ZodStringFormat.init(inst, def);
}), $ZodXID = /* @__PURE__ */ $constructor("$ZodXID", (inst, def) => {
	def.pattern ?? (def.pattern = xid), $ZodStringFormat.init(inst, def);
}), $ZodKSUID = /* @__PURE__ */ $constructor("$ZodKSUID", (inst, def) => {
	def.pattern ?? (def.pattern = ksuid), $ZodStringFormat.init(inst, def);
}), $ZodISODateTime = /* @__PURE__ */ $constructor("$ZodISODateTime", (inst, def) => {
	def.pattern ?? (def.pattern = datetime(def)), $ZodStringFormat.init(inst, def);
}), $ZodISODate = /* @__PURE__ */ $constructor("$ZodISODate", (inst, def) => {
	def.pattern ?? (def.pattern = date), $ZodStringFormat.init(inst, def);
}), $ZodISOTime = /* @__PURE__ */ $constructor("$ZodISOTime", (inst, def) => {
	def.pattern ?? (def.pattern = time(def)), $ZodStringFormat.init(inst, def);
}), $ZodISODuration = /* @__PURE__ */ $constructor("$ZodISODuration", (inst, def) => {
	def.pattern ?? (def.pattern = duration), $ZodStringFormat.init(inst, def);
}), $ZodIPv4 = /* @__PURE__ */ $constructor("$ZodIPv4", (inst, def) => {
	def.pattern ?? (def.pattern = ipv4), $ZodStringFormat.init(inst, def);
}), ipv6Alphabet = /^[0-9a-fA-F:.]+$/;
function isValidIPv6(value) {
	return ipv6Alphabet.test(value) ? canParseURL(`http://[${value}]`) : !1;
}
var $ZodIPv6 = /* @__PURE__ */ $constructor("$ZodIPv6", (inst, def) => {
	def.pattern ?? (def.pattern = ipv6), $ZodStringFormat.init(inst, def), inst._zod.check = (payload) => {
		isValidIPv6(payload.value) || payload.issues.push({
			code: "invalid_format",
			format: "ipv6",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
}), $ZodMAC = /* @__PURE__ */ $constructor("$ZodMAC", (inst, def) => {
	def.pattern ?? (def.pattern = mac(def.delimiter)), $ZodStringFormat.init(inst, def);
}), $ZodCIDRv4 = /* @__PURE__ */ $constructor("$ZodCIDRv4", (inst, def) => {
	def.pattern ?? (def.pattern = cidrv4), $ZodStringFormat.init(inst, def);
});
function isValidCIDRv6(value) {
	let parts = value.split("/");
	if (parts.length !== 2)
		return !1;
	let [address, prefix] = parts;
	if (!prefix)
		return !1;
	let prefixNum = Number(prefix);
	return `${prefixNum}` !== prefix || prefixNum < 0 || prefixNum > 128 ? !1 : isValidIPv6(address);
}
var $ZodCIDRv6 = /* @__PURE__ */ $constructor("$ZodCIDRv6", (inst, def) => {
	def.pattern ?? (def.pattern = cidrv6), $ZodStringFormat.init(inst, def), inst._zod.check = (payload) => {
		isValidCIDRv6(payload.value) || payload.issues.push({
			code: "invalid_format",
			format: "cidrv6",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
function isValidBase64(data) {
	if (data === "")
		return !0;
	if (/\s/.test(data) || data.length % 4 !== 0)
		return !1;
	try {
		return atob(data), !0;
	} catch {
		return !1;
	}
}
var base64Charset = /^[0-9a-zA-Z+/]*={0,2}$/, $ZodBase64 = /* @__PURE__ */ $constructor("$ZodBase64", (inst, def) => {
	def.pattern ?? (def.pattern = base64Charset), $ZodStringFormat.init(inst, def), inst._zod.check = (payload) => {
		isValidBase64(payload.value) || payload.issues.push({
			code: "invalid_format",
			format: "base64",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
}), base64urlCharset = /^[A-Za-z0-9_-]*$/;
function isValidBase64URL(data) {
	if (!base64urlCharset.test(data))
		return !1;
	let base642 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/"), padded = base642.padEnd(Math.ceil(base642.length / 4) * 4, "=");
	return isValidBase64(padded);
}
var $ZodBase64URL = /* @__PURE__ */ $constructor("$ZodBase64URL", (inst, def) => {
	def.pattern ?? (def.pattern = base64urlCharset), $ZodStringFormat.init(inst, def), inst._zod.check = (payload) => {
		isValidBase64URL(payload.value) || payload.issues.push({
			code: "invalid_format",
			format: "base64url",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
}), $ZodE164 = /* @__PURE__ */ $constructor("$ZodE164", (inst, def) => {
	def.pattern ?? (def.pattern = e164), $ZodStringFormat.init(inst, def);
}), CC_SANITIZE = /[- ]/g;
function isLuhnAlgo(digits) {
	let length = digits.length, bit = 1, sum = 0;
	for (; length; ) {
		let value = digits.charCodeAt(--length) - 48;
		bit ^= 1, sum += bit ? [0, 2, 4, 6, 8, 1, 3, 5, 7, 9][value] : value;
	}
	return sum % 10 === 0;
}
function isValidCreditCard(input) {
	return creditCard.test(input) ? isLuhnAlgo(input.replace(CC_SANITIZE, "")) : !1;
}
var $ZodCreditCard = /* @__PURE__ */ $constructor("$ZodCreditCard", (inst, def) => {
	def.pattern ?? (def.pattern = creditCard), $ZodStringFormat.init(inst, def), inst._zod.check = (payload) => {
		isValidCreditCard(payload.value) || payload.issues.push({
			code: "invalid_format",
			format: "credit_card",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
function isIso7064Mod97(iban2) {
	let remainder = 0, len = iban2.length;
	for (let i = 4; i < len; i++) {
		let code = iban2.charCodeAt(i);
		remainder = (code >= 65 ? remainder * 100 + (code - 55) : remainder * 10 + (code - 48)) % 97;
	}
	for (let i = 0; i < 4; i++) {
		let code = iban2.charCodeAt(i);
		remainder = (code >= 65 ? remainder * 100 + (code - 55) : remainder * 10 + (code - 48)) % 97;
	}
	return remainder === 1;
}
function isValidIBAN(input) {
	return iban.test(input) ? isIso7064Mod97(input) : !1;
}
var $ZodIBAN = /* @__PURE__ */ $constructor("$ZodIBAN", (inst, def) => {
	def.pattern ?? (def.pattern = iban), $ZodStringFormat.init(inst, def), inst._zod.check = (payload) => {
		isValidIBAN(payload.value) || payload.issues.push({
			code: "invalid_format",
			format: "iban",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
function isValidJWT(token, algorithm = null) {
	try {
		let tokensParts = token.split(".");
		if (tokensParts.length !== 3)
			return !1;
		let [header] = tokensParts;
		if (!header)
			return !1;
		let parsedHeader = JSON.parse(atob(header));
		return !("typ" in parsedHeader && parsedHeader?.typ !== "JWT" || !parsedHeader.alg || algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm));
	} catch {
		return !1;
	}
}
var $ZodJWT = /* @__PURE__ */ $constructor("$ZodJWT", (inst, def) => {
	$ZodStringFormat.init(inst, def), inst._zod.check = (payload) => {
		isValidJWT(payload.value, def.alg) || payload.issues.push({
			code: "invalid_format",
			format: "jwt",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
}), $ZodCustomStringFormat = /* @__PURE__ */ $constructor("$ZodCustomStringFormat", (inst, def) => {
	$ZodStringFormat.init(inst, def), inst._zod.check = (payload) => {
		def.fn(payload.value) || payload.issues.push({
			code: "invalid_format",
			format: def.format,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
}), $ZodNumber = /* @__PURE__ */ $constructor("$ZodNumber", (inst, def) => {
	$ZodType.init(inst, def), inst._zod.pattern = number, inst._zod.parse = (payload, _ctx) => {
		if (def.coerce)
			try {
				payload.value = Number(payload.value);
			} catch {
			}
		let input = payload.value;
		if (typeof input == "number" && !Number.isNaN(input) && Number.isFinite(input))
			return payload;
		let received = typeof input == "number" ? Number.isNaN(input) ? "NaN" : Number.isFinite(input) ? void 0 : String(input) : void 0;
		return payload.issues.push({
			expected: "number",
			code: "invalid_type",
			input,
			inst,
			...received ? { received } : {}
		}), payload;
	};
}), $ZodNumberFormat = /* @__PURE__ */ $constructor("$ZodNumberFormat", (inst, def) => {
	$ZodCheckNumberFormat.init(inst, def), $ZodNumber.init(inst, def);
}), $ZodBoolean = /* @__PURE__ */ $constructor("$ZodBoolean", (inst, def) => {
	$ZodType.init(inst, def), inst._zod.pattern = boolean, inst._zod.parse = (payload, _ctx) => {
		if (def.coerce)
			try {
				payload.value = !!payload.value;
			} catch {
			}
		let input = payload.value;
		return typeof input == "boolean" || payload.issues.push({
			expected: "boolean",
			code: "invalid_type",
			input,
			inst
		}), payload;
	};
}), $ZodBigInt = /* @__PURE__ */ $constructor("$ZodBigInt", (inst, def) => {
	$ZodType.init(inst, def), inst._zod.pattern = bigint, inst._zod.parse = (payload, _ctx) => {
		if (def.coerce)
			try {
				payload.value = BigInt(payload.value);
			} catch {
			}
		return typeof payload.value == "bigint" || payload.issues.push({
			expected: "bigint",
			code: "invalid_type",
			input: payload.value,
			inst
		}), payload;
	};
}), $ZodBigIntFormat = /* @__PURE__ */ $constructor("$ZodBigIntFormat", (inst, def) => {
	$ZodCheckBigIntFormat.init(inst, def), $ZodBigInt.init(inst, def);
}), $ZodSymbol = /* @__PURE__ */ $constructor("$ZodSymbol", (inst, def) => {
	$ZodType.init(inst, def), inst._zod.parse = (payload, _ctx) => {
		let input = payload.value;
		return typeof input == "symbol" || payload.issues.push({
			expected: "symbol",
			code: "invalid_type",
			input,
			inst
		}), payload;
	};
}), $ZodUndefined = /* @__PURE__ */ $constructor("$ZodUndefined", (inst, def) => {
	$ZodType.init(inst, def), inst._zod.pattern = _undefined, inst._zod.values = /* @__PURE__ */ new Set([void 0]), inst._zod.parse = (payload, _ctx) => {
		let input = payload.value;
		return typeof input > "u" || payload.issues.push({
			expected: "undefined",
			code: "invalid_type",
			input,
			inst
		}), payload;
	};
}), $ZodNull = /* @__PURE__ */ $constructor("$ZodNull", (inst, def) => {
	$ZodType.init(inst, def), inst._zod.pattern = _null, inst._zod.values = /* @__PURE__ */ new Set([null]), inst._zod.parse = (payload, _ctx) => {
		let input = payload.value;
		return input === null || payload.issues.push({
			expected: "null",
			code: "invalid_type",
			input,
			inst
		}), payload;
	};
}), $ZodAny = /* @__PURE__ */ $constructor("$ZodAny", (inst, def) => {
	$ZodType.init(inst, def), inst._zod.parse = (payload) => payload;
}), $ZodUnknown = /* @__PURE__ */ $constructor("$ZodUnknown", (inst, def) => {
	$ZodType.init(inst, def), inst._zod.parse = (payload) => payload;
}), $ZodNever = /* @__PURE__ */ $constructor("$ZodNever", (inst, def) => {
	$ZodType.init(inst, def), inst._zod.parse = (payload, _ctx) => (payload.issues.push({
		expected: "never",
		code: "invalid_type",
		input: payload.value,
		inst
	}), payload);
}), $ZodVoid = /* @__PURE__ */ $constructor("$ZodVoid", (inst, def) => {
	$ZodType.init(inst, def), inst._zod.parse = (payload, _ctx) => {
		let input = payload.value;
		return typeof input > "u" || payload.issues.push({
			expected: "void",
			code: "invalid_type",
			input,
			inst
		}), payload;
	};
}), $ZodDate = /* @__PURE__ */ $constructor("$ZodDate", (inst, def) => {
	$ZodType.init(inst, def), inst._zod.parse = (payload, _ctx) => {
		if (def.coerce)
			try {
				payload.value = new Date(payload.value);
			} catch {
			}
		let input = payload.value, isDate = input instanceof Date;
		return isDate && !Number.isNaN(input.getTime()) || payload.issues.push({
			expected: "date",
			code: "invalid_type",
			input,
			...isDate ? { received: "Invalid Date" } : {},
			inst
		}), payload;
	};
});
function capSize(inst, size) {
	let caps = sizeCaps(inst._zod.def.checks);
	if (!caps.length)
		return;
	let cap = Math.min(...caps.map((c) => c[0])), parse2 = inst._zod.parse;
	inst._zod.parse = (payload, ctx) => {
		let n = size(payload.value);
		if (n > cap && !ctx?.skipChecks && ctx?.direction !== "backward") {
			for (let [max, ch] of sizeCaps(inst._zod.def.checks))
				if (n > max && ch._zod.def.when(payload)) {
					let start = payload.issues.length;
					return ch._zod.check(payload), payload.issues[start].continue = !1, attachSchema(payload.issues, start, inst), payload;
				}
		}
		return parse2(payload, ctx);
	};
}
var arraySize = (input) => Array.isArray(input) ? input.length : -1, mapSize = (input) => input instanceof Map ? input.size : -1, setSize = (input) => input instanceof Set ? input.size : -1;
function handleArrayResult(result, final, index) {
	result.issues.length && final.issues.push(...prefixIssues(index, result.issues)), final.value[index] = result.value;
}
var $ZodArray = /* @__PURE__ */ $constructor("$ZodArray", (inst, def) => {
	$ZodType.init(inst, def);
	let memo = globalConfig.memoizer;
	memo?.attach(inst), inst._zod.parse = (payload, ctx) => {
		let input = payload.value;
		if (!Array.isArray(input))
			return payload.issues.push({
				expected: "array",
				code: "invalid_type",
				input,
				inst
			}), payload;
		payload.value = memo ? memo.alloc(inst, payload, Array(input.length), ctx) : Array(input.length);
		let proms = [], abortEarly = ctx?.abortEarly;
		for (let i = 0; i < input.length; i++) {
			let item = input[i], result = def.element._zod.run({
				value: item,
				issues: []
			}, ctx);
			if (result instanceof Promise)
				proms.push(result.then((result2) => handleArrayResult(result2, payload, i)));
			else if (handleArrayResult(result, payload, i), abortEarly && result.issues.length !== 0 && aborted(result))
				break;
		}
		return proms.length ? Promise.all(proms).then(() => payload) : payload;
	}, capSize(inst, arraySize);
});
function handlePropertyResult(result, final, key, input, optin, optout) {
	let isPresent = key in input, isOptionalOut = optout === "optional";
	if (!(!isPresent && isOptionalOut && optin === "optional")) {
		if (result.issues.length) {
			if (optin !== void 0 && isOptionalOut && !isPresent)
				return;
			final.issues.push(...prefixIssues(key, result.issues));
		}
		if (!isPresent && optin === void 0) {
			result.issues.length || final.issues.push({
				code: "invalid_type",
				expected: "nonoptional",
				input: void 0,
				path: [key]
			});
			return;
		}
		result.value === void 0 ? (isPresent || optin === "defaulted" && !isOptionalOut) && (final.value[key] = void 0) : final.value[key] = result.value;
	}
}
var NO_SYMBOL_KEYS = [];
function normalizeDef(def) {
	let keys = Object.keys(def.shape), ownSymbols = Object.getOwnPropertySymbols(def.shape), symbolKeys = ownSymbols.length ? ownSymbols : NO_SYMBOL_KEYS, allKeys = symbolKeys.length ? [...keys, ...symbolKeys] : keys;
	for (let k of allKeys)
		if (!def.shape?.[k]?._zod?.traits?.has("$ZodType"))
			throw new Error(`Invalid element at key "${String(k)}": expected a Zod schema`);
	let okeys = optionalKeys(def.shape);
	return {
		...def,
		allKeys,
		symbolKeys,
		// string-only: handleCatchall matches it against `for...in`, which never yields a symbol
		keySet: new Set(keys),
		numKeys: keys.length,
		optionalKeys: new Set(okeys)
	};
}
function handleCatchall(proms, input, payload, ctx, def, inst, abortEarly) {
	let unrecognized = [], keySet = def.keySet, _catchall = def.catchall._zod, t = _catchall.def.type, optin = _catchall.optin, optout = _catchall.optout, seen = 0;
	for (let key in input) {
		if (abortEarly && payload.issues.length !== seen) {
			if (aborted(payload, seen))
				break;
			seen = payload.issues.length;
		}
		if (keySet.has(key))
			continue;
		if (key === "__proto__") {
			t === "never" && unrecognized.push(key);
			continue;
		}
		if (t === "never") {
			unrecognized.push(key);
			continue;
		}
		let r = _catchall.run({ value: input[key], issues: [] }, ctx);
		r instanceof Promise ? proms.push(r.then((r2) => handlePropertyResult(r2, payload, key, input, optin, optout))) : handlePropertyResult(r, payload, key, input, optin, optout);
	}
	return unrecognized.length && payload.issues.push({
		code: "unrecognized_keys",
		keys: unrecognized,
		input,
		inst,
		// Describes the shape of the input, not the validity of the parsed value, so it never aborts. The parse still fails; the schema's own checks just get to run first, and an enclosing intersection can reconcile the key against a sibling operand.
		continue: !0
	}), proms.length ? Promise.all(proms).then(() => payload) : payload;
}
var $ZodObject = /* @__PURE__ */ $constructor("$ZodObject", (inst, def) => {
	$ZodType.init(inst, def);
	let desc = Object.getOwnPropertyDescriptor(def, "shape"), sh = desc?.get ? desc.get.raw : def.shape ?? {};
	if (sh) {
		let get = () => {
			let newSh = { ...sh };
			return Object.defineProperty(def, "shape", { value: newSh }), get.raw = newSh, newSh;
		};
		get.raw = sh, Object.defineProperty(def, "shape", { get });
	}
	let _normalized = cached(() => normalizeDef(def));
	defineLazyInternal(inst, "propValues", (zod) => {
		let shape = zod.def.shape, propValues = {};
		for (let key in shape) {
			let field = shape[key]._zod;
			if (field.values) {
				Object.prototype.hasOwnProperty.call(propValues, key) || assignProp(propValues, key, /* @__PURE__ */ new Set());
				for (let v of field.values)
					propValues[key].add(v);
				field.optin !== void 0 && propValues[key].add(void 0);
			}
		}
		return propValues;
	});
	let isObject2 = isObject, catchall = def.catchall, value, memo = globalConfig.memoizer;
	memo?.attach(inst), inst._zod.parse = (payload, ctx) => {
		value ?? (value = _normalized.value);
		let input = payload.value;
		if (!isObject2(input))
			return payload.issues.push({
				expected: "object",
				code: "invalid_type",
				input,
				inst
			}), payload;
		payload.value = memo ? memo.alloc(inst, payload, {}, ctx) : {};
		let proms = [], shape = value.shape, abortEarly = ctx?.abortEarly, seen = payload.issues.length;
		for (let key of value.allKeys) {
			if (abortEarly && payload.issues.length !== seen) {
				if (aborted(payload, seen))
					break;
				seen = payload.issues.length;
			}
			if (key === "__proto__")
				continue;
			let el = shape[key], optin = el._zod.optin, optout = el._zod.optout, r = el._zod.run({ value: input[key], issues: [] }, ctx);
			r instanceof Promise ? proms.push(r.then((r2) => handlePropertyResult(r2, payload, key, input, optin, optout))) : handlePropertyResult(r, payload, key, input, optin, optout);
		}
		return catchall ? handleCatchall(proms, input, payload, ctx, _normalized.value, inst, abortEarly === !0) : proms.length ? Promise.all(proms).then(() => payload) : payload;
	};
}), $ZodObjectJIT = /* @__PURE__ */ $constructor("$ZodObjectJIT", (inst, def) => {
	$ZodObject.init(inst, def);
	let superParse = inst._zod.parse, _normalized = cached(() => normalizeDef(def)), memo = globalConfig.memoizer, generateFastpass = (shape) => {
		let normalized = _normalized.value, syms = normalized.symbolKeys, doc = new Doc(["payload", "ctx"], { shape, inst, memo, syms }), parseStr = (k) => `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`, prefixStr = (id, k) => `
          let ${id}_ab = false;
          for (let i = 0; i < ${id}.issues.length; i++) {
            const iss = ${id}.issues[i];
            iss.path = iss.path ? [${k}, ...iss.path] : [${k}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${id}_ab = true;
          }
          if (${id}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;
		doc.write("const input = payload.value;");
		let ids = /* @__PURE__ */ Object.create(null), counter = 0;
		for (let key of normalized.allKeys)
			ids[key] = `key_${counter++}`;
		doc.write(memo ? "const newResult = memo.alloc(inst, payload, {}, ctx);" : "const newResult = {};");
		for (let key of normalized.allKeys) {
			if (key === "__proto__")
				continue;
			let id = ids[key], k = typeof key == "symbol" ? `syms[${syms.indexOf(key)}]` : esc(key), isPresent = `${k} in input`, schema = shape[key], optin = schema?._zod?.optin, isOptionalIn = optin !== void 0, isOptionalOut = schema?._zod?.optout === "optional";
			if (doc.write(`const ${id} = ${parseStr(k)};`), isOptionalIn && isOptionalOut) {
				let assign = optin === "optional" ? `${id}_present` : `${id}.value !== undefined || ${id}_present`;
				doc.write(`
        const ${id}_present = ${isPresent};
        if (!${id}.issues.length || ${id}_present) {
          if (${id}.issues.length) {${prefixStr(id, k)}
          }

          if (${assign}) {
            newResult[${k}] = ${id}.value;
          }
        }

      `);
			} else isOptionalIn ? (doc.write(`
        if (${id}.issues.length) {${prefixStr(id, k)}
        }
      `), optin === "defaulted" ? doc.write(`newResult[${k}] = ${id}.value;`) : doc.write(`
        if (${id}.value !== undefined || ${isPresent}) {
          newResult[${k}] = ${id}.value;
        }
      `)) : doc.write(`
        const ${id}_present = ${isPresent};
        if (${id}.issues.length) {${prefixStr(id, k)}
        }
        if (!${id}_present && !${id}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${k}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${id}_present) {
          newResult[${k}] = ${id}.value;
        }

      `);
		}
		return doc.write("payload.value = newResult;"), doc.write("return payload;"), doc.compile();
	}, fastpass, isObject2 = isObject, jit = !globalConfig.jitless, fastEnabled = jit && allowsEval.value, catchall = def.catchall, value;
	inst._zod.parse = (payload, ctx) => {
		value ?? (value = _normalized.value);
		let input = payload.value;
		return isObject2(input) ? jit && fastEnabled && ctx?.async === !1 && ctx.jitless !== !0 ? (fastpass || (fastpass = generateFastpass(def.shape)), payload = fastpass(payload, ctx), catchall ? handleCatchall([], input, payload, ctx, value, inst, ctx?.abortEarly === !0) : payload) : superParse(payload, ctx) : (payload.issues.push({
			expected: "object",
			code: "invalid_type",
			input,
			inst
		}), payload);
	};
});
function handleUnionResults(results, final, inst, ctx) {
	for (let result of results)
		if (result.issues.length === 0)
			return final.value = result.value, final;
	let nonaborted = results.filter((r) => !aborted(r));
	return nonaborted.length === 1 ? (final.value = nonaborted[0].value, nonaborted[0]) : (final.issues.push({
		code: "invalid_union",
		input: final.value,
		inst,
		errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
	}), final);
}
var $ZodUnion = /* @__PURE__ */ $constructor("$ZodUnion", (inst, def) => {
	$ZodType.init(inst, def), defineLazyInternal(inst, "optin", (zod) => zod.def.options.some((o) => o._zod.optin === "defaulted") ? "defaulted" : zod.def.options.some((o) => o._zod.optin !== void 0) ? "optional" : void 0), defineLazyInternal(inst, "optout", (zod) => zod.def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0), defineLazyInternal(inst, "values", (zod) => {
		if (zod.def.options.every((o) => o._zod.values))
			return new Set(zod.def.options.flatMap((option) => Array.from(option._zod.values)));
	}), defineLazyInternal(inst, "pattern", (zod) => {
		if (zod.def.options.every((o) => o._zod.pattern)) {
			let patterns = zod.def.options.map((o) => o._zod.pattern);
			return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
		}
	});
	let first = def.options.length === 1 ? def.options[0]._zod.run : null;
	inst._zod.parse = (payload, ctx) => {
		if (first)
			return first(payload, ctx);
		let async = !1, results = [];
		for (let option of def.options) {
			let result = option._zod.run({
				value: payload.value,
				issues: []
			}, ctx);
			if (result instanceof Promise)
				results.push(result), async = !0;
			else {
				if (result.issues.length === 0)
					return result;
				results.push(result);
			}
		}
		return async ? Promise.all(results).then((results2) => handleUnionResults(results2, payload, inst, ctx)) : handleUnionResults(results, payload, inst, ctx);
	};
});
function handleExclusiveUnionResults(results, final, inst, ctx) {
	let matches = [];
	for (let i = 0; i < results.length; i++)
		results[i].issues.length === 0 && matches.push(i);
	return matches.length === 1 ? (final.value = results[matches[0]].value, final) : (matches.length === 0 ? final.issues.push({
		code: "invalid_union",
		input: final.value,
		inst,
		errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
	}) : final.issues.push({
		code: "invalid_union",
		input: final.value,
		inst,
		errors: [],
		inclusive: !1,
		matches
	}), final);
}
var $ZodXor = /* @__PURE__ */ $constructor("$ZodXor", (inst, def) => {
	$ZodUnion.init(inst, def), def.inclusive = !1;
	let first = def.options.length === 1 ? def.options[0]._zod.run : null;
	inst._zod.parse = (payload, ctx) => {
		if (first)
			return first(payload, ctx);
		let async = !1, results = [];
		for (let option of def.options) {
			let result = option._zod.run({
				value: payload.value,
				issues: []
			}, ctx);
			result instanceof Promise ? (results.push(result), async = !0) : results.push(result);
		}
		return async ? Promise.all(results).then((results2) => handleExclusiveUnionResults(results2, payload, inst, ctx)) : handleExclusiveUnionResults(results, payload, inst, ctx);
	};
});
function getDiscriminatedOption(union, value) {
	let internals = union._zod, map = internals.bag.optionsMap;
	map || (map = discriminatorMap(internals.def), internals.bag.optionsMap = map);
	let option = map.get(value);
	if (option === null)
		throw new Error(`Ambiguous discriminator value "${String(value)}"`);
	return option;
}
function discriminatorMap(def) {
	let map = /* @__PURE__ */ new Map();
	for (let option of def.options) {
		let values = option._zod.propValues?.[def.discriminator];
		if (!values || values.size === 0)
			throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(option)}"`);
		for (let value of values)
			if (map.has(value)) {
				if (value !== void 0)
					throw new Error(`Duplicate discriminator value "${String(value)}"`);
				map.set(value, null);
			} else
				map.set(value, option);
	}
	return map;
}
var $ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("$ZodDiscriminatedUnion", (inst, def) => {
	def.inclusive = !1, $ZodUnion.init(inst, def);
	let _super = inst._zod.parse;
	defineLazyInternal(inst, "propValues", (zod) => {
		let propValues = {}, undefinedCount = 0;
		for (let option of zod.def.options) {
			let pv = option._zod.propValues;
			if (!pv || Object.keys(pv).length === 0)
				throw new Error(`Invalid discriminated union option at index "${zod.def.options.indexOf(option)}"`);
			pv[zod.def.discriminator]?.has(void 0) && undefinedCount++;
			for (let [k, v] of Object.entries(pv)) {
				Object.prototype.hasOwnProperty.call(propValues, k) || assignProp(propValues, k, /* @__PURE__ */ new Set());
				for (let val of v)
					propValues[k].add(val);
			}
		}
		return !zod.def.unionFallback && undefinedCount > 1 && propValues[zod.def.discriminator]?.delete(void 0), propValues;
	}), def.options.forEach((option, i) => {
		let propShape = rawShape(option._zod.def);
		if (propShape && !Object.prototype.hasOwnProperty.call(propShape, def.discriminator))
			throw new Error(`Invalid discriminated union option at index "${i}"`);
	});
	let disc = cached(() => discriminatorMap(def));
	inst._zod.parse = (payload, ctx) => {
		let input = payload.value;
		if (!isObject(input))
			return payload.issues.push({
				code: "invalid_type",
				expected: "object",
				input,
				inst
			}), payload;
		let value = input?.[def.discriminator], opt = disc.value.get(value);
		return opt && (value !== void 0 || ctx.direction !== "backward") ? opt._zod.run(payload, ctx) : def.unionFallback || ctx.direction === "backward" ? _super(payload, ctx) : (payload.issues.push({
			code: "invalid_union",
			errors: [],
			note: "No matching discriminator",
			discriminator: def.discriminator,
			options: Array.from(disc.value.keys()).filter((value2) => disc.value.get(value2) !== null),
			input,
			path: [def.discriminator],
			inst
		}), payload);
	};
}), $ZodIntersection = /* @__PURE__ */ $constructor("$ZodIntersection", (inst, def) => {
	$ZodType.init(inst, def), inst._zod.parse = (payload, ctx) => {
		let input = payload.value, left = def.left._zod.run({ value: input, issues: [] }, ctx), right = def.right._zod.run({ value: input, issues: [] }, ctx);
		return left instanceof Promise || right instanceof Promise ? Promise.all([left, right]).then(([left2, right2]) => handleIntersectionResults(payload, left2, right2)) : handleIntersectionResults(payload, left, right);
	};
});
function mergeValues(a, b) {
	if (a === b)
		return { valid: !0, data: a };
	if (a instanceof Date && b instanceof Date && +a == +b)
		return { valid: !0, data: a };
	if (isPlainObject(a) && isPlainObject(b)) {
		let bKeys = Object.keys(b), sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1), newObj = { ...a, ...b };
		Object.prototype.hasOwnProperty.call(newObj, "__proto__") && delete newObj.__proto__;
		for (let key of sharedKeys) {
			if (key === "__proto__")
				continue;
			let sharedValue = mergeValues(a[key], b[key]);
			if (!sharedValue.valid)
				return {
					valid: !1,
					mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
				};
			newObj[key] = sharedValue.data;
		}
		return { valid: !0, data: newObj };
	}
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length)
			return { valid: !1, mergeErrorPath: [] };
		let newArray = [];
		for (let index = 0; index < a.length; index++) {
			let itemA = a[index], itemB = b[index], sharedValue = mergeValues(itemA, itemB);
			if (!sharedValue.valid)
				return {
					valid: !1,
					mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
				};
			newArray.push(sharedValue.data);
		}
		return { valid: !0, data: newArray };
	}
	return { valid: !1, mergeErrorPath: [] };
}
function handleIntersectionResults(result, left, right) {
	let unrecKeys = /* @__PURE__ */ new Map(), unrecIssue, keyIssues = /* @__PURE__ */ new Map(), collect = (iss, side) => {
		let keys;
		if (iss.code === "unrecognized_keys" && !iss.path?.length)
			unrecIssue ?? (unrecIssue = iss), keys = iss.keys;
		else if (iss.code === "invalid_key" && iss.origin === "record" && iss.path?.length === 1) {
			let k = String(iss.path[0]);
			keyIssues.has(k) || keyIssues.set(k, iss), keys = [k];
		} else
			return !1;
		for (let k of keys)
			unrecKeys.has(k) || unrecKeys.set(k, {}), unrecKeys.get(k)[side] = !0;
		return !0;
	};
	for (let iss of left.issues)
		collect(iss, "l") || result.issues.push(iss);
	for (let iss of right.issues)
		collect(iss, "r") || result.issues.push(iss);
	let bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
	if (bothKeys.length) {
		let aggregated = unrecIssue ? bothKeys.filter((k) => unrecIssue.keys.includes(k)) : [];
		aggregated.length && result.issues.push({ ...unrecIssue, keys: aggregated });
		for (let k of bothKeys)
			!aggregated.includes(k) && keyIssues.has(k) && result.issues.push(keyIssues.get(k));
	}
	let merged = mergeValues(left.value, right.value);
	if (!merged.valid) {
		if (aborted(result))
			return result;
		throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
	}
	return result.value = merged.data, result;
}
var $ZodTuple = /* @__PURE__ */ $constructor("$ZodTuple", (inst, def) => {
	$ZodType.init(inst, def);
	let items = def.items, memo = globalConfig.memoizer;
	memo?.attach(inst), inst._zod.parse = (payload, ctx) => {
		let input = payload.value;
		if (!Array.isArray(input))
			return payload.issues.push({
				input,
				inst,
				expected: "tuple",
				code: "invalid_type"
			}), payload;
		payload.value = memo ? memo.alloc(inst, payload, [], ctx) : [];
		let proms = [], optinStart = getTupleOptStart(items, "optin"), optoutStart = getTupleOptStart(items, "optout");
		if (!def.rest) {
			if (input.length < optinStart)
				return payload.issues.push({
					code: "too_small",
					minimum: optinStart,
					inclusive: !0,
					input,
					inst,
					origin: "array"
				}), payload;
			input.length > items.length && payload.issues.push({
				code: "too_big",
				maximum: items.length,
				inclusive: !0,
				input,
				inst,
				origin: "array"
			});
		}
		let itemResults = new Array(items.length), abortEarly = def.rest ? ctx?.abortEarly : void 0, itemAborted = !1;
		for (let i = 0; i < items.length; i++) {
			let r = items[i]._zod.run({ value: input[i], issues: [] }, ctx);
			r instanceof Promise ? proms.push(r.then((rr) => {
				itemResults[i] = rr;
			})) : (itemResults[i] = r, abortEarly && !itemAborted && r.issues.length && (itemAborted = aborted(r)));
		}
		if (def.rest && !itemAborted) {
			let i = items.length - 1, rest = input.slice(items.length), seen = payload.issues.length;
			for (let el of rest) {
				if (abortEarly && payload.issues.length !== seen) {
					if (aborted(payload, seen))
						break;
					seen = payload.issues.length;
				}
				i++;
				let result = def.rest._zod.run({ value: el, issues: [] }, ctx);
				result instanceof Promise ? proms.push(result.then((r) => handleTupleResult(r, payload, i))) : handleTupleResult(result, payload, i);
			}
		}
		return proms.length ? Promise.all(proms).then(() => handleTupleResults(itemResults, payload, items, input, optoutStart)) : handleTupleResults(itemResults, payload, items, input, optoutStart);
	};
});
function getTupleOptStart(items, key) {
	for (let i = items.length - 1; i >= 0; i--)
		if (!(key === "optin" ? items[i]._zod.optin !== void 0 : items[i]._zod.optout === "optional"))
			return i + 1;
	return 0;
}
function handleTupleResult(result, final, index) {
	result.issues.length && final.issues.push(...prefixIssues(index, result.issues)), final.value[index] = result.value;
}
function handleTupleResults(itemResults, final, items, input, optoutStart) {
	for (let i = 0; i < items.length; i++) {
		let r = itemResults[i], isPresent = i < input.length;
		if (!isPresent && i >= optoutStart && items[i]._zod.optin === "optional") {
			final.value.length = i;
			break;
		}
		if (r.issues.length) {
			if (!isPresent && i >= optoutStart) {
				final.value.length = i;
				break;
			}
			final.issues.push(...prefixIssues(i, r.issues));
		}
		final.value[i] = r.value;
	}
	for (let i = final.value.length - 1; i >= input.length && (items[i]._zod.optout === "optional" && final.value[i] === void 0); i--)
		final.value.length = i;
	return final;
}
var $ZodRecord = /* @__PURE__ */ $constructor("$ZodRecord", (inst, def) => {
	$ZodType.init(inst, def);
	let memo = globalConfig.memoizer;
	memo?.attach(inst), inst._zod.parse = (payload, ctx) => {
		let input = payload.value;
		if (!isPlainObject(input))
			return payload.issues.push({
				expected: "record",
				code: "invalid_type",
				input,
				inst
			}), payload;
		let proms = [], values = def.keyType._zod.values;
		if (values && !def.partial) {
			payload.value = memo ? memo.alloc(inst, payload, {}, ctx) : {};
			let recordKeys = /* @__PURE__ */ new Set();
			for (let key of values)
				if (typeof key == "string" || typeof key == "number" || typeof key == "symbol") {
					if (recordKeys.add(typeof key == "number" ? key.toString() : key), key === "__proto__")
						continue;
					let keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
					if (keyResult instanceof Promise)
						throw new Error("Async schemas not supported in object keys currently");
					if (keyResult.issues.length) {
						payload.issues.push({
							code: "invalid_key",
							origin: "record",
							issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
							input: key,
							path: [key],
							inst
						});
						continue;
					}
					let outKey = keyResult.value;
					if (outKey === "__proto__")
						continue;
					let result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
					result instanceof Promise ? proms.push(result.then((result2) => {
						result2.issues.length && payload.issues.push(...prefixIssues(key, result2.issues)), payload.value[outKey] = result2.value;
					})) : (result.issues.length && payload.issues.push(...prefixIssues(key, result.issues)), payload.value[outKey] = result.value);
				}
			let unrecognized;
			for (let key in input)
				if (!recordKeys.has(key))
					if (def.mode === "loose") {
						if (key === "__proto__")
							continue;
						payload.value[key] = input[key];
					} else
						unrecognized = unrecognized ?? [], unrecognized.push(key);
			unrecognized && unrecognized.length > 0 && payload.issues.push({
				code: "unrecognized_keys",
				input,
				inst,
				keys: unrecognized,
				continue: !0
			});
		} else {
			payload.value = memo ? memo.alloc(inst, payload, {}, ctx) : {};
			let unrecognized;
			for (let key of Reflect.ownKeys(input)) {
				if (key === "__proto__" || !Object.prototype.propertyIsEnumerable.call(input, key))
					continue;
				let keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
				if (keyResult instanceof Promise)
					throw new Error("Async schemas not supported in object keys currently");
				if (typeof key == "string" && number.test(key) && keyResult.issues.length) {
					let retryResult = def.keyType._zod.run({ value: Number(key), issues: [] }, ctx);
					if (retryResult instanceof Promise)
						throw new Error("Async schemas not supported in object keys currently");
					retryResult.issues.length === 0 && (keyResult = retryResult);
				}
				if (keyResult.issues.length) {
					def.mode === "loose" ? payload.value[key] = input[key] : values ? (unrecognized = unrecognized ?? [], unrecognized.push(key)) : payload.issues.push({
						code: "invalid_key",
						origin: "record",
						issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
						input: key,
						path: [key],
						inst
					});
					continue;
				}
				let outKey = keyResult.value;
				if (outKey === "__proto__")
					continue;
				let result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
				result instanceof Promise ? proms.push(result.then((result2) => {
					result2.issues.length && payload.issues.push(...prefixIssues(key, result2.issues)), payload.value[outKey] = result2.value;
				})) : (result.issues.length && payload.issues.push(...prefixIssues(key, result.issues)), payload.value[outKey] = result.value);
			}
			unrecognized && unrecognized.length > 0 && payload.issues.push({
				code: "unrecognized_keys",
				input,
				inst,
				keys: unrecognized,
				continue: !0
			});
		}
		return proms.length ? Promise.all(proms).then(() => payload) : payload;
	};
}), $ZodMap = /* @__PURE__ */ $constructor("$ZodMap", (inst, def) => {
	$ZodType.init(inst, def);
	let memo = globalConfig.memoizer;
	memo?.attach(inst), inst._zod.parse = (payload, ctx) => {
		let input = payload.value;
		if (!(input instanceof Map))
			return payload.issues.push({
				expected: "map",
				code: "invalid_type",
				input,
				inst
			}), payload;
		let proms = [];
		payload.value = memo ? memo.alloc(inst, payload, /* @__PURE__ */ new Map(), ctx) : /* @__PURE__ */ new Map();
		let abortEarly = ctx?.abortEarly, seen = payload.issues.length;
		for (let [key, value] of input) {
			if (abortEarly && payload.issues.length !== seen) {
				if (aborted(payload, seen))
					break;
				seen = payload.issues.length;
			}
			let keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx), valueResult = def.valueType._zod.run({ value, issues: [] }, ctx);
			keyResult instanceof Promise || valueResult instanceof Promise ? proms.push(Promise.all([keyResult, valueResult]).then(([keyResult2, valueResult2]) => {
				handleMapResult(keyResult2, valueResult2, payload, key, input, inst, ctx);
			})) : handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
		}
		return proms.length ? Promise.all(proms).then(() => payload) : payload;
	}, capSize(inst, mapSize);
});
function handleMapResult(keyResult, valueResult, final, key, input, inst, ctx) {
	keyResult.issues.length && (propertyKeyTypes.has(typeof key) ? final.issues.push(...prefixIssues(key, keyResult.issues)) : final.issues.push({
		code: "invalid_key",
		origin: "map",
		input,
		inst,
		issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config()))
	})), valueResult.issues.length && (propertyKeyTypes.has(typeof key) ? final.issues.push(...prefixIssues(key, valueResult.issues)) : final.issues.push({
		origin: "map",
		code: "invalid_element",
		input,
		inst,
		key,
		issues: valueResult.issues.map((iss) => finalizeIssue(iss, ctx, config()))
	})), final.value.set(keyResult.value, valueResult.value);
}
var $ZodSet = /* @__PURE__ */ $constructor("$ZodSet", (inst, def) => {
	$ZodType.init(inst, def);
	let memo = globalConfig.memoizer;
	memo?.attach(inst), inst._zod.parse = (payload, ctx) => {
		let input = payload.value;
		if (!(input instanceof Set))
			return payload.issues.push({
				input,
				inst,
				expected: "set",
				code: "invalid_type"
			}), payload;
		let proms = [];
		payload.value = memo ? memo.alloc(inst, payload, /* @__PURE__ */ new Set(), ctx) : /* @__PURE__ */ new Set();
		let abortEarly = ctx?.abortEarly, seen = payload.issues.length;
		for (let item of input) {
			if (abortEarly && payload.issues.length !== seen) {
				if (aborted(payload, seen))
					break;
				seen = payload.issues.length;
			}
			let result = def.valueType._zod.run({ value: item, issues: [] }, ctx);
			result instanceof Promise ? proms.push(result.then((result2) => handleSetResult(result2, payload))) : handleSetResult(result, payload);
		}
		return proms.length ? Promise.all(proms).then(() => payload) : payload;
	}, capSize(inst, setSize);
});
function handleSetResult(result, final) {
	result.issues.length && final.issues.push(...result.issues), final.value.add(result.value);
}
var $ZodEnum = /* @__PURE__ */ $constructor("$ZodEnum", (inst, def) => {
	$ZodType.init(inst, def);
	let values = getEnumValues(def.entries), valuesSet = new Set(values);
	inst._zod.values = valuesSet, defineLazyInternal(inst, "pattern", (zod) => {
		let patternValues = getEnumValues(zod.def.entries).filter((k) => propertyKeyTypes.has(typeof k));
		return new RegExp(patternValues.length ? `^(${patternValues.map((o) => escapeRegex(o.toString())).join("|")})$` : "^[^\\s\\S]$");
	}), inst._zod.parse = (payload, _ctx) => {
		let input = payload.value;
		return valuesSet.has(input) || payload.issues.push({
			code: "invalid_value",
			values,
			input,
			inst
		}), payload;
	};
}), $ZodLiteral = /* @__PURE__ */ $constructor("$ZodLiteral", (inst, def) => {
	$ZodType.init(inst, def);
	let values = new Set(def.values);
	inst._zod.values = values, defineLazyInternal(inst, "pattern", (zod) => {
		let vals = zod.def.values;
		return new RegExp(vals.length ? `^(${vals.map((o) => typeof o == "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o)).join("|")})$` : "^[^\\s\\S]$");
	}), inst._zod.parse = (payload, _ctx) => {
		let input = payload.value;
		return values.has(input) || payload.issues.push({
			code: "invalid_value",
			values: def.values,
			input,
			inst
		}), payload;
	};
}), $ZodFile = /* @__PURE__ */ $constructor("$ZodFile", (inst, def) => {
	$ZodType.init(inst, def), inst._zod.parse = (payload, _ctx) => {
		let input = payload.value;
		return input instanceof File || payload.issues.push({
			expected: "file",
			code: "invalid_type",
			input,
			inst
		}), payload;
	};
}), $ZodTransform = /* @__PURE__ */ $constructor("$ZodTransform", (inst, def) => {
	$ZodType.init(inst, def), inst._zod.optin = "optional", globalConfig.memoizer?.guard(inst), inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward")
			throw new $ZodEncodeError(inst.constructor.name);
		let _out = def.transform(payload.value, payload);
		if (ctx.async)
			return (_out instanceof Promise ? _out : Promise.resolve(_out)).then((output2) => (payload.value = output2, payload));
		if (_out instanceof Promise)
			throw new $ZodAsyncError();
		return payload.value = _out, payload;
	};
});
function handleOptionalResult(payload, result) {
	return payload.value = result.issues.length ? void 0 : result.value, payload;
}
var $ZodOptional = /* @__PURE__ */ $constructor("$ZodOptional", (inst, def) => {
	$ZodType.init(inst, def), defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), inst._zod.optout = "optional", defineLazyInternal(inst, "values", (zod) => {
		let values = zod.def.innerType._zod.values;
		return values ? /* @__PURE__ */ new Set([...values, void 0]) : void 0;
	}), defineLazyInternal(inst, "pattern", (zod) => {
		let pattern = zod.def.innerType._zod.pattern;
		return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
	}), inst._zod.parse = (payload, ctx) => {
		if (payload.value === void 0) {
			if (def.innerType._zod.optin !== "defaulted")
				return payload;
			let result = def.innerType._zod.run({ value: payload.value, issues: [] }, ctx);
			return result instanceof Promise ? result.then((result2) => handleOptionalResult(payload, result2)) : handleOptionalResult(payload, result);
		}
		return def.innerType._zod.run(payload, ctx);
	};
}), $ZodExactOptional = /* @__PURE__ */ $constructor("$ZodExactOptional", (inst, def) => {
	$ZodOptional.init(inst, def), defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values), defineLazyInternal(inst, "pattern", (zod) => zod.def.innerType._zod.pattern), inst._zod.parse = (payload, ctx) => def.innerType._zod.run(payload, ctx);
}), $ZodNullable = /* @__PURE__ */ $constructor("$ZodNullable", (inst, def) => {
	$ZodType.init(inst, def), defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin), defineLazyInternal(inst, "optout", (zod) => zod.def.innerType._zod.optout), defineLazyInternal(inst, "pattern", (zod) => {
		let pattern = zod.def.innerType._zod.pattern;
		return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
	}), defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values ? /* @__PURE__ */ new Set([...zod.def.innerType._zod.values, null]) : void 0), inst._zod.parse = (payload, ctx) => payload.value === null ? payload : def.innerType._zod.run(payload, ctx);
}), $ZodDefault = /* @__PURE__ */ $constructor("$ZodDefault", (inst, def) => {
	$ZodType.init(inst, def), inst._zod.optin = "defaulted", defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values), inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward")
			return def.innerType._zod.run(payload, ctx);
		if (payload.value === void 0)
			return payload.value = def.defaultValue, payload;
		let result = def.innerType._zod.run(payload, ctx);
		return result instanceof Promise ? result.then((result2) => handleDefaultResult(result2, def)) : handleDefaultResult(result, def);
	};
});
function handleDefaultResult(payload, def) {
	return payload.value === void 0 && (payload.value = def.defaultValue), payload;
}
var $ZodPrefault = /* @__PURE__ */ $constructor("$ZodPrefault", (inst, def) => {
	$ZodType.init(inst, def), inst._zod.optin = "defaulted", defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values), inst._zod.parse = (payload, ctx) => (ctx.direction === "backward" || payload.value === void 0 && (payload.value = def.defaultValue), def.innerType._zod.run(payload, ctx));
}), $ZodNonOptional = /* @__PURE__ */ $constructor("$ZodNonOptional", (inst, def) => {
	$ZodType.init(inst, def), defineLazyInternal(inst, "values", (zod) => {
		let v = zod.def.innerType._zod.values;
		return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
	}), inst._zod.parse = (payload, ctx) => {
		let result = def.innerType._zod.run(payload, ctx);
		return result instanceof Promise ? result.then((result2) => handleNonOptionalResult(result2, inst)) : handleNonOptionalResult(result, inst);
	};
});
function handleNonOptionalResult(payload, inst) {
	return !payload.issues.length && payload.value === void 0 && payload.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: payload.value,
		inst
	}), payload;
}
var $ZodSuccess = /* @__PURE__ */ $constructor("$ZodSuccess", (inst, def) => {
	$ZodType.init(inst, def), inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward")
			throw new $ZodEncodeError("ZodSuccess");
		let result = def.innerType._zod.run(payload, ctx);
		return result instanceof Promise ? result.then((result2) => (payload.value = result2.issues.length === 0, payload)) : (payload.value = result.issues.length === 0, payload);
	};
});
function handleCatchResult(payload, result, def, ctx) {
	return result.issues.length ? (payload.value = def.catchValue({
		...result,
		value: payload.value,
		error: {
			issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config()))
		},
		input: payload.value
	}), payload) : (payload.value = result.value, result.memo && (payload.memo = !0), payload);
}
var $ZodCatch = /* @__PURE__ */ $constructor("$ZodCatch", (inst, def) => {
	$ZodType.init(inst, def), defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), defineLazyInternal(inst, "optout", (zod) => zod.def.innerType._zod.optout), defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values), inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward")
			return def.innerType._zod.run(payload, ctx);
		let result = def.innerType._zod.run({ value: payload.value, issues: [] }, ctx);
		return result instanceof Promise ? result.then((result2) => handleCatchResult(payload, result2, def, ctx)) : handleCatchResult(payload, result, def, ctx);
	};
}), $ZodNaN = /* @__PURE__ */ $constructor("$ZodNaN", (inst, def) => {
	$ZodType.init(inst, def), inst._zod.parse = (payload, _ctx) => ((typeof payload.value != "number" || !Number.isNaN(payload.value)) && payload.issues.push({
		input: payload.value,
		inst,
		expected: "nan",
		code: "invalid_type"
	}), payload);
}), $ZodPipe = /* @__PURE__ */ $constructor("$ZodPipe", (inst, def) => {
	$ZodType.init(inst, def), defineLazyInternal(inst, "values", (zod) => zod.def.in._zod.values), defineLazyInternal(inst, "optin", (zod) => zod.def.in._zod.optin), defineLazyInternal(inst, "optout", (zod) => zod.def.out._zod.optout), defineLazyInternal(inst, "propValues", (zod) => zod.def.in._zod.propValues), inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") {
			let right = def.out._zod.run(payload, ctx);
			return right instanceof Promise ? right.then((right2) => handlePipeResult(right2, def.in, ctx)) : handlePipeResult(right, def.in, ctx);
		}
		let left = def.in._zod.run(payload, ctx);
		return left instanceof Promise ? left.then((left2) => handlePipeResult(left2, def.out, ctx)) : handlePipeResult(left, def.out, ctx);
	};
});
function handlePipeResult(left, next, ctx) {
	return left.issues.some((iss) => iss.code !== "unrecognized_keys") ? (left.aborted = !0, left) : next._zod.run({ value: left.value, issues: left.issues }, ctx);
}
var $ZodCodec = /* @__PURE__ */ $constructor("$ZodCodec", (inst, def) => {
	$ZodType.init(inst, def), defineLazyInternal(inst, "values", (zod) => zod.def.in._zod.values), defineLazyInternal(inst, "optin", (zod) => zod.def.in._zod.optin), defineLazyInternal(inst, "optout", (zod) => zod.def.out._zod.optout), defineLazyInternal(inst, "propValues", (zod) => zod.def.in._zod.propValues), inst._zod.parse = (payload, ctx) => {
		if ((ctx.direction || "forward") === "forward") {
			let left = def.in._zod.run(payload, ctx);
			return left instanceof Promise ? left.then((left2) => handleCodecAResult(left2, def, ctx)) : handleCodecAResult(left, def, ctx);
		} else {
			let right = def.out._zod.run(payload, ctx);
			return right instanceof Promise ? right.then((right2) => handleCodecAResult(right2, def, ctx)) : handleCodecAResult(right, def, ctx);
		}
	};
});
function handleCodecAResult(result, def, ctx) {
	if (result.issues.length)
		return result.aborted = !0, result;
	if ((ctx.direction || "forward") === "forward") {
		let transformed = def.transform(result.value, result);
		return transformed instanceof Promise ? transformed.then((value) => handleCodecTxResult(result, value, def.out, ctx)) : handleCodecTxResult(result, transformed, def.out, ctx);
	} else {
		let transformed = def.reverseTransform(result.value, result);
		return transformed instanceof Promise ? transformed.then((value) => handleCodecTxResult(result, value, def.in, ctx)) : handleCodecTxResult(result, transformed, def.in, ctx);
	}
}
function handleCodecTxResult(left, value, nextSchema, ctx) {
	return left.issues.length ? (left.aborted = !0, left) : nextSchema._zod.run({ value, issues: left.issues }, ctx);
}
var $ZodPreprocess = /* @__PURE__ */ $constructor("$ZodPreprocess", (inst, def) => {
	$ZodPipe.init(inst, def);
}), $ZodReadonly = /* @__PURE__ */ $constructor("$ZodReadonly", (inst, def) => {
	$ZodType.init(inst, def), defineLazyInternal(inst, "propValues", (zod) => zod.def.innerType._zod.propValues), defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values), defineLazyInternal(inst, "optin", (zod) => zod.def.innerType?._zod?.optin), defineLazyInternal(inst, "optout", (zod) => zod.def.innerType?._zod?.optout), inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward")
			return def.innerType._zod.run(payload, ctx);
		let result = def.innerType._zod.run(payload, ctx);
		return result instanceof Promise ? result.then(handleReadonlyResult) : handleReadonlyResult(result);
	};
});
function handleReadonlyResult(payload) {
	return payload.memo || (payload.value = Object.freeze(payload.value)), payload;
}
function leafPattern(schema) {
	let def = schema._zod.def, pattern = def.pattern, isInt = !!def.format?.includes("int"), minimum, maximum;
	for (let ch of def.checks ?? []) {
		let d = ch._zod.def;
		d.pattern && (pattern = d.pattern), isInt || (isInt = !!d.format?.includes("int"));
		let lo = d.minimum ?? d.length, hi = d.maximum ?? d.length;
		lo !== void 0 && (minimum === void 0 || lo > minimum) && (minimum = lo), hi !== void 0 && (maximum === void 0 || hi < maximum) && (maximum = hi);
	}
	if (pattern)
		return pattern.source;
	if (minimum !== void 0 && maximum !== void 0 && minimum > maximum)
		return "(?!)";
	if (minimum !== void 0 || maximum !== void 0)
		return string({ minimum, maximum }).source;
	let own2 = schema._zod.pattern;
	return (isInt && own2 === number ? integer : own2)?.source;
}
function partPattern(schema) {
	let def = schema._zod.def, own2 = schema._zod.pattern?.source, inner = def.innerType ?? schema._zod.innerType;
	if (inner) {
		let before = inner._zod.pattern?.source, after = partPattern(inner);
		return own2 && before && after && after !== before ? own2.replace(cleanRegex(before), () => cleanRegex(after)) : own2;
	}
	if (def.options) {
		let sources = def.options.map(partPattern);
		if (sources.every(Boolean))
			return `^(${sources.map((s) => cleanRegex(s)).join("|")})$`;
	}
	return leafPattern(schema);
}
var $ZodTemplateLiteral = /* @__PURE__ */ $constructor("$ZodTemplateLiteral", (inst, def) => {
	$ZodType.init(inst, def);
	let regexParts = [];
	for (let part of def.parts)
		if (typeof part == "object" && part !== null) {
			let source = partPattern(part);
			if (!source)
				throw new Error(`Invalid template literal part, no pattern found: ${[...part._zod.traits].shift()}`);
			regexParts.push(cleanRegex(source));
		} else if (part === null || primitiveTypes.has(typeof part))
			regexParts.push(escapeRegex(`${part}`));
		else
			throw new Error(`Invalid template literal part: ${part}`);
	inst._zod.pattern = new RegExp(`^${regexParts.join("")}$`), inst._zod.parse = (payload, _ctx) => typeof payload.value != "string" ? (payload.issues.push({
		input: payload.value,
		inst,
		expected: "string",
		code: "invalid_type"
	}), payload) : (inst._zod.pattern.lastIndex = 0, inst._zod.pattern.test(payload.value) || payload.issues.push({
		input: payload.value,
		inst,
		code: "invalid_format",
		format: def.format ?? "template_literal",
		pattern: inst._zod.pattern.source
	}), payload);
}), $ZodFunction = /* @__PURE__ */ $constructor("$ZodFunction", (inst, def) => ($ZodType.init(inst, def), Object.defineProperty(inst, "_def", { value: def }), inst._zod.def = def, inst.implement = (func) => {
	if (typeof func != "function")
		throw new Error("implement() must be called with a function");
	return Object.defineProperty(function(...args) {
		let parsedArgs = inst._def.input ? parse(inst._def.input, args) : args, result = Reflect.apply(func, this, parsedArgs);
		return inst._def.output ? parse(inst._def.output, result) : result;
	}, "_zod", { value: inst._zod, enumerable: !1 });
}, inst.implementAsync = (func) => {
	if (typeof func != "function")
		throw new Error("implementAsync() must be called with a function");
	return Object.defineProperty(async function(...args) {
		let parsedArgs = inst._def.input ? await parseAsync(inst._def.input, args) : args, result = await Reflect.apply(func, this, parsedArgs);
		return inst._def.output ? await parseAsync(inst._def.output, result) : result;
	}, "_zod", { value: inst._zod, enumerable: !1 });
}, inst._zod.parse = (payload, _ctx) => typeof payload.value != "function" ? (payload.issues.push({
	code: "invalid_type",
	expected: "function",
	input: payload.value,
	inst
}), payload) : (inst._def.output && inst._def.output._zod.def.type === "promise" ? payload.value = inst.implementAsync(payload.value) : payload.value = inst.implement(payload.value), payload), inst.input = (...args) => {
	let F = inst.constructor;
	return Array.isArray(args[0]) ? new F({
		type: "function",
		input: new $ZodTuple({
			type: "tuple",
			items: args[0],
			rest: args[1]
		}),
		output: inst._def.output
	}) : new F({
		type: "function",
		input: args[0],
		output: inst._def.output
	});
}, inst.output = (output) => {
	let F = inst.constructor;
	return new F({
		type: "function",
		input: inst._def.input,
		output
	});
}, inst)), $ZodPromise = /* @__PURE__ */ $constructor("$ZodPromise", (inst, def) => {
	$ZodType.init(inst, def), inst._zod.parse = (payload, ctx) => Promise.resolve(payload.value).then((inner) => def.innerType._zod.run({ value: inner, issues: [] }, ctx));
}), $ZodLazy = /* @__PURE__ */ $constructor("$ZodLazy", (inst, def) => {
	$ZodType.init(inst, def), defineLazy(inst._zod, "innerType", () => {
		let d = def;
		return d._cachedInner || (d._cachedInner = def.getter()), d._cachedInner;
	}), defineLazyInternal(inst, "pattern", (zod) => zod.innerType?._zod?.pattern), defineLazyInternal(inst, "propValues", (zod) => zod.innerType?._zod?.propValues), defineLazyInternal(inst, "optin", (zod) => zod.innerType?._zod?.optin ?? void 0), defineLazyInternal(inst, "optout", (zod) => zod.innerType?._zod?.optout ?? void 0), inst._zod.parse = (payload, ctx) => inst._zod.innerType._zod.run(payload, ctx);
}), $ZodCustom = /* @__PURE__ */ $constructor("$ZodCustom", (inst, def) => {
	$ZodCheck.init(inst, def), $ZodType.init(inst, def), inst._zod.parse = (payload, _) => payload, inst._zod.check = (payload) => {
		let input = payload.value, r = def.fn(input);
		if (r instanceof Promise)
			return r.then((r2) => handleRefineResult(r2, payload, input, inst));
		handleRefineResult(r, payload, input, inst);
	};
});
function handleRefineResult(result, payload, input, inst) {
	if (!result) {
		let _iss = {
			code: "custom",
			input,
			inst,
			// incorporates params.error into issue reporting
			path: [...inst._zod.def.path ?? []],
			// incorporates params.error into issue reporting
			continue: !inst._zod.def.abort
			// params: inst._zod.def.params,
		};
		inst._zod.def.params && (_iss.params = inst._zod.def.params), payload.issues.push(issue(_iss));
	}
}

export {
	$ZodError,
	$ZodRealError,
	flattenError,
	formatError,
	treeifyError,
	toDotPath,
	prettifyError,
	_parse,
	parse,
	_parseAsync,
	parseAsync,
	_safeParse,
	safeParse,
	_safeParseAsync,
	safeParseAsync,
	validate,
	validateAsync,
	_encode,
	encode,
	_decode,
	decode,
	_encodeAsync,
	encodeAsync,
	_decodeAsync,
	decodeAsync,
	_safeEncode,
	safeEncode,
	_safeDecode,
	safeDecode,
	_safeEncodeAsync,
	safeEncodeAsync,
	_safeDecodeAsync,
	safeDecodeAsync,
	base64,
	base64url,
	hostname,
	domain,
	httpProtocol,
	currencyCode,
	integer,
	number,
	hex,
	regexes_exports,
	$ZodCheck,
	$ZodCheckLessThan,
	$ZodCheckGreaterThan,
	$ZodCheckMultipleOf,
	$ZodCheckNumberFormat,
	$ZodCheckBigIntFormat,
	$ZodCheckMaxSize,
	$ZodCheckMinSize,
	$ZodCheckSizeEquals,
	$ZodCheckMaxLength,
	$ZodCheckMinLength,
	$ZodCheckLengthEquals,
	$ZodCheckStringFormat,
	$ZodCheckRegex,
	$ZodCheckLowerCase,
	$ZodCheckUpperCase,
	$ZodCheckIncludes,
	$ZodCheckStartsWith,
	$ZodCheckEndsWith,
	$ZodCheckProperty,
	$ZodCheckProperties,
	$ZodCheckMimeType,
	$ZodCheckOverwrite,
	Doc,
	version,
	$ZodType,
	standardProps,
	$ZodString,
	$ZodStringFormat,
	$ZodGUID,
	$ZodUUID,
	$ZodEmail,
	URL_BAD_FORMAT,
	URL_UNPARSEABLE,
	canParseURL,
	validateURL,
	parseURLObject,
	stripTabAndNewline,
	urlHostnameOk,
	urlProtocolOk,
	$ZodURL,
	$ZodEmoji,
	$ZodNanoID,
	$ZodCUID,
	$ZodCUID2,
	$ZodULID,
	$ZodXID,
	$ZodKSUID,
	$ZodISODateTime,
	$ZodISODate,
	$ZodISOTime,
	$ZodISODuration,
	$ZodIPv4,
	isValidIPv6,
	$ZodIPv6,
	$ZodMAC,
	$ZodCIDRv4,
	isValidCIDRv6,
	$ZodCIDRv6,
	isValidBase64,
	base64Charset,
	$ZodBase64,
	base64urlCharset,
	isValidBase64URL,
	$ZodBase64URL,
	$ZodE164,
	isValidCreditCard,
	$ZodCreditCard,
	isValidIBAN,
	$ZodIBAN,
	isValidJWT,
	$ZodJWT,
	$ZodCustomStringFormat,
	$ZodNumber,
	$ZodNumberFormat,
	$ZodBoolean,
	$ZodBigInt,
	$ZodBigIntFormat,
	$ZodSymbol,
	$ZodUndefined,
	$ZodNull,
	$ZodAny,
	$ZodUnknown,
	$ZodNever,
	$ZodVoid,
	$ZodDate,
	$ZodArray,
	$ZodObject,
	$ZodObjectJIT,
	$ZodUnion,
	$ZodXor,
	getDiscriminatedOption,
	$ZodDiscriminatedUnion,
	$ZodIntersection,
	mergeValues,
	$ZodTuple,
	$ZodRecord,
	$ZodMap,
	$ZodSet,
	$ZodEnum,
	$ZodLiteral,
	$ZodFile,
	$ZodTransform,
	$ZodOptional,
	$ZodExactOptional,
	$ZodNullable,
	$ZodDefault,
	$ZodPrefault,
	$ZodNonOptional,
	$ZodSuccess,
	$ZodCatch,
	$ZodNaN,
	$ZodPipe,
	$ZodCodec,
	$ZodPreprocess,
	$ZodReadonly,
	$ZodTemplateLiteral,
	$ZodFunction,
	$ZodPromise,
	$ZodLazy,
	$ZodCustom
};
