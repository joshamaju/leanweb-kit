import { c as create_ssr_component, v as validate_component, e as escape, b as each } from './ssr-32dfd25c.js';
import Popular_tags from './popular-tags-aa677105.js';
import Article_preview from './article-preview-4e55746b.js';
import Layout from './layout-f1eb70a1.js';
import Header from './header-c2226e4a.js';
import Pagination from './pagination-78ac9b84.js';
import { T as Tab } from './index-8de5e0bc.js';
import './tag-list-bcdaf6c6.js';
import './formatted-date-6a515484.js';
import 'http-kit';
import 'http-kit/fetch';
import '@effect/io/Effect';
import '@effect/data/Either';
import '@effect/data/Option';
import '@effect/data/Function';
import '@effect/data/ReadonlyArray';
import 'http-kit/request';
import 'http-kit/response';
import 'http-kit/body';
import '@effect/schema/Schema';

const Home = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { user } = $$props;
  let { tab } = $$props;
  let { tags } = $$props;
  let { activeTag } = $$props;
  let { articles } = $$props;
  let { articlesCount } = $$props;
  const personalActive = tab === Tab.Personal ? "active" : "";
  const globalActive = tab === Tab.Global ? "active" : "";
  const current = tab === Tab.Tag ? "active" : "";
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  if ($$props.tab === void 0 && $$bindings.tab && tab !== void 0)
    $$bindings.tab(tab);
  if ($$props.tags === void 0 && $$bindings.tags && tags !== void 0)
    $$bindings.tags(tags);
  if ($$props.activeTag === void 0 && $$bindings.activeTag && activeTag !== void 0)
    $$bindings.activeTag(activeTag);
  if ($$props.articles === void 0 && $$bindings.articles && articles !== void 0)
    $$bindings.articles(articles);
  if ($$props.articlesCount === void 0 && $$bindings.articlesCount && articlesCount !== void 0)
    $$bindings.articlesCount(articlesCount);
  return `${$$result.head += `${$$result.title = `<title>Home - Conduit</title>`, ""}`, ""} <!DOCTYPE html> <html lang="en"><head>${validate_component(Layout, "Layout").$$render($$result, {}, {}, {})}</head> <body>${validate_component(Header, "Header").$$render($$result, { user }, {}, {})} <div class="home-page">${!user ? `<div class="banner"><div class="container"><h1 class="logo-font">conduit</h1> <p>A place to share your knowledge.</p></div></div>` : ``} <div class="container page"><div class="row"><div class="col-md-9"><div class="feed-toggle"><ul class="nav nav-pills outline-active">${user ? `<li class="nav-item"><a href="/?tab=personal" class="${"nav-link " + escape(personalActive, true)}">Your Feed</a></li>` : ``} <li class="nav-item"><a href="/?tab=global" class="${"nav-link " + escape(globalActive, true)}">Global Feed</a></li> ${activeTag ? `<li class="nav-item"><a class="${"nav-link " + escape(current, true)}" href="${"/?tag=" + escape(activeTag, true)}">#${escape(activeTag)}</a></li>` : ``}</ul></div> ${articles ? `${articles.length === 0 ? `<div>No articles are here... yet.</div>` : `${each(articles, (article) => {
    return `${validate_component(Article_preview, "ArticlePreview").$$render($$result, { article }, {}, {})}`;
  })}`}` : ``} ${articlesCount > 10 ? `${validate_component(Pagination, "Pagination").$$render($$result, { count: articlesCount, limit: 10 }, {}, {})}` : ``}</div> <div class="col-md-3">${validate_component(Popular_tags, "PopularTags").$$render($$result, { tags }, {}, {})}</div></div></div></div></body></html>`;
});

export { Home as default };
//# sourceMappingURL=index5-236d603a.js.map
