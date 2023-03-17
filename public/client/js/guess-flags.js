//array of questions

var wrongClickAudio = new Audio("/client/sounds/wrong-click.mp3");

//define required constants 
const time_line = document.querySelector(".time_line");

const questions_box = document.querySelector(".questions-box");

const option_list = document.querySelector(".option_list");

const que_text = document.querySelector(".que_text");

const your_progress = document.querySelector(".your-progress")

const next_btn = document.querySelector(".next_btn");

const ques_counter = document.querySelector(".total_que");

const total_correct = document.getElementById("total-correct");

const total_in_correct = document.getElementById("total-in-correct")

const total_questions = document.getElementById("total-questions") 

const result_btn = document.querySelector(".result_btn");

const result_box = document.querySelector(".result_box");

const time_up = document.querySelector(".time_up");


//required variable 
let que_count = 0;

let que_numb = 1;

let userScore = 0;

let incorrect = 0; 

let counterLine;

let completeTestDuration;

//creating required html divs

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';

let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';


let questions = [
  {
    numb: 1,

    question: "flag-icon-jp",

    answer: "Japan",

    options: ["Japan", "Argentina", "Bangladesh", "Cameroon"],
  },

  {
    numb: 2,

    question: "flag-icon-ad",

    answer: "Andorra",

    options: ["Afghanistan", "Andorra", "Barbados", "Canada"],
  },

  {
    numb: 3,

    question: "flag-icon-au",

    answer: "Australia",

    options: ["Bermuda", "Cook Islands", "Australia", "Falkland Islands"],
  },

  {
    numb: 4,

    question: "flag-icon-at",

    answer: "Austria",

    options: ["Bulgaria", "Belgium", "Austria", "Canada"],
  },

  {
    numb: 5,

    question: "flag-icon-de",

    answer: "Germany",

    options: ["Germany", "Colombia", "Cameroon", "Belgium"],
  },

  {
    numb: 6,

    question: "flag-icon-ar",

    answer: "Argentina",

    options: ["Botswana", "Antarctica", "Argentina", "Guatemala"],
  },

  {
    numb: 7,

    question: "flag-icon-vn",

    answer: "Vietnam",

    options: ["Turkey", "Vietnam", "Somalia", "Senegal"],
  },

  {
    numb: 8,

    question: "flag-icon-ru",

    answer: "Russia",

    options: ["Réunion", "Russia", "Romania", "Slovenia"],
  },

  {
    numb: 9,

    question: "flag-icon-my",

    answer: "Malaysia",

    options: ["Niue", "Malaysia", "New Zealand", "Pitcairn"],
  },

  {
    numb: 10,

    question: "flag-icon-fi",

    answer: "Finland",

    options: ["Faroe Islands", "Georgia", "Iceland", "Finland"],
  },
];



window.load = startQuiz();

function startQuiz() {
  showQuetions(0); //calling showQestions function

  queCounter(1); //passing 1 parameter to queCounter

  startTimerLine(0);

}

total_questions.innerHTML = questions.length



//run time line

function startTimerLine(time) {
  counterLine = setInterval(timer, 150);

  async function timer() {
    time += 1; //upgrading time value with 1

    time_line.style.width = time + "%"; //increasing width of time_line with px by time value

    if (time > 99) {
      //if time value is greater than 549

      clearInterval(counterLine); //clear counterLine

      callCorrectOption(); 
      total_in_correct.innerHTML = ++incorrect;
      await storeResultForGame();
    }
  }
}
 
 

//show result box-shadow

result_btn.onclick = async () => {
    questions_box.classList.add("d-none");

  result_box.classList.remove("d-none");

  result_btn.classList.add("d-none");

  time_up.classList.add("d-none");

  document.querySelector("#testDuration").classList.add("d-none");

  console.log(userScore,"total_correct")
  console.log(questions,"questions")
  console.log(que_numb);
 
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

//time for whole test

function startTimer(duration, display) {
  
  var timer = duration,
    minutes,
    seconds;

  completeTestDuration = setInterval(testTimer, 1000);

  function testTimer() {
    minutes = parseInt(timer / 60, 10);

    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;

    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      display.textContent = "00:00";

      result_btn.classList.remove("d-none");

      time_up.classList.remove("d-none");
      next_btn.classList.add("d-none");

      clearInterval(completeTestDuration);

      clearInterval(counterLine);
    }
  }
}

// runInterval();
// function runInterval() {  
  var interval = 2.5 * 60,
    display = document.querySelector("#testDuration");
  
  startTimer(interval, display);
// };


//when user clicks on options 
async function optionSelected(answer) {  
  clearInterval(counterLine); //clear counterLine

  answer.classList.add("correct");

  let userAns = answer.textContent; //getting user selected option

  userAns = userAns.substring(2);

  let correcAns = questions[que_count].answer; //getting correct answer from array

  if(que_numb === questions.length){
    document.querySelector("#testDuration").classList.add("d-none");
  }


  if (userAns === correcAns) { 
    userScore += 1; //upgrading score value with 1

    total_correct.innerHTML = userScore;

    answer.classList.add("correct");

    answer.insertAdjacentHTML("beforeend", tickIconTag);

    if (que_numb === questions.length) {
      result_btn.classList.remove("d-none");
      time_up.classList.add("d-none");
      next_btn.classList.add("d-none");

    } else {
      next_btn.classList.remove("d-none");
    }
  } else {
    incorrect++
    total_in_correct.innerHTML = incorrect
    answer.classList.add("incorrect");

    answer.classList.add("shakeIt");

    wrongClickAudio.play();

    setTimeout(function () {
      answer.classList.remove("shakeIt");
    }, 500);

    answer.insertAdjacentHTML("beforeend", crossIconTag);


    //auto select correct option

    callCorrectOption();
  }
 
  await storeResultForGame();

  //disable all options

  disableOptions();
}

//auto call correct option 
function callCorrectOption() {
  const allOptions = option_list.children.length;

  let correcAns1 = questions[que_count].answer; //getting correct answer from array

  for (i = 0; i < allOptions; i++) {
    let optionAns = option_list.children[i].textContent;

    optionAns = optionAns.substring(2);

    if (optionAns == correcAns1) {
      option_list.children[i].setAttribute(
        "class",
        "customLable correct disabled"
      ); //adding green color to matched option

      option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option

    }
  }

  if (que_numb === questions.length) {
    result_btn.classList.remove("d-none");
  } else {
    next_btn.classList.remove("d-none");
  }

  disableOptions();
}

//disable all option 
function disableOptions() {
  const allOptions1 = option_list.children.length;

  for (i = 0; i < allOptions1; i++) {
    option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
  }
}

async function storeResultForGame() { 
  var obj = {correct: userScore, incorrect: incorrect, attempted: que_numb};
  // console.log(obj); 
  const response = await fetch(`/game-result/${_id}`, {
    method: 'POST',
    body: JSON.stringify({objToStore: obj}),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  });

  // const finalData = await response.json();
  console.log(response);
}