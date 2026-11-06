import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/sl.js
var error = () => {
	let Sizable = {
		string: { unit: "znakov", verb: "imeti" },
		file: { unit: "bajtov", verb: "imeti" },
		array: { unit: "elementov", verb: "imeti" },
		set: { unit: "elementov", verb: "imeti" },
		map: { unit: "elementov", verb: "imeti" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "vnos",
		email: "e-po\u0161tni naslov",
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
		datetime: "ISO datum in \u010Das",
		date: "ISO datum",
		time: "ISO \u010Das",
		duration: "ISO trajanje",
		ipv4: "IPv4 naslov",
		ipv6: "IPv6 naslov",
		mac: "MAC naslov",
		cidrv4: "obseg IPv4",
		cidrv6: "obseg IPv6",
		base64: "base64 kodiran niz",
		base64url: "base64url kodiran niz",
		json_string: "JSON niz",
		e164: "E.164 \u0161tevilka",
		credit_card: "\u0161tevilka kreditne kartice",
		currency_code: "koda valute",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "vnos"
	}, TypeDictionary = {
		nan: "NaN",
		number: "\u0161tevilo",
		array: "tabela"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `Neveljaven vnos: pri\u010Dakovano instanceof ${issue.expected}, prejeto ${received}` : `Neveljaven vnos: pri\u010Dakovano ${expected}, prejeto ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `Neveljaven vnos: pri\u010Dakovano ${stringifyPrimitive(issue.values[0])}` : `Neveljavna mo\u017Enost: pri\u010Dakovano eno izmed ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				return sizing ? `Preveliko: pri\u010Dakovano, da bo ${issue.origin ?? "vrednost"} imelo ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementov"}` : `Preveliko: pri\u010Dakovano, da bo ${issue.origin ?? "vrednost"} ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				return sizing ? `Premajhno: pri\u010Dakovano, da bo ${issue.origin} imelo ${adj}${issue.minimum.toString()} ${sizing.unit}` : `Premajhno: pri\u010Dakovano, da bo ${issue.origin} ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `Neveljaven niz: mora se za\u010Deti z "${_issue.prefix}"` : _issue.format === "ends_with" ? `Neveljaven niz: mora se kon\u010Dati z "${_issue.suffix}"` : _issue.format === "includes" ? `Neveljaven niz: mora vsebovati "${_issue.includes}"` : _issue.format === "regex" ? `Neveljaven niz: mora ustrezati vzorcu ${_issue.pattern}` : `Neveljaven ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `Neveljavno \u0161tevilo: mora biti ve\u010Dkratnik ${issue.divisor}`;
			case "unrecognized_keys":
				return `Neprepoznan${issue.keys.length > 1 ? "i klju\u010Di" : " klju\u010D"}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `Neveljaven klju\u010D v ${issue.origin}`;
			case "invalid_union":
				return "Neveljaven vnos";
			case "invalid_element":
				return `Neveljavna vrednost v ${issue.origin}`;
			default:
				return "Neveljaven vnos";
		}
	};
};
function sl_default() {
	return {
		localeError: error()
	};
}

export {
	sl_default
};
