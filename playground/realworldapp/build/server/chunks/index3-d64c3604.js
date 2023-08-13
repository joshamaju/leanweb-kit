import { c as create_ssr_component, v as validate_component, a as add_attribute, e as escape, b as each } from './ssr-32dfd25c.js';
import Layout from './layout-f1eb70a1.js';
import Header from './header-c2226e4a.js';
import Pagination from './pagination-78ac9b84.js';
import Article_preview from './article-preview-4e55746b.js';
import './tag-list-bcdaf6c6.js';
import './formatted-date-6a515484.js';

const Profile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { profile } = $$props;
  let { user } = $$props;
  let { activeTab } = $$props;
  let { articles } = $$props;
  let { articlesCount } = $$props;
  const ProfileTab = {
    MyArticles: "my-articles",
    FavoritedArticles: "favorited-articles"
  };
  const isAuthor = user && profile && user.username === profile.username;
  if ($$props.profile === void 0 && $$bindings.profile && profile !== void 0)
    $$bindings.profile(profile);
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  if ($$props.activeTab === void 0 && $$bindings.activeTab && activeTab !== void 0)
    $$bindings.activeTab(activeTab);
  if ($$props.articles === void 0 && $$bindings.articles && articles !== void 0)
    $$bindings.articles(articles);
  if ($$props.articlesCount === void 0 && $$bindings.articlesCount && articlesCount !== void 0)
    $$bindings.articlesCount(articlesCount);
  return `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <div class="profile-page"><div class="user-info"><div class="container"><div class="row"><div class="col-xs-12 col-md-10 offset-md-1"><img${add_attribute("src", profile.image, 0)} class="user-img" alt="profile avatar"> <h4>${escape(profile.username)}</h4> <p>${escape(profile.bio)}</p> ${isAuthor ? `<a href="/settings" class="btn btn-sm btn-outline-secondary action-btn"><i class="ion-gear-a"></i> Edit Profile Settings</a>` : ``} ${!isAuthor ? `` : ``}</div></div></div></div> <div class="container"><div class="row"><div class="col-xs-12 col-md-10 offset-md-1"><div class="articles-toggle"><ul class="nav nav-pills outline-active"><li class="nav-item"><a class="${"nav-link " + escape(activeTab === ProfileTab.MyArticles ? "active" : "", true)}" href="${"/profile?tab=" + escape(ProfileTab.MyArticles, true)}">My Articles</a></li> <li class="nav-item"><a class="${"nav-link " + escape(
        activeTab === ProfileTab.FavoritedArticles ? "active" : "",
        true
      )}" href="${"/profile?tab=" + escape(ProfileTab.FavoritedArticles, true)}">Favorited Articles</a></li></ul></div> ${articles ? `${articles.length === 0 ? `<div>No articles are here... yet.</div>` : `${each(articles, (article) => {
        return `${validate_component(Article_preview, "ArticlePreview").$$render($$result, { article }, {}, {})}`;
      })}`} ${articlesCount > 10 ? `${validate_component(Pagination, "Pagination").$$render($$result, { count: articles.articlesCount, limit: 10 }, {}, {})}` : ``}` : ``}</div></div></div></div>`;
    }
  })}`;
});

export { Profile as default };
//# sourceMappingURL=index3-d64c3604.js.map
