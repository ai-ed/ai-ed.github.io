const VERSION = "July 2023";

function header() {
	document.body.innerHTML = `
		<header>
			<h1>AI-ED</h1>
			<a class="btn" href="/index.html">Home</a>
			<a class="btn" href="/resources.html">Resources</a>
			<a class="btn" href="https://github.com/ai-ed">Contribute &nearr;</a>
			<h2>${VERSION}</h2>
		</header>
		${document.body.innerHTML}
	`;
}

export { header };
