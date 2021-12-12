// pages/api/example.js

import nc from "next-connect";
import cors from "cors";

const handler = nc()
  // use connect based middleware
  .use(cors())
  .get(async (req, res) => {
    const response = await fetch(`http://localhost:3080/getclients`);
    res.json(response);
  });

export default handler;
