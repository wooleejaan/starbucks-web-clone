// search in header
const searchEl = document.querySelector(".search");
const searchIuputEl = searchEl.querySelector("input");

searchEl.addEventListener("click", function () {
  searchIuputEl.focus();
});

searchIuputEl.addEventListener("focus", function () {
  // 두번째 함수를 핸들러라고 한다.
  searchEl.classList.add("focused");
  searchIuputEl.setAttribute("placeholder", "통합검색");
});

searchIuputEl.addEventListener("blur", function () {
  searchEl.classList.remove("focused");
  searchIuputEl.setAttribute("placeholder", "");
});

// 올해 날짜 계산 
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();