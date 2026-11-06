import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/fa.js
var error = () => {
	let Sizable = {
		string: { unit: "\u06A9\u0627\u0631\u0627\u06A9\u062A\u0631", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" },
		file: { unit: "\u0628\u0627\u06CC\u062A", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" },
		array: { unit: "\u0622\u06CC\u062A\u0645", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" },
		set: { unit: "\u0622\u06CC\u062A\u0645", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" },
		map: { unit: "\u0622\u06CC\u062A\u0645", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "\u0648\u0631\u0648\u062F\u06CC",
		email: "\u0622\u062F\u0631\u0633 \u0627\u06CC\u0645\u06CC\u0644",
		url: "URL",
		emoji: "\u0627\u06CC\u0645\u0648\u062C\u06CC",
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
		datetime: "\u062A\u0627\u0631\u06CC\u062E \u0648 \u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648",
		date: "\u062A\u0627\u0631\u06CC\u062E \u0627\u06CC\u0632\u0648",
		time: "\u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648",
		duration: "\u0645\u062F\u062A \u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648",
		ipv4: "IPv4 \u0622\u062F\u0631\u0633",
		ipv6: "IPv6 \u0622\u062F\u0631\u0633",
		mac: "MAC \u0622\u062F\u0631\u0633",
		cidrv4: "IPv4 \u062F\u0627\u0645\u0646\u0647",
		cidrv6: "IPv6 \u062F\u0627\u0645\u0646\u0647",
		base64: "base64-encoded \u0631\u0634\u062A\u0647",
		base64url: "base64url-encoded \u0631\u0634\u062A\u0647",
		json_string: "JSON \u0631\u0634\u062A\u0647",
		e164: "E.164 \u0639\u062F\u062F",
		credit_card: "\u0634\u0645\u0627\u0631\u0647 \u06A9\u0627\u0631\u062A \u0627\u0639\u062A\u0628\u0627\u0631\u06CC",
		currency_code: "\u06A9\u062F \u0627\u0631\u0632",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "\u0648\u0631\u0648\u062F\u06CC"
	}, TypeDictionary = {
		nan: "NaN",
		number: "\u0639\u062F\u062F",
		array: "\u0622\u0631\u0627\u06CC\u0647"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A instanceof ${issue.expected} \u0645\u06CC\u200C\u0628\u0648\u062F\u060C ${received} \u062F\u0631\u06CC\u0627\u0641\u062A \u0634\u062F` : `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A ${expected} \u0645\u06CC\u200C\u0628\u0648\u062F\u060C ${received} \u062F\u0631\u06CC\u0627\u0641\u062A \u0634\u062F`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A ${stringifyPrimitive(issue.values[0])} \u0645\u06CC\u200C\u0628\u0648\u062F` : `\u06AF\u0632\u06CC\u0646\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A \u06CC\u06A9\u06CC \u0627\u0632 ${joinValues(issue.values, "|")} \u0645\u06CC\u200C\u0628\u0648\u062F`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				return sizing ? `\u062E\u06CC\u0644\u06CC \u0628\u0632\u0631\u06AF: ${issue.origin ?? "\u0645\u0642\u062F\u0627\u0631"} \u0628\u0627\u06CC\u062F ${adj}${issue.maximum.toString()} ${sizing.unit ?? "\u0639\u0646\u0635\u0631"} \u0628\u0627\u0634\u062F` : `\u062E\u06CC\u0644\u06CC \u0628\u0632\u0631\u06AF: ${issue.origin ?? "\u0645\u0642\u062F\u0627\u0631"} \u0628\u0627\u06CC\u062F ${adj}${issue.maximum.toString()} \u0628\u0627\u0634\u062F`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				return sizing ? `\u062E\u06CC\u0644\u06CC \u06A9\u0648\u0686\u06A9: ${issue.origin} \u0628\u0627\u06CC\u062F ${adj}${issue.minimum.toString()} ${sizing.unit} \u0628\u0627\u0634\u062F` : `\u062E\u06CC\u0644\u06CC \u06A9\u0648\u0686\u06A9: ${issue.origin} \u0628\u0627\u06CC\u062F ${adj}${issue.minimum.toString()} \u0628\u0627\u0634\u062F`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 "${_issue.prefix}" \u0634\u0631\u0648\u0639 \u0634\u0648\u062F` : _issue.format === "ends_with" ? `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 "${_issue.suffix}" \u062A\u0645\u0627\u0645 \u0634\u0648\u062F` : _issue.format === "includes" ? `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0634\u0627\u0645\u0644 "${_issue.includes}" \u0628\u0627\u0634\u062F` : _issue.format === "regex" ? `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 \u0627\u0644\u06AF\u0648\u06CC ${_issue.pattern} \u0645\u0637\u0627\u0628\u0642\u062A \u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F` : `${FormatDictionary[_issue.format] ?? issue.format} \u0646\u0627\u0645\u0639\u062A\u0628\u0631`;
			}
			case "not_multiple_of":
				return `\u0639\u062F\u062F \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0645\u0636\u0631\u0628 ${issue.divisor} \u0628\u0627\u0634\u062F`;
			case "unrecognized_keys":
				return `\u06A9\u0644\u06CC\u062F${issue.keys.length > 1 ? "\u0647\u0627\u06CC" : ""} \u0646\u0627\u0634\u0646\u0627\u0633: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `\u06A9\u0644\u06CC\u062F \u0646\u0627\u0634\u0646\u0627\u0633 \u062F\u0631 ${issue.origin}`;
			case "invalid_union":
				return "\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631";
			case "invalid_element":
				return `\u0645\u0642\u062F\u0627\u0631 \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u062F\u0631 ${issue.origin}`;
			default:
				return "\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631";
		}
	};
};
function fa_default() {
	return {
		localeError: error()
	};
}

export {
	fa_default
};
