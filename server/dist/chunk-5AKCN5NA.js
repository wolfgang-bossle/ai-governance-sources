import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/ps.js
var error = () => {
	let Sizable = {
		string: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" },
		file: { unit: "\u0628\u0627\u06CC\u067C\u0633", verb: "\u0648\u0644\u0631\u064A" },
		array: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" },
		set: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" },
		map: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "\u0648\u0631\u0648\u062F\u064A",
		email: "\u0628\u0631\u06CC\u069A\u0646\u0627\u0644\u06CC\u06A9",
		url: "\u06CC\u0648 \u0622\u0631 \u0627\u0644",
		emoji: "\u0627\u06CC\u0645\u0648\u062C\u064A",
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
		datetime: "\u0646\u06CC\u067C\u0647 \u0627\u0648 \u0648\u062E\u062A",
		date: "\u0646\u06D0\u067C\u0647",
		time: "\u0648\u062E\u062A",
		duration: "\u0645\u0648\u062F\u0647",
		ipv4: "\u062F IPv4 \u067E\u062A\u0647",
		ipv6: "\u062F IPv6 \u067E\u062A\u0647",
		mac: "\u062F MAC \u067E\u062A\u0647",
		cidrv4: "\u062F IPv4 \u0633\u0627\u062D\u0647",
		cidrv6: "\u062F IPv6 \u0633\u0627\u062D\u0647",
		base64: "base64-encoded \u0645\u062A\u0646",
		base64url: "base64url-encoded \u0645\u062A\u0646",
		json_string: "JSON \u0645\u062A\u0646",
		e164: "\u062F E.164 \u0634\u0645\u06D0\u0631\u0647",
		credit_card: "\u062F \u06A9\u0631\u06CC\u0689\u06CC\u067C \u06A9\u0627\u0631\u062A \u0634\u0645\u06CC\u0631\u0647",
		currency_code: "\u062F \u0627\u0633\u0639\u0627\u0631\u0648 \u06A9\u0648\u0689",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "\u0648\u0631\u0648\u062F\u064A"
	}, TypeDictionary = {
		nan: "NaN",
		number: "\u0639\u062F\u062F",
		array: "\u0627\u0631\u06D0"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F instanceof ${issue.expected} \u0648\u0627\u06CC, \u0645\u06AB\u0631 ${received} \u062A\u0631\u0644\u0627\u0633\u0647 \u0634\u0648` : `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F ${expected} \u0648\u0627\u06CC, \u0645\u06AB\u0631 ${received} \u062A\u0631\u0644\u0627\u0633\u0647 \u0634\u0648`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F ${stringifyPrimitive(issue.values[0])} \u0648\u0627\u06CC` : `\u0646\u0627\u0633\u0645 \u0627\u0646\u062A\u062E\u0627\u0628: \u0628\u0627\u06CC\u062F \u06CC\u0648 \u0644\u0647 ${joinValues(issue.values, "|")} \u0685\u062E\u0647 \u0648\u0627\u06CC`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				return sizing ? `\u0689\u06CC\u0631 \u0644\u0648\u06CC: ${issue.origin ?? "\u0627\u0631\u0632\u069A\u062A"} \u0628\u0627\u06CC\u062F ${adj}${issue.maximum.toString()} ${sizing.unit ?? "\u0639\u0646\u0635\u0631\u0648\u0646\u0647"} \u0648\u0644\u0631\u064A` : `\u0689\u06CC\u0631 \u0644\u0648\u06CC: ${issue.origin ?? "\u0627\u0631\u0632\u069A\u062A"} \u0628\u0627\u06CC\u062F ${adj}${issue.maximum.toString()} \u0648\u064A`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				return sizing ? `\u0689\u06CC\u0631 \u06A9\u0648\u0686\u0646\u06CC: ${issue.origin} \u0628\u0627\u06CC\u062F ${adj}${issue.minimum.toString()} ${sizing.unit} \u0648\u0644\u0631\u064A` : `\u0689\u06CC\u0631 \u06A9\u0648\u0686\u0646\u06CC: ${issue.origin} \u0628\u0627\u06CC\u062F ${adj}${issue.minimum.toString()} \u0648\u064A`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F "${_issue.prefix}" \u0633\u0631\u0647 \u067E\u06CC\u0644 \u0634\u064A` : _issue.format === "ends_with" ? `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F "${_issue.suffix}" \u0633\u0631\u0647 \u067E\u0627\u06CC \u062A\u0647 \u0648\u0631\u0633\u064A\u0696\u064A` : _issue.format === "includes" ? `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F "${_issue.includes}" \u0648\u0644\u0631\u064A` : _issue.format === "regex" ? `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F ${_issue.pattern} \u0633\u0631\u0647 \u0645\u0637\u0627\u0628\u0642\u062A \u0648\u0644\u0631\u064A` : `${FormatDictionary[_issue.format] ?? issue.format} \u0646\u0627\u0633\u0645 \u062F\u06CC`;
			}
			case "not_multiple_of":
				return `\u0646\u0627\u0633\u0645 \u0639\u062F\u062F: \u0628\u0627\u06CC\u062F \u062F ${issue.divisor} \u0645\u0636\u0631\u0628 \u0648\u064A`;
			case "unrecognized_keys":
				return `\u0646\u0627\u0633\u0645 ${issue.keys.length > 1 ? "\u06A9\u0644\u06CC\u0689\u0648\u0646\u0647" : "\u06A9\u0644\u06CC\u0689"}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `\u0646\u0627\u0633\u0645 \u06A9\u0644\u06CC\u0689 \u067E\u0647 ${issue.origin} \u06A9\u06D0`;
			case "invalid_union":
				return "\u0646\u0627\u0633\u0645\u0647 \u0648\u0631\u0648\u062F\u064A";
			case "invalid_element":
				return `\u0646\u0627\u0633\u0645 \u0639\u0646\u0635\u0631 \u067E\u0647 ${issue.origin} \u06A9\u06D0`;
			default:
				return "\u0646\u0627\u0633\u0645\u0647 \u0648\u0631\u0648\u062F\u064A";
		}
	};
};
function ps_default() {
	return {
		localeError: error()
	};
}

export {
	ps_default
};
