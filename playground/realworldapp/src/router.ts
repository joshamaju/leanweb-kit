import { Hono } from "hono";

import * as Http from "http-kit";
import * as Fetch from "http-kit/fetch";

import * as Effect from "@effect/io/Effect";
import * as Either from "@effect/data/Either";
import * as O from "@effect/data/Option";
import { constNull, pipe } from "@effect/data/Function";

import { render } from "core/runtime";

import { withApiUrl } from "./common/base-url.js";
import {
  getArticle,
  getArticles,
  getPersonalFeed,
} from "./core/services/article.js";
import { getPopularTags } from "./core/services/tag.js";
import { login, register } from "./core/services/auth.js";
import { getCookie, setCookie } from "hono/cookie";
import { Tab } from "./views/types/tab.js";
import { withAuthToken } from "./common/with-token.js";
import type { User } from "./core/models/user.js";
import { getProfile } from "./core/services/profile.js";

type Variables = {
  user: User | null;
};

const app = new Hono<{ Variables: Variables }>();

app.use("*", (ctx, next) => {
  const cookie = pipe(
    O.fromNullable(getCookie(ctx, "auth")),
    O.match({ onNone: constNull, onSome: (_) => JSON.parse(_) })
  );

  ctx.set("user", cookie);

  return next();
});

app.get("/login", () => render("login"));

app.post("/login", async (ctx) => {
  const form = await ctx.req.formData();

  const data = await pipe(
    login(Object.fromEntries(form) as any),
    Http.provide(Fetch.adapter, withApiUrl),
    Effect.either,
    Effect.runPromise
  );

  let errors = pipe(
    data,
    Either.match({
      onLeft: (e) => {
        return "errors" in e
          ? e.errors
          : { unknown: ["An unknown error occurred"] };
      },
      onRight: constNull,
    })
  );

  if (Either.isRight(data)) {
    setCookie(ctx, "auth", JSON.stringify(data.right.user));
    return ctx.redirect("/");
  }

  return render("login", { errors });
});

app.get("/register", () => render("register"));

app.post("/register", async (ctx) => {
  const form = await ctx.req.formData();

  const data = await pipe(
    register(Object.fromEntries(form) as any),
    Http.provide(Fetch.adapter, withApiUrl),
    Effect.either,
    Effect.runPromise
  );

  let errors = pipe(
    data,
    Either.match({
      onLeft: (e) => {
        return "errors" in e
          ? e.errors
          : { unknown: ["An unknown error occurred"] };
      },
      onRight: constNull,
    })
  );

  // console.log(Object.fromEntries(form), data, errors);

  if (Either.isRight(data)) {
    setCookie(ctx, "auth", JSON.stringify(data.right.user));
    return ctx.redirect("/");
  }

  return render("register", { errors });
});

app.get("/editor/:slug?", async (ctx) => {
  const slug = ctx.req.param("slug");

  const user = ctx.get("user");

  let article = {
    body: "",
    title: "",
    tagList: [],
    description: "",
  };

  if (slug) {
    // @ts-expect-error
    article = await pipe(
      getArticle(slug),
      Effect.map((_) => _.article),
      Http.provide(Fetch.adapter, withApiUrl),
      Effect.runPromise
    );
  }

  // const n = pipe(
  //   slug ? pipe(getArticle(slug), Http.provide(Fetch.adapter, withApiUrl)) : a,
  //   // Effect.either,
  //   Effect.runPromise
  // );

  return render("editor", { user, article });
});

app.post("/editor", async (ctx) => {
  const form = await ctx.req.formData();

  return render("editor", {
    article: {
      body: "",
      title: "",
      tagList: [],
      description: "",
    },
  });
});

app.get("/settings", (ctx) => render("settings", { user: ctx.get("user") }));

app.post("/settings", (ctx) => render("settings", { user: ctx.get("user") }));

app.get('/post/@/:title{[a-z]+}', async (ctx) => {
  const user = ctx.get("user");

  console.log('profile', ctx.req.param())

  if (!user) return ctx.redirect("/login");

  // const data = await pipe(
  //   getProfile(ctx.req.param('user')),
  //   Effect.map((_) => _.),
  //   Http.provide(Fetch.adapter, withApiUrl, withAuthToken(user?.token)),
  //   Effect.runPromise
  // );

  return render("profile", { user });
});

app.get("/", async (ctx) => {
  const url = new URL(ctx.req.url);

  const search = url.searchParams;

  const tag = search.get("tag");

  let user = ctx.get("user");

  if (!user) {
    return ctx.redirect("/login");
  }

  const tab = pipe(
    O.fromNullable(search.get("tab")),
    O.getOrElse(() => (user ? Tab.Personal : Tab.Global))
  );

  const page = pipe(
    O.fromNullable(search.get("page")),
    O.map(parseFloat),
    O.getOrElse(() => 1)
  );

  const articles = pipe(
    tab === Tab.Personal
      ? getPersonalFeed({ offset: (page - 1) * 10 })
      : tab === Tab.Global
      ? getArticles({ offset: (page - 1) * 10 })
      : getArticles({ offset: (page - 1) * 10, tag })
  );

  const tags = pipe(
    getPopularTags(),
    Effect.map((_) => _.tags)
  );

  const data = await pipe(
    Effect.all({ articles, tags }),
    Http.provide(Fetch.adapter, withApiUrl, withAuthToken(user.token)),
    Effect.runPromise
  );

  return render("home/index.html", {
    ...data.articles,
    tab: tag ? "tag" : tab,
    tags: data.tags,
    activeTag: tag,
    user,
  });
});

app.get("/articles/:slug", async (ctx) => {
  const data = await pipe(
    getArticle(ctx.req.param("slug")),
    Http.provide(Fetch.adapter, withApiUrl),
    Effect.runPromise
  );

  const user = ctx.get("user");

  return render("article", { ...data, user });
});

app.showRoutes()

export default app;
