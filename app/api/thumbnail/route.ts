import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const targetUrl = request.nextUrl.searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json(
      { error: "url 파라미터가 필요합니다." },
      { status: 400 },
    );
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(targetUrl);
  } catch {
    return NextResponse.json(
      { error: "올바른 URL이 아닙니다." },
      { status: 400 },
    );
  }

  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    return NextResponse.json(
      { error: "http/https URL만 지원합니다." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(parsedUrl.toString(), {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; BoonmarkLinkBot/1.0)",
      },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok || !response.body) {
      return NextResponse.json(
        { error: "이미지를 불러오지 못했습니다." },
        { status: 502 },
      );
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.startsWith("image/")) {
      return NextResponse.json({ error: "이미지가 아닙니다." }, { status: 415 });
    }

    return new NextResponse(response.body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "이미지를 가져오는 중 오류가 발생했습니다." },
      { status: 502 },
    );
  }
}
