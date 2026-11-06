import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/pl.js
var error = () => {
	let Sizable = {
		string: { unit: "znak\xF3w", verb: "mie\u0107" },
		file: { unit: "bajt\xF3w", verb: "mie\u0107" },
		array: { unit: "element\xF3w", verb: "mie\u0107" },
		set: { unit: "element\xF3w", verb: "mie\u0107" },
		map: { unit: "element\xF3w", verb: "mie\u0107" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "wyra\u017Cenie",
		email: "adres email",
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
		datetime: "data i godzina w formacie ISO",
		date: "data w formacie ISO",
		time: "godzina w formacie ISO",
		duration: "czas trwania ISO",
		ipv4: "adres IPv4",
		ipv6: "adres IPv6",
		mac: "adres MAC",
		cidrv4: "zakres IPv4",
		cidrv6: "zakres IPv6",
		base64: "ci\u0105g znak\xF3w zakodowany w formacie base64",
		base64url: "ci\u0105g znak\xF3w zakodowany w formacie base64url",
		json_string: "ci\u0105g znak\xF3w w formacie JSON",
		e164: "liczba E.164",
		credit_card: "numer karty kredytowej",
		currency_code: "kod waluty",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "wej\u015Bcie"
	}, TypeDictionary = {
		nan: "NaN",
		number: "liczba",
		array: "tablica"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano instanceof ${issue.expected}, otrzymano ${received}` : `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano ${expected}, otrzymano ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano ${stringifyPrimitive(issue.values[0])}` : `Nieprawid\u0142owa opcja: oczekiwano jednej z warto\u015Bci ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				return sizing ? `Za du\u017Ca warto\u015B\u0107: oczekiwano, \u017Ce ${issue.origin ?? "warto\u015B\u0107"} b\u0119dzie mie\u0107 ${adj}${issue.maximum.toString()} ${sizing.unit ?? "element\xF3w"}` : `Zbyt du\u017C(y/a/e): oczekiwano, \u017Ce ${issue.origin ?? "warto\u015B\u0107"} b\u0119dzie wynosi\u0107 ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				return sizing ? `Za ma\u0142a warto\u015B\u0107: oczekiwano, \u017Ce ${issue.origin ?? "warto\u015B\u0107"} b\u0119dzie mie\u0107 ${adj}${issue.minimum.toString()} ${sizing.unit ?? "element\xF3w"}` : `Zbyt ma\u0142(y/a/e): oczekiwano, \u017Ce ${issue.origin ?? "warto\u015B\u0107"} b\u0119dzie wynosi\u0107 ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi zaczyna\u0107 si\u0119 od "${_issue.prefix}"` : _issue.format === "ends_with" ? `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi ko\u0144czy\u0107 si\u0119 na "${_issue.suffix}"` : _issue.format === "includes" ? `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi zawiera\u0107 "${_issue.includes}"` : _issue.format === "regex" ? `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi odpowiada\u0107 wzorcowi ${_issue.pattern}` : `Nieprawid\u0142ow(y/a/e) ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `Nieprawid\u0142owa liczba: musi by\u0107 wielokrotno\u015Bci\u0105 ${issue.divisor}`;
			case "unrecognized_keys":
				return `Nierozpoznane klucze${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `Nieprawid\u0142owy klucz w ${issue.origin}`;
			case "invalid_union":
				return "Nieprawid\u0142owe dane wej\u015Bciowe";
			case "invalid_element":
				return `Nieprawid\u0142owa warto\u015B\u0107 w ${issue.origin}`;
			default:
				return "Nieprawid\u0142owe dane wej\u015Bciowe";
		}
	};
};
function pl_default() {
	return {
		localeError: error()
	};
}

export {
	pl_default
};
