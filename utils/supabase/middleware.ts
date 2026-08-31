import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// 요청마다 Supabase 세션 쿠키를 갱신한다.
// Next.js 16부터 middleware가 proxy로 이름이 바뀌었으므로 루트의 proxy.ts에서 호출한다.
export const updateSession = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // getClaims() 호출이 있어야 만료된 액세스 토큰이 리프레시된다.
  // createServerClient와 이 호출 사이에 다른 로직을 넣지 말 것.
  const { data } = await supabase.auth.getClaims();
  const isAuthenticated = Boolean(data?.claims);

  // 로그인 없이 접근 가능한 경로. 나머지는 모두 로그인이 필요하다.
  // /auth/* 는 소셜 로그인 콜백 등 인증 처리 전용 경로다.
  const { pathname } = request.nextUrl;
  const isPublicPath =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password" ||
    pathname.startsWith("/auth/");

  // 비밀번호 재설정 / 소셜 로그인 콜백은 자체 세션 처리 흐름이 있으므로
  // 로그인 상태여도 인덱스로 튕겨내지 않는다.
  const isAuthEntryPath =
    isPublicPath &&
    pathname !== "/reset-password" &&
    !pathname.startsWith("/auth/");

  // 비로그인 사용자가 보호된 경로(인덱스·폴더별·새 링크 등)에 오면 로그인 페이지로 보낸다.
  if (!isAuthenticated && !isPublicPath) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return copyCookies(supabaseResponse, NextResponse.redirect(url));
  }

  // 이미 로그인한 사용자가 로그인/회원가입/비밀번호 찾기 페이지에 오면 인덱스로 보낸다.
  if (isAuthenticated && isAuthEntryPath) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return copyCookies(supabaseResponse, NextResponse.redirect(url));
  }

  return supabaseResponse;
};

// 세션 갱신 쿠키가 리다이렉트 응답에서도 유지되도록 복사한다.
const copyCookies = (from: NextResponse, to: NextResponse) => {
  from.cookies.getAll().forEach((cookie) => to.cookies.set(cookie));
  return to;
};
