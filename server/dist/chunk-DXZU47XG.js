import {
	IdJagTokenExchangeResponseSchema,
	OAuthClientInformationFullSchema,
	OAuthClientInformationSchema,
	OAuthClientMetadataSchema,
	OAuthClientRegistrationErrorSchema,
	OAuthErrorResponseSchema,
	OAuthMetadataSchema,
	OAuthProtectedResourceMetadataSchema,
	OAuthTokenRevocationRequestSchema,
	OAuthTokensSchema,
	OpenIdProviderDiscoveryMetadataSchema,
	OpenIdProviderMetadataSchema
} from "./chunk-H7BS6QOO.js";
import {
	AnnotationsSchema,
	AudioContentSchema,
	BaseMetadataSchema,
	BaseRequestParamsSchema,
	BlobResourceContentsSchema,
	BooleanSchemaSchema,
	CLIENT_CAPABILITIES_META_KEY,
	CLIENT_INFO_META_KEY,
	CallToolRequestParamsSchema,
	CallToolRequestSchema,
	CallToolResultSchema,
	CancelTaskRequestSchema,
	CancelTaskResultSchema,
	CancelledNotificationParamsSchema,
	CancelledNotificationSchema,
	ClientCapabilitiesSchema,
	ClientNotificationSchema,
	ClientRequestSchema,
	ClientResultSchema,
	ClientTasksCapabilitySchema,
	CompatibilityCallToolResultSchema,
	CompleteRequestParamsSchema,
	CompleteRequestSchema,
	CompleteResultSchema,
	ContentBlockSchema,
	CreateMessageRequestParamsSchema,
	CreateMessageRequestSchema,
	CreateMessageResultSchema,
	CreateMessageResultWithToolsSchema,
	CreateTaskResultSchema,
	CursorSchema,
	DiscoverRequestSchema,
	DiscoverResultSchema,
	ElicitRequestFormParamsSchema,
	ElicitRequestParamsSchema,
	ElicitRequestSchema,
	ElicitRequestURLParamsSchema,
	ElicitResultSchema,
	ElicitationCompleteNotificationParamsSchema,
	ElicitationCompleteNotificationSchema,
	EmbeddedResourceSchema,
	EmptyResultSchema,
	EnumSchemaSchema,
	GetPromptRequestParamsSchema,
	GetPromptRequestSchema,
	GetPromptResultSchema,
	GetTaskPayloadRequestSchema,
	GetTaskPayloadResultSchema,
	GetTaskRequestSchema,
	GetTaskResultSchema,
	IconSchema,
	IconsSchema,
	ImageContentSchema,
	ImplementationSchema,
	InitializeRequestParamsSchema,
	InitializeRequestSchema,
	InitializeResultSchema,
	InitializedNotificationSchema,
	JSONArraySchema,
	JSONObjectSchema,
	JSONRPCErrorResponseSchema,
	JSONRPCMessageSchema,
	JSONRPCNotificationSchema,
	JSONRPCRequestSchema,
	JSONRPCResponseSchema,
	JSONRPCResultResponseSchema,
	JSONValueSchema,
	LOG_LEVEL_META_KEY,
	LegacyTitledEnumSchemaSchema,
	ListChangedOptionsBaseSchema,
	ListPromptsRequestSchema,
	ListPromptsResultSchema,
	ListResourceTemplatesRequestSchema,
	ListResourceTemplatesResultSchema,
	ListResourcesRequestSchema,
	ListResourcesResultSchema,
	ListRootsRequestSchema,
	ListRootsResultSchema,
	ListTasksRequestSchema,
	ListTasksResultSchema,
	ListToolsRequestSchema,
	ListToolsResultSchema,
	LoggingLevelSchema,
	LoggingMessageNotificationParamsSchema,
	LoggingMessageNotificationSchema,
	ModelHintSchema,
	ModelPreferencesSchema,
	MultiSelectEnumSchemaSchema,
	NotificationSchema,
	NotificationsParamsSchema,
	NumberSchemaSchema,
	PROTOCOL_VERSION_META_KEY,
	PaginatedRequestParamsSchema,
	PaginatedRequestSchema,
	PaginatedResultSchema,
	PingRequestSchema,
	PrimitiveSchemaDefinitionSchema,
	ProgressNotificationParamsSchema,
	ProgressNotificationSchema,
	ProgressSchema,
	ProgressTokenSchema,
	PromptArgumentSchema,
	PromptListChangedNotificationSchema,
	PromptMessageSchema,
	PromptReferenceSchema,
	PromptSchema,
	ReadResourceRequestParamsSchema,
	ReadResourceRequestSchema,
	ReadResourceResultSchema,
	RelatedTaskMetadataSchema,
	RequestIdSchema,
	RequestMetaSchema,
	RequestSchema,
	ResourceContentsSchema,
	ResourceLinkSchema,
	ResourceListChangedNotificationSchema,
	ResourceRequestParamsSchema,
	ResourceSchema,
	ResourceTemplateReferenceSchema,
	ResourceTemplateSchema,
	ResourceUpdatedNotificationParamsSchema,
	ResourceUpdatedNotificationSchema,
	ResultMetaObjectSchema,
	ResultSchema,
	RoleSchema,
	RootSchema,
	RootsListChangedNotificationSchema,
	SERVER_INFO_META_KEY,
	SUPPORTED_PROTOCOL_VERSIONS,
	SamplingContentSchema,
	SamplingMessageContentBlockSchema,
	SamplingMessageSchema,
	ServerCapabilitiesSchema,
	ServerNotificationSchema,
	ServerRequestSchema,
	ServerResultSchema,
	ServerTasksCapabilitySchema,
	SetLevelRequestParamsSchema,
	SetLevelRequestSchema,
	SingleSelectEnumSchemaSchema,
	StringSchemaSchema,
	SubscribeRequestParamsSchema,
	SubscribeRequestSchema,
	SubscriptionFilterSchema,
	SubscriptionsAcknowledgedNotificationParamsSchema,
	SubscriptionsAcknowledgedNotificationSchema,
	SubscriptionsListenRequestParamsSchema,
	SubscriptionsListenRequestSchema,
	SubscriptionsListenResultMetaSchema,
	SubscriptionsListenResultSchema,
	TaskAugmentedRequestParamsSchema,
	TaskCreationParamsSchema,
	TaskMetadataSchema,
	TaskSchema,
	TaskStatusNotificationParamsSchema,
	TaskStatusNotificationSchema,
	TaskStatusSchema,
	TextContentSchema,
	TextResourceContentsSchema,
	TitledMultiSelectEnumSchemaSchema,
	TitledSingleSelectEnumSchemaSchema,
	ToolAnnotationsSchema,
	ToolChoiceSchema,
	ToolExecutionSchema,
	ToolListChangedNotificationSchema,
	ToolResultContentSchema,
	ToolSchema,
	ToolUseContentSchema,
	UnsubscribeRequestParamsSchema,
	UnsubscribeRequestSchema,
	UntitledMultiSelectEnumSchemaSchema,
	UntitledSingleSelectEnumSchemaSchema
} from "./chunk-WYXYRM26.js";
import {
	__commonJSMin,
	__exportAll,
	__toESM,
	declares2019Dialect
} from "./chunk-VADXITWQ.js";
import {
	_enum,
	_null,
	array,
	boolean,
	discriminatedUnion,
	email,
	intersection,
	iso_exports,
	lazy,
	literal,
	looseObject,
	number,
	object,
	optional,
	preprocess,
	record,
	safeParse,
	string,
	toJSONSchema,
	union,
	unknown,
	url
} from "./chunk-CZ2J6RDZ.js";

// ../code/node_modules/@modelcontextprotocol/server/dist/src-DdvbAHrR.mjs
var BRANDS = /* @__PURE__ */ Symbol.for("mcp.sdk.errorBrands");
function stampErrorBrands(instance, ctor) {
	let brands = /* @__PURE__ */ new Set(), current = ctor;
	for (; typeof current == "function"; ) {
		let brand = current.mcpBrand;
		Object.prototype.hasOwnProperty.call(current, "mcpBrand") && typeof brand == "string" && brands.add(brand), current = Object.getPrototypeOf(current);
	}
	brands.size !== 0 && Object.defineProperty(instance, BRANDS, {
		value: brands,
		enumerable: !1,
		configurable: !0
	});
}
function brandedHasInstance(cls, value) {
	try {
		if (typeof value == "object" && value !== null && Object.prototype.hasOwnProperty.call(cls, "mcpBrand") && typeof cls.mcpBrand == "string" && Object.prototype.hasOwnProperty.call(value, BRANDS)) {
			let carried = value[BRANDS];
			if (carried && typeof carried.has == "function" && carried.has(cls.mcpBrand)) return !0;
		}
	} catch {
	}
	return Function.prototype[Symbol.hasInstance].call(cls, value);
}
var OAuthErrorCode = /* @__PURE__ */ (function(OAuthErrorCode$1) {
	return OAuthErrorCode$1.InvalidRequest = "invalid_request", OAuthErrorCode$1.InvalidClient = "invalid_client", OAuthErrorCode$1.InvalidGrant = "invalid_grant", OAuthErrorCode$1.UnauthorizedClient = "unauthorized_client", OAuthErrorCode$1.UnsupportedGrantType = "unsupported_grant_type", OAuthErrorCode$1.InvalidScope = "invalid_scope", OAuthErrorCode$1.AccessDenied = "access_denied", OAuthErrorCode$1.ServerError = "server_error", OAuthErrorCode$1.TemporarilyUnavailable = "temporarily_unavailable", OAuthErrorCode$1.UnsupportedResponseType = "unsupported_response_type", OAuthErrorCode$1.UnsupportedTokenType = "unsupported_token_type", OAuthErrorCode$1.InvalidToken = "invalid_token", OAuthErrorCode$1.MethodNotAllowed = "method_not_allowed", OAuthErrorCode$1.TooManyRequests = "too_many_requests", OAuthErrorCode$1.InvalidClientMetadata = "invalid_client_metadata", OAuthErrorCode$1.InvalidRedirectUri = "invalid_redirect_uri", OAuthErrorCode$1.InsufficientScope = "insufficient_scope", OAuthErrorCode$1.InvalidTarget = "invalid_target", OAuthErrorCode$1.InvalidDpopProof = "invalid_dpop_proof", OAuthErrorCode$1.UseDpopNonce = "use_dpop_nonce", OAuthErrorCode$1;
})({}), OAuthError = class OAuthError2 extends Error {
	static {
		Object.defineProperty(this, "mcpBrand", { value: "mcp.OAuthError" });
	}
	static [Symbol.hasInstance](value) {
		return brandedHasInstance(this, value);
	}
	/**
	* Brand-based type guard: equivalent to `value instanceof this`, as an
	* explicit static predicate (the axios/AWS-SDK `isInstance` style). Reads
	* the caller's own brand via `this`, so every branded subclass gets a
	* correctly-scoped guard by inheritance. Must be invoked on the class —
	* in callback position write `v => SdkError.isInstance(v)`, not
	* `.filter(SdkError.isInstance)` (detached calls throw rather than
	* silently matching nothing).
	*/
	static isInstance(value) {
		if (typeof this != "function") throw new TypeError("isInstance must be called on the class (e.g. `SdkError.isInstance(value)`); for callbacks use `v => SdkError.isInstance(v)`");
		return brandedHasInstance(this, value);
	}
	constructor(code, message, errorUri) {
		super(message), this.code = code, this.errorUri = errorUri, this.name = "OAuthError", stampErrorBrands(this, new.target);
	}
	/**
	* Converts the error to a standard OAuth error response object.
	*/
	toResponseObject() {
		let response = {
			error: this.code,
			error_description: this.message
		};
		return this.errorUri && (response.error_uri = this.errorUri), response;
	}
	/**
	* Creates an {@linkcode OAuthError} from an OAuth error response.
	*/
	static fromResponse(response) {
		return new OAuthError2(response.error, response.error_description ?? response.error, response.error_uri);
	}
}, SdkErrorCode = /* @__PURE__ */ (function(SdkErrorCode$1) {
	return SdkErrorCode$1.NotConnected = "NOT_CONNECTED", SdkErrorCode$1.AlreadyConnected = "ALREADY_CONNECTED", SdkErrorCode$1.NotInitialized = "NOT_INITIALIZED", SdkErrorCode$1.CapabilityNotSupported = "CAPABILITY_NOT_SUPPORTED", SdkErrorCode$1.RequestTimeout = "REQUEST_TIMEOUT", SdkErrorCode$1.ConnectionClosed = "CONNECTION_CLOSED", SdkErrorCode$1.SendFailed = "SEND_FAILED", SdkErrorCode$1.InvalidResult = "INVALID_RESULT", SdkErrorCode$1.UnsupportedResultType = "UNSUPPORTED_RESULT_TYPE", SdkErrorCode$1.InputRequiredRoundsExceeded = "INPUT_REQUIRED_ROUNDS_EXCEEDED", SdkErrorCode$1.ListPaginationExceeded = "LIST_PAGINATION_EXCEEDED", SdkErrorCode$1.MethodNotSupportedByProtocolVersion = "METHOD_NOT_SUPPORTED_BY_PROTOCOL_VERSION", SdkErrorCode$1.EraNegotiationFailed = "ERA_NEGOTIATION_FAILED", SdkErrorCode$1.ClientHttpNotImplemented = "CLIENT_HTTP_NOT_IMPLEMENTED", SdkErrorCode$1.ClientHttpAuthentication = "CLIENT_HTTP_AUTHENTICATION", SdkErrorCode$1.ClientHttpForbidden = "CLIENT_HTTP_FORBIDDEN", SdkErrorCode$1.ClientHttpUnexpectedContent = "CLIENT_HTTP_UNEXPECTED_CONTENT", SdkErrorCode$1.ClientHttpFailedToOpenStream = "CLIENT_HTTP_FAILED_TO_OPEN_STREAM", SdkErrorCode$1.ClientHttpFailedToTerminateSession = "CLIENT_HTTP_FAILED_TO_TERMINATE_SESSION", SdkErrorCode$1;
})({}), SdkError = class extends Error {
	static {
		Object.defineProperty(this, "mcpBrand", { value: "mcp.SdkError" });
	}
	static [Symbol.hasInstance](value) {
		return brandedHasInstance(this, value);
	}
	/**
	* Brand-based type guard: equivalent to `value instanceof this`, as an
	* explicit static predicate (the axios/AWS-SDK `isInstance` style). Reads
	* the caller's own brand via `this`, so every branded subclass gets a
	* correctly-scoped guard by inheritance. Must be invoked on the class —
	* in callback position write `v => SdkError.isInstance(v)`, not
	* `.filter(SdkError.isInstance)` (detached calls throw rather than
	* silently matching nothing).
	*/
	static isInstance(value) {
		if (typeof this != "function") throw new TypeError("isInstance must be called on the class (e.g. `SdkError.isInstance(value)`); for callbacks use `v => SdkError.isInstance(v)`");
		return brandedHasInstance(this, value);
	}
	/**
	* @param code - Stable string code identifying the failure ({@linkcode SdkErrorCode}).
	* @param message - Human-readable description.
	* @param data - Optional structured payload (for example the HTTP status carried by
	* {@linkcode SdkHttpError}). Opaque to the SDK: a `cause` key inside `data` is not
	* promoted to `Error.cause`.
	* @param options - Standard `ErrorOptions`, forwarded to `Error`. Pass the underlying
	* failure as `{ cause }` so it is reachable through the `Error.cause` chain that
	* loggers and error trackers walk.
	*/
	constructor(code, message, data, options) {
		super(message, options), this.code = code, this.data = data, this.name = "SdkError", stampErrorBrands(this, new.target);
	}
}, SdkHttpError = class extends SdkError {
	static {
		Object.defineProperty(this, "mcpBrand", { value: "mcp.SdkHttpError" });
	}
	/**
	* @param options - Standard `ErrorOptions`, forwarded to `Error` (see {@linkcode SdkError}).
	*/
	constructor(code, message, data, options) {
		super(code, message, data, options), this.name = "SdkHttpError";
	}
	get status() {
		return this.data.status;
	}
	get statusText() {
		return this.data.statusText;
	}
};
function resourceUrlFromServerUrl(url2) {
	let resourceURL = typeof url2 == "string" ? new URL(url2) : new URL(url2.href);
	return resourceURL.hash = "", resourceURL;
}
function checkResourceAllowed({ requestedResource, configuredResource }) {
	let requested = typeof requestedResource == "string" ? new URL(requestedResource) : new URL(requestedResource.href), configured = typeof configuredResource == "string" ? new URL(configuredResource) : new URL(configuredResource.href);
	if (requested.origin !== configured.origin || requested.pathname.length < configured.pathname.length) return !1;
	let requestedPath = requested.pathname.endsWith("/") ? requested.pathname : requested.pathname + "/", configuredPath = configured.pathname.endsWith("/") ? configured.pathname : configured.pathname + "/";
	return requestedPath.startsWith(configuredPath);
}
var REQUIRED_CLIENT_CAPABILITIES_BY_METHOD = {};
function requiredClientCapabilitiesForRequest(method) {
	return Object.hasOwn(REQUIRED_CLIENT_CAPABILITIES_BY_METHOD, method) ? REQUIRED_CLIENT_CAPABILITIES_BY_METHOD[method] : void 0;
}
function isPlainObject$7(value) {
	return value !== null && typeof value == "object" && !Array.isArray(value);
}
function isImpliedCapabilityMember(capability, member, declaredValue) {
	return capability === "elicitation" && member === "form" && declaredValue.form === void 0 && declaredValue.url === void 0;
}
function requiredClientCapabilitiesForInputRequest(entry) {
	switch (entry.method) {
		case "elicitation/create":
			return entry.params?.mode === "url" ? { elicitation: { url: {} } } : { elicitation: { form: {} } };
		case "sampling/createMessage": {
			let params = entry.params;
			return params !== void 0 && (params.tools !== void 0 || params.toolChoice !== void 0) ? { sampling: { tools: {} } } : { sampling: {} };
		}
		case "roots/list":
			return { roots: {} };
		default:
			return;
	}
}
function missingClientCapabilities(required, declared) {
	let missing = {};
	for (let [capability, requirement] of Object.entries(required)) {
		if (requirement === void 0) continue;
		let declaredValue = declared === void 0 ? void 0 : declared[capability];
		if (declaredValue === void 0) {
			missing[capability] = requirement;
			continue;
		}
		if (isPlainObject$7(requirement) && isPlainObject$7(declaredValue)) {
			let missingMembers = {};
			for (let [member, memberRequirement] of Object.entries(requirement)) memberRequirement !== void 0 && declaredValue[member] === void 0 && !isImpliedCapabilityMember(capability, member, declaredValue) && (missingMembers[member] = memberRequirement);
			Object.keys(missingMembers).length > 0 && (missing[capability] = missingMembers);
		}
	}
	return Object.keys(missing).length > 0 ? missing : void 0;
}
var FIRST_MODERN_PROTOCOL_VERSION = "2026-07-28", SUPPORTED_MODERN_PROTOCOL_VERSIONS = [FIRST_MODERN_PROTOCOL_VERSION];
function isModernProtocolVersion(version) {
	return version >= FIRST_MODERN_PROTOCOL_VERSION;
}
function legacyProtocolVersions(versions) {
	return versions.filter((version) => !isModernProtocolVersion(version));
}
function modernProtocolVersions(versions) {
	return versions.filter((version) => isModernProtocolVersion(version));
}
function appendTextFallbackForNonObject(result) {
	let sc = result.structuredContent;
	return sc === void 0 || !(typeof sc != "object" || sc === null || Array.isArray(sc)) || (result.content?.some((c) => c.type === "text") ?? !1) ? result : {
		...result,
		content: [...result.content ?? [], {
			type: "text",
			text: JSON.stringify(sc)
		}]
	};
}
var TOOL_RESULT_FOREIGN_FAMILY_KEYS = [
	"task",
	"inputRequests",
	"requestState"
];
function normalizeContentlessToolResult(value) {
	return value === null || typeof value != "object" || Array.isArray(value) || value.content !== void 0 || TOOL_RESULT_FOREIGN_FAMILY_KEYS.some((key) => key in value) ? value : {
		...value,
		content: []
	};
}
function build$1() {
	let JSONValueSchema$1 = lazy(() => union([
		string(),
		number(),
		boolean(),
		_null(),
		record(string(), JSONValueSchema$1),
		array(JSONValueSchema$1)
	])), JSONObjectSchema$1 = record(string(), JSONValueSchema$1), ProgressTokenSchema$1 = union([string(), number().int()]), CursorSchema$1 = string(), TaskMetadataSchema$1 = object({ ttl: number().optional() }), RelatedTaskMetadataSchema$1 = object({ taskId: string() }), RequestMetaSchema$1 = looseObject({
		progressToken: ProgressTokenSchema$1.optional(),
		"io.modelcontextprotocol/related-task": RelatedTaskMetadataSchema$1.optional()
	}), BaseRequestParamsSchema$1 = object({ _meta: RequestMetaSchema$1.optional() }), TaskAugmentedRequestParamsSchema$1 = BaseRequestParamsSchema$1.extend({ task: TaskMetadataSchema$1.optional() }), RequestSchema$1 = object({
		method: string(),
		params: BaseRequestParamsSchema$1.loose().optional()
	}), NotificationsParamsSchema$1 = object({ _meta: RequestMetaSchema$1.optional() }), NotificationSchema$1 = object({
		method: string(),
		params: NotificationsParamsSchema$1.loose().optional()
	}), ResultSchema$1 = looseObject({ _meta: RequestMetaSchema$1.optional() }), RequestIdSchema$1 = union([string(), number().int()]), EmptyResultSchema$1 = ResultSchema$1.strict(), CancelledNotificationParamsSchema$1 = NotificationsParamsSchema$1.extend({
		requestId: RequestIdSchema$1.optional(),
		reason: string().optional()
	}), CancelledNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/cancelled"),
		params: CancelledNotificationParamsSchema$1
	}), IconSchema$1 = object({
		src: string(),
		mimeType: string().optional(),
		sizes: array(string()).optional(),
		theme: _enum(["light", "dark"]).optional()
	}), IconsSchema$1 = object({ icons: array(IconSchema$1).optional() }), BaseMetadataSchema$1 = object({
		name: string(),
		title: string().optional()
	}), ImplementationSchema$1 = BaseMetadataSchema$1.extend({
		...BaseMetadataSchema$1.shape,
		...IconsSchema$1.shape,
		version: string(),
		websiteUrl: string().optional(),
		description: string().optional()
	}), FormElicitationCapabilitySchema = intersection(object({ applyDefaults: boolean().optional() }), JSONObjectSchema$1), ElicitationCapabilitySchema = preprocess((value) => value && typeof value == "object" && !Array.isArray(value) && Object.keys(value).length === 0 ? { form: {} } : value, intersection(object({
		form: FormElicitationCapabilitySchema.optional(),
		url: JSONObjectSchema$1.optional()
	}), JSONObjectSchema$1.optional())), ClientTasksCapabilitySchema$1 = looseObject({
		list: JSONObjectSchema$1.optional(),
		cancel: JSONObjectSchema$1.optional(),
		requests: looseObject({
			sampling: looseObject({ createMessage: JSONObjectSchema$1.optional() }).optional(),
			elicitation: looseObject({ create: JSONObjectSchema$1.optional() }).optional()
		}).optional()
	}), ServerTasksCapabilitySchema$1 = looseObject({
		list: JSONObjectSchema$1.optional(),
		cancel: JSONObjectSchema$1.optional(),
		requests: looseObject({ tools: looseObject({ call: JSONObjectSchema$1.optional() }).optional() }).optional()
	}), ClientCapabilitiesSchema$1 = object({
		experimental: record(string(), JSONObjectSchema$1).optional(),
		sampling: object({
			context: JSONObjectSchema$1.optional(),
			tools: JSONObjectSchema$1.optional()
		}).optional(),
		elicitation: ElicitationCapabilitySchema.optional(),
		roots: object({ listChanged: boolean().optional() }).optional(),
		tasks: ClientTasksCapabilitySchema$1.optional(),
		extensions: record(string(), JSONObjectSchema$1).optional()
	}), InitializeRequestParamsSchema$1 = BaseRequestParamsSchema$1.extend({
		protocolVersion: string(),
		capabilities: ClientCapabilitiesSchema$1,
		clientInfo: ImplementationSchema$1
	}), InitializeRequestSchema$1 = RequestSchema$1.extend({
		method: literal("initialize"),
		params: InitializeRequestParamsSchema$1
	}), ServerCapabilitiesSchema$1 = object({
		experimental: record(string(), JSONObjectSchema$1).optional(),
		logging: JSONObjectSchema$1.optional(),
		completions: JSONObjectSchema$1.optional(),
		prompts: object({ listChanged: boolean().optional() }).optional(),
		resources: object({
			subscribe: boolean().optional(),
			listChanged: boolean().optional()
		}).optional(),
		tools: object({ listChanged: boolean().optional() }).optional(),
		tasks: ServerTasksCapabilitySchema$1.optional(),
		extensions: record(string(), JSONObjectSchema$1).optional()
	}), InitializeResultSchema$1 = ResultSchema$1.extend({
		protocolVersion: string(),
		capabilities: ServerCapabilitiesSchema$1,
		serverInfo: ImplementationSchema$1,
		instructions: string().optional()
	}), InitializedNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/initialized"),
		params: NotificationsParamsSchema$1.optional()
	}), PingRequestSchema$1 = RequestSchema$1.extend({
		method: literal("ping"),
		params: BaseRequestParamsSchema$1.optional()
	}), ProgressSchema$1 = object({
		progress: number(),
		total: optional(number()),
		message: optional(string())
	}), ProgressNotificationParamsSchema$1 = object({
		...NotificationsParamsSchema$1.shape,
		...ProgressSchema$1.shape,
		progressToken: ProgressTokenSchema$1
	}), ProgressNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/progress"),
		params: ProgressNotificationParamsSchema$1
	}), PaginatedRequestParamsSchema$1 = BaseRequestParamsSchema$1.extend({ cursor: CursorSchema$1.optional() }), PaginatedRequestSchema$1 = RequestSchema$1.extend({ params: PaginatedRequestParamsSchema$1.optional() }), PaginatedResultSchema$1 = ResultSchema$1.extend({ nextCursor: CursorSchema$1.optional() }), ResourceContentsSchema$1 = object({
		uri: string(),
		mimeType: optional(string()),
		_meta: record(string(), unknown()).optional()
	}), TextResourceContentsSchema$1 = ResourceContentsSchema$1.extend({ text: string() }), Base64Schema = string().refine((val) => {
		try {
			return atob(val), !0;
		} catch {
			return !1;
		}
	}, { message: "Invalid Base64 string" }), BlobResourceContentsSchema$1 = ResourceContentsSchema$1.extend({ blob: Base64Schema }), RoleSchema$1 = _enum(["user", "assistant"]), AnnotationsSchema$1 = object({
		audience: array(RoleSchema$1).optional(),
		priority: number().min(0).max(1).optional(),
		lastModified: iso_exports.datetime({ offset: !0 }).optional()
	}), ResourceSchema$1 = object({
		...BaseMetadataSchema$1.shape,
		...IconsSchema$1.shape,
		uri: string(),
		description: optional(string()),
		mimeType: optional(string()),
		size: optional(number()),
		annotations: AnnotationsSchema$1.optional(),
		_meta: optional(looseObject({}))
	}), ResourceTemplateSchema$1 = object({
		...BaseMetadataSchema$1.shape,
		...IconsSchema$1.shape,
		uriTemplate: string(),
		description: optional(string()),
		mimeType: optional(string()),
		annotations: AnnotationsSchema$1.optional(),
		_meta: optional(looseObject({}))
	}), ListResourcesRequestSchema$1 = PaginatedRequestSchema$1.extend({ method: literal("resources/list") }), ListResourcesResultSchema$1 = PaginatedResultSchema$1.extend({ resources: array(ResourceSchema$1) }), ListResourceTemplatesRequestSchema$1 = PaginatedRequestSchema$1.extend({ method: literal("resources/templates/list") }), ListResourceTemplatesResultSchema$1 = PaginatedResultSchema$1.extend({ resourceTemplates: array(ResourceTemplateSchema$1) }), ResourceRequestParamsSchema$1 = BaseRequestParamsSchema$1.extend({ uri: string() }), ReadResourceRequestParamsSchema$1 = ResourceRequestParamsSchema$1, ReadResourceRequestSchema$1 = RequestSchema$1.extend({
		method: literal("resources/read"),
		params: ReadResourceRequestParamsSchema$1
	}), ReadResourceResultSchema$1 = ResultSchema$1.extend({ contents: array(union([TextResourceContentsSchema$1, BlobResourceContentsSchema$1])) }), ResourceListChangedNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/resources/list_changed"),
		params: NotificationsParamsSchema$1.optional()
	}), SubscribeRequestParamsSchema$1 = ResourceRequestParamsSchema$1, SubscribeRequestSchema$1 = RequestSchema$1.extend({
		method: literal("resources/subscribe"),
		params: SubscribeRequestParamsSchema$1
	}), UnsubscribeRequestParamsSchema$1 = ResourceRequestParamsSchema$1, UnsubscribeRequestSchema$1 = RequestSchema$1.extend({
		method: literal("resources/unsubscribe"),
		params: UnsubscribeRequestParamsSchema$1
	}), ResourceUpdatedNotificationParamsSchema$1 = NotificationsParamsSchema$1.extend({ uri: string() }), ResourceUpdatedNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/resources/updated"),
		params: ResourceUpdatedNotificationParamsSchema$1
	}), PromptArgumentSchema$1 = object({
		name: string(),
		description: optional(string()),
		required: optional(boolean())
	}), PromptSchema$1 = object({
		...BaseMetadataSchema$1.shape,
		...IconsSchema$1.shape,
		description: optional(string()),
		arguments: optional(array(PromptArgumentSchema$1)),
		_meta: optional(looseObject({}))
	}), ListPromptsRequestSchema$1 = PaginatedRequestSchema$1.extend({ method: literal("prompts/list") }), ListPromptsResultSchema$1 = PaginatedResultSchema$1.extend({ prompts: array(PromptSchema$1) }), GetPromptRequestParamsSchema$1 = BaseRequestParamsSchema$1.extend({
		name: string(),
		arguments: record(string(), string()).optional()
	}), GetPromptRequestSchema$1 = RequestSchema$1.extend({
		method: literal("prompts/get"),
		params: GetPromptRequestParamsSchema$1
	}), TextContentSchema$1 = object({
		type: literal("text"),
		text: string(),
		annotations: AnnotationsSchema$1.optional(),
		_meta: record(string(), unknown()).optional()
	}), ImageContentSchema$1 = object({
		type: literal("image"),
		data: Base64Schema,
		mimeType: string(),
		annotations: AnnotationsSchema$1.optional(),
		_meta: record(string(), unknown()).optional()
	}), AudioContentSchema$1 = object({
		type: literal("audio"),
		data: Base64Schema,
		mimeType: string(),
		annotations: AnnotationsSchema$1.optional(),
		_meta: record(string(), unknown()).optional()
	}), ToolUseContentSchema$1 = object({
		type: literal("tool_use"),
		name: string(),
		id: string(),
		input: record(string(), unknown()),
		_meta: record(string(), unknown()).optional()
	}), EmbeddedResourceSchema$1 = object({
		type: literal("resource"),
		resource: union([TextResourceContentsSchema$1, BlobResourceContentsSchema$1]),
		annotations: AnnotationsSchema$1.optional(),
		_meta: record(string(), unknown()).optional()
	}), ResourceLinkSchema$1 = ResourceSchema$1.extend({ type: literal("resource_link") }), ContentBlockSchema$1 = union([
		TextContentSchema$1,
		ImageContentSchema$1,
		AudioContentSchema$1,
		ResourceLinkSchema$1,
		EmbeddedResourceSchema$1
	]), PromptMessageSchema$1 = object({
		role: RoleSchema$1,
		content: ContentBlockSchema$1
	}), GetPromptResultSchema$1 = ResultSchema$1.extend({
		description: string().optional(),
		messages: array(PromptMessageSchema$1)
	}), PromptListChangedNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/prompts/list_changed"),
		params: NotificationsParamsSchema$1.optional()
	}), ToolAnnotationsSchema$1 = object({
		title: string().optional(),
		readOnlyHint: boolean().optional(),
		destructiveHint: boolean().optional(),
		idempotentHint: boolean().optional(),
		openWorldHint: boolean().optional()
	}), ToolExecutionSchema$1 = object({ taskSupport: _enum([
		"required",
		"optional",
		"forbidden"
	]).optional() }), ToolSchema$1 = object({
		...BaseMetadataSchema$1.shape,
		...IconsSchema$1.shape,
		description: string().optional(),
		inputSchema: object({
			type: literal("object"),
			properties: record(string(), JSONValueSchema$1).optional(),
			required: array(string()).optional()
		}).catchall(unknown()),
		outputSchema: object({
			type: literal("object"),
			properties: record(string(), JSONValueSchema$1).optional(),
			required: array(string()).optional()
		}).catchall(unknown()).optional(),
		annotations: ToolAnnotationsSchema$1.optional(),
		execution: ToolExecutionSchema$1.optional(),
		_meta: record(string(), unknown()).optional()
	}), ListToolsRequestSchema$1 = PaginatedRequestSchema$1.extend({ method: literal("tools/list") }), ListToolsResultSchema$1 = PaginatedResultSchema$1.extend({ tools: array(ToolSchema$1) }), CallToolResultSchema$1 = ResultSchema$1.extend({
		content: array(ContentBlockSchema$1),
		structuredContent: record(string(), unknown()).optional(),
		isError: boolean().optional()
	}), CallToolRequestParamsSchema$1 = TaskAugmentedRequestParamsSchema$1.extend({
		name: string(),
		arguments: record(string(), unknown()).optional()
	}), CallToolRequestSchema$1 = RequestSchema$1.extend({
		method: literal("tools/call"),
		params: CallToolRequestParamsSchema$1
	}), ToolListChangedNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/tools/list_changed"),
		params: NotificationsParamsSchema$1.optional()
	}), LoggingLevelSchema$1 = _enum([
		"debug",
		"info",
		"notice",
		"warning",
		"error",
		"critical",
		"alert",
		"emergency"
	]), SetLevelRequestParamsSchema$1 = BaseRequestParamsSchema$1.extend({ level: LoggingLevelSchema$1 }), SetLevelRequestSchema$1 = RequestSchema$1.extend({
		method: literal("logging/setLevel"),
		params: SetLevelRequestParamsSchema$1
	}), LoggingMessageNotificationParamsSchema$1 = NotificationsParamsSchema$1.extend({
		level: LoggingLevelSchema$1,
		logger: string().optional(),
		data: unknown()
	}), LoggingMessageNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/message"),
		params: LoggingMessageNotificationParamsSchema$1
	}), ModelHintSchema$1 = object({ name: string().optional() }), ModelPreferencesSchema$1 = object({
		hints: array(ModelHintSchema$1).optional(),
		costPriority: number().min(0).max(1).optional(),
		speedPriority: number().min(0).max(1).optional(),
		intelligencePriority: number().min(0).max(1).optional()
	}), ToolChoiceSchema$1 = object({ mode: _enum([
		"auto",
		"required",
		"none"
	]).optional() }), ToolResultContentSchema$1 = object({
		type: literal("tool_result"),
		toolUseId: string().describe("The unique identifier for the corresponding tool call."),
		content: array(ContentBlockSchema$1),
		structuredContent: object({}).loose().optional(),
		isError: boolean().optional(),
		_meta: record(string(), unknown()).optional()
	}), SamplingContentSchema$1 = discriminatedUnion("type", [
		TextContentSchema$1,
		ImageContentSchema$1,
		AudioContentSchema$1
	]), SamplingMessageContentBlockSchema$1 = discriminatedUnion("type", [
		TextContentSchema$1,
		ImageContentSchema$1,
		AudioContentSchema$1,
		ToolUseContentSchema$1,
		ToolResultContentSchema$1
	]), SamplingMessageSchema$1 = object({
		role: RoleSchema$1,
		content: union([SamplingMessageContentBlockSchema$1, array(SamplingMessageContentBlockSchema$1)]),
		_meta: record(string(), unknown()).optional()
	}), CreateMessageRequestParamsSchema$1 = TaskAugmentedRequestParamsSchema$1.extend({
		messages: array(SamplingMessageSchema$1),
		modelPreferences: ModelPreferencesSchema$1.optional(),
		systemPrompt: string().optional(),
		includeContext: _enum([
			"none",
			"thisServer",
			"allServers"
		]).optional(),
		temperature: number().optional(),
		maxTokens: number().int(),
		stopSequences: array(string()).optional(),
		metadata: JSONObjectSchema$1.optional(),
		tools: array(ToolSchema$1).optional(),
		toolChoice: ToolChoiceSchema$1.optional()
	}), CreateMessageRequestSchema$1 = RequestSchema$1.extend({
		method: literal("sampling/createMessage"),
		params: CreateMessageRequestParamsSchema$1
	}), CreateMessageResultSchema$1 = ResultSchema$1.extend({
		model: string(),
		stopReason: optional(_enum([
			"endTurn",
			"stopSequence",
			"maxTokens"
		]).or(string())),
		role: RoleSchema$1,
		content: SamplingContentSchema$1
	}), CreateMessageResultWithToolsSchema$1 = ResultSchema$1.extend({
		model: string(),
		stopReason: optional(_enum([
			"endTurn",
			"stopSequence",
			"maxTokens",
			"toolUse"
		]).or(string())),
		role: RoleSchema$1,
		content: union([SamplingMessageContentBlockSchema$1, array(SamplingMessageContentBlockSchema$1)])
	}), BooleanSchemaSchema$1 = object({
		type: literal("boolean"),
		title: string().optional(),
		description: string().optional(),
		default: boolean().optional()
	}), StringSchemaSchema$1 = object({
		type: literal("string"),
		title: string().optional(),
		description: string().optional(),
		minLength: number().optional(),
		maxLength: number().optional(),
		format: _enum([
			"email",
			"uri",
			"date",
			"date-time"
		]).optional(),
		default: string().optional()
	}), NumberSchemaSchema$1 = object({
		type: _enum(["number", "integer"]),
		title: string().optional(),
		description: string().optional(),
		minimum: number().optional(),
		maximum: number().optional(),
		default: number().optional()
	}), UntitledSingleSelectEnumSchemaSchema$1 = object({
		type: literal("string"),
		title: string().optional(),
		description: string().optional(),
		enum: array(string()),
		default: string().optional()
	}), TitledSingleSelectEnumSchemaSchema$1 = object({
		type: literal("string"),
		title: string().optional(),
		description: string().optional(),
		oneOf: array(object({
			const: string(),
			title: string()
		})),
		default: string().optional()
	}), LegacyTitledEnumSchemaSchema$1 = object({
		type: literal("string"),
		title: string().optional(),
		description: string().optional(),
		enum: array(string()),
		enumNames: array(string()).optional(),
		default: string().optional()
	}), SingleSelectEnumSchemaSchema$1 = union([UntitledSingleSelectEnumSchemaSchema$1, TitledSingleSelectEnumSchemaSchema$1]), UntitledMultiSelectEnumSchemaSchema$1 = object({
		type: literal("array"),
		title: string().optional(),
		description: string().optional(),
		minItems: number().optional(),
		maxItems: number().optional(),
		items: object({
			type: literal("string"),
			enum: array(string())
		}),
		default: array(string()).optional()
	}), TitledMultiSelectEnumSchemaSchema$1 = object({
		type: literal("array"),
		title: string().optional(),
		description: string().optional(),
		minItems: number().optional(),
		maxItems: number().optional(),
		items: object({ anyOf: array(object({
			const: string(),
			title: string()
		})) }),
		default: array(string()).optional()
	}), MultiSelectEnumSchemaSchema$1 = union([UntitledMultiSelectEnumSchemaSchema$1, TitledMultiSelectEnumSchemaSchema$1]), EnumSchemaSchema$1 = union([
		LegacyTitledEnumSchemaSchema$1,
		SingleSelectEnumSchemaSchema$1,
		MultiSelectEnumSchemaSchema$1
	]), PrimitiveSchemaDefinitionSchema$1 = union([
		EnumSchemaSchema$1,
		BooleanSchemaSchema$1,
		StringSchemaSchema$1,
		NumberSchemaSchema$1
	]), ElicitRequestFormParamsSchema$1 = TaskAugmentedRequestParamsSchema$1.extend({
		mode: literal("form").optional(),
		message: string(),
		requestedSchema: object({
			type: literal("object"),
			properties: record(string(), PrimitiveSchemaDefinitionSchema$1),
			required: array(string()).optional()
		}).catchall(unknown())
	}), ElicitRequestURLParamsSchema$1 = TaskAugmentedRequestParamsSchema$1.extend({
		mode: literal("url"),
		message: string(),
		elicitationId: string(),
		url: string().url()
	}), ElicitRequestParamsSchema$1 = union([ElicitRequestFormParamsSchema$1, ElicitRequestURLParamsSchema$1]), ElicitRequestSchema$1 = RequestSchema$1.extend({
		method: literal("elicitation/create"),
		params: ElicitRequestParamsSchema$1
	}), ElicitationCompleteNotificationParamsSchema$1 = NotificationsParamsSchema$1.extend({ elicitationId: string() }), ElicitationCompleteNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/elicitation/complete"),
		params: ElicitationCompleteNotificationParamsSchema$1
	}), ElicitResultSchema$1 = ResultSchema$1.extend({
		action: _enum([
			"accept",
			"decline",
			"cancel"
		]),
		content: preprocess((val) => val === null ? void 0 : val, record(string(), union([
			string(),
			number(),
			boolean(),
			array(string())
		])).optional())
	}), ResourceTemplateReferenceSchema$1 = object({
		type: literal("ref/resource"),
		uri: string()
	}), PromptReferenceSchema$1 = object({
		type: literal("ref/prompt"),
		name: string()
	}), CompleteRequestParamsSchema$1 = BaseRequestParamsSchema$1.extend({
		ref: union([PromptReferenceSchema$1, ResourceTemplateReferenceSchema$1]),
		argument: object({
			name: string(),
			value: string()
		}),
		context: object({ arguments: record(string(), string()).optional() }).optional()
	}), CompleteRequestSchema$1 = RequestSchema$1.extend({
		method: literal("completion/complete"),
		params: CompleteRequestParamsSchema$1
	}), CompleteResultSchema$1 = ResultSchema$1.extend({ completion: looseObject({
		values: array(string()).max(100),
		total: optional(number().int()),
		hasMore: optional(boolean())
	}) }), RootSchema$1 = object({
		uri: string().startsWith("file://"),
		name: string().optional(),
		_meta: record(string(), unknown()).optional()
	}), ListRootsRequestSchema$1 = RequestSchema$1.extend({
		method: literal("roots/list"),
		params: BaseRequestParamsSchema$1.optional()
	}), ListRootsResultSchema$1 = ResultSchema$1.extend({ roots: array(RootSchema$1) }), RootsListChangedNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/roots/list_changed"),
		params: NotificationsParamsSchema$1.optional()
	}), TaskCreationParamsSchema$1 = looseObject({
		ttl: number().optional(),
		pollInterval: number().optional()
	}), TaskStatusSchema$1 = _enum([
		"working",
		"input_required",
		"completed",
		"failed",
		"cancelled"
	]), TaskSchema$1 = object({
		taskId: string(),
		status: TaskStatusSchema$1,
		ttl: union([number(), _null()]),
		createdAt: string(),
		lastUpdatedAt: string(),
		pollInterval: optional(number()),
		statusMessage: optional(string())
	}), CreateTaskResultSchema$1 = ResultSchema$1.extend({ task: TaskSchema$1 }), TaskStatusNotificationParamsSchema$1 = NotificationsParamsSchema$1.merge(TaskSchema$1), TaskStatusNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/tasks/status"),
		params: TaskStatusNotificationParamsSchema$1
	}), GetTaskRequestSchema$1 = RequestSchema$1.extend({
		method: literal("tasks/get"),
		params: BaseRequestParamsSchema$1.extend({ taskId: string() })
	}), GetTaskResultSchema$1 = ResultSchema$1.merge(TaskSchema$1), GetTaskPayloadRequestSchema$1 = RequestSchema$1.extend({
		method: literal("tasks/result"),
		params: BaseRequestParamsSchema$1.extend({ taskId: string() })
	}), GetTaskPayloadResultSchema$1 = ResultSchema$1.loose(), ListTasksRequestSchema$1 = PaginatedRequestSchema$1.extend({ method: literal("tasks/list") }), ListTasksResultSchema$1 = PaginatedResultSchema$1.extend({ tasks: array(TaskSchema$1) }), CancelTaskRequestSchema$1 = RequestSchema$1.extend({
		method: literal("tasks/cancel"),
		params: BaseRequestParamsSchema$1.extend({ taskId: string() })
	});
	return {
		JSONValueSchema: JSONValueSchema$1,
		JSONObjectSchema: JSONObjectSchema$1,
		ProgressTokenSchema: ProgressTokenSchema$1,
		CursorSchema: CursorSchema$1,
		TaskMetadataSchema: TaskMetadataSchema$1,
		RelatedTaskMetadataSchema: RelatedTaskMetadataSchema$1,
		RequestMetaSchema: RequestMetaSchema$1,
		BaseRequestParamsSchema: BaseRequestParamsSchema$1,
		TaskAugmentedRequestParamsSchema: TaskAugmentedRequestParamsSchema$1,
		RequestSchema: RequestSchema$1,
		NotificationsParamsSchema: NotificationsParamsSchema$1,
		NotificationSchema: NotificationSchema$1,
		ResultSchema: ResultSchema$1,
		RequestIdSchema: RequestIdSchema$1,
		EmptyResultSchema: EmptyResultSchema$1,
		CancelledNotificationParamsSchema: CancelledNotificationParamsSchema$1,
		CancelledNotificationSchema: CancelledNotificationSchema$1,
		IconSchema: IconSchema$1,
		IconsSchema: IconsSchema$1,
		BaseMetadataSchema: BaseMetadataSchema$1,
		ImplementationSchema: ImplementationSchema$1,
		ClientTasksCapabilitySchema: ClientTasksCapabilitySchema$1,
		ServerTasksCapabilitySchema: ServerTasksCapabilitySchema$1,
		ClientCapabilitiesSchema: ClientCapabilitiesSchema$1,
		InitializeRequestParamsSchema: InitializeRequestParamsSchema$1,
		InitializeRequestSchema: InitializeRequestSchema$1,
		ServerCapabilitiesSchema: ServerCapabilitiesSchema$1,
		InitializeResultSchema: InitializeResultSchema$1,
		InitializedNotificationSchema: InitializedNotificationSchema$1,
		PingRequestSchema: PingRequestSchema$1,
		ProgressSchema: ProgressSchema$1,
		ProgressNotificationParamsSchema: ProgressNotificationParamsSchema$1,
		ProgressNotificationSchema: ProgressNotificationSchema$1,
		PaginatedRequestParamsSchema: PaginatedRequestParamsSchema$1,
		PaginatedRequestSchema: PaginatedRequestSchema$1,
		PaginatedResultSchema: PaginatedResultSchema$1,
		ResourceContentsSchema: ResourceContentsSchema$1,
		TextResourceContentsSchema: TextResourceContentsSchema$1,
		BlobResourceContentsSchema: BlobResourceContentsSchema$1,
		RoleSchema: RoleSchema$1,
		AnnotationsSchema: AnnotationsSchema$1,
		ResourceSchema: ResourceSchema$1,
		ResourceTemplateSchema: ResourceTemplateSchema$1,
		ListResourcesRequestSchema: ListResourcesRequestSchema$1,
		ListResourcesResultSchema: ListResourcesResultSchema$1,
		ListResourceTemplatesRequestSchema: ListResourceTemplatesRequestSchema$1,
		ListResourceTemplatesResultSchema: ListResourceTemplatesResultSchema$1,
		ResourceRequestParamsSchema: ResourceRequestParamsSchema$1,
		ReadResourceRequestParamsSchema: ReadResourceRequestParamsSchema$1,
		ReadResourceRequestSchema: ReadResourceRequestSchema$1,
		ReadResourceResultSchema: ReadResourceResultSchema$1,
		ResourceListChangedNotificationSchema: ResourceListChangedNotificationSchema$1,
		SubscribeRequestParamsSchema: SubscribeRequestParamsSchema$1,
		SubscribeRequestSchema: SubscribeRequestSchema$1,
		UnsubscribeRequestParamsSchema: UnsubscribeRequestParamsSchema$1,
		UnsubscribeRequestSchema: UnsubscribeRequestSchema$1,
		ResourceUpdatedNotificationParamsSchema: ResourceUpdatedNotificationParamsSchema$1,
		ResourceUpdatedNotificationSchema: ResourceUpdatedNotificationSchema$1,
		PromptArgumentSchema: PromptArgumentSchema$1,
		PromptSchema: PromptSchema$1,
		ListPromptsRequestSchema: ListPromptsRequestSchema$1,
		ListPromptsResultSchema: ListPromptsResultSchema$1,
		GetPromptRequestParamsSchema: GetPromptRequestParamsSchema$1,
		GetPromptRequestSchema: GetPromptRequestSchema$1,
		TextContentSchema: TextContentSchema$1,
		ImageContentSchema: ImageContentSchema$1,
		AudioContentSchema: AudioContentSchema$1,
		ToolUseContentSchema: ToolUseContentSchema$1,
		EmbeddedResourceSchema: EmbeddedResourceSchema$1,
		ResourceLinkSchema: ResourceLinkSchema$1,
		ContentBlockSchema: ContentBlockSchema$1,
		PromptMessageSchema: PromptMessageSchema$1,
		GetPromptResultSchema: GetPromptResultSchema$1,
		PromptListChangedNotificationSchema: PromptListChangedNotificationSchema$1,
		ToolAnnotationsSchema: ToolAnnotationsSchema$1,
		ToolExecutionSchema: ToolExecutionSchema$1,
		ToolSchema: ToolSchema$1,
		ListToolsRequestSchema: ListToolsRequestSchema$1,
		ListToolsResultSchema: ListToolsResultSchema$1,
		CallToolResultSchema: CallToolResultSchema$1,
		CallToolRequestParamsSchema: CallToolRequestParamsSchema$1,
		CallToolRequestSchema: CallToolRequestSchema$1,
		ToolListChangedNotificationSchema: ToolListChangedNotificationSchema$1,
		LoggingLevelSchema: LoggingLevelSchema$1,
		SetLevelRequestParamsSchema: SetLevelRequestParamsSchema$1,
		SetLevelRequestSchema: SetLevelRequestSchema$1,
		LoggingMessageNotificationParamsSchema: LoggingMessageNotificationParamsSchema$1,
		LoggingMessageNotificationSchema: LoggingMessageNotificationSchema$1,
		ModelHintSchema: ModelHintSchema$1,
		ModelPreferencesSchema: ModelPreferencesSchema$1,
		ToolChoiceSchema: ToolChoiceSchema$1,
		ToolResultContentSchema: ToolResultContentSchema$1,
		SamplingContentSchema: SamplingContentSchema$1,
		SamplingMessageContentBlockSchema: SamplingMessageContentBlockSchema$1,
		SamplingMessageSchema: SamplingMessageSchema$1,
		CreateMessageRequestParamsSchema: CreateMessageRequestParamsSchema$1,
		CreateMessageRequestSchema: CreateMessageRequestSchema$1,
		CreateMessageResultSchema: CreateMessageResultSchema$1,
		CreateMessageResultWithToolsSchema: CreateMessageResultWithToolsSchema$1,
		BooleanSchemaSchema: BooleanSchemaSchema$1,
		StringSchemaSchema: StringSchemaSchema$1,
		NumberSchemaSchema: NumberSchemaSchema$1,
		UntitledSingleSelectEnumSchemaSchema: UntitledSingleSelectEnumSchemaSchema$1,
		TitledSingleSelectEnumSchemaSchema: TitledSingleSelectEnumSchemaSchema$1,
		LegacyTitledEnumSchemaSchema: LegacyTitledEnumSchemaSchema$1,
		SingleSelectEnumSchemaSchema: SingleSelectEnumSchemaSchema$1,
		UntitledMultiSelectEnumSchemaSchema: UntitledMultiSelectEnumSchemaSchema$1,
		TitledMultiSelectEnumSchemaSchema: TitledMultiSelectEnumSchemaSchema$1,
		MultiSelectEnumSchemaSchema: MultiSelectEnumSchemaSchema$1,
		EnumSchemaSchema: EnumSchemaSchema$1,
		PrimitiveSchemaDefinitionSchema: PrimitiveSchemaDefinitionSchema$1,
		ElicitRequestFormParamsSchema: ElicitRequestFormParamsSchema$1,
		ElicitRequestURLParamsSchema: ElicitRequestURLParamsSchema$1,
		ElicitRequestParamsSchema: ElicitRequestParamsSchema$1,
		ElicitRequestSchema: ElicitRequestSchema$1,
		ElicitationCompleteNotificationParamsSchema: ElicitationCompleteNotificationParamsSchema$1,
		ElicitationCompleteNotificationSchema: ElicitationCompleteNotificationSchema$1,
		ElicitResultSchema: ElicitResultSchema$1,
		ResourceTemplateReferenceSchema: ResourceTemplateReferenceSchema$1,
		PromptReferenceSchema: PromptReferenceSchema$1,
		CompleteRequestParamsSchema: CompleteRequestParamsSchema$1,
		CompleteRequestSchema: CompleteRequestSchema$1,
		CompleteResultSchema: CompleteResultSchema$1,
		RootSchema: RootSchema$1,
		ListRootsRequestSchema: ListRootsRequestSchema$1,
		ListRootsResultSchema: ListRootsResultSchema$1,
		RootsListChangedNotificationSchema: RootsListChangedNotificationSchema$1,
		TaskCreationParamsSchema: TaskCreationParamsSchema$1,
		TaskStatusSchema: TaskStatusSchema$1,
		TaskSchema: TaskSchema$1,
		CreateTaskResultSchema: CreateTaskResultSchema$1,
		TaskStatusNotificationParamsSchema: TaskStatusNotificationParamsSchema$1,
		TaskStatusNotificationSchema: TaskStatusNotificationSchema$1,
		GetTaskRequestSchema: GetTaskRequestSchema$1,
		GetTaskResultSchema: GetTaskResultSchema$1,
		GetTaskPayloadRequestSchema: GetTaskPayloadRequestSchema$1,
		GetTaskPayloadResultSchema: GetTaskPayloadResultSchema$1,
		ListTasksRequestSchema: ListTasksRequestSchema$1,
		ListTasksResultSchema: ListTasksResultSchema$1,
		CancelTaskRequestSchema: CancelTaskRequestSchema$1,
		CancelTaskResultSchema: ResultSchema$1.merge(TaskSchema$1),
		ClientRequestSchema: union([
			PingRequestSchema$1,
			InitializeRequestSchema$1,
			CompleteRequestSchema$1,
			SetLevelRequestSchema$1,
			GetPromptRequestSchema$1,
			ListPromptsRequestSchema$1,
			ListResourcesRequestSchema$1,
			ListResourceTemplatesRequestSchema$1,
			ReadResourceRequestSchema$1,
			SubscribeRequestSchema$1,
			UnsubscribeRequestSchema$1,
			CallToolRequestSchema$1,
			ListToolsRequestSchema$1,
			GetTaskRequestSchema$1,
			GetTaskPayloadRequestSchema$1,
			ListTasksRequestSchema$1,
			CancelTaskRequestSchema$1
		]),
		ClientNotificationSchema: union([
			CancelledNotificationSchema$1,
			ProgressNotificationSchema$1,
			InitializedNotificationSchema$1,
			RootsListChangedNotificationSchema$1,
			TaskStatusNotificationSchema$1
		]),
		ClientResultSchema: union([
			EmptyResultSchema$1,
			CreateMessageResultSchema$1,
			CreateMessageResultWithToolsSchema$1,
			ElicitResultSchema$1,
			ListRootsResultSchema$1,
			GetTaskResultSchema$1,
			ListTasksResultSchema$1,
			CreateTaskResultSchema$1
		]),
		ServerRequestSchema: union([
			PingRequestSchema$1,
			CreateMessageRequestSchema$1,
			ElicitRequestSchema$1,
			ListRootsRequestSchema$1,
			GetTaskRequestSchema$1,
			GetTaskPayloadRequestSchema$1,
			ListTasksRequestSchema$1,
			CancelTaskRequestSchema$1
		]),
		ServerNotificationSchema: union([
			CancelledNotificationSchema$1,
			ProgressNotificationSchema$1,
			LoggingMessageNotificationSchema$1,
			ResourceUpdatedNotificationSchema$1,
			ResourceListChangedNotificationSchema$1,
			ToolListChangedNotificationSchema$1,
			PromptListChangedNotificationSchema$1,
			TaskStatusNotificationSchema$1,
			ElicitationCompleteNotificationSchema$1
		]),
		ServerResultSchema: union([
			EmptyResultSchema$1,
			InitializeResultSchema$1,
			CompleteResultSchema$1,
			GetPromptResultSchema$1,
			ListPromptsResultSchema$1,
			ListResourcesResultSchema$1,
			ListResourceTemplatesResultSchema$1,
			ReadResourceResultSchema$1,
			CallToolResultSchema$1,
			ListToolsResultSchema$1,
			GetTaskResultSchema$1,
			ListTasksResultSchema$1,
			CreateTaskResultSchema$1
		]),
		CallToolResultWireSchema: unknown().superRefine((value, ctx) => {
			if (!(typeof value != "object" || value === null || Array.isArray(value) || value.content !== void 0)) {
				for (let key of TOOL_RESULT_FOREIGN_FAMILY_KEYS) if (key in value) {
					ctx.addIssue({
						code: "custom",
						message: `content is required when the body carries '${key}' \u2014 another result family cannot default into an empty tools/call success`
					});
					return;
				}
			}
		}).transform(normalizeContentlessToolResult).pipe(CallToolResultSchema$1)
	};
}
var memo$1;
function buildSchemas2025() {
	return memo$1 ??= build$1();
}
function isNonObjectJsonSchemaRoot(json) {
	return json.type !== "object";
}
var REF_REWRITE_DATA_POSITION_KEYS = /* @__PURE__ */ new Set([
	"const",
	"enum",
	"default",
	"examples"
]), REF_REWRITE_NAME_MAP_KEYS = /* @__PURE__ */ new Set([
	"properties",
	"patternProperties",
	"$defs",
	"definitions",
	"dependentSchemas",
	"dependencies"
]);
function establishesNewBase(id) {
	return id !== void 0 && !(typeof id == "string" && id.startsWith("#"));
}
function wrapOutputSchemaForLegacy(natural) {
	let $schema = typeof natural.$schema == "string" ? natural.$schema : void 0;
	if (establishesNewBase(natural.$id)) return {
		...$schema !== void 0 && { $schema },
		type: "object",
		properties: { result: natural },
		required: ["result"]
	};
	let convertRecursiveRefs = declares2019Dialect(natural.$schema) && natural.$recursiveAnchor !== !0, rewriteRefs = (node, parentIsNameMap) => {
		if (Array.isArray(node)) return node.map((item) => rewriteRefs(item, !1));
		if (node === null || typeof node != "object" || !parentIsNameMap && establishesNewBase(node.$id)) return node;
		let out = {}, convertedRecursion = !1;
		for (let [k, v] of Object.entries(node)) parentIsNameMap ? out[k] = rewriteRefs(v, !1) : (k === "$ref" || k === "$dynamicRef") && typeof v == "string" ? out[k] = v === "#" ? "#/properties/result" : v.startsWith("#/") ? `#/properties/result${v.slice(1)}` : v : k === "$recursiveRef" && v === "#" && convertRecursiveRefs ? convertedRecursion = !0 : REF_REWRITE_DATA_POSITION_KEYS.has(k) ? out[k] = v : REF_REWRITE_NAME_MAP_KEYS.has(k) ? out[k] = rewriteRefs(v, !0) : out[k] = rewriteRefs(v, !1);
		return convertedRecursion && ("$ref" in out ? out.allOf = [...Array.isArray(out.allOf) ? out.allOf : [], { $ref: "#/properties/result" }] : out.$ref = "#/properties/result"), out;
	};
	return {
		...$schema !== void 0 && { $schema },
		type: "object",
		properties: { result: rewriteRefs(natural, !1) },
		required: ["result"]
	};
}
var requestMethodKeys$1 = {
	ping: null,
	initialize: null,
	"completion/complete": null,
	"logging/setLevel": null,
	"prompts/get": null,
	"prompts/list": null,
	"resources/list": null,
	"resources/templates/list": null,
	"resources/read": null,
	"resources/subscribe": null,
	"resources/unsubscribe": null,
	"tools/call": null,
	"tools/list": null,
	"tasks/get": null,
	"tasks/result": null,
	"tasks/list": null,
	"tasks/cancel": null,
	"sampling/createMessage": null,
	"elicitation/create": null,
	"roots/list": null
}, notificationMethodKeys$1 = {
	"notifications/cancelled": null,
	"notifications/progress": null,
	"notifications/initialized": null,
	"notifications/roots/list_changed": null,
	"notifications/tasks/status": null,
	"notifications/message": null,
	"notifications/resources/updated": null,
	"notifications/resources/list_changed": null,
	"notifications/tools/list_changed": null,
	"notifications/prompts/list_changed": null,
	"notifications/elicitation/complete": null
}, resultMethodKeys = {
	ping: null,
	initialize: null,
	"completion/complete": null,
	"logging/setLevel": null,
	"prompts/get": null,
	"prompts/list": null,
	"resources/list": null,
	"resources/templates/list": null,
	"resources/read": null,
	"resources/subscribe": null,
	"resources/unsubscribe": null,
	"tools/call": null,
	"tools/list": null,
	"sampling/createMessage": null,
	"elicitation/create": null,
	"roots/list": null
}, maps$1;
function registryMaps() {
	if (maps$1) return maps$1;
	let s = buildSchemas2025();
	return maps$1 = {
		requestSchemas: {
			ping: s.PingRequestSchema,
			initialize: s.InitializeRequestSchema,
			"completion/complete": s.CompleteRequestSchema,
			"logging/setLevel": s.SetLevelRequestSchema,
			"prompts/get": s.GetPromptRequestSchema,
			"prompts/list": s.ListPromptsRequestSchema,
			"resources/list": s.ListResourcesRequestSchema,
			"resources/templates/list": s.ListResourceTemplatesRequestSchema,
			"resources/read": s.ReadResourceRequestSchema,
			"resources/subscribe": s.SubscribeRequestSchema,
			"resources/unsubscribe": s.UnsubscribeRequestSchema,
			"tools/call": s.CallToolRequestSchema,
			"tools/list": s.ListToolsRequestSchema,
			"tasks/get": s.GetTaskRequestSchema,
			"tasks/result": s.GetTaskPayloadRequestSchema,
			"tasks/list": s.ListTasksRequestSchema,
			"tasks/cancel": s.CancelTaskRequestSchema,
			"sampling/createMessage": s.CreateMessageRequestSchema,
			"elicitation/create": s.ElicitRequestSchema,
			"roots/list": s.ListRootsRequestSchema
		},
		notificationSchemas: {
			"notifications/cancelled": s.CancelledNotificationSchema,
			"notifications/progress": s.ProgressNotificationSchema,
			"notifications/initialized": s.InitializedNotificationSchema,
			"notifications/roots/list_changed": s.RootsListChangedNotificationSchema,
			"notifications/tasks/status": s.TaskStatusNotificationSchema,
			"notifications/message": s.LoggingMessageNotificationSchema,
			"notifications/resources/updated": s.ResourceUpdatedNotificationSchema,
			"notifications/resources/list_changed": s.ResourceListChangedNotificationSchema,
			"notifications/tools/list_changed": s.ToolListChangedNotificationSchema,
			"notifications/prompts/list_changed": s.PromptListChangedNotificationSchema,
			"notifications/elicitation/complete": s.ElicitationCompleteNotificationSchema
		},
		resultSchemas: {
			ping: s.EmptyResultSchema,
			initialize: s.InitializeResultSchema,
			"completion/complete": s.CompleteResultSchema,
			"logging/setLevel": s.EmptyResultSchema,
			"prompts/get": s.GetPromptResultSchema,
			"prompts/list": s.ListPromptsResultSchema,
			"resources/list": s.ListResourcesResultSchema,
			"resources/templates/list": s.ListResourceTemplatesResultSchema,
			"resources/read": s.ReadResourceResultSchema,
			"resources/subscribe": s.EmptyResultSchema,
			"resources/unsubscribe": s.EmptyResultSchema,
			"tools/call": s.CallToolResultWireSchema,
			"tools/list": s.ListToolsResultSchema,
			"sampling/createMessage": s.CreateMessageResultWithToolsSchema,
			"elicitation/create": s.ElicitResultSchema,
			"roots/list": s.ListRootsResultSchema
		}
	}, maps$1;
}
function warmRegistryMaps2025() {
	registryMaps();
}
function hasRequestMethod2025(method) {
	return Object.prototype.hasOwnProperty.call(requestMethodKeys$1, method);
}
function hasNotificationMethod2025(method) {
	return Object.prototype.hasOwnProperty.call(notificationMethodKeys$1, method);
}
function hasResultMethod(method) {
	return Object.prototype.hasOwnProperty.call(resultMethodKeys, method);
}
function getResultSchema(method) {
	return hasResultMethod(method) ? registryMaps().resultSchemas[method] : void 0;
}
function getRequestSchema(method) {
	return hasRequestMethod2025(method) ? registryMaps().requestSchemas[method] : void 0;
}
function getNotificationSchema(method) {
	return hasNotificationMethod2025(method) ? registryMaps().notificationSchemas[method] : void 0;
}
var rev2025RequestMethods = Object.keys(requestMethodKeys$1), rev2025NotificationMethods = Object.keys(notificationMethodKeys$1);
function isPlainObject$6(value) {
	return value !== null && typeof value == "object" && !Array.isArray(value);
}
function triState$1(schema, raw) {
	if (schema === void 0) return {
		ok: !1,
		reason: "not-in-era"
	};
	let parsed = schema.safeParse(raw);
	return parsed.success ? {
		ok: !0,
		value: parsed.data
	} : {
		ok: !1,
		reason: "invalid",
		message: String(parsed.error)
	};
}
var NOT_IN_ERA$1 = {
	ok: !1,
	reason: "not-in-era"
};
function toolNeedsLegacyWrap(t) {
	return isPlainObject$6(t) && isPlainObject$6(t.outputSchema) && isNonObjectJsonSchemaRoot(t.outputSchema);
}
var rev2025Codec = {
	era: "2025-11-25",
	hasRequestMethod: hasRequestMethod2025,
	hasNotificationMethod: hasNotificationMethod2025,
	validateRequest: (method, raw) => triState$1(getRequestSchema(method), raw),
	validateResult: (method, raw) => triState$1(getResultSchema(method), raw),
	validateNotification: (method, raw) => triState$1(getNotificationSchema(method), raw),
	hasInputRequestMethod: () => !1,
	validateInputRequest: () => NOT_IN_ERA$1,
	validateInputResponse: () => NOT_IN_ERA$1,
	samplingResultVariant: ((hasTools, raw) => {
		let s = buildSchemas2025();
		return triState$1(hasTools ? s.CreateMessageResultWithToolsSchema : s.CreateMessageResultSchema, raw);
	}),
	outboundEnvelope: (_material) => {
	},
	validateEnvelopeMeta: (_meta) => [],
	projectCallToolResult(result, advertisedOutputSchema) {
		let withText = appendTextFallbackForNonObject(result), sc = withText.structuredContent;
		if (sc === void 0) return withText;
		let valueIsNonObject = typeof sc != "object" || sc === null || Array.isArray(sc), schemaWrapped = advertisedOutputSchema !== void 0 && isNonObjectJsonSchemaRoot(advertisedOutputSchema);
		return !valueIsNonObject && !schemaWrapped ? withText : {
			...withText,
			structuredContent: { result: sc }
		};
	},
	decodeResult(_method, raw) {
		if (isPlainObject$6(raw) && "resultType" in raw) {
			let stripped = { ...raw };
			return delete stripped.resultType, {
				kind: "complete",
				result: stripped
			};
		}
		return {
			kind: "complete",
			result: raw
		};
	},
	encodeResult(method, result) {
		if (method !== "tools/list") return result;
		let tools = result.tools;
		return !Array.isArray(tools) || !tools.some((t) => toolNeedsLegacyWrap(t)) ? result : {
			...result,
			tools: tools.map((t) => toolNeedsLegacyWrap(t) ? {
				...t,
				outputSchema: wrapOutputSchemaForLegacy(t.outputSchema)
			} : t)
		};
	},
	encodeErrorCode: (code) => code === -32002 ? -32602 : code,
	checkInboundEnvelope: (_material) => {
	}
};
function build() {
	let JSONValueSchema$1 = lazy(() => union([
		string(),
		number(),
		boolean(),
		_null(),
		record(string(), JSONValueSchema$1),
		array(JSONValueSchema$1)
	])), JSONObjectSchema$1 = record(string(), JSONValueSchema$1), ProgressTokenSchema$1 = union([string(), number().int()]), CursorSchema$1 = string(), RequestIdSchema$1 = union([string(), number().int()]), RoleSchema$1 = _enum(["user", "assistant"]), LoggingLevelSchema$1 = _enum([
		"debug",
		"info",
		"notice",
		"warning",
		"error",
		"critical",
		"alert",
		"emergency"
	]), Base64Schema = string().refine((val) => {
		try {
			return atob(val), !0;
		} catch {
			return !1;
		}
	}, { message: "Invalid Base64 string" }), TaskMetadataSchema$1 = object({ ttl: number().optional() }), RelatedTaskMetadataSchema$1 = object({ taskId: string() }), RequestMetaSchema$1 = looseObject({
		progressToken: ProgressTokenSchema$1.optional(),
		"io.modelcontextprotocol/related-task": RelatedTaskMetadataSchema$1.optional()
	}), BaseRequestParamsSchema$1 = object({ _meta: RequestMetaSchema$1.optional() }), TaskAugmentedRequestParamsSchema$1 = BaseRequestParamsSchema$1.extend({ task: TaskMetadataSchema$1.optional() }), NotificationsParamsSchema$1 = object({ _meta: RequestMetaSchema$1.optional() }), NotificationSchema$1 = object({
		method: string(),
		params: NotificationsParamsSchema$1.loose().optional()
	}), IconSchema$1 = object({
		src: string(),
		mimeType: string().optional(),
		sizes: array(string()).optional(),
		theme: _enum(["light", "dark"]).optional()
	}), IconsSchema$1 = object({ icons: array(IconSchema$1).optional() }), BaseMetadataSchema$1 = object({
		name: string(),
		title: string().optional()
	}), ImplementationSchema$1 = BaseMetadataSchema$1.extend({
		...BaseMetadataSchema$1.shape,
		...IconsSchema$1.shape,
		version: string(),
		websiteUrl: string().optional(),
		description: string().optional()
	}), FormElicitationCapabilitySchema = intersection(object({ applyDefaults: boolean().optional() }), JSONObjectSchema$1), ElicitationCapabilitySchema = preprocess((value) => value && typeof value == "object" && !Array.isArray(value) && Object.keys(value).length === 0 ? { form: {} } : value, intersection(object({
		form: FormElicitationCapabilitySchema.optional(),
		url: JSONObjectSchema$1.optional()
	}), JSONObjectSchema$1.optional())), ClientTasksCapabilitySchema$1 = looseObject({
		list: JSONObjectSchema$1.optional(),
		cancel: JSONObjectSchema$1.optional(),
		requests: looseObject({
			sampling: looseObject({ createMessage: JSONObjectSchema$1.optional() }).optional(),
			elicitation: looseObject({ create: JSONObjectSchema$1.optional() }).optional()
		}).optional()
	}), ServerTasksCapabilitySchema$1 = looseObject({
		list: JSONObjectSchema$1.optional(),
		cancel: JSONObjectSchema$1.optional(),
		requests: looseObject({ tools: looseObject({ call: JSONObjectSchema$1.optional() }).optional() }).optional()
	}), ClientCapabilitiesSchema$1 = object({
		experimental: record(string(), JSONObjectSchema$1).optional(),
		sampling: object({
			context: JSONObjectSchema$1.optional(),
			tools: JSONObjectSchema$1.optional()
		}).optional(),
		elicitation: ElicitationCapabilitySchema.optional(),
		roots: object({ listChanged: boolean().optional() }).optional(),
		tasks: ClientTasksCapabilitySchema$1.optional(),
		extensions: record(string(), JSONObjectSchema$1).optional()
	}), ServerCapabilitiesSchema$1 = object({
		experimental: record(string(), JSONObjectSchema$1).optional(),
		logging: JSONObjectSchema$1.optional(),
		completions: JSONObjectSchema$1.optional(),
		prompts: object({ listChanged: boolean().optional() }).optional(),
		resources: object({
			subscribe: boolean().optional(),
			listChanged: boolean().optional()
		}).optional(),
		tools: object({ listChanged: boolean().optional() }).optional(),
		tasks: ServerTasksCapabilitySchema$1.optional(),
		extensions: record(string(), JSONObjectSchema$1).optional()
	}), ProgressSchema$1 = object({
		progress: number(),
		total: optional(number()),
		message: optional(string())
	}), ProgressNotificationParamsSchema$1 = object({
		...NotificationsParamsSchema$1.shape,
		...ProgressSchema$1.shape,
		progressToken: ProgressTokenSchema$1
	}), ProgressNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/progress"),
		params: ProgressNotificationParamsSchema$1
	}), LoggingMessageNotificationParamsSchema$1 = NotificationsParamsSchema$1.extend({
		level: LoggingLevelSchema$1,
		logger: string().optional(),
		data: unknown()
	}), LoggingMessageNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/message"),
		params: LoggingMessageNotificationParamsSchema$1
	}), ResourceContentsSchema$1 = object({
		uri: string(),
		mimeType: optional(string()),
		_meta: record(string(), unknown()).optional()
	}), TextResourceContentsSchema$1 = ResourceContentsSchema$1.extend({ text: string() }), BlobResourceContentsSchema$1 = ResourceContentsSchema$1.extend({ blob: Base64Schema }), AnnotationsSchema$1 = object({
		audience: array(RoleSchema$1).optional(),
		priority: number().min(0).max(1).optional(),
		lastModified: iso_exports.datetime({ offset: !0 }).optional()
	}), ResourceSchema$1 = object({
		...BaseMetadataSchema$1.shape,
		...IconsSchema$1.shape,
		uri: string(),
		description: optional(string()),
		mimeType: optional(string()),
		size: optional(number()),
		annotations: AnnotationsSchema$1.optional(),
		_meta: optional(looseObject({}))
	}), ResourceTemplateSchema$1 = object({
		...BaseMetadataSchema$1.shape,
		...IconsSchema$1.shape,
		uriTemplate: string(),
		description: optional(string()),
		mimeType: optional(string()),
		annotations: AnnotationsSchema$1.optional(),
		_meta: optional(looseObject({}))
	}), ResourceListChangedNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/resources/list_changed"),
		params: NotificationsParamsSchema$1.optional()
	}), ResourceUpdatedNotificationParamsSchema$1 = NotificationsParamsSchema$1.extend({ uri: string() }), ResourceUpdatedNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/resources/updated"),
		params: ResourceUpdatedNotificationParamsSchema$1
	}), PromptArgumentSchema$1 = object({
		name: string(),
		description: optional(string()),
		required: optional(boolean())
	}), PromptSchema$1 = object({
		...BaseMetadataSchema$1.shape,
		...IconsSchema$1.shape,
		description: optional(string()),
		arguments: optional(array(PromptArgumentSchema$1)),
		_meta: optional(looseObject({}))
	}), PromptListChangedNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/prompts/list_changed"),
		params: NotificationsParamsSchema$1.optional()
	}), TextContentSchema$1 = object({
		type: literal("text"),
		text: string(),
		annotations: AnnotationsSchema$1.optional(),
		_meta: record(string(), unknown()).optional()
	}), ImageContentSchema$1 = object({
		type: literal("image"),
		data: Base64Schema,
		mimeType: string(),
		annotations: AnnotationsSchema$1.optional(),
		_meta: record(string(), unknown()).optional()
	}), AudioContentSchema$1 = object({
		type: literal("audio"),
		data: Base64Schema,
		mimeType: string(),
		annotations: AnnotationsSchema$1.optional(),
		_meta: record(string(), unknown()).optional()
	}), ToolUseContentSchema$1 = object({
		type: literal("tool_use"),
		name: string(),
		id: string(),
		input: record(string(), unknown()),
		_meta: record(string(), unknown()).optional()
	}), EmbeddedResourceSchema$1 = object({
		type: literal("resource"),
		resource: union([TextResourceContentsSchema$1, BlobResourceContentsSchema$1]),
		annotations: AnnotationsSchema$1.optional(),
		_meta: record(string(), unknown()).optional()
	}), ResourceLinkSchema$1 = ResourceSchema$1.extend({ type: literal("resource_link") }), ContentBlockSchema$1 = union([
		TextContentSchema$1,
		ImageContentSchema$1,
		AudioContentSchema$1,
		ResourceLinkSchema$1,
		EmbeddedResourceSchema$1
	]), PromptMessageSchema$1 = object({
		role: RoleSchema$1,
		content: ContentBlockSchema$1
	}), ToolAnnotationsSchema$1 = object({
		title: string().optional(),
		readOnlyHint: boolean().optional(),
		destructiveHint: boolean().optional(),
		idempotentHint: boolean().optional(),
		openWorldHint: boolean().optional()
	}), ToolListChangedNotificationSchema$1 = NotificationSchema$1.extend({
		method: literal("notifications/tools/list_changed"),
		params: NotificationsParamsSchema$1.optional()
	}), ModelHintSchema$1 = object({ name: string().optional() }), ModelPreferencesSchema$1 = object({
		hints: array(ModelHintSchema$1).optional(),
		costPriority: number().min(0).max(1).optional(),
		speedPriority: number().min(0).max(1).optional(),
		intelligencePriority: number().min(0).max(1).optional()
	}), ToolChoiceSchema$1 = object({ mode: _enum([
		"auto",
		"required",
		"none"
	]).optional() }), BooleanSchemaSchema$1 = object({
		type: literal("boolean"),
		title: string().optional(),
		description: string().optional(),
		default: boolean().optional()
	}), StringSchemaSchema$1 = object({
		type: literal("string"),
		title: string().optional(),
		description: string().optional(),
		minLength: number().optional(),
		maxLength: number().optional(),
		format: _enum([
			"email",
			"uri",
			"date",
			"date-time"
		]).optional(),
		default: string().optional()
	}), NumberSchemaSchema$1 = object({
		type: _enum(["number", "integer"]),
		title: string().optional(),
		description: string().optional(),
		minimum: number().optional(),
		maximum: number().optional(),
		default: number().optional()
	}), UntitledSingleSelectEnumSchemaSchema$1 = object({
		type: literal("string"),
		title: string().optional(),
		description: string().optional(),
		enum: array(string()),
		default: string().optional()
	}), TitledSingleSelectEnumSchemaSchema$1 = object({
		type: literal("string"),
		title: string().optional(),
		description: string().optional(),
		oneOf: array(object({
			const: string(),
			title: string()
		})),
		default: string().optional()
	}), LegacyTitledEnumSchemaSchema$1 = object({
		type: literal("string"),
		title: string().optional(),
		description: string().optional(),
		enum: array(string()),
		enumNames: array(string()).optional(),
		default: string().optional()
	}), SingleSelectEnumSchemaSchema$1 = union([UntitledSingleSelectEnumSchemaSchema$1, TitledSingleSelectEnumSchemaSchema$1]), UntitledMultiSelectEnumSchemaSchema$1 = object({
		type: literal("array"),
		title: string().optional(),
		description: string().optional(),
		minItems: number().optional(),
		maxItems: number().optional(),
		items: object({
			type: literal("string"),
			enum: array(string())
		}),
		default: array(string()).optional()
	}), TitledMultiSelectEnumSchemaSchema$1 = object({
		type: literal("array"),
		title: string().optional(),
		description: string().optional(),
		minItems: number().optional(),
		maxItems: number().optional(),
		items: object({ anyOf: array(object({
			const: string(),
			title: string()
		})) }),
		default: array(string()).optional()
	}), MultiSelectEnumSchemaSchema$1 = union([UntitledMultiSelectEnumSchemaSchema$1, TitledMultiSelectEnumSchemaSchema$1]), EnumSchemaSchema$1 = union([
		LegacyTitledEnumSchemaSchema$1,
		SingleSelectEnumSchemaSchema$1,
		MultiSelectEnumSchemaSchema$1
	]), PrimitiveSchemaDefinitionSchema$1 = union([
		EnumSchemaSchema$1,
		BooleanSchemaSchema$1,
		StringSchemaSchema$1,
		NumberSchemaSchema$1
	]), ElicitRequestFormParamsSchema$1 = TaskAugmentedRequestParamsSchema$1.extend({
		mode: literal("form").optional(),
		message: string(),
		requestedSchema: object({
			type: literal("object"),
			properties: record(string(), PrimitiveSchemaDefinitionSchema$1),
			required: array(string()).optional()
		}).catchall(unknown())
	}), ResourceTemplateReferenceSchema$1 = object({
		type: literal("ref/resource"),
		uri: string()
	}), PromptReferenceSchema$1 = object({
		type: literal("ref/prompt"),
		name: string()
	}), RootSchema$1 = object({
		uri: string().startsWith("file://"),
		name: string().optional(),
		_meta: record(string(), unknown()).optional()
	}), sharedClientCapabilityShape = ClientCapabilitiesSchema$1.shape, ClientCapabilities2026Schema = object({
		experimental: sharedClientCapabilityShape.experimental,
		sampling: sharedClientCapabilityShape.sampling,
		elicitation: sharedClientCapabilityShape.elicitation,
		roots: sharedClientCapabilityShape.roots,
		extensions: sharedClientCapabilityShape.extensions
	}), sharedServerCapabilityShape = ServerCapabilitiesSchema$1.shape, ServerCapabilities2026Schema = object({
		experimental: sharedServerCapabilityShape.experimental,
		logging: sharedServerCapabilityShape.logging,
		completions: sharedServerCapabilityShape.completions,
		prompts: sharedServerCapabilityShape.prompts,
		resources: sharedServerCapabilityShape.resources,
		tools: sharedServerCapabilityShape.tools,
		extensions: sharedServerCapabilityShape.extensions
	}), RequestMetaEnvelopeSchema = looseObject({
		progressToken: ProgressTokenSchema$1.optional(),
		[PROTOCOL_VERSION_META_KEY]: string(),
		[CLIENT_INFO_META_KEY]: ImplementationSchema$1.optional(),
		[CLIENT_CAPABILITIES_META_KEY]: ClientCapabilities2026Schema,
		[LOG_LEVEL_META_KEY]: LoggingLevelSchema$1.optional()
	}), ToolSchema$1 = object({
		...BaseMetadataSchema$1.shape,
		...IconsSchema$1.shape,
		description: string().optional(),
		inputSchema: looseObject({
			$schema: string().optional(),
			type: literal("object")
		}),
		outputSchema: looseObject({ $schema: string().optional() }).optional(),
		annotations: ToolAnnotationsSchema$1.optional(),
		_meta: record(string(), unknown()).optional()
	}), ToolResultContentSchema$1 = object({
		type: literal("tool_result"),
		toolUseId: string(),
		content: array(ContentBlockSchema$1),
		structuredContent: unknown().optional(),
		isError: boolean().optional(),
		_meta: record(string(), unknown()).optional()
	}), SamplingMessageContentBlockSchema$1 = union([
		TextContentSchema$1,
		ImageContentSchema$1,
		AudioContentSchema$1,
		ToolUseContentSchema$1,
		ToolResultContentSchema$1
	]), SamplingMessageSchema$1 = object({
		role: RoleSchema$1,
		content: union([SamplingMessageContentBlockSchema$1, array(SamplingMessageContentBlockSchema$1)]),
		_meta: record(string(), unknown()).optional()
	}), ResultTypeSchema = string(), ResultMetaSchema = looseObject({ [SERVER_INFO_META_KEY]: ImplementationSchema$1.optional().catch(void 0) }), wireMeta = ResultMetaSchema.optional();
	function wireResult(shape) {
		return looseObject({
			_meta: wireMeta,
			resultType: ResultTypeSchema.default("complete"),
			...shape
		});
	}
	let ResultSchema$1 = wireResult({}), PaginatedResultSchema$1 = wireResult({ nextCursor: CursorSchema$1.optional() }), CallToolResultSchema$1 = wireResult({
		content: array(ContentBlockSchema$1),
		structuredContent: unknown().optional(),
		isError: boolean().optional()
	}), ListToolsResultSchema$1 = wireResult({
		ttlMs: number().int().min(0),
		cacheScope: _enum(["public", "private"]),
		tools: array(ToolSchema$1),
		nextCursor: CursorSchema$1.optional()
	}), ListPromptsResultSchema$1 = wireResult({
		ttlMs: number().int().min(0),
		cacheScope: _enum(["public", "private"]),
		prompts: array(PromptSchema$1),
		nextCursor: CursorSchema$1.optional()
	}), GetPromptResultSchema$1 = wireResult({
		description: string().optional(),
		messages: array(PromptMessageSchema$1)
	}), ListResourcesResultSchema$1 = wireResult({
		ttlMs: number().int().min(0),
		cacheScope: _enum(["public", "private"]),
		resources: array(ResourceSchema$1),
		nextCursor: CursorSchema$1.optional()
	}), ListResourceTemplatesResultSchema$1 = wireResult({
		ttlMs: number().int().min(0),
		cacheScope: _enum(["public", "private"]),
		resourceTemplates: array(ResourceTemplateSchema$1),
		nextCursor: CursorSchema$1.optional()
	}), ReadResourceResultSchema$1 = wireResult({
		ttlMs: number().int().min(0),
		cacheScope: _enum(["public", "private"]),
		contents: array(union([TextResourceContentsSchema$1, BlobResourceContentsSchema$1]))
	}), CompleteResultSchema$1 = wireResult({ completion: object({
		values: array(string()).max(100),
		total: number().int().optional(),
		hasMore: boolean().optional()
	}).loose() }), CacheableResultSchema = wireResult({
		ttlMs: number().int().min(0),
		cacheScope: _enum(["public", "private"])
	}), DiscoverResultSchema$1 = wireResult({
		ttlMs: number().int().min(0).catch(0),
		cacheScope: _enum(["public", "private"]).catch("private"),
		supportedVersions: array(string()),
		capabilities: ServerCapabilities2026Schema,
		instructions: string().optional()
	}), CreateMessageRequestParamsSchema$1 = object({
		messages: array(SamplingMessageSchema$1),
		modelPreferences: ModelPreferencesSchema$1.optional(),
		systemPrompt: string().optional(),
		includeContext: _enum([
			"none",
			"thisServer",
			"allServers"
		]).optional(),
		temperature: number().optional(),
		maxTokens: number().int(),
		stopSequences: array(string()).optional(),
		metadata: JSONObjectSchema$1.optional(),
		tools: array(ToolSchema$1).optional(),
		toolChoice: ToolChoiceSchema$1.optional()
	}), CreateMessageRequestSchema$1 = object({
		method: literal("sampling/createMessage"),
		params: CreateMessageRequestParamsSchema$1
	}), ListRootsRequestSchema$1 = object({
		method: literal("roots/list"),
		params: object({ _meta: record(string(), unknown()).optional() }).optional()
	}), CreateMessageResultSchema$1 = object({
		...SamplingMessageSchema$1.shape,
		model: string(),
		stopReason: string().optional()
	}), ListRootsResultSchema$1 = object({ roots: array(RootSchema$1) }), ElicitResultSchema$1 = object({
		action: _enum([
			"accept",
			"decline",
			"cancel"
		]),
		content: record(string(), union([
			string(),
			number(),
			boolean(),
			array(string())
		])).optional()
	}), ElicitRequestURLParamsSchema$1 = object({
		mode: literal("url"),
		message: string(),
		url: string().url()
	}), ElicitRequestParamsSchema$1 = union([ElicitRequestFormParamsSchema$1, ElicitRequestURLParamsSchema$1]), ElicitRequestSchema$1 = object({
		method: literal("elicitation/create"),
		params: ElicitRequestParamsSchema$1
	}), InputRequestSchema = union([
		CreateMessageRequestSchema$1,
		ListRootsRequestSchema$1,
		ElicitRequestSchema$1
	]), InputResponseSchema = union([
		CreateMessageResultSchema$1,
		ListRootsResultSchema$1,
		ElicitResultSchema$1
	]), InputRequestsSchema = record(string(), InputRequestSchema), InputResponsesSchema = record(string(), InputResponseSchema), InputRequiredResultSchema = wireResult({
		inputRequests: InputRequestsSchema.optional(),
		requestState: string().optional()
	}), retryParamsShape = {
		inputResponses: InputResponsesSchema.optional(),
		requestState: string().optional()
	}, InputResponseRequestParamsSchema = object({
		_meta: RequestMetaEnvelopeSchema,
		...retryParamsShape
	}), DispatchRequestMetaSchema = looseObject({ progressToken: ProgressTokenSchema$1.optional() });
	function wireRequest(method, paramsShape) {
		return object({
			method: literal(method),
			params: object({
				_meta: RequestMetaEnvelopeSchema,
				...paramsShape
			})
		});
	}
	function dispatchRequest(method, paramsShape) {
		return object({
			method: literal(method),
			params: object({
				_meta: DispatchRequestMetaSchema.optional(),
				...paramsShape
			}).optional()
		});
	}
	let callToolParamsShape = {
		name: string(),
		arguments: record(string(), unknown()).optional(),
		...retryParamsShape
	}, paginatedParamsShape = { cursor: CursorSchema$1.optional() }, CallToolRequestSchema$1 = wireRequest("tools/call", callToolParamsShape), ListToolsRequestSchema$1 = wireRequest("tools/list", paginatedParamsShape), ListPromptsRequestSchema$1 = wireRequest("prompts/list", paginatedParamsShape), GetPromptRequestSchema$1 = wireRequest("prompts/get", {
		name: string(),
		arguments: record(string(), string()).optional(),
		...retryParamsShape
	}), ListResourcesRequestSchema$1 = wireRequest("resources/list", paginatedParamsShape), ListResourceTemplatesRequestSchema$1 = wireRequest("resources/templates/list", paginatedParamsShape), ReadResourceRequestSchema$1 = wireRequest("resources/read", {
		uri: string(),
		...retryParamsShape
	}), completeParamsShape = {
		ref: union([PromptReferenceSchema$1, ResourceTemplateReferenceSchema$1]),
		argument: object({
			name: string(),
			value: string()
		}),
		context: object({ arguments: record(string(), string()).optional() }).optional()
	}, CompleteRequestSchema$1 = wireRequest("completion/complete", completeParamsShape), DiscoverRequestSchema$1 = wireRequest("server/discover", {}), SubscriptionFilterSchema$1 = object({
		toolsListChanged: boolean().optional(),
		promptsListChanged: boolean().optional(),
		resourcesListChanged: boolean().optional(),
		resourceSubscriptions: array(string()).optional()
	}), subscriptionsListenParamsShape = { notifications: SubscriptionFilterSchema$1 }, SubscriptionsListenRequestSchema$1 = wireRequest("subscriptions/listen", subscriptionsListenParamsShape), SubscriptionsListenResultMetaSchema$1 = ResultMetaSchema.extend({ "io.modelcontextprotocol/subscriptionId": RequestIdSchema$1 }), SubscriptionsListenResultSchema$1 = looseObject({
		_meta: SubscriptionsListenResultMetaSchema$1,
		resultType: ResultTypeSchema.default("complete")
	}), dispatchRequestSchemas = {
		"tools/call": dispatchRequest("tools/call", callToolParamsShape),
		"tools/list": dispatchRequest("tools/list", paginatedParamsShape),
		"prompts/get": dispatchRequest("prompts/get", {
			name: string(),
			arguments: record(string(), string()).optional()
		}),
		"prompts/list": dispatchRequest("prompts/list", paginatedParamsShape),
		"resources/list": dispatchRequest("resources/list", paginatedParamsShape),
		"resources/templates/list": dispatchRequest("resources/templates/list", paginatedParamsShape),
		"resources/read": dispatchRequest("resources/read", { uri: string() }),
		"completion/complete": dispatchRequest("completion/complete", completeParamsShape),
		"server/discover": dispatchRequest("server/discover", {}),
		"subscriptions/listen": dispatchRequest("subscriptions/listen", subscriptionsListenParamsShape)
	};
	function liftedResult(shape) {
		return looseObject({
			_meta: wireMeta,
			...shape
		});
	}
	let dispatchResultSchemas = {
		"tools/call": liftedResult({
			content: array(ContentBlockSchema$1),
			structuredContent: unknown().optional(),
			isError: boolean().optional()
		}),
		"tools/list": liftedResult({
			ttlMs: number().int().min(0),
			cacheScope: _enum(["public", "private"]),
			tools: array(ToolSchema$1),
			nextCursor: CursorSchema$1.optional()
		}),
		"prompts/get": liftedResult({
			description: string().optional(),
			messages: array(PromptMessageSchema$1)
		}),
		"prompts/list": liftedResult({
			ttlMs: number().int().min(0),
			cacheScope: _enum(["public", "private"]),
			prompts: array(PromptSchema$1),
			nextCursor: CursorSchema$1.optional()
		}),
		"resources/list": liftedResult({
			ttlMs: number().int().min(0),
			cacheScope: _enum(["public", "private"]),
			resources: array(ResourceSchema$1),
			nextCursor: CursorSchema$1.optional()
		}),
		"resources/templates/list": liftedResult({
			ttlMs: number().int().min(0),
			cacheScope: _enum(["public", "private"]),
			resourceTemplates: array(ResourceTemplateSchema$1),
			nextCursor: CursorSchema$1.optional()
		}),
		"resources/read": liftedResult({
			ttlMs: number().int().min(0),
			cacheScope: _enum(["public", "private"]),
			contents: array(union([TextResourceContentsSchema$1, BlobResourceContentsSchema$1]))
		}),
		"completion/complete": liftedResult({ completion: object({
			values: array(string()).max(100),
			total: number().int().optional(),
			hasMore: boolean().optional()
		}).loose() }),
		"server/discover": liftedResult({
			ttlMs: number().int().min(0).catch(0),
			cacheScope: _enum(["public", "private"]).catch("private"),
			supportedVersions: array(string()),
			capabilities: ServerCapabilities2026Schema,
			instructions: string().optional()
		}),
		"subscriptions/listen": liftedResult({})
	}, NotificationMetaSchema = looseObject({ "io.modelcontextprotocol/subscriptionId": RequestIdSchema$1.optional() }), SubscriptionsAcknowledgedNotificationSchema$1 = object({
		method: literal("notifications/subscriptions/acknowledged"),
		params: object({
			_meta: NotificationMetaSchema.optional(),
			notifications: SubscriptionFilterSchema$1
		})
	}), CancelledNotificationParamsSchema$1 = object({
		_meta: NotificationMetaSchema.optional(),
		requestId: RequestIdSchema$1,
		reason: string().optional()
	}), CancelledNotificationSchema$1 = object({
		method: literal("notifications/cancelled"),
		params: CancelledNotificationParamsSchema$1
	}), notificationSchemas2026 = {
		"notifications/cancelled": CancelledNotificationSchema$1,
		"notifications/progress": ProgressNotificationSchema$1,
		"notifications/message": LoggingMessageNotificationSchema$1,
		"notifications/resources/updated": ResourceUpdatedNotificationSchema$1,
		"notifications/resources/list_changed": ResourceListChangedNotificationSchema$1,
		"notifications/tools/list_changed": ToolListChangedNotificationSchema$1,
		"notifications/prompts/list_changed": PromptListChangedNotificationSchema$1,
		"notifications/subscriptions/acknowledged": SubscriptionsAcknowledgedNotificationSchema$1
	}, wireResultResponse = (result) => object({
		jsonrpc: literal("2.0"),
		id: union([string(), number().int()]),
		result
	}).strict();
	return {
		JSONValueSchema: JSONValueSchema$1,
		JSONObjectSchema: JSONObjectSchema$1,
		ProgressTokenSchema: ProgressTokenSchema$1,
		CursorSchema: CursorSchema$1,
		RequestIdSchema: RequestIdSchema$1,
		RoleSchema: RoleSchema$1,
		LoggingLevelSchema: LoggingLevelSchema$1,
		TaskMetadataSchema: TaskMetadataSchema$1,
		RelatedTaskMetadataSchema: RelatedTaskMetadataSchema$1,
		RequestMetaSchema: RequestMetaSchema$1,
		BaseRequestParamsSchema: BaseRequestParamsSchema$1,
		TaskAugmentedRequestParamsSchema: TaskAugmentedRequestParamsSchema$1,
		NotificationsParamsSchema: NotificationsParamsSchema$1,
		NotificationSchema: NotificationSchema$1,
		IconSchema: IconSchema$1,
		IconsSchema: IconsSchema$1,
		BaseMetadataSchema: BaseMetadataSchema$1,
		ImplementationSchema: ImplementationSchema$1,
		ClientTasksCapabilitySchema: ClientTasksCapabilitySchema$1,
		ServerTasksCapabilitySchema: ServerTasksCapabilitySchema$1,
		ClientCapabilitiesSchema: ClientCapabilitiesSchema$1,
		ServerCapabilitiesSchema: ServerCapabilitiesSchema$1,
		ProgressSchema: ProgressSchema$1,
		ProgressNotificationParamsSchema: ProgressNotificationParamsSchema$1,
		ProgressNotificationSchema: ProgressNotificationSchema$1,
		LoggingMessageNotificationParamsSchema: LoggingMessageNotificationParamsSchema$1,
		LoggingMessageNotificationSchema: LoggingMessageNotificationSchema$1,
		ResourceContentsSchema: ResourceContentsSchema$1,
		TextResourceContentsSchema: TextResourceContentsSchema$1,
		BlobResourceContentsSchema: BlobResourceContentsSchema$1,
		AnnotationsSchema: AnnotationsSchema$1,
		ResourceSchema: ResourceSchema$1,
		ResourceTemplateSchema: ResourceTemplateSchema$1,
		ResourceListChangedNotificationSchema: ResourceListChangedNotificationSchema$1,
		ResourceUpdatedNotificationParamsSchema: ResourceUpdatedNotificationParamsSchema$1,
		ResourceUpdatedNotificationSchema: ResourceUpdatedNotificationSchema$1,
		PromptArgumentSchema: PromptArgumentSchema$1,
		PromptSchema: PromptSchema$1,
		PromptListChangedNotificationSchema: PromptListChangedNotificationSchema$1,
		TextContentSchema: TextContentSchema$1,
		ImageContentSchema: ImageContentSchema$1,
		AudioContentSchema: AudioContentSchema$1,
		ToolUseContentSchema: ToolUseContentSchema$1,
		EmbeddedResourceSchema: EmbeddedResourceSchema$1,
		ResourceLinkSchema: ResourceLinkSchema$1,
		ContentBlockSchema: ContentBlockSchema$1,
		PromptMessageSchema: PromptMessageSchema$1,
		ToolAnnotationsSchema: ToolAnnotationsSchema$1,
		ToolListChangedNotificationSchema: ToolListChangedNotificationSchema$1,
		ModelHintSchema: ModelHintSchema$1,
		ModelPreferencesSchema: ModelPreferencesSchema$1,
		ToolChoiceSchema: ToolChoiceSchema$1,
		BooleanSchemaSchema: BooleanSchemaSchema$1,
		StringSchemaSchema: StringSchemaSchema$1,
		NumberSchemaSchema: NumberSchemaSchema$1,
		UntitledSingleSelectEnumSchemaSchema: UntitledSingleSelectEnumSchemaSchema$1,
		TitledSingleSelectEnumSchemaSchema: TitledSingleSelectEnumSchemaSchema$1,
		LegacyTitledEnumSchemaSchema: LegacyTitledEnumSchemaSchema$1,
		SingleSelectEnumSchemaSchema: SingleSelectEnumSchemaSchema$1,
		UntitledMultiSelectEnumSchemaSchema: UntitledMultiSelectEnumSchemaSchema$1,
		TitledMultiSelectEnumSchemaSchema: TitledMultiSelectEnumSchemaSchema$1,
		MultiSelectEnumSchemaSchema: MultiSelectEnumSchemaSchema$1,
		EnumSchemaSchema: EnumSchemaSchema$1,
		PrimitiveSchemaDefinitionSchema: PrimitiveSchemaDefinitionSchema$1,
		ElicitRequestFormParamsSchema: ElicitRequestFormParamsSchema$1,
		ResourceTemplateReferenceSchema: ResourceTemplateReferenceSchema$1,
		PromptReferenceSchema: PromptReferenceSchema$1,
		RootSchema: RootSchema$1,
		ClientCapabilities2026Schema,
		ServerCapabilities2026Schema,
		RequestMetaEnvelopeSchema,
		ToolSchema: ToolSchema$1,
		ToolResultContentSchema: ToolResultContentSchema$1,
		SamplingMessageContentBlockSchema: SamplingMessageContentBlockSchema$1,
		SamplingMessageSchema: SamplingMessageSchema$1,
		ResultTypeSchema,
		ResultMetaSchema,
		ResultSchema: ResultSchema$1,
		PaginatedResultSchema: PaginatedResultSchema$1,
		CallToolResultSchema: CallToolResultSchema$1,
		ListToolsResultSchema: ListToolsResultSchema$1,
		ListPromptsResultSchema: ListPromptsResultSchema$1,
		GetPromptResultSchema: GetPromptResultSchema$1,
		ListResourcesResultSchema: ListResourcesResultSchema$1,
		ListResourceTemplatesResultSchema: ListResourceTemplatesResultSchema$1,
		ReadResourceResultSchema: ReadResourceResultSchema$1,
		CompleteResultSchema: CompleteResultSchema$1,
		CacheableResultSchema,
		DiscoverResultSchema: DiscoverResultSchema$1,
		CreateMessageRequestParamsSchema: CreateMessageRequestParamsSchema$1,
		CreateMessageRequestSchema: CreateMessageRequestSchema$1,
		ListRootsRequestSchema: ListRootsRequestSchema$1,
		CreateMessageResultSchema: CreateMessageResultSchema$1,
		ListRootsResultSchema: ListRootsResultSchema$1,
		ElicitResultSchema: ElicitResultSchema$1,
		ElicitRequestURLParamsSchema: ElicitRequestURLParamsSchema$1,
		ElicitRequestParamsSchema: ElicitRequestParamsSchema$1,
		ElicitRequestSchema: ElicitRequestSchema$1,
		InputRequestSchema,
		InputResponseSchema,
		InputRequestsSchema,
		InputResponsesSchema,
		InputRequiredResultSchema,
		InputResponseRequestParamsSchema,
		CallToolRequestSchema: CallToolRequestSchema$1,
		ListToolsRequestSchema: ListToolsRequestSchema$1,
		ListPromptsRequestSchema: ListPromptsRequestSchema$1,
		GetPromptRequestSchema: GetPromptRequestSchema$1,
		ListResourcesRequestSchema: ListResourcesRequestSchema$1,
		ListResourceTemplatesRequestSchema: ListResourceTemplatesRequestSchema$1,
		ReadResourceRequestSchema: ReadResourceRequestSchema$1,
		CompleteRequestSchema: CompleteRequestSchema$1,
		DiscoverRequestSchema: DiscoverRequestSchema$1,
		SubscriptionFilterSchema: SubscriptionFilterSchema$1,
		SubscriptionsListenRequestSchema: SubscriptionsListenRequestSchema$1,
		SubscriptionsListenResultMetaSchema: SubscriptionsListenResultMetaSchema$1,
		SubscriptionsListenResultSchema: SubscriptionsListenResultSchema$1,
		dispatchRequestSchemas,
		dispatchResultSchemas,
		NotificationMetaSchema,
		SubscriptionsAcknowledgedNotificationSchema: SubscriptionsAcknowledgedNotificationSchema$1,
		CancelledNotificationParamsSchema: CancelledNotificationParamsSchema$1,
		CancelledNotificationSchema: CancelledNotificationSchema$1,
		notificationSchemas2026,
		JSONRPCResultResponseSchema: wireResultResponse(ResultSchema$1),
		CallToolResultResponseSchema: wireResultResponse(union([CallToolResultSchema$1, InputRequiredResultSchema])),
		ListToolsResultResponseSchema: wireResultResponse(ListToolsResultSchema$1),
		ListPromptsResultResponseSchema: wireResultResponse(ListPromptsResultSchema$1),
		GetPromptResultResponseSchema: wireResultResponse(union([GetPromptResultSchema$1, InputRequiredResultSchema])),
		ListResourcesResultResponseSchema: wireResultResponse(ListResourcesResultSchema$1),
		ListResourceTemplatesResultResponseSchema: wireResultResponse(ListResourceTemplatesResultSchema$1),
		ReadResourceResultResponseSchema: wireResultResponse(union([ReadResourceResultSchema$1, InputRequiredResultSchema])),
		CompleteResultResponseSchema: wireResultResponse(CompleteResultSchema$1),
		DiscoverResultResponseSchema: wireResultResponse(DiscoverResultSchema$1),
		SubscriptionsListenResultResponseSchema: wireResultResponse(SubscriptionsListenResultSchema$1)
	};
}
var memo;
function buildSchemas2026() {
	return memo ??= build();
}
var CACHEABLE_RESULT_METHODS = [
	"tools/list",
	"prompts/list",
	"resources/list",
	"resources/templates/list",
	"resources/read",
	"server/discover"
];
function isCacheableResultMethod(method) {
	return CACHEABLE_RESULT_METHODS.includes(method);
}
var RESULT_CACHE_HINT_FALLBACK = /* @__PURE__ */ Symbol("modelcontextprotocol.resultCacheHintFallback");
function attachCacheHintFallback(result, hint) {
	if (hint === void 0) return result;
	let attached = result[RESULT_CACHE_HINT_FALLBACK];
	if (attached === void 0) return {
		...result,
		[RESULT_CACHE_HINT_FALLBACK]: hint
	};
	let merged = {}, ttlMs = attached.ttlMs ?? hint.ttlMs;
	ttlMs !== void 0 && (merged.ttlMs = ttlMs);
	let cacheScope = attached.cacheScope ?? hint.cacheScope;
	return cacheScope !== void 0 && (merged.cacheScope = cacheScope), {
		...result,
		[RESULT_CACHE_HINT_FALLBACK]: merged
	};
}
function cacheHintFallbackOf(result) {
	return result[RESULT_CACHE_HINT_FALLBACK];
}
function isValidCacheTtlMs(value) {
	return typeof value == "number" && Number.isSafeInteger(value) && value >= 0;
}
function isValidCacheScope(value) {
	return value === "public" || value === "private";
}
function assertValidCacheHint(hint, context) {
	if (hint.ttlMs !== void 0 && !isValidCacheTtlMs(hint.ttlMs)) throw new RangeError(`Invalid cache hint for ${context}: ttlMs must be a non-negative safe integer (got ${String(hint.ttlMs)})`);
	if (hint.cacheScope !== void 0 && !isValidCacheScope(hint.cacheScope)) throw new RangeError(`Invalid cache hint for ${context}: cacheScope must be 'public' or 'private' (got ${String(hint.cacheScope)})`);
}
var ProtocolErrorCode = /* @__PURE__ */ (function(ProtocolErrorCode$1) {
	return ProtocolErrorCode$1[ProtocolErrorCode$1.ParseError = -32700] = "ParseError", ProtocolErrorCode$1[ProtocolErrorCode$1.InvalidRequest = -32600] = "InvalidRequest", ProtocolErrorCode$1[ProtocolErrorCode$1.MethodNotFound = -32601] = "MethodNotFound", ProtocolErrorCode$1[ProtocolErrorCode$1.InvalidParams = -32602] = "InvalidParams", ProtocolErrorCode$1[ProtocolErrorCode$1.InternalError = -32603] = "InternalError", ProtocolErrorCode$1[ProtocolErrorCode$1.ResourceNotFound = -32002] = "ResourceNotFound", ProtocolErrorCode$1[ProtocolErrorCode$1.MissingRequiredClientCapability = -32021] = "MissingRequiredClientCapability", ProtocolErrorCode$1[ProtocolErrorCode$1.UnsupportedProtocolVersion = -32022] = "UnsupportedProtocolVersion", ProtocolErrorCode$1[ProtocolErrorCode$1.UrlElicitationRequired = -32042] = "UrlElicitationRequired", ProtocolErrorCode$1;
})({}), ProtocolError = class ProtocolError2 extends Error {
	static {
		Object.defineProperty(this, "mcpBrand", { value: "mcp.ProtocolError" });
	}
	static [Symbol.hasInstance](value) {
		return brandedHasInstance(this, value);
	}
	/**
	* Brand-based type guard: equivalent to `value instanceof this`, as an
	* explicit static predicate (the axios/AWS-SDK `isInstance` style). Reads
	* the caller's own brand via `this`, so every branded subclass gets a
	* correctly-scoped guard by inheritance. Must be invoked on the class —
	* in callback position write `v => SdkError.isInstance(v)`, not
	* `.filter(SdkError.isInstance)` (detached calls throw rather than
	* silently matching nothing).
	*/
	static isInstance(value) {
		if (typeof this != "function") throw new TypeError("isInstance must be called on the class (e.g. `SdkError.isInstance(value)`); for callbacks use `v => SdkError.isInstance(v)`");
		return brandedHasInstance(this, value);
	}
	constructor(code, message, data) {
		super(message), this.code = code, this.data = data, this.name = "ProtocolError", stampErrorBrands(this, new.target);
	}
	/**
	* Factory method to create the appropriate error type based on the error code and data
	*/
	static fromError(code, message, data) {
		if (code === ProtocolErrorCode.UrlElicitationRequired && data) {
			let errorData = data;
			if (errorData.elicitations) return new UrlElicitationRequiredError(errorData.elicitations, message);
		}
		if (code === ProtocolErrorCode.UnsupportedProtocolVersion && data) {
			let errorData = data;
			if (Array.isArray(errorData.supported) && typeof errorData.requested == "string") return new UnsupportedProtocolVersionError({
				supported: errorData.supported,
				requested: errorData.requested
			}, message);
		}
		if (code === ProtocolErrorCode.InvalidParams || code === ProtocolErrorCode.ResourceNotFound) {
			let errorData = data;
			if (typeof errorData?.uri == "string" && (code === ProtocolErrorCode.ResourceNotFound || Object.keys(errorData).length === 1)) return new ResourceNotFoundError(errorData.uri, message);
		}
		if (code === ProtocolErrorCode.MissingRequiredClientCapability && data) {
			let errorData = data;
			if (errorData.requiredCapabilities !== null && typeof errorData.requiredCapabilities == "object" && !Array.isArray(errorData.requiredCapabilities)) return new MissingRequiredClientCapabilityError({ requiredCapabilities: errorData.requiredCapabilities }, message);
		}
		return new ProtocolError2(code, message, data);
	}
}, ResourceNotFoundError = class extends ProtocolError {
	static {
		Object.defineProperty(this, "mcpBrand", { value: "mcp.ResourceNotFoundError" });
	}
	constructor(uri, message = `Resource not found: ${uri}`) {
		super(ProtocolErrorCode.InvalidParams, message, { uri });
	}
	/** The URI that was requested and not found. */
	get uri() {
		return this.data.uri;
	}
}, UrlElicitationRequiredError = class extends ProtocolError {
	static {
		Object.defineProperty(this, "mcpBrand", { value: "mcp.UrlElicitationRequiredError" });
	}
	constructor(elicitations, message = `URL elicitation${elicitations.length > 1 ? "s" : ""} required`) {
		super(ProtocolErrorCode.UrlElicitationRequired, message, { elicitations });
	}
	get elicitations() {
		return this.data?.elicitations ?? [];
	}
}, UnsupportedProtocolVersionError = class extends ProtocolError {
	static {
		Object.defineProperty(this, "mcpBrand", { value: "mcp.UnsupportedProtocolVersionError" });
	}
	constructor(data, message = `Unsupported protocol version: ${data.requested}`) {
		super(ProtocolErrorCode.UnsupportedProtocolVersion, message, data);
	}
	/**
	* Protocol versions the receiver supports.
	*/
	get supported() {
		return this.data.supported;
	}
	/**
	* The protocol version that was requested.
	*/
	get requested() {
		return this.data.requested;
	}
}, MissingRequiredClientCapabilityError = class extends ProtocolError {
	static {
		Object.defineProperty(this, "mcpBrand", { value: "mcp.MissingRequiredClientCapabilityError" });
	}
	constructor(data, message = `Missing required client capabilities: ${Object.keys(data.requiredCapabilities).join(", ")}`) {
		super(ProtocolErrorCode.MissingRequiredClientCapability, message, data);
	}
	/**
	* The capabilities the server requires from the client to process the
	* request (only the missing capabilities are listed).
	*/
	get requiredCapabilities() {
		return this.data.requiredCapabilities;
	}
}, DEFAULT_CACHE_TTL_MS = 0, DEFAULT_CACHE_SCOPE = "private", EXTENDED_RESULT_TYPE_METHODS = [
	"tools/call",
	"prompts/get",
	"resources/read"
];
function stampResultType(method, result) {
	let provided = result.resultType;
	if (provided === void 0) return {
		...result,
		resultType: "complete"
	};
	if (provided === "complete" || EXTENDED_RESULT_TYPE_METHODS.includes(method)) return result;
	throw new ProtocolError(ProtocolErrorCode.InternalError, `Handler for ${method} returned resultType '${String(provided)}', but results of ${method} only support 'complete' on protocol revision 2026-07-28`);
}
function fillCacheFields(method, result) {
	let fallback = cacheHintFallbackOf(result);
	if (result.resultType !== "complete" || !isCacheableResultMethod(method)) return fallback === void 0 ? result : stripCacheHintFallback(result);
	let provided = result, ttlMs = isValidCacheTtlMs(provided.ttlMs) ? provided.ttlMs : resolveTtlMs(fallback), cacheScope = isValidCacheScope(provided.cacheScope) ? provided.cacheScope : resolveCacheScope(fallback), filled = {
		...provided,
		ttlMs,
		cacheScope
	};
	return delete filled[RESULT_CACHE_HINT_FALLBACK], filled;
}
function isPlainObject$5(value) {
	return value !== null && typeof value == "object" && !Array.isArray(value);
}
function stampServerInfoMeta(result, serverInfo) {
	if (serverInfo === void 0) return result;
	let meta = result._meta;
	return meta === void 0 ? {
		...result,
		_meta: { [SERVER_INFO_META_KEY]: serverInfo }
	} : !isPlainObject$5(meta) || meta[SERVER_INFO_META_KEY] !== void 0 ? result : {
		...result,
		_meta: {
			...meta,
			[SERVER_INFO_META_KEY]: serverInfo
		}
	};
}
function resolveTtlMs(fallback) {
	return fallback !== void 0 && isValidCacheTtlMs(fallback.ttlMs) ? fallback.ttlMs : DEFAULT_CACHE_TTL_MS;
}
function resolveCacheScope(fallback) {
	return fallback !== void 0 && isValidCacheScope(fallback.cacheScope) ? fallback.cacheScope : DEFAULT_CACHE_SCOPE;
}
function stripCacheHintFallback(result) {
	let copy = { ...result };
	return delete copy[RESULT_CACHE_HINT_FALLBACK], copy;
}
var INPUT_REQUEST_METHODS_2026 = [
	"elicitation/create",
	"sampling/createMessage",
	"roots/list"
], maps;
function inputSchemaMaps() {
	if (maps) return maps;
	let s = buildSchemas2026();
	return maps = {
		request: {
			"elicitation/create": object({
				method: literal("elicitation/create"),
				params: s.ElicitRequestParamsSchema
			}),
			"sampling/createMessage": object({
				method: literal("sampling/createMessage"),
				params: s.CreateMessageRequestParamsSchema
			}),
			"roots/list": object({
				method: literal("roots/list"),
				params: looseObject({}).optional()
			})
		},
		response: {
			"elicitation/create": s.ElicitResultSchema,
			"sampling/createMessage": s.CreateMessageResultSchema,
			"roots/list": s.ListRootsResultSchema
		}
	}, maps;
}
function warmInputSchemaMaps2026() {
	inputSchemaMaps();
}
function isInputRequestMethod2026(method) {
	return INPUT_REQUEST_METHODS_2026.includes(method);
}
function getInputRequestSchema2026(method) {
	return isInputRequestMethod2026(method) ? inputSchemaMaps().request[method] : void 0;
}
function getInputResponseSchema2026(method) {
	return isInputRequestMethod2026(method) ? inputSchemaMaps().response[method] : void 0;
}
var requestMethodKeys = {
	"tools/call": null,
	"tools/list": null,
	"prompts/get": null,
	"prompts/list": null,
	"resources/list": null,
	"resources/templates/list": null,
	"resources/read": null,
	"completion/complete": null,
	"server/discover": null,
	"subscriptions/listen": null
}, notificationMethodKeys = {
	"notifications/cancelled": null,
	"notifications/progress": null,
	"notifications/message": null,
	"notifications/resources/updated": null,
	"notifications/resources/list_changed": null,
	"notifications/tools/list_changed": null,
	"notifications/prompts/list_changed": null,
	"notifications/subscriptions/acknowledged": null
};
function hasRequestMethod2026(method) {
	return Object.prototype.hasOwnProperty.call(requestMethodKeys, method);
}
function hasNotificationMethod2026(method) {
	return Object.prototype.hasOwnProperty.call(notificationMethodKeys, method);
}
function hasResultMethod2026(method) {
	return Object.prototype.hasOwnProperty.call(requestMethodKeys, method);
}
function getRequestSchema2026(method) {
	return hasRequestMethod2026(method) ? buildSchemas2026().dispatchRequestSchemas[method] : void 0;
}
function getResultSchema2026(method) {
	return hasResultMethod2026(method) ? buildSchemas2026().dispatchResultSchemas[method] : void 0;
}
function getNotificationSchema2026(method) {
	return hasNotificationMethod2026(method) ? buildSchemas2026().notificationSchemas2026[method] : void 0;
}
var rev2026RequestMethods = Object.keys(requestMethodKeys), rev2026NotificationMethods = Object.keys(notificationMethodKeys);
function isPlainObject$4(value) {
	return value !== null && typeof value == "object" && !Array.isArray(value);
}
function triState(schema, raw) {
	if (schema === void 0) return {
		ok: !1,
		reason: "not-in-era"
	};
	let parsed = schema.safeParse(raw);
	return parsed.success ? {
		ok: !0,
		value: parsed.data
	} : {
		ok: !1,
		reason: "invalid",
		message: String(parsed.error)
	};
}
var NOT_IN_ERA = {
	ok: !1,
	reason: "not-in-era"
}, REQUIRED_ENVELOPE_KEYS = [PROTOCOL_VERSION_META_KEY, CLIENT_CAPABILITIES_META_KEY];
function enforceDeletedFields(method, result) {
	let next = result, copied = !1, copy = () => (copied || (next = { ...next }, copied = !0), next), tools = result.tools;
	method === "tools/list" && Array.isArray(tools) && tools.some((tool) => isPlainObject$4(tool) && "execution" in tool) && (copy().tools = tools.map((tool) => {
		if (!isPlainObject$4(tool) || !("execution" in tool)) return tool;
		let rest = { ...tool };
		return delete rest.execution, rest;
	}));
	let capabilities = result.capabilities;
	if (isPlainObject$4(capabilities) && "tasks" in capabilities) {
		let rest = { ...capabilities };
		delete rest.tasks, copy().capabilities = rest;
	}
	return next;
}
var rev2026Codec = {
	era: "2026-07-28",
	hasRequestMethod: hasRequestMethod2026,
	hasNotificationMethod: hasNotificationMethod2026,
	hasInputRequestMethod: (method) => getInputRequestSchema2026(method) !== void 0,
	validateRequest: (method, raw) => triState(getRequestSchema2026(method), raw),
	validateResult: (method, raw) => triState(getResultSchema2026(method), raw),
	validateNotification: (method, raw) => triState(getNotificationSchema2026(method), raw),
	validateInputRequest: (method, raw) => triState(getInputRequestSchema2026(method), raw),
	validateInputResponse: (method, raw) => triState(getInputResponseSchema2026(method), raw),
	samplingResultVariant: () => NOT_IN_ERA,
	outboundEnvelope(material) {
		return {
			[PROTOCOL_VERSION_META_KEY]: material.protocolVersion,
			[CLIENT_INFO_META_KEY]: material.clientInfo,
			[CLIENT_CAPABILITIES_META_KEY]: material.clientCapabilities,
			...material.logLevel !== void 0 && { [LOG_LEVEL_META_KEY]: material.logLevel }
		};
	},
	validateEnvelopeMeta(meta) {
		let issues = [];
		for (let key of REQUIRED_ENVELOPE_KEYS) key in meta || issues.push({
			key,
			problem: "missing"
		});
		let parsed = buildSchemas2026().RequestMetaEnvelopeSchema.safeParse(meta);
		if (!parsed.success) for (let issue of parsed.error.issues) {
			let path = issue.path.map(String), key = path.length > 0 ? path.join(".") : "_meta";
			path.length === 1 && issues.some((existing) => existing.key === key && existing.problem === "missing") || issues.push({
				key,
				problem: issue.message
			});
		}
		return issues;
	},
	projectCallToolResult: (result) => appendTextFallbackForNonObject(result),
	inputRequestSchema: getInputRequestSchema2026,
	decodeResult(method, raw) {
		if (!isPlainObject$4(raw)) return {
			kind: "invalid",
			error: new SdkError(SdkErrorCode.InvalidResult, `Invalid result for ${method}: not an object`, { method })
		};
		let rawResultType = raw.resultType;
		if (rawResultType === void 0) return {
			kind: "invalid",
			error: new SdkError(SdkErrorCode.InvalidResult, `Invalid result for ${method}: missing required resultType \u2014 servers implementing protocol revision 2026-07-28 MUST include it (the absent-means-complete bridge applies only to earlier-revision servers)`, {
				method,
				violation: "missing-resultType"
			})
		};
		if (typeof rawResultType != "string") return {
			kind: "invalid",
			error: new SdkError(SdkErrorCode.InvalidResult, `Invalid result for ${method}: non-string resultType`, {
				method,
				resultType: rawResultType
			})
		};
		if (rawResultType === "input_required") {
			let rawInputRequests = raw.inputRequests, inputRequests = isPlainObject$4(rawInputRequests) ? rawInputRequests : {}, requestState = raw.requestState, metaParse = raw._meta === void 0 ? void 0 : buildSchemas2026().ResultMetaSchema.safeParse(raw._meta), meta = metaParse?.success ? metaParse.data : void 0;
			return Object.keys(inputRequests).length === 0 && typeof requestState != "string" ? {
				kind: "invalid",
				error: new SdkError(SdkErrorCode.InvalidResult, `Invalid result for ${method}: input_required carries neither inputRequests nor requestState (every input_required result must include at least one of the two)`, {
					method,
					violation: "input-required-missing-both"
				})
			} : {
				kind: "input_required",
				inputRequests,
				...typeof requestState == "string" && { requestState },
				...meta !== void 0 && { _meta: meta }
			};
		}
		if (rawResultType !== "complete") return {
			kind: "invalid",
			error: new SdkError(SdkErrorCode.UnsupportedResultType, `Unsupported result type '${rawResultType}' for ${method}`, {
				resultType: rawResultType,
				method
			})
		};
		let wireResultSchemas = getWireResultSchemas(), wireSchema = Object.hasOwn(wireResultSchemas, method) ? wireResultSchemas[method] : void 0;
		if (wireSchema !== void 0) {
			let parsed = wireSchema.safeParse(raw);
			if (!parsed.success) return {
				kind: "invalid",
				error: new SdkError(SdkErrorCode.InvalidResult, `Invalid result for ${method}: ${parsed.error}`, { method })
			};
		}
		let lifted = { ...raw };
		return delete lifted.resultType, {
			kind: "complete",
			result: lifted
		};
	},
	encodeResult(method, result, serverInfo) {
		return stampServerInfoMeta(fillCacheFields(method, stampResultType(method, enforceDeletedFields(method, result))), serverInfo);
	},
	encodeErrorCode: (code) => code === -32002 ? -32602 : code,
	checkInboundEnvelope(material) {
		if (material.envelope === void 0) return "Request is missing the required _meta envelope for protocol revision 2026-07-28 (io.modelcontextprotocol/protocolVersion, io.modelcontextprotocol/clientCapabilities)";
		let parsed = buildSchemas2026().RequestMetaEnvelopeSchema.safeParse(material.envelope);
		if (!parsed.success) return `Invalid _meta envelope for protocol revision 2026-07-28: ${parsed.error.issues.map((issue) => issue.message).join("; ")}`;
	}
}, wireResultSchemasMemo;
function getWireResultSchemas() {
	if (wireResultSchemasMemo) return wireResultSchemasMemo;
	let s = buildSchemas2026();
	return wireResultSchemasMemo = {
		"tools/call": s.CallToolResultSchema,
		"tools/list": s.ListToolsResultSchema,
		"prompts/get": s.GetPromptResultSchema,
		"prompts/list": s.ListPromptsResultSchema,
		"resources/list": s.ListResourcesResultSchema,
		"resources/templates/list": s.ListResourceTemplatesResultSchema,
		"resources/read": s.ReadResourceResultSchema,
		"completion/complete": s.CompleteResultSchema,
		"server/discover": s.DiscoverResultSchema
	}, wireResultSchemasMemo;
}
function warmWireResultSchemas2026() {
	getWireResultSchemas();
}
var MODERN_WIRE_REVISION = "2026-07-28";
function codecForVersion(version) {
	return version !== void 0 && isModernProtocolVersion(version) ? rev2026Codec : rev2025Codec;
}
function classifiedWireEra(classification) {
	return classification.revision !== void 0 ? codecForVersion(classification.revision).era : classification.era === "modern" ? rev2026Codec.era : rev2025Codec.era;
}
function isSpecRequestMethod(method) {
	return ALL_CODECS.some((codec) => codec.hasRequestMethod(method));
}
function isSpecNotificationMethod(method) {
	return ALL_CODECS.some((codec) => codec.hasNotificationMethod(method));
}
function isExtensionReusedRequestMethod(method) {
	return method === "tasks/get" || method === "tasks/cancel";
}
var ALL_CODECS = [rev2025Codec, rev2026Codec];
function isPlainObject$3(value) {
	return value !== null && typeof value == "object" && !Array.isArray(value);
}
function requestMetaOf(params) {
	if (!isPlainObject$3(params)) return;
	let meta = params._meta;
	return isPlainObject$3(meta) ? meta : void 0;
}
function hasEnvelopeClaim(params) {
	let meta = requestMetaOf(params);
	return meta !== void 0 && PROTOCOL_VERSION_META_KEY in meta;
}
function envelopeClaimVersion(params) {
	let value = requestMetaOf(params)?.[PROTOCOL_VERSION_META_KEY];
	return typeof value == "string" ? value : void 0;
}
function validateEnvelopeMeta(meta) {
	return codecForVersion(MODERN_WIRE_REVISION).validateEnvelopeMeta(meta);
}
var schemas_exports = /* @__PURE__ */ __exportAll({
	AnnotationsSchema: () => AnnotationsSchema,
	AudioContentSchema: () => AudioContentSchema,
	BaseMetadataSchema: () => BaseMetadataSchema,
	BaseRequestParamsSchema: () => BaseRequestParamsSchema,
	BlobResourceContentsSchema: () => BlobResourceContentsSchema,
	BooleanSchemaSchema: () => BooleanSchemaSchema,
	CallToolRequestParamsSchema: () => CallToolRequestParamsSchema,
	CallToolRequestSchema: () => CallToolRequestSchema,
	CallToolResultSchema: () => CallToolResultSchema,
	CancelTaskRequestSchema: () => CancelTaskRequestSchema,
	CancelTaskResultSchema: () => CancelTaskResultSchema,
	CancelledNotificationParamsSchema: () => CancelledNotificationParamsSchema,
	CancelledNotificationSchema: () => CancelledNotificationSchema,
	ClientCapabilitiesSchema: () => ClientCapabilitiesSchema,
	ClientNotificationSchema: () => ClientNotificationSchema,
	ClientRequestSchema: () => ClientRequestSchema,
	ClientResultSchema: () => ClientResultSchema,
	ClientTasksCapabilitySchema: () => ClientTasksCapabilitySchema,
	CompatibilityCallToolResultSchema: () => CompatibilityCallToolResultSchema,
	CompleteRequestParamsSchema: () => CompleteRequestParamsSchema,
	CompleteRequestSchema: () => CompleteRequestSchema,
	CompleteResultSchema: () => CompleteResultSchema,
	ContentBlockSchema: () => ContentBlockSchema,
	CreateMessageRequestParamsSchema: () => CreateMessageRequestParamsSchema,
	CreateMessageRequestSchema: () => CreateMessageRequestSchema,
	CreateMessageResultSchema: () => CreateMessageResultSchema,
	CreateMessageResultWithToolsSchema: () => CreateMessageResultWithToolsSchema,
	CreateTaskResultSchema: () => CreateTaskResultSchema,
	CursorSchema: () => CursorSchema,
	DiscoverRequestSchema: () => DiscoverRequestSchema,
	DiscoverResultSchema: () => DiscoverResultSchema,
	ElicitRequestFormParamsSchema: () => ElicitRequestFormParamsSchema,
	ElicitRequestParamsSchema: () => ElicitRequestParamsSchema,
	ElicitRequestSchema: () => ElicitRequestSchema,
	ElicitRequestURLParamsSchema: () => ElicitRequestURLParamsSchema,
	ElicitResultSchema: () => ElicitResultSchema,
	ElicitationCompleteNotificationParamsSchema: () => ElicitationCompleteNotificationParamsSchema,
	ElicitationCompleteNotificationSchema: () => ElicitationCompleteNotificationSchema,
	EmbeddedResourceSchema: () => EmbeddedResourceSchema,
	EmptyResultSchema: () => EmptyResultSchema,
	EnumSchemaSchema: () => EnumSchemaSchema,
	GetPromptRequestParamsSchema: () => GetPromptRequestParamsSchema,
	GetPromptRequestSchema: () => GetPromptRequestSchema,
	GetPromptResultSchema: () => GetPromptResultSchema,
	GetTaskPayloadRequestSchema: () => GetTaskPayloadRequestSchema,
	GetTaskPayloadResultSchema: () => GetTaskPayloadResultSchema,
	GetTaskRequestSchema: () => GetTaskRequestSchema,
	GetTaskResultSchema: () => GetTaskResultSchema,
	IconSchema: () => IconSchema,
	IconsSchema: () => IconsSchema,
	ImageContentSchema: () => ImageContentSchema,
	ImplementationSchema: () => ImplementationSchema,
	InitializeRequestParamsSchema: () => InitializeRequestParamsSchema,
	InitializeRequestSchema: () => InitializeRequestSchema,
	InitializeResultSchema: () => InitializeResultSchema,
	InitializedNotificationSchema: () => InitializedNotificationSchema,
	JSONArraySchema: () => JSONArraySchema,
	JSONObjectSchema: () => JSONObjectSchema,
	JSONRPCErrorResponseSchema: () => JSONRPCErrorResponseSchema,
	JSONRPCMessageSchema: () => JSONRPCMessageSchema,
	JSONRPCNotificationSchema: () => JSONRPCNotificationSchema,
	JSONRPCRequestSchema: () => JSONRPCRequestSchema,
	JSONRPCResponseSchema: () => JSONRPCResponseSchema,
	JSONRPCResultResponseSchema: () => JSONRPCResultResponseSchema,
	JSONValueSchema: () => JSONValueSchema,
	LegacyTitledEnumSchemaSchema: () => LegacyTitledEnumSchemaSchema,
	ListChangedOptionsBaseSchema: () => ListChangedOptionsBaseSchema,
	ListPromptsRequestSchema: () => ListPromptsRequestSchema,
	ListPromptsResultSchema: () => ListPromptsResultSchema,
	ListResourceTemplatesRequestSchema: () => ListResourceTemplatesRequestSchema,
	ListResourceTemplatesResultSchema: () => ListResourceTemplatesResultSchema,
	ListResourcesRequestSchema: () => ListResourcesRequestSchema,
	ListResourcesResultSchema: () => ListResourcesResultSchema,
	ListRootsRequestSchema: () => ListRootsRequestSchema,
	ListRootsResultSchema: () => ListRootsResultSchema,
	ListTasksRequestSchema: () => ListTasksRequestSchema,
	ListTasksResultSchema: () => ListTasksResultSchema,
	ListToolsRequestSchema: () => ListToolsRequestSchema,
	ListToolsResultSchema: () => ListToolsResultSchema,
	LoggingLevelSchema: () => LoggingLevelSchema,
	LoggingMessageNotificationParamsSchema: () => LoggingMessageNotificationParamsSchema,
	LoggingMessageNotificationSchema: () => LoggingMessageNotificationSchema,
	ModelHintSchema: () => ModelHintSchema,
	ModelPreferencesSchema: () => ModelPreferencesSchema,
	MultiSelectEnumSchemaSchema: () => MultiSelectEnumSchemaSchema,
	NotificationSchema: () => NotificationSchema,
	NotificationsParamsSchema: () => NotificationsParamsSchema,
	NumberSchemaSchema: () => NumberSchemaSchema,
	PaginatedRequestParamsSchema: () => PaginatedRequestParamsSchema,
	PaginatedRequestSchema: () => PaginatedRequestSchema,
	PaginatedResultSchema: () => PaginatedResultSchema,
	PingRequestSchema: () => PingRequestSchema,
	PrimitiveSchemaDefinitionSchema: () => PrimitiveSchemaDefinitionSchema,
	ProgressNotificationParamsSchema: () => ProgressNotificationParamsSchema,
	ProgressNotificationSchema: () => ProgressNotificationSchema,
	ProgressSchema: () => ProgressSchema,
	ProgressTokenSchema: () => ProgressTokenSchema,
	PromptArgumentSchema: () => PromptArgumentSchema,
	PromptListChangedNotificationSchema: () => PromptListChangedNotificationSchema,
	PromptMessageSchema: () => PromptMessageSchema,
	PromptReferenceSchema: () => PromptReferenceSchema,
	PromptSchema: () => PromptSchema,
	ReadResourceRequestParamsSchema: () => ReadResourceRequestParamsSchema,
	ReadResourceRequestSchema: () => ReadResourceRequestSchema,
	ReadResourceResultSchema: () => ReadResourceResultSchema,
	RelatedTaskMetadataSchema: () => RelatedTaskMetadataSchema,
	RequestIdSchema: () => RequestIdSchema,
	RequestMetaSchema: () => RequestMetaSchema,
	RequestSchema: () => RequestSchema,
	ResourceContentsSchema: () => ResourceContentsSchema,
	ResourceLinkSchema: () => ResourceLinkSchema,
	ResourceListChangedNotificationSchema: () => ResourceListChangedNotificationSchema,
	ResourceRequestParamsSchema: () => ResourceRequestParamsSchema,
	ResourceSchema: () => ResourceSchema,
	ResourceTemplateReferenceSchema: () => ResourceTemplateReferenceSchema,
	ResourceTemplateSchema: () => ResourceTemplateSchema,
	ResourceUpdatedNotificationParamsSchema: () => ResourceUpdatedNotificationParamsSchema,
	ResourceUpdatedNotificationSchema: () => ResourceUpdatedNotificationSchema,
	ResultMetaObjectSchema: () => ResultMetaObjectSchema,
	ResultSchema: () => ResultSchema,
	RoleSchema: () => RoleSchema,
	RootSchema: () => RootSchema,
	RootsListChangedNotificationSchema: () => RootsListChangedNotificationSchema,
	SamplingContentSchema: () => SamplingContentSchema,
	SamplingMessageContentBlockSchema: () => SamplingMessageContentBlockSchema,
	SamplingMessageSchema: () => SamplingMessageSchema,
	ServerCapabilitiesSchema: () => ServerCapabilitiesSchema,
	ServerNotificationSchema: () => ServerNotificationSchema,
	ServerRequestSchema: () => ServerRequestSchema,
	ServerResultSchema: () => ServerResultSchema,
	ServerTasksCapabilitySchema: () => ServerTasksCapabilitySchema,
	SetLevelRequestParamsSchema: () => SetLevelRequestParamsSchema,
	SetLevelRequestSchema: () => SetLevelRequestSchema,
	SingleSelectEnumSchemaSchema: () => SingleSelectEnumSchemaSchema,
	StringSchemaSchema: () => StringSchemaSchema,
	SubscribeRequestParamsSchema: () => SubscribeRequestParamsSchema,
	SubscribeRequestSchema: () => SubscribeRequestSchema,
	SubscriptionFilterSchema: () => SubscriptionFilterSchema,
	SubscriptionsAcknowledgedNotificationParamsSchema: () => SubscriptionsAcknowledgedNotificationParamsSchema,
	SubscriptionsAcknowledgedNotificationSchema: () => SubscriptionsAcknowledgedNotificationSchema,
	SubscriptionsListenRequestParamsSchema: () => SubscriptionsListenRequestParamsSchema,
	SubscriptionsListenRequestSchema: () => SubscriptionsListenRequestSchema,
	SubscriptionsListenResultMetaSchema: () => SubscriptionsListenResultMetaSchema,
	SubscriptionsListenResultSchema: () => SubscriptionsListenResultSchema,
	TaskAugmentedRequestParamsSchema: () => TaskAugmentedRequestParamsSchema,
	TaskCreationParamsSchema: () => TaskCreationParamsSchema,
	TaskMetadataSchema: () => TaskMetadataSchema,
	TaskSchema: () => TaskSchema,
	TaskStatusNotificationParamsSchema: () => TaskStatusNotificationParamsSchema,
	TaskStatusNotificationSchema: () => TaskStatusNotificationSchema,
	TaskStatusSchema: () => TaskStatusSchema,
	TextContentSchema: () => TextContentSchema,
	TextResourceContentsSchema: () => TextResourceContentsSchema,
	TitledMultiSelectEnumSchemaSchema: () => TitledMultiSelectEnumSchemaSchema,
	TitledSingleSelectEnumSchemaSchema: () => TitledSingleSelectEnumSchemaSchema,
	ToolAnnotationsSchema: () => ToolAnnotationsSchema,
	ToolChoiceSchema: () => ToolChoiceSchema,
	ToolExecutionSchema: () => ToolExecutionSchema,
	ToolListChangedNotificationSchema: () => ToolListChangedNotificationSchema,
	ToolResultContentSchema: () => ToolResultContentSchema,
	ToolSchema: () => ToolSchema,
	ToolUseContentSchema: () => ToolUseContentSchema,
	UnsubscribeRequestParamsSchema: () => UnsubscribeRequestParamsSchema,
	UnsubscribeRequestSchema: () => UnsubscribeRequestSchema,
	UntitledMultiSelectEnumSchemaSchema: () => UntitledMultiSelectEnumSchemaSchema,
	UntitledSingleSelectEnumSchemaSchema: () => UntitledSingleSelectEnumSchemaSchema
});
function parseJSONRPCMessage(value) {
	return JSONRPCMessageSchema.parse(value);
}
var isJSONRPCRequest = (value) => JSONRPCRequestSchema.safeParse(value).success, isJSONRPCNotification = (value) => JSONRPCNotificationSchema.safeParse(value).success, isJSONRPCResultResponse = (value) => JSONRPCResultResponseSchema.safeParse(value).success, isJSONRPCErrorResponse = (value) => JSONRPCErrorResponseSchema.safeParse(value).success, isJSONRPCResponse = (value) => JSONRPCResponseSchema.safeParse(value).success, isCallToolResult = (value) => typeof value != "object" || value === null || value.content === void 0 ? !1 : CallToolResultSchema.safeParse(value).success, isInputRequiredResult = (value) => typeof value == "object" && value !== null && !Array.isArray(value) && value.resultType === "input_required", isTaskAugmentedRequestParams = (value) => TaskAugmentedRequestParamsSchema.safeParse(value).success, isInitializeRequest = (value) => InitializeRequestSchema.safeParse(value).success, isInitializedNotification = (value) => InitializedNotificationSchema.safeParse(value).success;
function assertCompleteRequestPrompt(request) {
	if (request.params.ref.type !== "ref/prompt") throw new TypeError(`Expected CompleteRequestPrompt, but got ${request.params.ref.type}`);
}
function assertCompleteRequestResourceTemplate(request) {
	if (request.params.ref.type !== "ref/resource") throw new TypeError(`Expected CompleteRequestResourceTemplate, but got ${request.params.ref.type}`);
}
var MCP_PARAM_HEADER_PREFIX = "Mcp-Param-", X_MCP_HEADER_KEY = "x-mcp-header", RFC9110_TOKEN = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/, PERMITTED_X_MCP_HEADER_TYPES = /* @__PURE__ */ new Set([
	"string",
	"integer",
	"boolean"
]);
function scanXMcpHeaderDeclarations(inputSchema) {
	let declarations = [], seenLower = /* @__PURE__ */ new Map(), numberFault, visit = (node, path, reachable) => {
		if (node === null || typeof node != "object") return;
		let schema = node;
		if (X_MCP_HEADER_KEY in schema) {
			if (!reachable || path.length === 0) return `${pathName(path)}: x-mcp-header is only permitted on properties statically reachable via a chain of 'properties' keys (not under items, additionalProperties, oneOf/anyOf/allOf/not, if/then/else, or $ref)`;
			let raw = schema[X_MCP_HEADER_KEY];
			if (typeof raw != "string" || raw.length === 0) return `${pathName(path)}: x-mcp-header MUST be a non-empty string`;
			if (!RFC9110_TOKEN.test(raw)) return `${pathName(path)}: x-mcp-header '${raw}' is not a valid RFC 9110 token (no spaces, control characters or HTTP delimiters)`;
			let type = typeof schema.type == "string" ? schema.type : void 0;
			if (type === void 0 || !PERMITTED_X_MCP_HEADER_TYPES.has(type)) {
				let fault$1 = `${pathName(path)}: x-mcp-header is only permitted on primitive-typed properties (string, integer, boolean); got ${type ?? "<none>"}`;
				if (type !== "number") return fault$1;
				numberFault ??= fault$1;
			}
			let lower = raw.toLowerCase(), prior = seenLower.get(lower);
			if (prior !== void 0) return `x-mcp-header '${raw}' is not case-insensitively unique (also declared as '${prior}')`;
			seenLower.set(lower, raw), declarations.push({
				path,
				headerName: raw,
				type
			});
		}
		let properties = schema.properties;
		if (properties !== null && typeof properties == "object") for (let [key, child] of Object.entries(properties)) {
			let fault$1 = visit(child, [...path, key], reachable);
			if (fault$1 !== void 0) return fault$1;
		}
		for (let k of NON_REACHABLE_SUBSCHEMA_KEYWORDS) {
			let sub = schema[k];
			if (sub === void 0) continue;
			let branches = Array.isArray(sub) ? sub : sub !== null && typeof sub == "object" && OBJECT_VALUED_SUBSCHEMA_KEYWORDS.has(k) ? Object.values(sub) : [sub];
			for (let branch of branches) {
				let fault$1 = visit(branch, [...path, `<${k}>`], !1);
				if (fault$1 !== void 0) return fault$1;
			}
		}
	}, fault = visit(inputSchema, [], !0);
	return fault !== void 0 ? {
		valid: !1,
		reason: numberFault ?? fault
	} : numberFault === void 0 ? {
		valid: !0,
		declarations
	} : {
		valid: !1,
		reason: numberFault,
		declarations
	};
}
var NON_REACHABLE_SUBSCHEMA_KEYWORDS = [
	"items",
	"prefixItems",
	"contains",
	"additionalProperties",
	"unevaluatedProperties",
	"unevaluatedItems",
	"propertyNames",
	"patternProperties",
	"dependentSchemas",
	"oneOf",
	"anyOf",
	"allOf",
	"not",
	"if",
	"then",
	"else",
	"$defs",
	"definitions"
], OBJECT_VALUED_SUBSCHEMA_KEYWORDS = /* @__PURE__ */ new Set([
	"patternProperties",
	"dependentSchemas",
	"$defs",
	"definitions"
]);
function pathName(path) {
	return path.length === 0 ? "<root>" : path.join(".");
}
var BASE64_SENTINEL_PREFIX = "=?base64?", BASE64_SENTINEL_SUFFIX = "?=", BASE64_CANONICAL = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/, CANONICAL_DECIMAL = /^-?\d+(\.\d+)?$/;
function mcpParamPrimitiveToString(value) {
	if (typeof value == "string") return value;
	if (typeof value == "boolean") return value ? "true" : "false";
	if (typeof value == "number")
		return !Number.isFinite(value) || Number.isInteger(value) && !Number.isSafeInteger(value) ? void 0 : String(value);
}
function base64ToUtf8(b64) {
	let bin = atob(b64), bytes = new Uint8Array(bin.length);
	for (let i = 0; i < bin.length; i++) bytes[i] = bin.codePointAt(i);
	return new TextDecoder("utf-8", { fatal: !0 }).decode(bytes);
}
function decodeMcpParamValue(value) {
	if (!(value.startsWith(BASE64_SENTINEL_PREFIX) && value.endsWith(BASE64_SENTINEL_SUFFIX))) return value;
	let b64 = value.slice(9, value.length - 2);
	if (BASE64_CANONICAL.test(b64))
		try {
			return base64ToUtf8(b64);
		} catch {
			return;
		}
}
function valueAtPath(root, path) {
	let node = root;
	for (let key of path) {
		if (node === null || typeof node != "object") return;
		node = node[key];
	}
	return node;
}
function validateMcpParamHeaders(declarations, args, headers) {
	for (let decl of declarations) {
		let headerKey = `${MCP_PARAM_HEADER_PREFIX}${decl.headerName}`, headerValue = headers.get(headerKey), bodyRaw = valueAtPath(args, decl.path);
		if (bodyRaw == null) continue;
		let bodyString = mcpParamPrimitiveToString(bodyRaw);
		if (bodyString === void 0) continue;
		if (headerValue === null) return paramHeaderMismatchRejection("param-header-missing", headerKey, `the body carries ${pathName(decl.path)}=${JSON.stringify(bodyRaw)} but the ${headerKey} header is absent`);
		let decoded = decodeMcpParamValue(headerValue);
		if (decoded === void 0) return paramHeaderMismatchRejection("param-header-invalid-encoding", headerKey, `the ${headerKey} header carries an invalid Base64 sentinel value`);
		if (!((decl.type === "integer" || decl.type === "number") && CANONICAL_DECIMAL.test(decoded) && typeof bodyRaw == "number" ? Number(decoded) === bodyRaw : decoded === bodyString)) return paramHeaderMismatchRejection("param-header-mismatch", headerKey, `the ${headerKey} header decodes to ${JSON.stringify(decoded)} but the body carries ${pathName(decl.path)}=${JSON.stringify(bodyRaw)}`);
	}
}
function paramHeaderMismatchRejection(cell, header, body) {
	return {
		kind: "reject",
		rung: "param-header-validation",
		cell,
		httpStatus: 400,
		code: HEADER_MISMATCH_ERROR_CODE,
		message: `Bad Request: the request headers and body disagree: ${body}`,
		data: { mismatch: {
			header,
			body
		} },
		settled: !0
	};
}
var HEADER_MISMATCH_ERROR_CODE = -32020, INBOUND_VALIDATION_LADDER = [
	{
		rung: "http-method",
		order: 1,
		evaluatedAt: "edge",
		codes: [-32e3],
		conformance: [],
		rationale: "The modern era is POST-only; GET/DELETE are body-less 2025-era session operations and are method-routed to legacy serving (405 when legacy serving is not configured), before any body is read."
	},
	{
		rung: "jsonrpc-shape",
		order: 2,
		evaluatedAt: "edge",
		codes: [ProtocolErrorCode.InvalidRequest],
		conformance: ["server-stateless"],
		rationale: "The body must be a JSON-RPC request or notification: posted responses and batch arrays containing a modern or invalid element are rejected before classification (element-wise batch rule); all-legacy arrays stay legacy traffic."
	},
	{
		rung: "era-classification",
		order: 3,
		evaluatedAt: "edge",
		codes: [HEADER_MISMATCH_ERROR_CODE, ProtocolErrorCode.UnsupportedProtocolVersion],
		conformance: [
			"server-stateless",
			"http-header-validation",
			"http-custom-header-server-validation"
		],
		rationale: "Body-primary era classification with the protocol-version header as a cross-check; a header/body disagreement is rejected with -32020 (HeaderMismatch), and an envelope-less request on a modern-only endpoint is answered with the unsupported-protocol-version error naming the supported revisions."
	},
	{
		rung: "envelope",
		order: 4,
		evaluatedAt: "edge",
		codes: [ProtocolErrorCode.InvalidParams],
		conformance: ["server-stateless"],
		rationale: "A present envelope claim with a malformed envelope \u2014 and a missing envelope on a request whose protocol-version header names a modern revision \u2014 is an invalid-params rejection naming the offending or missing key(s); never a silent fall back to legacy handling. This is the only place an invalid-params rejection maps to HTTP 400."
	},
	{
		rung: "method-registry",
		order: 5,
		evaluatedAt: "dispatch",
		codes: [ProtocolErrorCode.MethodNotFound],
		conformance: ["server-stateless"],
		rationale: "Method existence outranks parameter validity: a method absent from the negotiated revision\u2019s registry (or with no handler installed) answers method-not-found before params or capabilities are looked at."
	},
	{
		rung: "request-params",
		order: 6,
		evaluatedAt: "dispatch",
		codes: [ProtocolErrorCode.InvalidParams],
		conformance: [],
		rationale: "Per-method params validation; emitted in-band by the dispatch layer (HTTP 200), never via the ladder status table."
	},
	{
		rung: "standard-header-validation",
		order: 7,
		evaluatedAt: "pre-dispatch",
		codes: [HEADER_MISMATCH_ERROR_CODE],
		conformance: ["http-header-validation"],
		rationale: "SEP-2243 standard `MCP-Protocol-Version` / `Mcp-Method` / `Mcp-Name` headers \u2014 presence, sentinel decoding, and `Mcp-Name` \u2194 body cross-check \u2014 are validated by the HTTP entry on a modern-classified request after the supported-revision gate and before dispatch. The spec requires `MCP-Protocol-Version` and `Mcp-Method` on every modern *request* POST (`Mcp-Name` only for the methods that mirror `params.name` / `params.uri` / `params.taskId`, see `MCP_NAME_HEADER_SOURCE`) and names them in that order, so a request missing several is answered by the earliest. Notification POSTs are exempt: the presence half runs on requests only, so a modern-enveloped notification is dispatched even with no standard headers at all. The classifier\u2019s own header-mismatch cells (protocol-version, `Mcp-Method` mismatch) stay on the edge `era-classification` rung; this rung carries the entry-layer presence/`Mcp-Name` half \u2014 including the missing `MCP-Protocol-Version` cell, which cannot live on the edge rung without breaking body-primary classification. Evaluated before the capability gate, the factory call, and the `Mcp-Param-*` rung so a request that fails several rungs is answered by the standard-header rung first. The documented order (after method-registry 5 and request-params 6) is NOT the observed precedence: serveModern evaluates this rung immediately after the supported-revision gate, so a request that also fails a dispatch rung is answered here before the dispatch rungs (5\u20136) are consulted."
	},
	{
		rung: "client-capabilities",
		order: 8,
		evaluatedAt: "pre-dispatch",
		codes: [ProtocolErrorCode.MissingRequiredClientCapability],
		conformance: ["server-stateless"],
		rationale: "The capability requirement is checked by the HTTP entry, pre-dispatch, against the validated envelope the classifier produced \u2014 pinning the spec-mandated HTTP 400 independently of how dispatch- and handler-produced errors are mapped. The documented order (after method resolution and params validation) is preserved observably only while the requirement table is empty: once a served method gains a requirement entry, a request that is missing the capability and would also fail a dispatch rung is answered by this gate first, so the entry must consult the method registry before the gate if the documented precedence is to stay observable."
	},
	{
		rung: "param-header-validation",
		order: 9,
		evaluatedAt: "pre-dispatch",
		codes: [HEADER_MISMATCH_ERROR_CODE],
		conformance: ["http-custom-header-server-validation"],
		rationale: "SEP-2243 `Mcp-Param-*` headers are validated against the named tool\u2019s `x-mcp-header` declarations and the body `arguments` after the tool registry is known and before dispatch reaches the handler; a missing/disagreeing/malformed header is rejected 400 / -32020 with the same shape as the standard-header cross-checks. The documented order (after method resolution and params validation) is preserved observably only when the body `arguments` would otherwise validate: the check runs pre-dispatch, so a `tools/call` that fails BOTH this rung and a dispatch-time rung (e.g. order-6 `request-params`, -32602) is answered by this gate first with 400 / -32020, not by the earlier-ordered rung."
	}
], LADDER_ERROR_HTTP_STATUS = {
	[ProtocolErrorCode.ParseError]: 400,
	[ProtocolErrorCode.InvalidRequest]: 400,
	[ProtocolErrorCode.MethodNotFound]: 404,
	[ProtocolErrorCode.UnsupportedProtocolVersion]: 400,
	[ProtocolErrorCode.MissingRequiredClientCapability]: 400,
	[HEADER_MISMATCH_ERROR_CODE]: 400
};
function httpStatusForErrorCode(code, origin) {
	return origin === "in-band" ? code === ProtocolErrorCode.MissingRequiredClientCapability ? 400 : 200 : LADDER_ERROR_HTTP_STATUS[code] ?? 400;
}
function rejection(rung, cell, httpStatus, error, settled) {
	return {
		kind: "reject",
		rung,
		cell,
		httpStatus,
		code: error.code,
		message: error.message,
		...error.data !== void 0 && { data: error.data },
		settled
	};
}
function crossCheckMismatch(cell, header, body, rung = "era-classification") {
	return rejection(rung, cell, 400, new ProtocolError(HEADER_MISMATCH_ERROR_CODE, `Bad Request: the request headers and body disagree: ${body}`, { mismatch: {
		header,
		body
	} }), !0);
}
var MCP_NAME_HEADER_SOURCE = {
	"tools/call": "name",
	"prompts/get": "name",
	"resources/read": "uri",
	"tasks/get": "taskId",
	"tasks/update": "taskId",
	"tasks/cancel": "taskId"
};
function mcpNameSource(method, params) {
	let field = Object.hasOwn(MCP_NAME_HEADER_SOURCE, method) ? MCP_NAME_HEADER_SOURCE[method] : void 0;
	if (field === void 0) return;
	let raw = isPlainObject$2(params) ? params[field] : void 0;
	return {
		field,
		value: typeof raw == "string" ? raw : void 0
	};
}
function stripHttpOws(value) {
	let start = 0;
	for (; start < value.length; ) {
		let code = value.codePointAt(start);
		if (code !== 9 && code !== 32) break;
		start += 1;
	}
	let end = value.length;
	for (; end > start; ) {
		let code = value.codePointAt(end - 1);
		if (code !== 9 && code !== 32) break;
		end -= 1;
	}
	return start === 0 && end === value.length ? value : value.slice(start, end);
}
function validateStandardRequestHeaders(request, route) {
	if (route.messageKind !== "request") return;
	let method = route.message.method;
	if (request.protocolVersionHeader === void 0) {
		let claimed = route.classification.revision;
		return crossCheckMismatch("version-header-missing", "(missing)", claimed === void 0 ? "the body carries a modern per-request envelope but the required MCP-Protocol-Version header is absent" : `the body envelope names protocol version ${claimed} but the required MCP-Protocol-Version header is absent`, "standard-header-validation");
	}
	if (request.mcpMethodHeader === void 0) return crossCheckMismatch("method-header-missing", "(missing)", `the body names method ${method} but the required Mcp-Method header is absent`, "standard-header-validation");
	let source = mcpNameSource(method, route.message.params);
	if (source === void 0) return;
	let { field: sourceField, value: bodyValue } = source;
	if (request.mcpNameHeader === void 0)
		return bodyValue === void 0 ? void 0 : crossCheckMismatch("name-header-missing", "(missing)", `the body carries params.${sourceField}="${bodyValue}" but the required Mcp-Name header is absent`, "standard-header-validation");
	let normalizedNameHeader = stripHttpOws(request.mcpNameHeader), decoded = decodeMcpParamValue(normalizedNameHeader);
	if (decoded === void 0) return crossCheckMismatch("name-header-invalid-encoding", normalizedNameHeader, "the Mcp-Name header carries an invalid Base64 sentinel value", "standard-header-validation");
	if (bodyValue !== void 0 && decoded !== bodyValue) return crossCheckMismatch("name-header-mismatch", normalizedNameHeader, `the body carries params.${sourceField}="${bodyValue}" but the Mcp-Name header names "${decoded}"`, "standard-header-validation");
}
function isPlainObject$2(value) {
	return value !== null && typeof value == "object" && !Array.isArray(value);
}
function classificationForClaim(claimedVersion) {
	return claimedVersion === void 0 ? { era: "modern" } : {
		era: isModernProtocolVersion(claimedVersion) ? "modern" : "legacy",
		revision: claimedVersion
	};
}
function carriesValidModernEnvelopeClaim(params) {
	if (!hasEnvelopeClaim(params)) return !1;
	let claimedVersion = envelopeClaimVersion(params);
	if (claimedVersion === void 0 || !isModernProtocolVersion(claimedVersion)) return !1;
	let meta = requestMetaOf(params);
	return meta !== void 0 && validateEnvelopeMeta(meta).length === 0;
}
function classifyBatch(body) {
	if (body.length === 0) return rejection("jsonrpc-shape", "empty-batch", 400, new ProtocolError(ProtocolErrorCode.InvalidRequest, "Bad Request: empty JSON-RPC batch"), !0);
	for (let element of body) {
		if (hasEnvelopeClaim(isPlainObject$2(element) ? element.params : void 0)) return rejection("jsonrpc-shape", "batch-with-modern-element", 400, new ProtocolError(ProtocolErrorCode.InvalidRequest, "Bad Request: JSON-RPC batches may not contain requests for protocol revision 2026-07-28 or later"), !0);
		if (!(isJSONRPCRequest(element) || isJSONRPCNotification(element) || isJSONRPCResultResponse(element) || isJSONRPCErrorResponse(element))) return rejection("jsonrpc-shape", "batch-with-invalid-element", 400, new ProtocolError(ProtocolErrorCode.InvalidRequest, "Bad Request: JSON-RPC batch contains an invalid message"), !0);
	}
	return {
		kind: "legacy",
		reason: "batch"
	};
}
function classifyRequestBody(request, body) {
	let params = body.params, method = body.method, headerVersion = request.protocolVersionHeader, headerNamesModern = headerVersion !== void 0 && isModernProtocolVersion(headerVersion);
	if (method === "initialize" && !carriesValidModernEnvelopeClaim(params)) {
		if (headerNamesModern) return crossCheckMismatch("initialize-with-modern-header", headerVersion, "an initialize request (legacy handshake) was sent with a modern MCP-Protocol-Version header");
		let requestedVersion = isPlainObject$2(params) && typeof params.protocolVersion == "string" ? params.protocolVersion : void 0;
		return {
			kind: "legacy",
			reason: "initialize",
			...requestedVersion !== void 0 && { requestedVersion }
		};
	}
	if (hasEnvelopeClaim(params)) {
		let meta = requestMetaOf(params), firstIssue = (meta === void 0 ? [] : validateEnvelopeMeta(meta))[0];
		if (firstIssue !== void 0) return rejection("envelope", "envelope-invalid", 400, new ProtocolError(ProtocolErrorCode.InvalidParams, `Invalid _meta envelope for protocol revision 2026-07-28: ${firstIssue.key}: ${firstIssue.problem}`, { envelope: firstIssue }), !0);
		let claimedVersion = envelopeClaimVersion(params);
		return headerVersion !== void 0 && claimedVersion !== void 0 && headerVersion !== claimedVersion ? crossCheckMismatch("header-body-version-mismatch", headerVersion, `the body envelope names protocol version ${claimedVersion} but the MCP-Protocol-Version header names ${headerVersion}`) : request.mcpMethodHeader !== void 0 && request.mcpMethodHeader !== method ? crossCheckMismatch("method-header-mismatch", request.mcpMethodHeader, `the body names method ${method} but the Mcp-Method header names ${request.mcpMethodHeader}`) : {
			kind: "modern",
			messageKind: "request",
			message: body,
			classification: classificationForClaim(claimedVersion)
		};
	}
	if (headerNamesModern) {
		let meta = requestMetaOf(params), missingFromEnvelope = validateEnvelopeMeta(meta ?? {}).filter((issue) => issue.problem === "missing").map((issue) => issue.key), missing = meta === void 0 ? ["_meta"] : missingFromEnvelope.length > 0 ? missingFromEnvelope : [PROTOCOL_VERSION_META_KEY];
		return rejection("envelope", "modern-header-without-claim", 400, new ProtocolError(ProtocolErrorCode.InvalidParams, `Invalid params: the MCP-Protocol-Version header names protocol revision ${headerVersion}, but the request is missing the required per-request envelope key(s): ${missing.join(", ")}`, { envelope: { missing } }), !0);
	}
	return {
		kind: "legacy",
		reason: "no-claim",
		...headerVersion !== void 0 && { requestedVersion: headerVersion }
	};
}
function classifyNotificationBody(request, body) {
	let params = body.params, method = body.method, headerVersion = request.protocolVersionHeader, headerNamesModern = headerVersion !== void 0 && isModernProtocolVersion(headerVersion);
	if (hasEnvelopeClaim(params)) {
		let claimedVersion = envelopeClaimVersion(params);
		if (claimedVersion === void 0) {
			let meta = requestMetaOf(params), claimIssue = (meta === void 0 ? [] : validateEnvelopeMeta(meta)).find((issue) => issue.key === PROTOCOL_VERSION_META_KEY) ?? {
				key: PROTOCOL_VERSION_META_KEY,
				problem: "expected a protocol version string"
			};
			return rejection("envelope", "notification-envelope-invalid", 400, new ProtocolError(ProtocolErrorCode.InvalidParams, `Invalid _meta envelope for protocol revision 2026-07-28: ${claimIssue.key}: ${claimIssue.problem}`, { envelope: claimIssue }), !0);
		}
		if (headerVersion !== void 0 && headerVersion !== claimedVersion) return crossCheckMismatch("notification-header-body-version-mismatch", headerVersion, `the notification envelope names protocol version ${claimedVersion} but the MCP-Protocol-Version header names ${headerVersion}`);
		let classification = classificationForClaim(claimedVersion);
		return classification.era === "modern" && request.mcpMethodHeader !== void 0 && request.mcpMethodHeader !== method ? crossCheckMismatch("notification-method-header-mismatch", request.mcpMethodHeader, `the notification body names method ${method} but the Mcp-Method header names ${request.mcpMethodHeader}`) : {
			kind: "modern",
			messageKind: "notification",
			message: body,
			classification
		};
	}
	return headerNamesModern ? request.mcpMethodHeader !== void 0 && request.mcpMethodHeader !== method ? crossCheckMismatch("notification-method-header-mismatch", request.mcpMethodHeader, `the notification body names method ${method} but the Mcp-Method header names ${request.mcpMethodHeader}`) : {
		kind: "modern",
		messageKind: "notification",
		message: body,
		classification: {
			era: "modern",
			revision: headerVersion
		}
	} : {
		kind: "legacy",
		reason: "notification",
		...headerVersion !== void 0 && { requestedVersion: headerVersion }
	};
}
function classifyInboundRequest(request) {
	if (request = {
		...request,
		...request.protocolVersionHeader !== void 0 && { protocolVersionHeader: stripHttpOws(request.protocolVersionHeader) },
		...request.mcpMethodHeader !== void 0 && { mcpMethodHeader: stripHttpOws(request.mcpMethodHeader) },
		...request.mcpNameHeader !== void 0 && { mcpNameHeader: stripHttpOws(request.mcpNameHeader) }
	}, request.httpMethod.toUpperCase() !== "POST") return {
		kind: "legacy",
		reason: "http-method"
	};
	let body = request.body;
	return Array.isArray(body) ? classifyBatch(body) : isJSONRPCResultResponse(body) || isJSONRPCErrorResponse(body) ? {
		kind: "legacy",
		reason: "response"
	} : isPlainObject$2(body) && isJSONRPCRequest(body) ? classifyRequestBody(request, body) : isPlainObject$2(body) && isJSONRPCNotification(body) ? classifyNotificationBody(request, body) : rejection("jsonrpc-shape", "invalid-json-rpc-body", 400, new ProtocolError(ProtocolErrorCode.InvalidRequest, "Bad Request: the request body is not a valid JSON-RPC message"), !0);
}
function modernOnlyStrictRejection(route, supportedVersions) {
	switch (route.reason) {
		case "http-method":
			return rejection("http-method", "modern-only-method-not-allowed", 405, new ProtocolError(-32e3, "Method not allowed."), !0);
		case "batch":
			return rejection("jsonrpc-shape", "modern-only-batch-not-supported", 400, new ProtocolError(ProtocolErrorCode.InvalidRequest, "Bad Request: JSON-RPC batches are not supported by this endpoint"), !0);
		case "response":
			return rejection("jsonrpc-shape", "modern-only-response-post", 400, new ProtocolError(ProtocolErrorCode.InvalidRequest, "Bad Request: JSON-RPC responses cannot be posted to this endpoint"), !0);
		case "notification":
			return;
		case "initialize":
		case "no-claim": {
			let requested = route.requestedVersion;
			return rejection("era-classification", "modern-only-missing-envelope", 400, requested === void 0 ? new ProtocolError(ProtocolErrorCode.UnsupportedProtocolVersion, "Unsupported protocol version: the request did not name a protocol version", { supported: [...supportedVersions] }) : new UnsupportedProtocolVersionError({
				supported: [...supportedVersions],
				requested
			}), !0);
		}
	}
}
function parseSchema(schema, data) {
	return safeParse(schema, data);
}
function shapeKeys(schemas) {
	return new Set(schemas.flatMap((schema) => Object.keys(schema.shape)));
}
function isStandardSchema(schema) {
	if (schema == null) return !1;
	let schemaType = typeof schema;
	return schemaType !== "object" && schemaType !== "function" || !("~standard" in schema) ? !1 : typeof schema["~standard"]?.validate == "function";
}
var warnedZodFallback = !1, JSON_SCHEMA_CONVERSION_TARGET = "draft-2020-12";
function standardSchemaToJsonSchema(schema, io = "input") {
	let std = schema["~standard"], result;
	if (std.jsonSchema) result = std.jsonSchema[io]({ target: JSON_SCHEMA_CONVERSION_TARGET });
	else if (std.vendor === "zod") {
		if (!("_zod" in schema)) throw new Error("Schema appears to be from zod 3, which the SDK cannot convert to JSON Schema. Upgrade to zod >=4.2.0, or wrap your JSON Schema with fromJsonSchema().");
		warnedZodFallback || (warnedZodFallback = !0, console.warn("[mcp-sdk] Your zod version does not implement `~standard.jsonSchema` (added in zod 4.2.0). Falling back to z.toJSONSchema(). Upgrade to zod >=4.2.0 to silence this warning.")), result = toJSONSchema(schema, {
			target: JSON_SCHEMA_CONVERSION_TARGET,
			io
		});
	} else throw new Error(`Schema library "${std.vendor}" does not implement StandardJSONSchemaV1 (\`~standard.jsonSchema\`). Upgrade to a version that does, or wrap your JSON Schema with fromJsonSchema().`);
	if (io === "output")
		return result.type !== void 0 ? result : isProvablyObjectShapedRoot(result) ? {
			type: "object",
			...result
		} : result;
	if (result.type !== void 0 && result.type !== "object") throw new Error(`MCP tool and prompt schemas must describe objects (got type: ${JSON.stringify(result.type)}). Wrap your schema in z.object({...}) or equivalent.`);
	return {
		type: "object",
		...result
	};
}
var LOCAL_DEFINITION_REF = /^#\/(\$defs|definitions)\/([^/~%]+)$/;
function isProvablyObjectShapedRoot(schema, root = schema) {
	if ("properties" in schema || "patternProperties" in schema || "additionalProperties" in schema || "required" in schema) return !0;
	let ref = typeof schema.$ref == "string" && LOCAL_DEFINITION_REF.exec(schema.$ref);
	if (ref && root[ref[1]]?.[ref[2]]?.type === "object") return !0;
	for (let key of [
		"oneOf",
		"anyOf",
		"allOf"
	]) {
		let members = schema[key];
		if (Array.isArray(members) && members.length > 0) return members.every((m) => m !== null && typeof m == "object" && (m.type === "object" || isProvablyObjectShapedRoot(m, "$id" in m ? {} : root)));
	}
	return !1;
}
function formatIssue(issue) {
	return issue.path?.length ? `${issue.path.map((p) => String(typeof p == "object" ? p.key : p)).join(".")}: ${issue.message}` : issue.message;
}
async function validateStandardSchema(schema, data) {
	let result = await schema["~standard"].validate(data);
	return result.issues && result.issues.length > 0 ? {
		success: !1,
		error: result.issues.map((i) => formatIssue(i)).join(", ")
	} : {
		success: !0,
		data: result.value
	};
}
function zodEmittedPattern(schema) {
	let jsonSchema = toJSONSchema(schema, {
		target: JSON_SCHEMA_CONVERSION_TARGET,
		io: "input"
	});
	return typeof jsonSchema.pattern == "string" ? jsonSchema.pattern : void 0;
}
var DATETIME_FRACTION_DIGITS = /\\\.\\d\{(\d+)\}/;
function datetimeReferenceSchemas(pattern) {
	let fractionDigits = DATETIME_FRACTION_DIGITS.exec(pattern), precisions = [
		void 0,
		-1,
		0
	];
	return fractionDigits && precisions.push(Number(fractionDigits[1])), [!1, !0].flatMap((local) => [!1, !0].flatMap((offset) => precisions.map((precision) => iso_exports.datetime({
		local,
		offset,
		precision
	}))));
}
function referencePatternsForFormat(format, pattern) {
	let referenceSchemas;
	switch (format) {
		case "email":
			referenceSchemas = [email()];
			break;
		case "uri":
			referenceSchemas = [url()];
			break;
		case "date":
			referenceSchemas = [iso_exports.date()];
			break;
		case "date-time":
			referenceSchemas = datetimeReferenceSchemas(pattern);
			break;
	}
	return new Set(referenceSchemas.map((schema) => zodEmittedPattern(schema)).filter((emitted) => emitted !== void 0));
}
function isLibraryFormatPattern(format, pattern, vendor) {
	return vendor !== "zod" ? !0 : referencePatternsForFormat(format, pattern).has(pattern);
}
function promptArgumentsFromStandardSchema(schema) {
	let jsonSchema = standardSchemaToJsonSchema(schema, "input"), properties = jsonSchema.properties || {}, required = jsonSchema.required || [];
	return Object.entries(properties).map(([name, prop]) => ({
		name,
		description: prop?.description,
		required: required.includes(name)
	}));
}
function isJsonObject(value) {
	return typeof value == "object" && value !== null && !Array.isArray(value);
}
function convertStandardElicitationSchema(schema) {
	try {
		return standardSchemaToJsonSchema(schema, "input");
	} catch (error) {
		let detail = error instanceof Error ? error.message : String(error);
		throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Elicitation requestedSchema must describe an object with flat primitive properties: ${detail}`);
	}
}
var ANNOTATION_ONLY_JSON_SCHEMA_KEYWORDS = /* @__PURE__ */ new Set([
	"$comment",
	"deprecated",
	"description",
	"examples",
	"readOnly",
	"title",
	"writeOnly"
]);
function isAnnotationOnlyJsonSchemaKeyword(key) {
	return ANNOTATION_ONLY_JSON_SCHEMA_KEYWORDS.has(key) || key.startsWith("x-");
}
var ROOT_KEYS = /* @__PURE__ */ new Set(["$schema", ...Object.keys(ElicitRequestFormParamsSchema.shape.requestedSchema.shape)]), PROPERTY_KEYS_BY_TYPE = {
	string: shapeKeys([
		StringSchemaSchema,
		UntitledSingleSelectEnumSchemaSchema,
		TitledSingleSelectEnumSchemaSchema,
		LegacyTitledEnumSchemaSchema
	]),
	number: shapeKeys([NumberSchemaSchema]),
	integer: shapeKeys([NumberSchemaSchema]),
	boolean: shapeKeys([BooleanSchemaSchema]),
	array: shapeKeys([UntitledMultiSelectEnumSchemaSchema, TitledMultiSelectEnumSchemaSchema])
}, SUPPORTED_STRING_FORMATS = new Set(StringSchemaSchema.shape.format.unwrap().options);
function walkProperty(node, path, vendor, unsupported) {
	if (!isJsonObject(node)) return node;
	let allowedKeys = typeof node.type == "string" && Object.hasOwn(PROPERTY_KEYS_BY_TYPE, node.type) ? PROPERTY_KEYS_BY_TYPE[node.type] : void 0;
	if (allowedKeys === void 0) return node;
	let pruned = {};
	for (let [key, value] of Object.entries(node)) allowedKeys.has(key) || isAnnotationOnlyJsonSchemaKeyword(key) ? pruned[key] = value : key === "pattern" && node.type === "string" && typeof node.format == "string" ? SUPPORTED_STRING_FORMATS.has(node.format) ? (typeof value != "string" || !isLibraryFormatPattern(node.format, value, vendor)) && unsupported.push(`${path}.${key}`) : pruned[key] = value : unsupported.push(`${path}.${key}`);
	return pruned;
}
function walkRequestedSchema(converted, vendor) {
	let pruned = {}, unsupported = [];
	for (let [key, value] of Object.entries(converted)) key === "properties" && isJsonObject(value) ? pruned[key] = Object.fromEntries(Object.entries(value).map(([name, node]) => [name, walkProperty(node, `properties.${name}`, vendor, unsupported)])) : ROOT_KEYS.has(key) ? pruned[key] = value : isAnnotationOnlyJsonSchemaKeyword(key) || unsupported.push(key);
	if (unsupported.length > 0) throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Elicitation requestedSchema contains unsupported JSON Schema constraint(s) after Standard Schema conversion: ${unsupported.join(", ")}`);
	return pruned;
}
function describeUnsupportedProperties(pruned, fallback) {
	if (!isJsonObject(pruned.properties)) return fallback;
	let offenders = Object.entries(pruned.properties).filter(([, node]) => !parseSchema(PrimitiveSchemaDefinitionSchema, node).success).map(([name]) => `properties.${name}`);
	return offenders.length > 0 ? offenders.join(", ") : fallback;
}
function findDroppedConstraintPaths(original, parsed, path = "") {
	return Array.isArray(original) && Array.isArray(parsed) ? original.flatMap((item, index) => findDroppedConstraintPaths(item, parsed[index], `${path}[${index}]`)) : !isJsonObject(original) || !isJsonObject(parsed) ? [] : Object.entries(original).flatMap(([key, value]) => {
		let childPath = path ? `${path}.${key}` : key;
		return Object.prototype.hasOwnProperty.call(parsed, key) ? findDroppedConstraintPaths(value, parsed[key], childPath) : isAnnotationOnlyJsonSchemaKeyword(key) ? [] : [childPath];
	});
}
function normalizeElicitInputParams(input) {
	if (!isStandardSchema(input.requestedSchema)) return {
		...input,
		mode: "form",
		requestedSchema: input.requestedSchema
	};
	let vendor = input.requestedSchema["~standard"].vendor, pruned = walkRequestedSchema(convertStandardElicitationSchema(input.requestedSchema), vendor), parsed = parseSchema(ElicitRequestFormParamsSchema.shape.requestedSchema, pruned);
	if (!parsed.success) throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Elicitation requestedSchema only supports flat primitive properties (string, number, integer, boolean, and string enums): ${describeUnsupportedProperties(pruned, parsed.error.message)}`);
	let droppedConstraints = findDroppedConstraintPaths(pruned, parsed.data);
	if (droppedConstraints.length > 0) throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Elicitation requestedSchema contains unsupported JSON Schema constraint(s) after Standard Schema conversion: ${droppedConstraints.join(", ")}`);
	let danglingRequired = (parsed.data.required ?? []).filter((key) => !Object.prototype.hasOwnProperty.call(parsed.data.properties, key));
	if (danglingRequired.length > 0) throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Elicitation requestedSchema lists required properties that are not defined in properties: ${danglingRequired.join(", ")}`);
	return {
		...input,
		mode: "form",
		requestedSchema: parsed.data
	};
}
function buildInputRequired(spec) {
	let hasInputRequests = spec.inputRequests !== void 0 && Object.keys(spec.inputRequests).length > 0, hasRequestState = typeof spec.requestState == "string";
	if (!hasInputRequests && !hasRequestState) throw new TypeError("inputRequired() requires at least one of inputRequests (with at least one entry) or requestState (spec: every InputRequiredResult MUST include at least one of the two)");
	return {
		resultType: "input_required",
		...spec.inputRequests !== void 0 && { inputRequests: spec.inputRequests },
		...spec.requestState !== void 0 && { requestState: spec.requestState }
	};
}
var inputRequired = Object.assign(buildInputRequired, {
	elicit(params) {
		try {
			return {
				method: "elicitation/create",
				params: normalizeElicitInputParams(params)
			};
		} catch (error) {
			throw error instanceof ProtocolError ? new TypeError(error.message, { cause: error }) : error;
		}
	},
	elicitUrl(params) {
		return {
			method: "elicitation/create",
			params: {
				...params,
				mode: "url"
			}
		};
	},
	createMessage(params) {
		return {
			method: "sampling/createMessage",
			params
		};
	},
	listRoots() {
		return { method: "roots/list" };
	}
});
function acceptedContent(responses, key, schema) {
	let view = inputResponse(responses, key);
	if (view.kind !== "elicit" || view.action !== "accept" || view.content === void 0) return;
	if (schema === void 0) return view.content;
	let outcome = schema["~standard"].validate(view.content);
	if (outcome instanceof Promise) throw new TypeError("acceptedContent(responses, key, schema) requires a synchronously-validating schema");
	return outcome.issues === void 0 ? outcome.value : void 0;
}
function inputResponse(responses, key) {
	if (responses === void 0 || typeof responses != "object" || responses === null) return { kind: "missing" };
	let entry = responses[key];
	if (entry === null || typeof entry != "object" || Array.isArray(entry)) return { kind: "missing" };
	let candidate = entry;
	if (candidate.action === "accept" || candidate.action === "decline" || candidate.action === "cancel") {
		let content = candidate.content;
		return {
			kind: "elicit",
			action: candidate.action,
			...content !== null && typeof content == "object" && !Array.isArray(content) && { content }
		};
	}
	return Array.isArray(candidate.roots) ? {
		kind: "roots",
		roots: candidate.roots
	} : typeof candidate.role == "string" && candidate.content !== void 0 ? {
		kind: "sampling",
		result: candidate
	} : { kind: "missing" };
}
var REQUEST_STATE_ONLY_LEG_PACING_MS = 250;
function inputRequiredRoundsExceededMessage(method, maxRounds) {
	return `Multi-round-trip request '${method}' still required input after ${maxRounds} rounds (inputRequired.maxRounds)`;
}
function sleep(ms, signal) {
	return new Promise((resolve, reject) => {
		if (signal?.aborted) {
			reject(signal.reason instanceof SdkError ? signal.reason : new SdkError(SdkErrorCode.RequestTimeout, String(signal.reason)));
			return;
		}
		let timer = setTimeout(() => {
			signal?.removeEventListener("abort", onAbort), resolve();
		}, ms), onAbort = () => {
			clearTimeout(timer), reject(signal?.reason instanceof SdkError ? signal.reason : new SdkError(SdkErrorCode.RequestTimeout, String(signal?.reason)));
		};
		signal?.addEventListener("abort", onAbort, { once: !0 });
	});
}
function linkedRoundAbort(outer) {
	let controller = new AbortController(), onOuterAbort = () => controller.abort(outer?.reason);
	return outer?.addEventListener("abort", onOuterAbort, { once: !0 }), outer?.aborted && controller.abort(outer.reason), {
		signal: controller.signal,
		abort: (reason) => controller.abort(reason),
		dispose: () => outer?.removeEventListener("abort", onOuterAbort)
	};
}
var SPEC_SCHEMA_KEYS = [
	"AnnotationsSchema",
	"AudioContentSchema",
	"BaseMetadataSchema",
	"BlobResourceContentsSchema",
	"BooleanSchemaSchema",
	"CallToolRequestSchema",
	"CallToolRequestParamsSchema",
	"CallToolResultSchema",
	"CancelledNotificationSchema",
	"CancelledNotificationParamsSchema",
	"CancelTaskRequestSchema",
	"CancelTaskResultSchema",
	"ClientCapabilitiesSchema",
	"ClientNotificationSchema",
	"ClientRequestSchema",
	"ClientResultSchema",
	"CompatibilityCallToolResultSchema",
	"CompleteRequestSchema",
	"CompleteRequestParamsSchema",
	"CompleteResultSchema",
	"ContentBlockSchema",
	"CreateMessageRequestSchema",
	"CreateMessageRequestParamsSchema",
	"CreateMessageResultSchema",
	"CreateMessageResultWithToolsSchema",
	"CreateTaskResultSchema",
	"CursorSchema",
	"DiscoverRequestSchema",
	"DiscoverResultSchema",
	"ElicitationCompleteNotificationSchema",
	"ElicitationCompleteNotificationParamsSchema",
	"ElicitRequestSchema",
	"ElicitRequestFormParamsSchema",
	"ElicitRequestParamsSchema",
	"ElicitRequestURLParamsSchema",
	"ElicitResultSchema",
	"EmbeddedResourceSchema",
	"EmptyResultSchema",
	"EnumSchemaSchema",
	"GetPromptRequestSchema",
	"GetPromptRequestParamsSchema",
	"GetPromptResultSchema",
	"GetTaskPayloadRequestSchema",
	"GetTaskPayloadResultSchema",
	"GetTaskRequestSchema",
	"GetTaskResultSchema",
	"IconSchema",
	"IconsSchema",
	"ImageContentSchema",
	"ImplementationSchema",
	"InitializedNotificationSchema",
	"InitializeRequestSchema",
	"InitializeRequestParamsSchema",
	"InitializeResultSchema",
	"JSONArraySchema",
	"JSONObjectSchema",
	"JSONRPCErrorResponseSchema",
	"JSONRPCMessageSchema",
	"JSONRPCNotificationSchema",
	"JSONRPCRequestSchema",
	"JSONRPCResponseSchema",
	"JSONRPCResultResponseSchema",
	"JSONValueSchema",
	"LegacyTitledEnumSchemaSchema",
	"ListPromptsRequestSchema",
	"ListPromptsResultSchema",
	"ListResourcesRequestSchema",
	"ListResourcesResultSchema",
	"ListResourceTemplatesRequestSchema",
	"ListResourceTemplatesResultSchema",
	"ListRootsRequestSchema",
	"ListRootsResultSchema",
	"ListTasksRequestSchema",
	"ListTasksResultSchema",
	"ListToolsRequestSchema",
	"ListToolsResultSchema",
	"LoggingLevelSchema",
	"LoggingMessageNotificationSchema",
	"LoggingMessageNotificationParamsSchema",
	"ModelHintSchema",
	"ModelPreferencesSchema",
	"MultiSelectEnumSchemaSchema",
	"NotificationSchema",
	"NumberSchemaSchema",
	"PaginatedRequestSchema",
	"PaginatedRequestParamsSchema",
	"PaginatedResultSchema",
	"PingRequestSchema",
	"PrimitiveSchemaDefinitionSchema",
	"ProgressSchema",
	"ProgressNotificationSchema",
	"ProgressNotificationParamsSchema",
	"ProgressTokenSchema",
	"PromptSchema",
	"PromptArgumentSchema",
	"PromptListChangedNotificationSchema",
	"PromptMessageSchema",
	"PromptReferenceSchema",
	"ReadResourceRequestSchema",
	"ReadResourceRequestParamsSchema",
	"ReadResourceResultSchema",
	"RelatedTaskMetadataSchema",
	"RequestSchema",
	"RequestIdSchema",
	"RequestMetaSchema",
	"ResourceSchema",
	"ResourceContentsSchema",
	"ResourceLinkSchema",
	"ResourceListChangedNotificationSchema",
	"ResourceRequestParamsSchema",
	"ResourceTemplateSchema",
	"ResourceTemplateReferenceSchema",
	"ResourceUpdatedNotificationSchema",
	"ResourceUpdatedNotificationParamsSchema",
	"ResultMetaObjectSchema",
	"ResultSchema",
	"RoleSchema",
	"RootSchema",
	"RootsListChangedNotificationSchema",
	"SamplingContentSchema",
	"SamplingMessageSchema",
	"SamplingMessageContentBlockSchema",
	"ServerCapabilitiesSchema",
	"ServerNotificationSchema",
	"ServerRequestSchema",
	"ServerResultSchema",
	"SetLevelRequestSchema",
	"SetLevelRequestParamsSchema",
	"SingleSelectEnumSchemaSchema",
	"StringSchemaSchema",
	"SubscribeRequestSchema",
	"SubscribeRequestParamsSchema",
	"SubscriptionFilterSchema",
	"SubscriptionsAcknowledgedNotificationSchema",
	"SubscriptionsAcknowledgedNotificationParamsSchema",
	"SubscriptionsListenRequestSchema",
	"SubscriptionsListenRequestParamsSchema",
	"SubscriptionsListenResultSchema",
	"SubscriptionsListenResultMetaSchema",
	"TaskAugmentedRequestParamsSchema",
	"TaskCreationParamsSchema",
	"TaskMetadataSchema",
	"TaskSchema",
	"TaskStatusSchema",
	"TaskStatusNotificationSchema",
	"TaskStatusNotificationParamsSchema",
	"TextContentSchema",
	"TextResourceContentsSchema",
	"TitledMultiSelectEnumSchemaSchema",
	"TitledSingleSelectEnumSchemaSchema",
	"ToolSchema",
	"ToolAnnotationsSchema",
	"ToolChoiceSchema",
	"ToolExecutionSchema",
	"ToolListChangedNotificationSchema",
	"ToolResultContentSchema",
	"ToolUseContentSchema",
	"UnsubscribeRequestSchema",
	"UnsubscribeRequestParamsSchema",
	"UntitledMultiSelectEnumSchemaSchema",
	"UntitledSingleSelectEnumSchemaSchema"
], authSchemas = {
	IdJagTokenExchangeResponseSchema,
	OAuthClientInformationFullSchema,
	OAuthClientInformationSchema,
	OAuthClientMetadataSchema,
	OAuthClientRegistrationErrorSchema,
	OAuthErrorResponseSchema,
	OAuthMetadataSchema,
	OAuthProtectedResourceMetadataSchema,
	OAuthTokenRevocationRequestSchema,
	OAuthTokensSchema,
	OpenIdProviderDiscoveryMetadataSchema,
	OpenIdProviderMetadataSchema
}, _specTypeSchemas = {}, _isSpecType = {};
function register(key, schema) {
	let name = key.slice(0, -6);
	_specTypeSchemas[name] = schema, _isSpecType[name] = (v) => schema.safeParse(v).success;
}
for (let key of SPEC_SCHEMA_KEYS) register(key, schemas_exports[key]);
for (let [key, schema] of Object.entries(authSchemas)) register(key, schema);
var specTypeSchemas = Object.freeze(_specTypeSchemas), isSpecType = Object.freeze(_isSpecType);
function bootstrapOutboundCodec(method) {
	switch (method) {
		case "initialize":
		case "notifications/initialized":
			return codecForVersion(void 0);
		case "server/discover":
			return codecForVersion(MODERN_WIRE_REVISION);
		default:
			return;
	}
}
var DEFAULT_REQUEST_TIMEOUT_MSEC = 6e4, RESERVED_ENVELOPE_META_KEYS = [
	PROTOCOL_VERSION_META_KEY,
	CLIENT_INFO_META_KEY,
	CLIENT_CAPABILITIES_META_KEY,
	LOG_LEVEL_META_KEY
], RETRY_PARAMS_KEYS = ["inputResponses", "requestState"];
function liftWireOnlyMaterial(message, kind) {
	let params = message.params;
	if (!isPlainObject$1(params)) return {
		message,
		lifted: {}
	};
	let meta = params._meta, envelopeKeys = isPlainObject$1(meta) ? RESERVED_ENVELOPE_META_KEYS.filter((key) => key in meta) : [], retryKeys = kind === "request" ? RETRY_PARAMS_KEYS.filter((key) => key in params) : [];
	if (envelopeKeys.length === 0 && retryKeys.length === 0) return {
		message,
		lifted: {}
	};
	let lifted = {}, nextParams = { ...params };
	if (envelopeKeys.length > 0 && isPlainObject$1(meta)) {
		let envelope = {}, nextMeta = { ...meta };
		for (let key of envelopeKeys)
			envelope[key] = meta[key], delete nextMeta[key];
		lifted.envelope = envelope, Object.keys(nextMeta).length > 0 ? nextParams._meta = nextMeta : delete nextParams._meta;
	}
	for (let key of retryKeys)
		key === "inputResponses" && (lifted.inputResponses = nextParams[key]), key === "requestState" && (lifted.requestState = nextParams[key]), delete nextParams[key];
	return {
		message: {
			...message,
			params: nextParams
		},
		lifted
	};
}
function codecResultValidator(codec, method) {
	let probe = codec.validateResult(method, void 0);
	if (!(!probe.ok && probe.reason === "not-in-era"))
		return { "~standard": {
			version: 1,
			vendor: "mcp-wire-codec",
			validate(value) {
				let outcome = codec.validateResult(method, value);
				return outcome.ok ? { value: outcome.value } : { issues: [{ message: outcome.reason === "invalid" ? outcome.message : `not-in-era: ${method}` }] };
			}
		} };
}
function requestStateAccessor(value) {
	return () => value;
}
var NO_REQUEST_STATE = requestStateAccessor(void 0);
function withRequestStateValue(ctx, value) {
	return {
		...ctx,
		mcpReq: {
			...ctx.mcpReq,
			requestState: requestStateAccessor(value)
		}
	};
}
var writeNegotiatedProtocolVersion;
function setNegotiatedProtocolVersion(instance, version) {
	writeNegotiatedProtocolVersion(instance, version);
}
var Protocol = class {
	_transport;
	_requestMessageId = 0;
	_requestHandlers = /* @__PURE__ */ new Map();
	/** Methods registered with an explicit schema; the era gate in `_onrequest` reads it for the Tasks extension names. */
	_customSchemaRequestMethods = /* @__PURE__ */ new Set();
	_requestHandlerAbortControllers = /* @__PURE__ */ new Map();
	_notificationHandlers = /* @__PURE__ */ new Map();
	_responseHandlers = /* @__PURE__ */ new Map();
	_progressHandlers = /* @__PURE__ */ new Map();
	_timeoutInfo = /* @__PURE__ */ new Map();
	_pendingDebouncedNotifications = /* @__PURE__ */ new Set();
	/**
	* The protocol version negotiated for the current connection (`undefined`
	* before negotiation completes), which determines the wire era this
	* instance speaks. Set by the SDK's negotiation and initialize paths
	* (`Client.connect`, `Server._oninitialize`).
	*/
	_negotiatedProtocolVersion;
	static {
		writeNegotiatedProtocolVersion = (instance, version) => {
			instance._negotiatedProtocolVersion = version;
		};
	}
	_supportedProtocolVersions;
	/**
	* Callback for when the connection is closed for any reason.
	*
	* This is invoked when {@linkcode Protocol.close | close()} is called as well.
	*/
	onclose;
	/**
	* Callback for when an error occurs.
	*
	* Note that errors are not necessarily fatal; they are used for reporting any kind of exceptional condition out of band.
	*/
	onerror;
	/**
	* A handler to invoke for any request types that do not have their own handler installed.
	*/
	fallbackRequestHandler;
	/**
	* A handler to invoke for any notification types that do not have their own handler installed.
	*/
	fallbackNotificationHandler;
	constructor(_options) {
		this._options = _options, this._supportedProtocolVersions = _options?.supportedProtocolVersions ?? SUPPORTED_PROTOCOL_VERSIONS, this.setNotificationHandler("notifications/cancelled", (notification) => {
			this._oncancel(notification);
		}), this.setNotificationHandler("notifications/progress", (notification) => {
			this._onprogress(notification);
		}), this.setRequestHandler("ping", (_request) => ({}));
	}
	/**
	* Drop consult for inbound messages whose transport did not classify them
	* at the edge — long-lived channels such as stdio, where a role class may
	* need to decline traffic the negotiated era has no answer for (the
	* client-side inbound-request drop on modern-era connections: the
	* 2026-07-28 era has no server→client request channel, and on stdio the
	* client must never write JSON-RPC responses).
	*
	* Consulted ONLY when the transport supplied no
	* {@linkcode MessageExtraInfo.classification}: edge-classified traffic
	* never reaches the hook. Returning `'drop'` discards the message without
	* writing any response (requests are surfaced via `onerror`). The base
	* implementation returns `undefined`: unclassified traffic keeps today's
	* dispatch path unchanged. Era selection never happens here — era is
	* instance state, owned by the serving entry that constructed and
	* connected the instance.
	*/
	_shouldDropInbound(_message) {
	}
	/**
	* The per-request `_meta` envelope this instance attaches to every outgoing
	* request and notification, when one applies. The base implementation
	* returns `undefined` (no envelope — the 2025-era posture, so legacy-era
	* outbound traffic is byte-identical to a build without this seam).
	* `Client` overrides it on a connection that negotiated a modern (2026-07-28+)
	* era to return the reserved protocol-version / client-info /
	* client-capabilities keys. User-supplied `_meta` keys take precedence over
	* the auto-attached ones.
	*/
	_outboundMetaEnvelope() {
	}
	/**
	* Attach this instance's outbound `_meta` envelope (when one is configured)
	* to a request or notification. A no-op when the seam returns `undefined`
	* — the message returns by reference, so the legacy-era wire stays
	* byte-identical. User-supplied `_meta` keys are spread last so they win
	* over the auto-attached envelope keys.
	*/
	_envelopeOutbound(message) {
		let envelope = this._outboundMetaEnvelope();
		if (envelope === void 0) return message;
		let params = message.params ?? {};
		return {
			...message,
			params: {
				...params,
				_meta: {
					...envelope,
					...params._meta
				}
			}
		};
	}
	/**
	* Extension point for non-`complete` decoded results in the response
	* funnel: a result the wire codec discriminated into a kind other than
	* `'complete'` or `'invalid'` is handed here for the role class to
	* resolve. The base default surfaces it as a typed
	* {@linkcode SdkErrorCode.UnsupportedResultType} error (no retry).
	*
	* Intended consumers (named so the seam stays accountable):
	* - the `Client`'s multi-round-trip auto-fulfilment engine, which fulfils
	*   `'input_required'` results through the registered
	*   elicitation/sampling/roots handlers and retries via `flow.retry`;
	* - a future client-side terminal-result handler for
	*   `subscriptions/listen`, when the spec defines one.
	*
	* `Server` instances never receive `input_required` responses on their
	* outbound legs and leave the base behavior in place.
	*/
	_resolveNonCompleteResult(decoded, flow) {
		return Promise.reject(new SdkError(SdkErrorCode.UnsupportedResultType, `Unsupported result type '${decoded.kind}' for ${flow.request.method}`, {
			resultType: decoded.kind,
			method: flow.request.method
		}));
	}
	/**
	* Protected accessor for a registered request handler. Used by role
	* classes that dispatch synthesized requests through the same stored
	* handler chain (e.g. the `Client` fulfilling an embedded multi-round-trip
	* input request).
	*/
	_getRequestHandler(method) {
		return this._requestHandlers.get(method);
	}
	async _oncancel(notification) {
		notification.params.requestId !== void 0 && this._requestHandlerAbortControllers.get(notification.params.requestId)?.abort(notification.params.reason);
	}
	_setupTimeout(messageId, timeout, maxTotalTimeout, onTimeout, resetTimeoutOnProgress = !1) {
		this._timeoutInfo.set(messageId, {
			timeoutId: setTimeout(onTimeout, timeout),
			startTime: Date.now(),
			timeout,
			maxTotalTimeout,
			resetTimeoutOnProgress,
			onTimeout
		});
	}
	_resetTimeout(messageId) {
		let info = this._timeoutInfo.get(messageId);
		if (!info) return !1;
		let totalElapsed = Date.now() - info.startTime;
		if (info.maxTotalTimeout && totalElapsed >= info.maxTotalTimeout)
			throw this._timeoutInfo.delete(messageId), new SdkError(SdkErrorCode.RequestTimeout, "Maximum total timeout exceeded", {
				maxTotalTimeout: info.maxTotalTimeout,
				totalElapsed
			});
		return clearTimeout(info.timeoutId), info.timeoutId = setTimeout(info.onTimeout, info.timeout), !0;
	}
	_cleanupTimeout(messageId) {
		let info = this._timeoutInfo.get(messageId);
		info && (clearTimeout(info.timeoutId), this._timeoutInfo.delete(messageId));
	}
	/**
	* Attaches to the given transport, starts it, and starts listening for messages.
	*
	* The caller assumes ownership of the {@linkcode Transport}, replacing any callbacks that have already been set, and expects that it is the only user of the {@linkcode Transport} instance going forward.
	*/
	async connect(transport) {
		this._transport = transport;
		let _onclose = this.transport?.onclose;
		this._transport.onclose = () => {
			try {
				_onclose?.();
			} finally {
				this._onclose();
			}
		};
		let _onerror = this.transport?.onerror;
		this._transport.onerror = (error) => {
			_onerror?.(error), this._onerror(error);
		};
		let _onmessage = this._transport?.onmessage;
		this._transport.onmessage = (message, extra) => {
			_onmessage?.(message, extra), isJSONRPCResultResponse(message) || isJSONRPCErrorResponse(message) ? this._onresponse(message) : isJSONRPCRequest(message) ? this._onrequest(message, extra) : isJSONRPCNotification(message) ? this._onnotification(message, extra) : this._onerror(/* @__PURE__ */ new Error(`Unknown message type: ${JSON.stringify(message)}`));
		}, transport.setSupportedProtocolVersions?.(this._supportedProtocolVersions), await this._transport.start();
	}
	/**
	* Transport-close hook. Subclass overrides MUST call `super._onclose()`
	* after their own cleanup — base teardown (response-handler settlement,
	* timeout clearing, in-flight request abort) does not run otherwise.
	*/
	_onclose() {
		let responseHandlers = this._responseHandlers;
		this._responseHandlers = /* @__PURE__ */ new Map(), this._progressHandlers.clear(), this._pendingDebouncedNotifications.clear();
		for (let info of this._timeoutInfo.values()) clearTimeout(info.timeoutId);
		this._timeoutInfo.clear();
		let requestHandlerAbortControllers = this._requestHandlerAbortControllers;
		this._requestHandlerAbortControllers = /* @__PURE__ */ new Map();
		let error = new SdkError(SdkErrorCode.ConnectionClosed, "Connection closed");
		this._transport = void 0;
		try {
			this.onclose?.();
		} finally {
			for (let handler of responseHandlers.values()) handler(error);
			for (let controller of requestHandlerAbortControllers.values()) controller.abort(error);
		}
	}
	_onerror(error) {
		this.onerror?.(error);
	}
	/**
	* Inbound-notification dispatch. Subclass overrides MUST delegate
	* unmatched traffic to `super._onnotification(rawNotification, extra)` —
	* an override that consumes only what it owns and falls through to base
	* dispatch for everything else.
	*/
	_onnotification(rawNotification, extra) {
		let { message: notification } = liftWireOnlyMaterial(rawNotification, "notification"), codec = this._negotiatedWireCodec();
		if (extra?.classification === void 0 && this._shouldDropInbound(rawNotification) === "drop") return;
		if (extra?.classification !== void 0) {
			let classified = classifiedWireEra(extra.classification);
			if (classified !== codec.era) {
				this._onerror(/* @__PURE__ */ new Error(`Era mismatch on inbound notification '${notification.method}': classified as ${classified} but this instance serves ${codec.era}`));
				return;
			}
		}
		if (isSpecNotificationMethod(notification.method) && !codec.hasNotificationMethod(notification.method)) return;
		let handler = this._notificationHandlers.get(notification.method), fallback = this.fallbackNotificationHandler;
		handler === void 0 && fallback === void 0 || Promise.resolve().then(() => handler === void 0 ? fallback(notification) : handler(notification, codec)).catch((error) => this._onerror(/* @__PURE__ */ new Error(`Uncaught error in notification handler: ${error}`)));
	}
	_onrequest(rawRequest, extra) {
		let { message: request, lifted } = liftWireOnlyMaterial(rawRequest, "request"), codec = this._negotiatedWireCodec();
		if (extra?.classification === void 0 && this._shouldDropInbound(rawRequest) === "drop") {
			this._onerror(/* @__PURE__ */ new Error(`Dropped inbound request '${rawRequest.method}': not servable on this connection's protocol era`));
			return;
		}
		let capturedTransport = this._transport, sendErrorResponse = (code, message, data) => {
			let errorResponse = {
				jsonrpc: "2.0",
				id: request.id,
				error: {
					code,
					message,
					...data !== void 0 && { data }
				}
			};
			capturedTransport?.send(errorResponse).catch((error) => this._onerror(/* @__PURE__ */ new Error(`Failed to send an error response: ${error}`)));
		};
		if (extra?.classification !== void 0) {
			let classified = classifiedWireEra(extra.classification);
			if (classified !== codec.era) {
				this._onerror(/* @__PURE__ */ new Error(`Era mismatch on inbound request '${request.method}': classified as ${classified} but this instance serves ${codec.era}`));
				let requested = extra.classification.revision ?? classified;
				sendErrorResponse(ProtocolErrorCode.UnsupportedProtocolVersion, `Unsupported protocol version: ${requested}`, {
					supported: this._supportedProtocolVersions,
					requested
				});
				return;
			}
		}
		if (isSpecRequestMethod(request.method) && !codec.hasRequestMethod(request.method) && !(isExtensionReusedRequestMethod(request.method) && this._customSchemaRequestMethods.has(request.method))) {
			sendErrorResponse(ProtocolErrorCode.MethodNotFound, "Method not found");
			return;
		}
		let handler = this._requestHandlers.get(request.method) ?? this.fallbackRequestHandler;
		if (handler === void 0) {
			sendErrorResponse(ProtocolErrorCode.MethodNotFound, "Method not found");
			return;
		}
		let envelopeError = codec.checkInboundEnvelope(lifted);
		if (envelopeError !== void 0) {
			sendErrorResponse(ProtocolErrorCode.InvalidParams, envelopeError);
			return;
		}
		let sendNotification = (notification, options) => this._notificationViaCodec(this._resolveOutboundCodec(notification.method), notification, {
			...options,
			relatedRequestId: request.id
		}), sendRequest = (r, resultSchema, options) => this._requestWithSchemaViaCodec(this._resolveOutboundCodec(r.method), r, resultSchema, {
			...options,
			relatedRequestId: request.id
		}), abortController = new AbortController();
		this._requestHandlerAbortControllers.set(request.id, abortController);
		let partitionedInputResponses = lifted.inputResponses === void 0 ? void 0 : partitionInputResponses(lifted.inputResponses), baseCtx = {
			sessionId: capturedTransport?.sessionId,
			mcpReq: {
				id: request.id,
				method: request.method,
				_meta: request.params?._meta,
				...lifted.envelope !== void 0 && { envelope: lifted.envelope },
				...partitionedInputResponses !== void 0 && { inputResponses: partitionedInputResponses.accepted },
				...partitionedInputResponses !== void 0 && partitionedInputResponses.droppedKeys.length > 0 && { droppedInputResponseKeys: partitionedInputResponses.droppedKeys },
				requestState: lifted.requestState === void 0 ? NO_REQUEST_STATE : requestStateAccessor(lifted.requestState),
				signal: abortController.signal,
				send: ((r, schemaOrOptions, maybeOptions) => {
					let sendCodec = this._resolveOutboundCodec(r.method);
					if (this._assertOutboundRequestInEra(sendCodec, r.method), isStandardSchema(schemaOrOptions)) return sendRequest(r, schemaOrOptions, maybeOptions);
					let validate = codecResultValidator(sendCodec, r.method);
					if (validate === void 0) throw new TypeError(`'${r.method}' is not a spec method; pass a result schema as the second argument to ctx.mcpReq.send().`);
					return sendRequest(r, validate, schemaOrOptions);
				}),
				notify: sendNotification
			},
			http: extra?.authInfo ? { authInfo: extra.authInfo } : void 0
		}, ctx = this.buildContext(baseCtx, extra);
		Promise.resolve().then(() => handler(request, ctx)).then(async (result) => {
			if (abortController.signal.aborted) return;
			let encoded;
			try {
				encoded = codec.encodeResult(request.method, result, this._outboundServerInfo());
			} catch (error) {
				this._onerror(/* @__PURE__ */ new Error(`Failed to encode result for ${request.method}: ${error}`)), sendErrorResponse(ProtocolErrorCode.InternalError, "Internal error");
				return;
			}
			let response = {
				result: encoded,
				jsonrpc: "2.0",
				id: request.id
			};
			await capturedTransport?.send(response);
		}, async (error) => {
			if (abortController.signal.aborted) return;
			let thrownCode = Number.isSafeInteger(error.code) ? error.code : ProtocolErrorCode.InternalError, errorResponse = {
				jsonrpc: "2.0",
				id: request.id,
				error: {
					code: codec.encodeErrorCode(thrownCode),
					message: error.message ?? "Internal error",
					...error.data !== void 0 && { data: error.data }
				}
			};
			await capturedTransport?.send(errorResponse);
		}).catch((error) => this._onerror(/* @__PURE__ */ new Error(`Failed to send response: ${error}`))).finally(() => {
			this._requestHandlerAbortControllers.get(request.id) === abortController && this._requestHandlerAbortControllers.delete(request.id);
		});
	}
	_onprogress(notification) {
		let { progressToken, ...params } = notification.params, messageId = Number(progressToken), handler = this._progressHandlers.get(messageId);
		if (!handler) {
			this._onerror(/* @__PURE__ */ new Error(`Received a progress notification for an unknown token: ${JSON.stringify(notification)}`));
			return;
		}
		let responseHandler = this._responseHandlers.get(messageId), timeoutInfo = this._timeoutInfo.get(messageId);
		if (timeoutInfo && responseHandler && timeoutInfo.resetTimeoutOnProgress) try {
			this._resetTimeout(messageId);
		} catch (error) {
			this._responseHandlers.delete(messageId), this._progressHandlers.delete(messageId), this._cleanupTimeout(messageId), responseHandler(error);
			return;
		}
		handler(params);
	}
	/**
	* Inbound-response dispatch. Subclass overrides MUST delegate unmatched
	* traffic to `super._onresponse(response)` — an override that consumes
	* only what it owns and falls through to base dispatch for everything
	* else.
	*/
	_onresponse(response) {
		let messageId = Number(response.id), handler = this._responseHandlers.get(messageId);
		if (handler === void 0) {
			this._onerror(/* @__PURE__ */ new Error(`Received a response for an unknown message ID: ${JSON.stringify(response)}`));
			return;
		}
		this._responseHandlers.delete(messageId), this._cleanupTimeout(messageId), this._progressHandlers.delete(messageId), isJSONRPCResultResponse(response) ? handler(response) : handler(ProtocolError.fromError(response.error.code, response.error.message, response.error.data));
	}
	get transport() {
		return this._transport;
	}
	/**
	* Closes the connection.
	*/
	async close() {
		await this._transport?.close();
	}
	request(request, schemaOrOptions, maybeOptions) {
		let codec = this._resolveOutboundCodec(request.method);
		if (isStandardSchema(schemaOrOptions))
			return isExtensionReusedRequestMethod(request.method) || this._assertOutboundRequestInEra(codec, request.method), this._requestWithSchemaViaCodec(codec, request, schemaOrOptions, maybeOptions);
		this._assertOutboundRequestInEra(codec, request.method);
		let validate = codecResultValidator(codec, request.method);
		if (validate === void 0) throw new TypeError(`'${request.method}' is not a spec method; pass a result schema as the second argument to request().`);
		return this._requestWithSchemaViaCodec(codec, request, validate, schemaOrOptions);
	}
	/**
	* The wire codec for this instance's negotiated era — the phase-2 truth:
	* everything an established connection sends and receives resolves
	* through it. Legacy until a version has been negotiated.
	*/
	_negotiatedWireCodec() {
		return codecForVersion(this._negotiatedProtocolVersion);
	}
	/**
	* Protected accessor for the instance's negotiated wire codec, for role
	* classes (Client/Server/McpServer) routing era-dependent behavior
	* through the codec's function-only surface — `samplingResultVariant`,
	* `outboundEnvelope`, `projectCallToolResult` — instead of branching on
	* the protocol version themselves.
	*/
	_wireCodec() {
		return this._negotiatedWireCodec();
	}
	/**
	* Outbound codec resolution: while the negotiated version is still unset
	* (the negotiation window), lifecycle messages are bootstrap-pinned BY
	* METHOD — they self-identify their era (`initialize` IS the legacy
	* handshake, `server/discover` IS the modern probe). Once a version has
	* been negotiated, the instance era is authoritative for everything — a
	* negotiated session never re-routes a method onto the other era.
	*/
	_resolveOutboundCodec(method) {
		if (this._negotiatedProtocolVersion === void 0) {
			let pinned = bootstrapOutboundCodec(method);
			if (pinned) return pinned;
		}
		return this._negotiatedWireCodec();
	}
	/**
	* Era gate for outbound requests — deletions are physical in BOTH
	* directions: sending a spec method that the resolved era does not define
	* dies locally with a typed error before anything reaches the transport.
	* Methods outside the spec universe are consumer-owned extension methods
	* and stay era-blind.
	*/
	_assertOutboundRequestInEra(codec, method) {
		if (isSpecRequestMethod(method) && !codec.hasRequestMethod(method)) throw new SdkError(SdkErrorCode.MethodNotSupportedByProtocolVersion, `Method '${method}' is not supported by the negotiated protocol version (wire era ${codec.era})`, {
			method,
			era: codec.era
		});
	}
	/**
	* Sends a request and waits for a response, using the provided schema for
	* validation instead of the era registry's method-keyed entry.
	*
	* This is the internal implementation used by SDK methods whose result
	* schema cannot be expressed as a method-keyed registry entry — the one
	* surviving case is `server.createMessage`, whose result schema depends
	* on the REQUEST params (tools vs no tools) — and by callers passing
	* explicit compatibility schemas. Spec methods are still era-gated here:
	* an explicit schema never smuggles a deleted method onto the wire.
	*/
	_requestWithSchema(request, resultSchema, options) {
		let codec = this._resolveOutboundCodec(request.method);
		return this._assertOutboundRequestInEra(codec, request.method), this._requestWithSchemaViaCodec(codec, request, resultSchema, options);
	}
	/**
	* The request funnel proper, keyed by the resolved era codec: the codec
	* owns result decoding (raw-first `resultType` discrimination — V-1 —
	* and the era's lift posture) before the schema validation step.
	*/
	_requestWithSchemaViaCodec(codec, request, resultSchema, options) {
		let { relatedRequestId, resumptionToken, onresumptiontoken, headers } = options ?? {}, flowStartedAt = Date.now(), onAbort, cleanupMessageId;
		return new Promise((resolve, reject) => {
			let earlyReject = (error) => {
				reject(error);
			};
			if (!this._transport) {
				earlyReject(/* @__PURE__ */ new Error("Not connected"));
				return;
			}
			if (this._options?.enforceStrictCapabilities === !0) try {
				this.assertCapabilityForMethod(request.method);
			} catch (error) {
				earlyReject(error);
				return;
			}
			if (options?.signal?.aborted) {
				let reason = options.signal.reason;
				throw reason instanceof SdkError ? reason : new SdkError(SdkErrorCode.RequestTimeout, String(reason));
			}
			let requestAbort = codec.era === MODERN_WIRE_REVISION && this._transport.hasPerRequestStream === !0 ? new AbortController() : void 0, messageId = this._requestMessageId++;
			cleanupMessageId = messageId;
			let jsonrpcRequest = {
				...request,
				jsonrpc: "2.0",
				id: messageId
			};
			options?.onprogress && (this._progressHandlers.set(messageId, options.onprogress), jsonrpcRequest.params = {
				...request.params,
				_meta: {
					...request.params?._meta,
					progressToken: messageId
				}
			});
			let outbound = this._envelopeOutbound(jsonrpcRequest), responseReceived = !1, cancel = (reason) => {
				responseReceived || (this._progressHandlers.delete(messageId), requestAbort === void 0 ? request.method !== "initialize" && this._transport?.send(this._envelopeOutbound({
					jsonrpc: "2.0",
					method: "notifications/cancelled",
					params: {
						requestId: messageId,
						reason: String(reason)
					}
				}), {
					relatedRequestId,
					resumptionToken,
					onresumptiontoken
				}).catch((error) => this._onerror(/* @__PURE__ */ new Error(`Failed to send cancellation: ${error}`))) : requestAbort.abort(), reject(reason instanceof SdkError ? reason : new SdkError(SdkErrorCode.RequestTimeout, String(reason))));
			};
			this._responseHandlers.set(messageId, (response) => {
				if (options?.signal?.aborted) return;
				if (responseReceived = !0, response instanceof Error) return reject(response);
				let decoded;
				try {
					decoded = codec.decodeResult(request.method, response.result);
				} catch (error) {
					return reject(error instanceof Error ? error : new Error(String(error)));
				}
				if (decoded.kind === "invalid") return reject(decoded.error);
				if (decoded.kind === "input_required") {
					if (options?.allowInputRequired === !0) return resolve(manualInputRequiredValue(decoded));
					let flow = {
						codec,
						request,
						resultSchema,
						options,
						flowStartedAt,
						retry: (params, legOptions) => this._requestWithSchemaViaCodec(codec, params === void 0 ? { method: request.method } : {
							method: request.method,
							params
						}, resultSchema, legOptions)
					};
					return resolve(this._resolveNonCompleteResult(decoded, flow));
				}
				let result = decoded.result;
				validateStandardSchema(resultSchema, result).then((parseResult) => {
					parseResult.success ? resolve(parseResult.data) : reject(new SdkError(SdkErrorCode.InvalidResult, `Invalid result for ${request.method}: ${parseResult.error}`));
				}, reject);
			}), onAbort = () => cancel(options?.signal?.reason), options?.signal?.addEventListener("abort", onAbort, { once: !0 });
			let timeout = options?.timeout ?? DEFAULT_REQUEST_TIMEOUT_MSEC, timeoutHandler = () => cancel(new SdkError(SdkErrorCode.RequestTimeout, "Request timed out", { timeout }));
			this._setupTimeout(messageId, timeout, options?.maxTotalTimeout, timeoutHandler, options?.resetTimeoutOnProgress ?? !1), this._transport.send(outbound, {
				relatedRequestId,
				resumptionToken,
				onresumptiontoken,
				headers,
				requestSignal: requestAbort?.signal
			}).catch((error) => {
				this._progressHandlers.delete(messageId), reject(error);
			});
		}).finally(() => {
			onAbort && options?.signal?.removeEventListener("abort", onAbort), cleanupMessageId !== void 0 && (this._responseHandlers.delete(cleanupMessageId), this._cleanupTimeout(cleanupMessageId));
		});
	}
	/**
	* Emits a notification, which is a one-way message that does not expect a response.
	*/
	async notification(notification, options) {
		return await this._notificationViaCodec(this._resolveOutboundCodec(notification.method), notification, options);
	}
	/**
	* The notification funnel proper, keyed by the resolved era codec —
	* direct sends and related notifications (`ctx.mcpReq.notify`) alike
	* resolve through the instance's negotiated era at send time.
	*/
	async _notificationViaCodec(codec, notification, options) {
		if (!this._transport) throw new SdkError(SdkErrorCode.NotConnected, "Not connected");
		if (isSpecNotificationMethod(notification.method) && !codec.hasNotificationMethod(notification.method)) throw new SdkError(SdkErrorCode.MethodNotSupportedByProtocolVersion, `Notification '${notification.method}' is not supported by the negotiated protocol version (wire era ${codec.era})`, {
			method: notification.method,
			era: codec.era
		});
		this.assertNotificationCapability(notification.method);
		let jsonrpcNotification = this._envelopeOutbound({
			jsonrpc: "2.0",
			...notification
		});
		if ((this._options?.debouncedNotificationMethods ?? []).includes(notification.method) && !notification.params && options?.relatedRequestId === void 0) {
			if (this._pendingDebouncedNotifications.has(notification.method)) return;
			this._pendingDebouncedNotifications.add(notification.method), Promise.resolve().then(() => {
				this._pendingDebouncedNotifications.delete(notification.method), this._transport && this._transport?.send(jsonrpcNotification, options).catch((error) => this._onerror(error));
			});
			return;
		}
		await this._transport.send(jsonrpcNotification, options);
	}
	setRequestHandler(method, schemasOrHandler, maybeHandler) {
		this.assertRequestHandlerCapability(method);
		let stored;
		if (typeof schemasOrHandler == "function") {
			if (!isSpecRequestMethod(method)) throw new TypeError(`'${method}' is not a spec request method; pass schemas as the second argument to setRequestHandler().`);
			stored = (request, ctx) => {
				let dispatchCodec = this._negotiatedWireCodec(), outcome = dispatchCodec.validateRequest(method, request);
				if (!outcome.ok && outcome.reason === "not-in-era" && (outcome = dispatchCodec.validateInputRequest(method, request)), !outcome.ok)
					throw outcome.reason === "not-in-era" ? new ProtocolError(ProtocolErrorCode.InternalError, `No wire schema for ${method} in the resolved era`) : new Error(outcome.message);
				return Promise.resolve(schemasOrHandler(outcome.value, ctx));
			};
		} else if (maybeHandler) stored = async (request, ctx) => {
			let parsed = await validateStandardSchema(schemasOrHandler.params, { ...request.params });
			if (!parsed.success) throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Invalid params for ${method}: ${parsed.error}`);
			return maybeHandler(parsed.data, ctx);
		};
		else throw new TypeError("setRequestHandler: handler is required");
		typeof schemasOrHandler == "function" ? this._customSchemaRequestMethods.delete(method) : this._customSchemaRequestMethods.add(method), this._requestHandlers.set(method, this._wrapHandler(method, stored));
	}
	/**
	* Hook for subclasses to wrap a registered request handler with role-specific
	* validation or behavior (e.g. `Server` validates `tools/call` results, `Client`
	* validates `elicitation/create` mode and result). Runs for both the 2-arg and
	* 3-arg registration paths. The default implementation is identity.
	*
	* Subclasses overriding this hook avoid redeclaring `setRequestHandler`'s overload set.
	*/
	_wrapHandler(_method, handler) {
		return handler;
	}
	/**
	* Hook for subclasses to supply the implementation identity the 2026-era
	* encode seam stamps into outbound result `_meta` under
	* `io.modelcontextprotocol/serverInfo` (spec PR #3002: servers SHOULD
	* identify themselves on every response). The default is `undefined` — no
	* stamp. Only `Server` overrides this: the key identifies the software
	* producing a response, and the 2025-era codec never stamps anything
	* regardless (the never-stamp guarantee).
	*/
	_outboundServerInfo() {
	}
	/**
	* Removes the request handler for the given method.
	*/
	removeRequestHandler(method) {
		this._requestHandlers.delete(method), this._customSchemaRequestMethods.delete(method);
	}
	/**
	* Asserts that a request handler has not already been set for the given method, in preparation for a new one being automatically installed.
	*/
	assertCanSetRequestHandler(method) {
		if (this._requestHandlers.has(method)) throw new Error(`A request handler for ${method} already exists, which would be overridden`);
	}
	setNotificationHandler(method, schemasOrHandler, maybeHandler) {
		if (typeof schemasOrHandler == "function") {
			if (!isSpecNotificationMethod(method)) throw new TypeError(`'${method}' is not a spec notification method; pass schemas as the second argument to setNotificationHandler().`);
			this._notificationHandlers.set(method, (notification, codec) => {
				let outcome = codec.validateNotification(method, notification);
				if (!outcome.ok)
					throw outcome.reason === "not-in-era" ? new ProtocolError(ProtocolErrorCode.InternalError, `No wire schema for ${method} in the resolved era`) : new Error(outcome.message);
				return Promise.resolve(schemasOrHandler(outcome.value));
			});
			return;
		}
		if (!maybeHandler) throw new TypeError("setNotificationHandler: handler is required");
		this._notificationHandlers.set(method, async (notification) => {
			let parsed = await validateStandardSchema(schemasOrHandler.params, { ...notification.params });
			if (!parsed.success) throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Invalid params for notification ${method}: ${parsed.error}`);
			await maybeHandler(parsed.data, notification);
		});
	}
	/**
	* Removes the notification handler for the given method.
	*/
	removeNotificationHandler(method) {
		this._notificationHandlers.delete(method);
	}
};
function isPlainObject$1(value) {
	return value !== null && typeof value == "object" && !Array.isArray(value);
}
function mergeCapabilities(base, additional) {
	let result = { ...base };
	for (let key in additional) {
		let k = key, addValue = additional[k];
		if (addValue === void 0) continue;
		let baseValue = result[k];
		result[k] = isPlainObject$1(baseValue) && isPlainObject$1(addValue) ? {
			...baseValue,
			...addValue
		} : addValue;
	}
	return result;
}
function isPlainObject(value) {
	return typeof value == "object" && value !== null && !Array.isArray(value);
}
function partitionInputResponses(inputResponses) {
	let accepted = {}, droppedKeys = [];
	if (!isPlainObject(inputResponses)) return {
		accepted,
		droppedKeys
	};
	for (let [key, entry] of Object.entries(inputResponses)) {
		if (!isPlainObject(entry) || "method" in entry || "result" in entry) {
			droppedKeys.push(key);
			continue;
		}
		accepted[key] = entry;
	}
	return {
		accepted,
		droppedKeys
	};
}
function manualInputRequiredValue(decoded) {
	return {
		resultType: "input_required",
		inputRequests: decoded.inputRequests,
		...decoded.requestState !== void 0 && { requestState: decoded.requestState },
		...decoded._meta !== void 0 && { _meta: decoded._meta }
	};
}
var require_content_type = /* @__PURE__ */ __commonJSMin(((exports) => {
	var PARAM_REGEXP = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g, QESC_REGEXP = /\\([\u000b\u0020-\u00ff])/g, TYPE_REGEXP = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
	exports.parse = parse;
	function parse(string2) {
		if (!string2) throw new TypeError("argument string is required");
		var header = typeof string2 == "object" ? getcontenttype(string2) : string2;
		if (typeof header != "string") throw new TypeError("argument string is required to be a string");
		var index = header.indexOf(";"), type = index !== -1 ? header.slice(0, index).trim() : header.trim();
		if (!TYPE_REGEXP.test(type)) throw new TypeError("invalid media type");
		var obj = new ContentType(type.toLowerCase());
		if (index !== -1) {
			var key, match, value;
			for (PARAM_REGEXP.lastIndex = index; match = PARAM_REGEXP.exec(header); ) {
				if (match.index !== index) throw new TypeError("invalid parameter format");
				index += match[0].length, key = match[1].toLowerCase(), value = match[2], value.charCodeAt(0) === 34 && (value = value.slice(1, -1), value.indexOf("\\") !== -1 && (value = value.replace(QESC_REGEXP, "$1"))), obj.parameters[key] = value;
			}
			if (index !== header.length) throw new TypeError("invalid parameter format");
		}
		return obj;
	}
	function getcontenttype(obj) {
		var header;
		if (typeof obj.getHeader == "function" ? header = obj.getHeader("content-type") : typeof obj.headers == "object" && (header = obj.headers && obj.headers["content-type"]), typeof header != "string") throw new TypeError("content-type header is missing from object");
		return header;
	}
	function ContentType(type) {
		this.parameters = /* @__PURE__ */ Object.create(null), this.type = type;
	}
})), import_content_type = /* @__PURE__ */ __toESM(require_content_type(), 1);
function mediaTypeEssence(header) {
	if (header)
		try {
			return import_content_type.parse(header).type;
		} catch {
			let essence = (header.split(";", 1)[0] ?? "").trim().toLowerCase();
			return essence === "" || header.slice(essence.length).includes(",") ? void 0 : essence;
		}
}
function isJsonContentType(header) {
	return header === "application/json" ? !0 : mediaTypeEssence(header) === "application/json";
}
function getDisplayName(metadata) {
	return metadata.title !== void 0 && metadata.title !== "" ? metadata.title : "annotations" in metadata && metadata.annotations?.title ? metadata.annotations.title : metadata.name;
}
var STDIO_DEFAULT_MAX_BUFFER_SIZE = 10 * 1024 * 1024, ReadBuffer = class {
	_buffer;
	_maxBufferSize;
	constructor(options) {
		this._maxBufferSize = options?.maxBufferSize ?? STDIO_DEFAULT_MAX_BUFFER_SIZE;
	}
	append(chunk) {
		if ((this._buffer?.length ?? 0) + chunk.length > this._maxBufferSize)
			throw this.clear(), new Error(`ReadBuffer exceeded maximum size of ${this._maxBufferSize} bytes`);
		this._buffer = this._buffer ? Buffer.concat([this._buffer, chunk]) : chunk;
	}
	readMessage() {
		for (; this._buffer; ) {
			let index = this._buffer.indexOf(`
`);
			if (index === -1) return null;
			let line = this._buffer.toString("utf8", 0, index).replace(/\r$/, "");
			this._buffer = this._buffer.subarray(index + 1);
			try {
				return deserializeMessage(line);
			} catch (error) {
				if (error instanceof SyntaxError) continue;
				throw error;
			}
		}
		return null;
	}
	clear() {
		this._buffer = void 0;
	}
};
function deserializeMessage(line) {
	return JSONRPCMessageSchema.parse(JSON.parse(line));
}
function serializeMessage(message) {
	return JSON.stringify(message) + `
`;
}
var TOOL_NAME_REGEX = /^[A-Za-z0-9._-]{1,128}$/;
function validateToolName(name) {
	let warnings = [];
	if (name.length === 0) return {
		isValid: !1,
		warnings: ["Tool name cannot be empty"]
	};
	if (name.length > 128) return {
		isValid: !1,
		warnings: [`Tool name exceeds maximum length of 128 characters (current: ${name.length})`]
	};
	if (name.includes(" ") && warnings.push("Tool name contains spaces, which may cause parsing issues"), name.includes(",") && warnings.push("Tool name contains commas, which may cause parsing issues"), (name.startsWith("-") || name.endsWith("-")) && warnings.push("Tool name starts or ends with a dash, which may cause parsing issues in some contexts"), (name.startsWith(".") || name.endsWith(".")) && warnings.push("Tool name starts or ends with a dot, which may cause parsing issues in some contexts"), !TOOL_NAME_REGEX.test(name)) {
		let invalidChars = [...name].filter((char) => !/[A-Za-z0-9._-]/.test(char)).filter((char, index, arr) => arr.indexOf(char) === index);
		return warnings.push(`Tool name contains invalid characters: ${invalidChars.map((c) => `"${c}"`).join(", ")}`, "Allowed characters are: A-Z, a-z, 0-9, underscore (_), dash (-), and dot (.)"), {
			isValid: !1,
			warnings
		};
	}
	return {
		isValid: !0,
		warnings
	};
}
function issueToolNameWarning(name, warnings) {
	if (warnings.length > 0) {
		console.warn(`Tool name validation warning for "${name}":`);
		for (let warning of warnings) console.warn(`  - ${warning}`);
		console.warn("Tool registration will proceed, but this may cause compatibility issues."), console.warn("Consider updating the tool name to conform to the MCP tool naming standard."), console.warn("See SEP: Specify Format for Tool Names (https://github.com/modelcontextprotocol/modelcontextprotocol/issues/986) for more details.");
	}
}
function validateAndWarnToolName(name) {
	let result = validateToolName(name);
	return issueToolNameWarning(name, result.warnings), result.isValid;
}
function normalizeHeaders(headers) {
	return headers ? headers instanceof Headers ? Object.fromEntries(headers.entries()) : Array.isArray(headers) ? Object.fromEntries(headers) : { ...headers } : {};
}
function createFetchWithInit(baseFetch = fetch, baseInit) {
	return baseInit ? async (url2, init) => baseFetch(url2, {
		...baseInit,
		...init,
		headers: init?.headers ? {
			...normalizeHeaders(baseInit.headers),
			...normalizeHeaders(init.headers)
		} : baseInit.headers
	}) : baseFetch;
}
var MAX_TEMPLATE_LENGTH = 1e6, MAX_VARIABLE_LENGTH = 1e6, MAX_TEMPLATE_EXPRESSIONS = 1e4, MAX_REGEX_LENGTH = 1e6, UriTemplate = class UriTemplate2 {
	/**
	* Returns true if the given string contains any URI template expressions.
	* A template expression is a sequence of characters enclosed in curly braces,
	* like `{foo}` or `{?bar}`.
	*/
	static isTemplate(str) {
		return /\{[^}\s]+\}/.test(str);
	}
	static validateLength(str, max, context) {
		if (str.length > max) throw new Error(`${context} exceeds maximum length of ${max} characters (got ${str.length})`);
	}
	template;
	parts;
	get variableNames() {
		return this.parts.flatMap((part) => typeof part == "string" ? [] : part.names);
	}
	constructor(template) {
		UriTemplate2.validateLength(template, MAX_TEMPLATE_LENGTH, "Template"), this.template = template, this.parts = this.parse(template);
	}
	toString() {
		return this.template;
	}
	parse(template) {
		let parts = [], currentText = "", i = 0, expressionCount = 0;
		for (; i < template.length; ) if (template[i] === "{") {
			currentText && (parts.push(currentText), currentText = "");
			let end = template.indexOf("}", i);
			if (end === -1) throw new Error("Unclosed template expression");
			if (expressionCount++, expressionCount > MAX_TEMPLATE_EXPRESSIONS) throw new Error(`Template contains too many expressions (max ${MAX_TEMPLATE_EXPRESSIONS})`);
			let expr = template.slice(i + 1, end), operator = this.getOperator(expr), exploded = expr.includes("*"), names = this.getNames(expr), name = names[0];
			for (let name$1 of names) UriTemplate2.validateLength(name$1, MAX_VARIABLE_LENGTH, "Variable name");
			parts.push({
				name,
				operator,
				names,
				exploded
			}), i = end + 1;
		} else
			currentText += template[i], i++;
		return currentText && parts.push(currentText), parts;
	}
	getOperator(expr) {
		return [
			"+",
			"#",
			".",
			"/",
			"?",
			"&"
		].find((op) => expr.startsWith(op)) || "";
	}
	getNames(expr) {
		let operator = this.getOperator(expr);
		return expr.slice(operator.length).split(",").map((name) => name.replace("*", "").trim()).filter((name) => name.length > 0);
	}
	encodeValue(value, operator) {
		return UriTemplate2.validateLength(value, MAX_VARIABLE_LENGTH, "Variable value"), operator === "+" || operator === "#" ? encodeURI(value) : encodeURIComponent(value);
	}
	expandPart(part, variables) {
		if (part.operator === "?" || part.operator === "&") {
			let pairs = part.names.map((name) => {
				let value$1 = variables[name];
				return value$1 === void 0 ? "" : `${name}=${Array.isArray(value$1) ? value$1.map((v) => this.encodeValue(v, part.operator)).join(",") : this.encodeValue(value$1.toString(), part.operator)}`;
			}).filter((pair) => pair.length > 0);
			return pairs.length === 0 ? "" : (part.operator === "?" ? "?" : "&") + pairs.join("&");
		}
		if (part.names.length > 1) {
			let values = part.names.map((name) => variables[name]).filter((v) => v !== void 0);
			return values.length === 0 ? "" : values.map((v) => Array.isArray(v) ? v[0] : v).join(",");
		}
		let value = variables[part.name];
		if (value === void 0) return "";
		let encoded = (Array.isArray(value) ? value : [value]).map((v) => this.encodeValue(v, part.operator));
		switch (part.operator) {
			case "":
				return encoded.join(",");
			case "+":
				return encoded.join(",");
			case "#":
				return "#" + encoded.join(",");
			case ".":
				return "." + encoded.join(".");
			case "/":
				return "/" + encoded.join("/");
			default:
				return encoded.join(",");
		}
	}
	expand(variables) {
		let result = "", hasQueryParam = !1;
		for (let part of this.parts) {
			if (typeof part == "string") {
				result += part;
				continue;
			}
			let expanded = this.expandPart(part, variables);
			expanded && (result += (part.operator === "?" || part.operator === "&") && hasQueryParam ? expanded.replace("?", "&") : expanded, (part.operator === "?" || part.operator === "&") && (hasQueryParam = !0));
		}
		return result;
	}
	escapeRegExp(str) {
		return str.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
	}
	partToRegExp(part) {
		let patterns = [];
		for (let name$1 of part.names) UriTemplate2.validateLength(name$1, MAX_VARIABLE_LENGTH, "Variable name");
		if (part.operator === "?" || part.operator === "&") {
			for (let i = 0; i < part.names.length; i++) {
				let name$1 = part.names[i], prefix = i === 0 ? "\\" + part.operator : "&";
				patterns.push({
					pattern: prefix + this.escapeRegExp(name$1) + "=([^&]+)",
					name: name$1
				});
			}
			return patterns;
		}
		let pattern, name = part.name;
		switch (part.operator) {
			case "":
				pattern = part.exploded ? "([^/,]+(?:,[^/,]+)*)" : "([^/,]+)";
				break;
			case "+":
			case "#":
				pattern = "(.+)";
				break;
			case ".":
				pattern = String.raw`\.([^/,]+)`;
				break;
			case "/":
				pattern = "/" + (part.exploded ? "([^/,]+(?:,[^/,]+)*)" : "([^/,]+)");
				break;
			default:
				pattern = "([^/]+)";
		}
		return patterns.push({
			pattern,
			name
		}), patterns;
	}
	match(uri) {
		UriTemplate2.validateLength(uri, MAX_TEMPLATE_LENGTH, "URI");
		let pattern = "^", names = [];
		for (let part of this.parts) if (typeof part == "string") pattern += this.escapeRegExp(part);
		else {
			let patterns = this.partToRegExp(part);
			for (let { pattern: partPattern, name } of patterns)
				pattern += partPattern, names.push({
					name,
					exploded: part.exploded
				});
		}
		pattern += "$", UriTemplate2.validateLength(pattern, MAX_REGEX_LENGTH, "Generated regex pattern");
		let regex = new RegExp(pattern), match = uri.match(regex);
		if (!match) return null;
		let result = {};
		for (let [i, name_] of names.entries()) {
			let { name, exploded } = name_, value = match[i + 1], cleanName = name.replace("*", "");
			result[cleanName] = exploded && value.includes(",") ? value.split(",") : value;
		}
		return result;
	}
}, InMemoryTransport = class InMemoryTransport2 {
	_otherTransport;
	_messageQueue = [];
	_closed = !1;
	onclose;
	onerror;
	onmessage;
	sessionId;
	/**
	* Creates a pair of linked in-memory transports that can communicate with each other. One should be passed to a {@linkcode @modelcontextprotocol/client!client/client.Client | Client} and one to a {@linkcode @modelcontextprotocol/server!server/server.Server | Server}.
	*/
	static createLinkedPair() {
		let clientTransport = new InMemoryTransport2(), serverTransport = new InMemoryTransport2();
		return clientTransport._otherTransport = serverTransport, serverTransport._otherTransport = clientTransport, [clientTransport, serverTransport];
	}
	async start() {
		for (; this._messageQueue.length > 0; ) {
			let queuedMessage = this._messageQueue.shift();
			this.onmessage?.(queuedMessage.message, queuedMessage.extra);
		}
	}
	async close() {
		if (this._closed) return;
		this._closed = !0;
		let other = this._otherTransport;
		this._otherTransport = void 0;
		try {
			await other?.close();
		} finally {
			this.onclose?.();
		}
	}
	/**
	* Sends a message with optional auth info.
	* This is useful for testing authentication scenarios.
	*/
	async send(message, options) {
		if (!this._otherTransport) throw new SdkError(SdkErrorCode.NotConnected, "Not connected");
		this._otherTransport.onmessage ? this._otherTransport.onmessage(message, { authInfo: options?.authInfo }) : this._otherTransport._messageQueue.push({
			message,
			extra: { authInfo: options?.authInfo }
		});
	}
};
function isZodV4Schema(v) {
	return typeof v == "object" && v !== null && "_zod" in v;
}
function looksLikeZodV3(v) {
	return typeof v == "object" && v !== null && !("_zod" in v) && "_def" in v && typeof v._def?.typeName == "string";
}
function isZodRawShape(obj) {
	if (typeof obj != "object" || obj === null || isStandardSchema(obj)) return !1;
	let proto = Object.getPrototypeOf(obj);
	return proto !== Object.prototype && proto !== null ? !1 : Object.values(obj).every((v) => isZodV4Schema(v));
}
function normalizeRawShapeSchema(schema) {
	if (schema !== void 0) {
		if (isZodRawShape(schema)) return object(schema);
		if (typeof schema == "object" && schema !== null && !isStandardSchema(schema) && Object.values(schema).some((v) => looksLikeZodV3(v))) throw new TypeError("Raw-shape inputSchema/outputSchema/argsSchema fields must be Zod v4 schemas. Got a Zod v3 field schema. Import from `zod/v4` (or upgrade your zod import), or wrap with `z.object({...})` yourself.");
		if (!isStandardSchema(schema)) throw new TypeError("inputSchema/outputSchema/argsSchema must be a Standard Schema (e.g. z.object({...})) or a raw Zod shape ({ field: z.string() }).");
		return schema;
	}
}
function preloadSchemas() {
	buildSchemas2025(), buildSchemas2026(), warmRegistryMaps2025(), warmInputSchemaMaps2026(), warmWireResultSchemas2026();
}
function fromJsonSchema(schema, validator) {
	let check = validator.getValidator(schema);
	return { "~standard": {
		version: 1,
		vendor: "mcp",
		jsonSchema: {
			input: () => schema,
			output: () => schema
		},
		validate: (data) => {
			let result = check(data);
			return result.valid ? { value: result.data } : { issues: [{ message: result.errorMessage }] };
		}
	} };
}

export {
	stampErrorBrands,
	brandedHasInstance,
	OAuthErrorCode,
	OAuthError,
	SdkErrorCode,
	SdkError,
	SdkHttpError,
	resourceUrlFromServerUrl,
	checkResourceAllowed,
	requiredClientCapabilitiesForRequest,
	requiredClientCapabilitiesForInputRequest,
	missingClientCapabilities,
	SUPPORTED_MODERN_PROTOCOL_VERSIONS,
	isModernProtocolVersion,
	legacyProtocolVersions,
	modernProtocolVersions,
	normalizeContentlessToolResult,
	attachCacheHintFallback,
	assertValidCacheHint,
	ProtocolErrorCode,
	ProtocolError,
	ResourceNotFoundError,
	UrlElicitationRequiredError,
	UnsupportedProtocolVersionError,
	MissingRequiredClientCapabilityError,
	MODERN_WIRE_REVISION,
	codecForVersion,
	requestMetaOf,
	hasEnvelopeClaim,
	envelopeClaimVersion,
	validateEnvelopeMeta,
	parseJSONRPCMessage,
	isJSONRPCRequest,
	isJSONRPCNotification,
	isJSONRPCResultResponse,
	isJSONRPCErrorResponse,
	isJSONRPCResponse,
	isCallToolResult,
	isInputRequiredResult,
	isTaskAugmentedRequestParams,
	isInitializeRequest,
	isInitializedNotification,
	assertCompleteRequestPrompt,
	assertCompleteRequestResourceTemplate,
	scanXMcpHeaderDeclarations,
	validateMcpParamHeaders,
	LADDER_ERROR_HTTP_STATUS,
	httpStatusForErrorCode,
	validateStandardRequestHeaders,
	carriesValidModernEnvelopeClaim,
	classifyInboundRequest,
	modernOnlyStrictRejection,
	parseSchema,
	standardSchemaToJsonSchema,
	validateStandardSchema,
	promptArgumentsFromStandardSchema,
	inputRequired,
	acceptedContent,
	inputResponse,
	REQUEST_STATE_ONLY_LEG_PACING_MS,
	inputRequiredRoundsExceededMessage,
	sleep,
	linkedRoundAbort,
	specTypeSchemas,
	isSpecType,
	DEFAULT_REQUEST_TIMEOUT_MSEC,
	requestStateAccessor,
	withRequestStateValue,
	setNegotiatedProtocolVersion,
	Protocol,
	mergeCapabilities,
	mediaTypeEssence,
	isJsonContentType,
	getDisplayName,
	STDIO_DEFAULT_MAX_BUFFER_SIZE,
	ReadBuffer,
	deserializeMessage,
	serializeMessage,
	validateAndWarnToolName,
	createFetchWithInit,
	UriTemplate,
	InMemoryTransport,
	normalizeRawShapeSchema,
	preloadSchemas,
	fromJsonSchema
};
