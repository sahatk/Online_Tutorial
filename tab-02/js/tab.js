
const tabMenu = document.querySelector("#tab-menu");
const childDivs = tabMenu.querySelectorAll("ul > li > .tab-content");

// 모든 컨텐츠 내용을 숨김
childDivs.forEach((div) => {
  div.style.display = "none";
});

// li에 active 클래스를 가진 컨텐츠 내용을 노출
const activeDiv = tabMenu.querySelector("li.active > .tab-content");
activeDiv.style.display = "block";

function tabList(e) {
  e.preventDefault();
  const target = e.target;
  const nextDiv = target.nextElementSibling;
  nextDiv.style.display = "block";
  nextDiv.parentNode.classList.add("active");

  const siblings = Array.from(nextDiv.parentNode.parentNode.children);
  siblings.forEach((sibling) => {
    if (sibling !== nextDiv.parentNode) {
      sibling.classList.remove("active");
      sibling.querySelector("div").style.display = "none";
    }
  });
}

const tabLinks = tabMenu.querySelectorAll("ul > li > a");
tabLinks.forEach((link) => {
  link.addEventListener("click", tabList);
  link.addEventListener("focus", tabList);
});