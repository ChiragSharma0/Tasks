document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const saveButton = document.getElementById('save-btn');
    const tasksContainer = document.getElementById('tasks');

    // Load tasks from local storage on page load
    loadFromLocalStorage();

    // Event listener for save button
    saveButton.addEventListener('click', save);
    taskInput.addEventListener('input', vtrim);

    function save() {
        if (taskInput.value.trim() !== "") {
            createTask(taskInput.value);
            saveToLocalStorage();
            taskInput.value = ''; // Clear input after saving
        }
    }

    function vtrim() {
        if (this.value.length > 40) {
            this.value = this.value.slice(0, 40);
        }
    }

    // Generate a random color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Create a new task
    function createTask(taskValue, taskColor) {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';

        const color = taskColor || getRandomColor();

        taskDiv.innerHTML = `
            <div class="taskbox" style="background-color: ${color};">
                <div class="taskhead"><input type="text" value="${taskValue}" /></div>
                <div class="taskbtn">
                    <button class="delete-btn">&#128465;</button>
                </div>
            </div>
        `;

        tasksContainer.appendChild(taskDiv);

        // Add event listener for delete button
        taskDiv.querySelector('.delete-btn').addEventListener('click', function () {
            taskDiv.remove();
            saveToLocalStorage();
        });

        // Add functionality to other buttons (edit, up, down) as needed
    }

    // Save tasks to local storage
    function saveToLocalStorage() {
        const tasks = [];
        tasksContainer.querySelectorAll('.task').forEach(taskDiv => {
            const taskInput = taskDiv.querySelector('.taskhead input');
            tasks.push({
                value: taskInput.value,
                color: taskDiv.querySelector('.taskbox').style.backgroundColor
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from local storage
    function loadFromLocalStorage() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            tasksContainer.innerHTML = '';
            savedTasks.forEach(task => createTask(task.value, task.color));
        }
    }
});
