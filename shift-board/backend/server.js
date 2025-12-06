require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const authRoutes = require("./routes/authRoutes");
const shiftRoutes = require("./routes/shiftRoutes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/shifts", shiftRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");
    await seedAdmin();
  })
  .catch((err) => console.log("MongoDB Error:", err));
async function seedAdmin() {
  try {
    const adminEmail = "hire-me@anshumat.org";

    const exists = await User.findOne({ email: adminEmail });
    if (exists) {
      console.log("Admin already exists ✔");
      return;
    }

    const hashedPassword = await bcrypt.hash("HireMe@2025!", 10);

    await User.create({
      email: adminEmail,
      password: hashedPassword,
      role: "admin"
    });

    console.log("Admin user created ✔");
  } catch (err) {
    console.log("Error seeding admin:", err);
  }
}

app.get("/", (req, res) => {
  res.send("Shift Board Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
