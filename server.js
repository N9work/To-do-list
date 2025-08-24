const express = require("express");
const app = express();
app.use(express.json());

// -------------------------
// เก็บ Task ไว้ใน array (ยังไม่ใช้ DB)
let tasks = [];
let nextId = 1;

// CREATE - เพิ่ม Task ใหม่
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  const newTask = { id: nextId++, title, done: false };
  tasks.push(newTask);
  res.json(newTask);
});

// READ - แสดง Task ทั้งหมด
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// UPDATE - แก้ไข Task ตาม id
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, done } = req.body;
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });

  if (title !== undefined) task.title = title;
  if (done !== undefined) task.done = done;

  res.json(task);
});

// DELETE - ลบ Task ตาม id
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.json({ message: "Task deleted" });
});

// -------------------------
app.listen(3000, () => {
  console.log("To-do API running at http://localhost:3000");
});