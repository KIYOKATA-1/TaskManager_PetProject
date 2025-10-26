function getTasks() {
  const all = JSON.parse(localStorage.getItem("tasks")) || [];
  const done = JSON.parse(localStorage.getItem("Done")) || [];
  const progress = JSON.parse(localStorage.getItem("InProgress")) || [];
  const rejected = JSON.parse(localStorage.getItem("Rejected")) || [];
  render(all, done, progress, rejected);
}

document.getElementById("backBtn").addEventListener("click", () => {
  window.location.href = "/home.html"});

function render(all, done, progress, rejected) {
  document.getElementById("todo-tasks").innerHTML = renderCards(all);
  document.getElementById("progress-tasks").innerHTML = renderCards(progress, "progress");
  document.getElementById("done-tasks").innerHTML = renderCards(done, "done");
  document.getElementById("rejected-tasks").innerHTML = renderCards(rejected, "rejected");
}

function renderCards(tasks, status = "todo") {
  if (tasks.length === 0) return "<p class='empty'>No tasks</p>";
  return tasks.map(t => `
    <div class="task ${status}">
      <h3>${t.title}</h3>
      <p>${t.description}</p>
      <p><b>Deadline:</b> ${t.deadline}</p>
      <p><b>Priority:</b> ${t.priority}</p>
    </div>
  `).join("");
}

document.getElementById("clear").addEventListener("click", () => {
  if (confirm("Clear all tasks?")) {
    localStorage.clear();
    getTasks();
  }
});

document.addEventListener("DOMContentLoaded", getTasks, navigateBack);
