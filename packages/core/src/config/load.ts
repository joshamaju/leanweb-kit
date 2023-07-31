import * as fs from "node:fs";
import * as url from "node:url";
import { ValidatedConfig } from "./schema.js";
import { DEV } from "esm-env";

// @ts-expect-error
console.log(import.meta.env);

const defaultErrorTemplate = /* html */ `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>%sveltekit.error.message%</title>

        ${DEV ? '<script type="module" src="/@vite/client"></script>' : ""}
        
        <style>
            body {
                --bg: white;
                --fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
					Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
        </style>
	</head>
	<body>
		<div class="error">
			<span class="status">%sveltekit.status%</span>
			<div class="message">
				<h1>%sveltekit.error.message%</h1>
			</div>
		</div>
	</body>
</html>
`;

export function load_error_page(config: ValidatedConfig) {
  let { errorTemplate } = config.files;

  // Don't do this inside resolving the config, because that would mean
  // adding/removing error.html isn't detected and would require a restart.
  if (!fs.existsSync(config.files.errorTemplate)) {
    return defaultErrorTemplate;
  }

  return fs.readFileSync(errorTemplate, "utf-8");
}
