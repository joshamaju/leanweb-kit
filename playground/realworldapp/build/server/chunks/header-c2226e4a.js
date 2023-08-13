import { c as create_ssr_component, e as escape, a as add_attribute } from './ssr-32dfd25c.js';

const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { user } = $$props;
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  return `<nav class="navbar navbar-light"><div class="container"><a class="navbar-brand" href="/">conduit</a> <ul class="nav navbar-nav pull-xs-right"><li class="nav-item"><a class="nav-link" href="/">Home</a></li> ${user ? `<li class="nav-item"><a class="nav-link" href="/editor"><i class="ion-compose"></i> New Article</a></li>` : ``} ${user ? `<li class="nav-item"><a class="nav-link" href="/settings"><i class="ion-gear-a"></i> Settings</a></li>` : ``} ${!user ? `<li class="nav-item"><a class="nav-link" href="/login">Sign in</a></li>` : ``} ${!user ? `<li class="nav-item"><a class="nav-link" href="/register">Sign up</a></li>` : ``} ${user ? `<li class="nav-item"><a class="nav-link" href="${"/profile/" + escape(user.username, true)}"><img${add_attribute("src", user.image, 0)} class="user-pic"${add_attribute("alt", user.username, 0)}> ${escape(user.username)}</a></li>` : ``}</ul></div></nav>`;
});

export { Header as default };
//# sourceMappingURL=header-c2226e4a.js.map
