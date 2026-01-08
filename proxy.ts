import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks(.*)'
])

export default clerkMiddleware(async (auth, req) => {
  // Protect all routes except public ones
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
  
  // Redirect root to Home for authenticated users
  if (req.nextUrl.pathname === '/') {
    const { userId } = await auth()
    if (userId) {
      return NextResponse.redirect(new URL("/Home", req.url))
    }
    // If not authenticated, redirect to sign-in
    return NextResponse.redirect(new URL("/sign-in", req.url))
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}