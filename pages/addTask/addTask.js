document.addEventListener('DOMContentLoaded', () => {
  const createBtn = document.getElementById('createTask');
  const titleInput = document.getElementById('title');
  const descriptionInput = document.getElementById('description');
  const deadlineInput = document.getElementById('deadline');
  const prioritySelect = document.getElementById('priority');
  const cancelBtn = document.getElementById('cancel');
  
  cancelBtn.addEventListener('click', () => {
    window.location.href = '/home.html'; 
  });

  createBtn.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const deadline = deadlineInput.value;
    const priority = prioritySelect.value;

    if (!title || !description || !deadline) {
      alert('Please fill in all fields.');
      return;
    }

    const newTask = {
      title,
      description,
      deadline,
      priority
    };

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    alert('Task created successfully!');
    window.location.href = '/home.html'; 
  });
});
