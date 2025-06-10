import dbConnect from "../../../src/lib/dbconnect";
const User = require("../../../mdoels/user");

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  await dbConnect();

  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).send("User already exists");

    const newUser = new User({
      name,
      email,
      hashed_password: password,
    });

    await newUser.save();
    res.status(201).send("User created successfully");
  } catch (err) {
    res.status(500).send("Server error");
  }
}