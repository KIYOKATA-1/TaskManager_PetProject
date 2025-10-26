let allTasks = [];
let Done = [];
let InProgress = [];
let Rejected = [];

function getData(key) {
  return new Promise((resolve) => {
    const data = JSON.parse(localStorage.getItem(key)) || [];
    resolve(data);
  });
}

function saveData(key, value) {
  return new Promise((resolve) => {
    localStorage.setItem(key, JSON.stringify(value));
    resolve();
  });
}

function getAllTasks() {
  return Promise.all([
    getData("tasks"),
    getData("Done"),
    getData("InProgress"),
    getData("Rejected"),
  ]).then(([tasks, done, inProgress, rejected]) => {
    allTasks = tasks;
    Done = done;
    InProgress = inProgress;
    Rejected = rejected;
    renderTasks(tasks);
  });
}

function renderTasks(tasks) {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = "<p>No tasks found.</p>";
    return;
  }

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";

    const colorMap = {
      Done: "#00c853",
      "In Progress": "#ffab00",
      Rejected: "#d32f2f",
    };

    const labelMap = {
      Done: "Done",
      "In Progress": "In Progress",
      Rejected: "Rejected",
    };

    const borderColor = colorMap[task.status] || "#7b5cff";
    taskItem.style.borderLeft = `4px solid ${borderColor}`;

    taskItem.innerHTML = `
      <div class="task-header">
        <input type="checkbox" id="task-${index}" class="delete-checkbox">
        <label for="task-${index}"><h3>${task.title}</h3></label>
      </div>
      <p>${task.description}</p>
      <p><b>Deadline:</b> ${task.deadline}</p>
      <p><b>Priority:</b> ${task.priority}</p>
      <div class="status-buttons">
        <span class="status-badge ${task.status?.toLowerCase().replace(" ", "-") || "in-progress"}">
          ${labelMap[task.status] || "In Progress"}
        </span>
        <div class="status-controls">
          <button class="status-btn done"><p>Done</p></button>
          <button class="status-btn progress">In Progress...</button>
          <button class="status-btn reject">Reject</button>
        </div>
      </div>
      <hr>
    `;

    const checkbox = taskItem.querySelector(".delete-checkbox");
    checkbox.addEventListener("change", () => {
      if (checkbox.checked && confirm(`Delete task "${task.title}"?`)) {
        deleteTask(index);
      } else {
        checkbox.checked = false;
      }
    });

    const doneBtn = taskItem.querySelector(".done");
    const progressBtn = taskItem.querySelector(".progress");
    const rejectBtn = taskItem.querySelector(".reject");

    doneBtn.addEventListener("click", async () => {
      task.status = "Done";
      Done.push(task);
      tasks.splice(index, 1);
      await saveAll(tasks);
      await getAllTasks();
    });

    progressBtn.addEventListener("click", async () => {
      task.status = "In Progress";
      InProgress.push(task);
      tasks.splice(index, 1);
      await saveAll(tasks);
      await getAllTasks();
    });

    rejectBtn.addEventListener("click", async () => {
      task.status = "Rejected";
      Rejected.push(task);
      tasks.splice(index, 1);
      await saveAll(tasks);
      await getAllTasks();
    });

    taskList.appendChild(taskItem);
  });
}

function saveAll(tasks) {
  return Promise.all([
    saveData("tasks", tasks),
    saveData("Done", Done),
    saveData("InProgress", InProgress),
    saveData("Rejected", Rejected),
  ]);
}

function deleteTask(index) {
  return getData("tasks").then(async (tasks) => {
    tasks.splice(index, 1);
    await saveData("tasks", tasks);
    await getAllTasks();
  });
}

function searchTasks(query) {
  const filtered = allTasks.filter((task) =>
    task.title.toLowerCase().includes(query.toLowerCase())
  );
  renderTasks(filtered);
}

document.addEventListener("DOMContentLoaded", async () => {
  await getAllTasks();
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", (e) => searchTasks(e.target.value));
});
