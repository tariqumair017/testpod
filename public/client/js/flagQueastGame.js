const guess_check = document.querySelector(".guess-check");
const focus_question = document.querySelector(".focus-input");
const option_one = document.querySelector(".option-one");
const option_two = document.querySelector(".option-two");
const option_three = document.querySelector(".option-three");
const option_four = document.querySelector(".option-four");
const flag_quest_timer = document.querySelector(".flag-quest-timer");
const circleSvg = document.querySelector("circle");
const time_up = document.querySelector(".time_up");
var music = new Audio("/client/sounds/Lobby-Time.mp3");

var wrongClickAudio = new Audio("/client/sounds/wrong-click.mp3");
var rightClickAudio = new Audio("/client/sounds/notification-140376.mp3");

const question_number = document.querySelector(".question-number");

const question_hint = document.querySelector(".question-hint");

const question_level = document.querySelector(".question_level");

const customRadio = document.getElementsByClassName("customRadio");

const questions_total_score = document.querySelector(".questions_total_score");

const next_btn = document.querySelector(".next_btn");

const result_box_score = document.querySelector(".result_box_score");

const quest_flags = document.querySelector(".quest_flags");

const question_wrong_or_right = document.querySelector(
  ".question_wrong_or_right"
);

const question_right = document.querySelector(".question_right");
const question_wrong = document.querySelector(".question_wrong");

const result_screen = document.querySelector(".result_screen");
const flag_quest_box = document.querySelector(".flag-quest-box");

const try_again = document.querySelector(".try_again")

const result_btn = document.querySelector(".result_btn");

const flag_detective_music_on = document.querySelector(
  ".flag-detective-music-on"
);
const flag_detective_music_off = document.querySelector(
  ".flag-detective-music-off"
);

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = (data?.questions?.length * 30) / 2;
const ALERT_THRESHOLD = (data?.questions?.length * 30) / 4;

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

var questions = data?.questions;

var current_question = 1;

var question_counter = 0;

var userScore = 0;

let result_screen_images = [];

var flag_quest_image;

const TIME_LIMIT = data?.questions?.length * 30;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;
function nextQuestions(question_counter) {
  // let question_tag =
  //   '<span style="font-size: 30px;font-weight: bold;color: back">' +
  //   questions[question_counter].title +
  //   "</span>";

  //Shuffle String Character Function

  const inCorrectName1 = shuffleStr(questions[question_counter].Icountry);
  const inCorrectName2 = shuffleStr(questions[question_counter].Icountry);
  const inCorrectName3 = shuffleStr(questions[question_counter].Icountry);

  question_number.innerHTML = current_question + "/" + questions.length;

  question_hint.innerHTML = questions[question_counter].hint;

  question_level.innerHTML =
    (data?.level == "0" && "Easy") ||
    (data?.level == "1" && "Normal") ||
    (data?.level == "2" && "Hard") ||
    (data?.level == "3" && "Extream");

  var option_1 =
    '<input class="customRadio" ans="correct" type="radio" name=q' +
    questions[question_counter].numb +
    " id=" +
    questions[question_counter].country +
    '><label class="customLableWimageQuest" for=' +
    questions[question_counter].country +
    "><img class=flag-quest-image src=" +
    questions[question_counter].correctImg +
    ' alt="" ></label>';

  var option_2 =
    '<input class="customRadio" ans="incorrect" type="radio" name=q' +
    questions[question_counter].numb +
    " id=" +
    inCorrectName1 +
    '><label class="customLableWimageQuest" for=' +
    inCorrectName1 +
    "><img class=flag-quest-image src=" +
    questions[question_counter].IcorrectImg1 +
    ' alt="" ></label>';

  var option_3 =
    '<input class="customRadio" ans="incorrect" type="radio" name=q' +
    questions[question_counter].numb +
    " id=" +
    inCorrectName2 +
    '><label class="customLableWimageQuest" for=' +
    inCorrectName2 +
    "><img class=flag-quest-image src=" +
    questions[question_counter].IcorrectImg2 +
    ' alt="" ></label>';

  var option_4 =
    '<input class="customRadio" ans="incorrect" type="radio" name=q' +
    questions[question_counter].numb +
    " id=" +
    inCorrectName3 +
    '><label class="customLableWimageQuest" for=' +
    inCorrectName3 +
    "><img class=flag-quest-image src=" +
    questions[question_counter].IcorrectImg3 +
    ' alt="" ></label>';

  var FlagOptions = [];
  FlagOptions.push(option_1);
  FlagOptions.push(option_2);
  FlagOptions.push(option_4);
  FlagOptions.push(option_3);

  let shuffledFlagOptions = FlagOptions.sort(function () {
    return Math.random() - 0.5;
  });

  option_one.innerHTML = shuffledFlagOptions[0];
  option_two.innerHTML = shuffledFlagOptions[1];
  option_three.innerHTML = shuffledFlagOptions[2];
  option_four.innerHTML = shuffledFlagOptions[3];

  questions_total_score.innerHTML =
    userScore < 10
      ? "Score : 0" + userScore
      : userScore
      ? "Score : " + "Score : " + userScore
      : "Score : --";
  flag_quest_image = document.querySelectorAll(".flag-quest-image");

  // your_guess_progress_detail.innerHTML = questions[question_counter].detail;

  //adding new span tag inside que_tag

  // questions_name.innerHTML = question_tag;
}

window.load = nextQuestions(0);

// check True or False

for (let i = 0; i < customRadio.length; i++) {
  customRadio[i].addEventListener("click", (e) => {
    next_btn.classList.remove("d-none");
    guess_check.classList.add("active");
    flag_quest_timer.classList.add("d-none");
    clearInterval(timerInterval);
    result_screen_images.push({
      image: flag_quest_image[i].getAttribute("src"),
      customRadio: e.target,
    });
    if (e.target.getAttribute("ans") == "correct") {
      userScore++;
      question_wrong_or_right.classList.remove("d-none");
      question_wrong.classList.add("d-none");
      question_right.classList.remove("d-none");
      questions_total_score.innerHTML =
        userScore < 10
          ? "Score : 0" + userScore
          : "Score : " + userScore
          ? "Score : " + userScore
          : "Score : --";
      rightClickAudio.play();
    } else {
      wrongClickAudio.play();
      question_wrong_or_right.classList.remove("d-none");
      question_wrong.classList.remove("d-none");
      question_right.classList.add("d-none");
    }
  });
}

// next stage

next_btn.onclick = () => {
  console.log(flag_quest_image, "flag_quest_image");
  if (current_question <= questions.length - 1) {
    question_counter++; //increment question number
    current_question++;

    nextQuestions(question_counter);

    guess_check.classList.remove("active");

    next_btn.classList.add("d-none");
    question_wrong_or_right.classList.add("d-none");

    for (let i = 0; i < customRadio.length; i++) {
      customRadio[i].addEventListener("click", (e) => {
        if (current_question == questions.length) {
          next_btn.classList.add("d-none");
          result_btn.classList.remove("d-none");
        } else {
          next_btn.classList.remove("d-none");
        }
        clearInterval(timerInterval);
        guess_check.classList.add("active");
        result_screen_images.push({
          image: flag_quest_image[i].getAttribute("src"),
          customRadio: e.target,
        });
        if (e.target.getAttribute("ans") == "correct") {
          userScore++;
          question_wrong_or_right.classList.remove("d-none");
          question_wrong.classList.add("d-none");
          question_right.classList.remove("d-none");
          questions_total_score.innerHTML =
            userScore < 10
              ? "Score : 0" + userScore
              : "Score : " + userScore
              ? "Score : " + userScore
              : "Score : --";
          rightClickAudio.play();
        } else {
          wrongClickAudio.play();
          question_wrong_or_right.classList.remove("d-none");
          question_wrong.classList.remove("d-none");
          question_right.classList.add("d-none");
        }
      });
    }
  } else {
    next_btn.classList.add("d-none");
  }
};

// Call Reslut Screen

result_btn.onclick = () => {
  callResultScreen();
};

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
      try_again.classList.remove("d-none")
      next_btn.classList.add("d-none")
      result_btn.classList.add("d-none")
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
  clearInterval(timerInterval)
  flag_quest_box.classList.add("d-none");
  result_screen.classList.remove("d-none");
  result_box_score.innerHTML = userScore < 10 ? "0" + userScore : userScore;
  for (let i = 0; i < result_screen_images.length; i++) {
    quest_flags.innerHTML += `<div class="result_box_flag_box">
    <img
    width="100%"
    height="100px"
    src=${result_screen_images[i].image}
    />
    <p class="result_screen_flag_name">${result_screen_images[
      i
    ].customRadio?.getAttribute("id")}</p>
    ${result_screen_images[i].customRadio?.getAttribute("ans")=="correct" ? 
      `<div class="result_position"><i class="result_quest_true_false  fas fa-check"></i></div>` : `<div class="result_position_wrong"><i class="result_quest_true_false fas fa-times"></i></div>'`
    }
    </div>`;
  }
}


// Result Screen End

flag_detective_music_on.onclick = () => {
  flag_detective_music_on.classList.add("d-none");
  flag_detective_music_off.classList.remove("d-none");
  music.play();
  music.loop = "true";
};

flag_detective_music_off.onclick = () => {
  flag_detective_music_on.classList.remove("d-none");
  flag_detective_music_off.classList.add("d-none");
  music.pause();
};

//Shuffle String Character Function
function shuffleStr(s) {
  let arr = s.split(""),
    arr_len = arr.length;
  while (arr_len) {
    let rnd = Math.floor(Math.random() * arr_len--);
    [arr[arr_len], arr[rnd]] = [arr[rnd], arr[arr_len]];
  }
  let str = arr.join("");
  return str;
}

// call next Question
function callNextQuestion() {
  if (que_count <= flagDetective.length) {
    que_count++;
    userScore++;
    flag_detective_score_card.innerHTML =
      userScore < 10 ? "Score : 0" + userScore : "Score :" + userScore;
    clearInterval(timerInterval);
    question_counter++;
    showFlagDetectiveGame(question_counter); //passing index of array to showQestions for current question
  }
}
