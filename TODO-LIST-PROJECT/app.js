const amgmTodoInput = document.querySelector(".amgm-todo-input");
const amgmAddButton = document.querySelector(".amgm-todo-button");
const amgmTodoList = document.querySelector(".amgm-todo-list");
const amgmFilterSelect = document.querySelector(".amgm-filter-todo");

document.addEventListener("DOMContentLoaded", amgmLoadSavedTodos);
amgmAddButton.addEventListener("click", amgmAddTodo);
amgmTodoList.addEventListener("click", amgmHandleTodoClick);
amgmFilterSelect.addEventListener("change", amgmFilterTodos);

function amgmAddTodo(event) {
    event.preventDefault();

    if (amgmTodoInput.value.trim() === "") return;

    const amgmTodoContainer = document.createElement("div");
    amgmTodoContainer.classList.add("todo");

    const amgmTodoText = document.createElement("li");
    amgmTodoText.innerText = amgmTodoInput.value;
    amgmTodoText.classList.add("todo-item");
    amgmTodoContainer.appendChild(amgmTodoText);

    amgmSaveTodoToLocal(amgmTodoInput.value);

    const amgmCheckBtn = document.createElement("button");
    amgmCheckBtn.innerHTML = '<i class="fas fa-check-circle"></i>';
    amgmCheckBtn.classList.add("complete-btn");
    amgmTodoContainer.appendChild(amgmCheckBtn);

    const amgmDeleteBtn = document.createElement("button");
    amgmDeleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    amgmDeleteBtn.classList.add("trash-btn");
    amgmTodoContainer.appendChild(amgmDeleteBtn);

    amgmTodoList.appendChild(amgmTodoContainer);
    amgmTodoInput.value = "";
}

function amgmHandleTodoClick(e) {
    const clicked = e.target;

    if (clicked.classList.contains("trash-btn")) {
        const todoItem = clicked.parentElement;
        todoItem.classList.add("slide");

        amgmRemoveTodoFromLocal(todoItem);
        todoItem.addEventListener("transitionend", () => {
            todoItem.remove();
        });
    }

    if (clicked.classList.contains("complete-btn")) {
        clicked.parentElement.classList.toggle("completed");
    }
}

function amgmFilterTodos(e) {
    const todos = amgmTodoList.childNodes;
    todos.forEach((todo) => {
        if (todo.nodeType === 1) {
            switch (e.target.value) {
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed":
                    todo.style.display = todo.classList.contains("completed") ? "flex" : "none";
                    break;
                case "incomplete":
                    todo.style.display = !todo.classList.contains("completed") ? "flex" : "none";
                    break;
            }
        }
    });
}

function amgmSaveTodoToLocal(todoText) {
    let todos = localStorage.getItem("amgmTodos")
        ? JSON.parse(localStorage.getItem("amgmTodos"))
        : [];
    todos.push(todoText);
    localStorage.setItem("amgmTodos", JSON.stringify(todos));
}

function amgmLoadSavedTodos() {
    let todos = localStorage.getItem("amgmTodos")
        ? JSON.parse(localStorage.getItem("amgmTodos"))
        : [];

    todos.forEach((todoText) => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const todoLi = document.createElement("li");
        todoLi.innerText = todoText;
        todoLi.classList.add("todo-item");
        todoDiv.appendChild(todoLi);

        const completeBtn = document.createElement("button");
        completeBtn.innerHTML = '<i class="fas fa-check-circle"></i>';
        completeBtn.classList.add("complete-btn");
        todoDiv.appendChild(completeBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.classList.add("trash-btn");
        todoDiv.appendChild(deleteBtn);

        amgmTodoList.appendChild(todoDiv);
    });
}

function amgmRemoveTodoFromLocal(todoElement) {
    let todos = localStorage.getItem("amgmTodos")
        ? JSON.parse(localStorage.getItem("amgmTodos"))
        : [];

    const todoText = todoElement.children[0].innerText;
    todos = todos.filter((todo) => todo !== todoText);
    localStorage.setItem("amgmTodos", JSON.stringify(todos));
}
