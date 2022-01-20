import { NextResponse } from "next/server";

export default function middleware(req) {
  // destructuring
  const { token } = req.cookies;
  if (token === undefined || !token || token === '') {
    return NextResponse.redirect("/account/login");
  }
}