import { c as create_ssr_component, b as each, e as escape } from './ssr-32dfd25c.js';

const Popular_tags = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { tags } = $$props;
  if ($$props.tags === void 0 && $$bindings.tags && tags !== void 0)
    $$bindings.tags(tags);
  return `<div class="sidebar"><p>Popular Tags</p> <div class="tag-list">${each(tags, (tag) => {
    return `<a href="${"/?tag=" + escape(tag, true)}" class="tag-pill tag-default">${escape(tag)} </a>`;
  })}</div></div>`;
});

export { Popular_tags as default };
//# sourceMappingURL=popular-tags-aa677105.js.map
