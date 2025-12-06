const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
  employeeName: { type: String, required: true },
  employeeCode: { type: String, required: true },
  department: { type: String, required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true }
});

module.exports = mongoose.model("Shift", shiftSchema);
