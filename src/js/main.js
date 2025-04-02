var headerLanguages = document.querySelector(".header-languages");
var language = document.querySelector(".window");
var toggleMenu = function toggleMenu() {
  language.classList.toggle("is-active");
};
headerLanguages.addEventListener("click", toggleMenu);
