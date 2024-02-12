
const tabMenu = document.querySelector(".tab-menu");
const tabs = document.querySelectorAll('.tab-menu li > a');
const tabContents = document.querySelectorAll('.tab-content');

// 모든 컨텐츠 내용을 숨김
tabContents.forEach((div) => {
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
});



tabs.forEach((tab, index) => {
  tab.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      tabContents[index].setAttribute('tabindex', '0');
      tabContents[index].focus();
    } else if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      const prevTabIndex = index === 0 ? tabContents.length - 1 : index - 1;
      tabs[prevTabIndex].querySelector('a').focus();
    }
  });
});

tabContents.forEach((tabContent, index) => {
  tabContent.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      tabs[index].querySelector('a').focus();
    }
  });
});


