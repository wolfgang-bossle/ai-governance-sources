import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/sv.js
var error = () => {
	let Sizable = {
		string: { unit: "tecken", verb: "att ha" },
		file: { unit: "bytes", verb: "att ha" },
		array: { unit: "objekt", verb: "att inneh\xE5lla" },
		set: { unit: "objekt", verb: "att inneh\xE5lla" },
		map: { unit: "objekt", verb: "att inneh\xE5lla" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "regulj\xE4rt uttryck",
		email: "e-postadress",
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
		datetime: "ISO-datum och tid",
		date: "ISO-datum",
		time: "ISO-tid",
		duration: "ISO-varaktighet",
		ipv4: "IPv4-adress",
		ipv6: "IPv6-adress",
		mac: "MAC-adress",
		cidrv4: "IPv4-spektrum",
		cidrv6: "IPv6-spektrum",
		base64: "base64-kodad str\xE4ng",
		base64url: "base64url-kodad str\xE4ng",
		json_string: "JSON-str\xE4ng",
		e164: "E.164-nummer",
		credit_card: "kreditkortsnummer",
		currency_code: "valutakod",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "mall-literal"
	}, TypeDictionary = {
		nan: "NaN",
		number: "antal",
		array: "lista"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `Ogiltig inmatning: f\xF6rv\xE4ntat instanceof ${issue.expected}, fick ${received}` : `Ogiltig inmatning: f\xF6rv\xE4ntat ${expected}, fick ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `Ogiltig inmatning: f\xF6rv\xE4ntat ${stringifyPrimitive(issue.values[0])}` : `Ogiltigt val: f\xF6rv\xE4ntade en av ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				return sizing ? `F\xF6r stor(t): f\xF6rv\xE4ntade ${issue.origin ?? "v\xE4rdet"} att ha ${adj}${issue.maximum.toString()} ${sizing.unit ?? "element"}` : `F\xF6r stor(t): f\xF6rv\xE4ntat ${issue.origin ?? "v\xE4rdet"} att ha ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				return sizing ? `F\xF6r lite(t): f\xF6rv\xE4ntade ${issue.origin ?? "v\xE4rdet"} att ha ${adj}${issue.minimum.toString()} ${sizing.unit}` : `F\xF6r lite(t): f\xF6rv\xE4ntade ${issue.origin ?? "v\xE4rdet"} att ha ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `Ogiltig str\xE4ng: m\xE5ste b\xF6rja med "${_issue.prefix}"` : _issue.format === "ends_with" ? `Ogiltig str\xE4ng: m\xE5ste sluta med "${_issue.suffix}"` : _issue.format === "includes" ? `Ogiltig str\xE4ng: m\xE5ste inneh\xE5lla "${_issue.includes}"` : _issue.format === "regex" ? `Ogiltig str\xE4ng: m\xE5ste matcha m\xF6nstret "${_issue.pattern}"` : `Ogiltig(t) ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `Ogiltigt tal: m\xE5ste vara en multipel av ${issue.divisor}`;
			case "unrecognized_keys":
				return `${issue.keys.length > 1 ? "Ok\xE4nda nycklar" : "Ok\xE4nd nyckel"}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `Ogiltig nyckel i ${issue.origin ?? "v\xE4rdet"}`;
			case "invalid_union":
				return "Ogiltig input";
			case "invalid_element":
				return `Ogiltigt v\xE4rde i ${issue.origin ?? "v\xE4rdet"}`;
			default:
				return "Ogiltig input";
		}
	};
};
function sv_default() {
	return {
		localeError: error()
	};
}

export {
	sv_default
};
