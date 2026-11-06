import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/da.js
var error = () => {
	let Sizable = {
		string: { unit: "tegn", verb: "havde" },
		file: { unit: "bytes", verb: "havde" },
		array: { unit: "elementer", verb: "indeholdt" },
		set: { unit: "elementer", verb: "indeholdt" },
		map: { unit: "elementer", verb: "indeholdt" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "input",
		email: "e-mailadresse",
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
		datetime: "ISO dato- og klokkesl\xE6t",
		date: "ISO-dato",
		time: "ISO-klokkesl\xE6t",
		duration: "ISO-varighed",
		ipv4: "IPv4-adresse",
		ipv6: "IPv6-adresse",
		mac: "MAC-adresse",
		cidrv4: "IPv4-spektrum",
		cidrv6: "IPv6-spektrum",
		base64: "base64-kodet streng",
		base64url: "base64url-kodet streng",
		json_string: "JSON-streng",
		e164: "E.164-nummer",
		credit_card: "kreditkortnummer",
		currency_code: "valutakode",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "input"
	}, TypeDictionary = {
		nan: "NaN",
		string: "streng",
		number: "tal",
		boolean: "boolean",
		array: "liste",
		object: "objekt",
		set: "s\xE6t",
		file: "fil"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `Ugyldigt input: forventede instanceof ${issue.expected}, fik ${received}` : `Ugyldigt input: forventede ${expected}, fik ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `Ugyldig v\xE6rdi: forventede ${stringifyPrimitive(issue.values[0])}` : `Ugyldigt valg: forventede en af f\xF8lgende ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin), origin = TypeDictionary[issue.origin] ?? issue.origin;
				return sizing ? `For stor: forventede ${origin ?? "value"} ${sizing.verb} ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "elementer"}` : `For stor: forventede ${origin ?? "value"} havde ${adj} ${issue.maximum.toString()}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin), origin = TypeDictionary[issue.origin] ?? issue.origin;
				return sizing ? `For lille: forventede ${origin} ${sizing.verb} ${adj} ${issue.minimum.toString()} ${sizing.unit}` : `For lille: forventede ${origin} havde ${adj} ${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `Ugyldig streng: skal starte med "${_issue.prefix}"` : _issue.format === "ends_with" ? `Ugyldig streng: skal ende med "${_issue.suffix}"` : _issue.format === "includes" ? `Ugyldig streng: skal indeholde "${_issue.includes}"` : _issue.format === "regex" ? `Ugyldig streng: skal matche m\xF8nsteret ${_issue.pattern}` : `Ugyldig ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `Ugyldigt tal: skal v\xE6re deleligt med ${issue.divisor}`;
			case "unrecognized_keys":
				return `${issue.keys.length > 1 ? "Ukendte n\xF8gler" : "Ukendt n\xF8gle"}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `Ugyldig n\xF8gle i ${issue.origin}`;
			case "invalid_union":
				return "Ugyldigt input: matcher ingen af de tilladte typer";
			case "invalid_element":
				return `Ugyldig v\xE6rdi i ${issue.origin}`;
			default:
				return "Ugyldigt input";
		}
	};
};
function da_default() {
	return {
		localeError: error()
	};
}

export {
	da_default
};
