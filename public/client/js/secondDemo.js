//array of questions

const questionSpeech = speechSynthesis;

const detailSpeechClose = speechSynthesis;

let speech = new SpeechSynthesisUtterance();

let detailSpeech = new SpeechSynthesisUtterance();

var wrongClickAudio = new Audio("/client/sounds/wrong-click.mp3");

//define required constants
const time_line = document.querySelector(".time_line");

const questions_box = document.querySelector(".second-demo-questions-box");

const option_list = document.querySelector(".second-demo-option-list");

const que_text = document.querySelector(".que_text");

const your_progress = document.querySelector(".your-progress");

const ques_counter = document.querySelector(".total_que");

const total_correct = document.getElementById("demo-total-correct");

const total_in_correct = document.getElementById("demo-total-in-correct");

const result_btn = document.querySelector(".result_btn");

const result_box = document.querySelector(".result_box");

const time_up = document.querySelector(".time_up");

const your_quiz_progress_detail = document.querySelector(
  ".demo-your-quiz-progress-detail"
);

const number_questions = document.querySelector(".number-questions");

const focus_question = document.querySelector(".focus-input");

const demo_hint = document.querySelector(".demo-hint");

const next_btn = document.querySelector(".next_btn");

const menu_tigger = document.querySelectorAll(".menu-tigger")

const menu_close = document.getElementById("menu-close")



menu_tigger[0].onclick=()=>{
  document.getElementById("offcanvas-menu").classList.toggle("active")
}
menu_tigger[1].onclick=()=>{
  document.getElementById("offcanvas-menu").classList.toggle("active")
}
menu_close.onclick=()=>{
  document.getElementById("offcanvas-menu").classList.remove("active")
  document.body.classList.remove("stop-scrolling");
  
}

//required variable
let que_count = 0;

let que_numb = 1;

let userScore = 0;

let incorrect = 0;

let counterLine;

let completeTestDuration;

//creating required html divs


const _id = location.pathname.replace("/test/states/new-jersey/","")

var questions;

fetch(`/quiz-list/${_id}`)
  .then(res => res.json())
  .then(data => {  
    questions = data.questions.map((val, i) => (
      {
        numb: i,
    
        question: val.question,
    
        answer: val.correct,
    
        options: [val.optionA, val.optionB, val.optionC, val.optionD],

        hint : val.hint
      }
    ));




// var questions = [
//   {
//     numer: 1,
//     img: "/client/img/bg/warningsign35.svg",
//     question: "What does this sign mean?",
//     answer: "The recommended speed limit for this curve is 35 mph.",
//     hint: "The arrow represents the directions of traffic ahead.",
//     discription:
//       "This sign indicates a double curve ahead. The road ahead curves to the right and then to the left",
//     options: [
//       "There is a 35-degree curve ahead.",
//       "The minimum speed for this curve is 35 mph.",
//       "The maximum speed for this curve is 35 mph.",
//       "The recommended speed limit for this curve is 35 mph.",
//     ],
//   },
//   {
//     numer: 2,
//     img: "/client/img/bg/warningsign.svg",
//     question: "This warning sign means?",
//     answer: "There is a 35-degree curve ahead.",
//     hint: "The arrow represents the directions of traffic ahead.",
//     discription:
//       "This sign indicates a double curve ahead. The road ahead curves to the right and then to the left",
//     options: [
//       "There is a 35-degree curve ahead.",
//       "The maximum speed for this curve is 35 mph.",
//       "The recommended speed limit for this curve is 35 mph.",
//       "The minimum speed for this curve is 35 mph.",
//     ],
//   },
//   {
//     numer: 3,
//     img: "/client/img/bg/warningsign35.svg",
//     question: "What does this sign mean?",
//     answer: "The recommended speed limit for this curve is 35 mph.",
//     hint: "The arrow represents .",
//     discription:
//       "This sign indicates a double curve ahead. The road ahead curves to the right and then to the left",
//     options: [
//       "The recommended speed limit for this curve is 35 mph.",
//       "There is a 35-degree curve ahead.",
//       "The minimum speed for this curve is 35 mph.",
//       "The maximum speed for this curve is 35 mph.",
//     ],
//   },
//   {
//     numer: 4,
//     img: "/client/img/bg/warningsign.svg",
//     question: "This warning sign means?",
//     answer: "The recommended speed limit for this curve is 35 mph.",
//     hint: "The arrow represent of traffic ahead.",
//     discription:
//       "This sign indicates a double curve ahead. The road ahead curves to the right and then to the left",
//     options: [
//       "There is a 35-degree curve ahead.",
//       "The recommended speed limit for this curve is 35 mph.",
//       "The minimum speed for this curve is 35 mph.",
//       "The maximum speed for this curve is 35 mph.",
//     ],
//   },
//   {
//     numer: 5,
//     img: "/client/img/bg/warningsign35.svg",
//     question: "What does this sign mean?",
//     answer: "The recommended speed limit for this curve is 35 mph.",
//     hint: "The arrow represents the direction.",
//     discription:
//       "This sign indicates a double curve ahead. The road ahead curves to the right and then to the left",
//     options: [
//       "There is a 35-degree curve ahead.",
//       "The minimum speed for this curve is 35 mph.",
//       "The maximum speed for this curve is 35 mph.",
//       "The recommended speed limit for this curve is 35 mph.",
//     ],
//   },
// ];

window.load = startQuiz();

function startQuiz() {
  numberOfQuestions();
  showQuetions(0); //calling showQestions function
  cancelSpeech();
  cancelDetailSpeech();
}

function numberOfQuestions() {
  for (let i = 1; i <= questions.length; i++) {
    number_questions.innerHTML += `<p class="number-of-questions">${i}</p>`;
  }
}

// getting questions and options from array

function showQuetions(index) {
  //creating a new span and div tag for question and option and passing the value using array index
  let que_tag = `<div><div class="demoQuestion slide-left">${
    questions[index].numb < 11
      ? "0" + que_numb
      : que_numb
  }.  ${questions[index].question}</div>
  <img class="soundbtn" src="/client/img/bg/volume_up_white_24dp.svg" /><img class="soundbtn cancel d-none" src="/client/img/bg/volume_off_white_24dp.svg" /></div>
  `;

  let detail = questions[index].hint;

  let option_tag =
    '<div class="demoCustomLable slide-bottom1"><p class="option-number">A</p><p class="option-content">' +
    questions[index].options[0] +
    "</p></div>" +
    '<div class="demoCustomLable slide-bottom2"><p class="option-number">B</p><p class="option-content">' +
    questions[index].options[1] +
    "</p></div>" +
    '<div class="demoCustomLable slide-bottom3"><p class="option-number">C</p><p class="option-content">' +
    questions[index].options[2] +
    "</p></div>" +
    '<div class="demoCustomLable slide-bottom4"><p class="option-number">D</p><p class="option-content">' +
    questions[index].options[3] +
    "</p></div>";

  que_text.innerHTML = que_tag; //adding new span tag inside que_tag
  option_list.innerHTML = option_tag; //adding new div tag inside option_tag
  const option = option_list.querySelectorAll(".demoCustomLable");

  your_quiz_progress_detail.innerHTML = detail; //adding new p tag inside your-progress
  // set onclick attribute to all available options

  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", `optionSelected(this)`);
  }
  const sound_on = document.querySelector(".soundbtn");
  const cancel = document.querySelector(".cancel");
  const soundDetailbtn = document.querySelector(".soundDetailbtn");
  const cancelDetail = document.querySelector(".cancelDetail");

  que_text.classList.add(".slide-left");

  // read Question And Options
  sound_on.onclick = () => {
    convertText2Speech(
      questions[index].question +
        "  option A" +
        "  " +
        questions[index].options[0] +
        "  option b" +
        "  " +
        questions[index].options[1] +
        "  option c" +
        "  " +
        questions[index].options[2] +
        "  option d" +
        "  " +
        questions[index].options[3]
    );
    cancel.classList.remove("d-none");
    sound_on.classList.add("d-none");
    optionResumeSpeech();
  };
  // Cnacel Speech
  cancel.onclick = () => {
    optionPauseSpeech();
    cancel.classList.add("d-none");
    sound_on.classList.remove("d-none");
  };

  // read Deatail

  soundDetailbtn.onclick = () => {
    convertDetail2Speech(questions[index].hint);
    deatilResumeSpeech();
    cancelDetail.classList.remove("d-none");
    soundDetailbtn.classList.add("d-none");
  };

  // cancel Detail

  cancelDetail.onclick = () => {
    deatilPauseSpeech();
    cancelDetail.classList.add("d-none");
    soundDetailbtn.classList.remove("d-none");
  };

  window.addEventListener("load", focus_question.focus());
  focus_question.classList.add("d-none");
}

// if Next Que button clicked

//when user clicks on options


next_btn.onclick = () => {
  callNextQuestion();
};

function callNextQuestion() {
  if (que_count < questions.length - 1) {
    que_count++; //increment index of array

    que_numb++; //increment question number

    showQuetions(que_count); //passing index of array to showQestions for current question

    demo_hint.classList.add("d-none");
    your_quiz_progress_detail.classList.add("d-none");
    next_btn.classList.add("d-none");
    cancelSpeech();
    cancelDetailSpeech();
    const sound_on = document.querySelector(".soundbtn");
  
    sound_on.classList.remove("disabled")
  }
}

//disable all option

  })

  let tickIconTag =
  '<div class="icon demotick"><i class="fas fa-check"></i></div>';

let crossIconTag =
  '<div class="icon democross"><i class="fas fa-times"></i></div>';



  
  
  
  async function optionSelected(answer) {
    const number_of_questions = document.querySelectorAll(".number-of-questions")
    console.log(number_of_questions,"number_of_questions")
    answer.classList.add("correct");
  
    let userAns = answer.textContent; //getting user selected option
  
    userAns = userAns.substring(1);
  
    let correcAns = questions[que_count].answer; //getting correct answer from array
    demo_hint.classList.remove("d-none");
    your_quiz_progress_detail.classList.remove("d-none");
    if (que_numb === questions.length) {
      disableOptions();
    }
  
    if (userAns === correcAns) {
      userScore += 1; //upgrading score value with 1
  
      total_correct.innerHTML = userScore < 10 ? "0" + userScore : userScore;
      number_of_questions[que_count].classList.add(
        "number-of-questions-correct-active"
      );
      answer.classList.add("correct");
      answer.firstChild.classList.add("option-number-correct");
      callCorrectOption();
      answer.insertAdjacentHTML("beforeend", tickIconTag);
      setTimeout(() => {
        callNextQuestion();
      }, 2000);
    } else {
      incorrect++;
      total_in_correct.innerHTML = incorrect < 10 ? "0" + incorrect : incorrect;
      answer.classList.add("incorrect");
      answer.classList.add("option-content-active");
      if (answer.classList[1] == "slide-bottom1") {
        answer.classList.remove("slide-bottom1");
      } else if (answer.classList[1] == "slide-bottom2") {
        answer.classList.remove("slide-bottom2");
      } else if (answer.classList[1] == "slide-bottom3") {
        answer.classList.remove("slide-bottom3");
      } else if (answer.classList[1] == "slide-bottom4") {
        answer.classList.remove("slide-bottom3");
      }
      answer.classList.add("shakeIt");
      wrongClickAudio.play();
      setTimeout(function () {
        answer.classList.remove("shakeIt");
      }, 500);
  
      number_of_questions[que_count].classList.add(
        "number-of-questions-incorrect-active"
      );
      answer.insertAdjacentHTML("beforeend", crossIconTag);
      callCorrectOption();
      next_btn.classList.remove("d-none");
  
      //auto select correct option
    }
  
    //disable all options
  
    disableOptions();
    cancelSpeech()
    
  }
  
  //auto call correct option
  function callCorrectOption() {
    const allOptions = option_list.children.length;
  
    let correcAns1 = questions[que_count].answer; //getting correct answer from array
  
    for (i = 0; i < allOptions; i++) {
      let optionAns = option_list.children[i].textContent;
  
      optionAns = optionAns.substring(1);
  
      if (optionAns == correcAns1) {
        option_list.children[i].setAttribute(
          "class",
          "demoCustomLable correct disabled"
        ); //adding green color to matched option
        option_list.children[i].firstChild.classList.add("option-number-correct");
        option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
      }
    }
  
    if (que_numb === questions.length) {
      result_btn.classList.remove("d-none");
    } else {
    }
    const sound_on = document.querySelector(".soundbtn");
  
    disableOptions();
    sound_on.classList.add("disabled")
  }

  function disableOptions() {
    const allOptions1 = option_list.children.length;
  
    for (i = 0; i < allOptions1; i++) {
      option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
  }

  
function convertText2Speech(x) {
  speech.text = x;
  speech.pitch = 1;
  speech.volume = 1;
  speech.lang = "en-US";
  speech.rate = 0.6;
  speechSynthesis.speak(speech);
}

function convertDetail2Speech(x) {
  detailSpeech.text = x;
  detailSpeech.pitch = 1;
  detailSpeech.volume = 1;
  detailSpeech.lang = "en-US";
  detailSpeech.rate = 0.6;
  speechSynthesis.speak(detailSpeech);
}

function cancelSpeech() {
  questionSpeech.cancel();
}

function cancelDetailSpeech() {
  detailSpeechClose.cancel();
}

function optionResumeSpeech() {
  questionSpeech.resume();
}

function optionPauseSpeech() {
  questionSpeech.pause();
}

function deatilResumeSpeech() {
  detailSpeechClose.resume();
}

function deatilPauseSpeech() {
  detailSpeechClose.pause();
}
