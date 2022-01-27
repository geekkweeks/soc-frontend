import cookie from "cookie";

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : "");
}

export function getFullDate(req) {
  if (!req) return null;
  const takenDateSelected = new Date(req);
  const dd = String(takenDateSelected.getDate()).padStart(2, "0");
  const mm = String(takenDateSelected.getMonth() + 1).padStart(2, "0");
  const yyyy = takenDateSelected.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
}
