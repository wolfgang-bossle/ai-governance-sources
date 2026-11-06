import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/de.js
var error = () => {
	let Sizable = {
		string: { unit: "Zeichen", verb: "zu haben" },
		file: { unit: "Bytes", verb: "zu haben" },
		array: { unit: "Elemente", verb: "zu haben" },
		set: { unit: "Elemente", verb: "zu haben" },
		map: { unit: "Elemente", verb: "zu haben" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "Eingabe",
		email: "E-Mail-Adresse",
		url: "URL",
		emoji: "Emoji",
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
		datetime: "ISO-Datum und -Uhrzeit",
		date: "ISO-Datum",
		time: "ISO-Uhrzeit",
		duration: "ISO-Dauer",
		ipv4: "IPv4-Adresse",
		ipv6: "IPv6-Adresse",
		mac: "MAC-Adresse",
		cidrv4: "IPv4-Bereich",
		cidrv6: "IPv6-Bereich",
		base64: "Base64-codierter String",
		base64url: "Base64-URL-codierter String",
		json_string: "JSON-String",
		e164: "E.164-Nummer",
		credit_card: "Kreditkartennummer",
		currency_code: "W\xE4hrungscode",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "Eingabe"
	}, TypeDictionary = {
		nan: "NaN",
		number: "Zahl",
		array: "Array"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `Ung\xFCltige Eingabe: erwartet instanceof ${issue.expected}, erhalten ${received}` : `Ung\xFCltige Eingabe: erwartet ${expected}, erhalten ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `Ung\xFCltige Eingabe: erwartet ${stringifyPrimitive(issue.values[0])}` : `Ung\xFCltige Option: erwartet eine von ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				return sizing ? `Zu gro\xDF: erwartet, dass ${issue.origin ?? "Wert"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "Elemente"} hat` : `Zu gro\xDF: erwartet, dass ${issue.origin ?? "Wert"} ${adj}${issue.maximum.toString()} ist`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				return sizing ? `Zu klein: erwartet, dass ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit} hat` : `Zu klein: erwartet, dass ${issue.origin} ${adj}${issue.minimum.toString()} ist`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `Ung\xFCltiger String: muss mit "${_issue.prefix}" beginnen` : _issue.format === "ends_with" ? `Ung\xFCltiger String: muss mit "${_issue.suffix}" enden` : _issue.format === "includes" ? `Ung\xFCltiger String: muss "${_issue.includes}" enthalten` : _issue.format === "regex" ? `Ung\xFCltiger String: muss dem Muster ${_issue.pattern} entsprechen` : `Ung\xFCltig: ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `Ung\xFCltige Zahl: muss ein Vielfaches von ${issue.divisor} sein`;
			case "unrecognized_keys":
				return `${issue.keys.length > 1 ? "Unbekannte Schl\xFCssel" : "Unbekannter Schl\xFCssel"}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `Ung\xFCltiger Schl\xFCssel in ${issue.origin}`;
			case "invalid_union":
				return "Ung\xFCltige Eingabe";
			case "invalid_element":
				return `Ung\xFCltiger Wert in ${issue.origin}`;
			default:
				return "Ung\xFCltige Eingabe";
		}
	};
};
function de_default() {
	return {
		localeError: error()
	};
}

export {
	de_default
};
