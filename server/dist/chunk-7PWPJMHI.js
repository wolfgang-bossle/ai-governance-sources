import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/vi.js
var error = () => {
	let Sizable = {
		string: { unit: "k\xFD t\u1EF1", verb: "c\xF3" },
		file: { unit: "byte", verb: "c\xF3" },
		array: { unit: "ph\u1EA7n t\u1EED", verb: "c\xF3" },
		set: { unit: "ph\u1EA7n t\u1EED", verb: "c\xF3" },
		map: { unit: "ph\u1EA7n t\u1EED", verb: "c\xF3" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "\u0111\u1EA7u v\xE0o",
		email: "\u0111\u1ECBa ch\u1EC9 email",
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
		datetime: "ng\xE0y gi\u1EDD ISO",
		date: "ng\xE0y ISO",
		time: "gi\u1EDD ISO",
		duration: "kho\u1EA3ng th\u1EDDi gian ISO",
		ipv4: "\u0111\u1ECBa ch\u1EC9 IPv4",
		ipv6: "\u0111\u1ECBa ch\u1EC9 IPv6",
		mac: "\u0111\u1ECBa ch\u1EC9 MAC",
		cidrv4: "d\u1EA3i IPv4",
		cidrv6: "d\u1EA3i IPv6",
		base64: "chu\u1ED7i m\xE3 h\xF3a base64",
		base64url: "chu\u1ED7i m\xE3 h\xF3a base64url",
		json_string: "chu\u1ED7i JSON",
		e164: "s\u1ED1 E.164",
		credit_card: "s\u1ED1 th\u1EBB t\xEDn d\u1EE5ng",
		currency_code: "m\xE3 ti\u1EC1n t\u1EC7",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "\u0111\u1EA7u v\xE0o"
	}, TypeDictionary = {
		nan: "NaN",
		number: "s\u1ED1",
		array: "m\u1EA3ng"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i instanceof ${issue.expected}, nh\u1EADn \u0111\u01B0\u1EE3c ${received}` : `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i ${expected}, nh\u1EADn \u0111\u01B0\u1EE3c ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i ${stringifyPrimitive(issue.values[0])}` : `T\xF9y ch\u1ECDn kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i m\u1ED9t trong c\xE1c gi\xE1 tr\u1ECB ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				return sizing ? `Qu\xE1 l\u1EDBn: mong \u0111\u1EE3i ${issue.origin ?? "gi\xE1 tr\u1ECB"} ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "ph\u1EA7n t\u1EED"}` : `Qu\xE1 l\u1EDBn: mong \u0111\u1EE3i ${issue.origin ?? "gi\xE1 tr\u1ECB"} ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				return sizing ? `Qu\xE1 nh\u1ECF: mong \u0111\u1EE3i ${issue.origin} ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}` : `Qu\xE1 nh\u1ECF: mong \u0111\u1EE3i ${issue.origin} ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i b\u1EAFt \u0111\u1EA7u b\u1EB1ng "${_issue.prefix}"` : _issue.format === "ends_with" ? `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i k\u1EBFt th\xFAc b\u1EB1ng "${_issue.suffix}"` : _issue.format === "includes" ? `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i bao g\u1ED3m "${_issue.includes}"` : _issue.format === "regex" ? `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i kh\u1EDBp v\u1EDBi m\u1EABu ${_issue.pattern}` : `${FormatDictionary[_issue.format] ?? issue.format} kh\xF4ng h\u1EE3p l\u1EC7`;
			}
			case "not_multiple_of":
				return `S\u1ED1 kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i l\xE0 b\u1ED9i s\u1ED1 c\u1EE7a ${issue.divisor}`;
			case "unrecognized_keys":
				return `Kh\xF3a kh\xF4ng \u0111\u01B0\u1EE3c nh\u1EADn d\u1EA1ng: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `Kh\xF3a kh\xF4ng h\u1EE3p l\u1EC7 trong ${issue.origin}`;
			case "invalid_union":
				return "\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7";
			case "invalid_element":
				return `Gi\xE1 tr\u1ECB kh\xF4ng h\u1EE3p l\u1EC7 trong ${issue.origin}`;
			default:
				return "\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7";
		}
	};
};
function vi_default() {
	return {
		localeError: error()
	};
}

export {
	vi_default
};
