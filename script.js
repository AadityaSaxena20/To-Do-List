// script.js
const taskInput = document.getElementById("taskinput");
const taskForm = document.querySelector("form");
const taskList = document.querySelector(".tasklist");
const statsText = document.getElementById("numbers");
const progress = document.getElementById("progress");

let tasks = [];

function updateStats() {
  const completed = tasks.filter((task) => task.completed).length;
  const total = tasks.length;
  statsText.textContent = `${completed}/${total}`;
  const percentage = total > 0 ? (completed / total) * 100 : 0;
  progress.style.width = `${percentage}%`;
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.justifyContent = "space-between";
    li.style.gap = "40px";
    li.style.background = "var(--secondaryBackground)";
    li.style.color = "white";
    li.style.marginTop = "10px";
    li.style.padding = "12px 20px";
    li.style.borderRadius = "12px";

    const left = document.createElement("div");
    left.style.display = "flex";
    left.style.alignItems = "center";
    left.style.gap = "15px";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      renderTasks();
      updateStats();
    });

    const span = document.createElement("span");
    span.textContent = task.text;
    span.style.textDecoration = task.completed ? "line-through" : "none";

    left.appendChild(checkbox);
    left.appendChild(span);

    const right = document.createElement("div");
    right.style.display = "flex";
    right.style.alignItems = "center";
    right.style.gap = "18px";

    const editImg = document.createElement("img");
    editImg.src = "edit.png";
    editImg.alt = "Edit";
    editImg.style.cursor = "pointer";
    editImg.style.width = "22px";
    editImg.style.height = "22px";
    editImg.addEventListener("click", () => {
      const newText = prompt("Edit your task", task.text);
      if (newText) {
        task.text = newText;
        renderTasks();
      }
    });

    const deleteImg = document.createElement("img");
    deleteImg.src = "bin.png";
    deleteImg.alt = "Delete";
    deleteImg.style.cursor = "pointer";
    deleteImg.style.width = "22px";
    deleteImg.style.height = "22px";
    deleteImg.addEventListener("click", () => {
      tasks.splice(index, 1);
      renderTasks();
      updateStats();
    });

    right.appendChild(editImg);
    right.appendChild(deleteImg);

    li.appendChild(left);
    li.appendChild(right);

    taskList.appendChild(li);
  });
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text !== "") {
    tasks.push({ text, completed: false });
    taskInput.value = "";
    renderTasks();
    updateStats();
  }
});

// Initialize with empty stats
updateStats();