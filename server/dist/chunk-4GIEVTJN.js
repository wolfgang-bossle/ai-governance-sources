import {
	McpServer,
	installModernOnlyHandlers,
	process,
	serverIdentityOf
} from "./chunk-HFIRSANS.js";
import {
	MODERN_WIRE_REVISION,
	ProtocolErrorCode,
	ReadBuffer,
	SUPPORTED_MODERN_PROTOCOL_VERSIONS,
	UnsupportedProtocolVersionError,
	carriesValidModernEnvelopeClaim,
	codecForVersion,
	envelopeClaimVersion,
	hasEnvelopeClaim,
	isJSONRPCErrorResponse,
	isJSONRPCNotification,
	isJSONRPCRequest,
	isJSONRPCResultResponse,
	modernOnlyStrictRejection,
	requestMetaOf,
	serializeMessage,
	setNegotiatedProtocolVersion,
	validateEnvelopeMeta
} from "./chunk-DXZU47XG.js";
import {
	SERVER_INFO_META_KEY,
	SUBSCRIPTION_ID_META_KEY
} from "./chunk-WYXYRM26.js";

// ../code/node_modules/@modelcontextprotocol/server/dist/listenRouter-Bartj63y.mjs
function listenFilterAccepts(filter, event) {
	switch (event.kind) {
		case "tools_list_changed":
			return filter.toolsListChanged === !0;
		case "prompts_list_changed":
			return filter.promptsListChanged === !0;
		case "resources_list_changed":
			return filter.resourcesListChanged === !0;
		case "resource_updated":
			return filter.resourceSubscriptions !== void 0 && filter.resourceSubscriptions.includes(event.uri);
	}
}
function honoredSubset(requested, capabilities) {
	let honored = {}, allow = (bit) => capabilities === void 0 || bit === !0;
	return requested.toolsListChanged === !0 && allow(capabilities?.tools?.listChanged) && (honored.toolsListChanged = !0), requested.promptsListChanged === !0 && allow(capabilities?.prompts?.listChanged) && (honored.promptsListChanged = !0), requested.resourcesListChanged === !0 && allow(capabilities?.resources?.listChanged) && (honored.resourcesListChanged = !0), requested.resourceSubscriptions !== void 0 && requested.resourceSubscriptions.length > 0 && allow(capabilities?.resources?.subscribe) && (honored.resourceSubscriptions = [...requested.resourceSubscriptions]), honored;
}
var DEFAULT_MAX_SUBSCRIPTIONS = 1024;
function stampSubscriptionId(notification, subscriptionId) {
	return {
		method: notification.method,
		params: {
			...notification.params,
			_meta: {
				...notification.params?._meta,
				[SUBSCRIPTION_ID_META_KEY]: subscriptionId
			}
		}
	};
}
function parseListenFilter(message) {
	let outcome = codecForVersion(MODERN_WIRE_REVISION).validateRequest("subscriptions/listen", message);
	return outcome.ok ? outcome.value.params?.notifications : void 0;
}
var CHANGE_NOTIFICATION_METHODS = /* @__PURE__ */ new Set([
	"notifications/tools/list_changed",
	"notifications/prompts/list_changed",
	"notifications/resources/list_changed",
	"notifications/resources/updated"
]), StdioListenRouter = class {
	/** Active subscriptions, keyed by the listen request's JSON-RPC id verbatim. */
	_subs = /* @__PURE__ */ new Map();
	/**
	* The serving instance's declared capabilities. Filled in by the entry
	* once the modern instance is constructed (the router is created before
	* the instance exists), so the acknowledged filter is narrowed against
	* what the server can actually deliver.
	*/
	_serverCapabilities;
	/**
	* The serving instance's identity, stamped onto the graceful-close
	* results' `_meta` (the spec's `SubscriptionsListenResultMetaObject` extends
	* `ResultMetaObject`). Handed over together with the capabilities.
	*/
	_serverInfo;
	constructor(_maxSubscriptions = DEFAULT_MAX_SUBSCRIPTIONS, serverCapabilities, serverInfo) {
		this._maxSubscriptions = _maxSubscriptions, this._serverCapabilities = serverCapabilities, this._serverInfo = serverInfo;
	}
	/**
	* Record the serving instance's declared capabilities and identity once
	* it has been constructed. Called by `serveStdio`'s connect path;
	* subsequent `serve()` calls narrow the honored filter against the
	* capabilities, and `teardownAll()` stamps the identity.
	*/
	setServerCapabilities(capabilities, serverInfo) {
		this._serverCapabilities = capabilities, serverInfo !== void 0 && (this._serverInfo = serverInfo);
	}
	/** Whether `id` is an active listen subscription on this connection. */
	has(id) {
		return this._subs.has(id);
	}
	/**
	* Serve one inbound `subscriptions/listen` request: registers the
	* subscription and returns the stamped acknowledged notification (or, on
	* capacity / params rejection, the in-band JSON-RPC error response).
	*
	* @throws when called before {@linkcode setServerCapabilities} (or the
	* constructor) has supplied the serving instance's capabilities. Honoring a
	* filter without knowing the server's advertised capabilities would fail
	* open (deliver unadvertised types); the entry guarantees capabilities are
	* set before any listen request is routed here.
	*/
	serve(message) {
		if (this._serverCapabilities === void 0) throw new Error("StdioListenRouter.serve() called before setServerCapabilities(); refusing to honor a filter without capabilities");
		if (this._subs.size >= this._maxSubscriptions) return {
			jsonrpc: "2.0",
			id: message.id,
			error: {
				code: -32603,
				message: "Subscription limit reached"
			}
		};
		let filter = parseListenFilter(message);
		if (filter === void 0) return {
			jsonrpc: "2.0",
			id: message.id,
			error: {
				code: -32602,
				message: "Invalid params: 'notifications' is required and must be a valid SubscriptionFilter"
			}
		};
		let honored = honoredSubset(filter, this._serverCapabilities);
		return this._subs.set(message.id, honored), stampSubscriptionId({
			method: "notifications/subscriptions/acknowledged",
			params: { notifications: honored }
		}, message.id);
	}
	/**
	* Tear down one subscription (inbound `notifications/cancelled`). Returns
	* `true` when a subscription was removed. After this call NOTHING further
	* is delivered for that subscription id (the post-cancel hardening).
	*/
	cancel(id) {
		return this._subs.delete(id);
	}
	/**
	* Route an outbound notification through the active subscriptions.
	*
	* - For a subscription-gated change notification, returns one stamped copy
	*   per subscription that opted in to it (an empty array means it is
	*   dropped — the modern era never delivers an un-requested change type).
	* - For any other outbound message, returns `'passthrough'` (the entry
	*   forwards it as-is).
	*/
	routeOutbound(message) {
		if (!CHANGE_NOTIFICATION_METHODS.has(message.method)) return "passthrough";
		let uriParam = message.params?.uri, uri = typeof uriParam == "string" ? uriParam : void 0, event = notificationToServerEvent(message.method, uri), out = [];
		for (let [subscriptionId, filter] of this._subs) listenFilterAccepts(filter, event) && out.push(stampSubscriptionId({
			method: message.method,
			params: message.params ?? {}
		}, subscriptionId));
		return out;
	}
	/**
	* Server-side graceful teardown of every active subscription: returns the
	* empty `subscriptions/listen` JSON-RPC result for each subscription id —
	* the spec's graceful-close signal, `_meta` carrying the subscription id
	* and the serving instance's identity — for the entry to emit before
	* closing the wire. Clears the set so nothing further is delivered.
	*/
	teardownAll() {
		let out = [];
		for (let id of this._subs.keys()) out.push({
			jsonrpc: "2.0",
			id,
			result: {
				resultType: "complete",
				_meta: {
					[SUBSCRIPTION_ID_META_KEY]: id,
					...this._serverInfo !== void 0 && { [SERVER_INFO_META_KEY]: this._serverInfo }
				}
			}
		});
		return this._subs.clear(), out;
	}
};
function notificationToServerEvent(method, uri) {
	switch (method) {
		case "notifications/tools/list_changed":
			return { kind: "tools_list_changed" };
		case "notifications/prompts/list_changed":
			return { kind: "prompts_list_changed" };
		case "notifications/resources/list_changed":
			return { kind: "resources_list_changed" };
		default:
			return {
				kind: "resource_updated",
				uri: uri ?? ""
			};
	}
}

// ../code/node_modules/@modelcontextprotocol/server/dist/stdio.mjs
var swallowsErrorsAfterClose = /* @__PURE__ */ Symbol("swallowsErrorsAfterClose"), StdioServerTransport = class {
	_readBuffer;
	_started = !1;
	_closed = !1;
	constructor(_stdin = process.stdin, _stdout = process.stdout, options) {
		this._stdin = _stdin, this._stdout = _stdout, this._readBuffer = new ReadBuffer({ maxBufferSize: options?.maxBufferSize });
	}
	onclose;
	onerror;
	onmessage;
	_ondata = (chunk) => {
		try {
			this._readBuffer.append(chunk), this.processReadBuffer();
		} catch (error) {
			this.onerror?.(error), this.close().catch(() => {
			});
		}
	};
	_onerror = (error) => {
		this.onerror?.(error);
	};
	_onstdouterror = (error) => {
		this._closed || (this.onerror?.(error), this.close().catch(() => {
		}));
	};
	_onstdinclose = () => {
		this.close().catch(() => {
		});
	};
	/**
	* Starts listening for messages on `stdin`.
	*/
	async start() {
		if (this._started) throw new Error("StdioServerTransport already started! If using Server class, note that connect() calls start() automatically.");
		this._started = !0;
		for (let listener of this._stdout.listeners("error")) listener[swallowsErrorsAfterClose] && this._stdout.off("error", listener);
		(this._stdin.readableEnded || this._stdin.destroyed) && setImmediate(this._onstdinclose), this._stdin.on("data", this._ondata), this._stdin.on("error", this._onerror), this._stdin.on("end", this._onstdinclose), this._stdin.on("close", this._onstdinclose), this._stdout.on("error", this._onstdouterror);
	}
	processReadBuffer() {
		for (; ; ) try {
			let message = this._readBuffer.readMessage();
			if (message === null) break;
			this.onmessage?.(message);
		} catch (error) {
			this.onerror?.(error);
		}
	}
	async close() {
		this._closed || (this._closed = !0, this._stdin.off("data", this._ondata), this._stdin.off("error", this._onerror), this._stdin.off("end", this._onstdinclose), this._stdin.off("close", this._onstdinclose), this._onstdouterror[swallowsErrorsAfterClose] = !0, this._stdin.listenerCount("data") === 0 && this._stdin.pause(), this._readBuffer.clear(), this.onclose?.());
	}
	send(message) {
		return this._closed ? Promise.reject(/* @__PURE__ */ new Error("StdioServerTransport is closed")) : new Promise((resolve, reject) => {
			let json = serializeMessage(message), settled = !1, onError = (error) => {
				settled || (settled = !0, this._stdout.off("error", onError), this._stdout.off("drain", onDrain), reject(error));
			}, onDrain = () => {
				settled || (settled = !0, this._stdout.off("error", onError), this._stdout.off("drain", onDrain), resolve());
			};
			if (this._stdout.once("error", onError), this._stdout.write(json)) {
				if (settled) return;
				settled = !0, this._stdout.off("error", onError), resolve();
			} else settled || this._stdout.once("drain", onDrain);
		});
	}
}, DISCARD_ANSWER_TIMEOUT_MS = 3e3, StdioConnectionChannel = class {
	onclose;
	onerror;
	onmessage;
	_closed = !1;
	/** Request ids the entry delivered to the instance that the instance has not yet answered. */
	_pendingRequests = /* @__PURE__ */ new Set();
	_drainWaiters = [];
	constructor(_wire, _onInstanceClose, _outboundIntercept) {
		this._wire = _wire, this._onInstanceClose = _onInstanceClose, this._outboundIntercept = _outboundIntercept;
	}
	async start() {
	}
	async send(message, options) {
		if (isJSONRPCResultResponse(message) || isJSONRPCErrorResponse(message)) {
			let { id } = message;
			id !== void 0 && this._settle(id);
		}
		if (!this._closed && this._outboundIntercept?.(message) !== "handled")
			return this._wire.send(message, options);
	}
	setProtocolVersion = (version) => {
		this._wire.setProtocolVersion?.(version);
	};
	/** Forwards one inbound message to the connected instance. */
	deliver(message, extra) {
		if (!this._closed) {
			if (isJSONRPCRequest(message)) this._pendingRequests.add(message.id);
			else if (isJSONRPCNotification(message) && message.method === "notifications/cancelled") {
				let cancelledId = message.params?.requestId;
				cancelledId !== void 0 && this._settle(cancelledId);
			}
			this.onmessage?.(message, extra);
		}
	}
	/**
	* Resolves once every request delivered to the instance has been answered
	* through {@linkcode send}, settled by a delivered cancellation, or the
	* channel has been closed and nothing further can be answered. The wait is
	* bounded by `timeoutMs` as a backstop so no edge can hold the caller
	* indefinitely; resolves `false` only when the bound elapsed with requests
	* still unanswered. Used by the probe-discard path so a probe request the
	* entry accepted is never silently dropped.
	*/
	async whenRequestsAnswered(timeoutMs) {
		return this._closed || this._pendingRequests.size === 0 ? !0 : await new Promise((resolve) => {
			let waiter = () => {
				clearTimeout(timer), resolve(!0);
			}, timer = setTimeout(() => {
				this._drainWaiters = this._drainWaiters.filter((pending) => pending !== waiter), resolve(!1);
			}, timeoutMs);
			this._drainWaiters.push(waiter);
		});
	}
	async close() {
		if (!this._closed) {
			this._closed = !0, this._pendingRequests.clear(), this._releaseDrainWaiters();
			try {
				this._onInstanceClose();
			} finally {
				this.onclose?.();
			}
		}
	}
	_settle(id) {
		this._pendingRequests.delete(id), this._pendingRequests.size === 0 && this._releaseDrainWaiters();
	}
	_releaseDrainWaiters() {
		let waiters = this._drainWaiters;
		this._drainWaiters = [];
		for (let waiter of waiters) waiter();
	}
};
function classifyOpeningMessage(message) {
	let params = message.params;
	if (message.method === "initialize" && !carriesValidModernEnvelopeClaim(params)) {
		let requestedVersion = params !== null && typeof params == "object" && typeof params.protocolVersion == "string" ? params.protocolVersion : void 0;
		return {
			kind: "legacy",
			reason: "initialize",
			...requestedVersion !== void 0 && { requestedVersion }
		};
	}
	if (!hasEnvelopeClaim(params)) return {
		kind: "legacy",
		reason: "no-claim"
	};
	let meta = requestMetaOf(params), firstIssue = (meta === void 0 ? [] : validateEnvelopeMeta(meta))[0];
	if (firstIssue !== void 0) return {
		kind: "invalid-envelope",
		issue: firstIssue
	};
	let claimedVersion = envelopeClaimVersion(params);
	return claimedVersion === void 0 || !SUPPORTED_MODERN_PROTOCOL_VERSIONS.includes(claimedVersion) ? {
		kind: "unsupported-revision",
		requested: claimedVersion ?? "unknown"
	} : {
		kind: "modern",
		revision: claimedVersion,
		classification: {
			era: "modern",
			revision: claimedVersion
		}
	};
}
function serveStdio(factory, options = {}) {
	let legacyMode = options.legacy ?? "serve", wire = options.transport ?? new StdioServerTransport(), state = { phase: "opening" }, discarding, closing = !1, isTornDown = () => closing || state.phase === "closed", reportError = (error) => {
		try {
			options.onerror?.(error);
		} catch {
		}
	}, writeErrorResponse = (id, code, message, data) => wire.send({
		jsonrpc: "2.0",
		id,
		error: {
			code,
			message,
			...data !== void 0 && { data }
		}
	}).catch((error) => reportError(toError(error))), listenRouter = new StdioListenRouter(options.maxSubscriptions ?? DEFAULT_MAX_SUBSCRIPTIONS), modernOutboundIntercept = (message) => {
		if (!isJSONRPCNotification(message)) return;
		let routed = listenRouter.routeOutbound(message);
		if (routed !== "passthrough") {
			for (let stamped of routed) wire.send({
				jsonrpc: "2.0",
				...stamped
			}).catch((error) => reportError(toError(error)));
			return "handled";
		}
	}, tryServeListen = async (message) => {
		if (isJSONRPCRequest(message) && message.method === "subscriptions/listen") {
			let meta = requestMetaOf(message.params), issue = hasEnvelopeClaim(message.params) ? (meta === void 0 ? [] : validateEnvelopeMeta(meta))[0] : {
				key: "_meta",
				problem: "the per-request envelope is required on protocol revision 2026-07-28"
			}, claimedVersion = envelopeClaimVersion(message.params), reply;
			if (issue !== void 0) reply = {
				jsonrpc: "2.0",
				id: message.id,
				error: {
					code: -32602,
					message: `Invalid _meta envelope: ${issue.key}: ${issue.problem}`
				}
			};
			else if (claimedVersion === void 0 || !SUPPORTED_MODERN_PROTOCOL_VERSIONS.includes(claimedVersion)) {
				let error = new UnsupportedProtocolVersionError({
					supported: [...SUPPORTED_MODERN_PROTOCOL_VERSIONS],
					requested: claimedVersion ?? "unknown"
				});
				reply = {
					jsonrpc: "2.0",
					id: message.id,
					error: {
						code: error.code,
						message: error.message,
						data: error.data
					}
				};
			} else reply = listenRouter.serve(message);
			return await wire.send("error" in reply ? reply : {
				jsonrpc: "2.0",
				method: reply.method,
				params: reply.params
			}).catch((error) => reportError(toError(error))), !0;
		}
		if (isJSONRPCNotification(message) && message.method === "notifications/cancelled") {
			let cancelledId = message.params?.requestId;
			if (cancelledId !== void 0 && listenRouter.cancel(cancelledId)) return !0;
		}
		return !1;
	}, answerLegacyRejection = (request, reason, requestedVersion) => {
		let rejection = modernOnlyStrictRejection({
			kind: "legacy",
			reason,
			...requestedVersion !== void 0 && { requestedVersion }
		}, SUPPORTED_MODERN_PROTOCOL_VERSIONS);
		return rejection === void 0 ? Promise.resolve() : (reportError(/* @__PURE__ */ new Error(`Rejected 2025-era request on a modern-only stdio connection (${rejection.cell}): ${rejection.message}`)), writeErrorResponse(request.id, rejection.code, rejection.message, rejection.data));
	}, onInstanceClosed = (channel) => {
		closing || channel === discarding || closeAll();
	}, connectInstance = async (era, revision) => {
		let product = await factory({ era }), server = product instanceof McpServer ? product.server : product;
		era === "modern" && (setNegotiatedProtocolVersion(server, revision), installModernOnlyHandlers(server, SUPPORTED_MODERN_PROTOCOL_VERSIONS), listenRouter.setServerCapabilities(server.getCapabilities(), serverIdentityOf(server)));
		let channel = new StdioConnectionChannel(wire, () => onInstanceClosed(channel), era === "modern" ? modernOutboundIntercept : void 0);
		return await product.connect(channel), {
			product,
			channel
		};
	}, disposeLateInstance = (instance) => instance.product.close().catch((error) => reportError(toError(error))), discardProbeInstance = async (instance) => {
		discarding = instance.channel;
		try {
			await instance.channel.whenRequestsAnswered(DISCARD_ANSWER_TIMEOUT_MS) || reportError(/* @__PURE__ */ new Error(`Discarded the probe instance with requests still unanswered after ${DISCARD_ANSWER_TIMEOUT_MS}ms; continuing with the fallback`)), await instance.product.close();
		} catch (error) {
			reportError(toError(error));
		} finally {
			discarding = void 0;
		}
	}, processMessage = async (message) => {
		if (state.phase === "closed") return;
		if (state.phase === "pinned") {
			if (state.era === "modern" && isJSONRPCRequest(message) && message.method === "initialize" && !carriesValidModernEnvelopeClaim(message.params)) {
				await answerLegacyRejection(message, "initialize", message.params !== null && typeof message.params == "object" && typeof message.params.protocolVersion == "string" ? message.params.protocolVersion : void 0);
				return;
			}
			if (state.era === "modern" && await tryServeListen(message) || isTornDown()) return;
			state.instance.channel.deliver(message);
			return;
		}
		if (!isJSONRPCRequest(message) && !isJSONRPCNotification(message)) {
			reportError(/* @__PURE__ */ new Error("Discarded a JSON-RPC response received before the connection negotiated an era"));
			return;
		}
		let opening = classifyOpeningMessage(message);
		switch (opening.kind) {
			case "invalid-envelope": {
				let detail = `Invalid _meta envelope for protocol revision 2026-07-28: ${opening.issue.key}: ${opening.issue.problem}`;
				isJSONRPCRequest(message) ? await writeErrorResponse(message.id, ProtocolErrorCode.InvalidParams, detail, { envelope: opening.issue }) : reportError(/* @__PURE__ */ new Error(`Discarded a notification with a malformed envelope: ${detail}`));
				return;
			}
			case "unsupported-revision":
				if (isJSONRPCRequest(message)) {
					let error = new UnsupportedProtocolVersionError({
						supported: [...SUPPORTED_MODERN_PROTOCOL_VERSIONS],
						requested: opening.requested
					});
					reportError(error), await writeErrorResponse(message.id, error.code, error.message, error.data);
				} else reportError(/* @__PURE__ */ new Error(`Discarded a notification claiming unsupported protocol revision ${opening.requested}`));
				return;
			case "modern":
				if (isJSONRPCRequest(message) && message.method === "server/discover") {
					if (state.phase === "probe") {
						state.instance.channel.deliver(message, { classification: opening.classification });
						return;
					}
					let instance = await connectInstance("modern", opening.revision);
					if (isTornDown()) {
						await disposeLateInstance(instance);
						return;
					}
					state = {
						phase: "probe",
						instance
					}, instance.channel.deliver(message, { classification: opening.classification });
					return;
				}
				if (state.phase === "probe") {
					if (isJSONRPCNotification(message)) {
						state.instance.channel.deliver(message, { classification: opening.classification });
						return;
					}
					state = {
						phase: "pinned",
						era: "modern",
						instance: state.instance
					};
				} else {
					let instance = await connectInstance("modern", opening.revision);
					if (isTornDown()) {
						await disposeLateInstance(instance);
						return;
					}
					state = {
						phase: "pinned",
						era: "modern",
						instance
					};
				}
				if (await tryServeListen(message) || isTornDown()) return;
				state.instance.channel.deliver(message, { classification: opening.classification });
				return;
			case "legacy": {
				if (legacyMode === "reject") {
					isJSONRPCRequest(message) && await answerLegacyRejection(message, opening.reason, opening.requestedVersion);
					return;
				}
				if (state.phase === "probe") {
					if (await discardProbeInstance(state.instance), isTornDown()) return;
					state = { phase: "opening" };
				}
				let instance = await connectInstance("legacy");
				if (isTornDown()) {
					await disposeLateInstance(instance);
					return;
				}
				state = {
					phase: "pinned",
					era: "legacy",
					instance
				}, state.instance.channel.deliver(message);
				return;
			}
		}
	}, queue = [], pumping = !1, pump = async () => {
		if (!pumping) {
			pumping = !0;
			try {
				for (; queue.length > 0; ) {
					let message = queue.shift();
					try {
						await processMessage(message);
					} catch (error) {
						isJSONRPCRequest(message) && await writeErrorResponse(message.id, ProtocolErrorCode.InternalError, "Internal server error"), reportError(toError(error));
					}
				}
			} finally {
				pumping = !1;
			}
		}
	}, closeAll = async () => {
		if (closing || state.phase === "closed") return;
		closing = !0;
		let current = state;
		state = { phase: "closed" };
		for (let result of listenRouter.teardownAll()) await wire.send(result).catch((error) => reportError(toError(error)));
		(current.phase === "probe" || current.phase === "pinned") && await current.instance.product.close().catch((error) => reportError(toError(error))), await wire.close().catch((error) => reportError(toError(error)));
	};
	wire.onmessage = (message) => {
		queue.push(message), pump();
	}, wire.onerror = (error) => {
		reportError(error), (state.phase === "probe" || state.phase === "pinned") && state.instance.channel.onerror?.(error);
	}, wire.onclose = () => {
		if (closing || state.phase === "closed") return;
		closing = !0;
		let current = state;
		state = { phase: "closed" }, (current.phase === "probe" || current.phase === "pinned") && current.instance.product.close().catch((error) => reportError(toError(error)));
	};
	let started = wire.start().catch((error) => {
		throw reportError(toError(error)), error;
	});
	return started.catch(() => {
	}), { close: async () => {
		await started.catch(() => {
		}), await closeAll();
	} };
}
function toError(value) {
	return value instanceof Error ? value : new Error(String(value));
}

export {
	StdioServerTransport,
	serveStdio
};
