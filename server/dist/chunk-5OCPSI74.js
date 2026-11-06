import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/be.js
function getBelarusianPlural(count, one, few, many) {
	let absCount = Math.abs(count), lastDigit = absCount % 10, lastTwoDigits = absCount % 100;
	return lastTwoDigits >= 11 && lastTwoDigits <= 19 ? many : lastDigit === 1 ? one : lastDigit >= 2 && lastDigit <= 4 ? few : many;
}
var error = () => {
	let Sizable = {
		string: {
			unit: {
				one: "\u0441\u0456\u043C\u0432\u0430\u043B",
				few: "\u0441\u0456\u043C\u0432\u0430\u043B\u044B",
				many: "\u0441\u0456\u043C\u0432\u0430\u043B\u0430\u045E"
			},
			verb: "\u043C\u0435\u0446\u044C"
		},
		array: {
			unit: {
				one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
				few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B",
				many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u045E"
			},
			verb: "\u043C\u0435\u0446\u044C"
		},
		set: {
			unit: {
				one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
				few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B",
				many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u045E"
			},
			verb: "\u043C\u0435\u0446\u044C"
		},
		map: {
			unit: {
				one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
				few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B",
				many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u045E"
			},
			verb: "\u043C\u0435\u0446\u044C"
		},
		file: {
			unit: {
				one: "\u0431\u0430\u0439\u0442",
				few: "\u0431\u0430\u0439\u0442\u044B",
				many: "\u0431\u0430\u0439\u0442\u0430\u045E"
			},
			verb: "\u043C\u0435\u0446\u044C"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "\u0443\u0432\u043E\u0434",
		email: "email \u0430\u0434\u0440\u0430\u0441",
		url: "URL",
		emoji: "\u044D\u043C\u043E\u0434\u0437\u0456",
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
		datetime: "ISO \u0434\u0430\u0442\u0430 \u0456 \u0447\u0430\u0441",
		date: "ISO \u0434\u0430\u0442\u0430",
		time: "ISO \u0447\u0430\u0441",
		duration: "ISO \u043F\u0440\u0430\u0446\u044F\u0433\u043B\u0430\u0441\u0446\u044C",
		ipv4: "IPv4 \u0430\u0434\u0440\u0430\u0441",
		ipv6: "IPv6 \u0430\u0434\u0440\u0430\u0441",
		mac: "MAC \u0430\u0434\u0440\u0430\u0441",
		cidrv4: "IPv4 \u0434\u044B\u044F\u043F\u0430\u0437\u043E\u043D",
		cidrv6: "IPv6 \u0434\u044B\u044F\u043F\u0430\u0437\u043E\u043D",
		base64: "\u0440\u0430\u0434\u043E\u043A \u0443 \u0444\u0430\u0440\u043C\u0430\u0446\u0435 base64",
		base64url: "\u0440\u0430\u0434\u043E\u043A \u0443 \u0444\u0430\u0440\u043C\u0430\u0446\u0435 base64url",
		json_string: "JSON \u0440\u0430\u0434\u043E\u043A",
		e164: "\u043D\u0443\u043C\u0430\u0440 E.164",
		credit_card: "\u043D\u0443\u043C\u0430\u0440 \u043A\u0440\u044D\u0434\u044B\u0442\u043D\u0430\u0439 \u043A\u0430\u0440\u0442\u044B",
		currency_code: "\u043A\u043E\u0434 \u0432\u0430\u043B\u044E\u0442\u044B",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "\u0443\u0432\u043E\u0434"
	}, TypeDictionary = {
		nan: "NaN",
		number: "\u043B\u0456\u043A",
		array: "\u043C\u0430\u0441\u0456\u045E"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u045E\u0441\u044F instanceof ${issue.expected}, \u0430\u0442\u0440\u044B\u043C\u0430\u043D\u0430 ${received}` : `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u045E\u0441\u044F ${expected}, \u0430\u0442\u0440\u044B\u043C\u0430\u043D\u0430 ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F ${stringifyPrimitive(issue.values[0])}` : `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0432\u0430\u0440\u044B\u044F\u043D\u0442: \u0447\u0430\u043A\u0430\u045E\u0441\u044F \u0430\u0434\u0437\u0456\u043D \u0437 ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				if (sizing) {
					let maxValue = Number(issue.maximum), unit = getBelarusianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
					return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u0432\u044F\u043B\u0456\u043A\u0456: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue.origin ?? "\u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435"} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 ${sizing.verb} ${adj}${issue.maximum.toString()} ${unit}`;
				}
				return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u0432\u044F\u043B\u0456\u043A\u0456: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue.origin ?? "\u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435"} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 \u0431\u044B\u0446\u044C ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				if (sizing) {
					let minValue = Number(issue.minimum), unit = getBelarusianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
					return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u043C\u0430\u043B\u044B: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue.origin} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 ${sizing.verb} ${adj}${issue.minimum.toString()} ${unit}`;
				}
				return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u043C\u0430\u043B\u044B: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue.origin} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 \u0431\u044B\u0446\u044C ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u043F\u0430\u0447\u044B\u043D\u0430\u0446\u0446\u0430 \u0437 "${_issue.prefix}"` : _issue.format === "ends_with" ? `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0437\u0430\u043A\u0430\u043D\u0447\u0432\u0430\u0446\u0446\u0430 \u043D\u0430 "${_issue.suffix}"` : _issue.format === "includes" ? `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0437\u043C\u044F\u0448\u0447\u0430\u0446\u044C "${_issue.includes}"` : _issue.format === "regex" ? `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0430\u0434\u043F\u0430\u0432\u044F\u0434\u0430\u0446\u044C \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${_issue.pattern}` : `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u043B\u0456\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0431\u044B\u0446\u044C \u043A\u0440\u0430\u0442\u043D\u044B\u043C ${issue.divisor}`;
			case "unrecognized_keys":
				return `\u041D\u0435\u0440\u0430\u0441\u043F\u0430\u0437\u043D\u0430\u043D\u044B ${issue.keys.length > 1 ? "\u043A\u043B\u044E\u0447\u044B" : "\u043A\u043B\u044E\u0447"}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u043A\u043B\u044E\u0447 \u0443 ${issue.origin}`;
			case "invalid_union":
				return "\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434";
			case "invalid_element":
				return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u0430\u0435 \u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435 \u045E ${issue.origin}`;
			default:
				return "\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434";
		}
	};
};
function be_default() {
	return {
		localeError: error()
	};
}

export {
	be_default
};
