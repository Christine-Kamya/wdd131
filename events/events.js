let tasks = [];

// Function to render the tasks list
function renderTasks() {
  const todoList = document.querySelector('#todoList');
  todoList.innerHTML = ''; // Clear the current task list

  tasks.forEach((task) => {
    // Create a new list item for each task
    const li = document.createElement('li');
    const taskContent = document.createElement('p');
    const deleteIcon = document.createElement('span');
    const completeIcon = document.createElement('span');

    // Set up task content
    taskContent.textContent = task.detail;
    if (task.completed) {
      taskContent.classList.add('strike'); // Apply the strike class if task is completed
    }

    // Set up delete icon
    deleteIcon.textContent = '❌';
    deleteIcon.dataset.action = 'delete'; // Add a data attribute for delete action

    // Set up complete icon
    completeIcon.textContent = '✅';
    completeIcon.dataset.action = 'complete'; // Add a data attribute for complete action

    // Append content and icons to the list item
    li.appendChild(taskContent);
    li.appendChild(completeIcon);
    li.appendChild(deleteIcon);

    // Append the list item to the task list
    todoList.appendChild(li);
  });
}

// Function to add a new task
function newTask() {
  // Get the value entered in the #todo input field
  const taskDetail = document.querySelector('#todo').value;

  // Check if the input is not empty
  if (taskDetail) {
    // Create a task object and add it to the tasks array
    const newTask = {
      detail: taskDetail,
      completed: false,
    };
    tasks.push(newTask);

    // Render the updated list
    renderTasks();

    // Clear the input field after adding the task
    document.querySelector('#todo').value = '';
  }
}

// Function to remove a task
function removeTask(taskElement) {
  // Remove task from the array
  tasks = tasks.filter(
    (task) => task.detail !== taskElement.querySelector('p').innerText
  );
  // Remove task element from the DOM
  taskElement.remove();
}

// Function to complete a task
function completeTask(taskElement) {
  const taskIndex = tasks.findIndex(
    (task) => task.detail === taskElement.querySelector('p').innerText
  );
  // Toggle the completed status of the task
  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  // Toggle the strike class to visually show completion
  taskElement.classList.toggle('strike');
}

// Function to manage tasks (either delete or complete a task)
function manageTasks(event) {
  const taskElement = event.target.closest('li');

  // Check if the user clicked the delete or complete icon
  if (event.target.dataset.action === 'delete') {
    removeTask(taskElement);
  } else if (event.target.dataset.action === 'complete') {
    completeTask(taskElement);
  }
}

// Add event listeners
document.querySelector('#submitTask').addEventListener('click', newTask);
document.querySelector('#todoList').addEventListener('click', manageTasks);
