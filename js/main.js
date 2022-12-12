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

// badge in header && ScrollTo
const badgeEl = document.querySelector("header .badges");
const toTopEl = document.querySelector('#to-top');

window.addEventListener(
  "scroll",
  _.throttle(function () {
    if (window.scrollY > 500) {
      // gsap.to(애니메이션 적용할 요소, 지속시간(초 단위), 옵션(어떻게 처리할지))
      // 뱃지 숨기게 
      gsap.to(badgeEl, 0.6, {
        opacity: 0,
        display: "none",
      });
      // ScrollTo 버튼 보이게 (사실 뱃지에서는 요소를 우리가 찾았지만 라이브러리 특성상 선택자만 넣어도 알아서 찾는다) 
      gsap.to(toTopEl, .2, {
        x: 0,
      }) 
    } else {
      // 뱃지 보이게 
      gsap.to(badgeEl, 0.6, {
        opacity: 1,
        display: "block",
      });
      // ScrollTo 버튼 숨기게 (사실 뱃지에서는 요소를 우리가 찾았지만 라이브러리 특성상 선택자('#to-top)'만 넣어도 알아서 찾는다)
      // 근데 어차피 아래에서 click 이벤트를 호출하기 위해 toTopEl을 우리도 찾아야 하므로 여기에도 그냥 변수를 넣어주자.
      gsap.to(toTopEl, .2, {
        x: 100, // x축 오른쪽으로 100px 이동하도록 
      }) 
    }
  }, 300)
);

toTopEl.addEventListener('click', function() {
  // window 객체 자체는 하나의 창, 우리가 보고 있는 걸 의미. Window 객체를 통해 화면 자체를 애니메이션 처리할 수 있게.
  gsap.to(window, .7, {
    scrollTo: 0
  })
});

// visual section
const fadeEls = document.querySelectorAll(".visual .fade-in");

fadeEls.forEach(function (fadeEl, index) {
  // gsap.to(애니메이션 적용할 요소, 지속시간(초 단위), 옵션(어떻게 처리할지))
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * 0.5,
    opacity: 1,
  });
});

// notice section (swiper js)
new Swiper(".notice-line .swiper-container", {
  direction: "vertical", // 기본값이 horizontal
  autoplay: true,
  loop: true,
});

// notice section promotion image slide (swiper js)
new Swiper(".promotion .swiper-container", {
  slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 10px 간격
  centeredSlides: true, // 1번 슬라이드가 가운데에서 보이기 시작
  loop: true,
  // autoplay: {
  //   delay: 4000 // 0.5초마다 자동 슬라이드
  // },
  pagination: {
    el: ".promotion .swiper-pagination", // 페이지 번호 요소 선택자
    clickable: true,
  },
  navigation: {
    prevEl: ".promotion .swiper-prev",
    nextEl: ".promotion .swiper-next",
  },
});

// 다중 요소 슬라이드
new Swiper(".awards .swiper-container", {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: ".awards .swiper-prev",
    nextEl: ".awards .swiper-next",
  },
});

// promotion toggle
const promotionEl = document.querySelector(".promotion");
const promotionToggleBtn = document.querySelector(".toggle-promotion");
let isHidePromotion = false;

promotionToggleBtn.addEventListener("click", function () {
  isHidePromotion = !isHidePromotion;

  if (isHidePromotion) {
    promotionEl.classList.add("hide");
  } else {
    promotionEl.classList.remove("hide");
  }
});

// repeat animation

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function floatingObject(selector, delay, size) {
  // gsap.to(요소, 시간, 옵션) : 요소의 경우 CSS 선택자만 넣어도 gsap이 내부적으로 요소를 찾는다.
  gsap.to(
    selector, // 선택자
    random(1.5, 2.5), // 지속시간을 random()하게
    {
      // 옵션
      y: size, // size(px)만큼 내려가는 애니메이션
      repeat: -1, // -1을 넣으면 무한 반복
      yoyo: true, // 한번 재생한 애니메이션을 다시 뒤로 재생한다. y가 size만큼 내려갔다가 다시 올라오겠지?
      ease: Power1.easeInOut,
      delay: random(0, delay),
    }
  );
}
floatingObject(".floating1", 1, 15);
floatingObject(".floating2", 0.5, 15);
floatingObject(".floating3", 1.5, 20);

// scrollMagic
const spyEls = document.querySelectorAll("section.scroll-spy");

spyEls.forEach(function (spyEl) {
  new ScrollMagic.Scene({
    triggerElement: spyEl, // 보여지는지 아닌지 감시할 요소를 지정
    // scrollMagic에서는 뷰포트 처음을 0, 끝부분을 1로 판단한다.
    triggerHook: 0.8, // 0.8 부분에 도달하면 hook이 트리거된다.
  })
    .setClassToggle(spyEl, "show") // show 클래스를 토글할 것이다(넣었다가 뺐다가)
    .addTo(new ScrollMagic.Controller());
});

// 올해 날짜 계산 
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();