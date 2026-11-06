import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/cs.js
var error = () => {
	let Sizable = {
		string: { unit: "znak\u016F", verb: "m\xEDt" },
		file: { unit: "bajt\u016F", verb: "m\xEDt" },
		array: { unit: "prvk\u016F", verb: "m\xEDt" },
		set: { unit: "prvk\u016F", verb: "m\xEDt" },
		map: { unit: "prvk\u016F", verb: "m\xEDt" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "regul\xE1rn\xED v\xFDraz",
		email: "e-mailov\xE1 adresa",
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
		datetime: "datum a \u010Das ve form\xE1tu ISO",
		date: "datum ve form\xE1tu ISO",
		time: "\u010Das ve form\xE1tu ISO",
		duration: "doba trv\xE1n\xED ISO",
		ipv4: "IPv4 adresa",
		ipv6: "IPv6 adresa",
		mac: "MAC adresa",
		cidrv4: "rozsah IPv4",
		cidrv6: "rozsah IPv6",
		base64: "\u0159et\u011Bzec zak\xF3dovan\xFD ve form\xE1tu base64",
		base64url: "\u0159et\u011Bzec zak\xF3dovan\xFD ve form\xE1tu base64url",
		json_string: "\u0159et\u011Bzec ve form\xE1tu JSON",
		e164: "\u010D\xEDslo E.164",
		credit_card: "\u010D\xEDslo kreditn\xED karty",
		currency_code: "k\xF3d m\u011Bny",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "vstup"
	}, TypeDictionary = {
		nan: "NaN",
		number: "\u010D\xEDslo",
		string: "\u0159et\u011Bzec",
		function: "funkce",
		array: "pole"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no instanceof ${issue.expected}, obdr\u017Eeno ${received}` : `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no ${expected}, obdr\u017Eeno ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no ${stringifyPrimitive(issue.values[0])}` : `Neplatn\xE1 mo\u017Enost: o\u010Dek\xE1v\xE1na jedna z hodnot ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				return sizing ? `Hodnota je p\u0159\xEDli\u0161 velk\xE1: ${issue.origin ?? "hodnota"} mus\xED m\xEDt ${adj}${issue.maximum.toString()} ${sizing.unit ?? "prvk\u016F"}` : `Hodnota je p\u0159\xEDli\u0161 velk\xE1: ${issue.origin ?? "hodnota"} mus\xED b\xFDt ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				return sizing ? `Hodnota je p\u0159\xEDli\u0161 mal\xE1: ${issue.origin ?? "hodnota"} mus\xED m\xEDt ${adj}${issue.minimum.toString()} ${sizing.unit ?? "prvk\u016F"}` : `Hodnota je p\u0159\xEDli\u0161 mal\xE1: ${issue.origin ?? "hodnota"} mus\xED b\xFDt ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `Neplatn\xFD \u0159et\u011Bzec: mus\xED za\u010D\xEDnat na "${_issue.prefix}"` : _issue.format === "ends_with" ? `Neplatn\xFD \u0159et\u011Bzec: mus\xED kon\u010Dit na "${_issue.suffix}"` : _issue.format === "includes" ? `Neplatn\xFD \u0159et\u011Bzec: mus\xED obsahovat "${_issue.includes}"` : _issue.format === "regex" ? `Neplatn\xFD \u0159et\u011Bzec: mus\xED odpov\xEDdat vzoru ${_issue.pattern}` : `Neplatn\xFD form\xE1t ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `Neplatn\xE9 \u010D\xEDslo: mus\xED b\xFDt n\xE1sobkem ${issue.divisor}`;
			case "unrecognized_keys":
				return `Nezn\xE1m\xE9 kl\xED\u010De: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `Neplatn\xFD kl\xED\u010D v ${issue.origin}`;
			case "invalid_union":
				return "Neplatn\xFD vstup";
			case "invalid_element":
				return `Neplatn\xE1 hodnota v ${issue.origin}`;
			default:
				return "Neplatn\xFD vstup";
		}
	};
};
function cs_default() {
	return {
		localeError: error()
	};
}

export {
	cs_default
};
