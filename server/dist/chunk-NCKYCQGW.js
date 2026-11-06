import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/sk.js
var error = () => {
	let Sizable = {
		string: { unit: "znakov", verb: "ma\u0165" },
		file: { unit: "bajtov", verb: "ma\u0165" },
		array: { unit: "prvkov", verb: "ma\u0165" },
		set: { unit: "prvkov", verb: "ma\u0165" },
		map: { unit: "polo\u017Eiek", verb: "ma\u0165" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "regul\xE1rny v\xFDraz",
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
		datetime: "d\xE1tum a \u010Das vo form\xE1te ISO",
		date: "d\xE1tum vo form\xE1te ISO",
		time: "\u010Das vo form\xE1te ISO",
		duration: "doba trvania ISO",
		ipv4: "IPv4 adresa",
		ipv6: "IPv6 adresa",
		mac: "MAC adresa",
		cidrv4: "rozsah IPv4",
		cidrv6: "rozsah IPv6",
		base64: "re\u0165azec zak\xF3dovan\xFD vo form\xE1te base64",
		base64url: "re\u0165azec zak\xF3dovan\xFD vo form\xE1te base64url",
		json_string: "re\u0165azec vo form\xE1te JSON",
		e164: "\u010D\xEDslo E.164",
		credit_card: "\u010D\xEDslo kreditnej karty",
		currency_code: "k\xF3d meny",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "vstup"
	}, TypeDictionary = {
		nan: "NaN",
		number: "\u010D\xEDslo",
		string: "re\u0165azec",
		function: "funkcia",
		array: "pole"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `Neplatn\xFD vstup: o\u010Dak\xE1van\xE9 instanceof ${issue.expected}, obdr\u017Ean\xE9 ${received}` : `Neplatn\xFD vstup: o\u010Dak\xE1van\xE9 ${expected}, obdr\u017Ean\xE9 ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `Neplatn\xFD vstup: o\u010Dak\xE1van\xE9 ${stringifyPrimitive(issue.values[0])}` : `Neplatn\xFD vstup: o\u010Dak\xE1van\xE1 jedna z hodn\xF4t ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				return sizing ? `Hodnota je pr\xEDli\u0161 ve\u013Ek\xE1: ${issue.origin ?? "hodnota"} mus\xED ma\u0165 ${adj}${issue.maximum.toString()} ${sizing.unit ?? "prvkov"}` : `Hodnota je pr\xEDli\u0161 ve\u013Ek\xE1: ${issue.origin ?? "hodnota"} mus\xED by\u0165 ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				return sizing ? `Hodnota je pr\xEDli\u0161 mal\xE1: ${issue.origin ?? "hodnota"} mus\xED ma\u0165 ${adj}${issue.minimum.toString()} ${sizing.unit ?? "prvkov"}` : `Hodnota je pr\xEDli\u0161 mal\xE1: ${issue.origin ?? "hodnota"} mus\xED by\u0165 ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `Neplatn\xFD re\u0165azec: mus\xED za\u010D\xEDna\u0165 na "${_issue.prefix}"` : _issue.format === "ends_with" ? `Neplatn\xFD re\u0165azec: mus\xED kon\u010Di\u0165 na "${_issue.suffix}"` : _issue.format === "includes" ? `Neplatn\xFD re\u0165azec: mus\xED obsahova\u0165 "${_issue.includes}"` : _issue.format === "regex" ? `Neplatn\xFD re\u0165azec: mus\xED zodpoveda\u0165 vzoru ${_issue.pattern}` : `Neplatn\xFD form\xE1t ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `Neplatn\xE9 \u010D\xEDslo: mus\xED by\u0165 n\xE1sobkom ${issue.divisor}`;
			case "unrecognized_keys":
				return `Nezn\xE1me kl\xFA\u010De: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `Neplatn\xFD kl\xFA\u010D v ${issue.origin}`;
			case "invalid_union":
				return "Neplatn\xFD vstup";
			case "invalid_element":
				return `Neplatn\xE1 hodnota v ${issue.origin}`;
			default:
				return "Neplatn\xFD vstup";
		}
	};
};
function sk_default() {
	return {
		localeError: error()
	};
}

export {
	sk_default
};
