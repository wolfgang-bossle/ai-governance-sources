import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/nl.js
var error = () => {
	let Sizable = {
		string: { unit: "tekens", verb: "heeft" },
		file: { unit: "bytes", verb: "heeft" },
		array: { unit: "elementen", verb: "heeft" },
		set: { unit: "elementen", verb: "heeft" },
		map: { unit: "elementen", verb: "heeft" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "invoer",
		email: "emailadres",
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
		datetime: "ISO datum en tijd",
		date: "ISO datum",
		time: "ISO tijd",
		duration: "ISO duur",
		ipv4: "IPv4-adres",
		ipv6: "IPv6-adres",
		mac: "MAC-adres",
		cidrv4: "IPv4-bereik",
		cidrv6: "IPv6-bereik",
		base64: "base64-gecodeerde tekst",
		base64url: "base64 URL-gecodeerde tekst",
		json_string: "JSON string",
		e164: "E.164-nummer",
		credit_card: "creditcardnummer",
		currency_code: "valutacode",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "invoer"
	}, TypeDictionary = {
		nan: "NaN",
		number: "getal"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `Ongeldige invoer: verwacht instanceof ${issue.expected}, ontving ${received}` : `Ongeldige invoer: verwacht ${expected}, ontving ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `Ongeldige invoer: verwacht ${stringifyPrimitive(issue.values[0])}` : `Ongeldige optie: verwacht \xE9\xE9n van ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin), longName = issue.origin === "date" ? "laat" : issue.origin === "string" ? "lang" : "groot";
				return sizing ? `Te ${longName}: verwacht dat ${issue.origin ?? "waarde"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementen"} ${sizing.verb}` : `Te ${longName}: verwacht dat ${issue.origin ?? "waarde"} ${adj}${issue.maximum.toString()} is`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin), shortName = issue.origin === "date" ? "vroeg" : issue.origin === "string" ? "kort" : "klein";
				return sizing ? `Te ${shortName}: verwacht dat ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit} ${sizing.verb}` : `Te ${shortName}: verwacht dat ${issue.origin} ${adj}${issue.minimum.toString()} is`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `Ongeldige tekst: moet met "${_issue.prefix}" beginnen` : _issue.format === "ends_with" ? `Ongeldige tekst: moet op "${_issue.suffix}" eindigen` : _issue.format === "includes" ? `Ongeldige tekst: moet "${_issue.includes}" bevatten` : _issue.format === "regex" ? `Ongeldige tekst: moet overeenkomen met patroon ${_issue.pattern}` : `Ongeldig: ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `Ongeldig getal: moet een veelvoud van ${issue.divisor} zijn`;
			case "unrecognized_keys":
				return `Onbekende key${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `Ongeldige key in ${issue.origin}`;
			case "invalid_union":
				return "Ongeldige invoer";
			case "invalid_element":
				return `Ongeldige waarde in ${issue.origin}`;
			default:
				return "Ongeldige invoer";
		}
	};
};
function nl_default() {
	return {
		localeError: error()
	};
}

export {
	nl_default
};
