import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/tr.js
var error = () => {
	let Sizable = {
		string: { unit: "karakter", verb: "olmal\u0131" },
		file: { unit: "bayt", verb: "olmal\u0131" },
		array: { unit: "\xF6\u011Fe", verb: "olmal\u0131" },
		set: { unit: "\xF6\u011Fe", verb: "olmal\u0131" },
		map: { unit: "\xF6\u011Fe", verb: "olmal\u0131" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "girdi",
		email: "e-posta adresi",
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
		datetime: "ISO tarih ve saat",
		date: "ISO tarih",
		time: "ISO saat",
		duration: "ISO s\xFCre",
		ipv4: "IPv4 adresi",
		ipv6: "IPv6 adresi",
		mac: "MAC adresi",
		cidrv4: "IPv4 aral\u0131\u011F\u0131",
		cidrv6: "IPv6 aral\u0131\u011F\u0131",
		base64: "base64 ile \u015Fifrelenmi\u015F metin",
		base64url: "base64url ile \u015Fifrelenmi\u015F metin",
		json_string: "JSON dizesi",
		e164: "E.164 say\u0131s\u0131",
		credit_card: "kredi kart\u0131 numaras\u0131",
		currency_code: "para birimi kodu",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "\u015Eablon dizesi"
	}, TypeDictionary = {
		nan: "NaN"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `Ge\xE7ersiz de\u011Fer: beklenen instanceof ${issue.expected}, al\u0131nan ${received}` : `Ge\xE7ersiz de\u011Fer: beklenen ${expected}, al\u0131nan ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `Ge\xE7ersiz de\u011Fer: beklenen ${stringifyPrimitive(issue.values[0])}` : `Ge\xE7ersiz se\xE7enek: a\u015Fa\u011F\u0131dakilerden biri olmal\u0131: ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				return sizing ? `\xC7ok b\xFCy\xFCk: beklenen ${issue.origin ?? "de\u011Fer"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "\xF6\u011Fe"}` : `\xC7ok b\xFCy\xFCk: beklenen ${issue.origin ?? "de\u011Fer"} ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				return sizing ? `\xC7ok k\xFC\xE7\xFCk: beklenen ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit}` : `\xC7ok k\xFC\xE7\xFCk: beklenen ${issue.origin} ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `Ge\xE7ersiz metin: "${_issue.prefix}" ile ba\u015Flamal\u0131` : _issue.format === "ends_with" ? `Ge\xE7ersiz metin: "${_issue.suffix}" ile bitmeli` : _issue.format === "includes" ? `Ge\xE7ersiz metin: "${_issue.includes}" i\xE7ermeli` : _issue.format === "regex" ? `Ge\xE7ersiz metin: ${_issue.pattern} desenine uymal\u0131` : `Ge\xE7ersiz ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `Ge\xE7ersiz say\u0131: ${issue.divisor} ile tam b\xF6l\xFCnebilmeli`;
			case "unrecognized_keys":
				return `Tan\u0131nmayan anahtar${issue.keys.length > 1 ? "lar" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `${issue.origin} i\xE7inde ge\xE7ersiz anahtar`;
			case "invalid_union":
				return "Ge\xE7ersiz de\u011Fer";
			case "invalid_element":
				return `${issue.origin} i\xE7inde ge\xE7ersiz de\u011Fer`;
			default:
				return "Ge\xE7ersiz de\u011Fer";
		}
	};
};
function tr_default() {
	return {
		localeError: error()
	};
}

export {
	tr_default
};
