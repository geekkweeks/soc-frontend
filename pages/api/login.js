import cookie from "cookie";
import { API_URL } from "@/config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body;

    const loginRes = await fetch(`${API_URL.Login}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await loginRes.json();
    if (loginRes.ok) {
      // @todo Set Cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV || "development",
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 1, //1 day
          path: "/",
        })
      );

      res.status(200).json({ user: data });
    } else {
      res.status(data.statusCode).json({ message: "Login failed", data: {} });
    }

    res.status(200).json({});
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
