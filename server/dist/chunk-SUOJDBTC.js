import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/yo.js
var error = () => {
	let Sizable = {
		string: { unit: "\xE0mi", verb: "n\xED" },
		file: { unit: "bytes", verb: "n\xED" },
		array: { unit: "nkan", verb: "n\xED" },
		set: { unit: "nkan", verb: "n\xED" },
		map: { unit: "nkan", verb: "n\xED" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "\u1EB9\u0300r\u1ECD \xECb\xE1w\u1ECDl\xE9",
		email: "\xE0d\xEDr\u1EB9\u0301s\xEC \xECm\u1EB9\u0301l\xEC",
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
		datetime: "\xE0k\xF3k\xF2 ISO",
		date: "\u1ECDj\u1ECD\u0301 ISO",
		time: "\xE0k\xF3k\xF2 ISO",
		duration: "\xE0k\xF3k\xF2 t\xF3 p\xE9 ISO",
		ipv4: "\xE0d\xEDr\u1EB9\u0301s\xEC IPv4",
		ipv6: "\xE0d\xEDr\u1EB9\u0301s\xEC IPv6",
		mac: "\xE0d\xEDr\u1EB9\u0301s\xEC MAC",
		cidrv4: "\xE0gb\xE8gb\xE8 IPv4",
		cidrv6: "\xE0gb\xE8gb\xE8 IPv6",
		base64: "\u1ECD\u0300r\u1ECD\u0300 t\xED a k\u1ECD\u0301 n\xED base64",
		base64url: "\u1ECD\u0300r\u1ECD\u0300 base64url",
		json_string: "\u1ECD\u0300r\u1ECD\u0300 JSON",
		e164: "n\u1ECD\u0301mb\xE0 E.164",
		credit_card: "n\u1ECDmba kaadi gbese",
		currency_code: "koodu ow\xF3",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "\u1EB9\u0300r\u1ECD \xECb\xE1w\u1ECDl\xE9"
	}, TypeDictionary = {
		nan: "NaN",
		number: "n\u1ECD\u0301mb\xE0",
		array: "akop\u1ECD"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi instanceof ${issue.expected}, \xE0m\u1ECD\u0300 a r\xED ${received}` : `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi ${expected}, \xE0m\u1ECD\u0300 a r\xED ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi ${stringifyPrimitive(issue.values[0])}` : `\xC0\u1E63\xE0y\xE0n a\u1E63\xEC\u1E63e: yan \u1ECD\u0300kan l\xE1ra ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				return sizing ? `T\xF3 p\u1ECD\u0300 j\xF9: a n\xED l\xE1ti j\u1EB9\u0301 p\xE9 ${issue.origin ?? "iye"} ${sizing.verb} ${adj}${issue.maximum} ${sizing.unit}` : `T\xF3 p\u1ECD\u0300 j\xF9: a n\xED l\xE1ti j\u1EB9\u0301 ${adj}${issue.maximum}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				return sizing ? `K\xE9r\xE9 ju: a n\xED l\xE1ti j\u1EB9\u0301 p\xE9 ${issue.origin} ${sizing.verb} ${adj}${issue.minimum} ${sizing.unit}` : `K\xE9r\xE9 ju: a n\xED l\xE1ti j\u1EB9\u0301 ${adj}${issue.minimum}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 b\u1EB9\u0300r\u1EB9\u0300 p\u1EB9\u0300l\xFA "${_issue.prefix}"` : _issue.format === "ends_with" ? `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 par\xED p\u1EB9\u0300l\xFA "${_issue.suffix}"` : _issue.format === "includes" ? `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 n\xED "${_issue.includes}"` : _issue.format === "regex" ? `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 b\xE1 \xE0p\u1EB9\u1EB9r\u1EB9 mu ${_issue.pattern}` : `A\u1E63\xEC\u1E63e: ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `N\u1ECD\u0301mb\xE0 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 j\u1EB9\u0301 \xE8y\xE0 p\xEDp\xEDn ti ${issue.divisor}`;
			case "unrecognized_keys":
				return `B\u1ECDt\xECn\xEC \xE0\xECm\u1ECD\u0300: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `B\u1ECDt\xECn\xEC a\u1E63\xEC\u1E63e n\xEDn\xFA ${issue.origin}`;
			case "invalid_union":
				return "\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e";
			case "invalid_element":
				return `Iye a\u1E63\xEC\u1E63e n\xEDn\xFA ${issue.origin}`;
			default:
				return "\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e";
		}
	};
};
function yo_default() {
	return {
		localeError: error()
	};
}

export {
	yo_default
};
