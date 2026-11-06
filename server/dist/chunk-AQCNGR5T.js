import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/ko.js
var error = () => {
	let Sizable = {
		string: { unit: "\uBB38\uC790", verb: "to have" },
		file: { unit: "\uBC14\uC774\uD2B8", verb: "to have" },
		array: { unit: "\uAC1C", verb: "to have" },
		set: { unit: "\uAC1C", verb: "to have" },
		map: { unit: "\uAC1C", verb: "to have" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "\uC785\uB825",
		email: "\uC774\uBA54\uC77C \uC8FC\uC18C",
		url: "URL",
		emoji: "\uC774\uBAA8\uC9C0",
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
		datetime: "ISO \uB0A0\uC9DC\uC2DC\uAC04",
		date: "ISO \uB0A0\uC9DC",
		time: "ISO \uC2DC\uAC04",
		duration: "ISO \uAE30\uAC04",
		ipv4: "IPv4 \uC8FC\uC18C",
		ipv6: "IPv6 \uC8FC\uC18C",
		mac: "MAC \uC8FC\uC18C",
		cidrv4: "IPv4 \uBC94\uC704",
		cidrv6: "IPv6 \uBC94\uC704",
		base64: "base64 \uC778\uCF54\uB529 \uBB38\uC790\uC5F4",
		base64url: "base64url \uC778\uCF54\uB529 \uBB38\uC790\uC5F4",
		json_string: "JSON \uBB38\uC790\uC5F4",
		e164: "E.164 \uBC88\uD638",
		credit_card: "\uC2E0\uC6A9\uCE74\uB4DC \uBC88\uD638",
		currency_code: "\uD1B5\uD654 \uCF54\uB4DC",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "\uC785\uB825"
	}, TypeDictionary = {
		nan: "NaN"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `\uC798\uBABB\uB41C \uC785\uB825: \uC608\uC0C1 \uD0C0\uC785\uC740 instanceof ${issue.expected}, \uBC1B\uC740 \uD0C0\uC785\uC740 ${received}\uC785\uB2C8\uB2E4` : `\uC798\uBABB\uB41C \uC785\uB825: \uC608\uC0C1 \uD0C0\uC785\uC740 ${expected}, \uBC1B\uC740 \uD0C0\uC785\uC740 ${received}\uC785\uB2C8\uB2E4`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `\uC798\uBABB\uB41C \uC785\uB825: \uAC12\uC740 ${stringifyPrimitive(issue.values[0])} \uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4` : `\uC798\uBABB\uB41C \uC635\uC158: ${joinValues(issue.values, "\uB610\uB294 ")} \uC911 \uD558\uB098\uC5EC\uC57C \uD569\uB2C8\uB2E4`;
			case "too_big": {
				let adj = issue.inclusive ? "\uC774\uD558" : "\uBBF8\uB9CC", suffix = adj === "\uBBF8\uB9CC" ? "\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4" : "\uC5EC\uC57C \uD569\uB2C8\uB2E4", sizing = getSizing(issue.origin), unit = sizing?.unit ?? "\uC694\uC18C";
				return sizing ? `${issue.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4: ${issue.maximum.toString()}${unit} ${adj}${suffix}` : `${issue.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4: ${issue.maximum.toString()} ${adj}${suffix}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? "\uC774\uC0C1" : "\uCD08\uACFC", suffix = adj === "\uC774\uC0C1" ? "\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4" : "\uC5EC\uC57C \uD569\uB2C8\uB2E4", sizing = getSizing(issue.origin), unit = sizing?.unit ?? "\uC694\uC18C";
				return sizing ? `${issue.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uC791\uC2B5\uB2C8\uB2E4: ${issue.minimum.toString()}${unit} ${adj}${suffix}` : `${issue.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uC791\uC2B5\uB2C8\uB2E4: ${issue.minimum.toString()} ${adj}${suffix}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${_issue.prefix}"(\uC73C)\uB85C \uC2DC\uC791\uD574\uC57C \uD569\uB2C8\uB2E4` : _issue.format === "ends_with" ? `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${_issue.suffix}"(\uC73C)\uB85C \uB05D\uB098\uC57C \uD569\uB2C8\uB2E4` : _issue.format === "includes" ? `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${_issue.includes}"\uC744(\uB97C) \uD3EC\uD568\uD574\uC57C \uD569\uB2C8\uB2E4` : _issue.format === "regex" ? `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: \uC815\uADDC\uC2DD ${_issue.pattern} \uD328\uD134\uACFC \uC77C\uCE58\uD574\uC57C \uD569\uB2C8\uB2E4` : `\uC798\uBABB\uB41C ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `\uC798\uBABB\uB41C \uC22B\uC790: ${issue.divisor}\uC758 \uBC30\uC218\uC5EC\uC57C \uD569\uB2C8\uB2E4`;
			case "unrecognized_keys":
				return `\uC778\uC2DD\uD560 \uC218 \uC5C6\uB294 \uD0A4: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `\uC798\uBABB\uB41C \uD0A4: ${issue.origin}`;
			case "invalid_union":
				return "\uC798\uBABB\uB41C \uC785\uB825";
			case "invalid_element":
				return `\uC798\uBABB\uB41C \uAC12: ${issue.origin}`;
			default:
				return "\uC798\uBABB\uB41C \uC785\uB825";
		}
	};
};
function ko_default() {
	return {
		localeError: error()
	};
}

export {
	ko_default
};
