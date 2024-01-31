let tabHeader = document.getElementsByClassName("tab-header")[0];
let tabBody = document.getElementsByClassName("tab-body")[0];
let tabIndicator = document.getElementsByClassName("tab-indicator")[0];
let tabsPane = tabHeader.getElementsByTagName("li");

Array.from(tabsPane).forEach((tab, i) => {
  tab.addEventListener("click", () => {
    tabHeader.querySelector(".active").classList.remove("active");
    tab.classList.add("active");
    tabBody.querySelector(".active").classList.remove("active");
    tabBody.getElementsByTagName("li")[i].classList.add("active");
    tabIndicator.style.left = `calc(calc(100% / 3) * ${i})`;
  });
});