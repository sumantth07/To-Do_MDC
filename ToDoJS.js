/*const enterButton = document.getElementById('enter-button');
        const taskInput = document.getElementById('task');
        const timeInput = document.getElementById('task-time');
        const list = document.getElementById('listof');

        // --- Add Task Logic ---
        function addTask() {
            const taskText = taskInput.value;
            const timeValue = timeInput.value;

            if (taskText.trim() === '') {
                alert("Please enter a task.");
                return;
            }

            const newtask = document.createElement('li');
            
            const taskContentDiv = document.createElement('div');
            taskContentDiv.className = 'task-content';

            const taskTextSpan = document.createElement('span');
            taskTextSpan.className = 'task-text';
            taskTextSpan.textContent = taskText;
            taskContentDiv.appendChild(taskTextSpan);

            if (timeValue) {
                const timestampSpan = document.createElement('span');
                timestampSpan.className = 'task-time';
                const formattedTime = new Date(timeValue).toLocaleString();
                timestampSpan.textContent = formattedTime;
                taskContentDiv.appendChild(timestampSpan);
            }

            const doneButton = document.createElement('button');
            doneButton.className = 'done-button';
            doneButton.textContent = 'Done';

            newtask.appendChild(taskContentDiv);
            newtask.appendChild(doneButton);
            list.appendChild(newtask);

            taskInput.value = '';
            timeInput.value = '';
        }

        enterButton.addEventListener('click', addTask);
        taskInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                addTask();
            }
        });

        // --- Delete Task Logic (using Event Delegation) ---
        list.addEventListener('click', function(event) {
            if (event.target.classList.contains('done-button')) {
                const listItemToRemove = event.target.parentElement;
                listItemToRemove.remove();
            }
        });
        */
const enterButton = document.getElementById('enter-button');
const task = document.getElementById('task');
const time = document.getElementById('task-time');
const list = document.getElementById('listof');

let tasks=[];

function addtask(){
    const tasktext = task.value;
    const completeByTime = time.value;
    if(tasktext.trim()=== ''){
        alert("please enter a task!")
        return;
    }
    const newTask ={
        id: Date.now(),
        text:tasktext,
        time:completeByTime,
        completed: false,

    }
    tasks.push(newTask);
    const li = document.createElement('li');
    li.setAttribute('data-id', newTask.id);
    li.innerHTML = `
        <div class="task-content">
            <span class="task-text">${tasktext}</span>
            ${completeByTime ? `<span class="task-time">${new Date(completeByTime).toLocaleString()}</span>` : ''}
        </div>
        <button class="done-button">Done</button>
    `;
    
    list.appendChild(li);
    task.value = '';
    time.value = '';
    saveToLocalStorage();

}
function saveToLocalStorage(){
    localStorage.setItem('taskslist',JSON.stringify(tasks));
}
function loadFromLocalStorage() {
    const savedTasks = localStorage.getItem('taskslist');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        console.log('Tasks loaded:', tasks); 
        
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.setAttribute('data-id', task.id);

            li.innerHTML = `
                <div class="task-content">
                    <span class="task-text">${task.text}</span>
                    ${task.time ? `<span class="task-time">${new Date(task.time).toLocaleString()}</span>` : ''}
                </div>
                <button class="done-button">Done</button>
            `;
            list.appendChild(li);
        });
    }
}

list.addEventListener('click', function(event) {
    if (event.target.classList.contains('done-button')) {
        const li = event.target.parentElement;
        const taskId = li.getAttribute('data-id');

        tasks = tasks.filter(task => task.id !== Number(taskId));
        li.remove();
        saveToLocalStorage();
    }
});

enterButton.addEventListener('click',addtask);
task.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addtask();
    }
});
loadFromLocalStorage();

const resetButton = document.getElementById('reset-button');

resetButton.addEventListener('click', function() {
    
    if (confirm('Are you sure you want to clear all tasks?')) {
    
        localStorage.removeItem('taskslist');
        tasks = [];
        list.innerHTML = '';
        task.value = '';
        time.value = '';
        
    }
});