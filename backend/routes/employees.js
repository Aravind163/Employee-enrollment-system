const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Employee = require("../models/Employee");
const { protect } = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../uploads/avatars");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `avatar_${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files allowed"), false);
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.get("/", protect, async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { employeeId: { $regex: search, $options: "i" } },
          { department: { $regex: search, $options: "i" } },
          { designation: { $regex: search, $options: "i" } },
          { project: { $regex: search, $options: "i" } },
        ],
      };
    }
    const employees = await Employee.find(query).sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", protect, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", protect, upload.single("avatar"), async (req, res) => {
  try {
    const { name, employeeId, department, designation, project, type, status } = req.body;

    const exists = await Employee.findOne({ employeeId });
    if (exists) return res.status(400).json({ message: "Employee ID already exists" });

    const avatar = req.file
      ? `/uploads/avatars/${req.file.filename}`
      : "";

    const employee = await Employee.create({
      name, employeeId, department, designation, project, type, status, avatar,
    });
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", protect, upload.single("avatar"), async (req, res) => {
  try {
    const { name, employeeId, department, designation, project, type, status } = req.body;
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    const dup = await Employee.findOne({ employeeId, _id: { $ne: req.params.id } });
    if (dup) return res.status(400).json({ message: "Employee ID already in use" });

    employee.name = name || employee.name;
    employee.employeeId = employeeId || employee.employeeId;
    employee.department = department || employee.department;
    employee.designation = designation || employee.designation;
    employee.project = project !== undefined ? project : employee.project;
    employee.type = type || employee.type;
    employee.status = status || employee.status;
    if (req.file) employee.avatar = `/uploads/avatars/${req.file.filename}`;

    const updated = await employee.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    if (employee.avatar) {
      const filePath = path.join(__dirname, "..", employee.avatar);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await employee.deleteOne();
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
