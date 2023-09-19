---
layout: default
---
<script>
function hideOrShowText(text) {
    text.classList.toggle("is-clipped");
    text.style.whiteSpace = text.classList.contains("is-clipped") ?  "nowrap" : "normal";
}
</script>
<nav class="level filters">
   <div class="filter level-item">
      <div class="tag is-size-6 is-white"> Sort by </div>
      <select name="sort-by" id="sort-by">
         <option value="newest">Newest</option>
         <option value="oldest">Oldest</option>
         <option value="name">Name</option>
      </select>
  </div>
  <div class="filter level-item filter-tags">
    <p class="has-text-centered">Filter by</p>
    <div id="tags" class="is-flex"></div>
  </div>
  <div class="level-item">
    <p id="info"></p>
  </div>
</nav>
<div id="resources" class="is-flex-wrap-wrap is-flex is-justify-content-center" >
</div>
