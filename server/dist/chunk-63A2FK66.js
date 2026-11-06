import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/en.js
var error = () => {
	let Sizable = {
		string: { unit: "characters", verb: "to have" },
		file: { unit: "bytes", verb: "to have" },
		array: { unit: "items", verb: "to have" },
		set: { unit: "items", verb: "to have" },
		map: { unit: "entries", verb: "to have" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "input",
		email: "email address",
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
		datetime: "ISO datetime",
		date: "ISO date",
		time: "ISO time",
		duration: "ISO duration",
		ipv4: "IPv4 address",
		ipv6: "IPv6 address",
		mac: "MAC address",
		cidrv4: "IPv4 range",
		cidrv6: "IPv6 range",
		base64: "base64-encoded string",
		base64url: "base64url-encoded string",
		json_string: "JSON string",
		e164: "E.164 number",
		currency_code: "currency code",
		credit_card: "credit card number",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "input"
	}, TypeDictionary = {
		// Compatibility: "nan" -> "NaN" for display
		nan: "NaN"
		// All other type names omitted - they fall back to raw values via ?? operator
	};
	function getTypeName(type, input) {
		return type === "number" && typeof input == "number" && !Number.isFinite(input) ? String(input) : TypeDictionary[type] ?? type;
	}
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = getTypeName(issue.expected), receivedType = parsedType(issue.input), received = getTypeName(receivedType, issue.input);
				return `Invalid input: expected ${expected}, received ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `Invalid input: expected ${stringifyPrimitive(issue.values[0])}` : `Invalid option: expected one of ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.exact ? "exactly " : issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				return sizing ? `Too big: expected ${issue.origin ?? "value"} to have ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elements"}` : `Too big: expected ${issue.origin ?? "value"} to be ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				let adj = issue.exact ? "exactly " : issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				return sizing ? `Too small: expected ${issue.origin} to have ${adj}${issue.minimum.toString()} ${sizing.unit}` : `Too small: expected ${issue.origin} to be ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `Invalid string: must start with "${_issue.prefix}"` : _issue.format === "ends_with" ? `Invalid string: must end with "${_issue.suffix}"` : _issue.format === "includes" ? `Invalid string: must include "${_issue.includes}"` : _issue.format === "regex" ? `Invalid string: must match pattern ${_issue.pattern}` : `Invalid ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `Invalid number: must be a multiple of ${issue.divisor}`;
			case "unrecognized_keys":
				return `Unrecognized key${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `Invalid key in ${issue.origin}`;
			case "invalid_union":
				return issue.options && Array.isArray(issue.options) && issue.options.length > 0 ? `Invalid discriminator value. Expected ${issue.options.map((o) => `'${o}'`).join(" | ")}` : issue.inclusive === !1 ? "Invalid input: more than one option matched" : "Invalid input";
			case "invalid_element":
				return `Invalid value in ${issue.origin}`;
			default:
				return "Invalid input";
		}
	};
};
function en_default() {
	return {
		localeError: error()
	};
}

export {
	en_default
};
