import * as Handlebars from "handlebars";

const headerView = `
    <h1>AI-ED</h1>
    <a class="btn" href="/index.html">Home</a>
    <a class="btn" href="/resources.html">Resources</a>
    <a class="btn" href="https://github.com/ai-ed">Contribute &nearr;</a>
    <h2>{{version}}</h2>
`;

const hdrTemplate = Handlebars.compile(headerView);

const VERSION = "July 2023";

export function header() {
    const body = document.getElementsByTagName("body")[0];
    const header = document.createElement("header")
	  header.innerHTML = hdrTemplate({version: VERSION});
    document.body.insertBefore(header, document.body.firstChild)
}
