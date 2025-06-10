import dbConnect from "../../../src/lib/dbconnect";
const User = require("../../../mdoels/user");
const bcrypt = require("bcryptjs");

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  await dbConnect();

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.hashed_password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    // For demo: return user info (in production, return JWT or session)
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
