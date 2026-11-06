import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/fi.js
var error = () => {
	let Sizable = {
		string: { unit: "merkki\xE4", subject: "merkkijonon" },
		file: { unit: "tavua", subject: "tiedoston" },
		array: { unit: "alkiota", subject: "listan" },
		set: { unit: "alkiota", subject: "joukon" },
		map: { unit: "alkiota", subject: "kuvauksen" },
		number: { unit: "", subject: "luvun" },
		bigint: { unit: "", subject: "suuren kokonaisluvun" },
		int: { unit: "", subject: "kokonaisluvun" },
		date: { unit: "", subject: "p\xE4iv\xE4m\xE4\xE4r\xE4n" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "s\xE4\xE4nn\xF6llinen lauseke",
		email: "s\xE4hk\xF6postiosoite",
		url: "URL-osoite",
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
		datetime: "ISO-aikaleima",
		date: "ISO-p\xE4iv\xE4m\xE4\xE4r\xE4",
		time: "ISO-aika",
		duration: "ISO-kesto",
		ipv4: "IPv4-osoite",
		ipv6: "IPv6-osoite",
		mac: "MAC-osoite",
		cidrv4: "IPv4-alue",
		cidrv6: "IPv6-alue",
		base64: "base64-koodattu merkkijono",
		base64url: "base64url-koodattu merkkijono",
		json_string: "JSON-merkkijono",
		e164: "E.164-luku",
		credit_card: "luottokortin numero",
		currency_code: "valuuttakoodi",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "templaattimerkkijono"
	}, TypeDictionary = {
		nan: "NaN"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `Virheellinen tyyppi: odotettiin instanceof ${issue.expected}, oli ${received}` : `Virheellinen tyyppi: odotettiin ${expected}, oli ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `Virheellinen sy\xF6te: t\xE4ytyy olla ${stringifyPrimitive(issue.values[0])}` : `Virheellinen valinta: t\xE4ytyy olla yksi seuraavista: ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				return sizing ? `Liian suuri: ${sizing.subject} t\xE4ytyy olla ${adj}${issue.maximum.toString()} ${sizing.unit}`.trim() : `Liian suuri: arvon t\xE4ytyy olla ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				return sizing ? `Liian pieni: ${sizing.subject} t\xE4ytyy olla ${adj}${issue.minimum.toString()} ${sizing.unit}`.trim() : `Liian pieni: arvon t\xE4ytyy olla ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `Virheellinen sy\xF6te: t\xE4ytyy alkaa "${_issue.prefix}"` : _issue.format === "ends_with" ? `Virheellinen sy\xF6te: t\xE4ytyy loppua "${_issue.suffix}"` : _issue.format === "includes" ? `Virheellinen sy\xF6te: t\xE4ytyy sis\xE4lt\xE4\xE4 "${_issue.includes}"` : _issue.format === "regex" ? `Virheellinen sy\xF6te: t\xE4ytyy vastata s\xE4\xE4nn\xF6llist\xE4 lauseketta ${_issue.pattern}` : `Virheellinen ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `Virheellinen luku: t\xE4ytyy olla luvun ${issue.divisor} monikerta`;
			case "unrecognized_keys":
				return `${issue.keys.length > 1 ? "Tuntemattomat avaimet" : "Tuntematon avain"}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return "Virheellinen avain tietueessa";
			case "invalid_union":
				return "Virheellinen unioni";
			case "invalid_element":
				return "Virheellinen arvo joukossa";
			default:
				return "Virheellinen sy\xF6te";
		}
	};
};
function fi_default() {
	return {
		localeError: error()
	};
}

export {
	fi_default
};
