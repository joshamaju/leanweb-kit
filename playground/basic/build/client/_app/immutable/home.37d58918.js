import"./chunks/modulepreload-polyfill.3cfb730f.js";function z(o,r){for(var e=0;e<r.length;e++){var t=r[e];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(o,t.key,t)}}function $(o,r,e){return r&&z(o.prototype,r),e&&z(o,e),o}function R(){return(R=Object.assign||function(o){for(var r=1;r<arguments.length;r++){var e=arguments[r];for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(o[t]=e[t])}return o}).apply(this,arguments)}function B(o,r){o.prototype=Object.create(r.prototype),o.prototype.constructor=o,o.__proto__=r}function G(o){return(G=Object.setPrototypeOf?Object.getPrototypeOf:function(r){return r.__proto__||Object.getPrototypeOf(r)})(o)}function F(o,r){return(F=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(o,r)}function Q(o,r,e){return(Q=function(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch{return!1}}()?Reflect.construct:function(t,n,i){var s=[null];s.push.apply(s,n);var c=new(Function.bind.apply(t,s));return i&&F(c,i.prototype),c}).apply(null,arguments)}function V(o){var r=typeof Map=="function"?new Map:void 0;return(V=function(e){if(e===null||Function.toString.call(e).indexOf("[native code]")===-1)return e;if(typeof e!="function")throw new TypeError("Super expression must either be null or a function");if(r!==void 0){if(r.has(e))return r.get(e);r.set(e,t)}function t(){return Q(e,arguments,G(this).constructor)}return t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),F(t,e)})(o)}function q(o,r){try{var e=o()}catch(t){return r(t)}return e&&e.then?e.then(void 0,r):e}typeof Symbol<"u"&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),typeof Symbol<"u"&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));var A,ae="2.9.7",ue=function(){};(function(o){o[o.off=0]="off",o[o.error=1]="error",o[o.warning=2]="warning",o[o.info=3]="info",o[o.debug=4]="debug"})(A||(A={}));var Y=A.off,O=function(){function o(e){this.t=e}o.getLevel=function(){return Y},o.setLevel=function(e){return Y=A[e]};var r=o.prototype;return r.error=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];this.i(console.error,A.error,t)},r.warn=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];this.i(console.warn,A.warning,t)},r.info=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];this.i(console.info,A.info,t)},r.debug=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];this.i(console.log,A.debug,t)},r.i=function(e,t,n){t<=o.getLevel()&&e.apply(console,["["+this.t+"] "].concat(n))},o}(),S=X,ce=Z,he=W,fe=ee,le=te,J="/",pe=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");function W(o,r){for(var e,t=[],n=0,i=0,s="",c=r&&r.delimiter||J,h=r&&r.whitelist||void 0,a=!1;(e=pe.exec(o))!==null;){var u=e[0],p=e[1],f=e.index;if(s+=o.slice(i,f),i=f+u.length,p)s+=p[1],a=!0;else{var l="",v=e[2],d=e[3],w=e[4],g=e[5];if(!a&&s.length){var P=s.length-1,E=s[P];(!h||h.indexOf(E)>-1)&&(l=E,s=s.slice(0,P))}s&&(t.push(s),s="",a=!1);var y=d||w,m=l||c;t.push({name:v||n++,prefix:l,delimiter:m,optional:g==="?"||g==="*",repeat:g==="+"||g==="*",pattern:y?ve(y):"[^"+k(m===c?m:m+c)+"]+?"})}}return(s||i<o.length)&&t.push(s+o.substr(i)),t}function Z(o,r){return function(e,t){var n=o.exec(e);if(!n)return!1;for(var i=n[0],s=n.index,c={},h=t&&t.decode||decodeURIComponent,a=1;a<n.length;a++)if(n[a]!==void 0){var u=r[a-1];c[u.name]=u.repeat?n[a].split(u.delimiter).map(function(p){return h(p,u)}):h(n[a],u)}return{path:i,index:s,params:c}}}function ee(o,r){for(var e=new Array(o.length),t=0;t<o.length;t++)typeof o[t]=="object"&&(e[t]=new RegExp("^(?:"+o[t].pattern+")$",K(r)));return function(n,i){for(var s="",c=i&&i.encode||encodeURIComponent,h=!i||i.validate!==!1,a=0;a<o.length;a++){var u=o[a];if(typeof u!="string"){var p,f=n?n[u.name]:void 0;if(Array.isArray(f)){if(!u.repeat)throw new TypeError('Expected "'+u.name+'" to not repeat, but got array');if(f.length===0){if(u.optional)continue;throw new TypeError('Expected "'+u.name+'" to not be empty')}for(var l=0;l<f.length;l++){if(p=c(f[l],u),h&&!e[a].test(p))throw new TypeError('Expected all "'+u.name+'" to match "'+u.pattern+'"');s+=(l===0?u.prefix:u.delimiter)+p}}else if(typeof f!="string"&&typeof f!="number"&&typeof f!="boolean"){if(!u.optional)throw new TypeError('Expected "'+u.name+'" to be '+(u.repeat?"an array":"a string"))}else{if(p=c(String(f),u),h&&!e[a].test(p))throw new TypeError('Expected "'+u.name+'" to match "'+u.pattern+'", but got "'+p+'"');s+=u.prefix+p}}else s+=u}return s}}function k(o){return o.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function ve(o){return o.replace(/([=!:$/()])/g,"\\$1")}function K(o){return o&&o.sensitive?"":"i"}function te(o,r,e){for(var t=(e=e||{}).strict,n=e.start!==!1,i=e.end!==!1,s=e.delimiter||J,c=[].concat(e.endsWith||[]).map(k).concat("$").join("|"),h=n?"^":"",a=0;a<o.length;a++){var u=o[a];if(typeof u=="string")h+=k(u);else{var p=u.repeat?"(?:"+u.pattern+")(?:"+k(u.delimiter)+"(?:"+u.pattern+"))*":u.pattern;r&&r.push(u),h+=u.optional?u.prefix?"(?:"+k(u.prefix)+"("+p+"))?":"("+p+")?":k(u.prefix)+"("+p+")"}}if(i)t||(h+="(?:"+k(s)+")?"),h+=c==="$"?"$":"(?="+c+")";else{var f=o[o.length-1],l=typeof f=="string"?f[f.length-1]===s:f===void 0;t||(h+="(?:"+k(s)+"(?="+c+"))?"),l||(h+="(?="+k(s)+"|"+c+")")}return new RegExp(h,K(e))}function X(o,r,e){return o instanceof RegExp?function(t,n){if(!n)return t;var i=t.source.match(/\((?!\?)/g);if(i)for(var s=0;s<i.length;s++)n.push({name:s,prefix:null,delimiter:null,optional:!1,repeat:!1,pattern:null});return t}(o,r):Array.isArray(o)?function(t,n,i){for(var s=[],c=0;c<t.length;c++)s.push(X(t[c],n,i).source);return new RegExp("(?:"+s.join("|")+")",K(i))}(o,r,e):function(t,n,i){return te(W(t,i),n,i)}(o,r,e)}S.match=function(o,r){var e=[];return Z(X(o,e,r),e)},S.regexpToFunction=ce,S.parse=he,S.compile=function(o,r){return ee(W(o,r),r)},S.tokensToFunction=fe,S.tokensToRegExp=le;var b={container:"container",history:"history",namespace:"namespace",prefix:"data-barba",prevent:"prevent",wrapper:"wrapper"},L=new(function(){function o(){this.o=b,this.u=new DOMParser}var r=o.prototype;return r.toString=function(e){return e.outerHTML},r.toDocument=function(e){return this.u.parseFromString(e,"text/html")},r.toElement=function(e){var t=document.createElement("div");return t.innerHTML=e,t},r.getHtml=function(e){return e===void 0&&(e=document),this.toString(e.documentElement)},r.getWrapper=function(e){return e===void 0&&(e=document),e.querySelector("["+this.o.prefix+'="'+this.o.wrapper+'"]')},r.getContainer=function(e){return e===void 0&&(e=document),e.querySelector("["+this.o.prefix+'="'+this.o.container+'"]')},r.removeContainer=function(e){document.body.contains(e)&&e.parentNode.removeChild(e)},r.addContainer=function(e,t){var n=this.getContainer();n?this.s(e,n):t.appendChild(e)},r.getNamespace=function(e){e===void 0&&(e=document);var t=e.querySelector("["+this.o.prefix+"-"+this.o.namespace+"]");return t?t.getAttribute(this.o.prefix+"-"+this.o.namespace):null},r.getHref=function(e){if(e.tagName&&e.tagName.toLowerCase()==="a"){if(typeof e.href=="string")return e.href;var t=e.getAttribute("href")||e.getAttribute("xlink:href");if(t)return this.resolveUrl(t.baseVal||t)}return null},r.resolveUrl=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var i=t.length;if(i===0)throw new Error("resolveUrl requires at least one argument; got none.");var s=document.createElement("base");if(s.href=arguments[0],i===1)return s.href;var c=document.getElementsByTagName("head")[0];c.insertBefore(s,c.firstChild);for(var h,a=document.createElement("a"),u=1;u<i;u++)a.href=arguments[u],s.href=h=a.href;return c.removeChild(s),h},r.s=function(e,t){t.parentNode.insertBefore(e,t.nextSibling)},o}()),re=new(function(){function o(){this.h=[],this.v=-1}var r=o.prototype;return r.init=function(e,t){this.l="barba";var n={ns:t,scroll:{x:window.scrollX,y:window.scrollY},url:e};this.h.push(n),this.v=0;var i={from:this.l,index:0,states:[].concat(this.h)};window.history&&window.history.replaceState(i,"",e)},r.change=function(e,t,n){if(n&&n.state){var i=n.state,s=i.index;t=this.m(this.v-s),this.replace(i.states),this.v=s}else this.add(e,t);return t},r.add=function(e,t){var n=this.size,i=this.p(t),s={ns:"tmp",scroll:{x:window.scrollX,y:window.scrollY},url:e};this.h.push(s),this.v=n;var c={from:this.l,index:n,states:[].concat(this.h)};switch(i){case"push":window.history&&window.history.pushState(c,"",e);break;case"replace":window.history&&window.history.replaceState(c,"",e)}},r.update=function(e,t){var n=t||this.v,i=R({},this.get(n),{},e);this.set(n,i)},r.remove=function(e){e?this.h.splice(e,1):this.h.pop(),this.v--},r.clear=function(){this.h=[],this.v=-1},r.replace=function(e){this.h=e},r.get=function(e){return this.h[e]},r.set=function(e,t){return this.h[e]=t},r.p=function(e){var t="push",n=e,i=b.prefix+"-"+b.history;return n.hasAttribute&&n.hasAttribute(i)&&(t=n.getAttribute(i)),t},r.m=function(e){return Math.abs(e)>1?e>0?"forward":"back":e===0?"popstate":e>0?"back":"forward"},$(o,[{key:"current",get:function(){return this.h[this.v]}},{key:"state",get:function(){return this.h[this.h.length-1]}},{key:"previous",get:function(){return this.v<1?null:this.h[this.v-1]}},{key:"size",get:function(){return this.h.length}}]),o}()),C=function(o,r){try{var e=function(){if(!r.next.html)return Promise.resolve(o).then(function(t){var n=r.next;if(t){var i=L.toElement(t);n.namespace=L.getNamespace(i),n.container=L.getContainer(i),n.html=t,re.update({ns:n.namespace});var s=L.toDocument(t);document.title=s.title}})}();return Promise.resolve(e&&e.then?e.then(function(){}):void 0)}catch(t){return Promise.reject(t)}},ne=S,de={__proto__:null,update:C,nextTick:function(){return new Promise(function(o){window.requestAnimationFrame(o)})},pathToRegexp:ne},oe=function(){return window.location.origin},M=function(o){return o===void 0&&(o=window.location.href),N(o).port},N=function(o){var r,e=o.match(/:\d+/);if(e===null)/^http/.test(o)&&(r=80),/^https/.test(o)&&(r=443);else{var t=e[0].substring(1);r=parseInt(t,10)}var n,i=o.replace(oe(),""),s={},c=i.indexOf("#");c>=0&&(n=i.slice(c+1),i=i.slice(0,c));var h=i.indexOf("?");return h>=0&&(s=ie(i.slice(h+1)),i=i.slice(0,h)),{hash:n,path:i,port:r,query:s}},ie=function(o){return o.split("&").reduce(function(r,e){var t=e.split("=");return r[t[0]]=t[1],r},{})},U=function(o){return o===void 0&&(o=window.location.href),o.replace(/(\/#.*|\/|#.*)$/,"")},me={__proto__:null,getHref:function(){return window.location.href},getOrigin:oe,getPort:M,getPath:function(o){return o===void 0&&(o=window.location.href),N(o).path},parse:N,parseQuery:ie,clean:U};function ge(o,r,e){return r===void 0&&(r=2e3),new Promise(function(t,n){var i=new XMLHttpRequest;i.onreadystatechange=function(){if(i.readyState===XMLHttpRequest.DONE){if(i.status===200)t(i.responseText);else if(i.status){var s={status:i.status,statusText:i.statusText};e(o,s),n(s)}}},i.ontimeout=function(){var s=new Error("Timeout error ["+r+"]");e(o,s),n(s)},i.onerror=function(){var s=new Error("Fetch error");e(o,s),n(s)},i.open("GET",o),i.timeout=r,i.setRequestHeader("Accept","text/html,application/xhtml+xml,application/xml"),i.setRequestHeader("x-barba","yes"),i.send()})}var ye=function(o){return!!o&&(typeof o=="object"||typeof o=="function")&&typeof o.then=="function"};function _(o,r){return r===void 0&&(r={}),function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var i=!1,s=new Promise(function(c,h){r.async=function(){return i=!0,function(u,p){u?h(u):c(p)}};var a=o.apply(r,t);i||(ye(a)?a.then(c,h):c(a))});return s}}var j=new(function(o){function r(){var t;return(t=o.call(this)||this).logger=new O("@barba/core"),t.all=["ready","page","reset","currentAdded","currentRemoved","nextAdded","nextRemoved","beforeOnce","once","afterOnce","before","beforeLeave","leave","afterLeave","beforeEnter","enter","afterEnter","after"],t.registered=new Map,t.init(),t}B(r,o);var e=r.prototype;return e.init=function(){var t=this;this.registered.clear(),this.all.forEach(function(n){t[n]||(t[n]=function(i,s){t.registered.has(n)||t.registered.set(n,new Set),t.registered.get(n).add({ctx:s||{},fn:i})})})},e.do=function(t){for(var n=this,i=arguments.length,s=new Array(i>1?i-1:0),c=1;c<i;c++)s[c-1]=arguments[c];if(this.registered.has(t)){var h=Promise.resolve();return this.registered.get(t).forEach(function(a){h=h.then(function(){return _(a.fn,a.ctx).apply(void 0,s)})}),h.catch(function(a){n.logger.debug("Hook error ["+t+"]"),n.logger.error(a)})}return Promise.resolve()},e.clear=function(){var t=this;this.all.forEach(function(n){delete t[n]}),this.init()},e.help=function(){this.logger.info("Available hooks: "+this.all.join(","));var t=[];this.registered.forEach(function(n,i){return t.push(i)}),this.logger.info("Registered hooks: "+t.join(","))},r}(ue)),se=function(){function o(r){if(this.P=[],typeof r=="boolean")this.g=r;else{var e=Array.isArray(r)?r:[r];this.P=e.map(function(t){return ne(t)})}}return o.prototype.checkHref=function(r){if(typeof this.g=="boolean")return this.g;var e=N(r).path;return this.P.some(function(t){return t.exec(e)!==null})},o}(),we=function(o){function r(t){var n;return(n=o.call(this,t)||this).k=new Map,n}B(r,o);var e=r.prototype;return e.set=function(t,n,i){return this.k.set(t,{action:i,request:n}),{action:i,request:n}},e.get=function(t){return this.k.get(t)},e.getRequest=function(t){return this.k.get(t).request},e.getAction=function(t){return this.k.get(t).action},e.has=function(t){return!this.checkHref(t)&&this.k.has(t)},e.delete=function(t){return this.k.delete(t)},e.update=function(t,n){var i=R({},this.k.get(t),{},n);return this.k.set(t,i),i},r}(se),be=function(){return!window.history.pushState},Pe=function(o){return!o.el||!o.href},Ee=function(o){var r=o.event;return r.which>1||r.metaKey||r.ctrlKey||r.shiftKey||r.altKey},xe=function(o){var r=o.el;return r.hasAttribute("target")&&r.target==="_blank"},ke=function(o){var r=o.el;return r.protocol!==void 0&&window.location.protocol!==r.protocol||r.hostname!==void 0&&window.location.hostname!==r.hostname},je=function(o){var r=o.el;return r.port!==void 0&&M()!==M(r.href)},Ae=function(o){var r=o.el;return r.getAttribute&&typeof r.getAttribute("download")=="string"},Se=function(o){return o.el.hasAttribute(b.prefix+"-"+b.prevent)},Re=function(o){return!!o.el.closest("["+b.prefix+"-"+b.prevent+'="all"]')},Oe=function(o){var r=o.href;return U(r)===U()&&M(r)===M()},Le=function(o){function r(t){var n;return(n=o.call(this,t)||this).suite=[],n.tests=new Map,n.init(),n}B(r,o);var e=r.prototype;return e.init=function(){this.add("pushState",be),this.add("exists",Pe),this.add("newTab",Ee),this.add("blank",xe),this.add("corsDomain",ke),this.add("corsPort",je),this.add("download",Ae),this.add("preventSelf",Se),this.add("preventAll",Re),this.add("sameUrl",Oe,!1)},e.add=function(t,n,i){i===void 0&&(i=!0),this.tests.set(t,n),i&&this.suite.push(t)},e.run=function(t,n,i,s){return this.tests.get(t)({el:n,event:i,href:s})},e.checkLink=function(t,n,i){var s=this;return this.suite.some(function(c){return s.run(c,t,n,i)})},r}(se),D=function(o){function r(e,t){var n;t===void 0&&(t="Barba error");for(var i=arguments.length,s=new Array(i>2?i-2:0),c=2;c<i;c++)s[c-2]=arguments[c];return(n=o.call.apply(o,[this].concat(s))||this).error=e,n.label=t,Error.captureStackTrace&&Error.captureStackTrace(function(h){if(h===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return h}(n),r),n.name="BarbaError",n}return B(r,o),r}(V(Error)),Te=function(){function o(e){e===void 0&&(e=[]),this.logger=new O("@barba/core"),this.all=[],this.page=[],this.once=[],this.A=[{name:"namespace",type:"strings"},{name:"custom",type:"function"}],e&&(this.all=this.all.concat(e)),this.update()}var r=o.prototype;return r.add=function(e,t){switch(e){case"rule":this.A.splice(t.position||0,0,t.value);break;case"transition":default:this.all.push(t)}this.update()},r.resolve=function(e,t){var n=this;t===void 0&&(t={});var i=t.once?this.once:this.page;i=i.filter(t.self?function(f){return f.name&&f.name==="self"}:function(f){return!f.name||f.name!=="self"});var s=new Map,c=i.find(function(f){var l=!0,v={};return!(!t.self||f.name!=="self")||(n.A.reverse().forEach(function(d){l&&(l=n.R(f,d,e,v),f.from&&f.to&&(l=n.R(f,d,e,v,"from")&&n.R(f,d,e,v,"to")),f.from&&!f.to&&(l=n.R(f,d,e,v,"from")),!f.from&&f.to&&(l=n.R(f,d,e,v,"to")))}),s.set(f,v),l)}),h=s.get(c),a=[];if(a.push(t.once?"once":"page"),t.self&&a.push("self"),h){var u,p=[c];Object.keys(h).length>0&&p.push(h),(u=this.logger).info.apply(u,["Transition found ["+a.join(",")+"]"].concat(p))}else this.logger.info("No transition found ["+a.join(",")+"]");return c},r.update=function(){var e=this;this.all=this.all.map(function(t){return e.T(t)}).sort(function(t,n){return t.priority-n.priority}).reverse().map(function(t){return delete t.priority,t}),this.page=this.all.filter(function(t){return t.leave!==void 0||t.enter!==void 0}),this.once=this.all.filter(function(t){return t.once!==void 0})},r.R=function(e,t,n,i,s){var c=!0,h=!1,a=e,u=t.name,p=u,f=u,l=u,v=s?a[s]:a,d=s==="to"?n.next:n.current;if(s?v&&v[u]:v[u]){switch(t.type){case"strings":default:var w=Array.isArray(v[p])?v[p]:[v[p]];d[p]&&w.indexOf(d[p])!==-1&&(h=!0),w.indexOf(d[p])===-1&&(c=!1);break;case"object":var g=Array.isArray(v[f])?v[f]:[v[f]];d[f]?(d[f].name&&g.indexOf(d[f].name)!==-1&&(h=!0),g.indexOf(d[f].name)===-1&&(c=!1)):c=!1;break;case"function":v[l](n)?h=!0:c=!1}h&&(s?(i[s]=i[s]||{},i[s][u]=a[s][u]):i[u]=a[u])}return c},r.O=function(e,t,n){var i=0;return(e[t]||e.from&&e.from[t]||e.to&&e.to[t])&&(i+=Math.pow(10,n),e.from&&e.from[t]&&(i+=1),e.to&&e.to[t]&&(i+=2)),i},r.T=function(e){var t=this;e.priority=0;var n=0;return this.A.forEach(function(i,s){n+=t.O(e,i.name,s+1)}),e.priority=n,e},o}(),qe=function(){function o(e){e===void 0&&(e=[]),this.logger=new O("@barba/core"),this.S=!1,this.store=new Te(e)}var r=o.prototype;return r.get=function(e,t){return this.store.resolve(e,t)},r.doOnce=function(e){var t=e.data,n=e.transition;try{var i=function(){s.S=!1},s=this,c=n||{};s.S=!0;var h=q(function(){return Promise.resolve(s.j("beforeOnce",t,c)).then(function(){return Promise.resolve(s.once(t,c)).then(function(){return Promise.resolve(s.j("afterOnce",t,c)).then(function(){})})})},function(a){s.S=!1,s.logger.debug("Transition error [before/after/once]"),s.logger.error(a)});return Promise.resolve(h&&h.then?h.then(i):i())}catch(a){return Promise.reject(a)}},r.doPage=function(e){var t=e.data,n=e.transition,i=e.page,s=e.wrapper;try{var c=function(l){if(h)return l;a.S=!1},h=!1,a=this,u=n||{},p=u.sync===!0||!1;a.S=!0;var f=q(function(){function l(){return Promise.resolve(a.j("before",t,u)).then(function(){var d=!1;function w(P){return d?P:Promise.resolve(a.remove(t)).then(function(){return Promise.resolve(a.j("after",t,u)).then(function(){})})}var g=function(){if(p)return q(function(){return Promise.resolve(a.add(t,s)).then(function(){return Promise.resolve(a.j("beforeLeave",t,u)).then(function(){return Promise.resolve(a.j("beforeEnter",t,u)).then(function(){return Promise.resolve(Promise.all([a.leave(t,u),a.enter(t,u)])).then(function(){return Promise.resolve(a.j("afterLeave",t,u)).then(function(){return Promise.resolve(a.j("afterEnter",t,u)).then(function(){})})})})})})},function(m){if(a.M(m))throw new D(m,"Transition error [sync]")});var P=function(m){return d?m:q(function(){var x=function(){if(E!==!1)return Promise.resolve(a.add(t,s)).then(function(){return Promise.resolve(a.j("beforeEnter",t,u)).then(function(){return Promise.resolve(a.enter(t,u,E)).then(function(){return Promise.resolve(a.j("afterEnter",t,u)).then(function(){})})})})}();if(x&&x.then)return x.then(function(){})},function(x){if(a.M(x))throw new D(x,"Transition error [before/after/enter]")})},E=!1,y=q(function(){return Promise.resolve(a.j("beforeLeave",t,u)).then(function(){return Promise.resolve(Promise.all([a.leave(t,u),C(i,t)]).then(function(m){return m[0]})).then(function(m){return E=m,Promise.resolve(a.j("afterLeave",t,u)).then(function(){})})})},function(m){if(a.M(m))throw new D(m,"Transition error [before/after/leave]")});return y&&y.then?y.then(P):P(y)}();return g&&g.then?g.then(w):w(g)})}var v=function(){if(p)return Promise.resolve(C(i,t)).then(function(){})}();return v&&v.then?v.then(l):l()},function(l){throw a.S=!1,l.name&&l.name==="BarbaError"?(a.logger.debug(l.label),a.logger.error(l.error),l):(a.logger.debug("Transition error [page]"),a.logger.error(l),l)});return Promise.resolve(f&&f.then?f.then(c):c(f))}catch(l){return Promise.reject(l)}},r.once=function(e,t){try{return Promise.resolve(j.do("once",e,t)).then(function(){return t.once?_(t.once,t)(e):Promise.resolve()})}catch(n){return Promise.reject(n)}},r.leave=function(e,t){try{return Promise.resolve(j.do("leave",e,t)).then(function(){return t.leave?_(t.leave,t)(e):Promise.resolve()})}catch(n){return Promise.reject(n)}},r.enter=function(e,t,n){try{return Promise.resolve(j.do("enter",e,t)).then(function(){return t.enter?_(t.enter,t)(e,n):Promise.resolve()})}catch(i){return Promise.reject(i)}},r.add=function(e,t){try{return L.addContainer(e.next.container,t),j.do("nextAdded",e),Promise.resolve()}catch(n){return Promise.reject(n)}},r.remove=function(e){try{return L.removeContainer(e.current.container),j.do("currentRemoved",e),Promise.resolve()}catch(t){return Promise.reject(t)}},r.M=function(e){return e.message?!/Timeout error|Fetch error/.test(e.message):!e.status},r.j=function(e,t,n){try{return Promise.resolve(j.do(e,t,n)).then(function(){return n[e]?_(n[e],n)(t):Promise.resolve()})}catch(i){return Promise.reject(i)}},$(o,[{key:"isRunning",get:function(){return this.S},set:function(e){this.S=e}},{key:"hasOnce",get:function(){return this.store.once.length>0}},{key:"hasSelf",get:function(){return this.store.all.some(function(e){return e.name==="self"})}},{key:"shouldWait",get:function(){return this.store.all.some(function(e){return e.to&&!e.to.route||e.sync})}}]),o}(),_e=function(){function o(r){var e=this;this.names=["beforeLeave","afterLeave","beforeEnter","afterEnter"],this.byNamespace=new Map,r.length!==0&&(r.forEach(function(t){e.byNamespace.set(t.namespace,t)}),this.names.forEach(function(t){j[t](e.L(t))}))}return o.prototype.L=function(r){var e=this;return function(t){var n=r.match(/enter/i)?t.next:t.current,i=e.byNamespace.get(n.namespace);return i&&i[r]?_(i[r],i)(t):Promise.resolve()}},o}();Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(o){var r=this;do{if(r.matches(o))return r;r=r.parentElement||r.parentNode}while(r!==null&&r.nodeType===1);return null});var He={container:null,html:"",namespace:"",url:{hash:"",href:"",path:"",port:null,query:{}}},Me=new(function(){function o(){this.version=ae,this.schemaPage=He,this.Logger=O,this.logger=new O("@barba/core"),this.plugins=[],this.hooks=j,this.dom=L,this.helpers=de,this.history=re,this.request=ge,this.url=me}var r=o.prototype;return r.use=function(e,t){var n=this.plugins;n.indexOf(e)>-1?this.logger.warn("Plugin ["+e.name+"] already installed."):typeof e.install=="function"?(e.install(this,t),n.push(e)):this.logger.warn("Plugin ["+e.name+'] has no "install" method.')},r.init=function(e){var t=e===void 0?{}:e,n=t.transitions,i=n===void 0?[]:n,s=t.views,c=s===void 0?[]:s,h=t.schema,a=h===void 0?b:h,u=t.requestError,p=t.timeout,f=p===void 0?2e3:p,l=t.cacheIgnore,v=l!==void 0&&l,d=t.prefetchIgnore,w=d!==void 0&&d,g=t.preventRunning,P=g!==void 0&&g,E=t.prevent,y=E===void 0?null:E,m=t.debug,x=t.logLevel;if(O.setLevel((m!==void 0&&m)===!0?"debug":x===void 0?"off":x),this.logger.info(this.version),Object.keys(a).forEach(function(H){b[H]&&(b[H]=a[H])}),this.$=u,this.timeout=f,this.cacheIgnore=v,this.prefetchIgnore=w,this.preventRunning=P,this._=this.dom.getWrapper(),!this._)throw new Error("[@barba/core] No Barba wrapper found");this._.setAttribute("aria-live","polite"),this.q();var I=this.data.current;if(!I.container)throw new Error("[@barba/core] No Barba container found");if(this.cache=new we(v),this.prevent=new Le(w),this.transitions=new qe(i),this.views=new _e(c),y!==null){if(typeof y!="function")throw new Error("[@barba/core] Prevent should be a function");this.prevent.add("preventCustom",y)}this.history.init(I.url.href,I.namespace),this.B=this.B.bind(this),this.U=this.U.bind(this),this.D=this.D.bind(this),this.F(),this.plugins.forEach(function(H){return H.init()});var T=this.data;T.trigger="barba",T.next=T.current,T.current=R({},this.schemaPage),this.hooks.do("ready",T),this.once(T),this.q()},r.destroy=function(){this.q(),this.H(),this.history.clear(),this.hooks.clear(),this.plugins=[]},r.force=function(e){window.location.assign(e)},r.go=function(e,t,n){var i;if(t===void 0&&(t="barba"),this.transitions.isRunning)this.force(e);else if(!(i=t==="popstate"?this.history.current&&this.url.getPath(this.history.current.url)===this.url.getPath(e):this.prevent.run("sameUrl",null,null,e))||this.transitions.hasSelf)return t=this.history.change(e,t,n),n&&(n.stopPropagation(),n.preventDefault()),this.page(e,t,i)},r.once=function(e){try{var t=this;return Promise.resolve(t.hooks.do("beforeEnter",e)).then(function(){function n(){return Promise.resolve(t.hooks.do("afterEnter",e)).then(function(){})}var i=function(){if(t.transitions.hasOnce){var s=t.transitions.get(e,{once:!0});return Promise.resolve(t.transitions.doOnce({transition:s,data:e})).then(function(){})}}();return i&&i.then?i.then(n):n()})}catch(n){return Promise.reject(n)}},r.page=function(e,t,n){try{var i=function(){var a=s.data;return Promise.resolve(s.hooks.do("page",a)).then(function(){var u=q(function(){var p=s.transitions.get(a,{once:!1,self:n});return Promise.resolve(s.transitions.doPage({data:a,page:c,transition:p,wrapper:s._})).then(function(){s.q()})},function(){O.getLevel()===0&&s.force(a.current.url.href)});if(u&&u.then)return u.then(function(){})})},s=this;s.data.next.url=R({href:e},s.url.parse(e)),s.data.trigger=t;var c=s.cache.has(e)?s.cache.update(e,{action:"click"}).request:s.cache.set(e,s.request(e,s.timeout,s.onRequestError.bind(s,t)),"click").request,h=function(){if(s.transitions.shouldWait)return Promise.resolve(C(c,s.data)).then(function(){})}();return Promise.resolve(h&&h.then?h.then(i):i())}catch(a){return Promise.reject(a)}},r.onRequestError=function(e){this.transitions.isRunning=!1;for(var t=arguments.length,n=new Array(t>1?t-1:0),i=1;i<t;i++)n[i-1]=arguments[i];var s=n[0],c=n[1],h=this.cache.getAction(s);return this.cache.delete(s),!(this.$&&this.$(e,h,s,c)===!1||(h==="click"&&this.force(s),1))},r.prefetch=function(e){var t=this;this.cache.has(e)||this.cache.set(e,this.request(e,this.timeout,this.onRequestError.bind(this,"barba")).catch(function(n){t.logger.error(n)}),"prefetch")},r.F=function(){this.prefetchIgnore!==!0&&(document.addEventListener("mouseover",this.B),document.addEventListener("touchstart",this.B)),document.addEventListener("click",this.U),window.addEventListener("popstate",this.D)},r.H=function(){this.prefetchIgnore!==!0&&(document.removeEventListener("mouseover",this.B),document.removeEventListener("touchstart",this.B)),document.removeEventListener("click",this.U),window.removeEventListener("popstate",this.D)},r.B=function(e){var t=this,n=this.I(e);if(n){var i=this.dom.getHref(n);this.prevent.checkHref(i)||this.cache.has(i)||this.cache.set(i,this.request(i,this.timeout,this.onRequestError.bind(this,n)).catch(function(s){t.logger.error(s)}),"enter")}},r.U=function(e){var t=this.I(e);if(t)return this.transitions.isRunning&&this.preventRunning?(e.preventDefault(),void e.stopPropagation()):void this.go(this.dom.getHref(t),t,e)},r.D=function(e){this.go(this.url.getHref(),"popstate",e)},r.I=function(e){for(var t=e.target;t&&!this.dom.getHref(t);)t=t.parentNode;if(t&&!this.prevent.checkLink(t,e,this.dom.getHref(t)))return t},r.q=function(){var e=this.url.getHref(),t={container:this.dom.getContainer(),html:this.dom.getHtml(),namespace:this.dom.getNamespace(),url:R({href:e},this.url.parse(e))};this.C={current:t,next:R({},this.schemaPage),trigger:void 0},this.hooks.do("reset",this.data)},$(o,[{key:"data",get:function(){return this.C}},{key:"wrapper",get:function(){return this._}}]),o}());Me.default.init({});console.log("Hello world");