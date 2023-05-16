const detective_image = document.querySelector(".detective-image");
const siblings_input = document.querySelector(".siblings-input");
const detective_total_questions = document.querySelector(
  ".detective-total-questions"
);
const detective_total_in_correct = document.querySelector(
  ".detective-total-in-correct"
);

const disMinutes = document.querySelector(".minute");

const disSeconds = document.querySelector(".seconds");

const circleSvg = document.querySelector("circle");

const que_heading = document.querySelector(".que_heading");

const btnDontKnow = document.querySelector(".btn_I_dont_know");

const result_btn = document.querySelector(".result_btn");

const result_box = document.querySelector(".result_box");

const questions_box = document.querySelector(".questions-box");

const time_up = document.querySelector(".time_up");

const your_quiz_progress_detail = document.querySelector(
  ".your-quiz-progress-detail"
);

const timer__display = document.querySelector(".timer__display");

const submit = document.querySelector(".submit")

const flag_detective_score_card = document.querySelector(".flag-detective-score-card")

const flag_detective_hint = document.querySelector(".flag-detective-hint")

const flag_detective_game_card = document.querySelector(".flag-detective-game-card")

var wrongClickAudio = new Audio("/client/sounds/wrong-click.mp3");

var music = new Audio("/client/sounds/Lobby-Time.mp3")

const flag_detective_game_right_part = document.querySelector(".flag-detective-game-right-part")

const flag_detective_score_card_Two = document.querySelector(".flag-detective-score-card-two")

const flag_detective_music_on = document.querySelector(".flag-detective-music-on")
const flag_detective_music_off = document.querySelector(".flag-detective-music-off")



let que_count = 1;

let userScore = 0;

let question_counter = 0;

let userWrongScore = 0;

let total_inputs = []; 






var flagDetective;

 if(currenLevel < 3){
document.getElementById("nextLevel").addEventListener("click", function(e) {
  e.preventDefault();
  
  currenLevel++;

  if (currenLevel == 0) {
    window.location.href = `/flag-detective/${currentContinent.toLowerCase()}/easy`; 
  } else if(currenLevel == 1) {
    window.location.href = `/flag-detective/${currentContinent.toLowerCase()}/normal`; 
  } else if(currenLevel == 2) {
    window.location.href = `/flag-detective/${currentContinent.toLowerCase()}/hard`; 
  } else if(currenLevel == 3) {
    window.location.href = `/flag-detective/${currentContinent.toLowerCase()}/extreme`; 
  } else if(currenLevel == 4) {
    window.location.href = `/flag-detective/${currentContinent.toLowerCase()}/next`; 
  } 

});
 }
//Api All Guess Flag Data
fetch(`/flag-detective-game/${currentContinent}/${currenLevel}`)
  .then(res => res.json())
  .then((data) => {     
    flagDetective = data.questions.map((val, i) => ( 
      {
        flagName: val.country,
        flagImage: val.flagUrl,
        gameLevel:data.level,
        hint: val.hint,
      }
    ));
 
    runGuessDetectiveGame(flagDetective, data._id); 
  });  


  
  
  
  
  function runGuessDetectiveGame(flagDetective, id)
  {

    const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = flagDetective.length * 30 / 2;
const ALERT_THRESHOLD = flagDetective.length * 30 / 4;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

  const TIME_LIMIT = flagDetective.length * 30;
  let timePassed = 0;
  let timeLeft = TIME_LIMIT;
  let timerInterval = null;
  let remainingPathColor = COLOR_CODES.info.color;
detective_total_questions.innerHTML =
  flagDetective.length < 10 ? "0" + flagDetective.length : flagDetective.length;

function startFlagDetectiveGame() {
  showFlagDetectiveGame(question_counter);
}

window.load = startFlagDetectiveGame();


function showFlagDetectiveGame(index) {
  if (que_count <= flagDetective.length) {
  siblings_input.innerHTML = "";
  let detect_flag_image =
    '<span style="border-radius:7px;width:100%;height:250px;display:flex;justify-content:center;margin-right:5px; border: 2px solid #f9f9f9;padding:10px"><img class="border" src=' +
    flagDetective[index].flagImage +
    ' alt="img"></span>';
  for (let i = 0; i < flagDetective[index].flagName.split("").length; i++) {
    siblings_input.innerHTML +=
      '<input class="current-input" maxlength="1"  />';
  }

  detective_image.innerHTML = detect_flag_image;
  const inputs = document.querySelectorAll(".current-input");
  total_inputs = inputs;
  // que_heading.classList.add("slide-left")




  // set Default Values start

  const correcAns = flagDetective[index].flagName.split("")

  if(flagDetective[index].gameLevel == "0"){
    if(correcAns.length >= 4){
    total_inputs[0].value = correcAns[0]  
    total_inputs[Math.round((total_inputs.length - 1) / 2)].value = correcAns[Math.round((total_inputs.length - 1) / 2)]
    total_inputs[total_inputs.length-1].value = correcAns.at(-1)
    }else{
    total_inputs[Math.round((total_inputs.length - 1) / 2)].value = correcAns[Math.round((total_inputs.length - 1) / 2)]
    total_inputs[total_inputs.length-1].value = correcAns.at(-1)
    }
  }
  else if(flagDetective[index].gameLevel == "1"){
    total_inputs[0].value = correcAns[0]
    total_inputs[Math.round((total_inputs.length - 1) / 2)].value = correcAns[Math.round((total_inputs.length - 1) / 2)]
  }
  else if(flagDetective[index].gameLevel == "2"){
    total_inputs[Math.round((total_inputs.length - 1) / 2)].value = correcAns[Math.round((total_inputs.length - 1) / 2)]
  }
  total_inputs[0].focus()


  // set Default Values end

  detective_total_questions.innerHTML =
    '<span class="total_que">' +
    que_count +
    '<span>/' +
    flagDetective.length
    " </span></span>";
  //focus the first input which index is 0 on window load
  
  submit.classList.add("d-none")
  flag_detective_score_card.innerHTML = userScore < 10 ? "Score : 0" + userScore : "Score :" + userScore;

  
  your_quiz_progress_detail.innerHTML = flagDetective[index].hint;

  
  showNextInputs();
}
}

let baba =""

// iterate over all inputs
function showNextInputs() {
  total_inputs.forEach((input, index1) => {
    input.addEventListener("keyup", (e) => {
      // This code gets the current input element and stores it in the currentInput variable
      // This code gets the next sibling element of the current input element and stores it in the nextInput variable
      // This code gets the previous sibling element of the current input element and stores it in the prevInput variable
      const currentInput = input,
        nextInput = input.nextElementSibling,
        prevInput = input.previousElementSibling;

      // if the value has more than one character then clear it
      if (currentInput.value.length > 1) {
        currentInput.value = "";
        return;
      }
      // if the next input is disabled and the current value is not empty
      //  enable the next input and focus on it
      if (nextInput && currentInput.value !== "") {
        //   nextInput.removeAttribute("disabled");
        nextInput.focus();
      }

      // if the backspace key is pressed

      var _finalKey = "";

      for (let { value } of total_inputs) {
        _finalKey += value;
      }

      if (_finalKey.length == total_inputs.length) {
        submit.classList.remove("d-none")
        baba = _finalKey
        for (let i = 0; i < total_inputs.length; i++) {
          total_inputs[i].classList.add("disabled")
        }
      }
    });
  });
}

submit.onclick=()=>{
  if (que_count == flagDetective.length) {
    submit.classList.add("d-none")
    btnDontKnow.classList.add("d-none");
    questions_box.classList.add("d-none");
    
    result_box.classList.remove("d-none");
    
    time_up.classList.remove("d-none");
    
    timer__display.classList.add("d-none");
    
    showAnswer();
    callResultScreen()
  }else{
    showAnswer();
    submit.classList.add("d-none")
    for (let i = 0; i < total_inputs.length; i++) {
      total_inputs[i].blur()      
    }

  }
}

function showAnswer() {
  if (
    flagDetective[question_counter].flagName.toLowerCase() == baba.toLowerCase()
  ) {
    callRightAnsDialog()
  } else {
    wrongClickAudio.play();
    callTryAgainDialog()
  }
  total_inputs[0].focus()
}

function callRightAnsDialog() {
  detective_image.innerHTML =
    '<div class="fleg-detective-user_messages"><div class="w-100" style="display:grid;gap:10px"><img src="/client/img/images/answer.right.png" style="height:50px; margin: 0px auto;"><div id="nextQueSeconds" class="try_again_time">--</div><button  class="btn_try_again" id="btnNextQue">Next Question</button></div></div>';

  rightAnsTime(0, 05);
  btnDontKnow.classList.add("d-none")
  
  if (que_count === flagDetective.length) {
    document.getElementById("btnNextQue").classList.add("d-none");
  }
  document.getElementById("btnNextQue").onclick=()=>{
    callNextQuestion()
    btnDontKnow.classList.remove("d-none")
    clearInterval(rightAnsInterval);
  }
}

function rightAnsTime(min, sec) {
  var totalTime = min * 60 + sec * 1;


  if (min != "" || sec != "") {
    rightAnsInterval = setInterval(() => {
      const seconds = totalTime % 60;

      document.getElementById("nextQueSeconds").style.animation =
        "popup 800ms infinite ease-in-out";

      document.getElementById("nextQueSeconds").style.animationPlayState =
        "running";

      console.log("")
      textCorrection(document.getElementById("nextQueSeconds"), seconds);

      if (totalTime > 0) {
        totalTime--;
      } else {
        clearInterval(rightAnsInterval);
        callNextQuestion()
        btnDontKnow.classList.remove("d-none")
      }
    }, 1000);
  } else {
    document.getElementById("nextQueSeconds").innerHTML = "00";
  }

  return totalTime;
}


function callSameQuestion() {

  detective_image.innerHTML = "";

  clearInterval(tryAgainInterval);

  if (que_count > 0) {

    showFlagDetectiveGame(question_counter); //passing index of array to showQestions for current question
  }
}


function callTryAgainDialog() {


  detective_image.innerHTML =
    '<div class="fleg-detective-user_messages"><div class="w-100" style="display:grid;gap:10px"><img class="mb-3" src="/client/img/images/answer.wrong.png" style="height:100px; margin: 0px auto;"><div id="tryAgainSeconds" class="try_again_time">--</div><button id="callSame" class="btn_try_again">Try Again</button></div></div>';

  document.getElementById("callSame").addEventListener("click",callSameQuestion)


  tryAgainTime(0, 05);

}

function tryAgainTime(min, sec) {
  var totalTime = min * 60 + sec * 1;


  if (min != "" || sec != "") {
    tryAgainInterval = setInterval(() => {
      const seconds = totalTime % 60;
      if(seconds <= 0){
        userWrongScore += 1;
        detective_total_in_correct.innerHTML = userWrongScore < 10 ? "0" + userWrongScore :userWrongScore;
      }
      document.getElementById("tryAgainSeconds").style.animation =
        "popup 800ms infinite ease-in-out";

      document.getElementById("tryAgainSeconds").style.animationPlayState =
        "running";

      textCorrection(document.getElementById("tryAgainSeconds"), seconds);

      if (totalTime > 0) {
        totalTime--;
      } else {

        closeDialog();

        clearInterval(tryAgainInterval);
      }
    }, 1000);
  } else {
    document.getElementById("tryAgainSeconds").innerHTML = "00";
  }

  return totalTime;
}

function closeDialog() {
  que_count++;
  clearInterval(tryAgainInterval)
  question_counter++;
  showFlagDetectiveGame(question_counter);
}


// Clock Timer


flag_detective_game_card.innerHTML = `
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

const base_timer__label = document.querySelector(".base-timer__label")

function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
      callResultScreen();
    }
  }, 1000);
}
startTimer()

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
    base_timer__label.style.animation = "popup 800ms infinite ease-in-out"
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



//timer
// disMinutes.innerHTML = "00";

// disSeconds.innerHTML = "00";

// window.load = totalTestTime(flagDetective.length, 30);

// function totalTestTime(min, sec) {

//   var totalTime = min * sec;

//   circleSvg.style.animation = `Loop ${totalTime}s linear 1s`;

//   circleSvg.style.animationPlayState = "running";

//   if (min != "" || sec != "") {
//     completeTestInterval = setInterval(() => {
//       const minutes = Math.floor(totalTime / 60);

//       const seconds = totalTime % 60;

//       if (totalTime <= 10) {
//         circleSvg.style.stroke = "var(--clr-primary)";

//         disMinutes.style.animation = "popup 800ms infinite ease-in-out";

//         disMinutes.style.animationPlayState = "running";

//         disSeconds.style.animation = "popup 800ms infinite ease-in-out";

//         disSeconds.style.animationPlayState = "running";
//       } else {
//         circleSvg.style.stroke = "var(--clr-remaining)";

//         disMinutes.style.animation = "none";

//         disSeconds.style.animation = "none";
//       }
//       textCorrection(disMinutes, minutes);

//       textCorrection(disSeconds, seconds);

//       if (totalTime > 0) {
//         totalTime--;
//       } else {
//         //bell.play();

//         circleSvg.style.animation = "none";

//         clearInterval(completeTestInterval);

//         callResultScreen();
//       }
//     }, 1000);
//   } else {
//     disMinutes.innerHTML = "00";

//     disSeconds.innerHTML = "00";
//   }

//   return totalTime;
// }

function textCorrection(element, value) {
  element.innerHTML = value < 10 ? "0" + value : value;
}


if (que_count == flagDetective.length) { 
  time_up.classList.remove("d-none");
  timer__display.classList.add("d-none");
  btnDontKnow.classList.add("d-none");
  // callResultScreen();
}

btnDontKnow.onclick = () => {
  if (que_count >= flagDetective.length) {
  btnDontKnow.classList.add("d-none");
  questions_box.classList.add("d-none");

  result_box.classList.remove("d-none");

  time_up.classList.remove("d-none");

  timer__display.classList.add("d-none");

  callResultScreen()
}
else{
  que_count++;
  userWrongScore++;
  detective_total_in_correct.innerHTML = userWrongScore < 10 ? "0" + userWrongScore : userWrongScore;
  question_counter++;
  showFlagDetectiveGame(question_counter);
  baba=""
  submit.classList.add("d-none")
  total_inputs[0].focus()
}
};

// call next Question
function callNextQuestion() {
  if (que_count <= flagDetective.length) {
    que_count++
    userScore++
    flag_detective_score_card.innerHTML = userScore < 10 ? "Score : 0" + userScore : "Score :" + userScore;
  clearInterval(rightAnsInterval)
    question_counter++;
    showFlagDetectiveGame(question_counter); //passing index of array to showQestions for current question
    
  }
}

function callResultScreen() {

  flag_detective_hint.classList.add("d-none")

  your_quiz_progress_detail.classList.add("d-none")

  questions_box.classList.add("d-none");

  result_box.classList.remove("d-none");

  time_up.classList.remove("d-none");

  timer__display.classList.add("d-none");

  flag_detective_score_card_Two.innerHTML = userScore < 10 ? "Score : 0" + userScore : "Score :" + userScore;

  detective_total_in_correct.innerHTML = flagDetective.length - userScore < 10 ? "0" + flagDetective.length - userScore : flagDetective.length - userScore;

  timeLeft ="00"

  flag_detective_game_right_part.classList.add("screen-size")



  clearInterval(timerInterval)

  var valRight = (userScore / flagDetective.length) * 360;

  var valWrong = 360 - valRight;

  var xValues = ["Right", "Wrong"];

  var yValues = [valRight, valWrong];

  var barColors = ["#1DCF71", "#EA4A4A"];

  new Chart("myChart", {
    type: "pie",

    data: {
      labels: xValues,

      datasets: [
        {
          backgroundColor: barColors,

          data: yValues,
        },
      ],
    },

    options: {
      title: {
        display: true,

        text: "You got " + userScore + " out of " + flagDetective.length,
      },
    },
  });
}

}



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

