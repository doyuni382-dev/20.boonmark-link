/* ============================================================
   춘천마임축제 홍보 페이지 · 설정 (여기 한 곳만 수정하세요)
   ------------------------------------------------------------
   - 공식 링크와 이미지 경로를 이 파일에서만 관리합니다.
   - 값이 비어 있으면(""):
       · 링크  → 버튼은 "주소 입력" placeholder 상태로 비활성 유지
       · 이미지 → 어두운 그라디언트 placeholder 유지
   - 확인되지 않은 주소는 임의로 추측해 넣지 마세요.
   ============================================================ */

window.MIME_PROMO_CONFIG = {
  // 1) 공식 링크 -----------------------------------------------
  links: {
    website: "https://mimefestival.com/", // 공식 홈페이지
    sns: "https://www.threads.com/@mimefestival?xmt=AQG0aXAV66NJssbuOH_9LH96tFOpixXcdTylt69NeuWRRnE", // 공식 SNS (Threads)
  },

  // 2) 이미지 경로 -------------------------------------------
  //    mime-promo/images/ 에 파일을 넣고 아래에 경로만 적으면 교체됩니다.
  //    (경로가 틀리면 자동으로 placeholder 로 되돌아갑니다.)
  images: {
    poster: "./images/mime.jpg", // 히어로 포스터 영역
    record: "", // 아래 videos.record 를 쓰면 비워 둡니다
  },

  // 3) 영상 (YouTube) --------------------------------------
  //    값이 있으면 해당 영역에 이미지 대신 유튜브 영상이 삽입됩니다.
  //    (일반 시청 주소 / youtu.be / embed 링크 모두 인식)
  videos: {
    record: "https://youtu.be/vWOqk1XbdB4?si=nDi5uv6mVzsmo5kg", // 2026 기록 영상
  },
};
