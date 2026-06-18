const themeToggle = document.querySelector("#themeToggle");
const taskInput = document.querySelector("#taskInput");
const catagorySelect = document.querySelector("#catagory");
const addTaskBtn = document.querySelector("#addTaskBtn");
const tasksDiv = document.querySelector("#tasks");
const main = document.querySelector("main");

let tasksArr = JSON.parse(localStorage.getItem("tasks")) || [];

main.classList.add("dark");
themeToggle.textContent = "☀️ Light";

let updateIndex = null;

let ui = () => {
  tasksDiv.innerHTML = "";
  tasksArr.forEach((task) => {
    tasksDiv.innerHTML += `<div class="task-card ${task.status === "completed" ? "completed" : ""}">
          <div class="task-body">
            <div class="task-title">${task.title}</div>
            <div class="task-type">Category: ${task.category} | Status: ${task.status}</div>
          </div>
          <div class="task-actions">
            <button onclick="toggleComplete('${task.title}')">✔</button>
            <button onclick="editTask('${task.title}')">Edit</button>
            <button onclick="deleteTask('${task.title}')">Delete</button>
          </div>
        </div>`;
  });
};

ui();

themeToggle.addEventListener("click", () => {
  let isDark = main.classList.contains("dark");
  main.classList.replace(isDark ? "dark" : "light", isDark ? "light" : "dark");
  themeToggle.textContent = isDark ? "🌙 Dark" : "☀️ Light";
});

addTaskBtn.addEventListener("click", () => {
  let title = taskInput.value.trim();
  let category = catagorySelect.value;

  if (title === "") return;

  if (updateIndex !== null) {
    tasksArr[updateIndex].title = title;
    tasksArr[updateIndex].category = category;
    updateIndex = null;
    addTaskBtn.textContent = "Add Task";
  } else {
    let obj = {
      title,
      category,
      status: "active",
    };
    tasksArr.push(obj);
  }

  localStorage.setItem("tasks", JSON.stringify(tasksArr));
  ui();

  taskInput.value = "";
  catagorySelect.value = "easy";
});

const deleteTask = (name) => {
  let index = tasksArr.findIndex((elem) => elem.title === name);
  tasksArr.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
  ui();
};

const toggleComplete = (name) => {
  let task = tasksArr.find((elem) => elem.title === name);
  task.status = task.status === "completed" ? "active" : "completed";
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
  ui();
};

const editTask = (name) => {
  let task = tasksArr.find((elem) => elem.title === name);
  updateIndex = tasksArr.findIndex((elem) => elem.title === name);
  taskInput.value = task.title;
  catagorySelect.value = task.category;
  addTaskBtn.textContent = "Update Task";
};
