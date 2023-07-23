import { SSRComponent } from "../types/internal.js";
import { load } from "cheerio";

export function render(component: SSRComponent, props: object) {
  const ssr = component.render(props);
  const document = load(ssr.html);
  document("head").append(`<style>${ssr.css}</style>`);
  return document.html();
}
