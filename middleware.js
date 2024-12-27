import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/forum(.*)']);

export default clerkMiddleware((req, evt) => {
  // Ensure req.nextUrl exists
  if (!req.nextUrl) {
    console.error("req.nextUrl is undefined");
    return NextResponse.next(); // Allow the request to pass through
  }

  const auth = req.auth || {}; // Fallback if req.auth is undefined
  const { userId } = auth;

  if (isProtectedRoute(req.nextUrl.pathname)) {
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Match only routes that require middleware
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
