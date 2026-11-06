import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/id.js
var error = () => {
	let Sizable = {
		string: { unit: "karakter", verb: "memiliki" },
		file: { unit: "byte", verb: "memiliki" },
		array: { unit: "item", verb: "memiliki" },
		set: { unit: "item", verb: "memiliki" },
		map: { unit: "item", verb: "memiliki" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "input",
		email: "alamat email",
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
		datetime: "tanggal dan waktu format ISO",
		date: "tanggal format ISO",
		time: "jam format ISO",
		duration: "durasi format ISO",
		ipv4: "alamat IPv4",
		ipv6: "alamat IPv6",
		mac: "alamat MAC",
		cidrv4: "rentang alamat IPv4",
		cidrv6: "rentang alamat IPv6",
		base64: "string dengan enkode base64",
		base64url: "string dengan enkode base64url",
		json_string: "string JSON",
		e164: "angka E.164",
		credit_card: "nomor kartu kredit",
		currency_code: "kode mata uang",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "input"
	}, TypeDictionary = {
		nan: "NaN"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `Input tidak valid: diharapkan instanceof ${issue.expected}, diterima ${received}` : `Input tidak valid: diharapkan ${expected}, diterima ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `Input tidak valid: diharapkan ${stringifyPrimitive(issue.values[0])}` : `Pilihan tidak valid: diharapkan salah satu dari ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				return sizing ? `Terlalu besar: diharapkan ${issue.origin ?? "value"} memiliki ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elemen"}` : `Terlalu besar: diharapkan ${issue.origin ?? "value"} menjadi ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				return sizing ? `Terlalu kecil: diharapkan ${issue.origin} memiliki ${adj}${issue.minimum.toString()} ${sizing.unit}` : `Terlalu kecil: diharapkan ${issue.origin} menjadi ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `String tidak valid: harus dimulai dengan "${_issue.prefix}"` : _issue.format === "ends_with" ? `String tidak valid: harus berakhir dengan "${_issue.suffix}"` : _issue.format === "includes" ? `String tidak valid: harus menyertakan "${_issue.includes}"` : _issue.format === "regex" ? `String tidak valid: harus sesuai pola ${_issue.pattern}` : `${FormatDictionary[_issue.format] ?? issue.format} tidak valid`;
			}
			case "not_multiple_of":
				return `Angka tidak valid: harus kelipatan dari ${issue.divisor}`;
			case "unrecognized_keys":
				return `Kunci tidak dikenali ${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `Kunci tidak valid di ${issue.origin}`;
			case "invalid_union":
				return "Input tidak valid";
			case "invalid_element":
				return `Nilai tidak valid di ${issue.origin}`;
			default:
				return "Input tidak valid";
		}
	};
};
function id_default() {
	return {
		localeError: error()
	};
}

export {
	id_default
};
