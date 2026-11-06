import {
	AjvJsonSchemaValidator
} from "./chunk-5BMIAFWP.js";
import {
	LADDER_ERROR_HTTP_STATUS,
	MissingRequiredClientCapabilityError,
	OAuthError,
	OAuthErrorCode,
	Protocol,
	ProtocolError,
	ProtocolErrorCode,
	REQUEST_STATE_ONLY_LEG_PACING_MS,
	ResourceNotFoundError,
	SUPPORTED_MODERN_PROTOCOL_VERSIONS,
	SdkError,
	SdkErrorCode,
	UriTemplate,
	assertCompleteRequestPrompt,
	assertCompleteRequestResourceTemplate,
	assertValidCacheHint,
	attachCacheHintFallback,
	codecForVersion,
	inputRequiredRoundsExceededMessage,
	isInputRequiredResult,
	isJSONRPCErrorResponse,
	isJSONRPCRequest,
	isJSONRPCResultResponse,
	isModernProtocolVersion,
	legacyProtocolVersions,
	linkedRoundAbort,
	mergeCapabilities,
	missingClientCapabilities,
	modernProtocolVersions,
	normalizeContentlessToolResult,
	normalizeRawShapeSchema,
	parseSchema,
	promptArgumentsFromStandardSchema,
	requestStateAccessor,
	requiredClientCapabilitiesForInputRequest,
	scanXMcpHeaderDeclarations,
	sleep,
	standardSchemaToJsonSchema,
	validateAndWarnToolName,
	validateStandardSchema,
	withRequestStateValue
} from "./chunk-DXZU47XG.js";
import {
	CLIENT_CAPABILITIES_META_KEY,
	LATEST_PROTOCOL_VERSION,
	LOG_LEVEL_META_KEY,
	LoggingLevelSchema
} from "./chunk-WYXYRM26.js";

// ../code/node_modules/@modelcontextprotocol/server/dist/shimsNode.mjs
import process from "node:process";

// ../code/node_modules/@modelcontextprotocol/server/dist/mcp-oHn3ureC.mjs
var COMPLETABLE_SYMBOL = /* @__PURE__ */ Symbol.for("mcp.completable");
function completable(schema, complete) {
	return Object.defineProperty(schema, COMPLETABLE_SYMBOL, {
		value: { complete },
		enumerable: !1,
		writable: !1,
		configurable: !1
	}), schema;
}
function isCompletable(schema) {
	return !!schema && typeof schema == "object" && COMPLETABLE_SYMBOL in schema;
}
function getCompleter(schema) {
	return schema[COMPLETABLE_SYMBOL]?.complete;
}
var DEFAULT_SSE_KEEP_ALIVE_MS = 15e3, MAX_TIMER_DELAY_MS = 2 ** 31 - 1;
function armSseKeepAlive(intervalMs, onTick) {
	if (!Number.isFinite(intervalMs) || intervalMs < 1) return;
	let timer = setInterval(onTick, Math.min(intervalMs, MAX_TIMER_DELAY_MS));
	return timer.unref?.(), timer;
}
var readClassification, PerRequestHTTPServerTransport = class {
	static {
		readClassification = (transport) => transport._classification;
	}
	onclose;
	onerror;
	onmessage;
	_classification;
	_responseMode;
	_started = !1;
	_used = !1;
	_closed = !1;
	_terminalDelivered = !1;
	/**
	* `true` only while the inbound message is being delivered synchronously
	* to the connected protocol layer. The pre-handler gates (the era
	* registry gate, the edge→instance handoff check, the missing-handler
	* rejection) answer inside this window; request handlers always run
	* after it (the protocol layer defers them to a microtask). An error
	* sent inside the window is therefore ladder-originated, and an error
	* sent after it is handler-produced.
	*/
	_dispatchWindowOpen = !1;
	_requestId;
	_deferredResponse;
	_sse;
	_abortCleanup;
	_keepAliveMs;
	constructor(options) {
		this._classification = options.classification, this._responseMode = options.responseMode ?? "auto", this._keepAliveMs = options.keepAliveMs ?? DEFAULT_SSE_KEEP_ALIVE_MS;
	}
	async start() {
		if (this._started) throw new Error("PerRequestHTTPServerTransport is already started");
		this._started = !0;
	}
	/**
	* Serves the single exchange: delivers the classified message to the
	* connected server instance and resolves with the HTTP response.
	*
	* Throws when called a second time (the transport is strictly
	* single-use), or before a server has been connected to the transport.
	* The returned promise rejects with a connection-closed error when the
	* transport is closed before a response was produced (for example because
	* the client disconnected).
	*/
	async handleMessage(message, extra) {
		if (this._used) throw new Error("PerRequestHTTPServerTransport serves exactly one exchange; construct a new transport per request");
		if (!this._started || this.onmessage === void 0) throw new Error("PerRequestHTTPServerTransport is not connected: connect a server to this transport before handling a message");
		if (this._closed) throw new Error("PerRequestHTTPServerTransport is closed");
		this._used = !0;
		let signal = extra?.request?.signal;
		if (signal?.aborted)
			throw await this.close(), new SdkError(SdkErrorCode.ConnectionClosed, "The request was aborted before it could be handled");
		let messageExtra = {
			classification: this._classification,
			...extra?.request !== void 0 && { request: extra.request },
			...extra?.authInfo !== void 0 && { authInfo: extra.authInfo }
		};
		if (isJSONRPCRequest(message)) {
			this._requestId = message.id;
			let resolve, reject, promise = new Promise((promiseResolve, promiseReject) => {
				resolve = promiseResolve, reject = promiseReject;
			});
			if (this._deferredResponse = {
				promise,
				resolve,
				reject,
				settled: !1
			}, signal !== void 0) {
				let onAbort = () => {
					this.close();
				};
				signal.addEventListener("abort", onAbort, { once: !0 }), this._abortCleanup = () => signal.removeEventListener("abort", onAbort);
			}
			this._dispatchWindowOpen = !0;
			try {
				this.onmessage(message, messageExtra);
			} finally {
				this._dispatchWindowOpen = !1;
			}
			return this._responseMode === "sse" && !this._closed && !this._deferredResponse.settled && this.upgradeToSse(), promise;
		}
		return this.onmessage(message, messageExtra), new Response(null, { status: 202 });
	}
	async send(message, options) {
		if (this._closed) return;
		let isResponse = isJSONRPCResultResponse(message) || isJSONRPCErrorResponse(message), relatedId = isResponse ? message.id : options?.relatedRequestId;
		if (this._requestId === void 0 || relatedId === void 0 || relatedId !== this._requestId) {
			isResponse && this.onerror?.(/* @__PURE__ */ new Error(`Received a response for an unknown request id: ${String(message.id)}`));
			return;
		}
		if (isResponse) {
			if (this._terminalDelivered) return;
			this._terminalDelivered = !0;
			let errorCode = isJSONRPCErrorResponse(message) ? message.error.code : void 0, ladderStatus = errorCode !== void 0 && (this._dispatchWindowOpen || errorCode === ProtocolErrorCode.MissingRequiredClientCapability) ? LADDER_ERROR_HTTP_STATUS[errorCode] : void 0;
			if (ladderStatus !== void 0 && this._sse === void 0) {
				this.settleResponse(Response.json(message, {
					status: ladderStatus,
					headers: { "Content-Type": "application/json" }
				})), queueMicrotask(() => {
					this.close();
				});
				return;
			}
			if (this._sse !== void 0 || this._responseMode === "sse") {
				this._sse === void 0 && this.upgradeToSse(), this.writeMessageFrame(message), this.finalizeStream();
				return;
			}
			this.settleResponse(Response.json(message, {
				status: 200,
				headers: { "Content-Type": "application/json" }
			})), queueMicrotask(() => {
				this.close();
			});
			return;
		}
		this._responseMode !== "json" && (this._sse === void 0 && this.upgradeToSse(), this.writeMessageFrame(message));
	}
	/**
	* Writes an SSE comment frame (a keep-alive heartbeat). Dropped when the
	* exchange is not currently streaming.
	*/
	writeCommentFrame(comment) {
		if (this._closed || this._sse === void 0 || this._sse.closed) return;
		let frame = comment.split(`
`).map((line) => `: ${line}`).join(`
`);
		this.writeFrame(`${frame}

`);
	}
	async close() {
		if (!this._closed) {
			if (this._closed = !0, this._abortCleanup?.(), this._abortCleanup = void 0, this._sse?.keepAliveTimer !== void 0 && clearInterval(this._sse.keepAliveTimer), this._sse !== void 0 && !this._sse.closed) {
				this._sse.closed = !0;
				try {
					this._sse.controller.close();
				} catch {
				}
			}
			this._deferredResponse !== void 0 && !this._deferredResponse.settled && (this._deferredResponse.settled = !0, this._deferredResponse.reject(new SdkError(SdkErrorCode.ConnectionClosed, "Connection closed before a response was produced"))), this.onclose?.();
		}
	}
	settleResponse(response) {
		this._deferredResponse === void 0 || this._deferredResponse.settled || (this._deferredResponse.settled = !0, this._deferredResponse.resolve(response));
	}
	upgradeToSse() {
		let controller, readable = new ReadableStream({
			start: (streamController) => {
				controller = streamController;
			},
			cancel: () => {
				this.close();
			}
		});
		this._sse = {
			controller,
			encoder: new TextEncoder(),
			closed: !1
		}, this._sse.keepAliveTimer = armSseKeepAlive(this._keepAliveMs, () => this.writeCommentFrame("keepalive")), this.settleResponse(new Response(readable, {
			status: 200,
			headers: {
				"Content-Type": "text/event-stream",
				"Cache-Control": "no-cache, no-transform",
				Connection: "keep-alive",
				"X-Accel-Buffering": "no"
			}
		}));
	}
	finalizeStream() {
		if (this._sse?.keepAliveTimer !== void 0 && clearInterval(this._sse.keepAliveTimer), this._sse !== void 0 && !this._sse.closed) {
			this._sse.closed = !0;
			try {
				this._sse.controller.close();
			} catch {
			}
		}
		queueMicrotask(() => {
			this.close();
		});
	}
	writeMessageFrame(message) {
		this.writeFrame(`event: message
data: ${JSON.stringify(message)}

`);
	}
	writeFrame(frame) {
		if (!(this._sse === void 0 || this._sse.closed))
			try {
				this._sse.controller.enqueue(this._sse.encoder.encode(frame));
			} catch (error) {
				this.onerror?.(/* @__PURE__ */ new Error(`Failed to write to the response stream: ${error}`));
			}
	}
};
function perRequestClassificationOf(transport) {
	return transport instanceof PerRequestHTTPServerTransport ? readClassification(transport) : void 0;
}
function comparableResource(value) {
	let text = String(value), hash = text.indexOf("#");
	return (hash === -1 ? text : text.slice(0, hash)).replace(/\/$/, "");
}
function sameResource(reported, expected) {
	return reported ? comparableResource(reported) === comparableResource(expected) : !1;
}
function headerQuotedValue(value) {
	return value.replaceAll(/[\\"]/g, String.raw`\$&`).replaceAll(/[^\u0020-\u007E]/g, " ");
}
function buildWwwAuthenticateHeader(errorCode, description, requiredScopes, resourceMetadataUrl) {
	let header = `Bearer error="${headerQuotedValue(errorCode)}", error_description="${headerQuotedValue(description)}"`;
	return requiredScopes.length > 0 && (header += `, scope="${headerQuotedValue(requiredScopes.join(" "))}"`), resourceMetadataUrl && (header += `, resource_metadata="${headerQuotedValue(resourceMetadataUrl)}"`), header;
}
async function verifyBearerToken(authorizationHeader, options) {
	let { verifier, requiredScopes = [], expectedResource } = options;
	if (!authorizationHeader) throw new OAuthError(OAuthErrorCode.InvalidToken, "Missing Authorization header");
	let [type, token] = authorizationHeader.split(" ");
	if (type?.toLowerCase() !== "bearer" || !token) throw new OAuthError(OAuthErrorCode.InvalidToken, "Invalid Authorization header format, expected 'Bearer TOKEN'");
	let authInfo = await verifier.verifyAccessToken(token);
	if (expectedResource !== void 0 && !sameResource(authInfo.resource, expectedResource)) throw new OAuthError(OAuthErrorCode.InvalidToken, "Token was not issued for this resource");
	if (requiredScopes.length > 0 && !requiredScopes.every((scope) => authInfo.scopes.includes(scope)))
		throw new OAuthError(OAuthErrorCode.InsufficientScope, "Insufficient scope");
	if (typeof authInfo.expiresAt != "number" || Number.isNaN(authInfo.expiresAt)) throw new OAuthError(OAuthErrorCode.InvalidToken, "Token has no expiration time");
	if (authInfo.expiresAt < Date.now() / 1e3) throw new OAuthError(OAuthErrorCode.InvalidToken, "Token has expired");
	return options.resourceMetadataUrl !== void 0 && authInfo.resourceMetadataUrl === void 0 ? {
		...authInfo,
		resourceMetadataUrl: options.resourceMetadataUrl
	} : authInfo;
}
function bearerAuthChallengeResponse(error, options) {
	let { requiredScopes = [], resourceMetadataUrl } = options ?? {};
	if (!(error instanceof OAuthError)) {
		let serverError = new OAuthError(OAuthErrorCode.ServerError, "Internal Server Error");
		return Response.json(serverError.toResponseObject(), { status: 500 });
	}
	switch (error.code) {
		case OAuthErrorCode.InvalidToken: {
			let challenge = buildWwwAuthenticateHeader(error.code, error.message, requiredScopes, resourceMetadataUrl);
			return Response.json(error.toResponseObject(), {
				status: 401,
				headers: { "WWW-Authenticate": challenge }
			});
		}
		case OAuthErrorCode.InsufficientScope: {
			let challenge = buildWwwAuthenticateHeader(error.code, error.message, requiredScopes, resourceMetadataUrl);
			return Response.json(error.toResponseObject(), {
				status: 403,
				headers: { "WWW-Authenticate": challenge }
			});
		}
		case OAuthErrorCode.ServerError:
			return Response.json(error.toResponseObject(), { status: 500 });
		default:
			return Response.json(error.toResponseObject(), { status: 400 });
	}
}
function requireBearerAuth(options) {
	let { verifier, requiredScopes = [], resourceMetadataUrl, expectedResource } = options, resolved = {
		verifier,
		requiredScopes,
		resourceMetadataUrl,
		expectedResource
	};
	return async (request) => {
		let [authorizationHeader] = (request.headers.get("authorization") ?? "").split(",");
		try {
			return await verifyBearerToken(authorizationHeader || void 0, resolved);
		} catch (error) {
			return bearerAuthChallengeResponse(error, resolved);
		}
	};
}
function checkIssuerUrl(issuer, allowInsecure) {
	if (issuer.protocol !== "https:" && issuer.hostname !== "localhost" && issuer.hostname !== "127.0.0.1" && !allowInsecure) throw new Error("Issuer URL must be HTTPS");
	if (issuer.hash) throw new Error(`Issuer URL must not have a fragment: ${issuer}`);
	if (issuer.search) throw new Error(`Issuer URL must not have a query string: ${issuer}`);
}
function buildOAuthProtectedResourceMetadata(options) {
	return checkIssuerUrl(new URL(options.oauthMetadata.issuer), options.dangerouslyAllowInsecureIssuerUrl), {
		resource: options.resourceServerUrl.href,
		authorization_servers: [options.oauthMetadata.issuer],
		scopes_supported: options.scopesSupported,
		resource_name: options.resourceName,
		resource_documentation: options.serviceDocumentationUrl?.href
	};
}
function getOAuthProtectedResourceMetadataUrl(serverUrl) {
	let metadataUrl = new URL(serverUrl);
	return metadataUrl.pathname = protectedResourceMetadataPath(serverUrl), metadataUrl.hash = "", metadataUrl.href;
}
function protectedResourceMetadataPath(resourceServerUrl) {
	let rsPath = stripTrailingSlash(resourceServerUrl.pathname);
	return `/.well-known/oauth-protected-resource${rsPath === "/" ? "" : rsPath}`;
}
function stripTrailingSlash(path) {
	return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}
var ALLOWED_METHODS = "GET, HEAD, OPTIONS";
function metadataDocumentResponse(request, metadata) {
	if (request.method === "OPTIONS") {
		let requestedHeaders = request.headers.get("access-control-request-headers");
		return new Response(null, {
			status: 204,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": ALLOWED_METHODS,
				...requestedHeaders === null ? {} : {
					"Access-Control-Allow-Headers": requestedHeaders,
					Vary: "Access-Control-Request-Headers"
				}
			}
		});
	}
	if (request.method !== "GET" && request.method !== "HEAD") {
		let error = new OAuthError(OAuthErrorCode.MethodNotAllowed, `The method ${request.method} is not allowed for this endpoint`);
		return Response.json(error.toResponseObject(), {
			status: 405,
			headers: {
				Allow: ALLOWED_METHODS,
				"Access-Control-Allow-Origin": "*"
			}
		});
	}
	let response = Response.json(metadata, { headers: { "Access-Control-Allow-Origin": "*" } });
	return request.method === "HEAD" ? new Response(null, {
		status: response.status,
		headers: response.headers
	}) : response;
}
function oauthMetadataResponse(request, options) {
	let requestPath = stripTrailingSlash(new URL(request.url).pathname);
	if (requestPath === protectedResourceMetadataPath(options.resourceServerUrl)) return metadataDocumentResponse(request, buildOAuthProtectedResourceMetadata(options));
	if (requestPath === "/.well-known/oauth-authorization-server")
		return buildOAuthProtectedResourceMetadata(options), metadataDocumentResponse(request, options.oauthMetadata);
}
function supportsScopeChallengeResolver(transport) {
	return typeof transport == "object" && transport !== null && "setScopeChallengeResolver" in transport && typeof transport.setScopeChallengeResolver == "function";
}
function assertScope(scope, location) {
	if (typeof scope != "string" || !/^[\u0021\u0023-\u005B\u005D-\u007E]+$/.test(scope)) throw new TypeError(`${location} must satisfy the OAuth scope-token grammar`);
}
function validateScopeChallenge(challenge) {
	if (challenge === null || typeof challenge != "object" || !Array.isArray(challenge.scopes) || challenge.scopes.length === 0) throw new TypeError("scope challenge must contain at least one scope");
	for (let [index, scope] of challenge.scopes.entries()) assertScope(scope, `scope challenge scopes[${index}]`);
	if (challenge.errorDescription !== void 0 && typeof challenge.errorDescription != "string") throw new TypeError("scope challenge errorDescription must be a string");
	if (challenge.errorDescription !== void 0 && !/^[\u0020-\u0021\u0023-\u005B\u005D-\u007E]+$/.test(challenge.errorDescription)) throw new TypeError("scope challenge errorDescription must satisfy the RFC 6750 error-description grammar");
	return challenge;
}
function requireScopes(...scopes) {
	if (scopes.length === 0) throw new TypeError("requireScopes must contain at least one scope");
	for (let [index, scope] of scopes.entries()) assertScope(scope, `requireScopes scope[${index}]`);
	let requiredScopes = [...scopes];
	return ({ authInfo }) => {
		if (authInfo === void 0) return;
		let activeScopes = new Set(authInfo.scopes);
		if (!requiredScopes.every((scope) => activeScopes.has(scope)))
			return { scopes: requiredScopes };
	};
}
async function findScopeChallenge(requests, authInfo, resolve) {
	for (let request of requests) {
		let challenge = await resolve({
			request,
			...authInfo !== void 0 && { authInfo }
		});
		if (challenge !== void 0) return validateScopeChallenge(challenge);
	}
}
function scopeChallengeResourceMetadataUrl(authInfo) {
	if (authInfo?.resourceMetadataUrl !== void 0) return authInfo.resourceMetadataUrl;
	if (authInfo?.resource?.protocol === "https:" || authInfo?.resource?.protocol === "http:") return getOAuthProtectedResourceMetadataUrl(authInfo.resource);
}
function createScopeChallengeResponse(challenge, resourceMetadataUrl) {
	return bearerAuthChallengeResponse(new OAuthError(OAuthErrorCode.InsufficientScope, challenge.errorDescription ?? "Insufficient scope"), {
		requiredScopes: [...challenge.scopes],
		resourceMetadataUrl
	});
}
var DEFAULT_LEGACY_SHIM_MAX_ROUNDS = 8, DEFAULT_LEGACY_SHIM_ROUND_TIMEOUT_MS = 6e5;
function resolveLegacyShimOptions(options) {
	if (options?.maxRounds !== void 0 && (!Number.isInteger(options.maxRounds) || options.maxRounds < 1)) throw new RangeError(`inputRequired.maxRounds must be a positive integer (got ${options.maxRounds})`);
	if (options?.roundTimeoutMs !== void 0 && (!Number.isFinite(options.roundTimeoutMs) || options.roundTimeoutMs <= 0)) throw new RangeError(`inputRequired.roundTimeoutMs must be a positive number (got ${options.roundTimeoutMs})`);
	return {
		maxRounds: options?.maxRounds ?? DEFAULT_LEGACY_SHIM_MAX_ROUNDS,
		roundTimeoutMs: options?.roundTimeoutMs ?? DEFAULT_LEGACY_SHIM_ROUND_TIMEOUT_MS,
		legacyShim: options?.legacyShim ?? !0
	};
}
function coerceEmbeddedInputRequest(method, key, entry) {
	if (entry === null || typeof entry != "object" || typeof entry.method != "string") throw new ProtocolError(ProtocolErrorCode.InternalError, `Handler for ${method} returned an invalid input request '${key}': each inputRequests entry must be an embedded elicitation/create, sampling/createMessage, or roots/list request`);
	let embedded = entry, required = requiredClientCapabilitiesForInputRequest(embedded);
	if (required === void 0) throw new ProtocolError(ProtocolErrorCode.InternalError, `Handler for ${method} returned an input request '${key}' of kind '${embedded.method}', which is not an embedded request the 2026-07-28 revision defines`);
	return {
		embedded,
		required
	};
}
function syntheticElicitationId() {
	let webCrypto = globalThis.crypto;
	if (webCrypto?.randomUUID !== void 0) return webCrypto.randomUUID();
	let bytes = new Uint8Array(16);
	webCrypto.getRandomValues(bytes), bytes[6] = bytes[6] & 15 | 64, bytes[8] = bytes[8] & 63 | 128;
	let hex = [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
	return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
function legacyShimFailure(method, message) {
	if (method === "tools/call") return {
		content: [{
			type: "text",
			text: message
		}],
		isError: !0
	};
	throw new ProtocolError(ProtocolErrorCode.InternalError, message);
}
var LegacyInputRequiredShim = class {
	constructor(_host) {
		this._host = _host;
	}
	async fulfill(method, handler, request, ctx, firstResult) {
		let { maxRounds, roundTimeoutMs } = this._host, outerSignal = ctx.mcpReq.signal, current = firstResult, round = 0;
		for (; ; ) {
			if (round += 1, round > maxRounds) return legacyShimFailure(method, inputRequiredRoundsExceededMessage(method, maxRounds));
			let inputRequests = current.inputRequests, hasInputRequests = inputRequests != null && Object.keys(inputRequests).length > 0, requestState = typeof current.requestState == "string" ? current.requestState : void 0;
			if (!hasInputRequests && requestState === void 0) throw new ProtocolError(ProtocolErrorCode.InternalError, `Handler for ${method} returned an input-required result with neither inputRequests nor requestState (every InputRequiredResult must include at least one of the two)`);
			let responses;
			if (hasInputRequests) {
				let declared = this._host.resolvedClientCapabilities(ctx), coerced = [];
				for (let [key, entry] of Object.entries(inputRequests)) {
					let { embedded, required } = coerceEmbeddedInputRequest(method, key, entry);
					if (embedded.method !== "roots/list" && embedded.params === void 0) throw new ProtocolError(ProtocolErrorCode.InternalError, `Handler for ${method} returned an input request '${key}' of kind '${embedded.method}' without params`);
					if (missingClientCapabilities(required, declared) !== void 0) return legacyShimFailure(method, `Cannot request input '${key}' (${embedded.method}): the client on this 2025-era connection did not declare the required capability${declared === void 0 ? " (no client capabilities are available on this connection \u2014 per-request legacy serving cannot receive server-to-client requests)" : ""}`);
					coerced.push([key, embedded]);
				}
				let roundAbort = linkedRoundAbort(outerSignal);
				try {
					let legOptions = {
						relatedRequestId: ctx.mcpReq.id,
						timeout: roundTimeoutMs,
						resetTimeoutOnProgress: !0,
						onprogress: () => {
						},
						signal: roundAbort.signal
					}, fulfilled = await Promise.all(coerced.map(async ([key, embedded]) => {
						try {
							return [key, await this._dispatchLeg(embedded, legOptions)];
						} catch (error) {
							throw roundAbort.abort(error), error;
						}
					}));
					responses = Object.fromEntries(fulfilled);
				} catch (error) {
					if (outerSignal.aborted) throw error;
					return legacyShimFailure(method, `Fulfilling input required by '${method}' failed: ${error instanceof Error ? error.message : String(error)}`);
				} finally {
					roundAbort.dispose();
				}
			} else await sleep(REQUEST_STATE_ONLY_LEG_PACING_MS, outerSignal);
			let ctxNext = {
				...ctx,
				mcpReq: {
					...ctx.mcpReq,
					inputResponses: responses,
					droppedInputResponseKeys: void 0,
					requestState: requestStateAccessor(requestState)
				}
			};
			if (requestState !== void 0) {
				let decoded = await this._host.verifyRequestState(requestState, ctxNext, method);
				decoded !== void 0 && (ctxNext = withRequestStateValue(ctxNext, decoded));
			}
			let next = await handler(request, ctxNext);
			if (!isInputRequiredResult(next)) return next;
			current = next;
		}
	}
	/** Routes one embedded request through the host's existing 2025-era senders (gate already ran). */
	async _dispatchLeg(embedded, options) {
		switch (embedded.method) {
			case "elicitation/create": {
				let params = embedded.params;
				return params.mode === "url" && params.elicitationId === void 0 && (params = {
					...params,
					elicitationId: syntheticElicitationId()
				}), await this._host.sendElicitation(params, options);
			}
			case "sampling/createMessage":
				return await this._host.sendSampling(embedded.params, options);
			case "roots/list":
				return await this._host.listRoots(embedded.params, options);
		}
	}
}, INPUT_REQUIRED_CAPABLE_METHODS = /* @__PURE__ */ new Set([
	"tools/call",
	"prompts/get",
	"resources/read"
]), writeClientIdentity, installDiscoverHandler, readServerIdentity;
function seedClientIdentityFromEnvelope(server, identity) {
	writeClientIdentity(server, identity);
}
function installModernOnlyHandlers(server, servedModernVersions) {
	installDiscoverHandler(server, servedModernVersions);
}
function serverIdentityOf(server) {
	return readServerIdentity(server);
}
var Server = class extends Protocol {
	_clientCapabilities;
	_clientVersion;
	static {
		writeClientIdentity = (server, identity) => {
			identity.clientCapabilities !== void 0 && (server._clientCapabilities = identity.clientCapabilities), identity.clientInfo !== void 0 && (server._clientVersion = identity.clientInfo);
		}, installDiscoverHandler = (server, servedModernVersions) => {
			let missing = servedModernVersions.filter((version) => !server._supportedProtocolVersions.includes(version));
			missing.length > 0 && (server._supportedProtocolVersions = [...server._supportedProtocolVersions, ...missing]), server.setRequestHandler("server/discover", () => server._ondiscover());
		}, readServerIdentity = (server) => server._serverInfo;
	}
	_capabilities;
	_instructions;
	_jsonSchemaValidator;
	_cacheHints;
	_requestStateVerify;
	_inputRequiredServing;
	_legacyShim;
	_boundFromTransport = !1;
	/** Lazily-built legacy shim; the loop lives in legacyInputRequiredShim.ts behind a narrow host contract. */
	_legacyInputRequiredShim() {
		return this._legacyShim ??= new LegacyInputRequiredShim({
			maxRounds: this._inputRequiredServing.maxRounds,
			roundTimeoutMs: this._inputRequiredServing.roundTimeoutMs,
			resolvedClientCapabilities: (ctx) => this._inputRequestCapabilityView(ctx),
			verifyRequestState: (state, ctx, method) => this._verifyRequestState(state, ctx, method),
			sendElicitation: (params, options) => this._sendElicitationLeg(params, options, { validateAcceptedContent: !1 }),
			sendSampling: (params, options) => this.createMessage(params, options),
			listRoots: (params, options) => this.listRoots(params, options)
		});
	}
	/**
	* Callback for when initialization has fully completed (i.e., the client has sent an `notifications/initialized` notification).
	*/
	oninitialized;
	/**
	* Initializes this server with the given name and version information.
	*/
	constructor(_serverInfo, options) {
		if (super(options), this._serverInfo = _serverInfo, this._capabilities = options?.capabilities ? { ...options.capabilities } : {}, this._instructions = options?.instructions, this._jsonSchemaValidator = options?.jsonSchemaValidator ?? new AjvJsonSchemaValidator(), this._requestStateVerify = options?.requestState?.verify, this._inputRequiredServing = resolveLegacyShimOptions(options?.inputRequired), options?.cacheHints !== void 0) {
			for (let [operation, hint] of Object.entries(options.cacheHints)) hint !== void 0 && assertValidCacheHint(hint, `cacheHints['${operation}']`);
			this._cacheHints = options.cacheHints;
		}
		this.setRequestHandler("initialize", (request) => this._oninitialize(request)), this.setNotificationHandler("notifications/initialized", () => this.oninitialized?.()), modernProtocolVersions(this._supportedProtocolVersions).length > 0 && this.setRequestHandler("server/discover", () => this._ondiscover()), this._capabilities.logging && this._registerLoggingHandler();
	}
	/** Attaches to the given transport; rejects while this instance is connected to another one. */
	async connect(transport) {
		if (this.transport !== void 0) throw new SdkError(SdkErrorCode.AlreadyConnected, "Use a separate Server instance per connection: this instance is already connected to a transport. To connect it to a new transport, call close() first.");
		this._boundFromTransport && (this._boundFromTransport = !1, this._negotiatedProtocolVersion = void 0);
		let revision = perRequestClassificationOf(transport)?.revision;
		revision !== void 0 && !this._servedModernEra() && SUPPORTED_MODERN_PROTOCOL_VERSIONS.includes(revision) && modernProtocolVersions(this._supportedProtocolVersions).includes(revision) && (this._negotiatedProtocolVersion = revision, this._boundFromTransport = !0), await super.connect(transport);
	}
	/**
	* Registers the built-in `logging/setLevel` request handler.
	*
	* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577).
	* Remains functional during the deprecation window (at least twelve months).
	* Migrate to stderr logging (STDIO servers) or OpenTelemetry.
	*/
	_registerLoggingHandler() {
		this.setRequestHandler("logging/setLevel", async (request, ctx) => {
			let transportSessionId = ctx.sessionId || ctx.http?.req?.headers.get("mcp-session-id") || void 0, { level } = request.params, parseResult = parseSchema(LoggingLevelSchema, level);
			return parseResult.success && this._loggingLevels.set(transportSessionId, parseResult.data), {};
		});
	}
	buildContext(ctx, transportInfo) {
		let hasHttpInfo = ctx.http || transportInfo?.request || transportInfo?.closeSSEStream || transportInfo?.closeStandaloneSSEStream;
		return {
			...ctx,
			mcpReq: {
				...ctx.mcpReq,
				log: (level, data, logger) => {
					if (!this._capabilities.logging) return Promise.resolve();
					let threshold;
					if (this._servedModernEra()) {
						if (threshold = ctx.mcpReq.envelope?.[LOG_LEVEL_META_KEY], threshold === void 0) return Promise.resolve();
					} else threshold = this._loggingLevels.get(ctx.sessionId) ?? this._loggingLevels.get(void 0);
					return threshold !== void 0 && this.LOG_LEVEL_SEVERITY.get(level) < this.LOG_LEVEL_SEVERITY.get(threshold) ? Promise.resolve() : ctx.mcpReq.notify({
						method: "notifications/message",
						params: {
							level,
							data,
							logger
						}
					});
				},
				elicitInput: (params, options) => this.elicitInput(params, options),
				requestSampling: (params, options) => this.createMessage(params, options)
			},
			http: hasHttpInfo ? {
				...ctx.http,
				req: transportInfo?.request,
				closeSSE: transportInfo?.closeSSEStream,
				closeStandaloneSSE: transportInfo?.closeStandaloneSSEStream
			} : void 0
		};
	}
	_loggingLevels = /* @__PURE__ */ new Map();
	LOG_LEVEL_SEVERITY = new Map(LoggingLevelSchema.options.map((level, index) => [level, index]));
	isMessageIgnored = (level, sessionId) => {
		let currentLevel = this._loggingLevels.get(sessionId);
		return currentLevel ? this.LOG_LEVEL_SEVERITY.get(level) < this.LOG_LEVEL_SEVERITY.get(currentLevel) : !1;
	};
	/**
	* Registers new capabilities. This can only be called before connecting to a transport.
	*
	* The new capabilities will be merged with any existing capabilities previously given (e.g., at initialization).
	*/
	registerCapabilities(capabilities) {
		if (this.transport) throw new SdkError(SdkErrorCode.AlreadyConnected, "Cannot register capabilities after connecting to transport");
		let hadLogging = !!this._capabilities.logging;
		this._capabilities = mergeCapabilities(this._capabilities, capabilities), !hadLogging && this._capabilities.logging && this._registerLoggingHandler();
	}
	/**
	* Enforces server-side validation for `tools/call` results regardless of how the
	* handler was registered, attaches the configured per-operation cache hint
	* (when one exists) so the 2026-07-28 encode seam can fill `ttlMs`/`cacheScope`
	* for results that do not provide their own, and owns the multi-round-trip
	* seam: on the methods whose 2026-07-28 result vocabulary includes
	* `input_required` (`tools/call`, `prompts/get`, `resources/read`) an
	* input-required return skips result-schema validation and is checked
	* against the served era, the at-least-one rule, and the request's own
	* declared client capabilities; on every other method an input-required
	* return is a server bug and fails loudly. The hint rides a symbol-keyed
	* property that is never serialized, so 2025-era responses are unaffected.
	*/
	_wrapHandler(method, handler) {
		if (method !== "tools/call") {
			let cacheHint = this._cacheHints?.[method], isInputRequiredCapable = INPUT_REQUIRED_CAPABLE_METHODS.has(method);
			return cacheHint === void 0 && !isInputRequiredCapable ? async (request, ctx) => {
				let result = await handler(request, ctx);
				if (isInputRequiredResult(result)) throw new ProtocolError(ProtocolErrorCode.InternalError, `Handler for ${method} returned an input-required result, but only tools/call, prompts/get and resources/read support input_required (protocol revision 2026-07-28)`);
				return result;
			} : async (request, ctx) => {
				let result = isInputRequiredCapable ? await this._invokeInputRequiredCapableHandler(method, handler, request, ctx) : await handler(request, ctx);
				if (isInputRequiredResult(result)) {
					if (!isInputRequiredCapable) throw new ProtocolError(ProtocolErrorCode.InternalError, `Handler for ${method} returned an input-required result, but only tools/call, prompts/get and resources/read support input_required (protocol revision 2026-07-28)`);
					return result;
				}
				return cacheHint === void 0 ? result : attachCacheHintFallback(result, cacheHint);
			};
		}
		return async (request, ctx) => {
			let codec = codecForVersion(this._negotiatedProtocolVersion), validatedRequest = codec.validateRequest("tools/call", request);
			if (!validatedRequest.ok) throw new ProtocolError(validatedRequest.reason === "not-in-era" ? ProtocolErrorCode.InternalError : ProtocolErrorCode.InvalidParams, validatedRequest.reason === "not-in-era" ? "No wire schema for tools/call in the resolved era" : `Invalid tools/call request: ${validatedRequest.message}`);
			let result = await this._invokeInputRequiredCapableHandler("tools/call", handler, request, ctx);
			if (isInputRequiredResult(result)) return result;
			let normalizedResult = normalizeContentlessToolResult(result), validationResult = codec.validateResult("tools/call", normalizedResult);
			if (!validationResult.ok) throw new ProtocolError(validationResult.reason === "not-in-era" ? ProtocolErrorCode.InternalError : ProtocolErrorCode.InvalidParams, validationResult.reason === "not-in-era" ? "No wire schema for tools/call in the resolved era" : `Invalid tools/call result: ${validationResult.message}`);
			return validationResult.value;
		};
	}
	/**
	* Whether this instance is bound to a 2026-07-28-or-later protocol
	* revision. Era is instance state — a serving entry (`createMcpHandler`,
	* `serveStdio`) marks the instance modern at construction; a 2025-era
	* `initialize` handshake binds it legacy. The multi-round-trip seam reads
	* this directly: there is no per-request era consult.
	*/
	_servedModernEra() {
		return this._negotiatedProtocolVersion !== void 0 && isModernProtocolVersion(this._negotiatedProtocolVersion);
	}
	/**
	* Invokes a handler for one of the multi-round-trip methods and applies
	* the input-required seam:
	*
	* - a `UrlElicitationRequiredError` (or any 2025-style server→client
	*   request idiom) escaping the handler on a request served on the
	*   2026-07-28 era fails LOUDLY with a clear steer to
	*   `inputRequired.elicitUrl(...)` — the `-32042` error never reaches the
	*   2026-07-28 wire and the throw is not silently converted. Requests
	*   served on the 2025 era keep today's `-32042` behavior byte-exact (the
	*   error is rethrown unchanged).
	* - an input-required RETURN toward a 2026-07-28 request must satisfy
	*   the at-least-one rule, and every embedded request must be covered by
	*   the capabilities declared on the request's envelope (violations
	*   answer the typed `-32021` error). Toward a 2025-era request the
	*   return is fulfilled by the default-on legacy shim, whose own gate
	*   consults the initialize-declared capabilities and surfaces
	*   violations per family; `inputRequired.legacyShim: false` restores
	*   the pre-shim loud failure.
	*/
	async _invokeInputRequiredCapableHandler(method, handler, request, ctx) {
		let servedModern = this._servedModernEra(), rawRequestState = ctx.mcpReq.requestState();
		if (rawRequestState !== void 0 && typeof rawRequestState != "string") throw new ProtocolError(ProtocolErrorCode.InvalidParams, "Invalid or expired requestState", { reason: "invalid_request_state" });
		let ctxForHandler = ctx;
		if (typeof rawRequestState == "string") {
			let decoded = await this._verifyRequestState(rawRequestState, ctx, method);
			decoded !== void 0 && (ctxForHandler = withRequestStateValue(ctx, decoded));
		}
		let result;
		try {
			result = await handler(request, ctxForHandler);
		} catch (error) {
			throw error instanceof ProtocolError && error.code === ProtocolErrorCode.UrlElicitationRequired && servedModern ? new ProtocolError(ProtocolErrorCode.InternalError, `URL elicitation cannot be signalled by throwing UrlElicitationRequiredError on protocol revision ${this._negotiatedProtocolVersion}: return inputRequired({ inputRequests: { \u2026: inputRequired.elicitUrl(...) } }) from the handler instead. The urlElicitationRequired error (-32042) of earlier revisions is not available on this revision.`) : error;
		}
		if (!isInputRequiredResult(result)) return result;
		if (!servedModern) {
			if (!this._inputRequiredServing.legacyShim) throw new ProtocolError(ProtocolErrorCode.InternalError, `Handler for ${method} returned an input-required result, but this request is served on protocol revision ${this._negotiatedProtocolVersion ?? LATEST_PROTOCOL_VERSION}, which has no input_required vocabulary`);
			return await this._legacyInputRequiredShim().fulfill(method, handler, request, ctxForHandler, result);
		}
		let inputRequests = result.inputRequests, hasInputRequests = inputRequests != null && Object.keys(inputRequests).length > 0, hasRequestState = typeof result.requestState == "string";
		if (!hasInputRequests && !hasRequestState) throw new ProtocolError(ProtocolErrorCode.InternalError, `Handler for ${method} returned an input-required result with neither inputRequests nor requestState (every InputRequiredResult must include at least one of the two)`);
		if (hasInputRequests) {
			let declared = this._inputRequestCapabilityView(ctx);
			for (let [key, entry] of Object.entries(inputRequests)) {
				let { embedded, required } = coerceEmbeddedInputRequest(method, key, entry), missing = missingClientCapabilities(required, declared);
				if (missing !== void 0) throw new MissingRequiredClientCapabilityError({ requiredCapabilities: missing }, `Cannot request input '${key}' (${embedded.method}): the request's client capabilities do not declare the required capability`);
			}
		}
		return result;
	}
	/**
	* Runs the configured `requestState.verify` hook and returns its
	* resolved value (`undefined` when unconfigured or the hook returns
	* nothing). Deny-on-error: any hook failure answers the frozen `-32602`;
	* the reason goes to `onerror` only.
	*/
	async _verifyRequestState(state, ctx, method) {
		if (this._requestStateVerify !== void 0)
			try {
				return await this._requestStateVerify(state, ctx);
			} catch (error) {
				throw this.onerror?.(/* @__PURE__ */ new Error(`requestState verification rejected ${method}: ${error instanceof Error ? error.message : String(error)}`)), new ProtocolError(ProtocolErrorCode.InvalidParams, "Invalid or expired requestState", { reason: "invalid_request_state" });
			}
	}
	/**
	* The per-request resolved client-capabilities view: the request's own
	* `_meta` envelope on the 2026 era; the `initialize`-declared state on a
	* 2025-era connection. Per-request instances that never saw an
	* initialize (stateless legacy) hold nothing, so gates refuse there.
	*/
	_inputRequestCapabilityView(ctx) {
		return this._servedModernEra() ? ctx.mcpReq.envelope?.[CLIENT_CAPABILITIES_META_KEY] : this._clientCapabilities;
	}
	/**
	* Guard for the push-style server→client request APIs ({@linkcode createMessage},
	* {@linkcode elicitInput}, {@linkcode listRoots}, {@linkcode ping}) on a
	* modern-era instance: the 2026-07-28 revision has no server→client request
	* channel, so the call fails before any wire traffic with a typed error
	* whose message steers to `inputRequired(...)`. The base era gate would
	* also reject it; this guard runs first to carry the steer.
	*/
	_assertPushApiInServedEra(method) {
		if (this._servedModernEra()) throw new SdkError(SdkErrorCode.MethodNotSupportedByProtocolVersion, `Server-to-client requests are not available on protocol revision ${this._negotiatedProtocolVersion}: '${method}' cannot be sent while serving a request on that revision. Return inputRequired({ ... }) from the handler instead \u2014 the client fulfils the embedded requests and retries the original request (multi round-trip requests).`, {
			method,
			era: "2026-07-28"
		});
	}
	assertCapabilityForMethod(method) {
		switch (method) {
			case "sampling/createMessage":
				if (!this._clientCapabilities?.sampling) throw new SdkError(SdkErrorCode.CapabilityNotSupported, `Client does not support sampling (required for ${method})`);
				break;
			case "elicitation/create":
				if (!this._clientCapabilities?.elicitation) throw new SdkError(SdkErrorCode.CapabilityNotSupported, `Client does not support elicitation (required for ${method})`);
				break;
			case "roots/list":
				if (!this._clientCapabilities?.roots) throw new SdkError(SdkErrorCode.CapabilityNotSupported, `Client does not support listing roots (required for ${method})`);
				break;
			case "ping":
				break;
		}
	}
	assertNotificationCapability(method) {
		switch (method) {
			case "notifications/message":
				if (!this._capabilities.logging) throw new SdkError(SdkErrorCode.CapabilityNotSupported, `Server does not support logging (required for ${method})`);
				break;
			case "notifications/resources/updated":
			case "notifications/resources/list_changed":
				if (!this._capabilities.resources) throw new SdkError(SdkErrorCode.CapabilityNotSupported, `Server does not support notifying about resources (required for ${method})`);
				break;
			case "notifications/tools/list_changed":
				if (!this._capabilities.tools) throw new SdkError(SdkErrorCode.CapabilityNotSupported, `Server does not support notifying of tool list changes (required for ${method})`);
				break;
			case "notifications/prompts/list_changed":
				if (!this._capabilities.prompts) throw new SdkError(SdkErrorCode.CapabilityNotSupported, `Server does not support notifying of prompt list changes (required for ${method})`);
				break;
			case "notifications/elicitation/complete":
				if (!this._clientCapabilities?.elicitation?.url) throw new SdkError(SdkErrorCode.CapabilityNotSupported, `Client does not support URL elicitation (required for ${method})`);
				break;
			case "notifications/cancelled":
				break;
			case "notifications/progress":
				break;
		}
	}
	assertRequestHandlerCapability(method) {
		switch (method) {
			case "completion/complete":
				if (!this._capabilities.completions) throw new SdkError(SdkErrorCode.CapabilityNotSupported, `Server does not support completions (required for ${method})`);
				break;
			case "logging/setLevel":
				if (!this._capabilities.logging) throw new SdkError(SdkErrorCode.CapabilityNotSupported, `Server does not support logging (required for ${method})`);
				break;
			case "prompts/get":
			case "prompts/list":
				if (!this._capabilities.prompts) throw new SdkError(SdkErrorCode.CapabilityNotSupported, `Server does not support prompts (required for ${method})`);
				break;
			case "resources/list":
			case "resources/templates/list":
			case "resources/read":
				if (!this._capabilities.resources) throw new SdkError(SdkErrorCode.CapabilityNotSupported, `Server does not support resources (required for ${method})`);
				break;
			case "tools/call":
			case "tools/list":
				if (!this._capabilities.tools) throw new SdkError(SdkErrorCode.CapabilityNotSupported, `Server does not support tools (required for ${method})`);
				break;
			case "ping":
			case "initialize":
				break;
		}
	}
	async _oninitialize(request) {
		let requestedVersion = request.params.protocolVersion;
		this._clientCapabilities = request.params.capabilities, this._clientVersion = request.params.clientInfo;
		let legacyVersions = legacyProtocolVersions(this._supportedProtocolVersions), protocolVersion = legacyVersions.includes(requestedVersion) ? requestedVersion : legacyVersions[0] ?? LATEST_PROTOCOL_VERSION;
		return this._negotiatedProtocolVersion = protocolVersion, this.transport?.setProtocolVersion?.(protocolVersion), {
			protocolVersion,
			capabilities: this.getCapabilities(),
			serverInfo: this._serverInfo,
			...this._instructions && { instructions: this._instructions }
		};
	}
	/**
	* Answers `server/discover` (protocol revision 2026-07-28). `supportedVersions`
	* lists only modern revisions (2025-era versions are negotiated via `initialize`);
	* the capabilities are advertised as-is, listChanged/subscribe bits included
	* (see {@linkcode discoverAdvertisedCapabilities}).
	*/
	_ondiscover() {
		return {
			supportedVersions: modernProtocolVersions(this._supportedProtocolVersions),
			capabilities: discoverAdvertisedCapabilities(this.getCapabilities()),
			...this._instructions && { instructions: this._instructions }
		};
	}
	/**
	* The identity the 2026-era encode seam stamps into every outbound
	* result's `_meta` under `io.modelcontextprotocol/serverInfo` (spec PR
	* #3002: servers SHOULD identify themselves on every response).
	*/
	_outboundServerInfo() {
		return this._serverInfo;
	}
	/**
	* After initialization has completed, this will be populated with the client's reported capabilities.
	*
	* @deprecated Read client identity from the per-request handler context instead: on
	* 2026-07-28 (per-request envelope) requests `ctx.mcpReq.envelope` carries the client's
	* declared capabilities, while on 2025-era connections this accessor keeps returning the
	* `initialize`-scoped value. The accessor remains functional where `createMcpHandler`
	* serves the 2026-07-28 era: it backfills it per request from the validated envelope.
	*/
	getClientCapabilities() {
		return this._clientCapabilities;
	}
	/**
	* After initialization has completed, this will be populated with information about the client's name and version.
	*
	* @deprecated Read client identity from the per-request handler context instead: on
	* 2026-07-28 (per-request envelope) requests `ctx.mcpReq.envelope` carries the client's
	* name and version, while on 2025-era connections this accessor keeps returning the
	* `initialize`-scoped value. The accessor remains functional where `createMcpHandler`
	* serves the 2026-07-28 era: it backfills it per request from the validated envelope.
	*/
	getClientVersion() {
		return this._clientVersion;
	}
	/**
	* After initialization has completed, this will be populated with the protocol version negotiated
	* with the client (the version the server responded with during the initialize handshake), or
	* `undefined` before initialization.
	*
	* @deprecated Read the protocol revision from the per-request handler context instead: on
	* 2026-07-28 (per-request envelope) requests `ctx.mcpReq.envelope` names the revision the
	* request was sent for, while on 2025-era connections this accessor keeps returning the
	* `initialize`-negotiated version. The accessor remains functional — instances serving the
	* 2026-07-28 era report that revision.
	*/
	getNegotiatedProtocolVersion() {
		return this._negotiatedProtocolVersion;
	}
	/**
	* Project a `tools/call` result through this instance's negotiated wire
	* codec — the era-agnostic SEP-2106 §4.3 TextContent auto-append, plus on
	* the 2025 era the `{result:…}` wrap when `structuredContent` is a
	* non-object value or the advertised `outputSchema` had a non-object root.
	* Identity for object-shaped `structuredContent` on the 2026 era.
	*
	* `McpServer`'s built-in `tools/call` handler routes through this method.
	* Low-level `setRequestHandler('tools/call', …)` authors call it
	* themselves so the projection lives in one place (the codec) and the
	* server-side handler stays era-blind.
	*
	* This is the only codec function exposed on `Server` — the full
	* `WireCodec` is intentionally not part of the public surface.
	*/
	projectCallToolResult(result, advertisedOutputSchema) {
		return this._wireCodec().projectCallToolResult(result, advertisedOutputSchema);
	}
	/**
	* Returns the current server capabilities.
	*/
	getCapabilities() {
		return this._capabilities;
	}
	/**
	* Sends a `ping` request to the connected client.
	*
	* @deprecated The 2026-07-28 protocol removed ping; it throws on a 2026-07-28-era instance.
	* If your factory serves both eras, this only works on the legacy path.
	*/
	async ping() {
		return this._assertPushApiInServedEra("ping"), this.request({ method: "ping" });
	}
	async createMessage(params, options) {
		if (this._assertPushApiInServedEra("sampling/createMessage"), (params.tools || params.toolChoice) && !this._clientCapabilities?.sampling?.tools) throw new SdkError(SdkErrorCode.CapabilityNotSupported, "Client does not support sampling tools capability.");
		if (params.messages.length > 0) {
			let lastMessage = params.messages.at(-1), lastContent = Array.isArray(lastMessage.content) ? lastMessage.content : [lastMessage.content], hasToolResults = lastContent.some((c) => c.type === "tool_result"), previousMessage = params.messages.length > 1 ? params.messages.at(-2) : void 0, previousContent = previousMessage ? Array.isArray(previousMessage.content) ? previousMessage.content : [previousMessage.content] : [], hasPreviousToolUse = previousContent.some((c) => c.type === "tool_use");
			if (hasToolResults) {
				if (lastContent.some((c) => c.type !== "tool_result")) throw new ProtocolError(ProtocolErrorCode.InvalidParams, "The last message must contain only tool_result content if any is present");
				if (!hasPreviousToolUse) throw new ProtocolError(ProtocolErrorCode.InvalidParams, "tool_result blocks are not matching any tool_use from the previous message");
			}
			if (hasPreviousToolUse) {
				let toolUseIds = new Set(previousContent.filter((c) => c.type === "tool_use").map((c) => c.id)), toolResultIds = new Set(lastContent.filter((c) => c.type === "tool_result").map((c) => c.toolUseId));
				if (toolUseIds.size !== toolResultIds.size || ![...toolUseIds].every((id) => toolResultIds.has(id))) throw new ProtocolError(ProtocolErrorCode.InvalidParams, "ids of tool_result blocks and tool_use blocks from previous message do not match");
			}
		}
		let hasTools = !!(params.tools || params.toolChoice), wide = await this.request({
			method: "sampling/createMessage",
			params
		}, options), outcome = this._wireCodec().samplingResultVariant(hasTools, wide);
		if (!outcome.ok) throw new SdkError(SdkErrorCode.InvalidResult, `Invalid sampling/createMessage result: ${outcome.reason === "invalid" ? outcome.message : outcome.reason}`);
		return outcome.value;
	}
	/**
	* Creates an elicitation request for the given parameters.
	* For backwards compatibility, `mode` may be omitted for form requests and will default to `"form"`.
	* @param params The parameters for the elicitation request.
	* @param options Optional request options.
	* @returns The result of the elicitation request.
	*
	* @deprecated Throws on a 2026-07-28-era request — use {@link index.inputRequired | inputRequired} (multi-round-trip)
	* instead. The 2025 push-style server-to-client request model is replaced by input_required
	* results in the 2026-07-28 protocol. If your factory serves both eras, this only works on the
	* legacy path.
	*/
	async elicitInput(params, options) {
		switch (this._assertPushApiInServedEra("elicitation/create"), params.mode ?? "form") {
			case "url":
				if (!this._clientCapabilities?.elicitation?.url) throw new SdkError(SdkErrorCode.CapabilityNotSupported, "Client does not support url elicitation.");
				break;
			case "form":
				if (!this._clientCapabilities?.elicitation?.form) throw new SdkError(SdkErrorCode.CapabilityNotSupported, "Client does not support form elicitation.");
				break;
		}
		return this._sendElicitationLeg(params, options);
	}
	/**
	* The capability-check-free core of {@linkcode elicitInput}. The shim
	* uses it because its gate differs from the public checks: a bare
	* `elicitation: {}` counts as form support (the pre-mode rule), and
	* accepted content passes through unvalidated for parity with the
	* modern client driver (handlers validate via the schema-aware
	* `acceptedContent` overload and can re-ask).
	*/
	async _sendElicitationLeg(params, options, behavior) {
		let mode = params.mode ?? "form", validateAcceptedContent = behavior?.validateAcceptedContent ?? !0;
		switch (mode) {
			case "url": {
				let urlParams = params;
				return this.request({
					method: "elicitation/create",
					params: urlParams
				}, options);
			}
			case "form": {
				let formParams = params.mode === "form" ? params : {
					...params,
					mode: "form"
				}, result = await this.request({
					method: "elicitation/create",
					params: formParams
				}, options);
				if (validateAcceptedContent && result.action === "accept" && result.content && formParams.requestedSchema) try {
					let validationResult = this._jsonSchemaValidator.getValidator(formParams.requestedSchema)(result.content);
					if (!validationResult.valid) throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Elicitation response content does not match requested schema: ${validationResult.errorMessage}`);
				} catch (error) {
					throw error instanceof ProtocolError ? error : new ProtocolError(ProtocolErrorCode.InternalError, `Error validating elicitation response: ${error instanceof Error ? error.message : String(error)}`);
				}
				return result;
			}
		}
	}
	/**
	* Creates a reusable callback that, when invoked, will send a `notifications/elicitation/complete`
	* notification for the specified elicitation ID.
	*
	* The notification (and the `elicitationId` it references) exists only on protocol revision
	* 2025-11-25 — the 2026-07-28 revision removed both. On a connection negotiated at 2026-07-28 the
	* returned callback rejects with a typed local error before anything reaches the transport
	* (the method is not part of that revision's wire registry).
	*
	* @param elicitationId The ID of the elicitation to mark as complete.
	* @param options Optional notification options. Useful when the completion notification should be related to a prior request.
	* @returns A function that emits the completion notification when awaited.
	*/
	createElicitationCompletionNotifier(elicitationId, options) {
		if (!this._clientCapabilities?.elicitation?.url) throw new SdkError(SdkErrorCode.CapabilityNotSupported, "Client does not support URL elicitation (required for notifications/elicitation/complete)");
		return () => this.notification({
			method: "notifications/elicitation/complete",
			params: { elicitationId }
		}, options);
	}
	/**
	* Requests the list of roots from the client.
	*
	* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577).
	* Throws on a 2026-07-28-era request — use {@link index.inputRequired | inputRequired} (multi-round-trip) instead,
	* or migrate to passing paths via tool parameters, resource URIs, or configuration. The 2025
	* push-style server-to-client request model is replaced by input_required results in the
	* 2026-07-28 protocol. If your factory serves both eras, this only works on the legacy path.
	*/
	async listRoots(params, options) {
		return this._assertPushApiInServedEra("roots/list"), this.request({
			method: "roots/list",
			params
		}, options);
	}
	/**
	* Sends a logging message to the client, if connected.
	* Note: You only need to send the parameters object, not the entire JSON-RPC message.
	* @see {@linkcode LoggingMessageNotification}
	* @param params
	* @param sessionId Optional for stateless transports and backward compatibility.
	*
	* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577).
	* Remains functional during the deprecation window (at least twelve months).
	* Migrate to stderr logging (STDIO servers) or OpenTelemetry.
	*/
	async sendLoggingMessage(params, sessionId) {
		if (this._capabilities.logging && !this.isMessageIgnored(params.level, sessionId)) return this.notification({
			method: "notifications/message",
			params
		});
	}
	async sendResourceUpdated(params) {
		return this.notification({
			method: "notifications/resources/updated",
			params
		});
	}
	async sendResourceListChanged() {
		return this.notification({ method: "notifications/resources/list_changed" });
	}
	async sendToolListChanged() {
		return this.notification({ method: "notifications/tools/list_changed" });
	}
	async sendPromptListChanged() {
		return this.notification({ method: "notifications/prompts/list_changed" });
	}
};
function discoverAdvertisedCapabilities(capabilities) {
	return { ...capabilities };
}
function toolInputElementCount(value, max) {
	let count = 0, stack = [value];
	for (; stack.length > 0; ) {
		let node = stack.pop();
		if (!(node === null || typeof node != "object"))
			if (Array.isArray(node)) for (let child of node) {
				if (++count > max) return count;
				child !== null && typeof child == "object" && stack.push(child);
			}
			else for (let key in node) {
				if (!Object.prototype.hasOwnProperty.call(node, key)) continue;
				if (++count > max) return count;
				let child = node[key];
				child !== null && typeof child == "object" && stack.push(child);
			}
	}
	return count;
}
function resolveMaxToolInputElements(value) {
	if (!(value === void 0 || value === 1 / 0)) {
		if (typeof value != "number" || Number.isNaN(value) || value < 1) throw new RangeError(`maxToolInputElements must be a number of at least 1, or Infinity, got ${String(value)}`);
		return value;
	}
}
var McpServer = class {
	/**
	* The underlying {@linkcode Server} instance, useful for advanced operations like sending notifications.
	*/
	server;
	_maxToolInputElements;
	_registeredResources = {};
	_registeredResourceTemplates = {};
	_registeredTools = {};
	_registeredPrompts = {};
	/** Per-tool JSON-converted `inputSchema`, filled on first use by `toolInputSchemaJson()`. */
	_toolInputSchemaJson = {};
	/**
	* The JSON-serialized `inputSchema` of a registered tool, or `undefined`
	* when no such tool is registered. Used by the HTTP entry's pre-dispatch
	* SEP-2243 `Mcp-Param-*` validation step (which needs the same JSON Schema
	* `tools/list` would emit, before dispatch reaches the handler).
	*
	* @internal
	*/
	toolInputSchemaJson(name) {
		let tool = this._registeredTools[name];
		if (!(tool === void 0 || !tool.enabled)) {
			if (Object.hasOwn(this._toolInputSchemaJson, name)) return this._toolInputSchemaJson[name];
			if (tool.inputSchema === void 0) return EMPTY_OBJECT_JSON_SCHEMA;
			try {
				let json = standardSchemaToJsonSchema(tool.inputSchema, "input");
				return this._toolInputSchemaJson[name] = json, json;
			} catch {
				return;
			}
		}
	}
	constructor(serverInfo, options) {
		this.server = new Server(serverInfo, options), this._maxToolInputElements = resolveMaxToolInputElements(options?.maxToolInputElements), options?.capabilities?.tools && this.setToolRequestHandlers(), options?.capabilities?.resources && this.setResourceRequestHandlers(), options?.capabilities?.prompts && this.setPromptRequestHandlers();
	}
	/**
	* Attaches to the given transport, starts it, and starts listening for messages.
	*
	* The `server` object assumes ownership of the {@linkcode Transport}, replacing any callbacks that have already been set, and expects that it is the only user of the {@linkcode Transport} instance going forward.
	*
	* @example
	* ```ts source="./mcp.examples.ts#McpServer_connect_stdio"
	* const server = new McpServer({ name: 'my-server', version: '1.0.0' });
	* const transport = new StdioServerTransport();
	* await server.connect(transport);
	* ```
	*/
	async connect(transport) {
		return supportsScopeChallengeResolver(transport) && transport.setScopeChallengeResolver((context) => this.resolveScopeChallenge(context)), await this.server.connect(transport);
	}
	/**
	* Closes the connection.
	*/
	async close() {
		await this.server.close();
	}
	/** @internal */
	resolveScopeChallenge = (context) => {
		switch (context.request.method) {
			case "tools/call": {
				let toolName = context.request.params?.name;
				if (typeof toolName != "string") return;
				let tool = this._registeredTools[toolName];
				return tool === void 0 || !tool.enabled ? void 0 : tool.scopeChallenge?.(context);
			}
			case "resources/read": {
				let resourceUri = context.request.params?.uri;
				if (typeof resourceUri != "string") return;
				let uri;
				try {
					uri = new URL(resourceUri);
				} catch {
					return;
				}
				let resource = this._registeredResources[uri.toString()];
				if (resource !== void 0) return resource.enabled ? resource.scopeChallenge?.(context) : void 0;
				for (let template of Object.values(this._registeredResourceTemplates)) if (template.resourceTemplate.uriTemplate.match(uri.toString())) return template.enabled ? template.scopeChallenge?.(context) : void 0;
				return;
			}
			case "prompts/get": {
				let promptName = context.request.params?.name;
				if (typeof promptName != "string") return;
				let prompt = this._registeredPrompts[promptName];
				return prompt === void 0 || !prompt.enabled ? void 0 : prompt.scopeChallenge?.(context);
			}
			default:
				return;
		}
	};
	_toolHandlersInitialized = !1;
	setToolRequestHandlers() {
		this._toolHandlersInitialized || (this.server.assertCanSetRequestHandler("tools/list"), this.server.assertCanSetRequestHandler("tools/call"), this.server.registerCapabilities({ tools: { listChanged: this.server.getCapabilities().tools?.listChanged ?? !0 } }), this.server.setRequestHandler("tools/list", () => ({ tools: Object.entries(this._registeredTools).filter(([, tool]) => tool.enabled).map(([name, tool]) => {
			let toolDefinition = {
				name,
				title: tool.title,
				description: tool.description,
				inputSchema: tool.inputSchema ? convertListedInputSchema(name, tool.inputSchema) : EMPTY_OBJECT_JSON_SCHEMA,
				annotations: tool.annotations,
				icons: tool.icons,
				execution: tool.execution,
				_meta: tool._meta
			};
			return tool.outputSchema && (toolDefinition.outputSchema = standardSchemaToJsonSchema(tool.outputSchema, "output")), toolDefinition;
		}) })), this.server.setRequestHandler("tools/call", async (request, ctx) => {
			let tool = this._registeredTools[request.params.name];
			if (!tool) throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Tool ${request.params.name} not found`);
			if (!tool.enabled) throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Tool ${request.params.name} disabled`);
			try {
				let args = await this.validateToolInput(tool, request.params.arguments, request.params.name), result = await this.executeToolHandler(tool, args, ctx);
				return await this.validateToolOutput(tool, result, request.params.name), isInputRequiredResult(result) ? result : this.server.projectCallToolResult(result, tool.outputSchemaJson);
			} catch (error) {
				if (error instanceof ProtocolError && error.code === ProtocolErrorCode.UrlElicitationRequired) throw error;
				return this.createToolError(error instanceof Error ? error.message : String(error));
			}
		}), this._toolHandlersInitialized = !0);
	}
	/**
	* Creates a tool error result.
	*
	* @param errorMessage - The error message.
	* @returns The tool error result.
	*/
	createToolError(errorMessage) {
		return {
			content: [{
				type: "text",
				text: errorMessage
			}],
			isError: !0
		};
	}
	/**
	* Validates tool input arguments against the tool's input schema.
	*/
	async validateToolInput(tool, args, toolName) {
		if (this._maxToolInputElements !== void 0 && toolInputElementCount(args, this._maxToolInputElements) > this._maxToolInputElements) throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Invalid arguments for tool ${toolName}: arguments contain more than the maximum of ${this._maxToolInputElements} elements`);
		if (!tool.inputSchema) return;
		let parseResult = await validateStandardSchema(tool.inputSchema, args ?? {});
		if (!parseResult.success) throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Input validation error: Invalid arguments for tool ${toolName}: ${parseResult.error}`);
		return parseResult.data;
	}
	/**
	* Validates tool output against the tool's output schema.
	*/
	async validateToolOutput(tool, result, toolName) {
		if (!tool.outputSchema || isInputRequiredResult(result) || result.isError) return;
		if (result.structuredContent === void 0) throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Output validation error: Tool ${toolName} has an output schema but no structured content was provided`);
		let parseResult = await validateStandardSchema(tool.outputSchema, result.structuredContent);
		if (!parseResult.success) throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Output validation error: Invalid structured content for tool ${toolName}: ${parseResult.error}`);
	}
	/**
	* Executes a tool handler.
	*/
	async executeToolHandler(tool, args, ctx) {
		return tool.executor(args, ctx);
	}
	_completionHandlerInitialized = !1;
	setCompletionRequestHandler() {
		this._completionHandlerInitialized || (this.server.assertCanSetRequestHandler("completion/complete"), this.server.registerCapabilities({ completions: {} }), this.server.setRequestHandler("completion/complete", async (request) => {
			switch (request.params.ref.type) {
				case "ref/prompt":
					return assertCompleteRequestPrompt(request), this.handlePromptCompletion(request, request.params.ref);
				case "ref/resource":
					return assertCompleteRequestResourceTemplate(request), this.handleResourceCompletion(request, request.params.ref);
				default:
					throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Invalid completion reference: ${request.params.ref}`);
			}
		}), this._completionHandlerInitialized = !0);
	}
	async handlePromptCompletion(request, ref) {
		let prompt = this._registeredPrompts[ref.name];
		if (!prompt) throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Prompt ${ref.name} not found`);
		if (!prompt.enabled) throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Prompt ${ref.name} disabled`);
		if (!prompt.argsSchema) return EMPTY_COMPLETION_RESULT;
		let field = unwrapOptionalSchema(getSchemaShape(prompt.argsSchema)?.[request.params.argument.name]);
		if (!isCompletable(field)) return EMPTY_COMPLETION_RESULT;
		let completer = getCompleter(field);
		return completer ? createCompletionResult(await completer(request.params.argument.value, request.params.context)) : EMPTY_COMPLETION_RESULT;
	}
	async handleResourceCompletion(request, ref) {
		let template = Object.values(this._registeredResourceTemplates).find((t) => t.resourceTemplate.uriTemplate.toString() === ref.uri);
		if (!template) {
			if (this._registeredResources[ref.uri]) return EMPTY_COMPLETION_RESULT;
			throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Resource template ${request.params.ref.uri} not found`);
		}
		let completer = template.resourceTemplate.completeCallback(request.params.argument.name);
		return completer ? createCompletionResult(await completer(request.params.argument.value, request.params.context)) : EMPTY_COMPLETION_RESULT;
	}
	_resourceHandlersInitialized = !1;
	setResourceRequestHandlers() {
		this._resourceHandlersInitialized || (this.server.assertCanSetRequestHandler("resources/list"), this.server.assertCanSetRequestHandler("resources/templates/list"), this.server.assertCanSetRequestHandler("resources/read"), this.server.registerCapabilities({ resources: { listChanged: this.server.getCapabilities().resources?.listChanged ?? !0 } }), this.server.setRequestHandler("resources/list", async (_request, ctx) => {
			let resources = Object.entries(this._registeredResources).filter(([_, resource]) => resource.enabled).map(([uri, resource]) => ({
				uri,
				name: resource.name,
				...resource.metadata
			})), templateResources = [];
			for (let template of Object.values(this._registeredResourceTemplates)) {
				if (!template.resourceTemplate.listCallback) continue;
				let result = await template.resourceTemplate.listCallback(ctx);
				for (let resource of result.resources) templateResources.push({
					...template.metadata,
					...resource
				});
			}
			return { resources: [...resources, ...templateResources] };
		}), this.server.setRequestHandler("resources/templates/list", async () => ({ resourceTemplates: Object.entries(this._registeredResourceTemplates).map(([name, template]) => ({
			name,
			uriTemplate: template.resourceTemplate.uriTemplate.toString(),
			...template.metadata
		})) })), this.server.setRequestHandler("resources/read", async (request, ctx) => {
			let uri;
			try {
				uri = new URL(request.params.uri);
			} catch {
				throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Resource URI ${request.params.uri} is invalid`, {
					uri: request.params.uri,
					reason: "invalid_uri"
				});
			}
			let resource = this._registeredResources[uri.toString()];
			if (resource) {
				if (!resource.enabled) throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Resource ${uri} disabled`);
				return attachCacheHintFallback(await resource.readCallback(uri, ctx), resource.cacheHint);
			}
			for (let template of Object.values(this._registeredResourceTemplates)) {
				let variables = template.resourceTemplate.uriTemplate.match(uri.toString());
				if (variables) {
					if (!template.enabled) throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Resource template ${template.resourceTemplate.uriTemplate} disabled`);
					return attachCacheHintFallback(await template.readCallback(uri, variables, ctx), template.cacheHint);
				}
			}
			throw new ResourceNotFoundError(request.params.uri);
		}), this._resourceHandlersInitialized = !0);
	}
	_promptHandlersInitialized = !1;
	setPromptRequestHandlers() {
		this._promptHandlersInitialized || (this.server.assertCanSetRequestHandler("prompts/list"), this.server.assertCanSetRequestHandler("prompts/get"), this.server.registerCapabilities({ prompts: { listChanged: this.server.getCapabilities().prompts?.listChanged ?? !0 } }), this.server.setRequestHandler("prompts/list", () => ({ prompts: Object.entries(this._registeredPrompts).filter(([, prompt]) => prompt.enabled).map(([name, prompt]) => ({
			name,
			title: prompt.title,
			description: prompt.description,
			arguments: prompt.argsSchema ? promptArgumentsFromStandardSchema(prompt.argsSchema) : void 0,
			icons: prompt.icons,
			_meta: prompt._meta
		})) })), this.server.setRequestHandler("prompts/get", async (request, ctx) => {
			let prompt = this._registeredPrompts[request.params.name];
			if (!prompt) throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Prompt ${request.params.name} not found`);
			if (!prompt.enabled) throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Prompt ${request.params.name} disabled`);
			return prompt.handler(request.params.arguments, ctx);
		}), this._promptHandlersInitialized = !0);
	}
	registerResource(name, uriOrTemplate, config, readCallback) {
		let { cacheHint, scopeChallenge, ...resourceMetadata } = config, metadata = resourceMetadata;
		if (cacheHint !== void 0 && assertValidCacheHint(cacheHint, `resource ${name}`), typeof uriOrTemplate == "string") {
			if (this._registeredResources[uriOrTemplate]) throw new Error(`Resource ${uriOrTemplate} is already registered`);
			let registeredResource = this._createRegisteredResource(name, config.title, uriOrTemplate, metadata, scopeChallenge, readCallback);
			return cacheHint !== void 0 && (registeredResource.cacheHint = cacheHint), this.setResourceRequestHandlers(), this.sendResourceListChanged(), registeredResource;
		} else {
			if (this._registeredResourceTemplates[name]) throw new Error(`Resource template ${name} is already registered`);
			let registeredResourceTemplate = this._createRegisteredResourceTemplate(name, config.title, uriOrTemplate, metadata, scopeChallenge, readCallback);
			return cacheHint !== void 0 && (registeredResourceTemplate.cacheHint = cacheHint), this.setResourceRequestHandlers(), this.sendResourceListChanged(), registeredResourceTemplate;
		}
	}
	_createRegisteredResource(name, title, uri, metadata, scopeChallenge, readCallback) {
		let registeredResource = {
			name,
			title,
			metadata,
			readCallback,
			scopeChallenge,
			enabled: !0,
			disable: () => registeredResource.update({ enabled: !1 }),
			enable: () => registeredResource.update({ enabled: !0 }),
			remove: () => registeredResource.update({ uri: null }),
			update: (updates) => {
				updates.uri !== void 0 && updates.uri !== uri && (delete this._registeredResources[uri], updates.uri && (this._registeredResources[updates.uri] = registeredResource)), updates.name !== void 0 && (registeredResource.name = updates.name), updates.metadata !== void 0 && (registeredResource.metadata = updates.metadata), updates.title !== void 0 && (registeredResource.title = updates.title, registeredResource.metadata = {
					...registeredResource.metadata,
					title: updates.title
				}), updates.callback !== void 0 && (registeredResource.readCallback = updates.callback), updates.scopeChallenge !== void 0 && (registeredResource.scopeChallenge = updates.scopeChallenge === null ? void 0 : updates.scopeChallenge), updates.enabled !== void 0 && (registeredResource.enabled = updates.enabled), this.sendResourceListChanged();
			}
		};
		return this._registeredResources[uri] = registeredResource, registeredResource;
	}
	_createRegisteredResourceTemplate(name, title, template, metadata, scopeChallenge, readCallback) {
		let registeredResourceTemplate = {
			resourceTemplate: template,
			title,
			metadata,
			readCallback,
			scopeChallenge,
			enabled: !0,
			disable: () => registeredResourceTemplate.update({ enabled: !1 }),
			enable: () => registeredResourceTemplate.update({ enabled: !0 }),
			remove: () => registeredResourceTemplate.update({ name: null }),
			update: (updates) => {
				updates.name !== void 0 && updates.name !== name && (delete this._registeredResourceTemplates[name], updates.name && (this._registeredResourceTemplates[updates.name] = registeredResourceTemplate)), updates.template !== void 0 && (registeredResourceTemplate.resourceTemplate = updates.template), updates.metadata !== void 0 && (registeredResourceTemplate.metadata = updates.metadata), updates.title !== void 0 && (registeredResourceTemplate.title = updates.title, registeredResourceTemplate.metadata = {
					...registeredResourceTemplate.metadata,
					title: updates.title
				}), updates.callback !== void 0 && (registeredResourceTemplate.readCallback = updates.callback), updates.scopeChallenge !== void 0 && (registeredResourceTemplate.scopeChallenge = updates.scopeChallenge === null ? void 0 : updates.scopeChallenge), updates.enabled !== void 0 && (registeredResourceTemplate.enabled = updates.enabled), this.sendResourceListChanged();
			}
		};
		this._registeredResourceTemplates[name] = registeredResourceTemplate;
		let variableNames = template.uriTemplate.variableNames;
		return Array.isArray(variableNames) && variableNames.some((v) => !!template.completeCallback(v)) && this.setCompletionRequestHandler(), registeredResourceTemplate;
	}
	_createRegisteredPrompt(name, title, description, argsSchema, callback, icons, scopeChallenge, _meta) {
		let currentArgsSchema = argsSchema, currentCallback = callback, registeredPrompt = {
			title,
			description,
			argsSchema,
			icons,
			scopeChallenge,
			_meta,
			handler: createPromptHandler(name, argsSchema, callback),
			enabled: !0,
			disable: () => registeredPrompt.update({ enabled: !1 }),
			enable: () => registeredPrompt.update({ enabled: !0 }),
			remove: () => registeredPrompt.update({ name: null }),
			update: (updates) => {
				updates.name !== void 0 && updates.name !== name && (delete this._registeredPrompts[name], updates.name && (this._registeredPrompts[updates.name] = registeredPrompt)), updates.title !== void 0 && (registeredPrompt.title = updates.title), updates.description !== void 0 && (registeredPrompt.description = updates.description), updates.icons !== void 0 && (registeredPrompt.icons = updates.icons), updates.scopeChallenge !== void 0 && (registeredPrompt.scopeChallenge = updates.scopeChallenge === null ? void 0 : updates.scopeChallenge), updates._meta !== void 0 && (registeredPrompt._meta = updates._meta);
				let needsHandlerRegen = !1;
				updates.argsSchema !== void 0 && (registeredPrompt.argsSchema = updates.argsSchema, currentArgsSchema = updates.argsSchema, needsHandlerRegen = !0), updates.callback !== void 0 && (currentCallback = updates.callback, needsHandlerRegen = !0), needsHandlerRegen && (registeredPrompt.handler = createPromptHandler(name, currentArgsSchema, currentCallback)), updates.enabled !== void 0 && (registeredPrompt.enabled = updates.enabled), this.sendPromptListChanged();
			}
		};
		if (this._registeredPrompts[name] = registeredPrompt, argsSchema) {
			let shape = getSchemaShape(argsSchema);
			shape && Object.values(shape).some((field) => isCompletable(unwrapOptionalSchema(field))) && this.setCompletionRequestHandler();
		}
		return registeredPrompt;
	}
	_createRegisteredTool(name, title, description, inputSchema, outputSchema, annotations, icons, execution, scopeChallenge, _meta, handler) {
		validateAndWarnToolName(name);
		let currentHandler = handler, outputSchemaJson, registeredTool = {
			title,
			description,
			inputSchema,
			outputSchema,
			get outputSchemaJson() {
				return outputSchemaJson ??= convertOutputSchemaJson(registeredTool.outputSchema);
			},
			set outputSchemaJson(value) {
				outputSchemaJson = value;
			},
			annotations,
			icons,
			execution,
			scopeChallenge,
			_meta,
			handler,
			executor: createToolExecutor(inputSchema, handler),
			enabled: !0,
			disable: () => registeredTool.update({ enabled: !1 }),
			enable: () => registeredTool.update({ enabled: !0 }),
			remove: () => registeredTool.update({ name: null }),
			update: (updates) => {
				updates.name !== void 0 && updates.name !== name && (typeof updates.name == "string" && validateAndWarnToolName(updates.name), delete this._registeredTools[name], delete this._toolInputSchemaJson[name], updates.name && (delete this._toolInputSchemaJson[updates.name], this._registeredTools[updates.name] = registeredTool, name = updates.name)), updates.title !== void 0 && (registeredTool.title = updates.title), updates.description !== void 0 && (registeredTool.description = updates.description);
				let needsExecutorRegen = !1;
				updates.paramsSchema !== void 0 && (registeredTool.inputSchema = updates.paramsSchema, delete this._toolInputSchemaJson[name], needsExecutorRegen = !0), updates.callback !== void 0 && (registeredTool.handler = updates.callback, currentHandler = updates.callback, needsExecutorRegen = !0), needsExecutorRegen && (registeredTool.executor = createToolExecutor(registeredTool.inputSchema, currentHandler)), updates.outputSchema !== void 0 && (registeredTool.outputSchema = updates.outputSchema, registeredTool.outputSchemaJson = convertOutputSchemaJson(updates.outputSchema)), updates.annotations !== void 0 && (registeredTool.annotations = updates.annotations), updates.icons !== void 0 && (registeredTool.icons = updates.icons), updates.scopeChallenge !== void 0 && (registeredTool.scopeChallenge = updates.scopeChallenge === null ? void 0 : updates.scopeChallenge), updates._meta !== void 0 && (registeredTool._meta = updates._meta), updates.enabled !== void 0 && (registeredTool.enabled = updates.enabled), this.sendToolListChanged();
			}
		};
		return this._registeredTools[name] = registeredTool, this.setToolRequestHandlers(), this.sendToolListChanged(), registeredTool;
	}
	registerTool(name, config, cb) {
		if (this._registeredTools[name]) throw new Error(`Tool ${name} is already registered`);
		let { title, description, inputSchema, outputSchema, annotations, icons, scopeChallenge, _meta } = config;
		return this._createRegisteredTool(name, title, description, normalizeRawShapeSchema(inputSchema), normalizeRawShapeSchema(outputSchema), annotations, icons, void 0, scopeChallenge, _meta, cb);
	}
	registerPrompt(name, config, cb) {
		if (this._registeredPrompts[name]) throw new Error(`Prompt ${name} is already registered`);
		let { title, description, argsSchema, icons, scopeChallenge, _meta } = config, registeredPrompt = this._createRegisteredPrompt(name, title, description, normalizeRawShapeSchema(argsSchema), cb, icons, scopeChallenge, _meta);
		return this.setPromptRequestHandlers(), this.sendPromptListChanged(), registeredPrompt;
	}
	/**
	* Checks if the server is connected to a transport.
	* @returns `true` if the server is connected
	*/
	isConnected() {
		return this.server.transport !== void 0;
	}
	/**
	* Sends a logging message to the client, if connected.
	* Note: You only need to send the parameters object, not the entire JSON-RPC message.
	* @see {@linkcode LoggingMessageNotification}
	* @param params
	* @param sessionId Optional for stateless transports and backward compatibility.
	*
	* @example
	* ```ts source="./mcp.examples.ts#McpServer_sendLoggingMessage_basic"
	* await server.sendLoggingMessage({
	*     level: 'info',
	*     data: 'Processing complete'
	* });
	* ```
	*
	* @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577).
	* Remains functional during the deprecation window (at least twelve months).
	* Migrate to stderr logging (STDIO servers) or OpenTelemetry.
	*/
	async sendLoggingMessage(params, sessionId) {
		return this.server.sendLoggingMessage(params, sessionId);
	}
	/**
	* Sends a resource list changed event to the client, if connected.
	*/
	sendResourceListChanged() {
		this.isConnected() && this.server.sendResourceListChanged();
	}
	/**
	* Sends a tool list changed event to the client, if connected.
	*/
	sendToolListChanged() {
		this.isConnected() && this.server.sendToolListChanged();
	}
	/**
	* Sends a prompt list changed event to the client, if connected.
	*/
	sendPromptListChanged() {
		this.isConnected() && this.server.sendPromptListChanged();
	}
}, ResourceTemplate = class {
	_uriTemplate;
	constructor(uriTemplate, _callbacks) {
		this._callbacks = _callbacks, this._uriTemplate = typeof uriTemplate == "string" ? new UriTemplate(uriTemplate) : uriTemplate;
	}
	/**
	* Gets the URI template pattern.
	*/
	get uriTemplate() {
		return this._uriTemplate;
	}
	/**
	* Gets the list callback, if one was provided.
	*/
	get listCallback() {
		return this._callbacks.list;
	}
	/**
	* Gets the callback for completing a specific URI template variable, if one was provided.
	*/
	completeCallback(variable) {
		return this._callbacks.complete?.[variable];
	}
};
function createToolExecutor(inputSchema, handler) {
	if (inputSchema) {
		let callback$1 = handler;
		return async (args, ctx) => callback$1(args, ctx);
	}
	let callback = handler;
	return async (_args, ctx) => callback(ctx);
}
var EMPTY_OBJECT_JSON_SCHEMA = {
	type: "object",
	properties: {}
};
function convertListedInputSchema(name, inputSchema) {
	let json = standardSchemaToJsonSchema(inputSchema, "input"), scan = scanXMcpHeaderDeclarations(json);
	return scan.valid || console.warn(`[mcp-sdk] tool '${name}' carries an invalid x-mcp-header declaration and will be excluded by conforming Streamable HTTP clients: ${scan.reason}`), json;
}
function convertOutputSchemaJson(outputSchema) {
	if (outputSchema !== void 0)
		try {
			return standardSchemaToJsonSchema(outputSchema, "output");
		} catch {
			return;
		}
}
function createPromptHandler(name, argsSchema, callback) {
	if (argsSchema) {
		let typedCallback = callback;
		return async (args, ctx) => {
			let parseResult = await validateStandardSchema(argsSchema, args ?? {});
			if (!parseResult.success) throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Invalid arguments for prompt ${name}: ${parseResult.error}`);
			return typedCallback(parseResult.data, ctx);
		};
	} else {
		let typedCallback = callback;
		return async (_args, ctx) => typedCallback(ctx);
	}
}
function createCompletionResult(suggestions) {
	return { completion: {
		values: suggestions.map(String).slice(0, 100),
		total: suggestions.length,
		hasMore: suggestions.length > 100
	} };
}
var EMPTY_COMPLETION_RESULT = { completion: {
	values: [],
	hasMore: !1
} };
function getSchemaShape(schema) {
	let candidate = schema;
	if (candidate.shape && typeof candidate.shape == "object") return candidate.shape;
}
function isOptionalSchema(schema) {
	return schema?.type === "optional";
}
function unwrapOptionalSchema(schema) {
	return isOptionalSchema(schema) ? schema.def?.innerType ?? schema : schema;
}

export {
	process,
	completable,
	isCompletable,
	DEFAULT_SSE_KEEP_ALIVE_MS,
	armSseKeepAlive,
	PerRequestHTTPServerTransport,
	verifyBearerToken,
	bearerAuthChallengeResponse,
	requireBearerAuth,
	buildOAuthProtectedResourceMetadata,
	getOAuthProtectedResourceMetadataUrl,
	oauthMetadataResponse,
	requireScopes,
	findScopeChallenge,
	scopeChallengeResourceMetadataUrl,
	createScopeChallengeResponse,
	seedClientIdentityFromEnvelope,
	installModernOnlyHandlers,
	serverIdentityOf,
	Server,
	McpServer,
	ResourceTemplate
};
