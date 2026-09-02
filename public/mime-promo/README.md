# 춘천마임축제 홍보 페이지 (mime-promo)

기존 북마크 사이트와 **로직이 분리된** 정적 홍보 페이지입니다.
`public/mime-promo/` 에 있으며 Next.js 개발 서버가 그대로 서빙합니다.
외부 라이브러리·패키지 없이 순수 HTML + CSS + JavaScript 로만 구성됩니다.

- 접속 주소: `http://localhost:3000/mime-promo/index.html`
  (`/mime-promo/` 만 입력하면 404 — `index.html` 까지 붙여야 함)
- `proxy.ts` matcher 에서 `mime-promo` 경로를 인증 미들웨어 대상에서 제외해
  로그인 없이 접근됩니다. 인증·북마크·폴더 로직 자체는 변경 없음.

회원가입·로그인, 댓글, 검색, 관리자, 데이터베이스, 예약, 방문자 통계, 팝업은
포함하지 않습니다.

## 파일

| 파일 | 설명 |
|---|---|
| `index.html` | 페이지 구조 |
| `styles.css` | 자체 스타일 (기존 사이트의 Tailwind/전역 CSS 미사용) |
| `config.js` | **공식 링크·이미지 경로를 관리하는 유일한 파일** |
| `script.js` | 메뉴 스크롤 이동, 링크·이미지 적용, 등장 효과 |
| `images/` | 교체할 이미지 파일을 두는 폴더 (`images/README.md` 참고) |

## 필수 기능

1. **상단 메뉴 → 해당 영역 이동** — 헤더 메뉴 클릭 시 부드럽게 스크롤(고정 헤더 높이 자동 보정). 모바일에서도 메뉴가 계속 보입니다.
2. **공식 홈페이지 버튼** / 3. **공식 SNS 버튼** — `config.js` 에 주소를 넣으면 새 탭 링크로 활성화, 없으면 `주소 입력` placeholder + 비활성 유지.
4. **이미지 교체** — `images/` 에 파일을 넣고 `config.js` 에 경로만 입력. 경로가 틀리면 자동으로 placeholder 로 복귀.
5. **모바일 버튼** — 최소 높이 52px, 좁은 화면에서는 가로 꽉 채워 세로로 배치.

## 설정 (한 곳: `config.js`)

```js
window.MIME_PROMO_CONFIG = {
  links: {
    website: "", // 공식 홈페이지 주소 입력
    sns: "",     // 공식 SNS 주소 입력
  },
  images: {
    poster: "",  // 예: "./images/poster.jpg"
    record: "",  // 예: "./images/record.jpg"
  },
};
```

> 확인되지 않은 주소·이미지는 임의로 추측해 넣지 마세요. 비워 두면 placeholder 가 유지됩니다.

## 실행 방법

북마크 사이트와 같은 서버로 함께 서빙됩니다.

```bash
npm run dev
```

- 북마크 사이트: `http://localhost:3000`
- 춘천마임축제 홍보: `http://localhost:3000/mime-promo/index.html`

북마크 화면(사이드바 하단, `sm` 이상 화면)의 **"춘천마임축제 홍보 보기"** 링크로도
이동할 수 있습니다.
