import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/hu.js
var error = () => {
	let Sizable = {
		string: { unit: "karakter", verb: "legyen" },
		file: { unit: "byte", verb: "legyen" },
		array: { unit: "elem", verb: "legyen" },
		set: { unit: "elem", verb: "legyen" },
		map: { unit: "elem", verb: "legyen" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "bemenet",
		email: "email c\xEDm",
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
		datetime: "ISO id\u0151b\xE9lyeg",
		date: "ISO d\xE1tum",
		time: "ISO id\u0151",
		duration: "ISO id\u0151intervallum",
		ipv4: "IPv4 c\xEDm",
		ipv6: "IPv6 c\xEDm",
		mac: "MAC c\xEDm",
		cidrv4: "IPv4 tartom\xE1ny",
		cidrv6: "IPv6 tartom\xE1ny",
		base64: "base64-k\xF3dolt string",
		base64url: "base64url-k\xF3dolt string",
		json_string: "JSON string",
		e164: "E.164 sz\xE1m",
		credit_card: "hitelk\xE1rtyasz\xE1m",
		currency_code: "p\xE9nznemk\xF3d",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "bemenet"
	}, TypeDictionary = {
		nan: "NaN",
		number: "sz\xE1m",
		array: "t\xF6mb"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k instanceof ${issue.expected}, a kapott \xE9rt\xE9k ${received}` : `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k ${expected}, a kapott \xE9rt\xE9k ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k ${stringifyPrimitive(issue.values[0])}` : `\xC9rv\xE9nytelen opci\xF3: valamelyik \xE9rt\xE9k v\xE1rt ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				return sizing ? `T\xFAl nagy: ${issue.origin ?? "\xE9rt\xE9k"} m\xE9rete t\xFAl nagy ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elem"}` : `T\xFAl nagy: a bemeneti \xE9rt\xE9k ${issue.origin ?? "\xE9rt\xE9k"} t\xFAl nagy: ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				return sizing ? `T\xFAl kicsi: a bemeneti \xE9rt\xE9k ${issue.origin} m\xE9rete t\xFAl kicsi ${adj}${issue.minimum.toString()} ${sizing.unit}` : `T\xFAl kicsi: a bemeneti \xE9rt\xE9k ${issue.origin} t\xFAl kicsi ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `\xC9rv\xE9nytelen string: "${_issue.prefix}" \xE9rt\xE9kkel kell kezd\u0151dnie` : _issue.format === "ends_with" ? `\xC9rv\xE9nytelen string: "${_issue.suffix}" \xE9rt\xE9kkel kell v\xE9gz\u0151dnie` : _issue.format === "includes" ? `\xC9rv\xE9nytelen string: "${_issue.includes}" \xE9rt\xE9ket kell tartalmaznia` : _issue.format === "regex" ? `\xC9rv\xE9nytelen string: ${_issue.pattern} mint\xE1nak kell megfelelnie` : `\xC9rv\xE9nytelen ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `\xC9rv\xE9nytelen sz\xE1m: ${issue.divisor} t\xF6bbsz\xF6r\xF6s\xE9nek kell lennie`;
			case "unrecognized_keys":
				return `Ismeretlen kulcs${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `\xC9rv\xE9nytelen kulcs ${issue.origin}`;
			case "invalid_union":
				return "\xC9rv\xE9nytelen bemenet";
			case "invalid_element":
				return `\xC9rv\xE9nytelen \xE9rt\xE9k: ${issue.origin}`;
			default:
				return "\xC9rv\xE9nytelen bemenet";
		}
	};
};
function hu_default() {
	return {
		localeError: error()
	};
}

export {
	hu_default
};
