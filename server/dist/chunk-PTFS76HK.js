import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/eo.js
var error = () => {
	let Sizable = {
		string: { unit: "karaktrojn", verb: "havi" },
		file: { unit: "bajtojn", verb: "havi" },
		array: { unit: "elementojn", verb: "havi" },
		set: { unit: "elementojn", verb: "havi" },
		map: { unit: "elementojn", verb: "havi" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "enigo",
		email: "retadreso",
		url: "URL",
		emoji: "emo\u011Dio",
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
		datetime: "ISO-datotempo",
		date: "ISO-dato",
		time: "ISO-tempo",
		duration: "ISO-da\u016Dro",
		ipv4: "IPv4-adreso",
		ipv6: "IPv6-adreso",
		mac: "MAC-adreso",
		cidrv4: "IPv4-rango",
		cidrv6: "IPv6-rango",
		base64: "64-ume kodita karaktraro",
		base64url: "URL-64-ume kodita karaktraro",
		json_string: "JSON-karaktraro",
		e164: "E.164-nombro",
		credit_card: "kreditkarta numero",
		currency_code: "valuta kodo",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "enigo"
	}, TypeDictionary = {
		nan: "NaN",
		number: "nombro",
		array: "tabelo",
		null: "senvalora"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `Nevalida enigo: atendi\u011Dis instanceof ${issue.expected}, ricevi\u011Dis ${received}` : `Nevalida enigo: atendi\u011Dis ${expected}, ricevi\u011Dis ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `Nevalida enigo: atendi\u011Dis ${stringifyPrimitive(issue.values[0])}` : `Nevalida opcio: atendi\u011Dis unu el ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				return sizing ? `Tro granda: atendi\u011Dis ke ${issue.origin ?? "valoro"} havu ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementojn"}` : `Tro granda: atendi\u011Dis ke ${issue.origin ?? "valoro"} havu ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				return sizing ? `Tro malgranda: atendi\u011Dis ke ${issue.origin} havu ${adj}${issue.minimum.toString()} ${sizing.unit}` : `Tro malgranda: atendi\u011Dis ke ${issue.origin} estu ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `Nevalida karaktraro: devas komenci\u011Di per "${_issue.prefix}"` : _issue.format === "ends_with" ? `Nevalida karaktraro: devas fini\u011Di per "${_issue.suffix}"` : _issue.format === "includes" ? `Nevalida karaktraro: devas inkluzivi "${_issue.includes}"` : _issue.format === "regex" ? `Nevalida karaktraro: devas kongrui kun la modelo ${_issue.pattern}` : `Nevalida ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `Nevalida nombro: devas esti oblo de ${issue.divisor}`;
			case "unrecognized_keys":
				return `Nekonata${issue.keys.length > 1 ? "j" : ""} \u015Dlosilo${issue.keys.length > 1 ? "j" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `Nevalida \u015Dlosilo en ${issue.origin}`;
			case "invalid_union":
				return "Nevalida enigo";
			case "invalid_element":
				return `Nevalida valoro en ${issue.origin}`;
			default:
				return "Nevalida enigo";
		}
	};
};
function eo_default() {
	return {
		localeError: error()
	};
}

export {
	eo_default
};
