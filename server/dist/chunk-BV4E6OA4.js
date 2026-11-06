import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/fr-CA.js
var error = () => {
	let Sizable = {
		string: { unit: "caract\xE8res", verb: "avoir" },
		file: { unit: "octets", verb: "avoir" },
		array: { unit: "\xE9l\xE9ments", verb: "avoir" },
		set: { unit: "\xE9l\xE9ments", verb: "avoir" },
		map: { unit: "\xE9l\xE9ments", verb: "avoir" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "entr\xE9e",
		email: "adresse courriel",
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
		datetime: "date-heure ISO",
		date: "date ISO",
		time: "heure ISO",
		duration: "dur\xE9e ISO",
		ipv4: "adresse IPv4",
		ipv6: "adresse IPv6",
		mac: "adresse MAC",
		cidrv4: "plage IPv4",
		cidrv6: "plage IPv6",
		base64: "cha\xEEne encod\xE9e en base64",
		base64url: "cha\xEEne encod\xE9e en base64url",
		json_string: "cha\xEEne JSON",
		e164: "num\xE9ro E.164",
		credit_card: "num\xE9ro de carte de cr\xE9dit",
		currency_code: "code de devise",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "entr\xE9e"
	}, TypeDictionary = {
		nan: "NaN"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `Entr\xE9e invalide : attendu instanceof ${issue.expected}, re\xE7u ${received}` : `Entr\xE9e invalide : attendu ${expected}, re\xE7u ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `Entr\xE9e invalide : attendu ${stringifyPrimitive(issue.values[0])}` : `Option invalide : attendu l'une des valeurs suivantes ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "\u2264" : "<", sizing = getSizing(issue.origin);
				return sizing ? `Trop grand : attendu que ${issue.origin ?? "la valeur"} ait ${adj}${issue.maximum.toString()} ${sizing.unit}` : `Trop grand : attendu que ${issue.origin ?? "la valeur"} soit ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? "\u2265" : ">", sizing = getSizing(issue.origin);
				return sizing ? `Trop petit : attendu que ${issue.origin} ait ${adj}${issue.minimum.toString()} ${sizing.unit}` : `Trop petit : attendu que ${issue.origin} soit ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `Cha\xEEne invalide : doit commencer par "${_issue.prefix}"` : _issue.format === "ends_with" ? `Cha\xEEne invalide : doit se terminer par "${_issue.suffix}"` : _issue.format === "includes" ? `Cha\xEEne invalide : doit inclure "${_issue.includes}"` : _issue.format === "regex" ? `Cha\xEEne invalide : doit correspondre au motif ${_issue.pattern}` : `${FormatDictionary[_issue.format] ?? issue.format} invalide`;
			}
			case "not_multiple_of":
				return `Nombre invalide : doit \xEAtre un multiple de ${issue.divisor}`;
			case "unrecognized_keys":
				return `Cl\xE9${issue.keys.length > 1 ? "s" : ""} non reconnue${issue.keys.length > 1 ? "s" : ""} : ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `Cl\xE9 invalide dans ${issue.origin}`;
			case "invalid_union":
				return "Entr\xE9e invalide";
			case "invalid_element":
				return `Valeur invalide dans ${issue.origin}`;
			default:
				return "Entr\xE9e invalide";
		}
	};
};
function fr_CA_default() {
	return {
		localeError: error()
	};
}

export {
	fr_CA_default
};
