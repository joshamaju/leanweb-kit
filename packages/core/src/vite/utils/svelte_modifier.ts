type Replacement = {
  actual: string;
  placeholder: string;
};

export class SvelteModifier {
  private replacements = new Map<string, Array<Replacement>>();

  strip(code: string, filename: string) {
    return code.replace(/<script data-svelte[\s\S]*?<\/script>/g, (actual) => {
      const placeholder = `<!--${Math.random()}${Math.random()}-->`;
      const existing = this.replacements.get(filename) ?? [];
      this.replacements.set(filename, [...existing, { actual, placeholder }]);
      return placeholder;
    });
  }

  restore(code: string, filename: string) {
    const _replacements = this.replacements.get(filename);

    if (_replacements) {
      _replacements.forEach(({ actual, placeholder }) => {
        code = code.replace(placeholder, actual);
      });
    }

    return code;
  }
}
