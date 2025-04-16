var headerLanguages = document.querySelector(".header-languages");
var language = document.querySelector(".window");
var toggleMenu = function toggleMenu() {
  language.classList.toggle("is-active");
};
headerLanguages.addEventListener("click", toggleMenu);

var projectZoomIn = document.querySelector(".project-images");
var projectZoomOut = document.querySelector(".project-zoom");
var projectExpand = document.querySelector(".project-expand");
var headerDesktop = document.querySelector(".header-desktop");
var toggleMenu = function toggleMenu() {
  projectZoomIn.classList.toggle("is-active");
  projectZoomOut.classList.toggle("is-active");
  projectExpand.classList.toggle("is-active");
  headerDesktop.classList.toggle("project-light-box");
};
projectZoomIn.addEventListener("click", toggleMenu);
projectZoomOut.addEventListener("click", toggleMenu);
projectExpand.addEventListener("click", toggleMenu);
