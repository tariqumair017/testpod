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

const score_board = document.querySelector(".score_board");

const submit = document.querySelector(".submit")

var wrongClickAudio = new Audio("/client/sounds/wrong-click.mp3");

let que_count = 1;

let userScore = 0;

let question_counter = 0;

let userWrongScore = 0;

let total_inputs = []; 

var flagDetective;

// var levels = ["Easy", "Normal", "Hard", "Extreme"];
 
document.getElementById("nextLevel").addEventListener("click", function(e) {
  e.preventDefault();
    

  // for (let i = 0; i < levels.length; i++) {
  //   if(levels[i] == currenLevel)
  //   {
  //     currenLevel = levels[i + 1]
  //     break;
  //   }
  // }
  debugger;
  currenLevel++;
  window.location.href = `/flag-detective-regions/${currentContinent}/game/${currenLevel}`;

});
debugger;
//Api All Guess Flag Data
fetch(`/flag-detective-game/${currentContinent}/${currenLevel}`)
  .then(res => res.json())
  .then((data) => {     
    flagDetective = data.questions.map((val, i) => ( 
      {
        flagName: val.flagName,
        hint: val.hint,
        flagImage: val.flagImg,
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
    '<span style="border-radius:7px;width:100%;height:250px;display:flex;justify-content:center;margin-right:5px; border: 2px solid #f9f9f9;"><img class="border" src=/upload-images/' +
    flagDetective[index].flagImage +
    ' alt="img"></span>';
  for (let i = 0; i < flagDetective[index].flagName.split("").length; i++) {
    siblings_input.innerHTML +=
      '<input class="current-input" maxlength="1"  />';
  }

  detective_image.innerHTML = detect_flag_image;
  const inputs = document.querySelectorAll(".current-input");
  total_inputs = inputs;
  console.log(total_inputs,"total_inputs")
  score_board.innerHTML =
    '<span class="total_que" style="font-size: 30px; font-weight: bold">' +
    que_count +
    '<span style="font-size: 30px; font-weight: bold">/' +
    flagDetective.length +
    " </span></span>";
  //focus the first input which index is 0 on window load
  window.addEventListener("load", () => total_inputs[0].focus());
  console.log(total_inputs[0].focus())

  submit.classList.add("d-none")

  your_quiz_progress_detail.innerHTML = flagDetective[index].hint;

  showNextInputs();
}
}

var baba = "";
function correctInput(params) {
  baba += params;
}


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

      if (baba.length <= total_inputs.length) {
        correctInput(currentInput.value);
      }
      if (baba.length == total_inputs.length) {
        submit.classList.remove("d-none")
        for (let i = 0; i < total_inputs.length; i++) {
          total_inputs[i].classList.add("disabled")
        }
      }
    });
  });
}

submit.onclick=()=>{
  console.log(que_count,flagDetective.length)
  if (que_count == flagDetective.length) {
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
  }
}

function showAnswer() {
  if (
    flagDetective[question_counter].flagName.toLowerCase() == baba.toLowerCase()
  ) {
    userScore++;
    detective_total_correct.innerHTML = userScore < 10 ? "0" + userScore : userScore;
    question_counter++;
    que_count++
    showFlagDetectiveGame(question_counter);
    baba = "";
  } else {
    wrongClickAudio.play();
    userWrongScore++;
    detective_total_in_correct.innerHTML = userWrongScore < 10 ? "0" + userWrongScore : userWrongScore;
    question_counter++;
    que_count++
    showFlagDetectiveGame(question_counter);
    baba = "";
  }
  total_inputs[0].focus()
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
  result_btn.classList.remove("d-none");
  time_up.classList.remove("d-none");
  timer__display.classList.add("d-none");
  btnDontKnow.classList.add("d-none");
  callResultScreen();
}

btnDontKnow.onclick = () => {
  que_count++;
  callNextQuestion();
  userWrongScore++;
  detective_total_in_correct.innerHTML = userWrongScore < 10 ? "0" + userWrongScore : userWrongScore;
  baba=""
  submit.classList.add("d-none")
  total_inputs[0].focus()
  if (que_count > flagDetective.length) {
  btnDontKnow.classList.add("d-none");
  questions_box.classList.add("d-none");

  result_box.classList.remove("d-none");

  time_up.classList.remove("d-none");

  timer__display.classList.add("d-none");

  score_board.classList.add("d-none");
  callResultScreen()

}
  //focus the first input which index is 0 on window load
  window.addEventListener("load", () => total_inputs[question_counter].focus());
};

// call next Question
function callNextQuestion() {
  if (que_count <= flagDetective.length) {
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

  detective_total_in_correct.innerHTML = flagDetective.length - userScore;

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