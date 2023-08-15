import * as Handlebars from "handlebars";

const headerView = `
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
<div class="navbar-item">
    AI-ED
</div>
    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
    <a class="navbar-item button is-rounded" href="/index.html">Home</a>
    <a class="navbar-item button is-rounded" href="/resources.html">Resources</a>
    <a class="navbar-item button is-rounded" href="https://github.com/ai-ed">Contribute &nearr;</a>
    <h2 class="navbar-item">{{version}}</h2>
    </div>
  </div>
</nav>

`;

const hdrTemplate = Handlebars.compile(headerView);

const VERSION = "July 2023";

export function header() {
    const body = document.getElementsByTagName("body")[0];
    const navWrapper = document.createElement("div")
    navWrapper.classList.add("is-flex")
	  navWrapper.innerHTML = hdrTemplate({version: VERSION});
    document.body.insertBefore(navWrapper, document.body.firstChild)
}
