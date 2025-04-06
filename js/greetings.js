const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const userBox = document.querySelector("#hidden");
const greeting = userBox.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

const icons = ["a.webp", "e.webp"];
const icon = userBox.querySelector("img");
const num = Math.floor(Math.random() * icons.length);
icon.src = `img/${icons[num]}`;
icon.addEventListener("click", showTodo);

if (icons[num] === "a.webp") {
  icon.classList.add("scale");
} else {
  icon.classList.add("move");
}

function showTodo() {
  const todoBox = document.querySelector("#todoBox");
  todoBox.classList.contains("hidden")
    ? todoBox.classList.remove("hidden")
    : todoBox.classList.add("hidden");
  todoBox.scrollTop = todoBox.scrollHeight;
}

const date = new Date();
const hours = date.getHours();

function onLoginSubmit(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  paintUserBox(username);
}

function paintUserBox(username) {
  loginForm.style.display = "none";
  if (hours < 12) {
    greeting.innerText = `Good morning, ${username}.`;
  } else if (hours < 18) {
    greeting.innerText = `Good afternoon, ${username}.`;
  } else {
    greeting.innerText = `Good evening, ${username}.`;
  }
  userBox.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);
if (savedUsername === null) {
  loginForm.style.display = "display";
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  paintUserBox(savedUsername);
}
