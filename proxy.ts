import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

// Next.js 16에서 middleware는 proxy로 이름이 바뀌었다. (기능은 동일)
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * 아래를 제외한 모든 경로에서 실행:
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico, 이미지 파일 확장자
     * - mime-promo (public/ 의 독립 정적 홍보 페이지, 로그인 없이 접근)
     * 필요하면 여기에 인증에서 제외할 경로를 추가한다.
     */
    "/((?!_next/static|_next/image|favicon.ico|mime-promo|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
