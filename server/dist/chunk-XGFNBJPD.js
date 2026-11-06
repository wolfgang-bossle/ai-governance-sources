import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/tg.js
var error = () => {
	let Sizable = {
		string: { unit: "\u0430\u043B\u043E\u043C\u0430\u0442", verb: "\u0434\u043E\u0448\u0442\u0430 \u0431\u043E\u0448\u0430\u0434" },
		file: { unit: "\u0431\u0430\u0439\u0442", verb: "\u0434\u043E\u0448\u0442\u0430 \u0431\u043E\u0448\u0430\u0434" },
		array: { unit: "\u0443\u043D\u0441\u0443\u0440", verb: "\u0434\u043E\u0448\u0442\u0430 \u0431\u043E\u0448\u0430\u0434" },
		set: { unit: "\u0443\u043D\u0441\u0443\u0440", verb: "\u0434\u043E\u0448\u0442\u0430 \u0431\u043E\u0448\u0430\u0434" },
		map: { unit: "\u0441\u0430\u0431\u0442", verb: "\u0434\u043E\u0448\u0442\u0430 \u0431\u043E\u0448\u0430\u0434" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "\u0432\u0443\u0440\u0443\u0434",
		email: "\u0441\u0443\u0440\u043E\u0493\u0430\u0438 email",
		url: "URL",
		emoji: "\u044D\u043C\u043E\u04B7\u0438",
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
		datetime: "\u0441\u0430\u043D\u0430\u0432\u0443 \u0432\u0430\u049B\u0442\u0438 ISO",
		date: "\u0441\u0430\u043D\u0430\u0438 ISO",
		time: "\u0432\u0430\u049B\u0442\u0438 ISO",
		duration: "\u0434\u0430\u0432\u043E\u043C\u043D\u043E\u043A\u0438\u0438 ISO",
		ipv4: "\u0441\u0443\u0440\u043E\u0493\u0430\u0438 IPv4",
		ipv6: "\u0441\u0443\u0440\u043E\u0493\u0430\u0438 IPv6",
		mac: "\u0441\u0443\u0440\u043E\u0493\u0430\u0438 MAC",
		cidrv4: "\u043C\u0430\u04B3\u0434\u0443\u0434\u0430\u0438 IPv4",
		cidrv6: "\u043C\u0430\u04B3\u0434\u0443\u0434\u0430\u0438 IPv6",
		base64: "\u0441\u0430\u0442\u0440\u0438 \u0434\u0430\u0440 \u0444\u043E\u0440\u043C\u0430\u0442\u0438 base64",
		base64url: "\u0441\u0430\u0442\u0440\u0438 \u0434\u0430\u0440 \u0444\u043E\u0440\u043C\u0430\u0442\u0438 base64url",
		json_string: "\u0441\u0430\u0442\u0440\u0438 JSON",
		e164: "\u0440\u0430\u049B\u0430\u043C\u0438 E.164",
		credit_card: "\u0440\u0430\u049B\u0430\u043C\u0438 \u043A\u043E\u0440\u0442\u0438 \u043A\u0440\u0435\u0434\u0438\u0442\u04E3",
		currency_code: "\u0440\u0430\u043C\u0437\u0438 \u0430\u0441\u044A\u043E\u0440",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "\u0432\u0443\u0440\u0443\u0434"
	}, TypeDictionary = {
		nan: "NaN",
		number: "\u0440\u0430\u049B\u0430\u043C",
		string: "\u0441\u0430\u0442\u0440",
		array: "\u043C\u0430\u0441\u0441\u0438\u0432",
		object: "\u043E\u0431\u044A\u0435\u043A\u0442",
		date: "\u0441\u0430\u043D\u0430"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return `\u0412\u0443\u0440\u0443\u0434\u0438 \u043D\u043E\u0434\u0443\u0440\u0443\u0441\u0442: ${expected} \u0438\u043D\u0442\u0438\u0437\u043E\u0440 \u043C\u0435\u0440\u0430\u0444\u0442, ${received} \u0433\u0438\u0440\u0438\u0444\u0442\u0430 \u0448\u0443\u0434`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `\u0412\u0443\u0440\u0443\u0434\u0438 \u043D\u043E\u0434\u0443\u0440\u0443\u0441\u0442: ${stringifyPrimitive(issue.values[0])} \u0438\u043D\u0442\u0438\u0437\u043E\u0440 \u043C\u0435\u0440\u0430\u0444\u0442` : `\u0418\u043D\u0442\u0438\u0445\u043E\u0431\u0438 \u043D\u043E\u0434\u0443\u0440\u0443\u0441\u0442: \u044F\u043A\u0435 \u0430\u0437 ${joinValues(issue.values, "|")} \u0438\u043D\u0442\u0438\u0437\u043E\u0440 \u043C\u0435\u0440\u0430\u0444\u0442`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				return sizing ? `\u0425\u0435\u043B\u0435 \u043A\u0430\u043B\u043E\u043D: ${issue.origin ?? "\u049B\u0438\u043C\u0430\u0442"} \u0431\u043E\u044F\u0434 ${adj}${issue.maximum.toString()} ${sizing.unit} ${sizing.verb}` : `\u0425\u0435\u043B\u0435 \u043A\u0430\u043B\u043E\u043D: ${issue.origin ?? "\u049B\u0438\u043C\u0430\u0442"} \u0431\u043E\u044F\u0434 ${adj}${issue.maximum.toString()} \u0431\u043E\u0448\u0430\u0434`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				return sizing ? `\u0425\u0435\u043B\u0435 \u0445\u0443\u0440\u0434: ${issue.origin} \u0431\u043E\u044F\u0434 ${adj}${issue.minimum.toString()} ${sizing.unit} ${sizing.verb}` : `\u0425\u0435\u043B\u0435 \u0445\u0443\u0440\u0434: ${issue.origin} \u0431\u043E\u044F\u0434 ${adj}${issue.minimum.toString()} \u0431\u043E\u0448\u0430\u0434`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `\u0421\u0430\u0442\u0440\u0438 \u043D\u043E\u0434\u0443\u0440\u0443\u0441\u0442: \u0431\u043E\u044F\u0434 \u0431\u043E "${_issue.prefix}" \u043E\u0493\u043E\u0437 \u0448\u0430\u0432\u0430\u0434` : _issue.format === "ends_with" ? `\u0421\u0430\u0442\u0440\u0438 \u043D\u043E\u0434\u0443\u0440\u0443\u0441\u0442: \u0431\u043E\u044F\u0434 \u0431\u043E "${_issue.suffix}" \u0430\u043D\u04B7\u043E\u043C \u0451\u0431\u0430\u0434` : _issue.format === "includes" ? `\u0421\u0430\u0442\u0440\u0438 \u043D\u043E\u0434\u0443\u0440\u0443\u0441\u0442: \u0431\u043E\u044F\u0434 "${_issue.includes}"-\u0440\u043E \u0434\u0430\u0440 \u0431\u0430\u0440 \u0433\u0438\u0440\u0430\u0434` : _issue.format === "regex" ? `\u0421\u0430\u0442\u0440\u0438 \u043D\u043E\u0434\u0443\u0440\u0443\u0441\u0442: \u0431\u043E\u044F\u0434 \u0431\u0430 \u043D\u0430\u043C\u0443\u043D\u0430\u0438 ${_issue.pattern} \u043C\u0443\u0432\u043E\u0444\u0438\u049B\u0430\u0442 \u043A\u0443\u043D\u0430\u0434` : `${FormatDictionary[_issue.format] ?? issue.format}-\u0438 \u043D\u043E\u0434\u0443\u0440\u0443\u0441\u0442`;
			}
			case "not_multiple_of":
				return `\u0420\u0430\u049B\u0430\u043C\u0438 \u043D\u043E\u0434\u0443\u0440\u0443\u0441\u0442: \u0431\u043E\u044F\u0434 \u0431\u0430 ${issue.divisor} \u0431\u0435 \u0431\u0430\u049B\u0438\u044F \u0442\u0430\u049B\u0441\u0438\u043C \u0448\u0430\u0432\u0430\u0434`;
			case "unrecognized_keys":
				return `\u041A\u0430\u043B\u0438\u0434${issue.keys.length > 1 ? "\u04B3\u043E\u0438" : "\u0438"} \u043D\u043E\u043C\u0430\u044A\u043B\u0443\u043C: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `\u041A\u0430\u043B\u0438\u0434\u0438 \u043D\u043E\u0434\u0443\u0440\u0443\u0441\u0442 \u0434\u0430\u0440 ${issue.origin}`;
			case "invalid_union":
				return issue.options && Array.isArray(issue.options) && issue.options.length > 0 ? `\u049A\u0438\u043C\u0430\u0442\u0438 \u043D\u043E\u0434\u0443\u0440\u0443\u0441\u0442\u0438 \u0434\u0438\u0441\u043A\u0440\u0438\u043C\u0438\u043D\u0430\u0442\u043E\u0440: ${issue.options.map((o) => `'${o}'`).join(" | ")} \u0438\u043D\u0442\u0438\u0437\u043E\u0440 \u043C\u0435\u0440\u0430\u0444\u0442` : "\u0412\u0443\u0440\u0443\u0434\u0438 \u043D\u043E\u0434\u0443\u0440\u0443\u0441\u0442";
			case "invalid_element":
				return `\u049A\u0438\u043C\u0430\u0442\u0438 \u043D\u043E\u0434\u0443\u0440\u0443\u0441\u0442 \u0434\u0430\u0440 ${issue.origin}`;
			default:
				return "\u0412\u0443\u0440\u0443\u0434\u0438 \u043D\u043E\u0434\u0443\u0440\u0443\u0441\u0442";
		}
	};
};
function tg_default() {
	return {
		localeError: error()
	};
}

export {
	tg_default
};
