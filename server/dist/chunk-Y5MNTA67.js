import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/zh-TW.js
var error = () => {
	let Sizable = {
		string: { unit: "\u5B57\u5143", verb: "\u64C1\u6709" },
		file: { unit: "\u4F4D\u5143\u7D44", verb: "\u64C1\u6709" },
		array: { unit: "\u9805\u76EE", verb: "\u64C1\u6709" },
		set: { unit: "\u9805\u76EE", verb: "\u64C1\u6709" },
		map: { unit: "\u9805\u76EE", verb: "\u64C1\u6709" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "\u8F38\u5165",
		email: "\u90F5\u4EF6\u5730\u5740",
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
		datetime: "ISO \u65E5\u671F\u6642\u9593",
		date: "ISO \u65E5\u671F",
		time: "ISO \u6642\u9593",
		duration: "ISO \u671F\u9593",
		ipv4: "IPv4 \u4F4D\u5740",
		ipv6: "IPv6 \u4F4D\u5740",
		mac: "MAC \u4F4D\u5740",
		cidrv4: "IPv4 \u7BC4\u570D",
		cidrv6: "IPv6 \u7BC4\u570D",
		base64: "base64 \u7DE8\u78BC\u5B57\u4E32",
		base64url: "base64url \u7DE8\u78BC\u5B57\u4E32",
		json_string: "JSON \u5B57\u4E32",
		e164: "E.164 \u6578\u503C",
		credit_card: "\u4FE1\u7528\u5361\u865F",
		currency_code: "\u8CA8\u5E63\u4EE3\u78BC",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "\u8F38\u5165"
	}, TypeDictionary = {
		nan: "NaN"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA instanceof ${issue.expected}\uFF0C\u4F46\u6536\u5230 ${received}` : `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA ${expected}\uFF0C\u4F46\u6536\u5230 ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA ${stringifyPrimitive(issue.values[0])}` : `\u7121\u6548\u7684\u9078\u9805\uFF1A\u9810\u671F\u70BA\u4EE5\u4E0B\u5176\u4E2D\u4E4B\u4E00 ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				return sizing ? `\u6578\u503C\u904E\u5927\uFF1A\u9810\u671F ${issue.origin ?? "\u503C"} \u61C9\u70BA ${adj}${issue.maximum.toString()} ${sizing.unit ?? "\u500B\u5143\u7D20"}` : `\u6578\u503C\u904E\u5927\uFF1A\u9810\u671F ${issue.origin ?? "\u503C"} \u61C9\u70BA ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				return sizing ? `\u6578\u503C\u904E\u5C0F\uFF1A\u9810\u671F ${issue.origin} \u61C9\u70BA ${adj}${issue.minimum.toString()} ${sizing.unit}` : `\u6578\u503C\u904E\u5C0F\uFF1A\u9810\u671F ${issue.origin} \u61C9\u70BA ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u4EE5 "${_issue.prefix}" \u958B\u982D` : _issue.format === "ends_with" ? `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u4EE5 "${_issue.suffix}" \u7D50\u5C3E` : _issue.format === "includes" ? `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u5305\u542B "${_issue.includes}"` : _issue.format === "regex" ? `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u7B26\u5408\u683C\u5F0F ${_issue.pattern}` : `\u7121\u6548\u7684 ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `\u7121\u6548\u7684\u6578\u5B57\uFF1A\u5FC5\u9808\u70BA ${issue.divisor} \u7684\u500D\u6578`;
			case "unrecognized_keys":
				return `\u7121\u6CD5\u8B58\u5225\u7684\u9375\u503C${issue.keys.length > 1 ? "\u5011" : ""}\uFF1A${joinValues(issue.keys, "\u3001")}`;
			case "invalid_key":
				return `${issue.origin} \u4E2D\u6709\u7121\u6548\u7684\u9375\u503C`;
			case "invalid_union":
				return "\u7121\u6548\u7684\u8F38\u5165\u503C";
			case "invalid_element":
				return `${issue.origin} \u4E2D\u6709\u7121\u6548\u7684\u503C`;
			default:
				return "\u7121\u6548\u7684\u8F38\u5165\u503C";
		}
	};
};
function zh_TW_default() {
	return {
		localeError: error()
	};
}

export {
	zh_TW_default
};
