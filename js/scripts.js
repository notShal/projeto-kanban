const $modal = document.getElementById('modal');
const $descriptionInput = document.getElementById('description');
const $priorityInput = document.getElementById('priority');
const $deadLineInput = document.getElementById('deadLine');
const $idInput = document.getElementById('idInput');

const $todoColumnBody = document.querySelector('#todoColumn .body');

const $creationModeTitle = document.getElementById('creationModeTitle');
const $editModeTitle = document.getElementById('editModeTitle');

const $creationModeBtn = document.getElementById('creationModeBtn');
const $editModeBtn = document.getElementById('editModeBtn');

var todoList = [];

function openModal(id) {
    $modal.style.display = "flex";

    if (id) {
        $creationModeTitle.style.display = "none";
        $creationModeBtn.style.display = "none";

        $editModeTitle.style.display = "block";
        $editModeBtn.style.display = "block";

        const index = todoList.findIndex(function (task) {
            return task.id == id;
        });

        const task = todoList[index];

        $idInput.value = task.id;
        $descriptionInput.value = task.description;
        $priorityInput.value = task.priority;
        $deadLineInput.value = task.deadLine;
    } else {
        $creationModeTitle.style.display = "block";
        $creationModeBtn.style.display = "block";

        $editModeTitle.style.display = "none";
        $editModeBtn.style.display = "none";

    }
}

function closeModal() {
    $modal.style.display = "none";

    $idInput.value = "";
    $descriptionInput.value = "";
    $priorityInput.value = "";
    $deadLineInput.value = "";
}

function generateCards() {
    const todoListHtml = todoList.map(function (task) {
        const formattedDate = moment(task.deadLine).format('DD/MM/YYYY');
        return `
            <div class="card" ondblclick="openModal(${task.id})">
                <div class="info">
                    <b>Descrição:</b>
                    <span>${task.description}</span>
                </div>

                <div class="info">
                    <b>Prioridade:</b>
                    <span>${task.priority}</span>
                </div>

                <div class="info">
                    <b>Prazo:</b>
                    <span>${formattedDate}</span>
                </div>
            </div>
        `;
    });

    $todoColumnBody.innerHTML = todoListHtml.join('');
}

function createTask() {

    const newTask = {
        id: Math.floor(Math.random() * 9999999),
        description: $descriptionInput.value,
        priority: $priorityInput.value,
        deadLine: $deadLineInput.value,
    }

    todoList.push(newTask);

    closeModal();
    generateCards();
}

function updateTask() {
    const task = {
        id: $idInput.value,
        description: $descriptionInput.value,
        priority: $priorityInput.value,
        deadLine: $deadLineInput.value,        
    }

    const index = todoList.findIndex(function(task) {
        return task.id == $idInput.value;
    });

    todoList[index] = task;

    closeModal();
    generateCards();
}



