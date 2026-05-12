import { NextResponse, type NextRequest } from "next/server";

const protectedPaths = ["/admin", "/studio", "/api/content", "/api/submissions"];

function isProtectedPath(pathname: string) {
  return protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

function unauthorized() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="ALR Admin", charset="UTF-8"',
    },
  });
}

function timingSafeEqual(a: string, b: string) {
  const encoder = new TextEncoder();
  const left = encoder.encode(a);
  const right = encoder.encode(b);

  if (left.length !== right.length) {
    return false;
  }

  let result = 0;
  for (let index = 0; index < left.length; index += 1) {
    result |= left[index] ^ right[index];
  }

  return result === 0;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    return new NextResponse("Admin credentials are not configured.", {
      status: 503,
    });
  }

  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Basic ")) {
    return unauthorized();
  }

  const encoded = authorization.slice("Basic ".length);
  const decoded = atob(encoded);
  const separatorIndex = decoded.indexOf(":");

  if (separatorIndex === -1) {
    return unauthorized();
  }

  const suppliedUsername = decoded.slice(0, separatorIndex);
  const suppliedPassword = decoded.slice(separatorIndex + 1);

  const validUsername = timingSafeEqual(suppliedUsername, username);
  const validPassword = timingSafeEqual(suppliedPassword, password);

  if (!validUsername || !validPassword) {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/studio/:path*",
    "/api/content/:path*",
    "/api/submissions/:path*",
  ],
};
