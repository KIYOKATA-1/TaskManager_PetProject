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

    const newTask = { title, description, deadline, priority };
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    alert('Task created successfully!');
    window.location.href = '/home.html';
  });

  const aiBtn = document.querySelector('.ai-btn');
  const aiModal = document.getElementById('aiModal');
  const closeAI = document.querySelector('.close-ai');
  const sendAI = document.getElementById('sendAI');
  const aiInput = document.getElementById('aiInput');
  const chatBox = document.getElementById('chatBox');

  aiBtn.addEventListener('click', () => {
    aiModal.style.display = 'flex';
  });

  closeAI.addEventListener('click', () => {
    aiModal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === aiModal) aiModal.style.display = 'none';
  });

  sendAI.addEventListener('click', () => {
    const msg = aiInput.value.trim();
    if (!msg) return;

    const userMsg = document.createElement('p');
    userMsg.className = 'user-msg';
    userMsg.textContent = msg;
    chatBox.appendChild(userMsg);
    aiInput.value = '';

    const aiMsg = document.createElement('p');
    aiMsg.className = 'ai-msg';
    aiMsg.textContent = '🤖 Thinking... (AI logic will be added later)';
    chatBox.appendChild(aiMsg);

    chatBox.scrollTop = chatBox.scrollHeight;
  });
});
