import { NextResponse } from "next/server";

export default function middleware(req) {
  // destructuring
  const { token } = req.cookies;
  const url = req.url;
  if (token && (url === "/account/login" || url === "/register")) {
    return NextResponse.redirect("/");
  }
}