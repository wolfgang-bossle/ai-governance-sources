import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/it.js
var error = () => {
	let Sizable = {
		string: { unit: "caratteri", verb: "avere" },
		file: { unit: "byte", verb: "avere" },
		array: { unit: "elementi", verb: "avere" },
		set: { unit: "elementi", verb: "avere" },
		map: { unit: "elementi", verb: "avere" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "input",
		email: "indirizzo email",
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
		datetime: "data e ora ISO",
		date: "data ISO",
		time: "ora ISO",
		duration: "durata ISO",
		ipv4: "indirizzo IPv4",
		ipv6: "indirizzo IPv6",
		mac: "indirizzo MAC",
		cidrv4: "intervallo IPv4",
		cidrv6: "intervallo IPv6",
		base64: "stringa codificata in base64",
		base64url: "URL codificata in base64",
		json_string: "stringa JSON",
		e164: "numero E.164",
		credit_card: "numero di carta di credito",
		currency_code: "codice valuta",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "input"
	}, TypeDictionary = {
		nan: "NaN",
		number: "numero",
		array: "vettore"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `Input non valido: atteso instanceof ${issue.expected}, ricevuto ${received}` : `Input non valido: atteso ${expected}, ricevuto ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `Input non valido: atteso ${stringifyPrimitive(issue.values[0])}` : `Opzione non valida: atteso uno tra ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				return sizing ? `Troppo grande: ${issue.origin ?? "valore"} deve avere ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementi"}` : `Troppo grande: ${issue.origin ?? "valore"} deve essere ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				return sizing ? `Troppo piccolo: ${issue.origin} deve avere ${adj}${issue.minimum.toString()} ${sizing.unit}` : `Troppo piccolo: ${issue.origin} deve essere ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `Stringa non valida: deve iniziare con "${_issue.prefix}"` : _issue.format === "ends_with" ? `Stringa non valida: deve terminare con "${_issue.suffix}"` : _issue.format === "includes" ? `Stringa non valida: deve includere "${_issue.includes}"` : _issue.format === "regex" ? `Stringa non valida: deve corrispondere al pattern ${_issue.pattern}` : `Input non valido: ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `Numero non valido: deve essere un multiplo di ${issue.divisor}`;
			case "unrecognized_keys":
				return `Chiav${issue.keys.length > 1 ? "i" : "e"} non riconosciut${issue.keys.length > 1 ? "e" : "a"}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `Chiave non valida in ${issue.origin}`;
			case "invalid_union":
				return "Input non valido";
			case "invalid_element":
				return `Valore non valido in ${issue.origin}`;
			default:
				return "Input non valido";
		}
	};
};
function it_default() {
	return {
		localeError: error()
	};
}

export {
	it_default
};
