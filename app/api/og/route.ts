import { NextResponse, type NextRequest } from "next/server";

interface OgData {
  url: string;
  title: string;
  description: string;
  thumbnail: string | null;
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'");
}

function extractMetaContent(html: string, patterns: RegExp[]): string | null {
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) {
      return decodeHtmlEntities(match[1].trim());
    }
  }
  return null;
}

function metaPropertyPatterns(property: string): RegExp[] {
  const escaped = property.replace(/:/g, "\\:");
  return [
    new RegExp(
      `<meta[^>]+property=["']${escaped}["'][^>]+content=["']([^"']*)["']`,
      "i",
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']*)["'][^>]+property=["']${escaped}["']`,
      "i",
    ),
  ];
}

function resolveUrl(maybeRelative: string, base: string): string {
  try {
    return new URL(maybeRelative, base).toString();
  } catch {
    return maybeRelative;
  }
}

function extractOgData(html: string, pageUrl: string): OgData {
  const title =
    extractMetaContent(html, metaPropertyPatterns("og:title")) ??
    extractMetaContent(html, [/<title[^>]*>([^<]*)<\/title>/i]) ??
    pageUrl;

  const description =
    extractMetaContent(html, metaPropertyPatterns("og:description")) ??
    extractMetaContent(html, [
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i,
      /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i,
    ]) ??
    "";

  const image = extractMetaContent(html, metaPropertyPatterns("og:image"));
  const thumbnail = image ? resolveUrl(image, pageUrl) : null;

  return { url: pageUrl, title, description, thumbnail };
}

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

    if (!response.ok) {
      return NextResponse.json(
        { error: `페이지를 불러오지 못했습니다. (${response.status})` },
        { status: 502 },
      );
    }

    const html = await response.text();
    const data = extractOgData(html, parsedUrl.toString());

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "오픈 그래프 정보를 가져오는 중 오류가 발생했습니다." },
      { status: 502 },
    );
  }
}
