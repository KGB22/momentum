const todoBox = document.querySelector("#todoBox");
const todoForm = document.querySelector("#todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector("#todo-list");

const TODOS_KEY = "todos";
const DONE_TODOS_KEY = "doneTodos";
let todos = [];
let doneTodos = [];

function savedDoneTodo() {
  localStorage.setItem(DONE_TODOS_KEY, doneTodos);
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

//todo가 없을 경우 코멘트 보여지도록 설정
function addTodoComment() {
  const todoInfo = document.querySelector("#todo-info");
  if (todos.length === 0) {
    todoInfo.classList.remove("hidden");
  } else {
    todoInfo.classList.add("hidden");
  }
}
//todo 추가할 때마다 scroll 맨 아래로
function scrollToBottom() {
  todoBox.scrollTop = todoBox.scrollHeight;
  addTodoComment();
}
//todo 로컬 저장
function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

//todo 로컬 및 화면에서 삭제
function deleteTodo(event) {
  const li = event.target.closest("div[id]");
  li.remove();
  todos = todos.filter((todo) => todo.id !== parseInt(li.id));
  saveTodos();
  addTodoComment();
}

//todo 조회
function paintTodo(newTodo) {
  const li = document.createElement("div");
  li.id = newTodo.id;
  const check = document.createElement("span");
  const span = document.createElement("span");
  check.innerHTML = `<i class="bi bi-square"></i>`;
  span.innerText = newTodo.text;
  span.id = "todo-content";
  const btn = document.createElement("span");
  btn.innerHTML = `<i class="bi bi-x-square"></i>`;
  btn.addEventListener("click", deleteTodo);
  li.appendChild(check);
  li.appendChild(span);
  li.appendChild(btn);
  todoList.appendChild(li);
  check.id = "check";
  check.addEventListener("click", () => {
    if (!li.classList.contains("done1")) {
      check.innerHTML = `<i class="bi bi-check-square-fill"></i>`;
      li.classList.add("done1");
    } else {
      check.innerHTML = `<i class="bi bi-square"></i>`;
      li.classList.remove("done1");
    }
  });
  scrollToBottom();
}

//todo submit
function handleTodoSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";
  const newTodoObj = { text: newTodo, id: Date.now() };
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

const savedDoneTodos = localStorage.getItem(DONE_TODOS_KEY);

if (savedDoneTodos !== null) {
  const parseDoneTodos = JSON.parse(savedDoneTodos);
  doneTodos = parseDoneTodos;
  parseDoneTodos.forEach(paintTodo);
}
