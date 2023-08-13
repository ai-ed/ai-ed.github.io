import * as Handlebars from "./handlebars.runtime-latest.js";

const headerView = `
		<header>
			<h1>AI-ED</h1>
			<a class="btn" href="/index.html">Home</a>
			<a class="btn" href="/resources.html">Resources</a>
			<a class="btn" href="https://github.com/ai-ed">Contribute &nearr;</a>
			<h2>{{version}}</h2>
		</header>
`;
const hdrTemplate = Handlebars.compile(headerView);


const VERSION = "July 2023";

export function header() {
const header = document.getElementById("header");
	header.innerHTML = hdrTemplate({version: VERSION}) ;
}

