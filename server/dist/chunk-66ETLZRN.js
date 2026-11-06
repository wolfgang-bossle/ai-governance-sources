import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/ro.js
var error = () => {
	let Sizable = {
		string: { unit: "caractere", verb: "s\u0103 aib\u0103" },
		file: { unit: "octe\u021Bi", verb: "s\u0103 aib\u0103" },
		array: { unit: "elemente", verb: "s\u0103 aib\u0103" },
		set: { unit: "elemente", verb: "s\u0103 aib\u0103" },
		map: { unit: "intr\u0103ri", verb: "s\u0103 aib\u0103" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "intrare",
		email: "adres\u0103 de email",
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
		datetime: "dat\u0103 \u0219i or\u0103 ISO",
		date: "dat\u0103 ISO",
		time: "or\u0103 ISO",
		duration: "durat\u0103 ISO",
		ipv4: "adres\u0103 IPv4",
		ipv6: "adres\u0103 IPv6",
		mac: "adres\u0103 MAC",
		cidrv4: "interval IPv4",
		cidrv6: "interval IPv6",
		base64: "\u0219ir codat base64",
		base64url: "\u0219ir codat base64url",
		json_string: "\u0219ir JSON",
		e164: "num\u0103r E.164",
		credit_card: "num\u0103r de card de credit",
		currency_code: "cod valutar",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "intrare"
	}, TypeDictionary = {
		nan: "NaN",
		string: "\u0219ir",
		number: "num\u0103r",
		boolean: "boolean",
		function: "func\u021Bie",
		array: "matrice",
		object: "obiect",
		undefined: "nedefinit",
		symbol: "simbol",
		bigint: "num\u0103r mare",
		void: "void",
		never: "never",
		map: "hart\u0103",
		set: "set"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return `Intrare invalid\u0103: a\u0219teptat ${expected}, primit ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `Intrare invalid\u0103: a\u0219teptat ${stringifyPrimitive(issue.values[0])}` : `Op\u021Biune invalid\u0103: a\u0219teptat una dintre ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				return sizing ? `Prea mare: a\u0219teptat ca ${issue.origin ?? "valoarea"} ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elemente"}` : `Prea mare: a\u0219teptat ca ${issue.origin ?? "valoarea"} s\u0103 fie ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				return sizing ? `Prea mic: a\u0219teptat ca ${issue.origin} ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}` : `Prea mic: a\u0219teptat ca ${issue.origin} s\u0103 fie ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `\u0218ir invalid: trebuie s\u0103 \xEEnceap\u0103 cu "${_issue.prefix}"` : _issue.format === "ends_with" ? `\u0218ir invalid: trebuie s\u0103 se termine cu "${_issue.suffix}"` : _issue.format === "includes" ? `\u0218ir invalid: trebuie s\u0103 includ\u0103 "${_issue.includes}"` : _issue.format === "regex" ? `\u0218ir invalid: trebuie s\u0103 se potriveasc\u0103 cu modelul ${_issue.pattern}` : `Format invalid: ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `Num\u0103r invalid: trebuie s\u0103 fie multiplu de ${issue.divisor}`;
			case "unrecognized_keys":
				return `Chei nerecunoscute: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `Cheie invalid\u0103 \xEEn ${issue.origin}`;
			case "invalid_union":
				return "Intrare invalid\u0103";
			case "invalid_element":
				return `Valoare invalid\u0103 \xEEn ${issue.origin}`;
			default:
				return "Intrare invalid\u0103";
		}
	};
};
function ro_default() {
	return {
		localeError: error()
	};
}

export {
	ro_default
};
