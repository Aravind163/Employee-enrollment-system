const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    employeeId: { type: String, required: true, unique: true, trim: true },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    project: { type: String, default: "" },
    type: {
      type: String,
      enum: ["Office", "Remote", "Hybrid"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Permanent", "Contract", "Intern", "Part-time"],
      required: true,
    },
    avatar: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
