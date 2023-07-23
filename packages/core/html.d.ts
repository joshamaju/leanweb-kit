declare module "*.html" {
  const Component: import("./src/types/internal.ts").SSRComponent;
  export default Component;
}
