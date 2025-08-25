const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

const API_URL = "http://localhost:3000/tasks";

async function loadTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span>${task.title}</span>
      <div>
        <button onclick="toggleTask(${task.id})">✔️</button>
        <button onclick="deleteTask(${task.id})">🗑️</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

taskForm.addEventListener("submit", async e => {
  e.preventDefault();
  const title = taskInput.value.trim();
  if (!title) return;
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });
  taskInput.value = "";
  loadTasks();
});

async function toggleTask(id) {
  await fetch(`${API_URL}/${id}`, { method: "PUT" });
  loadTasks();
}

async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadTasks();
}

loadTasks();

let currentFilter = "all";

async function loadTasks() {
  const res = await fetch(API_URL);
  let tasks = await res.json();

  // Apply filter
  if (currentFilter === "pending") {
    tasks = tasks.filter(task => task.completed === 0);
  } else if (currentFilter === "completed") {
    tasks = tasks.filter(task => task.completed === 1);
  }

  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span>${task.title}</span>
      <div>
        <button onclick="toggleTask(${task.id})">✔️</button>
        <button onclick="deleteTask(${task.id})">🗑️</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Filter function
function filterTasks(type) {
  currentFilter = type;
  loadTasks();
}
