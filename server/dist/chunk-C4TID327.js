import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/az.js
var error = () => {
	let Sizable = {
		string: { unit: "simvol", verb: "olmal\u0131d\u0131r" },
		file: { unit: "bayt", verb: "olmal\u0131d\u0131r" },
		array: { unit: "element", verb: "olmal\u0131d\u0131r" },
		set: { unit: "element", verb: "olmal\u0131d\u0131r" },
		map: { unit: "element", verb: "olmal\u0131d\u0131r" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "input",
		email: "email address",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO datetime",
		date: "ISO date",
		time: "ISO time",
		duration: "ISO duration",
		ipv4: "IPv4 address",
		ipv6: "IPv6 address",
		mac: "MAC address",
		cidrv4: "IPv4 range",
		cidrv6: "IPv6 range",
		base64: "base64-encoded string",
		base64url: "base64url-encoded string",
		json_string: "JSON string",
		e164: "E.164 number",
		credit_card: "kredit kart\u0131 n\xF6mr\u0259si",
		currency_code: "valyuta kodu",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "input"
	}, TypeDictionary = {
		nan: "NaN"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n instanceof ${issue.expected}, daxil olan ${received}` : `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n ${expected}, daxil olan ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n ${stringifyPrimitive(issue.values[0])}` : `Yanl\u0131\u015F se\xE7im: a\u015Fa\u011F\u0131dak\u0131lardan biri olmal\u0131d\u0131r: ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				return sizing ? `\xC7ox b\xF6y\xFCk: g\xF6zl\u0259nil\u0259n ${issue.origin ?? "d\u0259y\u0259r"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "element"}` : `\xC7ox b\xF6y\xFCk: g\xF6zl\u0259nil\u0259n ${issue.origin ?? "d\u0259y\u0259r"} ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				return sizing ? `\xC7ox ki\xE7ik: g\xF6zl\u0259nil\u0259n ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit}` : `\xC7ox ki\xE7ik: g\xF6zl\u0259nil\u0259n ${issue.origin} ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `Yanl\u0131\u015F m\u0259tn: "${_issue.prefix}" il\u0259 ba\u015Flamal\u0131d\u0131r` : _issue.format === "ends_with" ? `Yanl\u0131\u015F m\u0259tn: "${_issue.suffix}" il\u0259 bitm\u0259lidir` : _issue.format === "includes" ? `Yanl\u0131\u015F m\u0259tn: "${_issue.includes}" daxil olmal\u0131d\u0131r` : _issue.format === "regex" ? `Yanl\u0131\u015F m\u0259tn: ${_issue.pattern} \u015Fablonuna uy\u011Fun olmal\u0131d\u0131r` : `Yanl\u0131\u015F ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `Yanl\u0131\u015F \u0259d\u0259d: ${issue.divisor} il\u0259 b\xF6l\xFCn\u0259 bil\u0259n olmal\u0131d\u0131r`;
			case "unrecognized_keys":
				return `Tan\u0131nmayan a\xE7ar${issue.keys.length > 1 ? "lar" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `${issue.origin} daxilind\u0259 yanl\u0131\u015F a\xE7ar`;
			case "invalid_union":
				return "Yanl\u0131\u015F d\u0259y\u0259r";
			case "invalid_element":
				return `${issue.origin} daxilind\u0259 yanl\u0131\u015F d\u0259y\u0259r`;
			default:
				return "Yanl\u0131\u015F d\u0259y\u0259r";
		}
	};
};
function az_default() {
	return {
		localeError: error()
	};
}

export {
	az_default
};
