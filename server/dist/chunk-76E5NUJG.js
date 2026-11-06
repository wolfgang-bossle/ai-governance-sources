import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/pt.js
var error = () => {
	let Sizable = {
		string: { unit: "caracteres" },
		file: { unit: "bytes" },
		array: { unit: "elementos" },
		set: { unit: "elementos" },
		map: { unit: "entradas" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "a entrada",
		email: "o endere\xE7o de e-mail",
		url: "o URL",
		emoji: "o emoji",
		uuid: "o UUID",
		uuidv4: "o UUIDv4",
		uuidv6: "o UUIDv6",
		nanoid: "o nanoid",
		guid: "o GUID",
		cuid: "o cuid",
		cuid2: "o cuid2",
		ulid: "o ULID",
		xid: "o XID",
		ksuid: "o KSUID",
		datetime: "a data e hora ISO",
		date: "a data ISO",
		time: "a hora ISO",
		duration: "a dura\xE7\xE3o ISO",
		ipv4: "o endere\xE7o IPv4",
		ipv6: "o endere\xE7o IPv6",
		mac: "o endere\xE7o MAC",
		cidrv4: "o intervalo de endere\xE7os IPv4",
		cidrv6: "o intervalo de endere\xE7os IPv6",
		base64: "o texto codificado em base64",
		base64url: "o texto codificado em base64url",
		json_string: "o texto JSON",
		e164: "o n\xFAmero E.164",
		credit_card: "o n\xFAmero de cart\xE3o de cr\xE9dito",
		currency_code: "o c\xF3digo de moeda",
		iban: "o IBAN",
		jwt: "o JWT",
		template_literal: "a entrada"
	}, Gender = {
		masculine: { definite: "o", indefinite: "um" },
		feminine: { definite: "a", indefinite: "uma" }
	}, TypeDictionary = {
		string: { name: "texto", articles: Gender.masculine },
		number: { name: "n\xFAmero", articles: Gender.masculine },
		int: { name: "n\xFAmero inteiro", articles: Gender.masculine },
		boolean: { name: "valor booleano", articles: Gender.masculine },
		bigint: { name: "n\xFAmero bigint", articles: Gender.masculine },
		symbol: { name: "s\xEDmbolo", articles: Gender.masculine },
		undefined: { name: 'valor "undefined"', articles: Gender.masculine },
		null: { name: 'valor "nulo"', articles: Gender.masculine },
		never: { name: 'valor "never"', articles: Gender.masculine },
		void: { name: 'valor "void"', articles: Gender.masculine },
		date: { name: "data", articles: Gender.feminine },
		array: { name: "vetor", articles: Gender.masculine },
		object: { name: "objeto", articles: Gender.masculine },
		tuple: { name: "tuplo", articles: Gender.masculine },
		record: { name: "registo", articles: Gender.masculine },
		map: { name: "mapa", articles: Gender.masculine },
		set: { name: "conjunto", articles: Gender.masculine },
		file: { name: "ficheiro", articles: Gender.masculine },
		nonoptional: { name: "valor n\xE3o opcional", articles: Gender.masculine },
		nan: { name: 'valor "NaN"', articles: Gender.masculine },
		// Compatibility: "nan" -> "NaN" for display
		function: { name: "fun\xE7\xE3o", articles: Gender.feminine }
	};
	function translateOriginWithArticle(type, articleType) {
		let translatedValue = TypeDictionary[type] ?? { name: `valor "${type}"`, articles: Gender.masculine };
		return `${translatedValue.articles[articleType]} ${translatedValue.name}`;
	}
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = translateOriginWithArticle(issue.expected, "indefinite"), receivedType = parsedType(issue.input), received = translateOriginWithArticle(receivedType, "indefinite");
				return `Entrada inv\xE1lida: esperava ${expected}, recebeu ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `Entrada inv\xE1lida: esperava ${stringifyPrimitive(issue.values[0])}` : `Op\xE7\xE3o inv\xE1lida: esperava uma das seguintes op\xE7\xF5es: ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				return sizing ? `Demasiado grande: esperava que ${translateOriginWithArticle(issue.origin, "definite")} tivesse ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "elementos"}` : `Demasiado grande: esperava que ${translateOriginWithArticle(issue.origin, "definite")} fosse ${adj} ${issue.maximum.toString()}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				return sizing ? `Demasiado pequeno: esperava que ${translateOriginWithArticle(issue.origin, "definite")} tivesse ${adj} ${issue.minimum.toString()} ${sizing.unit ?? "elementos"}` : `Demasiado pequeno: esperava que ${translateOriginWithArticle(issue.origin, "definite")} fosse ${adj} ${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `Texto inv\xE1lido: deve come\xE7ar por "${_issue.prefix}"` : _issue.format === "ends_with" ? `Texto inv\xE1lido: deve terminar em "${_issue.suffix}"` : _issue.format === "includes" ? `Texto inv\xE1lido: deve incluir "${_issue.includes}"` : _issue.format === "regex" ? `Texto inv\xE1lido: deve corresponder ao padr\xE3o ${_issue.pattern}` : `Formato d${FormatDictionary[_issue.format] ?? issue.format} inv\xE1lido`;
			}
			case "not_multiple_of":
				return `N\xFAmero inv\xE1lido: deve ser m\xFAltiplo de ${issue.divisor}`;
			case "unrecognized_keys": {
				let plural = issue.keys.length > 1 ? "s" : "";
				return `Chave${plural} inv\xE1lida${plural}: ${joinValues(issue.keys, ", ")}`;
			}
			case "invalid_key":
				return `Entrada inv\xE1lida n${translateOriginWithArticle(issue.origin, "definite")}`;
			case "invalid_union":
				return issue.options && Array.isArray(issue.options) && issue.options.length > 0 ? `Valor de discrimina\xE7\xE3o inv\xE1lido. Esperava ${issue.options.map((o) => `'${o}'`).join(" | ")}` : "Entrada inv\xE1lida";
			case "invalid_element":
				return `Entrada inv\xE1lida n${translateOriginWithArticle(issue.origin, "definite")}`;
			default:
				return "Entrada inv\xE1lida";
		}
	};
};
function pt_default() {
	return {
		localeError: error()
	};
}

export {
	pt_default
};
