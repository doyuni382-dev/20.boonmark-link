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
  await supabase.auth.getClaims();

  return supabaseResponse;
};
