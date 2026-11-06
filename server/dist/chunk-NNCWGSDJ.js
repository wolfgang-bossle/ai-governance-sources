import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/zh-CN.js
var error = () => {
	let Sizable = {
		string: { unit: "\u5B57\u7B26", verb: "\u5305\u542B" },
		file: { unit: "\u5B57\u8282", verb: "\u5305\u542B" },
		array: { unit: "\u9879", verb: "\u5305\u542B" },
		set: { unit: "\u9879", verb: "\u5305\u542B" },
		map: { unit: "\u9879", verb: "\u5305\u542B" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "\u8F93\u5165",
		email: "\u7535\u5B50\u90AE\u4EF6",
		url: "URL",
		emoji: "\u8868\u60C5\u7B26\u53F7",
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
		datetime: "ISO\u65E5\u671F\u65F6\u95F4",
		date: "ISO\u65E5\u671F",
		time: "ISO\u65F6\u95F4",
		duration: "ISO\u65F6\u957F",
		ipv4: "IPv4\u5730\u5740",
		ipv6: "IPv6\u5730\u5740",
		mac: "MAC\u5730\u5740",
		cidrv4: "IPv4\u7F51\u6BB5",
		cidrv6: "IPv6\u7F51\u6BB5",
		base64: "base64\u7F16\u7801\u5B57\u7B26\u4E32",
		base64url: "base64url\u7F16\u7801\u5B57\u7B26\u4E32",
		json_string: "JSON\u5B57\u7B26\u4E32",
		e164: "E.164\u53F7\u7801",
		credit_card: "\u4FE1\u7528\u5361\u53F7",
		currency_code: "\u8D27\u5E01\u4EE3\u7801",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "\u8F93\u5165"
	}, TypeDictionary = {
		nan: "NaN",
		number: "\u6570\u5B57",
		array: "\u6570\u7EC4",
		null: "\u7A7A\u503C(null)"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B instanceof ${issue.expected}\uFF0C\u5B9E\u9645\u63A5\u6536 ${received}` : `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B ${expected}\uFF0C\u5B9E\u9645\u63A5\u6536 ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B ${stringifyPrimitive(issue.values[0])}` : `\u65E0\u6548\u9009\u9879\uFF1A\u671F\u671B\u4EE5\u4E0B\u4E4B\u4E00 ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				return sizing ? `\u6570\u503C\u8FC7\u5927\uFF1A\u671F\u671B ${issue.origin ?? "\u503C"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "\u4E2A\u5143\u7D20"}` : `\u6570\u503C\u8FC7\u5927\uFF1A\u671F\u671B ${issue.origin ?? "\u503C"} ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				return sizing ? `\u6570\u503C\u8FC7\u5C0F\uFF1A\u671F\u671B ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit}` : `\u6570\u503C\u8FC7\u5C0F\uFF1A\u671F\u671B ${issue.origin} ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u4EE5 "${_issue.prefix}" \u5F00\u5934` : _issue.format === "ends_with" ? `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u4EE5 "${_issue.suffix}" \u7ED3\u5C3E` : _issue.format === "includes" ? `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u5305\u542B "${_issue.includes}"` : _issue.format === "regex" ? `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u6EE1\u8DB3\u6B63\u5219\u8868\u8FBE\u5F0F ${_issue.pattern}` : `\u65E0\u6548${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `\u65E0\u6548\u6570\u5B57\uFF1A\u5FC5\u987B\u662F ${issue.divisor} \u7684\u500D\u6570`;
			case "unrecognized_keys":
				return `\u51FA\u73B0\u672A\u77E5\u7684\u952E(key): ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `${issue.origin} \u4E2D\u7684\u952E(key)\u65E0\u6548`;
			case "invalid_union":
				return "\u65E0\u6548\u8F93\u5165";
			case "invalid_element":
				return `${issue.origin} \u4E2D\u5305\u542B\u65E0\u6548\u503C(value)`;
			default:
				return "\u65E0\u6548\u8F93\u5165";
		}
	};
};
function zh_CN_default() {
	return {
		localeError: error()
	};
}

export {
	zh_CN_default
};
