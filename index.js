const dis = document.querySelector(".dis");
const completed = document.querySelector(".completed");
const sprint = document.querySelector(".sprint");
const image = document.querySelector(".image");
const muted = document.querySelector(".muted");
const stop = document.querySelector(".stop");
const stopbtn = document.querySelector(".stop-btn");
const sound = new Audio("sound/sound.wav");

const STUDYTIME = 25 * 60;
const RESTTIME = 5 * 60;

let startFlag = false;
let count = 0;

function start(e) {
  if (e.keyCode == 32 && e.target == document.body && startFlag === false) {
    e.preventDefault();
    muted.innerHTML = "";
    muted.style.display = "none";
    study();
  } else if (e.target == image && startFlag === false) {
    muted.innerHTML = "";
    muted.style.display = "none";
    study();
  } else if (
    e.keyCode == 32 &&
    e.target == document.body &&
    startFlag === true
  ) {
    e.preventDefault();
    location.reload();
  }
  stopbtn.style.display = "inline";
  startFlag = true;
}

image.addEventListener("click", start);
document.addEventListener("keydown", start);
stop.addEventListener("click", () => {
  location.reload();
});

function study() {
  completed.style.width = "0px";
  let studyTime = STUDYTIME;
  count += 1;
  sprint.innerHTML = `You're on round <strong>${count}</strong><br>Keep going`;
  image.src = "images/reading.svg";
  let id = setInterval(() => {
    if (studyTime === 0) {
      dis.innerHTML = "Time to relax now";
      clearInterval(id);
      sound.play();
      rest();
      return;
    }
    let min = Math.floor(studyTime / 60);
    let sec = studyTime % 60;
    if (sec < 10) dis.innerHTML = `${min} : 0${sec}`;
    else if (min < 10) dis.innerHTML = `0${min} : ${sec}`;
    else dis.innerHTML = `${min} : ${sec}`;
    document.title = `Study - Round ${count} | ${min}:${sec} left`;

    completed.style.width = `${((STUDYTIME - studyTime) / STUDYTIME) * 100}%`;
    studyTime = studyTime - 1;
  }, 1000);
}

function rest() {
  if (count > 3) {
    startFlag = false;
    location.reload();
    document.title = "Well done";
    dis.innerHTML = "Well done, you have completed 4 rounds";
  }
  completed.style.width = "0px";
  let restTime = RESTTIME;
  image.src = "images/resting.svg";
  let id = setInterval(() => {
    if (restTime === 0) {
      dis.innerHTML = "Lets go again!!";
      clearInterval(id);
      sound.play();
      study();
      return;
    }
    let min = Math.floor(restTime / 60);
    let sec = restTime % 60;
    if (sec < 10) dis.innerHTML = `${min} : 0${sec}`;
    else if (min < 10) dis.innerHTML = `0${min} : ${sec}`;
    else dis.innerHTML = `${min} : ${sec}`;
    document.title = `Break Time | ${min}:${sec} left`;

    completed.style.width = `${((RESTTIME - restTime) / RESTTIME) * 100}%`;

    restTime = restTime - 1;
  }, 1000);
}
