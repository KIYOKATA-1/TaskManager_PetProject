let allTasks = []; 


function getTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  allTasks = tasks; 
  renderTasks(tasks);
}

function renderTasks(tasks) {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    taskList.innerHTML = '<p>No tasks found.</p>';
    return;
  }

  tasks.forEach((task, index) => {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';

    taskItem.innerHTML = `
      <div class="task-header">
        <input type="checkbox" id="task-${index}" class="delete-checkbox">
        <label for="task-${index}"><h3>${task.title}</h3></label>
      </div>
      <p>${task.description}</p>
      <p><b>Deadline:</b> ${task.deadline}</p>
      <p><b>Priority:</b> ${task.priority}</p>
      <hr>
    `;

    const checkbox = taskItem.querySelector('.delete-checkbox');
    checkbox.addEventListener('change', () => {
      if (checkbox.checked && confirm(`Delete task "${task.title}"?`)) {
        deleteTask(index);
      } else {
        checkbox.checked = false;
      }
    });

    taskList.appendChild(taskItem);
  });
}

function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTasks();
}

function searchTasks(query) {
  const filtered = allTasks.filter(task =>
    task.title.toLowerCase().includes(query.toLowerCase())
  );
  renderTasks(filtered);
}

function openInstagram() {
  const instButton = document.getElementById('inst');
  if (!instButton) return;

  instButton.addEventListener('click', (event) => {
    event.preventDefault();

    const fileId = "1ua1eRw_2PVHBJb7G7iCW8HG--myb7sqX";
    const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;

    const popup = document.createElement('div');
    popup.className = 'instagram-popup';
    popup.innerHTML = `
      <div class="instagram-content">
        <span class="close-btn">&times;</span>
        <iframe 
          src="${previewUrl}" 
          width="720" 
          height="480" 
          allow="autoplay" 
          style="border:none;border-radius:10px;">
        </iframe>
      </div>
    `;
    document.body.appendChild(popup);

    requestAnimationFrame(() => popup.classList.add('active'));

    popup.querySelector('.close-btn').addEventListener('click', () => {
      popup.classList.remove('active');
      setTimeout(() => popup.remove(), 300);
    });
  });
}


document.addEventListener('DOMContentLoaded', () => {
  getTasks();
  openInstagram();

  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', (e) => {
    searchTasks(e.target.value);
  });
});
