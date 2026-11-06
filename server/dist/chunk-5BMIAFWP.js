import {
	__commonJSMin,
	__toESM,
	declaredDialect
} from "./chunk-VADXITWQ.js";

// ../code/node_modules/@modelcontextprotocol/server/dist/ajvProvider-DyjnscPj.mjs
var require_code$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.regexpCode = exports.getEsmExportName = exports.getProperty = exports.safeStringify = exports.stringify = exports.strConcat = exports.addCodeArg = exports.str = exports._ = exports.nil = exports._Code = exports.Name = exports.IDENTIFIER = exports._CodeOrName = void 0;
	var _CodeOrName = class {
	};
	exports._CodeOrName = _CodeOrName, exports.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
	var Name = class extends _CodeOrName {
		constructor(s) {
			if (super(), !exports.IDENTIFIER.test(s)) throw new Error("CodeGen: name must be a valid identifier");
			this.str = s;
		}
		toString() {
			return this.str;
		}
		emptyStr() {
			return !1;
		}
		get names() {
			return { [this.str]: 1 };
		}
	};
	exports.Name = Name;
	var _Code = class extends _CodeOrName {
		constructor(code) {
			super(), this._items = typeof code == "string" ? [code] : code;
		}
		toString() {
			return this.str;
		}
		emptyStr() {
			if (this._items.length > 1) return !1;
			let item = this._items[0];
			return item === "" || item === '""';
		}
		get str() {
			var _a;
			return (_a = this._str) !== null && _a !== void 0 ? _a : this._str = this._items.reduce((s, c) => `${s}${c}`, "");
		}
		get names() {
			var _a;
			return (_a = this._names) !== null && _a !== void 0 ? _a : this._names = this._items.reduce((names, c) => (c instanceof Name && (names[c.str] = (names[c.str] || 0) + 1), names), {});
		}
	};
	exports._Code = _Code, exports.nil = new _Code("");
	function _(strs, ...args) {
		let code = [strs[0]], i = 0;
		for (; i < args.length; )
			addCodeArg(code, args[i]), code.push(strs[++i]);
		return new _Code(code);
	}
	exports._ = _;
	let plus = new _Code("+");
	function str(strs, ...args) {
		let expr = [safeStringify(strs[0])], i = 0;
		for (; i < args.length; )
			expr.push(plus), addCodeArg(expr, args[i]), expr.push(plus, safeStringify(strs[++i]));
		return optimize(expr), new _Code(expr);
	}
	exports.str = str;
	function addCodeArg(code, arg) {
		arg instanceof _Code ? code.push(...arg._items) : arg instanceof Name ? code.push(arg) : code.push(interpolate(arg));
	}
	exports.addCodeArg = addCodeArg;
	function optimize(expr) {
		let i = 1;
		for (; i < expr.length - 1; ) {
			if (expr[i] === plus) {
				let res = mergeExprItems(expr[i - 1], expr[i + 1]);
				if (res !== void 0) {
					expr.splice(i - 1, 3, res);
					continue;
				}
				expr[i++] = "+";
			}
			i++;
		}
	}
	function mergeExprItems(a, b) {
		if (b === '""') return a;
		if (a === '""') return b;
		if (typeof a == "string")
			return b instanceof Name || a[a.length - 1] !== '"' ? void 0 : typeof b != "string" ? `${a.slice(0, -1)}${b}"` : b[0] === '"' ? a.slice(0, -1) + b.slice(1) : void 0;
		if (typeof b == "string" && b[0] === '"' && !(a instanceof Name)) return `"${a}${b.slice(1)}`;
	}
	function strConcat(c1, c2) {
		return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str`${c1}${c2}`;
	}
	exports.strConcat = strConcat;
	function interpolate(x) {
		return typeof x == "number" || typeof x == "boolean" || x === null ? x : safeStringify(Array.isArray(x) ? x.join(",") : x);
	}
	function stringify(x) {
		return new _Code(safeStringify(x));
	}
	exports.stringify = stringify;
	function safeStringify(x) {
		return JSON.stringify(x).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
	}
	exports.safeStringify = safeStringify;
	function getProperty(key) {
		return typeof key == "string" && exports.IDENTIFIER.test(key) ? new _Code(`.${key}`) : _`[${key}]`;
	}
	exports.getProperty = getProperty;
	function getEsmExportName(key) {
		if (typeof key == "string" && exports.IDENTIFIER.test(key)) return new _Code(`${key}`);
		throw new Error(`CodeGen: invalid export name: ${key}, use explicit $id name mapping`);
	}
	exports.getEsmExportName = getEsmExportName;
	function regexpCode(rx) {
		return new _Code(rx.toString());
	}
	exports.regexpCode = regexpCode;
})), require_scope = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.ValueScope = exports.ValueScopeName = exports.Scope = exports.varKinds = exports.UsedValueState = void 0;
	let code_1 = require_code$1();
	var ValueError = class extends Error {
		constructor(name) {
			super(`CodeGen: "code" for ${name} not defined`), this.value = name.value;
		}
	}, UsedValueState;
	(function(UsedValueState2) {
		UsedValueState2[UsedValueState2.Started = 0] = "Started", UsedValueState2[UsedValueState2.Completed = 1] = "Completed";
	})(UsedValueState || (exports.UsedValueState = UsedValueState = {})), exports.varKinds = {
		const: new code_1.Name("const"),
		let: new code_1.Name("let"),
		var: new code_1.Name("var")
	};
	var Scope = class {
		constructor({ prefixes, parent } = {}) {
			this._names = {}, this._prefixes = prefixes, this._parent = parent;
		}
		toName(nameOrPrefix) {
			return nameOrPrefix instanceof code_1.Name ? nameOrPrefix : this.name(nameOrPrefix);
		}
		name(prefix) {
			return new code_1.Name(this._newName(prefix));
		}
		_newName(prefix) {
			let ng = this._names[prefix] || this._nameGroup(prefix);
			return `${prefix}${ng.index++}`;
		}
		_nameGroup(prefix) {
			var _a, _b;
			if (!((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a._prefixes) === null || _b === void 0) && _b.has(prefix) || this._prefixes && !this._prefixes.has(prefix)) throw new Error(`CodeGen: prefix "${prefix}" is not allowed in this scope`);
			return this._names[prefix] = {
				prefix,
				index: 0
			};
		}
	};
	exports.Scope = Scope;
	var ValueScopeName = class extends code_1.Name {
		constructor(prefix, nameStr) {
			super(nameStr), this.prefix = prefix;
		}
		setValue(value, { property, itemIndex }) {
			this.value = value, this.scopePath = (0, code_1._)`.${new code_1.Name(property)}[${itemIndex}]`;
		}
	};
	exports.ValueScopeName = ValueScopeName;
	let line = (0, code_1._)`\n`;
	var ValueScope = class extends Scope {
		constructor(opts) {
			super(opts), this._values = {}, this._scope = opts.scope, this.opts = {
				...opts,
				_n: opts.lines ? line : code_1.nil
			};
		}
		get() {
			return this._scope;
		}
		name(prefix) {
			return new ValueScopeName(prefix, this._newName(prefix));
		}
		value(nameOrPrefix, value) {
			var _a;
			if (value.ref === void 0) throw new Error("CodeGen: ref must be passed in value");
			let name = this.toName(nameOrPrefix), { prefix } = name, valueKey = (_a = value.key) !== null && _a !== void 0 ? _a : value.ref, vs = this._values[prefix];
			if (vs) {
				let _name = vs.get(valueKey);
				if (_name) return _name;
			} else vs = this._values[prefix] = /* @__PURE__ */ new Map();
			vs.set(valueKey, name);
			let s = this._scope[prefix] || (this._scope[prefix] = []), itemIndex = s.length;
			return s[itemIndex] = value.ref, name.setValue(value, {
				property: prefix,
				itemIndex
			}), name;
		}
		getValue(prefix, keyOrRef) {
			let vs = this._values[prefix];
			if (vs)
				return vs.get(keyOrRef);
		}
		scopeRefs(scopeName, values = this._values) {
			return this._reduceValues(values, (name) => {
				if (name.scopePath === void 0) throw new Error(`CodeGen: name "${name}" has no value`);
				return (0, code_1._)`${scopeName}${name.scopePath}`;
			});
		}
		scopeCode(values = this._values, usedValues, getCode) {
			return this._reduceValues(values, (name) => {
				if (name.value === void 0) throw new Error(`CodeGen: name "${name}" has no value`);
				return name.value.code;
			}, usedValues, getCode);
		}
		_reduceValues(values, valueCode, usedValues = {}, getCode) {
			let code = code_1.nil;
			for (let prefix in values) {
				let vs = values[prefix];
				if (!vs) continue;
				let nameSet = usedValues[prefix] = usedValues[prefix] || /* @__PURE__ */ new Map();
				vs.forEach((name) => {
					if (nameSet.has(name)) return;
					nameSet.set(name, UsedValueState.Started);
					let c = valueCode(name);
					if (c) {
						let def = this.opts.es5 ? exports.varKinds.var : exports.varKinds.const;
						code = (0, code_1._)`${code}${def} ${name} = ${c};${this.opts._n}`;
					} else if (c = getCode?.(name)) code = (0, code_1._)`${code}${c}${this.opts._n}`;
					else throw new ValueError(name);
					nameSet.set(name, UsedValueState.Completed);
				});
			}
			return code;
		}
	};
	exports.ValueScope = ValueScope;
})), require_codegen = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.or = exports.and = exports.not = exports.CodeGen = exports.operators = exports.varKinds = exports.ValueScopeName = exports.ValueScope = exports.Scope = exports.Name = exports.regexpCode = exports.stringify = exports.getProperty = exports.nil = exports.strConcat = exports.str = exports._ = void 0;
	let code_1 = require_code$1(), scope_1 = require_scope();
	var code_2 = require_code$1();
	Object.defineProperty(exports, "_", {
		enumerable: !0,
		get: function() {
			return code_2._;
		}
	}), Object.defineProperty(exports, "str", {
		enumerable: !0,
		get: function() {
			return code_2.str;
		}
	}), Object.defineProperty(exports, "strConcat", {
		enumerable: !0,
		get: function() {
			return code_2.strConcat;
		}
	}), Object.defineProperty(exports, "nil", {
		enumerable: !0,
		get: function() {
			return code_2.nil;
		}
	}), Object.defineProperty(exports, "getProperty", {
		enumerable: !0,
		get: function() {
			return code_2.getProperty;
		}
	}), Object.defineProperty(exports, "stringify", {
		enumerable: !0,
		get: function() {
			return code_2.stringify;
		}
	}), Object.defineProperty(exports, "regexpCode", {
		enumerable: !0,
		get: function() {
			return code_2.regexpCode;
		}
	}), Object.defineProperty(exports, "Name", {
		enumerable: !0,
		get: function() {
			return code_2.Name;
		}
	});
	var scope_2 = require_scope();
	Object.defineProperty(exports, "Scope", {
		enumerable: !0,
		get: function() {
			return scope_2.Scope;
		}
	}), Object.defineProperty(exports, "ValueScope", {
		enumerable: !0,
		get: function() {
			return scope_2.ValueScope;
		}
	}), Object.defineProperty(exports, "ValueScopeName", {
		enumerable: !0,
		get: function() {
			return scope_2.ValueScopeName;
		}
	}), Object.defineProperty(exports, "varKinds", {
		enumerable: !0,
		get: function() {
			return scope_2.varKinds;
		}
	}), exports.operators = {
		GT: new code_1._Code(">"),
		GTE: new code_1._Code(">="),
		LT: new code_1._Code("<"),
		LTE: new code_1._Code("<="),
		EQ: new code_1._Code("==="),
		NEQ: new code_1._Code("!=="),
		NOT: new code_1._Code("!"),
		OR: new code_1._Code("||"),
		AND: new code_1._Code("&&"),
		ADD: new code_1._Code("+")
	};
	var Node = class {
		optimizeNodes() {
			return this;
		}
		optimizeNames(_names, _constants) {
			return this;
		}
	}, Def = class extends Node {
		constructor(varKind, name, rhs) {
			super(), this.varKind = varKind, this.name = name, this.rhs = rhs;
		}
		render({ es5, _n }) {
			let varKind = es5 ? scope_1.varKinds.var : this.varKind, rhs = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
			return `${varKind} ${this.name}${rhs};` + _n;
		}
		optimizeNames(names, constants) {
			if (names[this.name.str])
				return this.rhs && (this.rhs = optimizeExpr(this.rhs, names, constants)), this;
		}
		get names() {
			return this.rhs instanceof code_1._CodeOrName ? this.rhs.names : {};
		}
	}, Assign = class extends Node {
		constructor(lhs, rhs, sideEffects) {
			super(), this.lhs = lhs, this.rhs = rhs, this.sideEffects = sideEffects;
		}
		render({ _n }) {
			return `${this.lhs} = ${this.rhs};` + _n;
		}
		optimizeNames(names, constants) {
			if (!(this.lhs instanceof code_1.Name && !names[this.lhs.str] && !this.sideEffects))
				return this.rhs = optimizeExpr(this.rhs, names, constants), this;
		}
		get names() {
			return addExprNames(this.lhs instanceof code_1.Name ? {} : { ...this.lhs.names }, this.rhs);
		}
	}, AssignOp = class extends Assign {
		constructor(lhs, op, rhs, sideEffects) {
			super(lhs, rhs, sideEffects), this.op = op;
		}
		render({ _n }) {
			return `${this.lhs} ${this.op}= ${this.rhs};` + _n;
		}
	}, Label = class extends Node {
		constructor(label) {
			super(), this.label = label, this.names = {};
		}
		render({ _n }) {
			return `${this.label}:` + _n;
		}
	}, Break = class extends Node {
		constructor(label) {
			super(), this.label = label, this.names = {};
		}
		render({ _n }) {
			return `break${this.label ? ` ${this.label}` : ""};` + _n;
		}
	}, Throw = class extends Node {
		constructor(error) {
			super(), this.error = error;
		}
		render({ _n }) {
			return `throw ${this.error};` + _n;
		}
		get names() {
			return this.error.names;
		}
	}, AnyCode = class extends Node {
		constructor(code) {
			super(), this.code = code;
		}
		render({ _n }) {
			return `${this.code};` + _n;
		}
		optimizeNodes() {
			return `${this.code}` ? this : void 0;
		}
		optimizeNames(names, constants) {
			return this.code = optimizeExpr(this.code, names, constants), this;
		}
		get names() {
			return this.code instanceof code_1._CodeOrName ? this.code.names : {};
		}
	}, ParentNode = class extends Node {
		constructor(nodes = []) {
			super(), this.nodes = nodes;
		}
		render(opts) {
			return this.nodes.reduce((code, n) => code + n.render(opts), "");
		}
		optimizeNodes() {
			let { nodes } = this, i = nodes.length;
			for (; i--; ) {
				let n = nodes[i].optimizeNodes();
				Array.isArray(n) ? nodes.splice(i, 1, ...n) : n ? nodes[i] = n : nodes.splice(i, 1);
			}
			return nodes.length > 0 ? this : void 0;
		}
		optimizeNames(names, constants) {
			let { nodes } = this, i = nodes.length;
			for (; i--; ) {
				let n = nodes[i];
				n.optimizeNames(names, constants) || (subtractNames(names, n.names), nodes.splice(i, 1));
			}
			return nodes.length > 0 ? this : void 0;
		}
		get names() {
			return this.nodes.reduce((names, n) => addNames(names, n.names), {});
		}
	}, BlockNode = class extends ParentNode {
		render(opts) {
			return "{" + opts._n + super.render(opts) + "}" + opts._n;
		}
	}, Root = class extends ParentNode {
	}, Else = class extends BlockNode {
	};
	Else.kind = "else";
	var If = class If2 extends BlockNode {
		constructor(condition, nodes) {
			super(nodes), this.condition = condition;
		}
		render(opts) {
			let code = `if(${this.condition})` + super.render(opts);
			return this.else && (code += "else " + this.else.render(opts)), code;
		}
		optimizeNodes() {
			super.optimizeNodes();
			let cond = this.condition;
			if (cond === !0) return this.nodes;
			let e = this.else;
			if (e) {
				let ns = e.optimizeNodes();
				e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
			}
			if (e)
				return cond === !1 ? e instanceof If2 ? e : e.nodes : this.nodes.length ? this : new If2(not(cond), e instanceof If2 ? [e] : e.nodes);
			if (!(cond === !1 || !this.nodes.length))
				return this;
		}
		optimizeNames(names, constants) {
			var _a;
			if (this.else = (_a = this.else) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants), !!(super.optimizeNames(names, constants) || this.else))
				return this.condition = optimizeExpr(this.condition, names, constants), this;
		}
		get names() {
			let names = super.names;
			return addExprNames(names, this.condition), this.else && addNames(names, this.else.names), names;
		}
	};
	If.kind = "if";
	var For = class extends BlockNode {
	};
	For.kind = "for";
	var ForLoop = class extends For {
		constructor(iteration) {
			super(), this.iteration = iteration;
		}
		render(opts) {
			return `for(${this.iteration})` + super.render(opts);
		}
		optimizeNames(names, constants) {
			if (super.optimizeNames(names, constants))
				return this.iteration = optimizeExpr(this.iteration, names, constants), this;
		}
		get names() {
			return addNames(super.names, this.iteration.names);
		}
	}, ForRange = class extends For {
		constructor(varKind, name, from, to) {
			super(), this.varKind = varKind, this.name = name, this.from = from, this.to = to;
		}
		render(opts) {
			let varKind = opts.es5 ? scope_1.varKinds.var : this.varKind, { name, from, to } = this;
			return `for(${varKind} ${name}=${from}; ${name}<${to}; ${name}++)` + super.render(opts);
		}
		get names() {
			return addExprNames(addExprNames(super.names, this.from), this.to);
		}
	}, ForIter = class extends For {
		constructor(loop, varKind, name, iterable) {
			super(), this.loop = loop, this.varKind = varKind, this.name = name, this.iterable = iterable;
		}
		render(opts) {
			return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts);
		}
		optimizeNames(names, constants) {
			if (super.optimizeNames(names, constants))
				return this.iterable = optimizeExpr(this.iterable, names, constants), this;
		}
		get names() {
			return addNames(super.names, this.iterable.names);
		}
	}, Func = class extends BlockNode {
		constructor(name, args, async) {
			super(), this.name = name, this.args = args, this.async = async;
		}
		render(opts) {
			return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(opts);
		}
	};
	Func.kind = "func";
	var Return = class extends ParentNode {
		render(opts) {
			return "return " + super.render(opts);
		}
	};
	Return.kind = "return";
	var Try = class extends BlockNode {
		render(opts) {
			let code = "try" + super.render(opts);
			return this.catch && (code += this.catch.render(opts)), this.finally && (code += this.finally.render(opts)), code;
		}
		optimizeNodes() {
			var _a, _b;
			return super.optimizeNodes(), (_a = this.catch) === null || _a === void 0 || _a.optimizeNodes(), (_b = this.finally) === null || _b === void 0 || _b.optimizeNodes(), this;
		}
		optimizeNames(names, constants) {
			var _a, _b;
			return super.optimizeNames(names, constants), (_a = this.catch) === null || _a === void 0 || _a.optimizeNames(names, constants), (_b = this.finally) === null || _b === void 0 || _b.optimizeNames(names, constants), this;
		}
		get names() {
			let names = super.names;
			return this.catch && addNames(names, this.catch.names), this.finally && addNames(names, this.finally.names), names;
		}
	}, Catch = class extends BlockNode {
		constructor(error) {
			super(), this.error = error;
		}
		render(opts) {
			return `catch(${this.error})` + super.render(opts);
		}
	};
	Catch.kind = "catch";
	var Finally = class extends BlockNode {
		render(opts) {
			return "finally" + super.render(opts);
		}
	};
	Finally.kind = "finally";
	var CodeGen = class {
		constructor(extScope, opts = {}) {
			this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = {
				...opts,
				_n: opts.lines ? `
` : ""
			}, this._extScope = extScope, this._scope = new scope_1.Scope({ parent: extScope }), this._nodes = [new Root()];
		}
		toString() {
			return this._root.render(this.opts);
		}
		name(prefix) {
			return this._scope.name(prefix);
		}
		scopeName(prefix) {
			return this._extScope.name(prefix);
		}
		scopeValue(prefixOrName, value) {
			let name = this._extScope.value(prefixOrName, value);
			return (this._values[name.prefix] || (this._values[name.prefix] = /* @__PURE__ */ new Set())).add(name), name;
		}
		getScopeValue(prefix, keyOrRef) {
			return this._extScope.getValue(prefix, keyOrRef);
		}
		scopeRefs(scopeName) {
			return this._extScope.scopeRefs(scopeName, this._values);
		}
		scopeCode() {
			return this._extScope.scopeCode(this._values);
		}
		_def(varKind, nameOrPrefix, rhs, constant) {
			let name = this._scope.toName(nameOrPrefix);
			return rhs !== void 0 && constant && (this._constants[name.str] = rhs), this._leafNode(new Def(varKind, name, rhs)), name;
		}
		const(nameOrPrefix, rhs, _constant) {
			return this._def(scope_1.varKinds.const, nameOrPrefix, rhs, _constant);
		}
		let(nameOrPrefix, rhs, _constant) {
			return this._def(scope_1.varKinds.let, nameOrPrefix, rhs, _constant);
		}
		var(nameOrPrefix, rhs, _constant) {
			return this._def(scope_1.varKinds.var, nameOrPrefix, rhs, _constant);
		}
		assign(lhs, rhs, sideEffects) {
			return this._leafNode(new Assign(lhs, rhs, sideEffects));
		}
		add(lhs, rhs) {
			return this._leafNode(new AssignOp(lhs, exports.operators.ADD, rhs));
		}
		code(c) {
			return typeof c == "function" ? c() : c !== code_1.nil && this._leafNode(new AnyCode(c)), this;
		}
		object(...keyValues) {
			let code = ["{"];
			for (let [key, value] of keyValues)
				code.length > 1 && code.push(","), code.push(key), (key !== value || this.opts.es5) && (code.push(":"), (0, code_1.addCodeArg)(code, value));
			return code.push("}"), new code_1._Code(code);
		}
		if(condition, thenBody, elseBody) {
			if (this._blockNode(new If(condition)), thenBody && elseBody) this.code(thenBody).else().code(elseBody).endIf();
			else if (thenBody) this.code(thenBody).endIf();
			else if (elseBody) throw new Error('CodeGen: "else" body without "then" body');
			return this;
		}
		elseIf(condition) {
			return this._elseNode(new If(condition));
		}
		else() {
			return this._elseNode(new Else());
		}
		endIf() {
			return this._endBlockNode(If, Else);
		}
		_for(node, forBody) {
			return this._blockNode(node), forBody && this.code(forBody).endFor(), this;
		}
		for(iteration, forBody) {
			return this._for(new ForLoop(iteration), forBody);
		}
		forRange(nameOrPrefix, from, to, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.let) {
			let name = this._scope.toName(nameOrPrefix);
			return this._for(new ForRange(varKind, name, from, to), () => forBody(name));
		}
		forOf(nameOrPrefix, iterable, forBody, varKind = scope_1.varKinds.const) {
			let name = this._scope.toName(nameOrPrefix);
			if (this.opts.es5) {
				let arr = iterable instanceof code_1.Name ? iterable : this.var("_arr", iterable);
				return this.forRange("_i", 0, (0, code_1._)`${arr}.length`, (i) => {
					this.var(name, (0, code_1._)`${arr}[${i}]`), forBody(name);
				});
			}
			return this._for(new ForIter("of", varKind, name, iterable), () => forBody(name));
		}
		forIn(nameOrPrefix, obj, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.const) {
			if (this.opts.ownProperties) return this.forOf(nameOrPrefix, (0, code_1._)`Object.keys(${obj})`, forBody);
			let name = this._scope.toName(nameOrPrefix);
			return this._for(new ForIter("in", varKind, name, obj), () => forBody(name));
		}
		endFor() {
			return this._endBlockNode(For);
		}
		label(label) {
			return this._leafNode(new Label(label));
		}
		break(label) {
			return this._leafNode(new Break(label));
		}
		return(value) {
			let node = new Return();
			if (this._blockNode(node), this.code(value), node.nodes.length !== 1) throw new Error('CodeGen: "return" should have one node');
			return this._endBlockNode(Return);
		}
		try(tryBody, catchCode, finallyCode) {
			if (!catchCode && !finallyCode) throw new Error('CodeGen: "try" without "catch" and "finally"');
			let node = new Try();
			if (this._blockNode(node), this.code(tryBody), catchCode) {
				let error = this.name("e");
				this._currNode = node.catch = new Catch(error), catchCode(error);
			}
			return finallyCode && (this._currNode = node.finally = new Finally(), this.code(finallyCode)), this._endBlockNode(Catch, Finally);
		}
		throw(error) {
			return this._leafNode(new Throw(error));
		}
		block(body, nodeCount) {
			return this._blockStarts.push(this._nodes.length), body && this.code(body).endBlock(nodeCount), this;
		}
		endBlock(nodeCount) {
			let len = this._blockStarts.pop();
			if (len === void 0) throw new Error("CodeGen: not in self-balancing block");
			let toClose = this._nodes.length - len;
			if (toClose < 0 || nodeCount !== void 0 && toClose !== nodeCount) throw new Error(`CodeGen: wrong number of nodes: ${toClose} vs ${nodeCount} expected`);
			return this._nodes.length = len, this;
		}
		func(name, args = code_1.nil, async, funcBody) {
			return this._blockNode(new Func(name, args, async)), funcBody && this.code(funcBody).endFunc(), this;
		}
		endFunc() {
			return this._endBlockNode(Func);
		}
		optimize(n = 1) {
			for (; n-- > 0; )
				this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
		}
		_leafNode(node) {
			return this._currNode.nodes.push(node), this;
		}
		_blockNode(node) {
			this._currNode.nodes.push(node), this._nodes.push(node);
		}
		_endBlockNode(N1, N2) {
			let n = this._currNode;
			if (n instanceof N1 || N2 && n instanceof N2)
				return this._nodes.pop(), this;
			throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`);
		}
		_elseNode(node) {
			let n = this._currNode;
			if (!(n instanceof If)) throw new Error('CodeGen: "else" without "if"');
			return this._currNode = n.else = node, this;
		}
		get _root() {
			return this._nodes[0];
		}
		get _currNode() {
			let ns = this._nodes;
			return ns[ns.length - 1];
		}
		set _currNode(node) {
			let ns = this._nodes;
			ns[ns.length - 1] = node;
		}
	};
	exports.CodeGen = CodeGen;
	function addNames(names, from) {
		for (let n in from) names[n] = (names[n] || 0) + (from[n] || 0);
		return names;
	}
	function addExprNames(names, from) {
		return from instanceof code_1._CodeOrName ? addNames(names, from.names) : names;
	}
	function optimizeExpr(expr, names, constants) {
		if (expr instanceof code_1.Name) return replaceName(expr);
		if (!canOptimize(expr)) return expr;
		return new code_1._Code(expr._items.reduce((items, c) => (c instanceof code_1.Name && (c = replaceName(c)), c instanceof code_1._Code ? items.push(...c._items) : items.push(c), items), []));
		function replaceName(n) {
			let c = constants[n.str];
			return c === void 0 || names[n.str] !== 1 ? n : (delete names[n.str], c);
		}
		function canOptimize(e) {
			return e instanceof code_1._Code && e._items.some((c) => c instanceof code_1.Name && names[c.str] === 1 && constants[c.str] !== void 0);
		}
	}
	function subtractNames(names, from) {
		for (let n in from) names[n] = (names[n] || 0) - (from[n] || 0);
	}
	function not(x) {
		return typeof x == "boolean" || typeof x == "number" || x === null ? !x : (0, code_1._)`!${par(x)}`;
	}
	exports.not = not;
	let andCode = mappend(exports.operators.AND);
	function and(...args) {
		return args.reduce(andCode);
	}
	exports.and = and;
	let orCode = mappend(exports.operators.OR);
	function or(...args) {
		return args.reduce(orCode);
	}
	exports.or = or;
	function mappend(op) {
		return (x, y) => x === code_1.nil ? y : y === code_1.nil ? x : (0, code_1._)`${par(x)} ${op} ${par(y)}`;
	}
	function par(x) {
		return x instanceof code_1.Name ? x : (0, code_1._)`(${x})`;
	}
})), require_util = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.checkStrictMode = exports.getErrorPath = exports.Type = exports.useFunc = exports.setEvaluated = exports.evaluatedPropsToName = exports.mergeEvaluated = exports.eachItem = exports.unescapeJsonPointer = exports.escapeJsonPointer = exports.escapeFragment = exports.unescapeFragment = exports.schemaRefOrVal = exports.schemaHasRulesButRef = exports.schemaHasRules = exports.checkUnknownRules = exports.alwaysValidSchema = exports.toHash = void 0;
	let codegen_1 = require_codegen(), code_1 = require_code$1();
	function toHash(arr) {
		let hash = {};
		for (let item of arr) hash[item] = !0;
		return hash;
	}
	exports.toHash = toHash;
	function alwaysValidSchema(it, schema) {
		return typeof schema == "boolean" ? schema : Object.keys(schema).length === 0 ? !0 : (checkUnknownRules(it, schema), !schemaHasRules(schema, it.self.RULES.all));
	}
	exports.alwaysValidSchema = alwaysValidSchema;
	function checkUnknownRules(it, schema = it.schema) {
		let { opts, self } = it;
		if (!opts.strictSchema || typeof schema == "boolean") return;
		let rules = self.RULES.keywords;
		for (let key in schema) rules[key] || checkStrictMode(it, `unknown keyword: "${key}"`);
	}
	exports.checkUnknownRules = checkUnknownRules;
	function schemaHasRules(schema, rules) {
		if (typeof schema == "boolean") return !schema;
		for (let key in schema) if (rules[key]) return !0;
		return !1;
	}
	exports.schemaHasRules = schemaHasRules;
	function schemaHasRulesButRef(schema, RULES) {
		if (typeof schema == "boolean") return !schema;
		for (let key in schema) if (key !== "$ref" && RULES.all[key]) return !0;
		return !1;
	}
	exports.schemaHasRulesButRef = schemaHasRulesButRef;
	function schemaRefOrVal({ topSchemaRef, schemaPath }, schema, keyword, $data) {
		if (!$data) {
			if (typeof schema == "number" || typeof schema == "boolean") return schema;
			if (typeof schema == "string") return (0, codegen_1._)`${schema}`;
		}
		return (0, codegen_1._)`${topSchemaRef}${schemaPath}${(0, codegen_1.getProperty)(keyword)}`;
	}
	exports.schemaRefOrVal = schemaRefOrVal;
	function unescapeFragment(str) {
		return unescapeJsonPointer(decodeURIComponent(str));
	}
	exports.unescapeFragment = unescapeFragment;
	function escapeFragment(str) {
		return encodeURIComponent(escapeJsonPointer(str));
	}
	exports.escapeFragment = escapeFragment;
	function escapeJsonPointer(str) {
		return typeof str == "number" ? `${str}` : str.replace(/~/g, "~0").replace(/\//g, "~1");
	}
	exports.escapeJsonPointer = escapeJsonPointer;
	function unescapeJsonPointer(str) {
		return str.replace(/~1/g, "/").replace(/~0/g, "~");
	}
	exports.unescapeJsonPointer = unescapeJsonPointer;
	function eachItem(xs, f) {
		if (Array.isArray(xs)) for (let x of xs) f(x);
		else f(xs);
	}
	exports.eachItem = eachItem;
	function makeMergeEvaluated({ mergeNames, mergeToName, mergeValues, resultToName }) {
		return (gen, from, to, toName) => {
			let res = to === void 0 ? from : to instanceof codegen_1.Name ? (from instanceof codegen_1.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to) : from instanceof codegen_1.Name ? (mergeToName(gen, to, from), from) : mergeValues(from, to);
			return toName === codegen_1.Name && !(res instanceof codegen_1.Name) ? resultToName(gen, res) : res;
		};
	}
	exports.mergeEvaluated = {
		props: makeMergeEvaluated({
			mergeNames: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true && ${from} !== undefined`, () => {
				gen.if((0, codegen_1._)`${from} === true`, () => gen.assign(to, !0), () => gen.assign(to, (0, codegen_1._)`${to} || {}`).code((0, codegen_1._)`Object.assign(${to}, ${from})`));
			}),
			mergeToName: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true`, () => {
				from === !0 ? gen.assign(to, !0) : (gen.assign(to, (0, codegen_1._)`${to} || {}`), setEvaluated(gen, to, from));
			}),
			mergeValues: (from, to) => from === !0 ? !0 : {
				...from,
				...to
			},
			resultToName: evaluatedPropsToName
		}),
		items: makeMergeEvaluated({
			mergeNames: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true && ${from} !== undefined`, () => gen.assign(to, (0, codegen_1._)`${from} === true ? true : ${to} > ${from} ? ${to} : ${from}`)),
			mergeToName: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true`, () => gen.assign(to, from === !0 ? !0 : (0, codegen_1._)`${to} > ${from} ? ${to} : ${from}`)),
			mergeValues: (from, to) => from === !0 ? !0 : Math.max(from, to),
			resultToName: (gen, items) => gen.var("items", items)
		})
	};
	function evaluatedPropsToName(gen, ps) {
		if (ps === !0) return gen.var("props", !0);
		let props = gen.var("props", (0, codegen_1._)`{}`);
		return ps !== void 0 && setEvaluated(gen, props, ps), props;
	}
	exports.evaluatedPropsToName = evaluatedPropsToName;
	function setEvaluated(gen, props, ps) {
		Object.keys(ps).forEach((p) => gen.assign((0, codegen_1._)`${props}${(0, codegen_1.getProperty)(p)}`, !0));
	}
	exports.setEvaluated = setEvaluated;
	let snippets = {};
	function useFunc(gen, f) {
		return gen.scopeValue("func", {
			ref: f,
			code: snippets[f.code] || (snippets[f.code] = new code_1._Code(f.code))
		});
	}
	exports.useFunc = useFunc;
	var Type;
	(function(Type2) {
		Type2[Type2.Num = 0] = "Num", Type2[Type2.Str = 1] = "Str";
	})(Type || (exports.Type = Type = {}));
	function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
		if (dataProp instanceof codegen_1.Name) {
			let isNumber = dataPropType === Type.Num;
			return jsPropertySyntax ? isNumber ? (0, codegen_1._)`"[" + ${dataProp} + "]"` : (0, codegen_1._)`"['" + ${dataProp} + "']"` : isNumber ? (0, codegen_1._)`"/" + ${dataProp}` : (0, codegen_1._)`"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
		}
		return jsPropertySyntax ? (0, codegen_1.getProperty)(dataProp).toString() : "/" + escapeJsonPointer(dataProp);
	}
	exports.getErrorPath = getErrorPath;
	function checkStrictMode(it, msg, mode = it.opts.strictSchema) {
		if (mode) {
			if (msg = `strict mode: ${msg}`, mode === !0) throw new Error(msg);
			it.self.logger.warn(msg);
		}
	}
	exports.checkStrictMode = checkStrictMode;
})), require_names = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let codegen_1 = require_codegen(), names = {
		data: new codegen_1.Name("data"),
		valCxt: new codegen_1.Name("valCxt"),
		instancePath: new codegen_1.Name("instancePath"),
		parentData: new codegen_1.Name("parentData"),
		parentDataProperty: new codegen_1.Name("parentDataProperty"),
		rootData: new codegen_1.Name("rootData"),
		dynamicAnchors: new codegen_1.Name("dynamicAnchors"),
		vErrors: new codegen_1.Name("vErrors"),
		errors: new codegen_1.Name("errors"),
		this: new codegen_1.Name("this"),
		self: new codegen_1.Name("self"),
		scope: new codegen_1.Name("scope"),
		json: new codegen_1.Name("json"),
		jsonPos: new codegen_1.Name("jsonPos"),
		jsonLen: new codegen_1.Name("jsonLen"),
		jsonPart: new codegen_1.Name("jsonPart")
	};
	exports.default = names;
})), require_errors = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.extendErrors = exports.resetErrorsCount = exports.reportExtraError = exports.reportError = exports.keyword$DataError = exports.keywordError = void 0;
	let codegen_1 = require_codegen(), util_1 = require_util(), names_1 = require_names();
	exports.keywordError = { message: ({ keyword }) => (0, codegen_1.str)`must pass "${keyword}" keyword validation` }, exports.keyword$DataError = { message: ({ keyword, schemaType }) => schemaType ? (0, codegen_1.str)`"${keyword}" keyword must be ${schemaType} ($data)` : (0, codegen_1.str)`"${keyword}" keyword is invalid ($data)` };
	function reportError(cxt, error = exports.keywordError, errorPaths, overrideAllErrors) {
		let { it } = cxt, { gen, compositeRule, allErrors } = it, errObj = errorObjectCode(cxt, error, errorPaths);
		overrideAllErrors ?? (compositeRule || allErrors) ? addError(gen, errObj) : returnErrors(it, (0, codegen_1._)`[${errObj}]`);
	}
	exports.reportError = reportError;
	function reportExtraError(cxt, error = exports.keywordError, errorPaths) {
		let { it } = cxt, { gen, compositeRule, allErrors } = it;
		addError(gen, errorObjectCode(cxt, error, errorPaths)), compositeRule || allErrors || returnErrors(it, names_1.default.vErrors);
	}
	exports.reportExtraError = reportExtraError;
	function resetErrorsCount(gen, errsCount) {
		gen.assign(names_1.default.errors, errsCount), gen.if((0, codegen_1._)`${names_1.default.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign((0, codegen_1._)`${names_1.default.vErrors}.length`, errsCount), () => gen.assign(names_1.default.vErrors, null)));
	}
	exports.resetErrorsCount = resetErrorsCount;
	function extendErrors({ gen, keyword, schemaValue, data, errsCount, it }) {
		if (errsCount === void 0) throw new Error("ajv implementation error");
		let err = gen.name("err");
		gen.forRange("i", errsCount, names_1.default.errors, (i) => {
			gen.const(err, (0, codegen_1._)`${names_1.default.vErrors}[${i}]`), gen.if((0, codegen_1._)`${err}.instancePath === undefined`, () => gen.assign((0, codegen_1._)`${err}.instancePath`, (0, codegen_1.strConcat)(names_1.default.instancePath, it.errorPath))), gen.assign((0, codegen_1._)`${err}.schemaPath`, (0, codegen_1.str)`${it.errSchemaPath}/${keyword}`), it.opts.verbose && (gen.assign((0, codegen_1._)`${err}.schema`, schemaValue), gen.assign((0, codegen_1._)`${err}.data`, data));
		});
	}
	exports.extendErrors = extendErrors;
	function addError(gen, errObj) {
		let err = gen.const("err", errObj);
		gen.if((0, codegen_1._)`${names_1.default.vErrors} === null`, () => gen.assign(names_1.default.vErrors, (0, codegen_1._)`[${err}]`), (0, codegen_1._)`${names_1.default.vErrors}.push(${err})`), gen.code((0, codegen_1._)`${names_1.default.errors}++`);
	}
	function returnErrors(it, errs) {
		let { gen, validateName, schemaEnv } = it;
		schemaEnv.$async ? gen.throw((0, codegen_1._)`new ${it.ValidationError}(${errs})`) : (gen.assign((0, codegen_1._)`${validateName}.errors`, errs), gen.return(!1));
	}
	let E = {
		keyword: new codegen_1.Name("keyword"),
		schemaPath: new codegen_1.Name("schemaPath"),
		params: new codegen_1.Name("params"),
		propertyName: new codegen_1.Name("propertyName"),
		message: new codegen_1.Name("message"),
		schema: new codegen_1.Name("schema"),
		parentSchema: new codegen_1.Name("parentSchema")
	};
	function errorObjectCode(cxt, error, errorPaths) {
		let { createErrors } = cxt.it;
		return createErrors === !1 ? (0, codegen_1._)`{}` : errorObject(cxt, error, errorPaths);
	}
	function errorObject(cxt, error, errorPaths = {}) {
		let { gen, it } = cxt, keyValues = [errorInstancePath(it, errorPaths), errorSchemaPath(cxt, errorPaths)];
		return extraErrorProps(cxt, error, keyValues), gen.object(...keyValues);
	}
	function errorInstancePath({ errorPath }, { instancePath }) {
		let instPath = instancePath ? (0, codegen_1.str)`${errorPath}${(0, util_1.getErrorPath)(instancePath, util_1.Type.Str)}` : errorPath;
		return [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, instPath)];
	}
	function errorSchemaPath({ keyword, it: { errSchemaPath } }, { schemaPath, parentSchema }) {
		let schPath = parentSchema ? errSchemaPath : (0, codegen_1.str)`${errSchemaPath}/${keyword}`;
		return schemaPath && (schPath = (0, codegen_1.str)`${schPath}${(0, util_1.getErrorPath)(schemaPath, util_1.Type.Str)}`), [E.schemaPath, schPath];
	}
	function extraErrorProps(cxt, { params, message }, keyValues) {
		let { keyword, data, schemaValue, it } = cxt, { opts, propertyName, topSchemaRef, schemaPath } = it;
		keyValues.push([E.keyword, keyword], [E.params, typeof params == "function" ? params(cxt) : params || (0, codegen_1._)`{}`]), opts.messages && keyValues.push([E.message, typeof message == "function" ? message(cxt) : message]), opts.verbose && keyValues.push([E.schema, schemaValue], [E.parentSchema, (0, codegen_1._)`${topSchemaRef}${schemaPath}`], [names_1.default.data, data]), propertyName && keyValues.push([E.propertyName, propertyName]);
	}
})), require_boolSchema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.boolOrEmptySchema = exports.topBoolOrEmptySchema = void 0;
	let errors_1 = require_errors(), codegen_1 = require_codegen(), names_1 = require_names(), boolError = { message: "boolean schema is false" };
	function topBoolOrEmptySchema(it) {
		let { gen, schema, validateName } = it;
		schema === !1 ? falseSchemaError(it, !1) : typeof schema == "object" && schema.$async === !0 ? gen.return(names_1.default.data) : (gen.assign((0, codegen_1._)`${validateName}.errors`, null), gen.return(!0));
	}
	exports.topBoolOrEmptySchema = topBoolOrEmptySchema;
	function boolOrEmptySchema(it, valid) {
		let { gen, schema } = it;
		schema === !1 ? (gen.var(valid, !1), falseSchemaError(it)) : gen.var(valid, !0);
	}
	exports.boolOrEmptySchema = boolOrEmptySchema;
	function falseSchemaError(it, overrideAllErrors) {
		let { gen, data } = it, cxt = {
			gen,
			keyword: "false schema",
			data,
			schema: !1,
			schemaCode: !1,
			schemaValue: !1,
			params: {},
			it
		};
		(0, errors_1.reportError)(cxt, boolError, void 0, overrideAllErrors);
	}
})), require_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.getRules = exports.isJSONType = void 0;
	let jsonTypes = /* @__PURE__ */ new Set([
		"string",
		"number",
		"integer",
		"boolean",
		"null",
		"object",
		"array"
	]);
	function isJSONType(x) {
		return typeof x == "string" && jsonTypes.has(x);
	}
	exports.isJSONType = isJSONType;
	function getRules() {
		let groups = {
			number: {
				type: "number",
				rules: []
			},
			string: {
				type: "string",
				rules: []
			},
			array: {
				type: "array",
				rules: []
			},
			object: {
				type: "object",
				rules: []
			}
		};
		return {
			types: {
				...groups,
				integer: !0,
				boolean: !0,
				null: !0
			},
			rules: [
				{ rules: [] },
				groups.number,
				groups.string,
				groups.array,
				groups.object
			],
			post: { rules: [] },
			all: {},
			keywords: {}
		};
	}
	exports.getRules = getRules;
})), require_applicability = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.shouldUseRule = exports.shouldUseGroup = exports.schemaHasRulesForType = void 0;
	function schemaHasRulesForType({ schema, self }, type) {
		let group = self.RULES.types[type];
		return group && group !== !0 && shouldUseGroup(schema, group);
	}
	exports.schemaHasRulesForType = schemaHasRulesForType;
	function shouldUseGroup(schema, group) {
		return group.rules.some((rule) => shouldUseRule(schema, rule));
	}
	exports.shouldUseGroup = shouldUseGroup;
	function shouldUseRule(schema, rule) {
		var _a;
		return schema[rule.keyword] !== void 0 || ((_a = rule.definition.implements) === null || _a === void 0 ? void 0 : _a.some((kwd) => schema[kwd] !== void 0));
	}
	exports.shouldUseRule = shouldUseRule;
})), require_dataType = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.reportTypeError = exports.checkDataTypes = exports.checkDataType = exports.coerceAndCheckDataType = exports.getJSONTypes = exports.getSchemaTypes = exports.DataType = void 0;
	let rules_1 = require_rules(), applicability_1 = require_applicability(), errors_1 = require_errors(), codegen_1 = require_codegen(), util_1 = require_util();
	var DataType;
	(function(DataType2) {
		DataType2[DataType2.Correct = 0] = "Correct", DataType2[DataType2.Wrong = 1] = "Wrong";
	})(DataType || (exports.DataType = DataType = {}));
	function getSchemaTypes(schema) {
		let types = getJSONTypes(schema.type);
		if (types.includes("null")) {
			if (schema.nullable === !1) throw new Error("type: null contradicts nullable: false");
		} else {
			if (!types.length && schema.nullable !== void 0) throw new Error('"nullable" cannot be used without "type"');
			schema.nullable === !0 && types.push("null");
		}
		return types;
	}
	exports.getSchemaTypes = getSchemaTypes;
	function getJSONTypes(ts) {
		let types = Array.isArray(ts) ? ts : ts ? [ts] : [];
		if (types.every(rules_1.isJSONType)) return types;
		throw new Error("type must be JSONType or JSONType[]: " + types.join(","));
	}
	exports.getJSONTypes = getJSONTypes;
	function coerceAndCheckDataType(it, types) {
		let { gen, data, opts } = it, coerceTo = coerceToTypes(types, opts.coerceTypes), checkTypes = types.length > 0 && !(coerceTo.length === 0 && types.length === 1 && (0, applicability_1.schemaHasRulesForType)(it, types[0]));
		if (checkTypes) {
			let wrongType = checkDataTypes(types, data, opts.strictNumbers, DataType.Wrong);
			gen.if(wrongType, () => {
				coerceTo.length ? coerceData(it, types, coerceTo) : reportTypeError(it);
			});
		}
		return checkTypes;
	}
	exports.coerceAndCheckDataType = coerceAndCheckDataType;
	let COERCIBLE = /* @__PURE__ */ new Set([
		"string",
		"number",
		"integer",
		"boolean",
		"null"
	]);
	function coerceToTypes(types, coerceTypes) {
		return coerceTypes ? types.filter((t) => COERCIBLE.has(t) || coerceTypes === "array" && t === "array") : [];
	}
	function coerceData(it, types, coerceTo) {
		let { gen, data, opts } = it, dataType = gen.let("dataType", (0, codegen_1._)`typeof ${data}`), coerced = gen.let("coerced", (0, codegen_1._)`undefined`);
		opts.coerceTypes === "array" && gen.if((0, codegen_1._)`${dataType} == 'object' && Array.isArray(${data}) && ${data}.length == 1`, () => gen.assign(data, (0, codegen_1._)`${data}[0]`).assign(dataType, (0, codegen_1._)`typeof ${data}`).if(checkDataTypes(types, data, opts.strictNumbers), () => gen.assign(coerced, data))), gen.if((0, codegen_1._)`${coerced} !== undefined`);
		for (let t of coerceTo) (COERCIBLE.has(t) || t === "array" && opts.coerceTypes === "array") && coerceSpecificType(t);
		gen.else(), reportTypeError(it), gen.endIf(), gen.if((0, codegen_1._)`${coerced} !== undefined`, () => {
			gen.assign(data, coerced), assignParentData(it, coerced);
		});
		function coerceSpecificType(t) {
			switch (t) {
				case "string":
					gen.elseIf((0, codegen_1._)`${dataType} == "number" || ${dataType} == "boolean"`).assign(coerced, (0, codegen_1._)`"" + ${data}`).elseIf((0, codegen_1._)`${data} === null`).assign(coerced, (0, codegen_1._)`""`);
					return;
				case "number":
					gen.elseIf((0, codegen_1._)`${dataType} == "boolean" || ${data} === null
              || (${dataType} == "string" && ${data} && ${data} == +${data})`).assign(coerced, (0, codegen_1._)`+${data}`);
					return;
				case "integer":
					gen.elseIf((0, codegen_1._)`${dataType} === "boolean" || ${data} === null
              || (${dataType} === "string" && ${data} && ${data} == +${data} && !(${data} % 1))`).assign(coerced, (0, codegen_1._)`+${data}`);
					return;
				case "boolean":
					gen.elseIf((0, codegen_1._)`${data} === "false" || ${data} === 0 || ${data} === null`).assign(coerced, !1).elseIf((0, codegen_1._)`${data} === "true" || ${data} === 1`).assign(coerced, !0);
					return;
				case "null":
					gen.elseIf((0, codegen_1._)`${data} === "" || ${data} === 0 || ${data} === false`), gen.assign(coerced, null);
					return;
				case "array":
					gen.elseIf((0, codegen_1._)`${dataType} === "string" || ${dataType} === "number"
              || ${dataType} === "boolean" || ${data} === null`).assign(coerced, (0, codegen_1._)`[${data}]`);
			}
		}
	}
	function assignParentData({ gen, parentData, parentDataProperty }, expr) {
		gen.if((0, codegen_1._)`${parentData} !== undefined`, () => gen.assign((0, codegen_1._)`${parentData}[${parentDataProperty}]`, expr));
	}
	function checkDataType(dataType, data, strictNums, correct = DataType.Correct) {
		let EQ = correct === DataType.Correct ? codegen_1.operators.EQ : codegen_1.operators.NEQ, cond;
		switch (dataType) {
			case "null":
				return (0, codegen_1._)`${data} ${EQ} null`;
			case "array":
				cond = (0, codegen_1._)`Array.isArray(${data})`;
				break;
			case "object":
				cond = (0, codegen_1._)`${data} && typeof ${data} == "object" && !Array.isArray(${data})`;
				break;
			case "integer":
				cond = numCond((0, codegen_1._)`!(${data} % 1) && !isNaN(${data})`);
				break;
			case "number":
				cond = numCond();
				break;
			default:
				return (0, codegen_1._)`typeof ${data} ${EQ} ${dataType}`;
		}
		return correct === DataType.Correct ? cond : (0, codegen_1.not)(cond);
		function numCond(_cond = codegen_1.nil) {
			return (0, codegen_1.and)((0, codegen_1._)`typeof ${data} == "number"`, _cond, strictNums ? (0, codegen_1._)`isFinite(${data})` : codegen_1.nil);
		}
	}
	exports.checkDataType = checkDataType;
	function checkDataTypes(dataTypes, data, strictNums, correct) {
		if (dataTypes.length === 1) return checkDataType(dataTypes[0], data, strictNums, correct);
		let cond, types = (0, util_1.toHash)(dataTypes);
		if (types.array && types.object) {
			let notObj = (0, codegen_1._)`typeof ${data} != "object"`;
			cond = types.null ? notObj : (0, codegen_1._)`!${data} || ${notObj}`, delete types.null, delete types.array, delete types.object;
		} else cond = codegen_1.nil;
		types.number && delete types.integer;
		for (let t in types) cond = (0, codegen_1.and)(cond, checkDataType(t, data, strictNums, correct));
		return cond;
	}
	exports.checkDataTypes = checkDataTypes;
	let typeError = {
		message: ({ schema }) => `must be ${schema}`,
		params: ({ schema, schemaValue }) => typeof schema == "string" ? (0, codegen_1._)`{type: ${schema}}` : (0, codegen_1._)`{type: ${schemaValue}}`
	};
	function reportTypeError(it) {
		let cxt = getTypeErrorContext(it);
		(0, errors_1.reportError)(cxt, typeError);
	}
	exports.reportTypeError = reportTypeError;
	function getTypeErrorContext(it) {
		let { gen, data, schema } = it, schemaCode = (0, util_1.schemaRefOrVal)(it, schema, "type");
		return {
			gen,
			keyword: "type",
			data,
			schema: schema.type,
			schemaCode,
			schemaValue: schemaCode,
			parentSchema: schema,
			params: {},
			it
		};
	}
})), require_defaults = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.assignDefaults = void 0;
	let codegen_1 = require_codegen(), util_1 = require_util();
	function assignDefaults(it, ty) {
		let { properties, items } = it.schema;
		if (ty === "object" && properties) for (let key in properties) assignDefault(it, key, properties[key].default);
		else ty === "array" && Array.isArray(items) && items.forEach((sch, i) => assignDefault(it, i, sch.default));
	}
	exports.assignDefaults = assignDefaults;
	function assignDefault(it, prop, defaultValue) {
		let { gen, compositeRule, data, opts } = it;
		if (defaultValue === void 0) return;
		let childData = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(prop)}`;
		if (compositeRule) {
			(0, util_1.checkStrictMode)(it, `default is ignored for: ${childData}`);
			return;
		}
		let condition = (0, codegen_1._)`${childData} === undefined`;
		opts.useDefaults === "empty" && (condition = (0, codegen_1._)`${condition} || ${childData} === null || ${childData} === ""`), gen.if(condition, (0, codegen_1._)`${childData} = ${(0, codegen_1.stringify)(defaultValue)}`);
	}
})), require_code = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.validateUnion = exports.validateArray = exports.usePattern = exports.callValidateCode = exports.schemaProperties = exports.allSchemaProperties = exports.noPropertyInData = exports.propertyInData = exports.isOwnProperty = exports.hasPropFunc = exports.reportMissingProp = exports.checkMissingProp = exports.checkReportMissingProp = void 0;
	let codegen_1 = require_codegen(), util_1 = require_util(), names_1 = require_names(), util_2 = require_util();
	function checkReportMissingProp(cxt, prop) {
		let { gen, data, it } = cxt;
		gen.if(noPropertyInData(gen, data, prop, it.opts.ownProperties), () => {
			cxt.setParams({ missingProperty: (0, codegen_1._)`${prop}` }, !0), cxt.error();
		});
	}
	exports.checkReportMissingProp = checkReportMissingProp;
	function checkMissingProp({ gen, data, it: { opts } }, properties, missing) {
		return (0, codegen_1.or)(...properties.map((prop) => (0, codegen_1.and)(noPropertyInData(gen, data, prop, opts.ownProperties), (0, codegen_1._)`${missing} = ${prop}`)));
	}
	exports.checkMissingProp = checkMissingProp;
	function reportMissingProp(cxt, missing) {
		cxt.setParams({ missingProperty: missing }, !0), cxt.error();
	}
	exports.reportMissingProp = reportMissingProp;
	function hasPropFunc(gen) {
		return gen.scopeValue("func", {
			ref: Object.prototype.hasOwnProperty,
			code: (0, codegen_1._)`Object.prototype.hasOwnProperty`
		});
	}
	exports.hasPropFunc = hasPropFunc;
	function isOwnProperty(gen, data, property) {
		return (0, codegen_1._)`${hasPropFunc(gen)}.call(${data}, ${property})`;
	}
	exports.isOwnProperty = isOwnProperty;
	function propertyInData(gen, data, property, ownProperties) {
		let cond = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(property)} !== undefined`;
		return ownProperties ? (0, codegen_1._)`${cond} && ${isOwnProperty(gen, data, property)}` : cond;
	}
	exports.propertyInData = propertyInData;
	function noPropertyInData(gen, data, property, ownProperties) {
		let cond = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(property)} === undefined`;
		return ownProperties ? (0, codegen_1.or)(cond, (0, codegen_1.not)(isOwnProperty(gen, data, property))) : cond;
	}
	exports.noPropertyInData = noPropertyInData;
	function allSchemaProperties(schemaMap) {
		return schemaMap ? Object.keys(schemaMap).filter((p) => p !== "__proto__") : [];
	}
	exports.allSchemaProperties = allSchemaProperties;
	function schemaProperties(it, schemaMap) {
		return allSchemaProperties(schemaMap).filter((p) => !(0, util_1.alwaysValidSchema)(it, schemaMap[p]));
	}
	exports.schemaProperties = schemaProperties;
	function callValidateCode({ schemaCode, data, it: { gen, topSchemaRef, schemaPath, errorPath }, it }, func, context, passSchema) {
		let dataAndSchema = passSchema ? (0, codegen_1._)`${schemaCode}, ${data}, ${topSchemaRef}${schemaPath}` : data, valCxt = [
			[names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, errorPath)],
			[names_1.default.parentData, it.parentData],
			[names_1.default.parentDataProperty, it.parentDataProperty],
			[names_1.default.rootData, names_1.default.rootData]
		];
		it.opts.dynamicRef && valCxt.push([names_1.default.dynamicAnchors, names_1.default.dynamicAnchors]);
		let args = (0, codegen_1._)`${dataAndSchema}, ${gen.object(...valCxt)}`;
		return context !== codegen_1.nil ? (0, codegen_1._)`${func}.call(${context}, ${args})` : (0, codegen_1._)`${func}(${args})`;
	}
	exports.callValidateCode = callValidateCode;
	let newRegExp = (0, codegen_1._)`new RegExp`;
	function usePattern({ gen, it: { opts } }, pattern) {
		let u = opts.unicodeRegExp ? "u" : "", { regExp } = opts.code, rx = regExp(pattern, u);
		return gen.scopeValue("pattern", {
			key: rx.toString(),
			ref: rx,
			code: (0, codegen_1._)`${regExp.code === "new RegExp" ? newRegExp : (0, util_2.useFunc)(gen, regExp)}(${pattern}, ${u})`
		});
	}
	exports.usePattern = usePattern;
	function validateArray(cxt) {
		let { gen, data, keyword, it } = cxt, valid = gen.name("valid");
		if (it.allErrors) {
			let validArr = gen.let("valid", !0);
			return validateItems(() => gen.assign(validArr, !1)), validArr;
		}
		return gen.var(valid, !0), validateItems(() => gen.break()), valid;
		function validateItems(notValid) {
			let len = gen.const("len", (0, codegen_1._)`${data}.length`);
			gen.forRange("i", 0, len, (i) => {
				cxt.subschema({
					keyword,
					dataProp: i,
					dataPropType: util_1.Type.Num
				}, valid), gen.if((0, codegen_1.not)(valid), notValid);
			});
		}
	}
	exports.validateArray = validateArray;
	function validateUnion(cxt) {
		let { gen, schema, keyword, it } = cxt;
		if (!Array.isArray(schema)) throw new Error("ajv implementation error");
		if (schema.some((sch) => (0, util_1.alwaysValidSchema)(it, sch)) && !it.opts.unevaluated) return;
		let valid = gen.let("valid", !1), schValid = gen.name("_valid");
		gen.block(() => schema.forEach((_sch, i) => {
			let schCxt = cxt.subschema({
				keyword,
				schemaProp: i,
				compositeRule: !0
			}, schValid);
			gen.assign(valid, (0, codegen_1._)`${valid} || ${schValid}`), cxt.mergeValidEvaluated(schCxt, schValid) || gen.if((0, codegen_1.not)(valid));
		})), cxt.result(valid, () => cxt.reset(), () => cxt.error(!0));
	}
	exports.validateUnion = validateUnion;
})), require_keyword = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.validateKeywordUsage = exports.validSchemaType = exports.funcKeywordCode = exports.macroKeywordCode = void 0;
	let codegen_1 = require_codegen(), names_1 = require_names(), code_1 = require_code(), errors_1 = require_errors();
	function macroKeywordCode(cxt, def) {
		let { gen, keyword, schema, parentSchema, it } = cxt, macroSchema = def.macro.call(it.self, schema, parentSchema, it), schemaRef = useKeyword(gen, keyword, macroSchema);
		it.opts.validateSchema !== !1 && it.self.validateSchema(macroSchema, !0);
		let valid = gen.name("valid");
		cxt.subschema({
			schema: macroSchema,
			schemaPath: codegen_1.nil,
			errSchemaPath: `${it.errSchemaPath}/${keyword}`,
			topSchemaRef: schemaRef,
			compositeRule: !0
		}, valid), cxt.pass(valid, () => cxt.error(!0));
	}
	exports.macroKeywordCode = macroKeywordCode;
	function funcKeywordCode(cxt, def) {
		var _a;
		let { gen, keyword, schema, parentSchema, $data, it } = cxt;
		checkAsyncKeyword(it, def);
		let validateRef = useKeyword(gen, keyword, !$data && def.compile ? def.compile.call(it.self, schema, parentSchema, it) : def.validate), valid = gen.let("valid");
		cxt.block$data(valid, validateKeyword), cxt.ok((_a = def.valid) !== null && _a !== void 0 ? _a : valid);
		function validateKeyword() {
			if (def.errors === !1)
				assignValid(), def.modifying && modifyData(cxt), reportErrs(() => cxt.error());
			else {
				let ruleErrs = def.async ? validateAsync() : validateSync();
				def.modifying && modifyData(cxt), reportErrs(() => addErrs(cxt, ruleErrs));
			}
		}
		function validateAsync() {
			let ruleErrs = gen.let("ruleErrs", null);
			return gen.try(() => assignValid((0, codegen_1._)`await `), (e) => gen.assign(valid, !1).if((0, codegen_1._)`${e} instanceof ${it.ValidationError}`, () => gen.assign(ruleErrs, (0, codegen_1._)`${e}.errors`), () => gen.throw(e))), ruleErrs;
		}
		function validateSync() {
			let validateErrs = (0, codegen_1._)`${validateRef}.errors`;
			return gen.assign(validateErrs, null), assignValid(codegen_1.nil), validateErrs;
		}
		function assignValid(_await = def.async ? (0, codegen_1._)`await ` : codegen_1.nil) {
			let passCxt = it.opts.passContext ? names_1.default.this : names_1.default.self, passSchema = !("compile" in def && !$data || def.schema === !1);
			gen.assign(valid, (0, codegen_1._)`${_await}${(0, code_1.callValidateCode)(cxt, validateRef, passCxt, passSchema)}`, def.modifying);
		}
		function reportErrs(errors) {
			var _a$1;
			gen.if((0, codegen_1.not)((_a$1 = def.valid) !== null && _a$1 !== void 0 ? _a$1 : valid), errors);
		}
	}
	exports.funcKeywordCode = funcKeywordCode;
	function modifyData(cxt) {
		let { gen, data, it } = cxt;
		gen.if(it.parentData, () => gen.assign(data, (0, codegen_1._)`${it.parentData}[${it.parentDataProperty}]`));
	}
	function addErrs(cxt, errs) {
		let { gen } = cxt;
		gen.if((0, codegen_1._)`Array.isArray(${errs})`, () => {
			gen.assign(names_1.default.vErrors, (0, codegen_1._)`${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`).assign(names_1.default.errors, (0, codegen_1._)`${names_1.default.vErrors}.length`), (0, errors_1.extendErrors)(cxt);
		}, () => cxt.error());
	}
	function checkAsyncKeyword({ schemaEnv }, def) {
		if (def.async && !schemaEnv.$async) throw new Error("async keyword in sync schema");
	}
	function useKeyword(gen, keyword, result) {
		if (result === void 0) throw new Error(`keyword "${keyword}" failed to compile`);
		return gen.scopeValue("keyword", typeof result == "function" ? { ref: result } : {
			ref: result,
			code: (0, codegen_1.stringify)(result)
		});
	}
	function validSchemaType(schema, schemaType, allowUndefined = !1) {
		return !schemaType.length || schemaType.some((st) => st === "array" ? Array.isArray(schema) : st === "object" ? schema && typeof schema == "object" && !Array.isArray(schema) : typeof schema == st || allowUndefined && typeof schema > "u");
	}
	exports.validSchemaType = validSchemaType;
	function validateKeywordUsage({ schema, opts, self, errSchemaPath }, def, keyword) {
		if (Array.isArray(def.keyword) ? !def.keyword.includes(keyword) : def.keyword !== keyword) throw new Error("ajv implementation error");
		let deps = def.dependencies;
		if (deps?.some((kwd) => !Object.prototype.hasOwnProperty.call(schema, kwd))) throw new Error(`parent schema must have dependencies of ${keyword}: ${deps.join(",")}`);
		if (def.validateSchema && !def.validateSchema(schema[keyword])) {
			let msg = `keyword "${keyword}" value is invalid at path "${errSchemaPath}": ` + self.errorsText(def.validateSchema.errors);
			if (opts.validateSchema === "log") self.logger.error(msg);
			else throw new Error(msg);
		}
	}
	exports.validateKeywordUsage = validateKeywordUsage;
})), require_subschema = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.extendSubschemaMode = exports.extendSubschemaData = exports.getSubschema = void 0;
	let codegen_1 = require_codegen(), util_1 = require_util();
	function getSubschema(it, { keyword, schemaProp, schema, schemaPath, errSchemaPath, topSchemaRef }) {
		if (keyword !== void 0 && schema !== void 0) throw new Error('both "keyword" and "schema" passed, only one allowed');
		if (keyword !== void 0) {
			let sch = it.schema[keyword];
			return schemaProp === void 0 ? {
				schema: sch,
				schemaPath: (0, codegen_1._)`${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}`,
				errSchemaPath: `${it.errSchemaPath}/${keyword}`
			} : {
				schema: sch[schemaProp],
				schemaPath: (0, codegen_1._)`${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}${(0, codegen_1.getProperty)(schemaProp)}`,
				errSchemaPath: `${it.errSchemaPath}/${keyword}/${(0, util_1.escapeFragment)(schemaProp)}`
			};
		}
		if (schema !== void 0) {
			if (schemaPath === void 0 || errSchemaPath === void 0 || topSchemaRef === void 0) throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
			return {
				schema,
				schemaPath,
				topSchemaRef,
				errSchemaPath
			};
		}
		throw new Error('either "keyword" or "schema" must be passed');
	}
	exports.getSubschema = getSubschema;
	function extendSubschemaData(subschema, it, { dataProp, dataPropType: dpType, data, dataTypes, propertyName }) {
		if (data !== void 0 && dataProp !== void 0) throw new Error('both "data" and "dataProp" passed, only one allowed');
		let { gen } = it;
		if (dataProp !== void 0) {
			let { errorPath, dataPathArr, opts } = it;
			dataContextProps(gen.let("data", (0, codegen_1._)`${it.data}${(0, codegen_1.getProperty)(dataProp)}`, !0)), subschema.errorPath = (0, codegen_1.str)`${errorPath}${(0, util_1.getErrorPath)(dataProp, dpType, opts.jsPropertySyntax)}`, subschema.parentDataProperty = (0, codegen_1._)`${dataProp}`, subschema.dataPathArr = [...dataPathArr, subschema.parentDataProperty];
		}
		data !== void 0 && (dataContextProps(data instanceof codegen_1.Name ? data : gen.let("data", data, !0)), propertyName !== void 0 && (subschema.propertyName = propertyName)), dataTypes && (subschema.dataTypes = dataTypes);
		function dataContextProps(_nextData) {
			subschema.data = _nextData, subschema.dataLevel = it.dataLevel + 1, subschema.dataTypes = [], it.definedProperties = /* @__PURE__ */ new Set(), subschema.parentData = it.data, subschema.dataNames = [...it.dataNames, _nextData];
		}
	}
	exports.extendSubschemaData = extendSubschemaData;
	function extendSubschemaMode(subschema, { jtdDiscriminator, jtdMetadata, compositeRule, createErrors, allErrors }) {
		compositeRule !== void 0 && (subschema.compositeRule = compositeRule), createErrors !== void 0 && (subschema.createErrors = createErrors), allErrors !== void 0 && (subschema.allErrors = allErrors), subschema.jtdDiscriminator = jtdDiscriminator, subschema.jtdMetadata = jtdMetadata;
	}
	exports.extendSubschemaMode = extendSubschemaMode;
})), require_fast_deep_equal = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function equal(a, b) {
		if (a === b) return !0;
		if (a && b && typeof a == "object" && typeof b == "object") {
			if (a.constructor !== b.constructor) return !1;
			var length, i, keys;
			if (Array.isArray(a)) {
				if (length = a.length, length != b.length) return !1;
				for (i = length; i-- !== 0; ) if (!equal(a[i], b[i])) return !1;
				return !0;
			}
			if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
			if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
			if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
			if (keys = Object.keys(a), length = keys.length, length !== Object.keys(b).length) return !1;
			for (i = length; i-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return !1;
			for (i = length; i-- !== 0; ) {
				var key = keys[i];
				if (!equal(a[key], b[key])) return !1;
			}
			return !0;
		}
		return a !== a && b !== b;
	};
})), require_json_schema_traverse = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var traverse = module.exports = function(schema, opts, cb) {
		typeof opts == "function" && (cb = opts, opts = {}), cb = opts.cb || cb;
		var pre = typeof cb == "function" ? cb : cb.pre || function() {
		}, post = cb.post || function() {
		};
		_traverse(opts, pre, post, schema, "", schema);
	};
	traverse.keywords = {
		additionalItems: !0,
		items: !0,
		contains: !0,
		additionalProperties: !0,
		propertyNames: !0,
		not: !0,
		if: !0,
		then: !0,
		else: !0
	}, traverse.arrayKeywords = {
		items: !0,
		allOf: !0,
		anyOf: !0,
		oneOf: !0
	}, traverse.propsKeywords = {
		$defs: !0,
		definitions: !0,
		properties: !0,
		patternProperties: !0,
		dependencies: !0
	}, traverse.skipKeywords = {
		default: !0,
		enum: !0,
		const: !0,
		required: !0,
		maximum: !0,
		minimum: !0,
		exclusiveMaximum: !0,
		exclusiveMinimum: !0,
		multipleOf: !0,
		maxLength: !0,
		minLength: !0,
		pattern: !0,
		format: !0,
		maxItems: !0,
		minItems: !0,
		uniqueItems: !0,
		maxProperties: !0,
		minProperties: !0
	};
	function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
		if (schema && typeof schema == "object" && !Array.isArray(schema)) {
			pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
			for (var key in schema) {
				var sch = schema[key];
				if (Array.isArray(sch)) {
					if (key in traverse.arrayKeywords) for (var i = 0; i < sch.length; i++) _traverse(opts, pre, post, sch[i], jsonPtr + "/" + key + "/" + i, rootSchema, jsonPtr, key, schema, i);
				} else if (key in traverse.propsKeywords) {
					if (sch && typeof sch == "object") for (var prop in sch) _traverse(opts, pre, post, sch[prop], jsonPtr + "/" + key + "/" + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
				} else (key in traverse.keywords || opts.allKeys && !(key in traverse.skipKeywords)) && _traverse(opts, pre, post, sch, jsonPtr + "/" + key, rootSchema, jsonPtr, key, schema);
			}
			post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
		}
	}
	function escapeJsonPtr(str) {
		return str.replace(/~/g, "~0").replace(/\//g, "~1");
	}
})), require_resolve = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.getSchemaRefs = exports.resolveUrl = exports.normalizeId = exports._getFullPath = exports.getFullPath = exports.inlineRef = void 0;
	let util_1 = require_util(), equal = require_fast_deep_equal(), traverse = require_json_schema_traverse(), SIMPLE_INLINED = /* @__PURE__ */ new Set([
		"type",
		"format",
		"pattern",
		"maxLength",
		"minLength",
		"maxProperties",
		"minProperties",
		"maxItems",
		"minItems",
		"maximum",
		"minimum",
		"uniqueItems",
		"multipleOf",
		"required",
		"enum",
		"const"
	]);
	function inlineRef(schema, limit = !0) {
		return typeof schema == "boolean" ? !0 : limit === !0 ? !hasRef(schema) : limit ? countKeys(schema) <= limit : !1;
	}
	exports.inlineRef = inlineRef;
	let REF_KEYWORDS = /* @__PURE__ */ new Set([
		"$ref",
		"$recursiveRef",
		"$recursiveAnchor",
		"$dynamicRef",
		"$dynamicAnchor"
	]);
	function hasRef(schema) {
		for (let key in schema) {
			if (REF_KEYWORDS.has(key)) return !0;
			let sch = schema[key];
			if (Array.isArray(sch) && sch.some(hasRef) || typeof sch == "object" && hasRef(sch)) return !0;
		}
		return !1;
	}
	function countKeys(schema) {
		let count = 0;
		for (let key in schema) {
			if (key === "$ref") return 1 / 0;
			if (count++, !SIMPLE_INLINED.has(key) && (typeof schema[key] == "object" && (0, util_1.eachItem)(schema[key], (sch) => count += countKeys(sch)), count === 1 / 0))
				return 1 / 0;
		}
		return count;
	}
	function getFullPath(resolver, id = "", normalize) {
		return normalize !== !1 && (id = normalizeId(id)), _getFullPath(resolver, resolver.parse(id));
	}
	exports.getFullPath = getFullPath;
	function _getFullPath(resolver, p) {
		return resolver.serialize(p).split("#")[0] + "#";
	}
	exports._getFullPath = _getFullPath;
	let TRAILING_SLASH_HASH = /#\/?$/;
	function normalizeId(id) {
		return id ? id.replace(TRAILING_SLASH_HASH, "") : "";
	}
	exports.normalizeId = normalizeId;
	function resolveUrl(resolver, baseId, id) {
		return id = normalizeId(id), resolver.resolve(baseId, id);
	}
	exports.resolveUrl = resolveUrl;
	let ANCHOR = /^[a-z_][-a-z0-9._]*$/i;
	function getSchemaRefs(schema, baseId) {
		if (typeof schema == "boolean") return {};
		let { schemaId, uriResolver } = this.opts, schId = normalizeId(schema[schemaId] || baseId), baseIds = { "": schId }, pathPrefix = getFullPath(uriResolver, schId, !1), localRefs = {}, schemaRefs = /* @__PURE__ */ new Set();
		return traverse(schema, { allKeys: !0 }, (sch, jsonPtr, _, parentJsonPtr) => {
			if (parentJsonPtr === void 0) return;
			let fullPath = pathPrefix + jsonPtr, innerBaseId = baseIds[parentJsonPtr];
			typeof sch[schemaId] == "string" && (innerBaseId = addRef.call(this, sch[schemaId])), addAnchor.call(this, sch.$anchor), addAnchor.call(this, sch.$dynamicAnchor), baseIds[jsonPtr] = innerBaseId;
			function addRef(ref) {
				let _resolve = this.opts.uriResolver.resolve;
				if (ref = normalizeId(innerBaseId ? _resolve(innerBaseId, ref) : ref), schemaRefs.has(ref)) throw ambiguos(ref);
				schemaRefs.add(ref);
				let schOrRef = this.refs[ref];
				return typeof schOrRef == "string" && (schOrRef = this.refs[schOrRef]), typeof schOrRef == "object" ? checkAmbiguosRef(sch, schOrRef.schema, ref) : ref !== normalizeId(fullPath) && (ref[0] === "#" ? (checkAmbiguosRef(sch, localRefs[ref], ref), localRefs[ref] = sch) : this.refs[ref] = fullPath), ref;
			}
			function addAnchor(anchor) {
				if (typeof anchor == "string") {
					if (!ANCHOR.test(anchor)) throw new Error(`invalid anchor "${anchor}"`);
					addRef.call(this, `#${anchor}`);
				}
			}
		}), localRefs;
		function checkAmbiguosRef(sch1, sch2, ref) {
			if (sch2 !== void 0 && !equal(sch1, sch2)) throw ambiguos(ref);
		}
		function ambiguos(ref) {
			return /* @__PURE__ */ new Error(`reference "${ref}" resolves to more than one schema`);
		}
	}
	exports.getSchemaRefs = getSchemaRefs;
})), require_validate = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.getData = exports.KeywordCxt = exports.validateFunctionCode = void 0;
	let boolSchema_1 = require_boolSchema(), dataType_1 = require_dataType(), applicability_1 = require_applicability(), dataType_2 = require_dataType(), defaults_1 = require_defaults(), keyword_1 = require_keyword(), subschema_1 = require_subschema(), codegen_1 = require_codegen(), names_1 = require_names(), resolve_1 = require_resolve(), util_1 = require_util(), errors_1 = require_errors();
	function validateFunctionCode(it) {
		if (isSchemaObj(it) && (checkKeywords(it), schemaCxtHasRules(it))) {
			topSchemaObjCode(it);
			return;
		}
		validateFunction(it, () => (0, boolSchema_1.topBoolOrEmptySchema)(it));
	}
	exports.validateFunctionCode = validateFunctionCode;
	function validateFunction({ gen, validateName, schema, schemaEnv, opts }, body) {
		opts.code.es5 ? gen.func(validateName, (0, codegen_1._)`${names_1.default.data}, ${names_1.default.valCxt}`, schemaEnv.$async, () => {
			gen.code((0, codegen_1._)`"use strict"; ${funcSourceUrl(schema, opts)}`), destructureValCxtES5(gen, opts), gen.code(body);
		}) : gen.func(validateName, (0, codegen_1._)`${names_1.default.data}, ${destructureValCxt(opts)}`, schemaEnv.$async, () => gen.code(funcSourceUrl(schema, opts)).code(body));
	}
	function destructureValCxt(opts) {
		return (0, codegen_1._)`{${names_1.default.instancePath}="", ${names_1.default.parentData}, ${names_1.default.parentDataProperty}, ${names_1.default.rootData}=${names_1.default.data}${opts.dynamicRef ? (0, codegen_1._)`, ${names_1.default.dynamicAnchors}={}` : codegen_1.nil}}={}`;
	}
	function destructureValCxtES5(gen, opts) {
		gen.if(names_1.default.valCxt, () => {
			gen.var(names_1.default.instancePath, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.instancePath}`), gen.var(names_1.default.parentData, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.parentData}`), gen.var(names_1.default.parentDataProperty, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.parentDataProperty}`), gen.var(names_1.default.rootData, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.rootData}`), opts.dynamicRef && gen.var(names_1.default.dynamicAnchors, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.dynamicAnchors}`);
		}, () => {
			gen.var(names_1.default.instancePath, (0, codegen_1._)`""`), gen.var(names_1.default.parentData, (0, codegen_1._)`undefined`), gen.var(names_1.default.parentDataProperty, (0, codegen_1._)`undefined`), gen.var(names_1.default.rootData, names_1.default.data), opts.dynamicRef && gen.var(names_1.default.dynamicAnchors, (0, codegen_1._)`{}`);
		});
	}
	function topSchemaObjCode(it) {
		let { schema, opts, gen } = it;
		validateFunction(it, () => {
			opts.$comment && schema.$comment && commentKeyword(it), checkNoDefault(it), gen.let(names_1.default.vErrors, null), gen.let(names_1.default.errors, 0), opts.unevaluated && resetEvaluated(it), typeAndKeywords(it), returnResults(it);
		});
	}
	function resetEvaluated(it) {
		let { gen, validateName } = it;
		it.evaluated = gen.const("evaluated", (0, codegen_1._)`${validateName}.evaluated`), gen.if((0, codegen_1._)`${it.evaluated}.dynamicProps`, () => gen.assign((0, codegen_1._)`${it.evaluated}.props`, (0, codegen_1._)`undefined`)), gen.if((0, codegen_1._)`${it.evaluated}.dynamicItems`, () => gen.assign((0, codegen_1._)`${it.evaluated}.items`, (0, codegen_1._)`undefined`));
	}
	function funcSourceUrl(schema, opts) {
		let schId = typeof schema == "object" && schema[opts.schemaId];
		return schId && (opts.code.source || opts.code.process) ? (0, codegen_1._)`/*# sourceURL=${schId} */` : codegen_1.nil;
	}
	function subschemaCode(it, valid) {
		if (isSchemaObj(it) && (checkKeywords(it), schemaCxtHasRules(it))) {
			subSchemaObjCode(it, valid);
			return;
		}
		(0, boolSchema_1.boolOrEmptySchema)(it, valid);
	}
	function schemaCxtHasRules({ schema, self }) {
		if (typeof schema == "boolean") return !schema;
		for (let key in schema) if (self.RULES.all[key]) return !0;
		return !1;
	}
	function isSchemaObj(it) {
		return typeof it.schema != "boolean";
	}
	function subSchemaObjCode(it, valid) {
		let { schema, gen, opts } = it;
		opts.$comment && schema.$comment && commentKeyword(it), updateContext(it), checkAsyncSchema(it);
		let errsCount = gen.const("_errs", names_1.default.errors);
		typeAndKeywords(it, errsCount), gen.var(valid, (0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
	}
	function checkKeywords(it) {
		(0, util_1.checkUnknownRules)(it), checkRefsAndKeywords(it);
	}
	function typeAndKeywords(it, errsCount) {
		if (it.opts.jtd) return schemaKeywords(it, [], !1, errsCount);
		let types = (0, dataType_1.getSchemaTypes)(it.schema);
		schemaKeywords(it, types, !(0, dataType_1.coerceAndCheckDataType)(it, types), errsCount);
	}
	function checkRefsAndKeywords(it) {
		let { schema, errSchemaPath, opts, self } = it;
		schema.$ref && opts.ignoreKeywordsWithRef && (0, util_1.schemaHasRulesButRef)(schema, self.RULES) && self.logger.warn(`$ref: keywords ignored in schema at path "${errSchemaPath}"`);
	}
	function checkNoDefault(it) {
		let { schema, opts } = it;
		schema.default !== void 0 && opts.useDefaults && opts.strictSchema && (0, util_1.checkStrictMode)(it, "default is ignored in the schema root");
	}
	function updateContext(it) {
		let schId = it.schema[it.opts.schemaId];
		schId && (it.baseId = (0, resolve_1.resolveUrl)(it.opts.uriResolver, it.baseId, schId));
	}
	function checkAsyncSchema(it) {
		if (it.schema.$async && !it.schemaEnv.$async) throw new Error("async schema in sync schema");
	}
	function commentKeyword({ gen, schemaEnv, schema, errSchemaPath, opts }) {
		let msg = schema.$comment;
		if (opts.$comment === !0) gen.code((0, codegen_1._)`${names_1.default.self}.logger.log(${msg})`);
		else if (typeof opts.$comment == "function") {
			let schemaPath = (0, codegen_1.str)`${errSchemaPath}/$comment`, rootName = gen.scopeValue("root", { ref: schemaEnv.root });
			gen.code((0, codegen_1._)`${names_1.default.self}.opts.$comment(${msg}, ${schemaPath}, ${rootName}.schema)`);
		}
	}
	function returnResults(it) {
		let { gen, schemaEnv, validateName, ValidationError, opts } = it;
		schemaEnv.$async ? gen.if((0, codegen_1._)`${names_1.default.errors} === 0`, () => gen.return(names_1.default.data), () => gen.throw((0, codegen_1._)`new ${ValidationError}(${names_1.default.vErrors})`)) : (gen.assign((0, codegen_1._)`${validateName}.errors`, names_1.default.vErrors), opts.unevaluated && assignEvaluated(it), gen.return((0, codegen_1._)`${names_1.default.errors} === 0`));
	}
	function assignEvaluated({ gen, evaluated, props, items }) {
		props instanceof codegen_1.Name && gen.assign((0, codegen_1._)`${evaluated}.props`, props), items instanceof codegen_1.Name && gen.assign((0, codegen_1._)`${evaluated}.items`, items);
	}
	function schemaKeywords(it, types, typeErrors, errsCount) {
		let { gen, schema, data, allErrors, opts, self } = it, { RULES } = self;
		if (schema.$ref && (opts.ignoreKeywordsWithRef || !(0, util_1.schemaHasRulesButRef)(schema, RULES))) {
			gen.block(() => keywordCode(it, "$ref", RULES.all.$ref.definition));
			return;
		}
		opts.jtd || checkStrictTypes(it, types), gen.block(() => {
			for (let group of RULES.rules) groupKeywords(group);
			groupKeywords(RULES.post);
		});
		function groupKeywords(group) {
			(0, applicability_1.shouldUseGroup)(schema, group) && (group.type ? (gen.if((0, dataType_2.checkDataType)(group.type, data, opts.strictNumbers)), iterateKeywords(it, group), types.length === 1 && types[0] === group.type && typeErrors && (gen.else(), (0, dataType_2.reportTypeError)(it)), gen.endIf()) : iterateKeywords(it, group), allErrors || gen.if((0, codegen_1._)`${names_1.default.errors} === ${errsCount || 0}`));
		}
	}
	function iterateKeywords(it, group) {
		let { gen, schema, opts: { useDefaults } } = it;
		useDefaults && (0, defaults_1.assignDefaults)(it, group.type), gen.block(() => {
			for (let rule of group.rules) (0, applicability_1.shouldUseRule)(schema, rule) && keywordCode(it, rule.keyword, rule.definition, group.type);
		});
	}
	function checkStrictTypes(it, types) {
		it.schemaEnv.meta || !it.opts.strictTypes || (checkContextTypes(it, types), it.opts.allowUnionTypes || checkMultipleTypes(it, types), checkKeywordTypes(it, it.dataTypes));
	}
	function checkContextTypes(it, types) {
		if (types.length) {
			if (!it.dataTypes.length) {
				it.dataTypes = types;
				return;
			}
			types.forEach((t) => {
				includesType(it.dataTypes, t) || strictTypesError(it, `type "${t}" not allowed by context "${it.dataTypes.join(",")}"`);
			}), narrowSchemaTypes(it, types);
		}
	}
	function checkMultipleTypes(it, ts) {
		ts.length > 1 && !(ts.length === 2 && ts.includes("null")) && strictTypesError(it, "use allowUnionTypes to allow union type keyword");
	}
	function checkKeywordTypes(it, ts) {
		let rules = it.self.RULES.all;
		for (let keyword in rules) {
			let rule = rules[keyword];
			if (typeof rule == "object" && (0, applicability_1.shouldUseRule)(it.schema, rule)) {
				let { type } = rule.definition;
				type.length && !type.some((t) => hasApplicableType(ts, t)) && strictTypesError(it, `missing type "${type.join(",")}" for keyword "${keyword}"`);
			}
		}
	}
	function hasApplicableType(schTs, kwdT) {
		return schTs.includes(kwdT) || kwdT === "number" && schTs.includes("integer");
	}
	function includesType(ts, t) {
		return ts.includes(t) || t === "integer" && ts.includes("number");
	}
	function narrowSchemaTypes(it, withTypes) {
		let ts = [];
		for (let t of it.dataTypes) includesType(withTypes, t) ? ts.push(t) : withTypes.includes("integer") && t === "number" && ts.push("integer");
		it.dataTypes = ts;
	}
	function strictTypesError(it, msg) {
		let schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
		msg += ` at "${schemaPath}" (strictTypes)`, (0, util_1.checkStrictMode)(it, msg, it.opts.strictTypes);
	}
	var KeywordCxt = class {
		constructor(it, def, keyword) {
			if ((0, keyword_1.validateKeywordUsage)(it, def, keyword), this.gen = it.gen, this.allErrors = it.allErrors, this.keyword = keyword, this.data = it.data, this.schema = it.schema[keyword], this.$data = def.$data && it.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, util_1.schemaRefOrVal)(it, this.schema, keyword, this.$data), this.schemaType = def.schemaType, this.parentSchema = it.schema, this.params = {}, this.it = it, this.def = def, this.$data) this.schemaCode = it.gen.const("vSchema", getData(this.$data, it));
			else if (this.schemaCode = this.schemaValue, !(0, keyword_1.validSchemaType)(this.schema, def.schemaType, def.allowUndefined)) throw new Error(`${keyword} value must be ${JSON.stringify(def.schemaType)}`);
			("code" in def ? def.trackErrors : def.errors !== !1) && (this.errsCount = it.gen.const("_errs", names_1.default.errors));
		}
		result(condition, successAction, failAction) {
			this.failResult((0, codegen_1.not)(condition), successAction, failAction);
		}
		failResult(condition, successAction, failAction) {
			this.gen.if(condition), failAction ? failAction() : this.error(), successAction ? (this.gen.else(), successAction(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
		}
		pass(condition, failAction) {
			this.failResult((0, codegen_1.not)(condition), void 0, failAction);
		}
		fail(condition) {
			if (condition === void 0) {
				this.error(), this.allErrors || this.gen.if(!1);
				return;
			}
			this.gen.if(condition), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
		}
		fail$data(condition) {
			if (!this.$data) return this.fail(condition);
			let { schemaCode } = this;
			this.fail((0, codegen_1._)`${schemaCode} !== undefined && (${(0, codegen_1.or)(this.invalid$data(), condition)})`);
		}
		error(append, errorParams, errorPaths) {
			if (errorParams) {
				this.setParams(errorParams), this._error(append, errorPaths), this.setParams({});
				return;
			}
			this._error(append, errorPaths);
		}
		_error(append, errorPaths) {
			(append ? errors_1.reportExtraError : errors_1.reportError)(this, this.def.error, errorPaths);
		}
		$dataError() {
			(0, errors_1.reportError)(this, this.def.$dataError || errors_1.keyword$DataError);
		}
		reset() {
			if (this.errsCount === void 0) throw new Error('add "trackErrors" to keyword definition');
			(0, errors_1.resetErrorsCount)(this.gen, this.errsCount);
		}
		ok(cond) {
			this.allErrors || this.gen.if(cond);
		}
		setParams(obj, assign) {
			assign ? Object.assign(this.params, obj) : this.params = obj;
		}
		block$data(valid, codeBlock, $dataValid = codegen_1.nil) {
			this.gen.block(() => {
				this.check$data(valid, $dataValid), codeBlock();
			});
		}
		check$data(valid = codegen_1.nil, $dataValid = codegen_1.nil) {
			if (!this.$data) return;
			let { gen, schemaCode, schemaType, def } = this;
			gen.if((0, codegen_1.or)((0, codegen_1._)`${schemaCode} === undefined`, $dataValid)), valid !== codegen_1.nil && gen.assign(valid, !0), (schemaType.length || def.validateSchema) && (gen.elseIf(this.invalid$data()), this.$dataError(), valid !== codegen_1.nil && gen.assign(valid, !1)), gen.else();
		}
		invalid$data() {
			let { gen, schemaCode, schemaType, def, it } = this;
			return (0, codegen_1.or)(wrong$DataType(), invalid$DataSchema());
			function wrong$DataType() {
				if (schemaType.length) {
					if (!(schemaCode instanceof codegen_1.Name)) throw new Error("ajv implementation error");
					let st = Array.isArray(schemaType) ? schemaType : [schemaType];
					return (0, codegen_1._)`${(0, dataType_2.checkDataTypes)(st, schemaCode, it.opts.strictNumbers, dataType_2.DataType.Wrong)}`;
				}
				return codegen_1.nil;
			}
			function invalid$DataSchema() {
				if (def.validateSchema) {
					let validateSchemaRef = gen.scopeValue("validate$data", { ref: def.validateSchema });
					return (0, codegen_1._)`!${validateSchemaRef}(${schemaCode})`;
				}
				return codegen_1.nil;
			}
		}
		subschema(appl, valid) {
			let subschema = (0, subschema_1.getSubschema)(this.it, appl);
			(0, subschema_1.extendSubschemaData)(subschema, this.it, appl), (0, subschema_1.extendSubschemaMode)(subschema, appl);
			let nextContext = {
				...this.it,
				...subschema,
				items: void 0,
				props: void 0
			};
			return subschemaCode(nextContext, valid), nextContext;
		}
		mergeEvaluated(schemaCxt, toName) {
			let { it, gen } = this;
			it.opts.unevaluated && (it.props !== !0 && schemaCxt.props !== void 0 && (it.props = util_1.mergeEvaluated.props(gen, schemaCxt.props, it.props, toName)), it.items !== !0 && schemaCxt.items !== void 0 && (it.items = util_1.mergeEvaluated.items(gen, schemaCxt.items, it.items, toName)));
		}
		mergeValidEvaluated(schemaCxt, valid) {
			let { it, gen } = this;
			if (it.opts.unevaluated && (it.props !== !0 || it.items !== !0))
				return gen.if(valid, () => this.mergeEvaluated(schemaCxt, codegen_1.Name)), !0;
		}
	};
	exports.KeywordCxt = KeywordCxt;
	function keywordCode(it, keyword, def, ruleType) {
		let cxt = new KeywordCxt(it, def, keyword);
		"code" in def ? def.code(cxt, ruleType) : cxt.$data && def.validate ? (0, keyword_1.funcKeywordCode)(cxt, def) : "macro" in def ? (0, keyword_1.macroKeywordCode)(cxt, def) : (def.compile || def.validate) && (0, keyword_1.funcKeywordCode)(cxt, def);
	}
	let JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/, RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
	function getData($data, { dataLevel, dataNames, dataPathArr }) {
		let jsonPointer, data;
		if ($data === "") return names_1.default.rootData;
		if ($data[0] === "/") {
			if (!JSON_POINTER.test($data)) throw new Error(`Invalid JSON-pointer: ${$data}`);
			jsonPointer = $data, data = names_1.default.rootData;
		} else {
			let matches = RELATIVE_JSON_POINTER.exec($data);
			if (!matches) throw new Error(`Invalid JSON-pointer: ${$data}`);
			let up = +matches[1];
			if (jsonPointer = matches[2], jsonPointer === "#") {
				if (up >= dataLevel) throw new Error(errorMsg("property/index", up));
				return dataPathArr[dataLevel - up];
			}
			if (up > dataLevel) throw new Error(errorMsg("data", up));
			if (data = dataNames[dataLevel - up], !jsonPointer) return data;
		}
		let expr = data, segments = jsonPointer.split("/");
		for (let segment of segments) segment && (data = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)((0, util_1.unescapeJsonPointer)(segment))}`, expr = (0, codegen_1._)`${expr} && ${data}`);
		return expr;
		function errorMsg(pointerType, up) {
			return `Cannot access ${pointerType} ${up} levels up, current level is ${dataLevel}`;
		}
	}
	exports.getData = getData;
})), require_validation_error = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	var ValidationError = class extends Error {
		constructor(errors) {
			super("validation failed"), this.errors = errors, this.ajv = this.validation = !0;
		}
	};
	exports.default = ValidationError;
})), require_ref_error = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let resolve_1 = require_resolve();
	var MissingRefError = class extends Error {
		constructor(resolver, baseId, ref, msg) {
			super(msg || `can't resolve reference ${ref} from id ${baseId}`), this.missingRef = (0, resolve_1.resolveUrl)(resolver, baseId, ref), this.missingSchema = (0, resolve_1.normalizeId)((0, resolve_1.getFullPath)(resolver, this.missingRef));
		}
	};
	exports.default = MissingRefError;
})), require_compile = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.resolveSchema = exports.getCompilingSchema = exports.resolveRef = exports.compileSchema = exports.SchemaEnv = void 0;
	let codegen_1 = require_codegen(), validation_error_1 = require_validation_error(), names_1 = require_names(), resolve_1 = require_resolve(), util_1 = require_util(), validate_1 = require_validate();
	var SchemaEnv = class {
		constructor(env) {
			var _a;
			this.refs = {}, this.dynamicAnchors = {};
			let schema;
			typeof env.schema == "object" && (schema = env.schema), this.schema = env.schema, this.schemaId = env.schemaId, this.root = env.root || this, this.baseId = (_a = env.baseId) !== null && _a !== void 0 ? _a : (0, resolve_1.normalizeId)(schema?.[env.schemaId || "$id"]), this.schemaPath = env.schemaPath, this.localRefs = env.localRefs, this.meta = env.meta, this.$async = schema?.$async, this.refs = {};
		}
	};
	exports.SchemaEnv = SchemaEnv;
	function compileSchema(sch) {
		let _sch = getCompilingSchema.call(this, sch);
		if (_sch) return _sch;
		let rootId = (0, resolve_1.getFullPath)(this.opts.uriResolver, sch.root.baseId), { es5, lines } = this.opts.code, { ownProperties } = this.opts, gen = new codegen_1.CodeGen(this.scope, {
			es5,
			lines,
			ownProperties
		}), _ValidationError;
		sch.$async && (_ValidationError = gen.scopeValue("Error", {
			ref: validation_error_1.default,
			code: (0, codegen_1._)`require("ajv/dist/runtime/validation_error").default`
		}));
		let validateName = gen.scopeName("validate");
		sch.validateName = validateName;
		let schemaCxt = {
			gen,
			allErrors: this.opts.allErrors,
			data: names_1.default.data,
			parentData: names_1.default.parentData,
			parentDataProperty: names_1.default.parentDataProperty,
			dataNames: [names_1.default.data],
			dataPathArr: [codegen_1.nil],
			dataLevel: 0,
			dataTypes: [],
			definedProperties: /* @__PURE__ */ new Set(),
			topSchemaRef: gen.scopeValue("schema", this.opts.code.source === !0 ? {
				ref: sch.schema,
				code: (0, codegen_1.stringify)(sch.schema)
			} : { ref: sch.schema }),
			validateName,
			ValidationError: _ValidationError,
			schema: sch.schema,
			schemaEnv: sch,
			rootId,
			baseId: sch.baseId || rootId,
			schemaPath: codegen_1.nil,
			errSchemaPath: sch.schemaPath || (this.opts.jtd ? "" : "#"),
			errorPath: (0, codegen_1._)`""`,
			opts: this.opts,
			self: this
		}, sourceCode;
		try {
			this._compilations.add(sch), (0, validate_1.validateFunctionCode)(schemaCxt), gen.optimize(this.opts.code.optimize);
			let validateCode = gen.toString();
			sourceCode = `${gen.scopeRefs(names_1.default.scope)}return ${validateCode}`, this.opts.code.process && (sourceCode = this.opts.code.process(sourceCode, sch));
			let validate = new Function(`${names_1.default.self}`, `${names_1.default.scope}`, sourceCode)(this, this.scope.get());
			if (this.scope.value(validateName, { ref: validate }), validate.errors = null, validate.schema = sch.schema, validate.schemaEnv = sch, sch.$async && (validate.$async = !0), this.opts.code.source === !0 && (validate.source = {
				validateName,
				validateCode,
				scopeValues: gen._values
			}), this.opts.unevaluated) {
				let { props, items } = schemaCxt;
				validate.evaluated = {
					props: props instanceof codegen_1.Name ? void 0 : props,
					items: items instanceof codegen_1.Name ? void 0 : items,
					dynamicProps: props instanceof codegen_1.Name,
					dynamicItems: items instanceof codegen_1.Name
				}, validate.source && (validate.source.evaluated = (0, codegen_1.stringify)(validate.evaluated));
			}
			return sch.validate = validate, sch;
		} catch (e) {
			throw delete sch.validate, delete sch.validateName, sourceCode && this.logger.error("Error compiling schema, function code:", sourceCode), e;
		} finally {
			this._compilations.delete(sch);
		}
	}
	exports.compileSchema = compileSchema;
	function resolveRef(root, baseId, ref) {
		var _a;
		ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, ref);
		let schOrFunc = root.refs[ref];
		if (schOrFunc) return schOrFunc;
		let _sch = resolve.call(this, root, ref);
		if (_sch === void 0) {
			let schema = (_a = root.localRefs) === null || _a === void 0 ? void 0 : _a[ref], { schemaId } = this.opts;
			schema && (_sch = new SchemaEnv({
				schema,
				schemaId,
				root,
				baseId
			}));
		}
		if (_sch !== void 0)
			return root.refs[ref] = inlineOrCompile.call(this, _sch);
	}
	exports.resolveRef = resolveRef;
	function inlineOrCompile(sch) {
		return (0, resolve_1.inlineRef)(sch.schema, this.opts.inlineRefs) ? sch.schema : sch.validate ? sch : compileSchema.call(this, sch);
	}
	function getCompilingSchema(schEnv) {
		for (let sch of this._compilations) if (sameSchemaEnv(sch, schEnv)) return sch;
	}
	exports.getCompilingSchema = getCompilingSchema;
	function sameSchemaEnv(s1, s2) {
		return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
	}
	function resolve(root, ref) {
		let sch;
		for (; typeof (sch = this.refs[ref]) == "string"; ) ref = sch;
		return sch || this.schemas[ref] || resolveSchema.call(this, root, ref);
	}
	function resolveSchema(root, ref) {
		let p = this.opts.uriResolver.parse(ref), refPath = (0, resolve_1._getFullPath)(this.opts.uriResolver, p), baseId = (0, resolve_1.getFullPath)(this.opts.uriResolver, root.baseId, void 0);
		if (Object.keys(root.schema).length > 0 && refPath === baseId) return getJsonPointer.call(this, p, root);
		let id = (0, resolve_1.normalizeId)(refPath), schOrRef = this.refs[id] || this.schemas[id];
		if (typeof schOrRef == "string") {
			let sch = resolveSchema.call(this, root, schOrRef);
			return typeof sch?.schema != "object" ? void 0 : getJsonPointer.call(this, p, sch);
		}
		if (typeof schOrRef?.schema == "object") {
			if (schOrRef.validate || compileSchema.call(this, schOrRef), id === (0, resolve_1.normalizeId)(ref)) {
				let { schema } = schOrRef, { schemaId } = this.opts, schId = schema[schemaId];
				return schId && (baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId)), new SchemaEnv({
					schema,
					schemaId,
					root,
					baseId
				});
			}
			return getJsonPointer.call(this, p, schOrRef);
		}
	}
	exports.resolveSchema = resolveSchema;
	let PREVENT_SCOPE_CHANGE = /* @__PURE__ */ new Set([
		"properties",
		"patternProperties",
		"enum",
		"dependencies",
		"definitions"
	]);
	function getJsonPointer(parsedRef, { baseId, schema, root }) {
		var _a;
		if (((_a = parsedRef.fragment) === null || _a === void 0 ? void 0 : _a[0]) !== "/") return;
		for (let part of parsedRef.fragment.slice(1).split("/")) {
			if (typeof schema == "boolean") return;
			let partSchema = schema[(0, util_1.unescapeFragment)(part)];
			if (partSchema === void 0) return;
			schema = partSchema;
			let schId = typeof schema == "object" && schema[this.opts.schemaId];
			!PREVENT_SCOPE_CHANGE.has(part) && schId && (baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId));
		}
		let env;
		if (typeof schema != "boolean" && schema.$ref && !(0, util_1.schemaHasRulesButRef)(schema, this.RULES)) {
			let $ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schema.$ref);
			env = resolveSchema.call(this, root, $ref);
		}
		let { schemaId } = this.opts;
		if (env = env || new SchemaEnv({
			schema,
			schemaId,
			root,
			baseId
		}), env.schema !== env.root.schema) return env;
	}
})), require_data = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		$id: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
		description: "Meta-schema for $data reference (JSON AnySchema extension proposal)",
		type: "object",
		required: ["$data"],
		properties: { $data: {
			type: "string",
			anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }]
		} },
		additionalProperties: !1
	};
})), require_utils = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let isUUID = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), isIPv4 = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u), isPort = RegExp.prototype.test.bind(/^\d*$/u), isHexPair = RegExp.prototype.test.bind(/^[\da-f]{2}$/iu), isUnreserved = RegExp.prototype.test.bind(/^[\da-z\-._~]$/iu), isPathCharacter = RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:@/]$/u), isQueryFragmentCharacter = RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:@/?]$/u), isUserinfoCharacter = RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:]$/u), BYTE_HEX = new Array(256);
	{
		let HEX_DIGITS = "0123456789ABCDEF";
		for (let i = 0; i < 256; i++) BYTE_HEX[i] = "%" + HEX_DIGITS[i >> 4] + HEX_DIGITS[i & 15];
	}
	function percentEncodeNonAscii(cp) {
		return cp < 2048 ? BYTE_HEX[192 | cp >> 6] + BYTE_HEX[128 | cp & 63] : cp < 65536 ? BYTE_HEX[224 | cp >> 12] + BYTE_HEX[128 | cp >> 6 & 63] + BYTE_HEX[128 | cp & 63] : BYTE_HEX[240 | cp >> 18] + BYTE_HEX[128 | cp >> 12 & 63] + BYTE_HEX[128 | cp >> 6 & 63] + BYTE_HEX[128 | cp & 63];
	}
	function stringArrayToHexStripped(input) {
		let acc = "", code = 0, i = 0;
		for (i = 0; i < input.length; i++)
			if (code = input[i].charCodeAt(0), code !== 48) {
				if (!(code >= 48 && code <= 57 || code >= 65 && code <= 70 || code >= 97 && code <= 102)) return "";
				acc += input[i];
				break;
			}
		for (i += 1; i < input.length; i++) {
			if (code = input[i].charCodeAt(0), !(code >= 48 && code <= 57 || code >= 65 && code <= 70 || code >= 97 && code <= 102)) return "";
			acc += input[i];
		}
		return acc;
	}
	let isHextet = RegExp.prototype.test.bind(/^[\dA-Fa-f]{1,4}$/), isIPvFuture = RegExp.prototype.test.bind(/^[vV][\dA-Fa-f]+\.[A-Za-z\d\-._~!$&'()*+,;=:]+$/), isZoneCharacter = RegExp.prototype.test.bind(/^[A-Za-z\d\-._~]$/), nonSimpleDomain = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
	function isZoneIdentifier(zone) {
		if (zone.length === 0) return !1;
		for (let i = 0; i < zone.length; i++)
			if (!isZoneCharacter(zone[i])) {
				if (zone[i] === "%" && i + 2 < zone.length && isHexPair(zone.slice(i + 1, i + 3))) {
					i += 2;
					continue;
				}
				return !1;
			}
		return !0;
	}
	function compressIPv6ZeroRun(hextets) {
		let bestStart = -1, bestLength = 0, runStart = -1, runLength = 0;
		for (let i = 0; i < hextets.length; i++) hextets[i] === "0" ? (runStart === -1 && (runStart = i), runLength++, runLength > bestLength && (bestLength = runLength, bestStart = runStart)) : (runStart = -1, runLength = 0);
		if (bestLength < 2) return hextets.join(":");
		let head = hextets.slice(0, bestStart).join(":"), tail = hextets.slice(bestStart + bestLength).join(":");
		return head + "::" + tail;
	}
	function normalizeIPv6Address(input) {
		let compression = input.indexOf("::");
		if (compression !== -1 && input.indexOf("::", compression + 1) !== -1) return;
		let left = compression === -1 ? input.split(":") : input.slice(0, compression).split(":"), right = compression === -1 ? [] : input.slice(compression + 2).split(":");
		compression !== -1 && (left.length === 1 && left[0] === "" && (left.length = 0), right.length === 1 && right[0] === "" && (right.length = 0));
		let parts = left.concat(right), hextetCount = 0;
		for (let i = 0; i < parts.length; i++) {
			let part = parts[i];
			if (part === "") return;
			if (part.indexOf(".") !== -1) {
				if (i !== parts.length - 1 || compression !== -1 && right.length === 0 || !isIPv4(part)) return;
				hextetCount += 2;
				continue;
			}
			if (!isHextet(part)) return;
			parts[i] = parseInt(part, 16).toString(16), hextetCount++;
		}
		if (compression === -1)
			return hextetCount !== 8 ? void 0 : compressIPv6ZeroRun(parts);
		if (hextetCount >= 8) return;
		let expanded = parts.slice(0, left.length);
		for (let i = hextetCount; i < 8; i++) expanded.push("0");
		for (let i = left.length; i < parts.length; i++) expanded.push(parts[i]);
		return compressIPv6ZeroRun(expanded);
	}
	function normalizeIPv6(host) {
		let bracketed = host[0] === "[" && host[host.length - 1] === "]";
		if ((host[0] === "[" || host[host.length - 1] === "]") && !bracketed) return {
			host,
			isIPV6: !1,
			error: !0
		};
		let input = bracketed ? host.slice(1, -1) : host;
		if (bracketed && isIPvFuture(input))
			return input = input.toLowerCase(), {
				host: `[${input}]`,
				escapedHost: input,
				isIPV6: !1,
				isIPVFuture: !0
			};
		if (findToken(input, ":") < 2) return {
			host,
			isIPV6: !1,
			error: bracketed
		};
		let zoneIdentifier = "", zoneSeparator = input.indexOf("%");
		if (zoneSeparator !== -1) {
			let separatorLength = input.slice(zoneSeparator, zoneSeparator + 3).toLowerCase() === "%25" ? 3 : 1;
			if (zoneIdentifier = input.slice(zoneSeparator + separatorLength), !isZoneIdentifier(zoneIdentifier)) return {
				host,
				isIPV6: !1,
				error: !0
			};
			input = input.slice(0, zoneSeparator);
		}
		let address = normalizeIPv6Address(input);
		return address === void 0 ? {
			host,
			isIPV6: !1,
			error: !0
		} : {
			host: address + (zoneIdentifier ? "%" + zoneIdentifier : ""),
			escapedHost: address + (zoneIdentifier ? "%25" + zoneIdentifier : ""),
			isIPV6: !0
		};
	}
	function findToken(str, token) {
		let ind = 0;
		for (let i = 0; i < str.length; i++) str[i] === token && ind++;
		return ind;
	}
	function removeDotSegments(path) {
		let input = path, output = [], nextSlash = -1, len = 0;
		for (; len = input.length; ) {
			if (len === 1) {
				if (input === ".") break;
				if (input === "/") {
					output.push("/");
					break;
				} else {
					output.push(input);
					break;
				}
			} else if (len === 2) {
				if (input[0] === ".") {
					if (input[1] === ".") break;
					if (input[1] === "/") {
						input = input.slice(2);
						continue;
					}
				} else if (input[0] === "/" && (input[1] === "." || input[1] === "/")) {
					output.push("/");
					break;
				}
			} else if (len === 3 && input === "/..") {
				output.length !== 0 && output.pop(), output.push("/");
				break;
			}
			if (input[0] === ".") {
				if (input[1] === ".") {
					if (input[2] === "/") {
						input = input.slice(3);
						continue;
					}
				} else if (input[1] === "/") {
					input = input.slice(2);
					continue;
				}
			} else if (input[0] === "/" && input[1] === ".") {
				if (input[2] === "/") {
					input = input.slice(2);
					continue;
				} else if (input[2] === "." && input[3] === "/") {
					input = input.slice(3), output.length !== 0 && output.pop();
					continue;
				}
			}
			if ((nextSlash = input.indexOf("/", 1)) === -1) {
				output.push(input);
				break;
			} else
				output.push(input.slice(0, nextSlash)), input = input.slice(nextSlash);
		}
		return output.join("");
	}
	let HOST_DELIMS = {
		"@": "%40",
		"/": "%2F",
		"?": "%3F",
		"#": "%23",
		":": "%3A"
	}, HOST_DELIM_RE = /[@/?#:]/g, HOST_DELIM_NO_COLON_RE = /[@/?#]/g;
	function reescapeHostDelimiters(host, isIP) {
		let re = isIP ? HOST_DELIM_NO_COLON_RE : HOST_DELIM_RE;
		return re.lastIndex = 0, host.replace(re, (ch) => HOST_DELIMS[ch]);
	}
	function normalizePercentEncoding(input, decodeUnreserved = !1) {
		if (input.indexOf("%") === -1) return input;
		let output = "";
		for (let i = 0; i < input.length; i++) {
			if (input[i] === "%" && i + 2 < input.length) {
				let hex = input.slice(i + 1, i + 3);
				if (isHexPair(hex)) {
					let normalizedHex = hex.toUpperCase(), decoded = String.fromCharCode(parseInt(normalizedHex, 16));
					decodeUnreserved && isUnreserved(decoded) ? output += decoded : output += "%" + normalizedHex, i += 2;
					continue;
				}
			}
			output += input[i];
		}
		return output;
	}
	function normalizePathEncoding(input) {
		let output = "";
		for (let i = 0; i < input.length; i++) {
			let ch = input[i];
			if (ch === "%" && i + 2 < input.length) {
				let hex = input.slice(i + 1, i + 3);
				if (isHexPair(hex)) {
					let normalizedHex = hex.toUpperCase(), decoded = String.fromCharCode(parseInt(normalizedHex, 16));
					decoded !== "." && isUnreserved(decoded) ? output += decoded : output += "%" + normalizedHex, i += 2;
					continue;
				}
			}
			if (isPathCharacter(ch)) output += ch;
			else {
				let code = input.charCodeAt(i);
				if (code < 128) output += isEscapeSafe(code) ? ch : BYTE_HEX[code];
				else if (code < 55296 || code > 57343) output += percentEncodeNonAscii(code);
				else if (code <= 56319 && i + 1 < input.length) {
					let low = input.charCodeAt(i + 1);
					low >= 56320 && low <= 57343 ? (output += percentEncodeNonAscii(65536 + (code - 55296 << 10) + (low - 56320)), i++) : output += percentEncodeNonAscii(65533);
				} else output += percentEncodeNonAscii(65533);
			}
		}
		return output;
	}
	function serializePathEncoding(input, pathNoScheme = !1) {
		let output = "", firstSegment = pathNoScheme && input[0] !== "/";
		for (let i = 0; i < input.length; i++) {
			let ch = input[i];
			if (ch === "%" && i + 2 < input.length) {
				let hex = input.slice(i + 1, i + 3);
				if (isHexPair(hex)) {
					output += "%" + hex.toUpperCase(), i += 2;
					continue;
				}
			}
			if (ch === "/" && (firstSegment = !1), isPathCharacter(ch) && (ch !== ":" || !firstSegment)) output += ch;
			else {
				let code = input.charCodeAt(i);
				if (code < 128) output += BYTE_HEX[code];
				else if (code < 55296 || code > 57343) output += percentEncodeNonAscii(code);
				else if (code <= 56319 && i + 1 < input.length) {
					let low = input.charCodeAt(i + 1);
					low >= 56320 && low <= 57343 ? (output += percentEncodeNonAscii(65536 + (code - 55296 << 10) + (low - 56320)), i++) : output += percentEncodeNonAscii(65533);
				} else output += percentEncodeNonAscii(65533);
			}
		}
		return output;
	}
	function encodeComponent(input, isAllowed) {
		let output = "";
		for (let i = 0; i < input.length; i++) {
			let ch = input[i];
			if (ch === "%" && i + 2 < input.length) {
				let hex = input.slice(i + 1, i + 3);
				if (isHexPair(hex)) {
					output += "%" + hex.toUpperCase(), i += 2;
					continue;
				}
			}
			if (isAllowed(ch)) output += ch;
			else {
				let code = input.charCodeAt(i);
				if (code < 128) output += BYTE_HEX[code];
				else if (code < 55296 || code > 57343) output += percentEncodeNonAscii(code);
				else if (code <= 56319 && i + 1 < input.length) {
					let low = input.charCodeAt(i + 1);
					low >= 56320 && low <= 57343 ? (output += percentEncodeNonAscii(65536 + (code - 55296 << 10) + (low - 56320)), i++) : output += percentEncodeNonAscii(65533);
				} else output += percentEncodeNonAscii(65533);
			}
		}
		return output;
	}
	function encodeUserinfo(input) {
		return encodeComponent(input, isUserinfoCharacter);
	}
	function encodeQuery(input) {
		return encodeComponent(input, isQueryFragmentCharacter);
	}
	function encodeFragment(input) {
		return encodeComponent(input, isQueryFragmentCharacter);
	}
	function isEscapeSafe(cp) {
		return cp >= 48 && cp <= 57 || cp >= 65 && cp <= 90 || cp >= 97 && cp <= 122 || cp === 42 || cp === 43 || cp === 45 || cp === 46 || cp === 47 || cp === 64 || cp === 95;
	}
	function normalizeQueryFragmentEncoding(input) {
		let output = "";
		for (let i = 0; i < input.length; i++) {
			let ch = input[i];
			if (ch === "%" && i + 2 < input.length) {
				let hex = input.slice(i + 1, i + 3);
				if (isHexPair(hex)) {
					let normalizedHex = hex.toUpperCase(), decoded = String.fromCharCode(parseInt(normalizedHex, 16));
					isUnreserved(decoded) ? output += decoded : output += "%" + normalizedHex, i += 2;
					continue;
				}
			}
			if (isQueryFragmentCharacter(ch)) output += ch;
			else {
				let code = input.charCodeAt(i);
				if (code < 128) output += isEscapeSafe(code) ? ch : BYTE_HEX[code];
				else if (code < 55296 || code > 57343) output += percentEncodeNonAscii(code);
				else if (code <= 56319 && i + 1 < input.length) {
					let low = input.charCodeAt(i + 1);
					low >= 56320 && low <= 57343 ? (output += percentEncodeNonAscii(65536 + (code - 55296 << 10) + (low - 56320)), i++) : output += percentEncodeNonAscii(65533);
				} else output += percentEncodeNonAscii(65533);
			}
		}
		return output;
	}
	function escapePreservingEscapes(input) {
		let output = "";
		for (let i = 0; i < input.length; i++) {
			if (input[i] === "%" && i + 2 < input.length) {
				let hex = input.slice(i + 1, i + 3);
				if (isHexPair(hex)) {
					output += "%" + hex.toUpperCase(), i += 2;
					continue;
				}
			}
			output += escape(input[i]);
		}
		return output;
	}
	function recomposeAuthority(component) {
		let uriTokens = [];
		if (component.userinfo !== void 0 && (uriTokens.push(encodeUserinfo(component.userinfo)), uriTokens.push("@")), component.host !== void 0) {
			let host = component.host;
			if (!isIPv4(host)) {
				let ipV6res = normalizeIPv6(host);
				ipV6res.isIPV6 !== !0 && ipV6res.isIPVFuture !== !0 && (host = normalizePercentEncoding(host, !0), ipV6res = normalizeIPv6(host)), ipV6res.isIPV6 === !0 || ipV6res.isIPVFuture === !0 ? host = `[${ipV6res.escapedHost}]` : host = reescapeHostDelimiters(host, !1);
			}
			uriTokens.push(host);
		}
		if (typeof component.port == "number" || typeof component.port == "string") {
			let port = String(component.port);
			if (!isPort(port)) throw new TypeError("URI port is malformed.");
			uriTokens.push(":"), uriTokens.push(port);
		}
		return uriTokens.length ? uriTokens.join("") : void 0;
	}
	module.exports = {
		nonSimpleDomain,
		recomposeAuthority,
		reescapeHostDelimiters,
		normalizePercentEncoding,
		normalizePathEncoding,
		serializePathEncoding,
		normalizeQueryFragmentEncoding,
		encodeUserinfo,
		encodeQuery,
		encodeFragment,
		escapePreservingEscapes,
		removeDotSegments,
		isIPv4,
		isUUID,
		normalizeIPv6,
		stringArrayToHexStripped
	};
})), require_schemes = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let { isUUID } = require_utils(), URN_REG = /^([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-./:;=@]|%[\da-f]{2})+)$/iu, supportedSchemeNames = [
		"http",
		"https",
		"ws",
		"wss",
		"urn",
		"urn:uuid"
	];
	function isValidSchemeName(name) {
		return supportedSchemeNames.indexOf(name) !== -1;
	}
	function wsIsSecure(wsComponent) {
		return wsComponent.secure === !0 ? !0 : wsComponent.secure === !1 ? !1 : wsComponent.scheme ? wsComponent.scheme.length === 3 && (wsComponent.scheme[0] === "w" || wsComponent.scheme[0] === "W") && (wsComponent.scheme[1] === "s" || wsComponent.scheme[1] === "S") && (wsComponent.scheme[2] === "s" || wsComponent.scheme[2] === "S") : !1;
	}
	function httpParse(component) {
		return component.host || (component.error = component.error || "HTTP URIs must have a host."), component;
	}
	function httpSerialize(component) {
		let secure = String(component.scheme).toLowerCase() === "https";
		return (component.port === (secure ? 443 : 80) || component.port === "") && (component.port = void 0), component.path || (component.path = "/"), component;
	}
	function wsParse(wsComponent) {
		return wsComponent.secure = wsIsSecure(wsComponent), wsComponent.resourceName = (wsComponent.path || "/") + (wsComponent.query ? "?" + wsComponent.query : ""), wsComponent.path = void 0, wsComponent.query = void 0, wsComponent;
	}
	function wsSerialize(wsComponent) {
		if ((wsComponent.port === (wsIsSecure(wsComponent) ? 443 : 80) || wsComponent.port === "") && (wsComponent.port = void 0), typeof wsComponent.secure == "boolean" && (wsComponent.scheme = wsComponent.secure ? "wss" : "ws", wsComponent.secure = void 0), wsComponent.resourceName) {
			let queryIndex = wsComponent.resourceName.indexOf("?"), path = queryIndex === -1 ? wsComponent.resourceName : wsComponent.resourceName.slice(0, queryIndex);
			wsComponent.path = path && path !== "/" ? path : void 0, wsComponent.query = queryIndex === -1 ? void 0 : wsComponent.resourceName.slice(queryIndex + 1), wsComponent.resourceName = void 0;
		}
		return wsComponent.fragment = void 0, wsComponent;
	}
	function urnParse(urnComponent, options) {
		if (!urnComponent.path)
			return urnComponent.error = "URN can not be parsed", urnComponent;
		let matches = urnComponent.path.match(URN_REG);
		if (matches && matches[0] === urnComponent.path) {
			let scheme = options.scheme || urnComponent.scheme || "urn";
			urnComponent.nid = matches[1].toLowerCase(), urnComponent.nss = matches[2];
			let schemeHandler = getSchemeHandler(`${scheme}:${options.nid || urnComponent.nid}`);
			urnComponent.path = void 0, schemeHandler && (urnComponent = schemeHandler.parse(urnComponent, options));
		} else urnComponent.error = urnComponent.error || "URN can not be parsed.";
		return urnComponent;
	}
	function urnSerialize(urnComponent, options) {
		if (urnComponent.nid === void 0) throw new Error("URN without nid cannot be serialized");
		let scheme = options.scheme || urnComponent.scheme || "urn", nid = urnComponent.nid.toLowerCase(), schemeHandler = getSchemeHandler(`${scheme}:${options.nid || nid}`);
		schemeHandler && (urnComponent = schemeHandler.serialize(urnComponent, options));
		let uriComponent = urnComponent, nss = urnComponent.nss;
		return uriComponent.path = `${nid || options.nid}:${nss}`, options.skipEscape = !0, uriComponent;
	}
	function urnuuidParse(urnComponent, options) {
		let uuidComponent = urnComponent;
		return uuidComponent.uuid = uuidComponent.nss, uuidComponent.nss = void 0, !options.tolerant && (!uuidComponent.uuid || !isUUID(uuidComponent.uuid)) && (uuidComponent.error = uuidComponent.error || "UUID is not valid."), uuidComponent;
	}
	function urnuuidSerialize(uuidComponent) {
		let urnComponent = uuidComponent;
		return urnComponent.nss = (uuidComponent.uuid || "").toLowerCase(), urnComponent;
	}
	let http = {
		scheme: "http",
		domainHost: !0,
		parse: httpParse,
		serialize: httpSerialize
	}, https = {
		scheme: "https",
		domainHost: http.domainHost,
		parse: httpParse,
		serialize: httpSerialize
	}, ws = {
		scheme: "ws",
		domainHost: !0,
		parse: wsParse,
		serialize: wsSerialize
	}, wss = {
		scheme: "wss",
		domainHost: ws.domainHost,
		parse: ws.parse,
		serialize: ws.serialize
	}, SCHEMES = {
		http,
		https,
		ws,
		wss,
		urn: {
			scheme: "urn",
			parse: urnParse,
			serialize: urnSerialize,
			skipNormalize: !0
		},
		"urn:uuid": {
			scheme: "urn:uuid",
			parse: urnuuidParse,
			serialize: urnuuidSerialize,
			skipNormalize: !0
		}
	};
	Object.setPrototypeOf(SCHEMES, null);
	function getSchemeHandler(scheme) {
		return scheme && (SCHEMES[scheme] || SCHEMES[scheme.toLowerCase()]) || void 0;
	}
	module.exports = {
		wsIsSecure,
		SCHEMES,
		isValidSchemeName,
		getSchemeHandler
	};
})), require_fast_uri = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	let { normalizeIPv6, removeDotSegments, recomposeAuthority, normalizePercentEncoding, normalizePathEncoding, serializePathEncoding, normalizeQueryFragmentEncoding, encodeQuery, encodeFragment, reescapeHostDelimiters, isIPv4, nonSimpleDomain } = require_utils(), { SCHEMES, getSchemeHandler } = require_schemes(), VALID_SCHEME = /^[A-Za-z][A-Za-z0-9+.-]*$/u, MALFORMED_SCHEME_ERROR = "URI scheme is malformed.";
	function decodeValidScheme(scheme) {
		let decodedScheme = unescape(String(scheme));
		if (!VALID_SCHEME.test(decodedScheme)) throw new TypeError(MALFORMED_SCHEME_ERROR);
		return decodedScheme;
	}
	function normalize(uri, options) {
		return typeof uri == "string" ? uri = normalizeString(uri, options) : typeof uri == "object" && (uri = parse(serialize(uri, options), options)), uri;
	}
	function resolve(baseURI, relativeURI, options) {
		let schemelessOptions = options ? Object.assign({ scheme: "null" }, options) : { scheme: "null" }, { parsed: baseParsed, malformedAuthorityOrPort: baseMalformed, malformedPercentEncoding: baseMalformedPercentEncoding, malformedSchemeSpecific: baseMalformedSchemeSpecific, malformedHost: baseMalformedHost, malformedScheme: baseMalformedScheme } = parseWithStatus(baseURI, schemelessOptions), { parsed: relativeParsed, malformedAuthorityOrPort: relativeMalformed, malformedPercentEncoding: relativeMalformedPercentEncoding, malformedSchemeSpecific: relativeMalformedSchemeSpecific, malformedHost: relativeMalformedHost, malformedScheme: relativeMalformedScheme } = parseWithStatus(relativeURI, schemelessOptions);
		if (baseMalformed || relativeMalformed || baseMalformedPercentEncoding || relativeMalformedPercentEncoding || baseMalformedSchemeSpecific || relativeMalformedSchemeSpecific || baseMalformedHost || relativeMalformedHost || baseMalformedScheme || relativeMalformedScheme) throw new Error(baseParsed.error || relativeParsed.error || "URI is malformed.");
		let resolved = resolveComponent(baseParsed, relativeParsed, schemelessOptions, !0), resolvedSchemeHandler = getSchemeHandler(options && options.scheme || resolved.scheme), resolvedHost = resolved.host, resolvedHostIsIP = resolvedHost !== void 0 && resolvedHost !== "" && (isIPv4(resolvedHost) || normalizeIPv6(resolvedHost).isIPV6);
		canonicalizeHost(resolved, options || {}, resolvedSchemeHandler, resolvedHostIsIP);
		let encodedASCIIHost = resolvedHost && resolvedHost.indexOf("%") !== -1 && !new RegExp("\\P{ASCII}", "u").test(resolvedHost);
		if (resolved.error && !encodedASCIIHost) throw new Error(resolved.error);
		return schemelessOptions.skipEscape = !0, serialize(resolved, schemelessOptions);
	}
	function resolveComponent(base, relative, options, skipNormalization) {
		let target = {};
		return skipNormalization || (base = parse(serialize(base, options), options), relative = parse(serialize(relative, options), options)), options = options || {}, !options.tolerant && relative.scheme ? (target.scheme = relative.scheme, target.userinfo = relative.userinfo, target.host = relative.host, target.port = relative.port, target.path = removeDotSegments(relative.path || ""), target.query = relative.query) : (relative.userinfo !== void 0 || relative.host !== void 0 || relative.port !== void 0 ? (target.userinfo = relative.userinfo, target.host = relative.host, target.port = relative.port, target.path = removeDotSegments(relative.path || ""), target.query = relative.query) : (relative.path ? (relative.path[0] === "/" ? target.path = removeDotSegments(relative.path) : ((base.userinfo !== void 0 || base.host !== void 0 || base.port !== void 0) && !base.path ? target.path = "/" + relative.path : base.path ? target.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative.path : target.path = relative.path, target.path = removeDotSegments(target.path)), target.query = relative.query) : (target.path = base.path, relative.query !== void 0 ? target.query = relative.query : target.query = base.query), target.userinfo = base.userinfo, target.host = base.host, target.port = base.port), target.scheme = base.scheme), target.fragment = relative.fragment, target;
	}
	function equal(uriA, uriB, options) {
		let normalizedA = normalizeComparableURI(uriA, options), normalizedB = normalizeComparableURI(uriB, options);
		return normalizedA !== void 0 && normalizedB !== void 0 && normalizedA === normalizedB;
	}
	function serialize(cmpts, opts) {
		let component = {
			host: cmpts.host,
			scheme: cmpts.scheme,
			userinfo: cmpts.userinfo,
			port: cmpts.port,
			path: cmpts.path,
			query: cmpts.query,
			nid: cmpts.nid,
			nss: cmpts.nss,
			uuid: cmpts.uuid,
			fragment: cmpts.fragment,
			reference: cmpts.reference,
			resourceName: cmpts.resourceName,
			secure: cmpts.secure,
			error: ""
		}, options = Object.assign({}, opts), uriTokens = [];
		component.scheme && (component.scheme = decodeValidScheme(component.scheme));
		let schemeHandler = getSchemeHandler(options.scheme || component.scheme);
		schemeHandler && schemeHandler.serialize && schemeHandler.serialize(component, options);
		let hasAuthority = component.userinfo !== void 0 || component.host !== void 0 || component.port !== void 0, pathNoScheme = !options.skipEscape && component.scheme === void 0 && !hasAuthority;
		component.path !== void 0 && (options.skipEscape ? component.path = normalizePercentEncoding(component.path) : component.path = serializePathEncoding(component.path, pathNoScheme)), options.reference !== "suffix" && component.scheme && (component.scheme = decodeValidScheme(component.scheme), uriTokens.push(component.scheme, ":"));
		let authority = recomposeAuthority(component);
		if (authority !== void 0 && (options.reference !== "suffix" && uriTokens.push("//"), uriTokens.push(authority), component.path && component.path[0] !== "/" && uriTokens.push("/")), component.path !== void 0) {
			let s = component.path;
			!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath) && (s = removeDotSegments(s)), pathNoScheme && (s = serializePathEncoding(s, !0)), authority === void 0 && s[0] === "/" && s[1] === "/" && (s = "/%2F" + s.slice(2)), uriTokens.push(s);
		}
		return component.query !== void 0 && uriTokens.push("?", encodeQuery(component.query)), component.fragment !== void 0 && uriTokens.push("#", encodeFragment(component.fragment)), uriTokens.join("");
	}
	let URI_PARSE = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u, AUTHORITY_PREFIX = /^(?:[^#/:?]+:)?\/\/([^/?#]*)/, AUTHORITY_INTRODUCER_REGION = /^(?:[^#/:?]+:)?([/\\\t\n\r]*)/;
	function getParseError(parsed, matches) {
		if (matches[2] !== void 0 && parsed.path && parsed.path[0] !== "/") return 'URI path must start with "/" when authority is present.';
		if (typeof parsed.port == "number" && (parsed.port < 0 || parsed.port > 65535)) return "URI port is malformed.";
	}
	function hasMalformedPercentEncoding(component) {
		if (component === void 0) return !1;
		let percent = component.indexOf("%");
		for (; percent !== -1; ) {
			if (percent + 2 >= component.length || !/^[\da-f]{2}$/iu.test(component.slice(percent + 1, percent + 3))) return !0;
			percent = component.indexOf("%", percent + 3);
		}
		return !1;
	}
	function isIPLiteral(host) {
		return host[0] === "[" && host[host.length - 1] === "]";
	}
	function hasMalformedComponentPercentEncoding(matches) {
		let host = matches[4];
		return hasMalformedPercentEncoding(matches[3]) || host !== void 0 && !isIPLiteral(host) && hasMalformedPercentEncoding(host) || hasMalformedPercentEncoding(matches[6]) || hasMalformedPercentEncoding(matches[7]) || hasMalformedPercentEncoding(matches[8]);
	}
	function canonicalizeHost(parsed, options, schemeHandler, isIP) {
		if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport) && parsed.host && !isIPLiteral(parsed.host) && (options.domainHost || schemeHandler && schemeHandler.domainHost) && isIP === !1 && nonSimpleDomain(parsed.host)) try {
			parsed.host = new URL("http://" + parsed.host).hostname;
		} catch (e) {
			return parsed.error = parsed.error || "Host's domain name can not be converted to ASCII: " + e, !0;
		}
		return !1;
	}
	function parseWithStatus(uri, opts) {
		let options = Object.assign({}, opts), parsed = {
			scheme: void 0,
			userinfo: void 0,
			host: "",
			port: void 0,
			path: "",
			query: void 0,
			fragment: void 0
		}, malformedAuthorityOrPort = !1, malformedPercentEncoding = !1, malformedSchemeSpecific = !1, malformedHost = !1, malformedIPLiteral = !1, malformedScheme = !1, isIP = !1;
		options.reference === "suffix" && (options.scheme ? uri = options.scheme + ":" + uri : uri = "//" + uri);
		let authorityMatch = uri.match(AUTHORITY_PREFIX);
		authorityMatch !== null && authorityMatch[1].indexOf("\\") !== -1 && (parsed.error = "URI authority must not contain a literal backslash.", malformedAuthorityOrPort = !0);
		let introducerMatch = uri.match(AUTHORITY_INTRODUCER_REGION);
		if (introducerMatch !== null) {
			let region = introducerMatch[1], normalizedRegion = region.replace(/[\t\n\r]/g, "");
			normalizedRegion.length >= 2 && (normalizedRegion.slice(0, 2) !== "//" ? (parsed.error = parsed.error || "URI authority must not contain a literal backslash.", malformedAuthorityOrPort = !0) : region.length !== normalizedRegion.length && (parsed.error = parsed.error || "URI authority introducer must not contain whitespace.", malformedAuthorityOrPort = !0));
		}
		let matches = uri.match(URI_PARSE);
		if (matches) {
			if (parsed.scheme = matches[1], parsed.userinfo = matches[3], parsed.host = matches[4], parsed.port = parseInt(matches[5], 10), parsed.path = matches[6] || "", parsed.query = matches[7], parsed.fragment = matches[8], parsed.scheme !== void 0) {
				let decodedScheme = unescape(parsed.scheme);
				VALID_SCHEME.test(decodedScheme) ? parsed.scheme = decodedScheme.toLowerCase() : (parsed.error = parsed.error || MALFORMED_SCHEME_ERROR, malformedScheme = !0);
			}
			malformedPercentEncoding = hasMalformedComponentPercentEncoding(matches), malformedPercentEncoding && (parsed.error = parsed.error || "URI contains malformed percent-encoding."), isNaN(parsed.port) && (parsed.port = matches[5]);
			let parseError = getParseError(parsed, matches);
			if (parseError !== void 0 && (parsed.error = parsed.error || parseError, malformedAuthorityOrPort = !0), parsed.host) if (isIPv4(parsed.host) === !1) {
				let bracketedIPLiteral = isIPLiteral(parsed.host), hasIPLiteralBracket = parsed.host.indexOf("[") !== -1 || parsed.host.indexOf("]") !== -1, ipv6result = normalizeIPv6(parsed.host);
				isIP = ipv6result.isIPV6 || ipv6result.isIPVFuture === !0, malformedIPLiteral = hasIPLiteralBracket && (!bracketedIPLiteral || ipv6result.error === !0), parsed.host = isIP ? ipv6result.host : ipv6result.host.toLowerCase(), malformedIPLiteral && (parsed.error = parsed.error || "URI host is malformed.", malformedAuthorityOrPort = !0);
			} else isIP = !0;
			parsed.scheme === void 0 && parsed.userinfo === void 0 && parsed.host === void 0 && parsed.port === void 0 && parsed.query === void 0 && !parsed.path ? parsed.reference = "same-document" : parsed.scheme === void 0 ? parsed.reference = "relative" : parsed.fragment === void 0 ? parsed.reference = "absolute" : parsed.reference = "uri", options.reference && options.reference !== "suffix" && options.reference !== parsed.reference && (parsed.error = parsed.error || "URI is not a " + options.reference + " reference.");
			let schemeHandler = getSchemeHandler(options.scheme || parsed.scheme);
			if (malformedIPLiteral || (malformedHost = canonicalizeHost(parsed, options, schemeHandler, isIP)), uri.indexOf("%") !== -1 && parsed.host !== void 0 && !malformedIPLiteral) {
				let host = isIP ? parsed.host : normalizePercentEncoding(parsed.host, !0);
				isIP || (host = normalizePercentEncoding(host.toLowerCase())), parsed.host = reescapeHostDelimiters(host, isIP);
			}
			(!schemeHandler || schemeHandler && !schemeHandler.skipNormalize) && (parsed.path && (parsed.path = normalizePathEncoding(parsed.path)), parsed.query && (parsed.query = normalizeQueryFragmentEncoding(parsed.query)), parsed.fragment && (parsed.fragment = normalizeQueryFragmentEncoding(parsed.fragment))), schemeHandler && schemeHandler.parse && (schemeHandler.parse(parsed, options), schemeHandler === SCHEMES.urn && parsed.nid === void 0 && (malformedSchemeSpecific = !0));
		} else parsed.error = parsed.error || "URI can not be parsed.";
		return {
			parsed,
			malformedAuthorityOrPort,
			malformedPercentEncoding,
			malformedSchemeSpecific,
			malformedHost,
			malformedScheme
		};
	}
	function parse(uri, opts) {
		return parseWithStatus(uri, opts).parsed;
	}
	function normalizeString(uri, opts) {
		return normalizeStringWithStatus(uri, opts).normalized;
	}
	function normalizeStringWithStatus(uri, opts) {
		let { parsed, malformedAuthorityOrPort, malformedPercentEncoding, malformedSchemeSpecific, malformedHost, malformedScheme } = parseWithStatus(uri, opts);
		return {
			normalized: malformedAuthorityOrPort || malformedPercentEncoding || malformedSchemeSpecific || malformedHost || malformedScheme ? uri : serialize(parsed, opts),
			malformedAuthorityOrPort,
			malformedPercentEncoding,
			malformedSchemeSpecific,
			malformedHost,
			malformedScheme
		};
	}
	function normalizeComparableURI(uri, opts) {
		if (typeof uri != "string" && typeof uri != "object") return;
		let value;
		try {
			value = typeof uri == "string" ? uri : serialize(uri, opts);
		} catch {
			return;
		}
		let { normalized, malformedAuthorityOrPort, malformedPercentEncoding, malformedSchemeSpecific, malformedHost, malformedScheme } = normalizeStringWithStatus(value, opts);
		return malformedAuthorityOrPort || malformedPercentEncoding || malformedSchemeSpecific || malformedHost || malformedScheme ? void 0 : normalized;
	}
	let fastUri = {
		SCHEMES,
		normalize,
		resolve,
		resolveComponent,
		equal,
		serialize,
		parse
	};
	module.exports = fastUri, module.exports.default = fastUri, module.exports.fastUri = fastUri;
})), require_uri = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let uri = require_fast_uri();
	uri.code = 'require("ajv/dist/runtime/uri").default', exports.default = uri;
})), require_core$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
	var validate_1 = require_validate();
	Object.defineProperty(exports, "KeywordCxt", {
		enumerable: !0,
		get: function() {
			return validate_1.KeywordCxt;
		}
	});
	var codegen_1 = require_codegen();
	Object.defineProperty(exports, "_", {
		enumerable: !0,
		get: function() {
			return codegen_1._;
		}
	}), Object.defineProperty(exports, "str", {
		enumerable: !0,
		get: function() {
			return codegen_1.str;
		}
	}), Object.defineProperty(exports, "stringify", {
		enumerable: !0,
		get: function() {
			return codegen_1.stringify;
		}
	}), Object.defineProperty(exports, "nil", {
		enumerable: !0,
		get: function() {
			return codegen_1.nil;
		}
	}), Object.defineProperty(exports, "Name", {
		enumerable: !0,
		get: function() {
			return codegen_1.Name;
		}
	}), Object.defineProperty(exports, "CodeGen", {
		enumerable: !0,
		get: function() {
			return codegen_1.CodeGen;
		}
	});
	let validation_error_1 = require_validation_error(), ref_error_1 = require_ref_error(), rules_1 = require_rules(), compile_1 = require_compile(), codegen_2 = require_codegen(), resolve_1 = require_resolve(), dataType_1 = require_dataType(), util_1 = require_util(), $dataRefSchema = require_data(), uri_1 = require_uri(), defaultRegExp = (str, flags) => new RegExp(str, flags);
	defaultRegExp.code = "new RegExp";
	let META_IGNORE_OPTIONS = [
		"removeAdditional",
		"useDefaults",
		"coerceTypes"
	], EXT_SCOPE_NAMES = /* @__PURE__ */ new Set([
		"validate",
		"serialize",
		"parse",
		"wrapper",
		"root",
		"schema",
		"keyword",
		"pattern",
		"formats",
		"validate$data",
		"func",
		"obj",
		"Error"
	]), removedOptions = {
		errorDataPath: "",
		format: "`validateFormats: false` can be used instead.",
		nullable: '"nullable" keyword is supported by default.',
		jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
		extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
		missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
		processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
		sourceCode: "Use option `code: {source: true}`",
		strictDefaults: "It is default now, see option `strict`.",
		strictKeywords: "It is default now, see option `strict`.",
		uniqueItems: '"uniqueItems" keyword is always validated.',
		unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
		cache: "Map is used as cache, schema object as key.",
		serialize: "Map is used as cache, schema object as key.",
		ajvErrors: "It is default now."
	}, deprecatedOptions = {
		ignoreKeywordsWithRef: "",
		jsPropertySyntax: "",
		unicode: '"minLength"/"maxLength" account for unicode characters by default.'
	}, MAX_EXPRESSION = 200;
	function requiredOptions(o) {
		var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
		let s = o.strict, _optz = (_a = o.code) === null || _a === void 0 ? void 0 : _a.optimize, optimize = _optz === !0 || _optz === void 0 ? 1 : _optz || 0, regExp = (_c = (_b = o.code) === null || _b === void 0 ? void 0 : _b.regExp) !== null && _c !== void 0 ? _c : defaultRegExp, uriResolver = (_d = o.uriResolver) !== null && _d !== void 0 ? _d : uri_1.default;
		return {
			strictSchema: (_f = (_e = o.strictSchema) !== null && _e !== void 0 ? _e : s) !== null && _f !== void 0 ? _f : !0,
			strictNumbers: (_h = (_g = o.strictNumbers) !== null && _g !== void 0 ? _g : s) !== null && _h !== void 0 ? _h : !0,
			strictTypes: (_k = (_j = o.strictTypes) !== null && _j !== void 0 ? _j : s) !== null && _k !== void 0 ? _k : "log",
			strictTuples: (_m = (_l = o.strictTuples) !== null && _l !== void 0 ? _l : s) !== null && _m !== void 0 ? _m : "log",
			strictRequired: (_p = (_o = o.strictRequired) !== null && _o !== void 0 ? _o : s) !== null && _p !== void 0 ? _p : !1,
			code: o.code ? {
				...o.code,
				optimize,
				regExp
			} : {
				optimize,
				regExp
			},
			loopRequired: (_q = o.loopRequired) !== null && _q !== void 0 ? _q : MAX_EXPRESSION,
			loopEnum: (_r = o.loopEnum) !== null && _r !== void 0 ? _r : MAX_EXPRESSION,
			meta: (_s = o.meta) !== null && _s !== void 0 ? _s : !0,
			messages: (_t = o.messages) !== null && _t !== void 0 ? _t : !0,
			inlineRefs: (_u = o.inlineRefs) !== null && _u !== void 0 ? _u : !0,
			schemaId: (_v = o.schemaId) !== null && _v !== void 0 ? _v : "$id",
			addUsedSchema: (_w = o.addUsedSchema) !== null && _w !== void 0 ? _w : !0,
			validateSchema: (_x = o.validateSchema) !== null && _x !== void 0 ? _x : !0,
			validateFormats: (_y = o.validateFormats) !== null && _y !== void 0 ? _y : !0,
			unicodeRegExp: (_z = o.unicodeRegExp) !== null && _z !== void 0 ? _z : !0,
			int32range: (_0 = o.int32range) !== null && _0 !== void 0 ? _0 : !0,
			uriResolver
		};
	}
	var Ajv2 = class {
		constructor(opts = {}) {
			this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), opts = this.opts = {
				...opts,
				...requiredOptions(opts)
			};
			let { es5, lines } = this.opts.code;
			this.scope = new codegen_2.ValueScope({
				scope: {},
				prefixes: EXT_SCOPE_NAMES,
				es5,
				lines
			}), this.logger = getLogger(opts.logger);
			let formatOpt = opts.validateFormats;
			opts.validateFormats = !1, this.RULES = (0, rules_1.getRules)(), checkOptions.call(this, removedOptions, opts, "NOT SUPPORTED"), checkOptions.call(this, deprecatedOptions, opts, "DEPRECATED", "warn"), this._metaOpts = getMetaSchemaOptions.call(this), opts.formats && addInitialFormats.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), opts.keywords && addInitialKeywords.call(this, opts.keywords), typeof opts.meta == "object" && this.addMetaSchema(opts.meta), addInitialSchemas.call(this), opts.validateFormats = formatOpt;
		}
		_addVocabularies() {
			this.addKeyword("$async");
		}
		_addDefaultMetaSchema() {
			let { $data, meta, schemaId } = this.opts, _dataRefSchema = $dataRefSchema;
			schemaId === "id" && (_dataRefSchema = { ...$dataRefSchema }, _dataRefSchema.id = _dataRefSchema.$id, delete _dataRefSchema.$id), meta && $data && this.addMetaSchema(_dataRefSchema, _dataRefSchema[schemaId], !1);
		}
		defaultMeta() {
			let { meta, schemaId } = this.opts;
			return this.opts.defaultMeta = typeof meta == "object" ? meta[schemaId] || meta : void 0;
		}
		validate(schemaKeyRef, data) {
			let v;
			if (typeof schemaKeyRef == "string") {
				if (v = this.getSchema(schemaKeyRef), !v) throw new Error(`no schema with key or ref "${schemaKeyRef}"`);
			} else v = this.compile(schemaKeyRef);
			let valid = v(data);
			return "$async" in v || (this.errors = v.errors), valid;
		}
		compile(schema, _meta) {
			let sch = this._addSchema(schema, _meta);
			return sch.validate || this._compileSchemaEnv(sch);
		}
		compileAsync(schema, meta) {
			if (typeof this.opts.loadSchema != "function") throw new Error("options.loadSchema should be a function");
			let { loadSchema } = this.opts;
			return runCompileAsync.call(this, schema, meta);
			async function runCompileAsync(_schema, _meta) {
				await loadMetaSchema.call(this, _schema.$schema);
				let sch = this._addSchema(_schema, _meta);
				return sch.validate || _compileAsync.call(this, sch);
			}
			async function loadMetaSchema($ref) {
				$ref && !this.getSchema($ref) && await runCompileAsync.call(this, { $ref }, !0);
			}
			async function _compileAsync(sch) {
				try {
					return this._compileSchemaEnv(sch);
				} catch (e) {
					if (!(e instanceof ref_error_1.default)) throw e;
					return checkLoaded.call(this, e), await loadMissingSchema.call(this, e.missingSchema), _compileAsync.call(this, sch);
				}
			}
			function checkLoaded({ missingSchema: ref, missingRef }) {
				if (this.refs[ref]) throw new Error(`AnySchema ${ref} is loaded but ${missingRef} cannot be resolved`);
			}
			async function loadMissingSchema(ref) {
				let _schema = await _loadSchema.call(this, ref);
				this.refs[ref] || await loadMetaSchema.call(this, _schema.$schema), this.refs[ref] || this.addSchema(_schema, ref, meta);
			}
			async function _loadSchema(ref) {
				let p = this._loading[ref];
				if (p) return p;
				try {
					return await (this._loading[ref] = loadSchema(ref));
				} finally {
					delete this._loading[ref];
				}
			}
		}
		addSchema(schema, key, _meta, _validateSchema = this.opts.validateSchema) {
			if (Array.isArray(schema)) {
				for (let sch of schema) this.addSchema(sch, void 0, _meta, _validateSchema);
				return this;
			}
			let id;
			if (typeof schema == "object") {
				let { schemaId } = this.opts;
				if (id = schema[schemaId], id !== void 0 && typeof id != "string") throw new Error(`schema ${schemaId} must be string`);
			}
			return key = (0, resolve_1.normalizeId)(key || id), this._checkUnique(key), this.schemas[key] = this._addSchema(schema, _meta, key, _validateSchema, !0), this;
		}
		addMetaSchema(schema, key, _validateSchema = this.opts.validateSchema) {
			return this.addSchema(schema, key, !0, _validateSchema), this;
		}
		validateSchema(schema, throwOrLogError) {
			if (typeof schema == "boolean") return !0;
			let $schema;
			if ($schema = schema.$schema, $schema !== void 0 && typeof $schema != "string") throw new Error("$schema must be a string");
			if ($schema = $schema || this.opts.defaultMeta || this.defaultMeta(), !$schema)
				return this.logger.warn("meta-schema not available"), this.errors = null, !0;
			let valid = this.validate($schema, schema);
			if (!valid && throwOrLogError) {
				let message = "schema is invalid: " + this.errorsText();
				if (this.opts.validateSchema === "log") this.logger.error(message);
				else throw new Error(message);
			}
			return valid;
		}
		getSchema(keyRef) {
			let sch;
			for (; typeof (sch = getSchEnv.call(this, keyRef)) == "string"; ) keyRef = sch;
			if (sch === void 0) {
				let { schemaId } = this.opts, root = new compile_1.SchemaEnv({
					schema: {},
					schemaId
				});
				if (sch = compile_1.resolveSchema.call(this, root, keyRef), !sch) return;
				this.refs[keyRef] = sch;
			}
			return sch.validate || this._compileSchemaEnv(sch);
		}
		removeSchema(schemaKeyRef) {
			if (schemaKeyRef instanceof RegExp)
				return this._removeAllSchemas(this.schemas, schemaKeyRef), this._removeAllSchemas(this.refs, schemaKeyRef), this;
			switch (typeof schemaKeyRef) {
				case "undefined":
					return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
				case "string": {
					let sch = getSchEnv.call(this, schemaKeyRef);
					return typeof sch == "object" && this._cache.delete(sch.schema), delete this.schemas[schemaKeyRef], delete this.refs[schemaKeyRef], this;
				}
				case "object": {
					let cacheKey = schemaKeyRef;
					this._cache.delete(cacheKey);
					let id = schemaKeyRef[this.opts.schemaId];
					return id && (id = (0, resolve_1.normalizeId)(id), delete this.schemas[id], delete this.refs[id]), this;
				}
				default:
					throw new Error("ajv.removeSchema: invalid parameter");
			}
		}
		addVocabulary(definitions) {
			for (let def of definitions) this.addKeyword(def);
			return this;
		}
		addKeyword(kwdOrDef, def) {
			let keyword;
			if (typeof kwdOrDef == "string")
				keyword = kwdOrDef, typeof def == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), def.keyword = keyword);
			else if (typeof kwdOrDef == "object" && def === void 0) {
				if (def = kwdOrDef, keyword = def.keyword, Array.isArray(keyword) && !keyword.length) throw new Error("addKeywords: keyword must be string or non-empty array");
			} else throw new Error("invalid addKeywords parameters");
			if (checkKeyword.call(this, keyword, def), !def)
				return (0, util_1.eachItem)(keyword, (kwd) => addRule.call(this, kwd)), this;
			keywordMetaschema.call(this, def);
			let definition = {
				...def,
				type: (0, dataType_1.getJSONTypes)(def.type),
				schemaType: (0, dataType_1.getJSONTypes)(def.schemaType)
			};
			return (0, util_1.eachItem)(keyword, definition.type.length === 0 ? (k) => addRule.call(this, k, definition) : (k) => definition.type.forEach((t) => addRule.call(this, k, definition, t))), this;
		}
		getKeyword(keyword) {
			let rule = this.RULES.all[keyword];
			return typeof rule == "object" ? rule.definition : !!rule;
		}
		removeKeyword(keyword) {
			let { RULES } = this;
			delete RULES.keywords[keyword], delete RULES.all[keyword];
			for (let group of RULES.rules) {
				let i = group.rules.findIndex((rule) => rule.keyword === keyword);
				i >= 0 && group.rules.splice(i, 1);
			}
			return this;
		}
		addFormat(name, format) {
			return typeof format == "string" && (format = new RegExp(format)), this.formats[name] = format, this;
		}
		errorsText(errors = this.errors, { separator = ", ", dataVar = "data" } = {}) {
			return !errors || errors.length === 0 ? "No errors" : errors.map((e) => `${dataVar}${e.instancePath} ${e.message}`).reduce((text, msg) => text + separator + msg);
		}
		$dataMetaSchema(metaSchema, keywordsJsonPointers) {
			let rules = this.RULES.all;
			metaSchema = JSON.parse(JSON.stringify(metaSchema));
			for (let jsonPointer of keywordsJsonPointers) {
				let segments = jsonPointer.split("/").slice(1), keywords = metaSchema;
				for (let seg of segments) keywords = keywords[seg];
				for (let key in rules) {
					let rule = rules[key];
					if (typeof rule != "object") continue;
					let { $data } = rule.definition, schema = keywords[key];
					$data && schema && (keywords[key] = schemaOrData(schema));
				}
			}
			return metaSchema;
		}
		_removeAllSchemas(schemas, regex) {
			for (let keyRef in schemas) {
				let sch = schemas[keyRef];
				(!regex || regex.test(keyRef)) && (typeof sch == "string" ? delete schemas[keyRef] : sch && !sch.meta && (this._cache.delete(sch.schema), delete schemas[keyRef]));
			}
		}
		_addSchema(schema, meta, baseId, validateSchema = this.opts.validateSchema, addSchema = this.opts.addUsedSchema) {
			let id, { schemaId } = this.opts;
			if (typeof schema == "object") id = schema[schemaId];
			else {
				if (this.opts.jtd) throw new Error("schema must be object");
				if (typeof schema != "boolean") throw new Error("schema must be object or boolean");
			}
			let sch = this._cache.get(schema);
			if (sch !== void 0) return sch;
			baseId = (0, resolve_1.normalizeId)(id || baseId);
			let localRefs = resolve_1.getSchemaRefs.call(this, schema, baseId);
			return sch = new compile_1.SchemaEnv({
				schema,
				schemaId,
				meta,
				baseId,
				localRefs
			}), this._cache.set(sch.schema, sch), addSchema && !baseId.startsWith("#") && (baseId && this._checkUnique(baseId), this.refs[baseId] = sch), validateSchema && this.validateSchema(schema, !0), sch;
		}
		_checkUnique(id) {
			if (this.schemas[id] || this.refs[id]) throw new Error(`schema with key or id "${id}" already exists`);
		}
		_compileSchemaEnv(sch) {
			if (sch.meta ? this._compileMetaSchema(sch) : compile_1.compileSchema.call(this, sch), !sch.validate) throw new Error("ajv implementation error");
			return sch.validate;
		}
		_compileMetaSchema(sch) {
			let currentOpts = this.opts;
			this.opts = this._metaOpts;
			try {
				compile_1.compileSchema.call(this, sch);
			} finally {
				this.opts = currentOpts;
			}
		}
	};
	Ajv2.ValidationError = validation_error_1.default, Ajv2.MissingRefError = ref_error_1.default, exports.default = Ajv2;
	function checkOptions(checkOpts, options, msg, log = "error") {
		for (let key in checkOpts) {
			let opt = key;
			opt in options && this.logger[log](`${msg}: option ${key}. ${checkOpts[opt]}`);
		}
	}
	function getSchEnv(keyRef) {
		return keyRef = (0, resolve_1.normalizeId)(keyRef), this.schemas[keyRef] || this.refs[keyRef];
	}
	function addInitialSchemas() {
		let optsSchemas = this.opts.schemas;
		if (optsSchemas)
			if (Array.isArray(optsSchemas)) this.addSchema(optsSchemas);
			else for (let key in optsSchemas) this.addSchema(optsSchemas[key], key);
	}
	function addInitialFormats() {
		for (let name in this.opts.formats) {
			let format = this.opts.formats[name];
			format && this.addFormat(name, format);
		}
	}
	function addInitialKeywords(defs) {
		if (Array.isArray(defs)) {
			this.addVocabulary(defs);
			return;
		}
		this.logger.warn("keywords option as map is deprecated, pass array");
		for (let keyword in defs) {
			let def = defs[keyword];
			def.keyword || (def.keyword = keyword), this.addKeyword(def);
		}
	}
	function getMetaSchemaOptions() {
		let metaOpts = { ...this.opts };
		for (let opt of META_IGNORE_OPTIONS) delete metaOpts[opt];
		return metaOpts;
	}
	let noLogs = {
		log() {
		},
		warn() {
		},
		error() {
		}
	};
	function getLogger(logger) {
		if (logger === !1) return noLogs;
		if (logger === void 0) return console;
		if (logger.log && logger.warn && logger.error) return logger;
		throw new Error("logger must implement log, warn and error methods");
	}
	let KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
	function checkKeyword(keyword, def) {
		let { RULES } = this;
		if ((0, util_1.eachItem)(keyword, (kwd) => {
			if (RULES.keywords[kwd]) throw new Error(`Keyword ${kwd} is already defined`);
			if (!KEYWORD_NAME.test(kwd)) throw new Error(`Keyword ${kwd} has invalid name`);
		}), !!def && def.$data && !("code" in def || "validate" in def))
			throw new Error('$data keyword must have "code" or "validate" function');
	}
	function addRule(keyword, definition, dataType) {
		var _a;
		let post = definition?.post;
		if (dataType && post) throw new Error('keyword with "post" flag cannot have "type"');
		let { RULES } = this, ruleGroup = post ? RULES.post : RULES.rules.find(({ type: t }) => t === dataType);
		if (ruleGroup || (ruleGroup = {
			type: dataType,
			rules: []
		}, RULES.rules.push(ruleGroup)), RULES.keywords[keyword] = !0, !definition) return;
		let rule = {
			keyword,
			definition: {
				...definition,
				type: (0, dataType_1.getJSONTypes)(definition.type),
				schemaType: (0, dataType_1.getJSONTypes)(definition.schemaType)
			}
		};
		definition.before ? addBeforeRule.call(this, ruleGroup, rule, definition.before) : ruleGroup.rules.push(rule), RULES.all[keyword] = rule, (_a = definition.implements) === null || _a === void 0 || _a.forEach((kwd) => this.addKeyword(kwd));
	}
	function addBeforeRule(ruleGroup, rule, before) {
		let i = ruleGroup.rules.findIndex((_rule) => _rule.keyword === before);
		i >= 0 ? ruleGroup.rules.splice(i, 0, rule) : (ruleGroup.rules.push(rule), this.logger.warn(`rule ${before} is not defined`));
	}
	function keywordMetaschema(def) {
		let { metaSchema } = def;
		metaSchema !== void 0 && (def.$data && this.opts.$data && (metaSchema = schemaOrData(metaSchema)), def.validateSchema = this.compile(metaSchema, !0));
	}
	let $dataRef = { $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#" };
	function schemaOrData(schema) {
		return { anyOf: [schema, $dataRef] };
	}
})), require_id = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let def = {
		keyword: "id",
		code() {
			throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
		}
	};
	exports.default = def;
})), require_ref = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.callRef = exports.getValidate = void 0;
	let ref_error_1 = require_ref_error(), code_1 = require_code(), codegen_1 = require_codegen(), names_1 = require_names(), compile_1 = require_compile(), util_1 = require_util(), def = {
		keyword: "$ref",
		schemaType: "string",
		code(cxt) {
			let { gen, schema: $ref, it } = cxt, { baseId, schemaEnv: env, validateName, opts, self } = it, { root } = env;
			if (($ref === "#" || $ref === "#/") && baseId === root.baseId) return callRootRef();
			let schOrEnv = compile_1.resolveRef.call(self, root, baseId, $ref);
			if (schOrEnv === void 0) throw new ref_error_1.default(it.opts.uriResolver, baseId, $ref);
			if (schOrEnv instanceof compile_1.SchemaEnv) return callValidate(schOrEnv);
			return inlineRefSchema(schOrEnv);
			function callRootRef() {
				if (env === root) return callRef(cxt, validateName, env, env.$async);
				let rootName = gen.scopeValue("root", { ref: root });
				return callRef(cxt, (0, codegen_1._)`${rootName}.validate`, root, root.$async);
			}
			function callValidate(sch) {
				callRef(cxt, getValidate(cxt, sch), sch, sch.$async);
			}
			function inlineRefSchema(sch) {
				let schName = gen.scopeValue("schema", opts.code.source === !0 ? {
					ref: sch,
					code: (0, codegen_1.stringify)(sch)
				} : { ref: sch }), valid = gen.name("valid"), schCxt = cxt.subschema({
					schema: sch,
					dataTypes: [],
					schemaPath: codegen_1.nil,
					topSchemaRef: schName,
					errSchemaPath: $ref
				}, valid);
				cxt.mergeEvaluated(schCxt), cxt.ok(valid);
			}
		}
	};
	function getValidate(cxt, sch) {
		let { gen } = cxt;
		return sch.validate ? gen.scopeValue("validate", { ref: sch.validate }) : (0, codegen_1._)`${gen.scopeValue("wrapper", { ref: sch })}.validate`;
	}
	exports.getValidate = getValidate;
	function callRef(cxt, v, sch, $async) {
		let { gen, it } = cxt, { allErrors, schemaEnv: env, opts } = it, passCxt = opts.passContext ? names_1.default.this : codegen_1.nil;
		$async ? callAsyncRef() : callSyncRef();
		function callAsyncRef() {
			if (!env.$async) throw new Error("async schema referenced by sync schema");
			let valid = gen.let("valid");
			gen.try(() => {
				gen.code((0, codegen_1._)`await ${(0, code_1.callValidateCode)(cxt, v, passCxt)}`), addEvaluatedFrom(v), allErrors || gen.assign(valid, !0);
			}, (e) => {
				gen.if((0, codegen_1._)`!(${e} instanceof ${it.ValidationError})`, () => gen.throw(e)), addErrorsFrom(e), allErrors || gen.assign(valid, !1);
			}), cxt.ok(valid);
		}
		function callSyncRef() {
			cxt.result((0, code_1.callValidateCode)(cxt, v, passCxt), () => addEvaluatedFrom(v), () => addErrorsFrom(v));
		}
		function addErrorsFrom(source) {
			let errs = (0, codegen_1._)`${source}.errors`;
			gen.assign(names_1.default.vErrors, (0, codegen_1._)`${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`), gen.assign(names_1.default.errors, (0, codegen_1._)`${names_1.default.vErrors}.length`);
		}
		function addEvaluatedFrom(source) {
			var _a;
			if (!it.opts.unevaluated) return;
			let schEvaluated = (_a = sch?.validate) === null || _a === void 0 ? void 0 : _a.evaluated;
			if (it.props !== !0) if (schEvaluated && !schEvaluated.dynamicProps)
				schEvaluated.props !== void 0 && (it.props = util_1.mergeEvaluated.props(gen, schEvaluated.props, it.props));
			else {
				let props = gen.var("props", (0, codegen_1._)`${source}.evaluated.props`);
				it.props = util_1.mergeEvaluated.props(gen, props, it.props, codegen_1.Name);
			}
			if (it.items !== !0) if (schEvaluated && !schEvaluated.dynamicItems)
				schEvaluated.items !== void 0 && (it.items = util_1.mergeEvaluated.items(gen, schEvaluated.items, it.items));
			else {
				let items = gen.var("items", (0, codegen_1._)`${source}.evaluated.items`);
				it.items = util_1.mergeEvaluated.items(gen, items, it.items, codegen_1.Name);
			}
		}
	}
	exports.callRef = callRef, exports.default = def;
})), require_core$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let id_1 = require_id(), ref_1 = require_ref(), core = [
		"$schema",
		"$id",
		"$defs",
		"$vocabulary",
		{ keyword: "$comment" },
		"definitions",
		id_1.default,
		ref_1.default
	];
	exports.default = core;
})), require_limitNumber = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let codegen_1 = require_codegen(), ops = codegen_1.operators, KWDs = {
		maximum: {
			okStr: "<=",
			ok: ops.LTE,
			fail: ops.GT
		},
		minimum: {
			okStr: ">=",
			ok: ops.GTE,
			fail: ops.LT
		},
		exclusiveMaximum: {
			okStr: "<",
			ok: ops.LT,
			fail: ops.GTE
		},
		exclusiveMinimum: {
			okStr: ">",
			ok: ops.GT,
			fail: ops.LTE
		}
	}, def = {
		keyword: Object.keys(KWDs),
		type: "number",
		schemaType: "number",
		$data: !0,
		error: {
			message: ({ keyword, schemaCode }) => (0, codegen_1.str)`must be ${KWDs[keyword].okStr} ${schemaCode}`,
			params: ({ keyword, schemaCode }) => (0, codegen_1._)`{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`
		},
		code(cxt) {
			let { keyword, data, schemaCode } = cxt;
			cxt.fail$data((0, codegen_1._)`${data} ${KWDs[keyword].fail} ${schemaCode} || isNaN(${data})`);
		}
	};
	exports.default = def;
})), require_multipleOf = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let codegen_1 = require_codegen(), def = {
		keyword: "multipleOf",
		type: "number",
		schemaType: "number",
		$data: !0,
		error: {
			message: ({ schemaCode }) => (0, codegen_1.str)`must be multiple of ${schemaCode}`,
			params: ({ schemaCode }) => (0, codegen_1._)`{multipleOf: ${schemaCode}}`
		},
		code(cxt) {
			let { gen, data, schemaCode, it } = cxt, prec = it.opts.multipleOfPrecision, res = gen.let("res"), invalid = prec ? (0, codegen_1._)`Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}` : (0, codegen_1._)`${res} !== parseInt(${res})`;
			cxt.fail$data((0, codegen_1._)`(${schemaCode} === 0 || (${res} = ${data}/${schemaCode}, ${invalid}))`);
		}
	};
	exports.default = def;
})), require_ucs2length = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	function ucs2length(str) {
		let len = str.length, length = 0, pos = 0, value;
		for (; pos < len; )
			length++, value = str.charCodeAt(pos++), value >= 55296 && value <= 56319 && pos < len && (value = str.charCodeAt(pos), (value & 64512) === 56320 && pos++);
		return length;
	}
	exports.default = ucs2length, ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
})), require_limitLength = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let codegen_1 = require_codegen(), util_1 = require_util(), ucs2length_1 = require_ucs2length(), def = {
		keyword: ["maxLength", "minLength"],
		type: "string",
		schemaType: "number",
		$data: !0,
		error: {
			message({ keyword, schemaCode }) {
				let comp = keyword === "maxLength" ? "more" : "fewer";
				return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} characters`;
			},
			params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
		},
		code(cxt) {
			let { keyword, data, schemaCode, it } = cxt, op = keyword === "maxLength" ? codegen_1.operators.GT : codegen_1.operators.LT, len = it.opts.unicode === !1 ? (0, codegen_1._)`${data}.length` : (0, codegen_1._)`${(0, util_1.useFunc)(cxt.gen, ucs2length_1.default)}(${data})`;
			cxt.fail$data((0, codegen_1._)`${len} ${op} ${schemaCode}`);
		}
	};
	exports.default = def;
})), require_pattern = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let code_1 = require_code(), util_1 = require_util(), codegen_1 = require_codegen(), def = {
		keyword: "pattern",
		type: "string",
		schemaType: "string",
		$data: !0,
		error: {
			message: ({ schemaCode }) => (0, codegen_1.str)`must match pattern "${schemaCode}"`,
			params: ({ schemaCode }) => (0, codegen_1._)`{pattern: ${schemaCode}}`
		},
		code(cxt) {
			let { gen, data, $data, schema, schemaCode, it } = cxt, u = it.opts.unicodeRegExp ? "u" : "";
			if ($data) {
				let { regExp } = it.opts.code, regExpCode = regExp.code === "new RegExp" ? (0, codegen_1._)`new RegExp` : (0, util_1.useFunc)(gen, regExp), valid = gen.let("valid");
				gen.try(() => gen.assign(valid, (0, codegen_1._)`${regExpCode}(${schemaCode}, ${u}).test(${data})`), () => gen.assign(valid, !1)), cxt.fail$data((0, codegen_1._)`!${valid}`);
			} else {
				let regExp = (0, code_1.usePattern)(cxt, schema);
				cxt.fail$data((0, codegen_1._)`!${regExp}.test(${data})`);
			}
		}
	};
	exports.default = def;
})), require_limitProperties = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let codegen_1 = require_codegen(), def = {
		keyword: ["maxProperties", "minProperties"],
		type: "object",
		schemaType: "number",
		$data: !0,
		error: {
			message({ keyword, schemaCode }) {
				let comp = keyword === "maxProperties" ? "more" : "fewer";
				return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} properties`;
			},
			params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
		},
		code(cxt) {
			let { keyword, data, schemaCode } = cxt, op = keyword === "maxProperties" ? codegen_1.operators.GT : codegen_1.operators.LT;
			cxt.fail$data((0, codegen_1._)`Object.keys(${data}).length ${op} ${schemaCode}`);
		}
	};
	exports.default = def;
})), require_required = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let code_1 = require_code(), codegen_1 = require_codegen(), util_1 = require_util(), def = {
		keyword: "required",
		type: "object",
		schemaType: "array",
		$data: !0,
		error: {
			message: ({ params: { missingProperty } }) => (0, codegen_1.str)`must have required property '${missingProperty}'`,
			params: ({ params: { missingProperty } }) => (0, codegen_1._)`{missingProperty: ${missingProperty}}`
		},
		code(cxt) {
			let { gen, schema, schemaCode, data, $data, it } = cxt, { opts } = it;
			if (!$data && schema.length === 0) return;
			let useLoop = schema.length >= opts.loopRequired;
			if (it.allErrors ? allErrorsMode() : exitOnErrorMode(), opts.strictRequired) {
				let props = cxt.parentSchema.properties, { definedProperties } = cxt.it;
				for (let requiredKey of schema) if (props?.[requiredKey] === void 0 && !definedProperties.has(requiredKey)) {
					let msg = `required property "${requiredKey}" is not defined at "${it.schemaEnv.baseId + it.errSchemaPath}" (strictRequired)`;
					(0, util_1.checkStrictMode)(it, msg, it.opts.strictRequired);
				}
			}
			function allErrorsMode() {
				if (useLoop || $data) cxt.block$data(codegen_1.nil, loopAllRequired);
				else for (let prop of schema) (0, code_1.checkReportMissingProp)(cxt, prop);
			}
			function exitOnErrorMode() {
				let missing = gen.let("missing");
				if (useLoop || $data) {
					let valid = gen.let("valid", !0);
					cxt.block$data(valid, () => loopUntilMissing(missing, valid)), cxt.ok(valid);
				} else
					gen.if((0, code_1.checkMissingProp)(cxt, schema, missing)), (0, code_1.reportMissingProp)(cxt, missing), gen.else();
			}
			function loopAllRequired() {
				gen.forOf("prop", schemaCode, (prop) => {
					cxt.setParams({ missingProperty: prop }), gen.if((0, code_1.noPropertyInData)(gen, data, prop, opts.ownProperties), () => cxt.error());
				});
			}
			function loopUntilMissing(missing, valid) {
				cxt.setParams({ missingProperty: missing }), gen.forOf(missing, schemaCode, () => {
					gen.assign(valid, (0, code_1.propertyInData)(gen, data, missing, opts.ownProperties)), gen.if((0, codegen_1.not)(valid), () => {
						cxt.error(), gen.break();
					});
				}, codegen_1.nil);
			}
		}
	};
	exports.default = def;
})), require_limitItems = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let codegen_1 = require_codegen(), def = {
		keyword: ["maxItems", "minItems"],
		type: "array",
		schemaType: "number",
		$data: !0,
		error: {
			message({ keyword, schemaCode }) {
				let comp = keyword === "maxItems" ? "more" : "fewer";
				return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} items`;
			},
			params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
		},
		code(cxt) {
			let { keyword, data, schemaCode } = cxt, op = keyword === "maxItems" ? codegen_1.operators.GT : codegen_1.operators.LT;
			cxt.fail$data((0, codegen_1._)`${data}.length ${op} ${schemaCode}`);
		}
	};
	exports.default = def;
})), require_equal = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let equal = require_fast_deep_equal();
	equal.code = 'require("ajv/dist/runtime/equal").default', exports.default = equal;
})), require_uniqueItems = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let dataType_1 = require_dataType(), codegen_1 = require_codegen(), util_1 = require_util(), equal_1 = require_equal(), def = {
		keyword: "uniqueItems",
		type: "array",
		schemaType: "boolean",
		$data: !0,
		error: {
			message: ({ params: { i, j } }) => (0, codegen_1.str)`must NOT have duplicate items (items ## ${j} and ${i} are identical)`,
			params: ({ params: { i, j } }) => (0, codegen_1._)`{i: ${i}, j: ${j}}`
		},
		code(cxt) {
			let { gen, data, $data, schema, parentSchema, schemaCode, it } = cxt;
			if (!$data && !schema) return;
			let valid = gen.let("valid"), itemTypes = parentSchema.items ? (0, dataType_1.getSchemaTypes)(parentSchema.items) : [];
			cxt.block$data(valid, validateUniqueItems, (0, codegen_1._)`${schemaCode} === false`), cxt.ok(valid);
			function validateUniqueItems() {
				let i = gen.let("i", (0, codegen_1._)`${data}.length`), j = gen.let("j");
				cxt.setParams({
					i,
					j
				}), gen.assign(valid, !0), gen.if((0, codegen_1._)`${i} > 1`, () => (canOptimize() ? loopN : loopN2)(i, j));
			}
			function canOptimize() {
				return itemTypes.length > 0 && !itemTypes.some((t) => t === "object" || t === "array");
			}
			function loopN(i, j) {
				let item = gen.name("item"), wrongType = (0, dataType_1.checkDataTypes)(itemTypes, item, it.opts.strictNumbers, dataType_1.DataType.Wrong), indices = gen.const("indices", (0, codegen_1._)`{}`);
				gen.for((0, codegen_1._)`;${i}--;`, () => {
					gen.let(item, (0, codegen_1._)`${data}[${i}]`), gen.if(wrongType, (0, codegen_1._)`continue`), itemTypes.length > 1 && gen.if((0, codegen_1._)`typeof ${item} == "string"`, (0, codegen_1._)`${item} += "_"`), gen.if((0, codegen_1._)`typeof ${indices}[${item}] == "number"`, () => {
						gen.assign(j, (0, codegen_1._)`${indices}[${item}]`), cxt.error(), gen.assign(valid, !1).break();
					}).code((0, codegen_1._)`${indices}[${item}] = ${i}`);
				});
			}
			function loopN2(i, j) {
				let eql = (0, util_1.useFunc)(gen, equal_1.default), outer = gen.name("outer");
				gen.label(outer).for((0, codegen_1._)`;${i}--;`, () => gen.for((0, codegen_1._)`${j} = ${i}; ${j}--;`, () => gen.if((0, codegen_1._)`${eql}(${data}[${i}], ${data}[${j}])`, () => {
					cxt.error(), gen.assign(valid, !1).break(outer);
				})));
			}
		}
	};
	exports.default = def;
})), require_const = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let codegen_1 = require_codegen(), util_1 = require_util(), equal_1 = require_equal(), def = {
		keyword: "const",
		$data: !0,
		error: {
			message: "must be equal to constant",
			params: ({ schemaCode }) => (0, codegen_1._)`{allowedValue: ${schemaCode}}`
		},
		code(cxt) {
			let { gen, data, $data, schemaCode, schema } = cxt;
			$data || schema && typeof schema == "object" ? cxt.fail$data((0, codegen_1._)`!${(0, util_1.useFunc)(gen, equal_1.default)}(${data}, ${schemaCode})`) : cxt.fail((0, codegen_1._)`${schema} !== ${data}`);
		}
	};
	exports.default = def;
})), require_enum = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let codegen_1 = require_codegen(), util_1 = require_util(), equal_1 = require_equal(), def = {
		keyword: "enum",
		schemaType: "array",
		$data: !0,
		error: {
			message: "must be equal to one of the allowed values",
			params: ({ schemaCode }) => (0, codegen_1._)`{allowedValues: ${schemaCode}}`
		},
		code(cxt) {
			let { gen, data, $data, schema, schemaCode, it } = cxt;
			if (!$data && schema.length === 0) throw new Error("enum must have non-empty array");
			let useLoop = schema.length >= it.opts.loopEnum, eql, getEql = () => eql ?? (eql = (0, util_1.useFunc)(gen, equal_1.default)), valid;
			if (useLoop || $data)
				valid = gen.let("valid"), cxt.block$data(valid, loopEnum);
			else {
				if (!Array.isArray(schema)) throw new Error("ajv implementation error");
				let vSchema = gen.const("vSchema", schemaCode);
				valid = (0, codegen_1.or)(...schema.map((_x, i) => equalCode(vSchema, i)));
			}
			cxt.pass(valid);
			function loopEnum() {
				gen.assign(valid, !1), gen.forOf("v", schemaCode, (v) => gen.if((0, codegen_1._)`${getEql()}(${data}, ${v})`, () => gen.assign(valid, !0).break()));
			}
			function equalCode(vSchema, i) {
				let sch = schema[i];
				return typeof sch == "object" && sch !== null ? (0, codegen_1._)`${getEql()}(${data}, ${vSchema}[${i}])` : (0, codegen_1._)`${data} === ${sch}`;
			}
		}
	};
	exports.default = def;
})), require_validation$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let limitNumber_1 = require_limitNumber(), multipleOf_1 = require_multipleOf(), limitLength_1 = require_limitLength(), pattern_1 = require_pattern(), limitProperties_1 = require_limitProperties(), required_1 = require_required(), limitItems_1 = require_limitItems(), uniqueItems_1 = require_uniqueItems(), const_1 = require_const(), enum_1 = require_enum(), validation = [
		limitNumber_1.default,
		multipleOf_1.default,
		limitLength_1.default,
		pattern_1.default,
		limitProperties_1.default,
		required_1.default,
		limitItems_1.default,
		uniqueItems_1.default,
		{
			keyword: "type",
			schemaType: ["string", "array"]
		},
		{
			keyword: "nullable",
			schemaType: "boolean"
		},
		const_1.default,
		enum_1.default
	];
	exports.default = validation;
})), require_additionalItems = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.validateAdditionalItems = void 0;
	let codegen_1 = require_codegen(), util_1 = require_util(), def = {
		keyword: "additionalItems",
		type: "array",
		schemaType: ["boolean", "object"],
		before: "uniqueItems",
		error: {
			message: ({ params: { len } }) => (0, codegen_1.str)`must NOT have more than ${len} items`,
			params: ({ params: { len } }) => (0, codegen_1._)`{limit: ${len}}`
		},
		code(cxt) {
			let { parentSchema, it } = cxt, { items } = parentSchema;
			if (!Array.isArray(items)) {
				(0, util_1.checkStrictMode)(it, '"additionalItems" is ignored when "items" is not an array of schemas');
				return;
			}
			validateAdditionalItems(cxt, items);
		}
	};
	function validateAdditionalItems(cxt, items) {
		let { gen, schema, data, keyword, it } = cxt;
		it.items = !0;
		let len = gen.const("len", (0, codegen_1._)`${data}.length`);
		if (schema === !1)
			cxt.setParams({ len: items.length }), cxt.pass((0, codegen_1._)`${len} <= ${items.length}`);
		else if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
			let valid = gen.var("valid", (0, codegen_1._)`${len} <= ${items.length}`);
			gen.if((0, codegen_1.not)(valid), () => validateItems(valid)), cxt.ok(valid);
		}
		function validateItems(valid) {
			gen.forRange("i", items.length, len, (i) => {
				cxt.subschema({
					keyword,
					dataProp: i,
					dataPropType: util_1.Type.Num
				}, valid), it.allErrors || gen.if((0, codegen_1.not)(valid), () => gen.break());
			});
		}
	}
	exports.validateAdditionalItems = validateAdditionalItems, exports.default = def;
})), require_items = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.validateTuple = void 0;
	let codegen_1 = require_codegen(), util_1 = require_util(), code_1 = require_code(), def = {
		keyword: "items",
		type: "array",
		schemaType: [
			"object",
			"array",
			"boolean"
		],
		before: "uniqueItems",
		code(cxt) {
			let { schema, it } = cxt;
			if (Array.isArray(schema)) return validateTuple(cxt, "additionalItems", schema);
			it.items = !0, !(0, util_1.alwaysValidSchema)(it, schema) && cxt.ok((0, code_1.validateArray)(cxt));
		}
	};
	function validateTuple(cxt, extraItems, schArr = cxt.schema) {
		let { gen, parentSchema, data, keyword, it } = cxt;
		checkStrictTuple(parentSchema), it.opts.unevaluated && schArr.length && it.items !== !0 && (it.items = util_1.mergeEvaluated.items(gen, schArr.length, it.items));
		let valid = gen.name("valid"), len = gen.const("len", (0, codegen_1._)`${data}.length`);
		schArr.forEach((sch, i) => {
			(0, util_1.alwaysValidSchema)(it, sch) || (gen.if((0, codegen_1._)`${len} > ${i}`, () => cxt.subschema({
				keyword,
				schemaProp: i,
				dataProp: i
			}, valid)), cxt.ok(valid));
		});
		function checkStrictTuple(sch) {
			let { opts, errSchemaPath } = it, l = schArr.length, fullTuple = l === sch.minItems && (l === sch.maxItems || sch[extraItems] === !1);
			if (opts.strictTuples && !fullTuple) {
				let msg = `"${keyword}" is ${l}-tuple, but minItems or maxItems/${extraItems} are not specified or different at path "${errSchemaPath}"`;
				(0, util_1.checkStrictMode)(it, msg, opts.strictTuples);
			}
		}
	}
	exports.validateTuple = validateTuple, exports.default = def;
})), require_prefixItems = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let items_1 = require_items(), def = {
		keyword: "prefixItems",
		type: "array",
		schemaType: ["array"],
		before: "uniqueItems",
		code: (cxt) => (0, items_1.validateTuple)(cxt, "items")
	};
	exports.default = def;
})), require_items2020 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let codegen_1 = require_codegen(), util_1 = require_util(), code_1 = require_code(), additionalItems_1 = require_additionalItems(), def = {
		keyword: "items",
		type: "array",
		schemaType: ["object", "boolean"],
		before: "uniqueItems",
		error: {
			message: ({ params: { len } }) => (0, codegen_1.str)`must NOT have more than ${len} items`,
			params: ({ params: { len } }) => (0, codegen_1._)`{limit: ${len}}`
		},
		code(cxt) {
			let { schema, parentSchema, it } = cxt, { prefixItems } = parentSchema;
			it.items = !0, !(0, util_1.alwaysValidSchema)(it, schema) && (prefixItems ? (0, additionalItems_1.validateAdditionalItems)(cxt, prefixItems) : cxt.ok((0, code_1.validateArray)(cxt)));
		}
	};
	exports.default = def;
})), require_contains = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let codegen_1 = require_codegen(), util_1 = require_util(), def = {
		keyword: "contains",
		type: "array",
		schemaType: ["object", "boolean"],
		before: "uniqueItems",
		trackErrors: !0,
		error: {
			message: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1.str)`must contain at least ${min} valid item(s)` : (0, codegen_1.str)`must contain at least ${min} and no more than ${max} valid item(s)`,
			params: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1._)`{minContains: ${min}}` : (0, codegen_1._)`{minContains: ${min}, maxContains: ${max}}`
		},
		code(cxt) {
			let { gen, schema, parentSchema, data, it } = cxt, min, max, { minContains, maxContains } = parentSchema;
			it.opts.next ? (min = minContains === void 0 ? 1 : minContains, max = maxContains) : min = 1;
			let len = gen.const("len", (0, codegen_1._)`${data}.length`);
			if (cxt.setParams({
				min,
				max
			}), max === void 0 && min === 0) {
				(0, util_1.checkStrictMode)(it, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
				return;
			}
			if (max !== void 0 && min > max) {
				(0, util_1.checkStrictMode)(it, '"minContains" > "maxContains" is always invalid'), cxt.fail();
				return;
			}
			if ((0, util_1.alwaysValidSchema)(it, schema)) {
				let cond = (0, codegen_1._)`${len} >= ${min}`;
				max !== void 0 && (cond = (0, codegen_1._)`${cond} && ${len} <= ${max}`), cxt.pass(cond);
				return;
			}
			it.items = !0;
			let valid = gen.name("valid");
			max === void 0 && min === 1 ? validateItems(valid, () => gen.if(valid, () => gen.break())) : min === 0 ? (gen.let(valid, !0), max !== void 0 && gen.if((0, codegen_1._)`${data}.length > 0`, validateItemsWithCount)) : (gen.let(valid, !1), validateItemsWithCount()), cxt.result(valid, () => cxt.reset());
			function validateItemsWithCount() {
				let schValid = gen.name("_valid"), count = gen.let("count", 0);
				validateItems(schValid, () => gen.if(schValid, () => checkLimits(count)));
			}
			function validateItems(_valid, block) {
				gen.forRange("i", 0, len, (i) => {
					cxt.subschema({
						keyword: "contains",
						dataProp: i,
						dataPropType: util_1.Type.Num,
						compositeRule: !0
					}, _valid), block();
				});
			}
			function checkLimits(count) {
				gen.code((0, codegen_1._)`${count}++`), max === void 0 ? gen.if((0, codegen_1._)`${count} >= ${min}`, () => gen.assign(valid, !0).break()) : (gen.if((0, codegen_1._)`${count} > ${max}`, () => gen.assign(valid, !1).break()), min === 1 ? gen.assign(valid, !0) : gen.if((0, codegen_1._)`${count} >= ${min}`, () => gen.assign(valid, !0)));
			}
		}
	};
	exports.default = def;
})), require_dependencies = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.validateSchemaDeps = exports.validatePropertyDeps = exports.error = void 0;
	let codegen_1 = require_codegen(), util_1 = require_util(), code_1 = require_code();
	exports.error = {
		message: ({ params: { property, depsCount, deps } }) => {
			let property_ies = depsCount === 1 ? "property" : "properties";
			return (0, codegen_1.str)`must have ${property_ies} ${deps} when property ${property} is present`;
		},
		params: ({ params: { property, depsCount, deps, missingProperty } }) => (0, codegen_1._)`{property: ${property},
    missingProperty: ${missingProperty},
    depsCount: ${depsCount},
    deps: ${deps}}`
	};
	let def = {
		keyword: "dependencies",
		type: "object",
		schemaType: "object",
		error: exports.error,
		code(cxt) {
			let [propDeps, schDeps] = splitDependencies(cxt);
			validatePropertyDeps(cxt, propDeps), validateSchemaDeps(cxt, schDeps);
		}
	};
	function splitDependencies({ schema }) {
		let propertyDeps = {}, schemaDeps = {};
		for (let key in schema) {
			if (key === "__proto__") continue;
			let deps = Array.isArray(schema[key]) ? propertyDeps : schemaDeps;
			deps[key] = schema[key];
		}
		return [propertyDeps, schemaDeps];
	}
	function validatePropertyDeps(cxt, propertyDeps = cxt.schema) {
		let { gen, data, it } = cxt;
		if (Object.keys(propertyDeps).length === 0) return;
		let missing = gen.let("missing");
		for (let prop in propertyDeps) {
			let deps = propertyDeps[prop];
			if (deps.length === 0) continue;
			let hasProperty = (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties);
			cxt.setParams({
				property: prop,
				depsCount: deps.length,
				deps: deps.join(", ")
			}), it.allErrors ? gen.if(hasProperty, () => {
				for (let depProp of deps) (0, code_1.checkReportMissingProp)(cxt, depProp);
			}) : (gen.if((0, codegen_1._)`${hasProperty} && (${(0, code_1.checkMissingProp)(cxt, deps, missing)})`), (0, code_1.reportMissingProp)(cxt, missing), gen.else());
		}
	}
	exports.validatePropertyDeps = validatePropertyDeps;
	function validateSchemaDeps(cxt, schemaDeps = cxt.schema) {
		let { gen, data, keyword, it } = cxt, valid = gen.name("valid");
		for (let prop in schemaDeps)
			(0, util_1.alwaysValidSchema)(it, schemaDeps[prop]) || (gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties), () => {
				let schCxt = cxt.subschema({
					keyword,
					schemaProp: prop
				}, valid);
				cxt.mergeValidEvaluated(schCxt, valid);
			}, () => gen.var(valid, !0)), cxt.ok(valid));
	}
	exports.validateSchemaDeps = validateSchemaDeps, exports.default = def;
})), require_propertyNames = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let codegen_1 = require_codegen(), util_1 = require_util(), def = {
		keyword: "propertyNames",
		type: "object",
		schemaType: ["object", "boolean"],
		error: {
			message: "property name must be valid",
			params: ({ params }) => (0, codegen_1._)`{propertyName: ${params.propertyName}}`
		},
		code(cxt) {
			let { gen, schema, data, it } = cxt;
			if ((0, util_1.alwaysValidSchema)(it, schema)) return;
			let valid = gen.name("valid");
			gen.forIn("key", data, (key) => {
				cxt.setParams({ propertyName: key }), cxt.subschema({
					keyword: "propertyNames",
					data: key,
					dataTypes: ["string"],
					propertyName: key,
					compositeRule: !0
				}, valid), gen.if((0, codegen_1.not)(valid), () => {
					cxt.error(!0), it.allErrors || gen.break();
				});
			}), cxt.ok(valid);
		}
	};
	exports.default = def;
})), require_additionalProperties = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let code_1 = require_code(), codegen_1 = require_codegen(), names_1 = require_names(), util_1 = require_util(), def = {
		keyword: "additionalProperties",
		type: ["object"],
		schemaType: ["boolean", "object"],
		allowUndefined: !0,
		trackErrors: !0,
		error: {
			message: "must NOT have additional properties",
			params: ({ params }) => (0, codegen_1._)`{additionalProperty: ${params.additionalProperty}}`
		},
		code(cxt) {
			let { gen, schema, parentSchema, data, errsCount, it } = cxt;
			if (!errsCount) throw new Error("ajv implementation error");
			let { allErrors, opts } = it;
			if (it.props = !0, opts.removeAdditional !== "all" && (0, util_1.alwaysValidSchema)(it, schema)) return;
			let props = (0, code_1.allSchemaProperties)(parentSchema.properties), patProps = (0, code_1.allSchemaProperties)(parentSchema.patternProperties);
			checkAdditionalProperties(), cxt.ok((0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
			function checkAdditionalProperties() {
				gen.forIn("key", data, (key) => {
					!props.length && !patProps.length ? additionalPropertyCode(key) : gen.if(isAdditional(key), () => additionalPropertyCode(key));
				});
			}
			function isAdditional(key) {
				let definedProp;
				if (props.length > 8) {
					let propsSchema = (0, util_1.schemaRefOrVal)(it, parentSchema.properties, "properties");
					definedProp = (0, code_1.isOwnProperty)(gen, propsSchema, key);
				} else props.length ? definedProp = (0, codegen_1.or)(...props.map((p) => (0, codegen_1._)`${key} === ${p}`)) : definedProp = codegen_1.nil;
				return patProps.length && (definedProp = (0, codegen_1.or)(definedProp, ...patProps.map((p) => (0, codegen_1._)`${(0, code_1.usePattern)(cxt, p)}.test(${key})`))), (0, codegen_1.not)(definedProp);
			}
			function deleteAdditional(key) {
				gen.code((0, codegen_1._)`delete ${data}[${key}]`);
			}
			function additionalPropertyCode(key) {
				if (opts.removeAdditional === "all" || opts.removeAdditional && schema === !1) {
					deleteAdditional(key);
					return;
				}
				if (schema === !1) {
					cxt.setParams({ additionalProperty: key }), cxt.error(), allErrors || gen.break();
					return;
				}
				if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
					let valid = gen.name("valid");
					opts.removeAdditional === "failing" ? (applyAdditionalSchema(key, valid, !1), gen.if((0, codegen_1.not)(valid), () => {
						cxt.reset(), deleteAdditional(key);
					})) : (applyAdditionalSchema(key, valid), allErrors || gen.if((0, codegen_1.not)(valid), () => gen.break()));
				}
			}
			function applyAdditionalSchema(key, valid, errors) {
				let subschema = {
					keyword: "additionalProperties",
					dataProp: key,
					dataPropType: util_1.Type.Str
				};
				errors === !1 && Object.assign(subschema, {
					compositeRule: !0,
					createErrors: !1,
					allErrors: !1
				}), cxt.subschema(subschema, valid);
			}
		}
	};
	exports.default = def;
})), require_properties = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let validate_1 = require_validate(), code_1 = require_code(), util_1 = require_util(), additionalProperties_1 = require_additionalProperties(), def = {
		keyword: "properties",
		type: "object",
		schemaType: "object",
		code(cxt) {
			let { gen, schema, parentSchema, data, it } = cxt;
			it.opts.removeAdditional === "all" && parentSchema.additionalProperties === void 0 && additionalProperties_1.default.code(new validate_1.KeywordCxt(it, additionalProperties_1.default, "additionalProperties"));
			let allProps = (0, code_1.allSchemaProperties)(schema);
			for (let prop of allProps) it.definedProperties.add(prop);
			it.opts.unevaluated && allProps.length && it.props !== !0 && (it.props = util_1.mergeEvaluated.props(gen, (0, util_1.toHash)(allProps), it.props));
			let properties = allProps.filter((p) => !(0, util_1.alwaysValidSchema)(it, schema[p]));
			if (properties.length === 0) return;
			let valid = gen.name("valid");
			for (let prop of properties)
				hasDefault(prop) ? applyPropertySchema(prop) : (gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties)), applyPropertySchema(prop), it.allErrors || gen.else().var(valid, !0), gen.endIf()), cxt.it.definedProperties.add(prop), cxt.ok(valid);
			function hasDefault(prop) {
				return it.opts.useDefaults && !it.compositeRule && schema[prop].default !== void 0;
			}
			function applyPropertySchema(prop) {
				cxt.subschema({
					keyword: "properties",
					schemaProp: prop,
					dataProp: prop
				}, valid);
			}
		}
	};
	exports.default = def;
})), require_patternProperties = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let code_1 = require_code(), codegen_1 = require_codegen(), util_1 = require_util(), util_2 = require_util(), def = {
		keyword: "patternProperties",
		type: "object",
		schemaType: "object",
		code(cxt) {
			let { gen, schema, data, parentSchema, it } = cxt, { opts } = it, patterns = (0, code_1.allSchemaProperties)(schema), alwaysValidPatterns = patterns.filter((p) => (0, util_1.alwaysValidSchema)(it, schema[p]));
			if (patterns.length === 0 || alwaysValidPatterns.length === patterns.length && (!it.opts.unevaluated || it.props === !0)) return;
			let checkProperties = opts.strictSchema && !opts.allowMatchingProperties && parentSchema.properties, valid = gen.name("valid");
			it.props !== !0 && !(it.props instanceof codegen_1.Name) && (it.props = (0, util_2.evaluatedPropsToName)(gen, it.props));
			let { props } = it;
			validatePatternProperties();
			function validatePatternProperties() {
				for (let pat of patterns)
					checkProperties && checkMatchingProperties(pat), it.allErrors ? validateProperties(pat) : (gen.var(valid, !0), validateProperties(pat), gen.if(valid));
			}
			function checkMatchingProperties(pat) {
				for (let prop in checkProperties) new RegExp(pat).test(prop) && (0, util_1.checkStrictMode)(it, `property ${prop} matches pattern ${pat} (use allowMatchingProperties)`);
			}
			function validateProperties(pat) {
				gen.forIn("key", data, (key) => {
					gen.if((0, codegen_1._)`${(0, code_1.usePattern)(cxt, pat)}.test(${key})`, () => {
						let alwaysValid = alwaysValidPatterns.includes(pat);
						alwaysValid || cxt.subschema({
							keyword: "patternProperties",
							schemaProp: pat,
							dataProp: key,
							dataPropType: util_2.Type.Str
						}, valid), it.opts.unevaluated && props !== !0 ? gen.assign((0, codegen_1._)`${props}[${key}]`, !0) : !alwaysValid && !it.allErrors && gen.if((0, codegen_1.not)(valid), () => gen.break());
					});
				});
			}
		}
	};
	exports.default = def;
})), require_not = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let util_1 = require_util(), def = {
		keyword: "not",
		schemaType: ["object", "boolean"],
		trackErrors: !0,
		code(cxt) {
			let { gen, schema, it } = cxt;
			if ((0, util_1.alwaysValidSchema)(it, schema)) {
				cxt.fail();
				return;
			}
			let valid = gen.name("valid");
			cxt.subschema({
				keyword: "not",
				compositeRule: !0,
				createErrors: !1,
				allErrors: !1
			}, valid), cxt.failResult(valid, () => cxt.reset(), () => cxt.error());
		},
		error: { message: "must NOT be valid" }
	};
	exports.default = def;
})), require_anyOf = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let def = {
		keyword: "anyOf",
		schemaType: "array",
		trackErrors: !0,
		code: require_code().validateUnion,
		error: { message: "must match a schema in anyOf" }
	};
	exports.default = def;
})), require_oneOf = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let codegen_1 = require_codegen(), util_1 = require_util(), def = {
		keyword: "oneOf",
		schemaType: "array",
		trackErrors: !0,
		error: {
			message: "must match exactly one schema in oneOf",
			params: ({ params }) => (0, codegen_1._)`{passingSchemas: ${params.passing}}`
		},
		code(cxt) {
			let { gen, schema, parentSchema, it } = cxt;
			if (!Array.isArray(schema)) throw new Error("ajv implementation error");
			if (it.opts.discriminator && parentSchema.discriminator) return;
			let schArr = schema, valid = gen.let("valid", !1), passing = gen.let("passing", null), schValid = gen.name("_valid");
			cxt.setParams({ passing }), gen.block(validateOneOf), cxt.result(valid, () => cxt.reset(), () => cxt.error(!0));
			function validateOneOf() {
				schArr.forEach((sch, i) => {
					let schCxt;
					(0, util_1.alwaysValidSchema)(it, sch) ? gen.var(schValid, !0) : schCxt = cxt.subschema({
						keyword: "oneOf",
						schemaProp: i,
						compositeRule: !0
					}, schValid), i > 0 && gen.if((0, codegen_1._)`${schValid} && ${valid}`).assign(valid, !1).assign(passing, (0, codegen_1._)`[${passing}, ${i}]`).else(), gen.if(schValid, () => {
						gen.assign(valid, !0), gen.assign(passing, i), schCxt && cxt.mergeEvaluated(schCxt, codegen_1.Name);
					});
				});
			}
		}
	};
	exports.default = def;
})), require_allOf = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let util_1 = require_util(), def = {
		keyword: "allOf",
		schemaType: "array",
		code(cxt) {
			let { gen, schema, it } = cxt;
			if (!Array.isArray(schema)) throw new Error("ajv implementation error");
			let valid = gen.name("valid");
			schema.forEach((sch, i) => {
				if ((0, util_1.alwaysValidSchema)(it, sch)) return;
				let schCxt = cxt.subschema({
					keyword: "allOf",
					schemaProp: i
				}, valid);
				cxt.ok(valid), cxt.mergeEvaluated(schCxt);
			});
		}
	};
	exports.default = def;
})), require_if = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let codegen_1 = require_codegen(), util_1 = require_util(), def = {
		keyword: "if",
		schemaType: ["object", "boolean"],
		trackErrors: !0,
		error: {
			message: ({ params }) => (0, codegen_1.str)`must match "${params.ifClause}" schema`,
			params: ({ params }) => (0, codegen_1._)`{failingKeyword: ${params.ifClause}}`
		},
		code(cxt) {
			let { gen, parentSchema, it } = cxt;
			parentSchema.then === void 0 && parentSchema.else === void 0 && (0, util_1.checkStrictMode)(it, '"if" without "then" and "else" is ignored');
			let hasThen = hasSchema(it, "then"), hasElse = hasSchema(it, "else");
			if (!hasThen && !hasElse) return;
			let valid = gen.let("valid", !0), schValid = gen.name("_valid");
			if (validateIf(), cxt.reset(), hasThen && hasElse) {
				let ifClause = gen.let("ifClause");
				cxt.setParams({ ifClause }), gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
			} else hasThen ? gen.if(schValid, validateClause("then")) : gen.if((0, codegen_1.not)(schValid), validateClause("else"));
			cxt.pass(valid, () => cxt.error(!0));
			function validateIf() {
				let schCxt = cxt.subschema({
					keyword: "if",
					compositeRule: !0,
					createErrors: !1,
					allErrors: !1
				}, schValid);
				cxt.mergeEvaluated(schCxt);
			}
			function validateClause(keyword, ifClause) {
				return () => {
					let schCxt = cxt.subschema({ keyword }, schValid);
					gen.assign(valid, schValid), cxt.mergeValidEvaluated(schCxt, valid), ifClause ? gen.assign(ifClause, (0, codegen_1._)`${keyword}`) : cxt.setParams({ ifClause: keyword });
				};
			}
		}
	};
	function hasSchema(it, keyword) {
		let schema = it.schema[keyword];
		return schema !== void 0 && !(0, util_1.alwaysValidSchema)(it, schema);
	}
	exports.default = def;
})), require_thenElse = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let util_1 = require_util(), def = {
		keyword: ["then", "else"],
		schemaType: ["object", "boolean"],
		code({ keyword, parentSchema, it }) {
			parentSchema.if === void 0 && (0, util_1.checkStrictMode)(it, `"${keyword}" without "if" is ignored`);
		}
	};
	exports.default = def;
})), require_applicator$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let additionalItems_1 = require_additionalItems(), prefixItems_1 = require_prefixItems(), items_1 = require_items(), items2020_1 = require_items2020(), contains_1 = require_contains(), dependencies_1 = require_dependencies(), propertyNames_1 = require_propertyNames(), additionalProperties_1 = require_additionalProperties(), properties_1 = require_properties(), patternProperties_1 = require_patternProperties(), not_1 = require_not(), anyOf_1 = require_anyOf(), oneOf_1 = require_oneOf(), allOf_1 = require_allOf(), if_1 = require_if(), thenElse_1 = require_thenElse();
	function getApplicator(draft2020 = !1) {
		let applicator = [
			not_1.default,
			anyOf_1.default,
			oneOf_1.default,
			allOf_1.default,
			if_1.default,
			thenElse_1.default,
			propertyNames_1.default,
			additionalProperties_1.default,
			dependencies_1.default,
			properties_1.default,
			patternProperties_1.default
		];
		return draft2020 ? applicator.push(prefixItems_1.default, items2020_1.default) : applicator.push(additionalItems_1.default, items_1.default), applicator.push(contains_1.default), applicator;
	}
	exports.default = getApplicator;
})), require_format$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let codegen_1 = require_codegen(), def = {
		keyword: "format",
		type: ["number", "string"],
		schemaType: "string",
		$data: !0,
		error: {
			message: ({ schemaCode }) => (0, codegen_1.str)`must match format "${schemaCode}"`,
			params: ({ schemaCode }) => (0, codegen_1._)`{format: ${schemaCode}}`
		},
		code(cxt, ruleType) {
			let { gen, data, $data, schema, schemaCode, it } = cxt, { opts, errSchemaPath, schemaEnv, self } = it;
			if (!opts.validateFormats) return;
			$data ? validate$DataFormat() : validateFormat();
			function validate$DataFormat() {
				let fmts = gen.scopeValue("formats", {
					ref: self.formats,
					code: opts.code.formats
				}), fDef = gen.const("fDef", (0, codegen_1._)`${fmts}[${schemaCode}]`), fType = gen.let("fType"), format = gen.let("format");
				gen.if((0, codegen_1._)`typeof ${fDef} == "object" && !(${fDef} instanceof RegExp)`, () => gen.assign(fType, (0, codegen_1._)`${fDef}.type || "string"`).assign(format, (0, codegen_1._)`${fDef}.validate`), () => gen.assign(fType, (0, codegen_1._)`"string"`).assign(format, fDef)), cxt.fail$data((0, codegen_1.or)(unknownFmt(), invalidFmt()));
				function unknownFmt() {
					return opts.strictSchema === !1 ? codegen_1.nil : (0, codegen_1._)`${schemaCode} && !${format}`;
				}
				function invalidFmt() {
					let callFormat = schemaEnv.$async ? (0, codegen_1._)`(${fDef}.async ? await ${format}(${data}) : ${format}(${data}))` : (0, codegen_1._)`${format}(${data})`, validData = (0, codegen_1._)`(typeof ${format} == "function" ? ${callFormat} : ${format}.test(${data}))`;
					return (0, codegen_1._)`${format} && ${format} !== true && ${fType} === ${ruleType} && !${validData}`;
				}
			}
			function validateFormat() {
				let formatDef = self.formats[schema];
				if (!formatDef) {
					unknownFormat();
					return;
				}
				if (formatDef === !0) return;
				let [fmtType, format, fmtRef] = getFormat(formatDef);
				fmtType === ruleType && cxt.pass(validCondition());
				function unknownFormat() {
					if (opts.strictSchema === !1) {
						self.logger.warn(unknownMsg());
						return;
					}
					throw new Error(unknownMsg());
					function unknownMsg() {
						return `unknown format "${schema}" ignored in schema at path "${errSchemaPath}"`;
					}
				}
				function getFormat(fmtDef) {
					let code = fmtDef instanceof RegExp ? (0, codegen_1.regexpCode)(fmtDef) : opts.code.formats ? (0, codegen_1._)`${opts.code.formats}${(0, codegen_1.getProperty)(schema)}` : void 0, fmt = gen.scopeValue("formats", {
						key: schema,
						ref: fmtDef,
						code
					});
					return typeof fmtDef == "object" && !(fmtDef instanceof RegExp) ? [
						fmtDef.type || "string",
						fmtDef.validate,
						(0, codegen_1._)`${fmt}.validate`
					] : [
						"string",
						fmtDef,
						fmt
					];
				}
				function validCondition() {
					if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
						if (!schemaEnv.$async) throw new Error("async format in sync schema");
						return (0, codegen_1._)`await ${fmtRef}(${data})`;
					}
					return typeof format == "function" ? (0, codegen_1._)`${fmtRef}(${data})` : (0, codegen_1._)`${fmtRef}.test(${data})`;
				}
			}
		}
	};
	exports.default = def;
})), require_format$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let format = [require_format$2().default];
	exports.default = format;
})), require_metadata = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.contentVocabulary = exports.metadataVocabulary = void 0, exports.metadataVocabulary = [
		"title",
		"description",
		"default",
		"deprecated",
		"readOnly",
		"writeOnly",
		"examples"
	], exports.contentVocabulary = [
		"contentMediaType",
		"contentEncoding",
		"contentSchema"
	];
})), require_draft7 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let core_1 = require_core$2(), validation_1 = require_validation$2(), applicator_1 = require_applicator$2(), format_1 = require_format$1(), metadata_1 = require_metadata(), draft7Vocabularies = [
		core_1.default,
		validation_1.default,
		(0, applicator_1.default)(),
		format_1.default,
		metadata_1.metadataVocabulary,
		metadata_1.contentVocabulary
	];
	exports.default = draft7Vocabularies;
})), require_types = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.DiscrError = void 0;
	var DiscrError;
	(function(DiscrError2) {
		DiscrError2.Tag = "tag", DiscrError2.Mapping = "mapping";
	})(DiscrError || (exports.DiscrError = DiscrError = {}));
})), require_discriminator = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let codegen_1 = require_codegen(), types_1 = require_types(), compile_1 = require_compile(), ref_error_1 = require_ref_error(), util_1 = require_util(), def = {
		keyword: "discriminator",
		type: "object",
		schemaType: "object",
		error: {
			message: ({ params: { discrError, tagName } }) => discrError === types_1.DiscrError.Tag ? `tag "${tagName}" must be string` : `value of tag "${tagName}" must be in oneOf`,
			params: ({ params: { discrError, tag, tagName } }) => (0, codegen_1._)`{error: ${discrError}, tag: ${tagName}, tagValue: ${tag}}`
		},
		code(cxt) {
			let { gen, data, schema, parentSchema, it } = cxt, { oneOf } = parentSchema;
			if (!it.opts.discriminator) throw new Error("discriminator: requires discriminator option");
			let tagName = schema.propertyName;
			if (typeof tagName != "string") throw new Error("discriminator: requires propertyName");
			if (schema.mapping) throw new Error("discriminator: mapping is not supported");
			if (!oneOf) throw new Error("discriminator: requires oneOf keyword");
			let valid = gen.let("valid", !1), tag = gen.const("tag", (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(tagName)}`);
			gen.if((0, codegen_1._)`typeof ${tag} == "string"`, () => validateMapping(), () => cxt.error(!1, {
				discrError: types_1.DiscrError.Tag,
				tag,
				tagName
			})), cxt.ok(valid);
			function validateMapping() {
				let mapping = getMapping();
				gen.if(!1);
				for (let tagValue in mapping)
					gen.elseIf((0, codegen_1._)`${tag} === ${tagValue}`), gen.assign(valid, applyTagSchema(mapping[tagValue]));
				gen.else(), cxt.error(!1, {
					discrError: types_1.DiscrError.Mapping,
					tag,
					tagName
				}), gen.endIf();
			}
			function applyTagSchema(schemaProp) {
				let _valid = gen.name("valid"), schCxt = cxt.subschema({
					keyword: "oneOf",
					schemaProp
				}, _valid);
				return cxt.mergeEvaluated(schCxt, codegen_1.Name), _valid;
			}
			function getMapping() {
				var _a;
				let oneOfMapping = {}, topRequired = hasRequired(parentSchema), tagRequired = !0;
				for (let i = 0; i < oneOf.length; i++) {
					let sch = oneOf[i];
					if (sch?.$ref && !(0, util_1.schemaHasRulesButRef)(sch, it.self.RULES)) {
						let ref = sch.$ref;
						if (sch = compile_1.resolveRef.call(it.self, it.schemaEnv.root, it.baseId, ref), sch instanceof compile_1.SchemaEnv && (sch = sch.schema), sch === void 0) throw new ref_error_1.default(it.opts.uriResolver, it.baseId, ref);
					}
					let propSch = (_a = sch?.properties) === null || _a === void 0 ? void 0 : _a[tagName];
					if (typeof propSch != "object") throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${tagName}"`);
					tagRequired = tagRequired && (topRequired || hasRequired(sch)), addMappings(propSch, i);
				}
				if (!tagRequired) throw new Error(`discriminator: "${tagName}" must be required`);
				return oneOfMapping;
				function hasRequired({ required }) {
					return Array.isArray(required) && required.includes(tagName);
				}
				function addMappings(sch, i) {
					if (sch.const) addMapping(sch.const, i);
					else if (sch.enum) for (let tagValue of sch.enum) addMapping(tagValue, i);
					else throw new Error(`discriminator: "properties/${tagName}" must have "const" or "enum"`);
				}
				function addMapping(tagValue, i) {
					if (typeof tagValue != "string" || tagValue in oneOfMapping) throw new Error(`discriminator: "${tagName}" values must be unique strings`);
					oneOfMapping[tagValue] = i;
				}
			}
		}
	};
	exports.default = def;
})), require_json_schema_draft_07 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		$schema: "http://json-schema.org/draft-07/schema#",
		$id: "http://json-schema.org/draft-07/schema#",
		title: "Core schema meta-schema",
		definitions: {
			schemaArray: {
				type: "array",
				minItems: 1,
				items: { $ref: "#" }
			},
			nonNegativeInteger: {
				type: "integer",
				minimum: 0
			},
			nonNegativeIntegerDefault0: { allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }] },
			simpleTypes: { enum: [
				"array",
				"boolean",
				"integer",
				"null",
				"number",
				"object",
				"string"
			] },
			stringArray: {
				type: "array",
				items: { type: "string" },
				uniqueItems: !0,
				default: []
			}
		},
		type: ["object", "boolean"],
		properties: {
			$id: {
				type: "string",
				format: "uri-reference"
			},
			$schema: {
				type: "string",
				format: "uri"
			},
			$ref: {
				type: "string",
				format: "uri-reference"
			},
			$comment: { type: "string" },
			title: { type: "string" },
			description: { type: "string" },
			default: !0,
			readOnly: {
				type: "boolean",
				default: !1
			},
			examples: {
				type: "array",
				items: !0
			},
			multipleOf: {
				type: "number",
				exclusiveMinimum: 0
			},
			maximum: { type: "number" },
			exclusiveMaximum: { type: "number" },
			minimum: { type: "number" },
			exclusiveMinimum: { type: "number" },
			maxLength: { $ref: "#/definitions/nonNegativeInteger" },
			minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
			pattern: {
				type: "string",
				format: "regex"
			},
			additionalItems: { $ref: "#" },
			items: {
				anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }],
				default: !0
			},
			maxItems: { $ref: "#/definitions/nonNegativeInteger" },
			minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
			uniqueItems: {
				type: "boolean",
				default: !1
			},
			contains: { $ref: "#" },
			maxProperties: { $ref: "#/definitions/nonNegativeInteger" },
			minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
			required: { $ref: "#/definitions/stringArray" },
			additionalProperties: { $ref: "#" },
			definitions: {
				type: "object",
				additionalProperties: { $ref: "#" },
				default: {}
			},
			properties: {
				type: "object",
				additionalProperties: { $ref: "#" },
				default: {}
			},
			patternProperties: {
				type: "object",
				additionalProperties: { $ref: "#" },
				propertyNames: { format: "regex" },
				default: {}
			},
			dependencies: {
				type: "object",
				additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] }
			},
			propertyNames: { $ref: "#" },
			const: !0,
			enum: {
				type: "array",
				items: !0,
				minItems: 1,
				uniqueItems: !0
			},
			type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, {
				type: "array",
				items: { $ref: "#/definitions/simpleTypes" },
				minItems: 1,
				uniqueItems: !0
			}] },
			format: { type: "string" },
			contentMediaType: { type: "string" },
			contentEncoding: { type: "string" },
			if: { $ref: "#" },
			then: { $ref: "#" },
			else: { $ref: "#" },
			allOf: { $ref: "#/definitions/schemaArray" },
			anyOf: { $ref: "#/definitions/schemaArray" },
			oneOf: { $ref: "#/definitions/schemaArray" },
			not: { $ref: "#" }
		},
		default: !0
	};
})), require_ajv = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.MissingRefError = exports.ValidationError = exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = exports.Ajv = void 0;
	let core_1 = require_core$3(), draft7_1 = require_draft7(), discriminator_1 = require_discriminator(), draft7MetaSchema = require_json_schema_draft_07(), META_SUPPORT_DATA = ["/properties"], META_SCHEMA_ID = "http://json-schema.org/draft-07/schema";
	var Ajv2 = class extends core_1.default {
		_addVocabularies() {
			super._addVocabularies(), draft7_1.default.forEach((v) => this.addVocabulary(v)), this.opts.discriminator && this.addKeyword(discriminator_1.default);
		}
		_addDefaultMetaSchema() {
			if (super._addDefaultMetaSchema(), !this.opts.meta) return;
			let metaSchema = this.opts.$data ? this.$dataMetaSchema(draft7MetaSchema, META_SUPPORT_DATA) : draft7MetaSchema;
			this.addMetaSchema(metaSchema, META_SCHEMA_ID, !1), this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
		}
		defaultMeta() {
			return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : void 0);
		}
	};
	exports.Ajv = Ajv2, module.exports = exports = Ajv2, module.exports.Ajv = Ajv2, Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = Ajv2;
	var validate_1 = require_validate();
	Object.defineProperty(exports, "KeywordCxt", {
		enumerable: !0,
		get: function() {
			return validate_1.KeywordCxt;
		}
	});
	var codegen_1 = require_codegen();
	Object.defineProperty(exports, "_", {
		enumerable: !0,
		get: function() {
			return codegen_1._;
		}
	}), Object.defineProperty(exports, "str", {
		enumerable: !0,
		get: function() {
			return codegen_1.str;
		}
	}), Object.defineProperty(exports, "stringify", {
		enumerable: !0,
		get: function() {
			return codegen_1.stringify;
		}
	}), Object.defineProperty(exports, "nil", {
		enumerable: !0,
		get: function() {
			return codegen_1.nil;
		}
	}), Object.defineProperty(exports, "Name", {
		enumerable: !0,
		get: function() {
			return codegen_1.Name;
		}
	}), Object.defineProperty(exports, "CodeGen", {
		enumerable: !0,
		get: function() {
			return codegen_1.CodeGen;
		}
	});
	var validation_error_1 = require_validation_error();
	Object.defineProperty(exports, "ValidationError", {
		enumerable: !0,
		get: function() {
			return validation_error_1.default;
		}
	});
	var ref_error_1 = require_ref_error();
	Object.defineProperty(exports, "MissingRefError", {
		enumerable: !0,
		get: function() {
			return ref_error_1.default;
		}
	});
})), require_dynamicAnchor = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.dynamicAnchor = void 0;
	let codegen_1 = require_codegen(), names_1 = require_names(), compile_1 = require_compile(), ref_1 = require_ref(), def = {
		keyword: "$dynamicAnchor",
		schemaType: "string",
		code: (cxt) => dynamicAnchor(cxt, cxt.schema)
	};
	function dynamicAnchor(cxt, anchor) {
		let { gen, it } = cxt;
		it.schemaEnv.root.dynamicAnchors[anchor] = !0;
		let v = (0, codegen_1._)`${names_1.default.dynamicAnchors}${(0, codegen_1.getProperty)(anchor)}`, validate = it.errSchemaPath === "#" ? it.validateName : _getValidate(cxt);
		gen.if((0, codegen_1._)`!${v}`, () => gen.assign(v, validate));
	}
	exports.dynamicAnchor = dynamicAnchor;
	function _getValidate(cxt) {
		let { schemaEnv, schema, self } = cxt.it, { root, baseId, localRefs, meta } = schemaEnv.root, { schemaId } = self.opts, sch = new compile_1.SchemaEnv({
			schema,
			schemaId,
			root,
			baseId,
			localRefs,
			meta
		});
		return compile_1.compileSchema.call(self, sch), (0, ref_1.getValidate)(cxt, sch);
	}
	exports.default = def;
})), require_dynamicRef = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.dynamicRef = void 0;
	let codegen_1 = require_codegen(), names_1 = require_names(), ref_1 = require_ref(), def = {
		keyword: "$dynamicRef",
		schemaType: "string",
		code: (cxt) => dynamicRef(cxt, cxt.schema)
	};
	function dynamicRef(cxt, ref) {
		let { gen, keyword, it } = cxt;
		if (ref[0] !== "#") throw new Error(`"${keyword}" only supports hash fragment reference`);
		let anchor = ref.slice(1);
		if (it.allErrors) _dynamicRef();
		else {
			let valid = gen.let("valid", !1);
			_dynamicRef(valid), cxt.ok(valid);
		}
		function _dynamicRef(valid) {
			if (it.schemaEnv.root.dynamicAnchors[anchor]) {
				let v = gen.let("_v", (0, codegen_1._)`${names_1.default.dynamicAnchors}${(0, codegen_1.getProperty)(anchor)}`);
				gen.if(v, _callRef(v, valid), _callRef(it.validateName, valid));
			} else _callRef(it.validateName, valid)();
		}
		function _callRef(validate, valid) {
			return valid ? () => gen.block(() => {
				(0, ref_1.callRef)(cxt, validate), gen.let(valid, !0);
			}) : () => (0, ref_1.callRef)(cxt, validate);
		}
	}
	exports.dynamicRef = dynamicRef, exports.default = def;
})), require_recursiveAnchor = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let dynamicAnchor_1 = require_dynamicAnchor(), util_1 = require_util(), def = {
		keyword: "$recursiveAnchor",
		schemaType: "boolean",
		code(cxt) {
			cxt.schema ? (0, dynamicAnchor_1.dynamicAnchor)(cxt, "") : (0, util_1.checkStrictMode)(cxt.it, "$recursiveAnchor: false is ignored");
		}
	};
	exports.default = def;
})), require_recursiveRef = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let dynamicRef_1 = require_dynamicRef(), def = {
		keyword: "$recursiveRef",
		schemaType: "string",
		code: (cxt) => (0, dynamicRef_1.dynamicRef)(cxt, cxt.schema)
	};
	exports.default = def;
})), require_dynamic = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let dynamicAnchor_1 = require_dynamicAnchor(), dynamicRef_1 = require_dynamicRef(), recursiveAnchor_1 = require_recursiveAnchor(), recursiveRef_1 = require_recursiveRef(), dynamic = [
		dynamicAnchor_1.default,
		dynamicRef_1.default,
		recursiveAnchor_1.default,
		recursiveRef_1.default
	];
	exports.default = dynamic;
})), require_dependentRequired = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let dependencies_1 = require_dependencies(), def = {
		keyword: "dependentRequired",
		type: "object",
		schemaType: "object",
		error: dependencies_1.error,
		code: (cxt) => (0, dependencies_1.validatePropertyDeps)(cxt)
	};
	exports.default = def;
})), require_dependentSchemas = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let dependencies_1 = require_dependencies(), def = {
		keyword: "dependentSchemas",
		type: "object",
		schemaType: "object",
		code: (cxt) => (0, dependencies_1.validateSchemaDeps)(cxt)
	};
	exports.default = def;
})), require_limitContains = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let util_1 = require_util(), def = {
		keyword: ["maxContains", "minContains"],
		type: "array",
		schemaType: "number",
		code({ keyword, parentSchema, it }) {
			parentSchema.contains === void 0 && (0, util_1.checkStrictMode)(it, `"${keyword}" without "contains" is ignored`);
		}
	};
	exports.default = def;
})), require_next = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let dependentRequired_1 = require_dependentRequired(), dependentSchemas_1 = require_dependentSchemas(), limitContains_1 = require_limitContains(), next = [
		dependentRequired_1.default,
		dependentSchemas_1.default,
		limitContains_1.default
	];
	exports.default = next;
})), require_unevaluatedProperties = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let codegen_1 = require_codegen(), util_1 = require_util(), names_1 = require_names(), def = {
		keyword: "unevaluatedProperties",
		type: "object",
		schemaType: ["boolean", "object"],
		trackErrors: !0,
		error: {
			message: "must NOT have unevaluated properties",
			params: ({ params }) => (0, codegen_1._)`{unevaluatedProperty: ${params.unevaluatedProperty}}`
		},
		code(cxt) {
			let { gen, schema, data, errsCount, it } = cxt;
			if (!errsCount) throw new Error("ajv implementation error");
			let { allErrors, props } = it;
			props instanceof codegen_1.Name ? gen.if((0, codegen_1._)`${props} !== true`, () => gen.forIn("key", data, (key) => gen.if(unevaluatedDynamic(props, key), () => unevaluatedPropCode(key)))) : props !== !0 && gen.forIn("key", data, (key) => props === void 0 ? unevaluatedPropCode(key) : gen.if(unevaluatedStatic(props, key), () => unevaluatedPropCode(key))), it.props = !0, cxt.ok((0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
			function unevaluatedPropCode(key) {
				if (schema === !1) {
					cxt.setParams({ unevaluatedProperty: key }), cxt.error(), allErrors || gen.break();
					return;
				}
				if (!(0, util_1.alwaysValidSchema)(it, schema)) {
					let valid = gen.name("valid");
					cxt.subschema({
						keyword: "unevaluatedProperties",
						dataProp: key,
						dataPropType: util_1.Type.Str
					}, valid), allErrors || gen.if((0, codegen_1.not)(valid), () => gen.break());
				}
			}
			function unevaluatedDynamic(evaluatedProps, key) {
				return (0, codegen_1._)`!${evaluatedProps} || !${evaluatedProps}[${key}]`;
			}
			function unevaluatedStatic(evaluatedProps, key) {
				let ps = [];
				for (let p in evaluatedProps) evaluatedProps[p] === !0 && ps.push((0, codegen_1._)`${key} !== ${p}`);
				return (0, codegen_1.and)(...ps);
			}
		}
	};
	exports.default = def;
})), require_unevaluatedItems = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let codegen_1 = require_codegen(), util_1 = require_util(), def = {
		keyword: "unevaluatedItems",
		type: "array",
		schemaType: ["boolean", "object"],
		error: {
			message: ({ params: { len } }) => (0, codegen_1.str)`must NOT have more than ${len} items`,
			params: ({ params: { len } }) => (0, codegen_1._)`{limit: ${len}}`
		},
		code(cxt) {
			let { gen, schema, data, it } = cxt, items = it.items || 0;
			if (items === !0) return;
			let len = gen.const("len", (0, codegen_1._)`${data}.length`);
			if (schema === !1)
				cxt.setParams({ len: items }), cxt.fail((0, codegen_1._)`${len} > ${items}`);
			else if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
				let valid = gen.var("valid", (0, codegen_1._)`${len} <= ${items}`);
				gen.if((0, codegen_1.not)(valid), () => validateItems(valid, items)), cxt.ok(valid);
			}
			it.items = !0;
			function validateItems(valid, from) {
				gen.forRange("i", from, len, (i) => {
					cxt.subschema({
						keyword: "unevaluatedItems",
						dataProp: i,
						dataPropType: util_1.Type.Num
					}, valid), it.allErrors || gen.if((0, codegen_1.not)(valid), () => gen.break());
				});
			}
		}
	};
	exports.default = def;
})), require_unevaluated$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let unevaluatedProperties_1 = require_unevaluatedProperties(), unevaluatedItems_1 = require_unevaluatedItems(), unevaluated = [unevaluatedProperties_1.default, unevaluatedItems_1.default];
	exports.default = unevaluated;
})), require_schema$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		$schema: "https://json-schema.org/draft/2019-09/schema",
		$id: "https://json-schema.org/draft/2019-09/schema",
		$vocabulary: {
			"https://json-schema.org/draft/2019-09/vocab/core": !0,
			"https://json-schema.org/draft/2019-09/vocab/applicator": !0,
			"https://json-schema.org/draft/2019-09/vocab/validation": !0,
			"https://json-schema.org/draft/2019-09/vocab/meta-data": !0,
			"https://json-schema.org/draft/2019-09/vocab/format": !1,
			"https://json-schema.org/draft/2019-09/vocab/content": !0
		},
		$recursiveAnchor: !0,
		title: "Core and Validation specifications meta-schema",
		allOf: [
			{ $ref: "meta/core" },
			{ $ref: "meta/applicator" },
			{ $ref: "meta/validation" },
			{ $ref: "meta/meta-data" },
			{ $ref: "meta/format" },
			{ $ref: "meta/content" }
		],
		type: ["object", "boolean"],
		properties: {
			definitions: {
				$comment: "While no longer an official keyword as it is replaced by $defs, this keyword is retained in the meta-schema to prevent incompatible extensions as it remains in common use.",
				type: "object",
				additionalProperties: { $recursiveRef: "#" },
				default: {}
			},
			dependencies: {
				$comment: '"dependencies" is no longer a keyword, but schema authors should avoid redefining it to facilitate a smooth transition to "dependentSchemas" and "dependentRequired"',
				type: "object",
				additionalProperties: { anyOf: [{ $recursiveRef: "#" }, { $ref: "meta/validation#/$defs/stringArray" }] }
			}
		}
	};
})), require_applicator$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		$schema: "https://json-schema.org/draft/2019-09/schema",
		$id: "https://json-schema.org/draft/2019-09/meta/applicator",
		$vocabulary: { "https://json-schema.org/draft/2019-09/vocab/applicator": !0 },
		$recursiveAnchor: !0,
		title: "Applicator vocabulary meta-schema",
		type: ["object", "boolean"],
		properties: {
			additionalItems: { $recursiveRef: "#" },
			unevaluatedItems: { $recursiveRef: "#" },
			items: { anyOf: [{ $recursiveRef: "#" }, { $ref: "#/$defs/schemaArray" }] },
			contains: { $recursiveRef: "#" },
			additionalProperties: { $recursiveRef: "#" },
			unevaluatedProperties: { $recursiveRef: "#" },
			properties: {
				type: "object",
				additionalProperties: { $recursiveRef: "#" },
				default: {}
			},
			patternProperties: {
				type: "object",
				additionalProperties: { $recursiveRef: "#" },
				propertyNames: { format: "regex" },
				default: {}
			},
			dependentSchemas: {
				type: "object",
				additionalProperties: { $recursiveRef: "#" }
			},
			propertyNames: { $recursiveRef: "#" },
			if: { $recursiveRef: "#" },
			then: { $recursiveRef: "#" },
			else: { $recursiveRef: "#" },
			allOf: { $ref: "#/$defs/schemaArray" },
			anyOf: { $ref: "#/$defs/schemaArray" },
			oneOf: { $ref: "#/$defs/schemaArray" },
			not: { $recursiveRef: "#" }
		},
		$defs: { schemaArray: {
			type: "array",
			minItems: 1,
			items: { $recursiveRef: "#" }
		} }
	};
})), require_content$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		$schema: "https://json-schema.org/draft/2019-09/schema",
		$id: "https://json-schema.org/draft/2019-09/meta/content",
		$vocabulary: { "https://json-schema.org/draft/2019-09/vocab/content": !0 },
		$recursiveAnchor: !0,
		title: "Content vocabulary meta-schema",
		type: ["object", "boolean"],
		properties: {
			contentMediaType: { type: "string" },
			contentEncoding: { type: "string" },
			contentSchema: { $recursiveRef: "#" }
		}
	};
})), require_core$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		$schema: "https://json-schema.org/draft/2019-09/schema",
		$id: "https://json-schema.org/draft/2019-09/meta/core",
		$vocabulary: { "https://json-schema.org/draft/2019-09/vocab/core": !0 },
		$recursiveAnchor: !0,
		title: "Core vocabulary meta-schema",
		type: ["object", "boolean"],
		properties: {
			$id: {
				type: "string",
				format: "uri-reference",
				$comment: "Non-empty fragments not allowed.",
				pattern: "^[^#]*#?$"
			},
			$schema: {
				type: "string",
				format: "uri"
			},
			$anchor: {
				type: "string",
				pattern: "^[A-Za-z][-A-Za-z0-9.:_]*$"
			},
			$ref: {
				type: "string",
				format: "uri-reference"
			},
			$recursiveRef: {
				type: "string",
				format: "uri-reference"
			},
			$recursiveAnchor: {
				type: "boolean",
				default: !1
			},
			$vocabulary: {
				type: "object",
				propertyNames: {
					type: "string",
					format: "uri"
				},
				additionalProperties: { type: "boolean" }
			},
			$comment: { type: "string" },
			$defs: {
				type: "object",
				additionalProperties: { $recursiveRef: "#" },
				default: {}
			}
		}
	};
})), require_format = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		$schema: "https://json-schema.org/draft/2019-09/schema",
		$id: "https://json-schema.org/draft/2019-09/meta/format",
		$vocabulary: { "https://json-schema.org/draft/2019-09/vocab/format": !0 },
		$recursiveAnchor: !0,
		title: "Format vocabulary meta-schema",
		type: ["object", "boolean"],
		properties: { format: { type: "string" } }
	};
})), require_meta_data$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		$schema: "https://json-schema.org/draft/2019-09/schema",
		$id: "https://json-schema.org/draft/2019-09/meta/meta-data",
		$vocabulary: { "https://json-schema.org/draft/2019-09/vocab/meta-data": !0 },
		$recursiveAnchor: !0,
		title: "Meta-data vocabulary meta-schema",
		type: ["object", "boolean"],
		properties: {
			title: { type: "string" },
			description: { type: "string" },
			default: !0,
			deprecated: {
				type: "boolean",
				default: !1
			},
			readOnly: {
				type: "boolean",
				default: !1
			},
			writeOnly: {
				type: "boolean",
				default: !1
			},
			examples: {
				type: "array",
				items: !0
			}
		}
	};
})), require_validation$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		$schema: "https://json-schema.org/draft/2019-09/schema",
		$id: "https://json-schema.org/draft/2019-09/meta/validation",
		$vocabulary: { "https://json-schema.org/draft/2019-09/vocab/validation": !0 },
		$recursiveAnchor: !0,
		title: "Validation vocabulary meta-schema",
		type: ["object", "boolean"],
		properties: {
			multipleOf: {
				type: "number",
				exclusiveMinimum: 0
			},
			maximum: { type: "number" },
			exclusiveMaximum: { type: "number" },
			minimum: { type: "number" },
			exclusiveMinimum: { type: "number" },
			maxLength: { $ref: "#/$defs/nonNegativeInteger" },
			minLength: { $ref: "#/$defs/nonNegativeIntegerDefault0" },
			pattern: {
				type: "string",
				format: "regex"
			},
			maxItems: { $ref: "#/$defs/nonNegativeInteger" },
			minItems: { $ref: "#/$defs/nonNegativeIntegerDefault0" },
			uniqueItems: {
				type: "boolean",
				default: !1
			},
			maxContains: { $ref: "#/$defs/nonNegativeInteger" },
			minContains: {
				$ref: "#/$defs/nonNegativeInteger",
				default: 1
			},
			maxProperties: { $ref: "#/$defs/nonNegativeInteger" },
			minProperties: { $ref: "#/$defs/nonNegativeIntegerDefault0" },
			required: { $ref: "#/$defs/stringArray" },
			dependentRequired: {
				type: "object",
				additionalProperties: { $ref: "#/$defs/stringArray" }
			},
			const: !0,
			enum: {
				type: "array",
				items: !0
			},
			type: { anyOf: [{ $ref: "#/$defs/simpleTypes" }, {
				type: "array",
				items: { $ref: "#/$defs/simpleTypes" },
				minItems: 1,
				uniqueItems: !0
			}] }
		},
		$defs: {
			nonNegativeInteger: {
				type: "integer",
				minimum: 0
			},
			nonNegativeIntegerDefault0: {
				$ref: "#/$defs/nonNegativeInteger",
				default: 0
			},
			simpleTypes: { enum: [
				"array",
				"boolean",
				"integer",
				"null",
				"number",
				"object",
				"string"
			] },
			stringArray: {
				type: "array",
				items: { type: "string" },
				uniqueItems: !0,
				default: []
			}
		}
	};
})), require_json_schema_2019_09 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let metaSchema = require_schema$1(), applicator = require_applicator$1(), content = require_content$1(), core = require_core$1(), format = require_format(), metadata = require_meta_data$1(), validation = require_validation$1(), META_SUPPORT_DATA = ["/properties"];
	function addMetaSchema2019($data) {
		return [
			metaSchema,
			applicator,
			content,
			core,
			with$data(this, format),
			metadata,
			with$data(this, validation)
		].forEach((sch) => this.addMetaSchema(sch, void 0, !1)), this;
		function with$data(ajv, sch) {
			return $data ? ajv.$dataMetaSchema(sch, META_SUPPORT_DATA) : sch;
		}
	}
	exports.default = addMetaSchema2019;
})), require__2019 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.MissingRefError = exports.ValidationError = exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = exports.Ajv2019 = void 0;
	let core_1 = require_core$3(), draft7_1 = require_draft7(), dynamic_1 = require_dynamic(), next_1 = require_next(), unevaluated_1 = require_unevaluated$1(), discriminator_1 = require_discriminator(), json_schema_2019_09_1 = require_json_schema_2019_09(), META_SCHEMA_ID = "https://json-schema.org/draft/2019-09/schema";
	var Ajv2019 = class extends core_1.default {
		constructor(opts = {}) {
			super({
				...opts,
				dynamicRef: !0,
				next: !0,
				unevaluated: !0
			});
		}
		_addVocabularies() {
			super._addVocabularies(), this.addVocabulary(dynamic_1.default), draft7_1.default.forEach((v) => this.addVocabulary(v)), this.addVocabulary(next_1.default), this.addVocabulary(unevaluated_1.default), this.opts.discriminator && this.addKeyword(discriminator_1.default);
		}
		_addDefaultMetaSchema() {
			super._addDefaultMetaSchema();
			let { $data, meta } = this.opts;
			meta && (json_schema_2019_09_1.default.call(this, $data), this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID);
		}
		defaultMeta() {
			return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : void 0);
		}
	};
	exports.Ajv2019 = Ajv2019, module.exports = exports = Ajv2019, module.exports.Ajv2019 = Ajv2019, Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = Ajv2019;
	var validate_1 = require_validate();
	Object.defineProperty(exports, "KeywordCxt", {
		enumerable: !0,
		get: function() {
			return validate_1.KeywordCxt;
		}
	});
	var codegen_1 = require_codegen();
	Object.defineProperty(exports, "_", {
		enumerable: !0,
		get: function() {
			return codegen_1._;
		}
	}), Object.defineProperty(exports, "str", {
		enumerable: !0,
		get: function() {
			return codegen_1.str;
		}
	}), Object.defineProperty(exports, "stringify", {
		enumerable: !0,
		get: function() {
			return codegen_1.stringify;
		}
	}), Object.defineProperty(exports, "nil", {
		enumerable: !0,
		get: function() {
			return codegen_1.nil;
		}
	}), Object.defineProperty(exports, "Name", {
		enumerable: !0,
		get: function() {
			return codegen_1.Name;
		}
	}), Object.defineProperty(exports, "CodeGen", {
		enumerable: !0,
		get: function() {
			return codegen_1.CodeGen;
		}
	});
	var validation_error_1 = require_validation_error();
	Object.defineProperty(exports, "ValidationError", {
		enumerable: !0,
		get: function() {
			return validation_error_1.default;
		}
	});
	var ref_error_1 = require_ref_error();
	Object.defineProperty(exports, "MissingRefError", {
		enumerable: !0,
		get: function() {
			return ref_error_1.default;
		}
	});
})), require_draft2020 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let core_1 = require_core$2(), validation_1 = require_validation$2(), applicator_1 = require_applicator$2(), dynamic_1 = require_dynamic(), next_1 = require_next(), unevaluated_1 = require_unevaluated$1(), format_1 = require_format$1(), metadata_1 = require_metadata(), draft2020Vocabularies = [
		dynamic_1.default,
		core_1.default,
		validation_1.default,
		(0, applicator_1.default)(!0),
		format_1.default,
		metadata_1.metadataVocabulary,
		metadata_1.contentVocabulary,
		next_1.default,
		unevaluated_1.default
	];
	exports.default = draft2020Vocabularies;
})), require_schema = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$id: "https://json-schema.org/draft/2020-12/schema",
		$vocabulary: {
			"https://json-schema.org/draft/2020-12/vocab/core": !0,
			"https://json-schema.org/draft/2020-12/vocab/applicator": !0,
			"https://json-schema.org/draft/2020-12/vocab/unevaluated": !0,
			"https://json-schema.org/draft/2020-12/vocab/validation": !0,
			"https://json-schema.org/draft/2020-12/vocab/meta-data": !0,
			"https://json-schema.org/draft/2020-12/vocab/format-annotation": !0,
			"https://json-schema.org/draft/2020-12/vocab/content": !0
		},
		$dynamicAnchor: "meta",
		title: "Core and Validation specifications meta-schema",
		allOf: [
			{ $ref: "meta/core" },
			{ $ref: "meta/applicator" },
			{ $ref: "meta/unevaluated" },
			{ $ref: "meta/validation" },
			{ $ref: "meta/meta-data" },
			{ $ref: "meta/format-annotation" },
			{ $ref: "meta/content" }
		],
		type: ["object", "boolean"],
		$comment: "This meta-schema also defines keywords that have appeared in previous drafts in order to prevent incompatible extensions as they remain in common use.",
		properties: {
			definitions: {
				$comment: '"definitions" has been replaced by "$defs".',
				type: "object",
				additionalProperties: { $dynamicRef: "#meta" },
				deprecated: !0,
				default: {}
			},
			dependencies: {
				$comment: '"dependencies" has been split and replaced by "dependentSchemas" and "dependentRequired" in order to serve their differing semantics.',
				type: "object",
				additionalProperties: { anyOf: [{ $dynamicRef: "#meta" }, { $ref: "meta/validation#/$defs/stringArray" }] },
				deprecated: !0,
				default: {}
			},
			$recursiveAnchor: {
				$comment: '"$recursiveAnchor" has been replaced by "$dynamicAnchor".',
				$ref: "meta/core#/$defs/anchorString",
				deprecated: !0
			},
			$recursiveRef: {
				$comment: '"$recursiveRef" has been replaced by "$dynamicRef".',
				$ref: "meta/core#/$defs/uriReferenceString",
				deprecated: !0
			}
		}
	};
})), require_applicator = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$id: "https://json-schema.org/draft/2020-12/meta/applicator",
		$vocabulary: { "https://json-schema.org/draft/2020-12/vocab/applicator": !0 },
		$dynamicAnchor: "meta",
		title: "Applicator vocabulary meta-schema",
		type: ["object", "boolean"],
		properties: {
			prefixItems: { $ref: "#/$defs/schemaArray" },
			items: { $dynamicRef: "#meta" },
			contains: { $dynamicRef: "#meta" },
			additionalProperties: { $dynamicRef: "#meta" },
			properties: {
				type: "object",
				additionalProperties: { $dynamicRef: "#meta" },
				default: {}
			},
			patternProperties: {
				type: "object",
				additionalProperties: { $dynamicRef: "#meta" },
				propertyNames: { format: "regex" },
				default: {}
			},
			dependentSchemas: {
				type: "object",
				additionalProperties: { $dynamicRef: "#meta" },
				default: {}
			},
			propertyNames: { $dynamicRef: "#meta" },
			if: { $dynamicRef: "#meta" },
			then: { $dynamicRef: "#meta" },
			else: { $dynamicRef: "#meta" },
			allOf: { $ref: "#/$defs/schemaArray" },
			anyOf: { $ref: "#/$defs/schemaArray" },
			oneOf: { $ref: "#/$defs/schemaArray" },
			not: { $dynamicRef: "#meta" }
		},
		$defs: { schemaArray: {
			type: "array",
			minItems: 1,
			items: { $dynamicRef: "#meta" }
		} }
	};
})), require_unevaluated = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$id: "https://json-schema.org/draft/2020-12/meta/unevaluated",
		$vocabulary: { "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0 },
		$dynamicAnchor: "meta",
		title: "Unevaluated applicator vocabulary meta-schema",
		type: ["object", "boolean"],
		properties: {
			unevaluatedItems: { $dynamicRef: "#meta" },
			unevaluatedProperties: { $dynamicRef: "#meta" }
		}
	};
})), require_content = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$id: "https://json-schema.org/draft/2020-12/meta/content",
		$vocabulary: { "https://json-schema.org/draft/2020-12/vocab/content": !0 },
		$dynamicAnchor: "meta",
		title: "Content vocabulary meta-schema",
		type: ["object", "boolean"],
		properties: {
			contentEncoding: { type: "string" },
			contentMediaType: { type: "string" },
			contentSchema: { $dynamicRef: "#meta" }
		}
	};
})), require_core = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$id: "https://json-schema.org/draft/2020-12/meta/core",
		$vocabulary: { "https://json-schema.org/draft/2020-12/vocab/core": !0 },
		$dynamicAnchor: "meta",
		title: "Core vocabulary meta-schema",
		type: ["object", "boolean"],
		properties: {
			$id: {
				$ref: "#/$defs/uriReferenceString",
				$comment: "Non-empty fragments not allowed.",
				pattern: "^[^#]*#?$"
			},
			$schema: { $ref: "#/$defs/uriString" },
			$ref: { $ref: "#/$defs/uriReferenceString" },
			$anchor: { $ref: "#/$defs/anchorString" },
			$dynamicRef: { $ref: "#/$defs/uriReferenceString" },
			$dynamicAnchor: { $ref: "#/$defs/anchorString" },
			$vocabulary: {
				type: "object",
				propertyNames: { $ref: "#/$defs/uriString" },
				additionalProperties: { type: "boolean" }
			},
			$comment: { type: "string" },
			$defs: {
				type: "object",
				additionalProperties: { $dynamicRef: "#meta" }
			}
		},
		$defs: {
			anchorString: {
				type: "string",
				pattern: "^[A-Za-z_][-A-Za-z0-9._]*$"
			},
			uriString: {
				type: "string",
				format: "uri"
			},
			uriReferenceString: {
				type: "string",
				format: "uri-reference"
			}
		}
	};
})), require_format_annotation = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$id: "https://json-schema.org/draft/2020-12/meta/format-annotation",
		$vocabulary: { "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0 },
		$dynamicAnchor: "meta",
		title: "Format vocabulary meta-schema for annotation results",
		type: ["object", "boolean"],
		properties: { format: { type: "string" } }
	};
})), require_meta_data = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$id: "https://json-schema.org/draft/2020-12/meta/meta-data",
		$vocabulary: { "https://json-schema.org/draft/2020-12/vocab/meta-data": !0 },
		$dynamicAnchor: "meta",
		title: "Meta-data vocabulary meta-schema",
		type: ["object", "boolean"],
		properties: {
			title: { type: "string" },
			description: { type: "string" },
			default: !0,
			deprecated: {
				type: "boolean",
				default: !1
			},
			readOnly: {
				type: "boolean",
				default: !1
			},
			writeOnly: {
				type: "boolean",
				default: !1
			},
			examples: {
				type: "array",
				items: !0
			}
		}
	};
})), require_validation = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		$id: "https://json-schema.org/draft/2020-12/meta/validation",
		$vocabulary: { "https://json-schema.org/draft/2020-12/vocab/validation": !0 },
		$dynamicAnchor: "meta",
		title: "Validation vocabulary meta-schema",
		type: ["object", "boolean"],
		properties: {
			type: { anyOf: [{ $ref: "#/$defs/simpleTypes" }, {
				type: "array",
				items: { $ref: "#/$defs/simpleTypes" },
				minItems: 1,
				uniqueItems: !0
			}] },
			const: !0,
			enum: {
				type: "array",
				items: !0
			},
			multipleOf: {
				type: "number",
				exclusiveMinimum: 0
			},
			maximum: { type: "number" },
			exclusiveMaximum: { type: "number" },
			minimum: { type: "number" },
			exclusiveMinimum: { type: "number" },
			maxLength: { $ref: "#/$defs/nonNegativeInteger" },
			minLength: { $ref: "#/$defs/nonNegativeIntegerDefault0" },
			pattern: {
				type: "string",
				format: "regex"
			},
			maxItems: { $ref: "#/$defs/nonNegativeInteger" },
			minItems: { $ref: "#/$defs/nonNegativeIntegerDefault0" },
			uniqueItems: {
				type: "boolean",
				default: !1
			},
			maxContains: { $ref: "#/$defs/nonNegativeInteger" },
			minContains: {
				$ref: "#/$defs/nonNegativeInteger",
				default: 1
			},
			maxProperties: { $ref: "#/$defs/nonNegativeInteger" },
			minProperties: { $ref: "#/$defs/nonNegativeIntegerDefault0" },
			required: { $ref: "#/$defs/stringArray" },
			dependentRequired: {
				type: "object",
				additionalProperties: { $ref: "#/$defs/stringArray" }
			}
		},
		$defs: {
			nonNegativeInteger: {
				type: "integer",
				minimum: 0
			},
			nonNegativeIntegerDefault0: {
				$ref: "#/$defs/nonNegativeInteger",
				default: 0
			},
			simpleTypes: { enum: [
				"array",
				"boolean",
				"integer",
				"null",
				"number",
				"object",
				"string"
			] },
			stringArray: {
				type: "array",
				items: { type: "string" },
				uniqueItems: !0,
				default: []
			}
		}
	};
})), require_json_schema_2020_12 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let metaSchema = require_schema(), applicator = require_applicator(), unevaluated = require_unevaluated(), content = require_content(), core = require_core(), format = require_format_annotation(), metadata = require_meta_data(), validation = require_validation(), META_SUPPORT_DATA = ["/properties"];
	function addMetaSchema2020($data) {
		return [
			metaSchema,
			applicator,
			unevaluated,
			content,
			core,
			with$data(this, format),
			metadata,
			with$data(this, validation)
		].forEach((sch) => this.addMetaSchema(sch, void 0, !1)), this;
		function with$data(ajv, sch) {
			return $data ? ajv.$dataMetaSchema(sch, META_SUPPORT_DATA) : sch;
		}
	}
	exports.default = addMetaSchema2020;
})), require__2020 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.MissingRefError = exports.ValidationError = exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = exports.Ajv2020 = void 0;
	let core_1 = require_core$3(), draft2020_1 = require_draft2020(), discriminator_1 = require_discriminator(), json_schema_2020_12_1 = require_json_schema_2020_12(), META_SCHEMA_ID = "https://json-schema.org/draft/2020-12/schema";
	var Ajv2020 = class extends core_1.default {
		constructor(opts = {}) {
			super({
				...opts,
				dynamicRef: !0,
				next: !0,
				unevaluated: !0
			});
		}
		_addVocabularies() {
			super._addVocabularies(), draft2020_1.default.forEach((v) => this.addVocabulary(v)), this.opts.discriminator && this.addKeyword(discriminator_1.default);
		}
		_addDefaultMetaSchema() {
			super._addDefaultMetaSchema();
			let { $data, meta } = this.opts;
			meta && (json_schema_2020_12_1.default.call(this, $data), this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID);
		}
		defaultMeta() {
			return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : void 0);
		}
	};
	exports.Ajv2020 = Ajv2020, module.exports = exports = Ajv2020, module.exports.Ajv2020 = Ajv2020, Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = Ajv2020;
	var validate_1 = require_validate();
	Object.defineProperty(exports, "KeywordCxt", {
		enumerable: !0,
		get: function() {
			return validate_1.KeywordCxt;
		}
	});
	var codegen_1 = require_codegen();
	Object.defineProperty(exports, "_", {
		enumerable: !0,
		get: function() {
			return codegen_1._;
		}
	}), Object.defineProperty(exports, "str", {
		enumerable: !0,
		get: function() {
			return codegen_1.str;
		}
	}), Object.defineProperty(exports, "stringify", {
		enumerable: !0,
		get: function() {
			return codegen_1.stringify;
		}
	}), Object.defineProperty(exports, "nil", {
		enumerable: !0,
		get: function() {
			return codegen_1.nil;
		}
	}), Object.defineProperty(exports, "Name", {
		enumerable: !0,
		get: function() {
			return codegen_1.Name;
		}
	}), Object.defineProperty(exports, "CodeGen", {
		enumerable: !0,
		get: function() {
			return codegen_1.CodeGen;
		}
	});
	var validation_error_1 = require_validation_error();
	Object.defineProperty(exports, "ValidationError", {
		enumerable: !0,
		get: function() {
			return validation_error_1.default;
		}
	});
	var ref_error_1 = require_ref_error();
	Object.defineProperty(exports, "MissingRefError", {
		enumerable: !0,
		get: function() {
			return ref_error_1.default;
		}
	});
})), require_formats = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.formatNames = exports.fastFormats = exports.fullFormats = void 0;
	function fmtDef(validate, compare) {
		return {
			validate,
			compare
		};
	}
	exports.fullFormats = {
		date: fmtDef(date, compareDate),
		time: fmtDef(getTime(!0), compareTime),
		"date-time": fmtDef(getDateTime(!0), compareDateTime),
		"iso-time": fmtDef(getTime(), compareIsoTime),
		"iso-date-time": fmtDef(getDateTime(), compareIsoDateTime),
		duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
		uri,
		"uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
		"uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
		url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
		email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
		hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
		ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
		ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
		regex,
		uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
		"json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
		"json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
		"relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
		byte,
		int32: {
			type: "number",
			validate: validateInt32
		},
		int64: {
			type: "number",
			validate: validateInt64
		},
		float: {
			type: "number",
			validate: validateNumber
		},
		double: {
			type: "number",
			validate: validateNumber
		},
		password: !0,
		binary: !0
	}, exports.fastFormats = {
		...exports.fullFormats,
		date: fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, compareDate),
		time: fmtDef(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, compareTime),
		"date-time": fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, compareDateTime),
		"iso-time": fmtDef(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, compareIsoTime),
		"iso-date-time": fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, compareIsoDateTime),
		uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
		"uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
		email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
	}, exports.formatNames = Object.keys(exports.fullFormats);
	function isLeapYear(year) {
		return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
	}
	let DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, DAYS = [
		0,
		31,
		28,
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31
	];
	function date(str) {
		let matches = DATE.exec(str);
		if (!matches) return !1;
		let year = +matches[1], month = +matches[2], day = +matches[3];
		return month >= 1 && month <= 12 && day >= 1 && day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month]);
	}
	function compareDate(d1, d2) {
		if (d1 && d2)
			return d1 > d2 ? 1 : d1 < d2 ? -1 : 0;
	}
	let TIME = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
	function getTime(strictTimeZone) {
		return function(str) {
			let matches = TIME.exec(str);
			if (!matches) return !1;
			let hr = +matches[1], min = +matches[2], sec = +matches[3], tz = matches[4], tzSign = matches[5] === "-" ? -1 : 1, tzH = +(matches[6] || 0), tzM = +(matches[7] || 0);
			if (tzH > 23 || tzM > 59 || strictTimeZone && !tz) return !1;
			if (hr <= 23 && min <= 59 && sec < 60) return !0;
			let utcMin = min - tzM * tzSign, utcHr = hr - tzH * tzSign - (utcMin < 0 ? 1 : 0);
			return (utcHr === 23 || utcHr === -1) && (utcMin === 59 || utcMin === -1) && sec < 61;
		};
	}
	function compareTime(s1, s2) {
		if (!(s1 && s2)) return;
		let t1 = (/* @__PURE__ */ new Date("2020-01-01T" + s1)).valueOf(), t2 = (/* @__PURE__ */ new Date("2020-01-01T" + s2)).valueOf();
		if (t1 && t2)
			return t1 - t2;
	}
	function compareIsoTime(t1, t2) {
		if (!(t1 && t2)) return;
		let a1 = TIME.exec(t1), a2 = TIME.exec(t2);
		if (a1 && a2)
			return t1 = a1[1] + a1[2] + a1[3], t2 = a2[1] + a2[2] + a2[3], t1 > t2 ? 1 : t1 < t2 ? -1 : 0;
	}
	let DATE_TIME_SEPARATOR = /t|\s/i;
	function getDateTime(strictTimeZone) {
		let time = getTime(strictTimeZone);
		return function(str) {
			let dateTime = str.split(DATE_TIME_SEPARATOR);
			return dateTime.length === 2 && date(dateTime[0]) && time(dateTime[1]);
		};
	}
	function compareDateTime(dt1, dt2) {
		if (!(dt1 && dt2)) return;
		let d1 = new Date(dt1).valueOf(), d2 = new Date(dt2).valueOf();
		if (d1 && d2)
			return d1 - d2;
	}
	function compareIsoDateTime(dt1, dt2) {
		if (!(dt1 && dt2)) return;
		let [d1, t1] = dt1.split(DATE_TIME_SEPARATOR), [d2, t2] = dt2.split(DATE_TIME_SEPARATOR), res = compareDate(d1, d2);
		if (res !== void 0)
			return res || compareTime(t1, t2);
	}
	let NOT_URI_FRAGMENT = /\/|:/, URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
	function uri(str) {
		return NOT_URI_FRAGMENT.test(str) && URI.test(str);
	}
	let BYTE = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
	function byte(str) {
		return BYTE.lastIndex = 0, BYTE.test(str);
	}
	let MIN_INT32 = -(2 ** 31), MAX_INT32 = 2 ** 31 - 1;
	function validateInt32(value) {
		return Number.isInteger(value) && value <= MAX_INT32 && value >= MIN_INT32;
	}
	function validateInt64(value) {
		return Number.isInteger(value);
	}
	function validateNumber() {
		return !0;
	}
	let Z_ANCHOR = /[^\\]\\Z/;
	function regex(str) {
		if (Z_ANCHOR.test(str)) return !1;
		try {
			return new RegExp(str), !0;
		} catch {
			return !1;
		}
	}
})), require_limit = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 }), exports.formatLimitDefinition = void 0;
	let ajv_1 = require_ajv(), codegen_1 = require_codegen(), ops = codegen_1.operators, KWDs = {
		formatMaximum: {
			okStr: "<=",
			ok: ops.LTE,
			fail: ops.GT
		},
		formatMinimum: {
			okStr: ">=",
			ok: ops.GTE,
			fail: ops.LT
		},
		formatExclusiveMaximum: {
			okStr: "<",
			ok: ops.LT,
			fail: ops.GTE
		},
		formatExclusiveMinimum: {
			okStr: ">",
			ok: ops.GT,
			fail: ops.LTE
		}
	}, error = {
		message: ({ keyword, schemaCode }) => (0, codegen_1.str)`should be ${KWDs[keyword].okStr} ${schemaCode}`,
		params: ({ keyword, schemaCode }) => (0, codegen_1._)`{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`
	};
	exports.formatLimitDefinition = {
		keyword: Object.keys(KWDs),
		type: "string",
		schemaType: "string",
		$data: !0,
		error,
		code(cxt) {
			let { gen, data, schemaCode, keyword, it } = cxt, { opts, self } = it;
			if (!opts.validateFormats) return;
			let fCxt = new ajv_1.KeywordCxt(it, self.RULES.all.format.definition, "format");
			fCxt.$data ? validate$DataFormat() : validateFormat();
			function validate$DataFormat() {
				let fmts = gen.scopeValue("formats", {
					ref: self.formats,
					code: opts.code.formats
				}), fmt = gen.const("fmt", (0, codegen_1._)`${fmts}[${fCxt.schemaCode}]`);
				cxt.fail$data((0, codegen_1.or)((0, codegen_1._)`typeof ${fmt} != "object"`, (0, codegen_1._)`${fmt} instanceof RegExp`, (0, codegen_1._)`typeof ${fmt}.compare != "function"`, compareCode(fmt)));
			}
			function validateFormat() {
				let format = fCxt.schema, fmtDef = self.formats[format];
				if (!fmtDef || fmtDef === !0) return;
				if (typeof fmtDef != "object" || fmtDef instanceof RegExp || typeof fmtDef.compare != "function") throw new Error(`"${keyword}": format "${format}" does not define "compare" function`);
				let fmt = gen.scopeValue("formats", {
					key: format,
					ref: fmtDef,
					code: opts.code.formats ? (0, codegen_1._)`${opts.code.formats}${(0, codegen_1.getProperty)(format)}` : void 0
				});
				cxt.fail$data(compareCode(fmt));
			}
			function compareCode(fmt) {
				return (0, codegen_1._)`${fmt}.compare(${data}, ${schemaCode}) ${KWDs[keyword].fail} 0`;
			}
		},
		dependencies: ["format"]
	};
	let formatLimitPlugin = (ajv) => (ajv.addKeyword(exports.formatLimitDefinition), ajv);
	exports.default = formatLimitPlugin;
})), require_dist = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	let formats_1 = require_formats(), limit_1 = require_limit(), codegen_1 = require_codegen(), fullName = new codegen_1.Name("fullFormats"), fastName = new codegen_1.Name("fastFormats"), formatsPlugin = (ajv, opts = { keywords: !0 }) => {
		if (Array.isArray(opts))
			return addFormats2(ajv, opts, formats_1.fullFormats, fullName), ajv;
		let [formats, exportName] = opts.mode === "fast" ? [formats_1.fastFormats, fastName] : [formats_1.fullFormats, fullName];
		return addFormats2(ajv, opts.formats || formats_1.formatNames, formats, exportName), opts.keywords && (0, limit_1.default)(ajv), ajv;
	};
	formatsPlugin.get = (name, mode = "full") => {
		let f = (mode === "fast" ? formats_1.fastFormats : formats_1.fullFormats)[name];
		if (!f) throw new Error(`Unknown format "${name}"`);
		return f;
	};
	function addFormats2(ajv, list, fs, exportName) {
		var _a, _b;
		(_a = (_b = ajv.opts.code).formats) !== null && _a !== void 0 || (_b.formats = (0, codegen_1._)`require("ajv-formats/dist/formats").${exportName}`);
		for (let f of list) ajv.addFormat(f, fs[f]);
	}
	module.exports = exports = formatsPlugin, Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = formatsPlugin;
})), import_ajv = require_ajv(), import__2019 = require__2019(), import__2020 = require__2020(), import_dist = /* @__PURE__ */ __toESM(require_dist(), 1), addFormats = import_dist.default;
function createDefaultAjvInstance(engineClass) {
	let ajv = new engineClass({
		strict: !1,
		validateFormats: !0,
		validateSchema: !1,
		allErrors: !0
	});
	return addFormats(ajv), ajv;
}
var AjvJsonSchemaValidator = class {
	_ajv;
	/** Lazy classic (draft-07) engine, built on the first draft-07/draft-06-declared schema. */
	_ajvDraft7;
	/** Lazy 2019-09 engine, built on the first 2019-09-declared schema. */
	_ajv2019;
	/** True iff the constructor received a caller-supplied engine; the `$schema` dispatch is skipped. */
	_userAjv;
	/**
	* @param ajv - Optional pre-configured AJV-compatible instance. When supplied, this instance is
	* used for **every** schema regardless of its declared `$schema` (the caller owns dialect
	* choice). When omitted, the provider constructs per-dialect engines (`Ajv2020`, `Ajv2019`,
	* and the classic draft-07 `Ajv` for draft-07/06-declared schemas) with
	* `strict: false`, `validateFormats: true`, `validateSchema: false`, `allErrors: true`, and
	* `ajv-formats` registered — **lazily, on the first {@linkcode getValidator} call needing each**, so
	* constructing the provider (e.g. as the default validator of a `Client`/`Server` that never
	* validates a JSON Schema) does not pay the ajv + ajv-formats instantiation cost. The parameter
	* is typed structurally so consumers who don't pass an instance need not have `ajv` installed.
	*/
	constructor(ajv) {
		this._userAjv = ajv !== void 0, this._ajv = ajv;
	}
	/** The underlying 2020-12 engine — the default instance is created on first use. */
	get ajv() {
		return this._ajv ??= createDefaultAjvInstance(import__2020.Ajv2020);
	}
	/**
	* Pick the engine for a schema's declared dialect. A caller-supplied engine is used for
	* every schema — do not second-guess by `$schema` (bring-your-own-validator means
	* bring-your-own-dialect). Otherwise: no `$schema` or 2020-12 → `Ajv2020`; 2019-09 →
	* `Ajv2019`; draft-07 or draft-06 → classic `Ajv`; anything else → `Error`.
	*/
	_engineFor(schema) {
		if (this._userAjv) return this.ajv;
		let dialect = declaredDialect(schema, "pass a pre-configured Ajv instance to AjvJsonSchemaValidator(ajv) to validate other dialects.");
		return dialect === "2020-12" ? this.ajv : dialect === "2019-09" ? this._ajv2019 ??= createDefaultAjvInstance(import__2019.Ajv2019) : this._ajvDraft7 ??= createDefaultAjvInstance(import_ajv.Ajv);
	}
	getValidator(schema) {
		let engine = this._engineFor(schema), ajvValidator = "$id" in schema && typeof schema.$id == "string" ? engine.getSchema(schema.$id) ?? engine.compile(schema) : engine.compile(schema);
		return (input) => ajvValidator(input) ? {
			valid: !0,
			data: input,
			errorMessage: void 0
		} : {
			valid: !1,
			data: void 0,
			errorMessage: engine.errorsText(ajvValidator.errors)
		};
	}
}, Ajv = import_ajv.Ajv;

export {
	addFormats,
	AjvJsonSchemaValidator,
	Ajv
};
