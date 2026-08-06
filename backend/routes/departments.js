const express = require("express");
const router = express.Router();
const Department = require("../models/Department");
const { protect } = require("../middleware/auth");

router.get("/", protect, async (req, res) => {
  try {
    const departments = await Department.find().sort({ name: 1 });
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const { name } = req.body;
    const exists = await Department.findOne({ name });
    if (exists) return res.status(400).json({ message: "Department already exists" });
    const dept = await Department.create({ name });
    res.status(201).json(dept);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: "Department deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
