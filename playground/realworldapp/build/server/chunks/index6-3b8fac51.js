import { c as create_ssr_component, v as validate_component, a as add_attribute, e as escape, b as each } from './ssr-32dfd25c.js';
import Layout from './layout-f1eb70a1.js';
import Header from './header-c2226e4a.js';

const Editor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { article } = $$props;
  let { user } = $$props;
  if ($$props.article === void 0 && $$bindings.article && article !== void 0)
    $$bindings.article(article);
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  return `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Header, "Header").$$render($$result, { user }, {}, {})} <div class="editor-page"><div class="container page"><div class="row"><div class="col-md-10 offset-md-1 col-xs-12"><form><fieldset><fieldset class="form-group"><input type="text"${add_attribute("value", article.title, 0)} name="articleTitle" placeholder="Article Title" class="form-control form-control-lg"></fieldset> <fieldset class="form-group"><input type="text" name="description"${add_attribute("value", article.description, 0)} class="form-control" placeholder="What's this article about?"></fieldset> <fieldset class="form-group"><textarea rows="8" class="form-control" name="body" placeholder="Write your article (in markdown)">${escape(article.body, false)}</textarea></fieldset> <fieldset class="form-group"><input type="text" name="tags" class="form-control" placeholder="Enter tags"> <div class="tag-list">${each(article.tagList, (tag) => {
        return `<span class="tag-default tag-pill"${add_attribute("key", tag, 0)}><i class="ion-close-round"></i> ${escape(tag)} </span>`;
      })}</div></fieldset> <button type="button" class="btn btn-lg pull-xs-right btn-primary">Publish Article</button></fieldset></form></div></div></div></div>`;
    }
  })}`;
});

export { Editor as default };
//# sourceMappingURL=index6-3b8fac51.js.map
