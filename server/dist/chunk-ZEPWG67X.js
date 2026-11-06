import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/nn.js
var error = () => {
	let Sizable = {
		string: { unit: "teikn", verb: "\xE5 ha" },
		file: { unit: "bytes", verb: "\xE5 ha" },
		array: { unit: "element", verb: "\xE5 innehalde" },
		set: { unit: "element", verb: "\xE5 innehalde" },
		map: { unit: "element", verb: "\xE5 innehalde" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "input",
		email: "e-postadresse",
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
		datetime: "ISO dato- og klokkeslett",
		date: "ISO-dato",
		time: "ISO-klokkeslett",
		duration: "ISO-varigheit",
		ipv4: "IPv4-adresse",
		ipv6: "IPv6-adresse",
		mac: "MAC-adresse",
		cidrv4: "IPv4-spekter",
		cidrv6: "IPv6-spekter",
		base64: "base64-enkoda streng",
		base64url: "base64url-enkoda streng",
		json_string: "JSON-streng",
		e164: "E.164-nummer",
		credit_card: "kredittkortnummer",
		currency_code: "valutakode",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "input"
	}, TypeDictionary = {
		nan: "NaN",
		number: "tal",
		array: "liste"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `Ugyldig input: forventa instanceof ${issue.expected}, fekk ${received}` : `Ugyldig input: forventa ${expected}, fekk ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `Ugyldig verdi: forventa ${stringifyPrimitive(issue.values[0])}` : `Ugyldig val: forventa eitt av ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				return sizing ? `For stor(t): forventa ${issue.origin ?? "value"} til \xE5 ha ${adj}${issue.maximum.toString()} ${sizing.unit ?? "element"}` : `For stor(t): forventa ${issue.origin ?? "value"} til \xE5 ha ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				return sizing ? `For lite(n): forventa ${issue.origin} til \xE5 ha ${adj}${issue.minimum.toString()} ${sizing.unit}` : `For lite(n): forventa ${issue.origin} til \xE5 ha ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `Ugyldig streng: m\xE5 starte med "${_issue.prefix}"` : _issue.format === "ends_with" ? `Ugyldig streng: m\xE5 slutte med "${_issue.suffix}"` : _issue.format === "includes" ? `Ugyldig streng: m\xE5 innehalde "${_issue.includes}"` : _issue.format === "regex" ? `Ugyldig streng: m\xE5 matche m\xF8nsteret ${_issue.pattern}` : `Ugyldig ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `Ugyldig tal: m\xE5 vere eit multiplum av ${issue.divisor}`;
			case "unrecognized_keys":
				return `${issue.keys.length > 1 ? "Ukjende n\xF8klar" : "Ukjend n\xF8kkel"}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `Ugyldig n\xF8kkel i ${issue.origin}`;
			case "invalid_union":
				return "Ugyldig input";
			case "invalid_element":
				return `Ugyldig verdi i ${issue.origin}`;
			default:
				return "Ugyldig input";
		}
	};
};
function nn_default() {
	return {
		localeError: error()
	};
}

export {
	nn_default
};
