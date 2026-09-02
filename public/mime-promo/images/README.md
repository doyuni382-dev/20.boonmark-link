# 이미지 교체 방법

1. 이 폴더(`mime-promo/images/`)에 이미지 파일을 넣습니다.
   예) `poster.jpg`, `record.jpg` (파일명은 자유)

2. `mime-promo/config.js` 의 `images` 값에 경로만 적습니다.

   ```js
   images: {
     poster: "./images/poster.jpg", // 히어로 포스터 영역
     record: "./images/record.jpg", // 2026 기록 이미지 영역
   },
   ```

3. 저장 후 새로고침하면 placeholder 자리에 이미지가 채워집니다.
   경로가 틀리면 자동으로 다시 placeholder 가 표시됩니다.

- 포스터 영역 권장 비율: 세로형 3:4
- 기록 이미지 영역 권장 비율: 가로형 16:7
- 확인되지 않은 공식 이미지는 임의로 넣지 마세요.
