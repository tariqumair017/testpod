//array of questions 
var wrongClickAudio = new Audio("/client/sounds/wrong-click.mp3");

//define required constants
const time_line = document.querySelector(".time_line");

const questions_box = document.querySelector(".questions-box");

const option_list = document.querySelector(".option_list");

const que_text = document.querySelector(".que_text");

const your_progress = document.querySelector(".your-progress");

const next_btn = document.querySelector(".next_btn");

const ques_counter = document.querySelector(".total_que");

const total_correct = document.getElementById("total-correct");

const total_in_correct = document.getElementById("total-in-correct");

const total_questions = document.getElementById("total-questions");

const result_btn = document.querySelector(".result_btn");

const result_box = document.querySelector(".result_box");

const time_up = document.querySelector(".time_up");

const customRadio = document.getElementsByClassName("customRadio");

const guess_check = document.querySelector(".guess-check");

const guess_total_questions = document.querySelector(".guess-total-questions");
const guess_total_correct = document.querySelector(".guess-total-correct");
const guess_total_in_correct = document.querySelector(
  ".guess-total-in-correct"
);

const questions_name = document.querySelector(".questions-name");

const your_guess_progress_detail = document.querySelector(
  ".your-quiz-progress-detail"
);

const option_left = document.querySelector(".option-left");
const option_right = document.querySelector(".option-right");

//required variable
let que_count = 1;

let que_numb = 1;

let userScore = 0;

let incorrect = 0;

let nextQuestion = 0;
let completeTestDuration;

//creating required html divs

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';

let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

// let questions = [
//   {
//     numb: 1,
//     correctName: "japan",
//     inCorrectName: "Bangladesh",
//     title: "Can you guess flag of Japan?",
//     correctFlag: "flag-icon-background flag-icon-jp",
//     incorrectFlag: "flag-icon-background flag-icon-bd",
//     detail: "testing"
//   },
//   {
//     numb: 2,
//     correctName: "japan",
//     inCorrectName: "Bangladesh",
//     title: "Can you guess flag of Japan",
//     correctFlag: "flag-icon-background flag-icon-jp",
//     incorrectFlag: "flag-icon-background flag-icon-bd",
//     detail: "testing",
//   },

//   {
//     numb: 3,
//     correctName: "japan",
//     inCorrectName: "Bangladesh",
//     title: "Can you guess flag of Japan?",
//     correctFlag: "flag-icon-background flag-icon-jp",
//     incorrectFlag: "flag-icon-background flag-icon-bd",
//     detail: "testing",
//   },

//   {
//     numb: 4,
//     correctName: "japan",
//     inCorrectName: "Bangladesh",
//     title: "Can you guess flag of Japan?",
//     correctFlag: "flag-icon-background flag-icon-jp",
//     incorrectFlag: "flag-icon-background flag-icon-bd",
//     detail: "testing",
//   },

//   {
//     numb: 5,
//     correctName: "japan",
//     inCorrectName: "Bangladesh",
//     title: "Can you guess flag of Japan?",
//     correctFlag: "flag-icon-background flag-icon-jp",
//     incorrectFlag: "flag-icon-background flag-icon-bd",
//     detail: "testing",
//   },
// ];

var questions;

//Api All Guess Flag Data
fetch(`/game-management/guess-flags/all`)
  .then(res => res.json())
  .then((data) => {    
    questions = data[0].questions.map((val, i) => ( 
      {
        numb: i,
        correctName: val.country,
        inCorrectName: val.Icountry,
        title: `Can you guess flag of ${val.country}?`,
        correctFlag: val.correctImg,
        incorrectFlag: val.IcorrectImg,
        detail: val.questionDetail,
      }
      
    ));
     
    runGuessFlagGame(questions, data[0]._id); 
  });  


function runGuessFlagGame(questions, id)
{  
  
window.load = startQuiz();

function startQuiz() {
  queCounter(1); //passing 1 parameter to queCounter
}

guess_total_questions.innerHTML = questions.length;

function nextQuestions(index) { 
  let question_tag =
    '<span style="font-size: 30px;font-weight: bold;color: #a8171a;">' +
    questions[index].title +
    "</span>";

  var leftSide = '<input class="customRadio" ans="correct" type="radio" name=q' +
  questions[index].numb +
  " id=" +
  questions[index].correctName +
  '><label class="customLableWimage" for=' +
  questions[index].correctName +
  '><img src=/upload-images/'+questions[index].correctFlag.replace(/\s/g, '')+' alt="" ></label>';

  var RightSide = '<input class="customRadio" ans="incorrect" type="radio" name=q' +
  questions[index].numb +
  " id=" +
  questions[index].inCorrectName +
  '><label class="customLableWimage" for=' +
  questions[index].inCorrectName +
  '><img src=/upload-images/'+questions[index].incorrectFlag.replace(/\s/g, '')+' alt="" ></label>';

  var FlagOptions = [];
   FlagOptions.push(RightSide)
   FlagOptions.push(leftSide)
  
  let shuffledFlagOptions = FlagOptions.sort(function () {
    return Math.random() - 0.5;
  });
  
  option_left.innerHTML = shuffledFlagOptions[0];
  option_right.innerHTML = shuffledFlagOptions[1];
 

  your_guess_progress_detail.innerHTML = questions[index].detail;

  //adding new span tag inside que_tag

  questions_name.innerHTML = question_tag;
}

nextQuestions(nextQuestion);

for (let i = 0; i < customRadio.length; i++) {
  customRadio[i].addEventListener("click", (e) => {
    next_btn.classList.remove("d-none");
    guess_check.classList.add("active");
    if (e.target.getAttribute("ans") == "correct") {
      userScore++;
      guess_total_correct.innerHTML = userScore ? userScore : "--";
    } else {
      wrongClickAudio.play();
      incorrect++;
      guess_total_in_correct.innerHTML = incorrect ? incorrect : "--";
    }
  });
}

next_btn.onclick = () => {
  if (que_numb <= questions.length - 1) {
    que_numb++; //increment question number

    queCounter(que_numb); //passing question number to queCounter

    nextQuestion++;

    nextQuestions(nextQuestion);

    guess_check.classList.remove("active");

    next_btn.classList.add("d-none");

    document.querySelector("#testDuration").classList.remove("d-none");

    time_up.classList.add("d-none");

    clearInterval(completeTestDuration);

    var interval = 0.5 * 60,
      display = document.querySelector("#testDuration");
    startTimer(interval, display);
    console.log(que_numb,questions.length)
    
    for (let i = 0; i < customRadio.length; i++) {
      customRadio[i].addEventListener("click", (e) => {
        if(que_numb == questions.length){
            console.log("......")
            next_btn.classList.add("d-none");
            result_btn.classList.remove("d-none")
        }
        else {
            next_btn.classList.remove("d-none");
        }
        guess_check.classList.add("active");
        if (e.target.getAttribute("ans") == "correct") {
          userScore++;
          guess_total_correct.innerHTML = userScore ? userScore : "--";
        } else {
          wrongClickAudio.play();
          incorrect++;
          guess_total_in_correct.innerHTML = incorrect ? incorrect : "--";
        }
      });
    }
  } else {
    next_btn.classList.add("d-none");
  }
};

function queCounter(index) {
  let totalQueCounTag = index + "/" + questions.length;

  ques_counter.innerHTML = totalQueCounTag;
}

//show result box-shadow

//time for whole test

function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;

  completeTestDuration = setInterval(testTimer, 1000);

  function testTimer() {
    minutes = parseInt(timer / 60, 10);

    seconds = parseInt(timer % 60, 10);

    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = "00 :" + seconds;

    if (--timer < 0) {
      display.textContent = "00:00";

      time_up.classList.remove("d-none");
      next_btn.classList.remove("d-none");
      document.querySelector("#testDuration").classList.add("d-none");
      guess_check.classList.add("active");
      clearInterval(completeTestDuration);
    }
  }
}

// runInterval();
// function runInterval() {
var interval = 0.25 * 60,
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

  if (que_numb === questions.length) {
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
    incorrect++;
    total_in_correct.innerHTML = incorrect;
    answer.classList.add("incorrect");

    answer.classList.add("shakeIt");

    wrongClickAudio.play();

    setTimeout(function () {
      answer.classList.remove("shakeIt");
    }, 500);

    answer.insertAdjacentHTML("beforeend", crossIconTag);

    //auto select correct option
  }

  //disable all options

  disableOptions();
}


result_btn.onclick = async () => {
guess_check.classList.add("d-none");

  result_box.classList.remove("d-none");

  result_btn.classList.add("d-none");

  time_up.classList.add("d-none");

  next_btn.classList.add("d-none")

  document.querySelector("#testDuration").classList.add("d-none");
 
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


//auto call correct option
//disable all option
function disableOptions() {
  const allOptions1 = option_list.children.length;

  for (i = 0; i < allOptions1; i++) {
    option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
  }
}

}