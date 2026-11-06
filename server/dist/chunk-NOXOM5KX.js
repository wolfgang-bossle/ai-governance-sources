import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/is.js
var error = () => {
	let Sizable = {
		string: { unit: "stafi", verb: "a\xF0 hafa" },
		file: { unit: "b\xE6ti", verb: "a\xF0 hafa" },
		array: { unit: "hluti", verb: "a\xF0 hafa" },
		set: { unit: "hluti", verb: "a\xF0 hafa" },
		map: { unit: "hluti", verb: "a\xF0 hafa" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "gildi",
		email: "netfang",
		url: "vefsl\xF3\xF0",
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
		datetime: "ISO dagsetning og t\xEDmi",
		date: "ISO dagsetning",
		time: "ISO t\xEDmi",
		duration: "ISO t\xEDmalengd",
		ipv4: "IPv4 address",
		ipv6: "IPv6 address",
		mac: "MAC address",
		cidrv4: "IPv4 range",
		cidrv6: "IPv6 range",
		base64: "base64-encoded strengur",
		base64url: "base64url-encoded strengur",
		json_string: "JSON strengur",
		e164: "E.164 t\xF6lugildi",
		credit_card: "kreditkortan\xFAmer",
		currency_code: "gjaldmi\xF0ilsk\xF3\xF0i",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "gildi"
	}, TypeDictionary = {
		nan: "NaN",
		number: "n\xFAmer",
		array: "fylki"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `Rangt gildi: \xDE\xFA sl\xF3st inn ${received} \xFEar sem \xE1 a\xF0 vera instanceof ${issue.expected}` : `Rangt gildi: \xDE\xFA sl\xF3st inn ${received} \xFEar sem \xE1 a\xF0 vera ${expected}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `Rangt gildi: gert r\xE1\xF0 fyrir ${stringifyPrimitive(issue.values[0])}` : `\xD3gilt val: m\xE1 vera eitt af eftirfarandi ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				return sizing ? `Of st\xF3rt: gert er r\xE1\xF0 fyrir a\xF0 ${issue.origin ?? "gildi"} hafi ${adj}${issue.maximum.toString()} ${sizing.unit ?? "hluti"}` : `Of st\xF3rt: gert er r\xE1\xF0 fyrir a\xF0 ${issue.origin ?? "gildi"} s\xE9 ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				return sizing ? `Of l\xEDti\xF0: gert er r\xE1\xF0 fyrir a\xF0 ${issue.origin} hafi ${adj}${issue.minimum.toString()} ${sizing.unit}` : `Of l\xEDti\xF0: gert er r\xE1\xF0 fyrir a\xF0 ${issue.origin} s\xE9 ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `\xD3gildur strengur: ver\xF0ur a\xF0 byrja \xE1 "${_issue.prefix}"` : _issue.format === "ends_with" ? `\xD3gildur strengur: ver\xF0ur a\xF0 enda \xE1 "${_issue.suffix}"` : _issue.format === "includes" ? `\xD3gildur strengur: ver\xF0ur a\xF0 innihalda "${_issue.includes}"` : _issue.format === "regex" ? `\xD3gildur strengur: ver\xF0ur a\xF0 fylgja mynstri ${_issue.pattern}` : `Rangt ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `R\xF6ng tala: ver\xF0ur a\xF0 vera margfeldi af ${issue.divisor}`;
			case "unrecognized_keys":
				return `\xD3\xFEekkt ${issue.keys.length > 1 ? "ir lyklar" : "ur lykill"}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `Rangur lykill \xED ${issue.origin}`;
			case "invalid_union":
				return "Rangt gildi";
			case "invalid_element":
				return `Rangt gildi \xED ${issue.origin}`;
			default:
				return "Rangt gildi";
		}
	};
};
function is_default() {
	return {
		localeError: error()
	};
}

export {
	is_default
};
