import formidable from "formidable";
import fetch from "node-fetch";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: "Form parsing error" });
        return;
      }

      const projectName = fields.projectName?.[0] || "ditzy-app";
      const token = process.env.VERCEL_TOKEN;

      if (!token) {
        res.status(500).json({ error: "Missing VERCEL_TOKEN in env" });
        return;
      }

      // Request ke Vercel API
      const response = await fetch("https://api.vercel.com/v13/deployments", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: projectName,
          files: [], // kalau mau upload file beneran, harus di-hash dulu
        }),
      });

      const data = await response.json();
      res.status(200).json(data);
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
