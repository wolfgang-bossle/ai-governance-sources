import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/tk.js
var error = () => {
	let Sizable = {
		string: { unit: "simwol", verb: "bolmaly" },
		file: { unit: "ba\xFDt", verb: "bolmaly" },
		array: { unit: "elementler", verb: "bolmaly" },
		set: { unit: "elementler", verb: "bolmaly" },
		map: { unit: "elementler", verb: "bolmaly" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "giri\u015F",
		email: "e-po\xE7ta salgysy",
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
		datetime: "ISO sene we wagt",
		date: "ISO sene",
		time: "ISO wagt",
		duration: "ISO wagt aralygy",
		ipv4: "IPv4 salgysy",
		ipv6: "IPv6 salgysy",
		mac: "MAC salgysy",
		cidrv4: "IPv4 aralygy",
		cidrv6: "IPv6 aralygy",
		base64: "base64 bilen \u015Fifrlenen setir",
		base64url: "base64url bilen \u015Fifrlenen setir",
		json_string: "JSON setiri",
		e164: "E.164 nomeri",
		credit_card: "kredit kartyny\u0148 nomeri",
		currency_code: "wal\xFDuta kody",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "\u015Fablon"
	}, TypeDictionary = {
		nan: "NaN"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return `N\xE4dogry baha: gara\u015Fylan ${expected} \xFDerine ${received} alyndy`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `N\xE4dogry baha: ${stringifyPrimitive(issue.values[0])} bolmaly` : `N\xE4dogry sa\xFDlaw: a\u015Fakdakylardan biri bolmaly: ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				return sizing ? `Has uly: gara\u015Fyl\xFDan ${issue.origin ?? "baha"} ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "element"}` : `Has uly: gara\u015Fyl\xFDan ${issue.origin ?? "baha"} ${adj} ${issue.maximum.toString()}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				return sizing ? `Has ki\xE7i: gara\u015Fyl\xFDan ${issue.origin} ${adj} ${issue.minimum.toString()} ${sizing.unit}` : `Has ki\xE7i: gara\u015Fyl\xFDan ${issue.origin} ${adj} ${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `N\xE4dogry setir: "${_issue.prefix}" bilen ba\u015Flamaly` : _issue.format === "ends_with" ? `N\xE4dogry setir: "${_issue.suffix}" bilen gutarmaly` : _issue.format === "includes" ? `N\xE4dogry setir: "${_issue.includes}" saklamaly` : _issue.format === "regex" ? `N\xE4dogry setir: ${_issue.pattern} nusga la\xFDyk bolmaly` : `N\xE4dogry ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `N\xE4dogry san: ${issue.divisor} bilen galyndysyz b\xF6l\xFCnmeli`;
			case "unrecognized_keys":
				return `Tanalma\xFDan a\xE7ar${issue.keys.length > 1 ? "lar" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `${issue.origin} i\xE7inde n\xE4dogry a\xE7ar`;
			case "invalid_union":
				return "N\xE4dogry baha";
			case "invalid_element":
				return `${issue.origin} i\xE7inde n\xE4dogry baha`;
			default:
				return "N\xE4dogry baha";
		}
	};
};
function tk_default() {
	return {
		localeError: error()
	};
}

export {
	tk_default
};
