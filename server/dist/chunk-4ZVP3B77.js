import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/hy.js
function getArmenianPlural(count, one, many) {
	return Math.abs(count) === 1 ? one : many;
}
function withDefiniteArticle(word) {
	if (!word)
		return "";
	let vowels = ["\u0561", "\u0565", "\u0568", "\u056B", "\u0578", "\u0578\u0582", "\u0585"], lastChar = word[word.length - 1];
	return word + (vowels.includes(lastChar) ? "\u0576" : "\u0568");
}
var error = () => {
	let Sizable = {
		string: {
			unit: {
				one: "\u0576\u0577\u0561\u0576",
				many: "\u0576\u0577\u0561\u0576\u0576\u0565\u0580"
			},
			verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
		},
		file: {
			unit: {
				one: "\u0562\u0561\u0575\u0569",
				many: "\u0562\u0561\u0575\u0569\u0565\u0580"
			},
			verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
		},
		array: {
			unit: {
				one: "\u057F\u0561\u0580\u0580",
				many: "\u057F\u0561\u0580\u0580\u0565\u0580"
			},
			verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
		},
		set: {
			unit: {
				one: "\u057F\u0561\u0580\u0580",
				many: "\u057F\u0561\u0580\u0580\u0565\u0580"
			},
			verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
		},
		map: {
			unit: {
				one: "\u057F\u0561\u0580\u0580",
				many: "\u057F\u0561\u0580\u0580\u0565\u0580"
			},
			verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "\u0574\u0578\u0582\u057F\u0584",
		email: "\u0567\u056C. \u0570\u0561\u057D\u0581\u0565",
		url: "URL",
		emoji: "\u0567\u0574\u0578\u057B\u056B",
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
		datetime: "ISO \u0561\u0574\u057D\u0561\u0569\u056B\u057E \u0587 \u056A\u0561\u0574",
		date: "ISO \u0561\u0574\u057D\u0561\u0569\u056B\u057E",
		time: "ISO \u056A\u0561\u0574",
		duration: "ISO \u057F\u0587\u0578\u0572\u0578\u0582\u0569\u0575\u0578\u0582\u0576",
		ipv4: "IPv4 \u0570\u0561\u057D\u0581\u0565",
		ipv6: "IPv6 \u0570\u0561\u057D\u0581\u0565",
		mac: "MAC \u0570\u0561\u057D\u0581\u0565",
		cidrv4: "IPv4 \u0574\u056B\u057B\u0561\u056F\u0561\u0575\u0584",
		cidrv6: "IPv6 \u0574\u056B\u057B\u0561\u056F\u0561\u0575\u0584",
		base64: "base64 \u0571\u0587\u0561\u0579\u0561\u0583\u0578\u057E \u057F\u0578\u0572",
		base64url: "base64url \u0571\u0587\u0561\u0579\u0561\u0583\u0578\u057E \u057F\u0578\u0572",
		json_string: "JSON \u057F\u0578\u0572",
		e164: "E.164 \u0570\u0561\u0574\u0561\u0580",
		credit_card: "\u056F\u0580\u0565\u0564\u056B\u057F \u0584\u0561\u0580\u057F\u056B \u0570\u0561\u0574\u0561\u0580",
		currency_code: "\u0561\u0580\u056A\u0578\u0582\u0575\u0569\u056B \u056F\u0578\u0564",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "\u0574\u0578\u0582\u057F\u0584"
	}, TypeDictionary = {
		nan: "NaN",
		number: "\u0569\u056B\u057E",
		array: "\u0566\u0561\u0576\u0563\u057E\u0561\u056E"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 instanceof ${issue.expected}, \u057D\u057F\u0561\u0581\u057E\u0565\u056C \u0567 ${received}` : `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 ${expected}, \u057D\u057F\u0561\u0581\u057E\u0565\u056C \u0567 ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 ${stringifyPrimitive(issue.values[1])}` : `\u054D\u056D\u0561\u056C \u057F\u0561\u0580\u0562\u0565\u0580\u0561\u056F\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 \u0570\u0565\u057F\u0587\u0575\u0561\u056C\u0576\u0565\u0580\u056B\u0581 \u0574\u0565\u056F\u0568\u055D ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				if (sizing) {
					let maxValue = Number(issue.maximum), unit = getArmenianPlural(maxValue, sizing.unit.one, sizing.unit.many);
					return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0574\u0565\u056E \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue.origin ?? "\u0561\u0580\u056A\u0565\u0584")} \u056F\u0578\u0582\u0576\u0565\u0576\u0561 ${adj}${issue.maximum.toString()} ${unit}`;
				}
				return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0574\u0565\u056E \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue.origin ?? "\u0561\u0580\u056A\u0565\u0584")} \u056C\u056B\u0576\u056B ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				if (sizing) {
					let minValue = Number(issue.minimum), unit = getArmenianPlural(minValue, sizing.unit.one, sizing.unit.many);
					return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0583\u0578\u0584\u0580 \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue.origin)} \u056F\u0578\u0582\u0576\u0565\u0576\u0561 ${adj}${issue.minimum.toString()} ${unit}`;
				}
				return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0583\u0578\u0584\u0580 \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue.origin)} \u056C\u056B\u0576\u056B ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u057D\u056F\u057D\u057E\u056B "${_issue.prefix}"-\u0578\u057E` : _issue.format === "ends_with" ? `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0561\u057E\u0561\u0580\u057F\u057E\u056B "${_issue.suffix}"-\u0578\u057E` : _issue.format === "includes" ? `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u057A\u0561\u0580\u0578\u0582\u0576\u0561\u056F\u056B "${_issue.includes}"` : _issue.format === "regex" ? `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0570\u0561\u0574\u0561\u057A\u0561\u057F\u0561\u057D\u056D\u0561\u0576\u056B ${_issue.pattern} \u0571\u0587\u0561\u0579\u0561\u0583\u056B\u0576` : `\u054D\u056D\u0561\u056C ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `\u054D\u056D\u0561\u056C \u0569\u056B\u057E\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0562\u0561\u0566\u0574\u0561\u057A\u0561\u057F\u056B\u056F \u056C\u056B\u0576\u056B ${issue.divisor}-\u056B`;
			case "unrecognized_keys":
				return `\u0549\u0573\u0561\u0576\u0561\u0579\u057E\u0561\u056E \u0562\u0561\u0576\u0561\u056C\u056B${issue.keys.length > 1 ? "\u0576\u0565\u0580" : ""}. ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `\u054D\u056D\u0561\u056C \u0562\u0561\u0576\u0561\u056C\u056B ${withDefiniteArticle(issue.origin)}-\u0578\u0582\u0574`;
			case "invalid_union":
				return "\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574";
			case "invalid_element":
				return `\u054D\u056D\u0561\u056C \u0561\u0580\u056A\u0565\u0584 ${withDefiniteArticle(issue.origin)}-\u0578\u0582\u0574`;
			default:
				return "\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574";
		}
	};
};
function hy_default() {
	return {
		localeError: error()
	};
}

export {
	hy_default
};
