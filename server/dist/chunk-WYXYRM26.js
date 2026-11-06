import {
	_enum,
	_null,
	array,
	boolean,
	discriminatedUnion,
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
	string,
	union,
	unknown
} from "./chunk-CZ2J6RDZ.js";

// ../code/node_modules/@modelcontextprotocol/core/dist/schemas-DscsoNZN.mjs
var LATEST_PROTOCOL_VERSION = "2025-11-25", DEFAULT_NEGOTIATED_PROTOCOL_VERSION = "2025-03-26", SUPPORTED_PROTOCOL_VERSIONS = [
	LATEST_PROTOCOL_VERSION,
	"2025-06-18",
	"2025-03-26",
	"2024-11-05",
	"2024-10-07"
], RELATED_TASK_META_KEY = "io.modelcontextprotocol/related-task", PROTOCOL_VERSION_META_KEY = "io.modelcontextprotocol/protocolVersion", CLIENT_INFO_META_KEY = "io.modelcontextprotocol/clientInfo", SERVER_INFO_META_KEY = "io.modelcontextprotocol/serverInfo", CLIENT_CAPABILITIES_META_KEY = "io.modelcontextprotocol/clientCapabilities", SUBSCRIPTION_ID_META_KEY = "io.modelcontextprotocol/subscriptionId", LOG_LEVEL_META_KEY = "io.modelcontextprotocol/logLevel", TRACEPARENT_META_KEY = "traceparent", TRACESTATE_META_KEY = "tracestate", BAGGAGE_META_KEY = "baggage", JSONRPC_VERSION = "2.0", PARSE_ERROR = -32700, INVALID_REQUEST = -32600, METHOD_NOT_FOUND = -32601, INVALID_PARAMS = -32602, INTERNAL_ERROR = -32603, JSONValueSchema = lazy(() => union([
	string(),
	number(),
	boolean(),
	_null(),
	record(string(), JSONValueSchema),
	array(JSONValueSchema)
])), JSONObjectSchema = record(string(), JSONValueSchema), JSONArraySchema = array(JSONValueSchema), ProgressTokenSchema = union([string(), number().int()]), CursorSchema = string(), TaskMetadataSchema = object({ ttl: number().optional() }), RelatedTaskMetadataSchema = object({ taskId: string() }), RequestMetaSchema = looseObject({
	progressToken: ProgressTokenSchema.optional(),
	[RELATED_TASK_META_KEY]: RelatedTaskMetadataSchema.optional()
}), BaseRequestParamsSchema = object({ _meta: RequestMetaSchema.optional() }), TaskAugmentedRequestParamsSchema = BaseRequestParamsSchema.extend({ task: TaskMetadataSchema.optional() }), RequestSchema = object({
	method: string(),
	params: BaseRequestParamsSchema.loose().optional()
}), NotificationsParamsSchema = object({ _meta: RequestMetaSchema.optional() }), NotificationSchema = object({
	method: string(),
	params: NotificationsParamsSchema.loose().optional()
}), ResultMetaObjectSchema = looseObject({ get [SERVER_INFO_META_KEY]() {
	return ImplementationSchema.optional().catch(void 0);
} }), ResultSchema = looseObject({ _meta: ResultMetaObjectSchema.optional() }), RequestIdSchema = union([string(), number().int()]), JSONRPCRequestSchema = object({
	jsonrpc: literal(JSONRPC_VERSION),
	id: RequestIdSchema,
	...RequestSchema.shape
}).strict(), JSONRPCNotificationSchema = object({
	jsonrpc: literal(JSONRPC_VERSION),
	...NotificationSchema.shape
}).strict(), JSONRPCResultResponseSchema = object({
	jsonrpc: literal(JSONRPC_VERSION),
	id: RequestIdSchema,
	result: ResultSchema
}).strict(), JSONRPCErrorResponseSchema = object({
	jsonrpc: literal(JSONRPC_VERSION),
	id: RequestIdSchema.optional(),
	error: object({
		code: number().int(),
		message: string(),
		data: unknown().optional()
	})
}).strict(), JSONRPCMessageSchema = union([
	JSONRPCRequestSchema,
	JSONRPCNotificationSchema,
	JSONRPCResultResponseSchema,
	JSONRPCErrorResponseSchema
]), JSONRPCResponseSchema = union([JSONRPCResultResponseSchema, JSONRPCErrorResponseSchema]), EmptyResultSchema = ResultSchema.strict(), CancelledNotificationParamsSchema = NotificationsParamsSchema.extend({
	requestId: RequestIdSchema.optional(),
	reason: string().optional()
}), CancelledNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/cancelled"),
	params: CancelledNotificationParamsSchema
}), IconSchema = object({
	src: string(),
	mimeType: string().optional(),
	sizes: array(string()).optional(),
	theme: _enum(["light", "dark"]).optional()
}), IconsSchema = object({ icons: array(IconSchema).optional() }), BaseMetadataSchema = object({
	name: string(),
	title: string().optional()
}), ImplementationSchema = BaseMetadataSchema.extend({
	...BaseMetadataSchema.shape,
	...IconsSchema.shape,
	version: string(),
	websiteUrl: string().optional(),
	description: string().optional()
}), FormElicitationCapabilitySchema = intersection(object({ applyDefaults: boolean().optional() }), JSONObjectSchema), ElicitationCapabilitySchema = preprocess((value) => value && typeof value == "object" && !Array.isArray(value) && Object.keys(value).length === 0 ? { form: {} } : value, intersection(object({
	form: FormElicitationCapabilitySchema.optional(),
	url: JSONObjectSchema.optional()
}), JSONObjectSchema.optional())), ClientTasksCapabilitySchema = looseObject({
	list: JSONObjectSchema.optional(),
	cancel: JSONObjectSchema.optional(),
	requests: looseObject({
		sampling: looseObject({ createMessage: JSONObjectSchema.optional() }).optional(),
		elicitation: looseObject({ create: JSONObjectSchema.optional() }).optional()
	}).optional()
}), ServerTasksCapabilitySchema = looseObject({
	list: JSONObjectSchema.optional(),
	cancel: JSONObjectSchema.optional(),
	requests: looseObject({ tools: looseObject({ call: JSONObjectSchema.optional() }).optional() }).optional()
}), ClientCapabilitiesSchema = object({
	experimental: record(string(), JSONObjectSchema).optional(),
	sampling: object({
		context: JSONObjectSchema.optional(),
		tools: JSONObjectSchema.optional()
	}).optional(),
	elicitation: ElicitationCapabilitySchema.optional(),
	roots: object({ listChanged: boolean().optional() }).optional(),
	tasks: ClientTasksCapabilitySchema.optional(),
	extensions: record(string(), JSONObjectSchema).optional()
}), InitializeRequestParamsSchema = BaseRequestParamsSchema.extend({
	protocolVersion: string(),
	capabilities: ClientCapabilitiesSchema,
	clientInfo: ImplementationSchema
}), InitializeRequestSchema = RequestSchema.extend({
	method: literal("initialize"),
	params: InitializeRequestParamsSchema
}), ServerCapabilitiesSchema = object({
	experimental: record(string(), JSONObjectSchema).optional(),
	logging: JSONObjectSchema.optional(),
	completions: JSONObjectSchema.optional(),
	prompts: object({ listChanged: boolean().optional() }).optional(),
	resources: object({
		subscribe: boolean().optional(),
		listChanged: boolean().optional()
	}).optional(),
	tools: object({ listChanged: boolean().optional() }).optional(),
	tasks: ServerTasksCapabilitySchema.optional(),
	extensions: record(string(), JSONObjectSchema).optional()
}), InitializeResultSchema = ResultSchema.extend({
	protocolVersion: string(),
	capabilities: ServerCapabilitiesSchema,
	serverInfo: ImplementationSchema,
	instructions: string().optional()
}), InitializedNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/initialized"),
	params: NotificationsParamsSchema.optional()
}), DiscoverRequestSchema = RequestSchema.extend({
	method: literal("server/discover"),
	params: BaseRequestParamsSchema.optional()
}), DiscoverResultSchema = ResultSchema.extend({
	supportedVersions: array(string()),
	capabilities: ServerCapabilitiesSchema,
	instructions: string().optional()
}), PingRequestSchema = RequestSchema.extend({
	method: literal("ping"),
	params: BaseRequestParamsSchema.optional()
}), ProgressSchema = object({
	progress: number(),
	total: optional(number()),
	message: optional(string())
}), ProgressNotificationParamsSchema = object({
	...NotificationsParamsSchema.shape,
	...ProgressSchema.shape,
	progressToken: ProgressTokenSchema
}), ProgressNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/progress"),
	params: ProgressNotificationParamsSchema
}), PaginatedRequestParamsSchema = BaseRequestParamsSchema.extend({ cursor: CursorSchema.optional() }), PaginatedRequestSchema = RequestSchema.extend({ params: PaginatedRequestParamsSchema.optional() }), PaginatedResultSchema = ResultSchema.extend({ nextCursor: CursorSchema.optional() }), ResourceContentsSchema = object({
	uri: string(),
	mimeType: optional(string()),
	_meta: record(string(), unknown()).optional()
}), TextResourceContentsSchema = ResourceContentsSchema.extend({ text: string() }), Base64Schema = string().refine((val) => {
	try {
		return atob(val), !0;
	} catch {
		return !1;
	}
}, { message: "Invalid Base64 string" }), BlobResourceContentsSchema = ResourceContentsSchema.extend({ blob: Base64Schema }), RoleSchema = _enum(["user", "assistant"]), AnnotationsSchema = object({
	audience: array(RoleSchema).optional(),
	priority: number().min(0).max(1).optional(),
	lastModified: iso_exports.datetime({ offset: !0 }).optional()
}), ResourceSchema = object({
	...BaseMetadataSchema.shape,
	...IconsSchema.shape,
	uri: string(),
	description: optional(string()),
	mimeType: optional(string()),
	size: optional(number()),
	annotations: AnnotationsSchema.optional(),
	_meta: optional(looseObject({}))
}), ResourceTemplateSchema = object({
	...BaseMetadataSchema.shape,
	...IconsSchema.shape,
	uriTemplate: string(),
	description: optional(string()),
	mimeType: optional(string()),
	annotations: AnnotationsSchema.optional(),
	_meta: optional(looseObject({}))
}), ListResourcesRequestSchema = PaginatedRequestSchema.extend({ method: literal("resources/list") }), ListResourcesResultSchema = PaginatedResultSchema.extend({ resources: array(ResourceSchema) }), ListResourceTemplatesRequestSchema = PaginatedRequestSchema.extend({ method: literal("resources/templates/list") }), ListResourceTemplatesResultSchema = PaginatedResultSchema.extend({ resourceTemplates: array(ResourceTemplateSchema) }), ResourceRequestParamsSchema = BaseRequestParamsSchema.extend({ uri: string() }), ReadResourceRequestParamsSchema = ResourceRequestParamsSchema, ReadResourceRequestSchema = RequestSchema.extend({
	method: literal("resources/read"),
	params: ReadResourceRequestParamsSchema
}), ReadResourceResultSchema = ResultSchema.extend({ contents: array(union([TextResourceContentsSchema, BlobResourceContentsSchema])) }), ResourceListChangedNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/resources/list_changed"),
	params: NotificationsParamsSchema.optional()
}), SubscribeRequestParamsSchema = ResourceRequestParamsSchema, SubscribeRequestSchema = RequestSchema.extend({
	method: literal("resources/subscribe"),
	params: SubscribeRequestParamsSchema
}), UnsubscribeRequestParamsSchema = ResourceRequestParamsSchema, UnsubscribeRequestSchema = RequestSchema.extend({
	method: literal("resources/unsubscribe"),
	params: UnsubscribeRequestParamsSchema
}), SubscriptionFilterSchema = object({
	toolsListChanged: boolean().optional(),
	promptsListChanged: boolean().optional(),
	resourcesListChanged: boolean().optional(),
	resourceSubscriptions: array(string()).optional()
}), SubscriptionsListenRequestParamsSchema = BaseRequestParamsSchema.extend({ notifications: SubscriptionFilterSchema }), SubscriptionsListenRequestSchema = RequestSchema.extend({
	method: literal("subscriptions/listen"),
	params: SubscriptionsListenRequestParamsSchema
}), SubscriptionsAcknowledgedNotificationParamsSchema = NotificationsParamsSchema.extend({ notifications: SubscriptionFilterSchema }), SubscriptionsAcknowledgedNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/subscriptions/acknowledged"),
	params: SubscriptionsAcknowledgedNotificationParamsSchema
}), SubscriptionsListenResultMetaSchema = ResultMetaObjectSchema.extend({ [SUBSCRIPTION_ID_META_KEY]: RequestIdSchema }), SubscriptionsListenResultSchema = ResultSchema.extend({ _meta: SubscriptionsListenResultMetaSchema }), ResourceUpdatedNotificationParamsSchema = NotificationsParamsSchema.extend({ uri: string() }), ResourceUpdatedNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/resources/updated"),
	params: ResourceUpdatedNotificationParamsSchema
}), PromptArgumentSchema = object({
	name: string(),
	description: optional(string()),
	required: optional(boolean())
}), PromptSchema = object({
	...BaseMetadataSchema.shape,
	...IconsSchema.shape,
	description: optional(string()),
	arguments: optional(array(PromptArgumentSchema)),
	_meta: optional(looseObject({}))
}), ListPromptsRequestSchema = PaginatedRequestSchema.extend({ method: literal("prompts/list") }), ListPromptsResultSchema = PaginatedResultSchema.extend({ prompts: array(PromptSchema) }), GetPromptRequestParamsSchema = BaseRequestParamsSchema.extend({
	name: string(),
	arguments: record(string(), string()).optional()
}), GetPromptRequestSchema = RequestSchema.extend({
	method: literal("prompts/get"),
	params: GetPromptRequestParamsSchema
}), TextContentSchema = object({
	type: literal("text"),
	text: string(),
	annotations: AnnotationsSchema.optional(),
	_meta: record(string(), unknown()).optional()
}), ImageContentSchema = object({
	type: literal("image"),
	data: Base64Schema,
	mimeType: string(),
	annotations: AnnotationsSchema.optional(),
	_meta: record(string(), unknown()).optional()
}), AudioContentSchema = object({
	type: literal("audio"),
	data: Base64Schema,
	mimeType: string(),
	annotations: AnnotationsSchema.optional(),
	_meta: record(string(), unknown()).optional()
}), ToolUseContentSchema = object({
	type: literal("tool_use"),
	name: string(),
	id: string(),
	input: record(string(), unknown()),
	_meta: record(string(), unknown()).optional()
}), EmbeddedResourceSchema = object({
	type: literal("resource"),
	resource: union([TextResourceContentsSchema, BlobResourceContentsSchema]),
	annotations: AnnotationsSchema.optional(),
	_meta: record(string(), unknown()).optional()
}), ResourceLinkSchema = ResourceSchema.extend({ type: literal("resource_link") }), ContentBlockSchema = union([
	TextContentSchema,
	ImageContentSchema,
	AudioContentSchema,
	ResourceLinkSchema,
	EmbeddedResourceSchema
]), PromptMessageSchema = object({
	role: RoleSchema,
	content: ContentBlockSchema
}), GetPromptResultSchema = ResultSchema.extend({
	description: string().optional(),
	messages: array(PromptMessageSchema)
}), PromptListChangedNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/prompts/list_changed"),
	params: NotificationsParamsSchema.optional()
}), ToolAnnotationsSchema = object({
	title: string().optional(),
	readOnlyHint: boolean().optional(),
	destructiveHint: boolean().optional(),
	idempotentHint: boolean().optional(),
	openWorldHint: boolean().optional()
}), ToolExecutionSchema = object({ taskSupport: _enum([
	"required",
	"optional",
	"forbidden"
]).optional() }), ToolSchema = object({
	...BaseMetadataSchema.shape,
	...IconsSchema.shape,
	description: string().optional(),
	inputSchema: object({
		type: literal("object"),
		properties: record(string(), JSONValueSchema).optional(),
		required: array(string()).optional()
	}).catchall(unknown()),
	outputSchema: looseObject({ $schema: string().optional() }).optional(),
	annotations: ToolAnnotationsSchema.optional(),
	execution: ToolExecutionSchema.optional(),
	_meta: record(string(), unknown()).optional()
}), ListToolsRequestSchema = PaginatedRequestSchema.extend({ method: literal("tools/list") }), ListToolsResultSchema = PaginatedResultSchema.extend({ tools: array(ToolSchema) }), CallToolResultSchema = ResultSchema.extend({
	content: array(ContentBlockSchema).default([]),
	structuredContent: unknown().optional(),
	isError: boolean().optional()
}), CompatibilityCallToolResultSchema = CallToolResultSchema.or(ResultSchema.extend({ toolResult: unknown() })), CallToolRequestParamsSchema = TaskAugmentedRequestParamsSchema.extend({
	name: string(),
	arguments: record(string(), unknown()).optional()
}), CallToolRequestSchema = RequestSchema.extend({
	method: literal("tools/call"),
	params: CallToolRequestParamsSchema
}), ToolListChangedNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/tools/list_changed"),
	params: NotificationsParamsSchema.optional()
}), ListChangedOptionsBaseSchema = object({
	autoRefresh: boolean().default(!0),
	debounceMs: number().int().nonnegative().default(300)
}), LoggingLevelSchema = _enum([
	"debug",
	"info",
	"notice",
	"warning",
	"error",
	"critical",
	"alert",
	"emergency"
]), SetLevelRequestParamsSchema = BaseRequestParamsSchema.extend({ level: LoggingLevelSchema }), SetLevelRequestSchema = RequestSchema.extend({
	method: literal("logging/setLevel"),
	params: SetLevelRequestParamsSchema
}), LoggingMessageNotificationParamsSchema = NotificationsParamsSchema.extend({
	level: LoggingLevelSchema,
	logger: string().optional(),
	data: unknown()
}), LoggingMessageNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/message"),
	params: LoggingMessageNotificationParamsSchema
}), ModelHintSchema = object({ name: string().optional() }), ModelPreferencesSchema = object({
	hints: array(ModelHintSchema).optional(),
	costPriority: number().min(0).max(1).optional(),
	speedPriority: number().min(0).max(1).optional(),
	intelligencePriority: number().min(0).max(1).optional()
}), ToolChoiceSchema = object({ mode: _enum([
	"auto",
	"required",
	"none"
]).optional() }), ToolResultContentSchema = object({
	type: literal("tool_result"),
	toolUseId: string().describe("The unique identifier for the corresponding tool call."),
	content: array(ContentBlockSchema),
	structuredContent: unknown().optional(),
	isError: boolean().optional(),
	_meta: record(string(), unknown()).optional()
}), SamplingContentSchema = discriminatedUnion("type", [
	TextContentSchema,
	ImageContentSchema,
	AudioContentSchema
]), SamplingMessageContentBlockSchema = discriminatedUnion("type", [
	TextContentSchema,
	ImageContentSchema,
	AudioContentSchema,
	ToolUseContentSchema,
	ToolResultContentSchema
]), SamplingMessageSchema = object({
	role: RoleSchema,
	content: union([SamplingMessageContentBlockSchema, array(SamplingMessageContentBlockSchema)]),
	_meta: record(string(), unknown()).optional()
}), CreateMessageRequestParamsSchema = TaskAugmentedRequestParamsSchema.extend({
	messages: array(SamplingMessageSchema),
	modelPreferences: ModelPreferencesSchema.optional(),
	systemPrompt: string().optional(),
	includeContext: _enum([
		"none",
		"thisServer",
		"allServers"
	]).optional(),
	temperature: number().optional(),
	maxTokens: number().int(),
	stopSequences: array(string()).optional(),
	metadata: JSONObjectSchema.optional(),
	tools: array(ToolSchema).optional(),
	toolChoice: ToolChoiceSchema.optional()
}), CreateMessageRequestSchema = RequestSchema.extend({
	method: literal("sampling/createMessage"),
	params: CreateMessageRequestParamsSchema
}), CreateMessageResultSchema = ResultSchema.extend({
	model: string(),
	stopReason: optional(_enum([
		"endTurn",
		"stopSequence",
		"maxTokens"
	]).or(string())),
	role: RoleSchema,
	content: SamplingContentSchema
}), CreateMessageResultWithToolsSchema = ResultSchema.extend({
	model: string(),
	stopReason: optional(_enum([
		"endTurn",
		"stopSequence",
		"maxTokens",
		"toolUse"
	]).or(string())),
	role: RoleSchema,
	content: union([SamplingMessageContentBlockSchema, array(SamplingMessageContentBlockSchema)])
}), BooleanSchemaSchema = object({
	type: literal("boolean"),
	title: string().optional(),
	description: string().optional(),
	default: boolean().optional()
}), StringSchemaSchema = object({
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
}), NumberSchemaSchema = object({
	type: _enum(["number", "integer"]),
	title: string().optional(),
	description: string().optional(),
	minimum: number().optional(),
	maximum: number().optional(),
	default: number().optional()
}), UntitledSingleSelectEnumSchemaSchema = object({
	type: literal("string"),
	title: string().optional(),
	description: string().optional(),
	enum: array(string()),
	default: string().optional()
}), TitledSingleSelectEnumSchemaSchema = object({
	type: literal("string"),
	title: string().optional(),
	description: string().optional(),
	oneOf: array(object({
		const: string(),
		title: string()
	})),
	default: string().optional()
}), LegacyTitledEnumSchemaSchema = object({
	type: literal("string"),
	title: string().optional(),
	description: string().optional(),
	enum: array(string()),
	enumNames: array(string()).optional(),
	default: string().optional()
}), SingleSelectEnumSchemaSchema = union([UntitledSingleSelectEnumSchemaSchema, TitledSingleSelectEnumSchemaSchema]), UntitledMultiSelectEnumSchemaSchema = object({
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
}), TitledMultiSelectEnumSchemaSchema = object({
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
}), MultiSelectEnumSchemaSchema = union([UntitledMultiSelectEnumSchemaSchema, TitledMultiSelectEnumSchemaSchema]), EnumSchemaSchema = union([
	LegacyTitledEnumSchemaSchema,
	SingleSelectEnumSchemaSchema,
	MultiSelectEnumSchemaSchema
]), PrimitiveSchemaDefinitionSchema = union([
	EnumSchemaSchema,
	BooleanSchemaSchema,
	StringSchemaSchema,
	NumberSchemaSchema
]), ElicitRequestFormParamsSchema = TaskAugmentedRequestParamsSchema.extend({
	mode: literal("form").optional(),
	message: string(),
	requestedSchema: object({
		type: literal("object"),
		properties: record(string(), PrimitiveSchemaDefinitionSchema),
		required: array(string()).optional()
	}).catchall(unknown())
}), ElicitRequestURLParamsSchema = TaskAugmentedRequestParamsSchema.extend({
	mode: literal("url"),
	message: string(),
	elicitationId: string(),
	url: string().url()
}), ElicitRequestParamsSchema = union([ElicitRequestFormParamsSchema, ElicitRequestURLParamsSchema]), ElicitRequestSchema = RequestSchema.extend({
	method: literal("elicitation/create"),
	params: ElicitRequestParamsSchema
}), ElicitationCompleteNotificationParamsSchema = NotificationsParamsSchema.extend({ elicitationId: string() }), ElicitationCompleteNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/elicitation/complete"),
	params: ElicitationCompleteNotificationParamsSchema
}), ElicitResultSchema = ResultSchema.extend({
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
}), ResourceTemplateReferenceSchema = object({
	type: literal("ref/resource"),
	uri: string()
}), PromptReferenceSchema = object({
	type: literal("ref/prompt"),
	name: string()
}), CompleteRequestParamsSchema = BaseRequestParamsSchema.extend({
	ref: union([PromptReferenceSchema, ResourceTemplateReferenceSchema]),
	argument: object({
		name: string(),
		value: string()
	}),
	context: object({ arguments: record(string(), string()).optional() }).optional()
}), CompleteRequestSchema = RequestSchema.extend({
	method: literal("completion/complete"),
	params: CompleteRequestParamsSchema
}), CompleteResultSchema = ResultSchema.extend({ completion: looseObject({
	values: array(string()).max(100),
	total: optional(number().int()),
	hasMore: optional(boolean())
}) }), RootSchema = object({
	uri: string().startsWith("file://"),
	name: string().optional(),
	_meta: record(string(), unknown()).optional()
}), ListRootsRequestSchema = RequestSchema.extend({
	method: literal("roots/list"),
	params: BaseRequestParamsSchema.optional()
}), ListRootsResultSchema = ResultSchema.extend({ roots: array(RootSchema) }), RootsListChangedNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/roots/list_changed"),
	params: NotificationsParamsSchema.optional()
}), TaskCreationParamsSchema = looseObject({
	ttl: number().optional(),
	pollInterval: number().optional()
}), TaskStatusSchema = _enum([
	"working",
	"input_required",
	"completed",
	"failed",
	"cancelled"
]), TaskSchema = object({
	taskId: string(),
	status: TaskStatusSchema,
	ttl: union([number(), _null()]),
	createdAt: string(),
	lastUpdatedAt: string(),
	pollInterval: optional(number()),
	statusMessage: optional(string())
}), CreateTaskResultSchema = ResultSchema.extend({ task: TaskSchema }), TaskStatusNotificationParamsSchema = NotificationsParamsSchema.merge(TaskSchema), TaskStatusNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/tasks/status"),
	params: TaskStatusNotificationParamsSchema
}), GetTaskRequestSchema = RequestSchema.extend({
	method: literal("tasks/get"),
	params: BaseRequestParamsSchema.extend({ taskId: string() })
}), GetTaskResultSchema = ResultSchema.merge(TaskSchema), GetTaskPayloadRequestSchema = RequestSchema.extend({
	method: literal("tasks/result"),
	params: BaseRequestParamsSchema.extend({ taskId: string() })
}), GetTaskPayloadResultSchema = ResultSchema.loose(), ListTasksRequestSchema = PaginatedRequestSchema.extend({ method: literal("tasks/list") }), ListTasksResultSchema = PaginatedResultSchema.extend({ tasks: array(TaskSchema) }), CancelTaskRequestSchema = RequestSchema.extend({
	method: literal("tasks/cancel"),
	params: BaseRequestParamsSchema.extend({ taskId: string() })
}), CancelTaskResultSchema = ResultSchema.merge(TaskSchema), ClientRequestSchema = union([
	PingRequestSchema,
	InitializeRequestSchema,
	DiscoverRequestSchema,
	CompleteRequestSchema,
	SetLevelRequestSchema,
	GetPromptRequestSchema,
	ListPromptsRequestSchema,
	ListResourcesRequestSchema,
	ListResourceTemplatesRequestSchema,
	ReadResourceRequestSchema,
	SubscribeRequestSchema,
	UnsubscribeRequestSchema,
	SubscriptionsListenRequestSchema,
	CallToolRequestSchema,
	ListToolsRequestSchema
]), ClientNotificationSchema = union([
	CancelledNotificationSchema,
	ProgressNotificationSchema,
	InitializedNotificationSchema,
	RootsListChangedNotificationSchema
]), ClientResultSchema = union([
	EmptyResultSchema,
	CreateMessageResultSchema,
	CreateMessageResultWithToolsSchema,
	ElicitResultSchema,
	ListRootsResultSchema
]), ServerRequestSchema = union([
	PingRequestSchema,
	CreateMessageRequestSchema,
	ElicitRequestSchema,
	ListRootsRequestSchema
]), ServerNotificationSchema = union([
	CancelledNotificationSchema,
	ProgressNotificationSchema,
	LoggingMessageNotificationSchema,
	ResourceUpdatedNotificationSchema,
	ResourceListChangedNotificationSchema,
	ToolListChangedNotificationSchema,
	PromptListChangedNotificationSchema,
	SubscriptionsAcknowledgedNotificationSchema,
	ElicitationCompleteNotificationSchema
]), ServerResultSchema = union([
	EmptyResultSchema,
	InitializeResultSchema,
	DiscoverResultSchema,
	CompleteResultSchema,
	GetPromptResultSchema,
	ListPromptsResultSchema,
	ListResourcesResultSchema,
	ListResourceTemplatesResultSchema,
	ReadResourceResultSchema,
	CallToolResultSchema,
	ListToolsResultSchema,
	SubscriptionsListenResultSchema
]);

export {
	LATEST_PROTOCOL_VERSION,
	DEFAULT_NEGOTIATED_PROTOCOL_VERSION,
	SUPPORTED_PROTOCOL_VERSIONS,
	RELATED_TASK_META_KEY,
	PROTOCOL_VERSION_META_KEY,
	CLIENT_INFO_META_KEY,
	SERVER_INFO_META_KEY,
	CLIENT_CAPABILITIES_META_KEY,
	SUBSCRIPTION_ID_META_KEY,
	LOG_LEVEL_META_KEY,
	TRACEPARENT_META_KEY,
	TRACESTATE_META_KEY,
	BAGGAGE_META_KEY,
	JSONRPC_VERSION,
	PARSE_ERROR,
	INVALID_REQUEST,
	METHOD_NOT_FOUND,
	INVALID_PARAMS,
	INTERNAL_ERROR,
	JSONValueSchema,
	JSONObjectSchema,
	JSONArraySchema,
	ProgressTokenSchema,
	CursorSchema,
	TaskMetadataSchema,
	RelatedTaskMetadataSchema,
	RequestMetaSchema,
	BaseRequestParamsSchema,
	TaskAugmentedRequestParamsSchema,
	RequestSchema,
	NotificationsParamsSchema,
	NotificationSchema,
	ResultMetaObjectSchema,
	ResultSchema,
	RequestIdSchema,
	JSONRPCRequestSchema,
	JSONRPCNotificationSchema,
	JSONRPCResultResponseSchema,
	JSONRPCErrorResponseSchema,
	JSONRPCMessageSchema,
	JSONRPCResponseSchema,
	EmptyResultSchema,
	CancelledNotificationParamsSchema,
	CancelledNotificationSchema,
	IconSchema,
	IconsSchema,
	BaseMetadataSchema,
	ImplementationSchema,
	ClientTasksCapabilitySchema,
	ServerTasksCapabilitySchema,
	ClientCapabilitiesSchema,
	InitializeRequestParamsSchema,
	InitializeRequestSchema,
	ServerCapabilitiesSchema,
	InitializeResultSchema,
	InitializedNotificationSchema,
	DiscoverRequestSchema,
	DiscoverResultSchema,
	PingRequestSchema,
	ProgressSchema,
	ProgressNotificationParamsSchema,
	ProgressNotificationSchema,
	PaginatedRequestParamsSchema,
	PaginatedRequestSchema,
	PaginatedResultSchema,
	ResourceContentsSchema,
	TextResourceContentsSchema,
	BlobResourceContentsSchema,
	RoleSchema,
	AnnotationsSchema,
	ResourceSchema,
	ResourceTemplateSchema,
	ListResourcesRequestSchema,
	ListResourcesResultSchema,
	ListResourceTemplatesRequestSchema,
	ListResourceTemplatesResultSchema,
	ResourceRequestParamsSchema,
	ReadResourceRequestParamsSchema,
	ReadResourceRequestSchema,
	ReadResourceResultSchema,
	ResourceListChangedNotificationSchema,
	SubscribeRequestParamsSchema,
	SubscribeRequestSchema,
	UnsubscribeRequestParamsSchema,
	UnsubscribeRequestSchema,
	SubscriptionFilterSchema,
	SubscriptionsListenRequestParamsSchema,
	SubscriptionsListenRequestSchema,
	SubscriptionsAcknowledgedNotificationParamsSchema,
	SubscriptionsAcknowledgedNotificationSchema,
	SubscriptionsListenResultMetaSchema,
	SubscriptionsListenResultSchema,
	ResourceUpdatedNotificationParamsSchema,
	ResourceUpdatedNotificationSchema,
	PromptArgumentSchema,
	PromptSchema,
	ListPromptsRequestSchema,
	ListPromptsResultSchema,
	GetPromptRequestParamsSchema,
	GetPromptRequestSchema,
	TextContentSchema,
	ImageContentSchema,
	AudioContentSchema,
	ToolUseContentSchema,
	EmbeddedResourceSchema,
	ResourceLinkSchema,
	ContentBlockSchema,
	PromptMessageSchema,
	GetPromptResultSchema,
	PromptListChangedNotificationSchema,
	ToolAnnotationsSchema,
	ToolExecutionSchema,
	ToolSchema,
	ListToolsRequestSchema,
	ListToolsResultSchema,
	CallToolResultSchema,
	CompatibilityCallToolResultSchema,
	CallToolRequestParamsSchema,
	CallToolRequestSchema,
	ToolListChangedNotificationSchema,
	ListChangedOptionsBaseSchema,
	LoggingLevelSchema,
	SetLevelRequestParamsSchema,
	SetLevelRequestSchema,
	LoggingMessageNotificationParamsSchema,
	LoggingMessageNotificationSchema,
	ModelHintSchema,
	ModelPreferencesSchema,
	ToolChoiceSchema,
	ToolResultContentSchema,
	SamplingContentSchema,
	SamplingMessageContentBlockSchema,
	SamplingMessageSchema,
	CreateMessageRequestParamsSchema,
	CreateMessageRequestSchema,
	CreateMessageResultSchema,
	CreateMessageResultWithToolsSchema,
	BooleanSchemaSchema,
	StringSchemaSchema,
	NumberSchemaSchema,
	UntitledSingleSelectEnumSchemaSchema,
	TitledSingleSelectEnumSchemaSchema,
	LegacyTitledEnumSchemaSchema,
	SingleSelectEnumSchemaSchema,
	UntitledMultiSelectEnumSchemaSchema,
	TitledMultiSelectEnumSchemaSchema,
	MultiSelectEnumSchemaSchema,
	EnumSchemaSchema,
	PrimitiveSchemaDefinitionSchema,
	ElicitRequestFormParamsSchema,
	ElicitRequestURLParamsSchema,
	ElicitRequestParamsSchema,
	ElicitRequestSchema,
	ElicitationCompleteNotificationParamsSchema,
	ElicitationCompleteNotificationSchema,
	ElicitResultSchema,
	ResourceTemplateReferenceSchema,
	PromptReferenceSchema,
	CompleteRequestParamsSchema,
	CompleteRequestSchema,
	CompleteResultSchema,
	RootSchema,
	ListRootsRequestSchema,
	ListRootsResultSchema,
	RootsListChangedNotificationSchema,
	TaskCreationParamsSchema,
	TaskStatusSchema,
	TaskSchema,
	CreateTaskResultSchema,
	TaskStatusNotificationParamsSchema,
	TaskStatusNotificationSchema,
	GetTaskRequestSchema,
	GetTaskResultSchema,
	GetTaskPayloadRequestSchema,
	GetTaskPayloadResultSchema,
	ListTasksRequestSchema,
	ListTasksResultSchema,
	CancelTaskRequestSchema,
	CancelTaskResultSchema,
	ClientRequestSchema,
	ClientNotificationSchema,
	ClientResultSchema,
	ServerRequestSchema,
	ServerNotificationSchema,
	ServerResultSchema
};
