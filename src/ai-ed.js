import * as Handlebars from "handlebars";

const headerView = `
<nav class="navbar header" role="navigation" aria-label="main navigation">
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
    <div class="navbar-start header-items">
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
    const mainWrapper = document.getElementById("main-wrap");
    const navWrapper = document.createElement("header")
    navWrapper.classList.add("is-flex")
    navWrapper.classList.add("is-fixed-top")
	  navWrapper.innerHTML = hdrTemplate({version: VERSION});
    mainWrapper.insertBefore(navWrapper, mainWrapper.firstChild)
}
