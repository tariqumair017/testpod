const guess_check = document.querySelector(".guess-check");
const focus_question = document.querySelector(".focus-input");
const option_one = document.querySelector(".option-one");
const option_two = document.querySelector(".option-two");
const option_three = document.querySelector(".option-three");
const option_four = document.querySelector(".option-four");
const flag_quest_timer = document.querySelector(".flag-quest-timer");
const circleSvg = document.querySelector("circle");
const time_up = document.querySelector(".time_up");
var music = new Audio("/client/sounds/Lobby-Time.mp3")

const result_screen  = document.querySelector(".result_screen")
const flag_quest_box = document.querySelector(".flag-quest-box")

const flag_detective_music_on = document.querySelector(".flag-detective-music-on")
const flag_detective_music_off = document.querySelector(".flag-detective-music-off")



const questions = [
  {
    title: "rizwan",
    numb: 1,
    correctName: "Rizwan",
    inCorrectName1: "X NZ",
    inCorrectName2: "ZXCJ",
    inCorrectName3: "AKLS",
    correctFlag: "/client/img/Flags/01-correct.svg",
    incorrectFlag1: "/client/img/Flags/01-correct.svg",
    incorrectFlag2: "/client/img/Flags/01-correct.svg",
    incorrectFlag3: "/client/img/Flags/01-correct.svg",
  },
  {
    title: "rizwan",
    numb: 1,
    correctName: "Rizwan",
    inCorrectName1: "EYIWA",
    inCorrectName2: "jhgsksnaJKASLNDckdf",
    inCorrectName3: "SCJKZ",
    correctFlag: "/client/img/Flags/01-correct.svg",
    incorrectFlag1: "/client/img/Flags/01-correct.svg",
    incorrectFlag2: "/client/img/Flags/01-correct.svg",
    incorrectFlag3: "/client/img/Flags/01-correct.svg",
  },
  {
    title: "rizwan",
    numb: 1,
    correctName: "Rizwan",
    inCorrectName1: "jhgsksnackdf",
    inCorrectName2: "jhgsksnackdf",
    inCorrectName3: "jhgsksnackdf",
    correctFlag: "/client/img/Flags/01-correct.svg",
    incorrectFlag1: "/client/img/Flags/01-correct.svg",
    incorrectFlag2: "/client/img/Flags/01-correct.svg",
    incorrectFlag3: "/client/img/Flags/01-correct.svg",
  },
  {
    title: "rizwan",
    numb: 1,
    correctName: "Rizwan",
    inCorrectName1: "jhfbsd",
    inCorrectName2: "jkbc",
    inCorrectName3: "aLJ",
    correctFlag: "/client/img/Flags/01-correct.svg",
    incorrectFlag1: "/client/img/Flags/01-correct.svg",
    incorrectFlag2: "/client/img/Flags/01-correct.svg",
    incorrectFlag3: "/client/img/Flags/01-correct.svg",
  },
];

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 30 / 2;
const ALERT_THRESHOLD = 30 / 4;

const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};

const TIME_LIMIT = 30;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;
function nextQuestions(index) {
  // let question_tag =
  //   '<span style="font-size: 30px;font-weight: bold;color: back">' +
  //   questions[index].title +
  //   "</span>";

  var option_1 =
    '<input class="customRadio" ans="correct" type="radio" name=q' +
    questions[index].numb +
    " id=" +
    questions[index].correctName +
    '><label class="customLableWimageQuest" for=' +
    questions[index].correctName +
    "><img class=flag-quest-image src=" +
    questions[index].correctFlag +
    ' alt="" ></label>';

  var option_2 =
    '<input class="customRadio" ans="incorrect" type="radio" name=q' +
    questions[index].numb +
    " id=" +
    questions[index].inCorrectName1 +
    '><label class="customLableWimageQuest" for=' +
    questions[index].inCorrectName1 +
    "><img class=flag-quest-image src=" +
    questions[index].incorrectFlag1 +
    ' alt="" ></label>';

  var option_3 =
    '<input class="customRadio" ans="incorrect" type="radio" name=q' +
    questions[index].numb +
    " id=" +
    questions[index].inCorrectName2 +
    '><label class="customLableWimageQuest" for=' +
    questions[index].inCorrectName2 +
    "><img class=flag-quest-image src=" +
    questions[index].incorrectFlag2 +
    ' alt="" ></label>';

  var option_4 =
    '<input class="customRadio" ans="incorrect" type="radio" name=q' +
    questions[index].numb +
    " id=" +
    questions[index].inCorrectName3 +
    '><label class="customLableWimageQuest" for=' +
    questions[index].inCorrectName3 +
    "><img class=flag-quest-image src=" +
    questions[index].incorrectFlag3 +
    ' alt="" ></label>';

  var FlagOptions = [];
  FlagOptions.push(option_1);
  FlagOptions.push(option_2);
  FlagOptions.push(option_4);
  FlagOptions.push(option_3);

  let shuffledFlagOptions = FlagOptions.sort(function () {
    return Math.random() - 0.5;
  });

  console.log(shuffledFlagOptions, "shuffledFlagOptions");
  option_one.innerHTML = shuffledFlagOptions[0];
  option_two.innerHTML = shuffledFlagOptions[1];
  option_three.innerHTML = shuffledFlagOptions[2];
  option_four.innerHTML = shuffledFlagOptions[3];

  // your_guess_progress_detail.innerHTML = questions[index].detail;

  //adding new span tag inside que_tag

  // questions_name.innerHTML = question_tag;
}

nextQuestions(0);

// Clock Timer

flag_quest_timer.innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

const base_timer__label = document.querySelector(".base-timer__label");

function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML =
      formatTime(timeLeft);
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
      callResultScreen();
    }
  }, 1000);
}
startTimer();

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
    base_timer__label.style.animation = "popup 800ms infinite ease-in-out";
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

// Clock Timer End




// Result Screen

function callResultScreen() {
  flag_quest_box.classList.add("d-none")
  result_screen.classList.remove("d-none")
}


// Result Screen End


flag_detective_music_on.onclick=()=>{
  flag_detective_music_on.classList.add("d-none")
  flag_detective_music_off.classList.remove("d-none")
  music.play()
  music.loop ="true"
}

flag_detective_music_off.onclick=()=>{
  flag_detective_music_on.classList.remove("d-none")
  flag_detective_music_off.classList.add("d-none")
  music.pause()
}
