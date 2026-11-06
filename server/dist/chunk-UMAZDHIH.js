import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/es.js
var error = () => {
	let Sizable = {
		string: { unit: "caracteres", verb: "tener" },
		file: { unit: "bytes", verb: "tener" },
		array: { unit: "elementos", verb: "tener" },
		set: { unit: "elementos", verb: "tener" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "entrada",
		email: "direcci\xF3n de correo electr\xF3nico",
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
		datetime: "fecha y hora ISO",
		date: "fecha ISO",
		time: "hora ISO",
		duration: "duraci\xF3n ISO",
		ipv4: "direcci\xF3n IPv4",
		ipv6: "direcci\xF3n IPv6",
		mac: "direcci\xF3n MAC",
		cidrv4: "rango IPv4",
		cidrv6: "rango IPv6",
		base64: "cadena codificada en base64",
		base64url: "URL codificada en base64",
		json_string: "cadena JSON",
		e164: "n\xFAmero E.164",
		credit_card: "n\xFAmero de tarjeta de cr\xE9dito",
		currency_code: "c\xF3digo de moneda",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "entrada"
	}, TypeDictionary = {
		nan: "NaN",
		string: "texto",
		number: "n\xFAmero",
		boolean: "booleano",
		array: "arreglo",
		object: "objeto",
		set: "conjunto",
		file: "archivo",
		date: "fecha",
		bigint: "n\xFAmero grande",
		symbol: "s\xEDmbolo",
		undefined: "indefinido",
		null: "nulo",
		function: "funci\xF3n",
		map: "mapa",
		record: "registro",
		tuple: "tupla",
		enum: "enumeraci\xF3n",
		union: "uni\xF3n",
		literal: "literal",
		promise: "promesa",
		void: "vac\xEDo",
		never: "nunca",
		unknown: "desconocido",
		any: "cualquiera"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `Entrada inv\xE1lida: se esperaba instanceof ${issue.expected}, recibido ${received}` : `Entrada inv\xE1lida: se esperaba ${expected}, recibido ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `Entrada inv\xE1lida: se esperaba ${stringifyPrimitive(issue.values[0])}` : `Opci\xF3n inv\xE1lida: se esperaba una de ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin), origin = TypeDictionary[issue.origin] ?? issue.origin;
				return sizing ? `Demasiado grande: se esperaba que ${origin ?? "valor"} tuviera ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementos"}` : `Demasiado grande: se esperaba que ${origin ?? "valor"} fuera ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin), origin = TypeDictionary[issue.origin] ?? issue.origin;
				return sizing ? `Demasiado peque\xF1o: se esperaba que ${origin} tuviera ${adj}${issue.minimum.toString()} ${sizing.unit}` : `Demasiado peque\xF1o: se esperaba que ${origin} fuera ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `Cadena inv\xE1lida: debe comenzar con "${_issue.prefix}"` : _issue.format === "ends_with" ? `Cadena inv\xE1lida: debe terminar en "${_issue.suffix}"` : _issue.format === "includes" ? `Cadena inv\xE1lida: debe incluir "${_issue.includes}"` : _issue.format === "regex" ? `Cadena inv\xE1lida: debe coincidir con el patr\xF3n ${_issue.pattern}` : `Inv\xE1lido ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of":
				return `N\xFAmero inv\xE1lido: debe ser m\xFAltiplo de ${issue.divisor}`;
			case "unrecognized_keys":
				return `Llave${issue.keys.length > 1 ? "s" : ""} desconocida${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `Llave inv\xE1lida en ${TypeDictionary[issue.origin] ?? issue.origin}`;
			case "invalid_union":
				return "Entrada inv\xE1lida";
			case "invalid_element":
				return `Valor inv\xE1lido en ${TypeDictionary[issue.origin] ?? issue.origin}`;
			default:
				return "Entrada inv\xE1lida";
		}
	};
};
function es_default() {
	return {
		localeError: error()
	};
}

export {
	es_default
};
