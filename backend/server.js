const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
const PORT = 3000;

app.use(cors()); // อนุญาต Frontend port อื่นเรียก API
app.use(express.json());

// GET all tasks
app.get("/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST new task
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "กรุณาใส่ title" });

  db.run("INSERT INTO tasks (title) VALUES (?)", [title], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, title, completed: 0 });
  });
app.post("/categories", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "กรุณาใส่ name" });

  db.run("INSERT INTO categories (name) VALUES (?)", [name], function(err){
    if(err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, name });
  });
});
});

// PUT toggle completed
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM tasks WHERE id = ?", [id], (err, row) => {
    if (!row) return res.status(404).json({ error: "ไม่พบ task นี้" });

    const newStatus = row.completed ? 0 : 1;
    db.run("UPDATE tasks SET completed = ? WHERE id = ?", [newStatus, id], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ ...row, completed: newStatus });
    });
  });
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "ลบสำเร็จ" });
  });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});

