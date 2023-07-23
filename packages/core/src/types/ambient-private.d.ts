declare global {
  const __SVELTEKIT_DEV__: boolean;
  const __SVELTEKIT_ADAPTER_NAME__: string;

  var Bun: object;
  var Deno: object;
}

export {};
