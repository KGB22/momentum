const mainGoalForm = document.querySelector("#main-goal-form");
const mainInput = mainGoalForm.querySelector("input");
const list = document.querySelector("#main-goal-list");
const goal = document.querySelector("#goal");
const today = document.querySelector("#today");
const commentBox = document.querySelector("#comment");
const comment = document.querySelector("#comment span:last-child");

const comments = [
  "Nice!",
  "Way to go!",
  "Great work!",
  "Good job!",
  "Good work!",
];

const GOAL_KEY = "goal";
const COMPLETE_KEY = "complete";

let mainGoal = "";
let complete = "";

function completeGoal() {
  const num = Math.floor(Math.random() * comments.length);
  comment.innerText = `${comments[num]}`;
}

function savedMainGoal(mg) {
  localStorage.setItem(GOAL_KEY, mg);
}

function paintGoal(mainGoal) {
  const li = document.createElement("div");
  const spanBox = document.createElement("div");
  const span = document.createElement("span");
  const checkbox = document.createElement("span");
  checkbox.type = "checkbox";
  checkbox.id = "checkbox";
  span.innerText = mainGoal;
  span.classList.add("goalInfo");
  const deleteBtn = document.createElement("span");
  const modifyBtn = document.createElement("span");
  deleteBtn.classList.add("hidden");
  modifyBtn.classList.add("hidden");
  checkbox.classList.add("hidden");
  deleteBtn.innerHTML = `<i class="bi bi-trash3-fill"></i>`;
  modifyBtn.innerHTML = `<i class="bi bi-pencil-square"></i>`;
  checkbox.innerHTML = `<i class="bi bi-square"></i>`;

  list.addEventListener("mouseenter", () => {
    deleteBtn.classList.remove("hidden");
    modifyBtn.classList.remove("hidden");
    checkbox.classList.remove("hidden");
  });
  list.addEventListener("mouseleave", () => {
    deleteBtn.classList.add("hidden");
    modifyBtn.classList.add("hidden");
    checkbox.classList.add("hidden");
  });
  checkbox.addEventListener("click", () => {
    if (!li.classList.contains("done")) {
      checkbox.innerHTML = `<i class="bi bi-check-square"></i>`;
      li.classList.add("done");
      commentBox.classList.remove("hidden");
      complete = "Y";
      localStorage.setItem(COMPLETE_KEY, complete);
      completeGoal();
    } else {
      checkbox.innerHTML = `<i class="bi bi-square"></i>`;
      li.classList.remove("done");
      commentBox.classList.add("hidden");
      localStorage.removeItem(COMPLETE_KEY);
    }
  });
  deleteBtn.addEventListener("click", deleteMainGoal);
  modifyBtn.addEventListener("click", modifyMainGoal);
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(spanBox);
  modifyBtn.id = "modifyBtn";
  li.id = "done";
  spanBox.appendChild(modifyBtn);
  spanBox.appendChild(deleteBtn);
  list.appendChild(li);
  RegisterGoal();
}

function handleMainGoalSubmit(event) {
  event.preventDefault();
  mainGoal = mainInput.value;
  mainInput.value = "";
  paintGoal(mainGoal);
  savedMainGoal(mainGoal);
}

function modifyMainGoal(event) {
  const goal = event.target
    .closest("#main-goal-list > div")
    .querySelector(".goalInfo");
  const modifyGoal = goal.innerText;
  mainInput.value = modifyGoal;
  deleteMainGoal(event);
}

function deleteMainGoal(event) {
  const li = event.target.closest("#main-goal-list > div");
  li.remove();
  deleteGoal();
}

function RegisterGoal() {
  goal.classList.add("hidden");
  mainInput.classList.add("hidden");
  today.classList.remove("hidden");
}

function deleteGoal() {
  goal.classList.remove("hidden");
  mainInput.classList.remove("hidden");
  today.classList.add("hidden");
  localStorage.removeItem(GOAL_KEY);
}

mainInput.addEventListener("input", () => {
  mainInput.style.width = mainInput.scrollWidth + "px";
  if (mainInput.value.length < 14) {
    mainInput.style.width = 485.5 + "px";
  }
});

mainGoalForm.addEventListener("submit", handleMainGoalSubmit);
const saved = localStorage.getItem(GOAL_KEY);
if (saved !== null) {
  mainGoal = saved;
  paintGoal(mainGoal);
}

const savedComplete = localStorage.getItem(COMPLETE_KEY);
const done = document.querySelector("#done");
const checkbox = document.querySelector("#checkbox");
const modifyBtn = document.querySelector("#modifyBtn");
if (savedComplete === "Y") {
  if (checkbox) {
    checkbox.innerHTML = `<i class="bi bi-check-square"></i>`;
    done.classList.add("done");
  }
}

function runAtMidnight() {
  deleteGoal();
  resetGoal();
  checkbox.innerHTML = `<i class="bi bi-check-square"></i>`;
  done.classList.contains("done") ? done.classList.remove("done") : null;
}

function resetGoal() {
  const now = new Date();
  const midnight = new Date();

  midnight.setHours(24, 0, 0, 0);
  const delay = midnight.getTime() - now.getTime();
  console.log(delay);
  setTimeout(runAtMidnight, delay);
}

resetGoal();
