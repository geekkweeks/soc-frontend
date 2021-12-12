import nc from "next-connect";
import cors from "cors";
import { API_URL } from "@/config/index";

const handler = nc()
  // use connect based middleware
  .use(cors())
  .post(async (req, res) => {
    const response = await fetch(`${API_URL.GetClients}`);
    res.json(response);
  });

export default handler;