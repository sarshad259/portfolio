document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value;

        if (taskText !== '') {
            // Create new task item
            const li = document.createElement('li');
            li.textContent = taskText;

            // Create delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'delete❌';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', function() {
                li.remove();
            });

            // Append delete button to task item
            li.appendChild(deleteBtn);

            // Append task item to task list
            taskList.appendChild(li);

            // Clear input field
            taskInput.value = '';
        }
    });
});
