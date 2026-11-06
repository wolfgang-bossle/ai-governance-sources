import {
	ZodIssueCode,
	any,
	array,
	boolean,
	coerce_exports,
	literal,
	looseObject,
	number,
	object,
	string,
	url
} from "./chunk-CZ2J6RDZ.js";
import {
	NEVER
} from "./chunk-AYRWRYEI.js";

// ../code/node_modules/@modelcontextprotocol/core/dist/auth-UMQCo-ad.mjs
var SafeUrlSchema = url().superRefine((val, ctx) => {
	if (!URL.canParse(val))
		return ctx.addIssue({
			code: ZodIssueCode.custom,
			message: "URL must be parseable",
			fatal: !0
		}), NEVER;
}).refine((url2) => {
	let u = new URL(url2);
	return u.protocol !== "javascript:" && u.protocol !== "data:" && u.protocol !== "vbscript:";
}, { message: "URL cannot use javascript:, data:, or vbscript: scheme" }), OAuthProtectedResourceMetadataSchema = looseObject({
	resource: string().url(),
	authorization_servers: array(SafeUrlSchema).optional(),
	jwks_uri: string().url().optional(),
	scopes_supported: array(string()).optional(),
	bearer_methods_supported: array(string()).optional(),
	resource_signing_alg_values_supported: array(string()).optional(),
	resource_name: string().optional(),
	resource_documentation: string().optional(),
	resource_policy_uri: string().url().optional(),
	resource_tos_uri: string().url().optional(),
	tls_client_certificate_bound_access_tokens: boolean().optional(),
	authorization_details_types_supported: array(string()).optional(),
	dpop_signing_alg_values_supported: array(string()).optional(),
	dpop_bound_access_tokens_required: boolean().optional()
}), OAuthMetadataSchema = looseObject({
	issuer: string(),
	authorization_endpoint: SafeUrlSchema,
	token_endpoint: SafeUrlSchema,
	registration_endpoint: SafeUrlSchema.optional(),
	scopes_supported: array(string()).optional(),
	response_types_supported: array(string()),
	response_modes_supported: array(string()).optional(),
	grant_types_supported: array(string()).optional(),
	token_endpoint_auth_methods_supported: array(string()).optional(),
	token_endpoint_auth_signing_alg_values_supported: array(string()).optional(),
	service_documentation: SafeUrlSchema.optional(),
	revocation_endpoint: SafeUrlSchema.optional(),
	revocation_endpoint_auth_methods_supported: array(string()).optional(),
	revocation_endpoint_auth_signing_alg_values_supported: array(string()).optional(),
	introspection_endpoint: string().optional(),
	introspection_endpoint_auth_methods_supported: array(string()).optional(),
	introspection_endpoint_auth_signing_alg_values_supported: array(string()).optional(),
	code_challenge_methods_supported: array(string()).optional(),
	client_id_metadata_document_supported: boolean().optional(),
	authorization_response_iss_parameter_supported: boolean().optional().catch(void 0),
	dpop_signing_alg_values_supported: array(string()).optional()
}), OpenIdProviderMetadataSchema = looseObject({
	issuer: string(),
	authorization_endpoint: SafeUrlSchema,
	token_endpoint: SafeUrlSchema,
	userinfo_endpoint: SafeUrlSchema.optional(),
	jwks_uri: SafeUrlSchema,
	registration_endpoint: SafeUrlSchema.optional(),
	scopes_supported: array(string()).optional(),
	response_types_supported: array(string()),
	response_modes_supported: array(string()).optional(),
	grant_types_supported: array(string()).optional(),
	acr_values_supported: array(string()).optional(),
	subject_types_supported: array(string()),
	id_token_signing_alg_values_supported: array(string()),
	id_token_encryption_alg_values_supported: array(string()).optional(),
	id_token_encryption_enc_values_supported: array(string()).optional(),
	userinfo_signing_alg_values_supported: array(string()).optional(),
	userinfo_encryption_alg_values_supported: array(string()).optional(),
	userinfo_encryption_enc_values_supported: array(string()).optional(),
	request_object_signing_alg_values_supported: array(string()).optional(),
	request_object_encryption_alg_values_supported: array(string()).optional(),
	request_object_encryption_enc_values_supported: array(string()).optional(),
	token_endpoint_auth_methods_supported: array(string()).optional(),
	token_endpoint_auth_signing_alg_values_supported: array(string()).optional(),
	display_values_supported: array(string()).optional(),
	claim_types_supported: array(string()).optional(),
	claims_supported: array(string()).optional(),
	service_documentation: string().optional(),
	claims_locales_supported: array(string()).optional(),
	ui_locales_supported: array(string()).optional(),
	claims_parameter_supported: boolean().optional(),
	request_parameter_supported: boolean().optional(),
	request_uri_parameter_supported: boolean().optional(),
	require_request_uri_registration: boolean().optional(),
	op_policy_uri: SafeUrlSchema.optional(),
	op_tos_uri: SafeUrlSchema.optional(),
	client_id_metadata_document_supported: boolean().optional(),
	authorization_response_iss_parameter_supported: boolean().optional().catch(void 0)
}), OpenIdProviderDiscoveryMetadataSchema = object({
	...OpenIdProviderMetadataSchema.shape,
	...OAuthMetadataSchema.pick({ code_challenge_methods_supported: !0 }).shape
}), OAuthTokensSchema = object({
	access_token: string(),
	id_token: string().optional(),
	token_type: string(),
	expires_in: coerce_exports.number().optional(),
	scope: string().optional(),
	refresh_token: string().optional(),
	issuer: string().optional().catch(void 0)
}).strip(), IdJagTokenExchangeResponseSchema = object({
	issued_token_type: literal("urn:ietf:params:oauth:token-type:id-jag"),
	access_token: string(),
	token_type: string().optional(),
	expires_in: number().optional(),
	scope: string().optional()
}).strip(), OAuthErrorResponseSchema = object({
	error: string(),
	error_description: string().optional(),
	error_uri: string().optional()
}), OptionalSafeUrlSchema = SafeUrlSchema.optional().or(literal("").transform(() => {
})), OAuthClientMetadataSchema = object({
	redirect_uris: array(SafeUrlSchema),
	token_endpoint_auth_method: string().optional(),
	grant_types: array(string()).optional(),
	response_types: array(string()).optional(),
	application_type: string().optional(),
	client_name: string().optional(),
	client_uri: SafeUrlSchema.optional(),
	logo_uri: OptionalSafeUrlSchema,
	scope: string().optional(),
	contacts: array(string()).optional(),
	tos_uri: OptionalSafeUrlSchema,
	policy_uri: string().optional(),
	jwks_uri: SafeUrlSchema.optional(),
	jwks: any().optional(),
	software_id: string().optional(),
	software_version: string().optional(),
	software_statement: string().optional()
}).strip(), OAuthClientInformationSchema = object({
	client_id: string(),
	client_secret: string().optional(),
	client_id_issued_at: number().optional(),
	client_secret_expires_at: number().optional(),
	issuer: string().optional().catch(void 0)
}).strip(), OAuthClientInformationFullSchema = OAuthClientMetadataSchema.merge(OAuthClientInformationSchema), OAuthClientRegistrationErrorSchema = object({
	error: string(),
	error_description: string().optional()
}).strip(), OAuthTokenRevocationRequestSchema = object({
	token: string(),
	token_type_hint: string().optional()
}).strip();

export {
	SafeUrlSchema,
	OAuthProtectedResourceMetadataSchema,
	OAuthMetadataSchema,
	OpenIdProviderMetadataSchema,
	OpenIdProviderDiscoveryMetadataSchema,
	OAuthTokensSchema,
	IdJagTokenExchangeResponseSchema,
	OAuthErrorResponseSchema,
	OptionalSafeUrlSchema,
	OAuthClientMetadataSchema,
	OAuthClientInformationSchema,
	OAuthClientInformationFullSchema,
	OAuthClientRegistrationErrorSchema,
	OAuthTokenRevocationRequestSchema
};
