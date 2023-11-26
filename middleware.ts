/** 
  0.But basically the strategy for this middleware is to one
  1.determine if the requests coming in is to a resource on which we want to protect.
  2.If it is what we wanna do is check to see if there's a JSON Web Token in the cookie header our specific token, if it is we want to verify that token
  3.if you are verified then we'll let you proceed to whatever you are gonna do
  4.we'll let you in the gate to whatever resource you're trying to access.
  5.If any one of those things fail, we will redirect you back to sign in.
*/

import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
const PUBLIC_FILE = /\.(.*)$/;

const verifyJWT = async (jwt) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload;
};

export default async function middleware(req, res) {
  const { pathname } = req.nextUrl;
  //any request that matches any of these url is allowed
  console.log("Requested Pathname:", pathname);
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/register") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }
  const jwt = req.cookies.get(process.env.COOKIE_NAME);
  console.log("JWT Value:", jwt && jwt.value);
  
  //if you dont have a pathname-your intended destination, you're pushed to the signin page
  if (!jwt) {
    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }

  // If the request is not for an excluded path, the middleware attempts to verify the JWT token. If the verification is successful, it calls NextResponse.next() to allow the request to proceed.
  try {
    console.log("Verifying JWT:", jwt.value);
    await verifyJWT(jwt.value);
    console.log("JWT Verification Successful - Proceeding");
    return NextResponse.next();
  } catch (e) {
    console.error("JWT Verification Failed:", e.message);
    console.log("Redirecting to /signin due to JWT verification failure");
    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }
}
