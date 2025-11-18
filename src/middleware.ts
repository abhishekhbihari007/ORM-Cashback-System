import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes that don't require authentication
const publicRoutes = ["/", "/login", "/signup", "/#"];

// Role-based route mappings
const roleRoutes: Record<string, string[]> = {
  user: ["/feed", "/upload", "/wallet", "/user"],
  brand: ["/dashboard", "/brand"],
  admin: ["/admin"],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.some((route) => pathname === route || pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Get user from cookie (in real app, this would be a JWT token)
  const authCookie = request.cookies.get("auth_user");
  let user = null;

  if (authCookie) {
    try {
      user = JSON.parse(authCookie.value);
    } catch (e) {
      // Invalid cookie
    }
  }

  // If not logged in and trying to access protected route, redirect to login
  if (!user && !publicRoutes.includes(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Special protection for /admin routes - only admins can access
  if (pathname.startsWith("/admin")) {
    if (!user || user.role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // Check role-based access
  if (user) {
    const userRole = user.role;
    const allowedRoutes = roleRoutes[userRole] || [];

    // Check if user is trying to access a route they don't have permission for
    const hasAccess = allowedRoutes.some((route) => pathname.startsWith(route));

    if (!hasAccess && !publicRoutes.includes(pathname)) {
      // Redirect to their default route
      const url = request.nextUrl.clone();
      if (userRole === "user") {
        url.pathname = "/feed";
      } else if (userRole === "brand") {
        url.pathname = "/dashboard";
      } else if (userRole === "admin") {
        url.pathname = "/admin/dashboard";
      } else {
        url.pathname = "/login";
      }
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

