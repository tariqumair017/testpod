const detective_image = document.querySelector(".detective-image");
const siblings_input = document.querySelector(".siblings-input");
const detective_total_questions = document.querySelector(
  ".detective-total-questions"
);
const detective_total_correct = document.querySelector(
  ".detective-total-correct"
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

const score_board = document.querySelector(".flag-detective-game-score_board");

const submit = document.querySelector(".submit")

var wrongClickAudio = new Audio("/client/sounds/wrong-click.mp3");

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
  window.location.href = `/flag-detective-regions/${currentContinent}/game/${currenLevel}`;

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

  // set Default Values end

  score_board.innerHTML =
    '<span class="total_que" style="font-size: 30px; font-weight: bold">' +
    que_count +
    '<span style="font-size: 30px; font-weight: bold">/' +
    flagDetective.length + "."
    " </span></span>";
  //focus the first input which index is 0 on window load
  window.addEventListener("load", () => total_inputs[0].focus());

  submit.classList.add("d-none")

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
    
    score_board.classList.add("d-none");
    showAnswer();
    callResultScreen()
  }else{
    showAnswer();
    submit.classList.add("d-none")

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
    '<div class="fleg-detective-user_messages"><div class="btn_close_dialog" onclick="closeDialog()">✖</div><div class="w-100" style="display:grid;"><img src="/client/img/images/answer.right.png" style="height:50px; margin: 0px auto;"><div id="nextQueSeconds" class="try_again_time">--</div><button  class="btn_try_again" id="btnNextQue">Next Question</button></div></div>';

  rightAnsTime(0, 05);
  
  if (que_count === flagDetective.length) {
    document.getElementById("btnNextQue").classList.add("d-none");
  }
  document.getElementById("btnNextQue").onclick=()=>{
    callNextQuestion()
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
    '<div class="fleg-detective-user_messages"><div class="btn_close_dialog" onclick="closeDialog()">✖</div><div class="w-100" style="display:grid;"><img class="mb-3" src="/client/img/images/answer.wrong.png" style="height:100px; margin: 0px auto;"><div id="tryAgainSeconds" class="try_again_time">--</div><button id="callSame" class="btn_try_again">Try Again</button></div></div>';

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




//timer
disMinutes.innerHTML = "00";

disSeconds.innerHTML = "00";

window.load = totalTestTime(flagDetective.length, 30);

function totalTestTime(min, sec) {
  //totalTime = inpMinutes.value * 60 + inpSeconds.value * 1;

  var totalTime = min * sec;

  circleSvg.style.animation = `Loop ${totalTime}s linear 1s`;

  circleSvg.style.animationPlayState = "running";

  if (min != "" || sec != "") {
    completeTestInterval = setInterval(() => {
      const minutes = Math.floor(totalTime / 60);

      const seconds = totalTime % 60;

      if (totalTime <= 10) {
        circleSvg.style.stroke = "var(--clr-primary)";

        disMinutes.style.animation = "popup 800ms infinite ease-in-out";

        disMinutes.style.animationPlayState = "running";

        disSeconds.style.animation = "popup 800ms infinite ease-in-out";

        disSeconds.style.animationPlayState = "running";
      } else {
        circleSvg.style.stroke = "var(--clr-remaining)";

        disMinutes.style.animation = "none";

        disSeconds.style.animation = "none";
      }
      textCorrection(disMinutes, minutes);

      textCorrection(disSeconds, seconds);

      if (totalTime > 0) {
        totalTime--;
      } else {
        //bell.play();

        circleSvg.style.animation = "none";

        clearInterval(completeTestInterval);

        callResultScreen();
      }
    }, 1000);
  } else {
    disMinutes.innerHTML = "00";

    disSeconds.innerHTML = "00";
  }

  return totalTime;
}

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

  score_board.classList.add("d-none");
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
  detective_total_correct.innerHTML = userScore < 10 ? "0" + userScore : userScore;
  clearInterval(rightAnsInterval)
    question_counter++;
    showFlagDetectiveGame(question_counter); //passing index of array to showQestions for current question
    
  }
}

function callResultScreen() {
  questions_box.classList.add("d-none");

  result_box.classList.remove("d-none");

  time_up.classList.remove("d-none");

  timer__display.classList.add("d-none");

  score_board.classList.add("d-none");

  detective_total_in_correct.innerHTML = flagDetective.length - userScore < 10 ? "0" + flagDetective.length - userScore : flagDetective.length - userScore;

  var valRight = (userScore / flagDetective.length) * 360;

  var valWrong = 360 - valRight;

  var xValues = ["Right", "Wrong"];

  var yValues = [valRight, valWrong];

  var barColors = ["#1DCF71", "#EA4A4A"];

  clearInterval(completeTestInterval)

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