declare module "__SERVER__/internal.js" {
  export const options: import("../types/internal.js").SSROptions;

  export const views: Record<
    string,
    () => Promise<import("../types/internal.js").SSRComponent>
  >;
}
