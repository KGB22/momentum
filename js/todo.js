const todoBox = document.querySelector("#todoBox");
const todoForm = document.querySelector("#todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector("#todo-list");

const TODOS_KEY = "todos";
let todos = [];

function addTodoComment() {
  const todoInfo = document.querySelector("#todo-info");
  if (todos.length === 0) {
    todoInfo.classList.remove("hidden");
  } else {
    todoInfo.classList.add("hidden");
  }
}

function scrollToBottom() {
  todoBox.scrollTop = todoBox.scrollHeight;
  addTodoComment();
}

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteTodo(event) {
  const li = event.target.closest("div[id]");
  li.remove();
  todos = todos.filter((todo) => todo.id !== parseInt(li.id));
  saveTodos();
  addTodoComment();
}

function paintTodo(newTodo) {
  const li = document.createElement("div");
  li.id = newTodo.id;

  const check = document.createElement("span");
  const span = document.createElement("span");
  const btn = document.createElement("span");

  check.innerHTML = `<i class="bi bi-square"></i>`;
  span.innerText = newTodo.text;
  span.id = "todo-content";
  btn.innerHTML = `<i class="bi bi-x-square"></i>`;

  check.id = "check";
  btn.addEventListener("click", deleteTodo);

  // ✅ 저장된 save 값이 "Y"인 경우 체크된 상태로 표시
  if (newTodo.save === "Y") {
    check.innerHTML = `<i class="bi bi-check-square-fill"></i>`;
    li.classList.add("done1");
  }

  check.addEventListener("click", () => {
    const target = todos.find((todo) => todo.id === newTodo.id);
    if (!li.classList.contains("done1")) {
      check.innerHTML = `<i class="bi bi-check-square-fill"></i>`;
      li.classList.add("done1");
      if (target) target.save = "Y";
    } else {
      check.innerHTML = `<i class="bi bi-square"></i>`;
      li.classList.remove("done1");
      if (target) target.save = "N";
    }
    saveTodos();
  });

  li.appendChild(check);
  li.appendChild(span);
  li.appendChild(btn);
  todoList.appendChild(li);

  scrollToBottom();
}

function handleTodoSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";
  const newTodoObj = { text: newTodo, id: Date.now(), save: "N" };
  todos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodos();
}

todoForm.addEventListener("submit", handleTodoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);
if (savedTodos !== null) {
  const parseTodos = JSON.parse(savedTodos);
  todos = parseTodos;
  parseTodos.forEach(paintTodo);
}

//Todo option 선택 (today, done)
// const option = todoBox.querySelector("#option");
// const today1 = option.querySelector("#today1");
// const done1 = option.querySelector("#done1");
// today1.addEventListener("click", () => {
//   if (!today1.classList.contains("select")) {
//     done1.classList.remove("select");
//     today1.classList.add("select");
//   }
// });
// done1.addEventListener("click", () => {
//   if (!done1.classList.contains("select")) {
//     today1.classList.remove("select");
//     done1.classList.add("select");
//   }
// });
