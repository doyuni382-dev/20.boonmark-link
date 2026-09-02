/* ============================================================
   춘천마임축제 홍보 페이지 · 독립 스크립트
   외부 라이브러리 없음. 순수 브라우저 JS.

   담당 기능 (꼭 필요한 것만):
     1. 상단 메뉴 클릭 → 해당 영역으로 부드럽게 이동
     2. 공식 홈페이지 버튼 활성화 (config.js)
     3. 공식 SNS 버튼 활성화 (config.js)
     4. 이미지 영역 실제 파일 교체 (config.js)
     5. 스크롤 등장 효과 / 헤더 배경 전환 (가벼운 연출)
   ============================================================ */

(function () {
  "use strict";

  // config.js 값을 사용하고, 없으면 안전한 기본값(빈 값)으로 대체
  var CFG =
    window.MIME_PROMO_CONFIG && typeof window.MIME_PROMO_CONFIG === "object"
      ? window.MIME_PROMO_CONFIG
      : {};
  var LINKS = CFG.links && typeof CFG.links === "object" ? CFG.links : {};
  var IMAGES = CFG.images && typeof CFG.images === "object" ? CFG.images : {};
  var VIDEOS = CFG.videos && typeof CFG.videos === "object" ? CFG.videos : {};

  /* ---- 2·3. 공식 채널 버튼 활성화 ---- */
  function applyLinks() {
    var buttons = document.querySelectorAll("[data-link]");

    Array.prototype.forEach.call(buttons, function (btn) {
      var key = btn.getAttribute("data-link");
      var url = LINKS[key];

      if (url && /^https?:\/\//i.test(url)) {
        btn.setAttribute("href", url);
        btn.setAttribute("target", "_blank");
        btn.setAttribute("rel", "noopener noreferrer");
        btn.removeAttribute("aria-disabled");

        var placeholder = btn.querySelector(".btn__placeholder");
        if (placeholder) placeholder.remove();
      } else {
        // 미확인 상태: 클릭 차단, placeholder 유지
        btn.addEventListener("click", function (event) {
          event.preventDefault();
        });
      }
    });
  }

  /* ---- 4. 이미지 영역 교체 ---- */
  function setImage(hostId, src, alt) {
    if (!src) return;
    var host = document.getElementById(hostId);
    if (!host) return;

    var img = document.createElement("img");
    img.className = "media-img";
    img.alt = alt;
    img.decoding = "async";

    // 로드 실패 시 이미지를 걷어내고 placeholder 를 되돌린다
    img.addEventListener("error", function () {
      if (img.parentNode) img.parentNode.removeChild(img);
      host.classList.remove("has-image");
    });

    // DOM 에 먼저 붙인 뒤 src 를 지정해야 로드가 확실히 시작된다
    host.classList.add("has-image");
    host.appendChild(img);
    img.src = src;
  }

  function applyImages() {
    setImage("posterFrame", IMAGES.poster, "춘천마임축제 포스터");
    setImage("recordMedia", IMAGES.record, "2026 춘천마임축제 기록 이미지");
  }

  /* ---- 4. 영역에 YouTube 영상 삽입 (이미지보다 우선) ---- */
  function youTubeId(url) {
    var m = String(url).match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([\w-]{11})/
    );
    return m ? m[1] : "";
  }

  function setVideo(hostId, url, title) {
    if (!url) return;
    var id = youTubeId(url);
    if (!id) return;

    var host = document.getElementById(hostId);
    if (!host) return;

    var frame = document.createElement("iframe");
    frame.className = "media-video";
    frame.src = "https://www.youtube-nocookie.com/embed/" + id;
    frame.title = title;
    frame.loading = "lazy";
    frame.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    frame.setAttribute("allowfullscreen", "");
    frame.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");

    host.classList.add("has-image", "has-video");
    host.appendChild(frame);
  }

  function applyVideos() {
    setVideo("recordMedia", VIDEOS.record, "2026 춘천마임축제 기록 영상");
  }

  /* ---- 5. 스크롤 시 헤더 배경 전환 ---- */
  function setupHeader() {
    var header = document.getElementById("siteHeader");
    if (!header) return;

    var toggle = function () {
      header.classList.toggle("is-scrolled", window.pageYOffset > 40);
    };
    toggle();
    window.addEventListener("scroll", toggle, { passive: true });
  }

  /* ---- 5. 스크롤 등장 애니메이션 ---- */
  function setupReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(items, function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    Array.prototype.forEach.call(items, function (el) {
      observer.observe(el);
    });
  }

  /* ---- 1. 상단 메뉴 → 해당 영역으로 이동 (고정 헤더 높이 보정) ---- */
  function setupSmoothAnchors() {
    var header = document.getElementById("siteHeader");

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (event) {
        var id = link.getAttribute("href");
        if (id === "#" || id.length < 2) return;

        var target = document.querySelector(id);
        if (!target) return;

        event.preventDefault();
        var offset = (header ? header.offsetHeight : 0) + 12;
        var top =
          target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: "smooth" });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyLinks();
    applyImages();
    applyVideos();
    setupHeader();
    setupReveal();
    setupSmoothAnchors();
  });
})();
