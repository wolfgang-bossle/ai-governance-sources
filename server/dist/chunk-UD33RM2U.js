import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/lt.js
var capitalizeFirstCharacter = (text) => text.charAt(0).toUpperCase() + text.slice(1);
function getUnitTypeFromNumber(number) {
	let abs = Math.abs(number), last = abs % 10, last2 = abs % 100;
	return last2 >= 11 && last2 <= 19 || last === 0 ? "many" : last === 1 ? "one" : "few";
}
var error = () => {
	let Sizable = {
		string: {
			unit: {
				one: "simbolis",
				few: "simboliai",
				many: "simboli\u0173"
			},
			verb: {
				smaller: {
					inclusive: "turi b\u016Bti ne ilgesn\u0117 kaip",
					notInclusive: "turi b\u016Bti trumpesn\u0117 kaip"
				},
				bigger: {
					inclusive: "turi b\u016Bti ne trumpesn\u0117 kaip",
					notInclusive: "turi b\u016Bti ilgesn\u0117 kaip"
				}
			}
		},
		file: {
			unit: {
				one: "baitas",
				few: "baitai",
				many: "bait\u0173"
			},
			verb: {
				smaller: {
					inclusive: "turi b\u016Bti ne didesnis kaip",
					notInclusive: "turi b\u016Bti ma\u017Eesnis kaip"
				},
				bigger: {
					inclusive: "turi b\u016Bti ne ma\u017Eesnis kaip",
					notInclusive: "turi b\u016Bti didesnis kaip"
				}
			}
		},
		array: {
			unit: {
				one: "element\u0105",
				few: "elementus",
				many: "element\u0173"
			},
			verb: {
				smaller: {
					inclusive: "turi tur\u0117ti ne daugiau kaip",
					notInclusive: "turi tur\u0117ti ma\u017Eiau kaip"
				},
				bigger: {
					inclusive: "turi tur\u0117ti ne ma\u017Eiau kaip",
					notInclusive: "turi tur\u0117ti daugiau kaip"
				}
			}
		},
		set: {
			unit: {
				one: "element\u0105",
				few: "elementus",
				many: "element\u0173"
			},
			verb: {
				smaller: {
					inclusive: "turi tur\u0117ti ne daugiau kaip",
					notInclusive: "turi tur\u0117ti ma\u017Eiau kaip"
				},
				bigger: {
					inclusive: "turi tur\u0117ti ne ma\u017Eiau kaip",
					notInclusive: "turi tur\u0117ti daugiau kaip"
				}
			}
		}
	};
	function getSizing(origin, unitType, inclusive, targetShouldBe) {
		let result = Sizable[origin] ?? null;
		return result === null ? result : {
			unit: result.unit[unitType],
			verb: result.verb[targetShouldBe][inclusive ? "inclusive" : "notInclusive"]
		};
	}
	let FormatDictionary = {
		regex: "\u012Fvestis",
		email: "el. pa\u0161to adresas",
		url: "URL",
		emoji: "jaustukas",
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
		datetime: "ISO data ir laikas",
		date: "ISO data",
		time: "ISO laikas",
		duration: "ISO trukm\u0117",
		ipv4: "IPv4 adresas",
		ipv6: "IPv6 adresas",
		mac: "MAC adresas",
		cidrv4: "IPv4 tinklo prefiksas (CIDR)",
		cidrv6: "IPv6 tinklo prefiksas (CIDR)",
		base64: "base64 u\u017Ekoduota eilut\u0117",
		base64url: "base64url u\u017Ekoduota eilut\u0117",
		json_string: "JSON eilut\u0117",
		e164: "E.164 numeris",
		credit_card: "kredito kortel\u0117s numeris",
		currency_code: "valiutos kodas",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "\u012Fvestis"
	}, TypeDictionary = {
		nan: "NaN",
		number: "skai\u010Dius",
		bigint: "sveikasis skai\u010Dius",
		string: "eilut\u0117",
		boolean: "login\u0117 reik\u0161m\u0117",
		undefined: "neapibr\u0117\u017Eta reik\u0161m\u0117",
		function: "funkcija",
		symbol: "simbolis",
		array: "masyvas",
		object: "objektas",
		null: "nulin\u0117 reik\u0161m\u0117"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `Gautas tipas ${received}, o tik\u0117tasi - instanceof ${issue.expected}` : `Gautas tipas ${received}, o tik\u0117tasi - ${expected}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `Privalo b\u016Bti ${stringifyPrimitive(issue.values[0])}` : `Privalo b\u016Bti vienas i\u0161 ${joinValues(issue.values, "|")} pasirinkim\u0173`;
			case "too_big": {
				let origin = TypeDictionary[issue.origin] ?? issue.origin, sizing = getSizing(issue.origin, getUnitTypeFromNumber(Number(issue.maximum)), issue.inclusive ?? !1, "smaller");
				if (sizing?.verb)
					return `${capitalizeFirstCharacter(origin ?? issue.origin ?? "reik\u0161m\u0117")} ${sizing.verb} ${issue.maximum.toString()} ${sizing.unit ?? "element\u0173"}`;
				let adj = issue.inclusive ? "ne didesnis kaip" : "ma\u017Eesnis kaip";
				return `${capitalizeFirstCharacter(origin ?? issue.origin ?? "reik\u0161m\u0117")} turi b\u016Bti ${adj} ${issue.maximum.toString()} ${sizing?.unit}`;
			}
			case "too_small": {
				let origin = TypeDictionary[issue.origin] ?? issue.origin, sizing = getSizing(issue.origin, getUnitTypeFromNumber(Number(issue.minimum)), issue.inclusive ?? !1, "bigger");
				if (sizing?.verb)
					return `${capitalizeFirstCharacter(origin ?? issue.origin ?? "reik\u0161m\u0117")} ${sizing.verb} ${issue.minimum.toString()} ${sizing.unit ?? "element\u0173"}`;
				let adj = issue.inclusive ? "ne ma\u017Eesnis kaip" : "didesnis kaip";
				return `${capitalizeFirstCharacter(origin ?? issue.origin ?? "reik\u0161m\u0117")} turi b\u016Bti ${adj} ${issue.minimum.toString()} ${sizing?.unit}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `Eilut\u0117 privalo prasid\u0117ti "${_issue.prefix}"` : _issue.format === "ends_with" ? `Eilut\u0117 privalo pasibaigti "${_issue.suffix}"` : _issue.format === "includes" ? `Eilut\u0117 privalo \u012Ftraukti "${_issue.includes}"` : _issue.format === "regex" ? `Eilut\u0117 privalo atitikti ${_issue.pattern}` : `Neteisingas ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `Skai\u010Dius privalo b\u016Bti ${issue.divisor} kartotinis.`;
			case "unrecognized_keys":
				return `Neatpa\u017Eint${issue.keys.length > 1 ? "i" : "as"} rakt${issue.keys.length > 1 ? "ai" : "as"}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return "Rastas klaidingas raktas";
			case "invalid_union":
				return "Klaidinga \u012Fvestis";
			case "invalid_element": {
				let origin = TypeDictionary[issue.origin] ?? issue.origin;
				return `${capitalizeFirstCharacter(origin ?? issue.origin ?? "reik\u0161m\u0117")} turi klaiding\u0105 \u012Fvest\u012F`;
			}
			default:
				return "Klaidinga \u012Fvestis";
		}
	};
};
function lt_default() {
	return {
		localeError: error()
	};
}

export {
	lt_default
};
