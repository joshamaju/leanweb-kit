const views = {
  ["main/index.html"]: async () => (await import('./chunks/index2-482db8ba.js')).default,
  ["home/home.html"]: async () => (await import('./chunks/home-d7f234c6.js')).default,
  ["home/footer.html"]: async () => (await import('./chunks/footer-0fbc638c.js')).default,
  ["about/index.html"]: async () => (await import('./chunks/index-02cea968.js')).default
};
const options = {
  service_worker: false,
  env_public_prefix: "PUBLIC_",
  templates: {
    error: ({ status, message }) => '\n<!DOCTYPE html>\n<html lang="en">\n    <head>\n        <meta charset="utf-8" />\n        <title>' + message + `</title>

        <script type="module" src="/@vite/client"><\/script>
        
        <style>
            body {
                --bg: white;
                --fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
					Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
        </style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  }
};

async function parseBody(r) {
  let body = {};
  const contentType = r.headers.get("Content-Type");
  if (contentType && (contentType.startsWith("multipart/form-data") || contentType.startsWith("application/x-www-form-urlencoded"))) {
    const form = {};
    (await r.formData()).forEach((value, key) => {
      form[key] = value;
    });
    body = form;
  }
  return body;
}
var splitPath = (path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
};
var splitRoutingPath = (path) => {
  const groups = [];
  for (let i = 0; ; ) {
    let replaced = false;
    path = path.replace(/\{[^}]+\}/g, (m) => {
      const mark = `@\\${i}`;
      groups[i] = [mark, m];
      i++;
      replaced = true;
      return mark;
    });
    if (!replaced) {
      break;
    }
  }
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].indexOf(mark) !== -1) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
};
var patternCache = {};
var getPattern = (label) => {
  if (label === "*") {
    return "*";
  }
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    if (!patternCache[label]) {
      if (match2[2]) {
        patternCache[label] = [label, match2[1], new RegExp("^" + match2[2] + "$")];
      } else {
        patternCache[label] = [label, match2[1], true];
      }
    }
    return patternCache[label];
  }
  return null;
};
var getPath = (request) => {
  const url = request.url;
  const queryIndex = url.indexOf("?", 8);
  return url.slice(url.indexOf("/", 8), queryIndex === -1 ? void 0 : queryIndex);
};
var getQueryStrings = (url) => {
  const queryIndex = url.indexOf("?", 8);
  return queryIndex === -1 ? "" : "?" + url.slice(queryIndex + 1);
};
var getPathNoStrict = (request) => {
  const result = getPath(request);
  return result.length > 1 && result[result.length - 1] === "/" ? result.slice(0, -1) : result;
};
var mergePath = (...paths) => {
  let p = "";
  let endsWithSlash = false;
  for (let path of paths) {
    if (p[p.length - 1] === "/") {
      p = p.slice(0, -1);
      endsWithSlash = true;
    }
    if (path[0] !== "/") {
      path = `/${path}`;
    }
    if (path === "/" && endsWithSlash) {
      p = `${p}/`;
    } else if (path !== "/") {
      p = `${p}${path}`;
    }
    if (path === "/" && p === "") {
      p = "/";
    }
  }
  return p;
};
var checkOptionalParameter = (path) => {
  const match2 = path.match(/^(.+|)(\/\:[^\/]+)\?$/);
  if (!match2)
    return null;
  const base = match2[1];
  const optional = base + match2[2];
  return [base === "" ? "/" : base.replace(/\/$/, ""), optional];
};
var _decodeURI = (value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") === -1 ? value : decodeURIComponent_(value);
};
var _getQueryParam = (url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf(`?${key}`, 8);
    if (keyIndex2 === -1) {
      keyIndex2 = url.indexOf(`&${key}`, 8);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ?? (encoded = /[%+]/.test(url));
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      (results[name] ?? (results[name] = [])).push(value);
    } else {
      results[name] ?? (results[name] = value);
    }
  }
  return key ? results[key] : results;
};
var getQueryParam = _getQueryParam;
var getQueryParams = (url, key) => {
  return _getQueryParam(url, key, true);
};
var decodeURIComponent_ = decodeURIComponent;
var parse$5 = (cookie) => {
  const pairs = cookie.split(/;\s*/g);
  const parsedCookie = {};
  for (let i = 0, len = pairs.length; i < len; i++) {
    const pair = pairs[i].split(/\s*=\s*([^\s]+)/);
    parsedCookie[pair[0]] = decodeURIComponent_(pair[1]);
  }
  return parsedCookie;
};
var serialize$1 = (name, value, opt = {}) => {
  value = encodeURIComponent(value);
  let cookie = `${name}=${value}`;
  if (opt && typeof opt.maxAge === "number" && opt.maxAge >= 0) {
    cookie += `; Max-Age=${Math.floor(opt.maxAge)}`;
  }
  if (opt.domain) {
    cookie += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    cookie += "; Path=" + opt.path;
  }
  if (opt.expires) {
    cookie += "; Expires=" + opt.expires.toUTCString();
  }
  if (opt.httpOnly) {
    cookie += "; HttpOnly";
  }
  if (opt.secure) {
    cookie += "; Secure";
  }
  if (opt.sameSite) {
    cookie += `; SameSite=${opt.sameSite}`;
  }
  return cookie;
};
var HonoRequest = class {
  constructor(request, path = "/", paramData) {
    this.raw = request;
    this.path = path;
    this.paramData = paramData;
    this.vData = {};
  }
  param(key) {
    if (this.paramData) {
      if (key) {
        const param = this.paramData[key];
        return param ? /\%/.test(param) ? decodeURIComponent_(param) : param : void 0;
      } else {
        const decoded = {};
        for (const [key2, value] of Object.entries(this.paramData)) {
          if (value && typeof value === "string") {
            decoded[key2] = /\%/.test(value) ? decodeURIComponent_(value) : value;
          }
        }
        return decoded;
      }
    }
    return null;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name)
      return this.raw.headers.get(name.toLowerCase()) ?? void 0;
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  cookie(key) {
    const cookie = this.raw.headers.get("Cookie");
    if (!cookie)
      return;
    const obj = parse$5(cookie);
    if (key) {
      const value = obj[key];
      return value;
    } else {
      return obj;
    }
  }
  async parseBody() {
    return await parseBody(this.raw);
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
  addValidatedData(target, data2) {
    this.vData[target] = data2;
  }
  valid(target) {
    if (target) {
      return this.vData[target];
    }
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
};
var FetchEventLike = class {
};
var Context = class {
  constructor(req, options2) {
    this.env = {};
    this.finalized = false;
    this.error = void 0;
    this._status = 200;
    this._pre = false;
    this._preS = 2;
    this._h = void 0;
    this._pH = void 0;
    this._path = "/";
    this.notFoundHandler = () => new Response();
    this.header = (name, value, options3) => {
      if (value === void 0) {
        if (this._h) {
          this._h.delete(name);
        } else if (this._pH) {
          delete this._pH[name.toLocaleLowerCase()];
        }
        if (this.finalized) {
          this.res.headers.delete(name);
        }
        return;
      }
      if (options3?.append) {
        if (!this._h) {
          this._h = new Headers(this._pH);
          this._pH = {};
        }
        this._h.append(name, value);
      } else {
        if (this._h) {
          this._h.set(name, value);
        } else {
          this._pH ?? (this._pH = {});
          this._pH[name.toLowerCase()] = value;
        }
      }
      if (this.finalized) {
        if (options3?.append) {
          this.res.headers.append(name, value);
        } else {
          this.res.headers.set(name, value);
        }
      }
    };
    this.status = (status) => {
      this._status = status;
    };
    this.set = (key, value) => {
      this._map || (this._map = {});
      this._map[key] = value;
    };
    this.get = (key) => {
      return this._map ? this._map[key] : void 0;
    };
    this.pretty = (prettyJSON, space = 2) => {
      this._pre = prettyJSON;
      this._preS = space;
    };
    this.newResponse = (data2, arg, headers) => {
      if (!headers && !this._h && !this._res && !arg && this._status === 200) {
        return new Response(data2, {
          headers: this._pH
        });
      }
      if (arg && typeof arg !== "number") {
        const res = new Response(data2, arg);
        const contentType = this._pH?.["content-type"];
        if (contentType) {
          res.headers.set("content-type", contentType);
        }
        return res;
      }
      const status = arg ?? this._status;
      this._pH ?? (this._pH = {});
      this._h ?? (this._h = new Headers());
      for (const [k, v] of Object.entries(this._pH)) {
        this._h.set(k, v);
      }
      if (this._res) {
        this._res.headers.forEach((v, k) => {
          this._h?.set(k, v);
        });
        for (const [k, v] of Object.entries(this._pH)) {
          this._h.set(k, v);
        }
      }
      headers ?? (headers = {});
      for (const [k, v] of Object.entries(headers)) {
        if (typeof v === "string") {
          this._h.set(k, v);
        } else {
          this._h.delete(k);
          for (const v2 of v) {
            this._h.append(k, v2);
          }
        }
      }
      return new Response(data2, {
        status,
        headers: this._h
      });
    };
    this.body = (data2, arg, headers) => {
      return typeof arg === "number" ? this.newResponse(data2, arg, headers) : this.newResponse(data2, arg);
    };
    this.text = (text2, arg, headers) => {
      if (!this._pH) {
        if (!headers && !this._res && !this._h && !arg) {
          return new Response(text2);
        }
        this._pH = {};
      }
      if (this._pH["content-type"]) {
        this._pH["content-type"] = "text/plain; charset=UTF-8";
      }
      return typeof arg === "number" ? this.newResponse(text2, arg, headers) : this.newResponse(text2, arg);
    };
    this.json = (object, arg, headers) => {
      const body = this._pre ? JSON.stringify(object, null, this._preS) : JSON.stringify(object);
      this._pH ?? (this._pH = {});
      this._pH["content-type"] = "application/json; charset=UTF-8";
      return typeof arg === "number" ? this.newResponse(body, arg, headers) : this.newResponse(body, arg);
    };
    this.jsonT = (object, arg, headers) => {
      return {
        response: typeof arg === "number" ? this.json(object, arg, headers) : this.json(object, arg),
        data: object,
        format: "json"
      };
    };
    this.html = (html2, arg, headers) => {
      this._pH ?? (this._pH = {});
      this._pH["content-type"] = "text/html; charset=UTF-8";
      return typeof arg === "number" ? this.newResponse(html2, arg, headers) : this.newResponse(html2, arg);
    };
    this.redirect = (location, status = 302) => {
      this._h ?? (this._h = new Headers());
      this._h.set("Location", location);
      return this.newResponse(null, status);
    };
    this.cookie = (name, value, opt) => {
      const cookie = serialize$1(name, value, opt);
      this.header("set-cookie", cookie, { append: true });
    };
    this.notFound = () => {
      return this.notFoundHandler(this);
    };
    this.rawRequest = req;
    if (options2) {
      this._exCtx = options2.executionCtx;
      this._path = options2.path ?? "/";
      this._params = options2.params;
      this.env = options2.env;
      if (options2.notFoundHandler) {
        this.notFoundHandler = options2.notFoundHandler;
      }
    }
  }
  get req() {
    if (this._req) {
      return this._req;
    } else {
      this._req = new HonoRequest(this.rawRequest, this._path, this._params);
      this.rawRequest = void 0;
      this._params = void 0;
      return this._req;
    }
  }
  get event() {
    if (this._exCtx instanceof FetchEventLike) {
      return this._exCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  get executionCtx() {
    if (this._exCtx) {
      return this._exCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  get res() {
    return this._res || (this._res = new Response("404 Not Found", { status: 404 }));
  }
  set res(_res) {
    if (this._res && _res) {
      this._res.headers.delete("content-type");
      this._res.headers.forEach((v, k) => {
        _res.headers.set(k, v);
      });
    }
    this._res = _res;
    this.finalized = true;
  }
  get runtime() {
    const global = globalThis;
    if (global?.Deno !== void 0) {
      return "deno";
    }
    if (global?.Bun !== void 0) {
      return "bun";
    }
    if (typeof global?.WebSocketPair === "function") {
      return "workerd";
    }
    if (typeof global?.EdgeRuntime === "string") {
      return "edge-light";
    }
    if (global?.fastly !== void 0) {
      return "fastly";
    }
    if (global?.__lagon__ !== void 0) {
      return "lagon";
    }
    if (global?.process?.release?.name === "node") {
      return "node";
    }
    return "other";
  }
};
var compose = (middleware, onError, onNotFound) => {
  const middlewareLength = middleware.length;
  return (context, next2) => {
    let index2 = -1;
    return dispatch(0);
    function dispatch(i) {
      if (i <= index2) {
        throw new Error("next() called multiple times");
      }
      let handler = middleware[i];
      index2 = i;
      if (i === middlewareLength && next2)
        handler = next2;
      let res;
      let isError = false;
      if (!handler) {
        if (context instanceof Context && context.finalized === false && onNotFound) {
          res = onNotFound(context);
        }
      } else {
        try {
          res = handler(context, () => {
            const dispatchRes = dispatch(i + 1);
            return dispatchRes instanceof Promise ? dispatchRes : Promise.resolve(dispatchRes);
          });
        } catch (err) {
          if (err instanceof Error && context instanceof Context && onError) {
            context.error = err;
            res = onError(err, context);
            isError = true;
          } else {
            throw err;
          }
        }
      }
      if (!(res instanceof Promise)) {
        if (res !== void 0 && "response" in res) {
          res = res["response"];
        }
        if (res && (context.finalized === false || isError)) {
          context.res = res;
        }
        return context;
      } else {
        return res.then((res2) => {
          if (res2 !== void 0 && "response" in res2) {
            res2 = res2["response"];
          }
          if (res2 && context.finalized === false) {
            context.res = res2;
          }
          return context;
        }).catch(async (err) => {
          if (err instanceof Error && context instanceof Context && onError) {
            context.error = err;
            context.res = await onError(err, context);
            return context;
          }
          throw err;
        });
      }
    }
  };
};
var HTTPException = class extends Error {
  constructor(status = 500, options2) {
    super(options2?.message);
    this.res = options2?.res;
    this.status = status;
  }
  getResponse() {
    if (this.res) {
      return this.res;
    }
    return new Response(this.message, {
      status: this.status
    });
  }
};
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var UnsupportedPathError = class extends Error {
};
function defineDynamicClass() {
  return class {
  };
}
var notFoundHandler = (c) => {
  return c.text("404 Not Found", 404);
};
var errorHandler = (err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  console.trace(err);
  const message = "Internal Server Error";
  return c.text(message, 500);
};
var Hono$1 = class Hono extends defineDynamicClass() {
  constructor(init = {}) {
    super();
    this._basePath = "";
    this.path = "*";
    this.routes = [];
    this.notFoundHandler = notFoundHandler;
    this.errorHandler = errorHandler;
    this.head = () => {
      console.warn("`app.head()` is no longer used. `app.get()` implicitly handles the HEAD method.");
      return this;
    };
    this.handleEvent = (event) => {
      return this.dispatch(event.request, event, void 0, event.request.method);
    };
    this.fetch = (request, Env, executionCtx) => {
      return this.dispatch(request, executionCtx, Env, request.method);
    };
    this.request = async (input, requestInit) => {
      if (input instanceof Request) {
        if (requestInit !== void 0) {
          input = new Request(input, requestInit);
        }
        return await this.fetch(input);
      }
      input = input.toString();
      const path = /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`;
      const req = new Request(path, requestInit);
      return await this.fetch(req);
    };
    this.fire = () => {
      addEventListener("fetch", (event) => {
        void event.respondWith(this.handleEvent(event));
      });
    };
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.map((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.path = args1;
        } else {
          this.addRoute(method, this.path, args1);
        }
        args.map((handler) => {
          if (typeof handler !== "string") {
            this.addRoute(method, this.path, handler);
          }
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      if (!method)
        return this;
      this.path = path;
      for (const m of [method].flat()) {
        handlers.map((handler) => {
          this.addRoute(m.toUpperCase(), this.path, handler);
        });
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.path = arg1;
      } else {
        handlers.unshift(arg1);
      }
      handlers.map((handler) => {
        this.addRoute(METHOD_NAME_ALL, this.path, handler);
      });
      return this;
    };
    const strict = init.strict ?? true;
    delete init.strict;
    Object.assign(this, init);
    this.getPath || (this.getPath = strict ? getPath : getPathNoStrict);
  }
  clone() {
    const clone2 = new Hono$1({
      router: this.router,
      getPath: this.getPath
    });
    clone2.routes = this.routes;
    return clone2;
  }
  route(path, app2) {
    const subApp = this.basePath(path);
    if (!app2) {
      return subApp;
    }
    app2.routes.map((r) => {
      const handler = app2.errorHandler === errorHandler ? r.handler : async (c, next2) => (await compose([r.handler], app2.errorHandler)(c, next2)).res;
      subApp.addRoute(r.method, r.path, handler);
    });
    return this;
  }
  basePath(path) {
    const subApp = this.clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  onError(handler) {
    this.errorHandler = handler;
    return this;
  }
  notFound(handler) {
    this.notFoundHandler = handler;
    return this;
  }
  showRoutes() {
    const length = 8;
    this.routes.map((route) => {
      console.log(
        `\x1B[32m${route.method}\x1B[0m ${" ".repeat(length - route.method.length)} ${route.path}`
      );
    });
  }
  mount(path, applicationHandler, optionHandler) {
    const mergedPath = mergePath(this._basePath, path);
    const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
    const handler = async (c, next2) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      const options2 = optionHandler ? optionHandler(c) : [c.env, executionContext];
      const optionsArray = Array.isArray(options2) ? options2 : [options2];
      const queryStrings = getQueryStrings(c.req.url);
      const res = await applicationHandler(
        new Request(
          new URL((c.req.path.slice(pathPrefixLength) || "/") + queryStrings, c.req.url),
          c.req.raw
        ),
        ...optionsArray
      );
      if (res)
        return res;
      await next2();
    };
    this.addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  get routerName() {
    this.matchRoute("GET", "/");
    return this.router.name;
  }
  addRoute(method, path, handler) {
    method = method.toUpperCase();
    if (this._basePath) {
      path = mergePath(this._basePath, path);
    }
    this.router.add(method, path, handler);
    const r = { path, method, handler };
    this.routes.push(r);
  }
  matchRoute(method, path) {
    return this.router.match(method, path) || { handlers: [], params: {} };
  }
  handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  dispatch(request, executionCtx, env, method) {
    const path = this.getPath(request);
    if (method === "HEAD") {
      return (async () => new Response(null, await this.dispatch(request, executionCtx, env, "GET")))();
    }
    const { handlers, params } = this.matchRoute(method, path);
    const c = new Context(request, {
      env,
      executionCtx,
      notFoundHandler: this.notFoundHandler,
      path,
      params
    });
    if (handlers.length === 1) {
      let res;
      try {
        res = handlers[0](c, async () => {
        });
        if (!res) {
          return this.notFoundHandler(c);
        }
      } catch (err) {
        return this.handleError(err, c);
      }
      if (res instanceof Response)
        return res;
      if ("response" in res) {
        res = res.response;
      }
      if (res instanceof Response)
        return res;
      return (async () => {
        let awaited;
        try {
          awaited = await res;
          if (awaited !== void 0 && "response" in awaited) {
            awaited = awaited["response"];
          }
          if (!awaited) {
            return this.notFoundHandler(c);
          }
        } catch (err) {
          return this.handleError(err, c);
        }
        return awaited;
      })();
    }
    const composed = compose(handlers, this.errorHandler, this.notFoundHandler);
    return (async () => {
      try {
        const tmp = composed(c);
        const context = tmp instanceof Promise ? await tmp : tmp;
        if (!context.finalized) {
          throw new Error(
            "Context is not finalized. You may forget returning Response object or `await next()`"
          );
        }
        return context.res;
      } catch (err) {
        return this.handleError(err, c);
      }
    })();
  }
};
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = Symbol();
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
var Node$2 = class Node {
  constructor() {
    this.children = {};
  }
  insert(tokens, index2, paramMap, context, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.index = index2;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      const regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      node = this.children[regexpStr];
      if (!node) {
        if (Object.keys(this.children).some(
          (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.children[regexpStr] = new Node$2();
        if (name !== "") {
          node.varIndex = context.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        if (paramMap.some((p) => p[0] === name)) {
          throw new Error("Duplicate param name");
        }
        paramMap.push([name, node.varIndex]);
      }
    } else {
      node = this.children[token];
      if (!node) {
        if (Object.keys(this.children).some(
          (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.children[token] = new Node$2();
      }
    }
    node.insert(restTokens, index2, paramMap, context, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.children[k];
      return (typeof c.varIndex === "number" ? `(${k})@${c.varIndex}` : k) + c.buildRegExpStr();
    });
    if (typeof this.index === "number") {
      strList.unshift(`#${this.index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};
var Trie = class {
  constructor() {
    this.context = { varIndex: 0 };
    this.root = new Node$2();
  }
  insert(path, index2, pathErrorCheckOnly) {
    const paramMap = [];
    const groups = [];
    for (let i = 0; ; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.root.insert(tokens, index2, paramMap, this.context, pathErrorCheckOnly);
    return paramMap;
  }
  buildRegExp() {
    let regexp = this.root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (typeof handlerIndex !== "undefined") {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (typeof paramIndex !== "undefined") {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};
var methodNames = [METHOD_NAME_ALL, ...METHODS].map((method) => method.toUpperCase());
var emptyParam = {};
var nullMatcher = [/^$/, [], {}];
var wildcardRegExpCache = {};
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ?? (wildcardRegExpCache[path] = new RegExp(
    path === "*" ? "" : `^${path.replace(/\/\*/, "(?:|/.*)")}$`
  ));
}
function clearWildcardRegExpCache() {
  wildcardRegExpCache = {};
}
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map((route) => [!/\*|\/:/.test(route[0]), ...route]).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = {};
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = { handlers, params: emptyParam };
    } else {
      j++;
    }
    let paramMap;
    try {
      paramMap = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = paramMap.length === 0 ? [{ handlers, params: emptyParam }, null] : [handlers, paramMap];
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    const paramMap = handlerData[i][1];
    if (paramMap) {
      for (let j = 0, len2 = paramMap.length; j < len2; j++) {
        paramMap[j][1] = paramReplacementMap[paramMap[j][1]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
var RegExpRouter = class {
  constructor() {
    this.name = "RegExpRouter";
    this.middleware = { [METHOD_NAME_ALL]: {} };
    this.routes = { [METHOD_NAME_ALL]: {} };
  }
  add(method, path, handler) {
    var _a3;
    const { middleware, routes } = this;
    if (!middleware || !routes) {
      throw new Error("Can not add a route since the matcher is already built.");
    }
    if (methodNames.indexOf(method) === -1)
      methodNames.push(method);
    if (!middleware[method]) {
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = {};
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          var _a22;
          (_a22 = middleware[m])[path] || (_a22[path] = findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || []);
        });
      } else {
        (_a3 = middleware[method])[path] || (_a3[path] = findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || []);
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re.test(p) && middleware[m][p].push(handler);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach((p) => re.test(p) && routes[m][p].push(handler));
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m) => {
        var _a22;
        if (method === METHOD_NAME_ALL || method === m) {
          (_a22 = routes[m])[path2] || (_a22[path2] = [
            ...findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ]);
          routes[m][path2].push(handler);
        }
      });
    }
  }
  match(method, path) {
    clearWildcardRegExpCache();
    const matchers = this.buildAllMatchers();
    this.match = (method2, path2) => {
      const matcher = matchers[method2];
      const staticMatch = matcher[2][path2];
      if (staticMatch) {
        return staticMatch;
      }
      const match2 = path2.match(matcher[0]);
      if (!match2) {
        return null;
      }
      const index2 = match2.indexOf("", 1);
      const [handlers, paramMap] = matcher[1][index2];
      if (!paramMap) {
        return handlers;
      }
      const params = {};
      for (let i = 0, len = paramMap.length; i < len; i++) {
        params[paramMap[i][0]] = match2[paramMap[i][1]];
      }
      return { handlers, params };
    };
    return this.match(method, path);
  }
  buildAllMatchers() {
    const matchers = {};
    methodNames.forEach((method) => {
      matchers[method] = this.buildMatcher(method) || matchers[METHOD_NAME_ALL];
    });
    this.middleware = this.routes = void 0;
    return matchers;
  }
  buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.middleware, this.routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute || (hasOwnRoute = true);
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
};
var SmartRouter = class {
  constructor(init) {
    this.name = "SmartRouter";
    this.routers = [];
    this.routes = [];
    Object.assign(this, init);
  }
  add(method, path, handler) {
    if (!this.routes) {
      throw new Error("Can not add a route since the matcher is already built.");
    }
    this.routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.routes) {
      throw new Error("Fatal error");
    }
    const { routers, routes } = this;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        routes.forEach((args) => {
          router.add(...args);
        });
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.routers = [router];
      this.routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res || null;
  }
  get activeRouter() {
    if (this.routes || this.routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.routers[0];
  }
};
function findParam(node, name) {
  for (let i = 0, len = node.patterns.length; i < len; i++) {
    if (typeof node.patterns[i] === "object" && node.patterns[i][1] === name) {
      return true;
    }
  }
  const nodes = Object.values(node.children);
  for (let i = 0, len = nodes.length; i < len; i++) {
    if (findParam(nodes[i], name)) {
      return true;
    }
  }
  return false;
}
var Node$1 = class Node2 {
  constructor(method, handler, children2) {
    this.order = 0;
    this.children = children2 || {};
    this.methods = [];
    this.name = "";
    if (method && handler) {
      const m = {};
      m[method] = { handler, score: 0, name: this.name };
      this.methods = [m];
    }
    this.patterns = [];
    this.handlerSetCache = {};
  }
  insert(method, path, handler) {
    this.name = `${method} ${path}`;
    this.order = ++this.order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const parentPatterns = [];
    const errorMessage = (name) => {
      return `Duplicate param name, use another name instead of '${name}' - ${method} ${path} <--- '${name}'`;
    };
    for (let i = 0, len = parts.length; i < len; i++) {
      const p = parts[i];
      if (Object.keys(curNode.children).includes(p)) {
        parentPatterns.push(...curNode.patterns);
        curNode = curNode.children[p];
        continue;
      }
      curNode.children[p] = new Node$1();
      const pattern = getPattern(p);
      if (pattern) {
        if (typeof pattern === "object") {
          for (let j = 0, len2 = parentPatterns.length; j < len2; j++) {
            if (typeof parentPatterns[j] === "object" && parentPatterns[j][1] === pattern[1]) {
              throw new Error(errorMessage(pattern[1]));
            }
          }
          if (Object.values(curNode.children).some((n) => findParam(n, pattern[1]))) {
            throw new Error(errorMessage(pattern[1]));
          }
        }
        curNode.patterns.push(pattern);
        parentPatterns.push(...curNode.patterns);
      }
      parentPatterns.push(...curNode.patterns);
      curNode = curNode.children[p];
    }
    if (!curNode.methods.length) {
      curNode.methods = [];
    }
    const m = {};
    const handlerSet = { handler, name: this.name, score: this.order };
    m[method] = handlerSet;
    curNode.methods.push(m);
    return curNode;
  }
  gHSets(node, method, wildcard) {
    var _a3, _b2;
    return (_a3 = node.handlerSetCache)[_b2 = `${method}:${wildcard ? "1" : "0"}`] || (_a3[_b2] = (() => {
      const handlerSets = [];
      for (let i = 0, len = node.methods.length; i < len; i++) {
        const m = node.methods[i];
        const handlerSet = m[method] || m[METHOD_NAME_ALL];
        if (handlerSet !== void 0) {
          handlerSets.push(handlerSet);
        }
      }
      return handlerSets;
    })());
  }
  search(method, path) {
    const handlerSets = [];
    const params = {};
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    for (let i = 0, len2 = parts.length; i < len2; i++) {
      const part = parts[i];
      const isLast = i === len2 - 1;
      const tempNodes = [];
      let matched = false;
      for (let j = 0, len22 = curNodes.length; j < len22; j++) {
        const node = curNodes[j];
        const nextNode = node.children[part];
        if (nextNode) {
          if (isLast === true) {
            if (nextNode.children["*"]) {
              handlerSets.push(...this.gHSets(nextNode.children["*"], method, true));
            }
            handlerSets.push(...this.gHSets(nextNode, method));
            matched = true;
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.patterns.length; k < len3; k++) {
          const pattern = node.patterns[k];
          if (pattern === "*") {
            const astNode = node.children["*"];
            if (astNode) {
              handlerSets.push(...this.gHSets(astNode, method));
              tempNodes.push(astNode);
            }
            continue;
          }
          if (part === "")
            continue;
          const [key, name, matcher] = pattern;
          const restPathString = parts.slice(i).join("/");
          if (matcher instanceof RegExp && matcher.test(restPathString)) {
            handlerSets.push(...this.gHSets(node.children[key], method));
            params[name] = restPathString;
            continue;
          }
          if (matcher === true || matcher instanceof RegExp && matcher.test(part)) {
            if (typeof key === "string") {
              if (isLast === true) {
                handlerSets.push(...this.gHSets(node.children[key], method));
              } else {
                tempNodes.push(node.children[key]);
              }
            }
            if (typeof name === "string" && !matched) {
              params[name] = part;
            } else {
              if (node.children[part]) {
                params[name] = part;
              }
            }
          }
        }
      }
      curNodes = tempNodes;
    }
    const len = handlerSets.length;
    if (len === 0)
      return null;
    if (len === 1)
      return { handlers: [handlerSets[0].handler], params };
    const handlers = handlerSets.sort((a, b) => {
      return a.score - b.score;
    }).map((s) => {
      return s.handler;
    });
    return { handlers, params };
  }
};
var TrieRouter = class {
  constructor() {
    this.name = "TrieRouter";
    this.node = new Node$1();
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (const p of results) {
        this.node.insert(method, p, handler);
      }
      return;
    }
    this.node.insert(method, path, handler);
  }
  match(method, path) {
    return this.node.search(method, path);
  }
};
var Hono2 = class extends Hono$1 {
  constructor(init = {}) {
    super(init);
    this.router = init.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
};
const defaultOpts$2 = {
  xml: false,
  decodeEntities: true
};
const xmlModeDefault = {
  _useHtmlParser2: true,
  xmlMode: true
};
function flatten$2(options2) {
  return (options2 === null || options2 === void 0 ? void 0 : options2.xml) ? typeof options2.xml === "boolean" ? xmlModeDefault : { ...xmlModeDefault, ...options2.xml } : options2 !== null && options2 !== void 0 ? options2 : void 0;
}
var ElementType;
(function(ElementType2) {
  ElementType2["Root"] = "root";
  ElementType2["Text"] = "text";
  ElementType2["Directive"] = "directive";
  ElementType2["Comment"] = "comment";
  ElementType2["Script"] = "script";
  ElementType2["Style"] = "style";
  ElementType2["Tag"] = "tag";
  ElementType2["CDATA"] = "cdata";
  ElementType2["Doctype"] = "doctype";
})(ElementType || (ElementType = {}));
function isTag$1(elem) {
  return elem.type === ElementType.Tag || elem.type === ElementType.Script || elem.type === ElementType.Style;
}
const Root = ElementType.Root;
const Text$1 = ElementType.Text;
const Directive = ElementType.Directive;
const Comment$1 = ElementType.Comment;
const Script = ElementType.Script;
const Style = ElementType.Style;
const Tag$1 = ElementType.Tag;
const CDATA$1 = ElementType.CDATA;
const Doctype = ElementType.Doctype;
class Node3 {
  constructor() {
    this.parent = null;
    this.prev = null;
    this.next = null;
    this.startIndex = null;
    this.endIndex = null;
  }
  // Read-write aliases for properties
  /**
   * Same as {@link parent}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get parentNode() {
    return this.parent;
  }
  set parentNode(parent2) {
    this.parent = parent2;
  }
  /**
   * Same as {@link prev}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get previousSibling() {
    return this.prev;
  }
  set previousSibling(prev2) {
    this.prev = prev2;
  }
  /**
   * Same as {@link next}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get nextSibling() {
    return this.next;
  }
  set nextSibling(next2) {
    this.next = next2;
  }
  /**
   * Clone this node, and optionally its children.
   *
   * @param recursive Clone child nodes as well.
   * @returns A clone of the node.
   */
  cloneNode(recursive = false) {
    return cloneNode(this, recursive);
  }
}
class DataNode extends Node3 {
  /**
   * @param data The content of the data node
   */
  constructor(data2) {
    super();
    this.data = data2;
  }
  /**
   * Same as {@link data}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get nodeValue() {
    return this.data;
  }
  set nodeValue(data2) {
    this.data = data2;
  }
}
class Text extends DataNode {
  constructor() {
    super(...arguments);
    this.type = ElementType.Text;
  }
  get nodeType() {
    return 3;
  }
}
class Comment extends DataNode {
  constructor() {
    super(...arguments);
    this.type = ElementType.Comment;
  }
  get nodeType() {
    return 8;
  }
}
class ProcessingInstruction extends DataNode {
  constructor(name, data2) {
    super(data2);
    this.name = name;
    this.type = ElementType.Directive;
  }
  get nodeType() {
    return 1;
  }
}
class NodeWithChildren extends Node3 {
  /**
   * @param children Children of the node. Only certain node types can have children.
   */
  constructor(children2) {
    super();
    this.children = children2;
  }
  // Aliases
  /** First child of the node. */
  get firstChild() {
    var _a3;
    return (_a3 = this.children[0]) !== null && _a3 !== void 0 ? _a3 : null;
  }
  /** Last child of the node. */
  get lastChild() {
    return this.children.length > 0 ? this.children[this.children.length - 1] : null;
  }
  /**
   * Same as {@link children}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get childNodes() {
    return this.children;
  }
  set childNodes(children2) {
    this.children = children2;
  }
}
class CDATA extends NodeWithChildren {
  constructor() {
    super(...arguments);
    this.type = ElementType.CDATA;
  }
  get nodeType() {
    return 4;
  }
}
class Document extends NodeWithChildren {
  constructor() {
    super(...arguments);
    this.type = ElementType.Root;
  }
  get nodeType() {
    return 9;
  }
}
class Element extends NodeWithChildren {
  /**
   * @param name Name of the tag, eg. `div`, `span`.
   * @param attribs Object mapping attribute names to attribute values.
   * @param children Children of the node.
   */
  constructor(name, attribs, children2 = [], type = name === "script" ? ElementType.Script : name === "style" ? ElementType.Style : ElementType.Tag) {
    super(children2);
    this.name = name;
    this.attribs = attribs;
    this.type = type;
  }
  get nodeType() {
    return 1;
  }
  // DOM Level 1 aliases
  /**
   * Same as {@link name}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get tagName() {
    return this.name;
  }
  set tagName(name) {
    this.name = name;
  }
  get attributes() {
    return Object.keys(this.attribs).map((name) => {
      var _a3, _b2;
      return {
        name,
        value: this.attribs[name],
        namespace: (_a3 = this["x-attribsNamespace"]) === null || _a3 === void 0 ? void 0 : _a3[name],
        prefix: (_b2 = this["x-attribsPrefix"]) === null || _b2 === void 0 ? void 0 : _b2[name]
      };
    });
  }
}
function isTag(node) {
  return isTag$1(node);
}
function isCDATA(node) {
  return node.type === ElementType.CDATA;
}
function isText(node) {
  return node.type === ElementType.Text;
}
function isComment(node) {
  return node.type === ElementType.Comment;
}
function isDirective(node) {
  return node.type === ElementType.Directive;
}
function isDocument(node) {
  return node.type === ElementType.Root;
}
function hasChildren(node) {
  return Object.prototype.hasOwnProperty.call(node, "children");
}
function cloneNode(node, recursive = false) {
  let result;
  if (isText(node)) {
    result = new Text(node.data);
  } else if (isComment(node)) {
    result = new Comment(node.data);
  } else if (isTag(node)) {
    const children2 = recursive ? cloneChildren(node.children) : [];
    const clone2 = new Element(node.name, { ...node.attribs }, children2);
    children2.forEach((child) => child.parent = clone2);
    if (node.namespace != null) {
      clone2.namespace = node.namespace;
    }
    if (node["x-attribsNamespace"]) {
      clone2["x-attribsNamespace"] = { ...node["x-attribsNamespace"] };
    }
    if (node["x-attribsPrefix"]) {
      clone2["x-attribsPrefix"] = { ...node["x-attribsPrefix"] };
    }
    result = clone2;
  } else if (isCDATA(node)) {
    const children2 = recursive ? cloneChildren(node.children) : [];
    const clone2 = new CDATA(children2);
    children2.forEach((child) => child.parent = clone2);
    result = clone2;
  } else if (isDocument(node)) {
    const children2 = recursive ? cloneChildren(node.children) : [];
    const clone2 = new Document(children2);
    children2.forEach((child) => child.parent = clone2);
    if (node["x-mode"]) {
      clone2["x-mode"] = node["x-mode"];
    }
    result = clone2;
  } else if (isDirective(node)) {
    const instruction = new ProcessingInstruction(node.name, node.data);
    if (node["x-name"] != null) {
      instruction["x-name"] = node["x-name"];
      instruction["x-publicId"] = node["x-publicId"];
      instruction["x-systemId"] = node["x-systemId"];
    }
    result = instruction;
  } else {
    throw new Error(`Not implemented yet: ${node.type}`);
  }
  result.startIndex = node.startIndex;
  result.endIndex = node.endIndex;
  if (node.sourceCodeLocation != null) {
    result.sourceCodeLocation = node.sourceCodeLocation;
  }
  return result;
}
function cloneChildren(childs) {
  const children2 = childs.map((child) => cloneNode(child, true));
  for (let i = 1; i < children2.length; i++) {
    children2[i].prev = children2[i - 1];
    children2[i - 1].next = children2[i];
  }
  return children2;
}
const defaultOpts$1 = {
  withStartIndices: false,
  withEndIndices: false,
  xmlMode: false
};
class DomHandler {
  /**
   * @param callback Called once parsing has completed.
   * @param options Settings for the handler.
   * @param elementCB Callback whenever a tag is closed.
   */
  constructor(callback, options2, elementCB) {
    this.dom = [];
    this.root = new Document(this.dom);
    this.done = false;
    this.tagStack = [this.root];
    this.lastNode = null;
    this.parser = null;
    if (typeof options2 === "function") {
      elementCB = options2;
      options2 = defaultOpts$1;
    }
    if (typeof callback === "object") {
      options2 = callback;
      callback = void 0;
    }
    this.callback = callback !== null && callback !== void 0 ? callback : null;
    this.options = options2 !== null && options2 !== void 0 ? options2 : defaultOpts$1;
    this.elementCB = elementCB !== null && elementCB !== void 0 ? elementCB : null;
  }
  onparserinit(parser) {
    this.parser = parser;
  }
  // Resets the handler back to starting state
  onreset() {
    this.dom = [];
    this.root = new Document(this.dom);
    this.done = false;
    this.tagStack = [this.root];
    this.lastNode = null;
    this.parser = null;
  }
  // Signals the handler that parsing is done
  onend() {
    if (this.done)
      return;
    this.done = true;
    this.parser = null;
    this.handleCallback(null);
  }
  onerror(error) {
    this.handleCallback(error);
  }
  onclosetag() {
    this.lastNode = null;
    const elem = this.tagStack.pop();
    if (this.options.withEndIndices) {
      elem.endIndex = this.parser.endIndex;
    }
    if (this.elementCB)
      this.elementCB(elem);
  }
  onopentag(name, attribs) {
    const type = this.options.xmlMode ? ElementType.Tag : void 0;
    const element = new Element(name, attribs, void 0, type);
    this.addNode(element);
    this.tagStack.push(element);
  }
  ontext(data2) {
    const { lastNode } = this;
    if (lastNode && lastNode.type === ElementType.Text) {
      lastNode.data += data2;
      if (this.options.withEndIndices) {
        lastNode.endIndex = this.parser.endIndex;
      }
    } else {
      const node = new Text(data2);
      this.addNode(node);
      this.lastNode = node;
    }
  }
  oncomment(data2) {
    if (this.lastNode && this.lastNode.type === ElementType.Comment) {
      this.lastNode.data += data2;
      return;
    }
    const node = new Comment(data2);
    this.addNode(node);
    this.lastNode = node;
  }
  oncommentend() {
    this.lastNode = null;
  }
  oncdatastart() {
    const text2 = new Text("");
    const node = new CDATA([text2]);
    this.addNode(node);
    text2.parent = node;
    this.lastNode = text2;
  }
  oncdataend() {
    this.lastNode = null;
  }
  onprocessinginstruction(name, data2) {
    const node = new ProcessingInstruction(name, data2);
    this.addNode(node);
  }
  handleCallback(error) {
    if (typeof this.callback === "function") {
      this.callback(error, this.dom);
    } else if (error) {
      throw error;
    }
  }
  addNode(node) {
    const parent2 = this.tagStack[this.tagStack.length - 1];
    const previousSibling = parent2.children[parent2.children.length - 1];
    if (this.options.withStartIndices) {
      node.startIndex = this.parser.startIndex;
    }
    if (this.options.withEndIndices) {
      node.endIndex = this.parser.endIndex;
    }
    parent2.children.push(node);
    if (previousSibling) {
      node.prev = previousSibling;
      previousSibling.next = node;
    }
    node.parent = parent2;
    this.lastNode = null;
  }
}
const htmlDecodeTree = new Uint16Array(
  // prettier-ignore
  'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((c) => c.charCodeAt(0))
);
const xmlDecodeTree = new Uint16Array(
  // prettier-ignore
  "Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map((c) => c.charCodeAt(0))
);
var _a$h;
const decodeMap = /* @__PURE__ */ new Map([
  [0, 65533],
  // C1 Unicode control character reference replacements
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]);
const fromCodePoint = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
  (_a$h = String.fromCodePoint) !== null && _a$h !== void 0 ? _a$h : function(codePoint) {
    let output = "";
    if (codePoint > 65535) {
      codePoint -= 65536;
      output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296);
      codePoint = 56320 | codePoint & 1023;
    }
    output += String.fromCharCode(codePoint);
    return output;
  }
);
function replaceCodePoint(codePoint) {
  var _a3;
  if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
    return 65533;
  }
  return (_a3 = decodeMap.get(codePoint)) !== null && _a3 !== void 0 ? _a3 : codePoint;
}
var CharCodes$1;
(function(CharCodes2) {
  CharCodes2[CharCodes2["NUM"] = 35] = "NUM";
  CharCodes2[CharCodes2["SEMI"] = 59] = "SEMI";
  CharCodes2[CharCodes2["EQUALS"] = 61] = "EQUALS";
  CharCodes2[CharCodes2["ZERO"] = 48] = "ZERO";
  CharCodes2[CharCodes2["NINE"] = 57] = "NINE";
  CharCodes2[CharCodes2["LOWER_A"] = 97] = "LOWER_A";
  CharCodes2[CharCodes2["LOWER_F"] = 102] = "LOWER_F";
  CharCodes2[CharCodes2["LOWER_X"] = 120] = "LOWER_X";
  CharCodes2[CharCodes2["LOWER_Z"] = 122] = "LOWER_Z";
  CharCodes2[CharCodes2["UPPER_A"] = 65] = "UPPER_A";
  CharCodes2[CharCodes2["UPPER_F"] = 70] = "UPPER_F";
  CharCodes2[CharCodes2["UPPER_Z"] = 90] = "UPPER_Z";
})(CharCodes$1 || (CharCodes$1 = {}));
const TO_LOWER_BIT = 32;
var BinTrieFlags;
(function(BinTrieFlags2) {
  BinTrieFlags2[BinTrieFlags2["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
  BinTrieFlags2[BinTrieFlags2["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
  BinTrieFlags2[BinTrieFlags2["JUMP_TABLE"] = 127] = "JUMP_TABLE";
})(BinTrieFlags || (BinTrieFlags = {}));
function isNumber$2(code) {
  return code >= CharCodes$1.ZERO && code <= CharCodes$1.NINE;
}
function isHexadecimalCharacter(code) {
  return code >= CharCodes$1.UPPER_A && code <= CharCodes$1.UPPER_F || code >= CharCodes$1.LOWER_A && code <= CharCodes$1.LOWER_F;
}
function isAsciiAlphaNumeric$1(code) {
  return code >= CharCodes$1.UPPER_A && code <= CharCodes$1.UPPER_Z || code >= CharCodes$1.LOWER_A && code <= CharCodes$1.LOWER_Z || isNumber$2(code);
}
function isEntityInAttributeInvalidEnd$1(code) {
  return code === CharCodes$1.EQUALS || isAsciiAlphaNumeric$1(code);
}
var EntityDecoderState;
(function(EntityDecoderState2) {
  EntityDecoderState2[EntityDecoderState2["EntityStart"] = 0] = "EntityStart";
  EntityDecoderState2[EntityDecoderState2["NumericStart"] = 1] = "NumericStart";
  EntityDecoderState2[EntityDecoderState2["NumericDecimal"] = 2] = "NumericDecimal";
  EntityDecoderState2[EntityDecoderState2["NumericHex"] = 3] = "NumericHex";
  EntityDecoderState2[EntityDecoderState2["NamedEntity"] = 4] = "NamedEntity";
})(EntityDecoderState || (EntityDecoderState = {}));
var DecodingMode;
(function(DecodingMode2) {
  DecodingMode2[DecodingMode2["Legacy"] = 0] = "Legacy";
  DecodingMode2[DecodingMode2["Strict"] = 1] = "Strict";
  DecodingMode2[DecodingMode2["Attribute"] = 2] = "Attribute";
})(DecodingMode || (DecodingMode = {}));
class EntityDecoder {
  constructor(decodeTree, emitCodePoint, errors) {
    this.decodeTree = decodeTree;
    this.emitCodePoint = emitCodePoint;
    this.errors = errors;
    this.state = EntityDecoderState.EntityStart;
    this.consumed = 1;
    this.result = 0;
    this.treeIndex = 0;
    this.excess = 1;
    this.decodeMode = DecodingMode.Strict;
  }
  /** Resets the instance to make it reusable. */
  startEntity(decodeMode) {
    this.decodeMode = decodeMode;
    this.state = EntityDecoderState.EntityStart;
    this.result = 0;
    this.treeIndex = 0;
    this.excess = 1;
    this.consumed = 1;
  }
  /**
   * Write an entity to the decoder. This can be called multiple times with partial entities.
   * If the entity is incomplete, the decoder will return -1.
   *
   * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
   * entity is incomplete, and resume when the next string is written.
   *
   * @param string The string containing the entity (or a continuation of the entity).
   * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  write(str, offset) {
    switch (this.state) {
      case EntityDecoderState.EntityStart: {
        if (str.charCodeAt(offset) === CharCodes$1.NUM) {
          this.state = EntityDecoderState.NumericStart;
          this.consumed += 1;
          return this.stateNumericStart(str, offset + 1);
        }
        this.state = EntityDecoderState.NamedEntity;
        return this.stateNamedEntity(str, offset);
      }
      case EntityDecoderState.NumericStart: {
        return this.stateNumericStart(str, offset);
      }
      case EntityDecoderState.NumericDecimal: {
        return this.stateNumericDecimal(str, offset);
      }
      case EntityDecoderState.NumericHex: {
        return this.stateNumericHex(str, offset);
      }
      case EntityDecoderState.NamedEntity: {
        return this.stateNamedEntity(str, offset);
      }
    }
  }
  /**
   * Switches between the numeric decimal and hexadecimal states.
   *
   * Equivalent to the `Numeric character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericStart(str, offset) {
    if (offset >= str.length) {
      return -1;
    }
    if ((str.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes$1.LOWER_X) {
      this.state = EntityDecoderState.NumericHex;
      this.consumed += 1;
      return this.stateNumericHex(str, offset + 1);
    }
    this.state = EntityDecoderState.NumericDecimal;
    return this.stateNumericDecimal(str, offset);
  }
  addToNumericResult(str, start, end2, base) {
    if (start !== end2) {
      const digitCount = end2 - start;
      this.result = this.result * Math.pow(base, digitCount) + parseInt(str.substr(start, digitCount), base);
      this.consumed += digitCount;
    }
  }
  /**
   * Parses a hexadecimal numeric entity.
   *
   * Equivalent to the `Hexademical character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericHex(str, offset) {
    const startIdx = offset;
    while (offset < str.length) {
      const char = str.charCodeAt(offset);
      if (isNumber$2(char) || isHexadecimalCharacter(char)) {
        offset += 1;
      } else {
        this.addToNumericResult(str, startIdx, offset, 16);
        return this.emitNumericEntity(char, 3);
      }
    }
    this.addToNumericResult(str, startIdx, offset, 16);
    return -1;
  }
  /**
   * Parses a decimal numeric entity.
   *
   * Equivalent to the `Decimal character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericDecimal(str, offset) {
    const startIdx = offset;
    while (offset < str.length) {
      const char = str.charCodeAt(offset);
      if (isNumber$2(char)) {
        offset += 1;
      } else {
        this.addToNumericResult(str, startIdx, offset, 10);
        return this.emitNumericEntity(char, 2);
      }
    }
    this.addToNumericResult(str, startIdx, offset, 10);
    return -1;
  }
  /**
   * Validate and emit a numeric entity.
   *
   * Implements the logic from the `Hexademical character reference start
   * state` and `Numeric character reference end state` in the HTML spec.
   *
   * @param lastCp The last code point of the entity. Used to see if the
   *               entity was terminated with a semicolon.
   * @param expectedLength The minimum number of characters that should be
   *                       consumed. Used to validate that at least one digit
   *                       was consumed.
   * @returns The number of characters that were consumed.
   */
  emitNumericEntity(lastCp, expectedLength) {
    var _a3;
    if (this.consumed <= expectedLength) {
      (_a3 = this.errors) === null || _a3 === void 0 ? void 0 : _a3.absenceOfDigitsInNumericCharacterReference(this.consumed);
      return 0;
    }
    if (lastCp === CharCodes$1.SEMI) {
      this.consumed += 1;
    } else if (this.decodeMode === DecodingMode.Strict) {
      return 0;
    }
    this.emitCodePoint(replaceCodePoint(this.result), this.consumed);
    if (this.errors) {
      if (lastCp !== CharCodes$1.SEMI) {
        this.errors.missingSemicolonAfterCharacterReference();
      }
      this.errors.validateNumericCharacterReference(this.result);
    }
    return this.consumed;
  }
  /**
   * Parses a named entity.
   *
   * Equivalent to the `Named character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNamedEntity(str, offset) {
    const { decodeTree } = this;
    let current = decodeTree[this.treeIndex];
    let valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
    for (; offset < str.length; offset++, this.excess++) {
      const char = str.charCodeAt(offset);
      this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
      if (this.treeIndex < 0) {
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === DecodingMode.Attribute && // We shouldn't have consumed any characters after the entity,
        (valueLength === 0 || // And there should be no invalid characters.
        isEntityInAttributeInvalidEnd$1(char)) ? 0 : this.emitNotTerminatedNamedEntity();
      }
      current = decodeTree[this.treeIndex];
      valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
      if (valueLength !== 0) {
        if (char === CharCodes$1.SEMI) {
          return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
        }
        if (this.decodeMode !== DecodingMode.Strict) {
          this.result = this.treeIndex;
          this.consumed += this.excess;
          this.excess = 0;
        }
      }
    }
    return -1;
  }
  /**
   * Emit a named entity that was not terminated with a semicolon.
   *
   * @returns The number of characters consumed.
   */
  emitNotTerminatedNamedEntity() {
    var _a3;
    const { result, decodeTree } = this;
    const valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
    this.emitNamedEntityData(result, valueLength, this.consumed);
    (_a3 = this.errors) === null || _a3 === void 0 ? void 0 : _a3.missingSemicolonAfterCharacterReference();
    return this.consumed;
  }
  /**
   * Emit a named entity.
   *
   * @param result The index of the entity in the decode tree.
   * @param valueLength The number of bytes in the entity.
   * @param consumed The number of characters consumed.
   *
   * @returns The number of characters consumed.
   */
  emitNamedEntityData(result, valueLength, consumed) {
    const { decodeTree } = this;
    this.emitCodePoint(valueLength === 1 ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH : decodeTree[result + 1], consumed);
    if (valueLength === 3) {
      this.emitCodePoint(decodeTree[result + 2], consumed);
    }
    return consumed;
  }
  /**
   * Signal to the parser that the end of the input was reached.
   *
   * Remaining data will be emitted and relevant errors will be produced.
   *
   * @returns The number of characters consumed.
   */
  end() {
    var _a3;
    switch (this.state) {
      case EntityDecoderState.NamedEntity: {
        return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      }
      case EntityDecoderState.NumericDecimal: {
        return this.emitNumericEntity(0, 2);
      }
      case EntityDecoderState.NumericHex: {
        return this.emitNumericEntity(0, 3);
      }
      case EntityDecoderState.NumericStart: {
        (_a3 = this.errors) === null || _a3 === void 0 ? void 0 : _a3.absenceOfDigitsInNumericCharacterReference(this.consumed);
        return 0;
      }
      case EntityDecoderState.EntityStart: {
        return 0;
      }
    }
  }
}
function getDecoder(decodeTree) {
  let ret = "";
  const decoder = new EntityDecoder(decodeTree, (str) => ret += fromCodePoint(str));
  return function decodeWithTrie(str, decodeMode) {
    let lastIndex = 0;
    let offset = 0;
    while ((offset = str.indexOf("&", offset)) >= 0) {
      ret += str.slice(lastIndex, offset);
      decoder.startEntity(decodeMode);
      const len = decoder.write(
        str,
        // Skip the "&"
        offset + 1
      );
      if (len < 0) {
        lastIndex = offset + decoder.end();
        break;
      }
      lastIndex = offset + len;
      offset = len === 0 ? lastIndex + 1 : lastIndex;
    }
    const result = ret + str.slice(lastIndex);
    ret = "";
    return result;
  };
}
function determineBranch(decodeTree, current, nodeIdx, char) {
  const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
  const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
  if (branchCount === 0) {
    return jumpOffset !== 0 && char === jumpOffset ? nodeIdx : -1;
  }
  if (jumpOffset) {
    const value = char - jumpOffset;
    return value < 0 || value >= branchCount ? -1 : decodeTree[nodeIdx + value] - 1;
  }
  let lo = nodeIdx;
  let hi = lo + branchCount - 1;
  while (lo <= hi) {
    const mid = lo + hi >>> 1;
    const midVal = decodeTree[mid];
    if (midVal < char) {
      lo = mid + 1;
    } else if (midVal > char) {
      hi = mid - 1;
    } else {
      return decodeTree[mid + branchCount];
    }
  }
  return -1;
}
getDecoder(htmlDecodeTree);
getDecoder(xmlDecodeTree);
const xmlReplacer = /["&'<>$\x80-\uFFFF]/g;
const xmlCodeMap = /* @__PURE__ */ new Map([
  [34, "&quot;"],
  [38, "&amp;"],
  [39, "&apos;"],
  [60, "&lt;"],
  [62, "&gt;"]
]);
const getCodePoint = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  String.prototype.codePointAt != null ? (str, index2) => str.codePointAt(index2) : (
    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
    (c, index2) => (c.charCodeAt(index2) & 64512) === 55296 ? (c.charCodeAt(index2) - 55296) * 1024 + c.charCodeAt(index2 + 1) - 56320 + 65536 : c.charCodeAt(index2)
  )
);
function encodeXML(str) {
  let ret = "";
  let lastIdx = 0;
  let match2;
  while ((match2 = xmlReplacer.exec(str)) !== null) {
    const i = match2.index;
    const char = str.charCodeAt(i);
    const next2 = xmlCodeMap.get(char);
    if (next2 !== void 0) {
      ret += str.substring(lastIdx, i) + next2;
      lastIdx = i + 1;
    } else {
      ret += `${str.substring(lastIdx, i)}&#x${getCodePoint(str, i).toString(16)};`;
      lastIdx = xmlReplacer.lastIndex += Number((char & 64512) === 55296);
    }
  }
  return ret + str.substr(lastIdx);
}
function getEscaper(regex, map2) {
  return function escape(data2) {
    let match2;
    let lastIdx = 0;
    let result = "";
    while (match2 = regex.exec(data2)) {
      if (lastIdx !== match2.index) {
        result += data2.substring(lastIdx, match2.index);
      }
      result += map2.get(match2[0].charCodeAt(0));
      lastIdx = match2.index + 1;
    }
    return result + data2.substring(lastIdx);
  };
}
const escapeAttribute = getEscaper(/["&\u00A0]/g, /* @__PURE__ */ new Map([
  [34, "&quot;"],
  [38, "&amp;"],
  [160, "&nbsp;"]
]));
const escapeText = getEscaper(/[&<>\u00A0]/g, /* @__PURE__ */ new Map([
  [38, "&amp;"],
  [60, "&lt;"],
  [62, "&gt;"],
  [160, "&nbsp;"]
]));
const elementNames = new Map([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "textPath"
].map((val2) => [val2.toLowerCase(), val2]));
const attributeNames = new Map([
  "definitionURL",
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "clipPathUnits",
  "diffuseConstant",
  "edgeMode",
  "filterUnits",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "numOctaves",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "refX",
  "refY",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan"
].map((val2) => [val2.toLowerCase(), val2]));
const unencodedElements = /* @__PURE__ */ new Set([
  "style",
  "script",
  "xmp",
  "iframe",
  "noembed",
  "noframes",
  "plaintext",
  "noscript"
]);
function replaceQuotes(value) {
  return value.replace(/"/g, "&quot;");
}
function formatAttributes(attributes2, opts) {
  var _a3;
  if (!attributes2)
    return;
  const encode = ((_a3 = opts.encodeEntities) !== null && _a3 !== void 0 ? _a3 : opts.decodeEntities) === false ? replaceQuotes : opts.xmlMode || opts.encodeEntities !== "utf8" ? encodeXML : escapeAttribute;
  return Object.keys(attributes2).map((key) => {
    var _a4, _b2;
    const value = (_a4 = attributes2[key]) !== null && _a4 !== void 0 ? _a4 : "";
    if (opts.xmlMode === "foreign") {
      key = (_b2 = attributeNames.get(key)) !== null && _b2 !== void 0 ? _b2 : key;
    }
    if (!opts.emptyAttrs && !opts.xmlMode && value === "") {
      return key;
    }
    return `${key}="${encode(value)}"`;
  }).join(" ");
}
const singleTag = /* @__PURE__ */ new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
function render$4(node, options2 = {}) {
  const nodes = "length" in node ? node : [node];
  let output = "";
  for (let i = 0; i < nodes.length; i++) {
    output += renderNode(nodes[i], options2);
  }
  return output;
}
function renderNode(node, options2) {
  switch (node.type) {
    case Root:
      return render$4(node.children, options2);
    case Doctype:
    case Directive:
      return renderDirective(node);
    case Comment$1:
      return renderComment(node);
    case CDATA$1:
      return renderCdata(node);
    case Script:
    case Style:
    case Tag$1:
      return renderTag(node, options2);
    case Text$1:
      return renderText(node, options2);
  }
}
const foreignModeIntegrationPoints = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignObject",
  "desc",
  "title"
]);
const foreignElements = /* @__PURE__ */ new Set(["svg", "math"]);
function renderTag(elem, opts) {
  var _a3;
  if (opts.xmlMode === "foreign") {
    elem.name = (_a3 = elementNames.get(elem.name)) !== null && _a3 !== void 0 ? _a3 : elem.name;
    if (elem.parent && foreignModeIntegrationPoints.has(elem.parent.name)) {
      opts = { ...opts, xmlMode: false };
    }
  }
  if (!opts.xmlMode && foreignElements.has(elem.name)) {
    opts = { ...opts, xmlMode: "foreign" };
  }
  let tag = `<${elem.name}`;
  const attribs = formatAttributes(elem.attribs, opts);
  if (attribs) {
    tag += ` ${attribs}`;
  }
  if (elem.children.length === 0 && (opts.xmlMode ? (
    // In XML mode or foreign mode, and user hasn't explicitly turned off self-closing tags
    opts.selfClosingTags !== false
  ) : (
    // User explicitly asked for self-closing tags, even in HTML mode
    opts.selfClosingTags && singleTag.has(elem.name)
  ))) {
    if (!opts.xmlMode)
      tag += " ";
    tag += "/>";
  } else {
    tag += ">";
    if (elem.children.length > 0) {
      tag += render$4(elem.children, opts);
    }
    if (opts.xmlMode || !singleTag.has(elem.name)) {
      tag += `</${elem.name}>`;
    }
  }
  return tag;
}
function renderDirective(elem) {
  return `<${elem.data}>`;
}
function renderText(elem, opts) {
  var _a3;
  let data2 = elem.data || "";
  if (((_a3 = opts.encodeEntities) !== null && _a3 !== void 0 ? _a3 : opts.decodeEntities) !== false && !(!opts.xmlMode && elem.parent && unencodedElements.has(elem.parent.name))) {
    data2 = opts.xmlMode || opts.encodeEntities !== "utf8" ? encodeXML(data2) : escapeText(data2);
  }
  return data2;
}
function renderCdata(elem) {
  return `<![CDATA[${elem.children[0].data}]]>`;
}
function renderComment(elem) {
  return `<!--${elem.data}-->`;
}
function getOuterHTML(node, options2) {
  return render$4(node, options2);
}
function getInnerHTML(node, options2) {
  return hasChildren(node) ? node.children.map((node2) => getOuterHTML(node2, options2)).join("") : "";
}
function getText(node) {
  if (Array.isArray(node))
    return node.map(getText).join("");
  if (isTag(node))
    return node.name === "br" ? "\n" : getText(node.children);
  if (isCDATA(node))
    return getText(node.children);
  if (isText(node))
    return node.data;
  return "";
}
function textContent(node) {
  if (Array.isArray(node))
    return node.map(textContent).join("");
  if (hasChildren(node) && !isComment(node)) {
    return textContent(node.children);
  }
  if (isText(node))
    return node.data;
  return "";
}
function innerText(node) {
  if (Array.isArray(node))
    return node.map(innerText).join("");
  if (hasChildren(node) && (node.type === ElementType.Tag || isCDATA(node))) {
    return innerText(node.children);
  }
  if (isText(node))
    return node.data;
  return "";
}
function getChildren(elem) {
  return hasChildren(elem) ? elem.children : [];
}
function getParent(elem) {
  return elem.parent || null;
}
function getSiblings(elem) {
  const parent2 = getParent(elem);
  if (parent2 != null)
    return getChildren(parent2);
  const siblings2 = [elem];
  let { prev: prev2, next: next2 } = elem;
  while (prev2 != null) {
    siblings2.unshift(prev2);
    ({ prev: prev2 } = prev2);
  }
  while (next2 != null) {
    siblings2.push(next2);
    ({ next: next2 } = next2);
  }
  return siblings2;
}
function getAttributeValue(elem, name) {
  var _a3;
  return (_a3 = elem.attribs) === null || _a3 === void 0 ? void 0 : _a3[name];
}
function hasAttrib(elem, name) {
  return elem.attribs != null && Object.prototype.hasOwnProperty.call(elem.attribs, name) && elem.attribs[name] != null;
}
function getName(elem) {
  return elem.name;
}
function nextElementSibling(elem) {
  let { next: next2 } = elem;
  while (next2 !== null && !isTag(next2))
    ({ next: next2 } = next2);
  return next2;
}
function prevElementSibling(elem) {
  let { prev: prev2 } = elem;
  while (prev2 !== null && !isTag(prev2))
    ({ prev: prev2 } = prev2);
  return prev2;
}
function removeElement(elem) {
  if (elem.prev)
    elem.prev.next = elem.next;
  if (elem.next)
    elem.next.prev = elem.prev;
  if (elem.parent) {
    const childs = elem.parent.children;
    const childsIndex = childs.lastIndexOf(elem);
    if (childsIndex >= 0) {
      childs.splice(childsIndex, 1);
    }
  }
  elem.next = null;
  elem.prev = null;
  elem.parent = null;
}
function replaceElement(elem, replacement) {
  const prev2 = replacement.prev = elem.prev;
  if (prev2) {
    prev2.next = replacement;
  }
  const next2 = replacement.next = elem.next;
  if (next2) {
    next2.prev = replacement;
  }
  const parent2 = replacement.parent = elem.parent;
  if (parent2) {
    const childs = parent2.children;
    childs[childs.lastIndexOf(elem)] = replacement;
    elem.parent = null;
  }
}
function appendChild(parent2, child) {
  removeElement(child);
  child.next = null;
  child.parent = parent2;
  if (parent2.children.push(child) > 1) {
    const sibling = parent2.children[parent2.children.length - 2];
    sibling.next = child;
    child.prev = sibling;
  } else {
    child.prev = null;
  }
}
function append$3(elem, next2) {
  removeElement(next2);
  const { parent: parent2 } = elem;
  const currNext = elem.next;
  next2.next = currNext;
  next2.prev = elem;
  elem.next = next2;
  next2.parent = parent2;
  if (currNext) {
    currNext.prev = next2;
    if (parent2) {
      const childs = parent2.children;
      childs.splice(childs.lastIndexOf(currNext), 0, next2);
    }
  } else if (parent2) {
    parent2.children.push(next2);
  }
}
function prependChild(parent2, child) {
  removeElement(child);
  child.parent = parent2;
  child.prev = null;
  if (parent2.children.unshift(child) !== 1) {
    const sibling = parent2.children[1];
    sibling.prev = child;
    child.next = sibling;
  } else {
    child.next = null;
  }
}
function prepend$4(elem, prev2) {
  removeElement(prev2);
  const { parent: parent2 } = elem;
  if (parent2) {
    const childs = parent2.children;
    childs.splice(childs.indexOf(elem), 0, prev2);
  }
  if (elem.prev) {
    elem.prev.next = prev2;
  }
  prev2.parent = parent2;
  prev2.prev = elem.prev;
  prev2.next = elem;
  elem.prev = prev2;
}
function filter$2(test, node, recurse = true, limit = Infinity) {
  return find$3(test, Array.isArray(node) ? node : [node], recurse, limit);
}
function find$3(test, nodes, recurse, limit) {
  const result = [];
  const nodeStack = [nodes];
  const indexStack = [0];
  for (; ; ) {
    if (indexStack[0] >= nodeStack[0].length) {
      if (indexStack.length === 1) {
        return result;
      }
      nodeStack.shift();
      indexStack.shift();
      continue;
    }
    const elem = nodeStack[0][indexStack[0]++];
    if (test(elem)) {
      result.push(elem);
      if (--limit <= 0)
        return result;
    }
    if (recurse && hasChildren(elem) && elem.children.length > 0) {
      indexStack.unshift(0);
      nodeStack.unshift(elem.children);
    }
  }
}
function findOneChild(test, nodes) {
  return nodes.find(test);
}
function findOne(test, nodes, recurse = true) {
  let elem = null;
  for (let i = 0; i < nodes.length && !elem; i++) {
    const node = nodes[i];
    if (!isTag(node)) {
      continue;
    } else if (test(node)) {
      elem = node;
    } else if (recurse && node.children.length > 0) {
      elem = findOne(test, node.children, true);
    }
  }
  return elem;
}
function existsOne(test, nodes) {
  return nodes.some((checked) => isTag(checked) && (test(checked) || existsOne(test, checked.children)));
}
function findAll(test, nodes) {
  const result = [];
  const nodeStack = [nodes];
  const indexStack = [0];
  for (; ; ) {
    if (indexStack[0] >= nodeStack[0].length) {
      if (nodeStack.length === 1) {
        return result;
      }
      nodeStack.shift();
      indexStack.shift();
      continue;
    }
    const elem = nodeStack[0][indexStack[0]++];
    if (!isTag(elem))
      continue;
    if (test(elem))
      result.push(elem);
    if (elem.children.length > 0) {
      indexStack.unshift(0);
      nodeStack.unshift(elem.children);
    }
  }
}
const Checks = {
  tag_name(name) {
    if (typeof name === "function") {
      return (elem) => isTag(elem) && name(elem.name);
    } else if (name === "*") {
      return isTag;
    }
    return (elem) => isTag(elem) && elem.name === name;
  },
  tag_type(type) {
    if (typeof type === "function") {
      return (elem) => type(elem.type);
    }
    return (elem) => elem.type === type;
  },
  tag_contains(data2) {
    if (typeof data2 === "function") {
      return (elem) => isText(elem) && data2(elem.data);
    }
    return (elem) => isText(elem) && elem.data === data2;
  }
};
function getAttribCheck(attrib, value) {
  if (typeof value === "function") {
    return (elem) => isTag(elem) && value(elem.attribs[attrib]);
  }
  return (elem) => isTag(elem) && elem.attribs[attrib] === value;
}
function combineFuncs(a, b) {
  return (elem) => a(elem) || b(elem);
}
function compileTest(options2) {
  const funcs = Object.keys(options2).map((key) => {
    const value = options2[key];
    return Object.prototype.hasOwnProperty.call(Checks, key) ? Checks[key](value) : getAttribCheck(key, value);
  });
  return funcs.length === 0 ? null : funcs.reduce(combineFuncs);
}
function testElement(options2, node) {
  const test = compileTest(options2);
  return test ? test(node) : true;
}
function getElements(options2, nodes, recurse, limit = Infinity) {
  const test = compileTest(options2);
  return test ? filter$2(test, nodes, recurse, limit) : [];
}
function getElementById(id, nodes, recurse = true) {
  if (!Array.isArray(nodes))
    nodes = [nodes];
  return findOne(getAttribCheck("id", id), nodes, recurse);
}
function getElementsByTagName(tagName, nodes, recurse = true, limit = Infinity) {
  return filter$2(Checks["tag_name"](tagName), nodes, recurse, limit);
}
function getElementsByTagType(type, nodes, recurse = true, limit = Infinity) {
  return filter$2(Checks["tag_type"](type), nodes, recurse, limit);
}
function removeSubsets(nodes) {
  let idx = nodes.length;
  while (--idx >= 0) {
    const node = nodes[idx];
    if (idx > 0 && nodes.lastIndexOf(node, idx - 1) >= 0) {
      nodes.splice(idx, 1);
      continue;
    }
    for (let ancestor = node.parent; ancestor; ancestor = ancestor.parent) {
      if (nodes.includes(ancestor)) {
        nodes.splice(idx, 1);
        break;
      }
    }
  }
  return nodes;
}
var DocumentPosition;
(function(DocumentPosition2) {
  DocumentPosition2[DocumentPosition2["DISCONNECTED"] = 1] = "DISCONNECTED";
  DocumentPosition2[DocumentPosition2["PRECEDING"] = 2] = "PRECEDING";
  DocumentPosition2[DocumentPosition2["FOLLOWING"] = 4] = "FOLLOWING";
  DocumentPosition2[DocumentPosition2["CONTAINS"] = 8] = "CONTAINS";
  DocumentPosition2[DocumentPosition2["CONTAINED_BY"] = 16] = "CONTAINED_BY";
})(DocumentPosition || (DocumentPosition = {}));
function compareDocumentPosition(nodeA, nodeB) {
  const aParents = [];
  const bParents = [];
  if (nodeA === nodeB) {
    return 0;
  }
  let current = hasChildren(nodeA) ? nodeA : nodeA.parent;
  while (current) {
    aParents.unshift(current);
    current = current.parent;
  }
  current = hasChildren(nodeB) ? nodeB : nodeB.parent;
  while (current) {
    bParents.unshift(current);
    current = current.parent;
  }
  const maxIdx = Math.min(aParents.length, bParents.length);
  let idx = 0;
  while (idx < maxIdx && aParents[idx] === bParents[idx]) {
    idx++;
  }
  if (idx === 0) {
    return DocumentPosition.DISCONNECTED;
  }
  const sharedParent = aParents[idx - 1];
  const siblings2 = sharedParent.children;
  const aSibling = aParents[idx];
  const bSibling = bParents[idx];
  if (siblings2.indexOf(aSibling) > siblings2.indexOf(bSibling)) {
    if (sharedParent === nodeB) {
      return DocumentPosition.FOLLOWING | DocumentPosition.CONTAINED_BY;
    }
    return DocumentPosition.FOLLOWING;
  }
  if (sharedParent === nodeA) {
    return DocumentPosition.PRECEDING | DocumentPosition.CONTAINS;
  }
  return DocumentPosition.PRECEDING;
}
function uniqueSort(nodes) {
  nodes = nodes.filter((node, i, arr) => !arr.includes(node, i + 1));
  nodes.sort((a, b) => {
    const relative = compareDocumentPosition(a, b);
    if (relative & DocumentPosition.PRECEDING) {
      return -1;
    } else if (relative & DocumentPosition.FOLLOWING) {
      return 1;
    }
    return 0;
  });
  return nodes;
}
function getFeed(doc) {
  const feedRoot = getOneElement(isValidFeed, doc);
  return !feedRoot ? null : feedRoot.name === "feed" ? getAtomFeed(feedRoot) : getRssFeed(feedRoot);
}
function getAtomFeed(feedRoot) {
  var _a3;
  const childs = feedRoot.children;
  const feed = {
    type: "atom",
    items: getElementsByTagName("entry", childs).map((item) => {
      var _a4;
      const { children: children2 } = item;
      const entry = { media: getMediaElements(children2) };
      addConditionally(entry, "id", "id", children2);
      addConditionally(entry, "title", "title", children2);
      const href2 = (_a4 = getOneElement("link", children2)) === null || _a4 === void 0 ? void 0 : _a4.attribs["href"];
      if (href2) {
        entry.link = href2;
      }
      const description = fetch("summary", children2) || fetch("content", children2);
      if (description) {
        entry.description = description;
      }
      const pubDate = fetch("updated", children2);
      if (pubDate) {
        entry.pubDate = new Date(pubDate);
      }
      return entry;
    })
  };
  addConditionally(feed, "id", "id", childs);
  addConditionally(feed, "title", "title", childs);
  const href = (_a3 = getOneElement("link", childs)) === null || _a3 === void 0 ? void 0 : _a3.attribs["href"];
  if (href) {
    feed.link = href;
  }
  addConditionally(feed, "description", "subtitle", childs);
  const updated = fetch("updated", childs);
  if (updated) {
    feed.updated = new Date(updated);
  }
  addConditionally(feed, "author", "email", childs, true);
  return feed;
}
function getRssFeed(feedRoot) {
  var _a3, _b2;
  const childs = (_b2 = (_a3 = getOneElement("channel", feedRoot.children)) === null || _a3 === void 0 ? void 0 : _a3.children) !== null && _b2 !== void 0 ? _b2 : [];
  const feed = {
    type: feedRoot.name.substr(0, 3),
    id: "",
    items: getElementsByTagName("item", feedRoot.children).map((item) => {
      const { children: children2 } = item;
      const entry = { media: getMediaElements(children2) };
      addConditionally(entry, "id", "guid", children2);
      addConditionally(entry, "title", "title", children2);
      addConditionally(entry, "link", "link", children2);
      addConditionally(entry, "description", "description", children2);
      const pubDate = fetch("pubDate", children2) || fetch("dc:date", children2);
      if (pubDate)
        entry.pubDate = new Date(pubDate);
      return entry;
    })
  };
  addConditionally(feed, "title", "title", childs);
  addConditionally(feed, "link", "link", childs);
  addConditionally(feed, "description", "description", childs);
  const updated = fetch("lastBuildDate", childs);
  if (updated) {
    feed.updated = new Date(updated);
  }
  addConditionally(feed, "author", "managingEditor", childs, true);
  return feed;
}
const MEDIA_KEYS_STRING = ["url", "type", "lang"];
const MEDIA_KEYS_INT = [
  "fileSize",
  "bitrate",
  "framerate",
  "samplingrate",
  "channels",
  "duration",
  "height",
  "width"
];
function getMediaElements(where) {
  return getElementsByTagName("media:content", where).map((elem) => {
    const { attribs } = elem;
    const media = {
      medium: attribs["medium"],
      isDefault: !!attribs["isDefault"]
    };
    for (const attrib of MEDIA_KEYS_STRING) {
      if (attribs[attrib]) {
        media[attrib] = attribs[attrib];
      }
    }
    for (const attrib of MEDIA_KEYS_INT) {
      if (attribs[attrib]) {
        media[attrib] = parseInt(attribs[attrib], 10);
      }
    }
    if (attribs["expression"]) {
      media.expression = attribs["expression"];
    }
    return media;
  });
}
function getOneElement(tagName, node) {
  return getElementsByTagName(tagName, node, true, 1)[0];
}
function fetch(tagName, where, recurse = false) {
  return textContent(getElementsByTagName(tagName, where, recurse, 1)).trim();
}
function addConditionally(obj, prop2, tagName, where, recurse = false) {
  const val2 = fetch(tagName, where, recurse);
  if (val2)
    obj[prop2] = val2;
}
function isValidFeed(value) {
  return value === "rss" || value === "feed" || value === "rdf:RDF";
}
const DomUtils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get DocumentPosition() {
    return DocumentPosition;
  },
  append: append$3,
  appendChild,
  compareDocumentPosition,
  existsOne,
  filter: filter$2,
  find: find$3,
  findAll,
  findOne,
  findOneChild,
  getAttributeValue,
  getChildren,
  getElementById,
  getElements,
  getElementsByTagName,
  getElementsByTagType,
  getFeed,
  getInnerHTML,
  getName,
  getOuterHTML,
  getParent,
  getSiblings,
  getText,
  hasAttrib,
  hasChildren,
  innerText,
  isCDATA,
  isComment,
  isDocument,
  isTag,
  isText,
  nextElementSibling,
  prepend: prepend$4,
  prependChild,
  prevElementSibling,
  removeElement,
  removeSubsets,
  replaceElement,
  testElement,
  textContent,
  uniqueSort
}, Symbol.toStringTag, { value: "Module" }));
function render$3(that, dom, options2) {
  if (!that)
    return "";
  return that(dom !== null && dom !== void 0 ? dom : that._root.children, null, void 0, options2).toString();
}
function isOptions(dom, options2) {
  return !options2 && typeof dom === "object" && dom != null && !("length" in dom) && !("type" in dom);
}
function html$1(dom, options2) {
  const toRender = isOptions(dom) ? (options2 = dom, void 0) : dom;
  const opts = {
    ...defaultOpts$2,
    ...this === null || this === void 0 ? void 0 : this._options,
    ...flatten$2(options2 !== null && options2 !== void 0 ? options2 : {})
  };
  return render$3(this, toRender, opts);
}
function xml(dom) {
  const options2 = { ...this._options, xmlMode: true };
  return render$3(this, dom, options2);
}
function text$1(elements) {
  const elems = elements ? elements : this ? this.root() : [];
  let ret = "";
  for (let i = 0; i < elems.length; i++) {
    ret += textContent(elems[i]);
  }
  return ret;
}
function parseHTML(data2, context, keepScripts = typeof context === "boolean" ? context : false) {
  if (!data2 || typeof data2 !== "string") {
    return null;
  }
  if (typeof context === "boolean") {
    keepScripts = context;
  }
  const parsed = this.load(data2, defaultOpts$2, false);
  if (!keepScripts) {
    parsed("script").remove();
  }
  return parsed.root()[0].children.slice();
}
function root() {
  return this(this._root);
}
function contains$1(container, contained) {
  if (contained === container) {
    return false;
  }
  let next2 = contained;
  while (next2 && next2 !== next2.parent) {
    next2 = next2.parent;
    if (next2 === container) {
      return true;
    }
  }
  return false;
}
function merge$2(arr1, arr2) {
  if (!isArrayLike(arr1) || !isArrayLike(arr2)) {
    return;
  }
  let newLength = arr1.length;
  const len = +arr2.length;
  for (let i = 0; i < len; i++) {
    arr1[newLength++] = arr2[i];
  }
  arr1.length = newLength;
  return arr1;
}
function isArrayLike(item) {
  if (Array.isArray(item)) {
    return true;
  }
  if (typeof item !== "object" || !Object.prototype.hasOwnProperty.call(item, "length") || typeof item.length !== "number" || item.length < 0) {
    return false;
  }
  for (let i = 0; i < item.length; i++) {
    if (!(i in item)) {
      return false;
    }
  }
  return true;
}
const staticMethods = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  contains: contains$1,
  html: html$1,
  merge: merge$2,
  parseHTML,
  root,
  text: text$1,
  xml
}, Symbol.toStringTag, { value: "Module" }));
function isCheerio(maybeCheerio) {
  return maybeCheerio.cheerio != null;
}
function camelCase(str) {
  return str.replace(/[_.-](\w|$)/g, (_, x) => x.toUpperCase());
}
function cssCase(str) {
  return str.replace(/[A-Z]/g, "-$&").toLowerCase();
}
function domEach(array2, fn) {
  const len = array2.length;
  for (let i = 0; i < len; i++)
    fn(array2[i], i);
  return array2;
}
function cloneDom(dom) {
  const clone2 = "length" in dom ? Array.prototype.map.call(dom, (el) => cloneNode(el, true)) : [cloneNode(dom, true)];
  const root2 = new Document(clone2);
  clone2.forEach((node) => {
    node.parent = root2;
  });
  return clone2;
}
var CharacterCodes;
(function(CharacterCodes2) {
  CharacterCodes2[CharacterCodes2["LowerA"] = 97] = "LowerA";
  CharacterCodes2[CharacterCodes2["LowerZ"] = 122] = "LowerZ";
  CharacterCodes2[CharacterCodes2["UpperA"] = 65] = "UpperA";
  CharacterCodes2[CharacterCodes2["UpperZ"] = 90] = "UpperZ";
  CharacterCodes2[CharacterCodes2["Exclamation"] = 33] = "Exclamation";
})(CharacterCodes || (CharacterCodes = {}));
function isHtml(str) {
  const tagStart = str.indexOf("<");
  if (tagStart < 0 || tagStart > str.length - 3)
    return false;
  const tagChar = str.charCodeAt(tagStart + 1);
  return (tagChar >= CharacterCodes.LowerA && tagChar <= CharacterCodes.LowerZ || tagChar >= CharacterCodes.UpperA && tagChar <= CharacterCodes.UpperZ || tagChar === CharacterCodes.Exclamation) && str.includes(">", tagStart + 2);
}
const hasOwn = Object.prototype.hasOwnProperty;
const rspace = /\s+/;
const dataAttrPrefix = "data-";
const primitives = {
  null: null,
  true: true,
  false: false
};
const rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i;
const rbrace = /^{[^]*}$|^\[[^]*]$/;
function getAttr(elem, name, xmlMode) {
  var _a3;
  if (!elem || !isTag(elem))
    return void 0;
  (_a3 = elem.attribs) !== null && _a3 !== void 0 ? _a3 : elem.attribs = {};
  if (!name) {
    return elem.attribs;
  }
  if (hasOwn.call(elem.attribs, name)) {
    return !xmlMode && rboolean.test(name) ? name : elem.attribs[name];
  }
  if (elem.name === "option" && name === "value") {
    return text$1(elem.children);
  }
  if (elem.name === "input" && (elem.attribs["type"] === "radio" || elem.attribs["type"] === "checkbox") && name === "value") {
    return "on";
  }
  return void 0;
}
function setAttr(el, name, value) {
  if (value === null) {
    removeAttribute(el, name);
  } else {
    el.attribs[name] = `${value}`;
  }
}
function attr(name, value) {
  if (typeof name === "object" || value !== void 0) {
    if (typeof value === "function") {
      if (typeof name !== "string") {
        {
          throw new Error("Bad combination of arguments.");
        }
      }
      return domEach(this, (el, i) => {
        if (isTag(el))
          setAttr(el, name, value.call(el, i, el.attribs[name]));
      });
    }
    return domEach(this, (el) => {
      if (!isTag(el))
        return;
      if (typeof name === "object") {
        Object.keys(name).forEach((objName) => {
          const objValue = name[objName];
          setAttr(el, objName, objValue);
        });
      } else {
        setAttr(el, name, value);
      }
    });
  }
  return arguments.length > 1 ? this : getAttr(this[0], name, this.options.xmlMode);
}
function getProp(el, name, xmlMode) {
  return name in el ? (
    // @ts-expect-error TS doesn't like us accessing the value directly here.
    el[name]
  ) : !xmlMode && rboolean.test(name) ? getAttr(el, name, false) !== void 0 : getAttr(el, name, xmlMode);
}
function setProp(el, name, value, xmlMode) {
  if (name in el) {
    el[name] = value;
  } else {
    setAttr(el, name, !xmlMode && rboolean.test(name) ? value ? "" : null : `${value}`);
  }
}
function prop(name, value) {
  var _a3;
  if (typeof name === "string" && value === void 0) {
    const el = this[0];
    if (!el || !isTag(el))
      return void 0;
    switch (name) {
      case "style": {
        const property = this.css();
        const keys2 = Object.keys(property);
        keys2.forEach((p, i) => {
          property[i] = p;
        });
        property.length = keys2.length;
        return property;
      }
      case "tagName":
      case "nodeName": {
        return el.name.toUpperCase();
      }
      case "href":
      case "src": {
        const prop2 = (_a3 = el.attribs) === null || _a3 === void 0 ? void 0 : _a3[name];
        if (typeof URL !== "undefined" && (name === "href" && (el.tagName === "a" || el.name === "link") || name === "src" && (el.tagName === "img" || el.tagName === "iframe" || el.tagName === "audio" || el.tagName === "video" || el.tagName === "source")) && prop2 !== void 0 && this.options.baseURI) {
          return new URL(prop2, this.options.baseURI).href;
        }
        return prop2;
      }
      case "innerText": {
        return innerText(el);
      }
      case "textContent": {
        return textContent(el);
      }
      case "outerHTML":
        return this.clone().wrap("<container />").parent().html();
      case "innerHTML":
        return this.html();
      default:
        return getProp(el, name, this.options.xmlMode);
    }
  }
  if (typeof name === "object" || value !== void 0) {
    if (typeof value === "function") {
      if (typeof name === "object") {
        throw new Error("Bad combination of arguments.");
      }
      return domEach(this, (el, i) => {
        if (isTag(el)) {
          setProp(el, name, value.call(el, i, getProp(el, name, this.options.xmlMode)), this.options.xmlMode);
        }
      });
    }
    return domEach(this, (el) => {
      if (!isTag(el))
        return;
      if (typeof name === "object") {
        Object.keys(name).forEach((key) => {
          const val2 = name[key];
          setProp(el, key, val2, this.options.xmlMode);
        });
      } else {
        setProp(el, name, value, this.options.xmlMode);
      }
    });
  }
  return void 0;
}
function setData(el, name, value) {
  var _a3;
  const elem = el;
  (_a3 = elem.data) !== null && _a3 !== void 0 ? _a3 : elem.data = {};
  if (typeof name === "object")
    Object.assign(elem.data, name);
  else if (typeof name === "string" && value !== void 0) {
    elem.data[name] = value;
  }
}
function readData(el, name) {
  let domNames;
  let jsNames;
  let value;
  if (name == null) {
    domNames = Object.keys(el.attribs).filter((attrName) => attrName.startsWith(dataAttrPrefix));
    jsNames = domNames.map((domName) => camelCase(domName.slice(dataAttrPrefix.length)));
  } else {
    domNames = [dataAttrPrefix + cssCase(name)];
    jsNames = [name];
  }
  for (let idx = 0; idx < domNames.length; ++idx) {
    const domName = domNames[idx];
    const jsName = jsNames[idx];
    if (hasOwn.call(el.attribs, domName) && !hasOwn.call(el.data, jsName)) {
      value = el.attribs[domName];
      if (hasOwn.call(primitives, value)) {
        value = primitives[value];
      } else if (value === String(Number(value))) {
        value = Number(value);
      } else if (rbrace.test(value)) {
        try {
          value = JSON.parse(value);
        } catch (e) {
        }
      }
      el.data[jsName] = value;
    }
  }
  return name == null ? el.data : value;
}
function data(name, value) {
  var _a3;
  const elem = this[0];
  if (!elem || !isTag(elem))
    return;
  const dataEl = elem;
  (_a3 = dataEl.data) !== null && _a3 !== void 0 ? _a3 : dataEl.data = {};
  if (!name) {
    return readData(dataEl);
  }
  if (typeof name === "object" || value !== void 0) {
    domEach(this, (el) => {
      if (isTag(el)) {
        if (typeof name === "object")
          setData(el, name);
        else
          setData(el, name, value);
      }
    });
    return this;
  }
  if (hasOwn.call(dataEl.data, name)) {
    return dataEl.data[name];
  }
  return readData(dataEl, name);
}
function val(value) {
  const querying = arguments.length === 0;
  const element = this[0];
  if (!element || !isTag(element))
    return querying ? void 0 : this;
  switch (element.name) {
    case "textarea":
      return this.text(value);
    case "select": {
      const option = this.find("option:selected");
      if (!querying) {
        if (this.attr("multiple") == null && typeof value === "object") {
          return this;
        }
        this.find("option").removeAttr("selected");
        const values = typeof value !== "object" ? [value] : value;
        for (let i = 0; i < values.length; i++) {
          this.find(`option[value="${values[i]}"]`).attr("selected", "");
        }
        return this;
      }
      return this.attr("multiple") ? option.toArray().map((el) => text$1(el.children)) : option.attr("value");
    }
    case "input":
    case "option":
      return querying ? this.attr("value") : this.attr("value", value);
  }
  return void 0;
}
function removeAttribute(elem, name) {
  if (!elem.attribs || !hasOwn.call(elem.attribs, name))
    return;
  delete elem.attribs[name];
}
function splitNames(names) {
  return names ? names.trim().split(rspace) : [];
}
function removeAttr(name) {
  const attrNames = splitNames(name);
  for (let i = 0; i < attrNames.length; i++) {
    domEach(this, (elem) => {
      if (isTag(elem))
        removeAttribute(elem, attrNames[i]);
    });
  }
  return this;
}
function hasClass(className) {
  return this.toArray().some((elem) => {
    const clazz = isTag(elem) && elem.attribs["class"];
    let idx = -1;
    if (clazz && className.length) {
      while ((idx = clazz.indexOf(className, idx + 1)) > -1) {
        const end2 = idx + className.length;
        if ((idx === 0 || rspace.test(clazz[idx - 1])) && (end2 === clazz.length || rspace.test(clazz[end2]))) {
          return true;
        }
      }
    }
    return false;
  });
}
function addClass(value) {
  if (typeof value === "function") {
    return domEach(this, (el, i) => {
      if (isTag(el)) {
        const className = el.attribs["class"] || "";
        addClass.call([el], value.call(el, i, className));
      }
    });
  }
  if (!value || typeof value !== "string")
    return this;
  const classNames = value.split(rspace);
  const numElements = this.length;
  for (let i = 0; i < numElements; i++) {
    const el = this[i];
    if (!isTag(el))
      continue;
    const className = getAttr(el, "class", false);
    if (!className) {
      setAttr(el, "class", classNames.join(" ").trim());
    } else {
      let setClass = ` ${className} `;
      for (let j = 0; j < classNames.length; j++) {
        const appendClass = `${classNames[j]} `;
        if (!setClass.includes(` ${appendClass}`))
          setClass += appendClass;
      }
      setAttr(el, "class", setClass.trim());
    }
  }
  return this;
}
function removeClass(name) {
  if (typeof name === "function") {
    return domEach(this, (el, i) => {
      if (isTag(el)) {
        removeClass.call([el], name.call(el, i, el.attribs["class"] || ""));
      }
    });
  }
  const classes = splitNames(name);
  const numClasses = classes.length;
  const removeAll = arguments.length === 0;
  return domEach(this, (el) => {
    if (!isTag(el))
      return;
    if (removeAll) {
      el.attribs["class"] = "";
    } else {
      const elClasses = splitNames(el.attribs["class"]);
      let changed = false;
      for (let j = 0; j < numClasses; j++) {
        const index2 = elClasses.indexOf(classes[j]);
        if (index2 >= 0) {
          elClasses.splice(index2, 1);
          changed = true;
          j--;
        }
      }
      if (changed) {
        el.attribs["class"] = elClasses.join(" ");
      }
    }
  });
}
function toggleClass(value, stateVal) {
  if (typeof value === "function") {
    return domEach(this, (el, i) => {
      if (isTag(el)) {
        toggleClass.call([el], value.call(el, i, el.attribs["class"] || "", stateVal), stateVal);
      }
    });
  }
  if (!value || typeof value !== "string")
    return this;
  const classNames = value.split(rspace);
  const numClasses = classNames.length;
  const state = typeof stateVal === "boolean" ? stateVal ? 1 : -1 : 0;
  const numElements = this.length;
  for (let i = 0; i < numElements; i++) {
    const el = this[i];
    if (!isTag(el))
      continue;
    const elementClasses = splitNames(el.attribs["class"]);
    for (let j = 0; j < numClasses; j++) {
      const index2 = elementClasses.indexOf(classNames[j]);
      if (state >= 0 && index2 < 0) {
        elementClasses.push(classNames[j]);
      } else if (state <= 0 && index2 >= 0) {
        elementClasses.splice(index2, 1);
      }
    }
    el.attribs["class"] = elementClasses.join(" ");
  }
  return this;
}
const Attributes = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addClass,
  attr,
  data,
  hasClass,
  prop,
  removeAttr,
  removeClass,
  toggleClass,
  val
}, Symbol.toStringTag, { value: "Module" }));
var SelectorType;
(function(SelectorType2) {
  SelectorType2["Attribute"] = "attribute";
  SelectorType2["Pseudo"] = "pseudo";
  SelectorType2["PseudoElement"] = "pseudo-element";
  SelectorType2["Tag"] = "tag";
  SelectorType2["Universal"] = "universal";
  SelectorType2["Adjacent"] = "adjacent";
  SelectorType2["Child"] = "child";
  SelectorType2["Descendant"] = "descendant";
  SelectorType2["Parent"] = "parent";
  SelectorType2["Sibling"] = "sibling";
  SelectorType2["ColumnCombinator"] = "column-combinator";
})(SelectorType || (SelectorType = {}));
var AttributeAction;
(function(AttributeAction2) {
  AttributeAction2["Any"] = "any";
  AttributeAction2["Element"] = "element";
  AttributeAction2["End"] = "end";
  AttributeAction2["Equals"] = "equals";
  AttributeAction2["Exists"] = "exists";
  AttributeAction2["Hyphen"] = "hyphen";
  AttributeAction2["Not"] = "not";
  AttributeAction2["Start"] = "start";
})(AttributeAction || (AttributeAction = {}));
const reName = /^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/;
const reEscape = /\\([\da-f]{1,6}\s?|(\s)|.)/gi;
const actionTypes = /* @__PURE__ */ new Map([
  [126, AttributeAction.Element],
  [94, AttributeAction.Start],
  [36, AttributeAction.End],
  [42, AttributeAction.Any],
  [33, AttributeAction.Not],
  [124, AttributeAction.Hyphen]
]);
const unpackPseudos = /* @__PURE__ */ new Set([
  "has",
  "not",
  "matches",
  "is",
  "where",
  "host",
  "host-context"
]);
function isTraversal$1(selector) {
  switch (selector.type) {
    case SelectorType.Adjacent:
    case SelectorType.Child:
    case SelectorType.Descendant:
    case SelectorType.Parent:
    case SelectorType.Sibling:
    case SelectorType.ColumnCombinator:
      return true;
    default:
      return false;
  }
}
const stripQuotesFromPseudos = /* @__PURE__ */ new Set(["contains", "icontains"]);
function funescape(_, escaped, escapedWhitespace) {
  const high = parseInt(escaped, 16) - 65536;
  return high !== high || escapedWhitespace ? escaped : high < 0 ? (
    // BMP codepoint
    String.fromCharCode(high + 65536)
  ) : (
    // Supplemental Plane codepoint (surrogate pair)
    String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320)
  );
}
function unescapeCSS(str) {
  return str.replace(reEscape, funescape);
}
function isQuote(c) {
  return c === 39 || c === 34;
}
function isWhitespace$2(c) {
  return c === 32 || c === 9 || c === 10 || c === 12 || c === 13;
}
function parse$4(selector) {
  const subselects2 = [];
  const endIndex = parseSelector(subselects2, `${selector}`, 0);
  if (endIndex < selector.length) {
    throw new Error(`Unmatched selector: ${selector.slice(endIndex)}`);
  }
  return subselects2;
}
function parseSelector(subselects2, selector, selectorIndex) {
  let tokens = [];
  function getName2(offset) {
    const match2 = selector.slice(selectorIndex + offset).match(reName);
    if (!match2) {
      throw new Error(`Expected name, found ${selector.slice(selectorIndex)}`);
    }
    const [name] = match2;
    selectorIndex += offset + name.length;
    return unescapeCSS(name);
  }
  function stripWhitespace(offset) {
    selectorIndex += offset;
    while (selectorIndex < selector.length && isWhitespace$2(selector.charCodeAt(selectorIndex))) {
      selectorIndex++;
    }
  }
  function readValueWithParenthesis() {
    selectorIndex += 1;
    const start = selectorIndex;
    let counter2 = 1;
    for (; counter2 > 0 && selectorIndex < selector.length; selectorIndex++) {
      if (selector.charCodeAt(selectorIndex) === 40 && !isEscaped(selectorIndex)) {
        counter2++;
      } else if (selector.charCodeAt(selectorIndex) === 41 && !isEscaped(selectorIndex)) {
        counter2--;
      }
    }
    if (counter2) {
      throw new Error("Parenthesis not matched");
    }
    return unescapeCSS(selector.slice(start, selectorIndex - 1));
  }
  function isEscaped(pos) {
    let slashCount = 0;
    while (selector.charCodeAt(--pos) === 92)
      slashCount++;
    return (slashCount & 1) === 1;
  }
  function ensureNotTraversal() {
    if (tokens.length > 0 && isTraversal$1(tokens[tokens.length - 1])) {
      throw new Error("Did not expect successive traversals.");
    }
  }
  function addTraversal(type) {
    if (tokens.length > 0 && tokens[tokens.length - 1].type === SelectorType.Descendant) {
      tokens[tokens.length - 1].type = type;
      return;
    }
    ensureNotTraversal();
    tokens.push({ type });
  }
  function addSpecialAttribute(name, action) {
    tokens.push({
      type: SelectorType.Attribute,
      name,
      action,
      value: getName2(1),
      namespace: null,
      ignoreCase: "quirks"
    });
  }
  function finalizeSubselector() {
    if (tokens.length && tokens[tokens.length - 1].type === SelectorType.Descendant) {
      tokens.pop();
    }
    if (tokens.length === 0) {
      throw new Error("Empty sub-selector");
    }
    subselects2.push(tokens);
  }
  stripWhitespace(0);
  if (selector.length === selectorIndex) {
    return selectorIndex;
  }
  loop:
    while (selectorIndex < selector.length) {
      const firstChar = selector.charCodeAt(selectorIndex);
      switch (firstChar) {
        case 32:
        case 9:
        case 10:
        case 12:
        case 13: {
          if (tokens.length === 0 || tokens[0].type !== SelectorType.Descendant) {
            ensureNotTraversal();
            tokens.push({ type: SelectorType.Descendant });
          }
          stripWhitespace(1);
          break;
        }
        case 62: {
          addTraversal(SelectorType.Child);
          stripWhitespace(1);
          break;
        }
        case 60: {
          addTraversal(SelectorType.Parent);
          stripWhitespace(1);
          break;
        }
        case 126: {
          addTraversal(SelectorType.Sibling);
          stripWhitespace(1);
          break;
        }
        case 43: {
          addTraversal(SelectorType.Adjacent);
          stripWhitespace(1);
          break;
        }
        case 46: {
          addSpecialAttribute("class", AttributeAction.Element);
          break;
        }
        case 35: {
          addSpecialAttribute("id", AttributeAction.Equals);
          break;
        }
        case 91: {
          stripWhitespace(1);
          let name;
          let namespace = null;
          if (selector.charCodeAt(selectorIndex) === 124) {
            name = getName2(1);
          } else if (selector.startsWith("*|", selectorIndex)) {
            namespace = "*";
            name = getName2(2);
          } else {
            name = getName2(0);
            if (selector.charCodeAt(selectorIndex) === 124 && selector.charCodeAt(selectorIndex + 1) !== 61) {
              namespace = name;
              name = getName2(1);
            }
          }
          stripWhitespace(0);
          let action = AttributeAction.Exists;
          const possibleAction = actionTypes.get(selector.charCodeAt(selectorIndex));
          if (possibleAction) {
            action = possibleAction;
            if (selector.charCodeAt(selectorIndex + 1) !== 61) {
              throw new Error("Expected `=`");
            }
            stripWhitespace(2);
          } else if (selector.charCodeAt(selectorIndex) === 61) {
            action = AttributeAction.Equals;
            stripWhitespace(1);
          }
          let value = "";
          let ignoreCase = null;
          if (action !== "exists") {
            if (isQuote(selector.charCodeAt(selectorIndex))) {
              const quote = selector.charCodeAt(selectorIndex);
              let sectionEnd = selectorIndex + 1;
              while (sectionEnd < selector.length && (selector.charCodeAt(sectionEnd) !== quote || isEscaped(sectionEnd))) {
                sectionEnd += 1;
              }
              if (selector.charCodeAt(sectionEnd) !== quote) {
                throw new Error("Attribute value didn't end");
              }
              value = unescapeCSS(selector.slice(selectorIndex + 1, sectionEnd));
              selectorIndex = sectionEnd + 1;
            } else {
              const valueStart = selectorIndex;
              while (selectorIndex < selector.length && (!isWhitespace$2(selector.charCodeAt(selectorIndex)) && selector.charCodeAt(selectorIndex) !== 93 || isEscaped(selectorIndex))) {
                selectorIndex += 1;
              }
              value = unescapeCSS(selector.slice(valueStart, selectorIndex));
            }
            stripWhitespace(0);
            const forceIgnore = selector.charCodeAt(selectorIndex) | 32;
            if (forceIgnore === 115) {
              ignoreCase = false;
              stripWhitespace(1);
            } else if (forceIgnore === 105) {
              ignoreCase = true;
              stripWhitespace(1);
            }
          }
          if (selector.charCodeAt(selectorIndex) !== 93) {
            throw new Error("Attribute selector didn't terminate");
          }
          selectorIndex += 1;
          const attributeSelector = {
            type: SelectorType.Attribute,
            name,
            action,
            value,
            namespace,
            ignoreCase
          };
          tokens.push(attributeSelector);
          break;
        }
        case 58: {
          if (selector.charCodeAt(selectorIndex + 1) === 58) {
            tokens.push({
              type: SelectorType.PseudoElement,
              name: getName2(2).toLowerCase(),
              data: selector.charCodeAt(selectorIndex) === 40 ? readValueWithParenthesis() : null
            });
            continue;
          }
          const name = getName2(1).toLowerCase();
          let data2 = null;
          if (selector.charCodeAt(selectorIndex) === 40) {
            if (unpackPseudos.has(name)) {
              if (isQuote(selector.charCodeAt(selectorIndex + 1))) {
                throw new Error(`Pseudo-selector ${name} cannot be quoted`);
              }
              data2 = [];
              selectorIndex = parseSelector(data2, selector, selectorIndex + 1);
              if (selector.charCodeAt(selectorIndex) !== 41) {
                throw new Error(`Missing closing parenthesis in :${name} (${selector})`);
              }
              selectorIndex += 1;
            } else {
              data2 = readValueWithParenthesis();
              if (stripQuotesFromPseudos.has(name)) {
                const quot = data2.charCodeAt(0);
                if (quot === data2.charCodeAt(data2.length - 1) && isQuote(quot)) {
                  data2 = data2.slice(1, -1);
                }
              }
              data2 = unescapeCSS(data2);
            }
          }
          tokens.push({ type: SelectorType.Pseudo, name, data: data2 });
          break;
        }
        case 44: {
          finalizeSubselector();
          tokens = [];
          stripWhitespace(1);
          break;
        }
        default: {
          if (selector.startsWith("/*", selectorIndex)) {
            const endIndex = selector.indexOf("*/", selectorIndex + 2);
            if (endIndex < 0) {
              throw new Error("Comment was not terminated");
            }
            selectorIndex = endIndex + 2;
            if (tokens.length === 0) {
              stripWhitespace(0);
            }
            break;
          }
          let namespace = null;
          let name;
          if (firstChar === 42) {
            selectorIndex += 1;
            name = "*";
          } else if (firstChar === 124) {
            name = "";
            if (selector.charCodeAt(selectorIndex + 1) === 124) {
              addTraversal(SelectorType.ColumnCombinator);
              stripWhitespace(2);
              break;
            }
          } else if (reName.test(selector.slice(selectorIndex))) {
            name = getName2(0);
          } else {
            break loop;
          }
          if (selector.charCodeAt(selectorIndex) === 124 && selector.charCodeAt(selectorIndex + 1) !== 124) {
            namespace = name;
            if (selector.charCodeAt(selectorIndex + 1) === 42) {
              name = "*";
              selectorIndex += 2;
            } else {
              name = getName2(1);
            }
          }
          tokens.push(name === "*" ? { type: SelectorType.Universal, namespace } : { type: SelectorType.Tag, name, namespace });
        }
      }
    }
  finalizeSubselector();
  return selectorIndex;
}
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var boolbase = {
  trueFunc: function trueFunc() {
    return true;
  },
  falseFunc: function falseFunc() {
    return false;
  }
};
const boolbase$1 = /* @__PURE__ */ getDefaultExportFromCjs(boolbase);
const procedure = /* @__PURE__ */ new Map([
  [SelectorType.Universal, 50],
  [SelectorType.Tag, 30],
  [SelectorType.Attribute, 1],
  [SelectorType.Pseudo, 0]
]);
function isTraversal(token) {
  return !procedure.has(token.type);
}
const attributes = /* @__PURE__ */ new Map([
  [AttributeAction.Exists, 10],
  [AttributeAction.Equals, 8],
  [AttributeAction.Not, 7],
  [AttributeAction.Start, 6],
  [AttributeAction.End, 6],
  [AttributeAction.Any, 5]
]);
function sortByProcedure(arr) {
  const procs = arr.map(getProcedure);
  for (let i = 1; i < arr.length; i++) {
    const procNew = procs[i];
    if (procNew < 0)
      continue;
    for (let j = i - 1; j >= 0 && procNew < procs[j]; j--) {
      const token = arr[j + 1];
      arr[j + 1] = arr[j];
      arr[j] = token;
      procs[j + 1] = procs[j];
      procs[j] = procNew;
    }
  }
}
function getProcedure(token) {
  var _a3, _b2;
  let proc = (_a3 = procedure.get(token.type)) !== null && _a3 !== void 0 ? _a3 : -1;
  if (token.type === SelectorType.Attribute) {
    proc = (_b2 = attributes.get(token.action)) !== null && _b2 !== void 0 ? _b2 : 4;
    if (token.action === AttributeAction.Equals && token.name === "id") {
      proc = 9;
    }
    if (token.ignoreCase) {
      proc >>= 1;
    }
  } else if (token.type === SelectorType.Pseudo) {
    if (!token.data) {
      proc = 3;
    } else if (token.name === "has" || token.name === "contains") {
      proc = 0;
    } else if (Array.isArray(token.data)) {
      proc = Math.min(...token.data.map((d) => Math.min(...d.map(getProcedure))));
      if (proc < 0) {
        proc = 0;
      }
    } else {
      proc = 2;
    }
  }
  return proc;
}
const reChars = /[-[\]{}()*+?.,\\^$|#\s]/g;
function escapeRegex$1(value) {
  return value.replace(reChars, "\\$&");
}
const caseInsensitiveAttributes = /* @__PURE__ */ new Set([
  "accept",
  "accept-charset",
  "align",
  "alink",
  "axis",
  "bgcolor",
  "charset",
  "checked",
  "clear",
  "codetype",
  "color",
  "compact",
  "declare",
  "defer",
  "dir",
  "direction",
  "disabled",
  "enctype",
  "face",
  "frame",
  "hreflang",
  "http-equiv",
  "lang",
  "language",
  "link",
  "media",
  "method",
  "multiple",
  "nohref",
  "noresize",
  "noshade",
  "nowrap",
  "readonly",
  "rel",
  "rev",
  "rules",
  "scope",
  "scrolling",
  "selected",
  "shape",
  "target",
  "text",
  "type",
  "valign",
  "valuetype",
  "vlink"
]);
function shouldIgnoreCase(selector, options2) {
  return typeof selector.ignoreCase === "boolean" ? selector.ignoreCase : selector.ignoreCase === "quirks" ? !!options2.quirksMode : !options2.xmlMode && caseInsensitiveAttributes.has(selector.name);
}
const attributeRules = {
  equals(next2, data2, options2) {
    const { adapter: adapter2 } = options2;
    const { name } = data2;
    let { value } = data2;
    if (shouldIgnoreCase(data2, options2)) {
      value = value.toLowerCase();
      return (elem) => {
        const attr2 = adapter2.getAttributeValue(elem, name);
        return attr2 != null && attr2.length === value.length && attr2.toLowerCase() === value && next2(elem);
      };
    }
    return (elem) => adapter2.getAttributeValue(elem, name) === value && next2(elem);
  },
  hyphen(next2, data2, options2) {
    const { adapter: adapter2 } = options2;
    const { name } = data2;
    let { value } = data2;
    const len = value.length;
    if (shouldIgnoreCase(data2, options2)) {
      value = value.toLowerCase();
      return function hyphenIC(elem) {
        const attr2 = adapter2.getAttributeValue(elem, name);
        return attr2 != null && (attr2.length === len || attr2.charAt(len) === "-") && attr2.substr(0, len).toLowerCase() === value && next2(elem);
      };
    }
    return function hyphen(elem) {
      const attr2 = adapter2.getAttributeValue(elem, name);
      return attr2 != null && (attr2.length === len || attr2.charAt(len) === "-") && attr2.substr(0, len) === value && next2(elem);
    };
  },
  element(next2, data2, options2) {
    const { adapter: adapter2 } = options2;
    const { name, value } = data2;
    if (/\s/.test(value)) {
      return boolbase$1.falseFunc;
    }
    const regex = new RegExp(`(?:^|\\s)${escapeRegex$1(value)}(?:$|\\s)`, shouldIgnoreCase(data2, options2) ? "i" : "");
    return function element(elem) {
      const attr2 = adapter2.getAttributeValue(elem, name);
      return attr2 != null && attr2.length >= value.length && regex.test(attr2) && next2(elem);
    };
  },
  exists(next2, { name }, { adapter: adapter2 }) {
    return (elem) => adapter2.hasAttrib(elem, name) && next2(elem);
  },
  start(next2, data2, options2) {
    const { adapter: adapter2 } = options2;
    const { name } = data2;
    let { value } = data2;
    const len = value.length;
    if (len === 0) {
      return boolbase$1.falseFunc;
    }
    if (shouldIgnoreCase(data2, options2)) {
      value = value.toLowerCase();
      return (elem) => {
        const attr2 = adapter2.getAttributeValue(elem, name);
        return attr2 != null && attr2.length >= len && attr2.substr(0, len).toLowerCase() === value && next2(elem);
      };
    }
    return (elem) => {
      var _a3;
      return !!((_a3 = adapter2.getAttributeValue(elem, name)) === null || _a3 === void 0 ? void 0 : _a3.startsWith(value)) && next2(elem);
    };
  },
  end(next2, data2, options2) {
    const { adapter: adapter2 } = options2;
    const { name } = data2;
    let { value } = data2;
    const len = -value.length;
    if (len === 0) {
      return boolbase$1.falseFunc;
    }
    if (shouldIgnoreCase(data2, options2)) {
      value = value.toLowerCase();
      return (elem) => {
        var _a3;
        return ((_a3 = adapter2.getAttributeValue(elem, name)) === null || _a3 === void 0 ? void 0 : _a3.substr(len).toLowerCase()) === value && next2(elem);
      };
    }
    return (elem) => {
      var _a3;
      return !!((_a3 = adapter2.getAttributeValue(elem, name)) === null || _a3 === void 0 ? void 0 : _a3.endsWith(value)) && next2(elem);
    };
  },
  any(next2, data2, options2) {
    const { adapter: adapter2 } = options2;
    const { name, value } = data2;
    if (value === "") {
      return boolbase$1.falseFunc;
    }
    if (shouldIgnoreCase(data2, options2)) {
      const regex = new RegExp(escapeRegex$1(value), "i");
      return function anyIC(elem) {
        const attr2 = adapter2.getAttributeValue(elem, name);
        return attr2 != null && attr2.length >= value.length && regex.test(attr2) && next2(elem);
      };
    }
    return (elem) => {
      var _a3;
      return !!((_a3 = adapter2.getAttributeValue(elem, name)) === null || _a3 === void 0 ? void 0 : _a3.includes(value)) && next2(elem);
    };
  },
  not(next2, data2, options2) {
    const { adapter: adapter2 } = options2;
    const { name } = data2;
    let { value } = data2;
    if (value === "") {
      return (elem) => !!adapter2.getAttributeValue(elem, name) && next2(elem);
    } else if (shouldIgnoreCase(data2, options2)) {
      value = value.toLowerCase();
      return (elem) => {
        const attr2 = adapter2.getAttributeValue(elem, name);
        return (attr2 == null || attr2.length !== value.length || attr2.toLowerCase() !== value) && next2(elem);
      };
    }
    return (elem) => adapter2.getAttributeValue(elem, name) !== value && next2(elem);
  }
};
const whitespace = /* @__PURE__ */ new Set([9, 10, 12, 13, 32]);
const ZERO = "0".charCodeAt(0);
const NINE = "9".charCodeAt(0);
function parse$3(formula) {
  formula = formula.trim().toLowerCase();
  if (formula === "even") {
    return [2, 0];
  } else if (formula === "odd") {
    return [2, 1];
  }
  let idx = 0;
  let a = 0;
  let sign = readSign();
  let number2 = readNumber();
  if (idx < formula.length && formula.charAt(idx) === "n") {
    idx++;
    a = sign * (number2 !== null && number2 !== void 0 ? number2 : 1);
    skipWhitespace();
    if (idx < formula.length) {
      sign = readSign();
      skipWhitespace();
      number2 = readNumber();
    } else {
      sign = number2 = 0;
    }
  }
  if (number2 === null || idx < formula.length) {
    throw new Error(`n-th rule couldn't be parsed ('${formula}')`);
  }
  return [a, sign * number2];
  function readSign() {
    if (formula.charAt(idx) === "-") {
      idx++;
      return -1;
    }
    if (formula.charAt(idx) === "+") {
      idx++;
    }
    return 1;
  }
  function readNumber() {
    const start = idx;
    let value = 0;
    while (idx < formula.length && formula.charCodeAt(idx) >= ZERO && formula.charCodeAt(idx) <= NINE) {
      value = value * 10 + (formula.charCodeAt(idx) - ZERO);
      idx++;
    }
    return idx === start ? null : value;
  }
  function skipWhitespace() {
    while (idx < formula.length && whitespace.has(formula.charCodeAt(idx))) {
      idx++;
    }
  }
}
function compile(parsed) {
  const a = parsed[0];
  const b = parsed[1] - 1;
  if (b < 0 && a <= 0)
    return boolbase$1.falseFunc;
  if (a === -1)
    return (index2) => index2 <= b;
  if (a === 0)
    return (index2) => index2 === b;
  if (a === 1)
    return b < 0 ? boolbase$1.trueFunc : (index2) => index2 >= b;
  const absA = Math.abs(a);
  const bMod = (b % absA + absA) % absA;
  return a > 1 ? (index2) => index2 >= b && index2 % absA === bMod : (index2) => index2 <= b && index2 % absA === bMod;
}
function nthCheck(formula) {
  return compile(parse$3(formula));
}
function getChildFunc(next2, adapter2) {
  return (elem) => {
    const parent2 = adapter2.getParent(elem);
    return parent2 != null && adapter2.isTag(parent2) && next2(elem);
  };
}
const filters = {
  contains(next2, text2, { adapter: adapter2 }) {
    return function contains2(elem) {
      return next2(elem) && adapter2.getText(elem).includes(text2);
    };
  },
  icontains(next2, text2, { adapter: adapter2 }) {
    const itext = text2.toLowerCase();
    return function icontains(elem) {
      return next2(elem) && adapter2.getText(elem).toLowerCase().includes(itext);
    };
  },
  // Location specific methods
  "nth-child"(next2, rule, { adapter: adapter2, equals: equals2 }) {
    const func = nthCheck(rule);
    if (func === boolbase$1.falseFunc)
      return boolbase$1.falseFunc;
    if (func === boolbase$1.trueFunc)
      return getChildFunc(next2, adapter2);
    return function nthChild(elem) {
      const siblings2 = adapter2.getSiblings(elem);
      let pos = 0;
      for (let i = 0; i < siblings2.length; i++) {
        if (equals2(elem, siblings2[i]))
          break;
        if (adapter2.isTag(siblings2[i])) {
          pos++;
        }
      }
      return func(pos) && next2(elem);
    };
  },
  "nth-last-child"(next2, rule, { adapter: adapter2, equals: equals2 }) {
    const func = nthCheck(rule);
    if (func === boolbase$1.falseFunc)
      return boolbase$1.falseFunc;
    if (func === boolbase$1.trueFunc)
      return getChildFunc(next2, adapter2);
    return function nthLastChild(elem) {
      const siblings2 = adapter2.getSiblings(elem);
      let pos = 0;
      for (let i = siblings2.length - 1; i >= 0; i--) {
        if (equals2(elem, siblings2[i]))
          break;
        if (adapter2.isTag(siblings2[i])) {
          pos++;
        }
      }
      return func(pos) && next2(elem);
    };
  },
  "nth-of-type"(next2, rule, { adapter: adapter2, equals: equals2 }) {
    const func = nthCheck(rule);
    if (func === boolbase$1.falseFunc)
      return boolbase$1.falseFunc;
    if (func === boolbase$1.trueFunc)
      return getChildFunc(next2, adapter2);
    return function nthOfType(elem) {
      const siblings2 = adapter2.getSiblings(elem);
      let pos = 0;
      for (let i = 0; i < siblings2.length; i++) {
        const currentSibling = siblings2[i];
        if (equals2(elem, currentSibling))
          break;
        if (adapter2.isTag(currentSibling) && adapter2.getName(currentSibling) === adapter2.getName(elem)) {
          pos++;
        }
      }
      return func(pos) && next2(elem);
    };
  },
  "nth-last-of-type"(next2, rule, { adapter: adapter2, equals: equals2 }) {
    const func = nthCheck(rule);
    if (func === boolbase$1.falseFunc)
      return boolbase$1.falseFunc;
    if (func === boolbase$1.trueFunc)
      return getChildFunc(next2, adapter2);
    return function nthLastOfType(elem) {
      const siblings2 = adapter2.getSiblings(elem);
      let pos = 0;
      for (let i = siblings2.length - 1; i >= 0; i--) {
        const currentSibling = siblings2[i];
        if (equals2(elem, currentSibling))
          break;
        if (adapter2.isTag(currentSibling) && adapter2.getName(currentSibling) === adapter2.getName(elem)) {
          pos++;
        }
      }
      return func(pos) && next2(elem);
    };
  },
  // TODO determine the actual root element
  root(next2, _rule, { adapter: adapter2 }) {
    return (elem) => {
      const parent2 = adapter2.getParent(elem);
      return (parent2 == null || !adapter2.isTag(parent2)) && next2(elem);
    };
  },
  scope(next2, rule, options2, context) {
    const { equals: equals2 } = options2;
    if (!context || context.length === 0) {
      return filters["root"](next2, rule, options2);
    }
    if (context.length === 1) {
      return (elem) => equals2(context[0], elem) && next2(elem);
    }
    return (elem) => context.includes(elem) && next2(elem);
  },
  hover: dynamicStatePseudo("isHovered"),
  visited: dynamicStatePseudo("isVisited"),
  active: dynamicStatePseudo("isActive")
};
function dynamicStatePseudo(name) {
  return function dynamicPseudo(next2, _rule, { adapter: adapter2 }) {
    const func = adapter2[name];
    if (typeof func !== "function") {
      return boolbase$1.falseFunc;
    }
    return function active2(elem) {
      return func(elem) && next2(elem);
    };
  };
}
const pseudos = {
  empty(elem, { adapter: adapter2 }) {
    return !adapter2.getChildren(elem).some((elem2) => (
      // FIXME: `getText` call is potentially expensive.
      adapter2.isTag(elem2) || adapter2.getText(elem2) !== ""
    ));
  },
  "first-child"(elem, { adapter: adapter2, equals: equals2 }) {
    if (adapter2.prevElementSibling) {
      return adapter2.prevElementSibling(elem) == null;
    }
    const firstChild = adapter2.getSiblings(elem).find((elem2) => adapter2.isTag(elem2));
    return firstChild != null && equals2(elem, firstChild);
  },
  "last-child"(elem, { adapter: adapter2, equals: equals2 }) {
    const siblings2 = adapter2.getSiblings(elem);
    for (let i = siblings2.length - 1; i >= 0; i--) {
      if (equals2(elem, siblings2[i]))
        return true;
      if (adapter2.isTag(siblings2[i]))
        break;
    }
    return false;
  },
  "first-of-type"(elem, { adapter: adapter2, equals: equals2 }) {
    const siblings2 = adapter2.getSiblings(elem);
    const elemName = adapter2.getName(elem);
    for (let i = 0; i < siblings2.length; i++) {
      const currentSibling = siblings2[i];
      if (equals2(elem, currentSibling))
        return true;
      if (adapter2.isTag(currentSibling) && adapter2.getName(currentSibling) === elemName) {
        break;
      }
    }
    return false;
  },
  "last-of-type"(elem, { adapter: adapter2, equals: equals2 }) {
    const siblings2 = adapter2.getSiblings(elem);
    const elemName = adapter2.getName(elem);
    for (let i = siblings2.length - 1; i >= 0; i--) {
      const currentSibling = siblings2[i];
      if (equals2(elem, currentSibling))
        return true;
      if (adapter2.isTag(currentSibling) && adapter2.getName(currentSibling) === elemName) {
        break;
      }
    }
    return false;
  },
  "only-of-type"(elem, { adapter: adapter2, equals: equals2 }) {
    const elemName = adapter2.getName(elem);
    return adapter2.getSiblings(elem).every((sibling) => equals2(elem, sibling) || !adapter2.isTag(sibling) || adapter2.getName(sibling) !== elemName);
  },
  "only-child"(elem, { adapter: adapter2, equals: equals2 }) {
    return adapter2.getSiblings(elem).every((sibling) => equals2(elem, sibling) || !adapter2.isTag(sibling));
  }
};
function verifyPseudoArgs(func, name, subselect, argIndex) {
  if (subselect === null) {
    if (func.length > argIndex) {
      throw new Error(`Pseudo-class :${name} requires an argument`);
    }
  } else if (func.length === argIndex) {
    throw new Error(`Pseudo-class :${name} doesn't have any arguments`);
  }
}
const aliases = {
  // Links
  "any-link": ":is(a, area, link)[href]",
  link: ":any-link:not(:visited)",
  // Forms
  // https://html.spec.whatwg.org/multipage/scripting.html#disabled-elements
  disabled: `:is(
        :is(button, input, select, textarea, optgroup, option)[disabled],
        optgroup[disabled] > option,
        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)
    )`,
  enabled: ":not(:disabled)",
  checked: ":is(:is(input[type=radio], input[type=checkbox])[checked], option:selected)",
  required: ":is(input, select, textarea)[required]",
  optional: ":is(input, select, textarea):not([required])",
  // JQuery extensions
  // https://html.spec.whatwg.org/multipage/form-elements.html#concept-option-selectedness
  selected: "option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)",
  checkbox: "[type=checkbox]",
  file: "[type=file]",
  password: "[type=password]",
  radio: "[type=radio]",
  reset: "[type=reset]",
  image: "[type=image]",
  submit: "[type=submit]",
  parent: ":not(:empty)",
  header: ":is(h1, h2, h3, h4, h5, h6)",
  button: ":is(button, input[type=button])",
  input: ":is(input, textarea, select, button)",
  text: "input:is(:not([type!='']), [type=text])"
};
const PLACEHOLDER_ELEMENT = {};
function ensureIsTag(next2, adapter2) {
  if (next2 === boolbase$1.falseFunc)
    return boolbase$1.falseFunc;
  return (elem) => adapter2.isTag(elem) && next2(elem);
}
function getNextSiblings(elem, adapter2) {
  const siblings2 = adapter2.getSiblings(elem);
  if (siblings2.length <= 1)
    return [];
  const elemIndex = siblings2.indexOf(elem);
  if (elemIndex < 0 || elemIndex === siblings2.length - 1)
    return [];
  return siblings2.slice(elemIndex + 1).filter(adapter2.isTag);
}
function copyOptions(options2) {
  return {
    xmlMode: !!options2.xmlMode,
    lowerCaseAttributeNames: !!options2.lowerCaseAttributeNames,
    lowerCaseTags: !!options2.lowerCaseTags,
    quirksMode: !!options2.quirksMode,
    cacheResults: !!options2.cacheResults,
    pseudos: options2.pseudos,
    adapter: options2.adapter,
    equals: options2.equals
  };
}
const is$2 = (next2, token, options2, context, compileToken2) => {
  const func = compileToken2(token, copyOptions(options2), context);
  return func === boolbase$1.trueFunc ? next2 : func === boolbase$1.falseFunc ? boolbase$1.falseFunc : (elem) => func(elem) && next2(elem);
};
const subselects = {
  is: is$2,
  /**
   * `:matches` and `:where` are aliases for `:is`.
   */
  matches: is$2,
  where: is$2,
  not(next2, token, options2, context, compileToken2) {
    const func = compileToken2(token, copyOptions(options2), context);
    return func === boolbase$1.falseFunc ? next2 : func === boolbase$1.trueFunc ? boolbase$1.falseFunc : (elem) => !func(elem) && next2(elem);
  },
  has(next2, subselect, options2, _context, compileToken2) {
    const { adapter: adapter2 } = options2;
    const opts = copyOptions(options2);
    opts.relativeSelector = true;
    const context = subselect.some((s) => s.some(isTraversal)) ? (
      // Used as a placeholder. Will be replaced with the actual element.
      [PLACEHOLDER_ELEMENT]
    ) : void 0;
    const compiled = compileToken2(subselect, opts, context);
    if (compiled === boolbase$1.falseFunc)
      return boolbase$1.falseFunc;
    const hasElement = ensureIsTag(compiled, adapter2);
    if (context && compiled !== boolbase$1.trueFunc) {
      const { shouldTestNextSiblings = false } = compiled;
      return (elem) => {
        if (!next2(elem))
          return false;
        context[0] = elem;
        const childs = adapter2.getChildren(elem);
        const nextElements = shouldTestNextSiblings ? [...childs, ...getNextSiblings(elem, adapter2)] : childs;
        return adapter2.existsOne(hasElement, nextElements);
      };
    }
    return (elem) => next2(elem) && adapter2.existsOne(hasElement, adapter2.getChildren(elem));
  }
};
function compilePseudoSelector(next2, selector, options2, context, compileToken2) {
  var _a3;
  const { name, data: data2 } = selector;
  if (Array.isArray(data2)) {
    if (!(name in subselects)) {
      throw new Error(`Unknown pseudo-class :${name}(${data2})`);
    }
    return subselects[name](next2, data2, options2, context, compileToken2);
  }
  const userPseudo = (_a3 = options2.pseudos) === null || _a3 === void 0 ? void 0 : _a3[name];
  const stringPseudo = typeof userPseudo === "string" ? userPseudo : aliases[name];
  if (typeof stringPseudo === "string") {
    if (data2 != null) {
      throw new Error(`Pseudo ${name} doesn't have any arguments`);
    }
    const alias = parse$4(stringPseudo);
    return subselects["is"](next2, alias, options2, context, compileToken2);
  }
  if (typeof userPseudo === "function") {
    verifyPseudoArgs(userPseudo, name, data2, 1);
    return (elem) => userPseudo(elem, data2) && next2(elem);
  }
  if (name in filters) {
    return filters[name](next2, data2, options2, context);
  }
  if (name in pseudos) {
    const pseudo = pseudos[name];
    verifyPseudoArgs(pseudo, name, data2, 2);
    return (elem) => pseudo(elem, options2, data2) && next2(elem);
  }
  throw new Error(`Unknown pseudo-class :${name}`);
}
function getElementParent(node, adapter2) {
  const parent2 = adapter2.getParent(node);
  if (parent2 && adapter2.isTag(parent2)) {
    return parent2;
  }
  return null;
}
function compileGeneralSelector(next2, selector, options2, context, compileToken2) {
  const { adapter: adapter2, equals: equals2 } = options2;
  switch (selector.type) {
    case SelectorType.PseudoElement: {
      throw new Error("Pseudo-elements are not supported by css-select");
    }
    case SelectorType.ColumnCombinator: {
      throw new Error("Column combinators are not yet supported by css-select");
    }
    case SelectorType.Attribute: {
      if (selector.namespace != null) {
        throw new Error("Namespaced attributes are not yet supported by css-select");
      }
      if (!options2.xmlMode || options2.lowerCaseAttributeNames) {
        selector.name = selector.name.toLowerCase();
      }
      return attributeRules[selector.action](next2, selector, options2);
    }
    case SelectorType.Pseudo: {
      return compilePseudoSelector(next2, selector, options2, context, compileToken2);
    }
    case SelectorType.Tag: {
      if (selector.namespace != null) {
        throw new Error("Namespaced tag names are not yet supported by css-select");
      }
      let { name } = selector;
      if (!options2.xmlMode || options2.lowerCaseTags) {
        name = name.toLowerCase();
      }
      return function tag(elem) {
        return adapter2.getName(elem) === name && next2(elem);
      };
    }
    case SelectorType.Descendant: {
      if (options2.cacheResults === false || typeof WeakSet === "undefined") {
        return function descendant(elem) {
          let current = elem;
          while (current = getElementParent(current, adapter2)) {
            if (next2(current)) {
              return true;
            }
          }
          return false;
        };
      }
      const isFalseCache = /* @__PURE__ */ new WeakSet();
      return function cachedDescendant(elem) {
        let current = elem;
        while (current = getElementParent(current, adapter2)) {
          if (!isFalseCache.has(current)) {
            if (adapter2.isTag(current) && next2(current)) {
              return true;
            }
            isFalseCache.add(current);
          }
        }
        return false;
      };
    }
    case "_flexibleDescendant": {
      return function flexibleDescendant(elem) {
        let current = elem;
        do {
          if (next2(current))
            return true;
        } while (current = getElementParent(current, adapter2));
        return false;
      };
    }
    case SelectorType.Parent: {
      return function parent2(elem) {
        return adapter2.getChildren(elem).some((elem2) => adapter2.isTag(elem2) && next2(elem2));
      };
    }
    case SelectorType.Child: {
      return function child(elem) {
        const parent2 = adapter2.getParent(elem);
        return parent2 != null && adapter2.isTag(parent2) && next2(parent2);
      };
    }
    case SelectorType.Sibling: {
      return function sibling(elem) {
        const siblings2 = adapter2.getSiblings(elem);
        for (let i = 0; i < siblings2.length; i++) {
          const currentSibling = siblings2[i];
          if (equals2(elem, currentSibling))
            break;
          if (adapter2.isTag(currentSibling) && next2(currentSibling)) {
            return true;
          }
        }
        return false;
      };
    }
    case SelectorType.Adjacent: {
      if (adapter2.prevElementSibling) {
        return function adjacent(elem) {
          const previous = adapter2.prevElementSibling(elem);
          return previous != null && next2(previous);
        };
      }
      return function adjacent(elem) {
        const siblings2 = adapter2.getSiblings(elem);
        let lastElement;
        for (let i = 0; i < siblings2.length; i++) {
          const currentSibling = siblings2[i];
          if (equals2(elem, currentSibling))
            break;
          if (adapter2.isTag(currentSibling)) {
            lastElement = currentSibling;
          }
        }
        return !!lastElement && next2(lastElement);
      };
    }
    case SelectorType.Universal: {
      if (selector.namespace != null && selector.namespace !== "*") {
        throw new Error("Namespaced universal selectors are not yet supported by css-select");
      }
      return next2;
    }
  }
}
function includesScopePseudo(t) {
  return t.type === SelectorType.Pseudo && (t.name === "scope" || Array.isArray(t.data) && t.data.some((data2) => data2.some(includesScopePseudo)));
}
const DESCENDANT_TOKEN = { type: SelectorType.Descendant };
const FLEXIBLE_DESCENDANT_TOKEN = {
  type: "_flexibleDescendant"
};
const SCOPE_TOKEN = {
  type: SelectorType.Pseudo,
  name: "scope",
  data: null
};
function absolutize(token, { adapter: adapter2 }, context) {
  const hasContext = !!(context === null || context === void 0 ? void 0 : context.every((e) => {
    const parent2 = adapter2.isTag(e) && adapter2.getParent(e);
    return e === PLACEHOLDER_ELEMENT || parent2 && adapter2.isTag(parent2);
  }));
  for (const t of token) {
    if (t.length > 0 && isTraversal(t[0]) && t[0].type !== SelectorType.Descendant)
      ;
    else if (hasContext && !t.some(includesScopePseudo)) {
      t.unshift(DESCENDANT_TOKEN);
    } else {
      continue;
    }
    t.unshift(SCOPE_TOKEN);
  }
}
function compileToken(token, options2, context) {
  var _a3;
  token.forEach(sortByProcedure);
  context = (_a3 = options2.context) !== null && _a3 !== void 0 ? _a3 : context;
  const isArrayContext = Array.isArray(context);
  const finalContext = context && (Array.isArray(context) ? context : [context]);
  if (options2.relativeSelector !== false) {
    absolutize(token, options2, finalContext);
  } else if (token.some((t) => t.length > 0 && isTraversal(t[0]))) {
    throw new Error("Relative selectors are not allowed when the `relativeSelector` option is disabled");
  }
  let shouldTestNextSiblings = false;
  const query = token.map((rules) => {
    if (rules.length >= 2) {
      const [first2, second] = rules;
      if (first2.type !== SelectorType.Pseudo || first2.name !== "scope")
        ;
      else if (isArrayContext && second.type === SelectorType.Descendant) {
        rules[1] = FLEXIBLE_DESCENDANT_TOKEN;
      } else if (second.type === SelectorType.Adjacent || second.type === SelectorType.Sibling) {
        shouldTestNextSiblings = true;
      }
    }
    return compileRules(rules, options2, finalContext);
  }).reduce(reduceRules, boolbase$1.falseFunc);
  query.shouldTestNextSiblings = shouldTestNextSiblings;
  return query;
}
function compileRules(rules, options2, context) {
  var _a3;
  return rules.reduce((previous, rule) => previous === boolbase$1.falseFunc ? boolbase$1.falseFunc : compileGeneralSelector(previous, rule, options2, context, compileToken), (_a3 = options2.rootFunc) !== null && _a3 !== void 0 ? _a3 : boolbase$1.trueFunc);
}
function reduceRules(a, b) {
  if (b === boolbase$1.falseFunc || a === boolbase$1.trueFunc) {
    return a;
  }
  if (a === boolbase$1.falseFunc || b === boolbase$1.trueFunc) {
    return b;
  }
  return function combine2(elem) {
    return a(elem) || b(elem);
  };
}
const defaultEquals = (a, b) => a === b;
const defaultOptions = {
  adapter: DomUtils,
  equals: defaultEquals
};
function convertOptionFormats(options2) {
  var _a3, _b2, _c2, _d2;
  const opts = options2 !== null && options2 !== void 0 ? options2 : defaultOptions;
  (_a3 = opts.adapter) !== null && _a3 !== void 0 ? _a3 : opts.adapter = DomUtils;
  (_b2 = opts.equals) !== null && _b2 !== void 0 ? _b2 : opts.equals = (_d2 = (_c2 = opts.adapter) === null || _c2 === void 0 ? void 0 : _c2.equals) !== null && _d2 !== void 0 ? _d2 : defaultEquals;
  return opts;
}
function wrapCompile(func) {
  return function addAdapter(selector, options2, context) {
    const opts = convertOptionFormats(options2);
    return func(selector, opts, context);
  };
}
const _compileToken = wrapCompile(compileToken);
function prepareContext(elems, adapter2, shouldTestNextSiblings = false) {
  if (shouldTestNextSiblings) {
    elems = appendNextSiblings(elems, adapter2);
  }
  return Array.isArray(elems) ? adapter2.removeSubsets(elems) : adapter2.getChildren(elems);
}
function appendNextSiblings(elem, adapter2) {
  const elems = Array.isArray(elem) ? elem.slice(0) : [elem];
  const elemsLength = elems.length;
  for (let i = 0; i < elemsLength; i++) {
    const nextSiblings = getNextSiblings(elems[i], adapter2);
    elems.push(...nextSiblings);
  }
  return elems;
}
const filterNames = /* @__PURE__ */ new Set([
  "first",
  "last",
  "eq",
  "gt",
  "nth",
  "lt",
  "even",
  "odd"
]);
function isFilter(s) {
  if (s.type !== "pseudo")
    return false;
  if (filterNames.has(s.name))
    return true;
  if (s.name === "not" && Array.isArray(s.data)) {
    return s.data.some((s2) => s2.some(isFilter));
  }
  return false;
}
function getLimit(filter2, data2, partLimit) {
  const num = data2 != null ? parseInt(data2, 10) : NaN;
  switch (filter2) {
    case "first":
      return 1;
    case "nth":
    case "eq":
      return isFinite(num) ? num >= 0 ? num + 1 : Infinity : 0;
    case "lt":
      return isFinite(num) ? num >= 0 ? Math.min(num, partLimit) : Infinity : 0;
    case "gt":
      return isFinite(num) ? Infinity : 0;
    case "odd":
      return 2 * partLimit;
    case "even":
      return 2 * partLimit - 1;
    case "last":
    case "not":
      return Infinity;
  }
}
function getDocumentRoot(node) {
  while (node.parent)
    node = node.parent;
  return node;
}
function groupSelectors(selectors) {
  const filteredSelectors = [];
  const plainSelectors = [];
  for (const selector of selectors) {
    if (selector.some(isFilter)) {
      filteredSelectors.push(selector);
    } else {
      plainSelectors.push(selector);
    }
  }
  return [plainSelectors, filteredSelectors];
}
const UNIVERSAL_SELECTOR = {
  type: SelectorType.Universal,
  namespace: null
};
const SCOPE_PSEUDO = {
  type: SelectorType.Pseudo,
  name: "scope",
  data: null
};
function is$1(element, selector, options2 = {}) {
  return some$2([element], selector, options2);
}
function some$2(elements, selector, options2 = {}) {
  if (typeof selector === "function")
    return elements.some(selector);
  const [plain, filtered] = groupSelectors(parse$4(selector));
  return plain.length > 0 && elements.some(_compileToken(plain, options2)) || filtered.some((sel) => filterBySelector(sel, elements, options2).length > 0);
}
function filterByPosition(filter2, elems, data2, options2) {
  const num = typeof data2 === "string" ? parseInt(data2, 10) : NaN;
  switch (filter2) {
    case "first":
    case "lt":
      return elems;
    case "last":
      return elems.length > 0 ? [elems[elems.length - 1]] : elems;
    case "nth":
    case "eq":
      return isFinite(num) && Math.abs(num) < elems.length ? [num < 0 ? elems[elems.length + num] : elems[num]] : [];
    case "gt":
      return isFinite(num) ? elems.slice(num + 1) : [];
    case "even":
      return elems.filter((_, i) => i % 2 === 0);
    case "odd":
      return elems.filter((_, i) => i % 2 === 1);
    case "not": {
      const filtered = new Set(filterParsed(data2, elems, options2));
      return elems.filter((e) => !filtered.has(e));
    }
  }
}
function filter$1(selector, elements, options2 = {}) {
  return filterParsed(parse$4(selector), elements, options2);
}
function filterParsed(selector, elements, options2) {
  if (elements.length === 0)
    return [];
  const [plainSelectors, filteredSelectors] = groupSelectors(selector);
  let found;
  if (plainSelectors.length) {
    const filtered = filterElements(elements, plainSelectors, options2);
    if (filteredSelectors.length === 0) {
      return filtered;
    }
    if (filtered.length) {
      found = new Set(filtered);
    }
  }
  for (let i = 0; i < filteredSelectors.length && (found === null || found === void 0 ? void 0 : found.size) !== elements.length; i++) {
    const filteredSelector = filteredSelectors[i];
    const missing = found ? elements.filter((e) => isTag(e) && !found.has(e)) : elements;
    if (missing.length === 0)
      break;
    const filtered = filterBySelector(filteredSelector, elements, options2);
    if (filtered.length) {
      if (!found) {
        if (i === filteredSelectors.length - 1) {
          return filtered;
        }
        found = new Set(filtered);
      } else {
        filtered.forEach((el) => found.add(el));
      }
    }
  }
  return typeof found !== "undefined" ? found.size === elements.length ? elements : (
    // Filter elements to preserve order
    elements.filter((el) => found.has(el))
  ) : [];
}
function filterBySelector(selector, elements, options2) {
  var _a3;
  if (selector.some(isTraversal$1)) {
    const root2 = (_a3 = options2.root) !== null && _a3 !== void 0 ? _a3 : getDocumentRoot(elements[0]);
    const opts = { ...options2, context: elements, relativeSelector: false };
    selector.push(SCOPE_PSEUDO);
    return findFilterElements(root2, selector, opts, true, elements.length);
  }
  return findFilterElements(elements, selector, options2, false, elements.length);
}
function select(selector, root2, options2 = {}, limit = Infinity) {
  if (typeof selector === "function") {
    return find$2(root2, selector);
  }
  const [plain, filtered] = groupSelectors(parse$4(selector));
  const results = filtered.map((sel) => findFilterElements(root2, sel, options2, true, limit));
  if (plain.length) {
    results.push(findElements(root2, plain, options2, limit));
  }
  if (results.length === 0) {
    return [];
  }
  if (results.length === 1) {
    return results[0];
  }
  return uniqueSort(results.reduce((a, b) => [...a, ...b]));
}
function findFilterElements(root2, selector, options2, queryForSelector, totalLimit) {
  const filterIndex = selector.findIndex(isFilter);
  const sub = selector.slice(0, filterIndex);
  const filter2 = selector[filterIndex];
  const partLimit = selector.length - 1 === filterIndex ? totalLimit : Infinity;
  const limit = getLimit(filter2.name, filter2.data, partLimit);
  if (limit === 0)
    return [];
  const elemsNoLimit = sub.length === 0 && !Array.isArray(root2) ? getChildren(root2).filter(isTag) : sub.length === 0 ? (Array.isArray(root2) ? root2 : [root2]).filter(isTag) : queryForSelector || sub.some(isTraversal$1) ? findElements(root2, [sub], options2, limit) : filterElements(root2, [sub], options2);
  const elems = elemsNoLimit.slice(0, limit);
  let result = filterByPosition(filter2.name, elems, filter2.data, options2);
  if (result.length === 0 || selector.length === filterIndex + 1) {
    return result;
  }
  const remainingSelector = selector.slice(filterIndex + 1);
  const remainingHasTraversal = remainingSelector.some(isTraversal$1);
  if (remainingHasTraversal) {
    if (isTraversal$1(remainingSelector[0])) {
      const { type } = remainingSelector[0];
      if (type === SelectorType.Sibling || type === SelectorType.Adjacent) {
        result = prepareContext(result, DomUtils, true);
      }
      remainingSelector.unshift(UNIVERSAL_SELECTOR);
    }
    options2 = {
      ...options2,
      // Avoid absolutizing the selector
      relativeSelector: false,
      /*
       * Add a custom root func, to make sure traversals don't match elements
       * that aren't a part of the considered tree.
       */
      rootFunc: (el) => result.includes(el)
    };
  } else if (options2.rootFunc && options2.rootFunc !== boolbase.trueFunc) {
    options2 = { ...options2, rootFunc: boolbase.trueFunc };
  }
  return remainingSelector.some(isFilter) ? findFilterElements(result, remainingSelector, options2, false, totalLimit) : remainingHasTraversal ? (
    // Query existing elements to resolve traversal.
    findElements(result, [remainingSelector], options2, totalLimit)
  ) : (
    // If we don't have any more traversals, simply filter elements.
    filterElements(result, [remainingSelector], options2)
  );
}
function findElements(root2, sel, options2, limit) {
  const query = _compileToken(sel, options2, root2);
  return find$2(root2, query, limit);
}
function find$2(root2, query, limit = Infinity) {
  const elems = prepareContext(root2, DomUtils, query.shouldTestNextSiblings);
  return find$3((node) => isTag(node) && query(node), elems, true, limit);
}
function filterElements(elements, sel, options2) {
  const els = (Array.isArray(elements) ? elements : [elements]).filter(isTag);
  if (els.length === 0)
    return els;
  const query = _compileToken(sel, options2);
  return query === boolbase.trueFunc ? els : els.filter(query);
}
const reSiblingSelector = /^\s*[~+]/;
function find$1(selectorOrHaystack) {
  var _a3;
  if (!selectorOrHaystack) {
    return this._make([]);
  }
  const context = this.toArray();
  if (typeof selectorOrHaystack !== "string") {
    const haystack = isCheerio(selectorOrHaystack) ? selectorOrHaystack.toArray() : [selectorOrHaystack];
    return this._make(haystack.filter((elem) => context.some((node) => contains$1(node, elem))));
  }
  const elems = reSiblingSelector.test(selectorOrHaystack) ? context : this.children().toArray();
  const options2 = {
    context,
    root: (_a3 = this._root) === null || _a3 === void 0 ? void 0 : _a3[0],
    // Pass options that are recognized by `cheerio-select`
    xmlMode: this.options.xmlMode,
    lowerCaseTags: this.options.lowerCaseTags,
    lowerCaseAttributeNames: this.options.lowerCaseAttributeNames,
    pseudos: this.options.pseudos,
    quirksMode: this.options.quirksMode
  };
  return this._make(select(selectorOrHaystack, elems, options2));
}
function _getMatcher(matchMap) {
  return function(fn, ...postFns) {
    return function(selector) {
      var _a3;
      let matched = matchMap(fn, this);
      if (selector) {
        matched = filterArray(matched, selector, this.options.xmlMode, (_a3 = this._root) === null || _a3 === void 0 ? void 0 : _a3[0]);
      }
      return this._make(
        // Post processing is only necessary if there is more than one element.
        this.length > 1 && matched.length > 1 ? postFns.reduce((elems, fn2) => fn2(elems), matched) : matched
      );
    };
  };
}
const _matcher = _getMatcher((fn, elems) => {
  const ret = [];
  for (let i = 0; i < elems.length; i++) {
    const value = fn(elems[i]);
    ret.push(value);
  }
  return new Array().concat(...ret);
});
const _singleMatcher = _getMatcher((fn, elems) => {
  const ret = [];
  for (let i = 0; i < elems.length; i++) {
    const value = fn(elems[i]);
    if (value !== null) {
      ret.push(value);
    }
  }
  return ret;
});
function _matchUntil(nextElem, ...postFns) {
  let matches = null;
  const innerMatcher = _getMatcher((nextElem2, elems) => {
    const matched = [];
    domEach(elems, (elem) => {
      for (let next2; next2 = nextElem2(elem); elem = next2) {
        if (matches === null || matches === void 0 ? void 0 : matches(next2, matched.length))
          break;
        matched.push(next2);
      }
    });
    return matched;
  })(nextElem, ...postFns);
  return function(selector, filterSelector) {
    matches = typeof selector === "string" ? (elem) => is$1(elem, selector, this.options) : selector ? getFilterFn(selector) : null;
    const ret = innerMatcher.call(this, filterSelector);
    matches = null;
    return ret;
  };
}
function _removeDuplicates(elems) {
  return Array.from(new Set(elems));
}
const parent = _singleMatcher(({ parent: parent2 }) => parent2 && !isDocument(parent2) ? parent2 : null, _removeDuplicates);
const parents = _matcher((elem) => {
  const matched = [];
  while (elem.parent && !isDocument(elem.parent)) {
    matched.push(elem.parent);
    elem = elem.parent;
  }
  return matched;
}, uniqueSort, (elems) => elems.reverse());
const parentsUntil = _matchUntil(({ parent: parent2 }) => parent2 && !isDocument(parent2) ? parent2 : null, uniqueSort, (elems) => elems.reverse());
function closest(selector) {
  var _a3;
  const set2 = [];
  if (!selector) {
    return this._make(set2);
  }
  const selectOpts = {
    xmlMode: this.options.xmlMode,
    root: (_a3 = this._root) === null || _a3 === void 0 ? void 0 : _a3[0]
  };
  const selectFn = typeof selector === "string" ? (elem) => is$1(elem, selector, selectOpts) : getFilterFn(selector);
  domEach(this, (elem) => {
    while (elem && isTag(elem)) {
      if (selectFn(elem, 0)) {
        if (!set2.includes(elem)) {
          set2.push(elem);
        }
        break;
      }
      elem = elem.parent;
    }
  });
  return this._make(set2);
}
const next = _singleMatcher((elem) => nextElementSibling(elem));
const nextAll = _matcher((elem) => {
  const matched = [];
  while (elem.next) {
    elem = elem.next;
    if (isTag(elem))
      matched.push(elem);
  }
  return matched;
}, _removeDuplicates);
const nextUntil = _matchUntil((el) => nextElementSibling(el), _removeDuplicates);
const prev = _singleMatcher((elem) => prevElementSibling(elem));
const prevAll = _matcher((elem) => {
  const matched = [];
  while (elem.prev) {
    elem = elem.prev;
    if (isTag(elem))
      matched.push(elem);
  }
  return matched;
}, _removeDuplicates);
const prevUntil = _matchUntil((el) => prevElementSibling(el), _removeDuplicates);
const siblings = _matcher((elem) => getSiblings(elem).filter((el) => isTag(el) && el !== elem), uniqueSort);
const children = _matcher((elem) => getChildren(elem).filter(isTag), _removeDuplicates);
function contents() {
  const elems = this.toArray().reduce((newElems, elem) => hasChildren(elem) ? newElems.concat(elem.children) : newElems, []);
  return this._make(elems);
}
function each(fn) {
  let i = 0;
  const len = this.length;
  while (i < len && fn.call(this[i], i, this[i]) !== false)
    ++i;
  return this;
}
function map$6(fn) {
  let elems = [];
  for (let i = 0; i < this.length; i++) {
    const el = this[i];
    const val2 = fn.call(el, i, el);
    if (val2 != null) {
      elems = elems.concat(val2);
    }
  }
  return this._make(elems);
}
function getFilterFn(match2) {
  if (typeof match2 === "function") {
    return (el, i) => match2.call(el, i, el);
  }
  if (isCheerio(match2)) {
    return (el) => Array.prototype.includes.call(match2, el);
  }
  return function(el) {
    return match2 === el;
  };
}
function filter(match2) {
  var _a3;
  return this._make(filterArray(this.toArray(), match2, this.options.xmlMode, (_a3 = this._root) === null || _a3 === void 0 ? void 0 : _a3[0]));
}
function filterArray(nodes, match2, xmlMode, root2) {
  return typeof match2 === "string" ? filter$1(match2, nodes, { xmlMode, root: root2 }) : nodes.filter(getFilterFn(match2));
}
function is(selector) {
  const nodes = this.toArray();
  return typeof selector === "string" ? some$2(nodes.filter(isTag), selector, this.options) : selector ? nodes.some(getFilterFn(selector)) : false;
}
function not(match2) {
  let nodes = this.toArray();
  if (typeof match2 === "string") {
    const matches = new Set(filter$1(match2, nodes, this.options));
    nodes = nodes.filter((el) => !matches.has(el));
  } else {
    const filterFn = getFilterFn(match2);
    nodes = nodes.filter((el, i) => !filterFn(el, i));
  }
  return this._make(nodes);
}
function has$4(selectorOrHaystack) {
  return this.filter(typeof selectorOrHaystack === "string" ? (
    // Using the `:has` selector here short-circuits searches.
    `:has(${selectorOrHaystack})`
  ) : (_, el) => this._make(el).find(selectorOrHaystack).length > 0);
}
function first() {
  return this.length > 1 ? this._make(this[0]) : this;
}
function last$1() {
  return this.length > 0 ? this._make(this[this.length - 1]) : this;
}
function eq(i) {
  var _a3;
  i = +i;
  if (i === 0 && this.length <= 1)
    return this;
  if (i < 0)
    i = this.length + i;
  return this._make((_a3 = this[i]) !== null && _a3 !== void 0 ? _a3 : []);
}
function get$9(i) {
  if (i == null) {
    return this.toArray();
  }
  return this[i < 0 ? this.length + i : i];
}
function toArray() {
  return Array.prototype.slice.call(this);
}
function index(selectorOrNeedle) {
  let $haystack;
  let needle;
  if (selectorOrNeedle == null) {
    $haystack = this.parent().children();
    needle = this[0];
  } else if (typeof selectorOrNeedle === "string") {
    $haystack = this._make(selectorOrNeedle);
    needle = this[0];
  } else {
    $haystack = this;
    needle = isCheerio(selectorOrNeedle) ? selectorOrNeedle[0] : selectorOrNeedle;
  }
  return Array.prototype.indexOf.call($haystack, needle);
}
function slice(start, end2) {
  return this._make(Array.prototype.slice.call(this, start, end2));
}
function end() {
  var _a3;
  return (_a3 = this.prevObject) !== null && _a3 !== void 0 ? _a3 : this._make([]);
}
function add$4(other, context) {
  const selection = this._make(other, context);
  const contents2 = uniqueSort([...this.get(), ...selection.get()]);
  return this._make(contents2);
}
function addBack(selector) {
  return this.prevObject ? this.add(selector ? this.prevObject.filter(selector) : this.prevObject) : this;
}
const Traversing = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: add$4,
  addBack,
  children,
  closest,
  contents,
  each,
  end,
  eq,
  filter,
  filterArray,
  find: find$1,
  first,
  get: get$9,
  has: has$4,
  index,
  is,
  last: last$1,
  map: map$6,
  next,
  nextAll,
  nextUntil,
  not,
  parent,
  parents,
  parentsUntil,
  prev,
  prevAll,
  prevUntil,
  siblings,
  slice,
  toArray
}, Symbol.toStringTag, { value: "Module" }));
function getParse(parser) {
  return function parse2(content, options2, isDocument$1, context) {
    if (typeof Buffer !== "undefined" && Buffer.isBuffer(content)) {
      content = content.toString();
    }
    if (typeof content === "string") {
      return parser(content, options2, isDocument$1, context);
    }
    const doc = content;
    if (!Array.isArray(doc) && isDocument(doc)) {
      return doc;
    }
    const root2 = new Document([]);
    update$3(doc, root2);
    return root2;
  };
}
function update$3(newChilds, parent2) {
  const arr = Array.isArray(newChilds) ? newChilds : [newChilds];
  if (parent2) {
    parent2.children = arr;
  } else {
    parent2 = null;
  }
  for (let i = 0; i < arr.length; i++) {
    const node = arr[i];
    if (node.parent && node.parent.children !== arr) {
      removeElement(node);
    }
    if (parent2) {
      node.prev = arr[i - 1] || null;
      node.next = arr[i + 1] || null;
    } else {
      node.prev = node.next = null;
    }
    node.parent = parent2;
  }
  return parent2;
}
function _makeDomArray(elem, clone2) {
  if (elem == null) {
    return [];
  }
  if (isCheerio(elem)) {
    return clone2 ? cloneDom(elem.get()) : elem.get();
  }
  if (Array.isArray(elem)) {
    return elem.reduce((newElems, el) => newElems.concat(this._makeDomArray(el, clone2)), []);
  }
  if (typeof elem === "string") {
    return this._parse(elem, this.options, false, null).children;
  }
  return clone2 ? cloneDom([elem]) : [elem];
}
function _insert(concatenator) {
  return function(...elems) {
    const lastIdx = this.length - 1;
    return domEach(this, (el, i) => {
      if (!hasChildren(el))
        return;
      const domSrc = typeof elems[0] === "function" ? elems[0].call(el, i, this._render(el.children)) : elems;
      const dom = this._makeDomArray(domSrc, i < lastIdx);
      concatenator(dom, el.children, el);
    });
  };
}
function uniqueSplice(array2, spliceIdx, spliceCount, newElems, parent2) {
  var _a3, _b2;
  const spliceArgs = [
    spliceIdx,
    spliceCount,
    ...newElems
  ];
  const prev2 = spliceIdx === 0 ? null : array2[spliceIdx - 1];
  const next2 = spliceIdx + spliceCount >= array2.length ? null : array2[spliceIdx + spliceCount];
  for (let idx = 0; idx < newElems.length; ++idx) {
    const node = newElems[idx];
    const oldParent = node.parent;
    if (oldParent) {
      const oldSiblings = oldParent.children;
      const prevIdx = oldSiblings.indexOf(node);
      if (prevIdx > -1) {
        oldParent.children.splice(prevIdx, 1);
        if (parent2 === oldParent && spliceIdx > prevIdx) {
          spliceArgs[0]--;
        }
      }
    }
    node.parent = parent2;
    if (node.prev) {
      node.prev.next = (_a3 = node.next) !== null && _a3 !== void 0 ? _a3 : null;
    }
    if (node.next) {
      node.next.prev = (_b2 = node.prev) !== null && _b2 !== void 0 ? _b2 : null;
    }
    node.prev = idx === 0 ? prev2 : newElems[idx - 1];
    node.next = idx === newElems.length - 1 ? next2 : newElems[idx + 1];
  }
  if (prev2) {
    prev2.next = newElems[0];
  }
  if (next2) {
    next2.prev = newElems[newElems.length - 1];
  }
  return array2.splice(...spliceArgs);
}
function appendTo(target) {
  const appendTarget = isCheerio(target) ? target : this._make(target);
  appendTarget.append(this);
  return this;
}
function prependTo(target) {
  const prependTarget = isCheerio(target) ? target : this._make(target);
  prependTarget.prepend(this);
  return this;
}
const append$2 = _insert((dom, children2, parent2) => {
  uniqueSplice(children2, children2.length, 0, dom, parent2);
});
const prepend$3 = _insert((dom, children2, parent2) => {
  uniqueSplice(children2, 0, 0, dom, parent2);
});
function _wrap(insert) {
  return function(wrapper) {
    const lastIdx = this.length - 1;
    const lastParent = this.parents().last();
    for (let i = 0; i < this.length; i++) {
      const el = this[i];
      const wrap2 = typeof wrapper === "function" ? wrapper.call(el, i, el) : typeof wrapper === "string" && !isHtml(wrapper) ? lastParent.find(wrapper).clone() : wrapper;
      const [wrapperDom] = this._makeDomArray(wrap2, i < lastIdx);
      if (!wrapperDom || !hasChildren(wrapperDom))
        continue;
      let elInsertLocation = wrapperDom;
      let j = 0;
      while (j < elInsertLocation.children.length) {
        const child = elInsertLocation.children[j];
        if (isTag(child)) {
          elInsertLocation = child;
          j = 0;
        } else {
          j++;
        }
      }
      insert(el, elInsertLocation, [wrapperDom]);
    }
    return this;
  };
}
const wrap = _wrap((el, elInsertLocation, wrapperDom) => {
  const { parent: parent2 } = el;
  if (!parent2)
    return;
  const siblings2 = parent2.children;
  const index2 = siblings2.indexOf(el);
  update$3([el], elInsertLocation);
  uniqueSplice(siblings2, index2, 0, wrapperDom, parent2);
});
const wrapInner = _wrap((el, elInsertLocation, wrapperDom) => {
  if (!hasChildren(el))
    return;
  update$3(el.children, elInsertLocation);
  update$3(wrapperDom, el);
});
function unwrap(selector) {
  this.parent(selector).not("body").each((_, el) => {
    this._make(el).replaceWith(el.children);
  });
  return this;
}
function wrapAll(wrapper) {
  const el = this[0];
  if (el) {
    const wrap2 = this._make(typeof wrapper === "function" ? wrapper.call(el, 0, el) : wrapper).insertBefore(el);
    let elInsertLocation;
    for (let i = 0; i < wrap2.length; i++) {
      if (wrap2[i].type === "tag")
        elInsertLocation = wrap2[i];
    }
    let j = 0;
    while (elInsertLocation && j < elInsertLocation.children.length) {
      const child = elInsertLocation.children[j];
      if (child.type === "tag") {
        elInsertLocation = child;
        j = 0;
      } else {
        j++;
      }
    }
    if (elInsertLocation)
      this._make(elInsertLocation).append(this);
  }
  return this;
}
function after(...elems) {
  const lastIdx = this.length - 1;
  return domEach(this, (el, i) => {
    const { parent: parent2 } = el;
    if (!hasChildren(el) || !parent2) {
      return;
    }
    const siblings2 = parent2.children;
    const index2 = siblings2.indexOf(el);
    if (index2 < 0)
      return;
    const domSrc = typeof elems[0] === "function" ? elems[0].call(el, i, this._render(el.children)) : elems;
    const dom = this._makeDomArray(domSrc, i < lastIdx);
    uniqueSplice(siblings2, index2 + 1, 0, dom, parent2);
  });
}
function insertAfter(target) {
  if (typeof target === "string") {
    target = this._make(target);
  }
  this.remove();
  const clones = [];
  this._makeDomArray(target).forEach((el) => {
    const clonedSelf = this.clone().toArray();
    const { parent: parent2 } = el;
    if (!parent2) {
      return;
    }
    const siblings2 = parent2.children;
    const index2 = siblings2.indexOf(el);
    if (index2 < 0)
      return;
    uniqueSplice(siblings2, index2 + 1, 0, clonedSelf, parent2);
    clones.push(...clonedSelf);
  });
  return this._make(clones);
}
function before(...elems) {
  const lastIdx = this.length - 1;
  return domEach(this, (el, i) => {
    const { parent: parent2 } = el;
    if (!hasChildren(el) || !parent2) {
      return;
    }
    const siblings2 = parent2.children;
    const index2 = siblings2.indexOf(el);
    if (index2 < 0)
      return;
    const domSrc = typeof elems[0] === "function" ? elems[0].call(el, i, this._render(el.children)) : elems;
    const dom = this._makeDomArray(domSrc, i < lastIdx);
    uniqueSplice(siblings2, index2, 0, dom, parent2);
  });
}
function insertBefore(target) {
  const targetArr = this._make(target);
  this.remove();
  const clones = [];
  domEach(targetArr, (el) => {
    const clonedSelf = this.clone().toArray();
    const { parent: parent2 } = el;
    if (!parent2) {
      return;
    }
    const siblings2 = parent2.children;
    const index2 = siblings2.indexOf(el);
    if (index2 < 0)
      return;
    uniqueSplice(siblings2, index2, 0, clonedSelf, parent2);
    clones.push(...clonedSelf);
  });
  return this._make(clones);
}
function remove$3(selector) {
  const elems = selector ? this.filter(selector) : this;
  domEach(elems, (el) => {
    removeElement(el);
    el.prev = el.next = el.parent = null;
  });
  return this;
}
function replaceWith(content) {
  return domEach(this, (el, i) => {
    const { parent: parent2 } = el;
    if (!parent2) {
      return;
    }
    const siblings2 = parent2.children;
    const cont = typeof content === "function" ? content.call(el, i, el) : content;
    const dom = this._makeDomArray(cont);
    update$3(dom, null);
    const index2 = siblings2.indexOf(el);
    uniqueSplice(siblings2, index2, 1, dom, parent2);
    if (!dom.includes(el)) {
      el.parent = el.prev = el.next = null;
    }
  });
}
function empty$j() {
  return domEach(this, (el) => {
    if (!hasChildren(el))
      return;
    el.children.forEach((child) => {
      child.next = child.prev = child.parent = null;
    });
    el.children.length = 0;
  });
}
function html(str) {
  if (str === void 0) {
    const el = this[0];
    if (!el || !hasChildren(el))
      return null;
    return this._render(el.children);
  }
  return domEach(this, (el) => {
    if (!hasChildren(el))
      return;
    el.children.forEach((child) => {
      child.next = child.prev = child.parent = null;
    });
    const content = isCheerio(str) ? str.toArray() : this._parse(`${str}`, this.options, false, el).children;
    update$3(content, el);
  });
}
function toString() {
  return this._render(this);
}
function text(str) {
  if (str === void 0) {
    return text$1(this);
  }
  if (typeof str === "function") {
    return domEach(this, (el, i) => this._make(el).text(str.call(el, i, text$1([el]))));
  }
  return domEach(this, (el) => {
    if (!hasChildren(el))
      return;
    el.children.forEach((child) => {
      child.next = child.prev = child.parent = null;
    });
    const textNode = new Text(`${str}`);
    update$3(textNode, el);
  });
}
function clone() {
  return this._make(cloneDom(this.get()));
}
const Manipulation = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  _makeDomArray,
  after,
  append: append$2,
  appendTo,
  before,
  clone,
  empty: empty$j,
  html,
  insertAfter,
  insertBefore,
  prepend: prepend$3,
  prependTo,
  remove: remove$3,
  replaceWith,
  text,
  toString,
  unwrap,
  wrap,
  wrapAll,
  wrapInner
}, Symbol.toStringTag, { value: "Module" }));
function css(prop2, val2) {
  if (prop2 != null && val2 != null || // When `prop` is a "plain" object
  typeof prop2 === "object" && !Array.isArray(prop2)) {
    return domEach(this, (el, i) => {
      if (isTag(el)) {
        setCss(el, prop2, val2, i);
      }
    });
  }
  if (this.length === 0) {
    return void 0;
  }
  return getCss(this[0], prop2);
}
function setCss(el, prop2, value, idx) {
  if (typeof prop2 === "string") {
    const styles = getCss(el);
    const val2 = typeof value === "function" ? value.call(el, idx, styles[prop2]) : value;
    if (val2 === "") {
      delete styles[prop2];
    } else if (val2 != null) {
      styles[prop2] = val2;
    }
    el.attribs["style"] = stringify(styles);
  } else if (typeof prop2 === "object") {
    Object.keys(prop2).forEach((k, i) => {
      setCss(el, k, prop2[k], i);
    });
  }
}
function getCss(el, prop2) {
  if (!el || !isTag(el))
    return;
  const styles = parse$2(el.attribs["style"]);
  if (typeof prop2 === "string") {
    return styles[prop2];
  }
  if (Array.isArray(prop2)) {
    const newStyles = {};
    prop2.forEach((item) => {
      if (styles[item] != null) {
        newStyles[item] = styles[item];
      }
    });
    return newStyles;
  }
  return styles;
}
function stringify(obj) {
  return Object.keys(obj).reduce((str, prop2) => `${str}${str ? " " : ""}${prop2}: ${obj[prop2]};`, "");
}
function parse$2(styles) {
  styles = (styles || "").trim();
  if (!styles)
    return {};
  const obj = {};
  let key;
  for (const str of styles.split(";")) {
    const n = str.indexOf(":");
    if (n < 1 || n === str.length - 1) {
      const trimmed = str.trimEnd();
      if (trimmed.length > 0 && key !== void 0) {
        obj[key] += `;${trimmed}`;
      }
    } else {
      key = str.slice(0, n).trim();
      obj[key] = str.slice(n + 1).trim();
    }
  }
  return obj;
}
const Css = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  css
}, Symbol.toStringTag, { value: "Module" }));
const submittableSelector = "input,select,textarea,keygen";
const r20 = /%20/g;
const rCRLF = /\r?\n/g;
function serialize() {
  const arr = this.serializeArray();
  const retArr = arr.map((data2) => `${encodeURIComponent(data2.name)}=${encodeURIComponent(data2.value)}`);
  return retArr.join("&").replace(r20, "+");
}
function serializeArray() {
  return this.map((_, elem) => {
    const $elem = this._make(elem);
    if (isTag(elem) && elem.name === "form") {
      return $elem.find(submittableSelector).toArray();
    }
    return $elem.filter(submittableSelector).toArray();
  }).filter(
    // Verify elements have a name (`attr.name`) and are not disabled (`:enabled`)
    '[name!=""]:enabled:not(:submit, :button, :image, :reset, :file):matches([checked], :not(:checkbox, :radio))'
    // Convert each of the elements to its value(s)
  ).map((_, elem) => {
    var _a3;
    const $elem = this._make(elem);
    const name = $elem.attr("name");
    const value = (_a3 = $elem.val()) !== null && _a3 !== void 0 ? _a3 : "";
    if (Array.isArray(value)) {
      return value.map((val2) => (
        /*
         * We trim replace any line endings (e.g. `\r` or `\r\n` with `\r\n`) to guarantee consistency across platforms
         * These can occur inside of `<textarea>'s`
         */
        { name, value: val2.replace(rCRLF, "\r\n") }
      ));
    }
    return { name, value: value.replace(rCRLF, "\r\n") };
  }).toArray();
}
const Forms = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  serialize,
  serializeArray
}, Symbol.toStringTag, { value: "Module" }));
class Cheerio {
  /**
   * Instance of cheerio. Methods are specified in the modules. Usage of this
   * constructor is not recommended. Please use `$.load` instead.
   *
   * @private
   * @param elements - The new selection.
   * @param root - Sets the root node.
   * @param options - Options for the instance.
   */
  constructor(elements, root2, options2) {
    this.length = 0;
    this.options = options2;
    this._root = root2;
    if (elements) {
      for (let idx = 0; idx < elements.length; idx++) {
        this[idx] = elements[idx];
      }
      this.length = elements.length;
    }
  }
}
Cheerio.prototype.cheerio = "[cheerio object]";
Cheerio.prototype.splice = Array.prototype.splice;
Cheerio.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
Object.assign(Cheerio.prototype, Attributes, Traversing, Manipulation, Css, Forms);
function getLoad(parse2, render2) {
  return function load2(content, options2, isDocument2 = true) {
    if (content == null) {
      throw new Error("cheerio.load() expects a string");
    }
    const internalOpts = { ...defaultOpts$2, ...flatten$2(options2) };
    const initialRoot = parse2(content, internalOpts, isDocument2, null);
    class LoadedCheerio extends Cheerio {
      _make(selector, context) {
        const cheerio = initialize(selector, context);
        cheerio.prevObject = this;
        return cheerio;
      }
      _parse(content2, options3, isDocument3, context) {
        return parse2(content2, options3, isDocument3, context);
      }
      _render(dom) {
        return render2(dom, this.options);
      }
    }
    function initialize(selector, context, root2 = initialRoot, opts) {
      if (selector && isCheerio(selector))
        return selector;
      const options3 = {
        ...internalOpts,
        ...flatten$2(opts)
      };
      const r = typeof root2 === "string" ? [parse2(root2, options3, false, null)] : "length" in root2 ? root2 : [root2];
      const rootInstance = isCheerio(r) ? r : new LoadedCheerio(r, null, options3);
      rootInstance._root = rootInstance;
      if (!selector) {
        return new LoadedCheerio(void 0, rootInstance, options3);
      }
      const elements = typeof selector === "string" && isHtml(selector) ? (
        // $(<html>)
        parse2(selector, options3, false, null).children
      ) : isNode(selector) ? (
        // $(dom)
        [selector]
      ) : Array.isArray(selector) ? (
        // $([dom])
        selector
      ) : void 0;
      const instance = new LoadedCheerio(elements, rootInstance, options3);
      if (elements) {
        return instance;
      }
      if (typeof selector !== "string") {
        throw new Error("Unexpected type of selector");
      }
      let search = selector;
      const searchContext = !context ? (
        // If we don't have a context, maybe we have a root, from loading
        rootInstance
      ) : typeof context === "string" ? isHtml(context) ? (
        // $('li', '<ul>...</ul>')
        new LoadedCheerio([parse2(context, options3, false, null)], rootInstance, options3)
      ) : (
        // $('li', 'ul')
        (search = `${context} ${search}`, rootInstance)
      ) : isCheerio(context) ? (
        // $('li', $)
        context
      ) : (
        // $('li', node), $('li', [nodes])
        new LoadedCheerio(Array.isArray(context) ? context : [context], rootInstance, options3)
      );
      if (!searchContext)
        return instance;
      return searchContext.find(search);
    }
    Object.assign(initialize, staticMethods, {
      load: load2,
      // `_root` and `_options` are used in static methods.
      _root: initialRoot,
      _options: internalOpts,
      // Add `fn` for plugins
      fn: LoadedCheerio.prototype,
      // Add the prototype here to maintain `instanceof` behavior.
      prototype: LoadedCheerio.prototype
    });
    return initialize;
  };
}
function isNode(obj) {
  return !!obj.name || obj.type === "root" || obj.type === "text" || obj.type === "comment";
}
const UNDEFINED_CODE_POINTS = /* @__PURE__ */ new Set([
  65534,
  65535,
  131070,
  131071,
  196606,
  196607,
  262142,
  262143,
  327678,
  327679,
  393214,
  393215,
  458750,
  458751,
  524286,
  524287,
  589822,
  589823,
  655358,
  655359,
  720894,
  720895,
  786430,
  786431,
  851966,
  851967,
  917502,
  917503,
  983038,
  983039,
  1048574,
  1048575,
  1114110,
  1114111
]);
const REPLACEMENT_CHARACTER = "�";
var CODE_POINTS;
(function(CODE_POINTS2) {
  CODE_POINTS2[CODE_POINTS2["EOF"] = -1] = "EOF";
  CODE_POINTS2[CODE_POINTS2["NULL"] = 0] = "NULL";
  CODE_POINTS2[CODE_POINTS2["TABULATION"] = 9] = "TABULATION";
  CODE_POINTS2[CODE_POINTS2["CARRIAGE_RETURN"] = 13] = "CARRIAGE_RETURN";
  CODE_POINTS2[CODE_POINTS2["LINE_FEED"] = 10] = "LINE_FEED";
  CODE_POINTS2[CODE_POINTS2["FORM_FEED"] = 12] = "FORM_FEED";
  CODE_POINTS2[CODE_POINTS2["SPACE"] = 32] = "SPACE";
  CODE_POINTS2[CODE_POINTS2["EXCLAMATION_MARK"] = 33] = "EXCLAMATION_MARK";
  CODE_POINTS2[CODE_POINTS2["QUOTATION_MARK"] = 34] = "QUOTATION_MARK";
  CODE_POINTS2[CODE_POINTS2["NUMBER_SIGN"] = 35] = "NUMBER_SIGN";
  CODE_POINTS2[CODE_POINTS2["AMPERSAND"] = 38] = "AMPERSAND";
  CODE_POINTS2[CODE_POINTS2["APOSTROPHE"] = 39] = "APOSTROPHE";
  CODE_POINTS2[CODE_POINTS2["HYPHEN_MINUS"] = 45] = "HYPHEN_MINUS";
  CODE_POINTS2[CODE_POINTS2["SOLIDUS"] = 47] = "SOLIDUS";
  CODE_POINTS2[CODE_POINTS2["DIGIT_0"] = 48] = "DIGIT_0";
  CODE_POINTS2[CODE_POINTS2["DIGIT_9"] = 57] = "DIGIT_9";
  CODE_POINTS2[CODE_POINTS2["SEMICOLON"] = 59] = "SEMICOLON";
  CODE_POINTS2[CODE_POINTS2["LESS_THAN_SIGN"] = 60] = "LESS_THAN_SIGN";
  CODE_POINTS2[CODE_POINTS2["EQUALS_SIGN"] = 61] = "EQUALS_SIGN";
  CODE_POINTS2[CODE_POINTS2["GREATER_THAN_SIGN"] = 62] = "GREATER_THAN_SIGN";
  CODE_POINTS2[CODE_POINTS2["QUESTION_MARK"] = 63] = "QUESTION_MARK";
  CODE_POINTS2[CODE_POINTS2["LATIN_CAPITAL_A"] = 65] = "LATIN_CAPITAL_A";
  CODE_POINTS2[CODE_POINTS2["LATIN_CAPITAL_F"] = 70] = "LATIN_CAPITAL_F";
  CODE_POINTS2[CODE_POINTS2["LATIN_CAPITAL_X"] = 88] = "LATIN_CAPITAL_X";
  CODE_POINTS2[CODE_POINTS2["LATIN_CAPITAL_Z"] = 90] = "LATIN_CAPITAL_Z";
  CODE_POINTS2[CODE_POINTS2["RIGHT_SQUARE_BRACKET"] = 93] = "RIGHT_SQUARE_BRACKET";
  CODE_POINTS2[CODE_POINTS2["GRAVE_ACCENT"] = 96] = "GRAVE_ACCENT";
  CODE_POINTS2[CODE_POINTS2["LATIN_SMALL_A"] = 97] = "LATIN_SMALL_A";
  CODE_POINTS2[CODE_POINTS2["LATIN_SMALL_F"] = 102] = "LATIN_SMALL_F";
  CODE_POINTS2[CODE_POINTS2["LATIN_SMALL_X"] = 120] = "LATIN_SMALL_X";
  CODE_POINTS2[CODE_POINTS2["LATIN_SMALL_Z"] = 122] = "LATIN_SMALL_Z";
  CODE_POINTS2[CODE_POINTS2["REPLACEMENT_CHARACTER"] = 65533] = "REPLACEMENT_CHARACTER";
})(CODE_POINTS = CODE_POINTS || (CODE_POINTS = {}));
const SEQUENCES = {
  DASH_DASH: "--",
  CDATA_START: "[CDATA[",
  DOCTYPE: "doctype",
  SCRIPT: "script",
  PUBLIC: "public",
  SYSTEM: "system"
};
function isSurrogate(cp) {
  return cp >= 55296 && cp <= 57343;
}
function isSurrogatePair(cp) {
  return cp >= 56320 && cp <= 57343;
}
function getSurrogatePairCodePoint(cp1, cp2) {
  return (cp1 - 55296) * 1024 + 9216 + cp2;
}
function isControlCodePoint(cp) {
  return cp !== 32 && cp !== 10 && cp !== 13 && cp !== 9 && cp !== 12 && cp >= 1 && cp <= 31 || cp >= 127 && cp <= 159;
}
function isUndefinedCodePoint(cp) {
  return cp >= 64976 && cp <= 65007 || UNDEFINED_CODE_POINTS.has(cp);
}
var ERR;
(function(ERR2) {
  ERR2["controlCharacterInInputStream"] = "control-character-in-input-stream";
  ERR2["noncharacterInInputStream"] = "noncharacter-in-input-stream";
  ERR2["surrogateInInputStream"] = "surrogate-in-input-stream";
  ERR2["nonVoidHtmlElementStartTagWithTrailingSolidus"] = "non-void-html-element-start-tag-with-trailing-solidus";
  ERR2["endTagWithAttributes"] = "end-tag-with-attributes";
  ERR2["endTagWithTrailingSolidus"] = "end-tag-with-trailing-solidus";
  ERR2["unexpectedSolidusInTag"] = "unexpected-solidus-in-tag";
  ERR2["unexpectedNullCharacter"] = "unexpected-null-character";
  ERR2["unexpectedQuestionMarkInsteadOfTagName"] = "unexpected-question-mark-instead-of-tag-name";
  ERR2["invalidFirstCharacterOfTagName"] = "invalid-first-character-of-tag-name";
  ERR2["unexpectedEqualsSignBeforeAttributeName"] = "unexpected-equals-sign-before-attribute-name";
  ERR2["missingEndTagName"] = "missing-end-tag-name";
  ERR2["unexpectedCharacterInAttributeName"] = "unexpected-character-in-attribute-name";
  ERR2["unknownNamedCharacterReference"] = "unknown-named-character-reference";
  ERR2["missingSemicolonAfterCharacterReference"] = "missing-semicolon-after-character-reference";
  ERR2["unexpectedCharacterAfterDoctypeSystemIdentifier"] = "unexpected-character-after-doctype-system-identifier";
  ERR2["unexpectedCharacterInUnquotedAttributeValue"] = "unexpected-character-in-unquoted-attribute-value";
  ERR2["eofBeforeTagName"] = "eof-before-tag-name";
  ERR2["eofInTag"] = "eof-in-tag";
  ERR2["missingAttributeValue"] = "missing-attribute-value";
  ERR2["missingWhitespaceBetweenAttributes"] = "missing-whitespace-between-attributes";
  ERR2["missingWhitespaceAfterDoctypePublicKeyword"] = "missing-whitespace-after-doctype-public-keyword";
  ERR2["missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers"] = "missing-whitespace-between-doctype-public-and-system-identifiers";
  ERR2["missingWhitespaceAfterDoctypeSystemKeyword"] = "missing-whitespace-after-doctype-system-keyword";
  ERR2["missingQuoteBeforeDoctypePublicIdentifier"] = "missing-quote-before-doctype-public-identifier";
  ERR2["missingQuoteBeforeDoctypeSystemIdentifier"] = "missing-quote-before-doctype-system-identifier";
  ERR2["missingDoctypePublicIdentifier"] = "missing-doctype-public-identifier";
  ERR2["missingDoctypeSystemIdentifier"] = "missing-doctype-system-identifier";
  ERR2["abruptDoctypePublicIdentifier"] = "abrupt-doctype-public-identifier";
  ERR2["abruptDoctypeSystemIdentifier"] = "abrupt-doctype-system-identifier";
  ERR2["cdataInHtmlContent"] = "cdata-in-html-content";
  ERR2["incorrectlyOpenedComment"] = "incorrectly-opened-comment";
  ERR2["eofInScriptHtmlCommentLikeText"] = "eof-in-script-html-comment-like-text";
  ERR2["eofInDoctype"] = "eof-in-doctype";
  ERR2["nestedComment"] = "nested-comment";
  ERR2["abruptClosingOfEmptyComment"] = "abrupt-closing-of-empty-comment";
  ERR2["eofInComment"] = "eof-in-comment";
  ERR2["incorrectlyClosedComment"] = "incorrectly-closed-comment";
  ERR2["eofInCdata"] = "eof-in-cdata";
  ERR2["absenceOfDigitsInNumericCharacterReference"] = "absence-of-digits-in-numeric-character-reference";
  ERR2["nullCharacterReference"] = "null-character-reference";
  ERR2["surrogateCharacterReference"] = "surrogate-character-reference";
  ERR2["characterReferenceOutsideUnicodeRange"] = "character-reference-outside-unicode-range";
  ERR2["controlCharacterReference"] = "control-character-reference";
  ERR2["noncharacterCharacterReference"] = "noncharacter-character-reference";
  ERR2["missingWhitespaceBeforeDoctypeName"] = "missing-whitespace-before-doctype-name";
  ERR2["missingDoctypeName"] = "missing-doctype-name";
  ERR2["invalidCharacterSequenceAfterDoctypeName"] = "invalid-character-sequence-after-doctype-name";
  ERR2["duplicateAttribute"] = "duplicate-attribute";
  ERR2["nonConformingDoctype"] = "non-conforming-doctype";
  ERR2["missingDoctype"] = "missing-doctype";
  ERR2["misplacedDoctype"] = "misplaced-doctype";
  ERR2["endTagWithoutMatchingOpenElement"] = "end-tag-without-matching-open-element";
  ERR2["closingOfElementWithOpenChildElements"] = "closing-of-element-with-open-child-elements";
  ERR2["disallowedContentInNoscriptInHead"] = "disallowed-content-in-noscript-in-head";
  ERR2["openElementsLeftAfterEof"] = "open-elements-left-after-eof";
  ERR2["abandonedHeadElementChild"] = "abandoned-head-element-child";
  ERR2["misplacedStartTagForHeadElement"] = "misplaced-start-tag-for-head-element";
  ERR2["nestedNoscriptInHead"] = "nested-noscript-in-head";
  ERR2["eofInElementThatCanContainOnlyText"] = "eof-in-element-that-can-contain-only-text";
})(ERR = ERR || (ERR = {}));
const DEFAULT_BUFFER_WATERLINE = 1 << 16;
class Preprocessor {
  constructor(handler) {
    this.handler = handler;
    this.html = "";
    this.pos = -1;
    this.lastGapPos = -2;
    this.gapStack = [];
    this.skipNextNewLine = false;
    this.lastChunkWritten = false;
    this.endOfChunkHit = false;
    this.bufferWaterline = DEFAULT_BUFFER_WATERLINE;
    this.isEol = false;
    this.lineStartPos = 0;
    this.droppedBufferSize = 0;
    this.line = 1;
    this.lastErrOffset = -1;
  }
  /** The column on the current line. If we just saw a gap (eg. a surrogate pair), return the index before. */
  get col() {
    return this.pos - this.lineStartPos + Number(this.lastGapPos !== this.pos);
  }
  get offset() {
    return this.droppedBufferSize + this.pos;
  }
  getError(code) {
    const { line, col, offset } = this;
    return {
      code,
      startLine: line,
      endLine: line,
      startCol: col,
      endCol: col,
      startOffset: offset,
      endOffset: offset
    };
  }
  _err(code) {
    if (this.handler.onParseError && this.lastErrOffset !== this.offset) {
      this.lastErrOffset = this.offset;
      this.handler.onParseError(this.getError(code));
    }
  }
  _addGap() {
    this.gapStack.push(this.lastGapPos);
    this.lastGapPos = this.pos;
  }
  _processSurrogate(cp) {
    if (this.pos !== this.html.length - 1) {
      const nextCp = this.html.charCodeAt(this.pos + 1);
      if (isSurrogatePair(nextCp)) {
        this.pos++;
        this._addGap();
        return getSurrogatePairCodePoint(cp, nextCp);
      }
    } else if (!this.lastChunkWritten) {
      this.endOfChunkHit = true;
      return CODE_POINTS.EOF;
    }
    this._err(ERR.surrogateInInputStream);
    return cp;
  }
  willDropParsedChunk() {
    return this.pos > this.bufferWaterline;
  }
  dropParsedChunk() {
    if (this.willDropParsedChunk()) {
      this.html = this.html.substring(this.pos);
      this.lineStartPos -= this.pos;
      this.droppedBufferSize += this.pos;
      this.pos = 0;
      this.lastGapPos = -2;
      this.gapStack.length = 0;
    }
  }
  write(chunk, isLastChunk) {
    if (this.html.length > 0) {
      this.html += chunk;
    } else {
      this.html = chunk;
    }
    this.endOfChunkHit = false;
    this.lastChunkWritten = isLastChunk;
  }
  insertHtmlAtCurrentPos(chunk) {
    this.html = this.html.substring(0, this.pos + 1) + chunk + this.html.substring(this.pos + 1);
    this.endOfChunkHit = false;
  }
  startsWith(pattern, caseSensitive) {
    if (this.pos + pattern.length > this.html.length) {
      this.endOfChunkHit = !this.lastChunkWritten;
      return false;
    }
    if (caseSensitive) {
      return this.html.startsWith(pattern, this.pos);
    }
    for (let i = 0; i < pattern.length; i++) {
      const cp = this.html.charCodeAt(this.pos + i) | 32;
      if (cp !== pattern.charCodeAt(i)) {
        return false;
      }
    }
    return true;
  }
  peek(offset) {
    const pos = this.pos + offset;
    if (pos >= this.html.length) {
      this.endOfChunkHit = !this.lastChunkWritten;
      return CODE_POINTS.EOF;
    }
    const code = this.html.charCodeAt(pos);
    return code === CODE_POINTS.CARRIAGE_RETURN ? CODE_POINTS.LINE_FEED : code;
  }
  advance() {
    this.pos++;
    if (this.isEol) {
      this.isEol = false;
      this.line++;
      this.lineStartPos = this.pos;
    }
    if (this.pos >= this.html.length) {
      this.endOfChunkHit = !this.lastChunkWritten;
      return CODE_POINTS.EOF;
    }
    let cp = this.html.charCodeAt(this.pos);
    if (cp === CODE_POINTS.CARRIAGE_RETURN) {
      this.isEol = true;
      this.skipNextNewLine = true;
      return CODE_POINTS.LINE_FEED;
    }
    if (cp === CODE_POINTS.LINE_FEED) {
      this.isEol = true;
      if (this.skipNextNewLine) {
        this.line--;
        this.skipNextNewLine = false;
        this._addGap();
        return this.advance();
      }
    }
    this.skipNextNewLine = false;
    if (isSurrogate(cp)) {
      cp = this._processSurrogate(cp);
    }
    const isCommonValidRange = this.handler.onParseError === null || cp > 31 && cp < 127 || cp === CODE_POINTS.LINE_FEED || cp === CODE_POINTS.CARRIAGE_RETURN || cp > 159 && cp < 64976;
    if (!isCommonValidRange) {
      this._checkForProblematicCharacters(cp);
    }
    return cp;
  }
  _checkForProblematicCharacters(cp) {
    if (isControlCodePoint(cp)) {
      this._err(ERR.controlCharacterInInputStream);
    } else if (isUndefinedCodePoint(cp)) {
      this._err(ERR.noncharacterInInputStream);
    }
  }
  retreat(count) {
    this.pos -= count;
    while (this.pos < this.lastGapPos) {
      this.lastGapPos = this.gapStack.pop();
      this.pos--;
    }
    this.isEol = false;
  }
}
var TokenType;
(function(TokenType2) {
  TokenType2[TokenType2["CHARACTER"] = 0] = "CHARACTER";
  TokenType2[TokenType2["NULL_CHARACTER"] = 1] = "NULL_CHARACTER";
  TokenType2[TokenType2["WHITESPACE_CHARACTER"] = 2] = "WHITESPACE_CHARACTER";
  TokenType2[TokenType2["START_TAG"] = 3] = "START_TAG";
  TokenType2[TokenType2["END_TAG"] = 4] = "END_TAG";
  TokenType2[TokenType2["COMMENT"] = 5] = "COMMENT";
  TokenType2[TokenType2["DOCTYPE"] = 6] = "DOCTYPE";
  TokenType2[TokenType2["EOF"] = 7] = "EOF";
  TokenType2[TokenType2["HIBERNATION"] = 8] = "HIBERNATION";
})(TokenType = TokenType || (TokenType = {}));
function getTokenAttr(token, attrName) {
  for (let i = token.attrs.length - 1; i >= 0; i--) {
    if (token.attrs[i].name === attrName) {
      return token.attrs[i].value;
    }
  }
  return null;
}
var NS;
(function(NS2) {
  NS2["HTML"] = "http://www.w3.org/1999/xhtml";
  NS2["MATHML"] = "http://www.w3.org/1998/Math/MathML";
  NS2["SVG"] = "http://www.w3.org/2000/svg";
  NS2["XLINK"] = "http://www.w3.org/1999/xlink";
  NS2["XML"] = "http://www.w3.org/XML/1998/namespace";
  NS2["XMLNS"] = "http://www.w3.org/2000/xmlns/";
})(NS = NS || (NS = {}));
var ATTRS;
(function(ATTRS2) {
  ATTRS2["TYPE"] = "type";
  ATTRS2["ACTION"] = "action";
  ATTRS2["ENCODING"] = "encoding";
  ATTRS2["PROMPT"] = "prompt";
  ATTRS2["NAME"] = "name";
  ATTRS2["COLOR"] = "color";
  ATTRS2["FACE"] = "face";
  ATTRS2["SIZE"] = "size";
})(ATTRS = ATTRS || (ATTRS = {}));
var DOCUMENT_MODE;
(function(DOCUMENT_MODE2) {
  DOCUMENT_MODE2["NO_QUIRKS"] = "no-quirks";
  DOCUMENT_MODE2["QUIRKS"] = "quirks";
  DOCUMENT_MODE2["LIMITED_QUIRKS"] = "limited-quirks";
})(DOCUMENT_MODE = DOCUMENT_MODE || (DOCUMENT_MODE = {}));
var TAG_NAMES;
(function(TAG_NAMES2) {
  TAG_NAMES2["A"] = "a";
  TAG_NAMES2["ADDRESS"] = "address";
  TAG_NAMES2["ANNOTATION_XML"] = "annotation-xml";
  TAG_NAMES2["APPLET"] = "applet";
  TAG_NAMES2["AREA"] = "area";
  TAG_NAMES2["ARTICLE"] = "article";
  TAG_NAMES2["ASIDE"] = "aside";
  TAG_NAMES2["B"] = "b";
  TAG_NAMES2["BASE"] = "base";
  TAG_NAMES2["BASEFONT"] = "basefont";
  TAG_NAMES2["BGSOUND"] = "bgsound";
  TAG_NAMES2["BIG"] = "big";
  TAG_NAMES2["BLOCKQUOTE"] = "blockquote";
  TAG_NAMES2["BODY"] = "body";
  TAG_NAMES2["BR"] = "br";
  TAG_NAMES2["BUTTON"] = "button";
  TAG_NAMES2["CAPTION"] = "caption";
  TAG_NAMES2["CENTER"] = "center";
  TAG_NAMES2["CODE"] = "code";
  TAG_NAMES2["COL"] = "col";
  TAG_NAMES2["COLGROUP"] = "colgroup";
  TAG_NAMES2["DD"] = "dd";
  TAG_NAMES2["DESC"] = "desc";
  TAG_NAMES2["DETAILS"] = "details";
  TAG_NAMES2["DIALOG"] = "dialog";
  TAG_NAMES2["DIR"] = "dir";
  TAG_NAMES2["DIV"] = "div";
  TAG_NAMES2["DL"] = "dl";
  TAG_NAMES2["DT"] = "dt";
  TAG_NAMES2["EM"] = "em";
  TAG_NAMES2["EMBED"] = "embed";
  TAG_NAMES2["FIELDSET"] = "fieldset";
  TAG_NAMES2["FIGCAPTION"] = "figcaption";
  TAG_NAMES2["FIGURE"] = "figure";
  TAG_NAMES2["FONT"] = "font";
  TAG_NAMES2["FOOTER"] = "footer";
  TAG_NAMES2["FOREIGN_OBJECT"] = "foreignObject";
  TAG_NAMES2["FORM"] = "form";
  TAG_NAMES2["FRAME"] = "frame";
  TAG_NAMES2["FRAMESET"] = "frameset";
  TAG_NAMES2["H1"] = "h1";
  TAG_NAMES2["H2"] = "h2";
  TAG_NAMES2["H3"] = "h3";
  TAG_NAMES2["H4"] = "h4";
  TAG_NAMES2["H5"] = "h5";
  TAG_NAMES2["H6"] = "h6";
  TAG_NAMES2["HEAD"] = "head";
  TAG_NAMES2["HEADER"] = "header";
  TAG_NAMES2["HGROUP"] = "hgroup";
  TAG_NAMES2["HR"] = "hr";
  TAG_NAMES2["HTML"] = "html";
  TAG_NAMES2["I"] = "i";
  TAG_NAMES2["IMG"] = "img";
  TAG_NAMES2["IMAGE"] = "image";
  TAG_NAMES2["INPUT"] = "input";
  TAG_NAMES2["IFRAME"] = "iframe";
  TAG_NAMES2["KEYGEN"] = "keygen";
  TAG_NAMES2["LABEL"] = "label";
  TAG_NAMES2["LI"] = "li";
  TAG_NAMES2["LINK"] = "link";
  TAG_NAMES2["LISTING"] = "listing";
  TAG_NAMES2["MAIN"] = "main";
  TAG_NAMES2["MALIGNMARK"] = "malignmark";
  TAG_NAMES2["MARQUEE"] = "marquee";
  TAG_NAMES2["MATH"] = "math";
  TAG_NAMES2["MENU"] = "menu";
  TAG_NAMES2["META"] = "meta";
  TAG_NAMES2["MGLYPH"] = "mglyph";
  TAG_NAMES2["MI"] = "mi";
  TAG_NAMES2["MO"] = "mo";
  TAG_NAMES2["MN"] = "mn";
  TAG_NAMES2["MS"] = "ms";
  TAG_NAMES2["MTEXT"] = "mtext";
  TAG_NAMES2["NAV"] = "nav";
  TAG_NAMES2["NOBR"] = "nobr";
  TAG_NAMES2["NOFRAMES"] = "noframes";
  TAG_NAMES2["NOEMBED"] = "noembed";
  TAG_NAMES2["NOSCRIPT"] = "noscript";
  TAG_NAMES2["OBJECT"] = "object";
  TAG_NAMES2["OL"] = "ol";
  TAG_NAMES2["OPTGROUP"] = "optgroup";
  TAG_NAMES2["OPTION"] = "option";
  TAG_NAMES2["P"] = "p";
  TAG_NAMES2["PARAM"] = "param";
  TAG_NAMES2["PLAINTEXT"] = "plaintext";
  TAG_NAMES2["PRE"] = "pre";
  TAG_NAMES2["RB"] = "rb";
  TAG_NAMES2["RP"] = "rp";
  TAG_NAMES2["RT"] = "rt";
  TAG_NAMES2["RTC"] = "rtc";
  TAG_NAMES2["RUBY"] = "ruby";
  TAG_NAMES2["S"] = "s";
  TAG_NAMES2["SCRIPT"] = "script";
  TAG_NAMES2["SECTION"] = "section";
  TAG_NAMES2["SELECT"] = "select";
  TAG_NAMES2["SOURCE"] = "source";
  TAG_NAMES2["SMALL"] = "small";
  TAG_NAMES2["SPAN"] = "span";
  TAG_NAMES2["STRIKE"] = "strike";
  TAG_NAMES2["STRONG"] = "strong";
  TAG_NAMES2["STYLE"] = "style";
  TAG_NAMES2["SUB"] = "sub";
  TAG_NAMES2["SUMMARY"] = "summary";
  TAG_NAMES2["SUP"] = "sup";
  TAG_NAMES2["TABLE"] = "table";
  TAG_NAMES2["TBODY"] = "tbody";
  TAG_NAMES2["TEMPLATE"] = "template";
  TAG_NAMES2["TEXTAREA"] = "textarea";
  TAG_NAMES2["TFOOT"] = "tfoot";
  TAG_NAMES2["TD"] = "td";
  TAG_NAMES2["TH"] = "th";
  TAG_NAMES2["THEAD"] = "thead";
  TAG_NAMES2["TITLE"] = "title";
  TAG_NAMES2["TR"] = "tr";
  TAG_NAMES2["TRACK"] = "track";
  TAG_NAMES2["TT"] = "tt";
  TAG_NAMES2["U"] = "u";
  TAG_NAMES2["UL"] = "ul";
  TAG_NAMES2["SVG"] = "svg";
  TAG_NAMES2["VAR"] = "var";
  TAG_NAMES2["WBR"] = "wbr";
  TAG_NAMES2["XMP"] = "xmp";
})(TAG_NAMES = TAG_NAMES || (TAG_NAMES = {}));
var TAG_ID;
(function(TAG_ID2) {
  TAG_ID2[TAG_ID2["UNKNOWN"] = 0] = "UNKNOWN";
  TAG_ID2[TAG_ID2["A"] = 1] = "A";
  TAG_ID2[TAG_ID2["ADDRESS"] = 2] = "ADDRESS";
  TAG_ID2[TAG_ID2["ANNOTATION_XML"] = 3] = "ANNOTATION_XML";
  TAG_ID2[TAG_ID2["APPLET"] = 4] = "APPLET";
  TAG_ID2[TAG_ID2["AREA"] = 5] = "AREA";
  TAG_ID2[TAG_ID2["ARTICLE"] = 6] = "ARTICLE";
  TAG_ID2[TAG_ID2["ASIDE"] = 7] = "ASIDE";
  TAG_ID2[TAG_ID2["B"] = 8] = "B";
  TAG_ID2[TAG_ID2["BASE"] = 9] = "BASE";
  TAG_ID2[TAG_ID2["BASEFONT"] = 10] = "BASEFONT";
  TAG_ID2[TAG_ID2["BGSOUND"] = 11] = "BGSOUND";
  TAG_ID2[TAG_ID2["BIG"] = 12] = "BIG";
  TAG_ID2[TAG_ID2["BLOCKQUOTE"] = 13] = "BLOCKQUOTE";
  TAG_ID2[TAG_ID2["BODY"] = 14] = "BODY";
  TAG_ID2[TAG_ID2["BR"] = 15] = "BR";
  TAG_ID2[TAG_ID2["BUTTON"] = 16] = "BUTTON";
  TAG_ID2[TAG_ID2["CAPTION"] = 17] = "CAPTION";
  TAG_ID2[TAG_ID2["CENTER"] = 18] = "CENTER";
  TAG_ID2[TAG_ID2["CODE"] = 19] = "CODE";
  TAG_ID2[TAG_ID2["COL"] = 20] = "COL";
  TAG_ID2[TAG_ID2["COLGROUP"] = 21] = "COLGROUP";
  TAG_ID2[TAG_ID2["DD"] = 22] = "DD";
  TAG_ID2[TAG_ID2["DESC"] = 23] = "DESC";
  TAG_ID2[TAG_ID2["DETAILS"] = 24] = "DETAILS";
  TAG_ID2[TAG_ID2["DIALOG"] = 25] = "DIALOG";
  TAG_ID2[TAG_ID2["DIR"] = 26] = "DIR";
  TAG_ID2[TAG_ID2["DIV"] = 27] = "DIV";
  TAG_ID2[TAG_ID2["DL"] = 28] = "DL";
  TAG_ID2[TAG_ID2["DT"] = 29] = "DT";
  TAG_ID2[TAG_ID2["EM"] = 30] = "EM";
  TAG_ID2[TAG_ID2["EMBED"] = 31] = "EMBED";
  TAG_ID2[TAG_ID2["FIELDSET"] = 32] = "FIELDSET";
  TAG_ID2[TAG_ID2["FIGCAPTION"] = 33] = "FIGCAPTION";
  TAG_ID2[TAG_ID2["FIGURE"] = 34] = "FIGURE";
  TAG_ID2[TAG_ID2["FONT"] = 35] = "FONT";
  TAG_ID2[TAG_ID2["FOOTER"] = 36] = "FOOTER";
  TAG_ID2[TAG_ID2["FOREIGN_OBJECT"] = 37] = "FOREIGN_OBJECT";
  TAG_ID2[TAG_ID2["FORM"] = 38] = "FORM";
  TAG_ID2[TAG_ID2["FRAME"] = 39] = "FRAME";
  TAG_ID2[TAG_ID2["FRAMESET"] = 40] = "FRAMESET";
  TAG_ID2[TAG_ID2["H1"] = 41] = "H1";
  TAG_ID2[TAG_ID2["H2"] = 42] = "H2";
  TAG_ID2[TAG_ID2["H3"] = 43] = "H3";
  TAG_ID2[TAG_ID2["H4"] = 44] = "H4";
  TAG_ID2[TAG_ID2["H5"] = 45] = "H5";
  TAG_ID2[TAG_ID2["H6"] = 46] = "H6";
  TAG_ID2[TAG_ID2["HEAD"] = 47] = "HEAD";
  TAG_ID2[TAG_ID2["HEADER"] = 48] = "HEADER";
  TAG_ID2[TAG_ID2["HGROUP"] = 49] = "HGROUP";
  TAG_ID2[TAG_ID2["HR"] = 50] = "HR";
  TAG_ID2[TAG_ID2["HTML"] = 51] = "HTML";
  TAG_ID2[TAG_ID2["I"] = 52] = "I";
  TAG_ID2[TAG_ID2["IMG"] = 53] = "IMG";
  TAG_ID2[TAG_ID2["IMAGE"] = 54] = "IMAGE";
  TAG_ID2[TAG_ID2["INPUT"] = 55] = "INPUT";
  TAG_ID2[TAG_ID2["IFRAME"] = 56] = "IFRAME";
  TAG_ID2[TAG_ID2["KEYGEN"] = 57] = "KEYGEN";
  TAG_ID2[TAG_ID2["LABEL"] = 58] = "LABEL";
  TAG_ID2[TAG_ID2["LI"] = 59] = "LI";
  TAG_ID2[TAG_ID2["LINK"] = 60] = "LINK";
  TAG_ID2[TAG_ID2["LISTING"] = 61] = "LISTING";
  TAG_ID2[TAG_ID2["MAIN"] = 62] = "MAIN";
  TAG_ID2[TAG_ID2["MALIGNMARK"] = 63] = "MALIGNMARK";
  TAG_ID2[TAG_ID2["MARQUEE"] = 64] = "MARQUEE";
  TAG_ID2[TAG_ID2["MATH"] = 65] = "MATH";
  TAG_ID2[TAG_ID2["MENU"] = 66] = "MENU";
  TAG_ID2[TAG_ID2["META"] = 67] = "META";
  TAG_ID2[TAG_ID2["MGLYPH"] = 68] = "MGLYPH";
  TAG_ID2[TAG_ID2["MI"] = 69] = "MI";
  TAG_ID2[TAG_ID2["MO"] = 70] = "MO";
  TAG_ID2[TAG_ID2["MN"] = 71] = "MN";
  TAG_ID2[TAG_ID2["MS"] = 72] = "MS";
  TAG_ID2[TAG_ID2["MTEXT"] = 73] = "MTEXT";
  TAG_ID2[TAG_ID2["NAV"] = 74] = "NAV";
  TAG_ID2[TAG_ID2["NOBR"] = 75] = "NOBR";
  TAG_ID2[TAG_ID2["NOFRAMES"] = 76] = "NOFRAMES";
  TAG_ID2[TAG_ID2["NOEMBED"] = 77] = "NOEMBED";
  TAG_ID2[TAG_ID2["NOSCRIPT"] = 78] = "NOSCRIPT";
  TAG_ID2[TAG_ID2["OBJECT"] = 79] = "OBJECT";
  TAG_ID2[TAG_ID2["OL"] = 80] = "OL";
  TAG_ID2[TAG_ID2["OPTGROUP"] = 81] = "OPTGROUP";
  TAG_ID2[TAG_ID2["OPTION"] = 82] = "OPTION";
  TAG_ID2[TAG_ID2["P"] = 83] = "P";
  TAG_ID2[TAG_ID2["PARAM"] = 84] = "PARAM";
  TAG_ID2[TAG_ID2["PLAINTEXT"] = 85] = "PLAINTEXT";
  TAG_ID2[TAG_ID2["PRE"] = 86] = "PRE";
  TAG_ID2[TAG_ID2["RB"] = 87] = "RB";
  TAG_ID2[TAG_ID2["RP"] = 88] = "RP";
  TAG_ID2[TAG_ID2["RT"] = 89] = "RT";
  TAG_ID2[TAG_ID2["RTC"] = 90] = "RTC";
  TAG_ID2[TAG_ID2["RUBY"] = 91] = "RUBY";
  TAG_ID2[TAG_ID2["S"] = 92] = "S";
  TAG_ID2[TAG_ID2["SCRIPT"] = 93] = "SCRIPT";
  TAG_ID2[TAG_ID2["SECTION"] = 94] = "SECTION";
  TAG_ID2[TAG_ID2["SELECT"] = 95] = "SELECT";
  TAG_ID2[TAG_ID2["SOURCE"] = 96] = "SOURCE";
  TAG_ID2[TAG_ID2["SMALL"] = 97] = "SMALL";
  TAG_ID2[TAG_ID2["SPAN"] = 98] = "SPAN";
  TAG_ID2[TAG_ID2["STRIKE"] = 99] = "STRIKE";
  TAG_ID2[TAG_ID2["STRONG"] = 100] = "STRONG";
  TAG_ID2[TAG_ID2["STYLE"] = 101] = "STYLE";
  TAG_ID2[TAG_ID2["SUB"] = 102] = "SUB";
  TAG_ID2[TAG_ID2["SUMMARY"] = 103] = "SUMMARY";
  TAG_ID2[TAG_ID2["SUP"] = 104] = "SUP";
  TAG_ID2[TAG_ID2["TABLE"] = 105] = "TABLE";
  TAG_ID2[TAG_ID2["TBODY"] = 106] = "TBODY";
  TAG_ID2[TAG_ID2["TEMPLATE"] = 107] = "TEMPLATE";
  TAG_ID2[TAG_ID2["TEXTAREA"] = 108] = "TEXTAREA";
  TAG_ID2[TAG_ID2["TFOOT"] = 109] = "TFOOT";
  TAG_ID2[TAG_ID2["TD"] = 110] = "TD";
  TAG_ID2[TAG_ID2["TH"] = 111] = "TH";
  TAG_ID2[TAG_ID2["THEAD"] = 112] = "THEAD";
  TAG_ID2[TAG_ID2["TITLE"] = 113] = "TITLE";
  TAG_ID2[TAG_ID2["TR"] = 114] = "TR";
  TAG_ID2[TAG_ID2["TRACK"] = 115] = "TRACK";
  TAG_ID2[TAG_ID2["TT"] = 116] = "TT";
  TAG_ID2[TAG_ID2["U"] = 117] = "U";
  TAG_ID2[TAG_ID2["UL"] = 118] = "UL";
  TAG_ID2[TAG_ID2["SVG"] = 119] = "SVG";
  TAG_ID2[TAG_ID2["VAR"] = 120] = "VAR";
  TAG_ID2[TAG_ID2["WBR"] = 121] = "WBR";
  TAG_ID2[TAG_ID2["XMP"] = 122] = "XMP";
})(TAG_ID = TAG_ID || (TAG_ID = {}));
const TAG_NAME_TO_ID = /* @__PURE__ */ new Map([
  [TAG_NAMES.A, TAG_ID.A],
  [TAG_NAMES.ADDRESS, TAG_ID.ADDRESS],
  [TAG_NAMES.ANNOTATION_XML, TAG_ID.ANNOTATION_XML],
  [TAG_NAMES.APPLET, TAG_ID.APPLET],
  [TAG_NAMES.AREA, TAG_ID.AREA],
  [TAG_NAMES.ARTICLE, TAG_ID.ARTICLE],
  [TAG_NAMES.ASIDE, TAG_ID.ASIDE],
  [TAG_NAMES.B, TAG_ID.B],
  [TAG_NAMES.BASE, TAG_ID.BASE],
  [TAG_NAMES.BASEFONT, TAG_ID.BASEFONT],
  [TAG_NAMES.BGSOUND, TAG_ID.BGSOUND],
  [TAG_NAMES.BIG, TAG_ID.BIG],
  [TAG_NAMES.BLOCKQUOTE, TAG_ID.BLOCKQUOTE],
  [TAG_NAMES.BODY, TAG_ID.BODY],
  [TAG_NAMES.BR, TAG_ID.BR],
  [TAG_NAMES.BUTTON, TAG_ID.BUTTON],
  [TAG_NAMES.CAPTION, TAG_ID.CAPTION],
  [TAG_NAMES.CENTER, TAG_ID.CENTER],
  [TAG_NAMES.CODE, TAG_ID.CODE],
  [TAG_NAMES.COL, TAG_ID.COL],
  [TAG_NAMES.COLGROUP, TAG_ID.COLGROUP],
  [TAG_NAMES.DD, TAG_ID.DD],
  [TAG_NAMES.DESC, TAG_ID.DESC],
  [TAG_NAMES.DETAILS, TAG_ID.DETAILS],
  [TAG_NAMES.DIALOG, TAG_ID.DIALOG],
  [TAG_NAMES.DIR, TAG_ID.DIR],
  [TAG_NAMES.DIV, TAG_ID.DIV],
  [TAG_NAMES.DL, TAG_ID.DL],
  [TAG_NAMES.DT, TAG_ID.DT],
  [TAG_NAMES.EM, TAG_ID.EM],
  [TAG_NAMES.EMBED, TAG_ID.EMBED],
  [TAG_NAMES.FIELDSET, TAG_ID.FIELDSET],
  [TAG_NAMES.FIGCAPTION, TAG_ID.FIGCAPTION],
  [TAG_NAMES.FIGURE, TAG_ID.FIGURE],
  [TAG_NAMES.FONT, TAG_ID.FONT],
  [TAG_NAMES.FOOTER, TAG_ID.FOOTER],
  [TAG_NAMES.FOREIGN_OBJECT, TAG_ID.FOREIGN_OBJECT],
  [TAG_NAMES.FORM, TAG_ID.FORM],
  [TAG_NAMES.FRAME, TAG_ID.FRAME],
  [TAG_NAMES.FRAMESET, TAG_ID.FRAMESET],
  [TAG_NAMES.H1, TAG_ID.H1],
  [TAG_NAMES.H2, TAG_ID.H2],
  [TAG_NAMES.H3, TAG_ID.H3],
  [TAG_NAMES.H4, TAG_ID.H4],
  [TAG_NAMES.H5, TAG_ID.H5],
  [TAG_NAMES.H6, TAG_ID.H6],
  [TAG_NAMES.HEAD, TAG_ID.HEAD],
  [TAG_NAMES.HEADER, TAG_ID.HEADER],
  [TAG_NAMES.HGROUP, TAG_ID.HGROUP],
  [TAG_NAMES.HR, TAG_ID.HR],
  [TAG_NAMES.HTML, TAG_ID.HTML],
  [TAG_NAMES.I, TAG_ID.I],
  [TAG_NAMES.IMG, TAG_ID.IMG],
  [TAG_NAMES.IMAGE, TAG_ID.IMAGE],
  [TAG_NAMES.INPUT, TAG_ID.INPUT],
  [TAG_NAMES.IFRAME, TAG_ID.IFRAME],
  [TAG_NAMES.KEYGEN, TAG_ID.KEYGEN],
  [TAG_NAMES.LABEL, TAG_ID.LABEL],
  [TAG_NAMES.LI, TAG_ID.LI],
  [TAG_NAMES.LINK, TAG_ID.LINK],
  [TAG_NAMES.LISTING, TAG_ID.LISTING],
  [TAG_NAMES.MAIN, TAG_ID.MAIN],
  [TAG_NAMES.MALIGNMARK, TAG_ID.MALIGNMARK],
  [TAG_NAMES.MARQUEE, TAG_ID.MARQUEE],
  [TAG_NAMES.MATH, TAG_ID.MATH],
  [TAG_NAMES.MENU, TAG_ID.MENU],
  [TAG_NAMES.META, TAG_ID.META],
  [TAG_NAMES.MGLYPH, TAG_ID.MGLYPH],
  [TAG_NAMES.MI, TAG_ID.MI],
  [TAG_NAMES.MO, TAG_ID.MO],
  [TAG_NAMES.MN, TAG_ID.MN],
  [TAG_NAMES.MS, TAG_ID.MS],
  [TAG_NAMES.MTEXT, TAG_ID.MTEXT],
  [TAG_NAMES.NAV, TAG_ID.NAV],
  [TAG_NAMES.NOBR, TAG_ID.NOBR],
  [TAG_NAMES.NOFRAMES, TAG_ID.NOFRAMES],
  [TAG_NAMES.NOEMBED, TAG_ID.NOEMBED],
  [TAG_NAMES.NOSCRIPT, TAG_ID.NOSCRIPT],
  [TAG_NAMES.OBJECT, TAG_ID.OBJECT],
  [TAG_NAMES.OL, TAG_ID.OL],
  [TAG_NAMES.OPTGROUP, TAG_ID.OPTGROUP],
  [TAG_NAMES.OPTION, TAG_ID.OPTION],
  [TAG_NAMES.P, TAG_ID.P],
  [TAG_NAMES.PARAM, TAG_ID.PARAM],
  [TAG_NAMES.PLAINTEXT, TAG_ID.PLAINTEXT],
  [TAG_NAMES.PRE, TAG_ID.PRE],
  [TAG_NAMES.RB, TAG_ID.RB],
  [TAG_NAMES.RP, TAG_ID.RP],
  [TAG_NAMES.RT, TAG_ID.RT],
  [TAG_NAMES.RTC, TAG_ID.RTC],
  [TAG_NAMES.RUBY, TAG_ID.RUBY],
  [TAG_NAMES.S, TAG_ID.S],
  [TAG_NAMES.SCRIPT, TAG_ID.SCRIPT],
  [TAG_NAMES.SECTION, TAG_ID.SECTION],
  [TAG_NAMES.SELECT, TAG_ID.SELECT],
  [TAG_NAMES.SOURCE, TAG_ID.SOURCE],
  [TAG_NAMES.SMALL, TAG_ID.SMALL],
  [TAG_NAMES.SPAN, TAG_ID.SPAN],
  [TAG_NAMES.STRIKE, TAG_ID.STRIKE],
  [TAG_NAMES.STRONG, TAG_ID.STRONG],
  [TAG_NAMES.STYLE, TAG_ID.STYLE],
  [TAG_NAMES.SUB, TAG_ID.SUB],
  [TAG_NAMES.SUMMARY, TAG_ID.SUMMARY],
  [TAG_NAMES.SUP, TAG_ID.SUP],
  [TAG_NAMES.TABLE, TAG_ID.TABLE],
  [TAG_NAMES.TBODY, TAG_ID.TBODY],
  [TAG_NAMES.TEMPLATE, TAG_ID.TEMPLATE],
  [TAG_NAMES.TEXTAREA, TAG_ID.TEXTAREA],
  [TAG_NAMES.TFOOT, TAG_ID.TFOOT],
  [TAG_NAMES.TD, TAG_ID.TD],
  [TAG_NAMES.TH, TAG_ID.TH],
  [TAG_NAMES.THEAD, TAG_ID.THEAD],
  [TAG_NAMES.TITLE, TAG_ID.TITLE],
  [TAG_NAMES.TR, TAG_ID.TR],
  [TAG_NAMES.TRACK, TAG_ID.TRACK],
  [TAG_NAMES.TT, TAG_ID.TT],
  [TAG_NAMES.U, TAG_ID.U],
  [TAG_NAMES.UL, TAG_ID.UL],
  [TAG_NAMES.SVG, TAG_ID.SVG],
  [TAG_NAMES.VAR, TAG_ID.VAR],
  [TAG_NAMES.WBR, TAG_ID.WBR],
  [TAG_NAMES.XMP, TAG_ID.XMP]
]);
function getTagID(tagName) {
  var _a3;
  return (_a3 = TAG_NAME_TO_ID.get(tagName)) !== null && _a3 !== void 0 ? _a3 : TAG_ID.UNKNOWN;
}
const $ = TAG_ID;
const SPECIAL_ELEMENTS = {
  [NS.HTML]: /* @__PURE__ */ new Set([
    $.ADDRESS,
    $.APPLET,
    $.AREA,
    $.ARTICLE,
    $.ASIDE,
    $.BASE,
    $.BASEFONT,
    $.BGSOUND,
    $.BLOCKQUOTE,
    $.BODY,
    $.BR,
    $.BUTTON,
    $.CAPTION,
    $.CENTER,
    $.COL,
    $.COLGROUP,
    $.DD,
    $.DETAILS,
    $.DIR,
    $.DIV,
    $.DL,
    $.DT,
    $.EMBED,
    $.FIELDSET,
    $.FIGCAPTION,
    $.FIGURE,
    $.FOOTER,
    $.FORM,
    $.FRAME,
    $.FRAMESET,
    $.H1,
    $.H2,
    $.H3,
    $.H4,
    $.H5,
    $.H6,
    $.HEAD,
    $.HEADER,
    $.HGROUP,
    $.HR,
    $.HTML,
    $.IFRAME,
    $.IMG,
    $.INPUT,
    $.LI,
    $.LINK,
    $.LISTING,
    $.MAIN,
    $.MARQUEE,
    $.MENU,
    $.META,
    $.NAV,
    $.NOEMBED,
    $.NOFRAMES,
    $.NOSCRIPT,
    $.OBJECT,
    $.OL,
    $.P,
    $.PARAM,
    $.PLAINTEXT,
    $.PRE,
    $.SCRIPT,
    $.SECTION,
    $.SELECT,
    $.SOURCE,
    $.STYLE,
    $.SUMMARY,
    $.TABLE,
    $.TBODY,
    $.TD,
    $.TEMPLATE,
    $.TEXTAREA,
    $.TFOOT,
    $.TH,
    $.THEAD,
    $.TITLE,
    $.TR,
    $.TRACK,
    $.UL,
    $.WBR,
    $.XMP
  ]),
  [NS.MATHML]: /* @__PURE__ */ new Set([$.MI, $.MO, $.MN, $.MS, $.MTEXT, $.ANNOTATION_XML]),
  [NS.SVG]: /* @__PURE__ */ new Set([$.TITLE, $.FOREIGN_OBJECT, $.DESC]),
  [NS.XLINK]: /* @__PURE__ */ new Set(),
  [NS.XML]: /* @__PURE__ */ new Set(),
  [NS.XMLNS]: /* @__PURE__ */ new Set()
};
function isNumberedHeader(tn) {
  return tn === $.H1 || tn === $.H2 || tn === $.H3 || tn === $.H4 || tn === $.H5 || tn === $.H6;
}
const UNESCAPED_TEXT = /* @__PURE__ */ new Set([
  TAG_NAMES.STYLE,
  TAG_NAMES.SCRIPT,
  TAG_NAMES.XMP,
  TAG_NAMES.IFRAME,
  TAG_NAMES.NOEMBED,
  TAG_NAMES.NOFRAMES,
  TAG_NAMES.PLAINTEXT
]);
function hasUnescapedText(tn, scriptingEnabled) {
  return UNESCAPED_TEXT.has(tn) || scriptingEnabled && tn === TAG_NAMES.NOSCRIPT;
}
const C1_CONTROLS_REFERENCE_REPLACEMENTS = /* @__PURE__ */ new Map([
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]);
var State$1;
(function(State2) {
  State2[State2["DATA"] = 0] = "DATA";
  State2[State2["RCDATA"] = 1] = "RCDATA";
  State2[State2["RAWTEXT"] = 2] = "RAWTEXT";
  State2[State2["SCRIPT_DATA"] = 3] = "SCRIPT_DATA";
  State2[State2["PLAINTEXT"] = 4] = "PLAINTEXT";
  State2[State2["TAG_OPEN"] = 5] = "TAG_OPEN";
  State2[State2["END_TAG_OPEN"] = 6] = "END_TAG_OPEN";
  State2[State2["TAG_NAME"] = 7] = "TAG_NAME";
  State2[State2["RCDATA_LESS_THAN_SIGN"] = 8] = "RCDATA_LESS_THAN_SIGN";
  State2[State2["RCDATA_END_TAG_OPEN"] = 9] = "RCDATA_END_TAG_OPEN";
  State2[State2["RCDATA_END_TAG_NAME"] = 10] = "RCDATA_END_TAG_NAME";
  State2[State2["RAWTEXT_LESS_THAN_SIGN"] = 11] = "RAWTEXT_LESS_THAN_SIGN";
  State2[State2["RAWTEXT_END_TAG_OPEN"] = 12] = "RAWTEXT_END_TAG_OPEN";
  State2[State2["RAWTEXT_END_TAG_NAME"] = 13] = "RAWTEXT_END_TAG_NAME";
  State2[State2["SCRIPT_DATA_LESS_THAN_SIGN"] = 14] = "SCRIPT_DATA_LESS_THAN_SIGN";
  State2[State2["SCRIPT_DATA_END_TAG_OPEN"] = 15] = "SCRIPT_DATA_END_TAG_OPEN";
  State2[State2["SCRIPT_DATA_END_TAG_NAME"] = 16] = "SCRIPT_DATA_END_TAG_NAME";
  State2[State2["SCRIPT_DATA_ESCAPE_START"] = 17] = "SCRIPT_DATA_ESCAPE_START";
  State2[State2["SCRIPT_DATA_ESCAPE_START_DASH"] = 18] = "SCRIPT_DATA_ESCAPE_START_DASH";
  State2[State2["SCRIPT_DATA_ESCAPED"] = 19] = "SCRIPT_DATA_ESCAPED";
  State2[State2["SCRIPT_DATA_ESCAPED_DASH"] = 20] = "SCRIPT_DATA_ESCAPED_DASH";
  State2[State2["SCRIPT_DATA_ESCAPED_DASH_DASH"] = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH";
  State2[State2["SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN"] = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN";
  State2[State2["SCRIPT_DATA_ESCAPED_END_TAG_OPEN"] = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN";
  State2[State2["SCRIPT_DATA_ESCAPED_END_TAG_NAME"] = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME";
  State2[State2["SCRIPT_DATA_DOUBLE_ESCAPE_START"] = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START";
  State2[State2["SCRIPT_DATA_DOUBLE_ESCAPED"] = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED";
  State2[State2["SCRIPT_DATA_DOUBLE_ESCAPED_DASH"] = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH";
  State2[State2["SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH"] = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH";
  State2[State2["SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN"] = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN";
  State2[State2["SCRIPT_DATA_DOUBLE_ESCAPE_END"] = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END";
  State2[State2["BEFORE_ATTRIBUTE_NAME"] = 31] = "BEFORE_ATTRIBUTE_NAME";
  State2[State2["ATTRIBUTE_NAME"] = 32] = "ATTRIBUTE_NAME";
  State2[State2["AFTER_ATTRIBUTE_NAME"] = 33] = "AFTER_ATTRIBUTE_NAME";
  State2[State2["BEFORE_ATTRIBUTE_VALUE"] = 34] = "BEFORE_ATTRIBUTE_VALUE";
  State2[State2["ATTRIBUTE_VALUE_DOUBLE_QUOTED"] = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED";
  State2[State2["ATTRIBUTE_VALUE_SINGLE_QUOTED"] = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED";
  State2[State2["ATTRIBUTE_VALUE_UNQUOTED"] = 37] = "ATTRIBUTE_VALUE_UNQUOTED";
  State2[State2["AFTER_ATTRIBUTE_VALUE_QUOTED"] = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED";
  State2[State2["SELF_CLOSING_START_TAG"] = 39] = "SELF_CLOSING_START_TAG";
  State2[State2["BOGUS_COMMENT"] = 40] = "BOGUS_COMMENT";
  State2[State2["MARKUP_DECLARATION_OPEN"] = 41] = "MARKUP_DECLARATION_OPEN";
  State2[State2["COMMENT_START"] = 42] = "COMMENT_START";
  State2[State2["COMMENT_START_DASH"] = 43] = "COMMENT_START_DASH";
  State2[State2["COMMENT"] = 44] = "COMMENT";
  State2[State2["COMMENT_LESS_THAN_SIGN"] = 45] = "COMMENT_LESS_THAN_SIGN";
  State2[State2["COMMENT_LESS_THAN_SIGN_BANG"] = 46] = "COMMENT_LESS_THAN_SIGN_BANG";
  State2[State2["COMMENT_LESS_THAN_SIGN_BANG_DASH"] = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH";
  State2[State2["COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH"] = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH";
  State2[State2["COMMENT_END_DASH"] = 49] = "COMMENT_END_DASH";
  State2[State2["COMMENT_END"] = 50] = "COMMENT_END";
  State2[State2["COMMENT_END_BANG"] = 51] = "COMMENT_END_BANG";
  State2[State2["DOCTYPE"] = 52] = "DOCTYPE";
  State2[State2["BEFORE_DOCTYPE_NAME"] = 53] = "BEFORE_DOCTYPE_NAME";
  State2[State2["DOCTYPE_NAME"] = 54] = "DOCTYPE_NAME";
  State2[State2["AFTER_DOCTYPE_NAME"] = 55] = "AFTER_DOCTYPE_NAME";
  State2[State2["AFTER_DOCTYPE_PUBLIC_KEYWORD"] = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD";
  State2[State2["BEFORE_DOCTYPE_PUBLIC_IDENTIFIER"] = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER";
  State2[State2["DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED"] = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED";
  State2[State2["DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED"] = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED";
  State2[State2["AFTER_DOCTYPE_PUBLIC_IDENTIFIER"] = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER";
  State2[State2["BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS"] = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS";
  State2[State2["AFTER_DOCTYPE_SYSTEM_KEYWORD"] = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD";
  State2[State2["BEFORE_DOCTYPE_SYSTEM_IDENTIFIER"] = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER";
  State2[State2["DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED"] = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED";
  State2[State2["DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED"] = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED";
  State2[State2["AFTER_DOCTYPE_SYSTEM_IDENTIFIER"] = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER";
  State2[State2["BOGUS_DOCTYPE"] = 67] = "BOGUS_DOCTYPE";
  State2[State2["CDATA_SECTION"] = 68] = "CDATA_SECTION";
  State2[State2["CDATA_SECTION_BRACKET"] = 69] = "CDATA_SECTION_BRACKET";
  State2[State2["CDATA_SECTION_END"] = 70] = "CDATA_SECTION_END";
  State2[State2["CHARACTER_REFERENCE"] = 71] = "CHARACTER_REFERENCE";
  State2[State2["NAMED_CHARACTER_REFERENCE"] = 72] = "NAMED_CHARACTER_REFERENCE";
  State2[State2["AMBIGUOUS_AMPERSAND"] = 73] = "AMBIGUOUS_AMPERSAND";
  State2[State2["NUMERIC_CHARACTER_REFERENCE"] = 74] = "NUMERIC_CHARACTER_REFERENCE";
  State2[State2["HEXADEMICAL_CHARACTER_REFERENCE_START"] = 75] = "HEXADEMICAL_CHARACTER_REFERENCE_START";
  State2[State2["HEXADEMICAL_CHARACTER_REFERENCE"] = 76] = "HEXADEMICAL_CHARACTER_REFERENCE";
  State2[State2["DECIMAL_CHARACTER_REFERENCE"] = 77] = "DECIMAL_CHARACTER_REFERENCE";
  State2[State2["NUMERIC_CHARACTER_REFERENCE_END"] = 78] = "NUMERIC_CHARACTER_REFERENCE_END";
})(State$1 || (State$1 = {}));
const TokenizerMode = {
  DATA: State$1.DATA,
  RCDATA: State$1.RCDATA,
  RAWTEXT: State$1.RAWTEXT,
  SCRIPT_DATA: State$1.SCRIPT_DATA,
  PLAINTEXT: State$1.PLAINTEXT,
  CDATA_SECTION: State$1.CDATA_SECTION
};
function isAsciiDigit(cp) {
  return cp >= CODE_POINTS.DIGIT_0 && cp <= CODE_POINTS.DIGIT_9;
}
function isAsciiUpper(cp) {
  return cp >= CODE_POINTS.LATIN_CAPITAL_A && cp <= CODE_POINTS.LATIN_CAPITAL_Z;
}
function isAsciiLower(cp) {
  return cp >= CODE_POINTS.LATIN_SMALL_A && cp <= CODE_POINTS.LATIN_SMALL_Z;
}
function isAsciiLetter(cp) {
  return isAsciiLower(cp) || isAsciiUpper(cp);
}
function isAsciiAlphaNumeric(cp) {
  return isAsciiLetter(cp) || isAsciiDigit(cp);
}
function isAsciiUpperHexDigit(cp) {
  return cp >= CODE_POINTS.LATIN_CAPITAL_A && cp <= CODE_POINTS.LATIN_CAPITAL_F;
}
function isAsciiLowerHexDigit(cp) {
  return cp >= CODE_POINTS.LATIN_SMALL_A && cp <= CODE_POINTS.LATIN_SMALL_F;
}
function isAsciiHexDigit(cp) {
  return isAsciiDigit(cp) || isAsciiUpperHexDigit(cp) || isAsciiLowerHexDigit(cp);
}
function toAsciiLower(cp) {
  return cp + 32;
}
function isWhitespace$1(cp) {
  return cp === CODE_POINTS.SPACE || cp === CODE_POINTS.LINE_FEED || cp === CODE_POINTS.TABULATION || cp === CODE_POINTS.FORM_FEED;
}
function isEntityInAttributeInvalidEnd(nextCp) {
  return nextCp === CODE_POINTS.EQUALS_SIGN || isAsciiAlphaNumeric(nextCp);
}
function isScriptDataDoubleEscapeSequenceEnd(cp) {
  return isWhitespace$1(cp) || cp === CODE_POINTS.SOLIDUS || cp === CODE_POINTS.GREATER_THAN_SIGN;
}
let Tokenizer$1 = class Tokenizer {
  constructor(options2, handler) {
    this.options = options2;
    this.handler = handler;
    this.paused = false;
    this.inLoop = false;
    this.inForeignNode = false;
    this.lastStartTagName = "";
    this.active = false;
    this.state = State$1.DATA;
    this.returnState = State$1.DATA;
    this.charRefCode = -1;
    this.consumedAfterSnapshot = -1;
    this.currentCharacterToken = null;
    this.currentToken = null;
    this.currentAttr = { name: "", value: "" };
    this.preprocessor = new Preprocessor(handler);
    this.currentLocation = this.getCurrentLocation(-1);
  }
  //Errors
  _err(code) {
    var _a3, _b2;
    (_b2 = (_a3 = this.handler).onParseError) === null || _b2 === void 0 ? void 0 : _b2.call(_a3, this.preprocessor.getError(code));
  }
  // NOTE: `offset` may never run across line boundaries.
  getCurrentLocation(offset) {
    if (!this.options.sourceCodeLocationInfo) {
      return null;
    }
    return {
      startLine: this.preprocessor.line,
      startCol: this.preprocessor.col - offset,
      startOffset: this.preprocessor.offset - offset,
      endLine: -1,
      endCol: -1,
      endOffset: -1
    };
  }
  _runParsingLoop() {
    if (this.inLoop)
      return;
    this.inLoop = true;
    while (this.active && !this.paused) {
      this.consumedAfterSnapshot = 0;
      const cp = this._consume();
      if (!this._ensureHibernation()) {
        this._callState(cp);
      }
    }
    this.inLoop = false;
  }
  //API
  pause() {
    this.paused = true;
  }
  resume(writeCallback) {
    if (!this.paused) {
      throw new Error("Parser was already resumed");
    }
    this.paused = false;
    if (this.inLoop)
      return;
    this._runParsingLoop();
    if (!this.paused) {
      writeCallback === null || writeCallback === void 0 ? void 0 : writeCallback();
    }
  }
  write(chunk, isLastChunk, writeCallback) {
    this.active = true;
    this.preprocessor.write(chunk, isLastChunk);
    this._runParsingLoop();
    if (!this.paused) {
      writeCallback === null || writeCallback === void 0 ? void 0 : writeCallback();
    }
  }
  insertHtmlAtCurrentPos(chunk) {
    this.active = true;
    this.preprocessor.insertHtmlAtCurrentPos(chunk);
    this._runParsingLoop();
  }
  //Hibernation
  _ensureHibernation() {
    if (this.preprocessor.endOfChunkHit) {
      this._unconsume(this.consumedAfterSnapshot);
      this.active = false;
      return true;
    }
    return false;
  }
  //Consumption
  _consume() {
    this.consumedAfterSnapshot++;
    return this.preprocessor.advance();
  }
  _unconsume(count) {
    this.consumedAfterSnapshot -= count;
    this.preprocessor.retreat(count);
  }
  _reconsumeInState(state, cp) {
    this.state = state;
    this._callState(cp);
  }
  _advanceBy(count) {
    this.consumedAfterSnapshot += count;
    for (let i = 0; i < count; i++) {
      this.preprocessor.advance();
    }
  }
  _consumeSequenceIfMatch(pattern, caseSensitive) {
    if (this.preprocessor.startsWith(pattern, caseSensitive)) {
      this._advanceBy(pattern.length - 1);
      return true;
    }
    return false;
  }
  //Token creation
  _createStartTagToken() {
    this.currentToken = {
      type: TokenType.START_TAG,
      tagName: "",
      tagID: TAG_ID.UNKNOWN,
      selfClosing: false,
      ackSelfClosing: false,
      attrs: [],
      location: this.getCurrentLocation(1)
    };
  }
  _createEndTagToken() {
    this.currentToken = {
      type: TokenType.END_TAG,
      tagName: "",
      tagID: TAG_ID.UNKNOWN,
      selfClosing: false,
      ackSelfClosing: false,
      attrs: [],
      location: this.getCurrentLocation(2)
    };
  }
  _createCommentToken(offset) {
    this.currentToken = {
      type: TokenType.COMMENT,
      data: "",
      location: this.getCurrentLocation(offset)
    };
  }
  _createDoctypeToken(initialName) {
    this.currentToken = {
      type: TokenType.DOCTYPE,
      name: initialName,
      forceQuirks: false,
      publicId: null,
      systemId: null,
      location: this.currentLocation
    };
  }
  _createCharacterToken(type, chars) {
    this.currentCharacterToken = {
      type,
      chars,
      location: this.currentLocation
    };
  }
  //Tag attributes
  _createAttr(attrNameFirstCh) {
    this.currentAttr = {
      name: attrNameFirstCh,
      value: ""
    };
    this.currentLocation = this.getCurrentLocation(0);
  }
  _leaveAttrName() {
    var _a3;
    var _b2;
    const token = this.currentToken;
    if (getTokenAttr(token, this.currentAttr.name) === null) {
      token.attrs.push(this.currentAttr);
      if (token.location && this.currentLocation) {
        const attrLocations = (_a3 = (_b2 = token.location).attrs) !== null && _a3 !== void 0 ? _a3 : _b2.attrs = /* @__PURE__ */ Object.create(null);
        attrLocations[this.currentAttr.name] = this.currentLocation;
        this._leaveAttrValue();
      }
    } else {
      this._err(ERR.duplicateAttribute);
    }
  }
  _leaveAttrValue() {
    if (this.currentLocation) {
      this.currentLocation.endLine = this.preprocessor.line;
      this.currentLocation.endCol = this.preprocessor.col;
      this.currentLocation.endOffset = this.preprocessor.offset;
    }
  }
  //Token emission
  prepareToken(ct) {
    this._emitCurrentCharacterToken(ct.location);
    this.currentToken = null;
    if (ct.location) {
      ct.location.endLine = this.preprocessor.line;
      ct.location.endCol = this.preprocessor.col + 1;
      ct.location.endOffset = this.preprocessor.offset + 1;
    }
    this.currentLocation = this.getCurrentLocation(-1);
  }
  emitCurrentTagToken() {
    const ct = this.currentToken;
    this.prepareToken(ct);
    ct.tagID = getTagID(ct.tagName);
    if (ct.type === TokenType.START_TAG) {
      this.lastStartTagName = ct.tagName;
      this.handler.onStartTag(ct);
    } else {
      if (ct.attrs.length > 0) {
        this._err(ERR.endTagWithAttributes);
      }
      if (ct.selfClosing) {
        this._err(ERR.endTagWithTrailingSolidus);
      }
      this.handler.onEndTag(ct);
    }
    this.preprocessor.dropParsedChunk();
  }
  emitCurrentComment(ct) {
    this.prepareToken(ct);
    this.handler.onComment(ct);
    this.preprocessor.dropParsedChunk();
  }
  emitCurrentDoctype(ct) {
    this.prepareToken(ct);
    this.handler.onDoctype(ct);
    this.preprocessor.dropParsedChunk();
  }
  _emitCurrentCharacterToken(nextLocation) {
    if (this.currentCharacterToken) {
      if (nextLocation && this.currentCharacterToken.location) {
        this.currentCharacterToken.location.endLine = nextLocation.startLine;
        this.currentCharacterToken.location.endCol = nextLocation.startCol;
        this.currentCharacterToken.location.endOffset = nextLocation.startOffset;
      }
      switch (this.currentCharacterToken.type) {
        case TokenType.CHARACTER: {
          this.handler.onCharacter(this.currentCharacterToken);
          break;
        }
        case TokenType.NULL_CHARACTER: {
          this.handler.onNullCharacter(this.currentCharacterToken);
          break;
        }
        case TokenType.WHITESPACE_CHARACTER: {
          this.handler.onWhitespaceCharacter(this.currentCharacterToken);
          break;
        }
      }
      this.currentCharacterToken = null;
    }
  }
  _emitEOFToken() {
    const location = this.getCurrentLocation(0);
    if (location) {
      location.endLine = location.startLine;
      location.endCol = location.startCol;
      location.endOffset = location.startOffset;
    }
    this._emitCurrentCharacterToken(location);
    this.handler.onEof({ type: TokenType.EOF, location });
    this.active = false;
  }
  //Characters emission
  //OPTIMIZATION: specification uses only one type of character tokens (one token per character).
  //This causes a huge memory overhead and a lot of unnecessary parser loops. parse5 uses 3 groups of characters.
  //If we have a sequence of characters that belong to the same group, the parser can process it
  //as a single solid character token.
  //So, there are 3 types of character tokens in parse5:
  //1)TokenType.NULL_CHARACTER - \u0000-character sequences (e.g. '\u0000\u0000\u0000')
  //2)TokenType.WHITESPACE_CHARACTER - any whitespace/new-line character sequences (e.g. '\n  \r\t   \f')
  //3)TokenType.CHARACTER - any character sequence which don't belong to groups 1 and 2 (e.g. 'abcdef1234@@#$%^')
  _appendCharToCurrentCharacterToken(type, ch) {
    if (this.currentCharacterToken) {
      if (this.currentCharacterToken.type !== type) {
        this.currentLocation = this.getCurrentLocation(0);
        this._emitCurrentCharacterToken(this.currentLocation);
        this.preprocessor.dropParsedChunk();
      } else {
        this.currentCharacterToken.chars += ch;
        return;
      }
    }
    this._createCharacterToken(type, ch);
  }
  _emitCodePoint(cp) {
    const type = isWhitespace$1(cp) ? TokenType.WHITESPACE_CHARACTER : cp === CODE_POINTS.NULL ? TokenType.NULL_CHARACTER : TokenType.CHARACTER;
    this._appendCharToCurrentCharacterToken(type, String.fromCodePoint(cp));
  }
  //NOTE: used when we emit characters explicitly.
  //This is always for non-whitespace and non-null characters, which allows us to avoid additional checks.
  _emitChars(ch) {
    this._appendCharToCurrentCharacterToken(TokenType.CHARACTER, ch);
  }
  // Character reference helpers
  _matchNamedCharacterReference(cp) {
    let result = null;
    let excess = 0;
    let withoutSemicolon = false;
    for (let i = 0, current = htmlDecodeTree[0]; i >= 0; cp = this._consume()) {
      i = determineBranch(htmlDecodeTree, current, i + 1, cp);
      if (i < 0)
        break;
      excess += 1;
      current = htmlDecodeTree[i];
      const masked = current & BinTrieFlags.VALUE_LENGTH;
      if (masked) {
        const valueLength = (masked >> 14) - 1;
        if (cp !== CODE_POINTS.SEMICOLON && this._isCharacterReferenceInAttribute() && isEntityInAttributeInvalidEnd(this.preprocessor.peek(1))) {
          result = [CODE_POINTS.AMPERSAND];
          i += valueLength;
        } else {
          result = valueLength === 0 ? [htmlDecodeTree[i] & ~BinTrieFlags.VALUE_LENGTH] : valueLength === 1 ? [htmlDecodeTree[++i]] : [htmlDecodeTree[++i], htmlDecodeTree[++i]];
          excess = 0;
          withoutSemicolon = cp !== CODE_POINTS.SEMICOLON;
        }
        if (valueLength === 0) {
          this._consume();
          break;
        }
      }
    }
    this._unconsume(excess);
    if (withoutSemicolon && !this.preprocessor.endOfChunkHit) {
      this._err(ERR.missingSemicolonAfterCharacterReference);
    }
    this._unconsume(1);
    return result;
  }
  _isCharacterReferenceInAttribute() {
    return this.returnState === State$1.ATTRIBUTE_VALUE_DOUBLE_QUOTED || this.returnState === State$1.ATTRIBUTE_VALUE_SINGLE_QUOTED || this.returnState === State$1.ATTRIBUTE_VALUE_UNQUOTED;
  }
  _flushCodePointConsumedAsCharacterReference(cp) {
    if (this._isCharacterReferenceInAttribute()) {
      this.currentAttr.value += String.fromCodePoint(cp);
    } else {
      this._emitCodePoint(cp);
    }
  }
  // Calling states this way turns out to be much faster than any other approach.
  _callState(cp) {
    switch (this.state) {
      case State$1.DATA: {
        this._stateData(cp);
        break;
      }
      case State$1.RCDATA: {
        this._stateRcdata(cp);
        break;
      }
      case State$1.RAWTEXT: {
        this._stateRawtext(cp);
        break;
      }
      case State$1.SCRIPT_DATA: {
        this._stateScriptData(cp);
        break;
      }
      case State$1.PLAINTEXT: {
        this._statePlaintext(cp);
        break;
      }
      case State$1.TAG_OPEN: {
        this._stateTagOpen(cp);
        break;
      }
      case State$1.END_TAG_OPEN: {
        this._stateEndTagOpen(cp);
        break;
      }
      case State$1.TAG_NAME: {
        this._stateTagName(cp);
        break;
      }
      case State$1.RCDATA_LESS_THAN_SIGN: {
        this._stateRcdataLessThanSign(cp);
        break;
      }
      case State$1.RCDATA_END_TAG_OPEN: {
        this._stateRcdataEndTagOpen(cp);
        break;
      }
      case State$1.RCDATA_END_TAG_NAME: {
        this._stateRcdataEndTagName(cp);
        break;
      }
      case State$1.RAWTEXT_LESS_THAN_SIGN: {
        this._stateRawtextLessThanSign(cp);
        break;
      }
      case State$1.RAWTEXT_END_TAG_OPEN: {
        this._stateRawtextEndTagOpen(cp);
        break;
      }
      case State$1.RAWTEXT_END_TAG_NAME: {
        this._stateRawtextEndTagName(cp);
        break;
      }
      case State$1.SCRIPT_DATA_LESS_THAN_SIGN: {
        this._stateScriptDataLessThanSign(cp);
        break;
      }
      case State$1.SCRIPT_DATA_END_TAG_OPEN: {
        this._stateScriptDataEndTagOpen(cp);
        break;
      }
      case State$1.SCRIPT_DATA_END_TAG_NAME: {
        this._stateScriptDataEndTagName(cp);
        break;
      }
      case State$1.SCRIPT_DATA_ESCAPE_START: {
        this._stateScriptDataEscapeStart(cp);
        break;
      }
      case State$1.SCRIPT_DATA_ESCAPE_START_DASH: {
        this._stateScriptDataEscapeStartDash(cp);
        break;
      }
      case State$1.SCRIPT_DATA_ESCAPED: {
        this._stateScriptDataEscaped(cp);
        break;
      }
      case State$1.SCRIPT_DATA_ESCAPED_DASH: {
        this._stateScriptDataEscapedDash(cp);
        break;
      }
      case State$1.SCRIPT_DATA_ESCAPED_DASH_DASH: {
        this._stateScriptDataEscapedDashDash(cp);
        break;
      }
      case State$1.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN: {
        this._stateScriptDataEscapedLessThanSign(cp);
        break;
      }
      case State$1.SCRIPT_DATA_ESCAPED_END_TAG_OPEN: {
        this._stateScriptDataEscapedEndTagOpen(cp);
        break;
      }
      case State$1.SCRIPT_DATA_ESCAPED_END_TAG_NAME: {
        this._stateScriptDataEscapedEndTagName(cp);
        break;
      }
      case State$1.SCRIPT_DATA_DOUBLE_ESCAPE_START: {
        this._stateScriptDataDoubleEscapeStart(cp);
        break;
      }
      case State$1.SCRIPT_DATA_DOUBLE_ESCAPED: {
        this._stateScriptDataDoubleEscaped(cp);
        break;
      }
      case State$1.SCRIPT_DATA_DOUBLE_ESCAPED_DASH: {
        this._stateScriptDataDoubleEscapedDash(cp);
        break;
      }
      case State$1.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH: {
        this._stateScriptDataDoubleEscapedDashDash(cp);
        break;
      }
      case State$1.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN: {
        this._stateScriptDataDoubleEscapedLessThanSign(cp);
        break;
      }
      case State$1.SCRIPT_DATA_DOUBLE_ESCAPE_END: {
        this._stateScriptDataDoubleEscapeEnd(cp);
        break;
      }
      case State$1.BEFORE_ATTRIBUTE_NAME: {
        this._stateBeforeAttributeName(cp);
        break;
      }
      case State$1.ATTRIBUTE_NAME: {
        this._stateAttributeName(cp);
        break;
      }
      case State$1.AFTER_ATTRIBUTE_NAME: {
        this._stateAfterAttributeName(cp);
        break;
      }
      case State$1.BEFORE_ATTRIBUTE_VALUE: {
        this._stateBeforeAttributeValue(cp);
        break;
      }
      case State$1.ATTRIBUTE_VALUE_DOUBLE_QUOTED: {
        this._stateAttributeValueDoubleQuoted(cp);
        break;
      }
      case State$1.ATTRIBUTE_VALUE_SINGLE_QUOTED: {
        this._stateAttributeValueSingleQuoted(cp);
        break;
      }
      case State$1.ATTRIBUTE_VALUE_UNQUOTED: {
        this._stateAttributeValueUnquoted(cp);
        break;
      }
      case State$1.AFTER_ATTRIBUTE_VALUE_QUOTED: {
        this._stateAfterAttributeValueQuoted(cp);
        break;
      }
      case State$1.SELF_CLOSING_START_TAG: {
        this._stateSelfClosingStartTag(cp);
        break;
      }
      case State$1.BOGUS_COMMENT: {
        this._stateBogusComment(cp);
        break;
      }
      case State$1.MARKUP_DECLARATION_OPEN: {
        this._stateMarkupDeclarationOpen(cp);
        break;
      }
      case State$1.COMMENT_START: {
        this._stateCommentStart(cp);
        break;
      }
      case State$1.COMMENT_START_DASH: {
        this._stateCommentStartDash(cp);
        break;
      }
      case State$1.COMMENT: {
        this._stateComment(cp);
        break;
      }
      case State$1.COMMENT_LESS_THAN_SIGN: {
        this._stateCommentLessThanSign(cp);
        break;
      }
      case State$1.COMMENT_LESS_THAN_SIGN_BANG: {
        this._stateCommentLessThanSignBang(cp);
        break;
      }
      case State$1.COMMENT_LESS_THAN_SIGN_BANG_DASH: {
        this._stateCommentLessThanSignBangDash(cp);
        break;
      }
      case State$1.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH: {
        this._stateCommentLessThanSignBangDashDash(cp);
        break;
      }
      case State$1.COMMENT_END_DASH: {
        this._stateCommentEndDash(cp);
        break;
      }
      case State$1.COMMENT_END: {
        this._stateCommentEnd(cp);
        break;
      }
      case State$1.COMMENT_END_BANG: {
        this._stateCommentEndBang(cp);
        break;
      }
      case State$1.DOCTYPE: {
        this._stateDoctype(cp);
        break;
      }
      case State$1.BEFORE_DOCTYPE_NAME: {
        this._stateBeforeDoctypeName(cp);
        break;
      }
      case State$1.DOCTYPE_NAME: {
        this._stateDoctypeName(cp);
        break;
      }
      case State$1.AFTER_DOCTYPE_NAME: {
        this._stateAfterDoctypeName(cp);
        break;
      }
      case State$1.AFTER_DOCTYPE_PUBLIC_KEYWORD: {
        this._stateAfterDoctypePublicKeyword(cp);
        break;
      }
      case State$1.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER: {
        this._stateBeforeDoctypePublicIdentifier(cp);
        break;
      }
      case State$1.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED: {
        this._stateDoctypePublicIdentifierDoubleQuoted(cp);
        break;
      }
      case State$1.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED: {
        this._stateDoctypePublicIdentifierSingleQuoted(cp);
        break;
      }
      case State$1.AFTER_DOCTYPE_PUBLIC_IDENTIFIER: {
        this._stateAfterDoctypePublicIdentifier(cp);
        break;
      }
      case State$1.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS: {
        this._stateBetweenDoctypePublicAndSystemIdentifiers(cp);
        break;
      }
      case State$1.AFTER_DOCTYPE_SYSTEM_KEYWORD: {
        this._stateAfterDoctypeSystemKeyword(cp);
        break;
      }
      case State$1.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER: {
        this._stateBeforeDoctypeSystemIdentifier(cp);
        break;
      }
      case State$1.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED: {
        this._stateDoctypeSystemIdentifierDoubleQuoted(cp);
        break;
      }
      case State$1.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED: {
        this._stateDoctypeSystemIdentifierSingleQuoted(cp);
        break;
      }
      case State$1.AFTER_DOCTYPE_SYSTEM_IDENTIFIER: {
        this._stateAfterDoctypeSystemIdentifier(cp);
        break;
      }
      case State$1.BOGUS_DOCTYPE: {
        this._stateBogusDoctype(cp);
        break;
      }
      case State$1.CDATA_SECTION: {
        this._stateCdataSection(cp);
        break;
      }
      case State$1.CDATA_SECTION_BRACKET: {
        this._stateCdataSectionBracket(cp);
        break;
      }
      case State$1.CDATA_SECTION_END: {
        this._stateCdataSectionEnd(cp);
        break;
      }
      case State$1.CHARACTER_REFERENCE: {
        this._stateCharacterReference(cp);
        break;
      }
      case State$1.NAMED_CHARACTER_REFERENCE: {
        this._stateNamedCharacterReference(cp);
        break;
      }
      case State$1.AMBIGUOUS_AMPERSAND: {
        this._stateAmbiguousAmpersand(cp);
        break;
      }
      case State$1.NUMERIC_CHARACTER_REFERENCE: {
        this._stateNumericCharacterReference(cp);
        break;
      }
      case State$1.HEXADEMICAL_CHARACTER_REFERENCE_START: {
        this._stateHexademicalCharacterReferenceStart(cp);
        break;
      }
      case State$1.HEXADEMICAL_CHARACTER_REFERENCE: {
        this._stateHexademicalCharacterReference(cp);
        break;
      }
      case State$1.DECIMAL_CHARACTER_REFERENCE: {
        this._stateDecimalCharacterReference(cp);
        break;
      }
      case State$1.NUMERIC_CHARACTER_REFERENCE_END: {
        this._stateNumericCharacterReferenceEnd(cp);
        break;
      }
      default: {
        throw new Error("Unknown state");
      }
    }
  }
  // State machine
  // Data state
  //------------------------------------------------------------------
  _stateData(cp) {
    switch (cp) {
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State$1.TAG_OPEN;
        break;
      }
      case CODE_POINTS.AMPERSAND: {
        this.returnState = State$1.DATA;
        this.state = State$1.CHARACTER_REFERENCE;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this._emitCodePoint(cp);
        break;
      }
      case CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp);
      }
    }
  }
  //  RCDATA state
  //------------------------------------------------------------------
  _stateRcdata(cp) {
    switch (cp) {
      case CODE_POINTS.AMPERSAND: {
        this.returnState = State$1.RCDATA;
        this.state = State$1.CHARACTER_REFERENCE;
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State$1.RCDATA_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp);
      }
    }
  }
  // RAWTEXT state
  //------------------------------------------------------------------
  _stateRawtext(cp) {
    switch (cp) {
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State$1.RAWTEXT_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp);
      }
    }
  }
  // Script data state
  //------------------------------------------------------------------
  _stateScriptData(cp) {
    switch (cp) {
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State$1.SCRIPT_DATA_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp);
      }
    }
  }
  // PLAINTEXT state
  //------------------------------------------------------------------
  _statePlaintext(cp) {
    switch (cp) {
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp);
      }
    }
  }
  // Tag open state
  //------------------------------------------------------------------
  _stateTagOpen(cp) {
    if (isAsciiLetter(cp)) {
      this._createStartTagToken();
      this.state = State$1.TAG_NAME;
      this._stateTagName(cp);
    } else
      switch (cp) {
        case CODE_POINTS.EXCLAMATION_MARK: {
          this.state = State$1.MARKUP_DECLARATION_OPEN;
          break;
        }
        case CODE_POINTS.SOLIDUS: {
          this.state = State$1.END_TAG_OPEN;
          break;
        }
        case CODE_POINTS.QUESTION_MARK: {
          this._err(ERR.unexpectedQuestionMarkInsteadOfTagName);
          this._createCommentToken(1);
          this.state = State$1.BOGUS_COMMENT;
          this._stateBogusComment(cp);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofBeforeTagName);
          this._emitChars("<");
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(ERR.invalidFirstCharacterOfTagName);
          this._emitChars("<");
          this.state = State$1.DATA;
          this._stateData(cp);
        }
      }
  }
  // End tag open state
  //------------------------------------------------------------------
  _stateEndTagOpen(cp) {
    if (isAsciiLetter(cp)) {
      this._createEndTagToken();
      this.state = State$1.TAG_NAME;
      this._stateTagName(cp);
    } else
      switch (cp) {
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.missingEndTagName);
          this.state = State$1.DATA;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofBeforeTagName);
          this._emitChars("</");
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(ERR.invalidFirstCharacterOfTagName);
          this._createCommentToken(2);
          this.state = State$1.BOGUS_COMMENT;
          this._stateBogusComment(cp);
        }
      }
  }
  // Tag name state
  //------------------------------------------------------------------
  _stateTagName(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this.state = State$1.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case CODE_POINTS.SOLIDUS: {
        this.state = State$1.SELF_CLOSING_START_TAG;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State$1.DATA;
        this.emitCurrentTagToken();
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token.tagName += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag);
        this._emitEOFToken();
        break;
      }
      default: {
        token.tagName += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
      }
    }
  }
  // RCDATA less-than sign state
  //------------------------------------------------------------------
  _stateRcdataLessThanSign(cp) {
    if (cp === CODE_POINTS.SOLIDUS) {
      this.state = State$1.RCDATA_END_TAG_OPEN;
    } else {
      this._emitChars("<");
      this.state = State$1.RCDATA;
      this._stateRcdata(cp);
    }
  }
  // RCDATA end tag open state
  //------------------------------------------------------------------
  _stateRcdataEndTagOpen(cp) {
    if (isAsciiLetter(cp)) {
      this.state = State$1.RCDATA_END_TAG_NAME;
      this._stateRcdataEndTagName(cp);
    } else {
      this._emitChars("</");
      this.state = State$1.RCDATA;
      this._stateRcdata(cp);
    }
  }
  handleSpecialEndTag(_cp) {
    if (!this.preprocessor.startsWith(this.lastStartTagName, false)) {
      return !this._ensureHibernation();
    }
    this._createEndTagToken();
    const token = this.currentToken;
    token.tagName = this.lastStartTagName;
    const cp = this.preprocessor.peek(this.lastStartTagName.length);
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this._advanceBy(this.lastStartTagName.length);
        this.state = State$1.BEFORE_ATTRIBUTE_NAME;
        return false;
      }
      case CODE_POINTS.SOLIDUS: {
        this._advanceBy(this.lastStartTagName.length);
        this.state = State$1.SELF_CLOSING_START_TAG;
        return false;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._advanceBy(this.lastStartTagName.length);
        this.emitCurrentTagToken();
        this.state = State$1.DATA;
        return false;
      }
      default: {
        return !this._ensureHibernation();
      }
    }
  }
  // RCDATA end tag name state
  //------------------------------------------------------------------
  _stateRcdataEndTagName(cp) {
    if (this.handleSpecialEndTag(cp)) {
      this._emitChars("</");
      this.state = State$1.RCDATA;
      this._stateRcdata(cp);
    }
  }
  // RAWTEXT less-than sign state
  //------------------------------------------------------------------
  _stateRawtextLessThanSign(cp) {
    if (cp === CODE_POINTS.SOLIDUS) {
      this.state = State$1.RAWTEXT_END_TAG_OPEN;
    } else {
      this._emitChars("<");
      this.state = State$1.RAWTEXT;
      this._stateRawtext(cp);
    }
  }
  // RAWTEXT end tag open state
  //------------------------------------------------------------------
  _stateRawtextEndTagOpen(cp) {
    if (isAsciiLetter(cp)) {
      this.state = State$1.RAWTEXT_END_TAG_NAME;
      this._stateRawtextEndTagName(cp);
    } else {
      this._emitChars("</");
      this.state = State$1.RAWTEXT;
      this._stateRawtext(cp);
    }
  }
  // RAWTEXT end tag name state
  //------------------------------------------------------------------
  _stateRawtextEndTagName(cp) {
    if (this.handleSpecialEndTag(cp)) {
      this._emitChars("</");
      this.state = State$1.RAWTEXT;
      this._stateRawtext(cp);
    }
  }
  // Script data less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataLessThanSign(cp) {
    switch (cp) {
      case CODE_POINTS.SOLIDUS: {
        this.state = State$1.SCRIPT_DATA_END_TAG_OPEN;
        break;
      }
      case CODE_POINTS.EXCLAMATION_MARK: {
        this.state = State$1.SCRIPT_DATA_ESCAPE_START;
        this._emitChars("<!");
        break;
      }
      default: {
        this._emitChars("<");
        this.state = State$1.SCRIPT_DATA;
        this._stateScriptData(cp);
      }
    }
  }
  // Script data end tag open state
  //------------------------------------------------------------------
  _stateScriptDataEndTagOpen(cp) {
    if (isAsciiLetter(cp)) {
      this.state = State$1.SCRIPT_DATA_END_TAG_NAME;
      this._stateScriptDataEndTagName(cp);
    } else {
      this._emitChars("</");
      this.state = State$1.SCRIPT_DATA;
      this._stateScriptData(cp);
    }
  }
  // Script data end tag name state
  //------------------------------------------------------------------
  _stateScriptDataEndTagName(cp) {
    if (this.handleSpecialEndTag(cp)) {
      this._emitChars("</");
      this.state = State$1.SCRIPT_DATA;
      this._stateScriptData(cp);
    }
  }
  // Script data escape start state
  //------------------------------------------------------------------
  _stateScriptDataEscapeStart(cp) {
    if (cp === CODE_POINTS.HYPHEN_MINUS) {
      this.state = State$1.SCRIPT_DATA_ESCAPE_START_DASH;
      this._emitChars("-");
    } else {
      this.state = State$1.SCRIPT_DATA;
      this._stateScriptData(cp);
    }
  }
  // Script data escape start dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapeStartDash(cp) {
    if (cp === CODE_POINTS.HYPHEN_MINUS) {
      this.state = State$1.SCRIPT_DATA_ESCAPED_DASH_DASH;
      this._emitChars("-");
    } else {
      this.state = State$1.SCRIPT_DATA;
      this._stateScriptData(cp);
    }
  }
  // Script data escaped state
  //------------------------------------------------------------------
  _stateScriptDataEscaped(cp) {
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State$1.SCRIPT_DATA_ESCAPED_DASH;
        this._emitChars("-");
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State$1.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInScriptHtmlCommentLikeText);
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp);
      }
    }
  }
  // Script data escaped dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapedDash(cp) {
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State$1.SCRIPT_DATA_ESCAPED_DASH_DASH;
        this._emitChars("-");
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State$1.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.state = State$1.SCRIPT_DATA_ESCAPED;
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInScriptHtmlCommentLikeText);
        this._emitEOFToken();
        break;
      }
      default: {
        this.state = State$1.SCRIPT_DATA_ESCAPED;
        this._emitCodePoint(cp);
      }
    }
  }
  // Script data escaped dash dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapedDashDash(cp) {
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State$1.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State$1.SCRIPT_DATA;
        this._emitChars(">");
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.state = State$1.SCRIPT_DATA_ESCAPED;
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInScriptHtmlCommentLikeText);
        this._emitEOFToken();
        break;
      }
      default: {
        this.state = State$1.SCRIPT_DATA_ESCAPED;
        this._emitCodePoint(cp);
      }
    }
  }
  // Script data escaped less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataEscapedLessThanSign(cp) {
    if (cp === CODE_POINTS.SOLIDUS) {
      this.state = State$1.SCRIPT_DATA_ESCAPED_END_TAG_OPEN;
    } else if (isAsciiLetter(cp)) {
      this._emitChars("<");
      this.state = State$1.SCRIPT_DATA_DOUBLE_ESCAPE_START;
      this._stateScriptDataDoubleEscapeStart(cp);
    } else {
      this._emitChars("<");
      this.state = State$1.SCRIPT_DATA_ESCAPED;
      this._stateScriptDataEscaped(cp);
    }
  }
  // Script data escaped end tag open state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagOpen(cp) {
    if (isAsciiLetter(cp)) {
      this.state = State$1.SCRIPT_DATA_ESCAPED_END_TAG_NAME;
      this._stateScriptDataEscapedEndTagName(cp);
    } else {
      this._emitChars("</");
      this.state = State$1.SCRIPT_DATA_ESCAPED;
      this._stateScriptDataEscaped(cp);
    }
  }
  // Script data escaped end tag name state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagName(cp) {
    if (this.handleSpecialEndTag(cp)) {
      this._emitChars("</");
      this.state = State$1.SCRIPT_DATA_ESCAPED;
      this._stateScriptDataEscaped(cp);
    }
  }
  // Script data double escape start state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapeStart(cp) {
    if (this.preprocessor.startsWith(SEQUENCES.SCRIPT, false) && isScriptDataDoubleEscapeSequenceEnd(this.preprocessor.peek(SEQUENCES.SCRIPT.length))) {
      this._emitCodePoint(cp);
      for (let i = 0; i < SEQUENCES.SCRIPT.length; i++) {
        this._emitCodePoint(this._consume());
      }
      this.state = State$1.SCRIPT_DATA_DOUBLE_ESCAPED;
    } else if (!this._ensureHibernation()) {
      this.state = State$1.SCRIPT_DATA_ESCAPED;
      this._stateScriptDataEscaped(cp);
    }
  }
  // Script data double escaped state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscaped(cp) {
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State$1.SCRIPT_DATA_DOUBLE_ESCAPED_DASH;
        this._emitChars("-");
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State$1.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
        this._emitChars("<");
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInScriptHtmlCommentLikeText);
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp);
      }
    }
  }
  // Script data double escaped dash state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedDash(cp) {
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State$1.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH;
        this._emitChars("-");
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State$1.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
        this._emitChars("<");
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.state = State$1.SCRIPT_DATA_DOUBLE_ESCAPED;
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInScriptHtmlCommentLikeText);
        this._emitEOFToken();
        break;
      }
      default: {
        this.state = State$1.SCRIPT_DATA_DOUBLE_ESCAPED;
        this._emitCodePoint(cp);
      }
    }
  }
  // Script data double escaped dash dash state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedDashDash(cp) {
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State$1.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
        this._emitChars("<");
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State$1.SCRIPT_DATA;
        this._emitChars(">");
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.state = State$1.SCRIPT_DATA_DOUBLE_ESCAPED;
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInScriptHtmlCommentLikeText);
        this._emitEOFToken();
        break;
      }
      default: {
        this.state = State$1.SCRIPT_DATA_DOUBLE_ESCAPED;
        this._emitCodePoint(cp);
      }
    }
  }
  // Script data double escaped less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedLessThanSign(cp) {
    if (cp === CODE_POINTS.SOLIDUS) {
      this.state = State$1.SCRIPT_DATA_DOUBLE_ESCAPE_END;
      this._emitChars("/");
    } else {
      this.state = State$1.SCRIPT_DATA_DOUBLE_ESCAPED;
      this._stateScriptDataDoubleEscaped(cp);
    }
  }
  // Script data double escape end state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapeEnd(cp) {
    if (this.preprocessor.startsWith(SEQUENCES.SCRIPT, false) && isScriptDataDoubleEscapeSequenceEnd(this.preprocessor.peek(SEQUENCES.SCRIPT.length))) {
      this._emitCodePoint(cp);
      for (let i = 0; i < SEQUENCES.SCRIPT.length; i++) {
        this._emitCodePoint(this._consume());
      }
      this.state = State$1.SCRIPT_DATA_ESCAPED;
    } else if (!this._ensureHibernation()) {
      this.state = State$1.SCRIPT_DATA_DOUBLE_ESCAPED;
      this._stateScriptDataDoubleEscaped(cp);
    }
  }
  // Before attribute name state
  //------------------------------------------------------------------
  _stateBeforeAttributeName(cp) {
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.SOLIDUS:
      case CODE_POINTS.GREATER_THAN_SIGN:
      case CODE_POINTS.EOF: {
        this.state = State$1.AFTER_ATTRIBUTE_NAME;
        this._stateAfterAttributeName(cp);
        break;
      }
      case CODE_POINTS.EQUALS_SIGN: {
        this._err(ERR.unexpectedEqualsSignBeforeAttributeName);
        this._createAttr("=");
        this.state = State$1.ATTRIBUTE_NAME;
        break;
      }
      default: {
        this._createAttr("");
        this.state = State$1.ATTRIBUTE_NAME;
        this._stateAttributeName(cp);
      }
    }
  }
  // Attribute name state
  //------------------------------------------------------------------
  _stateAttributeName(cp) {
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED:
      case CODE_POINTS.SOLIDUS:
      case CODE_POINTS.GREATER_THAN_SIGN:
      case CODE_POINTS.EOF: {
        this._leaveAttrName();
        this.state = State$1.AFTER_ATTRIBUTE_NAME;
        this._stateAfterAttributeName(cp);
        break;
      }
      case CODE_POINTS.EQUALS_SIGN: {
        this._leaveAttrName();
        this.state = State$1.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case CODE_POINTS.QUOTATION_MARK:
      case CODE_POINTS.APOSTROPHE:
      case CODE_POINTS.LESS_THAN_SIGN: {
        this._err(ERR.unexpectedCharacterInAttributeName);
        this.currentAttr.name += String.fromCodePoint(cp);
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.currentAttr.name += REPLACEMENT_CHARACTER;
        break;
      }
      default: {
        this.currentAttr.name += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
      }
    }
  }
  // After attribute name state
  //------------------------------------------------------------------
  _stateAfterAttributeName(cp) {
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.SOLIDUS: {
        this.state = State$1.SELF_CLOSING_START_TAG;
        break;
      }
      case CODE_POINTS.EQUALS_SIGN: {
        this.state = State$1.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State$1.DATA;
        this.emitCurrentTagToken();
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag);
        this._emitEOFToken();
        break;
      }
      default: {
        this._createAttr("");
        this.state = State$1.ATTRIBUTE_NAME;
        this._stateAttributeName(cp);
      }
    }
  }
  // Before attribute value state
  //------------------------------------------------------------------
  _stateBeforeAttributeValue(cp) {
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        this.state = State$1.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        this.state = State$1.ATTRIBUTE_VALUE_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.missingAttributeValue);
        this.state = State$1.DATA;
        this.emitCurrentTagToken();
        break;
      }
      default: {
        this.state = State$1.ATTRIBUTE_VALUE_UNQUOTED;
        this._stateAttributeValueUnquoted(cp);
      }
    }
  }
  // Attribute value (double-quoted) state
  //------------------------------------------------------------------
  _stateAttributeValueDoubleQuoted(cp) {
    switch (cp) {
      case CODE_POINTS.QUOTATION_MARK: {
        this.state = State$1.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case CODE_POINTS.AMPERSAND: {
        this.returnState = State$1.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
        this.state = State$1.CHARACTER_REFERENCE;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.currentAttr.value += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag);
        this._emitEOFToken();
        break;
      }
      default: {
        this.currentAttr.value += String.fromCodePoint(cp);
      }
    }
  }
  // Attribute value (single-quoted) state
  //------------------------------------------------------------------
  _stateAttributeValueSingleQuoted(cp) {
    switch (cp) {
      case CODE_POINTS.APOSTROPHE: {
        this.state = State$1.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case CODE_POINTS.AMPERSAND: {
        this.returnState = State$1.ATTRIBUTE_VALUE_SINGLE_QUOTED;
        this.state = State$1.CHARACTER_REFERENCE;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.currentAttr.value += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag);
        this._emitEOFToken();
        break;
      }
      default: {
        this.currentAttr.value += String.fromCodePoint(cp);
      }
    }
  }
  // Attribute value (unquoted) state
  //------------------------------------------------------------------
  _stateAttributeValueUnquoted(cp) {
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this._leaveAttrValue();
        this.state = State$1.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case CODE_POINTS.AMPERSAND: {
        this.returnState = State$1.ATTRIBUTE_VALUE_UNQUOTED;
        this.state = State$1.CHARACTER_REFERENCE;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._leaveAttrValue();
        this.state = State$1.DATA;
        this.emitCurrentTagToken();
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.currentAttr.value += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.QUOTATION_MARK:
      case CODE_POINTS.APOSTROPHE:
      case CODE_POINTS.LESS_THAN_SIGN:
      case CODE_POINTS.EQUALS_SIGN:
      case CODE_POINTS.GRAVE_ACCENT: {
        this._err(ERR.unexpectedCharacterInUnquotedAttributeValue);
        this.currentAttr.value += String.fromCodePoint(cp);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag);
        this._emitEOFToken();
        break;
      }
      default: {
        this.currentAttr.value += String.fromCodePoint(cp);
      }
    }
  }
  // After attribute value (quoted) state
  //------------------------------------------------------------------
  _stateAfterAttributeValueQuoted(cp) {
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this._leaveAttrValue();
        this.state = State$1.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case CODE_POINTS.SOLIDUS: {
        this._leaveAttrValue();
        this.state = State$1.SELF_CLOSING_START_TAG;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._leaveAttrValue();
        this.state = State$1.DATA;
        this.emitCurrentTagToken();
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingWhitespaceBetweenAttributes);
        this.state = State$1.BEFORE_ATTRIBUTE_NAME;
        this._stateBeforeAttributeName(cp);
      }
    }
  }
  // Self-closing start tag state
  //------------------------------------------------------------------
  _stateSelfClosingStartTag(cp) {
    switch (cp) {
      case CODE_POINTS.GREATER_THAN_SIGN: {
        const token = this.currentToken;
        token.selfClosing = true;
        this.state = State$1.DATA;
        this.emitCurrentTagToken();
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.unexpectedSolidusInTag);
        this.state = State$1.BEFORE_ATTRIBUTE_NAME;
        this._stateBeforeAttributeName(cp);
      }
    }
  }
  // Bogus comment state
  //------------------------------------------------------------------
  _stateBogusComment(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State$1.DATA;
        this.emitCurrentComment(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this.emitCurrentComment(token);
        this._emitEOFToken();
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token.data += REPLACEMENT_CHARACTER;
        break;
      }
      default: {
        token.data += String.fromCodePoint(cp);
      }
    }
  }
  // Markup declaration open state
  //------------------------------------------------------------------
  _stateMarkupDeclarationOpen(cp) {
    if (this._consumeSequenceIfMatch(SEQUENCES.DASH_DASH, true)) {
      this._createCommentToken(SEQUENCES.DASH_DASH.length + 1);
      this.state = State$1.COMMENT_START;
    } else if (this._consumeSequenceIfMatch(SEQUENCES.DOCTYPE, false)) {
      this.currentLocation = this.getCurrentLocation(SEQUENCES.DOCTYPE.length + 1);
      this.state = State$1.DOCTYPE;
    } else if (this._consumeSequenceIfMatch(SEQUENCES.CDATA_START, true)) {
      if (this.inForeignNode) {
        this.state = State$1.CDATA_SECTION;
      } else {
        this._err(ERR.cdataInHtmlContent);
        this._createCommentToken(SEQUENCES.CDATA_START.length + 1);
        this.currentToken.data = "[CDATA[";
        this.state = State$1.BOGUS_COMMENT;
      }
    } else if (!this._ensureHibernation()) {
      this._err(ERR.incorrectlyOpenedComment);
      this._createCommentToken(2);
      this.state = State$1.BOGUS_COMMENT;
      this._stateBogusComment(cp);
    }
  }
  // Comment start state
  //------------------------------------------------------------------
  _stateCommentStart(cp) {
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State$1.COMMENT_START_DASH;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.abruptClosingOfEmptyComment);
        this.state = State$1.DATA;
        const token = this.currentToken;
        this.emitCurrentComment(token);
        break;
      }
      default: {
        this.state = State$1.COMMENT;
        this._stateComment(cp);
      }
    }
  }
  // Comment start dash state
  //------------------------------------------------------------------
  _stateCommentStartDash(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State$1.COMMENT_END;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.abruptClosingOfEmptyComment);
        this.state = State$1.DATA;
        this.emitCurrentComment(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInComment);
        this.emitCurrentComment(token);
        this._emitEOFToken();
        break;
      }
      default: {
        token.data += "-";
        this.state = State$1.COMMENT;
        this._stateComment(cp);
      }
    }
  }
  // Comment state
  //------------------------------------------------------------------
  _stateComment(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State$1.COMMENT_END_DASH;
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        token.data += "<";
        this.state = State$1.COMMENT_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token.data += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInComment);
        this.emitCurrentComment(token);
        this._emitEOFToken();
        break;
      }
      default: {
        token.data += String.fromCodePoint(cp);
      }
    }
  }
  // Comment less-than sign state
  //------------------------------------------------------------------
  _stateCommentLessThanSign(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.EXCLAMATION_MARK: {
        token.data += "!";
        this.state = State$1.COMMENT_LESS_THAN_SIGN_BANG;
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        token.data += "<";
        break;
      }
      default: {
        this.state = State$1.COMMENT;
        this._stateComment(cp);
      }
    }
  }
  // Comment less-than sign bang state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBang(cp) {
    if (cp === CODE_POINTS.HYPHEN_MINUS) {
      this.state = State$1.COMMENT_LESS_THAN_SIGN_BANG_DASH;
    } else {
      this.state = State$1.COMMENT;
      this._stateComment(cp);
    }
  }
  // Comment less-than sign bang dash state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBangDash(cp) {
    if (cp === CODE_POINTS.HYPHEN_MINUS) {
      this.state = State$1.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH;
    } else {
      this.state = State$1.COMMENT_END_DASH;
      this._stateCommentEndDash(cp);
    }
  }
  // Comment less-than sign bang dash dash state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBangDashDash(cp) {
    if (cp !== CODE_POINTS.GREATER_THAN_SIGN && cp !== CODE_POINTS.EOF) {
      this._err(ERR.nestedComment);
    }
    this.state = State$1.COMMENT_END;
    this._stateCommentEnd(cp);
  }
  // Comment end dash state
  //------------------------------------------------------------------
  _stateCommentEndDash(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State$1.COMMENT_END;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInComment);
        this.emitCurrentComment(token);
        this._emitEOFToken();
        break;
      }
      default: {
        token.data += "-";
        this.state = State$1.COMMENT;
        this._stateComment(cp);
      }
    }
  }
  // Comment end state
  //------------------------------------------------------------------
  _stateCommentEnd(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State$1.DATA;
        this.emitCurrentComment(token);
        break;
      }
      case CODE_POINTS.EXCLAMATION_MARK: {
        this.state = State$1.COMMENT_END_BANG;
        break;
      }
      case CODE_POINTS.HYPHEN_MINUS: {
        token.data += "-";
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInComment);
        this.emitCurrentComment(token);
        this._emitEOFToken();
        break;
      }
      default: {
        token.data += "--";
        this.state = State$1.COMMENT;
        this._stateComment(cp);
      }
    }
  }
  // Comment end bang state
  //------------------------------------------------------------------
  _stateCommentEndBang(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        token.data += "--!";
        this.state = State$1.COMMENT_END_DASH;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.incorrectlyClosedComment);
        this.state = State$1.DATA;
        this.emitCurrentComment(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInComment);
        this.emitCurrentComment(token);
        this._emitEOFToken();
        break;
      }
      default: {
        token.data += "--!";
        this.state = State$1.COMMENT;
        this._stateComment(cp);
      }
    }
  }
  // DOCTYPE state
  //------------------------------------------------------------------
  _stateDoctype(cp) {
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this.state = State$1.BEFORE_DOCTYPE_NAME;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State$1.BEFORE_DOCTYPE_NAME;
        this._stateBeforeDoctypeName(cp);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        this._createDoctypeToken(null);
        const token = this.currentToken;
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingWhitespaceBeforeDoctypeName);
        this.state = State$1.BEFORE_DOCTYPE_NAME;
        this._stateBeforeDoctypeName(cp);
      }
    }
  }
  // Before DOCTYPE name state
  //------------------------------------------------------------------
  _stateBeforeDoctypeName(cp) {
    if (isAsciiUpper(cp)) {
      this._createDoctypeToken(String.fromCharCode(toAsciiLower(cp)));
      this.state = State$1.DOCTYPE_NAME;
    } else
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this._createDoctypeToken(REPLACEMENT_CHARACTER);
          this.state = State$1.DOCTYPE_NAME;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.missingDoctypeName);
          this._createDoctypeToken(null);
          const token = this.currentToken;
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this.state = State$1.DATA;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          this._createDoctypeToken(null);
          const token = this.currentToken;
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          this._createDoctypeToken(String.fromCodePoint(cp));
          this.state = State$1.DOCTYPE_NAME;
        }
      }
  }
  // DOCTYPE name state
  //------------------------------------------------------------------
  _stateDoctypeName(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this.state = State$1.AFTER_DOCTYPE_NAME;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State$1.DATA;
        this.emitCurrentDoctype(token);
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token.name += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        token.name += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
      }
    }
  }
  // After DOCTYPE name state
  //------------------------------------------------------------------
  _stateAfterDoctypeName(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State$1.DATA;
        this.emitCurrentDoctype(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        if (this._consumeSequenceIfMatch(SEQUENCES.PUBLIC, false)) {
          this.state = State$1.AFTER_DOCTYPE_PUBLIC_KEYWORD;
        } else if (this._consumeSequenceIfMatch(SEQUENCES.SYSTEM, false)) {
          this.state = State$1.AFTER_DOCTYPE_SYSTEM_KEYWORD;
        } else if (!this._ensureHibernation()) {
          this._err(ERR.invalidCharacterSequenceAfterDoctypeName);
          token.forceQuirks = true;
          this.state = State$1.BOGUS_DOCTYPE;
          this._stateBogusDoctype(cp);
        }
      }
    }
  }
  // After DOCTYPE public keyword state
  //------------------------------------------------------------------
  _stateAfterDoctypePublicKeyword(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this.state = State$1.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        this._err(ERR.missingWhitespaceAfterDoctypePublicKeyword);
        token.publicId = "";
        this.state = State$1.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        this._err(ERR.missingWhitespaceAfterDoctypePublicKeyword);
        token.publicId = "";
        this.state = State$1.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.missingDoctypePublicIdentifier);
        token.forceQuirks = true;
        this.state = State$1.DATA;
        this.emitCurrentDoctype(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingQuoteBeforeDoctypePublicIdentifier);
        token.forceQuirks = true;
        this.state = State$1.BOGUS_DOCTYPE;
        this._stateBogusDoctype(cp);
      }
    }
  }
  // Before DOCTYPE public identifier state
  //------------------------------------------------------------------
  _stateBeforeDoctypePublicIdentifier(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        token.publicId = "";
        this.state = State$1.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        token.publicId = "";
        this.state = State$1.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.missingDoctypePublicIdentifier);
        token.forceQuirks = true;
        this.state = State$1.DATA;
        this.emitCurrentDoctype(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingQuoteBeforeDoctypePublicIdentifier);
        token.forceQuirks = true;
        this.state = State$1.BOGUS_DOCTYPE;
        this._stateBogusDoctype(cp);
      }
    }
  }
  // DOCTYPE public identifier (double-quoted) state
  //------------------------------------------------------------------
  _stateDoctypePublicIdentifierDoubleQuoted(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.QUOTATION_MARK: {
        this.state = State$1.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token.publicId += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.abruptDoctypePublicIdentifier);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this.state = State$1.DATA;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        token.publicId += String.fromCodePoint(cp);
      }
    }
  }
  // DOCTYPE public identifier (single-quoted) state
  //------------------------------------------------------------------
  _stateDoctypePublicIdentifierSingleQuoted(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.APOSTROPHE: {
        this.state = State$1.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token.publicId += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.abruptDoctypePublicIdentifier);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this.state = State$1.DATA;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        token.publicId += String.fromCodePoint(cp);
      }
    }
  }
  // After DOCTYPE public identifier state
  //------------------------------------------------------------------
  _stateAfterDoctypePublicIdentifier(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this.state = State$1.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State$1.DATA;
        this.emitCurrentDoctype(token);
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        this._err(ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);
        token.systemId = "";
        this.state = State$1.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        this._err(ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);
        token.systemId = "";
        this.state = State$1.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
        token.forceQuirks = true;
        this.state = State$1.BOGUS_DOCTYPE;
        this._stateBogusDoctype(cp);
      }
    }
  }
  // Between DOCTYPE public and system identifiers state
  //------------------------------------------------------------------
  _stateBetweenDoctypePublicAndSystemIdentifiers(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(token);
        this.state = State$1.DATA;
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        token.systemId = "";
        this.state = State$1.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        token.systemId = "";
        this.state = State$1.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
        token.forceQuirks = true;
        this.state = State$1.BOGUS_DOCTYPE;
        this._stateBogusDoctype(cp);
      }
    }
  }
  // After DOCTYPE system keyword state
  //------------------------------------------------------------------
  _stateAfterDoctypeSystemKeyword(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this.state = State$1.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        this._err(ERR.missingWhitespaceAfterDoctypeSystemKeyword);
        token.systemId = "";
        this.state = State$1.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        this._err(ERR.missingWhitespaceAfterDoctypeSystemKeyword);
        token.systemId = "";
        this.state = State$1.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.missingDoctypeSystemIdentifier);
        token.forceQuirks = true;
        this.state = State$1.DATA;
        this.emitCurrentDoctype(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
        token.forceQuirks = true;
        this.state = State$1.BOGUS_DOCTYPE;
        this._stateBogusDoctype(cp);
      }
    }
  }
  // Before DOCTYPE system identifier state
  //------------------------------------------------------------------
  _stateBeforeDoctypeSystemIdentifier(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        token.systemId = "";
        this.state = State$1.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        token.systemId = "";
        this.state = State$1.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.missingDoctypeSystemIdentifier);
        token.forceQuirks = true;
        this.state = State$1.DATA;
        this.emitCurrentDoctype(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
        token.forceQuirks = true;
        this.state = State$1.BOGUS_DOCTYPE;
        this._stateBogusDoctype(cp);
      }
    }
  }
  // DOCTYPE system identifier (double-quoted) state
  //------------------------------------------------------------------
  _stateDoctypeSystemIdentifierDoubleQuoted(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.QUOTATION_MARK: {
        this.state = State$1.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token.systemId += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.abruptDoctypeSystemIdentifier);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this.state = State$1.DATA;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        token.systemId += String.fromCodePoint(cp);
      }
    }
  }
  // DOCTYPE system identifier (single-quoted) state
  //------------------------------------------------------------------
  _stateDoctypeSystemIdentifierSingleQuoted(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.APOSTROPHE: {
        this.state = State$1.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token.systemId += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.abruptDoctypeSystemIdentifier);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this.state = State$1.DATA;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        token.systemId += String.fromCodePoint(cp);
      }
    }
  }
  // After DOCTYPE system identifier state
  //------------------------------------------------------------------
  _stateAfterDoctypeSystemIdentifier(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(token);
        this.state = State$1.DATA;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.unexpectedCharacterAfterDoctypeSystemIdentifier);
        this.state = State$1.BOGUS_DOCTYPE;
        this._stateBogusDoctype(cp);
      }
    }
  }
  // Bogus DOCTYPE state
  //------------------------------------------------------------------
  _stateBogusDoctype(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(token);
        this.state = State$1.DATA;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        break;
      }
      case CODE_POINTS.EOF: {
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
    }
  }
  // CDATA section state
  //------------------------------------------------------------------
  _stateCdataSection(cp) {
    switch (cp) {
      case CODE_POINTS.RIGHT_SQUARE_BRACKET: {
        this.state = State$1.CDATA_SECTION_BRACKET;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInCdata);
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp);
      }
    }
  }
  // CDATA section bracket state
  //------------------------------------------------------------------
  _stateCdataSectionBracket(cp) {
    if (cp === CODE_POINTS.RIGHT_SQUARE_BRACKET) {
      this.state = State$1.CDATA_SECTION_END;
    } else {
      this._emitChars("]");
      this.state = State$1.CDATA_SECTION;
      this._stateCdataSection(cp);
    }
  }
  // CDATA section end state
  //------------------------------------------------------------------
  _stateCdataSectionEnd(cp) {
    switch (cp) {
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State$1.DATA;
        break;
      }
      case CODE_POINTS.RIGHT_SQUARE_BRACKET: {
        this._emitChars("]");
        break;
      }
      default: {
        this._emitChars("]]");
        this.state = State$1.CDATA_SECTION;
        this._stateCdataSection(cp);
      }
    }
  }
  // Character reference state
  //------------------------------------------------------------------
  _stateCharacterReference(cp) {
    if (cp === CODE_POINTS.NUMBER_SIGN) {
      this.state = State$1.NUMERIC_CHARACTER_REFERENCE;
    } else if (isAsciiAlphaNumeric(cp)) {
      this.state = State$1.NAMED_CHARACTER_REFERENCE;
      this._stateNamedCharacterReference(cp);
    } else {
      this._flushCodePointConsumedAsCharacterReference(CODE_POINTS.AMPERSAND);
      this._reconsumeInState(this.returnState, cp);
    }
  }
  // Named character reference state
  //------------------------------------------------------------------
  _stateNamedCharacterReference(cp) {
    const matchResult = this._matchNamedCharacterReference(cp);
    if (this._ensureHibernation())
      ;
    else if (matchResult) {
      for (let i = 0; i < matchResult.length; i++) {
        this._flushCodePointConsumedAsCharacterReference(matchResult[i]);
      }
      this.state = this.returnState;
    } else {
      this._flushCodePointConsumedAsCharacterReference(CODE_POINTS.AMPERSAND);
      this.state = State$1.AMBIGUOUS_AMPERSAND;
    }
  }
  // Ambiguos ampersand state
  //------------------------------------------------------------------
  _stateAmbiguousAmpersand(cp) {
    if (isAsciiAlphaNumeric(cp)) {
      this._flushCodePointConsumedAsCharacterReference(cp);
    } else {
      if (cp === CODE_POINTS.SEMICOLON) {
        this._err(ERR.unknownNamedCharacterReference);
      }
      this._reconsumeInState(this.returnState, cp);
    }
  }
  // Numeric character reference state
  //------------------------------------------------------------------
  _stateNumericCharacterReference(cp) {
    this.charRefCode = 0;
    if (cp === CODE_POINTS.LATIN_SMALL_X || cp === CODE_POINTS.LATIN_CAPITAL_X) {
      this.state = State$1.HEXADEMICAL_CHARACTER_REFERENCE_START;
    } else if (isAsciiDigit(cp)) {
      this.state = State$1.DECIMAL_CHARACTER_REFERENCE;
      this._stateDecimalCharacterReference(cp);
    } else {
      this._err(ERR.absenceOfDigitsInNumericCharacterReference);
      this._flushCodePointConsumedAsCharacterReference(CODE_POINTS.AMPERSAND);
      this._flushCodePointConsumedAsCharacterReference(CODE_POINTS.NUMBER_SIGN);
      this._reconsumeInState(this.returnState, cp);
    }
  }
  // Hexademical character reference start state
  //------------------------------------------------------------------
  _stateHexademicalCharacterReferenceStart(cp) {
    if (isAsciiHexDigit(cp)) {
      this.state = State$1.HEXADEMICAL_CHARACTER_REFERENCE;
      this._stateHexademicalCharacterReference(cp);
    } else {
      this._err(ERR.absenceOfDigitsInNumericCharacterReference);
      this._flushCodePointConsumedAsCharacterReference(CODE_POINTS.AMPERSAND);
      this._flushCodePointConsumedAsCharacterReference(CODE_POINTS.NUMBER_SIGN);
      this._unconsume(2);
      this.state = this.returnState;
    }
  }
  // Hexademical character reference state
  //------------------------------------------------------------------
  _stateHexademicalCharacterReference(cp) {
    if (isAsciiUpperHexDigit(cp)) {
      this.charRefCode = this.charRefCode * 16 + cp - 55;
    } else if (isAsciiLowerHexDigit(cp)) {
      this.charRefCode = this.charRefCode * 16 + cp - 87;
    } else if (isAsciiDigit(cp)) {
      this.charRefCode = this.charRefCode * 16 + cp - 48;
    } else if (cp === CODE_POINTS.SEMICOLON) {
      this.state = State$1.NUMERIC_CHARACTER_REFERENCE_END;
    } else {
      this._err(ERR.missingSemicolonAfterCharacterReference);
      this.state = State$1.NUMERIC_CHARACTER_REFERENCE_END;
      this._stateNumericCharacterReferenceEnd(cp);
    }
  }
  // Decimal character reference state
  //------------------------------------------------------------------
  _stateDecimalCharacterReference(cp) {
    if (isAsciiDigit(cp)) {
      this.charRefCode = this.charRefCode * 10 + cp - 48;
    } else if (cp === CODE_POINTS.SEMICOLON) {
      this.state = State$1.NUMERIC_CHARACTER_REFERENCE_END;
    } else {
      this._err(ERR.missingSemicolonAfterCharacterReference);
      this.state = State$1.NUMERIC_CHARACTER_REFERENCE_END;
      this._stateNumericCharacterReferenceEnd(cp);
    }
  }
  // Numeric character reference end state
  //------------------------------------------------------------------
  _stateNumericCharacterReferenceEnd(cp) {
    if (this.charRefCode === CODE_POINTS.NULL) {
      this._err(ERR.nullCharacterReference);
      this.charRefCode = CODE_POINTS.REPLACEMENT_CHARACTER;
    } else if (this.charRefCode > 1114111) {
      this._err(ERR.characterReferenceOutsideUnicodeRange);
      this.charRefCode = CODE_POINTS.REPLACEMENT_CHARACTER;
    } else if (isSurrogate(this.charRefCode)) {
      this._err(ERR.surrogateCharacterReference);
      this.charRefCode = CODE_POINTS.REPLACEMENT_CHARACTER;
    } else if (isUndefinedCodePoint(this.charRefCode)) {
      this._err(ERR.noncharacterCharacterReference);
    } else if (isControlCodePoint(this.charRefCode) || this.charRefCode === CODE_POINTS.CARRIAGE_RETURN) {
      this._err(ERR.controlCharacterReference);
      const replacement = C1_CONTROLS_REFERENCE_REPLACEMENTS.get(this.charRefCode);
      if (replacement !== void 0) {
        this.charRefCode = replacement;
      }
    }
    this._flushCodePointConsumedAsCharacterReference(this.charRefCode);
    this._reconsumeInState(this.returnState, cp);
  }
};
const IMPLICIT_END_TAG_REQUIRED = /* @__PURE__ */ new Set([TAG_ID.DD, TAG_ID.DT, TAG_ID.LI, TAG_ID.OPTGROUP, TAG_ID.OPTION, TAG_ID.P, TAG_ID.RB, TAG_ID.RP, TAG_ID.RT, TAG_ID.RTC]);
const IMPLICIT_END_TAG_REQUIRED_THOROUGHLY = /* @__PURE__ */ new Set([
  ...IMPLICIT_END_TAG_REQUIRED,
  TAG_ID.CAPTION,
  TAG_ID.COLGROUP,
  TAG_ID.TBODY,
  TAG_ID.TD,
  TAG_ID.TFOOT,
  TAG_ID.TH,
  TAG_ID.THEAD,
  TAG_ID.TR
]);
const SCOPING_ELEMENT_NS = /* @__PURE__ */ new Map([
  [TAG_ID.APPLET, NS.HTML],
  [TAG_ID.CAPTION, NS.HTML],
  [TAG_ID.HTML, NS.HTML],
  [TAG_ID.MARQUEE, NS.HTML],
  [TAG_ID.OBJECT, NS.HTML],
  [TAG_ID.TABLE, NS.HTML],
  [TAG_ID.TD, NS.HTML],
  [TAG_ID.TEMPLATE, NS.HTML],
  [TAG_ID.TH, NS.HTML],
  [TAG_ID.ANNOTATION_XML, NS.MATHML],
  [TAG_ID.MI, NS.MATHML],
  [TAG_ID.MN, NS.MATHML],
  [TAG_ID.MO, NS.MATHML],
  [TAG_ID.MS, NS.MATHML],
  [TAG_ID.MTEXT, NS.MATHML],
  [TAG_ID.DESC, NS.SVG],
  [TAG_ID.FOREIGN_OBJECT, NS.SVG],
  [TAG_ID.TITLE, NS.SVG]
]);
const NAMED_HEADERS = [TAG_ID.H1, TAG_ID.H2, TAG_ID.H3, TAG_ID.H4, TAG_ID.H5, TAG_ID.H6];
const TABLE_ROW_CONTEXT = [TAG_ID.TR, TAG_ID.TEMPLATE, TAG_ID.HTML];
const TABLE_BODY_CONTEXT = [TAG_ID.TBODY, TAG_ID.TFOOT, TAG_ID.THEAD, TAG_ID.TEMPLATE, TAG_ID.HTML];
const TABLE_CONTEXT = [TAG_ID.TABLE, TAG_ID.TEMPLATE, TAG_ID.HTML];
const TABLE_CELLS = [TAG_ID.TD, TAG_ID.TH];
class OpenElementStack {
  get currentTmplContentOrNode() {
    return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current;
  }
  constructor(document, treeAdapter, handler) {
    this.treeAdapter = treeAdapter;
    this.handler = handler;
    this.items = [];
    this.tagIDs = [];
    this.stackTop = -1;
    this.tmplCount = 0;
    this.currentTagId = TAG_ID.UNKNOWN;
    this.current = document;
  }
  //Index of element
  _indexOf(element) {
    return this.items.lastIndexOf(element, this.stackTop);
  }
  //Update current element
  _isInTemplate() {
    return this.currentTagId === TAG_ID.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === NS.HTML;
  }
  _updateCurrentElement() {
    this.current = this.items[this.stackTop];
    this.currentTagId = this.tagIDs[this.stackTop];
  }
  //Mutations
  push(element, tagID) {
    this.stackTop++;
    this.items[this.stackTop] = element;
    this.current = element;
    this.tagIDs[this.stackTop] = tagID;
    this.currentTagId = tagID;
    if (this._isInTemplate()) {
      this.tmplCount++;
    }
    this.handler.onItemPush(element, tagID, true);
  }
  pop() {
    const popped = this.current;
    if (this.tmplCount > 0 && this._isInTemplate()) {
      this.tmplCount--;
    }
    this.stackTop--;
    this._updateCurrentElement();
    this.handler.onItemPop(popped, true);
  }
  replace(oldElement, newElement) {
    const idx = this._indexOf(oldElement);
    this.items[idx] = newElement;
    if (idx === this.stackTop) {
      this.current = newElement;
    }
  }
  insertAfter(referenceElement, newElement, newElementID) {
    const insertionIdx = this._indexOf(referenceElement) + 1;
    this.items.splice(insertionIdx, 0, newElement);
    this.tagIDs.splice(insertionIdx, 0, newElementID);
    this.stackTop++;
    if (insertionIdx === this.stackTop) {
      this._updateCurrentElement();
    }
    this.handler.onItemPush(this.current, this.currentTagId, insertionIdx === this.stackTop);
  }
  popUntilTagNamePopped(tagName) {
    let targetIdx = this.stackTop + 1;
    do {
      targetIdx = this.tagIDs.lastIndexOf(tagName, targetIdx - 1);
    } while (targetIdx > 0 && this.treeAdapter.getNamespaceURI(this.items[targetIdx]) !== NS.HTML);
    this.shortenToLength(targetIdx < 0 ? 0 : targetIdx);
  }
  shortenToLength(idx) {
    while (this.stackTop >= idx) {
      const popped = this.current;
      if (this.tmplCount > 0 && this._isInTemplate()) {
        this.tmplCount -= 1;
      }
      this.stackTop--;
      this._updateCurrentElement();
      this.handler.onItemPop(popped, this.stackTop < idx);
    }
  }
  popUntilElementPopped(element) {
    const idx = this._indexOf(element);
    this.shortenToLength(idx < 0 ? 0 : idx);
  }
  popUntilPopped(tagNames, targetNS) {
    const idx = this._indexOfTagNames(tagNames, targetNS);
    this.shortenToLength(idx < 0 ? 0 : idx);
  }
  popUntilNumberedHeaderPopped() {
    this.popUntilPopped(NAMED_HEADERS, NS.HTML);
  }
  popUntilTableCellPopped() {
    this.popUntilPopped(TABLE_CELLS, NS.HTML);
  }
  popAllUpToHtmlElement() {
    this.tmplCount = 0;
    this.shortenToLength(1);
  }
  _indexOfTagNames(tagNames, namespace) {
    for (let i = this.stackTop; i >= 0; i--) {
      if (tagNames.includes(this.tagIDs[i]) && this.treeAdapter.getNamespaceURI(this.items[i]) === namespace) {
        return i;
      }
    }
    return -1;
  }
  clearBackTo(tagNames, targetNS) {
    const idx = this._indexOfTagNames(tagNames, targetNS);
    this.shortenToLength(idx + 1);
  }
  clearBackToTableContext() {
    this.clearBackTo(TABLE_CONTEXT, NS.HTML);
  }
  clearBackToTableBodyContext() {
    this.clearBackTo(TABLE_BODY_CONTEXT, NS.HTML);
  }
  clearBackToTableRowContext() {
    this.clearBackTo(TABLE_ROW_CONTEXT, NS.HTML);
  }
  remove(element) {
    const idx = this._indexOf(element);
    if (idx >= 0) {
      if (idx === this.stackTop) {
        this.pop();
      } else {
        this.items.splice(idx, 1);
        this.tagIDs.splice(idx, 1);
        this.stackTop--;
        this._updateCurrentElement();
        this.handler.onItemPop(element, false);
      }
    }
  }
  //Search
  tryPeekProperlyNestedBodyElement() {
    return this.stackTop >= 1 && this.tagIDs[1] === TAG_ID.BODY ? this.items[1] : null;
  }
  contains(element) {
    return this._indexOf(element) > -1;
  }
  getCommonAncestor(element) {
    const elementIdx = this._indexOf(element) - 1;
    return elementIdx >= 0 ? this.items[elementIdx] : null;
  }
  isRootHtmlElementCurrent() {
    return this.stackTop === 0 && this.tagIDs[0] === TAG_ID.HTML;
  }
  //Element in scope
  hasInScope(tagName) {
    for (let i = this.stackTop; i >= 0; i--) {
      const tn = this.tagIDs[i];
      const ns = this.treeAdapter.getNamespaceURI(this.items[i]);
      if (tn === tagName && ns === NS.HTML) {
        return true;
      }
      if (SCOPING_ELEMENT_NS.get(tn) === ns) {
        return false;
      }
    }
    return true;
  }
  hasNumberedHeaderInScope() {
    for (let i = this.stackTop; i >= 0; i--) {
      const tn = this.tagIDs[i];
      const ns = this.treeAdapter.getNamespaceURI(this.items[i]);
      if (isNumberedHeader(tn) && ns === NS.HTML) {
        return true;
      }
      if (SCOPING_ELEMENT_NS.get(tn) === ns) {
        return false;
      }
    }
    return true;
  }
  hasInListItemScope(tagName) {
    for (let i = this.stackTop; i >= 0; i--) {
      const tn = this.tagIDs[i];
      const ns = this.treeAdapter.getNamespaceURI(this.items[i]);
      if (tn === tagName && ns === NS.HTML) {
        return true;
      }
      if ((tn === TAG_ID.UL || tn === TAG_ID.OL) && ns === NS.HTML || SCOPING_ELEMENT_NS.get(tn) === ns) {
        return false;
      }
    }
    return true;
  }
  hasInButtonScope(tagName) {
    for (let i = this.stackTop; i >= 0; i--) {
      const tn = this.tagIDs[i];
      const ns = this.treeAdapter.getNamespaceURI(this.items[i]);
      if (tn === tagName && ns === NS.HTML) {
        return true;
      }
      if (tn === TAG_ID.BUTTON && ns === NS.HTML || SCOPING_ELEMENT_NS.get(tn) === ns) {
        return false;
      }
    }
    return true;
  }
  hasInTableScope(tagName) {
    for (let i = this.stackTop; i >= 0; i--) {
      const tn = this.tagIDs[i];
      const ns = this.treeAdapter.getNamespaceURI(this.items[i]);
      if (ns !== NS.HTML) {
        continue;
      }
      if (tn === tagName) {
        return true;
      }
      if (tn === TAG_ID.TABLE || tn === TAG_ID.TEMPLATE || tn === TAG_ID.HTML) {
        return false;
      }
    }
    return true;
  }
  hasTableBodyContextInTableScope() {
    for (let i = this.stackTop; i >= 0; i--) {
      const tn = this.tagIDs[i];
      const ns = this.treeAdapter.getNamespaceURI(this.items[i]);
      if (ns !== NS.HTML) {
        continue;
      }
      if (tn === TAG_ID.TBODY || tn === TAG_ID.THEAD || tn === TAG_ID.TFOOT) {
        return true;
      }
      if (tn === TAG_ID.TABLE || tn === TAG_ID.HTML) {
        return false;
      }
    }
    return true;
  }
  hasInSelectScope(tagName) {
    for (let i = this.stackTop; i >= 0; i--) {
      const tn = this.tagIDs[i];
      const ns = this.treeAdapter.getNamespaceURI(this.items[i]);
      if (ns !== NS.HTML) {
        continue;
      }
      if (tn === tagName) {
        return true;
      }
      if (tn !== TAG_ID.OPTION && tn !== TAG_ID.OPTGROUP) {
        return false;
      }
    }
    return true;
  }
  //Implied end tags
  generateImpliedEndTags() {
    while (IMPLICIT_END_TAG_REQUIRED.has(this.currentTagId)) {
      this.pop();
    }
  }
  generateImpliedEndTagsThoroughly() {
    while (IMPLICIT_END_TAG_REQUIRED_THOROUGHLY.has(this.currentTagId)) {
      this.pop();
    }
  }
  generateImpliedEndTagsWithExclusion(exclusionId) {
    while (this.currentTagId !== exclusionId && IMPLICIT_END_TAG_REQUIRED_THOROUGHLY.has(this.currentTagId)) {
      this.pop();
    }
  }
}
const NOAH_ARK_CAPACITY = 3;
var EntryType;
(function(EntryType2) {
  EntryType2[EntryType2["Marker"] = 0] = "Marker";
  EntryType2[EntryType2["Element"] = 1] = "Element";
})(EntryType = EntryType || (EntryType = {}));
const MARKER = { type: EntryType.Marker };
class FormattingElementList {
  constructor(treeAdapter) {
    this.treeAdapter = treeAdapter;
    this.entries = [];
    this.bookmark = null;
  }
  //Noah Ark's condition
  //OPTIMIZATION: at first we try to find possible candidates for exclusion using
  //lightweight heuristics without thorough attributes check.
  _getNoahArkConditionCandidates(newElement, neAttrs) {
    const candidates = [];
    const neAttrsLength = neAttrs.length;
    const neTagName = this.treeAdapter.getTagName(newElement);
    const neNamespaceURI = this.treeAdapter.getNamespaceURI(newElement);
    for (let i = 0; i < this.entries.length; i++) {
      const entry = this.entries[i];
      if (entry.type === EntryType.Marker) {
        break;
      }
      const { element } = entry;
      if (this.treeAdapter.getTagName(element) === neTagName && this.treeAdapter.getNamespaceURI(element) === neNamespaceURI) {
        const elementAttrs = this.treeAdapter.getAttrList(element);
        if (elementAttrs.length === neAttrsLength) {
          candidates.push({ idx: i, attrs: elementAttrs });
        }
      }
    }
    return candidates;
  }
  _ensureNoahArkCondition(newElement) {
    if (this.entries.length < NOAH_ARK_CAPACITY)
      return;
    const neAttrs = this.treeAdapter.getAttrList(newElement);
    const candidates = this._getNoahArkConditionCandidates(newElement, neAttrs);
    if (candidates.length < NOAH_ARK_CAPACITY)
      return;
    const neAttrsMap = new Map(neAttrs.map((neAttr) => [neAttr.name, neAttr.value]));
    let validCandidates = 0;
    for (let i = 0; i < candidates.length; i++) {
      const candidate = candidates[i];
      if (candidate.attrs.every((cAttr) => neAttrsMap.get(cAttr.name) === cAttr.value)) {
        validCandidates += 1;
        if (validCandidates >= NOAH_ARK_CAPACITY) {
          this.entries.splice(candidate.idx, 1);
        }
      }
    }
  }
  //Mutations
  insertMarker() {
    this.entries.unshift(MARKER);
  }
  pushElement(element, token) {
    this._ensureNoahArkCondition(element);
    this.entries.unshift({
      type: EntryType.Element,
      element,
      token
    });
  }
  insertElementAfterBookmark(element, token) {
    const bookmarkIdx = this.entries.indexOf(this.bookmark);
    this.entries.splice(bookmarkIdx, 0, {
      type: EntryType.Element,
      element,
      token
    });
  }
  removeEntry(entry) {
    const entryIndex = this.entries.indexOf(entry);
    if (entryIndex >= 0) {
      this.entries.splice(entryIndex, 1);
    }
  }
  /**
   * Clears the list of formatting elements up to the last marker.
   *
   * @see https://html.spec.whatwg.org/multipage/parsing.html#clear-the-list-of-active-formatting-elements-up-to-the-last-marker
   */
  clearToLastMarker() {
    const markerIdx = this.entries.indexOf(MARKER);
    if (markerIdx >= 0) {
      this.entries.splice(0, markerIdx + 1);
    } else {
      this.entries.length = 0;
    }
  }
  //Search
  getElementEntryInScopeWithTagName(tagName) {
    const entry = this.entries.find((entry2) => entry2.type === EntryType.Marker || this.treeAdapter.getTagName(entry2.element) === tagName);
    return entry && entry.type === EntryType.Element ? entry : null;
  }
  getElementEntry(element) {
    return this.entries.find((entry) => entry.type === EntryType.Element && entry.element === element);
  }
}
function createTextNode$1(value) {
  return {
    nodeName: "#text",
    value,
    parentNode: null
  };
}
const defaultTreeAdapter = {
  //Node construction
  createDocument() {
    return {
      nodeName: "#document",
      mode: DOCUMENT_MODE.NO_QUIRKS,
      childNodes: []
    };
  },
  createDocumentFragment() {
    return {
      nodeName: "#document-fragment",
      childNodes: []
    };
  },
  createElement(tagName, namespaceURI, attrs) {
    return {
      nodeName: tagName,
      tagName,
      attrs,
      namespaceURI,
      childNodes: [],
      parentNode: null
    };
  },
  createCommentNode(data2) {
    return {
      nodeName: "#comment",
      data: data2,
      parentNode: null
    };
  },
  //Tree mutation
  appendChild(parentNode, newNode) {
    parentNode.childNodes.push(newNode);
    newNode.parentNode = parentNode;
  },
  insertBefore(parentNode, newNode, referenceNode) {
    const insertionIdx = parentNode.childNodes.indexOf(referenceNode);
    parentNode.childNodes.splice(insertionIdx, 0, newNode);
    newNode.parentNode = parentNode;
  },
  setTemplateContent(templateElement, contentElement) {
    templateElement.content = contentElement;
  },
  getTemplateContent(templateElement) {
    return templateElement.content;
  },
  setDocumentType(document, name, publicId, systemId) {
    const doctypeNode = document.childNodes.find((node) => node.nodeName === "#documentType");
    if (doctypeNode) {
      doctypeNode.name = name;
      doctypeNode.publicId = publicId;
      doctypeNode.systemId = systemId;
    } else {
      const node = {
        nodeName: "#documentType",
        name,
        publicId,
        systemId,
        parentNode: null
      };
      defaultTreeAdapter.appendChild(document, node);
    }
  },
  setDocumentMode(document, mode) {
    document.mode = mode;
  },
  getDocumentMode(document) {
    return document.mode;
  },
  detachNode(node) {
    if (node.parentNode) {
      const idx = node.parentNode.childNodes.indexOf(node);
      node.parentNode.childNodes.splice(idx, 1);
      node.parentNode = null;
    }
  },
  insertText(parentNode, text2) {
    if (parentNode.childNodes.length > 0) {
      const prevNode = parentNode.childNodes[parentNode.childNodes.length - 1];
      if (defaultTreeAdapter.isTextNode(prevNode)) {
        prevNode.value += text2;
        return;
      }
    }
    defaultTreeAdapter.appendChild(parentNode, createTextNode$1(text2));
  },
  insertTextBefore(parentNode, text2, referenceNode) {
    const prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];
    if (prevNode && defaultTreeAdapter.isTextNode(prevNode)) {
      prevNode.value += text2;
    } else {
      defaultTreeAdapter.insertBefore(parentNode, createTextNode$1(text2), referenceNode);
    }
  },
  adoptAttributes(recipient, attrs) {
    const recipientAttrsMap = new Set(recipient.attrs.map((attr2) => attr2.name));
    for (let j = 0; j < attrs.length; j++) {
      if (!recipientAttrsMap.has(attrs[j].name)) {
        recipient.attrs.push(attrs[j]);
      }
    }
  },
  //Tree traversing
  getFirstChild(node) {
    return node.childNodes[0];
  },
  getChildNodes(node) {
    return node.childNodes;
  },
  getParentNode(node) {
    return node.parentNode;
  },
  getAttrList(element) {
    return element.attrs;
  },
  //Node data
  getTagName(element) {
    return element.tagName;
  },
  getNamespaceURI(element) {
    return element.namespaceURI;
  },
  getTextNodeContent(textNode) {
    return textNode.value;
  },
  getCommentNodeContent(commentNode) {
    return commentNode.data;
  },
  getDocumentTypeNodeName(doctypeNode) {
    return doctypeNode.name;
  },
  getDocumentTypeNodePublicId(doctypeNode) {
    return doctypeNode.publicId;
  },
  getDocumentTypeNodeSystemId(doctypeNode) {
    return doctypeNode.systemId;
  },
  //Node types
  isTextNode(node) {
    return node.nodeName === "#text";
  },
  isCommentNode(node) {
    return node.nodeName === "#comment";
  },
  isDocumentTypeNode(node) {
    return node.nodeName === "#documentType";
  },
  isElementNode(node) {
    return Object.prototype.hasOwnProperty.call(node, "tagName");
  },
  // Source code location
  setNodeSourceCodeLocation(node, location) {
    node.sourceCodeLocation = location;
  },
  getNodeSourceCodeLocation(node) {
    return node.sourceCodeLocation;
  },
  updateNodeSourceCodeLocation(node, endLocation) {
    node.sourceCodeLocation = { ...node.sourceCodeLocation, ...endLocation };
  }
};
const VALID_DOCTYPE_NAME = "html";
const VALID_SYSTEM_ID = "about:legacy-compat";
const QUIRKS_MODE_SYSTEM_ID = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd";
const QUIRKS_MODE_PUBLIC_ID_PREFIXES = [
  "+//silmaril//dtd html pro v0r11 19970101//",
  "-//as//dtd html 3.0 aswedit + extensions//",
  "-//advasoft ltd//dtd html 3.0 aswedit + extensions//",
  "-//ietf//dtd html 2.0 level 1//",
  "-//ietf//dtd html 2.0 level 2//",
  "-//ietf//dtd html 2.0 strict level 1//",
  "-//ietf//dtd html 2.0 strict level 2//",
  "-//ietf//dtd html 2.0 strict//",
  "-//ietf//dtd html 2.0//",
  "-//ietf//dtd html 2.1e//",
  "-//ietf//dtd html 3.0//",
  "-//ietf//dtd html 3.2 final//",
  "-//ietf//dtd html 3.2//",
  "-//ietf//dtd html 3//",
  "-//ietf//dtd html level 0//",
  "-//ietf//dtd html level 1//",
  "-//ietf//dtd html level 2//",
  "-//ietf//dtd html level 3//",
  "-//ietf//dtd html strict level 0//",
  "-//ietf//dtd html strict level 1//",
  "-//ietf//dtd html strict level 2//",
  "-//ietf//dtd html strict level 3//",
  "-//ietf//dtd html strict//",
  "-//ietf//dtd html//",
  "-//metrius//dtd metrius presentational//",
  "-//microsoft//dtd internet explorer 2.0 html strict//",
  "-//microsoft//dtd internet explorer 2.0 html//",
  "-//microsoft//dtd internet explorer 2.0 tables//",
  "-//microsoft//dtd internet explorer 3.0 html strict//",
  "-//microsoft//dtd internet explorer 3.0 html//",
  "-//microsoft//dtd internet explorer 3.0 tables//",
  "-//netscape comm. corp.//dtd html//",
  "-//netscape comm. corp.//dtd strict html//",
  "-//o'reilly and associates//dtd html 2.0//",
  "-//o'reilly and associates//dtd html extended 1.0//",
  "-//o'reilly and associates//dtd html extended relaxed 1.0//",
  "-//sq//dtd html 2.0 hotmetal + extensions//",
  "-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//",
  "-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//",
  "-//spyglass//dtd html 2.0 extended//",
  "-//sun microsystems corp.//dtd hotjava html//",
  "-//sun microsystems corp.//dtd hotjava strict html//",
  "-//w3c//dtd html 3 1995-03-24//",
  "-//w3c//dtd html 3.2 draft//",
  "-//w3c//dtd html 3.2 final//",
  "-//w3c//dtd html 3.2//",
  "-//w3c//dtd html 3.2s draft//",
  "-//w3c//dtd html 4.0 frameset//",
  "-//w3c//dtd html 4.0 transitional//",
  "-//w3c//dtd html experimental 19960712//",
  "-//w3c//dtd html experimental 970421//",
  "-//w3c//dtd w3 html//",
  "-//w3o//dtd w3 html 3.0//",
  "-//webtechs//dtd mozilla html 2.0//",
  "-//webtechs//dtd mozilla html//"
];
const QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES = [
  ...QUIRKS_MODE_PUBLIC_ID_PREFIXES,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
];
const QUIRKS_MODE_PUBLIC_IDS = /* @__PURE__ */ new Set([
  "-//w3o//dtd w3 html strict 3.0//en//",
  "-/w3c/dtd html 4.0 transitional/en",
  "html"
]);
const LIMITED_QUIRKS_PUBLIC_ID_PREFIXES = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"];
const LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES = [
  ...LIMITED_QUIRKS_PUBLIC_ID_PREFIXES,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
];
function hasPrefix(publicId, prefixes) {
  return prefixes.some((prefix) => publicId.startsWith(prefix));
}
function isConforming(token) {
  return token.name === VALID_DOCTYPE_NAME && token.publicId === null && (token.systemId === null || token.systemId === VALID_SYSTEM_ID);
}
function getDocumentMode(token) {
  if (token.name !== VALID_DOCTYPE_NAME) {
    return DOCUMENT_MODE.QUIRKS;
  }
  const { systemId } = token;
  if (systemId && systemId.toLowerCase() === QUIRKS_MODE_SYSTEM_ID) {
    return DOCUMENT_MODE.QUIRKS;
  }
  let { publicId } = token;
  if (publicId !== null) {
    publicId = publicId.toLowerCase();
    if (QUIRKS_MODE_PUBLIC_IDS.has(publicId)) {
      return DOCUMENT_MODE.QUIRKS;
    }
    let prefixes = systemId === null ? QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES : QUIRKS_MODE_PUBLIC_ID_PREFIXES;
    if (hasPrefix(publicId, prefixes)) {
      return DOCUMENT_MODE.QUIRKS;
    }
    prefixes = systemId === null ? LIMITED_QUIRKS_PUBLIC_ID_PREFIXES : LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES;
    if (hasPrefix(publicId, prefixes)) {
      return DOCUMENT_MODE.LIMITED_QUIRKS;
    }
  }
  return DOCUMENT_MODE.NO_QUIRKS;
}
const MIME_TYPES = {
  TEXT_HTML: "text/html",
  APPLICATION_XML: "application/xhtml+xml"
};
const DEFINITION_URL_ATTR = "definitionurl";
const ADJUSTED_DEFINITION_URL_ATTR = "definitionURL";
const SVG_ATTRS_ADJUSTMENT_MAP = new Map([
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "clipPathUnits",
  "diffuseConstant",
  "edgeMode",
  "filterUnits",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "numOctaves",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "refX",
  "refY",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan"
].map((attr2) => [attr2.toLowerCase(), attr2]));
const XML_ATTRS_ADJUSTMENT_MAP = /* @__PURE__ */ new Map([
  ["xlink:actuate", { prefix: "xlink", name: "actuate", namespace: NS.XLINK }],
  ["xlink:arcrole", { prefix: "xlink", name: "arcrole", namespace: NS.XLINK }],
  ["xlink:href", { prefix: "xlink", name: "href", namespace: NS.XLINK }],
  ["xlink:role", { prefix: "xlink", name: "role", namespace: NS.XLINK }],
  ["xlink:show", { prefix: "xlink", name: "show", namespace: NS.XLINK }],
  ["xlink:title", { prefix: "xlink", name: "title", namespace: NS.XLINK }],
  ["xlink:type", { prefix: "xlink", name: "type", namespace: NS.XLINK }],
  ["xml:base", { prefix: "xml", name: "base", namespace: NS.XML }],
  ["xml:lang", { prefix: "xml", name: "lang", namespace: NS.XML }],
  ["xml:space", { prefix: "xml", name: "space", namespace: NS.XML }],
  ["xmlns", { prefix: "", name: "xmlns", namespace: NS.XMLNS }],
  ["xmlns:xlink", { prefix: "xmlns", name: "xlink", namespace: NS.XMLNS }]
]);
const SVG_TAG_NAMES_ADJUSTMENT_MAP = new Map([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "textPath"
].map((tn) => [tn.toLowerCase(), tn]));
const EXITS_FOREIGN_CONTENT = /* @__PURE__ */ new Set([
  TAG_ID.B,
  TAG_ID.BIG,
  TAG_ID.BLOCKQUOTE,
  TAG_ID.BODY,
  TAG_ID.BR,
  TAG_ID.CENTER,
  TAG_ID.CODE,
  TAG_ID.DD,
  TAG_ID.DIV,
  TAG_ID.DL,
  TAG_ID.DT,
  TAG_ID.EM,
  TAG_ID.EMBED,
  TAG_ID.H1,
  TAG_ID.H2,
  TAG_ID.H3,
  TAG_ID.H4,
  TAG_ID.H5,
  TAG_ID.H6,
  TAG_ID.HEAD,
  TAG_ID.HR,
  TAG_ID.I,
  TAG_ID.IMG,
  TAG_ID.LI,
  TAG_ID.LISTING,
  TAG_ID.MENU,
  TAG_ID.META,
  TAG_ID.NOBR,
  TAG_ID.OL,
  TAG_ID.P,
  TAG_ID.PRE,
  TAG_ID.RUBY,
  TAG_ID.S,
  TAG_ID.SMALL,
  TAG_ID.SPAN,
  TAG_ID.STRONG,
  TAG_ID.STRIKE,
  TAG_ID.SUB,
  TAG_ID.SUP,
  TAG_ID.TABLE,
  TAG_ID.TT,
  TAG_ID.U,
  TAG_ID.UL,
  TAG_ID.VAR
]);
function causesExit(startTagToken) {
  const tn = startTagToken.tagID;
  const isFontWithAttrs = tn === TAG_ID.FONT && startTagToken.attrs.some(({ name }) => name === ATTRS.COLOR || name === ATTRS.SIZE || name === ATTRS.FACE);
  return isFontWithAttrs || EXITS_FOREIGN_CONTENT.has(tn);
}
function adjustTokenMathMLAttrs(token) {
  for (let i = 0; i < token.attrs.length; i++) {
    if (token.attrs[i].name === DEFINITION_URL_ATTR) {
      token.attrs[i].name = ADJUSTED_DEFINITION_URL_ATTR;
      break;
    }
  }
}
function adjustTokenSVGAttrs(token) {
  for (let i = 0; i < token.attrs.length; i++) {
    const adjustedAttrName = SVG_ATTRS_ADJUSTMENT_MAP.get(token.attrs[i].name);
    if (adjustedAttrName != null) {
      token.attrs[i].name = adjustedAttrName;
    }
  }
}
function adjustTokenXMLAttrs(token) {
  for (let i = 0; i < token.attrs.length; i++) {
    const adjustedAttrEntry = XML_ATTRS_ADJUSTMENT_MAP.get(token.attrs[i].name);
    if (adjustedAttrEntry) {
      token.attrs[i].prefix = adjustedAttrEntry.prefix;
      token.attrs[i].name = adjustedAttrEntry.name;
      token.attrs[i].namespace = adjustedAttrEntry.namespace;
    }
  }
}
function adjustTokenSVGTagName(token) {
  const adjustedTagName = SVG_TAG_NAMES_ADJUSTMENT_MAP.get(token.tagName);
  if (adjustedTagName != null) {
    token.tagName = adjustedTagName;
    token.tagID = getTagID(token.tagName);
  }
}
function isMathMLTextIntegrationPoint(tn, ns) {
  return ns === NS.MATHML && (tn === TAG_ID.MI || tn === TAG_ID.MO || tn === TAG_ID.MN || tn === TAG_ID.MS || tn === TAG_ID.MTEXT);
}
function isHtmlIntegrationPoint(tn, ns, attrs) {
  if (ns === NS.MATHML && tn === TAG_ID.ANNOTATION_XML) {
    for (let i = 0; i < attrs.length; i++) {
      if (attrs[i].name === ATTRS.ENCODING) {
        const value = attrs[i].value.toLowerCase();
        return value === MIME_TYPES.TEXT_HTML || value === MIME_TYPES.APPLICATION_XML;
      }
    }
  }
  return ns === NS.SVG && (tn === TAG_ID.FOREIGN_OBJECT || tn === TAG_ID.DESC || tn === TAG_ID.TITLE);
}
function isIntegrationPoint(tn, ns, attrs, foreignNS) {
  return (!foreignNS || foreignNS === NS.HTML) && isHtmlIntegrationPoint(tn, ns, attrs) || (!foreignNS || foreignNS === NS.MATHML) && isMathMLTextIntegrationPoint(tn, ns);
}
const HIDDEN_INPUT_TYPE = "hidden";
const AA_OUTER_LOOP_ITER = 8;
const AA_INNER_LOOP_ITER = 3;
var InsertionMode;
(function(InsertionMode2) {
  InsertionMode2[InsertionMode2["INITIAL"] = 0] = "INITIAL";
  InsertionMode2[InsertionMode2["BEFORE_HTML"] = 1] = "BEFORE_HTML";
  InsertionMode2[InsertionMode2["BEFORE_HEAD"] = 2] = "BEFORE_HEAD";
  InsertionMode2[InsertionMode2["IN_HEAD"] = 3] = "IN_HEAD";
  InsertionMode2[InsertionMode2["IN_HEAD_NO_SCRIPT"] = 4] = "IN_HEAD_NO_SCRIPT";
  InsertionMode2[InsertionMode2["AFTER_HEAD"] = 5] = "AFTER_HEAD";
  InsertionMode2[InsertionMode2["IN_BODY"] = 6] = "IN_BODY";
  InsertionMode2[InsertionMode2["TEXT"] = 7] = "TEXT";
  InsertionMode2[InsertionMode2["IN_TABLE"] = 8] = "IN_TABLE";
  InsertionMode2[InsertionMode2["IN_TABLE_TEXT"] = 9] = "IN_TABLE_TEXT";
  InsertionMode2[InsertionMode2["IN_CAPTION"] = 10] = "IN_CAPTION";
  InsertionMode2[InsertionMode2["IN_COLUMN_GROUP"] = 11] = "IN_COLUMN_GROUP";
  InsertionMode2[InsertionMode2["IN_TABLE_BODY"] = 12] = "IN_TABLE_BODY";
  InsertionMode2[InsertionMode2["IN_ROW"] = 13] = "IN_ROW";
  InsertionMode2[InsertionMode2["IN_CELL"] = 14] = "IN_CELL";
  InsertionMode2[InsertionMode2["IN_SELECT"] = 15] = "IN_SELECT";
  InsertionMode2[InsertionMode2["IN_SELECT_IN_TABLE"] = 16] = "IN_SELECT_IN_TABLE";
  InsertionMode2[InsertionMode2["IN_TEMPLATE"] = 17] = "IN_TEMPLATE";
  InsertionMode2[InsertionMode2["AFTER_BODY"] = 18] = "AFTER_BODY";
  InsertionMode2[InsertionMode2["IN_FRAMESET"] = 19] = "IN_FRAMESET";
  InsertionMode2[InsertionMode2["AFTER_FRAMESET"] = 20] = "AFTER_FRAMESET";
  InsertionMode2[InsertionMode2["AFTER_AFTER_BODY"] = 21] = "AFTER_AFTER_BODY";
  InsertionMode2[InsertionMode2["AFTER_AFTER_FRAMESET"] = 22] = "AFTER_AFTER_FRAMESET";
})(InsertionMode || (InsertionMode = {}));
const BASE_LOC = {
  startLine: -1,
  startCol: -1,
  startOffset: -1,
  endLine: -1,
  endCol: -1,
  endOffset: -1
};
const TABLE_STRUCTURE_TAGS = /* @__PURE__ */ new Set([TAG_ID.TABLE, TAG_ID.TBODY, TAG_ID.TFOOT, TAG_ID.THEAD, TAG_ID.TR]);
const defaultParserOptions = {
  scriptingEnabled: true,
  sourceCodeLocationInfo: false,
  treeAdapter: defaultTreeAdapter,
  onParseError: null
};
let Parser$1 = class Parser {
  constructor(options2, document, fragmentContext = null, scriptHandler = null) {
    this.fragmentContext = fragmentContext;
    this.scriptHandler = scriptHandler;
    this.currentToken = null;
    this.stopped = false;
    this.insertionMode = InsertionMode.INITIAL;
    this.originalInsertionMode = InsertionMode.INITIAL;
    this.headElement = null;
    this.formElement = null;
    this.currentNotInHTML = false;
    this.tmplInsertionModeStack = [];
    this.pendingCharacterTokens = [];
    this.hasNonWhitespacePendingCharacterToken = false;
    this.framesetOk = true;
    this.skipNextNewLine = false;
    this.fosterParentingEnabled = false;
    this.options = {
      ...defaultParserOptions,
      ...options2
    };
    this.treeAdapter = this.options.treeAdapter;
    this.onParseError = this.options.onParseError;
    if (this.onParseError) {
      this.options.sourceCodeLocationInfo = true;
    }
    this.document = document !== null && document !== void 0 ? document : this.treeAdapter.createDocument();
    this.tokenizer = new Tokenizer$1(this.options, this);
    this.activeFormattingElements = new FormattingElementList(this.treeAdapter);
    this.fragmentContextID = fragmentContext ? getTagID(this.treeAdapter.getTagName(fragmentContext)) : TAG_ID.UNKNOWN;
    this._setContextModes(fragmentContext !== null && fragmentContext !== void 0 ? fragmentContext : this.document, this.fragmentContextID);
    this.openElements = new OpenElementStack(this.document, this.treeAdapter, this);
  }
  // API
  static parse(html2, options2) {
    const parser = new this(options2);
    parser.tokenizer.write(html2, true);
    return parser.document;
  }
  static getFragmentParser(fragmentContext, options2) {
    const opts = {
      ...defaultParserOptions,
      ...options2
    };
    fragmentContext !== null && fragmentContext !== void 0 ? fragmentContext : fragmentContext = opts.treeAdapter.createElement(TAG_NAMES.TEMPLATE, NS.HTML, []);
    const documentMock = opts.treeAdapter.createElement("documentmock", NS.HTML, []);
    const parser = new this(opts, documentMock, fragmentContext);
    if (parser.fragmentContextID === TAG_ID.TEMPLATE) {
      parser.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
    }
    parser._initTokenizerForFragmentParsing();
    parser._insertFakeRootElement();
    parser._resetInsertionMode();
    parser._findFormInFragmentContext();
    return parser;
  }
  getFragment() {
    const rootElement = this.treeAdapter.getFirstChild(this.document);
    const fragment = this.treeAdapter.createDocumentFragment();
    this._adoptNodes(rootElement, fragment);
    return fragment;
  }
  //Errors
  _err(token, code, beforeToken) {
    var _a3;
    if (!this.onParseError)
      return;
    const loc = (_a3 = token.location) !== null && _a3 !== void 0 ? _a3 : BASE_LOC;
    const err = {
      code,
      startLine: loc.startLine,
      startCol: loc.startCol,
      startOffset: loc.startOffset,
      endLine: beforeToken ? loc.startLine : loc.endLine,
      endCol: beforeToken ? loc.startCol : loc.endCol,
      endOffset: beforeToken ? loc.startOffset : loc.endOffset
    };
    this.onParseError(err);
  }
  //Stack events
  onItemPush(node, tid, isTop) {
    var _a3, _b2;
    (_b2 = (_a3 = this.treeAdapter).onItemPush) === null || _b2 === void 0 ? void 0 : _b2.call(_a3, node);
    if (isTop && this.openElements.stackTop > 0)
      this._setContextModes(node, tid);
  }
  onItemPop(node, isTop) {
    var _a3, _b2;
    if (this.options.sourceCodeLocationInfo) {
      this._setEndLocation(node, this.currentToken);
    }
    (_b2 = (_a3 = this.treeAdapter).onItemPop) === null || _b2 === void 0 ? void 0 : _b2.call(_a3, node, this.openElements.current);
    if (isTop) {
      let current;
      let currentTagId;
      if (this.openElements.stackTop === 0 && this.fragmentContext) {
        current = this.fragmentContext;
        currentTagId = this.fragmentContextID;
      } else {
        ({ current, currentTagId } = this.openElements);
      }
      this._setContextModes(current, currentTagId);
    }
  }
  _setContextModes(current, tid) {
    const isHTML = current === this.document || this.treeAdapter.getNamespaceURI(current) === NS.HTML;
    this.currentNotInHTML = !isHTML;
    this.tokenizer.inForeignNode = !isHTML && !this._isIntegrationPoint(tid, current);
  }
  _switchToTextParsing(currentToken, nextTokenizerState) {
    this._insertElement(currentToken, NS.HTML);
    this.tokenizer.state = nextTokenizerState;
    this.originalInsertionMode = this.insertionMode;
    this.insertionMode = InsertionMode.TEXT;
  }
  switchToPlaintextParsing() {
    this.insertionMode = InsertionMode.TEXT;
    this.originalInsertionMode = InsertionMode.IN_BODY;
    this.tokenizer.state = TokenizerMode.PLAINTEXT;
  }
  //Fragment parsing
  _getAdjustedCurrentElement() {
    return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current;
  }
  _findFormInFragmentContext() {
    let node = this.fragmentContext;
    while (node) {
      if (this.treeAdapter.getTagName(node) === TAG_NAMES.FORM) {
        this.formElement = node;
        break;
      }
      node = this.treeAdapter.getParentNode(node);
    }
  }
  _initTokenizerForFragmentParsing() {
    if (!this.fragmentContext || this.treeAdapter.getNamespaceURI(this.fragmentContext) !== NS.HTML) {
      return;
    }
    switch (this.fragmentContextID) {
      case TAG_ID.TITLE:
      case TAG_ID.TEXTAREA: {
        this.tokenizer.state = TokenizerMode.RCDATA;
        break;
      }
      case TAG_ID.STYLE:
      case TAG_ID.XMP:
      case TAG_ID.IFRAME:
      case TAG_ID.NOEMBED:
      case TAG_ID.NOFRAMES:
      case TAG_ID.NOSCRIPT: {
        this.tokenizer.state = TokenizerMode.RAWTEXT;
        break;
      }
      case TAG_ID.SCRIPT: {
        this.tokenizer.state = TokenizerMode.SCRIPT_DATA;
        break;
      }
      case TAG_ID.PLAINTEXT: {
        this.tokenizer.state = TokenizerMode.PLAINTEXT;
        break;
      }
    }
  }
  //Tree mutation
  _setDocumentType(token) {
    const name = token.name || "";
    const publicId = token.publicId || "";
    const systemId = token.systemId || "";
    this.treeAdapter.setDocumentType(this.document, name, publicId, systemId);
    if (token.location) {
      const documentChildren = this.treeAdapter.getChildNodes(this.document);
      const docTypeNode = documentChildren.find((node) => this.treeAdapter.isDocumentTypeNode(node));
      if (docTypeNode) {
        this.treeAdapter.setNodeSourceCodeLocation(docTypeNode, token.location);
      }
    }
  }
  _attachElementToTree(element, location) {
    if (this.options.sourceCodeLocationInfo) {
      const loc = location && {
        ...location,
        startTag: location
      };
      this.treeAdapter.setNodeSourceCodeLocation(element, loc);
    }
    if (this._shouldFosterParentOnInsertion()) {
      this._fosterParentElement(element);
    } else {
      const parent2 = this.openElements.currentTmplContentOrNode;
      this.treeAdapter.appendChild(parent2, element);
    }
  }
  _appendElement(token, namespaceURI) {
    const element = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);
    this._attachElementToTree(element, token.location);
  }
  _insertElement(token, namespaceURI) {
    const element = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);
    this._attachElementToTree(element, token.location);
    this.openElements.push(element, token.tagID);
  }
  _insertFakeElement(tagName, tagID) {
    const element = this.treeAdapter.createElement(tagName, NS.HTML, []);
    this._attachElementToTree(element, null);
    this.openElements.push(element, tagID);
  }
  _insertTemplate(token) {
    const tmpl = this.treeAdapter.createElement(token.tagName, NS.HTML, token.attrs);
    const content = this.treeAdapter.createDocumentFragment();
    this.treeAdapter.setTemplateContent(tmpl, content);
    this._attachElementToTree(tmpl, token.location);
    this.openElements.push(tmpl, token.tagID);
    if (this.options.sourceCodeLocationInfo)
      this.treeAdapter.setNodeSourceCodeLocation(content, null);
  }
  _insertFakeRootElement() {
    const element = this.treeAdapter.createElement(TAG_NAMES.HTML, NS.HTML, []);
    if (this.options.sourceCodeLocationInfo)
      this.treeAdapter.setNodeSourceCodeLocation(element, null);
    this.treeAdapter.appendChild(this.openElements.current, element);
    this.openElements.push(element, TAG_ID.HTML);
  }
  _appendCommentNode(token, parent2) {
    const commentNode = this.treeAdapter.createCommentNode(token.data);
    this.treeAdapter.appendChild(parent2, commentNode);
    if (this.options.sourceCodeLocationInfo) {
      this.treeAdapter.setNodeSourceCodeLocation(commentNode, token.location);
    }
  }
  _insertCharacters(token) {
    let parent2;
    let beforeElement;
    if (this._shouldFosterParentOnInsertion()) {
      ({ parent: parent2, beforeElement } = this._findFosterParentingLocation());
      if (beforeElement) {
        this.treeAdapter.insertTextBefore(parent2, token.chars, beforeElement);
      } else {
        this.treeAdapter.insertText(parent2, token.chars);
      }
    } else {
      parent2 = this.openElements.currentTmplContentOrNode;
      this.treeAdapter.insertText(parent2, token.chars);
    }
    if (!token.location)
      return;
    const siblings2 = this.treeAdapter.getChildNodes(parent2);
    const textNodeIdx = beforeElement ? siblings2.lastIndexOf(beforeElement) : siblings2.length;
    const textNode = siblings2[textNodeIdx - 1];
    const tnLoc = this.treeAdapter.getNodeSourceCodeLocation(textNode);
    if (tnLoc) {
      const { endLine, endCol, endOffset } = token.location;
      this.treeAdapter.updateNodeSourceCodeLocation(textNode, { endLine, endCol, endOffset });
    } else if (this.options.sourceCodeLocationInfo) {
      this.treeAdapter.setNodeSourceCodeLocation(textNode, token.location);
    }
  }
  _adoptNodes(donor, recipient) {
    for (let child = this.treeAdapter.getFirstChild(donor); child; child = this.treeAdapter.getFirstChild(donor)) {
      this.treeAdapter.detachNode(child);
      this.treeAdapter.appendChild(recipient, child);
    }
  }
  _setEndLocation(element, closingToken) {
    if (this.treeAdapter.getNodeSourceCodeLocation(element) && closingToken.location) {
      const ctLoc = closingToken.location;
      const tn = this.treeAdapter.getTagName(element);
      const endLoc = (
        // NOTE: For cases like <p> <p> </p> - First 'p' closes without a closing
        // tag and for cases like <td> <p> </td> - 'p' closes without a closing tag.
        closingToken.type === TokenType.END_TAG && tn === closingToken.tagName ? {
          endTag: { ...ctLoc },
          endLine: ctLoc.endLine,
          endCol: ctLoc.endCol,
          endOffset: ctLoc.endOffset
        } : {
          endLine: ctLoc.startLine,
          endCol: ctLoc.startCol,
          endOffset: ctLoc.startOffset
        }
      );
      this.treeAdapter.updateNodeSourceCodeLocation(element, endLoc);
    }
  }
  //Token processing
  shouldProcessStartTagTokenInForeignContent(token) {
    if (!this.currentNotInHTML)
      return false;
    let current;
    let currentTagId;
    if (this.openElements.stackTop === 0 && this.fragmentContext) {
      current = this.fragmentContext;
      currentTagId = this.fragmentContextID;
    } else {
      ({ current, currentTagId } = this.openElements);
    }
    if (token.tagID === TAG_ID.SVG && this.treeAdapter.getTagName(current) === TAG_NAMES.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(current) === NS.MATHML) {
      return false;
    }
    return (
      // Check that `current` is not an integration point for HTML or MathML elements.
      this.tokenizer.inForeignNode || // If it _is_ an integration point, then we might have to check that it is not an HTML
      // integration point.
      (token.tagID === TAG_ID.MGLYPH || token.tagID === TAG_ID.MALIGNMARK) && !this._isIntegrationPoint(currentTagId, current, NS.HTML)
    );
  }
  _processToken(token) {
    switch (token.type) {
      case TokenType.CHARACTER: {
        this.onCharacter(token);
        break;
      }
      case TokenType.NULL_CHARACTER: {
        this.onNullCharacter(token);
        break;
      }
      case TokenType.COMMENT: {
        this.onComment(token);
        break;
      }
      case TokenType.DOCTYPE: {
        this.onDoctype(token);
        break;
      }
      case TokenType.START_TAG: {
        this._processStartTag(token);
        break;
      }
      case TokenType.END_TAG: {
        this.onEndTag(token);
        break;
      }
      case TokenType.EOF: {
        this.onEof(token);
        break;
      }
      case TokenType.WHITESPACE_CHARACTER: {
        this.onWhitespaceCharacter(token);
        break;
      }
    }
  }
  //Integration points
  _isIntegrationPoint(tid, element, foreignNS) {
    const ns = this.treeAdapter.getNamespaceURI(element);
    const attrs = this.treeAdapter.getAttrList(element);
    return isIntegrationPoint(tid, ns, attrs, foreignNS);
  }
  //Active formatting elements reconstruction
  _reconstructActiveFormattingElements() {
    const listLength = this.activeFormattingElements.entries.length;
    if (listLength) {
      const endIndex = this.activeFormattingElements.entries.findIndex((entry) => entry.type === EntryType.Marker || this.openElements.contains(entry.element));
      const unopenIdx = endIndex < 0 ? listLength - 1 : endIndex - 1;
      for (let i = unopenIdx; i >= 0; i--) {
        const entry = this.activeFormattingElements.entries[i];
        this._insertElement(entry.token, this.treeAdapter.getNamespaceURI(entry.element));
        entry.element = this.openElements.current;
      }
    }
  }
  //Close elements
  _closeTableCell() {
    this.openElements.generateImpliedEndTags();
    this.openElements.popUntilTableCellPopped();
    this.activeFormattingElements.clearToLastMarker();
    this.insertionMode = InsertionMode.IN_ROW;
  }
  _closePElement() {
    this.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.P);
    this.openElements.popUntilTagNamePopped(TAG_ID.P);
  }
  //Insertion modes
  _resetInsertionMode() {
    for (let i = this.openElements.stackTop; i >= 0; i--) {
      switch (i === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[i]) {
        case TAG_ID.TR: {
          this.insertionMode = InsertionMode.IN_ROW;
          return;
        }
        case TAG_ID.TBODY:
        case TAG_ID.THEAD:
        case TAG_ID.TFOOT: {
          this.insertionMode = InsertionMode.IN_TABLE_BODY;
          return;
        }
        case TAG_ID.CAPTION: {
          this.insertionMode = InsertionMode.IN_CAPTION;
          return;
        }
        case TAG_ID.COLGROUP: {
          this.insertionMode = InsertionMode.IN_COLUMN_GROUP;
          return;
        }
        case TAG_ID.TABLE: {
          this.insertionMode = InsertionMode.IN_TABLE;
          return;
        }
        case TAG_ID.BODY: {
          this.insertionMode = InsertionMode.IN_BODY;
          return;
        }
        case TAG_ID.FRAMESET: {
          this.insertionMode = InsertionMode.IN_FRAMESET;
          return;
        }
        case TAG_ID.SELECT: {
          this._resetInsertionModeForSelect(i);
          return;
        }
        case TAG_ID.TEMPLATE: {
          this.insertionMode = this.tmplInsertionModeStack[0];
          return;
        }
        case TAG_ID.HTML: {
          this.insertionMode = this.headElement ? InsertionMode.AFTER_HEAD : InsertionMode.BEFORE_HEAD;
          return;
        }
        case TAG_ID.TD:
        case TAG_ID.TH: {
          if (i > 0) {
            this.insertionMode = InsertionMode.IN_CELL;
            return;
          }
          break;
        }
        case TAG_ID.HEAD: {
          if (i > 0) {
            this.insertionMode = InsertionMode.IN_HEAD;
            return;
          }
          break;
        }
      }
    }
    this.insertionMode = InsertionMode.IN_BODY;
  }
  _resetInsertionModeForSelect(selectIdx) {
    if (selectIdx > 0) {
      for (let i = selectIdx - 1; i > 0; i--) {
        const tn = this.openElements.tagIDs[i];
        if (tn === TAG_ID.TEMPLATE) {
          break;
        } else if (tn === TAG_ID.TABLE) {
          this.insertionMode = InsertionMode.IN_SELECT_IN_TABLE;
          return;
        }
      }
    }
    this.insertionMode = InsertionMode.IN_SELECT;
  }
  //Foster parenting
  _isElementCausesFosterParenting(tn) {
    return TABLE_STRUCTURE_TAGS.has(tn);
  }
  _shouldFosterParentOnInsertion() {
    return this.fosterParentingEnabled && this._isElementCausesFosterParenting(this.openElements.currentTagId);
  }
  _findFosterParentingLocation() {
    for (let i = this.openElements.stackTop; i >= 0; i--) {
      const openElement = this.openElements.items[i];
      switch (this.openElements.tagIDs[i]) {
        case TAG_ID.TEMPLATE: {
          if (this.treeAdapter.getNamespaceURI(openElement) === NS.HTML) {
            return { parent: this.treeAdapter.getTemplateContent(openElement), beforeElement: null };
          }
          break;
        }
        case TAG_ID.TABLE: {
          const parent2 = this.treeAdapter.getParentNode(openElement);
          if (parent2) {
            return { parent: parent2, beforeElement: openElement };
          }
          return { parent: this.openElements.items[i - 1], beforeElement: null };
        }
      }
    }
    return { parent: this.openElements.items[0], beforeElement: null };
  }
  _fosterParentElement(element) {
    const location = this._findFosterParentingLocation();
    if (location.beforeElement) {
      this.treeAdapter.insertBefore(location.parent, element, location.beforeElement);
    } else {
      this.treeAdapter.appendChild(location.parent, element);
    }
  }
  //Special elements
  _isSpecialElement(element, id) {
    const ns = this.treeAdapter.getNamespaceURI(element);
    return SPECIAL_ELEMENTS[ns].has(id);
  }
  onCharacter(token) {
    this.skipNextNewLine = false;
    if (this.tokenizer.inForeignNode) {
      characterInForeignContent(this, token);
      return;
    }
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        tokenInInitialMode(this, token);
        break;
      }
      case InsertionMode.BEFORE_HTML: {
        tokenBeforeHtml(this, token);
        break;
      }
      case InsertionMode.BEFORE_HEAD: {
        tokenBeforeHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD: {
        tokenInHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD_NO_SCRIPT: {
        tokenInHeadNoScript(this, token);
        break;
      }
      case InsertionMode.AFTER_HEAD: {
        tokenAfterHead(this, token);
        break;
      }
      case InsertionMode.IN_BODY:
      case InsertionMode.IN_CAPTION:
      case InsertionMode.IN_CELL:
      case InsertionMode.IN_TEMPLATE: {
        characterInBody(this, token);
        break;
      }
      case InsertionMode.TEXT:
      case InsertionMode.IN_SELECT:
      case InsertionMode.IN_SELECT_IN_TABLE: {
        this._insertCharacters(token);
        break;
      }
      case InsertionMode.IN_TABLE:
      case InsertionMode.IN_TABLE_BODY:
      case InsertionMode.IN_ROW: {
        characterInTable(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        characterInTableText(this, token);
        break;
      }
      case InsertionMode.IN_COLUMN_GROUP: {
        tokenInColumnGroup(this, token);
        break;
      }
      case InsertionMode.AFTER_BODY: {
        tokenAfterBody(this, token);
        break;
      }
      case InsertionMode.AFTER_AFTER_BODY: {
        tokenAfterAfterBody(this, token);
        break;
      }
    }
  }
  onNullCharacter(token) {
    this.skipNextNewLine = false;
    if (this.tokenizer.inForeignNode) {
      nullCharacterInForeignContent(this, token);
      return;
    }
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        tokenInInitialMode(this, token);
        break;
      }
      case InsertionMode.BEFORE_HTML: {
        tokenBeforeHtml(this, token);
        break;
      }
      case InsertionMode.BEFORE_HEAD: {
        tokenBeforeHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD: {
        tokenInHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD_NO_SCRIPT: {
        tokenInHeadNoScript(this, token);
        break;
      }
      case InsertionMode.AFTER_HEAD: {
        tokenAfterHead(this, token);
        break;
      }
      case InsertionMode.TEXT: {
        this._insertCharacters(token);
        break;
      }
      case InsertionMode.IN_TABLE:
      case InsertionMode.IN_TABLE_BODY:
      case InsertionMode.IN_ROW: {
        characterInTable(this, token);
        break;
      }
      case InsertionMode.IN_COLUMN_GROUP: {
        tokenInColumnGroup(this, token);
        break;
      }
      case InsertionMode.AFTER_BODY: {
        tokenAfterBody(this, token);
        break;
      }
      case InsertionMode.AFTER_AFTER_BODY: {
        tokenAfterAfterBody(this, token);
        break;
      }
    }
  }
  onComment(token) {
    this.skipNextNewLine = false;
    if (this.currentNotInHTML) {
      appendComment(this, token);
      return;
    }
    switch (this.insertionMode) {
      case InsertionMode.INITIAL:
      case InsertionMode.BEFORE_HTML:
      case InsertionMode.BEFORE_HEAD:
      case InsertionMode.IN_HEAD:
      case InsertionMode.IN_HEAD_NO_SCRIPT:
      case InsertionMode.AFTER_HEAD:
      case InsertionMode.IN_BODY:
      case InsertionMode.IN_TABLE:
      case InsertionMode.IN_CAPTION:
      case InsertionMode.IN_COLUMN_GROUP:
      case InsertionMode.IN_TABLE_BODY:
      case InsertionMode.IN_ROW:
      case InsertionMode.IN_CELL:
      case InsertionMode.IN_SELECT:
      case InsertionMode.IN_SELECT_IN_TABLE:
      case InsertionMode.IN_TEMPLATE:
      case InsertionMode.IN_FRAMESET:
      case InsertionMode.AFTER_FRAMESET: {
        appendComment(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        tokenInTableText(this, token);
        break;
      }
      case InsertionMode.AFTER_BODY: {
        appendCommentToRootHtmlElement(this, token);
        break;
      }
      case InsertionMode.AFTER_AFTER_BODY:
      case InsertionMode.AFTER_AFTER_FRAMESET: {
        appendCommentToDocument(this, token);
        break;
      }
    }
  }
  onDoctype(token) {
    this.skipNextNewLine = false;
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        doctypeInInitialMode(this, token);
        break;
      }
      case InsertionMode.BEFORE_HEAD:
      case InsertionMode.IN_HEAD:
      case InsertionMode.IN_HEAD_NO_SCRIPT:
      case InsertionMode.AFTER_HEAD: {
        this._err(token, ERR.misplacedDoctype);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        tokenInTableText(this, token);
        break;
      }
    }
  }
  onStartTag(token) {
    this.skipNextNewLine = false;
    this.currentToken = token;
    this._processStartTag(token);
    if (token.selfClosing && !token.ackSelfClosing) {
      this._err(token, ERR.nonVoidHtmlElementStartTagWithTrailingSolidus);
    }
  }
  /**
   * Processes a given start tag.
   *
   * `onStartTag` checks if a self-closing tag was recognized. When a token
   * is moved inbetween multiple insertion modes, this check for self-closing
   * could lead to false positives. To avoid this, `_processStartTag` is used
   * for nested calls.
   *
   * @param token The token to process.
   */
  _processStartTag(token) {
    if (this.shouldProcessStartTagTokenInForeignContent(token)) {
      startTagInForeignContent(this, token);
    } else {
      this._startTagOutsideForeignContent(token);
    }
  }
  _startTagOutsideForeignContent(token) {
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        tokenInInitialMode(this, token);
        break;
      }
      case InsertionMode.BEFORE_HTML: {
        startTagBeforeHtml(this, token);
        break;
      }
      case InsertionMode.BEFORE_HEAD: {
        startTagBeforeHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD: {
        startTagInHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD_NO_SCRIPT: {
        startTagInHeadNoScript(this, token);
        break;
      }
      case InsertionMode.AFTER_HEAD: {
        startTagAfterHead(this, token);
        break;
      }
      case InsertionMode.IN_BODY: {
        startTagInBody(this, token);
        break;
      }
      case InsertionMode.IN_TABLE: {
        startTagInTable(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        tokenInTableText(this, token);
        break;
      }
      case InsertionMode.IN_CAPTION: {
        startTagInCaption(this, token);
        break;
      }
      case InsertionMode.IN_COLUMN_GROUP: {
        startTagInColumnGroup(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_BODY: {
        startTagInTableBody(this, token);
        break;
      }
      case InsertionMode.IN_ROW: {
        startTagInRow(this, token);
        break;
      }
      case InsertionMode.IN_CELL: {
        startTagInCell(this, token);
        break;
      }
      case InsertionMode.IN_SELECT: {
        startTagInSelect(this, token);
        break;
      }
      case InsertionMode.IN_SELECT_IN_TABLE: {
        startTagInSelectInTable(this, token);
        break;
      }
      case InsertionMode.IN_TEMPLATE: {
        startTagInTemplate(this, token);
        break;
      }
      case InsertionMode.AFTER_BODY: {
        startTagAfterBody(this, token);
        break;
      }
      case InsertionMode.IN_FRAMESET: {
        startTagInFrameset(this, token);
        break;
      }
      case InsertionMode.AFTER_FRAMESET: {
        startTagAfterFrameset(this, token);
        break;
      }
      case InsertionMode.AFTER_AFTER_BODY: {
        startTagAfterAfterBody(this, token);
        break;
      }
      case InsertionMode.AFTER_AFTER_FRAMESET: {
        startTagAfterAfterFrameset(this, token);
        break;
      }
    }
  }
  onEndTag(token) {
    this.skipNextNewLine = false;
    this.currentToken = token;
    if (this.currentNotInHTML) {
      endTagInForeignContent(this, token);
    } else {
      this._endTagOutsideForeignContent(token);
    }
  }
  _endTagOutsideForeignContent(token) {
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        tokenInInitialMode(this, token);
        break;
      }
      case InsertionMode.BEFORE_HTML: {
        endTagBeforeHtml(this, token);
        break;
      }
      case InsertionMode.BEFORE_HEAD: {
        endTagBeforeHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD: {
        endTagInHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD_NO_SCRIPT: {
        endTagInHeadNoScript(this, token);
        break;
      }
      case InsertionMode.AFTER_HEAD: {
        endTagAfterHead(this, token);
        break;
      }
      case InsertionMode.IN_BODY: {
        endTagInBody(this, token);
        break;
      }
      case InsertionMode.TEXT: {
        endTagInText(this, token);
        break;
      }
      case InsertionMode.IN_TABLE: {
        endTagInTable(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        tokenInTableText(this, token);
        break;
      }
      case InsertionMode.IN_CAPTION: {
        endTagInCaption(this, token);
        break;
      }
      case InsertionMode.IN_COLUMN_GROUP: {
        endTagInColumnGroup(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_BODY: {
        endTagInTableBody(this, token);
        break;
      }
      case InsertionMode.IN_ROW: {
        endTagInRow(this, token);
        break;
      }
      case InsertionMode.IN_CELL: {
        endTagInCell(this, token);
        break;
      }
      case InsertionMode.IN_SELECT: {
        endTagInSelect(this, token);
        break;
      }
      case InsertionMode.IN_SELECT_IN_TABLE: {
        endTagInSelectInTable(this, token);
        break;
      }
      case InsertionMode.IN_TEMPLATE: {
        endTagInTemplate(this, token);
        break;
      }
      case InsertionMode.AFTER_BODY: {
        endTagAfterBody(this, token);
        break;
      }
      case InsertionMode.IN_FRAMESET: {
        endTagInFrameset(this, token);
        break;
      }
      case InsertionMode.AFTER_FRAMESET: {
        endTagAfterFrameset(this, token);
        break;
      }
      case InsertionMode.AFTER_AFTER_BODY: {
        tokenAfterAfterBody(this, token);
        break;
      }
    }
  }
  onEof(token) {
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        tokenInInitialMode(this, token);
        break;
      }
      case InsertionMode.BEFORE_HTML: {
        tokenBeforeHtml(this, token);
        break;
      }
      case InsertionMode.BEFORE_HEAD: {
        tokenBeforeHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD: {
        tokenInHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD_NO_SCRIPT: {
        tokenInHeadNoScript(this, token);
        break;
      }
      case InsertionMode.AFTER_HEAD: {
        tokenAfterHead(this, token);
        break;
      }
      case InsertionMode.IN_BODY:
      case InsertionMode.IN_TABLE:
      case InsertionMode.IN_CAPTION:
      case InsertionMode.IN_COLUMN_GROUP:
      case InsertionMode.IN_TABLE_BODY:
      case InsertionMode.IN_ROW:
      case InsertionMode.IN_CELL:
      case InsertionMode.IN_SELECT:
      case InsertionMode.IN_SELECT_IN_TABLE: {
        eofInBody(this, token);
        break;
      }
      case InsertionMode.TEXT: {
        eofInText(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        tokenInTableText(this, token);
        break;
      }
      case InsertionMode.IN_TEMPLATE: {
        eofInTemplate(this, token);
        break;
      }
      case InsertionMode.AFTER_BODY:
      case InsertionMode.IN_FRAMESET:
      case InsertionMode.AFTER_FRAMESET:
      case InsertionMode.AFTER_AFTER_BODY:
      case InsertionMode.AFTER_AFTER_FRAMESET: {
        stopParsing(this, token);
        break;
      }
    }
  }
  onWhitespaceCharacter(token) {
    if (this.skipNextNewLine) {
      this.skipNextNewLine = false;
      if (token.chars.charCodeAt(0) === CODE_POINTS.LINE_FEED) {
        if (token.chars.length === 1) {
          return;
        }
        token.chars = token.chars.substr(1);
      }
    }
    if (this.tokenizer.inForeignNode) {
      this._insertCharacters(token);
      return;
    }
    switch (this.insertionMode) {
      case InsertionMode.IN_HEAD:
      case InsertionMode.IN_HEAD_NO_SCRIPT:
      case InsertionMode.AFTER_HEAD:
      case InsertionMode.TEXT:
      case InsertionMode.IN_COLUMN_GROUP:
      case InsertionMode.IN_SELECT:
      case InsertionMode.IN_SELECT_IN_TABLE:
      case InsertionMode.IN_FRAMESET:
      case InsertionMode.AFTER_FRAMESET: {
        this._insertCharacters(token);
        break;
      }
      case InsertionMode.IN_BODY:
      case InsertionMode.IN_CAPTION:
      case InsertionMode.IN_CELL:
      case InsertionMode.IN_TEMPLATE:
      case InsertionMode.AFTER_BODY:
      case InsertionMode.AFTER_AFTER_BODY:
      case InsertionMode.AFTER_AFTER_FRAMESET: {
        whitespaceCharacterInBody(this, token);
        break;
      }
      case InsertionMode.IN_TABLE:
      case InsertionMode.IN_TABLE_BODY:
      case InsertionMode.IN_ROW: {
        characterInTable(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        whitespaceCharacterInTableText(this, token);
        break;
      }
    }
  }
};
function aaObtainFormattingElementEntry(p, token) {
  let formattingElementEntry = p.activeFormattingElements.getElementEntryInScopeWithTagName(token.tagName);
  if (formattingElementEntry) {
    if (!p.openElements.contains(formattingElementEntry.element)) {
      p.activeFormattingElements.removeEntry(formattingElementEntry);
      formattingElementEntry = null;
    } else if (!p.openElements.hasInScope(token.tagID)) {
      formattingElementEntry = null;
    }
  } else {
    genericEndTagInBody(p, token);
  }
  return formattingElementEntry;
}
function aaObtainFurthestBlock(p, formattingElementEntry) {
  let furthestBlock = null;
  let idx = p.openElements.stackTop;
  for (; idx >= 0; idx--) {
    const element = p.openElements.items[idx];
    if (element === formattingElementEntry.element) {
      break;
    }
    if (p._isSpecialElement(element, p.openElements.tagIDs[idx])) {
      furthestBlock = element;
    }
  }
  if (!furthestBlock) {
    p.openElements.shortenToLength(idx < 0 ? 0 : idx);
    p.activeFormattingElements.removeEntry(formattingElementEntry);
  }
  return furthestBlock;
}
function aaInnerLoop(p, furthestBlock, formattingElement) {
  let lastElement = furthestBlock;
  let nextElement = p.openElements.getCommonAncestor(furthestBlock);
  for (let i = 0, element = nextElement; element !== formattingElement; i++, element = nextElement) {
    nextElement = p.openElements.getCommonAncestor(element);
    const elementEntry = p.activeFormattingElements.getElementEntry(element);
    const counterOverflow = elementEntry && i >= AA_INNER_LOOP_ITER;
    const shouldRemoveFromOpenElements = !elementEntry || counterOverflow;
    if (shouldRemoveFromOpenElements) {
      if (counterOverflow) {
        p.activeFormattingElements.removeEntry(elementEntry);
      }
      p.openElements.remove(element);
    } else {
      element = aaRecreateElementFromEntry(p, elementEntry);
      if (lastElement === furthestBlock) {
        p.activeFormattingElements.bookmark = elementEntry;
      }
      p.treeAdapter.detachNode(lastElement);
      p.treeAdapter.appendChild(element, lastElement);
      lastElement = element;
    }
  }
  return lastElement;
}
function aaRecreateElementFromEntry(p, elementEntry) {
  const ns = p.treeAdapter.getNamespaceURI(elementEntry.element);
  const newElement = p.treeAdapter.createElement(elementEntry.token.tagName, ns, elementEntry.token.attrs);
  p.openElements.replace(elementEntry.element, newElement);
  elementEntry.element = newElement;
  return newElement;
}
function aaInsertLastNodeInCommonAncestor(p, commonAncestor, lastElement) {
  const tn = p.treeAdapter.getTagName(commonAncestor);
  const tid = getTagID(tn);
  if (p._isElementCausesFosterParenting(tid)) {
    p._fosterParentElement(lastElement);
  } else {
    const ns = p.treeAdapter.getNamespaceURI(commonAncestor);
    if (tid === TAG_ID.TEMPLATE && ns === NS.HTML) {
      commonAncestor = p.treeAdapter.getTemplateContent(commonAncestor);
    }
    p.treeAdapter.appendChild(commonAncestor, lastElement);
  }
}
function aaReplaceFormattingElement(p, furthestBlock, formattingElementEntry) {
  const ns = p.treeAdapter.getNamespaceURI(formattingElementEntry.element);
  const { token } = formattingElementEntry;
  const newElement = p.treeAdapter.createElement(token.tagName, ns, token.attrs);
  p._adoptNodes(furthestBlock, newElement);
  p.treeAdapter.appendChild(furthestBlock, newElement);
  p.activeFormattingElements.insertElementAfterBookmark(newElement, token);
  p.activeFormattingElements.removeEntry(formattingElementEntry);
  p.openElements.remove(formattingElementEntry.element);
  p.openElements.insertAfter(furthestBlock, newElement, token.tagID);
}
function callAdoptionAgency(p, token) {
  for (let i = 0; i < AA_OUTER_LOOP_ITER; i++) {
    const formattingElementEntry = aaObtainFormattingElementEntry(p, token);
    if (!formattingElementEntry) {
      break;
    }
    const furthestBlock = aaObtainFurthestBlock(p, formattingElementEntry);
    if (!furthestBlock) {
      break;
    }
    p.activeFormattingElements.bookmark = formattingElementEntry;
    const lastElement = aaInnerLoop(p, furthestBlock, formattingElementEntry.element);
    const commonAncestor = p.openElements.getCommonAncestor(formattingElementEntry.element);
    p.treeAdapter.detachNode(lastElement);
    if (commonAncestor)
      aaInsertLastNodeInCommonAncestor(p, commonAncestor, lastElement);
    aaReplaceFormattingElement(p, furthestBlock, formattingElementEntry);
  }
}
function appendComment(p, token) {
  p._appendCommentNode(token, p.openElements.currentTmplContentOrNode);
}
function appendCommentToRootHtmlElement(p, token) {
  p._appendCommentNode(token, p.openElements.items[0]);
}
function appendCommentToDocument(p, token) {
  p._appendCommentNode(token, p.document);
}
function stopParsing(p, token) {
  p.stopped = true;
  if (token.location) {
    const target = p.fragmentContext ? 0 : 2;
    for (let i = p.openElements.stackTop; i >= target; i--) {
      p._setEndLocation(p.openElements.items[i], token);
    }
    if (!p.fragmentContext && p.openElements.stackTop >= 0) {
      const htmlElement = p.openElements.items[0];
      const htmlLocation = p.treeAdapter.getNodeSourceCodeLocation(htmlElement);
      if (htmlLocation && !htmlLocation.endTag) {
        p._setEndLocation(htmlElement, token);
        if (p.openElements.stackTop >= 1) {
          const bodyElement = p.openElements.items[1];
          const bodyLocation = p.treeAdapter.getNodeSourceCodeLocation(bodyElement);
          if (bodyLocation && !bodyLocation.endTag) {
            p._setEndLocation(bodyElement, token);
          }
        }
      }
    }
  }
}
function doctypeInInitialMode(p, token) {
  p._setDocumentType(token);
  const mode = token.forceQuirks ? DOCUMENT_MODE.QUIRKS : getDocumentMode(token);
  if (!isConforming(token)) {
    p._err(token, ERR.nonConformingDoctype);
  }
  p.treeAdapter.setDocumentMode(p.document, mode);
  p.insertionMode = InsertionMode.BEFORE_HTML;
}
function tokenInInitialMode(p, token) {
  p._err(token, ERR.missingDoctype, true);
  p.treeAdapter.setDocumentMode(p.document, DOCUMENT_MODE.QUIRKS);
  p.insertionMode = InsertionMode.BEFORE_HTML;
  p._processToken(token);
}
function startTagBeforeHtml(p, token) {
  if (token.tagID === TAG_ID.HTML) {
    p._insertElement(token, NS.HTML);
    p.insertionMode = InsertionMode.BEFORE_HEAD;
  } else {
    tokenBeforeHtml(p, token);
  }
}
function endTagBeforeHtml(p, token) {
  const tn = token.tagID;
  if (tn === TAG_ID.HTML || tn === TAG_ID.HEAD || tn === TAG_ID.BODY || tn === TAG_ID.BR) {
    tokenBeforeHtml(p, token);
  }
}
function tokenBeforeHtml(p, token) {
  p._insertFakeRootElement();
  p.insertionMode = InsertionMode.BEFORE_HEAD;
  p._processToken(token);
}
function startTagBeforeHead(p, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p, token);
      break;
    }
    case TAG_ID.HEAD: {
      p._insertElement(token, NS.HTML);
      p.headElement = p.openElements.current;
      p.insertionMode = InsertionMode.IN_HEAD;
      break;
    }
    default: {
      tokenBeforeHead(p, token);
    }
  }
}
function endTagBeforeHead(p, token) {
  const tn = token.tagID;
  if (tn === TAG_ID.HEAD || tn === TAG_ID.BODY || tn === TAG_ID.HTML || tn === TAG_ID.BR) {
    tokenBeforeHead(p, token);
  } else {
    p._err(token, ERR.endTagWithoutMatchingOpenElement);
  }
}
function tokenBeforeHead(p, token) {
  p._insertFakeElement(TAG_NAMES.HEAD, TAG_ID.HEAD);
  p.headElement = p.openElements.current;
  p.insertionMode = InsertionMode.IN_HEAD;
  p._processToken(token);
}
function startTagInHead(p, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p, token);
      break;
    }
    case TAG_ID.BASE:
    case TAG_ID.BASEFONT:
    case TAG_ID.BGSOUND:
    case TAG_ID.LINK:
    case TAG_ID.META: {
      p._appendElement(token, NS.HTML);
      token.ackSelfClosing = true;
      break;
    }
    case TAG_ID.TITLE: {
      p._switchToTextParsing(token, TokenizerMode.RCDATA);
      break;
    }
    case TAG_ID.NOSCRIPT: {
      if (p.options.scriptingEnabled) {
        p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
      } else {
        p._insertElement(token, NS.HTML);
        p.insertionMode = InsertionMode.IN_HEAD_NO_SCRIPT;
      }
      break;
    }
    case TAG_ID.NOFRAMES:
    case TAG_ID.STYLE: {
      p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
      break;
    }
    case TAG_ID.SCRIPT: {
      p._switchToTextParsing(token, TokenizerMode.SCRIPT_DATA);
      break;
    }
    case TAG_ID.TEMPLATE: {
      p._insertTemplate(token);
      p.activeFormattingElements.insertMarker();
      p.framesetOk = false;
      p.insertionMode = InsertionMode.IN_TEMPLATE;
      p.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
      break;
    }
    case TAG_ID.HEAD: {
      p._err(token, ERR.misplacedStartTagForHeadElement);
      break;
    }
    default: {
      tokenInHead(p, token);
    }
  }
}
function endTagInHead(p, token) {
  switch (token.tagID) {
    case TAG_ID.HEAD: {
      p.openElements.pop();
      p.insertionMode = InsertionMode.AFTER_HEAD;
      break;
    }
    case TAG_ID.BODY:
    case TAG_ID.BR:
    case TAG_ID.HTML: {
      tokenInHead(p, token);
      break;
    }
    case TAG_ID.TEMPLATE: {
      templateEndTagInHead(p, token);
      break;
    }
    default: {
      p._err(token, ERR.endTagWithoutMatchingOpenElement);
    }
  }
}
function templateEndTagInHead(p, token) {
  if (p.openElements.tmplCount > 0) {
    p.openElements.generateImpliedEndTagsThoroughly();
    if (p.openElements.currentTagId !== TAG_ID.TEMPLATE) {
      p._err(token, ERR.closingOfElementWithOpenChildElements);
    }
    p.openElements.popUntilTagNamePopped(TAG_ID.TEMPLATE);
    p.activeFormattingElements.clearToLastMarker();
    p.tmplInsertionModeStack.shift();
    p._resetInsertionMode();
  } else {
    p._err(token, ERR.endTagWithoutMatchingOpenElement);
  }
}
function tokenInHead(p, token) {
  p.openElements.pop();
  p.insertionMode = InsertionMode.AFTER_HEAD;
  p._processToken(token);
}
function startTagInHeadNoScript(p, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p, token);
      break;
    }
    case TAG_ID.BASEFONT:
    case TAG_ID.BGSOUND:
    case TAG_ID.HEAD:
    case TAG_ID.LINK:
    case TAG_ID.META:
    case TAG_ID.NOFRAMES:
    case TAG_ID.STYLE: {
      startTagInHead(p, token);
      break;
    }
    case TAG_ID.NOSCRIPT: {
      p._err(token, ERR.nestedNoscriptInHead);
      break;
    }
    default: {
      tokenInHeadNoScript(p, token);
    }
  }
}
function endTagInHeadNoScript(p, token) {
  switch (token.tagID) {
    case TAG_ID.NOSCRIPT: {
      p.openElements.pop();
      p.insertionMode = InsertionMode.IN_HEAD;
      break;
    }
    case TAG_ID.BR: {
      tokenInHeadNoScript(p, token);
      break;
    }
    default: {
      p._err(token, ERR.endTagWithoutMatchingOpenElement);
    }
  }
}
function tokenInHeadNoScript(p, token) {
  const errCode = token.type === TokenType.EOF ? ERR.openElementsLeftAfterEof : ERR.disallowedContentInNoscriptInHead;
  p._err(token, errCode);
  p.openElements.pop();
  p.insertionMode = InsertionMode.IN_HEAD;
  p._processToken(token);
}
function startTagAfterHead(p, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p, token);
      break;
    }
    case TAG_ID.BODY: {
      p._insertElement(token, NS.HTML);
      p.framesetOk = false;
      p.insertionMode = InsertionMode.IN_BODY;
      break;
    }
    case TAG_ID.FRAMESET: {
      p._insertElement(token, NS.HTML);
      p.insertionMode = InsertionMode.IN_FRAMESET;
      break;
    }
    case TAG_ID.BASE:
    case TAG_ID.BASEFONT:
    case TAG_ID.BGSOUND:
    case TAG_ID.LINK:
    case TAG_ID.META:
    case TAG_ID.NOFRAMES:
    case TAG_ID.SCRIPT:
    case TAG_ID.STYLE:
    case TAG_ID.TEMPLATE:
    case TAG_ID.TITLE: {
      p._err(token, ERR.abandonedHeadElementChild);
      p.openElements.push(p.headElement, TAG_ID.HEAD);
      startTagInHead(p, token);
      p.openElements.remove(p.headElement);
      break;
    }
    case TAG_ID.HEAD: {
      p._err(token, ERR.misplacedStartTagForHeadElement);
      break;
    }
    default: {
      tokenAfterHead(p, token);
    }
  }
}
function endTagAfterHead(p, token) {
  switch (token.tagID) {
    case TAG_ID.BODY:
    case TAG_ID.HTML:
    case TAG_ID.BR: {
      tokenAfterHead(p, token);
      break;
    }
    case TAG_ID.TEMPLATE: {
      templateEndTagInHead(p, token);
      break;
    }
    default: {
      p._err(token, ERR.endTagWithoutMatchingOpenElement);
    }
  }
}
function tokenAfterHead(p, token) {
  p._insertFakeElement(TAG_NAMES.BODY, TAG_ID.BODY);
  p.insertionMode = InsertionMode.IN_BODY;
  modeInBody(p, token);
}
function modeInBody(p, token) {
  switch (token.type) {
    case TokenType.CHARACTER: {
      characterInBody(p, token);
      break;
    }
    case TokenType.WHITESPACE_CHARACTER: {
      whitespaceCharacterInBody(p, token);
      break;
    }
    case TokenType.COMMENT: {
      appendComment(p, token);
      break;
    }
    case TokenType.START_TAG: {
      startTagInBody(p, token);
      break;
    }
    case TokenType.END_TAG: {
      endTagInBody(p, token);
      break;
    }
    case TokenType.EOF: {
      eofInBody(p, token);
      break;
    }
  }
}
function whitespaceCharacterInBody(p, token) {
  p._reconstructActiveFormattingElements();
  p._insertCharacters(token);
}
function characterInBody(p, token) {
  p._reconstructActiveFormattingElements();
  p._insertCharacters(token);
  p.framesetOk = false;
}
function htmlStartTagInBody(p, token) {
  if (p.openElements.tmplCount === 0) {
    p.treeAdapter.adoptAttributes(p.openElements.items[0], token.attrs);
  }
}
function bodyStartTagInBody(p, token) {
  const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
  if (bodyElement && p.openElements.tmplCount === 0) {
    p.framesetOk = false;
    p.treeAdapter.adoptAttributes(bodyElement, token.attrs);
  }
}
function framesetStartTagInBody(p, token) {
  const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
  if (p.framesetOk && bodyElement) {
    p.treeAdapter.detachNode(bodyElement);
    p.openElements.popAllUpToHtmlElement();
    p._insertElement(token, NS.HTML);
    p.insertionMode = InsertionMode.IN_FRAMESET;
  }
}
function addressStartTagInBody(p, token) {
  if (p.openElements.hasInButtonScope(TAG_ID.P)) {
    p._closePElement();
  }
  p._insertElement(token, NS.HTML);
}
function numberedHeaderStartTagInBody(p, token) {
  if (p.openElements.hasInButtonScope(TAG_ID.P)) {
    p._closePElement();
  }
  if (isNumberedHeader(p.openElements.currentTagId)) {
    p.openElements.pop();
  }
  p._insertElement(token, NS.HTML);
}
function preStartTagInBody(p, token) {
  if (p.openElements.hasInButtonScope(TAG_ID.P)) {
    p._closePElement();
  }
  p._insertElement(token, NS.HTML);
  p.skipNextNewLine = true;
  p.framesetOk = false;
}
function formStartTagInBody(p, token) {
  const inTemplate = p.openElements.tmplCount > 0;
  if (!p.formElement || inTemplate) {
    if (p.openElements.hasInButtonScope(TAG_ID.P)) {
      p._closePElement();
    }
    p._insertElement(token, NS.HTML);
    if (!inTemplate) {
      p.formElement = p.openElements.current;
    }
  }
}
function listItemStartTagInBody(p, token) {
  p.framesetOk = false;
  const tn = token.tagID;
  for (let i = p.openElements.stackTop; i >= 0; i--) {
    const elementId = p.openElements.tagIDs[i];
    if (tn === TAG_ID.LI && elementId === TAG_ID.LI || (tn === TAG_ID.DD || tn === TAG_ID.DT) && (elementId === TAG_ID.DD || elementId === TAG_ID.DT)) {
      p.openElements.generateImpliedEndTagsWithExclusion(elementId);
      p.openElements.popUntilTagNamePopped(elementId);
      break;
    }
    if (elementId !== TAG_ID.ADDRESS && elementId !== TAG_ID.DIV && elementId !== TAG_ID.P && p._isSpecialElement(p.openElements.items[i], elementId)) {
      break;
    }
  }
  if (p.openElements.hasInButtonScope(TAG_ID.P)) {
    p._closePElement();
  }
  p._insertElement(token, NS.HTML);
}
function plaintextStartTagInBody(p, token) {
  if (p.openElements.hasInButtonScope(TAG_ID.P)) {
    p._closePElement();
  }
  p._insertElement(token, NS.HTML);
  p.tokenizer.state = TokenizerMode.PLAINTEXT;
}
function buttonStartTagInBody(p, token) {
  if (p.openElements.hasInScope(TAG_ID.BUTTON)) {
    p.openElements.generateImpliedEndTags();
    p.openElements.popUntilTagNamePopped(TAG_ID.BUTTON);
  }
  p._reconstructActiveFormattingElements();
  p._insertElement(token, NS.HTML);
  p.framesetOk = false;
}
function aStartTagInBody(p, token) {
  const activeElementEntry = p.activeFormattingElements.getElementEntryInScopeWithTagName(TAG_NAMES.A);
  if (activeElementEntry) {
    callAdoptionAgency(p, token);
    p.openElements.remove(activeElementEntry.element);
    p.activeFormattingElements.removeEntry(activeElementEntry);
  }
  p._reconstructActiveFormattingElements();
  p._insertElement(token, NS.HTML);
  p.activeFormattingElements.pushElement(p.openElements.current, token);
}
function bStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements();
  p._insertElement(token, NS.HTML);
  p.activeFormattingElements.pushElement(p.openElements.current, token);
}
function nobrStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements();
  if (p.openElements.hasInScope(TAG_ID.NOBR)) {
    callAdoptionAgency(p, token);
    p._reconstructActiveFormattingElements();
  }
  p._insertElement(token, NS.HTML);
  p.activeFormattingElements.pushElement(p.openElements.current, token);
}
function appletStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements();
  p._insertElement(token, NS.HTML);
  p.activeFormattingElements.insertMarker();
  p.framesetOk = false;
}
function tableStartTagInBody(p, token) {
  if (p.treeAdapter.getDocumentMode(p.document) !== DOCUMENT_MODE.QUIRKS && p.openElements.hasInButtonScope(TAG_ID.P)) {
    p._closePElement();
  }
  p._insertElement(token, NS.HTML);
  p.framesetOk = false;
  p.insertionMode = InsertionMode.IN_TABLE;
}
function areaStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements();
  p._appendElement(token, NS.HTML);
  p.framesetOk = false;
  token.ackSelfClosing = true;
}
function isHiddenInput(token) {
  const inputType = getTokenAttr(token, ATTRS.TYPE);
  return inputType != null && inputType.toLowerCase() === HIDDEN_INPUT_TYPE;
}
function inputStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements();
  p._appendElement(token, NS.HTML);
  if (!isHiddenInput(token)) {
    p.framesetOk = false;
  }
  token.ackSelfClosing = true;
}
function paramStartTagInBody(p, token) {
  p._appendElement(token, NS.HTML);
  token.ackSelfClosing = true;
}
function hrStartTagInBody(p, token) {
  if (p.openElements.hasInButtonScope(TAG_ID.P)) {
    p._closePElement();
  }
  p._appendElement(token, NS.HTML);
  p.framesetOk = false;
  token.ackSelfClosing = true;
}
function imageStartTagInBody(p, token) {
  token.tagName = TAG_NAMES.IMG;
  token.tagID = TAG_ID.IMG;
  areaStartTagInBody(p, token);
}
function textareaStartTagInBody(p, token) {
  p._insertElement(token, NS.HTML);
  p.skipNextNewLine = true;
  p.tokenizer.state = TokenizerMode.RCDATA;
  p.originalInsertionMode = p.insertionMode;
  p.framesetOk = false;
  p.insertionMode = InsertionMode.TEXT;
}
function xmpStartTagInBody(p, token) {
  if (p.openElements.hasInButtonScope(TAG_ID.P)) {
    p._closePElement();
  }
  p._reconstructActiveFormattingElements();
  p.framesetOk = false;
  p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
}
function iframeStartTagInBody(p, token) {
  p.framesetOk = false;
  p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
}
function noembedStartTagInBody(p, token) {
  p._switchToTextParsing(token, TokenizerMode.RAWTEXT);
}
function selectStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements();
  p._insertElement(token, NS.HTML);
  p.framesetOk = false;
  p.insertionMode = p.insertionMode === InsertionMode.IN_TABLE || p.insertionMode === InsertionMode.IN_CAPTION || p.insertionMode === InsertionMode.IN_TABLE_BODY || p.insertionMode === InsertionMode.IN_ROW || p.insertionMode === InsertionMode.IN_CELL ? InsertionMode.IN_SELECT_IN_TABLE : InsertionMode.IN_SELECT;
}
function optgroupStartTagInBody(p, token) {
  if (p.openElements.currentTagId === TAG_ID.OPTION) {
    p.openElements.pop();
  }
  p._reconstructActiveFormattingElements();
  p._insertElement(token, NS.HTML);
}
function rbStartTagInBody(p, token) {
  if (p.openElements.hasInScope(TAG_ID.RUBY)) {
    p.openElements.generateImpliedEndTags();
  }
  p._insertElement(token, NS.HTML);
}
function rtStartTagInBody(p, token) {
  if (p.openElements.hasInScope(TAG_ID.RUBY)) {
    p.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.RTC);
  }
  p._insertElement(token, NS.HTML);
}
function mathStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements();
  adjustTokenMathMLAttrs(token);
  adjustTokenXMLAttrs(token);
  if (token.selfClosing) {
    p._appendElement(token, NS.MATHML);
  } else {
    p._insertElement(token, NS.MATHML);
  }
  token.ackSelfClosing = true;
}
function svgStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements();
  adjustTokenSVGAttrs(token);
  adjustTokenXMLAttrs(token);
  if (token.selfClosing) {
    p._appendElement(token, NS.SVG);
  } else {
    p._insertElement(token, NS.SVG);
  }
  token.ackSelfClosing = true;
}
function genericStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements();
  p._insertElement(token, NS.HTML);
}
function startTagInBody(p, token) {
  switch (token.tagID) {
    case TAG_ID.I:
    case TAG_ID.S:
    case TAG_ID.B:
    case TAG_ID.U:
    case TAG_ID.EM:
    case TAG_ID.TT:
    case TAG_ID.BIG:
    case TAG_ID.CODE:
    case TAG_ID.FONT:
    case TAG_ID.SMALL:
    case TAG_ID.STRIKE:
    case TAG_ID.STRONG: {
      bStartTagInBody(p, token);
      break;
    }
    case TAG_ID.A: {
      aStartTagInBody(p, token);
      break;
    }
    case TAG_ID.H1:
    case TAG_ID.H2:
    case TAG_ID.H3:
    case TAG_ID.H4:
    case TAG_ID.H5:
    case TAG_ID.H6: {
      numberedHeaderStartTagInBody(p, token);
      break;
    }
    case TAG_ID.P:
    case TAG_ID.DL:
    case TAG_ID.OL:
    case TAG_ID.UL:
    case TAG_ID.DIV:
    case TAG_ID.DIR:
    case TAG_ID.NAV:
    case TAG_ID.MAIN:
    case TAG_ID.MENU:
    case TAG_ID.ASIDE:
    case TAG_ID.CENTER:
    case TAG_ID.FIGURE:
    case TAG_ID.FOOTER:
    case TAG_ID.HEADER:
    case TAG_ID.HGROUP:
    case TAG_ID.DIALOG:
    case TAG_ID.DETAILS:
    case TAG_ID.ADDRESS:
    case TAG_ID.ARTICLE:
    case TAG_ID.SECTION:
    case TAG_ID.SUMMARY:
    case TAG_ID.FIELDSET:
    case TAG_ID.BLOCKQUOTE:
    case TAG_ID.FIGCAPTION: {
      addressStartTagInBody(p, token);
      break;
    }
    case TAG_ID.LI:
    case TAG_ID.DD:
    case TAG_ID.DT: {
      listItemStartTagInBody(p, token);
      break;
    }
    case TAG_ID.BR:
    case TAG_ID.IMG:
    case TAG_ID.WBR:
    case TAG_ID.AREA:
    case TAG_ID.EMBED:
    case TAG_ID.KEYGEN: {
      areaStartTagInBody(p, token);
      break;
    }
    case TAG_ID.HR: {
      hrStartTagInBody(p, token);
      break;
    }
    case TAG_ID.RB:
    case TAG_ID.RTC: {
      rbStartTagInBody(p, token);
      break;
    }
    case TAG_ID.RT:
    case TAG_ID.RP: {
      rtStartTagInBody(p, token);
      break;
    }
    case TAG_ID.PRE:
    case TAG_ID.LISTING: {
      preStartTagInBody(p, token);
      break;
    }
    case TAG_ID.XMP: {
      xmpStartTagInBody(p, token);
      break;
    }
    case TAG_ID.SVG: {
      svgStartTagInBody(p, token);
      break;
    }
    case TAG_ID.HTML: {
      htmlStartTagInBody(p, token);
      break;
    }
    case TAG_ID.BASE:
    case TAG_ID.LINK:
    case TAG_ID.META:
    case TAG_ID.STYLE:
    case TAG_ID.TITLE:
    case TAG_ID.SCRIPT:
    case TAG_ID.BGSOUND:
    case TAG_ID.BASEFONT:
    case TAG_ID.TEMPLATE: {
      startTagInHead(p, token);
      break;
    }
    case TAG_ID.BODY: {
      bodyStartTagInBody(p, token);
      break;
    }
    case TAG_ID.FORM: {
      formStartTagInBody(p, token);
      break;
    }
    case TAG_ID.NOBR: {
      nobrStartTagInBody(p, token);
      break;
    }
    case TAG_ID.MATH: {
      mathStartTagInBody(p, token);
      break;
    }
    case TAG_ID.TABLE: {
      tableStartTagInBody(p, token);
      break;
    }
    case TAG_ID.INPUT: {
      inputStartTagInBody(p, token);
      break;
    }
    case TAG_ID.PARAM:
    case TAG_ID.TRACK:
    case TAG_ID.SOURCE: {
      paramStartTagInBody(p, token);
      break;
    }
    case TAG_ID.IMAGE: {
      imageStartTagInBody(p, token);
      break;
    }
    case TAG_ID.BUTTON: {
      buttonStartTagInBody(p, token);
      break;
    }
    case TAG_ID.APPLET:
    case TAG_ID.OBJECT:
    case TAG_ID.MARQUEE: {
      appletStartTagInBody(p, token);
      break;
    }
    case TAG_ID.IFRAME: {
      iframeStartTagInBody(p, token);
      break;
    }
    case TAG_ID.SELECT: {
      selectStartTagInBody(p, token);
      break;
    }
    case TAG_ID.OPTION:
    case TAG_ID.OPTGROUP: {
      optgroupStartTagInBody(p, token);
      break;
    }
    case TAG_ID.NOEMBED: {
      noembedStartTagInBody(p, token);
      break;
    }
    case TAG_ID.FRAMESET: {
      framesetStartTagInBody(p, token);
      break;
    }
    case TAG_ID.TEXTAREA: {
      textareaStartTagInBody(p, token);
      break;
    }
    case TAG_ID.NOSCRIPT: {
      if (p.options.scriptingEnabled) {
        noembedStartTagInBody(p, token);
      } else {
        genericStartTagInBody(p, token);
      }
      break;
    }
    case TAG_ID.PLAINTEXT: {
      plaintextStartTagInBody(p, token);
      break;
    }
    case TAG_ID.COL:
    case TAG_ID.TH:
    case TAG_ID.TD:
    case TAG_ID.TR:
    case TAG_ID.HEAD:
    case TAG_ID.FRAME:
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD:
    case TAG_ID.CAPTION:
    case TAG_ID.COLGROUP: {
      break;
    }
    default: {
      genericStartTagInBody(p, token);
    }
  }
}
function bodyEndTagInBody(p, token) {
  if (p.openElements.hasInScope(TAG_ID.BODY)) {
    p.insertionMode = InsertionMode.AFTER_BODY;
    if (p.options.sourceCodeLocationInfo) {
      const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
      if (bodyElement) {
        p._setEndLocation(bodyElement, token);
      }
    }
  }
}
function htmlEndTagInBody(p, token) {
  if (p.openElements.hasInScope(TAG_ID.BODY)) {
    p.insertionMode = InsertionMode.AFTER_BODY;
    endTagAfterBody(p, token);
  }
}
function addressEndTagInBody(p, token) {
  const tn = token.tagID;
  if (p.openElements.hasInScope(tn)) {
    p.openElements.generateImpliedEndTags();
    p.openElements.popUntilTagNamePopped(tn);
  }
}
function formEndTagInBody(p) {
  const inTemplate = p.openElements.tmplCount > 0;
  const { formElement } = p;
  if (!inTemplate) {
    p.formElement = null;
  }
  if ((formElement || inTemplate) && p.openElements.hasInScope(TAG_ID.FORM)) {
    p.openElements.generateImpliedEndTags();
    if (inTemplate) {
      p.openElements.popUntilTagNamePopped(TAG_ID.FORM);
    } else if (formElement) {
      p.openElements.remove(formElement);
    }
  }
}
function pEndTagInBody(p) {
  if (!p.openElements.hasInButtonScope(TAG_ID.P)) {
    p._insertFakeElement(TAG_NAMES.P, TAG_ID.P);
  }
  p._closePElement();
}
function liEndTagInBody(p) {
  if (p.openElements.hasInListItemScope(TAG_ID.LI)) {
    p.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.LI);
    p.openElements.popUntilTagNamePopped(TAG_ID.LI);
  }
}
function ddEndTagInBody(p, token) {
  const tn = token.tagID;
  if (p.openElements.hasInScope(tn)) {
    p.openElements.generateImpliedEndTagsWithExclusion(tn);
    p.openElements.popUntilTagNamePopped(tn);
  }
}
function numberedHeaderEndTagInBody(p) {
  if (p.openElements.hasNumberedHeaderInScope()) {
    p.openElements.generateImpliedEndTags();
    p.openElements.popUntilNumberedHeaderPopped();
  }
}
function appletEndTagInBody(p, token) {
  const tn = token.tagID;
  if (p.openElements.hasInScope(tn)) {
    p.openElements.generateImpliedEndTags();
    p.openElements.popUntilTagNamePopped(tn);
    p.activeFormattingElements.clearToLastMarker();
  }
}
function brEndTagInBody(p) {
  p._reconstructActiveFormattingElements();
  p._insertFakeElement(TAG_NAMES.BR, TAG_ID.BR);
  p.openElements.pop();
  p.framesetOk = false;
}
function genericEndTagInBody(p, token) {
  const tn = token.tagName;
  const tid = token.tagID;
  for (let i = p.openElements.stackTop; i > 0; i--) {
    const element = p.openElements.items[i];
    const elementId = p.openElements.tagIDs[i];
    if (tid === elementId && (tid !== TAG_ID.UNKNOWN || p.treeAdapter.getTagName(element) === tn)) {
      p.openElements.generateImpliedEndTagsWithExclusion(tid);
      if (p.openElements.stackTop >= i)
        p.openElements.shortenToLength(i);
      break;
    }
    if (p._isSpecialElement(element, elementId)) {
      break;
    }
  }
}
function endTagInBody(p, token) {
  switch (token.tagID) {
    case TAG_ID.A:
    case TAG_ID.B:
    case TAG_ID.I:
    case TAG_ID.S:
    case TAG_ID.U:
    case TAG_ID.EM:
    case TAG_ID.TT:
    case TAG_ID.BIG:
    case TAG_ID.CODE:
    case TAG_ID.FONT:
    case TAG_ID.NOBR:
    case TAG_ID.SMALL:
    case TAG_ID.STRIKE:
    case TAG_ID.STRONG: {
      callAdoptionAgency(p, token);
      break;
    }
    case TAG_ID.P: {
      pEndTagInBody(p);
      break;
    }
    case TAG_ID.DL:
    case TAG_ID.UL:
    case TAG_ID.OL:
    case TAG_ID.DIR:
    case TAG_ID.DIV:
    case TAG_ID.NAV:
    case TAG_ID.PRE:
    case TAG_ID.MAIN:
    case TAG_ID.MENU:
    case TAG_ID.ASIDE:
    case TAG_ID.BUTTON:
    case TAG_ID.CENTER:
    case TAG_ID.FIGURE:
    case TAG_ID.FOOTER:
    case TAG_ID.HEADER:
    case TAG_ID.HGROUP:
    case TAG_ID.DIALOG:
    case TAG_ID.ADDRESS:
    case TAG_ID.ARTICLE:
    case TAG_ID.DETAILS:
    case TAG_ID.SECTION:
    case TAG_ID.SUMMARY:
    case TAG_ID.LISTING:
    case TAG_ID.FIELDSET:
    case TAG_ID.BLOCKQUOTE:
    case TAG_ID.FIGCAPTION: {
      addressEndTagInBody(p, token);
      break;
    }
    case TAG_ID.LI: {
      liEndTagInBody(p);
      break;
    }
    case TAG_ID.DD:
    case TAG_ID.DT: {
      ddEndTagInBody(p, token);
      break;
    }
    case TAG_ID.H1:
    case TAG_ID.H2:
    case TAG_ID.H3:
    case TAG_ID.H4:
    case TAG_ID.H5:
    case TAG_ID.H6: {
      numberedHeaderEndTagInBody(p);
      break;
    }
    case TAG_ID.BR: {
      brEndTagInBody(p);
      break;
    }
    case TAG_ID.BODY: {
      bodyEndTagInBody(p, token);
      break;
    }
    case TAG_ID.HTML: {
      htmlEndTagInBody(p, token);
      break;
    }
    case TAG_ID.FORM: {
      formEndTagInBody(p);
      break;
    }
    case TAG_ID.APPLET:
    case TAG_ID.OBJECT:
    case TAG_ID.MARQUEE: {
      appletEndTagInBody(p, token);
      break;
    }
    case TAG_ID.TEMPLATE: {
      templateEndTagInHead(p, token);
      break;
    }
    default: {
      genericEndTagInBody(p, token);
    }
  }
}
function eofInBody(p, token) {
  if (p.tmplInsertionModeStack.length > 0) {
    eofInTemplate(p, token);
  } else {
    stopParsing(p, token);
  }
}
function endTagInText(p, token) {
  var _a3;
  if (token.tagID === TAG_ID.SCRIPT) {
    (_a3 = p.scriptHandler) === null || _a3 === void 0 ? void 0 : _a3.call(p, p.openElements.current);
  }
  p.openElements.pop();
  p.insertionMode = p.originalInsertionMode;
}
function eofInText(p, token) {
  p._err(token, ERR.eofInElementThatCanContainOnlyText);
  p.openElements.pop();
  p.insertionMode = p.originalInsertionMode;
  p.onEof(token);
}
function characterInTable(p, token) {
  if (TABLE_STRUCTURE_TAGS.has(p.openElements.currentTagId)) {
    p.pendingCharacterTokens.length = 0;
    p.hasNonWhitespacePendingCharacterToken = false;
    p.originalInsertionMode = p.insertionMode;
    p.insertionMode = InsertionMode.IN_TABLE_TEXT;
    switch (token.type) {
      case TokenType.CHARACTER: {
        characterInTableText(p, token);
        break;
      }
      case TokenType.WHITESPACE_CHARACTER: {
        whitespaceCharacterInTableText(p, token);
        break;
      }
    }
  } else {
    tokenInTable(p, token);
  }
}
function captionStartTagInTable(p, token) {
  p.openElements.clearBackToTableContext();
  p.activeFormattingElements.insertMarker();
  p._insertElement(token, NS.HTML);
  p.insertionMode = InsertionMode.IN_CAPTION;
}
function colgroupStartTagInTable(p, token) {
  p.openElements.clearBackToTableContext();
  p._insertElement(token, NS.HTML);
  p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
}
function colStartTagInTable(p, token) {
  p.openElements.clearBackToTableContext();
  p._insertFakeElement(TAG_NAMES.COLGROUP, TAG_ID.COLGROUP);
  p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
  startTagInColumnGroup(p, token);
}
function tbodyStartTagInTable(p, token) {
  p.openElements.clearBackToTableContext();
  p._insertElement(token, NS.HTML);
  p.insertionMode = InsertionMode.IN_TABLE_BODY;
}
function tdStartTagInTable(p, token) {
  p.openElements.clearBackToTableContext();
  p._insertFakeElement(TAG_NAMES.TBODY, TAG_ID.TBODY);
  p.insertionMode = InsertionMode.IN_TABLE_BODY;
  startTagInTableBody(p, token);
}
function tableStartTagInTable(p, token) {
  if (p.openElements.hasInTableScope(TAG_ID.TABLE)) {
    p.openElements.popUntilTagNamePopped(TAG_ID.TABLE);
    p._resetInsertionMode();
    p._processStartTag(token);
  }
}
function inputStartTagInTable(p, token) {
  if (isHiddenInput(token)) {
    p._appendElement(token, NS.HTML);
  } else {
    tokenInTable(p, token);
  }
  token.ackSelfClosing = true;
}
function formStartTagInTable(p, token) {
  if (!p.formElement && p.openElements.tmplCount === 0) {
    p._insertElement(token, NS.HTML);
    p.formElement = p.openElements.current;
    p.openElements.pop();
  }
}
function startTagInTable(p, token) {
  switch (token.tagID) {
    case TAG_ID.TD:
    case TAG_ID.TH:
    case TAG_ID.TR: {
      tdStartTagInTable(p, token);
      break;
    }
    case TAG_ID.STYLE:
    case TAG_ID.SCRIPT:
    case TAG_ID.TEMPLATE: {
      startTagInHead(p, token);
      break;
    }
    case TAG_ID.COL: {
      colStartTagInTable(p, token);
      break;
    }
    case TAG_ID.FORM: {
      formStartTagInTable(p, token);
      break;
    }
    case TAG_ID.TABLE: {
      tableStartTagInTable(p, token);
      break;
    }
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD: {
      tbodyStartTagInTable(p, token);
      break;
    }
    case TAG_ID.INPUT: {
      inputStartTagInTable(p, token);
      break;
    }
    case TAG_ID.CAPTION: {
      captionStartTagInTable(p, token);
      break;
    }
    case TAG_ID.COLGROUP: {
      colgroupStartTagInTable(p, token);
      break;
    }
    default: {
      tokenInTable(p, token);
    }
  }
}
function endTagInTable(p, token) {
  switch (token.tagID) {
    case TAG_ID.TABLE: {
      if (p.openElements.hasInTableScope(TAG_ID.TABLE)) {
        p.openElements.popUntilTagNamePopped(TAG_ID.TABLE);
        p._resetInsertionMode();
      }
      break;
    }
    case TAG_ID.TEMPLATE: {
      templateEndTagInHead(p, token);
      break;
    }
    case TAG_ID.BODY:
    case TAG_ID.CAPTION:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.HTML:
    case TAG_ID.TBODY:
    case TAG_ID.TD:
    case TAG_ID.TFOOT:
    case TAG_ID.TH:
    case TAG_ID.THEAD:
    case TAG_ID.TR: {
      break;
    }
    default: {
      tokenInTable(p, token);
    }
  }
}
function tokenInTable(p, token) {
  const savedFosterParentingState = p.fosterParentingEnabled;
  p.fosterParentingEnabled = true;
  modeInBody(p, token);
  p.fosterParentingEnabled = savedFosterParentingState;
}
function whitespaceCharacterInTableText(p, token) {
  p.pendingCharacterTokens.push(token);
}
function characterInTableText(p, token) {
  p.pendingCharacterTokens.push(token);
  p.hasNonWhitespacePendingCharacterToken = true;
}
function tokenInTableText(p, token) {
  let i = 0;
  if (p.hasNonWhitespacePendingCharacterToken) {
    for (; i < p.pendingCharacterTokens.length; i++) {
      tokenInTable(p, p.pendingCharacterTokens[i]);
    }
  } else {
    for (; i < p.pendingCharacterTokens.length; i++) {
      p._insertCharacters(p.pendingCharacterTokens[i]);
    }
  }
  p.insertionMode = p.originalInsertionMode;
  p._processToken(token);
}
const TABLE_VOID_ELEMENTS = /* @__PURE__ */ new Set([TAG_ID.CAPTION, TAG_ID.COL, TAG_ID.COLGROUP, TAG_ID.TBODY, TAG_ID.TD, TAG_ID.TFOOT, TAG_ID.TH, TAG_ID.THEAD, TAG_ID.TR]);
function startTagInCaption(p, token) {
  const tn = token.tagID;
  if (TABLE_VOID_ELEMENTS.has(tn)) {
    if (p.openElements.hasInTableScope(TAG_ID.CAPTION)) {
      p.openElements.generateImpliedEndTags();
      p.openElements.popUntilTagNamePopped(TAG_ID.CAPTION);
      p.activeFormattingElements.clearToLastMarker();
      p.insertionMode = InsertionMode.IN_TABLE;
      startTagInTable(p, token);
    }
  } else {
    startTagInBody(p, token);
  }
}
function endTagInCaption(p, token) {
  const tn = token.tagID;
  switch (tn) {
    case TAG_ID.CAPTION:
    case TAG_ID.TABLE: {
      if (p.openElements.hasInTableScope(TAG_ID.CAPTION)) {
        p.openElements.generateImpliedEndTags();
        p.openElements.popUntilTagNamePopped(TAG_ID.CAPTION);
        p.activeFormattingElements.clearToLastMarker();
        p.insertionMode = InsertionMode.IN_TABLE;
        if (tn === TAG_ID.TABLE) {
          endTagInTable(p, token);
        }
      }
      break;
    }
    case TAG_ID.BODY:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.HTML:
    case TAG_ID.TBODY:
    case TAG_ID.TD:
    case TAG_ID.TFOOT:
    case TAG_ID.TH:
    case TAG_ID.THEAD:
    case TAG_ID.TR: {
      break;
    }
    default: {
      endTagInBody(p, token);
    }
  }
}
function startTagInColumnGroup(p, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p, token);
      break;
    }
    case TAG_ID.COL: {
      p._appendElement(token, NS.HTML);
      token.ackSelfClosing = true;
      break;
    }
    case TAG_ID.TEMPLATE: {
      startTagInHead(p, token);
      break;
    }
    default: {
      tokenInColumnGroup(p, token);
    }
  }
}
function endTagInColumnGroup(p, token) {
  switch (token.tagID) {
    case TAG_ID.COLGROUP: {
      if (p.openElements.currentTagId === TAG_ID.COLGROUP) {
        p.openElements.pop();
        p.insertionMode = InsertionMode.IN_TABLE;
      }
      break;
    }
    case TAG_ID.TEMPLATE: {
      templateEndTagInHead(p, token);
      break;
    }
    case TAG_ID.COL: {
      break;
    }
    default: {
      tokenInColumnGroup(p, token);
    }
  }
}
function tokenInColumnGroup(p, token) {
  if (p.openElements.currentTagId === TAG_ID.COLGROUP) {
    p.openElements.pop();
    p.insertionMode = InsertionMode.IN_TABLE;
    p._processToken(token);
  }
}
function startTagInTableBody(p, token) {
  switch (token.tagID) {
    case TAG_ID.TR: {
      p.openElements.clearBackToTableBodyContext();
      p._insertElement(token, NS.HTML);
      p.insertionMode = InsertionMode.IN_ROW;
      break;
    }
    case TAG_ID.TH:
    case TAG_ID.TD: {
      p.openElements.clearBackToTableBodyContext();
      p._insertFakeElement(TAG_NAMES.TR, TAG_ID.TR);
      p.insertionMode = InsertionMode.IN_ROW;
      startTagInRow(p, token);
      break;
    }
    case TAG_ID.CAPTION:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD: {
      if (p.openElements.hasTableBodyContextInTableScope()) {
        p.openElements.clearBackToTableBodyContext();
        p.openElements.pop();
        p.insertionMode = InsertionMode.IN_TABLE;
        startTagInTable(p, token);
      }
      break;
    }
    default: {
      startTagInTable(p, token);
    }
  }
}
function endTagInTableBody(p, token) {
  const tn = token.tagID;
  switch (token.tagID) {
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD: {
      if (p.openElements.hasInTableScope(tn)) {
        p.openElements.clearBackToTableBodyContext();
        p.openElements.pop();
        p.insertionMode = InsertionMode.IN_TABLE;
      }
      break;
    }
    case TAG_ID.TABLE: {
      if (p.openElements.hasTableBodyContextInTableScope()) {
        p.openElements.clearBackToTableBodyContext();
        p.openElements.pop();
        p.insertionMode = InsertionMode.IN_TABLE;
        endTagInTable(p, token);
      }
      break;
    }
    case TAG_ID.BODY:
    case TAG_ID.CAPTION:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.HTML:
    case TAG_ID.TD:
    case TAG_ID.TH:
    case TAG_ID.TR: {
      break;
    }
    default: {
      endTagInTable(p, token);
    }
  }
}
function startTagInRow(p, token) {
  switch (token.tagID) {
    case TAG_ID.TH:
    case TAG_ID.TD: {
      p.openElements.clearBackToTableRowContext();
      p._insertElement(token, NS.HTML);
      p.insertionMode = InsertionMode.IN_CELL;
      p.activeFormattingElements.insertMarker();
      break;
    }
    case TAG_ID.CAPTION:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD:
    case TAG_ID.TR: {
      if (p.openElements.hasInTableScope(TAG_ID.TR)) {
        p.openElements.clearBackToTableRowContext();
        p.openElements.pop();
        p.insertionMode = InsertionMode.IN_TABLE_BODY;
        startTagInTableBody(p, token);
      }
      break;
    }
    default: {
      startTagInTable(p, token);
    }
  }
}
function endTagInRow(p, token) {
  switch (token.tagID) {
    case TAG_ID.TR: {
      if (p.openElements.hasInTableScope(TAG_ID.TR)) {
        p.openElements.clearBackToTableRowContext();
        p.openElements.pop();
        p.insertionMode = InsertionMode.IN_TABLE_BODY;
      }
      break;
    }
    case TAG_ID.TABLE: {
      if (p.openElements.hasInTableScope(TAG_ID.TR)) {
        p.openElements.clearBackToTableRowContext();
        p.openElements.pop();
        p.insertionMode = InsertionMode.IN_TABLE_BODY;
        endTagInTableBody(p, token);
      }
      break;
    }
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD: {
      if (p.openElements.hasInTableScope(token.tagID) || p.openElements.hasInTableScope(TAG_ID.TR)) {
        p.openElements.clearBackToTableRowContext();
        p.openElements.pop();
        p.insertionMode = InsertionMode.IN_TABLE_BODY;
        endTagInTableBody(p, token);
      }
      break;
    }
    case TAG_ID.BODY:
    case TAG_ID.CAPTION:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.HTML:
    case TAG_ID.TD:
    case TAG_ID.TH: {
      break;
    }
    default: {
      endTagInTable(p, token);
    }
  }
}
function startTagInCell(p, token) {
  const tn = token.tagID;
  if (TABLE_VOID_ELEMENTS.has(tn)) {
    if (p.openElements.hasInTableScope(TAG_ID.TD) || p.openElements.hasInTableScope(TAG_ID.TH)) {
      p._closeTableCell();
      startTagInRow(p, token);
    }
  } else {
    startTagInBody(p, token);
  }
}
function endTagInCell(p, token) {
  const tn = token.tagID;
  switch (tn) {
    case TAG_ID.TD:
    case TAG_ID.TH: {
      if (p.openElements.hasInTableScope(tn)) {
        p.openElements.generateImpliedEndTags();
        p.openElements.popUntilTagNamePopped(tn);
        p.activeFormattingElements.clearToLastMarker();
        p.insertionMode = InsertionMode.IN_ROW;
      }
      break;
    }
    case TAG_ID.TABLE:
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD:
    case TAG_ID.TR: {
      if (p.openElements.hasInTableScope(tn)) {
        p._closeTableCell();
        endTagInRow(p, token);
      }
      break;
    }
    case TAG_ID.BODY:
    case TAG_ID.CAPTION:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.HTML: {
      break;
    }
    default: {
      endTagInBody(p, token);
    }
  }
}
function startTagInSelect(p, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p, token);
      break;
    }
    case TAG_ID.OPTION: {
      if (p.openElements.currentTagId === TAG_ID.OPTION) {
        p.openElements.pop();
      }
      p._insertElement(token, NS.HTML);
      break;
    }
    case TAG_ID.OPTGROUP: {
      if (p.openElements.currentTagId === TAG_ID.OPTION) {
        p.openElements.pop();
      }
      if (p.openElements.currentTagId === TAG_ID.OPTGROUP) {
        p.openElements.pop();
      }
      p._insertElement(token, NS.HTML);
      break;
    }
    case TAG_ID.INPUT:
    case TAG_ID.KEYGEN:
    case TAG_ID.TEXTAREA:
    case TAG_ID.SELECT: {
      if (p.openElements.hasInSelectScope(TAG_ID.SELECT)) {
        p.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
        p._resetInsertionMode();
        if (token.tagID !== TAG_ID.SELECT) {
          p._processStartTag(token);
        }
      }
      break;
    }
    case TAG_ID.SCRIPT:
    case TAG_ID.TEMPLATE: {
      startTagInHead(p, token);
      break;
    }
  }
}
function endTagInSelect(p, token) {
  switch (token.tagID) {
    case TAG_ID.OPTGROUP: {
      if (p.openElements.stackTop > 0 && p.openElements.currentTagId === TAG_ID.OPTION && p.openElements.tagIDs[p.openElements.stackTop - 1] === TAG_ID.OPTGROUP) {
        p.openElements.pop();
      }
      if (p.openElements.currentTagId === TAG_ID.OPTGROUP) {
        p.openElements.pop();
      }
      break;
    }
    case TAG_ID.OPTION: {
      if (p.openElements.currentTagId === TAG_ID.OPTION) {
        p.openElements.pop();
      }
      break;
    }
    case TAG_ID.SELECT: {
      if (p.openElements.hasInSelectScope(TAG_ID.SELECT)) {
        p.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
        p._resetInsertionMode();
      }
      break;
    }
    case TAG_ID.TEMPLATE: {
      templateEndTagInHead(p, token);
      break;
    }
  }
}
function startTagInSelectInTable(p, token) {
  const tn = token.tagID;
  if (tn === TAG_ID.CAPTION || tn === TAG_ID.TABLE || tn === TAG_ID.TBODY || tn === TAG_ID.TFOOT || tn === TAG_ID.THEAD || tn === TAG_ID.TR || tn === TAG_ID.TD || tn === TAG_ID.TH) {
    p.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
    p._resetInsertionMode();
    p._processStartTag(token);
  } else {
    startTagInSelect(p, token);
  }
}
function endTagInSelectInTable(p, token) {
  const tn = token.tagID;
  if (tn === TAG_ID.CAPTION || tn === TAG_ID.TABLE || tn === TAG_ID.TBODY || tn === TAG_ID.TFOOT || tn === TAG_ID.THEAD || tn === TAG_ID.TR || tn === TAG_ID.TD || tn === TAG_ID.TH) {
    if (p.openElements.hasInTableScope(tn)) {
      p.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
      p._resetInsertionMode();
      p.onEndTag(token);
    }
  } else {
    endTagInSelect(p, token);
  }
}
function startTagInTemplate(p, token) {
  switch (token.tagID) {
    case TAG_ID.BASE:
    case TAG_ID.BASEFONT:
    case TAG_ID.BGSOUND:
    case TAG_ID.LINK:
    case TAG_ID.META:
    case TAG_ID.NOFRAMES:
    case TAG_ID.SCRIPT:
    case TAG_ID.STYLE:
    case TAG_ID.TEMPLATE:
    case TAG_ID.TITLE: {
      startTagInHead(p, token);
      break;
    }
    case TAG_ID.CAPTION:
    case TAG_ID.COLGROUP:
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD: {
      p.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE;
      p.insertionMode = InsertionMode.IN_TABLE;
      startTagInTable(p, token);
      break;
    }
    case TAG_ID.COL: {
      p.tmplInsertionModeStack[0] = InsertionMode.IN_COLUMN_GROUP;
      p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
      startTagInColumnGroup(p, token);
      break;
    }
    case TAG_ID.TR: {
      p.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE_BODY;
      p.insertionMode = InsertionMode.IN_TABLE_BODY;
      startTagInTableBody(p, token);
      break;
    }
    case TAG_ID.TD:
    case TAG_ID.TH: {
      p.tmplInsertionModeStack[0] = InsertionMode.IN_ROW;
      p.insertionMode = InsertionMode.IN_ROW;
      startTagInRow(p, token);
      break;
    }
    default: {
      p.tmplInsertionModeStack[0] = InsertionMode.IN_BODY;
      p.insertionMode = InsertionMode.IN_BODY;
      startTagInBody(p, token);
    }
  }
}
function endTagInTemplate(p, token) {
  if (token.tagID === TAG_ID.TEMPLATE) {
    templateEndTagInHead(p, token);
  }
}
function eofInTemplate(p, token) {
  if (p.openElements.tmplCount > 0) {
    p.openElements.popUntilTagNamePopped(TAG_ID.TEMPLATE);
    p.activeFormattingElements.clearToLastMarker();
    p.tmplInsertionModeStack.shift();
    p._resetInsertionMode();
    p.onEof(token);
  } else {
    stopParsing(p, token);
  }
}
function startTagAfterBody(p, token) {
  if (token.tagID === TAG_ID.HTML) {
    startTagInBody(p, token);
  } else {
    tokenAfterBody(p, token);
  }
}
function endTagAfterBody(p, token) {
  var _a3;
  if (token.tagID === TAG_ID.HTML) {
    if (!p.fragmentContext) {
      p.insertionMode = InsertionMode.AFTER_AFTER_BODY;
    }
    if (p.options.sourceCodeLocationInfo && p.openElements.tagIDs[0] === TAG_ID.HTML) {
      p._setEndLocation(p.openElements.items[0], token);
      const bodyElement = p.openElements.items[1];
      if (bodyElement && !((_a3 = p.treeAdapter.getNodeSourceCodeLocation(bodyElement)) === null || _a3 === void 0 ? void 0 : _a3.endTag)) {
        p._setEndLocation(bodyElement, token);
      }
    }
  } else {
    tokenAfterBody(p, token);
  }
}
function tokenAfterBody(p, token) {
  p.insertionMode = InsertionMode.IN_BODY;
  modeInBody(p, token);
}
function startTagInFrameset(p, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p, token);
      break;
    }
    case TAG_ID.FRAMESET: {
      p._insertElement(token, NS.HTML);
      break;
    }
    case TAG_ID.FRAME: {
      p._appendElement(token, NS.HTML);
      token.ackSelfClosing = true;
      break;
    }
    case TAG_ID.NOFRAMES: {
      startTagInHead(p, token);
      break;
    }
  }
}
function endTagInFrameset(p, token) {
  if (token.tagID === TAG_ID.FRAMESET && !p.openElements.isRootHtmlElementCurrent()) {
    p.openElements.pop();
    if (!p.fragmentContext && p.openElements.currentTagId !== TAG_ID.FRAMESET) {
      p.insertionMode = InsertionMode.AFTER_FRAMESET;
    }
  }
}
function startTagAfterFrameset(p, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p, token);
      break;
    }
    case TAG_ID.NOFRAMES: {
      startTagInHead(p, token);
      break;
    }
  }
}
function endTagAfterFrameset(p, token) {
  if (token.tagID === TAG_ID.HTML) {
    p.insertionMode = InsertionMode.AFTER_AFTER_FRAMESET;
  }
}
function startTagAfterAfterBody(p, token) {
  if (token.tagID === TAG_ID.HTML) {
    startTagInBody(p, token);
  } else {
    tokenAfterAfterBody(p, token);
  }
}
function tokenAfterAfterBody(p, token) {
  p.insertionMode = InsertionMode.IN_BODY;
  modeInBody(p, token);
}
function startTagAfterAfterFrameset(p, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p, token);
      break;
    }
    case TAG_ID.NOFRAMES: {
      startTagInHead(p, token);
      break;
    }
  }
}
function nullCharacterInForeignContent(p, token) {
  token.chars = REPLACEMENT_CHARACTER;
  p._insertCharacters(token);
}
function characterInForeignContent(p, token) {
  p._insertCharacters(token);
  p.framesetOk = false;
}
function popUntilHtmlOrIntegrationPoint(p) {
  while (p.treeAdapter.getNamespaceURI(p.openElements.current) !== NS.HTML && !p._isIntegrationPoint(p.openElements.currentTagId, p.openElements.current)) {
    p.openElements.pop();
  }
}
function startTagInForeignContent(p, token) {
  if (causesExit(token)) {
    popUntilHtmlOrIntegrationPoint(p);
    p._startTagOutsideForeignContent(token);
  } else {
    const current = p._getAdjustedCurrentElement();
    const currentNs = p.treeAdapter.getNamespaceURI(current);
    if (currentNs === NS.MATHML) {
      adjustTokenMathMLAttrs(token);
    } else if (currentNs === NS.SVG) {
      adjustTokenSVGTagName(token);
      adjustTokenSVGAttrs(token);
    }
    adjustTokenXMLAttrs(token);
    if (token.selfClosing) {
      p._appendElement(token, currentNs);
    } else {
      p._insertElement(token, currentNs);
    }
    token.ackSelfClosing = true;
  }
}
function endTagInForeignContent(p, token) {
  if (token.tagID === TAG_ID.P || token.tagID === TAG_ID.BR) {
    popUntilHtmlOrIntegrationPoint(p);
    p._endTagOutsideForeignContent(token);
    return;
  }
  for (let i = p.openElements.stackTop; i > 0; i--) {
    const element = p.openElements.items[i];
    if (p.treeAdapter.getNamespaceURI(element) === NS.HTML) {
      p._endTagOutsideForeignContent(token);
      break;
    }
    const tagName = p.treeAdapter.getTagName(element);
    if (tagName.toLowerCase() === token.tagName) {
      token.tagName = tagName;
      p.openElements.shortenToLength(i);
      break;
    }
  }
}
const VOID_ELEMENTS = /* @__PURE__ */ new Set([
  TAG_NAMES.AREA,
  TAG_NAMES.BASE,
  TAG_NAMES.BASEFONT,
  TAG_NAMES.BGSOUND,
  TAG_NAMES.BR,
  TAG_NAMES.COL,
  TAG_NAMES.EMBED,
  TAG_NAMES.FRAME,
  TAG_NAMES.HR,
  TAG_NAMES.IMG,
  TAG_NAMES.INPUT,
  TAG_NAMES.KEYGEN,
  TAG_NAMES.LINK,
  TAG_NAMES.META,
  TAG_NAMES.PARAM,
  TAG_NAMES.SOURCE,
  TAG_NAMES.TRACK,
  TAG_NAMES.WBR
]);
function isVoidElement(node, options2) {
  return options2.treeAdapter.isElementNode(node) && options2.treeAdapter.getNamespaceURI(node) === NS.HTML && VOID_ELEMENTS.has(options2.treeAdapter.getTagName(node));
}
const defaultOpts = { treeAdapter: defaultTreeAdapter, scriptingEnabled: true };
function serializeOuter(node, options2) {
  const opts = { ...defaultOpts, ...options2 };
  return serializeNode(node, opts);
}
function serializeChildNodes(parentNode, options2) {
  let html2 = "";
  const container = options2.treeAdapter.isElementNode(parentNode) && options2.treeAdapter.getTagName(parentNode) === TAG_NAMES.TEMPLATE && options2.treeAdapter.getNamespaceURI(parentNode) === NS.HTML ? options2.treeAdapter.getTemplateContent(parentNode) : parentNode;
  const childNodes = options2.treeAdapter.getChildNodes(container);
  if (childNodes) {
    for (const currentNode of childNodes) {
      html2 += serializeNode(currentNode, options2);
    }
  }
  return html2;
}
function serializeNode(node, options2) {
  if (options2.treeAdapter.isElementNode(node)) {
    return serializeElement(node, options2);
  }
  if (options2.treeAdapter.isTextNode(node)) {
    return serializeTextNode(node, options2);
  }
  if (options2.treeAdapter.isCommentNode(node)) {
    return serializeCommentNode(node, options2);
  }
  if (options2.treeAdapter.isDocumentTypeNode(node)) {
    return serializeDocumentTypeNode(node, options2);
  }
  return "";
}
function serializeElement(node, options2) {
  const tn = options2.treeAdapter.getTagName(node);
  return `<${tn}${serializeAttributes(node, options2)}>${isVoidElement(node, options2) ? "" : `${serializeChildNodes(node, options2)}</${tn}>`}`;
}
function serializeAttributes(node, { treeAdapter }) {
  let html2 = "";
  for (const attr2 of treeAdapter.getAttrList(node)) {
    html2 += " ";
    if (!attr2.namespace) {
      html2 += attr2.name;
    } else
      switch (attr2.namespace) {
        case NS.XML: {
          html2 += `xml:${attr2.name}`;
          break;
        }
        case NS.XMLNS: {
          if (attr2.name !== "xmlns") {
            html2 += "xmlns:";
          }
          html2 += attr2.name;
          break;
        }
        case NS.XLINK: {
          html2 += `xlink:${attr2.name}`;
          break;
        }
        default: {
          html2 += `${attr2.prefix}:${attr2.name}`;
        }
      }
    html2 += `="${escapeAttribute(attr2.value)}"`;
  }
  return html2;
}
function serializeTextNode(node, options2) {
  const { treeAdapter } = options2;
  const content = treeAdapter.getTextNodeContent(node);
  const parent2 = treeAdapter.getParentNode(node);
  const parentTn = parent2 && treeAdapter.isElementNode(parent2) && treeAdapter.getTagName(parent2);
  return parentTn && treeAdapter.getNamespaceURI(parent2) === NS.HTML && hasUnescapedText(parentTn, options2.scriptingEnabled) ? content : escapeText(content);
}
function serializeCommentNode(node, { treeAdapter }) {
  return `<!--${treeAdapter.getCommentNodeContent(node)}-->`;
}
function serializeDocumentTypeNode(node, { treeAdapter }) {
  return `<!DOCTYPE ${treeAdapter.getDocumentTypeNodeName(node)}>`;
}
function parse$1(html2, options2) {
  return Parser$1.parse(html2, options2);
}
function parseFragment(fragmentContext, html2, options2) {
  if (typeof fragmentContext === "string") {
    options2 = html2;
    html2 = fragmentContext;
    fragmentContext = null;
  }
  const parser = Parser$1.getFragmentParser(fragmentContext, options2);
  parser.tokenizer.write(html2, true);
  return parser.getFragment();
}
function createTextNode(value) {
  return new Text(value);
}
function enquoteDoctypeId(id) {
  const quote = id.includes('"') ? "'" : '"';
  return quote + id + quote;
}
function serializeDoctypeContent(name, publicId, systemId) {
  let str = "!DOCTYPE ";
  if (name) {
    str += name;
  }
  if (publicId) {
    str += ` PUBLIC ${enquoteDoctypeId(publicId)}`;
  } else if (systemId) {
    str += " SYSTEM";
  }
  if (systemId) {
    str += ` ${enquoteDoctypeId(systemId)}`;
  }
  return str;
}
const adapter$1 = {
  // Re-exports from domhandler
  isCommentNode: isComment,
  isElementNode: isTag,
  isTextNode: isText,
  //Node construction
  createDocument() {
    const node = new Document([]);
    node["x-mode"] = DOCUMENT_MODE.NO_QUIRKS;
    return node;
  },
  createDocumentFragment() {
    return new Document([]);
  },
  createElement(tagName, namespaceURI, attrs) {
    const attribs = /* @__PURE__ */ Object.create(null);
    const attribsNamespace = /* @__PURE__ */ Object.create(null);
    const attribsPrefix = /* @__PURE__ */ Object.create(null);
    for (let i = 0; i < attrs.length; i++) {
      const attrName = attrs[i].name;
      attribs[attrName] = attrs[i].value;
      attribsNamespace[attrName] = attrs[i].namespace;
      attribsPrefix[attrName] = attrs[i].prefix;
    }
    const node = new Element(tagName, attribs, []);
    node.namespace = namespaceURI;
    node["x-attribsNamespace"] = attribsNamespace;
    node["x-attribsPrefix"] = attribsPrefix;
    return node;
  },
  createCommentNode(data2) {
    return new Comment(data2);
  },
  //Tree mutation
  appendChild(parentNode, newNode) {
    const prev2 = parentNode.children[parentNode.children.length - 1];
    if (prev2) {
      prev2.next = newNode;
      newNode.prev = prev2;
    }
    parentNode.children.push(newNode);
    newNode.parent = parentNode;
  },
  insertBefore(parentNode, newNode, referenceNode) {
    const insertionIdx = parentNode.children.indexOf(referenceNode);
    const { prev: prev2 } = referenceNode;
    if (prev2) {
      prev2.next = newNode;
      newNode.prev = prev2;
    }
    referenceNode.prev = newNode;
    newNode.next = referenceNode;
    parentNode.children.splice(insertionIdx, 0, newNode);
    newNode.parent = parentNode;
  },
  setTemplateContent(templateElement, contentElement) {
    adapter$1.appendChild(templateElement, contentElement);
  },
  getTemplateContent(templateElement) {
    return templateElement.children[0];
  },
  setDocumentType(document, name, publicId, systemId) {
    const data2 = serializeDoctypeContent(name, publicId, systemId);
    let doctypeNode = document.children.find((node) => isDirective(node) && node.name === "!doctype");
    if (doctypeNode) {
      doctypeNode.data = data2 !== null && data2 !== void 0 ? data2 : null;
    } else {
      doctypeNode = new ProcessingInstruction("!doctype", data2);
      adapter$1.appendChild(document, doctypeNode);
    }
    doctypeNode["x-name"] = name !== null && name !== void 0 ? name : void 0;
    doctypeNode["x-publicId"] = publicId !== null && publicId !== void 0 ? publicId : void 0;
    doctypeNode["x-systemId"] = systemId !== null && systemId !== void 0 ? systemId : void 0;
  },
  setDocumentMode(document, mode) {
    document["x-mode"] = mode;
  },
  getDocumentMode(document) {
    return document["x-mode"];
  },
  detachNode(node) {
    if (node.parent) {
      const idx = node.parent.children.indexOf(node);
      const { prev: prev2, next: next2 } = node;
      node.prev = null;
      node.next = null;
      if (prev2) {
        prev2.next = next2;
      }
      if (next2) {
        next2.prev = prev2;
      }
      node.parent.children.splice(idx, 1);
      node.parent = null;
    }
  },
  insertText(parentNode, text2) {
    const lastChild = parentNode.children[parentNode.children.length - 1];
    if (lastChild && isText(lastChild)) {
      lastChild.data += text2;
    } else {
      adapter$1.appendChild(parentNode, createTextNode(text2));
    }
  },
  insertTextBefore(parentNode, text2, referenceNode) {
    const prevNode = parentNode.children[parentNode.children.indexOf(referenceNode) - 1];
    if (prevNode && isText(prevNode)) {
      prevNode.data += text2;
    } else {
      adapter$1.insertBefore(parentNode, createTextNode(text2), referenceNode);
    }
  },
  adoptAttributes(recipient, attrs) {
    for (let i = 0; i < attrs.length; i++) {
      const attrName = attrs[i].name;
      if (typeof recipient.attribs[attrName] === "undefined") {
        recipient.attribs[attrName] = attrs[i].value;
        recipient["x-attribsNamespace"][attrName] = attrs[i].namespace;
        recipient["x-attribsPrefix"][attrName] = attrs[i].prefix;
      }
    }
  },
  //Tree traversing
  getFirstChild(node) {
    return node.children[0];
  },
  getChildNodes(node) {
    return node.children;
  },
  getParentNode(node) {
    return node.parent;
  },
  getAttrList(element) {
    return element.attributes;
  },
  //Node data
  getTagName(element) {
    return element.name;
  },
  getNamespaceURI(element) {
    return element.namespace;
  },
  getTextNodeContent(textNode) {
    return textNode.data;
  },
  getCommentNodeContent(commentNode) {
    return commentNode.data;
  },
  getDocumentTypeNodeName(doctypeNode) {
    var _a3;
    return (_a3 = doctypeNode["x-name"]) !== null && _a3 !== void 0 ? _a3 : "";
  },
  getDocumentTypeNodePublicId(doctypeNode) {
    var _a3;
    return (_a3 = doctypeNode["x-publicId"]) !== null && _a3 !== void 0 ? _a3 : "";
  },
  getDocumentTypeNodeSystemId(doctypeNode) {
    var _a3;
    return (_a3 = doctypeNode["x-systemId"]) !== null && _a3 !== void 0 ? _a3 : "";
  },
  //Node types
  isDocumentTypeNode(node) {
    return isDirective(node) && node.name === "!doctype";
  },
  // Source code location
  setNodeSourceCodeLocation(node, location) {
    if (location) {
      node.startIndex = location.startOffset;
      node.endIndex = location.endOffset;
    }
    node.sourceCodeLocation = location;
  },
  getNodeSourceCodeLocation(node) {
    return node.sourceCodeLocation;
  },
  updateNodeSourceCodeLocation(node, endLocation) {
    if (endLocation.endOffset != null)
      node.endIndex = endLocation.endOffset;
    node.sourceCodeLocation = {
      ...node.sourceCodeLocation,
      ...endLocation
    };
  }
};
function parseWithParse5(content, options2, isDocument2, context) {
  const opts = {
    scriptingEnabled: typeof options2.scriptingEnabled === "boolean" ? options2.scriptingEnabled : true,
    treeAdapter: adapter$1,
    sourceCodeLocationInfo: options2.sourceCodeLocationInfo
  };
  return isDocument2 ? parse$1(content, opts) : parseFragment(context, content, opts);
}
const renderOpts = { treeAdapter: adapter$1 };
function renderWithParse5(dom) {
  const nodes = "length" in dom ? dom : [dom];
  for (let index2 = 0; index2 < nodes.length; index2 += 1) {
    const node = nodes[index2];
    if (isDocument(node)) {
      Array.prototype.splice.call(nodes, index2, 1, ...node.children);
    }
  }
  let result = "";
  for (let index2 = 0; index2 < nodes.length; index2 += 1) {
    const node = nodes[index2];
    result += serializeOuter(node, renderOpts);
  }
  return result;
}
var CharCodes;
(function(CharCodes2) {
  CharCodes2[CharCodes2["Tab"] = 9] = "Tab";
  CharCodes2[CharCodes2["NewLine"] = 10] = "NewLine";
  CharCodes2[CharCodes2["FormFeed"] = 12] = "FormFeed";
  CharCodes2[CharCodes2["CarriageReturn"] = 13] = "CarriageReturn";
  CharCodes2[CharCodes2["Space"] = 32] = "Space";
  CharCodes2[CharCodes2["ExclamationMark"] = 33] = "ExclamationMark";
  CharCodes2[CharCodes2["Number"] = 35] = "Number";
  CharCodes2[CharCodes2["Amp"] = 38] = "Amp";
  CharCodes2[CharCodes2["SingleQuote"] = 39] = "SingleQuote";
  CharCodes2[CharCodes2["DoubleQuote"] = 34] = "DoubleQuote";
  CharCodes2[CharCodes2["Dash"] = 45] = "Dash";
  CharCodes2[CharCodes2["Slash"] = 47] = "Slash";
  CharCodes2[CharCodes2["Zero"] = 48] = "Zero";
  CharCodes2[CharCodes2["Nine"] = 57] = "Nine";
  CharCodes2[CharCodes2["Semi"] = 59] = "Semi";
  CharCodes2[CharCodes2["Lt"] = 60] = "Lt";
  CharCodes2[CharCodes2["Eq"] = 61] = "Eq";
  CharCodes2[CharCodes2["Gt"] = 62] = "Gt";
  CharCodes2[CharCodes2["Questionmark"] = 63] = "Questionmark";
  CharCodes2[CharCodes2["UpperA"] = 65] = "UpperA";
  CharCodes2[CharCodes2["LowerA"] = 97] = "LowerA";
  CharCodes2[CharCodes2["UpperF"] = 70] = "UpperF";
  CharCodes2[CharCodes2["LowerF"] = 102] = "LowerF";
  CharCodes2[CharCodes2["UpperZ"] = 90] = "UpperZ";
  CharCodes2[CharCodes2["LowerZ"] = 122] = "LowerZ";
  CharCodes2[CharCodes2["LowerX"] = 120] = "LowerX";
  CharCodes2[CharCodes2["OpeningSquareBracket"] = 91] = "OpeningSquareBracket";
})(CharCodes || (CharCodes = {}));
var State;
(function(State2) {
  State2[State2["Text"] = 1] = "Text";
  State2[State2["BeforeTagName"] = 2] = "BeforeTagName";
  State2[State2["InTagName"] = 3] = "InTagName";
  State2[State2["InSelfClosingTag"] = 4] = "InSelfClosingTag";
  State2[State2["BeforeClosingTagName"] = 5] = "BeforeClosingTagName";
  State2[State2["InClosingTagName"] = 6] = "InClosingTagName";
  State2[State2["AfterClosingTagName"] = 7] = "AfterClosingTagName";
  State2[State2["BeforeAttributeName"] = 8] = "BeforeAttributeName";
  State2[State2["InAttributeName"] = 9] = "InAttributeName";
  State2[State2["AfterAttributeName"] = 10] = "AfterAttributeName";
  State2[State2["BeforeAttributeValue"] = 11] = "BeforeAttributeValue";
  State2[State2["InAttributeValueDq"] = 12] = "InAttributeValueDq";
  State2[State2["InAttributeValueSq"] = 13] = "InAttributeValueSq";
  State2[State2["InAttributeValueNq"] = 14] = "InAttributeValueNq";
  State2[State2["BeforeDeclaration"] = 15] = "BeforeDeclaration";
  State2[State2["InDeclaration"] = 16] = "InDeclaration";
  State2[State2["InProcessingInstruction"] = 17] = "InProcessingInstruction";
  State2[State2["BeforeComment"] = 18] = "BeforeComment";
  State2[State2["CDATASequence"] = 19] = "CDATASequence";
  State2[State2["InSpecialComment"] = 20] = "InSpecialComment";
  State2[State2["InCommentLike"] = 21] = "InCommentLike";
  State2[State2["BeforeSpecialS"] = 22] = "BeforeSpecialS";
  State2[State2["SpecialStartSequence"] = 23] = "SpecialStartSequence";
  State2[State2["InSpecialTag"] = 24] = "InSpecialTag";
  State2[State2["BeforeEntity"] = 25] = "BeforeEntity";
  State2[State2["BeforeNumericEntity"] = 26] = "BeforeNumericEntity";
  State2[State2["InNamedEntity"] = 27] = "InNamedEntity";
  State2[State2["InNumericEntity"] = 28] = "InNumericEntity";
  State2[State2["InHexEntity"] = 29] = "InHexEntity";
})(State || (State = {}));
function isWhitespace(c) {
  return c === CharCodes.Space || c === CharCodes.NewLine || c === CharCodes.Tab || c === CharCodes.FormFeed || c === CharCodes.CarriageReturn;
}
function isEndOfTagSection(c) {
  return c === CharCodes.Slash || c === CharCodes.Gt || isWhitespace(c);
}
function isNumber$1(c) {
  return c >= CharCodes.Zero && c <= CharCodes.Nine;
}
function isASCIIAlpha(c) {
  return c >= CharCodes.LowerA && c <= CharCodes.LowerZ || c >= CharCodes.UpperA && c <= CharCodes.UpperZ;
}
function isHexDigit(c) {
  return c >= CharCodes.UpperA && c <= CharCodes.UpperF || c >= CharCodes.LowerA && c <= CharCodes.LowerF;
}
var QuoteType;
(function(QuoteType2) {
  QuoteType2[QuoteType2["NoValue"] = 0] = "NoValue";
  QuoteType2[QuoteType2["Unquoted"] = 1] = "Unquoted";
  QuoteType2[QuoteType2["Single"] = 2] = "Single";
  QuoteType2[QuoteType2["Double"] = 3] = "Double";
})(QuoteType || (QuoteType = {}));
const Sequences = {
  Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
  CdataEnd: new Uint8Array([93, 93, 62]),
  CommentEnd: new Uint8Array([45, 45, 62]),
  ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
  StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
  TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101])
  // `</title`
};
class Tokenizer2 {
  constructor({ xmlMode = false, decodeEntities = true }, cbs) {
    this.cbs = cbs;
    this.state = State.Text;
    this.buffer = "";
    this.sectionStart = 0;
    this.index = 0;
    this.baseState = State.Text;
    this.isSpecial = false;
    this.running = true;
    this.offset = 0;
    this.currentSequence = void 0;
    this.sequenceIndex = 0;
    this.trieIndex = 0;
    this.trieCurrent = 0;
    this.entityResult = 0;
    this.entityExcess = 0;
    this.xmlMode = xmlMode;
    this.decodeEntities = decodeEntities;
    this.entityTrie = xmlMode ? xmlDecodeTree : htmlDecodeTree;
  }
  reset() {
    this.state = State.Text;
    this.buffer = "";
    this.sectionStart = 0;
    this.index = 0;
    this.baseState = State.Text;
    this.currentSequence = void 0;
    this.running = true;
    this.offset = 0;
  }
  write(chunk) {
    this.offset += this.buffer.length;
    this.buffer = chunk;
    this.parse();
  }
  end() {
    if (this.running)
      this.finish();
  }
  pause() {
    this.running = false;
  }
  resume() {
    this.running = true;
    if (this.index < this.buffer.length + this.offset) {
      this.parse();
    }
  }
  /**
   * The current index within all of the written data.
   */
  getIndex() {
    return this.index;
  }
  /**
   * The start of the current section.
   */
  getSectionStart() {
    return this.sectionStart;
  }
  stateText(c) {
    if (c === CharCodes.Lt || !this.decodeEntities && this.fastForwardTo(CharCodes.Lt)) {
      if (this.index > this.sectionStart) {
        this.cbs.ontext(this.sectionStart, this.index);
      }
      this.state = State.BeforeTagName;
      this.sectionStart = this.index;
    } else if (this.decodeEntities && c === CharCodes.Amp) {
      this.state = State.BeforeEntity;
    }
  }
  stateSpecialStartSequence(c) {
    const isEnd = this.sequenceIndex === this.currentSequence.length;
    const isMatch = isEnd ? (
      // If we are at the end of the sequence, make sure the tag name has ended
      isEndOfTagSection(c)
    ) : (
      // Otherwise, do a case-insensitive comparison
      (c | 32) === this.currentSequence[this.sequenceIndex]
    );
    if (!isMatch) {
      this.isSpecial = false;
    } else if (!isEnd) {
      this.sequenceIndex++;
      return;
    }
    this.sequenceIndex = 0;
    this.state = State.InTagName;
    this.stateInTagName(c);
  }
  /** Look for an end tag. For <title> tags, also decode entities. */
  stateInSpecialTag(c) {
    if (this.sequenceIndex === this.currentSequence.length) {
      if (c === CharCodes.Gt || isWhitespace(c)) {
        const endOfText = this.index - this.currentSequence.length;
        if (this.sectionStart < endOfText) {
          const actualIndex = this.index;
          this.index = endOfText;
          this.cbs.ontext(this.sectionStart, endOfText);
          this.index = actualIndex;
        }
        this.isSpecial = false;
        this.sectionStart = endOfText + 2;
        this.stateInClosingTagName(c);
        return;
      }
      this.sequenceIndex = 0;
    }
    if ((c | 32) === this.currentSequence[this.sequenceIndex]) {
      this.sequenceIndex += 1;
    } else if (this.sequenceIndex === 0) {
      if (this.currentSequence === Sequences.TitleEnd) {
        if (this.decodeEntities && c === CharCodes.Amp) {
          this.state = State.BeforeEntity;
        }
      } else if (this.fastForwardTo(CharCodes.Lt)) {
        this.sequenceIndex = 1;
      }
    } else {
      this.sequenceIndex = Number(c === CharCodes.Lt);
    }
  }
  stateCDATASequence(c) {
    if (c === Sequences.Cdata[this.sequenceIndex]) {
      if (++this.sequenceIndex === Sequences.Cdata.length) {
        this.state = State.InCommentLike;
        this.currentSequence = Sequences.CdataEnd;
        this.sequenceIndex = 0;
        this.sectionStart = this.index + 1;
      }
    } else {
      this.sequenceIndex = 0;
      this.state = State.InDeclaration;
      this.stateInDeclaration(c);
    }
  }
  /**
   * When we wait for one specific character, we can speed things up
   * by skipping through the buffer until we find it.
   *
   * @returns Whether the character was found.
   */
  fastForwardTo(c) {
    while (++this.index < this.buffer.length + this.offset) {
      if (this.buffer.charCodeAt(this.index - this.offset) === c) {
        return true;
      }
    }
    this.index = this.buffer.length + this.offset - 1;
    return false;
  }
  /**
   * Comments and CDATA end with `-->` and `]]>`.
   *
   * Their common qualities are:
   * - Their end sequences have a distinct character they start with.
   * - That character is then repeated, so we have to check multiple repeats.
   * - All characters but the start character of the sequence can be skipped.
   */
  stateInCommentLike(c) {
    if (c === this.currentSequence[this.sequenceIndex]) {
      if (++this.sequenceIndex === this.currentSequence.length) {
        if (this.currentSequence === Sequences.CdataEnd) {
          this.cbs.oncdata(this.sectionStart, this.index, 2);
        } else {
          this.cbs.oncomment(this.sectionStart, this.index, 2);
        }
        this.sequenceIndex = 0;
        this.sectionStart = this.index + 1;
        this.state = State.Text;
      }
    } else if (this.sequenceIndex === 0) {
      if (this.fastForwardTo(this.currentSequence[0])) {
        this.sequenceIndex = 1;
      }
    } else if (c !== this.currentSequence[this.sequenceIndex - 1]) {
      this.sequenceIndex = 0;
    }
  }
  /**
   * HTML only allows ASCII alpha characters (a-z and A-Z) at the beginning of a tag name.
   *
   * XML allows a lot more characters here (@see https://www.w3.org/TR/REC-xml/#NT-NameStartChar).
   * We allow anything that wouldn't end the tag.
   */
  isTagStartChar(c) {
    return this.xmlMode ? !isEndOfTagSection(c) : isASCIIAlpha(c);
  }
  startSpecial(sequence, offset) {
    this.isSpecial = true;
    this.currentSequence = sequence;
    this.sequenceIndex = offset;
    this.state = State.SpecialStartSequence;
  }
  stateBeforeTagName(c) {
    if (c === CharCodes.ExclamationMark) {
      this.state = State.BeforeDeclaration;
      this.sectionStart = this.index + 1;
    } else if (c === CharCodes.Questionmark) {
      this.state = State.InProcessingInstruction;
      this.sectionStart = this.index + 1;
    } else if (this.isTagStartChar(c)) {
      const lower = c | 32;
      this.sectionStart = this.index;
      if (!this.xmlMode && lower === Sequences.TitleEnd[2]) {
        this.startSpecial(Sequences.TitleEnd, 3);
      } else {
        this.state = !this.xmlMode && lower === Sequences.ScriptEnd[2] ? State.BeforeSpecialS : State.InTagName;
      }
    } else if (c === CharCodes.Slash) {
      this.state = State.BeforeClosingTagName;
    } else {
      this.state = State.Text;
      this.stateText(c);
    }
  }
  stateInTagName(c) {
    if (isEndOfTagSection(c)) {
      this.cbs.onopentagname(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.state = State.BeforeAttributeName;
      this.stateBeforeAttributeName(c);
    }
  }
  stateBeforeClosingTagName(c) {
    if (isWhitespace(c))
      ;
    else if (c === CharCodes.Gt) {
      this.state = State.Text;
    } else {
      this.state = this.isTagStartChar(c) ? State.InClosingTagName : State.InSpecialComment;
      this.sectionStart = this.index;
    }
  }
  stateInClosingTagName(c) {
    if (c === CharCodes.Gt || isWhitespace(c)) {
      this.cbs.onclosetag(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.state = State.AfterClosingTagName;
      this.stateAfterClosingTagName(c);
    }
  }
  stateAfterClosingTagName(c) {
    if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
      this.state = State.Text;
      this.baseState = State.Text;
      this.sectionStart = this.index + 1;
    }
  }
  stateBeforeAttributeName(c) {
    if (c === CharCodes.Gt) {
      this.cbs.onopentagend(this.index);
      if (this.isSpecial) {
        this.state = State.InSpecialTag;
        this.sequenceIndex = 0;
      } else {
        this.state = State.Text;
      }
      this.baseState = this.state;
      this.sectionStart = this.index + 1;
    } else if (c === CharCodes.Slash) {
      this.state = State.InSelfClosingTag;
    } else if (!isWhitespace(c)) {
      this.state = State.InAttributeName;
      this.sectionStart = this.index;
    }
  }
  stateInSelfClosingTag(c) {
    if (c === CharCodes.Gt) {
      this.cbs.onselfclosingtag(this.index);
      this.state = State.Text;
      this.baseState = State.Text;
      this.sectionStart = this.index + 1;
      this.isSpecial = false;
    } else if (!isWhitespace(c)) {
      this.state = State.BeforeAttributeName;
      this.stateBeforeAttributeName(c);
    }
  }
  stateInAttributeName(c) {
    if (c === CharCodes.Eq || isEndOfTagSection(c)) {
      this.cbs.onattribname(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.state = State.AfterAttributeName;
      this.stateAfterAttributeName(c);
    }
  }
  stateAfterAttributeName(c) {
    if (c === CharCodes.Eq) {
      this.state = State.BeforeAttributeValue;
    } else if (c === CharCodes.Slash || c === CharCodes.Gt) {
      this.cbs.onattribend(QuoteType.NoValue, this.index);
      this.state = State.BeforeAttributeName;
      this.stateBeforeAttributeName(c);
    } else if (!isWhitespace(c)) {
      this.cbs.onattribend(QuoteType.NoValue, this.index);
      this.state = State.InAttributeName;
      this.sectionStart = this.index;
    }
  }
  stateBeforeAttributeValue(c) {
    if (c === CharCodes.DoubleQuote) {
      this.state = State.InAttributeValueDq;
      this.sectionStart = this.index + 1;
    } else if (c === CharCodes.SingleQuote) {
      this.state = State.InAttributeValueSq;
      this.sectionStart = this.index + 1;
    } else if (!isWhitespace(c)) {
      this.sectionStart = this.index;
      this.state = State.InAttributeValueNq;
      this.stateInAttributeValueNoQuotes(c);
    }
  }
  handleInAttributeValue(c, quote) {
    if (c === quote || !this.decodeEntities && this.fastForwardTo(quote)) {
      this.cbs.onattribdata(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.cbs.onattribend(quote === CharCodes.DoubleQuote ? QuoteType.Double : QuoteType.Single, this.index);
      this.state = State.BeforeAttributeName;
    } else if (this.decodeEntities && c === CharCodes.Amp) {
      this.baseState = this.state;
      this.state = State.BeforeEntity;
    }
  }
  stateInAttributeValueDoubleQuotes(c) {
    this.handleInAttributeValue(c, CharCodes.DoubleQuote);
  }
  stateInAttributeValueSingleQuotes(c) {
    this.handleInAttributeValue(c, CharCodes.SingleQuote);
  }
  stateInAttributeValueNoQuotes(c) {
    if (isWhitespace(c) || c === CharCodes.Gt) {
      this.cbs.onattribdata(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.cbs.onattribend(QuoteType.Unquoted, this.index);
      this.state = State.BeforeAttributeName;
      this.stateBeforeAttributeName(c);
    } else if (this.decodeEntities && c === CharCodes.Amp) {
      this.baseState = this.state;
      this.state = State.BeforeEntity;
    }
  }
  stateBeforeDeclaration(c) {
    if (c === CharCodes.OpeningSquareBracket) {
      this.state = State.CDATASequence;
      this.sequenceIndex = 0;
    } else {
      this.state = c === CharCodes.Dash ? State.BeforeComment : State.InDeclaration;
    }
  }
  stateInDeclaration(c) {
    if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
      this.cbs.ondeclaration(this.sectionStart, this.index);
      this.state = State.Text;
      this.sectionStart = this.index + 1;
    }
  }
  stateInProcessingInstruction(c) {
    if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
      this.cbs.onprocessinginstruction(this.sectionStart, this.index);
      this.state = State.Text;
      this.sectionStart = this.index + 1;
    }
  }
  stateBeforeComment(c) {
    if (c === CharCodes.Dash) {
      this.state = State.InCommentLike;
      this.currentSequence = Sequences.CommentEnd;
      this.sequenceIndex = 2;
      this.sectionStart = this.index + 1;
    } else {
      this.state = State.InDeclaration;
    }
  }
  stateInSpecialComment(c) {
    if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
      this.cbs.oncomment(this.sectionStart, this.index, 0);
      this.state = State.Text;
      this.sectionStart = this.index + 1;
    }
  }
  stateBeforeSpecialS(c) {
    const lower = c | 32;
    if (lower === Sequences.ScriptEnd[3]) {
      this.startSpecial(Sequences.ScriptEnd, 4);
    } else if (lower === Sequences.StyleEnd[3]) {
      this.startSpecial(Sequences.StyleEnd, 4);
    } else {
      this.state = State.InTagName;
      this.stateInTagName(c);
    }
  }
  stateBeforeEntity(c) {
    this.entityExcess = 1;
    this.entityResult = 0;
    if (c === CharCodes.Number) {
      this.state = State.BeforeNumericEntity;
    } else if (c === CharCodes.Amp)
      ;
    else {
      this.trieIndex = 0;
      this.trieCurrent = this.entityTrie[0];
      this.state = State.InNamedEntity;
      this.stateInNamedEntity(c);
    }
  }
  stateInNamedEntity(c) {
    this.entityExcess += 1;
    this.trieIndex = determineBranch(this.entityTrie, this.trieCurrent, this.trieIndex + 1, c);
    if (this.trieIndex < 0) {
      this.emitNamedEntity();
      this.index--;
      return;
    }
    this.trieCurrent = this.entityTrie[this.trieIndex];
    const masked = this.trieCurrent & BinTrieFlags.VALUE_LENGTH;
    if (masked) {
      const valueLength = (masked >> 14) - 1;
      if (!this.allowLegacyEntity() && c !== CharCodes.Semi) {
        this.trieIndex += valueLength;
      } else {
        const entityStart = this.index - this.entityExcess + 1;
        if (entityStart > this.sectionStart) {
          this.emitPartial(this.sectionStart, entityStart);
        }
        this.entityResult = this.trieIndex;
        this.trieIndex += valueLength;
        this.entityExcess = 0;
        this.sectionStart = this.index + 1;
        if (valueLength === 0) {
          this.emitNamedEntity();
        }
      }
    }
  }
  emitNamedEntity() {
    this.state = this.baseState;
    if (this.entityResult === 0) {
      return;
    }
    const valueLength = (this.entityTrie[this.entityResult] & BinTrieFlags.VALUE_LENGTH) >> 14;
    switch (valueLength) {
      case 1: {
        this.emitCodePoint(this.entityTrie[this.entityResult] & ~BinTrieFlags.VALUE_LENGTH);
        break;
      }
      case 2: {
        this.emitCodePoint(this.entityTrie[this.entityResult + 1]);
        break;
      }
      case 3: {
        this.emitCodePoint(this.entityTrie[this.entityResult + 1]);
        this.emitCodePoint(this.entityTrie[this.entityResult + 2]);
      }
    }
  }
  stateBeforeNumericEntity(c) {
    if ((c | 32) === CharCodes.LowerX) {
      this.entityExcess++;
      this.state = State.InHexEntity;
    } else {
      this.state = State.InNumericEntity;
      this.stateInNumericEntity(c);
    }
  }
  emitNumericEntity(strict) {
    const entityStart = this.index - this.entityExcess - 1;
    const numberStart = entityStart + 2 + Number(this.state === State.InHexEntity);
    if (numberStart !== this.index) {
      if (entityStart > this.sectionStart) {
        this.emitPartial(this.sectionStart, entityStart);
      }
      this.sectionStart = this.index + Number(strict);
      this.emitCodePoint(replaceCodePoint(this.entityResult));
    }
    this.state = this.baseState;
  }
  stateInNumericEntity(c) {
    if (c === CharCodes.Semi) {
      this.emitNumericEntity(true);
    } else if (isNumber$1(c)) {
      this.entityResult = this.entityResult * 10 + (c - CharCodes.Zero);
      this.entityExcess++;
    } else {
      if (this.allowLegacyEntity()) {
        this.emitNumericEntity(false);
      } else {
        this.state = this.baseState;
      }
      this.index--;
    }
  }
  stateInHexEntity(c) {
    if (c === CharCodes.Semi) {
      this.emitNumericEntity(true);
    } else if (isNumber$1(c)) {
      this.entityResult = this.entityResult * 16 + (c - CharCodes.Zero);
      this.entityExcess++;
    } else if (isHexDigit(c)) {
      this.entityResult = this.entityResult * 16 + ((c | 32) - CharCodes.LowerA + 10);
      this.entityExcess++;
    } else {
      if (this.allowLegacyEntity()) {
        this.emitNumericEntity(false);
      } else {
        this.state = this.baseState;
      }
      this.index--;
    }
  }
  allowLegacyEntity() {
    return !this.xmlMode && (this.baseState === State.Text || this.baseState === State.InSpecialTag);
  }
  /**
   * Remove data that has already been consumed from the buffer.
   */
  cleanup() {
    if (this.running && this.sectionStart !== this.index) {
      if (this.state === State.Text || this.state === State.InSpecialTag && this.sequenceIndex === 0) {
        this.cbs.ontext(this.sectionStart, this.index);
        this.sectionStart = this.index;
      } else if (this.state === State.InAttributeValueDq || this.state === State.InAttributeValueSq || this.state === State.InAttributeValueNq) {
        this.cbs.onattribdata(this.sectionStart, this.index);
        this.sectionStart = this.index;
      }
    }
  }
  shouldContinue() {
    return this.index < this.buffer.length + this.offset && this.running;
  }
  /**
   * Iterates through the buffer, calling the function corresponding to the current state.
   *
   * States that are more likely to be hit are higher up, as a performance improvement.
   */
  parse() {
    while (this.shouldContinue()) {
      const c = this.buffer.charCodeAt(this.index - this.offset);
      switch (this.state) {
        case State.Text: {
          this.stateText(c);
          break;
        }
        case State.SpecialStartSequence: {
          this.stateSpecialStartSequence(c);
          break;
        }
        case State.InSpecialTag: {
          this.stateInSpecialTag(c);
          break;
        }
        case State.CDATASequence: {
          this.stateCDATASequence(c);
          break;
        }
        case State.InAttributeValueDq: {
          this.stateInAttributeValueDoubleQuotes(c);
          break;
        }
        case State.InAttributeName: {
          this.stateInAttributeName(c);
          break;
        }
        case State.InCommentLike: {
          this.stateInCommentLike(c);
          break;
        }
        case State.InSpecialComment: {
          this.stateInSpecialComment(c);
          break;
        }
        case State.BeforeAttributeName: {
          this.stateBeforeAttributeName(c);
          break;
        }
        case State.InTagName: {
          this.stateInTagName(c);
          break;
        }
        case State.InClosingTagName: {
          this.stateInClosingTagName(c);
          break;
        }
        case State.BeforeTagName: {
          this.stateBeforeTagName(c);
          break;
        }
        case State.AfterAttributeName: {
          this.stateAfterAttributeName(c);
          break;
        }
        case State.InAttributeValueSq: {
          this.stateInAttributeValueSingleQuotes(c);
          break;
        }
        case State.BeforeAttributeValue: {
          this.stateBeforeAttributeValue(c);
          break;
        }
        case State.BeforeClosingTagName: {
          this.stateBeforeClosingTagName(c);
          break;
        }
        case State.AfterClosingTagName: {
          this.stateAfterClosingTagName(c);
          break;
        }
        case State.BeforeSpecialS: {
          this.stateBeforeSpecialS(c);
          break;
        }
        case State.InAttributeValueNq: {
          this.stateInAttributeValueNoQuotes(c);
          break;
        }
        case State.InSelfClosingTag: {
          this.stateInSelfClosingTag(c);
          break;
        }
        case State.InDeclaration: {
          this.stateInDeclaration(c);
          break;
        }
        case State.BeforeDeclaration: {
          this.stateBeforeDeclaration(c);
          break;
        }
        case State.BeforeComment: {
          this.stateBeforeComment(c);
          break;
        }
        case State.InProcessingInstruction: {
          this.stateInProcessingInstruction(c);
          break;
        }
        case State.InNamedEntity: {
          this.stateInNamedEntity(c);
          break;
        }
        case State.BeforeEntity: {
          this.stateBeforeEntity(c);
          break;
        }
        case State.InHexEntity: {
          this.stateInHexEntity(c);
          break;
        }
        case State.InNumericEntity: {
          this.stateInNumericEntity(c);
          break;
        }
        default: {
          this.stateBeforeNumericEntity(c);
        }
      }
      this.index++;
    }
    this.cleanup();
  }
  finish() {
    if (this.state === State.InNamedEntity) {
      this.emitNamedEntity();
    }
    if (this.sectionStart < this.index) {
      this.handleTrailingData();
    }
    this.cbs.onend();
  }
  /** Handle any trailing data. */
  handleTrailingData() {
    const endIndex = this.buffer.length + this.offset;
    if (this.state === State.InCommentLike) {
      if (this.currentSequence === Sequences.CdataEnd) {
        this.cbs.oncdata(this.sectionStart, endIndex, 0);
      } else {
        this.cbs.oncomment(this.sectionStart, endIndex, 0);
      }
    } else if (this.state === State.InNumericEntity && this.allowLegacyEntity()) {
      this.emitNumericEntity(false);
    } else if (this.state === State.InHexEntity && this.allowLegacyEntity()) {
      this.emitNumericEntity(false);
    } else if (this.state === State.InTagName || this.state === State.BeforeAttributeName || this.state === State.BeforeAttributeValue || this.state === State.AfterAttributeName || this.state === State.InAttributeName || this.state === State.InAttributeValueSq || this.state === State.InAttributeValueDq || this.state === State.InAttributeValueNq || this.state === State.InClosingTagName)
      ;
    else {
      this.cbs.ontext(this.sectionStart, endIndex);
    }
  }
  emitPartial(start, endIndex) {
    if (this.baseState !== State.Text && this.baseState !== State.InSpecialTag) {
      this.cbs.onattribdata(start, endIndex);
    } else {
      this.cbs.ontext(start, endIndex);
    }
  }
  emitCodePoint(cp) {
    if (this.baseState !== State.Text && this.baseState !== State.InSpecialTag) {
      this.cbs.onattribentity(cp);
    } else {
      this.cbs.ontextentity(cp);
    }
  }
}
const formTags = /* @__PURE__ */ new Set([
  "input",
  "option",
  "optgroup",
  "select",
  "button",
  "datalist",
  "textarea"
]);
const pTag = /* @__PURE__ */ new Set(["p"]);
const tableSectionTags = /* @__PURE__ */ new Set(["thead", "tbody"]);
const ddtTags = /* @__PURE__ */ new Set(["dd", "dt"]);
const rtpTags = /* @__PURE__ */ new Set(["rt", "rp"]);
const openImpliesClose = /* @__PURE__ */ new Map([
  ["tr", /* @__PURE__ */ new Set(["tr", "th", "td"])],
  ["th", /* @__PURE__ */ new Set(["th"])],
  ["td", /* @__PURE__ */ new Set(["thead", "th", "td"])],
  ["body", /* @__PURE__ */ new Set(["head", "link", "script"])],
  ["li", /* @__PURE__ */ new Set(["li"])],
  ["p", pTag],
  ["h1", pTag],
  ["h2", pTag],
  ["h3", pTag],
  ["h4", pTag],
  ["h5", pTag],
  ["h6", pTag],
  ["select", formTags],
  ["input", formTags],
  ["output", formTags],
  ["button", formTags],
  ["datalist", formTags],
  ["textarea", formTags],
  ["option", /* @__PURE__ */ new Set(["option"])],
  ["optgroup", /* @__PURE__ */ new Set(["optgroup", "option"])],
  ["dd", ddtTags],
  ["dt", ddtTags],
  ["address", pTag],
  ["article", pTag],
  ["aside", pTag],
  ["blockquote", pTag],
  ["details", pTag],
  ["div", pTag],
  ["dl", pTag],
  ["fieldset", pTag],
  ["figcaption", pTag],
  ["figure", pTag],
  ["footer", pTag],
  ["form", pTag],
  ["header", pTag],
  ["hr", pTag],
  ["main", pTag],
  ["nav", pTag],
  ["ol", pTag],
  ["pre", pTag],
  ["section", pTag],
  ["table", pTag],
  ["ul", pTag],
  ["rt", rtpTags],
  ["rp", rtpTags],
  ["tbody", tableSectionTags],
  ["tfoot", tableSectionTags]
]);
const voidElements = /* @__PURE__ */ new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
const foreignContextElements = /* @__PURE__ */ new Set(["math", "svg"]);
const htmlIntegrationElements = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignobject",
  "desc",
  "title"
]);
const reNameEnd = /\s|\//;
class Parser2 {
  constructor(cbs, options2 = {}) {
    var _a3, _b2, _c2, _d2, _e2;
    this.options = options2;
    this.startIndex = 0;
    this.endIndex = 0;
    this.openTagStart = 0;
    this.tagname = "";
    this.attribname = "";
    this.attribvalue = "";
    this.attribs = null;
    this.stack = [];
    this.foreignContext = [];
    this.buffers = [];
    this.bufferOffset = 0;
    this.writeIndex = 0;
    this.ended = false;
    this.cbs = cbs !== null && cbs !== void 0 ? cbs : {};
    this.lowerCaseTagNames = (_a3 = options2.lowerCaseTags) !== null && _a3 !== void 0 ? _a3 : !options2.xmlMode;
    this.lowerCaseAttributeNames = (_b2 = options2.lowerCaseAttributeNames) !== null && _b2 !== void 0 ? _b2 : !options2.xmlMode;
    this.tokenizer = new ((_c2 = options2.Tokenizer) !== null && _c2 !== void 0 ? _c2 : Tokenizer2)(this.options, this);
    (_e2 = (_d2 = this.cbs).onparserinit) === null || _e2 === void 0 ? void 0 : _e2.call(_d2, this);
  }
  // Tokenizer event handlers
  /** @internal */
  ontext(start, endIndex) {
    var _a3, _b2;
    const data2 = this.getSlice(start, endIndex);
    this.endIndex = endIndex - 1;
    (_b2 = (_a3 = this.cbs).ontext) === null || _b2 === void 0 ? void 0 : _b2.call(_a3, data2);
    this.startIndex = endIndex;
  }
  /** @internal */
  ontextentity(cp) {
    var _a3, _b2;
    const index2 = this.tokenizer.getSectionStart();
    this.endIndex = index2 - 1;
    (_b2 = (_a3 = this.cbs).ontext) === null || _b2 === void 0 ? void 0 : _b2.call(_a3, fromCodePoint(cp));
    this.startIndex = index2;
  }
  isVoidElement(name) {
    return !this.options.xmlMode && voidElements.has(name);
  }
  /** @internal */
  onopentagname(start, endIndex) {
    this.endIndex = endIndex;
    let name = this.getSlice(start, endIndex);
    if (this.lowerCaseTagNames) {
      name = name.toLowerCase();
    }
    this.emitOpenTag(name);
  }
  emitOpenTag(name) {
    var _a3, _b2, _c2, _d2;
    this.openTagStart = this.startIndex;
    this.tagname = name;
    const impliesClose = !this.options.xmlMode && openImpliesClose.get(name);
    if (impliesClose) {
      while (this.stack.length > 0 && impliesClose.has(this.stack[this.stack.length - 1])) {
        const element = this.stack.pop();
        (_b2 = (_a3 = this.cbs).onclosetag) === null || _b2 === void 0 ? void 0 : _b2.call(_a3, element, true);
      }
    }
    if (!this.isVoidElement(name)) {
      this.stack.push(name);
      if (foreignContextElements.has(name)) {
        this.foreignContext.push(true);
      } else if (htmlIntegrationElements.has(name)) {
        this.foreignContext.push(false);
      }
    }
    (_d2 = (_c2 = this.cbs).onopentagname) === null || _d2 === void 0 ? void 0 : _d2.call(_c2, name);
    if (this.cbs.onopentag)
      this.attribs = {};
  }
  endOpenTag(isImplied) {
    var _a3, _b2;
    this.startIndex = this.openTagStart;
    if (this.attribs) {
      (_b2 = (_a3 = this.cbs).onopentag) === null || _b2 === void 0 ? void 0 : _b2.call(_a3, this.tagname, this.attribs, isImplied);
      this.attribs = null;
    }
    if (this.cbs.onclosetag && this.isVoidElement(this.tagname)) {
      this.cbs.onclosetag(this.tagname, true);
    }
    this.tagname = "";
  }
  /** @internal */
  onopentagend(endIndex) {
    this.endIndex = endIndex;
    this.endOpenTag(false);
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  onclosetag(start, endIndex) {
    var _a3, _b2, _c2, _d2, _e2, _f2;
    this.endIndex = endIndex;
    let name = this.getSlice(start, endIndex);
    if (this.lowerCaseTagNames) {
      name = name.toLowerCase();
    }
    if (foreignContextElements.has(name) || htmlIntegrationElements.has(name)) {
      this.foreignContext.pop();
    }
    if (!this.isVoidElement(name)) {
      const pos = this.stack.lastIndexOf(name);
      if (pos !== -1) {
        if (this.cbs.onclosetag) {
          let count = this.stack.length - pos;
          while (count--) {
            this.cbs.onclosetag(this.stack.pop(), count !== 0);
          }
        } else
          this.stack.length = pos;
      } else if (!this.options.xmlMode && name === "p") {
        this.emitOpenTag("p");
        this.closeCurrentTag(true);
      }
    } else if (!this.options.xmlMode && name === "br") {
      (_b2 = (_a3 = this.cbs).onopentagname) === null || _b2 === void 0 ? void 0 : _b2.call(_a3, "br");
      (_d2 = (_c2 = this.cbs).onopentag) === null || _d2 === void 0 ? void 0 : _d2.call(_c2, "br", {}, true);
      (_f2 = (_e2 = this.cbs).onclosetag) === null || _f2 === void 0 ? void 0 : _f2.call(_e2, "br", false);
    }
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  onselfclosingtag(endIndex) {
    this.endIndex = endIndex;
    if (this.options.xmlMode || this.options.recognizeSelfClosing || this.foreignContext[this.foreignContext.length - 1]) {
      this.closeCurrentTag(false);
      this.startIndex = endIndex + 1;
    } else {
      this.onopentagend(endIndex);
    }
  }
  closeCurrentTag(isOpenImplied) {
    var _a3, _b2;
    const name = this.tagname;
    this.endOpenTag(isOpenImplied);
    if (this.stack[this.stack.length - 1] === name) {
      (_b2 = (_a3 = this.cbs).onclosetag) === null || _b2 === void 0 ? void 0 : _b2.call(_a3, name, !isOpenImplied);
      this.stack.pop();
    }
  }
  /** @internal */
  onattribname(start, endIndex) {
    this.startIndex = start;
    const name = this.getSlice(start, endIndex);
    this.attribname = this.lowerCaseAttributeNames ? name.toLowerCase() : name;
  }
  /** @internal */
  onattribdata(start, endIndex) {
    this.attribvalue += this.getSlice(start, endIndex);
  }
  /** @internal */
  onattribentity(cp) {
    this.attribvalue += fromCodePoint(cp);
  }
  /** @internal */
  onattribend(quote, endIndex) {
    var _a3, _b2;
    this.endIndex = endIndex;
    (_b2 = (_a3 = this.cbs).onattribute) === null || _b2 === void 0 ? void 0 : _b2.call(_a3, this.attribname, this.attribvalue, quote === QuoteType.Double ? '"' : quote === QuoteType.Single ? "'" : quote === QuoteType.NoValue ? void 0 : null);
    if (this.attribs && !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname)) {
      this.attribs[this.attribname] = this.attribvalue;
    }
    this.attribvalue = "";
  }
  getInstructionName(value) {
    const index2 = value.search(reNameEnd);
    let name = index2 < 0 ? value : value.substr(0, index2);
    if (this.lowerCaseTagNames) {
      name = name.toLowerCase();
    }
    return name;
  }
  /** @internal */
  ondeclaration(start, endIndex) {
    this.endIndex = endIndex;
    const value = this.getSlice(start, endIndex);
    if (this.cbs.onprocessinginstruction) {
      const name = this.getInstructionName(value);
      this.cbs.onprocessinginstruction(`!${name}`, `!${value}`);
    }
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  onprocessinginstruction(start, endIndex) {
    this.endIndex = endIndex;
    const value = this.getSlice(start, endIndex);
    if (this.cbs.onprocessinginstruction) {
      const name = this.getInstructionName(value);
      this.cbs.onprocessinginstruction(`?${name}`, `?${value}`);
    }
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  oncomment(start, endIndex, offset) {
    var _a3, _b2, _c2, _d2;
    this.endIndex = endIndex;
    (_b2 = (_a3 = this.cbs).oncomment) === null || _b2 === void 0 ? void 0 : _b2.call(_a3, this.getSlice(start, endIndex - offset));
    (_d2 = (_c2 = this.cbs).oncommentend) === null || _d2 === void 0 ? void 0 : _d2.call(_c2);
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  oncdata(start, endIndex, offset) {
    var _a3, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _j2, _k2;
    this.endIndex = endIndex;
    const value = this.getSlice(start, endIndex - offset);
    if (this.options.xmlMode || this.options.recognizeCDATA) {
      (_b2 = (_a3 = this.cbs).oncdatastart) === null || _b2 === void 0 ? void 0 : _b2.call(_a3);
      (_d2 = (_c2 = this.cbs).ontext) === null || _d2 === void 0 ? void 0 : _d2.call(_c2, value);
      (_f2 = (_e2 = this.cbs).oncdataend) === null || _f2 === void 0 ? void 0 : _f2.call(_e2);
    } else {
      (_h2 = (_g2 = this.cbs).oncomment) === null || _h2 === void 0 ? void 0 : _h2.call(_g2, `[CDATA[${value}]]`);
      (_k2 = (_j2 = this.cbs).oncommentend) === null || _k2 === void 0 ? void 0 : _k2.call(_j2);
    }
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  onend() {
    var _a3, _b2;
    if (this.cbs.onclosetag) {
      this.endIndex = this.startIndex;
      for (let index2 = this.stack.length; index2 > 0; this.cbs.onclosetag(this.stack[--index2], true))
        ;
    }
    (_b2 = (_a3 = this.cbs).onend) === null || _b2 === void 0 ? void 0 : _b2.call(_a3);
  }
  /**
   * Resets the parser to a blank state, ready to parse a new HTML document
   */
  reset() {
    var _a3, _b2, _c2, _d2;
    (_b2 = (_a3 = this.cbs).onreset) === null || _b2 === void 0 ? void 0 : _b2.call(_a3);
    this.tokenizer.reset();
    this.tagname = "";
    this.attribname = "";
    this.attribs = null;
    this.stack.length = 0;
    this.startIndex = 0;
    this.endIndex = 0;
    (_d2 = (_c2 = this.cbs).onparserinit) === null || _d2 === void 0 ? void 0 : _d2.call(_c2, this);
    this.buffers.length = 0;
    this.bufferOffset = 0;
    this.writeIndex = 0;
    this.ended = false;
  }
  /**
   * Resets the parser, then parses a complete document and
   * pushes it to the handler.
   *
   * @param data Document to parse.
   */
  parseComplete(data2) {
    this.reset();
    this.end(data2);
  }
  getSlice(start, end2) {
    while (start - this.bufferOffset >= this.buffers[0].length) {
      this.shiftBuffer();
    }
    let slice2 = this.buffers[0].slice(start - this.bufferOffset, end2 - this.bufferOffset);
    while (end2 - this.bufferOffset > this.buffers[0].length) {
      this.shiftBuffer();
      slice2 += this.buffers[0].slice(0, end2 - this.bufferOffset);
    }
    return slice2;
  }
  shiftBuffer() {
    this.bufferOffset += this.buffers[0].length;
    this.writeIndex--;
    this.buffers.shift();
  }
  /**
   * Parses a chunk of data and calls the corresponding callbacks.
   *
   * @param chunk Chunk to parse.
   */
  write(chunk) {
    var _a3, _b2;
    if (this.ended) {
      (_b2 = (_a3 = this.cbs).onerror) === null || _b2 === void 0 ? void 0 : _b2.call(_a3, new Error(".write() after done!"));
      return;
    }
    this.buffers.push(chunk);
    if (this.tokenizer.running) {
      this.tokenizer.write(chunk);
      this.writeIndex++;
    }
  }
  /**
   * Parses the end of the buffer and clears the stack, calls onend.
   *
   * @param chunk Optional final chunk to parse.
   */
  end(chunk) {
    var _a3, _b2;
    if (this.ended) {
      (_b2 = (_a3 = this.cbs).onerror) === null || _b2 === void 0 ? void 0 : _b2.call(_a3, new Error(".end() after done!"));
      return;
    }
    if (chunk)
      this.write(chunk);
    this.ended = true;
    this.tokenizer.end();
  }
  /**
   * Pauses parsing. The parser won't emit events until `resume` is called.
   */
  pause() {
    this.tokenizer.pause();
  }
  /**
   * Resumes parsing after `pause` was called.
   */
  resume() {
    this.tokenizer.resume();
    while (this.tokenizer.running && this.writeIndex < this.buffers.length) {
      this.tokenizer.write(this.buffers[this.writeIndex++]);
    }
    if (this.ended)
      this.tokenizer.end();
  }
  /**
   * Alias of `write`, for backwards compatibility.
   *
   * @param chunk Chunk to parse.
   * @deprecated
   */
  parseChunk(chunk) {
    this.write(chunk);
  }
  /**
   * Alias of `end`, for backwards compatibility.
   *
   * @param chunk Optional final chunk to parse.
   * @deprecated
   */
  done(chunk) {
    this.end(chunk);
  }
}
function parseDocument(data2, options2) {
  const handler = new DomHandler(void 0, options2);
  new Parser2(handler, options2).end(data2);
  return handler.root;
}
const parse = getParse((content, options2, isDocument2, context) => options2.xmlMode || options2._useHtmlParser2 ? parseDocument(content, options2) : parseWithParse5(content, options2, isDocument2, context));
const load = getLoad(parse, (dom, options2) => options2.xmlMode || options2._useHtmlParser2 ? render$4(dom, options2) : renderWithParse5(dom));
load([]);
const dual = (arity, body) => {
  const isDataFirst = typeof arity === "number" ? (args) => args.length >= arity : arity;
  return function() {
    if (isDataFirst(arguments)) {
      return body.apply(this, arguments);
    }
    return (self) => body(self, ...arguments);
  };
};
const identity = (a) => a;
const constant = (value) => () => value;
const constTrue = /* @__PURE__ */ constant(true);
const constFalse = /* @__PURE__ */ constant(false);
const constUndefined = /* @__PURE__ */ constant(void 0);
const isNumber = (input) => typeof input === "number";
const isBigint = (input) => typeof input === "bigint";
const isObject = (input) => typeof input === "object" && input != null;
const isNullable = (input) => input === null || input === void 0;
const defaultIncHi = 335903614;
const defaultIncLo = 4150755663;
const MUL_HI = 1481765933 >>> 0;
const MUL_LO = 1284865837 >>> 0;
const BIT_53 = 9007199254740992;
const BIT_27 = 134217728;
class PCGRandom {
  constructor(seedHi, seedLo, incHi, incLo) {
    if (isNullable(seedLo) && isNullable(seedHi)) {
      seedLo = Math.random() * 4294967295 >>> 0;
      seedHi = 0;
    } else if (isNullable(seedLo)) {
      seedLo = seedHi;
      seedHi = 0;
    }
    if (isNullable(incLo) && isNullable(incHi)) {
      incLo = this._state ? this._state[3] : defaultIncLo;
      incHi = this._state ? this._state[2] : defaultIncHi;
    } else if (isNullable(incLo)) {
      incLo = incHi;
      incHi = 0;
    }
    this._state = new Int32Array([0, 0, incHi >>> 0, ((incLo || 0) | 1) >>> 0]);
    this._next();
    add64(this._state, this._state[0], this._state[1], seedHi >>> 0, seedLo >>> 0);
    this._next();
    return this;
  }
  /**
   * Returns a copy of the internal state of this random number generator as a
   * JavaScript Array.
   *
   * @category getters
   * @since 1.0.0
   */
  getState() {
    return [this._state[0], this._state[1], this._state[2], this._state[3]];
  }
  /**
   * Restore state previously retrieved using `getState()`.
   *
   * @since 1.0.0
   */
  setState(state) {
    this._state[0] = state[0];
    this._state[1] = state[1];
    this._state[2] = state[2];
    this._state[3] = state[3] | 1;
  }
  /**
   * Get a uniformly distributed 32 bit integer between [0, max).
   *
   * @category getter
   * @since 1.0.0
   */
  integer(max) {
    if (!max) {
      return this._next();
    }
    max = max >>> 0;
    if ((max & max - 1) === 0) {
      return this._next() & max - 1;
    }
    let num = 0;
    const skew = (-max >>> 0) % max >>> 0;
    for (num = this._next(); num < skew; num = this._next()) {
    }
    return num % max;
  }
  /**
   * Get a uniformly distributed IEEE-754 double between 0.0 and 1.0, with
   * 53 bits of precision (every bit of the mantissa is randomized).
   *
   * @category getters
   * @since 1.0.0
   */
  number() {
    const hi = (this._next() & 67108863) * 1;
    const lo = (this._next() & 134217727) * 1;
    return (hi * BIT_27 + lo) / BIT_53;
  }
  /** @internal */
  _next() {
    const oldHi = this._state[0] >>> 0;
    const oldLo = this._state[1] >>> 0;
    mul64(this._state, oldHi, oldLo, MUL_HI, MUL_LO);
    add64(this._state, this._state[0], this._state[1], this._state[2], this._state[3]);
    let xsHi = oldHi >>> 18;
    let xsLo = (oldLo >>> 18 | oldHi << 14) >>> 0;
    xsHi = (xsHi ^ oldHi) >>> 0;
    xsLo = (xsLo ^ oldLo) >>> 0;
    const xorshifted = (xsLo >>> 27 | xsHi << 5) >>> 0;
    const rot = oldHi >>> 27;
    const rot2 = (-rot >>> 0 & 31) >>> 0;
    return (xorshifted >>> rot | xorshifted << rot2) >>> 0;
  }
}
function mul64(out, aHi, aLo, bHi, bLo) {
  let c1 = (aLo >>> 16) * (bLo & 65535) >>> 0;
  let c0 = (aLo & 65535) * (bLo >>> 16) >>> 0;
  let lo = (aLo & 65535) * (bLo & 65535) >>> 0;
  let hi = (aLo >>> 16) * (bLo >>> 16) + ((c0 >>> 16) + (c1 >>> 16)) >>> 0;
  c0 = c0 << 16 >>> 0;
  lo = lo + c0 >>> 0;
  if (lo >>> 0 < c0 >>> 0) {
    hi = hi + 1 >>> 0;
  }
  c1 = c1 << 16 >>> 0;
  lo = lo + c1 >>> 0;
  if (lo >>> 0 < c1 >>> 0) {
    hi = hi + 1 >>> 0;
  }
  hi = hi + Math.imul(aLo, bHi) >>> 0;
  hi = hi + Math.imul(aHi, bLo) >>> 0;
  out[0] = hi;
  out[1] = lo;
}
function add64(out, aHi, aLo, bHi, bLo) {
  let hi = aHi + bHi >>> 0;
  const lo = aLo + bLo >>> 0;
  if (lo >>> 0 < aLo >>> 0) {
    hi = hi + 1 | 0;
  }
  out[0] = hi;
  out[1] = lo;
}
const globalStoreId = /* @__PURE__ */ Symbol.for("@effect/data/Global/globalStoreId");
if (!(globalStoreId in globalThis)) {
  globalThis[globalStoreId] = /* @__PURE__ */ new Map();
}
const globalStore = globalThis[globalStoreId];
const globalValue = (id, compute) => {
  if (!globalStore.has(id)) {
    globalStore.set(id, compute());
  }
  return globalStore.get(id);
};
const randomHashCache = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/data/Hash/randomHashCache"), () => /* @__PURE__ */ new WeakMap());
const pcgr = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/data/Hash/pcgr"), () => new PCGRandom());
const symbol$1 = /* @__PURE__ */ Symbol.for("@effect/data/Hash");
const hash = (self) => {
  switch (typeof self) {
    case "number": {
      return number$1(self);
    }
    case "bigint": {
      return string(self.toString(10));
    }
    case "boolean": {
      return string(String(self));
    }
    case "symbol": {
      return string(String(self));
    }
    case "string": {
      return string(self);
    }
    case "undefined": {
      return string("undefined");
    }
    case "function":
    case "object": {
      if (self === null) {
        return string("null");
      }
      if (isHash(self)) {
        return self[symbol$1]();
      } else {
        return random(self);
      }
    }
    default: {
      throw new Error("Bug in Equal.hash");
    }
  }
};
const random = (self) => {
  if (!randomHashCache.has(self)) {
    randomHashCache.set(self, number$1(pcgr.integer(Number.MAX_SAFE_INTEGER)));
  }
  return randomHashCache.get(self);
};
const combine$6 = (b) => (self) => self * 53 ^ b;
const optimize = (n) => n & 3221225471 | n >>> 1 & 1073741824;
const isHash = (u) => typeof u === "object" && u !== null && symbol$1 in u;
const number$1 = (n) => {
  if (n !== n || n === Infinity) {
    return 0;
  }
  let h = n | 0;
  if (h !== n) {
    h ^= n * 4294967295;
  }
  while (n > 4294967295) {
    h ^= n /= 4294967295;
  }
  return optimize(n);
};
const string = (str) => {
  let h = 5381, i = str.length;
  while (i) {
    h = h * 33 ^ str.charCodeAt(--i);
  }
  return optimize(h);
};
const structureKeys = (o, keys2) => {
  let h = 12289;
  for (let i = 0; i < keys2.length; i++) {
    h ^= combine$6(hash(o[keys2[i]]))(string(keys2[i]));
  }
  return optimize(h);
};
const structure = (o) => structureKeys(o, Object.keys(o));
const array$1 = (arr) => {
  let h = 6151;
  for (let i = 0; i < arr.length; i++) {
    h = combine$6(hash(arr[i]))(h);
  }
  return optimize(h);
};
const symbol = /* @__PURE__ */ Symbol.for("@effect/data/Equal");
function equals$1() {
  if (arguments.length === 1) {
    return (self) => compareBoth(self, arguments[0]);
  }
  return compareBoth(arguments[0], arguments[1]);
}
function compareBoth(self, that) {
  if (self === that) {
    return true;
  }
  const selfType = typeof self;
  if (selfType !== typeof that) {
    return false;
  }
  if ((selfType === "object" || selfType === "function") && self !== null && that !== null) {
    if (isEqual(self) && isEqual(that)) {
      return hash(self) === hash(that) && self[symbol](that);
    }
  }
  return false;
}
const isEqual = (u) => typeof u === "object" && u !== null && symbol in u;
const equivalence = () => (self, that) => hash(self) === hash(that) && equals$1(self, that);
const EffectTypeId$1 = /* @__PURE__ */ Symbol.for("@effect/io/Effect");
const effectVariance$1 = {
  _R: (_) => _,
  _E: (_) => _,
  _A: (_) => _
};
const make$j = (isEquivalent) => (self, that) => self === that || isEquivalent(self, that);
const mapInput$1 = /* @__PURE__ */ dual(2, (self, f) => make$j((x, y) => self(f(x), f(y))));
const array = (item) => make$j((self, that) => {
  if (self.length !== that.length) {
    return false;
  }
  for (let i = 0; i < self.length; i++) {
    const isEq = item(self[i], that[i]);
    if (!isEq) {
      return false;
    }
  }
  return true;
});
const pipeArguments = (self, args) => {
  switch (args.length) {
    case 1:
      return args[0](self);
    case 2:
      return args[1](args[0](self));
    case 3:
      return args[2](args[1](args[0](self)));
    case 4:
      return args[3](args[2](args[1](args[0](self))));
    case 5:
      return args[4](args[3](args[2](args[1](args[0](self)))));
    case 6:
      return args[5](args[4](args[3](args[2](args[1](args[0](self))))));
    case 7:
      return args[6](args[5](args[4](args[3](args[2](args[1](args[0](self)))))));
    case 8:
      return args[7](args[6](args[5](args[4](args[3](args[2](args[1](args[0](self))))))));
    case 9:
      return args[8](args[7](args[6](args[5](args[4](args[3](args[2](args[1](args[0](self)))))))));
    default: {
      let ret = self;
      for (let i = 0, len = args.length; i < len; i++) {
        ret = args[i](ret);
      }
      return ret;
    }
  }
};
var _a$g, _b$a;
const TypeId$6 = /* @__PURE__ */ Symbol.for("@effect/data/Option");
class Some {
  [(_a$g = EffectTypeId$1, symbol)](that) {
    return isOption(that) && isSome$1(that) && equals$1(that.i0, this.i0);
  }
  [symbol$1]() {
    return hash(this.i0);
  }
  toString() {
    return `some(${String(this.i0)})`;
  }
  toJSON() {
    return {
      _tag: this._tag,
      value: this.i0
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
  get [TypeId$6]() {
    return {
      _A: (_) => _
    };
  }
  get value() {
    return this.i0;
  }
  constructor(i0) {
    this.i0 = i0;
    this._tag = "Some";
    this._id = TypeId$6;
    this.i1 = void 0;
    this.i2 = void 0;
    this[_a$g] = effectVariance$1;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
let None$3 = class None {
  constructor() {
    this._tag = "None";
    this._id = TypeId$6;
    this.i0 = void 0;
    this.i1 = void 0;
    this.i2 = void 0;
    this[_b$a] = effectVariance$1;
  }
  [(_b$a = EffectTypeId$1, symbol)](that) {
    return isOption(that) && isNone$1(that);
  }
  [symbol$1]() {
    return hash(this._tag);
  }
  toString() {
    return `none()`;
  }
  toJSON() {
    return {
      _tag: this._tag
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
  get [TypeId$6]() {
    return {
      _A: (_) => _
    };
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const isOption = (input) => typeof input === "object" && input != null && "_tag" in input && (input["_tag"] === "None" || input["_tag"] === "Some") && isEqual(input);
const isNone$1 = (fa) => fa._tag === "None";
const isSome$1 = (fa) => fa._tag === "Some";
const none$5 = /* @__PURE__ */ new None$3();
const some$1 = (a) => new Some(a);
var _a$f, _b$9;
const TypeId$5 = /* @__PURE__ */ Symbol.for("@effect/data/Either");
class Right {
  [(_a$f = EffectTypeId$1, symbol)](that) {
    return isEither(that) && isRight$1(that) && equals$1(that.i0, this.i0);
  }
  [symbol$1]() {
    return hash(this.i0);
  }
  get right() {
    return this.i0;
  }
  constructor(i0) {
    this.i0 = i0;
    this._tag = "Right";
    this._id = TypeId$5;
    this.i1 = void 0;
    this.i2 = void 0;
    this[_a$f] = effectVariance$1;
  }
  get [TypeId$5]() {
    return {
      _E: (_) => _,
      _A: (_) => _
    };
  }
  toString() {
    return `right(${String(this.i0)})`;
  }
  toJSON() {
    return {
      _tag: this._tag,
      right: this.i0
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
class Left {
  [(_b$9 = EffectTypeId$1, symbol)](that) {
    return isEither(that) && isLeft$1(that) && equals$1(that.i0, this.i0);
  }
  [symbol$1]() {
    return hash(this.i0);
  }
  get [TypeId$5]() {
    return {
      _E: (_) => _,
      _A: (_) => _
    };
  }
  get left() {
    return this.i0;
  }
  constructor(i0) {
    this.i0 = i0;
    this._tag = "Left";
    this._id = TypeId$5;
    this.i1 = void 0;
    this.i2 = void 0;
    this[_b$9] = effectVariance$1;
  }
  toString() {
    return `left(${String(this.i0)})`;
  }
  toJSON() {
    return {
      _tag: this._tag,
      left: this.i0
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const isEither = (input) => typeof input === "object" && input != null && "_tag" in input && (input["_tag"] === "Left" || input["_tag"] === "Right") && isEqual(input);
const isLeft$1 = (ma) => ma._tag === "Left";
const isRight$1 = (ma) => ma._tag === "Right";
const left$1 = (e) => new Left(e);
const right$1 = (a) => new Right(a);
const make$i = (compare) => (self, that) => self === that ? 0 : compare(self, that);
const number = /* @__PURE__ */ make$i((self, that) => self < that ? -1 : 1);
const mapInput = /* @__PURE__ */ dual(2, (self, f) => make$i((b1, b2) => self(f(b1), f(b2))));
const greaterThan$1 = (O) => dual(2, (self, that) => O(self, that) === 1);
const Order$1 = number;
const none$4 = () => none$5;
const some = some$1;
const isNone = isNone$1;
const isSome = isSome$1;
const match$2 = /* @__PURE__ */ dual(2, (self, {
  onNone,
  onSome
}) => isNone(self) ? onNone() : onSome(self.value));
const getOrElse = /* @__PURE__ */ dual(2, (self, onNone) => isNone(self) ? onNone() : self.value);
const fromNullable = (nullableValue) => nullableValue == null ? none$4() : some(nullableValue);
const getOrUndefined = /* @__PURE__ */ getOrElse(constUndefined);
const map$5 = /* @__PURE__ */ dual(2, (self, f) => isNone(self) ? none$4() : some(f(self.value)));
const flatMap$3 = /* @__PURE__ */ dual(2, (self, f) => isNone(self) ? none$4() : f(self.value));
const containsWith = (isEquivalent) => dual(2, (self, a) => isNone(self) ? false : isEquivalent(self.value, a));
const _equivalence$2 = /* @__PURE__ */ equivalence();
const contains = /* @__PURE__ */ containsWith(_equivalence$2);
var _a$e;
const TagTypeId = /* @__PURE__ */ Symbol.for("@effect/data/Context/Tag");
class TagImpl {
  [(_a$e = EffectTypeId$1, symbol)](that) {
    return this === that;
  }
  [symbol$1]() {
    return random(this);
  }
  get [TagTypeId]() {
    return {
      _S: (_) => _,
      _I: (_) => _
    };
  }
  constructor(identifier) {
    this._tag = "Tag";
    this.i0 = void 0;
    this.i1 = void 0;
    this.i2 = void 0;
    this[_a$e] = effectVariance$1;
    if (typeof identifier !== "undefined") {
      this.i0 = identifier;
      return globalValue(identifier, () => this);
    }
  }
  toString() {
    return JSON.stringify(this);
  }
  toJSON() {
    return {
      _tag: "Tag",
      identifier: this.i0
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
  of(self) {
    return self;
  }
  context(self) {
    return make$h(this, self);
  }
}
const ContextTypeId = /* @__PURE__ */ Symbol.for("@effect/data/Context");
class ContextImpl {
  [symbol](that) {
    if (isContext(that)) {
      if (this.unsafeMap.size === that.unsafeMap.size) {
        for (const k of this.unsafeMap.keys()) {
          if (!that.unsafeMap.has(k) || !equals$1(this.unsafeMap.get(k), that.unsafeMap.get(k))) {
            return false;
          }
        }
        return true;
      }
    }
    return false;
  }
  [symbol$1]() {
    return number$1(this.unsafeMap.size);
  }
  constructor(unsafeMap) {
    this.unsafeMap = unsafeMap;
    this._id = ContextTypeId;
    this._S = (_) => _;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const isContext = (u) => typeof u === "object" && u !== null && "_id" in u && u["_id"] === ContextTypeId;
const empty$i = () => new ContextImpl(/* @__PURE__ */ new Map());
const make$h = (tag, service) => new ContextImpl(/* @__PURE__ */ new Map([[tag, service]]));
const add$3 = /* @__PURE__ */ dual(3, (self, tag, service) => {
  const map2 = new Map(self.unsafeMap);
  map2.set(tag, service);
  return new ContextImpl(map2);
});
const get$8 = /* @__PURE__ */ dual(2, (self, tag) => {
  if (!self.unsafeMap.has(tag)) {
    throw new Error("Service not found");
  }
  return self.unsafeMap.get(tag);
});
const unsafeGet$3 = /* @__PURE__ */ dual(2, (self, tag) => {
  if (!self.unsafeMap.has(tag)) {
    throw new Error("Service not found");
  }
  return self.unsafeMap.get(tag);
});
const Tag = (key) => new TagImpl(key);
const empty$h = empty$i;
const add$2 = add$3;
const get$7 = get$8;
const unsafeGet$2 = unsafeGet$3;
const TypeId$4 = /* @__PURE__ */ Symbol.for("@effect/data/Duration");
const bigint1e3 = /* @__PURE__ */ BigInt(1e3);
const bigint1e9 = /* @__PURE__ */ BigInt(1e9);
const DURATION_REGEX = /^(-?\d+(?:\.\d+)?)\s+(nanos|micros|millis|seconds|minutes|hours|days|weeks)$/;
const decode = (input) => {
  if (isDuration(input)) {
    return input;
  } else if (isNumber(input)) {
    return millis(input);
  } else if (isBigint(input)) {
    return nanos(input);
  } else {
    DURATION_REGEX.lastIndex = 0;
    const match2 = DURATION_REGEX.exec(input);
    if (match2) {
      const [_, valueStr, unit2] = match2;
      const value = Number(valueStr);
      switch (unit2) {
        case "nanos":
          return nanos(BigInt(valueStr));
        case "micros":
          return micros(BigInt(valueStr));
        case "millis":
          return millis(value);
        case "seconds":
          return seconds(value);
        case "minutes":
          return minutes(value);
        case "hours":
          return hours(value);
        case "days":
          return days(value);
        case "weeks":
          return weeks(value);
      }
    }
  }
  throw new Error("Invalid duration input");
};
const zeroValue = {
  _tag: "Millis",
  millis: 0
};
const infinityValue = {
  _tag: "Infinity"
};
class DurationImpl {
  constructor(input) {
    this._id = TypeId$4;
    if (isNumber(input)) {
      if (isNaN(input) || input < 0) {
        this.value = zeroValue;
      } else if (!Number.isFinite(input)) {
        this.value = infinityValue;
      } else if (!Number.isInteger(input)) {
        this.value = {
          _tag: "Nanos",
          nanos: BigInt(Math.round(input * 1e6))
        };
      } else {
        this.value = {
          _tag: "Millis",
          millis: input
        };
      }
    } else if (input < BigInt(0)) {
      this.value = zeroValue;
    } else {
      this.value = {
        _tag: "Nanos",
        nanos: input
      };
    }
  }
  [symbol$1]() {
    return structure(this.value);
  }
  [symbol](that) {
    return isDuration(that) && equals(this, that);
  }
  toString() {
    switch (this.value._tag) {
      case "Millis":
        return `Duration("${this.value.millis} millis")`;
      case "Nanos":
        return `Duration("${this.value.nanos} nanos")`;
      case "Infinity":
        return "Duration(Infinity)";
    }
  }
  toJSON() {
    if (this.value._tag === "Nanos") {
      return {
        _tag: "Duration",
        value: {
          _tag: "Nanos",
          hrtime: toHrTime(this)
        }
      };
    }
    return {
      _tag: "Duration",
      value: this.value
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const isDuration = (u) => isObject(u) && "_id" in u && u["_id"] === TypeId$4;
const zero = /* @__PURE__ */ new DurationImpl(0);
const nanos = (nanos2) => new DurationImpl(nanos2);
const micros = (micros2) => new DurationImpl(micros2 * bigint1e3);
const millis = (millis2) => new DurationImpl(millis2);
const seconds = (seconds2) => new DurationImpl(seconds2 * 1e3);
const minutes = (minutes2) => new DurationImpl(minutes2 * 6e4);
const hours = (hours2) => new DurationImpl(hours2 * 36e5);
const days = (days2) => new DurationImpl(days2 * 864e5);
const weeks = (weeks2) => new DurationImpl(weeks2 * 6048e5);
const toMillis = (self) => {
  const _self = decode(self);
  switch (_self.value._tag) {
    case "Infinity":
      return Infinity;
    case "Nanos":
      return Number(_self.value.nanos) / 1e6;
    case "Millis":
      return _self.value.millis;
  }
};
const toHrTime = (self) => {
  const _self = decode(self);
  switch (_self.value._tag) {
    case "Infinity":
      return [Infinity, 0];
    case "Nanos":
      return [Number(_self.value.nanos / bigint1e9), Number(_self.value.nanos % bigint1e9)];
    case "Millis":
      return [Math.floor(_self.value.millis / 1e3), Math.round(_self.value.millis % 1e3 * 1e6)];
  }
};
const matchWith = /* @__PURE__ */ dual(3, (self, that, options2) => {
  const _self = decode(self);
  const _that = decode(that);
  if (_self.value._tag === "Infinity" || _that.value._tag === "Infinity") {
    return options2.onMillis(toMillis(_self), toMillis(_that));
  } else if (_self.value._tag === "Nanos" || _that.value._tag === "Nanos") {
    const selfNanos = _self.value._tag === "Nanos" ? _self.value.nanos : BigInt(Math.round(_self.value.millis * 1e6));
    const thatNanos = _that.value._tag === "Nanos" ? _that.value.nanos : BigInt(Math.round(_that.value.millis * 1e6));
    return options2.onNanos(selfNanos, thatNanos);
  }
  return options2.onMillis(_self.value.millis, _that.value.millis);
});
const Equivalence = (self, that) => matchWith(self, that, {
  onMillis: (self2, that2) => self2 === that2,
  onNanos: (self2, that2) => self2 === that2
});
const greaterThanOrEqualTo = /* @__PURE__ */ dual(2, (self, that) => matchWith(self, that, {
  onMillis: (self2, that2) => self2 >= that2,
  onNanos: (self2, that2) => self2 >= that2
}));
const equals = /* @__PURE__ */ dual(2, (self, that) => Equivalence(decode(self), decode(that)));
const right = right$1;
const left = left$1;
const isLeft = isLeft$1;
const isRight = isRight$1;
const match$1 = /* @__PURE__ */ dual(2, (self, {
  onLeft,
  onRight
}) => isLeft(self) ? onLeft(self.left) : onRight(self.right));
const merge$1 = /* @__PURE__ */ match$1({
  onLeft: identity,
  onRight: identity
});
const isNonEmptyArray = (self) => self.length > 0;
const makeBy = (n, f) => {
  const max = Math.max(1, Math.floor(n));
  const out = [f(0)];
  for (let i = 1; i < max; i++) {
    out.push(f(i));
  }
  return out;
};
const fromIterable$5 = (collection) => Array.isArray(collection) ? collection : Array.from(collection);
const prepend$2 = /* @__PURE__ */ dual(2, (self, head2) => [head2, ...self]);
const append$1 = /* @__PURE__ */ dual(2, (self, last2) => [...self, last2]);
const isEmptyArray = (self) => self.length === 0;
const isEmptyReadonlyArray = isEmptyArray;
const isNonEmptyReadonlyArray = isNonEmptyArray;
const isOutOfBound = (i, as2) => i < 0 || i >= as2.length;
const get$6 = /* @__PURE__ */ dual(2, (self, index2) => {
  const i = Math.floor(index2);
  return isOutOfBound(i, self) ? none$4() : some(self[i]);
});
const unsafeGet$1 = /* @__PURE__ */ dual(2, (self, index2) => {
  const i = Math.floor(index2);
  if (isOutOfBound(i, self)) {
    throw new Error(`Index ${i} out of bounds`);
  }
  return self[i];
});
const head$2 = /* @__PURE__ */ get$6(0);
const headNonEmpty$1 = /* @__PURE__ */ unsafeGet$1(0);
const last = (self) => isNonEmptyReadonlyArray(self) ? some(lastNonEmpty(self)) : none$4();
const lastNonEmpty = (self) => self[self.length - 1];
const tailNonEmpty$1 = (self) => self.slice(1);
const findFirst = /* @__PURE__ */ dual(2, (self, predicate) => {
  const input = fromIterable$5(self);
  for (let i = 0; i < input.length; i++) {
    if (predicate(input[i])) {
      return some(input[i]);
    }
  }
  return none$4();
});
const reverse$2 = (self) => Array.from(self).reverse();
const sort$1 = /* @__PURE__ */ dual(2, (self, O) => {
  const out = Array.from(self);
  out.sort(O);
  return out;
});
const zip$1 = /* @__PURE__ */ dual(2, (self, that) => zipWith(self, that, (a, b) => [a, b]));
const zipWith = /* @__PURE__ */ dual(3, (self, that, f) => {
  const as2 = fromIterable$5(self);
  const bs = fromIterable$5(that);
  return isNonEmptyReadonlyArray(as2) && isNonEmptyReadonlyArray(bs) ? zipNonEmptyWith(bs, f)(as2) : [];
});
const zipNonEmptyWith = /* @__PURE__ */ dual(3, (self, that, f) => {
  const cs = [f(headNonEmpty$1(self), headNonEmpty$1(that))];
  const len = Math.min(self.length, that.length);
  for (let i = 1; i < len; i++) {
    cs[i] = f(self[i], that[i]);
  }
  return cs;
});
const dedupeNonEmptyWith = /* @__PURE__ */ dual(2, (self, isEquivalent) => {
  const out = [headNonEmpty$1(self)];
  const rest = tailNonEmpty$1(self);
  for (const a of rest) {
    if (out.every((o) => !isEquivalent(a, o))) {
      out.push(a);
    }
  }
  return out;
});
const empty$g = () => [];
const of$2 = (a) => [a];
const map$4 = /* @__PURE__ */ dual(2, (self, f) => self.map(f));
const flatMap$2 = /* @__PURE__ */ dual(2, (self, f) => {
  if (isEmptyReadonlyArray(self)) {
    return [];
  }
  const out = [];
  for (let i = 0; i < self.length; i++) {
    out.push(...f(self[i], i));
  }
  return out;
});
const flatten$1 = /* @__PURE__ */ flatMap$2(identity);
const reduce$6 = /* @__PURE__ */ dual(3, (self, b, f) => fromIterable$5(self).reduce((b2, a, i) => f(b2, a, i), b));
const unfold = (b, f) => {
  const out = [];
  let next2 = b;
  let o;
  while (isSome(o = f(next2))) {
    const [a, b2] = o.value;
    out.push(a);
    next2 = b2;
  }
  return out;
};
const getEquivalence$2 = array;
const dedupeWith = /* @__PURE__ */ dual(2, (self, isEquivalent) => {
  const input = fromIterable$5(self);
  return isNonEmptyReadonlyArray(input) ? dedupeNonEmptyWith(isEquivalent)(input) : [];
});
const dedupe$1 = /* @__PURE__ */ dedupeWith(/* @__PURE__ */ equivalence());
const join = /* @__PURE__ */ dual(2, (self, sep) => fromIterable$5(self).join(sep));
const TypeId$3 = /* @__PURE__ */ Symbol.for("@effect/data/Chunk");
function copy(src, srcPos, dest, destPos, len) {
  for (let i = srcPos; i < Math.min(src.length, srcPos + len); i++) {
    dest[destPos + i - srcPos] = src[i];
  }
  return dest;
}
const emptyArray = [];
const getEquivalence$1 = (isEquivalent) => make$j((self, that) => toReadonlyArray$1(self).every((value, i) => isEquivalent(value, unsafeGet(that, i))));
const _equivalence$1 = /* @__PURE__ */ getEquivalence$1(equals$1);
class ChunkImpl {
  constructor(backing) {
    this.backing = backing;
    this._id = TypeId$3;
    switch (backing._tag) {
      case "IEmpty": {
        this.length = 0;
        this.depth = 0;
        this.left = this;
        this.right = this;
        break;
      }
      case "IConcat": {
        this.length = backing.left.length + backing.right.length;
        this.depth = 1 + Math.max(backing.left.depth, backing.right.depth);
        this.left = backing.left;
        this.right = backing.right;
        break;
      }
      case "IArray": {
        this.length = backing.array.length;
        this.depth = 0;
        this.left = _empty;
        this.right = _empty;
        break;
      }
      case "ISingleton": {
        this.length = 1;
        this.depth = 0;
        this.left = _empty;
        this.right = _empty;
        break;
      }
      case "ISlice": {
        this.length = backing.length;
        this.depth = backing.chunk.depth + 1;
        this.left = _empty;
        this.right = _empty;
        break;
      }
    }
  }
  toString() {
    return `Chunk(${toReadonlyArray$1(this).map(String).join(", ")})`;
  }
  toJSON() {
    return {
      _tag: "Chunk",
      values: toReadonlyArray$1(this)
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
  [symbol](that) {
    return isChunk(that) && _equivalence$1(this, that);
  }
  [symbol$1]() {
    return array$1(toReadonlyArray$1(this));
  }
  [Symbol.iterator]() {
    switch (this.backing._tag) {
      case "IArray": {
        return this.backing.array[Symbol.iterator]();
      }
      case "IEmpty": {
        return emptyArray[Symbol.iterator]();
      }
      default: {
        return toReadonlyArray$1(this)[Symbol.iterator]();
      }
    }
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const isChunk = (u) => isObject(u) && "_id" in u && u["_id"] === TypeId$3;
const _empty = /* @__PURE__ */ new ChunkImpl({
  _tag: "IEmpty"
});
const empty$f = () => _empty;
const of$1 = (a) => new ChunkImpl({
  _tag: "ISingleton",
  a
});
const fromIterable$4 = (self) => isChunk(self) ? self : new ChunkImpl({
  _tag: "IArray",
  array: fromIterable$5(self)
});
const copyToArray = (self, array2, initial) => {
  switch (self.backing._tag) {
    case "IArray": {
      copy(self.backing.array, 0, array2, initial, self.length);
      break;
    }
    case "IConcat": {
      copyToArray(self.left, array2, initial);
      copyToArray(self.right, array2, initial + self.left.length);
      break;
    }
    case "ISingleton": {
      array2[initial] = self.backing.a;
      break;
    }
    case "ISlice": {
      let i = 0;
      let j = initial;
      while (i < self.length) {
        array2[j] = unsafeGet(self, i);
        i += 1;
        j += 1;
      }
      break;
    }
  }
};
const toReadonlyArray$1 = (self) => {
  switch (self.backing._tag) {
    case "IEmpty": {
      return emptyArray;
    }
    case "IArray": {
      return self.backing.array;
    }
    default: {
      const arr = new Array(self.length);
      copyToArray(self, arr, 0);
      self.backing = {
        _tag: "IArray",
        array: arr
      };
      self.left = _empty;
      self.right = _empty;
      self.depth = 0;
      return arr;
    }
  }
};
const reverse$1 = (self) => {
  switch (self.backing._tag) {
    case "IEmpty":
    case "ISingleton":
      return self;
    case "IArray": {
      return new ChunkImpl({
        _tag: "IArray",
        array: reverse$2(self.backing.array)
      });
    }
    case "IConcat": {
      return new ChunkImpl({
        _tag: "IConcat",
        left: reverse$1(self.backing.right),
        right: reverse$1(self.backing.left)
      });
    }
    case "ISlice":
      return unsafeFromArray(reverse$2(toReadonlyArray$1(self)));
  }
};
const get$5 = /* @__PURE__ */ dual(2, (self, index2) => index2 < 0 || index2 >= self.length ? none$4() : some(unsafeGet(self, index2)));
const unsafeFromArray = (self) => new ChunkImpl({
  _tag: "IArray",
  array: self
});
const unsafeGet = /* @__PURE__ */ dual(2, (self, index2) => {
  switch (self.backing._tag) {
    case "IEmpty": {
      throw new Error(`Index out of bounds`);
    }
    case "ISingleton": {
      if (index2 !== 0) {
        throw new Error(`Index out of bounds`);
      }
      return self.backing.a;
    }
    case "IArray": {
      if (index2 >= self.length || index2 < 0) {
        throw new Error(`Index out of bounds`);
      }
      return self.backing.array[index2];
    }
    case "IConcat": {
      return index2 < self.left.length ? unsafeGet(self.left, index2) : unsafeGet(self.right, index2 - self.left.length);
    }
    case "ISlice": {
      return unsafeGet(self.backing.chunk, index2 + self.backing.offset);
    }
  }
});
const append = /* @__PURE__ */ dual(2, (self, a) => appendAllNonEmpty(self, of$1(a)));
const prepend$1 = /* @__PURE__ */ dual(2, (self, elem) => appendAllNonEmpty(of$1(elem), self));
const take = /* @__PURE__ */ dual(2, (self, n) => {
  if (n <= 0) {
    return _empty;
  } else if (n >= self.length) {
    return self;
  } else {
    switch (self.backing._tag) {
      case "ISlice": {
        return new ChunkImpl({
          _tag: "ISlice",
          chunk: self.backing.chunk,
          length: n,
          offset: self.backing.offset
        });
      }
      case "IConcat": {
        if (n > self.left.length) {
          return new ChunkImpl({
            _tag: "IConcat",
            left: self.left,
            right: take(self.right, n - self.left.length)
          });
        }
        return take(self.left, n);
      }
      default: {
        return new ChunkImpl({
          _tag: "ISlice",
          chunk: self,
          offset: 0,
          length: n
        });
      }
    }
  }
});
const drop = /* @__PURE__ */ dual(2, (self, n) => {
  if (n <= 0) {
    return self;
  } else if (n >= self.length) {
    return _empty;
  } else {
    switch (self.backing._tag) {
      case "ISlice": {
        return new ChunkImpl({
          _tag: "ISlice",
          chunk: self.backing.chunk,
          offset: self.backing.offset + n,
          length: self.backing.length - n
        });
      }
      case "IConcat": {
        if (n > self.left.length) {
          return drop(self.right, n - self.left.length);
        }
        return new ChunkImpl({
          _tag: "IConcat",
          left: drop(self.left, n),
          right: self.right
        });
      }
      default: {
        return new ChunkImpl({
          _tag: "ISlice",
          chunk: self,
          offset: n,
          length: self.length - n
        });
      }
    }
  }
});
const appendAll$1 = /* @__PURE__ */ dual(2, (self, that) => {
  if (self.backing._tag === "IEmpty") {
    return that;
  }
  if (that.backing._tag === "IEmpty") {
    return self;
  }
  const diff2 = that.depth - self.depth;
  if (Math.abs(diff2) <= 1) {
    return new ChunkImpl({
      _tag: "IConcat",
      left: self,
      right: that
    });
  } else if (diff2 < -1) {
    if (self.left.depth >= self.right.depth) {
      const nr = appendAll$1(self.right, that);
      return new ChunkImpl({
        _tag: "IConcat",
        left: self.left,
        right: nr
      });
    } else {
      const nrr = appendAll$1(self.right.right, that);
      if (nrr.depth === self.depth - 3) {
        const nr = new ChunkImpl({
          _tag: "IConcat",
          left: self.right.left,
          right: nrr
        });
        return new ChunkImpl({
          _tag: "IConcat",
          left: self.left,
          right: nr
        });
      } else {
        const nl = new ChunkImpl({
          _tag: "IConcat",
          left: self.left,
          right: self.right.left
        });
        return new ChunkImpl({
          _tag: "IConcat",
          left: nl,
          right: nrr
        });
      }
    }
  } else {
    if (that.right.depth >= that.left.depth) {
      const nl = appendAll$1(self, that.left);
      return new ChunkImpl({
        _tag: "IConcat",
        left: nl,
        right: that.right
      });
    } else {
      const nll = appendAll$1(self, that.left.left);
      if (nll.depth === that.depth - 3) {
        const nl = new ChunkImpl({
          _tag: "IConcat",
          left: nll,
          right: that.left.right
        });
        return new ChunkImpl({
          _tag: "IConcat",
          left: nl,
          right: that.right
        });
      } else {
        const nr = new ChunkImpl({
          _tag: "IConcat",
          left: that.left.right,
          right: that.right
        });
        return new ChunkImpl({
          _tag: "IConcat",
          left: nll,
          right: nr
        });
      }
    }
  }
});
const appendAllNonEmpty = /* @__PURE__ */ dual(2, (self, that) => appendAll$1(self, that));
const isEmpty$3 = (self) => self.length === 0;
const isNonEmpty = (self) => self.length > 0;
const head$1 = /* @__PURE__ */ get$5(0);
const unsafeHead = (self) => unsafeGet(self, 0);
const headNonEmpty = unsafeHead;
const unsafeLast = (self) => unsafeGet(self, self.length - 1);
const map$3 = /* @__PURE__ */ dual(2, (self, f) => self.backing._tag === "ISingleton" ? of$1(f(self.backing.a, 0)) : unsafeFromArray(map$4((a, i) => f(a, i))(toReadonlyArray$1(self))));
const sort = /* @__PURE__ */ dual(2, (self, O) => unsafeFromArray(sort$1(toReadonlyArray$1(self), O)));
const splitAt = /* @__PURE__ */ dual(2, (self, n) => [take(self, n), drop(self, n)]);
const splitWhere = /* @__PURE__ */ dual(2, (self, predicate) => {
  let i = 0;
  for (const a of toReadonlyArray$1(self)) {
    if (predicate(a)) {
      break;
    } else {
      i++;
    }
  }
  return splitAt(self, i);
});
const tailNonEmpty = (self) => drop(self, 1);
const dedupe = (self) => unsafeFromArray(dedupe$1(toReadonlyArray$1(self)));
const ContextPatchTypeId = /* @__PURE__ */ Symbol.for("@effect/data/Differ/ContextPatch");
function variance$2(a) {
  return a;
}
let Empty$1 = class Empty {
  constructor() {
    this._tag = "Empty";
    this._Input = variance$2;
    this._Output = variance$2;
    this._id = ContextPatchTypeId;
  }
  [symbol$1]() {
    return string(`ContextPatch(Empty)`);
  }
  [symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id;
  }
};
let AndThen$1 = class AndThen {
  constructor(first2, second) {
    this.first = first2;
    this.second = second;
    this._tag = "AndThen";
    this._id = ContextPatchTypeId;
    this._Input = variance$2;
    this._Output = variance$2;
  }
  [symbol$1]() {
    return string(`ContextPatch(AndThen)`);
  }
  [symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && equals$1(this.first, that.first) && equals$1(this.second, that.second);
  }
};
class AddService {
  constructor(tag, service) {
    this.tag = tag;
    this.service = service;
    this._tag = "AddService";
    this._id = ContextPatchTypeId;
    this._Input = variance$2;
    this._Output = variance$2;
  }
  [symbol$1]() {
    return string(`ContextPatch(AddService)`);
  }
  [symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && equals$1(this.tag, that.tag) && equals$1(this.service, that.service);
  }
}
class RemoveService {
  constructor(tag) {
    this.tag = tag;
    this._tag = "RemoveService";
    this._id = ContextPatchTypeId;
    this._Input = variance$2;
    this._Output = variance$2;
  }
  [symbol$1]() {
    return string(`ContextPatch(RemoveService)`);
  }
  [symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && equals$1(this.tag, that.tag);
  }
}
class UpdateService {
  constructor(tag, update2) {
    this.tag = tag;
    this.update = update2;
    this._tag = "UpdateService";
    this._id = ContextPatchTypeId;
    this._Input = variance$2;
    this._Output = variance$2;
  }
  [symbol$1]() {
    return string(`ContextPatch(AndThen)`);
  }
  [symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && equals$1(this.tag, that.tag) && equals$1(this.update, that.update);
  }
}
const empty$e = () => new Empty$1();
const diff$6 = (oldValue, newValue) => {
  const missingServices = new Map(oldValue.unsafeMap);
  let patch2 = empty$e();
  for (const [tag, newService] of newValue.unsafeMap.entries()) {
    if (missingServices.has(tag)) {
      const old = missingServices.get(tag);
      missingServices.delete(tag);
      if (!equals$1(old, newService)) {
        patch2 = combine$5(new UpdateService(tag, () => newService))(patch2);
      }
    } else {
      missingServices.delete(tag);
      patch2 = combine$5(new AddService(tag, newService))(patch2);
    }
  }
  for (const [tag] of missingServices.entries()) {
    patch2 = combine$5(new RemoveService(tag))(patch2);
  }
  return patch2;
};
const combine$5 = /* @__PURE__ */ dual(2, (self, that) => new AndThen$1(self, that));
const patch$7 = /* @__PURE__ */ dual(2, (self, context) => {
  let wasServiceUpdated = false;
  let patches = of$1(self);
  const updatedContext = new Map(context.unsafeMap);
  while (isNonEmpty(patches)) {
    const head2 = headNonEmpty(patches);
    const tail = tailNonEmpty(patches);
    switch (head2._tag) {
      case "Empty": {
        patches = tail;
        break;
      }
      case "AddService": {
        updatedContext.set(head2.tag, head2.service);
        patches = tail;
        break;
      }
      case "AndThen": {
        patches = prepend$1(prepend$1(tail, head2.second), head2.first);
        break;
      }
      case "RemoveService": {
        updatedContext.delete(head2.tag);
        patches = tail;
        break;
      }
      case "UpdateService": {
        updatedContext.set(head2.tag, head2.update(updatedContext.get(head2.tag)));
        wasServiceUpdated = true;
        patches = tail;
        break;
      }
    }
  }
  if (!wasServiceUpdated) {
    return new ContextImpl(updatedContext);
  }
  const map2 = /* @__PURE__ */ new Map();
  for (const [tag] of context.unsafeMap) {
    if (updatedContext.has(tag)) {
      map2.set(tag, updatedContext.get(tag));
      updatedContext.delete(tag);
    }
  }
  for (const [tag, s] of updatedContext) {
    map2.set(tag, s);
  }
  return new ContextImpl(map2);
});
const empty$d = empty$e;
const diff$5 = diff$6;
const combine$4 = combine$5;
const patch$6 = patch$7;
const SIZE = 5;
const BUCKET_SIZE = /* @__PURE__ */ Math.pow(2, SIZE);
const MASK = BUCKET_SIZE - 1;
const MAX_INDEX_NODE = BUCKET_SIZE / 2;
const MIN_ARRAY_NODE = BUCKET_SIZE / 4;
function popcount(x) {
  x -= x >> 1 & 1431655765;
  x = (x & 858993459) + (x >> 2 & 858993459);
  x = x + (x >> 4) & 252645135;
  x += x >> 8;
  x += x >> 16;
  return x & 127;
}
function hashFragment(shift, h) {
  return h >>> shift & MASK;
}
function toBitmap(x) {
  return 1 << x;
}
function fromBitmap(bitmap, bit) {
  return popcount(bitmap & bit - 1);
}
function arrayUpdate(mutate2, at, v, arr) {
  let out = arr;
  if (!mutate2) {
    const len = arr.length;
    out = new Array(len);
    for (let i = 0; i < len; ++i)
      out[i] = arr[i];
  }
  out[at] = v;
  return out;
}
function arraySpliceOut(mutate2, at, arr) {
  const newLen = arr.length - 1;
  let i = 0;
  let g = 0;
  let out = arr;
  if (mutate2) {
    i = g = at;
  } else {
    out = new Array(newLen);
    while (i < at)
      out[g++] = arr[i++];
  }
  ++i;
  while (i <= newLen)
    out[g++] = arr[i++];
  if (mutate2) {
    out.length = newLen;
  }
  return out;
}
function arraySpliceIn(mutate2, at, v, arr) {
  const len = arr.length;
  if (mutate2) {
    let i2 = len;
    while (i2 >= at)
      arr[i2--] = arr[i2];
    arr[at] = v;
    return arr;
  }
  let i = 0, g = 0;
  const out = new Array(len + 1);
  while (i < at)
    out[g++] = arr[i++];
  out[at] = v;
  while (i < len)
    out[++g] = arr[i++];
  return out;
}
class Stack {
  constructor(value, previous) {
    this.value = value;
    this.previous = previous;
  }
}
class EmptyNode {
  constructor() {
    this._tag = "EmptyNode";
  }
  modify(edit, _shift, f, hash2, key, size2) {
    const v = f(none$4());
    if (isNone(v))
      return new EmptyNode();
    ++size2.value;
    return new LeafNode(edit, hash2, key, v);
  }
}
function isEmptyNode(a) {
  return a instanceof EmptyNode;
}
function isLeafNode(node) {
  return isEmptyNode(node) || node._tag === "LeafNode" || node._tag === "CollisionNode";
}
function canEditNode(node, edit) {
  return isEmptyNode(node) ? false : edit === node.edit;
}
class LeafNode {
  constructor(edit, hash2, key, value) {
    this.edit = edit;
    this.hash = hash2;
    this.key = key;
    this.value = value;
    this._tag = "LeafNode";
  }
  modify(edit, shift, f, hash2, key, size2) {
    if (equals$1(key, this.key)) {
      const v2 = f(this.value);
      if (v2 === this.value)
        return this;
      else if (isNone(v2)) {
        --size2.value;
        return new EmptyNode();
      }
      if (canEditNode(this, edit)) {
        this.value = v2;
        return this;
      }
      return new LeafNode(edit, hash2, key, v2);
    }
    const v = f(none$4());
    if (isNone(v))
      return this;
    ++size2.value;
    return mergeLeaves(edit, shift, this.hash, this, hash2, new LeafNode(edit, hash2, key, v));
  }
}
class CollisionNode {
  constructor(edit, hash2, children2) {
    this.edit = edit;
    this.hash = hash2;
    this.children = children2;
    this._tag = "CollisionNode";
  }
  modify(edit, shift, f, hash2, key, size2) {
    if (hash2 === this.hash) {
      const canEdit = canEditNode(this, edit);
      const list = this.updateCollisionList(canEdit, edit, this.hash, this.children, f, key, size2);
      if (list === this.children)
        return this;
      return list.length > 1 ? new CollisionNode(edit, this.hash, list) : list[0];
    }
    const v = f(none$4());
    if (isNone(v))
      return this;
    ++size2.value;
    return mergeLeaves(edit, shift, this.hash, this, hash2, new LeafNode(edit, hash2, key, v));
  }
  updateCollisionList(mutate2, edit, hash2, list, f, key, size2) {
    const len = list.length;
    for (let i = 0; i < len; ++i) {
      const child = list[i];
      if ("key" in child && equals$1(key, child.key)) {
        const value = child.value;
        const newValue2 = f(value);
        if (newValue2 === value)
          return list;
        if (isNone(newValue2)) {
          --size2.value;
          return arraySpliceOut(mutate2, i, list);
        }
        return arrayUpdate(mutate2, i, new LeafNode(edit, hash2, key, newValue2), list);
      }
    }
    const newValue = f(none$4());
    if (isNone(newValue))
      return list;
    ++size2.value;
    return arrayUpdate(mutate2, len, new LeafNode(edit, hash2, key, newValue), list);
  }
}
class IndexedNode {
  constructor(edit, mask, children2) {
    this.edit = edit;
    this.mask = mask;
    this.children = children2;
    this._tag = "IndexedNode";
  }
  modify(edit, shift, f, hash2, key, size2) {
    const mask = this.mask;
    const children2 = this.children;
    const frag = hashFragment(shift, hash2);
    const bit = toBitmap(frag);
    const indx = fromBitmap(mask, bit);
    const exists = mask & bit;
    const canEdit = canEditNode(this, edit);
    if (!exists) {
      const _newChild = new EmptyNode().modify(edit, shift + SIZE, f, hash2, key, size2);
      if (!_newChild)
        return this;
      return children2.length >= MAX_INDEX_NODE ? expand(edit, frag, _newChild, mask, children2) : new IndexedNode(edit, mask | bit, arraySpliceIn(canEdit, indx, _newChild, children2));
    }
    const current = children2[indx];
    const child = current.modify(edit, shift + SIZE, f, hash2, key, size2);
    if (current === child)
      return this;
    let bitmap = mask;
    let newChildren;
    if (isEmptyNode(child)) {
      bitmap &= ~bit;
      if (!bitmap)
        return new EmptyNode();
      if (children2.length <= 2 && isLeafNode(children2[indx ^ 1])) {
        return children2[indx ^ 1];
      }
      newChildren = arraySpliceOut(canEdit, indx, children2);
    } else {
      newChildren = arrayUpdate(canEdit, indx, child, children2);
    }
    if (canEdit) {
      this.mask = bitmap;
      this.children = newChildren;
      return this;
    }
    return new IndexedNode(edit, bitmap, newChildren);
  }
}
class ArrayNode {
  constructor(edit, size2, children2) {
    this.edit = edit;
    this.size = size2;
    this.children = children2;
    this._tag = "ArrayNode";
  }
  modify(edit, shift, f, hash2, key, size2) {
    let count = this.size;
    const children2 = this.children;
    const frag = hashFragment(shift, hash2);
    const child = children2[frag];
    const newChild = (child || new EmptyNode()).modify(edit, shift + SIZE, f, hash2, key, size2);
    if (child === newChild)
      return this;
    const canEdit = canEditNode(this, edit);
    let newChildren;
    if (isEmptyNode(child) && !isEmptyNode(newChild)) {
      ++count;
      newChildren = arrayUpdate(canEdit, frag, newChild, children2);
    } else if (!isEmptyNode(child) && isEmptyNode(newChild)) {
      --count;
      if (count <= MIN_ARRAY_NODE) {
        return pack(edit, count, frag, children2);
      }
      newChildren = arrayUpdate(canEdit, frag, new EmptyNode(), children2);
    } else {
      newChildren = arrayUpdate(canEdit, frag, newChild, children2);
    }
    if (canEdit) {
      this.size = count;
      this.children = newChildren;
      return this;
    }
    return new ArrayNode(edit, count, newChildren);
  }
}
function pack(edit, count, removed, elements) {
  const children2 = new Array(count - 1);
  let g = 0;
  let bitmap = 0;
  for (let i = 0, len = elements.length; i < len; ++i) {
    if (i !== removed) {
      const elem = elements[i];
      if (elem && !isEmptyNode(elem)) {
        children2[g++] = elem;
        bitmap |= 1 << i;
      }
    }
  }
  return new IndexedNode(edit, bitmap, children2);
}
function expand(edit, frag, child, bitmap, subNodes) {
  const arr = [];
  let bit = bitmap;
  let count = 0;
  for (let i = 0; bit; ++i) {
    if (bit & 1)
      arr[i] = subNodes[count++];
    bit >>>= 1;
  }
  arr[frag] = child;
  return new ArrayNode(edit, count + 1, arr);
}
function mergeLeavesInner(edit, shift, h1, n1, h2, n2) {
  if (h1 === h2)
    return new CollisionNode(edit, h1, [n2, n1]);
  const subH1 = hashFragment(shift, h1);
  const subH2 = hashFragment(shift, h2);
  if (subH1 === subH2) {
    return (child) => new IndexedNode(edit, toBitmap(subH1) | toBitmap(subH2), [child]);
  } else {
    const children2 = subH1 < subH2 ? [n1, n2] : [n2, n1];
    return new IndexedNode(edit, toBitmap(subH1) | toBitmap(subH2), children2);
  }
}
function mergeLeaves(edit, shift, h1, n1, h2, n2) {
  let stack = void 0;
  let currentShift = shift;
  while (true) {
    const res = mergeLeavesInner(edit, currentShift, h1, n1, h2, n2);
    if (typeof res === "function") {
      stack = new Stack(res, stack);
      currentShift = currentShift + SIZE;
    } else {
      let final = res;
      while (stack != null) {
        final = stack.value(final);
        stack = stack.previous;
      }
      return final;
    }
  }
}
const HashMapTypeId = /* @__PURE__ */ Symbol.for("@effect/data/HashMap");
class HashMapImpl {
  constructor(_editable, _edit, _root, _size) {
    this._editable = _editable;
    this._edit = _edit;
    this._root = _root;
    this._size = _size;
    this._id = HashMapTypeId;
  }
  [Symbol.iterator]() {
    return new HashMapIterator(this, (k, v) => [k, v]);
  }
  [symbol$1]() {
    let hash$1 = hash("HashMap");
    for (const item of this) {
      hash$1 ^= combine$6(hash(item[0]))(hash(item[1]));
    }
    return hash$1;
  }
  [symbol](that) {
    if (isHashMap(that)) {
      if (that._size !== this._size) {
        return false;
      }
      for (const item of this) {
        const elem = getHash(item[0], hash(item[0]))(that);
        if (isNone(elem)) {
          return false;
        } else {
          if (!equals$1(item[1], elem.value)) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  }
  toString() {
    return `HashMap(${Array.from(this).map(([k, v]) => `[${String(k)}, ${String(v)}]`).join(", ")})`;
  }
  toJSON() {
    return {
      _tag: "HashMap",
      values: Array.from(this)
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
class HashMapIterator {
  constructor(map2, f) {
    this.map = map2;
    this.f = f;
    this.v = visitLazy(this.map._root, this.f, void 0);
  }
  next() {
    if (isNone(this.v)) {
      return {
        done: true,
        value: void 0
      };
    }
    const v0 = this.v.value;
    this.v = applyCont(v0.cont);
    return {
      done: false,
      value: v0.value
    };
  }
  [Symbol.iterator]() {
    return new HashMapIterator(this.map, this.f);
  }
}
const applyCont = (cont) => cont ? visitLazyChildren(cont[0], cont[1], cont[2], cont[3], cont[4]) : none$4();
const visitLazy = (node, f, cont = void 0) => {
  switch (node._tag) {
    case "LeafNode": {
      if (isSome(node.value)) {
        return some({
          value: f(node.key, node.value.value),
          cont
        });
      }
      return applyCont(cont);
    }
    case "CollisionNode":
    case "ArrayNode":
    case "IndexedNode": {
      const children2 = node.children;
      return visitLazyChildren(children2.length, children2, 0, f, cont);
    }
    default: {
      return applyCont(cont);
    }
  }
};
const visitLazyChildren = (len, children2, i, f, cont) => {
  while (i < len) {
    const child = children2[i++];
    if (child && !isEmptyNode(child)) {
      return visitLazy(child, f, [len, children2, i, f, cont]);
    }
  }
  return applyCont(cont);
};
const empty$c = () => new HashMapImpl(false, 0, new EmptyNode(), 0);
const make$g = (...entries) => fromIterable$3(entries);
const fromIterable$3 = (entries) => {
  const map2 = beginMutation$1(empty$c());
  for (const entry of entries) {
    set$3(entry[0], entry[1])(map2);
  }
  return endMutation$1(map2);
};
const isHashMap = (u) => isObject(u) && "_id" in u && u["_id"] === HashMapTypeId;
const isEmpty$2 = (self) => self && isEmptyNode(self._root);
const get$4 = /* @__PURE__ */ dual(2, (self, key) => getHash(self, key, hash(key)));
const getHash = /* @__PURE__ */ dual(3, (self, key, hash2) => {
  let node = self._root;
  let shift = 0;
  while (true) {
    switch (node._tag) {
      case "LeafNode": {
        return equals$1(key, node.key) ? node.value : none$4();
      }
      case "CollisionNode": {
        if (hash2 === node.hash) {
          const children2 = node.children;
          for (let i = 0, len = children2.length; i < len; ++i) {
            const child = children2[i];
            if ("key" in child && equals$1(key, child.key)) {
              return child.value;
            }
          }
        }
        return none$4();
      }
      case "IndexedNode": {
        const frag = hashFragment(shift, hash2);
        const bit = toBitmap(frag);
        if (node.mask & bit) {
          node = node.children[fromBitmap(node.mask, bit)];
          shift += SIZE;
          break;
        }
        return none$4();
      }
      case "ArrayNode": {
        node = node.children[hashFragment(shift, hash2)];
        if (node) {
          shift += SIZE;
          break;
        }
        return none$4();
      }
      default:
        return none$4();
    }
  }
});
const has$3 = /* @__PURE__ */ dual(2, (self, key) => isSome(getHash(self, key, hash(key))));
const set$3 = /* @__PURE__ */ dual(3, (self, key, value) => modifyAt(self, key, () => some(value)));
const setTree = /* @__PURE__ */ dual(3, (self, newRoot, newSize) => {
  if (self._editable) {
    self._root = newRoot;
    self._size = newSize;
    return self;
  }
  return newRoot === self._root ? self : new HashMapImpl(self._editable, self._edit, newRoot, newSize);
});
const keys$1 = (self) => new HashMapIterator(self, (key) => key);
const size$3 = (self) => self._size;
const beginMutation$1 = (self) => new HashMapImpl(true, self._edit + 1, self._root, self._size);
const endMutation$1 = (self) => {
  self._editable = false;
  return self;
};
const modifyAt = /* @__PURE__ */ dual(3, (self, key, f) => modifyHash(self, key, hash(key), f));
const modifyHash = /* @__PURE__ */ dual(4, (self, key, hash2, f) => {
  const size2 = {
    value: self._size
  };
  const newRoot = self._root.modify(self._editable ? self._edit : NaN, 0, f, hash2, key, size2);
  return setTree(newRoot, size2.value)(self);
});
const remove$2 = /* @__PURE__ */ dual(2, (self, key) => modifyAt(self, key, none$4));
const map$2 = /* @__PURE__ */ dual(2, (self, f) => reduce$5(self, empty$c(), (map2, value, key) => set$3(map2, key, f(value, key))));
const forEach$1 = /* @__PURE__ */ dual(2, (self, f) => reduce$5(self, void 0, (_, value, key) => f(value, key)));
const reduce$5 = /* @__PURE__ */ dual(3, (self, zero2, f) => {
  const root2 = self._root;
  if (root2._tag === "LeafNode") {
    return isSome(root2.value) ? f(zero2, root2.value.value, root2.key) : zero2;
  }
  if (root2._tag === "EmptyNode") {
    return zero2;
  }
  const toVisit = [root2.children];
  let children2;
  while (children2 = toVisit.pop()) {
    for (let i = 0, len = children2.length; i < len; ) {
      const child = children2[i++];
      if (child && !isEmptyNode(child)) {
        if (child._tag === "LeafNode") {
          if (isSome(child.value)) {
            zero2 = f(zero2, child.value.value, child.key);
          }
        } else {
          toVisit.push(child.children);
        }
      }
    }
  }
  return zero2;
});
const HashSetTypeId = /* @__PURE__ */ Symbol.for("@effect/data/HashSet");
class HashSetImpl {
  constructor(_keyMap) {
    this._keyMap = _keyMap;
    this._id = HashSetTypeId;
  }
  [Symbol.iterator]() {
    return keys$1(this._keyMap);
  }
  [symbol$1]() {
    return combine$6(hash(this._keyMap))(hash("HashSet"));
  }
  [symbol](that) {
    if (isHashSet(that)) {
      return size$3(this._keyMap) === size$3(that._keyMap) && equals$1(this._keyMap, that._keyMap);
    }
    return false;
  }
  toString() {
    return `HashSet(${Array.from(this).map(String).join(", ")})`;
  }
  toJSON() {
    return {
      _tag: "HashSet",
      values: Array.from(this)
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const isHashSet = (u) => isObject(u) && "_id" in u && u["_id"] === HashSetTypeId;
const empty$b = () => new HashSetImpl(empty$c());
const fromIterable$2 = (elements) => {
  const set2 = beginMutation(empty$b());
  for (const value of elements) {
    add$1(set2, value);
  }
  return endMutation(set2);
};
const make$f = (...elements) => {
  const set2 = beginMutation(empty$b());
  for (const value of elements) {
    add$1(set2, value);
  }
  return endMutation(set2);
};
const has$2 = /* @__PURE__ */ dual(2, (self, value) => has$3(self._keyMap, value));
const size$2 = (self) => size$3(self._keyMap);
const beginMutation = (self) => new HashSetImpl(beginMutation$1(self._keyMap));
const endMutation = (self) => {
  self._keyMap._editable = false;
  return self;
};
const mutate = /* @__PURE__ */ dual(2, (self, f) => {
  const transient = beginMutation(self);
  f(transient);
  return endMutation(transient);
});
const add$1 = /* @__PURE__ */ dual(2, (self, value) => self._keyMap._editable ? (set$3(value, true)(self._keyMap), self) : new HashSetImpl(set$3(value, true)(self._keyMap)));
const remove$1 = /* @__PURE__ */ dual(2, (self, value) => self._keyMap._editable ? (remove$2(value)(self._keyMap), self) : new HashSetImpl(remove$2(value)(self._keyMap)));
const difference$1 = /* @__PURE__ */ dual(2, (self, that) => mutate(self, (set2) => {
  for (const value of that) {
    remove$1(set2, value);
  }
}));
const union$1 = /* @__PURE__ */ dual(2, (self, that) => mutate(empty$b(), (set2) => {
  forEach(self, (value) => add$1(set2, value));
  for (const value of that) {
    add$1(set2, value);
  }
}));
const forEach = /* @__PURE__ */ dual(2, (self, f) => forEach$1(self._keyMap, (_, k) => f(k)));
const reduce$4 = /* @__PURE__ */ dual(3, (self, zero2, f) => reduce$5(self._keyMap, zero2, (z, _, a) => f(z, a)));
const empty$a = empty$c;
const make$e = make$g;
const fromIterable$1 = fromIterable$3;
const isEmpty$1 = isEmpty$2;
const get$3 = get$4;
const set$2 = set$3;
const keys = keys$1;
const size$1 = size$3;
const map$1 = map$2;
const reduce$3 = reduce$5;
const empty$9 = empty$b;
const fromIterable = fromIterable$2;
const make$d = make$f;
const has$1 = has$2;
const size = size$2;
const add = add$1;
const remove = remove$1;
const difference = difference$1;
const union = union$1;
const reduce$2 = reduce$4;
const HashSetPatchTypeId = /* @__PURE__ */ Symbol.for("@effect/data/Differ/HashSetPatch");
function variance$1(a) {
  return a;
}
class Empty2 {
  constructor() {
    this._tag = "Empty";
    this._Value = variance$1;
    this._id = HashSetPatchTypeId;
  }
  [symbol$1]() {
    return string(`HashSetPatch(Empty)`);
  }
  [symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id;
  }
}
class AndThen2 {
  constructor(first2, second) {
    this.first = first2;
    this.second = second;
    this._tag = "AndThen";
    this._Value = variance$1;
    this._id = HashSetPatchTypeId;
  }
  [symbol$1]() {
    return string(`HashSetPatch(AndThen)`);
  }
  [symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && equals$1(this.first, that.first) && equals$1(this.second, that.second);
  }
}
class Add {
  constructor(value) {
    this.value = value;
    this._tag = "Add";
    this._Value = variance$1;
    this._id = HashSetPatchTypeId;
  }
  [symbol$1]() {
    return string(`HashSetPatch(Add)`);
  }
  [symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && equals$1(this.value, that.value);
  }
}
class Remove {
  constructor(value) {
    this.value = value;
    this._tag = "Remove";
    this._Value = variance$1;
    this._id = HashSetPatchTypeId;
  }
  [symbol$1]() {
    return string(`HashSetPatch(Remove)`);
  }
  [symbol](that) {
    return typeof that === "object" && that !== null && "_id" in that && that["_id"] === this._id && "_tag" in that && that["_tag"] === this._id && equals$1(this.value, that.value);
  }
}
const empty$8 = () => new Empty2();
const diff$4 = (oldValue, newValue) => {
  const [removed, patch2] = reduce$2([oldValue, empty$8()], ([set2, patch3], value) => {
    if (has$1(value)(set2)) {
      return [remove(value)(set2), patch3];
    }
    return [set2, combine$3(new Add(value))(patch3)];
  })(newValue);
  return reduce$2(patch2, (patch3, value) => combine$3(new Remove(value))(patch3))(removed);
};
const combine$3 = /* @__PURE__ */ dual(2, (self, that) => new AndThen2(self, that));
const patch$5 = /* @__PURE__ */ dual(2, (self, oldValue) => {
  let set2 = oldValue;
  let patches = of$1(self);
  while (isNonEmpty(patches)) {
    const head2 = headNonEmpty(patches);
    const tail = tailNonEmpty(patches);
    switch (head2._tag) {
      case "Empty": {
        patches = tail;
        break;
      }
      case "AndThen": {
        patches = prepend$1(head2.first)(prepend$1(head2.second)(tail));
        break;
      }
      case "Add": {
        set2 = add(head2.value)(set2);
        patches = tail;
        break;
      }
      case "Remove": {
        set2 = remove(head2.value)(set2);
        patches = tail;
      }
    }
  }
  return set2;
});
const empty$7 = empty$8;
const diff$3 = diff$4;
const combine$2 = combine$3;
const patch$4 = patch$5;
const DifferTypeId = /* @__PURE__ */ Symbol.for("@effect/data/Differ");
class DifferImpl {
  constructor(params) {
    this._id = DifferTypeId;
    this._P = identity;
    this._V = identity;
    this.empty = params.empty;
    this.diff = params.diff;
    this.combine = params.combine;
    this.patch = params.patch;
  }
}
const make$c = (params) => new DifferImpl(params);
const environment$1 = () => make$c({
  empty: empty$d(),
  combine: (first2, second) => combine$4(second)(first2),
  diff: (oldValue, newValue) => diff$5(oldValue, newValue),
  patch: (patch2, oldValue) => patch$6(oldValue)(patch2)
});
const hashSet$1 = () => make$c({
  empty: empty$7(),
  combine: (first2, second) => combine$2(second)(first2),
  diff: (oldValue, newValue) => diff$3(oldValue, newValue),
  patch: (patch2, oldValue) => patch$4(oldValue)(patch2)
});
const update$2 = () => updateWith((_, a) => a);
const updateWith = (f) => make$c({
  empty: identity,
  combine: (first2, second) => {
    if (first2 === identity) {
      return second;
    }
    if (second === identity) {
      return first2;
    }
    return (a) => second(first2(a));
  },
  diff: (oldValue, newValue) => {
    if (equals$1(oldValue, newValue)) {
      return identity;
    }
    return constant(newValue);
  },
  patch: (patch2, oldValue) => f(oldValue, patch2(oldValue))
});
const diff$2 = /* @__PURE__ */ dual(3, (self, oldValue, newValue) => self.diff(oldValue, newValue));
const combine$1 = /* @__PURE__ */ dual(3, (self, first2, second) => self.combine(first2, second));
const patch$3 = /* @__PURE__ */ dual(3, (self, patch2, oldValue) => self.patch(patch2, oldValue));
const make$b = make$c;
const environment = environment$1;
const hashSet = hashSet$1;
const update$1 = update$2;
const TypeId$2 = /* @__PURE__ */ Symbol.for("@effect/data/List");
const toReadonlyArray = (self) => Array.from(self);
const getEquivalence = (isEquivalent) => mapInput$1(getEquivalence$2(isEquivalent), toReadonlyArray);
const _equivalence = /* @__PURE__ */ getEquivalence(equals$1);
class ConsImpl {
  constructor(head2, tail) {
    this.head = head2;
    this.tail = tail;
    this._tag = "Cons";
    this._id = TypeId$2;
  }
  toString() {
    return `List.Cons(${toReadonlyArray(this).map(String).join(", ")})`;
  }
  toJSON() {
    return {
      _tag: "List.Cons",
      values: toReadonlyArray(this)
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
  [symbol](that) {
    return isList(that) && this._tag === that._tag && _equivalence(this, that);
  }
  [symbol$1]() {
    return array$1(toReadonlyArray(this));
  }
  [Symbol.iterator]() {
    let done2 = false;
    let self = this;
    return {
      next() {
        if (done2) {
          return this.return();
        }
        if (self._tag === "Nil") {
          done2 = true;
          return this.return();
        }
        const value = self.head;
        self = self.tail;
        return {
          done: done2,
          value
        };
      },
      return(value) {
        if (!done2) {
          done2 = true;
        }
        return {
          done: true,
          value
        };
      }
    };
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
class NilImpl {
  constructor() {
    this._tag = "Nil";
    this._id = TypeId$2;
  }
  toString() {
    return `List.Nil`;
  }
  toJSON() {
    return {
      _tag: "List.Nil"
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
  [symbol$1]() {
    return array$1(toReadonlyArray(this));
  }
  [symbol](that) {
    return isList(that) && this._tag === that._tag;
  }
  [Symbol.iterator]() {
    return {
      next() {
        return {
          done: true,
          value: void 0
        };
      }
    };
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const isList = (u) => isObject(u) && "_id" in u && u["_id"] === TypeId$2;
const isNil = (self) => self._tag === "Nil";
const isCons = (self) => self._tag === "Cons";
const _Nil = /* @__PURE__ */ new NilImpl();
const nil = () => _Nil;
const cons = (head2, tail) => new ConsImpl(head2, tail);
const empty$6 = nil;
const of = (value) => new ConsImpl(value, _Nil);
const appendAll = /* @__PURE__ */ dual(2, (self, that) => prependAll(that, self));
const prepend = /* @__PURE__ */ dual(2, (self, element) => cons(element, self));
const prependAll = /* @__PURE__ */ dual(2, (self, prefix) => {
  if (isNil(self)) {
    return prefix;
  } else if (isNil(prefix)) {
    return self;
  } else {
    const result = new ConsImpl(prefix.head, self);
    let curr = result;
    let that = prefix.tail;
    while (!isNil(that)) {
      const temp = new ConsImpl(that.head, self);
      curr.tail = temp;
      curr = temp;
      that = that.tail;
    }
    return result;
  }
});
const head = (self) => isNil(self) ? none$4() : some(self.head);
const reduce$1 = /* @__PURE__ */ dual(3, (self, zero2, f) => {
  let acc = zero2;
  let these = self;
  while (!isNil(these)) {
    acc = f(acc, these.head);
    these = these.tail;
  }
  return acc;
});
const reverse = (self) => {
  let result = empty$6();
  let these = self;
  while (!isNil(these)) {
    result = prepend(result, these.head);
    these = these.tail;
  }
  return result;
};
const TypeId$1 = /* @__PURE__ */ Symbol.for("@effect/data/MutableRef");
class MutableRefImpl {
  constructor(current) {
    this.current = current;
    this._T = (_) => _;
    this._id = TypeId$1;
  }
  toString() {
    return `MutableRef(${String(this.current)})`;
  }
  toJSON() {
    return {
      _tag: "MutableRef",
      current: this.current
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const make$a = (value) => new MutableRefImpl(value);
const get$2 = (self) => self.current;
const incrementAndGet = (self) => updateAndGet(self, (n) => n + 1);
const set$1 = /* @__PURE__ */ dual(2, (self, value) => {
  self.current = value;
  return self;
});
const setAndGet = /* @__PURE__ */ dual(2, (self, value) => {
  self.current = value;
  return self.current;
});
const update = /* @__PURE__ */ dual(2, (self, f) => set$1(self, f(get$2(self))));
const updateAndGet = /* @__PURE__ */ dual(2, (self, f) => setAndGet(self, f(get$2(self))));
var _a$d, _b$8;
const FiberIdSymbolKey = "@effect/io/Fiber/Id";
const FiberIdTypeId = /* @__PURE__ */ Symbol.for(FiberIdSymbolKey);
const OP_NONE = "None";
const OP_RUNTIME = "Runtime";
const OP_COMPOSITE = "Composite";
let None$2 = class None2 {
  constructor() {
    this[_a$d] = FiberIdTypeId;
    this._tag = OP_NONE;
  }
  [(_a$d = FiberIdTypeId, symbol$1)]() {
    return combine$6(hash(this._tag))(hash(FiberIdSymbolKey));
  }
  [symbol](that) {
    return isFiberId(that) && that._tag === OP_NONE;
  }
};
class Runtime {
  constructor(id, startTimeMillis) {
    this.id = id;
    this.startTimeMillis = startTimeMillis;
    this[_b$8] = FiberIdTypeId;
    this._tag = OP_RUNTIME;
  }
  [(_b$8 = FiberIdTypeId, symbol$1)]() {
    return combine$6(hash(this.startTimeMillis))(combine$6(hash(this.id))(combine$6(hash(this._tag))(hash(FiberIdSymbolKey))));
  }
  [symbol](that) {
    return isFiberId(that) && that._tag === OP_RUNTIME && this.id === that.id && this.startTimeMillis === that.startTimeMillis;
  }
}
const none$3 = /* @__PURE__ */ new None$2();
const isFiberId = (self) => {
  return typeof self === "object" && self != null && FiberIdTypeId in self;
};
const ids$1 = (self) => {
  switch (self._tag) {
    case OP_NONE: {
      return empty$9();
    }
    case OP_RUNTIME: {
      return make$d(self.id);
    }
    case OP_COMPOSITE: {
      return union(ids$1(self.right))(ids$1(self.left));
    }
  }
};
const _fiberCounter = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/io/Fiber/Id/_fiberCounter"), () => make$a(0));
const threadName$1 = (self) => {
  const identifiers = Array.from(ids$1(self)).map((n) => `#${n}`).join(",");
  return identifiers;
};
const unsafeMake$5 = () => {
  const id = get$2(_fiberCounter);
  set$1(id + 1)(_fiberCounter);
  return new Runtime(id, (/* @__PURE__ */ new Date()).getTime());
};
const none$2 = none$3;
const threadName = threadName$1;
const unsafeMake$4 = unsafeMake$5;
const BIT_MASK = 255;
const BIT_SHIFT = 8;
const active = (patch2) => patch2 & BIT_MASK;
const enabled = (patch2) => patch2 >> BIT_SHIFT & BIT_MASK;
const make$9 = (active2, enabled2) => (active2 & BIT_MASK) + ((enabled2 & active2 & BIT_MASK) << BIT_SHIFT);
const empty$5 = /* @__PURE__ */ make$9(0, 0);
const enable$2 = (flag) => make$9(flag, flag);
const disable$1 = (flag) => make$9(flag, 0);
const exclude$1 = /* @__PURE__ */ dual(2, (self, flag) => make$9(active(self) & ~flag, enabled(self)));
const andThen = /* @__PURE__ */ dual(2, (self, that) => self | that);
const invert = (n) => ~n >>> 0 & BIT_MASK;
const None$1 = 0;
const Interruption = 1 << 0;
const OpSupervision = 1 << 1;
const RuntimeMetrics = 1 << 2;
const WindDown = 1 << 4;
const CooperativeYielding = 1 << 5;
const cooperativeYielding = (self) => isEnabled(self, CooperativeYielding);
const enable$1 = /* @__PURE__ */ dual(2, (self, flag) => self | flag);
const interruptible$1 = (self) => interruption(self) && !windDown(self);
const interruption = (self) => isEnabled(self, Interruption);
const isEnabled = /* @__PURE__ */ dual(2, (self, flag) => (self & flag) !== 0);
const make$8 = (...flags) => flags.reduce((a, b) => a | b, 0);
const none$1 = /* @__PURE__ */ make$8(None$1);
const runtimeMetrics = (self) => isEnabled(self, RuntimeMetrics);
const windDown = (self) => isEnabled(self, WindDown);
const diff$1 = /* @__PURE__ */ dual(2, (self, that) => make$9(self ^ that, that));
const patch$2 = /* @__PURE__ */ dual(2, (self, patch2) => self & (invert(active(patch2)) | enabled(patch2)) | active(patch2) & enabled(patch2));
const differ$1 = /* @__PURE__ */ make$b({
  empty: empty$5,
  diff: (oldValue, newValue) => diff$1(oldValue, newValue),
  combine: (first2, second) => andThen(second)(first2),
  patch: (_patch, oldValue) => patch$2(oldValue, _patch)
});
const empty$4 = empty$5;
const enable = enable$2;
const disable = disable$1;
const exclude = exclude$1;
var _b$7, _c$3;
const par = (self, that) => ({
  _tag: "Par",
  left: self,
  right: that
});
const seq = (self, that) => ({
  _tag: "Seq",
  left: self,
  right: that
});
const flatten = (self) => {
  let current = of(self);
  let updated = empty$6();
  while (1) {
    const [parallel2, sequential2] = reduce$1(current, [parallelCollectionEmpty(), empty$6()], ([parallel3, sequential3], blockedRequest) => {
      const [par2, seq2] = step$1(blockedRequest);
      return [parallelCollectionCombine(parallel3, par2), appendAll(sequential3, seq2)];
    });
    updated = merge(updated, parallel2);
    if (isNil(sequential2)) {
      return reverse(updated);
    }
    current = sequential2;
  }
  throw new Error("BUG: BlockedRequests.flatten - please report an issue at https://github.com/Effect-TS/query/issues");
};
const step$1 = (requests) => {
  let current = requests;
  let parallel2 = parallelCollectionEmpty();
  let stack = empty$6();
  let sequential2 = empty$6();
  while (1) {
    switch (current._tag) {
      case "Empty": {
        if (isNil(stack)) {
          return [parallel2, sequential2];
        }
        current = stack.head;
        stack = stack.tail;
        break;
      }
      case "Par": {
        stack = cons(current.right, stack);
        current = current.left;
        break;
      }
      case "Seq": {
        const left2 = current.left;
        const right2 = current.right;
        switch (left2._tag) {
          case "Empty": {
            current = right2;
            break;
          }
          case "Par": {
            const l = left2.left;
            const r = left2.right;
            current = par(seq(l, right2), seq(r, right2));
            break;
          }
          case "Seq": {
            const l = left2.left;
            const r = left2.right;
            current = seq(l, seq(r, right2));
            break;
          }
          case "Single": {
            current = left2;
            sequential2 = cons(right2, sequential2);
            break;
          }
        }
        break;
      }
      case "Single": {
        parallel2 = parallelCollectionCombine(parallel2, parallelCollectionMake(current.dataSource, current.blockedRequest));
        if (isNil(stack)) {
          return [parallel2, sequential2];
        }
        current = stack.head;
        stack = stack.tail;
        break;
      }
    }
  }
  throw new Error("BUG: BlockedRequests.step - please report an issue at https://github.com/Effect-TS/query/issues");
};
const merge = (sequential2, parallel2) => {
  if (isNil(sequential2)) {
    return of(parallelCollectionToSequentialCollection(parallel2));
  }
  if (parallelCollectionIsEmpty(parallel2)) {
    return sequential2;
  }
  const seqHeadKeys = sequentialCollectionKeys(sequential2.head);
  const parKeys = parallelCollectionKeys(parallel2);
  if (seqHeadKeys.length === 1 && parKeys.length === 1 && equals$1(seqHeadKeys[0], parKeys[0])) {
    return cons(sequentialCollectionCombine(sequential2.head, parallelCollectionToSequentialCollection(parallel2)), sequential2.tail);
  }
  return cons(parallelCollectionToSequentialCollection(parallel2), sequential2);
};
const RequestBlockParallelTypeId = /* @__PURE__ */ Symbol.for("@effect/io/RequestBlockParallel");
const parallelVariance = {
  _R: (_) => _
};
class ParallelImpl {
  constructor(map2) {
    this.map = map2;
    this[_b$7] = parallelVariance;
  }
}
_b$7 = RequestBlockParallelTypeId;
const parallelCollectionEmpty = () => new ParallelImpl(empty$a());
const parallelCollectionMake = (dataSource, blockedRequest) => new ParallelImpl(make$e([dataSource, Array.of(blockedRequest)]));
const parallelCollectionCombine = (self, that) => new ParallelImpl(reduce$3(self.map, that.map, (map2, value, key) => set$2(map2, key, match$2(get$3(map2, key), {
  onNone: () => value,
  onSome: (a) => [...a, ...value]
}))));
const parallelCollectionIsEmpty = (self) => isEmpty$1(self.map);
const parallelCollectionKeys = (self) => Array.from(keys(self.map));
const parallelCollectionToSequentialCollection = (self) => sequentialCollectionMake(map$1(self.map, (x) => Array.of(x)));
const SequentialCollectionTypeId = /* @__PURE__ */ Symbol.for("@effect/io/RequestBlockSequential");
const sequentialVariance = {
  _R: (_) => _
};
class SequentialImpl {
  constructor(map2) {
    this.map = map2;
    this[_c$3] = sequentialVariance;
  }
}
_c$3 = SequentialCollectionTypeId;
const sequentialCollectionMake = (map2) => new SequentialImpl(map2);
const sequentialCollectionCombine = (self, that) => new SequentialImpl(reduce$3(that.map, self.map, (map2, value, key) => set$2(map2, key, match$2(get$3(map2, key), {
  onNone: () => [],
  onSome: (a) => [...a, ...value]
}))));
const sequentialCollectionKeys = (self) => Array.from(keys(self.map));
const sequentialCollectionToChunk = (self) => Array.from(self.map);
const OP_DIE = "Die";
const OP_EMPTY$1 = "Empty";
const OP_FAIL$1 = "Fail";
const OP_INTERRUPT = "Interrupt";
const OP_ANNOTATED = "Annotated";
const OP_PARALLEL = "Parallel";
const OP_SEQUENTIAL = "Sequential";
const CauseSymbolKey = "@effect/io/Cause";
const CauseTypeId = /* @__PURE__ */ Symbol.for(CauseSymbolKey);
const variance = {
  _E: (_) => _
};
const proto$1 = {
  [CauseTypeId]: variance,
  [symbol$1]() {
    return combine$6(hash(flattenCause(this)))(hash(CauseSymbolKey));
  },
  [symbol](that) {
    return isCause(that) && causeEquals(this, that);
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const empty$3 = /* @__PURE__ */ (() => {
  const o = /* @__PURE__ */ Object.create(proto$1);
  o._tag = OP_EMPTY$1;
  return o;
})();
const fail$1 = (error) => {
  const o = Object.create(proto$1);
  o._tag = OP_FAIL$1;
  o.error = error;
  return o;
};
const die = (defect) => {
  const o = Object.create(proto$1);
  o._tag = OP_DIE;
  o.defect = defect;
  return o;
};
const interrupt = (fiberId2) => {
  const o = Object.create(proto$1);
  o._tag = OP_INTERRUPT;
  o.fiberId = fiberId2;
  return o;
};
const annotated = (cause, annotation) => {
  const o = Object.create(proto$1);
  o._tag = OP_ANNOTATED;
  o.cause = cause;
  o.annotation = annotation;
  return o;
};
const parallel = (left2, right2) => {
  const o = Object.create(proto$1);
  o._tag = OP_PARALLEL;
  o.left = left2;
  o.right = right2;
  return o;
};
const sequential = (left2, right2) => {
  const o = Object.create(proto$1);
  o._tag = OP_SEQUENTIAL;
  o.left = left2;
  o.right = right2;
  return o;
};
const isCause = (u) => typeof u === "object" && u != null && CauseTypeId in u;
const isEmptyType = (self) => self._tag === OP_EMPTY$1;
const isEmpty = (self) => {
  if (self._tag === OP_EMPTY$1) {
    return true;
  }
  return reduce(self, true, (acc, cause) => {
    switch (cause._tag) {
      case OP_EMPTY$1: {
        return some(acc);
      }
      case OP_DIE:
      case OP_FAIL$1:
      case OP_INTERRUPT: {
        return some(false);
      }
      default: {
        return none$4();
      }
    }
  });
};
const isInterruptedOnly = (self) => reduceWithContext(void 0, IsInterruptedOnlyCauseReducer)(self);
const failures = (self) => reverse$1(reduce(self, empty$f(), (list, cause) => cause._tag === OP_FAIL$1 ? some(prepend$1(cause.error)(list)) : none$4()));
const defects = (self) => reverse$1(reduce(self, empty$f(), (list, cause) => cause._tag === OP_DIE ? some(prepend$1(cause.defect)(list)) : none$4()));
const interruptors = (self) => reduce(self, empty$9(), (set2, cause) => cause._tag === OP_INTERRUPT ? some(add(cause.fiberId)(set2)) : none$4());
const failureOption = (self) => find(self, (cause) => cause._tag === OP_FAIL$1 ? some(cause.error) : none$4());
const failureOrCause = (self) => {
  const option = failureOption(self);
  switch (option._tag) {
    case "None": {
      return right(self);
    }
    case "Some": {
      return left(option.value);
    }
  }
};
const stripFailures = (self) => match(self, {
  onEmpty: empty$3,
  onFail: () => empty$3,
  onDie: (defect) => die(defect),
  onInterrupt: (fiberId2) => interrupt(fiberId2),
  onAnnotated: (cause, annotation) => isEmptyType(cause) ? cause : annotated(cause, annotation),
  onSequential: sequential,
  onParallel: parallel
});
const electFailures = (self) => match(self, {
  onEmpty: empty$3,
  onFail: (failure) => die(failure),
  onDie: (defect) => die(defect),
  onInterrupt: (fiberId2) => interrupt(fiberId2),
  onAnnotated: (cause, annotation) => isEmptyType(cause) ? cause : annotated(cause, annotation),
  onSequential: (left2, right2) => sequential(left2, right2),
  onParallel: (left2, right2) => parallel(left2, right2)
});
const causeEquals = (left2, right2) => {
  let leftStack = of$1(left2);
  let rightStack = of$1(right2);
  while (isNonEmpty(leftStack) && isNonEmpty(rightStack)) {
    const [leftParallel, leftSequential] = reduce([empty$9(), empty$f()], ([parallel2, sequential2], cause) => {
      const [par2, seq2] = evaluateCause(cause);
      return some([union(par2)(parallel2), appendAll$1(seq2)(sequential2)]);
    })(headNonEmpty(leftStack));
    const [rightParallel, rightSequential] = reduce([empty$9(), empty$f()], ([parallel2, sequential2], cause) => {
      const [par2, seq2] = evaluateCause(cause);
      return some([union(par2)(parallel2), appendAll$1(seq2)(sequential2)]);
    })(headNonEmpty(rightStack));
    if (!equals$1(leftParallel, rightParallel)) {
      return false;
    }
    leftStack = leftSequential;
    rightStack = rightSequential;
  }
  return true;
};
const flattenCause = (cause) => {
  return flattenCauseLoop(of$1(cause), empty$f());
};
const flattenCauseLoop = (causes, flattened) => {
  while (1) {
    const [parallel2, sequential2] = reduce$6([empty$9(), empty$f()], ([parallel3, sequential3], cause) => {
      const [par2, seq2] = evaluateCause(cause);
      return [union(par2)(parallel3), appendAll$1(seq2)(sequential3)];
    })(causes);
    const updated = size(parallel2) > 0 ? prepend$1(parallel2)(flattened) : flattened;
    if (isEmpty$3(sequential2)) {
      return reverse$1(updated);
    }
    causes = sequential2;
    flattened = updated;
  }
  throw new Error("BUG: Cause.flattenCauseLoop - please report an issue at https://github.com/Effect-TS/io/issues");
};
const find = /* @__PURE__ */ dual(2, (self, pf) => {
  const stack = [self];
  while (stack.length > 0) {
    const item = stack.pop();
    const option = pf(item);
    switch (option._tag) {
      case "None": {
        switch (item._tag) {
          case OP_SEQUENTIAL:
          case OP_PARALLEL: {
            stack.push(item.right);
            stack.push(item.left);
            break;
          }
          case OP_ANNOTATED: {
            stack.push(item.cause);
            break;
          }
        }
        break;
      }
      case "Some": {
        return option;
      }
    }
  }
  return none$4();
});
const evaluateCause = (self) => {
  let cause = self;
  const stack = [];
  let _parallel = empty$9();
  let _sequential = empty$f();
  while (cause !== void 0) {
    switch (cause._tag) {
      case OP_EMPTY$1: {
        if (stack.length === 0) {
          return [_parallel, _sequential];
        }
        cause = stack.pop();
        break;
      }
      case OP_FAIL$1: {
        if (stack.length === 0) {
          return [add(cause.error)(_parallel), _sequential];
        }
        _parallel = add(cause.error)(_parallel);
        cause = stack.pop();
        break;
      }
      case OP_DIE: {
        if (stack.length === 0) {
          return [add(cause.defect)(_parallel), _sequential];
        }
        _parallel = add(cause.defect)(_parallel);
        cause = stack.pop();
        break;
      }
      case OP_INTERRUPT: {
        if (stack.length === 0) {
          return [add(cause.fiberId)(_parallel), _sequential];
        }
        _parallel = add(cause.fiberId)(_parallel);
        cause = stack.pop();
        break;
      }
      case OP_ANNOTATED: {
        cause = cause.cause;
        break;
      }
      case OP_SEQUENTIAL: {
        switch (cause.left._tag) {
          case OP_EMPTY$1: {
            cause = cause.right;
            break;
          }
          case OP_SEQUENTIAL: {
            cause = sequential(cause.left.left, sequential(cause.left.right, cause.right));
            break;
          }
          case OP_PARALLEL: {
            cause = parallel(sequential(cause.left.left, cause.right), sequential(cause.left.right, cause.right));
            break;
          }
          case OP_ANNOTATED: {
            cause = sequential(cause.left.cause, cause.right);
            break;
          }
          default: {
            _sequential = prepend$1(cause.right)(_sequential);
            cause = cause.left;
            break;
          }
        }
        break;
      }
      case OP_PARALLEL: {
        stack.push(cause.right);
        cause = cause.left;
        break;
      }
    }
  }
  throw new Error("BUG: Cause.evaluateCauseLoop - please report an issue at https://github.com/Effect-TS/io/issues");
};
const IsInterruptedOnlyCauseReducer = {
  emptyCase: constTrue,
  failCase: constFalse,
  dieCase: constFalse,
  interruptCase: constTrue,
  annotatedCase: (_, value) => value,
  sequentialCase: (_, left2, right2) => left2 && right2,
  parallelCase: (_, left2, right2) => left2 && right2
};
const OP_SEQUENTIAL_CASE = "SequentialCase";
const OP_PARALLEL_CASE = "ParallelCase";
const OP_ANNOTATED_CASE = "AnnotatedCase";
const match = /* @__PURE__ */ dual(2, (self, {
  onAnnotated,
  onDie,
  onEmpty,
  onFail,
  onInterrupt: onInterrupt2,
  onParallel,
  onSequential
}) => {
  return reduceWithContext(self, void 0, {
    emptyCase: () => onEmpty,
    failCase: (_, error) => onFail(error),
    dieCase: (_, defect) => onDie(defect),
    interruptCase: (_, fiberId2) => onInterrupt2(fiberId2),
    annotatedCase: (_, value, annotation) => onAnnotated(value, annotation),
    sequentialCase: (_, left2, right2) => onSequential(left2, right2),
    parallelCase: (_, left2, right2) => onParallel(left2, right2)
  });
});
const reduce = /* @__PURE__ */ dual(3, (self, zero2, pf) => {
  let accumulator = zero2;
  let cause = self;
  const causes = [];
  while (cause !== void 0) {
    const option = pf(accumulator, cause);
    accumulator = isSome(option) ? option.value : accumulator;
    switch (cause._tag) {
      case OP_SEQUENTIAL: {
        causes.push(cause.right);
        cause = cause.left;
        break;
      }
      case OP_PARALLEL: {
        causes.push(cause.right);
        cause = cause.left;
        break;
      }
      case OP_ANNOTATED: {
        cause = cause.cause;
        break;
      }
      default: {
        cause = void 0;
        break;
      }
    }
    if (cause === void 0 && causes.length > 0) {
      cause = causes.pop();
    }
  }
  return accumulator;
});
const reduceWithContext = /* @__PURE__ */ dual(3, (self, context, reducer) => {
  const input = [self];
  const output = [];
  while (input.length > 0) {
    const cause = input.pop();
    switch (cause._tag) {
      case OP_EMPTY$1: {
        output.push(right(reducer.emptyCase(context)));
        break;
      }
      case OP_FAIL$1: {
        output.push(right(reducer.failCase(context, cause.error)));
        break;
      }
      case OP_DIE: {
        output.push(right(reducer.dieCase(context, cause.defect)));
        break;
      }
      case OP_INTERRUPT: {
        output.push(right(reducer.interruptCase(context, cause.fiberId)));
        break;
      }
      case OP_ANNOTATED: {
        input.push(cause.cause);
        output.push(left({
          _tag: OP_ANNOTATED_CASE,
          annotation: cause.annotation
        }));
        break;
      }
      case OP_SEQUENTIAL: {
        input.push(cause.right);
        input.push(cause.left);
        output.push(left({
          _tag: OP_SEQUENTIAL_CASE
        }));
        break;
      }
      case OP_PARALLEL: {
        input.push(cause.right);
        input.push(cause.left);
        output.push(left({
          _tag: OP_PARALLEL_CASE
        }));
        break;
      }
    }
  }
  const accumulator = [];
  while (output.length > 0) {
    const either2 = output.pop();
    switch (either2._tag) {
      case "Left": {
        switch (either2.left._tag) {
          case OP_SEQUENTIAL_CASE: {
            const left2 = accumulator.pop();
            const right2 = accumulator.pop();
            const value = reducer.sequentialCase(context, left2, right2);
            accumulator.push(value);
            break;
          }
          case OP_PARALLEL_CASE: {
            const left2 = accumulator.pop();
            const right2 = accumulator.pop();
            const value = reducer.parallelCase(context, left2, right2);
            accumulator.push(value);
            break;
          }
          case OP_ANNOTATED_CASE: {
            const cause = accumulator.pop();
            const value = reducer.annotatedCase(context, cause, either2.left.annotation);
            accumulator.push(value);
            break;
          }
        }
        break;
      }
      case "Right": {
        accumulator.push(either2.right);
        break;
      }
    }
  }
  if (accumulator.length === 0) {
    throw new Error("BUG: Cause.reduceWithContext - please report an issue at https://github.com/Effect-TS/io/issues");
  }
  return accumulator.pop();
});
const makeException = (proto2, tag) => {
  const _tag = {
    value: tag,
    enumerable: true
  };
  const protoWithToString = {
    ...proto2,
    toString() {
      return `${this._tag}: ${this.message}`;
    }
  };
  return (message) => Object.create(protoWithToString, {
    _tag,
    message: {
      value: message,
      enumerable: true
    }
  });
};
const InterruptedExceptionTypeId = /* @__PURE__ */ Symbol.for("@effect/io/Cause/errors/InterruptedException");
const isInterruptedException = (u) => {
  return typeof u === "object" && u != null && InterruptedExceptionTypeId in u;
};
const NoSuchElementExceptionTypeId = /* @__PURE__ */ Symbol.for("@effect/io/Cause/errors/NoSuchElement");
const NoSuchElementException = /* @__PURE__ */ makeException({
  [NoSuchElementExceptionTypeId]: NoSuchElementExceptionTypeId
}, "NoSuchElementException");
const OP_STATE_PENDING = "Pending";
const OP_STATE_DONE = "Done";
const DeferredSymbolKey = "@effect/io/Deferred";
const DeferredTypeId = /* @__PURE__ */ Symbol.for(DeferredSymbolKey);
const deferredVariance = {
  _E: (_) => _,
  _A: (_) => _
};
const pending = (joiners) => {
  return {
    _tag: OP_STATE_PENDING,
    joiners
  };
};
const done$2 = (effect) => {
  return {
    _tag: OP_STATE_DONE,
    effect
  };
};
const OP_ASYNC = "Async";
const OP_COMMIT = "Commit";
const OP_FAILURE = "Failure";
const OP_ON_FAILURE = "OnFailure";
const OP_ON_SUCCESS = "OnSuccess";
const OP_ON_SUCCESS_AND_FAILURE = "OnSuccessAndFailure";
const OP_SUCCESS = "Success";
const OP_SYNC = "Sync";
const OP_TAG = "Tag";
const OP_UPDATE_RUNTIME_FLAGS = "UpdateRuntimeFlags";
const OP_WHILE = "While";
const OP_WITH_RUNTIME = "WithRuntime";
const OP_YIELD = "Yield";
const OP_REVERT_FLAGS = "RevertFlags";
class PriorityBuckets {
  constructor() {
    this.buckets = [];
  }
  /**
   * @since 1.0.0
   */
  scheduleTask(task, priority) {
    let bucket = void 0;
    let index2;
    for (index2 = 0; index2 < this.buckets.length; index2++) {
      if (this.buckets[index2][0] <= priority) {
        bucket = this.buckets[index2];
      } else {
        break;
      }
    }
    if (bucket) {
      bucket[1].push(task);
    } else {
      const newBuckets = [];
      for (let i = 0; i < index2; i++) {
        newBuckets.push(this.buckets[i]);
      }
      newBuckets.push([priority, [task]]);
      for (let i = index2; i < this.buckets.length; i++) {
        newBuckets.push(this.buckets[i]);
      }
      this.buckets = newBuckets;
    }
  }
}
class MixedScheduler {
  constructor(maxNextTickBeforeTimer) {
    this.maxNextTickBeforeTimer = maxNextTickBeforeTimer;
    this.running = false;
    this.tasks = new PriorityBuckets();
  }
  /**
   * @since 1.0.0
   */
  starveInternal(depth) {
    const tasks = this.tasks.buckets;
    this.tasks.buckets = [];
    for (const [_, toRun] of tasks) {
      for (let i = 0; i < toRun.length; i++) {
        toRun[i]();
      }
    }
    if (this.tasks.buckets.length === 0) {
      this.running = false;
    } else {
      this.starve(depth);
    }
  }
  /**
   * @since 1.0.0
   */
  starve(depth = 0) {
    if (depth >= this.maxNextTickBeforeTimer) {
      setTimeout(() => this.starveInternal(0), 0);
    } else {
      Promise.resolve(void 0).then(() => this.starveInternal(depth + 1));
    }
  }
  /**
   * @since 1.0.0
   */
  scheduleTask(task, priority) {
    this.tasks.scheduleTask(task, priority);
    if (!this.running) {
      this.running = true;
      this.starve();
    }
  }
}
const defaultScheduler = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/io/Scheduler/defaultScheduler"), () => new MixedScheduler(2048));
var _a$c, _b$6, _c$2;
const EffectErrorSymbolKey = "@effect/io/Effect/Error";
const EffectErrorTypeId = /* @__PURE__ */ Symbol.for(EffectErrorSymbolKey);
const isEffectError = (u) => typeof u === "object" && u != null && EffectErrorTypeId in u;
const makeEffectError = (cause) => ({
  [EffectErrorTypeId]: EffectErrorTypeId,
  _tag: "EffectError",
  cause
});
const blocked = (blockedRequests, _continue) => {
  const effect = new EffectPrimitive("Blocked");
  effect.i0 = blockedRequests;
  effect.i1 = _continue;
  return effect;
};
const runRequestBlock = (blockedRequests) => {
  const effect = new EffectPrimitive("RunBlocked");
  effect.i0 = blockedRequests;
  return effect;
};
const EffectTypeId = /* @__PURE__ */ Symbol.for("@effect/io/Effect");
class RevertFlags {
  constructor(patch2, op) {
    this.patch = patch2;
    this.op = op;
    this._tag = OP_REVERT_FLAGS;
  }
}
class EffectPrimitive {
  constructor(_tag) {
    this._tag = _tag;
    this.i0 = void 0;
    this.i1 = void 0;
    this.i2 = void 0;
    this.trace = void 0;
    this[_a$c] = effectVariance;
  }
  [(_a$c = EffectTypeId, symbol)](that) {
    return this === that;
  }
  [symbol$1]() {
    return random(this);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
class EffectPrimitiveFailure {
  constructor(_tag) {
    this._tag = _tag;
    this.i0 = void 0;
    this.i1 = void 0;
    this.i2 = void 0;
    this.trace = void 0;
    this[_b$6] = effectVariance;
  }
  [(_b$6 = EffectTypeId, symbol)](that) {
    return this === that;
  }
  [symbol$1]() {
    return random(this);
  }
  get cause() {
    return this.i0;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
class EffectPrimitiveSuccess {
  constructor(_tag) {
    this._tag = _tag;
    this.i0 = void 0;
    this.i1 = void 0;
    this.i2 = void 0;
    this.trace = void 0;
    this[_c$2] = effectVariance;
  }
  [(_c$2 = EffectTypeId, symbol)](that) {
    return this === that;
  }
  [symbol$1]() {
    return random(this);
  }
  get value() {
    return this.i0;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const effectVariance = {
  _R: (_) => _,
  _E: (_) => _,
  _A: (_) => _
};
const isEffect = (u) => typeof u === "object" && u != null && EffectTypeId in u;
const withFiberRuntime = (withRuntime) => {
  const effect = new EffectPrimitive(OP_WITH_RUNTIME);
  effect.i0 = withRuntime;
  return effect;
};
const acquireUseRelease = /* @__PURE__ */ dual(3, (acquire, use, release) => uninterruptibleMask((restore) => flatMap$1(acquire, (a) => flatMap$1(exit$1(suspend(() => restore(use(a)))), (exit2) => suspend(() => release(a, exit2)).pipe(matchCauseEffect({
  onFailure: (cause) => {
    switch (exit2._tag) {
      case OP_FAILURE: {
        return failCause(parallel(exit2.i0, cause));
      }
      case OP_SUCCESS: {
        return failCause(cause);
      }
    }
  },
  onSuccess: () => exit2
}))))));
const as = /* @__PURE__ */ dual(2, (self, value) => flatMap$1(self, () => succeed(value)));
const asUnit = (self) => as(self, void 0);
const async = (register, blockingOn = none$2) => {
  const effect = new EffectPrimitive(OP_ASYNC);
  effect.i0 = register;
  effect.i1 = blockingOn;
  return effect;
};
const asyncInterruptEither = (register, blockingOn = none$2) => suspend(() => {
  let cancelerRef = unit;
  return async((resume2) => {
    const result = register(resume2);
    if (isRight(result)) {
      resume2(result.right);
    } else {
      cancelerRef = result.left;
    }
  }, blockingOn).pipe(onInterrupt(() => cancelerRef));
});
const asyncInterrupt = (register, blockingOn = none$2) => suspend(() => {
  let cancelerRef = unit;
  return async((resume2) => {
    cancelerRef = register(resume2);
  }, blockingOn).pipe(onInterrupt(() => cancelerRef));
});
const catchAllCause = /* @__PURE__ */ dual(2, (self, f) => {
  const effect = new EffectPrimitive(OP_ON_FAILURE);
  effect.i0 = self;
  effect.i1 = f;
  return effect;
});
const catchAll = /* @__PURE__ */ dual(2, (self, f) => matchEffect(self, {
  onFailure: f,
  onSuccess: succeed
}));
const either = (self) => matchEffect(self, {
  onFailure: (e) => succeed(left(e)),
  onSuccess: (a) => succeed(right(a))
});
const exit$1 = (self) => matchCause(self, {
  onFailure: exitFailCause,
  onSuccess: exitSucceed
});
const fail = (error) => failCause(fail$1(error));
const failSync = (evaluate) => failCauseSync(() => fail$1(evaluate()));
const failCause = (cause) => {
  const effect = new EffectPrimitiveFailure(OP_FAILURE);
  effect.i0 = cause;
  return effect;
};
const failCauseSync = (evaluate) => flatMap$1(sync(evaluate), failCause);
const fiberId = /* @__PURE__ */ withFiberRuntime((state) => succeed(state.id()));
const fiberIdWith = (f) => withFiberRuntime((state) => f(state.id()));
const flatMap$1 = /* @__PURE__ */ dual(2, (self, f) => {
  const effect = new EffectPrimitive(OP_ON_SUCCESS);
  effect.i0 = self;
  effect.i1 = f;
  return effect;
});
const step = (self) => {
  const effect = new EffectPrimitive("OnStep");
  effect.i0 = self;
  effect.i1 = exitSucceed;
  return effect;
};
const flatMapStep = (self, f) => {
  const effect = new EffectPrimitive("OnStep");
  effect.i0 = self;
  effect.i1 = f;
  return effect;
};
const matchCause = /* @__PURE__ */ dual(2, (self, {
  onFailure,
  onSuccess
}) => matchCauseEffect(self, {
  onFailure: (cause) => succeed(onFailure(cause)),
  onSuccess: (a) => succeed(onSuccess(a))
}));
const matchCauseEffect = /* @__PURE__ */ dual(2, (self, {
  onFailure,
  onSuccess
}) => {
  const effect = new EffectPrimitive(OP_ON_SUCCESS_AND_FAILURE);
  effect.i0 = self;
  effect.i1 = onFailure;
  effect.i2 = onSuccess;
  return effect;
});
const matchEffect = /* @__PURE__ */ dual(2, (self, {
  onFailure,
  onSuccess
}) => matchCauseEffect(self, {
  onFailure: (cause) => {
    const failures$1 = failures(cause);
    const defects$1 = defects(cause);
    if (defects$1.length > 0) {
      return failCause(electFailures(cause));
    }
    if (failures$1.length > 0) {
      return onFailure(unsafeHead(failures$1));
    }
    return failCause(cause);
  },
  onSuccess
}));
const forEachSequential = /* @__PURE__ */ dual(2, (self, f) => suspend(() => {
  const arr = fromIterable$5(self);
  const ret = new Array(arr.length);
  let i = 0;
  return as(whileLoop({
    while: () => i < arr.length,
    body: () => f(arr[i], i),
    step: (b) => {
      ret[i++] = b;
    }
  }), ret);
}));
const forEachSequentialDiscard = /* @__PURE__ */ dual(2, (self, f) => suspend(() => {
  const arr = fromIterable$5(self);
  let i = 0;
  return whileLoop({
    while: () => i < arr.length,
    body: () => f(arr[i], i),
    step: () => {
      i++;
    }
  });
}));
const interruptible = (self) => {
  const effect = new EffectPrimitive(OP_UPDATE_RUNTIME_FLAGS);
  effect.i0 = enable(Interruption);
  const _continue = (orBlock) => {
    if (orBlock._tag === "Blocked") {
      return blocked(orBlock.i0, interruptible(orBlock.i1));
    } else {
      return orBlock;
    }
  };
  effect.i1 = () => flatMapStep(self, _continue);
  return effect;
};
const map = /* @__PURE__ */ dual(2, (self, f) => flatMap$1(self, (a) => sync(() => f(a))));
const mapBoth = /* @__PURE__ */ dual(2, (self, {
  onFailure,
  onSuccess
}) => matchEffect(self, {
  onFailure: (e) => failSync(() => onFailure(e)),
  onSuccess: (a) => sync(() => onSuccess(a))
}));
const mapError = /* @__PURE__ */ dual(2, (self, f) => matchCauseEffect(self, {
  onFailure: (cause) => {
    const either2 = failureOrCause(cause);
    switch (either2._tag) {
      case "Left": {
        return failSync(() => f(either2.left));
      }
      case "Right": {
        return failCause(either2.right);
      }
    }
  },
  onSuccess: succeed
}));
const onExit = /* @__PURE__ */ dual(2, (self, cleanup) => uninterruptibleMask((restore) => matchCauseEffect(restore(self), {
  onFailure: (cause1) => {
    const result = exitFailCause(cause1);
    return matchCauseEffect(cleanup(result), {
      onFailure: (cause2) => exitFailCause(sequential(cause1, cause2)),
      onSuccess: () => result
    });
  },
  onSuccess: (success) => {
    const result = exitSucceed(success);
    return zipRight(cleanup(result), result);
  }
})));
const onInterrupt = /* @__PURE__ */ dual(2, (self, cleanup) => onExit(self, exitMatch({
  onFailure: (cause) => isInterruptedOnly(cause) ? asUnit(cleanup(interruptors(cause))) : unit,
  onSuccess: () => unit
})));
const succeed = (value) => {
  const effect = new EffectPrimitiveSuccess(OP_SUCCESS);
  effect.i0 = value;
  return effect;
};
const suspend = (effect) => flatMap$1(sync(effect), identity);
const sync = (evaluate) => {
  const effect = new EffectPrimitive(OP_SYNC);
  effect.i0 = evaluate;
  return effect;
};
const tap = /* @__PURE__ */ dual(2, (self, f) => flatMap$1(self, (a) => as(f(a), a)));
const transplant = (f) => withFiberRuntime((state) => {
  const scopeOverride = state.getFiberRef(currentForkScopeOverride);
  const scope = getOrElse(() => state.scope())(scopeOverride);
  return f(fiberRefLocally(currentForkScopeOverride, some(scope)));
});
const uninterruptible = (self) => {
  const effect = new EffectPrimitive(OP_UPDATE_RUNTIME_FLAGS);
  effect.i0 = disable(Interruption);
  effect.i1 = () => flatMapStep(self, _continue);
  const _continue = (orBlock) => {
    if (orBlock._tag === "Blocked") {
      return blocked(orBlock.i0, uninterruptible(orBlock.i1));
    } else {
      return orBlock;
    }
  };
  return effect;
};
const uninterruptibleMask = (f) => {
  const effect = new EffectPrimitive(OP_UPDATE_RUNTIME_FLAGS);
  effect.i0 = disable(Interruption);
  const _continue = (step2) => {
    if (step2._tag === "Blocked") {
      return blocked(step2.i0, uninterruptible(step2.i1));
    }
    return step2;
  };
  effect.i1 = (oldFlags) => interruption(oldFlags) ? step(f(interruptible)) : step(f(uninterruptible));
  return flatMap$1(effect, _continue);
};
const unit = /* @__PURE__ */ succeed(void 0);
const updateRuntimeFlags = (patch2) => {
  const effect = new EffectPrimitive(OP_UPDATE_RUNTIME_FLAGS);
  effect.i0 = patch2;
  effect.i1 = void 0;
  return effect;
};
const whileLoop = (options2) => {
  const effect = new EffectPrimitive(OP_WHILE);
  effect.i0 = options2.while;
  effect.i1 = options2.body;
  effect.i2 = options2.step;
  return effect;
};
const yieldNow$1 = (options2) => {
  const effect = new EffectPrimitive(OP_YIELD);
  return typeof options2?.priority !== "undefined" ? withSchedulingPriority(options2.priority)(effect) : effect;
};
const zip = /* @__PURE__ */ dual(2, (self, that) => flatMap$1(self, (a) => map(that, (b) => [a, b])));
const zipLeft = /* @__PURE__ */ dual(2, (self, that) => flatMap$1(self, (a) => as(that, a)));
const zipRight = /* @__PURE__ */ dual(2, (self, that) => flatMap$1(self, () => that));
const interruptFiber = (self) => flatMap$1(fiberId, (fiberId2) => interruptAsFiber(fiberId2)(self));
const interruptAsFiber = /* @__PURE__ */ dual(2, (self, fiberId2) => flatMap$1(self.interruptAsFork(fiberId2), () => self.await()));
const logLevelAll = {
  _tag: "All",
  syslog: 0,
  label: "ALL",
  ordinal: Number.MIN_SAFE_INTEGER,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const logLevelFatal = {
  _tag: "Fatal",
  syslog: 2,
  label: "FATAL",
  ordinal: 5e4,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const logLevelError = {
  _tag: "Error",
  syslog: 3,
  label: "ERROR",
  ordinal: 4e4,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const logLevelWarning = {
  _tag: "Warning",
  syslog: 4,
  label: "WARN",
  ordinal: 3e4,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const logLevelInfo = {
  _tag: "Info",
  syslog: 6,
  label: "INFO",
  ordinal: 2e4,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const logLevelDebug = {
  _tag: "Debug",
  syslog: 7,
  label: "DEBUG",
  ordinal: 1e4,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const logLevelTrace = {
  _tag: "Trace",
  syslog: 7,
  label: "TRACE",
  ordinal: 0,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const logLevelNone = {
  _tag: "None",
  syslog: 7,
  label: "OFF",
  ordinal: Number.MAX_SAFE_INTEGER,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const FiberRefSymbolKey = "@effect/io/FiberRef";
const FiberRefTypeId = /* @__PURE__ */ Symbol.for(FiberRefSymbolKey);
const fiberRefVariance = {
  _A: (_) => _
};
const fiberRefGet = (self) => fiberRefModify(self, (a) => [a, a]);
const fiberRefGetWith = /* @__PURE__ */ dual(2, (self, f) => flatMap$1(fiberRefGet(self), f));
const fiberRefSet = /* @__PURE__ */ dual(2, (self, value) => fiberRefModify(self, () => [void 0, value]));
const fiberRefModify = /* @__PURE__ */ dual(2, (self, f) => withFiberRuntime((state) => {
  const [b, a] = f(state.getFiberRef(self));
  state.setFiberRef(self, a);
  return succeed(b);
}));
const fiberRefLocally = /* @__PURE__ */ dual(3, (use, self, value) => flatMap$1(acquireUseRelease(zipLeft(fiberRefGet(self), fiberRefSet(self, value)), () => step(use), (oldValue) => fiberRefSet(self, oldValue)), (res) => {
  if (res._tag === "Blocked") {
    return blocked(res.i0, fiberRefLocally(res.i1, self, value));
  }
  return res;
}));
const fiberRefUnsafeMake = (initial, options2) => fiberRefUnsafeMakePatch(initial, {
  differ: update$1(),
  fork: options2?.fork ?? identity,
  join: options2?.join
});
const fiberRefUnsafeMakeHashSet = (initial) => fiberRefUnsafeMakePatch(initial, {
  differ: hashSet(),
  fork: empty$7()
});
const fiberRefUnsafeMakeContext = (initial) => fiberRefUnsafeMakePatch(initial, {
  differ: environment(),
  fork: empty$d()
});
const fiberRefUnsafeMakePatch = (initial, options2) => ({
  [FiberRefTypeId]: fiberRefVariance,
  initial,
  diff: (oldValue, newValue) => diff$2(oldValue, newValue)(options2.differ),
  combine: (first2, second) => combine$1(first2, second)(options2.differ),
  patch: (patch2) => (oldValue) => patch$3(patch2, oldValue)(options2.differ),
  fork: options2.fork,
  join: options2.join ?? ((_, n) => n),
  pipe() {
    return pipeArguments(this, arguments);
  }
});
const fiberRefUnsafeMakeRuntimeFlags = (initial) => fiberRefUnsafeMakePatch(initial, {
  differ: differ$1,
  fork: empty$4
});
const currentContext = /* @__PURE__ */ fiberRefUnsafeMakeContext(/* @__PURE__ */ empty$h());
const currentSchedulingPriority = /* @__PURE__ */ fiberRefUnsafeMake(0);
const currentMaxFiberOps = /* @__PURE__ */ fiberRefUnsafeMake(2048);
const currentLogAnnotations = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/io/FiberRef/currentLogAnnotation"), () => fiberRefUnsafeMake(empty$a()));
const currentLogLevel = /* @__PURE__ */ fiberRefUnsafeMake(logLevelInfo);
const currentLogSpan = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/io/FiberRef/currentLogSpan"), () => fiberRefUnsafeMake(empty$6()));
const currentScheduler = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/io/FiberRef/currentScheduler"), () => fiberRefUnsafeMake(defaultScheduler));
const withSchedulingPriority = /* @__PURE__ */ dual(2, (self, scheduler) => fiberRefLocally(self, currentSchedulingPriority, scheduler));
const currentUnhandledErrorLogLevel = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/io/FiberRef/currentUnhandledErrorLogLevel"), () => fiberRefUnsafeMake(some(logLevelDebug)));
const currentMetricLabels = /* @__PURE__ */ fiberRefUnsafeMakeHashSet(/* @__PURE__ */ empty$9());
const currentForkScopeOverride = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/io/FiberRef/currentForkScopeOverride"), () => fiberRefUnsafeMake(none$4(), {
  fork: () => none$4(),
  join: (parent2, _) => parent2
}));
const currentInterruptedCause = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/io/FiberRef/currentInterruptedCause"), () => fiberRefUnsafeMake(empty$3, {
  fork: () => empty$3,
  join: (parent2, _) => parent2
}));
const currentTracerSpan = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/io/FiberRef/currentTracerSpan"), () => fiberRefUnsafeMake(empty$6()));
const exitIsFailure = (self) => self._tag === "Failure";
const exitCollectAll = (exits, options2) => exitCollectAllInternal(exits, options2?.parallel ? parallel : sequential);
const exitFail = (error) => exitFailCause(fail$1(error));
const exitFailCause = (cause) => {
  const effect = new EffectPrimitiveFailure(OP_FAILURE);
  effect.i0 = cause;
  return effect;
};
const exitInterrupt = (fiberId2) => exitFailCause(interrupt(fiberId2));
const exitMap = /* @__PURE__ */ dual(2, (self, f) => {
  switch (self._tag) {
    case OP_FAILURE: {
      return exitFailCause(self.i0);
    }
    case OP_SUCCESS: {
      return exitSucceed(f(self.i0));
    }
  }
});
const exitMatch = /* @__PURE__ */ dual(2, (self, {
  onFailure,
  onSuccess
}) => {
  switch (self._tag) {
    case OP_FAILURE: {
      return onFailure(self.i0);
    }
    case OP_SUCCESS: {
      return onSuccess(self.i0);
    }
  }
});
const exitSucceed = (value) => {
  const effect = new EffectPrimitiveSuccess(OP_SUCCESS);
  effect.i0 = value;
  return effect;
};
const exitUnit = /* @__PURE__ */ exitSucceed(void 0);
const exitZipWith = /* @__PURE__ */ dual(3, (self, that, {
  onFailure,
  onSuccess
}) => {
  switch (self._tag) {
    case OP_FAILURE: {
      switch (that._tag) {
        case OP_SUCCESS: {
          return exitFailCause(self.i0);
        }
        case OP_FAILURE: {
          return exitFailCause(onFailure(self.i0, that.i0));
        }
      }
    }
    case OP_SUCCESS: {
      switch (that._tag) {
        case OP_SUCCESS: {
          return exitSucceed(onSuccess(self.i0, that.i0));
        }
        case OP_FAILURE: {
          return exitFailCause(that.i0);
        }
      }
    }
  }
});
const exitCollectAllInternal = (exits, combineCauses) => {
  const list = fromIterable$4(exits);
  if (!isNonEmpty(list)) {
    return none$4();
  }
  return some(exitMap((chunk) => Array.from(chunk))(exitMap(reverse$1)(reduce$6(exitMap(of$1)(headNonEmpty(list)), (accumulator, current) => exitZipWith(current, {
    onSuccess: (list2, value) => prepend$1(value)(list2),
    onFailure: combineCauses
  })(accumulator))(tailNonEmpty(list)))));
};
const deferredUnsafeMake = (fiberId2) => ({
  [DeferredTypeId]: deferredVariance,
  state: make$a(pending([])),
  blockingOn: fiberId2,
  pipe() {
    return pipeArguments(this, arguments);
  }
});
const deferredAwait = (self) => asyncInterruptEither((k) => {
  const state = get$2(self.state);
  switch (state._tag) {
    case OP_STATE_DONE: {
      return right(state.effect);
    }
    case OP_STATE_PENDING: {
      set$1(pending([k, ...state.joiners]))(self.state);
      return left(deferredInterruptJoiner(self, k));
    }
  }
}, self.blockingOn);
const deferredCompleteWith = /* @__PURE__ */ dual(2, (self, effect) => sync(() => {
  const state = get$2(self.state);
  switch (state._tag) {
    case OP_STATE_DONE: {
      return false;
    }
    case OP_STATE_PENDING: {
      set$1(done$2(effect))(self.state);
      for (let i = 0; i < state.joiners.length; i++) {
        state.joiners[i](effect);
      }
      return true;
    }
  }
}));
const deferredFail = /* @__PURE__ */ dual(2, (self, error) => deferredCompleteWith(self, fail(error)));
const deferredSucceed = /* @__PURE__ */ dual(2, (self, value) => deferredCompleteWith(self, succeed(value)));
const deferredUnsafeDone = (self, effect) => {
  const state = get$2(self.state);
  if (state._tag === OP_STATE_PENDING) {
    set$1(done$2(effect))(self.state);
    for (let i = state.joiners.length - 1; i >= 0; i--) {
      state.joiners[i](effect);
    }
  }
};
const deferredInterruptJoiner = (self, joiner) => sync(() => {
  const state = get$2(self.state);
  if (state._tag === OP_STATE_PENDING) {
    set$1(pending(state.joiners.filter((j) => j !== joiner)))(self.state);
  }
});
var _a$b;
const ClockSymbolKey = "@effect/io/Clock";
const ClockTypeId = /* @__PURE__ */ Symbol.for(ClockSymbolKey);
const clockTag = /* @__PURE__ */ Tag(ClockTypeId);
const MAX_TIMER_MILLIS = 2 ** 31 - 1;
const globalClockScheduler = {
  unsafeSchedule(task, duration) {
    const millis2 = toMillis(duration);
    if (millis2 > MAX_TIMER_MILLIS) {
      return constFalse;
    }
    let completed = false;
    const handle = setTimeout(() => {
      completed = true;
      task();
    }, millis2);
    return () => {
      clearTimeout(handle);
      return !completed;
    };
  }
};
const performanceNowNanos = /* @__PURE__ */ function() {
  const bigint1e6 = /* @__PURE__ */ BigInt(1e6);
  if (typeof performance === "undefined") {
    return () => BigInt(Date.now()) * bigint1e6;
  }
  const origin = "timeOrigin" in performance && typeof performance.timeOrigin === "number" ? /* @__PURE__ */ BigInt(/* @__PURE__ */ Math.round(performance.timeOrigin * 1e6)) : /* @__PURE__ */ BigInt(/* @__PURE__ */ Date.now()) * bigint1e6;
  return () => origin + BigInt(Math.round(performance.now() * 1e6));
}();
const processOrPerformanceNow = /* @__PURE__ */ function() {
  const processHrtime = typeof process === "object" && "hrtime" in process && typeof process.hrtime.bigint === "function" ? process.hrtime : void 0;
  if (!processHrtime) {
    return performanceNowNanos;
  }
  const origin = /* @__PURE__ */ performanceNowNanos() - /* @__PURE__ */ processHrtime.bigint();
  return () => origin + processHrtime.bigint();
}();
class ClockImpl {
  constructor() {
    this[_a$b] = ClockTypeId;
    this.currentTimeMillis = sync(() => this.unsafeCurrentTimeMillis());
    this.currentTimeNanos = sync(() => this.unsafeCurrentTimeNanos());
  }
  unsafeCurrentTimeMillis() {
    return Date.now();
  }
  unsafeCurrentTimeNanos() {
    return processOrPerformanceNow();
  }
  scheduler() {
    return succeed(globalClockScheduler);
  }
  sleep(duration) {
    return asyncInterruptEither((cb) => {
      const canceler = globalClockScheduler.unsafeSchedule(() => cb(unit), duration);
      return left(asUnit(sync(canceler)));
    });
  }
}
_a$b = ClockTypeId;
const make$7 = () => new ClockImpl();
const OP_AND = "And";
const OP_OR = "Or";
const OP_INVALID_DATA = "InvalidData";
const OP_MISSING_DATA = "MissingData";
const OP_SOURCE_UNAVAILABLE = "SourceUnavailable";
const OP_UNSUPPORTED = "Unsupported";
const ConfigErrorSymbolKey = "@effect/io/Config/Error";
const ConfigErrorTypeId = /* @__PURE__ */ Symbol.for(ConfigErrorSymbolKey);
const proto = {
  [ConfigErrorTypeId]: ConfigErrorTypeId
};
const And = (self, that) => {
  const error = Object.create(proto);
  error._tag = OP_AND;
  error.left = self;
  error.right = that;
  Object.defineProperty(error, "toString", {
    enumerable: false,
    value() {
      return `${this.left} and ${this.right}`;
    }
  });
  return error;
};
const Or = (self, that) => {
  const error = Object.create(proto);
  error._tag = OP_OR;
  error.left = self;
  error.right = that;
  Object.defineProperty(error, "toString", {
    enumerable: false,
    value() {
      return `${this.left} or ${this.right}`;
    }
  });
  return error;
};
const InvalidData = (path, message) => {
  const error = Object.create(proto);
  error._tag = OP_INVALID_DATA;
  error.path = path;
  error.message = message;
  Object.defineProperty(error, "toString", {
    enumerable: false,
    value() {
      const path2 = join(".")(this.path);
      return `(Invalid data at ${path2}: "${this.message}")`;
    }
  });
  return error;
};
const MissingData = (path, message) => {
  const error = Object.create(proto);
  error._tag = OP_MISSING_DATA;
  error.path = path;
  error.message = message;
  Object.defineProperty(error, "toString", {
    enumerable: false,
    value() {
      const path2 = join(".")(this.path);
      return `(Missing data at ${path2}: "${this.message}")`;
    }
  });
  return error;
};
const SourceUnavailable = (path, message, cause) => {
  const error = Object.create(proto);
  error._tag = OP_SOURCE_UNAVAILABLE;
  error.path = path;
  error.message = message;
  error.cause = cause;
  Object.defineProperty(error, "toString", {
    enumerable: false,
    value() {
      const path2 = join(".")(this.path);
      return `(Source unavailable at ${path2}: "${this.message}")`;
    }
  });
  return error;
};
const Unsupported = (path, message) => {
  const error = Object.create(proto);
  error._tag = OP_UNSUPPORTED;
  error.path = path;
  error.message = message;
  Object.defineProperty(error, "toString", {
    enumerable: false,
    value() {
      const path2 = join(".")(this.path);
      return `(Unsupported operation at ${path2}: "${this.message}")`;
    }
  });
  return error;
};
const prefixed = /* @__PURE__ */ dual(2, (self, prefix) => {
  switch (self._tag) {
    case OP_AND: {
      return And(prefixed(prefix)(self.left), prefixed(prefix)(self.right));
    }
    case OP_OR: {
      return Or(prefixed(prefix)(self.left), prefixed(prefix)(self.right));
    }
    case OP_INVALID_DATA: {
      return InvalidData([...prefix, ...self.path], self.message);
    }
    case OP_MISSING_DATA: {
      return MissingData([...prefix, ...self.path], self.message);
    }
    case OP_SOURCE_UNAVAILABLE: {
      return SourceUnavailable([...prefix, ...self.path], self.message, self.cause);
    }
    case OP_UNSUPPORTED: {
      return Unsupported([...prefix, ...self.path], self.message);
    }
  }
});
const OP_CONSTANT = "Constant";
const OP_FAIL = "Fail";
const OP_FALLBACK = "Fallback";
const OP_DESCRIBED = "Described";
const OP_LAZY = "Lazy";
const OP_MAP_OR_FAIL = "MapOrFail";
const OP_NESTED = "Nested";
const OP_PRIMITIVE = "Primitive";
const OP_SEQUENCE = "Sequence";
const OP_TABLE = "Table";
const OP_ZIP_WITH = "ZipWith";
const missingError = (name) => {
  return (self) => {
    return MissingData([], `Expected ${self.description} with name ${name}`);
  };
};
const empty$2 = {
  _tag: "Empty"
};
const patch$1 = /* @__PURE__ */ dual(2, (path, patch2) => {
  let input = of(patch2);
  let output = path;
  while (isCons(input)) {
    const patch3 = input.head;
    switch (patch3._tag) {
      case "Empty": {
        input = input.tail;
        break;
      }
      case "AndThen": {
        input = cons(patch3.first, cons(patch3.second, input.tail));
        break;
      }
      case "MapName": {
        output = map$4(output, patch3.f);
        input = input.tail;
        break;
      }
      case "Nested": {
        output = prepend$2(output, patch3.name);
        input = input.tail;
        break;
      }
      case "Unnested": {
        const containsName = contains(patch3.name)(head$2(output));
        if (containsName) {
          output = tailNonEmpty$1(output);
          input = input.tail;
        } else {
          return left(MissingData(output, `Expected ${patch3.name} to be in path in ConfigProvider#unnested`));
        }
        break;
      }
    }
  }
  return right(output);
});
const concat = (l, r) => [...l, ...r];
const ConfigProviderSymbolKey = "@effect/io/Config/Provider";
const ConfigProviderTypeId = /* @__PURE__ */ Symbol.for(ConfigProviderSymbolKey);
const configProviderTag = /* @__PURE__ */ Tag(ConfigProviderTypeId);
const FlatConfigProviderSymbolKey = "@effect/io/Config/Provider/Flat";
const FlatConfigProviderTypeId = /* @__PURE__ */ Symbol.for(FlatConfigProviderSymbolKey);
const make$6 = (options2) => ({
  [ConfigProviderTypeId]: ConfigProviderTypeId,
  pipe() {
    return pipeArguments(this, arguments);
  },
  ...options2
});
const makeFlat = (options2) => ({
  [FlatConfigProviderTypeId]: FlatConfigProviderTypeId,
  patch: options2.patch,
  load: (path, config, split = true) => options2.load(path, config, split),
  enumerateChildren: options2.enumerateChildren
});
const fromFlat = (flat) => make$6({
  load: (config) => flatMap$1(fromFlatLoop(flat, empty$g(), config, false), (chunk) => match$2(head$2(chunk), {
    onNone: () => fail(MissingData(empty$g(), `Expected a single value having structure: ${config}`)),
    onSome: succeed
  })),
  flattened: flat
});
const fromEnv = (config = {}) => {
  const {
    pathDelim,
    seqDelim
  } = Object.assign({}, {
    pathDelim: "_",
    seqDelim: ","
  }, config);
  const makePathString = (path) => join(pathDelim)(path);
  const unmakePathString = (pathString) => pathString.split(pathDelim);
  const getEnv = () => typeof process !== "undefined" && "env" in process && typeof process.env === "object" ? process.env : {};
  const load2 = (path, primitive, split = true) => {
    const pathString = makePathString(path);
    const current = getEnv();
    const valueOpt = pathString in current ? some(current[pathString]) : none$4();
    return flatMap$1((value) => parsePrimitive(value, path, primitive, seqDelim, split))(mapError(() => MissingData(path, `Expected ${pathString} to exist in the process context`))(valueOpt));
  };
  const enumerateChildren = (path) => sync(() => {
    const current = getEnv();
    const keys2 = Object.keys(current);
    const keyPaths = Array.from(keys2).map((value) => unmakePathString(value.toUpperCase()));
    const filteredKeyPaths = keyPaths.filter((keyPath) => {
      for (let i = 0; i < path.length; i++) {
        const pathComponent = unsafeGet$1(i)(path);
        const currentElement = keyPath[i];
        if (currentElement === void 0 || pathComponent !== currentElement) {
          return false;
        }
      }
      return true;
    }).flatMap((keyPath) => keyPath.slice(path.length, path.length + 1));
    return fromIterable(filteredKeyPaths);
  });
  return fromFlat(makeFlat({
    load: load2,
    enumerateChildren,
    patch: empty$2
  }));
};
const extend = (leftDef, rightDef, left2, right2) => {
  const leftPad = unfold(left2.length, (index2) => index2 >= right2.length ? none$4() : some([leftDef(index2), index2 + 1]));
  const rightPad = unfold(right2.length, (index2) => index2 >= left2.length ? none$4() : some([rightDef(index2), index2 + 1]));
  const leftExtension = concat(left2, leftPad);
  const rightExtension = concat(right2, rightPad);
  return [leftExtension, rightExtension];
};
const fromFlatLoop = (flat, prefix, config, split) => {
  const op = config;
  switch (op._tag) {
    case OP_CONSTANT: {
      return succeed(of$2(op.value));
    }
    case OP_DESCRIBED: {
      return suspend(() => fromFlatLoop(flat, prefix, op.config, split));
    }
    case OP_FAIL: {
      return fail(MissingData(prefix, op.message));
    }
    case OP_FALLBACK: {
      return catchAll((error1) => {
        if (op.condition(error1)) {
          return catchAll((error2) => fail(Or(error1, error2)))(fromFlatLoop(flat, prefix, op.second, split));
        }
        return fail(error1);
      })(suspend(() => fromFlatLoop(flat, prefix, op.first, split)));
    }
    case OP_LAZY: {
      return suspend(() => fromFlatLoop(flat, prefix, op.config(), split));
    }
    case OP_MAP_OR_FAIL: {
      return suspend(() => flatMap$1(forEachSequential((a) => mapError(prefixed(prefix))(op.mapOrFail(a))))(fromFlatLoop(flat, prefix, op.original, split)));
    }
    case OP_NESTED: {
      return suspend(() => fromFlatLoop(flat, concat(prefix, of$2(op.name)), op.config, split));
    }
    case OP_PRIMITIVE: {
      return flatMap$1((prefix2) => flatMap$1((values) => {
        if (values.length === 0) {
          const name = getOrElse(() => "<n/a>")(last(prefix2));
          return fail(missingError(name));
        }
        return succeed(values);
      })(flat.load(prefix2, op, split)))(patch$1(prefix, flat.patch));
    }
    case OP_SEQUENCE: {
      return flatMap$1((patchedPrefix) => flatMap$1((indices) => {
        if (indices.length === 0) {
          return suspend(() => map(fromFlatLoop(flat, patchedPrefix, op.config, true), of$2));
        }
        return map((chunkChunk) => {
          const flattened = flatten$1(chunkChunk);
          if (flattened.length === 0) {
            return of$2(empty$g());
          }
          return of$2(flattened);
        })(forEachSequential(indices, (index2) => fromFlatLoop(flat, append$1(prefix, `[${index2}]`), op.config, true)));
      })(flatMap$1(indicesFrom)(flat.enumerateChildren(patchedPrefix))))(patch$1(prefix, flat.patch));
    }
    case OP_TABLE: {
      return suspend(() => flatMap$1((prefix2) => flatMap$1((keys2) => {
        return map((values) => {
          if (values.length === 0) {
            return of$2(empty$a());
          }
          const matrix = values.map((x) => Array.from(x));
          return map$4((values2) => fromIterable$1(zip$1(fromIterable$5(keys2), values2)))(transpose(matrix));
        })(forEachSequential((key) => fromFlatLoop(flat, concat(prefix2, of$2(key)), op.valueConfig, split))(keys2));
      })(flat.enumerateChildren(prefix2)))(patch$1(prefix, flat.patch)));
    }
    case OP_ZIP_WITH: {
      return suspend(() => flatMap$1((left2) => flatMap$1((right$12) => {
        if (isLeft(left2) && isLeft(right$12)) {
          return fail(And(left2.left, right$12.left));
        }
        if (isLeft(left2) && isRight(right$12)) {
          return fail(left2.left);
        }
        if (isRight(left2) && isLeft(right$12)) {
          return fail(right$12.left);
        }
        if (isRight(left2) && isRight(right$12)) {
          const path = join(".")(prefix);
          const fail2 = fromFlatLoopFail(prefix, path);
          const [lefts, rights] = extend(fail2, fail2, map$4(right)(left2.right), map$4(right)(right$12.right));
          return forEachSequential(([left3, right2]) => map(([left4, right3]) => op.zip(left4, right3))(zip(left3, right2)))(zip$1(rights)(lefts));
        }
        throw new Error("BUG: ConfigProvider.fromFlatLoop - please report an issue at https://github.com/Effect-TS/io/issues");
      })(either(fromFlatLoop(flat, prefix, op.right, split))))(either(fromFlatLoop(flat, prefix, op.left, split))));
    }
  }
};
const fromFlatLoopFail = (prefix, path) => (index2) => left(MissingData(prefix, `The element at index ${index2} in a sequence at path "${path}" was missing`));
const splitPathString = (text2, delim) => {
  const split = text2.split(new RegExp(`\\s*${escapeRegex(delim)}\\s*`));
  return split;
};
const parsePrimitive = (text2, path, primitive, delimiter, split) => {
  if (!split) {
    return mapError(prefixed(path))(map(of$2)(primitive.parse(text2)));
  }
  return mapError(prefixed(path))(forEachSequential((char) => primitive.parse(char.trim()))(splitPathString(text2, delimiter)));
};
const transpose = (array2) => {
  return Object.keys(array2[0]).map((column) => array2.map((row) => row[column]));
};
const escapeRegex = (string2) => {
  return string2.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
};
const indicesFrom = (quotedIndices) => map(merge$1)(either(mapBoth({
  onFailure: () => empty$g(),
  onSuccess: sort$1(Order$1)
})(forEachSequential(quotedIndices, parseQuotedIndex))));
const QUOTED_INDEX_REGEX = /^(\[(\d+)\])$/;
const parseQuotedIndex = (str) => {
  const match2 = str.match(QUOTED_INDEX_REGEX);
  if (match2 !== null) {
    const matchedIndex = match2[2];
    return flatMap$3(parseInteger)(matchedIndex !== void 0 && matchedIndex.length > 0 ? some(matchedIndex) : none$4());
  }
  return none$4();
};
const parseInteger = (str) => {
  const parsedIndex = Number.parseInt(str);
  return Number.isNaN(parsedIndex) ? none$4() : some(parsedIndex);
};
var _a$a;
const RandomSymbolKey = "@effect/io/Random";
const RandomTypeId = /* @__PURE__ */ Symbol.for(RandomSymbolKey);
const randomTag = /* @__PURE__ */ Tag(RandomTypeId);
class RandomImpl {
  constructor(seed) {
    this.seed = seed;
    this[_a$a] = RandomTypeId;
    this.PRNG = new PCGRandom(seed);
  }
  next() {
    return sync(() => this.PRNG.number());
  }
  nextBoolean() {
    return map(this.next(), (n) => n > 0.5);
  }
  nextInt() {
    return sync(() => this.PRNG.integer(Number.MAX_SAFE_INTEGER));
  }
  nextRange(min, max) {
    return map(this.next(), (n) => (max - min) * n + min);
  }
  nextIntBetween(min, max) {
    return sync(() => this.PRNG.integer(1 + max - min) + min);
  }
  shuffle(elements) {
    return shuffleWith(elements, (n) => this.nextIntBetween(0, n));
  }
}
_a$a = RandomTypeId;
const shuffleWith = (elements, nextIntBounded) => {
  return suspend(() => flatMap$1((buffer) => {
    const numbers = [];
    for (let i = buffer.length; i >= 2; i = i - 1) {
      numbers.push(i);
    }
    return as(fromIterable$4(buffer))(forEachSequentialDiscard((n) => map((k) => swap(buffer, n - 1, k))(nextIntBounded(n)))(numbers));
  })(sync(() => Array.from(elements))));
};
const swap = (buffer, index1, index2) => {
  const tmp = buffer[index1];
  buffer[index1] = buffer[index2];
  buffer[index2] = tmp;
  return buffer;
};
const make$5 = (seed) => new RandomImpl(seed);
const TracerTypeId = /* @__PURE__ */ Symbol.for("@effect/io/Tracer");
const make$4 = (options2) => ({
  [TracerTypeId]: TracerTypeId,
  ...options2
});
const tracerTag = /* @__PURE__ */ Tag(/* @__PURE__ */ Symbol.for("@effect/io/Tracer"));
const ids = /* @__PURE__ */ globalValue("@effect/io/Tracer/SpanId.ids", () => make$a(0));
class NativeSpan {
  constructor(name, parent2, context, startTime) {
    this.name = name;
    this.parent = parent2;
    this.context = context;
    this.startTime = startTime;
    this._tag = "Span";
    this.traceId = "native";
    this.events = [];
    this.end = (endTime, exit2) => {
      this.status = {
        _tag: "Ended",
        endTime,
        exit: exit2,
        startTime: this.status.startTime
      };
    };
    this.attribute = (key, value) => {
      this.attributes.set(key, value);
    };
    this.event = (name2, startTime2, attributes2) => {
      this.events.push([name2, startTime2, attributes2 ?? {}]);
    };
    this.status = {
      _tag: "Started",
      startTime
    };
    this.attributes = /* @__PURE__ */ new Map();
    this.spanId = `span${incrementAndGet(ids)}`;
  }
}
const nativeTracer = /* @__PURE__ */ make$4({
  span: (name, parent2, context, startTime) => new NativeSpan(name, parent2, context, startTime)
});
const liveServices = /* @__PURE__ */ add$2(tracerTag, nativeTracer)(/* @__PURE__ */ add$2(configProviderTag, fromEnv())(/* @__PURE__ */ add$2(randomTag, make$5(Math.random() * 4294967296 >>> 0))(/* @__PURE__ */ add$2(clockTag, make$7())(/* @__PURE__ */ empty$h()))));
const currentServices = /* @__PURE__ */ fiberRefUnsafeMakeContext(liveServices);
var _a$9;
function unsafeMake$3(fiberRefLocals) {
  return new FiberRefsImpl(fiberRefLocals);
}
const FiberRefsSym = /* @__PURE__ */ Symbol.for("@effect/io/FiberRefs");
class FiberRefsImpl {
  constructor(locals) {
    this.locals = locals;
    this[_a$9] = FiberRefsSym;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
_a$9 = FiberRefsSym;
const findAncestor = (_ref, _parentStack, _childStack, _childModified = false) => {
  const ref = _ref;
  let parentStack = _parentStack;
  let childStack = _childStack;
  let childModified = _childModified;
  let ret = void 0;
  while (ret === void 0) {
    if (isNonEmptyReadonlyArray(parentStack) && isNonEmptyReadonlyArray(childStack)) {
      const parentFiberId = headNonEmpty$1(parentStack)[0];
      const parentAncestors = tailNonEmpty$1(parentStack);
      const childFiberId = headNonEmpty$1(childStack)[0];
      const childRefValue = headNonEmpty$1(childStack)[1];
      const childAncestors = tailNonEmpty$1(childStack);
      if (parentFiberId.startTimeMillis < childFiberId.startTimeMillis) {
        childStack = childAncestors;
        childModified = true;
      } else if (parentFiberId.startTimeMillis > childFiberId.startTimeMillis) {
        parentStack = parentAncestors;
      } else {
        if (parentFiberId.id < childFiberId.id) {
          childStack = childAncestors;
          childModified = true;
        } else if (parentFiberId.id > childFiberId.id) {
          parentStack = parentAncestors;
        } else {
          ret = [childRefValue, childModified];
        }
      }
    } else {
      ret = [ref.initial, true];
    }
  }
  return ret;
};
const joinAs = /* @__PURE__ */ dual(3, (self, fiberId2, that) => {
  const parentFiberRefs = new Map(self.locals);
  for (const [fiberRef, childStack] of that.locals) {
    const childValue = headNonEmpty$1(childStack)[1];
    if (!equals$1(headNonEmpty$1(childStack)[0], fiberId2)) {
      if (!parentFiberRefs.has(fiberRef)) {
        if (equals$1(childValue, fiberRef.initial)) {
          continue;
        }
        parentFiberRefs.set(fiberRef, [[fiberId2, fiberRef.join(fiberRef.initial, childValue)]]);
        continue;
      }
      const parentStack = parentFiberRefs.get(fiberRef);
      const [ancestor, wasModified] = findAncestor(fiberRef, parentStack, childStack);
      if (wasModified) {
        const patch2 = fiberRef.diff(ancestor, childValue);
        const oldValue = headNonEmpty$1(parentStack)[1];
        const newValue = fiberRef.join(oldValue, fiberRef.patch(patch2)(oldValue));
        if (!equals$1(oldValue, newValue)) {
          let newStack;
          const parentFiberId = headNonEmpty$1(parentStack)[0];
          if (equals$1(parentFiberId, fiberId2)) {
            newStack = prepend$2([parentFiberId, newValue])(tailNonEmpty$1(parentStack));
          } else {
            newStack = prepend$2([fiberId2, newValue])(parentStack);
          }
          parentFiberRefs.set(fiberRef, newStack);
        }
      }
    }
  }
  return new FiberRefsImpl(new Map(parentFiberRefs));
});
const forkAs$1 = /* @__PURE__ */ dual(2, (self, childId) => {
  const map2 = /* @__PURE__ */ new Map();
  for (const [fiberRef, stack] of self.locals.entries()) {
    const oldValue = headNonEmpty$1(stack)[1];
    const newValue = fiberRef.patch(fiberRef.fork)(oldValue);
    if (equals$1(oldValue, newValue)) {
      map2.set(fiberRef, stack);
    } else {
      map2.set(fiberRef, prepend$2([childId, newValue])(stack));
    }
  }
  return new FiberRefsImpl(map2);
});
const delete_ = /* @__PURE__ */ dual(2, (self, fiberRef) => {
  const locals = new Map(self.locals);
  locals.delete(fiberRef);
  return new FiberRefsImpl(locals);
});
const get$1 = /* @__PURE__ */ dual(2, (self, fiberRef) => {
  if (!self.locals.has(fiberRef)) {
    return none$4();
  }
  return some(headNonEmpty$1(self.locals.get(fiberRef))[1]);
});
const getOrDefault = /* @__PURE__ */ dual(2, (self, fiberRef) => getOrElse(() => fiberRef.initial)(get$1(self, fiberRef)));
const updatedAs$1 = /* @__PURE__ */ dual(2, (self, {
  fiberId: fiberId2,
  fiberRef,
  value
}) => {
  const oldStack = self.locals.has(fiberRef) ? self.locals.get(fiberRef) : empty$g();
  let newStack;
  if (isEmptyReadonlyArray(oldStack)) {
    newStack = of$2([fiberId2, value]);
  } else {
    const [currentId, currentValue] = headNonEmpty$1(oldStack);
    if (equals$1(currentId, fiberId2)) {
      if (equals$1(currentValue, value)) {
        return self;
      } else {
        newStack = prepend$2([fiberId2, value])(tailNonEmpty$1(oldStack));
      }
    } else {
      newStack = prepend$2([fiberId2, value])(oldStack);
    }
  }
  const locals = new Map(self.locals);
  return new FiberRefsImpl(locals.set(fiberRef, newStack));
});
const forkAs = forkAs$1;
const updatedAs = updatedAs$1;
const unsafeMake$2 = unsafeMake$3;
class SingleShotGen {
  constructor(self) {
    this.self = self;
    this.called = false;
  }
  next(a) {
    return this.called ? {
      value: a,
      done: true
    } : (this.called = true, {
      value: this.self,
      done: false
    });
  }
  return(a) {
    return {
      value: a,
      done: true
    };
  }
  throw(e) {
    throw e;
  }
  [Symbol.iterator]() {
    return new SingleShotGen(this.self);
  }
}
const All = logLevelAll;
const Fatal = logLevelFatal;
const Error$1 = logLevelError;
const Warning = logLevelWarning;
const Info = logLevelInfo;
const Debug = logLevelDebug;
const Trace = logLevelTrace;
const None3 = logLevelNone;
const Order = /* @__PURE__ */ mapInput((level) => level.ordinal)(Order$1);
const greaterThan = /* @__PURE__ */ greaterThan$1(Order);
const fromLiteral = (_) => {
  switch (_) {
    case "All": {
      return All;
    }
    case "Debug": {
      return Debug;
    }
    case "Error": {
      return Error$1;
    }
    case "Fatal": {
      return Fatal;
    }
    case "Info": {
      return Info;
    }
    case "Trace": {
      return Trace;
    }
    case "None": {
      return None3;
    }
    case "Warning": {
      return Warning;
    }
  }
};
const render$2 = (now) => {
  return (self) => {
    const label = self.label.replace(/[\s="]/g, "_");
    return `${label}=${now - self.startTime}ms`;
  };
};
const render$1 = render$2;
const try_ = (arg) => {
  let evaluate;
  let onFailure = void 0;
  if (typeof arg === "function") {
    evaluate = arg;
  } else {
    evaluate = arg.try;
    onFailure = arg.catch;
  }
  return sync(() => {
    try {
      return evaluate();
    } catch (error) {
      throw makeEffectError(fail$1(onFailure ? onFailure(error) : error));
    }
  });
};
class EffectGen {
  constructor(value) {
    this.value = value;
  }
  [Symbol.iterator]() {
    return new SingleShotGen(this);
  }
}
const adapter = function() {
  let x = arguments[0];
  for (let i = 1; i < arguments.length; i++) {
    x = arguments[i](x);
  }
  return new EffectGen(x);
};
const gen$1 = (f) => suspend(() => {
  const iterator = f(adapter);
  const state = iterator.next();
  const run = (state2) => state2.done ? succeed(state2.value) : flatMap$1((val2) => run(iterator.next(val2)))(state2.value.value);
  return run(state);
});
const tryPromise$1 = (arg) => flatMap$1(try_(arg), (promise) => async((resolve) => {
  promise.then((a) => resolve(exitSucceed(a))).catch((e) => resolve(exitFail("catch" in arg ? arg.catch(e) : e)));
}));
const TypeId = /* @__PURE__ */ Symbol.for("@effect/data/MutableHashMap");
class MutableHashMapImpl {
  constructor() {
    this._id = TypeId;
    this.backingMap = make$a(empty$a());
  }
  [Symbol.iterator]() {
    return this.backingMap.current[Symbol.iterator]();
  }
  toString() {
    return `MutableHashMap(${Array.from(this).map(([k, v]) => `[${String(k)}, ${String(v)}]`).join(", ")})`;
  }
  toJSON() {
    return {
      _tag: "MutableHashMap",
      values: Array.from(this)
    };
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toJSON();
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const empty$1 = () => new MutableHashMapImpl();
const get = /* @__PURE__ */ dual(2, (self, key) => get$3(self.backingMap.current, key));
const has = /* @__PURE__ */ dual(2, (self, key) => isSome(get(self, key)));
const set = /* @__PURE__ */ dual(3, (self, key, value) => {
  update(self.backingMap, set$2(key, value));
  return self;
});
const isFailure = exitIsFailure;
var _a$8, _b$5, _c$1;
const FiberStatusSymbolKey = "@effect/io/Fiber/Status";
const FiberStatusTypeId = /* @__PURE__ */ Symbol.for(FiberStatusSymbolKey);
const OP_DONE = "Done";
const OP_RUNNING = "Running";
const OP_SUSPENDED = "Suspended";
class Done {
  constructor() {
    this[_a$8] = FiberStatusTypeId;
    this._tag = OP_DONE;
  }
  [(_a$8 = FiberStatusTypeId, symbol$1)]() {
    return combine$6(hash(this._tag))(hash(FiberStatusSymbolKey));
  }
  [symbol](that) {
    return isFiberStatus(that) && that._tag === OP_DONE;
  }
}
class Running {
  constructor(runtimeFlags) {
    this.runtimeFlags = runtimeFlags;
    this[_b$5] = FiberStatusTypeId;
    this._tag = OP_RUNNING;
  }
  [(_b$5 = FiberStatusTypeId, symbol$1)]() {
    return combine$6(hash(this.runtimeFlags))(combine$6(hash(this._tag))(hash(FiberStatusSymbolKey)));
  }
  [symbol](that) {
    return isFiberStatus(that) && that._tag === OP_RUNNING && this.runtimeFlags === that.runtimeFlags;
  }
}
class Suspended {
  constructor(runtimeFlags, blockingOn) {
    this.runtimeFlags = runtimeFlags;
    this.blockingOn = blockingOn;
    this[_c$1] = FiberStatusTypeId;
    this._tag = OP_SUSPENDED;
  }
  [(_c$1 = FiberStatusTypeId, symbol$1)]() {
    return combine$6(hash(this.blockingOn))(combine$6(hash(this.runtimeFlags))(combine$6(hash(this._tag))(hash(FiberStatusSymbolKey))));
  }
  [symbol](that) {
    return isFiberStatus(that) && that._tag === OP_SUSPENDED && this.runtimeFlags === that.runtimeFlags && equals$1(this.blockingOn, that.blockingOn);
  }
}
const done$1 = /* @__PURE__ */ new Done();
const running$1 = (runtimeFlags) => new Running(runtimeFlags);
const suspended$1 = (runtimeFlags, blockingOn) => new Suspended(runtimeFlags, blockingOn);
const isFiberStatus = (u) => typeof u === "object" && u != null && FiberStatusTypeId in u;
const isDone$1 = (self) => self._tag === OP_DONE;
const done = done$1;
const running = running$1;
const suspended = suspended$1;
const isDone = isDone$1;
const OP_INTERRUPT_SIGNAL = "InterruptSignal";
const OP_STATEFUL = "Stateful";
const OP_RESUME = "Resume";
const OP_YIELD_NOW = "YieldNow";
const interruptSignal = (cause) => ({
  _tag: OP_INTERRUPT_SIGNAL,
  cause
});
const stateful = (onFiber) => ({
  _tag: OP_STATEFUL,
  onFiber
});
const resume = (effect) => ({
  _tag: OP_RESUME,
  effect
});
const yieldNow = () => ({
  _tag: OP_YIELD_NOW
});
var _a$7, _b$4;
const FiberScopeSymbolKey = "@effect/io/Fiber/Scope";
const FiberScopeTypeId = /* @__PURE__ */ Symbol.for(FiberScopeSymbolKey);
class Global {
  constructor() {
    this[_a$7] = FiberScopeTypeId;
    this.fiberId = none$2;
    this.roots = /* @__PURE__ */ new Set();
  }
  add(_runtimeFlags, child) {
    this.roots.add(child);
    child.unsafeAddObserver(() => {
      this.roots.delete(child);
    });
  }
}
_a$7 = FiberScopeTypeId;
class Local {
  constructor(fiberId2, parent2) {
    this.fiberId = fiberId2;
    this.parent = parent2;
    this[_b$4] = FiberScopeTypeId;
  }
  add(_runtimeFlags, child) {
    this.parent.tell(stateful((parentFiber) => {
      parentFiber.addChild(child);
      child.unsafeAddObserver(() => {
        parentFiber.removeChild(child);
      });
    }));
  }
}
_b$4 = FiberScopeTypeId;
const unsafeMake$1 = (fiber) => {
  return new Local(fiber.id(), fiber);
};
const globalScope = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/io/FiberScope/Global"), () => new Global());
const FiberSymbolKey = "@effect/io/Fiber";
const FiberTypeId = /* @__PURE__ */ Symbol.for(FiberSymbolKey);
const fiberVariance = {
  _E: (_) => _,
  _A: (_) => _
};
const RuntimeFiberSymbolKey = "@effect/io/Fiber";
const RuntimeFiberTypeId = /* @__PURE__ */ Symbol.for(RuntimeFiberSymbolKey);
const currentFiberURI = "@effect/io/Fiber/Current";
const renderToString = (u) => {
  if (typeof u === "object" && u != null && "toString" in u && typeof u["toString"] === "function" && u["toString"] !== Object.prototype.toString) {
    return u["toString"]();
  }
  if (typeof u === "string") {
    return `Error: ${u}`;
  }
  if (typeof u === "object" && u !== null) {
    if ("message" in u && typeof u["message"] === "string") {
      const raw = JSON.parse(JSON.stringify(u));
      const keys2 = new Set(Object.keys(raw));
      keys2.delete("name");
      keys2.delete("message");
      keys2.delete("_tag");
      if (keys2.size === 0) {
        return `${"name" in u && typeof u.name === "string" ? u.name : "Error"}${"_tag" in u && typeof u["_tag"] === "string" ? `(${u._tag})` : ``}: ${u.message}`;
      }
    }
  }
  return `Error: ${JSON.stringify(u)}`;
};
const defaultErrorToLines = (error) => {
  if (error instanceof Error) {
    return [renderToString(error), error.stack?.split("\n").filter((_) => !_.startsWith("Error")).join("\n")];
  }
  return [renderToString(error), void 0];
};
const pretty = (cause) => {
  if (isInterruptedOnly(cause)) {
    return "All fibers interrupted without errors.";
  }
  const final = prettyErrors(cause).map((e) => {
    let message = e.message;
    if (e.stack) {
      message += `\r
${e.stack}`;
    }
    return message;
  }).join("\r\n\r\n");
  if (!final.includes("\r\n")) {
    return final;
  }
  return `\r
${final}\r
`;
};
const prettyErrors = (cause) => reduceWithContext(cause, void 0, {
  emptyCase: () => [],
  dieCase: (_, err) => {
    const rendered = defaultErrorToLines(err);
    return [{
      message: rendered[0],
      stack: rendered[1]
    }];
  },
  failCase: (_, err) => {
    const rendered = defaultErrorToLines(err);
    return [{
      message: rendered[0],
      stack: rendered[1]
    }];
  },
  interruptCase: () => [],
  parallelCase: (_, l, r) => [...l, ...r],
  sequentialCase: (_, l, r) => [...l, ...r],
  annotatedCase: (_, v, _parent) => v
});
const currentRequestMap = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/io/FiberRef/currentRequestMap"), () => fiberRefUnsafeMake(/* @__PURE__ */ new Map()));
const LoggerSymbolKey = "@effect/io/Logger";
const LoggerTypeId = /* @__PURE__ */ Symbol.for(LoggerSymbolKey);
const loggerVariance = {
  _Message: (_) => _,
  _Output: (_) => _
};
const makeLogger = (log) => ({
  [LoggerTypeId]: loggerVariance,
  log,
  pipe() {
    return pipeArguments(this, arguments);
  }
});
const stringLogger = /* @__PURE__ */ makeLogger(({
  annotations,
  cause,
  date,
  fiberId: fiberId2,
  logLevel,
  message,
  spans
}) => {
  const nowMillis = date.getTime();
  const outputArray = [`timestamp=${date.toISOString()}`, `level=${logLevel.label}`, `fiber=${threadName$1(fiberId2)}`];
  let output = outputArray.join(" ");
  if (message.length > 0) {
    output = output + " message=";
    output = appendQuoted(message, output);
  }
  if (cause != null && cause != empty$3) {
    output = output + " cause=";
    output = appendQuoted(pretty(cause), output);
  }
  if (isCons(spans)) {
    output = output + " ";
    let first2 = true;
    for (const span of spans) {
      if (first2) {
        first2 = false;
      } else {
        output = output + " ";
      }
      output = output + render$1(nowMillis)(span);
    }
  }
  if (size$1(annotations) > 0) {
    output = output + " ";
    let first2 = true;
    for (const [key, value] of annotations) {
      if (first2) {
        first2 = false;
      } else {
        output = output + " ";
      }
      output = output + filterKeyName(key);
      output = output + "=";
      output = appendQuoted(value, output);
    }
  }
  return output;
});
const escapeDoubleQuotes = (str) => `"${str.replace(/\\([\s\S])|(")/g, "\\$1$2")}"`;
const textOnly = /^[^\s"=]+$/;
const appendQuoted = (label, output) => output + (label.match(textOnly) ? label : escapeDoubleQuotes(label));
const filterKeyName = (key) => key.replace(/[\s="]/g, "_");
var _a$6;
const MetricBoundariesSymbolKey = "@effect/io/Metric/Boundaries";
const MetricBoundariesTypeId = /* @__PURE__ */ Symbol.for(MetricBoundariesSymbolKey);
class MetricBoundariesImpl {
  constructor(values) {
    this.values = values;
    this[_a$6] = MetricBoundariesTypeId;
  }
  [(_a$6 = MetricBoundariesTypeId, symbol$1)]() {
    return combine$6(hash(this.values))(hash(MetricBoundariesSymbolKey));
  }
  [symbol](u) {
    return isMetricBoundaries(u) && equals$1(this.values, u.values);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const isMetricBoundaries = (u) => {
  return typeof u === "object" && u != null && MetricBoundariesTypeId in u;
};
const fromChunk = (chunk) => {
  const values = dedupe(appendAll$1(of$1(Number.POSITIVE_INFINITY))(chunk));
  return new MetricBoundariesImpl(values);
};
const exponential = (options2) => fromChunk(unsafeFromArray(makeBy(options2.count - 1, (i) => options2.start * Math.pow(options2.factor, i))));
var _a$5, _b$3, _g$1, _h$1;
const MetricKeyTypeSymbolKey = "@effect/io/Metric/KeyType";
const MetricKeyTypeTypeId = /* @__PURE__ */ Symbol.for(MetricKeyTypeSymbolKey);
const CounterKeyTypeSymbolKey = "effect/io/Metric/KeyType/Counter";
const CounterKeyTypeTypeId = /* @__PURE__ */ Symbol.for(CounterKeyTypeSymbolKey);
const FrequencyKeyTypeSymbolKey = "effect/io/Metric/KeyType/Frequency";
const FrequencyKeyTypeTypeId = /* @__PURE__ */ Symbol.for(FrequencyKeyTypeSymbolKey);
const GaugeKeyTypeSymbolKey = "effect/io/Metric/KeyType/Gauge";
const GaugeKeyTypeTypeId = /* @__PURE__ */ Symbol.for(GaugeKeyTypeSymbolKey);
const HistogramKeyTypeSymbolKey = "effect/io/Metric/KeyType/Histogram";
const HistogramKeyTypeTypeId = /* @__PURE__ */ Symbol.for(HistogramKeyTypeSymbolKey);
const SummaryKeyTypeSymbolKey = "effect/io/Metric/KeyType/Summary";
const SummaryKeyTypeTypeId = /* @__PURE__ */ Symbol.for(SummaryKeyTypeSymbolKey);
const metricKeyTypeVariance = {
  _In: (_) => _,
  _Out: (_) => _
};
class CounterKeyType {
  constructor() {
    this[_a$5] = metricKeyTypeVariance;
    this[_b$3] = CounterKeyTypeTypeId;
  }
  [(_a$5 = MetricKeyTypeTypeId, _b$3 = CounterKeyTypeTypeId, symbol$1)]() {
    return hash(CounterKeyTypeSymbolKey);
  }
  [symbol](that) {
    return isCounterKey(that);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
class HistogramKeyType {
  constructor(boundaries) {
    this.boundaries = boundaries;
    this[_g$1] = metricKeyTypeVariance;
    this[_h$1] = HistogramKeyTypeTypeId;
  }
  [(_g$1 = MetricKeyTypeTypeId, _h$1 = HistogramKeyTypeTypeId, symbol$1)]() {
    return combine$6(hash(this.boundaries))(hash(HistogramKeyTypeSymbolKey));
  }
  [symbol](that) {
    return isHistogramKey(that) && equals$1(this.boundaries, that.boundaries);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const counter$4 = /* @__PURE__ */ new CounterKeyType();
const histogram$4 = (boundaries) => {
  return new HistogramKeyType(boundaries);
};
const isCounterKey = (u) => {
  return typeof u === "object" && u != null && CounterKeyTypeTypeId in u;
};
const isFrequencyKey = (u) => {
  return typeof u === "object" && u != null && FrequencyKeyTypeTypeId in u;
};
const isGaugeKey = (u) => {
  return typeof u === "object" && u != null && GaugeKeyTypeTypeId in u;
};
const isHistogramKey = (u) => {
  return typeof u === "object" && u != null && HistogramKeyTypeTypeId in u;
};
const isSummaryKey = (u) => {
  return typeof u === "object" && u != null && SummaryKeyTypeTypeId in u;
};
var _a$4;
const MetricKeySymbolKey = "@effect/io/Metric/Key";
const MetricKeyTypeId = /* @__PURE__ */ Symbol.for(MetricKeySymbolKey);
const metricKeyVariance = {
  _Type: (_) => _
};
class MetricKeyImpl {
  constructor(name, keyType, description, tags = empty$9()) {
    this.name = name;
    this.keyType = keyType;
    this.description = description;
    this.tags = tags;
    this[_a$4] = metricKeyVariance;
  }
  [(_a$4 = MetricKeyTypeId, symbol$1)]() {
    return combine$6(hash(this.tags))(combine$6(hash(this.description))(combine$6(hash(this.keyType))(hash(this.name))));
  }
  [symbol](u) {
    return isMetricKey(u) && this.name === u.name && equals$1(this.keyType, u.keyType) && equals$1(this.description, u.description) && equals$1(this.tags, u.tags);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const isMetricKey = (u) => typeof u === "object" && u != null && MetricKeyTypeId in u;
const counter$3 = (name, description) => new MetricKeyImpl(name, counter$4, fromNullable(description));
const histogram$3 = (name, boundaries, description) => new MetricKeyImpl(name, histogram$4(boundaries), fromNullable(description));
const taggedWithLabelSet = /* @__PURE__ */ dual(2, (self, extraTags) => size(extraTags) === 0 ? self : new MetricKeyImpl(self.name, self.keyType, self.description, union(extraTags)(self.tags)));
var _a$3, _b$2, _c, _d$1, _e, _f, _g, _h, _j, _k;
const MetricStateSymbolKey = "@effect/io/Metric/State";
const MetricStateTypeId = /* @__PURE__ */ Symbol.for(MetricStateSymbolKey);
const CounterStateSymbolKey = "effect/io/Metric/State/Counter";
const CounterStateTypeId = /* @__PURE__ */ Symbol.for(CounterStateSymbolKey);
const FrequencyStateSymbolKey = "effect/io/Metric/State/Frequency";
const FrequencyStateTypeId = /* @__PURE__ */ Symbol.for(FrequencyStateSymbolKey);
const GaugeStateSymbolKey = "effect/io/Metric/State/Gauge";
const GaugeStateTypeId = /* @__PURE__ */ Symbol.for(GaugeStateSymbolKey);
const HistogramStateSymbolKey = "effect/io/Metric/State/Histogram";
const HistogramStateTypeId = /* @__PURE__ */ Symbol.for(HistogramStateSymbolKey);
const SummaryStateSymbolKey = "effect/io/Metric/State/Summary";
const SummaryStateTypeId = /* @__PURE__ */ Symbol.for(SummaryStateSymbolKey);
const metricStateVariance = {
  _A: (_) => _
};
class CounterState {
  constructor(count) {
    this.count = count;
    this[_a$3] = metricStateVariance;
    this[_b$2] = CounterStateTypeId;
  }
  [(_a$3 = MetricStateTypeId, _b$2 = CounterStateTypeId, symbol$1)]() {
    return combine$6(hash(this.count))(hash(CounterStateSymbolKey));
  }
  [symbol](that) {
    return isCounterState(that) && this.count === that.count;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
class FrequencyState {
  constructor(occurrences) {
    this.occurrences = occurrences;
    this[_c] = metricStateVariance;
    this[_d$1] = FrequencyStateTypeId;
  }
  [(_c = MetricStateTypeId, _d$1 = FrequencyStateTypeId, symbol$1)]() {
    return combine$6(hash(this.occurrences))(hash(FrequencyStateSymbolKey));
  }
  [symbol](that) {
    return isFrequencyState(that) && equals$1(this.occurrences, that.occurrences);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
class GaugeState {
  constructor(value) {
    this.value = value;
    this[_e] = metricStateVariance;
    this[_f] = GaugeStateTypeId;
  }
  [(_e = MetricStateTypeId, _f = GaugeStateTypeId, symbol$1)]() {
    return combine$6(hash(this.value))(hash(GaugeStateSymbolKey));
  }
  [symbol](u) {
    return isGaugeState(u) && this.value === u.value;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
class HistogramState {
  constructor(buckets, count, min, max, sum) {
    this.buckets = buckets;
    this.count = count;
    this.min = min;
    this.max = max;
    this.sum = sum;
    this[_g] = metricStateVariance;
    this[_h] = HistogramStateTypeId;
  }
  [(_g = MetricStateTypeId, _h = HistogramStateTypeId, symbol$1)]() {
    return combine$6(hash(this.sum))(combine$6(hash(this.max))(combine$6(hash(this.min))(combine$6(hash(this.count))(combine$6(hash(this.buckets))(hash(HistogramStateSymbolKey))))));
  }
  [symbol](that) {
    return isHistogramState(that) && equals$1(this.buckets, that.buckets) && this.count === that.count && this.min === that.min && this.max === that.max && this.sum === that.sum;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
class SummaryState {
  constructor(error, quantiles, count, min, max, sum) {
    this.error = error;
    this.quantiles = quantiles;
    this.count = count;
    this.min = min;
    this.max = max;
    this.sum = sum;
    this[_j] = metricStateVariance;
    this[_k] = SummaryStateTypeId;
  }
  [(_j = MetricStateTypeId, _k = SummaryStateTypeId, symbol$1)]() {
    return combine$6(hash(this.sum))(combine$6(hash(this.max))(combine$6(hash(this.min))(combine$6(hash(this.count))(combine$6(hash(this.quantiles))(combine$6(hash(this.error))(hash(SummaryStateSymbolKey)))))));
  }
  [symbol](that) {
    return isSummaryState(that) && this.error === that.error && equals$1(this.quantiles, that.quantiles) && this.count === that.count && this.min === that.min && this.max === that.max && this.sum === that.sum;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const counter$2 = (count) => {
  return new CounterState(count);
};
const frequency$1 = (occurrences) => {
  return new FrequencyState(occurrences);
};
const gauge$1 = (value) => {
  return new GaugeState(value);
};
const histogram$2 = (options2) => new HistogramState(options2.buckets, options2.count, options2.min, options2.max, options2.sum);
const summary$1 = (options2) => new SummaryState(options2.error, options2.quantiles, options2.count, options2.min, options2.max, options2.sum);
const isCounterState = (u) => {
  return typeof u === "object" && u != null && CounterStateTypeId in u;
};
const isFrequencyState = (u) => {
  return typeof u === "object" && u != null && FrequencyStateTypeId in u;
};
const isGaugeState = (u) => {
  return typeof u === "object" && u != null && GaugeStateTypeId in u;
};
const isHistogramState = (u) => {
  return typeof u === "object" && u != null && HistogramStateTypeId in u;
};
const isSummaryState = (u) => {
  return typeof u === "object" && u != null && SummaryStateTypeId in u;
};
const MetricHookSymbolKey = "@effect/io/Metric/Hook";
const MetricHookTypeId = /* @__PURE__ */ Symbol.for(MetricHookSymbolKey);
const metricHookVariance = {
  _In: (_) => _,
  _Out: (_) => _
};
const make$3 = (options2) => ({
  [MetricHookTypeId]: metricHookVariance,
  pipe() {
    return pipeArguments(this, arguments);
  },
  ...options2
});
const counter$1 = (_key) => {
  let sum = 0;
  return make$3({
    get: () => counter$2(sum),
    update: (value) => {
      sum = sum + value;
    }
  });
};
const frequency = (_key) => {
  const values = /* @__PURE__ */ new Map();
  const update2 = (word) => {
    const slotCount = values.get(word) ?? 0;
    values.set(word, slotCount + 1);
  };
  const snapshot = () => fromIterable$1(values.entries());
  return make$3({
    get: () => frequency$1(snapshot()),
    update: update2
  });
};
const gauge = (_key, startAt) => {
  let value = startAt;
  return make$3({
    get: () => gauge$1(value),
    update: (v) => {
      value = v;
    }
  });
};
const histogram$1 = (key) => {
  const bounds = key.keyType.boundaries.values;
  const size2 = bounds.length;
  const values = new Uint32Array(size2 + 1);
  const boundaries = new Float32Array(size2);
  let count = 0;
  let sum = 0;
  let min = Number.MAX_VALUE;
  let max = Number.MIN_VALUE;
  map$3((n, i) => {
    boundaries[i] = n;
  })(sort(Order$1)(bounds));
  const update2 = (value) => {
    let from = 0;
    let to = size2;
    while (from !== to) {
      const mid = Math.floor(from + (to - from) / 2);
      const boundary = boundaries[mid];
      if (value <= boundary) {
        to = mid;
      } else {
        from = mid;
      }
      if (to === from + 1) {
        if (value <= boundaries[from]) {
          to = from;
        } else {
          from = to;
        }
      }
    }
    values[from] = values[from] + 1;
    count = count + 1;
    sum = sum + value;
    if (value < min) {
      min = value;
    }
    if (value > max) {
      max = value;
    }
  };
  const getBuckets = () => {
    const builder = Array(size2);
    let cumulated = 0;
    for (let i = 0; i < size2; i++) {
      const boundary = boundaries[i];
      const value = values[i];
      cumulated = cumulated + value;
      builder[i] = [boundary, cumulated];
    }
    return unsafeFromArray(builder);
  };
  return make$3({
    get: () => histogram$2({
      buckets: getBuckets(),
      count,
      min,
      max,
      sum
    }),
    update: update2
  });
};
const summary = (key) => {
  const {
    error,
    maxAge,
    maxSize,
    quantiles
  } = key.keyType;
  const sortedQuantiles = sort(Order$1)(quantiles);
  const values = Array(maxSize);
  let head2 = 0;
  let count = 0;
  let sum = 0;
  let min = Number.MAX_VALUE;
  let max = Number.MIN_VALUE;
  const snapshot = (now) => {
    const builder = [];
    let i = 0;
    while (i !== maxSize - 1) {
      const item = values[i];
      if (item != null) {
        const [t, v] = item;
        const age = millis(now - t);
        if (greaterThanOrEqualTo(age, zero) && age <= maxAge) {
          builder.push(v);
        }
      }
      i = i + 1;
    }
    return calculateQuantiles(error, sortedQuantiles, sort(Order$1)(unsafeFromArray(builder)));
  };
  const observe = (value, timestamp) => {
    if (maxSize > 0) {
      head2 = head2 + 1;
      const target = head2 % maxSize;
      values[target] = [timestamp, value];
    }
    count = count + 1;
    sum = sum + value;
    if (value < min) {
      min = value;
    }
    if (value > max) {
      max = value;
    }
  };
  return make$3({
    get: () => summary$1({
      error,
      quantiles: snapshot(Date.now()),
      count,
      min,
      max,
      sum
    }),
    update: ([value, timestamp]) => observe(value, timestamp)
  });
};
const calculateQuantiles = (error, sortedQuantiles, sortedSamples) => {
  const sampleCount = sortedSamples.length;
  if (isEmpty$3(sortedQuantiles)) {
    return empty$f();
  }
  const head2 = unsafeHead(sortedQuantiles);
  const tail = drop(1)(sortedQuantiles);
  const resolved = reduce$6(of$1(resolveQuantile(error, sampleCount, none$4(), 0, head2, sortedSamples)), (accumulator, quantile) => {
    const h = unsafeHead(accumulator);
    return append(resolveQuantile(error, sampleCount, h.value, h.consumed, quantile, h.rest))(accumulator);
  })(tail);
  return map$3((rq) => [rq.quantile, rq.value])(resolved);
};
const resolveQuantile = (error, sampleCount, current, consumed, quantile, rest) => {
  let error_1 = error;
  let sampleCount_1 = sampleCount;
  let current_1 = current;
  let consumed_1 = consumed;
  let quantile_1 = quantile;
  let rest_1 = rest;
  let error_2 = error;
  let sampleCount_2 = sampleCount;
  let current_2 = current;
  let consumed_2 = consumed;
  let quantile_2 = quantile;
  let rest_2 = rest;
  while (1) {
    if (isEmpty$3(rest_1)) {
      return {
        quantile: quantile_1,
        value: none$4(),
        consumed: consumed_1,
        rest: empty$f()
      };
    }
    if (quantile_1 === 1) {
      return {
        quantile: quantile_1,
        value: some(unsafeLast(rest_1)),
        consumed: consumed_1 + rest_1.length,
        rest: empty$f()
      };
    }
    const sameHead = splitWhere((n) => n > unsafeHead(rest_1))(rest_1);
    const desired = quantile_1 * sampleCount_1;
    const allowedError = error_1 / 2 * desired;
    const candConsumed = consumed_1 + sameHead[0].length;
    const candError = Math.abs(candConsumed - desired);
    if (candConsumed < desired - allowedError) {
      error_2 = error_1;
      sampleCount_2 = sampleCount_1;
      current_2 = head$1(rest_1);
      consumed_2 = candConsumed;
      quantile_2 = quantile_1;
      rest_2 = sameHead[1];
      error_1 = error_2;
      sampleCount_1 = sampleCount_2;
      current_1 = current_2;
      consumed_1 = consumed_2;
      quantile_1 = quantile_2;
      rest_1 = rest_2;
      continue;
    }
    if (candConsumed > desired + allowedError) {
      return {
        quantile: quantile_1,
        value: current_1,
        consumed: consumed_1,
        rest: rest_1
      };
    }
    switch (current_1._tag) {
      case "None": {
        error_2 = error_1;
        sampleCount_2 = sampleCount_1;
        current_2 = head$1(rest_1);
        consumed_2 = candConsumed;
        quantile_2 = quantile_1;
        rest_2 = sameHead[1];
        error_1 = error_2;
        sampleCount_1 = sampleCount_2;
        current_1 = current_2;
        consumed_1 = consumed_2;
        quantile_1 = quantile_2;
        rest_1 = rest_2;
        continue;
      }
      case "Some": {
        const prevError = Math.abs(desired - current_1.value);
        if (candError < prevError) {
          error_2 = error_1;
          sampleCount_2 = sampleCount_1;
          current_2 = head$1(rest_1);
          consumed_2 = candConsumed;
          quantile_2 = quantile_1;
          rest_2 = sameHead[1];
          error_1 = error_2;
          sampleCount_1 = sampleCount_2;
          current_1 = current_2;
          consumed_1 = consumed_2;
          quantile_1 = quantile_2;
          rest_1 = rest_2;
          continue;
        }
        return {
          quantile: quantile_1,
          value: some(current_1.value),
          consumed: consumed_1,
          rest: rest_1
        };
      }
    }
  }
  throw new Error("BUG: MetricHook.resolveQuantiles - please report an issue at https://github.com/Effect-TS/io/issues");
};
const MetricPairSymbolKey = "@effect/io/Metric/Pair";
const MetricPairTypeId = /* @__PURE__ */ Symbol.for(MetricPairSymbolKey);
const metricPairVariance = {
  _Type: (_) => _
};
const unsafeMake = (metricKey, metricState) => {
  return {
    [MetricPairTypeId]: metricPairVariance,
    metricKey,
    metricState,
    pipe() {
      return pipeArguments(this, arguments);
    }
  };
};
var _a$2;
const MetricRegistrySymbolKey = "@effect/io/Metric/Registry";
const MetricRegistryTypeId = /* @__PURE__ */ Symbol.for(MetricRegistrySymbolKey);
class MetricRegistryImpl {
  constructor() {
    this[_a$2] = MetricRegistryTypeId;
    this.map = empty$1();
  }
  snapshot() {
    const result = [];
    for (const [key, hook] of this.map) {
      result.push(unsafeMake(key, hook.get()));
    }
    return fromIterable(result);
  }
  get(key) {
    const hook = getOrUndefined(get(key)(this.map));
    if (hook == null) {
      if (isCounterKey(key.keyType)) {
        return this.getCounter(key);
      }
      if (isGaugeKey(key.keyType)) {
        return this.getGauge(key);
      }
      if (isFrequencyKey(key.keyType)) {
        return this.getFrequency(key);
      }
      if (isHistogramKey(key.keyType)) {
        return this.getHistogram(key);
      }
      if (isSummaryKey(key.keyType)) {
        return this.getSummary(key);
      }
      throw new Error("BUG: MetricRegistry.get - unknown MetricKeyType - please report an issue at https://github.com/Effect-TS/io/issues");
    } else {
      return hook;
    }
  }
  getCounter(key) {
    let value = getOrUndefined(get(key)(this.map));
    if (value == null) {
      const counter2 = counter$1();
      if (!has(key)(this.map)) {
        set(key, counter2)(this.map);
      }
      value = counter2;
    }
    return value;
  }
  getFrequency(key) {
    let value = getOrUndefined(get(key)(this.map));
    if (value == null) {
      const frequency$12 = frequency();
      if (!has(key)(this.map)) {
        set(key, frequency$12)(this.map);
      }
      value = frequency$12;
    }
    return value;
  }
  getGauge(key) {
    let value = getOrUndefined(get(key)(this.map));
    if (value == null) {
      const gauge$12 = gauge(key, 0);
      if (!has(key)(this.map)) {
        set(key, gauge$12)(this.map);
      }
      value = gauge$12;
    }
    return value;
  }
  getHistogram(key) {
    let value = getOrUndefined(get(key)(this.map));
    if (value == null) {
      const histogram2 = histogram$1(key);
      if (!has(key)(this.map)) {
        set(key, histogram2)(this.map);
      }
      value = histogram2;
    }
    return value;
  }
  getSummary(key) {
    let value = getOrUndefined(get(key)(this.map));
    if (value == null) {
      const summary$12 = summary(key);
      if (!has(key)(this.map)) {
        set(key, summary$12)(this.map);
      }
      value = summary$12;
    }
    return value;
  }
}
_a$2 = MetricRegistryTypeId;
const make$2 = () => {
  return new MetricRegistryImpl();
};
const MetricSymbolKey = "@effect/io/Metric";
const MetricTypeId = /* @__PURE__ */ Symbol.for(MetricSymbolKey);
const metricVariance = {
  _Type: (_) => _,
  _In: (_) => _,
  _Out: (_) => _
};
const globalMetricRegistry = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/io/Metric/globalMetricRegistry"), () => make$2());
const make$1 = function(keyType, unsafeUpdate, unsafeValue) {
  const metric = Object.assign((effect) => tap(effect, (a) => sync(() => unsafeUpdate(a, empty$9()))), {
    [MetricTypeId]: metricVariance,
    keyType,
    unsafeUpdate,
    unsafeValue,
    pipe() {
      return pipeArguments(this, arguments);
    }
  });
  return metric;
};
const counter = (name, description) => fromMetricKey(counter$3(name, description));
const fromMetricKey = (key) => {
  const hook = (extraTags) => {
    const fullKey = taggedWithLabelSet(extraTags)(key);
    return globalMetricRegistry.get(fullKey);
  };
  return make$1(key.keyType, (input, extraTags) => hook(extraTags).update(input), (extraTags) => hook(extraTags).get());
};
const histogram = (name, boundaries, description) => fromMetricKey(histogram$3(name, boundaries, description));
const complete = /* @__PURE__ */ dual(2, (self, result) => fiberRefGetWith(currentRequestMap, (map2) => sync(() => {
  if (map2.has(self)) {
    const entry = map2.get(self);
    if (!entry.state.completed) {
      entry.state.completed = true;
      deferredUnsafeDone(entry.result, result);
    }
  }
})));
var _a$1, _b$1, _d;
const SupervisorSymbolKey = "@effect/io/Supervisor";
const SupervisorTypeId = /* @__PURE__ */ Symbol.for(SupervisorSymbolKey);
const supervisorVariance = {
  _T: (_) => _
};
class ProxySupervisor {
  constructor(underlying, value0) {
    this.underlying = underlying;
    this.value0 = value0;
    this[_a$1] = supervisorVariance;
  }
  value() {
    return this.value0();
  }
  onStart(context, effect, parent2, fiber) {
    this.underlying.onStart(context, effect, parent2, fiber);
  }
  onEnd(value, fiber) {
    this.underlying.onEnd(value, fiber);
  }
  onEffect(fiber, effect) {
    this.underlying.onEffect(fiber, effect);
  }
  onSuspend(fiber) {
    this.underlying.onSuspend(fiber);
  }
  onResume(fiber) {
    this.underlying.onResume(fiber);
  }
  map(f) {
    return new ProxySupervisor(this, () => map(f)(this.value()));
  }
  zip(right2) {
    return new Zip(this, right2);
  }
  onRun(execution, fiber) {
    return this.underlying.onRun(execution, fiber);
  }
}
_a$1 = SupervisorTypeId;
class Zip {
  constructor(left2, right2) {
    this.left = left2;
    this.right = right2;
    this[_b$1] = supervisorVariance;
  }
  value() {
    return zip(this.left.value(), this.right.value());
  }
  onStart(context, effect, parent2, fiber) {
    this.left.onStart(context, effect, parent2, fiber);
    this.right.onStart(context, effect, parent2, fiber);
  }
  onEnd(value, fiber) {
    this.left.onEnd(value, fiber);
    this.right.onEnd(value, fiber);
  }
  onEffect(fiber, effect) {
    this.left.onEffect(fiber, effect);
    this.right.onEffect(fiber, effect);
  }
  onSuspend(fiber) {
    this.left.onSuspend(fiber);
    this.right.onSuspend(fiber);
  }
  onResume(fiber) {
    this.left.onResume(fiber);
    this.right.onResume(fiber);
  }
  map(f) {
    return new ProxySupervisor(this, () => map(f)(this.value()));
  }
  zip(right2) {
    return new Zip(this, right2);
  }
  onRun(execution, fiber) {
    return this.right.onRun(() => this.left.onRun(execution, fiber), fiber);
  }
}
_b$1 = SupervisorTypeId;
class Const {
  constructor(effect) {
    this.effect = effect;
    this[_d] = supervisorVariance;
  }
  value() {
    return this.effect;
  }
  onStart(_context, _effect, _parent, _fiber) {
  }
  onEnd(_value, _fiber) {
  }
  onEffect(_fiber, _effect) {
  }
  onSuspend(_fiber) {
  }
  onResume(_fiber) {
  }
  map(f) {
    return new ProxySupervisor(this, () => map(f)(this.value()));
  }
  zip(right2) {
    return new Zip(this, right2);
  }
  onRun(execution, _fiber) {
    return execution();
  }
}
_d = SupervisorTypeId;
const fromEffect = (effect) => {
  return new Const(effect);
};
const none = /* @__PURE__ */ fromEffect(unit);
const OP_EMPTY = "Empty";
const OP_ADD_SUPERVISOR = "AddSupervisor";
const OP_REMOVE_SUPERVISOR = "RemoveSupervisor";
const OP_AND_THEN = "AndThen";
const empty = {
  _tag: OP_EMPTY
};
const combine = (self, that) => {
  return {
    _tag: OP_AND_THEN,
    first: self,
    second: that
  };
};
const patch = (self, supervisor) => {
  return patchLoop(supervisor, of$1(self));
};
const patchLoop = (_supervisor, _patches) => {
  let supervisor = _supervisor;
  let patches = _patches;
  while (isNonEmpty(patches)) {
    const head2 = headNonEmpty(patches);
    switch (head2._tag) {
      case OP_EMPTY: {
        patches = tailNonEmpty(patches);
        break;
      }
      case OP_ADD_SUPERVISOR: {
        supervisor = supervisor.zip(head2.supervisor);
        patches = tailNonEmpty(patches);
        break;
      }
      case OP_REMOVE_SUPERVISOR: {
        supervisor = removeSupervisor(supervisor, head2.supervisor);
        patches = tailNonEmpty(patches);
        break;
      }
      case OP_AND_THEN: {
        patches = prepend$1(head2.first)(prepend$1(head2.second)(tailNonEmpty(patches)));
        break;
      }
    }
  }
  return supervisor;
};
const removeSupervisor = (self, that) => {
  if (equals$1(self, that)) {
    return none;
  } else {
    if (self instanceof Zip) {
      return removeSupervisor(self.left, that).zip(removeSupervisor(self.right, that));
    } else {
      return self;
    }
  }
};
const toSet = (self) => {
  if (equals$1(self, none)) {
    return empty$9();
  } else {
    if (self instanceof Zip) {
      return union(toSet(self.right))(toSet(self.left));
    } else {
      return make$d(self);
    }
  }
};
const diff = (oldValue, newValue) => {
  if (equals$1(oldValue, newValue)) {
    return empty;
  }
  const oldSupervisors = toSet(oldValue);
  const newSupervisors = toSet(newValue);
  const added = reduce$2(empty, (patch2, supervisor) => combine(patch2, {
    _tag: OP_ADD_SUPERVISOR,
    supervisor
  }))(difference(oldSupervisors)(newSupervisors));
  const removed = reduce$2(empty, (patch2, supervisor) => combine(patch2, {
    _tag: OP_REMOVE_SUPERVISOR,
    supervisor
  }))(difference(newSupervisors)(oldSupervisors));
  return combine(added, removed);
};
const differ = /* @__PURE__ */ make$b({
  empty,
  patch,
  combine,
  diff
});
var _a, _b;
const fiberStarted = /* @__PURE__ */ counter("effect_fiber_started");
const fiberActive = /* @__PURE__ */ counter("effect_fiber_active");
const fiberSuccesses = /* @__PURE__ */ counter("effect_fiber_successes");
const fiberFailures = /* @__PURE__ */ counter("effect_fiber_failures");
const fiberLifetimes = /* @__PURE__ */ histogram("effect_fiber_lifetimes", /* @__PURE__ */ exponential({
  start: 1,
  factor: 2,
  count: 100
}));
const EvaluationSignalContinue = "Continue";
const EvaluationSignalDone = "Done";
const EvaluationSignalYieldNow = "Yield";
const runtimeFiberVariance = {
  _E: (_) => _,
  _A: (_) => _
};
const absurd = (_) => {
  throw new Error(`BUG: FiberRuntime - ${JSON.stringify(_)} - please report an issue at https://github.com/Effect-TS/io/issues`);
};
const contOpSuccess = {
  [OP_ON_SUCCESS]: (_, cont, value) => {
    return cont.i1(value);
  },
  ["OnStep"]: (_, cont, value) => {
    return cont.i1(exitSucceed(value));
  },
  [OP_ON_SUCCESS_AND_FAILURE]: (_, cont, value) => {
    return cont.i2(value);
  },
  [OP_REVERT_FLAGS]: (self, cont, value) => {
    self.patchRuntimeFlags(self._runtimeFlags, cont.patch);
    if (interruptible$1(self._runtimeFlags) && self.isInterrupted()) {
      return exitFailCause(self.getInterruptedCause());
    } else {
      return exitSucceed(value);
    }
  },
  [OP_WHILE]: (self, cont, value) => {
    cont.i2(value);
    if (cont.i0()) {
      self.pushStack(cont);
      return cont.i1();
    } else {
      return unit;
    }
  }
};
const drainQueueWhileRunningTable = {
  [OP_INTERRUPT_SIGNAL]: (self, runtimeFlags, cur, message) => {
    self.processNewInterruptSignal(message.cause);
    return interruptible$1(runtimeFlags) ? exitFailCause(message.cause) : cur;
  },
  [OP_RESUME]: (_self, _runtimeFlags, _cur, _message) => {
    throw new Error("It is illegal to have multiple concurrent run loops in a single fiber");
  },
  [OP_STATEFUL]: (self, runtimeFlags, cur, message) => {
    message.onFiber(self, running(runtimeFlags));
    return cur;
  },
  [OP_YIELD_NOW]: (_self, _runtimeFlags, cur, _message) => {
    return flatMap$1(yieldNow$1(), () => cur);
  }
};
const runBlockedRequests = (self) => forEachSequentialDiscard(flatten(self), (requestsByRequestResolver) => forEachParUnboundedDiscard(sequentialCollectionToChunk(requestsByRequestResolver), ([dataSource, sequential2]) => {
  const map2 = /* @__PURE__ */ new Map();
  for (const block of sequential2) {
    for (const entry of block) {
      map2.set(entry.request, entry);
    }
  }
  return fiberRefLocally(invokeWithInterrupt(dataSource.runAll(sequential2), sequential2.flat()), currentRequestMap, map2);
}, false));
class FiberRuntime {
  pipe() {
    return pipeArguments(this, arguments);
  }
  constructor(fiberId2, fiberRefs0, runtimeFlags0) {
    this[_a] = fiberVariance;
    this[_b] = runtimeFiberVariance;
    this._queue = new Array();
    this._children = null;
    this._observers = new Array();
    this._running = false;
    this._stack = [];
    this._asyncInterruptor = null;
    this._asyncBlockingOn = null;
    this._exitValue = null;
    this._steps = [false];
    this.run = () => {
      this.drainQueueOnCurrentThread();
    };
    this._runtimeFlags = runtimeFlags0;
    this._fiberId = fiberId2;
    this._fiberRefs = fiberRefs0;
    this._supervisor = this.getFiberRef(currentSupervisor);
    if (runtimeMetrics(runtimeFlags0)) {
      const tags = this.getFiberRef(currentMetricLabels);
      fiberStarted.unsafeUpdate(1, tags);
      fiberActive.unsafeUpdate(1, tags);
    }
  }
  /**
   * The identity of the fiber.
   */
  id() {
    return this._fiberId;
  }
  /**
   * Begins execution of the effect associated with this fiber on in the
   * background. This can be called to "kick off" execution of a fiber after
   * it has been created.
   */
  resume(effect) {
    this.tell(resume(effect));
  }
  /**
   * The status of the fiber.
   */
  status() {
    return this.ask((_, status) => status);
  }
  /**
   * Gets the fiber runtime flags.
   */
  runtimeFlags() {
    return this.ask((state, status) => {
      if (isDone(status)) {
        return state._runtimeFlags;
      }
      return status.runtimeFlags;
    });
  }
  /**
   * Returns the current `FiberScope` for the fiber.
   */
  scope() {
    return unsafeMake$1(this);
  }
  /**
   * Retrieves the immediate children of the fiber.
   */
  children() {
    return this.ask((fiber) => Array.from(fiber.getChildren()));
  }
  /**
   * Gets the fiber's set of children.
   */
  getChildren() {
    if (this._children === null) {
      this._children = /* @__PURE__ */ new Set();
    }
    return this._children;
  }
  /**
   * Retrieves the interrupted cause of the fiber, which will be `Cause.empty`
   * if the fiber has not been interrupted.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  getInterruptedCause() {
    return this.getFiberRef(currentInterruptedCause);
  }
  /**
   * Retrieves the whole set of fiber refs.
   */
  fiberRefs() {
    return this.ask((fiber) => fiber.unsafeGetFiberRefs());
  }
  /**
   * Returns an effect that will contain information computed from the fiber
   * state and status while running on the fiber.
   *
   * This allows the outside world to interact safely with mutable fiber state
   * without locks or immutable data.
   */
  ask(f) {
    return suspend(() => {
      const deferred = deferredUnsafeMake(this._fiberId);
      this.tell(stateful((fiber, status) => {
        deferredUnsafeDone(deferred, sync(() => f(fiber, status)));
      }));
      return deferredAwait(deferred);
    });
  }
  /**
   * Adds a message to be processed by the fiber on the fiber.
   */
  tell(message) {
    this._queue.push(message);
    if (!this._running) {
      this._running = true;
      this.drainQueueLaterOnExecutor();
    }
  }
  await() {
    return asyncInterrupt((resume2) => {
      const cb = (exit2) => resume2(succeed(exit2));
      this.tell(stateful((fiber, _) => {
        if (fiber._exitValue !== null) {
          cb(this._exitValue);
        } else {
          fiber.unsafeAddObserver(cb);
        }
      }));
      return sync(() => this.tell(stateful((fiber, _) => {
        fiber.unsafeRemoveObserver(cb);
      })));
    }, this.id());
  }
  inheritAll() {
    return withFiberRuntime((parentFiber, parentStatus) => {
      const parentFiberId = parentFiber.id();
      const parentFiberRefs = parentFiber.unsafeGetFiberRefs();
      const parentRuntimeFlags = parentStatus.runtimeFlags;
      const childFiberRefs = this.unsafeGetFiberRefs();
      const updatedFiberRefs = joinAs(parentFiberRefs, parentFiberId, childFiberRefs);
      parentFiber.setFiberRefs(updatedFiberRefs);
      const updatedRuntimeFlags = parentFiber.getFiberRef(currentRuntimeFlags);
      const patch2 = exclude(WindDown)(
        // Do not inherit WindDown or Interruption!
        exclude(Interruption)(diff$1(parentRuntimeFlags, updatedRuntimeFlags))
      );
      return updateRuntimeFlags(patch2);
    });
  }
  /**
   * Tentatively observes the fiber, but returns immediately if it is not
   * already done.
   */
  poll() {
    return sync(() => fromNullable(this._exitValue));
  }
  /**
   * Unsafely observes the fiber, but returns immediately if it is not
   * already done.
   */
  unsafePoll() {
    return this._exitValue;
  }
  /**
   * In the background, interrupts the fiber as if interrupted from the specified fiber.
   */
  interruptAsFork(fiberId2) {
    return sync(() => this.tell(interruptSignal(interrupt(fiberId2))));
  }
  /**
   * Adds an observer to the list of observers.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  unsafeAddObserver(observer) {
    if (this._exitValue !== null) {
      observer(this._exitValue);
    } else {
      this._observers.push(observer);
    }
  }
  /**
   * Removes the specified observer from the list of observers that will be
   * notified when the fiber exits.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  unsafeRemoveObserver(observer) {
    this._observers = this._observers.filter((o) => o !== observer);
  }
  /**
   * Retrieves all fiber refs of the fiber.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  unsafeGetFiberRefs() {
    this.setFiberRef(currentRuntimeFlags, this._runtimeFlags);
    return this._fiberRefs;
  }
  /**
   * Deletes the specified fiber ref.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  unsafeDeleteFiberRef(fiberRef) {
    this._fiberRefs = delete_(this._fiberRefs, fiberRef);
  }
  /**
   * Retrieves the state of the fiber ref, or else its initial value.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  getFiberRef(fiberRef) {
    if (this._fiberRefs.locals.has(fiberRef)) {
      return this._fiberRefs.locals.get(fiberRef)[0][1];
    }
    return fiberRef.initial;
  }
  /**
   * Sets the fiber ref to the specified value.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  setFiberRef(fiberRef, value) {
    this._fiberRefs = updatedAs$1(this._fiberRefs, {
      fiberId: this._fiberId,
      fiberRef,
      value
    });
    if (fiberRef === currentSupervisor) {
      this._supervisor = value;
    }
  }
  /**
   * Wholesale replaces all fiber refs of this fiber.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  setFiberRefs(fiberRefs) {
    this._fiberRefs = fiberRefs;
    this._supervisor = this.getFiberRef(currentSupervisor);
  }
  /**
   * Adds a reference to the specified fiber inside the children set.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  addChild(child) {
    this.getChildren().add(child);
  }
  /**
   * Removes a reference to the specified fiber inside the children set.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  removeChild(child) {
    this.getChildren().delete(child);
  }
  /**
   * On the current thread, executes all messages in the fiber's inbox. This
   * method may return before all work is done, in the event the fiber executes
   * an asynchronous operation.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  drainQueueOnCurrentThread() {
    let recurse = true;
    while (recurse) {
      let evaluationSignal = EvaluationSignalContinue;
      const prev2 = globalThis[currentFiberURI];
      globalThis[currentFiberURI] = this;
      try {
        while (evaluationSignal === EvaluationSignalContinue) {
          evaluationSignal = this._queue.length === 0 ? EvaluationSignalDone : this.evaluateMessageWhileSuspended(this._queue.splice(0, 1)[0]);
        }
      } finally {
        this._running = false;
        globalThis[currentFiberURI] = prev2;
      }
      if (this._queue.length > 0 && !this._running) {
        this._running = true;
        if (evaluationSignal === EvaluationSignalYieldNow) {
          this.drainQueueLaterOnExecutor();
          recurse = false;
        } else {
          recurse = true;
        }
      } else {
        recurse = false;
      }
    }
  }
  /**
   * Schedules the execution of all messages in the fiber's inbox.
   *
   * This method will return immediately after the scheduling
   * operation is completed, but potentially before such messages have been
   * executed.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  drainQueueLaterOnExecutor() {
    this.getFiberRef(currentScheduler).scheduleTask(this.run, this.getFiberRef(currentSchedulingPriority));
  }
  /**
   * Drains the fiber's message queue while the fiber is actively running,
   * returning the next effect to execute, which may be the input effect if no
   * additional effect needs to be executed.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  drainQueueWhileRunning(runtimeFlags, cur0) {
    let cur = cur0;
    while (this._queue.length > 0) {
      const message = this._queue.splice(0, 1)[0];
      cur = drainQueueWhileRunningTable[message._tag](this, runtimeFlags, cur, message);
    }
    return cur;
  }
  /**
   * Determines if the fiber is interrupted.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  isInterrupted() {
    return !isEmpty(this.getFiberRef(currentInterruptedCause));
  }
  /**
   * Adds an interruptor to the set of interruptors that are interrupting this
   * fiber.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  addInterruptedCause(cause) {
    const oldSC = this.getFiberRef(currentInterruptedCause);
    this.setFiberRef(currentInterruptedCause, sequential(oldSC, cause));
  }
  /**
   * Processes a new incoming interrupt signal.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  processNewInterruptSignal(cause) {
    this.addInterruptedCause(cause);
    this.sendInterruptSignalToAllChildren();
  }
  /**
   * Interrupts all children of the current fiber, returning an effect that will
   * await the exit of the children. This method will return null if the fiber
   * has no children.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  sendInterruptSignalToAllChildren() {
    if (this._children === null || this._children.size === 0) {
      return false;
    }
    let told = false;
    for (const child of this._children) {
      child.tell(interruptSignal(interrupt(this.id())));
      told = true;
    }
    return told;
  }
  /**
   * Interrupts all children of the current fiber, returning an effect that will
   * await the exit of the children. This method will return null if the fiber
   * has no children.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  interruptAllChildren() {
    if (this.sendInterruptSignalToAllChildren()) {
      const it = this._children.values();
      this._children = null;
      let isDone2 = false;
      const body = () => {
        const next2 = it.next();
        if (!next2.done) {
          return asUnit(next2.value.await());
        } else {
          return sync(() => {
            isDone2 = true;
          });
        }
      };
      return whileLoop({
        while: () => !isDone2,
        body,
        step: () => {
        }
      });
    }
    return null;
  }
  reportExitValue(exit2) {
    if (runtimeMetrics(this._runtimeFlags)) {
      const tags = this.getFiberRef(currentMetricLabels);
      fiberActive.unsafeUpdate(-1, tags);
      switch (exit2._tag) {
        case OP_SUCCESS: {
          fiberSuccesses.unsafeUpdate(1, tags);
          break;
        }
        case OP_FAILURE: {
          fiberFailures.unsafeUpdate(1, tags);
          break;
        }
      }
    }
    if (exit2._tag === "Failure") {
      const level = this.getFiberRef(currentUnhandledErrorLogLevel);
      if (!isInterruptedOnly(exit2.cause) && level._tag === "Some") {
        this.log("Fiber terminated with a non handled error", exit2.cause, level);
      }
    }
  }
  setExitValue(exit2) {
    this._exitValue = exit2;
    if (runtimeMetrics(this._runtimeFlags)) {
      const tags = this.getFiberRef(currentMetricLabels);
      const startTimeMillis = this.id().startTimeMillis;
      const endTimeMillis = (/* @__PURE__ */ new Date()).getTime();
      fiberLifetimes.unsafeUpdate((endTimeMillis - startTimeMillis) / 1e3, tags);
    }
    this.reportExitValue(exit2);
    for (let i = this._observers.length - 1; i >= 0; i--) {
      this._observers[i](exit2);
    }
  }
  getLoggers() {
    return this.getFiberRef(currentLoggers);
  }
  log(message, cause, overrideLogLevel) {
    const logLevel = isSome(overrideLogLevel) ? overrideLogLevel.value : this.getFiberRef(currentLogLevel);
    const minimumLogLevel = this.getFiberRef(currentMinimumLogLevel);
    if (greaterThan(minimumLogLevel, logLevel)) {
      return;
    }
    const spans = this.getFiberRef(currentLogSpan);
    const annotations = this.getFiberRef(currentLogAnnotations);
    const loggers = this.getLoggers();
    const contextMap = this.unsafeGetFiberRefs();
    if (size(loggers) > 0) {
      const clockService = get$7(this.getFiberRef(currentServices), clockTag);
      const date = new Date(clockService.unsafeCurrentTimeMillis());
      for (const logger of loggers) {
        logger.log({
          fiberId: this.id(),
          logLevel,
          message,
          cause,
          context: contextMap,
          spans,
          annotations,
          date
        });
      }
    }
  }
  /**
   * Evaluates a single message on the current thread, while the fiber is
   * suspended. This method should only be called while evaluation of the
   * fiber's effect is suspended due to an asynchronous operation.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  evaluateMessageWhileSuspended(message) {
    switch (message._tag) {
      case OP_YIELD_NOW: {
        return EvaluationSignalYieldNow;
      }
      case OP_INTERRUPT_SIGNAL: {
        this.processNewInterruptSignal(message.cause);
        if (this._asyncInterruptor !== null) {
          this._asyncInterruptor(exitFailCause(message.cause));
          this._asyncInterruptor = null;
        }
        return EvaluationSignalContinue;
      }
      case OP_RESUME: {
        this._asyncInterruptor = null;
        this._asyncBlockingOn = null;
        this.evaluateEffect(message.effect);
        return EvaluationSignalContinue;
      }
      case OP_STATEFUL: {
        message.onFiber(this, this._exitValue !== null ? done : suspended(this._runtimeFlags, this._asyncBlockingOn));
        return EvaluationSignalContinue;
      }
      default: {
        return absurd(message);
      }
    }
  }
  /**
   * Evaluates an effect until completion, potentially asynchronously.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  evaluateEffect(effect0) {
    this._supervisor.onResume(this);
    try {
      let effect = interruptible$1(this._runtimeFlags) && this.isInterrupted() ? exitFailCause(this.getInterruptedCause()) : effect0;
      while (effect !== null) {
        try {
          const eff = effect;
          const exit2 = this.runLoop(eff);
          this._runtimeFlags = enable$1(WindDown)(this._runtimeFlags);
          const interruption2 = this.interruptAllChildren();
          if (interruption2 !== null) {
            effect = flatMap$1(interruption2, () => exit2);
          } else {
            if (this._queue.length === 0) {
              this.setExitValue(exit2);
            } else {
              this.tell(resume(exit2));
            }
            effect = null;
          }
        } catch (e) {
          if (isEffect(e)) {
            if (e._tag === OP_YIELD) {
              if (cooperativeYielding(this._runtimeFlags)) {
                this.tell(yieldNow());
                this.tell(resume(exitUnit));
                effect = null;
              } else {
                effect = exitUnit;
              }
            } else if (e._tag === OP_ASYNC) {
              effect = null;
            }
          } else {
            throw e;
          }
        }
      }
    } finally {
      this._supervisor.onSuspend(this);
    }
  }
  /**
   * Begins execution of the effect associated with this fiber on the current
   * thread. This can be called to "kick off" execution of a fiber after it has
   * been created, in hopes that the effect can be executed synchronously.
   *
   * This is not the normal way of starting a fiber, but it is useful when the
   * express goal of executing the fiber is to synchronously produce its exit.
   */
  start(effect) {
    if (!this._running) {
      this._running = true;
      const prev2 = globalThis[currentFiberURI];
      globalThis[currentFiberURI] = this;
      try {
        this.evaluateEffect(effect);
      } finally {
        this._running = false;
        globalThis[currentFiberURI] = prev2;
        if (this._queue.length > 0) {
          this.drainQueueLaterOnExecutor();
        }
      }
    } else {
      this.tell(resume(effect));
    }
  }
  /**
   * Begins execution of the effect associated with this fiber on in the
   * background, and on the correct thread pool. This can be called to "kick
   * off" execution of a fiber after it has been created, in hopes that the
   * effect can be executed synchronously.
   */
  startFork(effect) {
    this.tell(resume(effect));
  }
  /**
   * Takes the current runtime flags, patches them to return the new runtime
   * flags, and then makes any changes necessary to fiber state based on the
   * specified patch.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  patchRuntimeFlags(oldRuntimeFlags, patch2) {
    const newRuntimeFlags = patch$2(oldRuntimeFlags, patch2);
    globalThis[currentFiberURI] = this;
    this._runtimeFlags = newRuntimeFlags;
    return newRuntimeFlags;
  }
  /**
   * Initiates an asynchronous operation, by building a callback that will
   * resume execution, and then feeding that callback to the registration
   * function, handling error cases and repeated resumptions appropriately.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  initiateAsync(runtimeFlags, asyncRegister) {
    let alreadyCalled = false;
    const callback = (effect) => {
      if (!alreadyCalled) {
        alreadyCalled = true;
        this.tell(resume(effect));
      }
    };
    if (interruptible$1(runtimeFlags)) {
      this._asyncInterruptor = callback;
    }
    try {
      asyncRegister(callback);
    } catch (e) {
      callback(failCause(die(e)));
    }
  }
  pushStack(cont) {
    this._stack.push(cont);
    if (cont._tag === "OnStep") {
      this._steps.push(true);
    }
    if (cont._tag === "RevertFlags") {
      this._steps.push(false);
    }
  }
  popStack() {
    const item = this._stack.pop();
    if (item) {
      if (item._tag === "OnStep" || item._tag === "RevertFlags") {
        this._steps.pop();
      }
      return item;
    }
    return;
  }
  getNextSuccessCont() {
    let frame = this.popStack();
    while (frame) {
      if (frame._tag !== OP_ON_FAILURE) {
        return frame;
      }
      frame = this.popStack();
    }
  }
  getNextFailCont() {
    let frame = this.popStack();
    while (frame) {
      if (frame._tag !== OP_ON_SUCCESS && frame._tag !== OP_WHILE) {
        return frame;
      }
      frame = this.popStack();
    }
  }
  [(_a = FiberTypeId, _b = RuntimeFiberTypeId, OP_TAG)](op) {
    return map(fiberRefGet(currentContext), (context) => {
      try {
        return unsafeGet$2(context, op);
      } catch (e) {
        console.log(e);
        throw e;
      }
    });
  }
  ["Left"](op) {
    return exitFail(op.i0);
  }
  ["None"](_) {
    return exitFail(NoSuchElementException());
  }
  ["Right"](op) {
    return exitSucceed(op.i0);
  }
  ["Some"](op) {
    return exitSucceed(op.i0);
  }
  [OP_SYNC](op) {
    const value = op.i0();
    const cont = this.getNextSuccessCont();
    if (cont !== void 0) {
      if (!(cont._tag in contOpSuccess)) {
        absurd(cont);
      }
      return contOpSuccess[cont._tag](this, cont, value);
    } else {
      throw exitSucceed(value);
    }
  }
  [OP_SUCCESS](op) {
    const oldCur = op;
    const cont = this.getNextSuccessCont();
    if (cont !== void 0) {
      if (!(cont._tag in contOpSuccess)) {
        absurd(cont);
      }
      return contOpSuccess[cont._tag](this, cont, oldCur.i0);
    } else {
      throw oldCur;
    }
  }
  [OP_FAILURE](op) {
    const cause = op.i0;
    const cont = this.getNextFailCont();
    if (cont !== void 0) {
      switch (cont._tag) {
        case OP_ON_FAILURE:
        case OP_ON_SUCCESS_AND_FAILURE: {
          if (!(interruptible$1(this._runtimeFlags) && this.isInterrupted())) {
            return cont.i1(cause);
          } else {
            return exitFailCause(stripFailures(cause));
          }
        }
        case "OnStep": {
          if (!(interruptible$1(this._runtimeFlags) && this.isInterrupted())) {
            return cont.i1(exitFailCause(cause));
          } else {
            return exitFailCause(stripFailures(cause));
          }
        }
        case OP_REVERT_FLAGS: {
          this.patchRuntimeFlags(this._runtimeFlags, cont.patch);
          if (interruptible$1(this._runtimeFlags) && this.isInterrupted()) {
            return exitFailCause(sequential(cause, this.getInterruptedCause()));
          } else {
            return exitFailCause(cause);
          }
        }
        default: {
          absurd(cont);
        }
      }
    } else {
      throw exitFailCause(cause);
    }
  }
  [OP_WITH_RUNTIME](op) {
    return op.i0(this, running(this._runtimeFlags));
  }
  ["Blocked"](op) {
    if (this._steps[this._steps.length - 1]) {
      const nextOp = this.popStack();
      if (nextOp) {
        switch (nextOp._tag) {
          case "OnStep": {
            return nextOp.i1(op);
          }
          case "OnSuccess": {
            return blocked(op.i0, flatMap$1(op.i1, nextOp.i1));
          }
          case "OnSuccessAndFailure": {
            return blocked(op.i0, matchCauseEffect(op.i1, {
              onFailure: nextOp.i1,
              onSuccess: nextOp.i2
            }));
          }
          case "OnFailure": {
            return blocked(op.i0, catchAllCause(op.i1, nextOp.i1));
          }
          case "While": {
            return blocked(op.i0, flatMap$1(op.i1, (a) => {
              nextOp.i2(a);
              if (nextOp.i0()) {
                return whileLoop({
                  while: nextOp.i0,
                  body: nextOp.i1,
                  step: nextOp.i2
                });
              }
              return unit;
            }));
          }
          case "RevertFlags": {
            this.pushStack(nextOp);
            break;
          }
        }
      }
    }
    return uninterruptibleMask((restore) => flatMap$1(fork(runRequestBlock(op.i0)), () => restore(op.i1)));
  }
  ["RunBlocked"](op) {
    return runBlockedRequests(op.i0);
  }
  [OP_UPDATE_RUNTIME_FLAGS](op) {
    const updateFlags = op.i0;
    const oldRuntimeFlags = this._runtimeFlags;
    const newRuntimeFlags = patch$2(oldRuntimeFlags, updateFlags);
    if (interruptible$1(newRuntimeFlags) && this.isInterrupted()) {
      return exitFailCause(this.getInterruptedCause());
    } else {
      this.patchRuntimeFlags(this._runtimeFlags, updateFlags);
      if (op.i1) {
        const revertFlags = diff$1(newRuntimeFlags, oldRuntimeFlags);
        this.pushStack(new RevertFlags(revertFlags, op));
        return op.i1(oldRuntimeFlags);
      } else {
        return exitUnit;
      }
    }
  }
  [OP_ON_SUCCESS](op) {
    this.pushStack(op);
    return op.i0;
  }
  ["OnStep"](op) {
    this.pushStack(op);
    return op.i0;
  }
  [OP_ON_FAILURE](op) {
    this.pushStack(op);
    return op.i0;
  }
  [OP_ON_SUCCESS_AND_FAILURE](op) {
    this.pushStack(op);
    return op.i0;
  }
  [OP_ASYNC](op) {
    this._asyncBlockingOn = op.i1;
    this.initiateAsync(this._runtimeFlags, op.i0);
    throw op;
  }
  [OP_YIELD](op) {
    throw op;
  }
  [OP_WHILE](op) {
    const check = op.i0;
    const body = op.i1;
    if (check()) {
      this.pushStack(op);
      return body();
    } else {
      return exitUnit;
    }
  }
  [OP_COMMIT](op) {
    return op.commit();
  }
  /**
   * The main run-loop for evaluating effects.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  runLoop(effect0) {
    let cur = effect0;
    let ops = 0;
    while (true) {
      if ((this._runtimeFlags & OpSupervision) !== 0) {
        this._supervisor.onEffect(this, cur);
      }
      if (this._queue.length > 0) {
        cur = this.drainQueueWhileRunning(this._runtimeFlags, cur);
      }
      ops += 1;
      if (ops >= this.getFiberRef(currentMaxFiberOps)) {
        ops = 0;
        const oldCur = cur;
        cur = flatMap$1(yieldNow$1(), () => oldCur);
      }
      try {
        if (!(cur._tag in this)) {
          if (typeof cur === "function") {
            console.log(cur());
          }
          absurd(cur);
        }
        cur = this._supervisor.onRun(
          // @ts-expect-error
          () => this[cur._tag](cur),
          this
        );
      } catch (e) {
        if (isEffect(e)) {
          if (e._tag === OP_YIELD || e._tag === OP_ASYNC) {
            throw e;
          }
          if (e._tag === OP_SUCCESS || e._tag === OP_FAILURE) {
            return e;
          }
        } else {
          if (isEffectError(e)) {
            cur = exitFailCause(e.cause);
          } else if (isInterruptedException(e)) {
            cur = exitFailCause(sequential(die(e), interrupt(none$2)));
          } else {
            cur = exitFailCause(die(e));
          }
        }
      }
    }
  }
}
const currentMinimumLogLevel = /* @__PURE__ */ fiberRefUnsafeMake(/* @__PURE__ */ fromLiteral("Info"));
const defaultLogger = /* @__PURE__ */ makeLogger((options2) => {
  const formatted = stringLogger.log(options2);
  globalThis.console.log(formatted);
});
const tracerLogger = /* @__PURE__ */ makeLogger(({
  annotations,
  cause,
  context,
  fiberId: fiberId2,
  logLevel,
  message
}) => {
  const span = flatMap$3(get$1(context, currentTracerSpan), head);
  const clockService = map$5(get$1(context, currentServices), (_) => get$7(_, clockTag));
  if (span._tag === "None" || clockService._tag === "None") {
    return;
  }
  const attributes2 = Object.fromEntries(annotations);
  attributes2["effect.fiberId"] = threadName(fiberId2);
  attributes2["effect.logLevel"] = logLevel.label;
  if (cause !== null && cause !== empty$3) {
    attributes2["effect.cause"] = pretty(cause);
  }
  span.value.event(message, clockService.value.unsafeCurrentTimeNanos(), attributes2);
});
const currentLoggers = /* @__PURE__ */ fiberRefUnsafeMakeHashSet(/* @__PURE__ */ make$d(defaultLogger, tracerLogger));
const forEachParUnbounded = (self, f, batching) => suspend(() => {
  const as2 = fromIterable$5(self);
  const array2 = new Array(as2.length);
  const fn = (a, i) => flatMap$1(f(a, i), (b) => sync(() => array2[i] = b));
  return zipRight(forEachParUnboundedDiscard(as2, fn, batching), succeed(array2));
});
const forEachParUnboundedDiscard = (self, f, batching) => suspend(() => {
  const as2 = fromIterable$5(self);
  const size2 = as2.length;
  if (size2 === 0) {
    return unit;
  } else if (size2 === 1) {
    return asUnit(f(as2[0], 0));
  }
  return uninterruptibleMask((restore) => {
    const deferred = deferredUnsafeMake(none$2);
    let ref = 0;
    const residual = [];
    const process2 = transplant((graft) => forEachSequential(as2, (a, i) => forkDaemon(graft(flatMap$1((exit2) => {
      switch (exit2._tag) {
        case "Failure": {
          if (residual.length > 0) {
            const requests = residual.map((blocked2) => blocked2.i0).reduce(par);
            const _continue = forEachParUnboundedDiscard(residual, (blocked2) => blocked2.i1, batching);
            return blocked(requests, matchCauseEffect(_continue, {
              onFailure: (cause) => zipRight(deferredFail(deferred, void 0), failCause(parallel(cause, exit2.cause))),
              onSuccess: () => zipRight(deferredFail(deferred, void 0), failCause(exit2.cause))
            }));
          }
          return zipRight(deferredFail(deferred, void 0), failCause(exit2.cause));
        }
        default: {
          if (exit2._tag === "Blocked") {
            residual.push(exit2);
          }
          if (ref + 1 === size2) {
            if (residual.length > 0) {
              const requests = residual.map((blocked2) => blocked2.i0).reduce(par);
              const _continue = forEachParUnboundedDiscard(residual, (blocked2) => blocked2.i1, batching);
              return deferredSucceed(deferred, blocked(requests, _continue));
            } else {
              deferredUnsafeDone(deferred, exitSucceed(exitUnit));
            }
          } else {
            ref = ref + 1;
          }
          return unit;
        }
      }
    })(suspend(() => restore((batching ? step : exit$1)(f(a, i)))))))));
    return flatMap$1(process2, (fibers) => matchCauseEffect(restore(deferredAwait(deferred)), {
      onFailure: (cause) => flatMap$1(forEachParUnbounded(fibers, interruptFiber, batching), (exits) => {
        const exit2 = exitCollectAll(exits, {
          parallel: true
        });
        if (exit2._tag === "Some" && exitIsFailure(exit2.value)) {
          return failCause(parallel(stripFailures(cause), exit2.value.i0));
        } else {
          return failCause(stripFailures(cause));
        }
      }),
      onSuccess: (rest) => flatMap$1(rest, () => forEachSequentialDiscard(fibers, (f2) => f2.inheritAll()))
    }));
  });
});
const fork = (self) => withFiberRuntime((state, status) => succeed(unsafeFork$1(self, state, status.runtimeFlags)));
const forkDaemon = (self) => forkWithScopeOverride(self, globalScope);
const unsafeFork$1 = (effect, parentFiber, parentRuntimeFlags, overrideScope = null) => {
  const childFiber = unsafeMakeChildFiber(effect, parentFiber, parentRuntimeFlags, overrideScope);
  childFiber.resume(effect);
  return childFiber;
};
const unsafeMakeChildFiber = (effect, parentFiber, parentRuntimeFlags, overrideScope = null) => {
  const childId = unsafeMake$4();
  const parentFiberRefs = parentFiber.unsafeGetFiberRefs();
  const childFiberRefs = forkAs$1(parentFiberRefs, childId);
  const childFiber = new FiberRuntime(childId, childFiberRefs, parentRuntimeFlags);
  const childContext = getOrDefault(childFiberRefs, currentContext);
  const supervisor = childFiber._supervisor;
  supervisor.onStart(childContext, effect, some(parentFiber), childFiber);
  childFiber.unsafeAddObserver((exit2) => supervisor.onEnd(exit2, childFiber));
  const parentScope = overrideScope !== null ? overrideScope : getOrElse(() => parentFiber.scope())(parentFiber.getFiberRef(currentForkScopeOverride));
  parentScope.add(parentRuntimeFlags, childFiber);
  return childFiber;
};
const forkWithScopeOverride = (self, scopeOverride) => withFiberRuntime((parentFiber, parentStatus) => succeed(unsafeFork$1(self, parentFiber, parentStatus.runtimeFlags, scopeOverride)));
const fiberRefUnsafeMakeSupervisor = (initial) => fiberRefUnsafeMakePatch(initial, {
  differ,
  fork: empty
});
const currentRuntimeFlags = /* @__PURE__ */ fiberRefUnsafeMakeRuntimeFlags(none$1);
const currentSupervisor = /* @__PURE__ */ fiberRefUnsafeMakeSupervisor(none);
const invokeWithInterrupt = (dataSource, all) => fiberIdWith((id) => flatMap$1(flatMap$1(forkDaemon(interruptible(dataSource)), (processing) => asyncInterrupt((cb) => {
  const counts = all.map((_) => _.listeners.count);
  const checkDone = () => {
    if (counts.every((count) => count === 0)) {
      cleanup.forEach((f) => f());
      cb(interruptFiber(processing));
    }
  };
  processing.unsafeAddObserver((exit2) => {
    cleanup.forEach((f) => f());
    cb(exit2);
  });
  const cleanup = all.map((r, i) => {
    const observer = (count) => {
      counts[i] = count;
      checkDone();
    };
    r.listeners.addObserver(observer);
    return () => r.listeners.removeObserver(observer);
  });
  checkDone();
  return sync(() => {
    cleanup.forEach((f) => f());
  });
})), () => suspend(() => {
  const residual = all.flatMap((entry) => {
    if (!entry.state.completed) {
      return [entry];
    }
    return [];
  });
  return forEachSequentialDiscard(residual, (entry) => complete(entry.request, exitInterrupt(id)));
})));
const unsafeFork = (runtime) => (self, options2) => {
  const fiberId2 = unsafeMake$4();
  const effect = self;
  let fiberRefs = updatedAs(runtime.fiberRefs, {
    fiberId: fiberId2,
    fiberRef: currentContext,
    value: runtime.context
  });
  if (options2?.scheduler) {
    fiberRefs = updatedAs(fiberRefs, {
      fiberId: fiberId2,
      fiberRef: currentScheduler,
      value: options2.scheduler
    });
  }
  if (options2?.updateRefs) {
    fiberRefs = options2.updateRefs(fiberRefs, fiberId2);
  }
  const fiberRuntime = new FiberRuntime(fiberId2, forkAs(fiberRefs, fiberId2), runtime.runtimeFlags);
  const supervisor = fiberRuntime._supervisor;
  if (supervisor !== none) {
    supervisor.onStart(runtime.context, effect, none$4(), fiberRuntime);
    fiberRuntime.unsafeAddObserver((exit2) => supervisor.onEnd(exit2, fiberRuntime));
  }
  globalScope.add(runtime.runtimeFlags, fiberRuntime);
  fiberRuntime.start(effect);
  return fiberRuntime;
};
const FiberFailureId = /* @__PURE__ */ Symbol.for("@effect/io/Runtime/FiberFailure");
const FiberFailureCauseId = /* @__PURE__ */ Symbol.for("@effect/io/Runtime/FiberFailure/Cause");
const NodePrint = /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom");
const fiberFailure = (cause) => {
  const limit = Error.stackTraceLimit;
  Error.stackTraceLimit = 0;
  const error = new Error();
  Error.stackTraceLimit = limit;
  const pretty$1 = prettyErrors(cause);
  if (pretty$1.length > 0) {
    error.name = pretty$1[0].message.split(":")[0];
    error.message = pretty$1[0].message.substring(error.name.length + 2);
    error.stack = `${error.name}: ${error.message}
${pretty$1[0].stack}`;
  }
  error[FiberFailureId] = FiberFailureId;
  error[FiberFailureCauseId] = cause;
  error.toString = () => {
    return pretty(cause);
  };
  error[NodePrint] = () => {
    return error.toString();
  };
  return error;
};
const unsafeRunPromise = (runtime) => (effect) => new Promise((resolve, reject) => {
  unsafeFork(runtime)(effect).unsafeAddObserver((result) => {
    switch (result._tag) {
      case OP_SUCCESS: {
        resolve(result.i0);
        break;
      }
      case OP_FAILURE: {
        reject(fiberFailure(result.i0));
        break;
      }
    }
  });
});
class RuntimeImpl {
  constructor(context, runtimeFlags, fiberRefs) {
    this.context = context;
    this.runtimeFlags = runtimeFlags;
    this.fiberRefs = fiberRefs;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const make = (options2) => new RuntimeImpl(options2.context, options2.flags, options2.fiberRefs);
const defaultRuntimeFlags = /* @__PURE__ */ make$8(Interruption, CooperativeYielding, RuntimeMetrics);
const defaultRuntime = /* @__PURE__ */ make({
  context: /* @__PURE__ */ empty$h(),
  flags: defaultRuntimeFlags,
  fiberRefs: /* @__PURE__ */ unsafeMake$2(/* @__PURE__ */ new Map())
});
const unsafeRunPromiseEffect = /* @__PURE__ */ unsafeRunPromise(defaultRuntime);
const gen = gen$1;
const tryPromise = tryPromise$1;
const exit = exit$1;
const flatMap = flatMap$1;
const runPromise = unsafeRunPromiseEffect;
class ModuleLoadError {
  constructor(module) {
    this.module = module;
    this._tag = "ModuleLoadError";
  }
}
const vite_client_regex = /<script type="module" src="\/@vite\/client"><\/script>/g;
async function render(view_name, props = {}) {
  const possible_entries = [
    view_name,
    `${view_name}.html`,
    `${view_name}/index.html`
  ];
  const program = gen(function* (_) {
    const module = yield* _(findFirst(possible_entries, (_2) => _2 in views), flatMap((entry) => {
      return tryPromise({
        try: () => views[entry](),
        catch: () => new ModuleLoadError(`Unable to load module ${entry} for ${view_name}`)
      });
    }), exit);
    if (isFailure(module)) {
      return options.templates.error({
        status: 500,
        message: "View not found"
      });
    }
    const ssr = module.value.render(props);
    const document = load(ssr.html);
    const head2 = document("head");
    if (ssr.css.code)
      head2.append(`<style>${ssr.css.code}</style>`);
    if (ssr.head) {
      let new_head = ssr.head;
      if (vite_client_regex.test(ssr.head)) {
        new_head = new_head.replace(vite_client_regex, (_2) => "");
        new_head += '<script type="module" src="/@vite/client"><\/script>';
      }
      head2.append(new_head);
    }
    console.log(ssr.head);
    return document.html();
  });
  const html2 = await runPromise(program);
  return new Response(html2, { headers: { "Content-Type": "text/html" } });
}
const app = new Hono2();
app.get("/", (ctx) => ctx.html('Go to <a href="/about">About</a>'));
app.get("/main", async (ctx) => render("main", {}));
app.get("/home", async (ctx) => render("home/home.html", {}));
app.get("/about", async (ctx) => render("about", {}));
app.get("/sample", async (ctx) => {
  return render("about", {});
});

export { app as default };
//# sourceMappingURL=index.js.map
