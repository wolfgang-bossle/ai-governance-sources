import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/ota.js
var error = () => {
	let Sizable = {
		string: { unit: "harf", verb: "olmal\u0131d\u0131r" },
		file: { unit: "bayt", verb: "olmal\u0131d\u0131r" },
		array: { unit: "unsur", verb: "olmal\u0131d\u0131r" },
		set: { unit: "unsur", verb: "olmal\u0131d\u0131r" },
		map: { unit: "unsur", verb: "olmal\u0131d\u0131r" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "giren",
		email: "epostag\xE2h",
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
		datetime: "ISO heng\xE2m\u0131",
		date: "ISO tarihi",
		time: "ISO zaman\u0131",
		duration: "ISO m\xFCddeti",
		ipv4: "IPv4 ni\u015F\xE2n\u0131",
		ipv6: "IPv6 ni\u015F\xE2n\u0131",
		mac: "MAC ni\u015F\xE2n\u0131",
		cidrv4: "IPv4 menzili",
		cidrv6: "IPv6 menzili",
		base64: "base64-\u015Fifreli metin",
		base64url: "base64url-\u015Fifreli metin",
		json_string: "JSON metin",
		e164: "E.164 say\u0131s\u0131",
		credit_card: "i'tib\xE2r kart\u0131 numaras\u0131",
		currency_code: "para birimi kodu",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "giren"
	}, TypeDictionary = {
		nan: "NaN",
		number: "numara",
		array: "saf",
		null: "gayb"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `F\xE2sit giren: umulan instanceof ${issue.expected}, al\u0131nan ${received}` : `F\xE2sit giren: umulan ${expected}, al\u0131nan ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `F\xE2sit giren: umulan ${stringifyPrimitive(issue.values[0])}` : `F\xE2sit tercih: m\xFBteberler ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				return sizing ? `Fazla b\xFCy\xFCk: ${issue.origin ?? "value"}, ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elements"} sahip olmal\u0131yd\u0131.` : `Fazla b\xFCy\xFCk: ${issue.origin ?? "value"}, ${adj}${issue.maximum.toString()} olmal\u0131yd\u0131.`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				return sizing ? `Fazla k\xFC\xE7\xFCk: ${issue.origin}, ${adj}${issue.minimum.toString()} ${sizing.unit} sahip olmal\u0131yd\u0131.` : `Fazla k\xFC\xE7\xFCk: ${issue.origin}, ${adj}${issue.minimum.toString()} olmal\u0131yd\u0131.`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `F\xE2sit metin: "${_issue.prefix}" ile ba\u015Flamal\u0131.` : _issue.format === "ends_with" ? `F\xE2sit metin: "${_issue.suffix}" ile bitmeli.` : _issue.format === "includes" ? `F\xE2sit metin: "${_issue.includes}" ihtiv\xE2 etmeli.` : _issue.format === "regex" ? `F\xE2sit metin: ${_issue.pattern} nak\u015F\u0131na uymal\u0131.` : `F\xE2sit ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `F\xE2sit say\u0131: ${issue.divisor} kat\u0131 olmal\u0131yd\u0131.`;
			case "unrecognized_keys":
				return `Tan\u0131nmayan anahtar ${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `${issue.origin} i\xE7in tan\u0131nmayan anahtar var.`;
			case "invalid_union":
				return "Giren tan\u0131namad\u0131.";
			case "invalid_element":
				return `${issue.origin} i\xE7in tan\u0131nmayan k\u0131ymet var.`;
			default:
				return "K\u0131ymet tan\u0131namad\u0131.";
		}
	};
};
function ota_default() {
	return {
		localeError: error()
	};
}

export {
	ota_default
};
