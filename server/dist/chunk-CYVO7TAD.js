import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/uz.js
var error = () => {
	let Sizable = {
		string: { unit: "belgi", verb: "bo\u2018lishi kerak" },
		file: { unit: "bayt", verb: "bo\u2018lishi kerak" },
		array: { unit: "element", verb: "bo\u2018lishi kerak" },
		set: { unit: "element", verb: "bo\u2018lishi kerak" },
		map: { unit: "yozuv", verb: "bo\u2018lishi kerak" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "kirish",
		email: "elektron pochta manzili",
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
		datetime: "ISO sana va vaqti",
		date: "ISO sana",
		time: "ISO vaqt",
		duration: "ISO davomiylik",
		ipv4: "IPv4 manzil",
		ipv6: "IPv6 manzil",
		mac: "MAC manzil",
		cidrv4: "IPv4 diapazon",
		cidrv6: "IPv6 diapazon",
		base64: "base64 kodlangan satr",
		base64url: "base64url kodlangan satr",
		json_string: "JSON satr",
		e164: "E.164 raqam",
		credit_card: "kredit karta raqami",
		currency_code: "valyuta kodi",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "kirish"
	}, TypeDictionary = {
		nan: "NaN",
		number: "raqam",
		array: "massiv"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `Noto\u2018g\u2018ri kirish: kutilgan instanceof ${issue.expected}, qabul qilingan ${received}` : `Noto\u2018g\u2018ri kirish: kutilgan ${expected}, qabul qilingan ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `Noto\u2018g\u2018ri kirish: kutilgan ${stringifyPrimitive(issue.values[0])}` : `Noto\u2018g\u2018ri variant: quyidagilardan biri kutilgan ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				return sizing ? `Juda katta: kutilgan ${issue.origin ?? "qiymat"} ${adj}${issue.maximum.toString()} ${sizing.unit} ${sizing.verb}` : `Juda katta: kutilgan ${issue.origin ?? "qiymat"} ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				return sizing ? `Juda kichik: kutilgan ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit} ${sizing.verb}` : `Juda kichik: kutilgan ${issue.origin} ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `Noto\u2018g\u2018ri satr: "${_issue.prefix}" bilan boshlanishi kerak` : _issue.format === "ends_with" ? `Noto\u2018g\u2018ri satr: "${_issue.suffix}" bilan tugashi kerak` : _issue.format === "includes" ? `Noto\u2018g\u2018ri satr: "${_issue.includes}" ni o\u2018z ichiga olishi kerak` : _issue.format === "regex" ? `Noto\u2018g\u2018ri satr: ${_issue.pattern} shabloniga mos kelishi kerak` : `Noto\u2018g\u2018ri ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `Noto\u2018g\u2018ri raqam: ${issue.divisor} ning karralisi bo\u2018lishi kerak`;
			case "unrecognized_keys":
				return `Noma\u2019lum kalit${issue.keys.length > 1 ? "lar" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `${issue.origin} dagi kalit noto\u2018g\u2018ri`;
			case "invalid_union":
				return "Noto\u2018g\u2018ri kirish";
			case "invalid_element":
				return `${issue.origin} da noto\u2018g\u2018ri qiymat`;
			default:
				return "Noto\u2018g\u2018ri kirish";
		}
	};
};
function uz_default() {
	return {
		localeError: error()
	};
}

export {
	uz_default
};
