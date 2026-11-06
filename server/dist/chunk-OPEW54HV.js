import {
	joinValues,
	parsedType,
	stringifyPrimitive
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/zod/v4/locales/ms.js
var error = () => {
	let Sizable = {
		string: { unit: "aksara", verb: "mempunyai" },
		file: { unit: "bait", verb: "mempunyai" },
		array: { unit: "elemen", verb: "mempunyai" },
		set: { unit: "elemen", verb: "mempunyai" },
		map: { unit: "elemen", verb: "mempunyai" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	let FormatDictionary = {
		regex: "input",
		email: "alamat e-mel",
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
		datetime: "tarikh masa ISO",
		date: "tarikh ISO",
		time: "masa ISO",
		duration: "tempoh ISO",
		ipv4: "alamat IPv4",
		ipv6: "alamat IPv6",
		mac: "alamat MAC",
		cidrv4: "julat IPv4",
		cidrv6: "julat IPv6",
		base64: "string dikodkan base64",
		base64url: "string dikodkan base64url",
		json_string: "string JSON",
		e164: "nombor E.164",
		credit_card: "nombor kad kredit",
		currency_code: "kod mata wang",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "input"
	}, TypeDictionary = {
		nan: "NaN",
		number: "nombor"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				let expected = TypeDictionary[issue.expected] ?? issue.expected, receivedType = parsedType(issue.input), received = TypeDictionary[receivedType] ?? receivedType;
				return /^[A-Z]/.test(issue.expected) ? `Input tidak sah: dijangka instanceof ${issue.expected}, diterima ${received}` : `Input tidak sah: dijangka ${expected}, diterima ${received}`;
			}
			case "invalid_value":
				return issue.values.length === 1 ? `Input tidak sah: dijangka ${stringifyPrimitive(issue.values[0])}` : `Pilihan tidak sah: dijangka salah satu daripada ${joinValues(issue.values, "|")}`;
			case "too_big": {
				let adj = issue.inclusive ? "<=" : "<", sizing = getSizing(issue.origin);
				return sizing ? `Terlalu besar: dijangka ${issue.origin ?? "nilai"} ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elemen"}` : `Terlalu besar: dijangka ${issue.origin ?? "nilai"} adalah ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				let adj = issue.inclusive ? ">=" : ">", sizing = getSizing(issue.origin);
				return sizing ? `Terlalu kecil: dijangka ${issue.origin} ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}` : `Terlalu kecil: dijangka ${issue.origin} adalah ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				let _issue = issue;
				return _issue.format === "starts_with" ? `String tidak sah: mesti bermula dengan "${_issue.prefix}"` : _issue.format === "ends_with" ? `String tidak sah: mesti berakhir dengan "${_issue.suffix}"` : _issue.format === "includes" ? `String tidak sah: mesti mengandungi "${_issue.includes}"` : _issue.format === "regex" ? `String tidak sah: mesti sepadan dengan corak ${_issue.pattern}` : `${FormatDictionary[_issue.format] ?? issue.format} tidak sah`;
			}
			case "not_multiple_of":
				return `Nombor tidak sah: perlu gandaan ${issue.divisor}`;
			case "unrecognized_keys":
				return `Kunci tidak dikenali: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key":
				return `Kunci tidak sah dalam ${issue.origin}`;
			case "invalid_union":
				return "Input tidak sah";
			case "invalid_element":
				return `Nilai tidak sah dalam ${issue.origin}`;
			default:
				return "Input tidak sah";
		}
	};
};
function ms_default() {
	return {
		localeError: error()
	};
}

export {
	ms_default
};
