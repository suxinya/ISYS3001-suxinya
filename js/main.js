// 1. Get HTML elements (find input field, add button, task list by their ids)
const taskInput = document.getElementById('taskInput'); // Input field
const addBtn = document.getElementById('addBtn'); // Add button
const taskList = document.getElementById('taskList'); // Task list

// 2. Add Task function: Triggered when button is clicked or Enter key is pressed
function addTask() {
    const taskText = taskInput.value.trim(); // Get input value and remove leading/trailing spaces
    if (taskText === '') { // If input is empty, show alert and do not add task
        alert('Please enter a task before adding!');
        return;
    }

    // 2.1 Create a single task item (<li> tag)
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item'; // Add CSS class to task item for styling

    // 2.2 Create task text (<span> tag)
    const taskTextSpan = document.createElement('span');
    taskTextSpan.className = 'task-text';
    taskTextSpan.textContent = taskText; // Set task text content

    // 2.3 Add click event to task text: Toggle completion status on click
    taskTextSpan.addEventListener('click', function() {
        this.classList.toggle('completed'); // Toggle CSS class (add if not present, remove if present)
    });

    // 2.4 Create delete button (<button> tag)
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';

    // 2.5 Add click event to delete button: Remove task on click
    deleteBtn.addEventListener('click', function() {
        taskItem.remove(); // Remove current task item from the page
    });

    // 2.6 Assemble task item: Put text and delete button into <li>, then add <li> to task list
    taskItem.appendChild(taskTextSpan);
    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);

    // 2.7 Clear input field: Empty the input box after task is added for next entry
    taskInput.value = '';
}

// 3. Add click event to "Add Button": Trigger addTask function when clicked
addBtn.addEventListener('click', addTask);

// 4. Add "Enter" key event to input field: Allow adding task by pressing Enter (more convenient)
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') { // Check if the pressed key is Enter
        addTask(); // Trigger addTask function
    }
});