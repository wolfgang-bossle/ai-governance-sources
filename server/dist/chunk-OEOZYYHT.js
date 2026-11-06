import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/hr.js
var error = () => {
	let Sizable = {
		string: { unit: "znakova", verb: "imati" },
		file: { unit: "bajtova", verb: "imati" },
		array: { unit: "stavki", verb: "imati" },
		set: { unit: "stavki", verb: "imati" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "unos",
		email: "email adresa",
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
		datetime: "ISO datum i vrijeme",
		date: "ISO datum",
		time: "ISO vrijeme",
		duration: "ISO trajanje",
		ipv4: "IPv4 adresa",
		ipv6: "IPv6 adresa",
		mac: "MAC adresa",
		cidrv4: "IPv4 raspon",
		cidrv6: "IPv6 raspon",
		base64: "base64 kodirani tekst",
		base64url: "base64url kodirani tekst",
		json_string: "JSON tekst",
		e164: "E.164 broj",
		credit_card: "broj kreditne kartice",
		currency_code: "kod valute",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "unos"
	}, TypeDictionary = {
		nan: "NaN",
		string: "tekst",
		number: "broj",
		boolean: "boolean",
		array: "niz",
		object: "objekt",
		set: "skup",
		file: "datoteka",
		date: "datum",
		bigint: "bigint",
		symbol: "simbol",
		undefined: "undefined",
		null: "null",
		function: "funkcija",
		map: "mapa"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `Neispravan unos: o\u010Dekuje se instanceof ${issue.expected}, a primljeno je ${received}` : `Neispravan unos: o\u010Dekuje se ${expected}, a primljeno je ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `Neispravna vrijednost: o\u010Dekivano ${stringifyPrimitive(issue.values[0])}` : `Neispravna opcija: o\u010Dekivano jedno od ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin), origin = TypeDictionary[issue.origin] ?? issue.origin;
				return sizing ? `Preveliko: o\u010Dekivano da ${origin ?? "vrijednost"} ima ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elemenata"}` : `Preveliko: o\u010Dekivano da ${origin ?? "vrijednost"} bude ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin), origin = TypeDictionary[issue.origin] ?? issue.origin;
				return sizing ? `Premalo: o\u010Dekivano da ${origin} ima ${adj}${issue.minimum.toString()} ${sizing.unit}` : `Premalo: o\u010Dekivano da ${origin} bude ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `Neispravan tekst: mora zapo\u010Dinjati s "${_issue.prefix}"` : _issue.format === "ends_with" ? `Neispravan tekst: mora zavr\u0161avati s "${_issue.suffix}"` : _issue.format === "includes" ? `Neispravan tekst: mora sadr\u017Eavati "${_issue.includes}"` : _issue.format === "regex" ? `Neispravan tekst: mora odgovarati uzorku ${_issue.pattern}` : `Neispravna ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `Neispravan broj: mora biti vi\u0161ekratnik od ${issue.divisor}`;
			case "unrecognized_keys":
				return `Neprepoznat${issue.keys.length > 1 ? "i klju\u010Devi" : " klju\u010D"}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `Neispravan klju\u010D u ${TypeDictionary[issue.origin] ?? issue.origin}`;
			case "invalid_union":
				return "Neispravan unos";
			case "invalid_element":
				return `Neispravna vrijednost u ${TypeDictionary[issue.origin] ?? issue.origin}`;
			default:
				return "Neispravan unos";
		}
	};
};
function hr_default() {
	return {
		localeError: error()
	};
}

export {
	hr_default
};
