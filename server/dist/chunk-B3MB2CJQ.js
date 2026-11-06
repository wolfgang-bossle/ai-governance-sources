import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/ca.js
var error = () => {
	let Sizable = {
		string: { unit: "car\xE0cters", verb: "contenir" },
		file: { unit: "bytes", verb: "contenir" },
		array: { unit: "elements", verb: "contenir" },
		set: { unit: "elements", verb: "contenir" },
		map: { unit: "elements", verb: "contenir" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "entrada",
		email: "adre\xE7a electr\xF2nica",
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
		datetime: "data i hora ISO",
		date: "data ISO",
		time: "hora ISO",
		duration: "durada ISO",
		ipv4: "adre\xE7a IPv4",
		ipv6: "adre\xE7a IPv6",
		mac: "adre\xE7a MAC",
		cidrv4: "rang IPv4",
		cidrv6: "rang IPv6",
		base64: "cadena codificada en base64",
		base64url: "cadena codificada en base64url",
		json_string: "cadena JSON",
		e164: "n\xFAmero E.164",
		credit_card: "n\xFAmero de targeta de cr\xE8dit",
		currency_code: "codi de moneda",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "entrada"
	}, TypeDictionary = {
		nan: "NaN"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `Tipus inv\xE0lid: s'esperava instanceof ${issue.expected}, s'ha rebut ${received}` : `Tipus inv\xE0lid: s'esperava ${expected}, s'ha rebut ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `Valor inv\xE0lid: s'esperava ${stringifyPrimitive(issue.values[0])}` : `Opci\xF3 inv\xE0lida: s'esperava una de ${joinValues(issue.values, " o ")}`;
			case "too_big": {
				let adj = issue.inclusive ? "com a m\xE0xim" : "menys de", sizing = getSizing(issue.origin);
				return sizing ? `Massa gran: s'esperava que ${issue.origin ?? "el valor"} contingu\xE9s ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "elements"}` : `Massa gran: s'esperava que ${issue.origin ?? "el valor"} fos ${adj} ${issue.maximum.toString()}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? "com a m\xEDnim" : "m\xE9s de", sizing = getSizing(issue.origin);
				return sizing ? `Massa petit: s'esperava que ${issue.origin} contingu\xE9s ${adj} ${issue.minimum.toString()} ${sizing.unit}` : `Massa petit: s'esperava que ${issue.origin} fos ${adj} ${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `Format inv\xE0lid: ha de comen\xE7ar amb "${_issue.prefix}"` : _issue.format === "ends_with" ? `Format inv\xE0lid: ha d'acabar amb "${_issue.suffix}"` : _issue.format === "includes" ? `Format inv\xE0lid: ha d'incloure "${_issue.includes}"` : _issue.format === "regex" ? `Format inv\xE0lid: ha de coincidir amb el patr\xF3 ${_issue.pattern}` : `Format inv\xE0lid per a ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `N\xFAmero inv\xE0lid: ha de ser m\xFAltiple de ${issue.divisor}`;
			case "unrecognized_keys":
				return `Clau${issue.keys.length > 1 ? "s" : ""} no reconeguda${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `Clau inv\xE0lida a ${issue.origin}`;
			case "invalid_union":
				return "Entrada inv\xE0lida";
			// Could also be "Tipus d'unió invàlid" but "Entrada invàlida" is more general
			case "invalid_element":
				return `Element inv\xE0lid a ${issue.origin}`;
			default:
				return "Entrada inv\xE0lida";
		}
	};
};
function ca_default() {
	return {
		localeError: error()
	};
}

export {
	ca_default
};
