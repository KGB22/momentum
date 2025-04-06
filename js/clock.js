const clock = document.querySelector("div#clock");
const hour = clock.querySelector("#hour");
const min = clock.querySelector("#min");
const sec = clock.querySelector("#sec");

function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const mins = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  hour.innerText = `${hours}`;
  min.innerText = `${mins}`;
  sec.innerText = `${seconds}`;
}
getClock();
setInterval(getClock, 1000);
