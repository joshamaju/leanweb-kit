const q = /* @__PURE__ */ location.pathname.split("/").slice(0, -1).join("/"), ee = [
  q + "/favicon.png",
  q + "/_app/immutable/assets/layout.e3b0c442.css"
];
async function te(t) {
  let e = {};
  const r = t.headers.get("Content-Type");
  if (r && (r.startsWith("multipart/form-data") || r.startsWith("application/x-www-form-urlencoded"))) {
    const s = {};
    (await t.formData()).forEach((n, i) => {
      s[i] = n;
    }), e = s;
  }
  return e;
}
var re = (t) => {
  const e = t.split("/");
  return e[0] === "" && e.shift(), e;
}, se = (t) => {
  const e = [];
  for (let s = 0; ; ) {
    let n = !1;
    if (t = t.replace(/\{[^}]+\}/g, (i) => {
      const c = `@\\${s}`;
      return e[s] = [c, i], s++, n = !0, c;
    }), !n)
      break;
  }
  const r = t.split("/");
  r[0] === "" && r.shift();
  for (let s = e.length - 1; s >= 0; s--) {
    const [n] = e[s];
    for (let i = r.length - 1; i >= 0; i--)
      if (r[i].indexOf(n) !== -1) {
        r[i] = r[i].replace(n, e[s][1]);
        break;
      }
  }
  return r;
}, S = {}, ne = (t) => {
  if (t === "*")
    return "*";
  const e = t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  return e ? (S[t] || (e[2] ? S[t] = [t, e[1], new RegExp("^" + e[2] + "$")] : S[t] = [t, e[1], !0]), S[t]) : null;
}, z = (t) => {
  const e = t.url, r = e.indexOf("?", 8);
  return e.slice(e.indexOf("/", 8), r === -1 ? void 0 : r);
}, ie = (t) => {
  const e = t.indexOf("?", 8);
  return e === -1 ? "" : "?" + t.slice(e + 1);
}, he = (t) => {
  const e = z(t);
  return e.length > 1 && e[e.length - 1] === "/" ? e.slice(0, -1) : e;
}, R = (...t) => {
  let e = "", r = !1;
  for (let s of t)
    e[e.length - 1] === "/" && (e = e.slice(0, -1), r = !0), s[0] !== "/" && (s = `/${s}`), s === "/" && r ? e = `${e}/` : s !== "/" && (e = `${e}${s}`), s === "/" && e === "" && (e = "/");
  return e;
}, B = (t) => {
  const e = t.match(/^(.+|)(\/\:[^\/]+)\?$/);
  if (!e)
    return null;
  const r = e[1], s = r + e[2];
  return [r === "" ? "/" : r.replace(/\/$/, ""), s];
}, T = (t) => /[%+]/.test(t) ? (t.indexOf("+") !== -1 && (t = t.replace(/\+/g, " ")), t.indexOf("%") === -1 ? t : j(t)) : t, G = (t, e, r) => {
  let s;
  if (!r && e && !/[%+]/.test(e)) {
    let c = t.indexOf(`?${e}`, 8);
    for (c === -1 && (c = t.indexOf(`&${e}`, 8)); c !== -1; ) {
      const o = t.charCodeAt(c + e.length + 1);
      if (o === 61) {
        const a = c + e.length + 2, h = t.indexOf("&", a);
        return T(t.slice(a, h === -1 ? void 0 : h));
      } else if (o == 38 || isNaN(o))
        return "";
      c = t.indexOf(`&${e}`, c + 1);
    }
    if (s = /[%+]/.test(t), !s)
      return;
  }
  const n = {};
  s ?? (s = /[%+]/.test(t));
  let i = t.indexOf("?", 8);
  for (; i !== -1; ) {
    const c = t.indexOf("&", i + 1);
    let o = t.indexOf("=", i);
    o > c && c !== -1 && (o = -1);
    let a = t.slice(
      i + 1,
      o === -1 ? c === -1 ? void 0 : c : o
    );
    if (s && (a = T(a)), i = c, a === "")
      continue;
    let h;
    o === -1 ? h = "" : (h = t.slice(o + 1, c === -1 ? void 0 : c), s && (h = T(h))), r ? (n[a] ?? (n[a] = [])).push(h) : n[a] ?? (n[a] = h);
  }
  return e ? n[e] : n;
}, oe = G, ae = (t, e) => G(t, e, !0), j = decodeURIComponent, ce = (t) => {
  const e = t.split(/;\s*/g), r = {};
  for (let s = 0, n = e.length; s < n; s++) {
    const i = e[s].split(/\s*=\s*([^\s]+)/);
    r[i[0]] = j(i[1]);
  }
  return r;
}, ue = (t, e, r = {}) => {
  e = encodeURIComponent(e);
  let s = `${t}=${e}`;
  return r && typeof r.maxAge == "number" && r.maxAge >= 0 && (s += `; Max-Age=${Math.floor(r.maxAge)}`), r.domain && (s += "; Domain=" + r.domain), r.path && (s += "; Path=" + r.path), r.expires && (s += "; Expires=" + r.expires.toUTCString()), r.httpOnly && (s += "; HttpOnly"), r.secure && (s += "; Secure"), r.sameSite && (s += `; SameSite=${r.sameSite}`), s;
}, fe = class {
  constructor(t, e = "/", r) {
    this.raw = t, this.path = e, this.paramData = r, this.vData = {};
  }
  param(t) {
    if (this.paramData)
      if (t) {
        const e = this.paramData[t];
        return e ? /\%/.test(e) ? j(e) : e : void 0;
      } else {
        const e = {};
        for (const [r, s] of Object.entries(this.paramData))
          s && typeof s == "string" && (e[r] = /\%/.test(s) ? j(s) : s);
        return e;
      }
    return null;
  }
  query(t) {
    return oe(this.url, t);
  }
  queries(t) {
    return ae(this.url, t);
  }
  header(t) {
    if (t)
      return this.raw.headers.get(t.toLowerCase()) ?? void 0;
    const e = {};
    return this.raw.headers.forEach((r, s) => {
      e[s] = r;
    }), e;
  }
  cookie(t) {
    const e = this.raw.headers.get("Cookie");
    if (!e)
      return;
    const r = ce(e);
    return t ? r[t] : r;
  }
  async parseBody() {
    return await te(this.raw);
  }
  json() {
    return this.raw.json();
  }
  text() {
    return this.raw.text();
  }
  arrayBuffer() {
    return this.raw.arrayBuffer();
  }
  blob() {
    return this.raw.blob();
  }
  formData() {
    return this.raw.formData();
  }
  addValidatedData(t, e) {
    this.vData[t] = e;
  }
  valid(t) {
    if (t)
      return this.vData[t];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get headers() {
    return this.raw.headers;
  }
  get body() {
    return this.raw.body;
  }
  get bodyUsed() {
    return this.raw.bodyUsed;
  }
  get integrity() {
    return this.raw.integrity;
  }
  get keepalive() {
    return this.raw.keepalive;
  }
  get referrer() {
    return this.raw.referrer;
  }
  get signal() {
    return this.raw.signal;
  }
}, le = class {
}, $ = class {
  constructor(t, e) {
    this.env = {}, this.finalized = !1, this.error = void 0, this._status = 200, this._pre = !1, this._preS = 2, this._h = void 0, this._pH = void 0, this._path = "/", this.notFoundHandler = () => new Response(), this.header = (r, s, n) => {
      if (s === void 0) {
        this._h ? this._h.delete(r) : this._pH && delete this._pH[r.toLocaleLowerCase()], this.finalized && this.res.headers.delete(r);
        return;
      }
      n != null && n.append ? (this._h || (this._h = new Headers(this._pH), this._pH = {}), this._h.append(r, s)) : this._h ? this._h.set(r, s) : (this._pH ?? (this._pH = {}), this._pH[r.toLowerCase()] = s), this.finalized && (n != null && n.append ? this.res.headers.append(r, s) : this.res.headers.set(r, s));
    }, this.status = (r) => {
      this._status = r;
    }, this.set = (r, s) => {
      this._map || (this._map = {}), this._map[r] = s;
    }, this.get = (r) => this._map ? this._map[r] : void 0, this.pretty = (r, s = 2) => {
      this._pre = r, this._preS = s;
    }, this.newResponse = (r, s, n) => {
      var c;
      if (!n && !this._h && !this._res && !s && this._status === 200)
        return new Response(r, {
          headers: this._pH
        });
      if (s && typeof s != "number") {
        const o = new Response(r, s), a = (c = this._pH) == null ? void 0 : c["content-type"];
        return a && o.headers.set("content-type", a), o;
      }
      const i = s ?? this._status;
      this._pH ?? (this._pH = {}), this._h ?? (this._h = new Headers());
      for (const [o, a] of Object.entries(this._pH))
        this._h.set(o, a);
      if (this._res) {
        this._res.headers.forEach((o, a) => {
          var h;
          (h = this._h) == null || h.set(a, o);
        });
        for (const [o, a] of Object.entries(this._pH))
          this._h.set(o, a);
      }
      n ?? (n = {});
      for (const [o, a] of Object.entries(n))
        if (typeof a == "string")
          this._h.set(o, a);
        else {
          this._h.delete(o);
          for (const h of a)
            this._h.append(o, h);
        }
      return new Response(r, {
        status: i,
        headers: this._h
      });
    }, this.body = (r, s, n) => typeof s == "number" ? this.newResponse(r, s, n) : this.newResponse(r, s), this.text = (r, s, n) => {
      if (!this._pH) {
        if (!n && !this._res && !this._h && !s)
          return new Response(r);
        this._pH = {};
      }
      return this._pH["content-type"] && (this._pH["content-type"] = "text/plain; charset=UTF-8"), typeof s == "number" ? this.newResponse(r, s, n) : this.newResponse(r, s);
    }, this.json = (r, s, n) => {
      const i = this._pre ? JSON.stringify(r, null, this._preS) : JSON.stringify(r);
      return this._pH ?? (this._pH = {}), this._pH["content-type"] = "application/json; charset=UTF-8", typeof s == "number" ? this.newResponse(i, s, n) : this.newResponse(i, s);
    }, this.jsonT = (r, s, n) => ({
      response: typeof s == "number" ? this.json(r, s, n) : this.json(r, s),
      data: r,
      format: "json"
    }), this.html = (r, s, n) => (this._pH ?? (this._pH = {}), this._pH["content-type"] = "text/html; charset=UTF-8", typeof s == "number" ? this.newResponse(r, s, n) : this.newResponse(r, s)), this.redirect = (r, s = 302) => (this._h ?? (this._h = new Headers()), this._h.set("Location", r), this.newResponse(null, s)), this.cookie = (r, s, n) => {
      const i = ue(r, s, n);
      this.header("set-cookie", i, { append: !0 });
    }, this.notFound = () => this.notFoundHandler(this), this.rawRequest = t, e && (this._exCtx = e.executionCtx, this._path = e.path ?? "/", this._params = e.params, this.env = e.env, e.notFoundHandler && (this.notFoundHandler = e.notFoundHandler));
  }
  get req() {
    return this._req ? this._req : (this._req = new fe(this.rawRequest, this._path, this._params), this.rawRequest = void 0, this._params = void 0, this._req);
  }
  get event() {
    if (this._exCtx instanceof le)
      return this._exCtx;
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (this._exCtx)
      return this._exCtx;
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return this._res || (this._res = new Response("404 Not Found", { status: 404 }));
  }
  set res(t) {
    this._res && t && (this._res.headers.delete("content-type"), this._res.headers.forEach((e, r) => {
      t.headers.set(r, e);
    })), this._res = t, this.finalized = !0;
  }
  get runtime() {
    var e, r;
    const t = globalThis;
    return (t == null ? void 0 : t.Deno) !== void 0 ? "deno" : (t == null ? void 0 : t.Bun) !== void 0 ? "bun" : typeof (t == null ? void 0 : t.WebSocketPair) == "function" ? "workerd" : typeof (t == null ? void 0 : t.EdgeRuntime) == "string" ? "edge-light" : (t == null ? void 0 : t.fastly) !== void 0 ? "fastly" : (t == null ? void 0 : t.__lagon__) !== void 0 ? "lagon" : ((r = (e = t == null ? void 0 : t.process) == null ? void 0 : e.release) == null ? void 0 : r.name) === "node" ? "node" : "other";
  }
}, I = (t, e, r) => {
  const s = t.length;
  return (n, i) => {
    let c = -1;
    return o(0);
    function o(a) {
      if (a <= c)
        throw new Error("next() called multiple times");
      let h = t[a];
      c = a, a === s && i && (h = i);
      let u, l = !1;
      if (!h)
        n instanceof $ && n.finalized === !1 && r && (u = r(n));
      else
        try {
          u = h(n, () => {
            const f = o(a + 1);
            return f instanceof Promise ? f : Promise.resolve(f);
          });
        } catch (f) {
          if (f instanceof Error && n instanceof $ && e)
            n.error = f, u = e(f, n), l = !0;
          else
            throw f;
        }
      return u instanceof Promise ? u.then((f) => (f !== void 0 && "response" in f && (f = f.response), f && n.finalized === !1 && (n.res = f), n)).catch(async (f) => {
        if (f instanceof Error && n instanceof $ && e)
          return n.error = f, n.res = await e(f, n), n;
        throw f;
      }) : (u !== void 0 && "response" in u && (u = u.response), u && (n.finalized === !1 || l) && (n.res = u), n);
    }
  };
}, de = class extends Error {
  constructor(t = 500, e) {
    super(e == null ? void 0 : e.message), this.res = e == null ? void 0 : e.res, this.status = t;
  }
  getResponse() {
    return this.res ? this.res : new Response(this.message, {
      status: this.status
    });
  }
}, p = "ALL", pe = "all", K = ["get", "post", "put", "delete", "options", "patch"], Q = class extends Error {
};
function me() {
  return class {
  };
}
var ge = (t) => t.text("404 Not Found", 404), U = (t, e) => {
  if (t instanceof de)
    return t.getResponse();
  console.trace(t);
  const r = "Internal Server Error";
  return e.text(r, 500);
}, X = class extends me() {
  constructor(e = {}) {
    super(), this._basePath = "", this.path = "*", this.routes = [], this.notFoundHandler = ge, this.errorHandler = U, this.head = () => (console.warn("`app.head()` is no longer used. `app.get()` implicitly handles the HEAD method."), this), this.handleEvent = (n) => this.dispatch(n.request, n, void 0, n.request.method), this.fetch = (n, i, c) => this.dispatch(n, c, i, n.method), this.request = async (n, i) => {
      if (n instanceof Request)
        return i !== void 0 && (n = new Request(n, i)), await this.fetch(n);
      n = n.toString();
      const c = /^https?:\/\//.test(n) ? n : `http://localhost${R("/", n)}`, o = new Request(c, i);
      return await this.fetch(o);
    }, this.fire = () => {
      addEventListener("fetch", (n) => {
        n.respondWith(this.handleEvent(n));
      });
    }, [...K, pe].map((n) => {
      this[n] = (i, ...c) => (typeof i == "string" ? this.path = i : this.addRoute(n, this.path, i), c.map((o) => {
        typeof o != "string" && this.addRoute(n, this.path, o);
      }), this);
    }), this.on = (n, i, ...c) => {
      if (!n)
        return this;
      this.path = i;
      for (const o of [n].flat())
        c.map((a) => {
          this.addRoute(o.toUpperCase(), this.path, a);
        });
      return this;
    }, this.use = (n, ...i) => (typeof n == "string" ? this.path = n : i.unshift(n), i.map((c) => {
      this.addRoute(p, this.path, c);
    }), this);
    const s = e.strict ?? !0;
    delete e.strict, Object.assign(this, e), this.getPath || (this.getPath = s ? z : he);
  }
  clone() {
    const e = new X({
      router: this.router,
      getPath: this.getPath
    });
    return e.routes = this.routes, e;
  }
  route(e, r) {
    const s = this.basePath(e);
    return r ? (r.routes.map((n) => {
      const i = r.errorHandler === U ? n.handler : async (c, o) => (await I([n.handler], r.errorHandler)(c, o)).res;
      s.addRoute(n.method, n.path, i);
    }), this) : s;
  }
  basePath(e) {
    const r = this.clone();
    return r._basePath = R(this._basePath, e), r;
  }
  onError(e) {
    return this.errorHandler = e, this;
  }
  notFound(e) {
    return this.notFoundHandler = e, this;
  }
  showRoutes() {
    this.routes.map((r) => {
      console.log(
        `\x1B[32m${r.method}\x1B[0m ${" ".repeat(8 - r.method.length)} ${r.path}`
      );
    });
  }
  mount(e, r, s) {
    const n = R(this._basePath, e), i = n === "/" ? 0 : n.length, c = async (o, a) => {
      let h;
      try {
        h = o.executionCtx;
      } catch {
      }
      const u = s ? s(o) : [o.env, h], l = Array.isArray(u) ? u : [u], f = ie(o.req.url), d = await r(
        new Request(
          new URL((o.req.path.slice(i) || "/") + f, o.req.url),
          o.req.raw
        ),
        ...l
      );
      if (d)
        return d;
      await a();
    };
    return this.addRoute(p, R(e, "*"), c), this;
  }
  get routerName() {
    return this.matchRoute("GET", "/"), this.router.name;
  }
  addRoute(e, r, s) {
    e = e.toUpperCase(), this._basePath && (r = R(this._basePath, r)), this.router.add(e, r, s);
    const n = { path: r, method: e, handler: s };
    this.routes.push(n);
  }
  matchRoute(e, r) {
    return this.router.match(e, r) || { handlers: [], params: {} };
  }
  handleError(e, r) {
    if (e instanceof Error)
      return this.errorHandler(e, r);
    throw e;
  }
  dispatch(e, r, s, n) {
    const i = this.getPath(e);
    if (n === "HEAD")
      return (async () => new Response(null, await this.dispatch(e, r, s, "GET")))();
    const { handlers: c, params: o } = this.matchRoute(n, i), a = new $(e, {
      env: s,
      executionCtx: r,
      notFoundHandler: this.notFoundHandler,
      path: i,
      params: o
    });
    if (c.length === 1) {
      let u;
      try {
        if (u = c[0](a, async () => {
        }), !u)
          return this.notFoundHandler(a);
      } catch (l) {
        return this.handleError(l, a);
      }
      return u instanceof Response || ("response" in u && (u = u.response), u instanceof Response) ? u : (async () => {
        let l;
        try {
          if (l = await u, l !== void 0 && "response" in l && (l = l.response), !l)
            return this.notFoundHandler(a);
        } catch (f) {
          return this.handleError(f, a);
        }
        return l;
      })();
    }
    const h = I(c, this.errorHandler, this.notFoundHandler);
    return (async () => {
      try {
        const u = h(a), l = u instanceof Promise ? await u : u;
        if (!l.finalized)
          throw new Error(
            "Context is not finalized. You may forget returning Response object or `await next()`"
          );
        return l.res;
      } catch (u) {
        return this.handleError(u, a);
      }
    })();
  }
}, C = "[^/]+", x = ".*", E = "(?:|/.*)", P = Symbol();
function we(t, e) {
  return t.length === 1 ? e.length === 1 ? t < e ? -1 : 1 : -1 : e.length === 1 || t === x || t === E ? 1 : e === x || e === E ? -1 : t === C ? 1 : e === C ? -1 : t.length === e.length ? t < e ? -1 : 1 : e.length - t.length;
}
var F = class {
  constructor() {
    this.children = {};
  }
  insert(e, r, s, n, i) {
    if (e.length === 0) {
      if (this.index !== void 0)
        throw P;
      if (i)
        return;
      this.index = r;
      return;
    }
    const [c, ...o] = e, a = c === "*" ? o.length === 0 ? ["", "", x] : ["", "", C] : c === "/*" ? ["", "", E] : c.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let h;
    if (a) {
      const u = a[1], l = a[2] || C;
      if (h = this.children[l], !h) {
        if (Object.keys(this.children).some(
          (f) => f !== x && f !== E
        ))
          throw P;
        if (i)
          return;
        h = this.children[l] = new F(), u !== "" && (h.varIndex = n.varIndex++);
      }
      if (!i && u !== "") {
        if (s.some((f) => f[0] === u))
          throw new Error("Duplicate param name");
        s.push([u, h.varIndex]);
      }
    } else if (h = this.children[c], !h) {
      if (Object.keys(this.children).some(
        (u) => u.length > 1 && u !== x && u !== E
      ))
        throw P;
      if (i)
        return;
      h = this.children[c] = new F();
    }
    h.insert(o, r, s, n, i);
  }
  buildRegExpStr() {
    const r = Object.keys(this.children).sort(we).map((s) => {
      const n = this.children[s];
      return (typeof n.varIndex == "number" ? `(${s})@${n.varIndex}` : s) + n.buildRegExpStr();
    });
    return typeof this.index == "number" && r.unshift(`#${this.index}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, _e = class {
  constructor() {
    this.context = { varIndex: 0 }, this.root = new F();
  }
  insert(t, e, r) {
    const s = [], n = [];
    for (let c = 0; ; ) {
      let o = !1;
      if (t = t.replace(/\{[^}]+\}/g, (a) => {
        const h = `@\\${c}`;
        return n[c] = [h, a], c++, o = !0, h;
      }), !o)
        break;
    }
    const i = t.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let c = n.length - 1; c >= 0; c--) {
      const [o] = n[c];
      for (let a = i.length - 1; a >= 0; a--)
        if (i[a].indexOf(o) !== -1) {
          i[a] = i[a].replace(o, n[c][1]);
          break;
        }
    }
    return this.root.insert(i, e, s, this.context, r), s;
  }
  buildRegExp() {
    let t = this.root.buildRegExpStr();
    if (t === "")
      return [/^$/, [], []];
    let e = 0;
    const r = [], s = [];
    return t = t.replace(/#(\d+)|@(\d+)|\.\*\$/g, (n, i, c) => typeof i < "u" ? (r[++e] = Number(i), "$()") : (typeof c < "u" && (s[Number(c)] = ++e), "")), [new RegExp(`^${t}`), r, s];
  }
}, A = [p, ...K].map((t) => t.toUpperCase()), W = {}, ve = [/^$/, [], {}], L = {};
function J(t) {
  return L[t] ?? (L[t] = new RegExp(
    t === "*" ? "" : `^${t.replace(/\/\*/, "(?:|/.*)")}$`
  ));
}
function ye() {
  L = {};
}
function Re(t) {
  const e = new _e(), r = [];
  if (t.length === 0)
    return ve;
  const s = t.map((h) => [!/\*|\/:/.test(h[0]), ...h]).sort(
    ([h, u], [l, f]) => h ? 1 : l ? -1 : u.length - f.length
  ), n = {};
  for (let h = 0, u = -1, l = s.length; h < l; h++) {
    const [f, d, m] = s[h];
    f ? n[d] = { handlers: m, params: W } : u++;
    let w;
    try {
      w = e.insert(d, u, f);
    } catch (H) {
      throw H === P ? new Q(d) : H;
    }
    f || (r[u] = w.length === 0 ? [{ handlers: m, params: W }, null] : [m, w]);
  }
  const [i, c, o] = e.buildRegExp();
  for (let h = 0, u = r.length; h < u; h++) {
    const l = r[h][1];
    if (l)
      for (let f = 0, d = l.length; f < d; f++)
        l[f][1] = o[l[f][1]];
  }
  const a = [];
  for (const h in c)
    a[h] = r[c[h]];
  return [i, a, n];
}
function _(t, e) {
  if (t) {
    for (const r of Object.keys(t).sort((s, n) => n.length - s.length))
      if (J(r).test(e))
        return [...t[r]];
  }
}
var xe = class {
  constructor() {
    this.name = "RegExpRouter", this.middleware = { [p]: {} }, this.routes = { [p]: {} };
  }
  add(t, e, r) {
    var s;
    const { middleware: n, routes: i } = this;
    if (!n || !i)
      throw new Error("Can not add a route since the matcher is already built.");
    if (A.indexOf(t) === -1 && A.push(t), n[t] || [n, i].forEach((o) => {
      o[t] = {}, Object.keys(o[p]).forEach((a) => {
        o[t][a] = [...o[p][a]];
      });
    }), e === "/*" && (e = "*"), /\*$/.test(e)) {
      const o = J(e);
      t === p ? Object.keys(n).forEach((a) => {
        var h;
        (h = n[a])[e] || (h[e] = _(n[a], e) || _(n[p], e) || []);
      }) : (s = n[t])[e] || (s[e] = _(n[t], e) || _(n[p], e) || []), Object.keys(n).forEach((a) => {
        (t === p || t === a) && Object.keys(n[a]).forEach((h) => {
          o.test(h) && n[a][h].push(r);
        });
      }), Object.keys(i).forEach((a) => {
        (t === p || t === a) && Object.keys(i[a]).forEach((h) => o.test(h) && i[a][h].push(r));
      });
      return;
    }
    const c = B(e) || [e];
    for (let o = 0, a = c.length; o < a; o++) {
      const h = c[o];
      Object.keys(i).forEach((u) => {
        var l;
        (t === p || t === u) && ((l = i[u])[h] || (l[h] = [
          ..._(n[u], h) || _(n[p], h) || []
        ]), i[u][h].push(r));
      });
    }
  }
  match(t, e) {
    ye();
    const r = this.buildAllMatchers();
    return this.match = (s, n) => {
      const i = r[s], c = i[2][n];
      if (c)
        return c;
      const o = n.match(i[0]);
      if (!o)
        return null;
      const a = o.indexOf("", 1), [h, u] = i[1][a];
      if (!u)
        return h;
      const l = {};
      for (let f = 0, d = u.length; f < d; f++)
        l[u[f][0]] = o[u[f][1]];
      return { handlers: h, params: l };
    }, this.match(t, e);
  }
  buildAllMatchers() {
    const t = {};
    return A.forEach((e) => {
      t[e] = this.buildMatcher(e) || t[p];
    }), this.middleware = this.routes = void 0, t;
  }
  buildMatcher(t) {
    const e = [];
    let r = t === p;
    return [this.middleware, this.routes].forEach((s) => {
      const n = s[t] ? Object.keys(s[t]).map((i) => [i, s[t][i]]) : [];
      n.length !== 0 ? (r || (r = !0), e.push(...n)) : t !== p && e.push(
        ...Object.keys(s[p]).map((i) => [i, s[p][i]])
      );
    }), r ? Re(e) : null;
  }
}, Ee = class {
  constructor(t) {
    this.name = "SmartRouter", this.routers = [], this.routes = [], Object.assign(this, t);
  }
  add(t, e, r) {
    if (!this.routes)
      throw new Error("Can not add a route since the matcher is already built.");
    this.routes.push([t, e, r]);
  }
  match(t, e) {
    if (!this.routes)
      throw new Error("Fatal error");
    const { routers: r, routes: s } = this, n = r.length;
    let i = 0, c;
    for (; i < n; i++) {
      const o = r[i];
      try {
        s.forEach((a) => {
          o.add(...a);
        }), c = o.match(t, e);
      } catch (a) {
        if (a instanceof Q)
          continue;
        throw a;
      }
      this.match = o.match.bind(o), this.routers = [o], this.routes = void 0;
      break;
    }
    if (i === n)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, c || null;
  }
  get activeRouter() {
    if (this.routes || this.routers.length !== 1)
      throw new Error("No active router has been determined yet.");
    return this.routers[0];
  }
};
function Y(t, e) {
  for (let s = 0, n = t.patterns.length; s < n; s++)
    if (typeof t.patterns[s] == "object" && t.patterns[s][1] === e)
      return !0;
  const r = Object.values(t.children);
  for (let s = 0, n = r.length; s < n; s++)
    if (Y(r[s], e))
      return !0;
  return !1;
}
var V = class {
  constructor(t, e, r) {
    if (this.order = 0, this.children = r || {}, this.methods = [], this.name = "", t && e) {
      const s = {};
      s[t] = { handler: e, score: 0, name: this.name }, this.methods = [s];
    }
    this.patterns = [], this.handlerSetCache = {};
  }
  insert(t, e, r) {
    this.name = `${t} ${e}`, this.order = ++this.order;
    let s = this;
    const n = se(e), i = [], c = (h) => `Duplicate param name, use another name instead of '${h}' - ${t} ${e} <--- '${h}'`;
    for (let h = 0, u = n.length; h < u; h++) {
      const l = n[h];
      if (Object.keys(s.children).includes(l)) {
        i.push(...s.patterns), s = s.children[l];
        continue;
      }
      s.children[l] = new V();
      const f = ne(l);
      if (f) {
        if (typeof f == "object") {
          for (let d = 0, m = i.length; d < m; d++)
            if (typeof i[d] == "object" && i[d][1] === f[1])
              throw new Error(c(f[1]));
          if (Object.values(s.children).some((d) => Y(d, f[1])))
            throw new Error(c(f[1]));
        }
        s.patterns.push(f), i.push(...s.patterns);
      }
      i.push(...s.patterns), s = s.children[l];
    }
    s.methods.length || (s.methods = []);
    const o = {}, a = { handler: r, name: this.name, score: this.order };
    return o[t] = a, s.methods.push(o), s;
  }
  gHSets(t, e, r) {
    var s, n;
    return (s = t.handlerSetCache)[n = `${e}:${r ? "1" : "0"}`] || (s[n] = (() => {
      const i = [];
      for (let c = 0, o = t.methods.length; c < o; c++) {
        const a = t.methods[c], h = a[e] || a[p];
        h !== void 0 && i.push(h);
      }
      return i;
    })());
  }
  search(t, e) {
    const r = [], s = {};
    let i = [this];
    const c = re(e);
    for (let h = 0, u = c.length; h < u; h++) {
      const l = c[h], f = h === u - 1, d = [];
      let m = !1;
      for (let w = 0, H = i.length; w < H; w++) {
        const g = i[w], v = g.children[l];
        v && (f === !0 ? (v.children["*"] && r.push(...this.gHSets(v.children["*"], t, !0)), r.push(...this.gHSets(v, t)), m = !0) : d.push(v));
        for (let k = 0, Z = g.patterns.length; k < Z; k++) {
          const N = g.patterns[k];
          if (N === "*") {
            const D = g.children["*"];
            D && (r.push(...this.gHSets(D, t)), d.push(D));
            continue;
          }
          if (l === "")
            continue;
          const [b, O, y] = N, M = c.slice(h).join("/");
          if (y instanceof RegExp && y.test(M)) {
            r.push(...this.gHSets(g.children[b], t)), s[O] = M;
            continue;
          }
          (y === !0 || y instanceof RegExp && y.test(l)) && (typeof b == "string" && (f === !0 ? r.push(...this.gHSets(g.children[b], t)) : d.push(g.children[b])), (typeof O == "string" && !m || g.children[l]) && (s[O] = l));
        }
      }
      i = d;
    }
    const o = r.length;
    return o === 0 ? null : o === 1 ? { handlers: [r[0].handler], params: s } : { handlers: r.sort((h, u) => h.score - u.score).map((h) => h.handler), params: s };
  }
}, He = class {
  constructor() {
    this.name = "TrieRouter", this.node = new V();
  }
  add(t, e, r) {
    const s = B(e);
    if (s) {
      for (const n of s)
        this.node.insert(t, n, r);
      return;
    }
    this.node.insert(t, e, r);
  }
  match(t, e) {
    return this.node.search(t, e);
  }
}, be = class extends X {
  constructor(t = {}) {
    super(t), this.router = t.router ?? new Ee({
      routers: [new xe(), new He()]
    });
  }
};
const Oe = new be();
console.log(ee, Oe);
