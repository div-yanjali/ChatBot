import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { username, password } = req.body;
  const adminUser = process.env.ADMIN_USERNAME;
  const adminPass = process.env.ADMIN_PASSWORD;

  if (username !== adminUser) return res.status(401).json({ error: "Invalid credentials" });
  if (password !== adminPass) return res.status(401).json({ error: "Invalid credentials" });

  // For demo: set a session/cookie or return a token (for now, just success)
  res.status(200).json({ message: "Admin login successful" });
}