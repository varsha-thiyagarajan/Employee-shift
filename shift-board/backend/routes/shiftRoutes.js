const express = require("express");
const router = express.Router();
const Shift = require("../models/shift");
const { authMiddleware, requireRole } = require("../middleware/auth");

// --------------------
// CREATE SHIFT (Admin Only)
// --------------------
router.post("/", authMiddleware, requireRole("admin"), async (req, res) => {
  console.log("SHIFT REQUEST RECEIVED:", req.body);
  try {

    const { employeeName, employeeCode, department, date, startTime, endTime } = req.body;

    // Convert times to minutes
    const [sh, sm] = startTime.split(":").map(Number);
    const [eh, em] = endTime.split(":").map(Number);

    const startMinutes = sh * 60 + sm;
    const endMinutes = eh * 60 + em;

    // Rule 1: Minimum 4 hours
    if (endMinutes - startMinutes < 240) {
      return res.status(400).json({ message: "Shift must be at least 4 hours" });
    }

    // Rule 2: No overlapping shifts for same employee & same date
    const existingShifts = await Shift.find({ employeeCode, date });

    const overlap = existingShifts.some(shift => {
      const [sSh, sSm] = shift.startTime.split(":").map(Number);
      const [sEh, sEm] = shift.endTime.split(":").map(Number);
      const existingStart = sSh * 60 + sSm;
      const existingEnd = sEh * 60 + sEm;

      return startMinutes < existingEnd && existingStart < endMinutes;
    });

    if (overlap) {
      return res.status(400).json({ message: "Overlapping shift for this employee" });
    }

    // Save shift
    const newShift = await Shift.create({
      employeeName,
      employeeCode,
      department,
      date,
      startTime,
      endTime
    });

    res.json({ message: "Shift created successfully", shift: newShift });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// --------------------
// GET SHIFTS (Admin sees all, user sees only their own)
// --------------------
router.get("/", authMiddleware, async (req, res) => {
  try {
    const role = req.user.role;

    if (role === "admin") {
      const shifts = await Shift.find().sort({ date: 1 });
      return res.json(shifts);
    }

    // Normal user → filter by their email or code
    const email = req.user.email;

    // If you want to filter by employeeCode instead:
    // const shifts = await Shift.find({ employeeCode: req.user.employeeCode });

    const shifts = await Shift.find({ employeeName: email });

    res.json(shifts);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// --------------------
// DELETE SHIFT (Admin Only)
// --------------------
router.delete("/:id", authMiddleware, requireRole("admin"), async (req, res) => {
  try {
    await Shift.findByIdAndDelete(req.params.id);
    res.json({ message: "Shift deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
