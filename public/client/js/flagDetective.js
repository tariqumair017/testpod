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



let que_count = 0;

let userScore = 0;


let userWrongScore = 0;

let total_inputs =[]

const flagDetective = [
  {
    flagName: "Rwanda",
    hint: "Rwanda testing",
    flagImage: "1680001540762-Rwanda.png",
  },
  {
    flagName: "Moldavia",
    hint: "Moldavia testing",
    flagImage: "1680001540764-Moldavia.png",
  },
  {
    flagName: "Mexico",
    hint: "Mexico testing",
    flagImage: "1680082648905-Mexico.png",
  },
  {
    flagName: "Rome",
    hint: "Rome testing",
    flagImage: "1680070106930-640px-Flag_of_Rome.svg.png",
  },
];

detective_total_questions.innerHTML =
  flagDetective.length < 10 ? "0" + flagDetective.length : flagDetective.length;
  
  function startFlagDetectiveGame() {
    showFlagDetectiveGame(0);
  }
  
  function showFlagDetectiveGame(index) {
  siblings_input.innerHTML =""
  let detect_flag_image = '<span style="border-radius:7px;width:100%;height:250px;display:flex;justify-content:center;margin-right:5px; border: 2px solid #f9f9f9;"><img src=/upload-images/'+ flagDetective[index].flagImage +' alt="img"></span>';
  for (let i = 0; i < flagDetective[index].flagName.split("").length; i++) {
    siblings_input.innerHTML += '<input class="current-input" maxlength="1"  />';
  }
  
  detective_image.innerHTML = detect_flag_image;
  const inputs = document.querySelectorAll(".current-input")
  total_inputs = inputs
  showNextInputs()
  if(que_count == flagDetective.length){
    btnDontKnow.classList.add("d-none")
  }
}

var baba =""
function correctInput(params) {
  baba += params;
}

window.load = startFlagDetectiveGame();

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
    
    if(baba.length <= total_inputs.length-1){
      correctInput(currentInput.value)
    }
  });
});
}

//focus the first input which index is 0 on window load
window.addEventListener("load", () => total_inputs[0].focus());

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
if (que_count == flagDetective.length-1) {
  result_btn.classList.remove("d-none");
  time_up.classList.add("d-none");
  btnDontKnow.classList.add("d-none");

}

btnDontKnow.onclick = () => {
  callNextQuestion();
  userWrongScore++;
  detective_total_in_correct.innerHTML = userWrongScore;
};


// call next Question
function callNextQuestion() {
  if (que_count <= flagDetective.length-1) {
    que_count++;
    showFlagDetectiveGame(que_count); //passing index of array to showQestions for current question
  }
}



result_btn.onclick = async () => {
  location='#hello'
  questions_box.classList.add("d-none");

  result_box.classList.remove("d-none");

  result_btn.classList.add("d-none");

  time_up.classList.remove("d-none");

  ques_counter.classList.add("d-none")
  document.querySelector("#testDuration").classList.add("d-none")
 
  //Post Api  
  

  var valRight = (userScore / questions.length) * 360;

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

        text: "You got " + userScore + " out of " + questions.length,
      },
    },
  });
};

