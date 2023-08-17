import * as Handlebars from "handlebars";

const headerView = `
<nav class="navbar header" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
<div class="navbar-item is-size-3 has-text-weight-bold">
    AI-ED
</div>
    <a role="button" onClick="activateMenu()" id="nav-burger" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="menu">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

    <div id="menu" class="header-items navbar-menu">
    <a class="navbar-item button is-rounded is-medium" href="/index.html">Home</a>
    <a class="navbar-item button is-rounded is-medium" href="/resources.html">Resources</a>
    <a class="navbar-item button is-medium is-rounded" href="https://github.com/ai-ed">Contribute &nearr;</a>
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
