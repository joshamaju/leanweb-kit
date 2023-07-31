import { SSRComponent } from "../types/internal.js";
import { load } from "cheerio";

export function render(component: SSRComponent, props: object) {
  const ssr = component.render(props);
  const document = load(ssr.html);

  if (ssr.css.code) document("head").append(`<style>${ssr.css.code}</style>`);

  return document.html();
}
