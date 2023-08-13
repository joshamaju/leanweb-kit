import { c as create_ssr_component, v as validate_component } from './ssr-32dfd25c.js';
import Field from './field-879c9503.js';
import Layout from './layout-f1eb70a1.js';
import Header from './header-c2226e4a.js';
import Auth_errors from './auth-errors-e6645788.js';

const Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { errors } = $$props;
  if ($$props.errors === void 0 && $$bindings.errors && errors !== void 0)
    $$bindings.errors(errors);
  return `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <div class="auth-page"><div class="container page"><div class="row"><div class="col-md-6 offset-md-3 col-xs-12"><h1 class="text-xs-center">Sign in</h1> <p class="text-xs-center"><a href="/register">Need an account?</a></p> ${errors ? `${validate_component(Auth_errors, "AuthErrors").$$render($$result, { errors }, {}, {})}` : ``} <form method="post" action="/login">${validate_component(Field, "Field").$$render(
        $$result,
        {
          name: "email",
          type: "text",
          placeholder: "Email"
        },
        {},
        {}
      )} ${validate_component(Field, "Field").$$render(
        $$result,
        {
          name: "password",
          type: "password",
          placeholder: "Password"
        },
        {},
        {}
      )} <button type="submit" class="btn btn-lg btn-primary pull-xs-right">Sign in</button></form></div></div></div></div>`;
    }
  })}`;
});

export { Login as default };
//# sourceMappingURL=index4-c5c699cf.js.map
