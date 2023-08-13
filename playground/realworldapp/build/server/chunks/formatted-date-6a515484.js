import { c as create_ssr_component, e as escape } from './ssr-32dfd25c.js';

const Formatted_date = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { date } = $$props;
  const formattedDate = new Intl.DateTimeFormat(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric"
    }
  ).format(new Date(date));
  if ($$props.date === void 0 && $$bindings.date && date !== void 0)
    $$bindings.date(date);
  return `<span class="date">${escape(formattedDate)}</span>`;
});

export { Formatted_date as default };
//# sourceMappingURL=formatted-date-6a515484.js.map
