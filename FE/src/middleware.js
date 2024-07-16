export function middleware(request) {
  const token = request.cookies.get("authToken")?.value;
  const protectedRoutes = ["/"];

  if (!token && protectedRoutes.includes(request.nextUrl.pathname)) {
    return Response.redirect(new URL("/login", request.url));
  }
  if (
    token &&
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/register"))
  ) {
    return Response.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
