import { VITE_CLIENT } from "./constants.js";

export const defaultErrorTemplate = /* html */ `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>%sveltekit.error.message%</title>
        
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

export const runtimeErrorTemplate = (err: {
	stack: string;
	file: string;
	message: string;
}) => /*html*/ `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Error</title>

		${VITE_CLIENT}

		<style>
			html, body {
				margin: 0;
				height: 100%;
				line-height: 1.5;
			}

			body {
				background-color: #222;
			}

			:root {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: 99999;
				--monospace: 'SFMono-Regular', Consolas,
				'Liberation Mono', Menlo, Courier, monospace;
				--red: #ff5555;
				--yellow: #e2aa53;
				--purple: #cfa4ff;
				--cyan: #2dd9da;
				--dim: #c9c9c9;

				--window-background: #181818;
				--window-color: #d8d8d8;
			}

			.window {
				font-family: var(--monospace);
				line-height: 1.5;
				width: 800px;
				color: var(--window-color);
				margin: 30px auto;
				padding: 25px 40px;
				position: relative;
				background: var(--window-background);
				border-radius: 6px 6px 8px 8px;
				box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
				overflow: hidden;
				border-top: 8px solid var(--red);
				direction: ltr;
				text-align: left;
			}

			pre {
				font-family: var(--monospace);
				font-size: 16px;
				margin-top: 0;
				margin-bottom: 1em;
				overflow-x: scroll;
				scrollbar-width: none;
			}

			pre::-webkit-scrollbar {
				display: none;
			}

			.message {
				line-height: 1.3;
				font-weight: 600;
				white-space: pre-wrap;
			}

			.message-body {
				color: var(--red);
			}

			.file {
				color: var(--cyan);
				margin-bottom: 0;
				white-space: pre-wrap;
				word-break: break-all;
			}

			.stack {
				font-size: 13px;
				color: var(--dim);
			}

			code {
				font-size: 13px;
				font-family: var(--monospace);
				color: var(--yellow);
			}

			.file-link {
				text-decoration: underline;
				cursor: pointer;
			}
		</style>
	</head>

	<body>
		<div>
			<div class="window">
				<pre class="message"><span class="message-body">${err.message}</span></pre>
				<pre class="file">${err.file}</pre>
				<pre class="stack">${err.stack}</pre>
			</div>
		</div>
	</body>
</html>
`;
