import { c as create_ssr_component, b as each, e as escape } from './ssr-32dfd25c.js';

const Auth_errors = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { errors } = $$props;
  if ($$props.errors === void 0 && $$bindings.errors && errors !== void 0)
    $$bindings.errors(errors);
  return `<ul class="error-messages">${each(Object.entries(errors), ([field, fieldErrors]) => {
    return `${each(fieldErrors, (fieldError) => {
      return `<li>${escape(field)} ${escape(fieldError)} </li>`;
    })}`;
  })}</ul>`;
});

export { Auth_errors as default };
//# sourceMappingURL=auth-errors-e6645788.js.map
