
const pendingList = document.getElementById('pending');
const completedList = document.getElementById('completed');
const pastDueList = document.getElementById('past-due');
const taskForm = document.getElementById('task-form');
const taskName = document.getElementById('task-name');
const taskDatetime = document.getElementById('task-datetime');
const taskPerson = document.getElementById('task-person');
const greeting = document.getElementById('greeting');

const userName = localStorage.getItem('userName');
if (userName) {
    greeting.textContent = `Hello, ${userName}! Welcome to Tasky`;
} else {
    window.location.href = 'index.html';
}

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    pendingList.innerHTML = '';
    completedList.innerHTML = '';
    pastDueList.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.innerHTML = `
            <div>${task.name}</div><br>
            <p>${new Date(task.datetime).toLocaleString()}</p><br>
            <p>Assigned to: ${task.person}</p><br>
            <button onclick="markCompleted('${task.id}')">Mark as Completed</button>
            <button onclick="deleteTask('${task.id}')">Delete</button>
        `;

        if (task.status === 'completed') {
            completedList.appendChild(taskElement);
        } else if (task.status === 'past-due') {
            pastDueList.appendChild(taskElement);
        } else {
            if (new Date(task.datetime) < new Date()) {
                task.status = 'past-due';
                pastDueList.appendChild(taskElement);
            } else {
                pendingList.appendChild(taskElement);
            }
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

markCompleted = function(taskId) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.status = 'completed';
        }
        return task;
    });
    renderTasks();
}

deleteTask = function(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}

taskForm.addEventListener('submit', event => {
    event.preventDefault();
    const id = 'task-' + new Date().getTime();
    const task = {
        id,
        name: taskName.value,
        datetime: taskDatetime.value,
        person: taskPerson.value,
        status: 'pending'
    };
    tasks.push(task);
    renderTasks();
    taskForm.reset();
});

renderTasks();


const modal = document.getElementById("myModal");
const btn = document.getElementById("openModalBtn");
const submitButton = document.getElementById("submit");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
modal.style.display = "block";
}

span.onclick = function() {
modal.style.display = "none";
}

submitButton.onclick = function() {
modal.style.display = "none";
}

window.onclick = function(event) {
if (event.target == modal) {
    modal.style.display = "none";
}
}