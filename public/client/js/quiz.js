let speech = new SpeechSynthesisUtterance();

const questionSpeech = speechSynthesis;

const start_btn = document.querySelector(".buttons .total-que");
const option_list = document.querySelector(".option-list");
const quiz_box = document.querySelector(".quiz-box");
const right_part = document.querySelector(".right-part");
// const timeCount = quiz_box.querySelector(".timr-sec");
// const timeLine = quiz_box.querySelector(".time-line");
const hint_btn = document.getElementById("hint-icon");

const game_slider_start = document.querySelector(".game-slider-start")

// const menu_tigger = document.querySelector(".menu-tigger");
const menu_close = document.querySelector(".menu-close,i");
const menu_button = document.querySelector("#menu");
var wrongClickAudio = new Audio("/client/sounds/wrong-click.mp3");

const more_test = document.querySelector(".more_test")



window.load = startQuiz();

function startQuiz() {
  cancelSpeech();
  showQuestions(0);
  queCounter(1);
}


// startTimer(15);
// startTimerLine(0);

let que_count = 0;
let que_number = 1;
// var counter;
let timeVlaue = 15;
let widthValue = 0;

const next_btn = quiz_box.querySelector(".next-btn");
const result_box = document.querySelector(".result-box");
// const restart_quiz = result_box.querySelector(".buttons .restart");
// const quit_quiz = result_box.querySelector(".buttons .quit");

// menu_tigger.onclick=()=>{
//   document.getElementById("offcanvas-menu").classList.toggle("active")
// }

menu_button.onclick = () => {
  document.getElementById("offcanvas-menu").classList.toggle("active");
  document.body.classList.toggle("stop-scrolling");
};

menu_close.onclick = () => {
  document.getElementById("offcanvas-menu").classList.remove("active");
  document.body.classList.remove("stop-scrolling");
};

hint_btn.onclick = () => {
  const list = document.getElementById("showHint").classList;
  list.add("activeShowHint");
  const hind_icon = document.getElementById("hint-icon").classList;
  hind_icon.add("activeHideHint");
};



next_btn.onclick = () => {

  if (que_count < questions.length - 1) {
    que_count++;
    que_number++;
    showQuestions(que_count);
    queCounter(que_number);
    next_btn.style.display = "none";
    const hind_icon = document.getElementById("hint-icon").classList;
    hind_icon.remove("activeHideHint");
  }
};



function showQuestions(index) {
  const que_text = document.querySelector(".que-text");
  const img = document.querySelector(".images");

  img.src = questions[index].img;

  let que_tag =
    "<div class='question-box-home' ><span>" +
    questions[index].numer +
    ". " +
    questions[index].question +
    "</span><img class='soundbtn-home sound_off' src=/client/img/bg/volume_off_white_24dp.svg /><img class='soundbtn-home sound_on d-none' src=/client/img/bg/volume_up_white_24dp.svg /></div>";
  let option_tag =
    ' <div class="options"> <input type="radio" /> ' +
    questions[index].options[0] +
    "</div>" +
    ' <div class="options"> <input type="radio" />' +
    questions[index].options[1] +
    "</div>" +
    ' <div class="options"> <input type="radio" />' +
    questions[index].options[2] +
    "</div>" +
    ' <div class="options"> <input type="radio" />' +
    questions[index].options[3] +
    "</div>" +
    '<h4 id="showHint" >' +
    questions[index].hint +
    "</h4>" +
    '<h4 id="showDiscription">' +
    questions[index].discription +
    "</h4>";

    
    
  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;

  var sound_off = document.querySelector(".sound_off")
  var sound_on = document.querySelector(".sound_on")


  sound_off.onclick = () => {
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
    sound_on.classList.remove("d-none");
    sound_off.classList.add("d-none");
    optionResumeSpeech();

  };
  
  if(index == questions?.length-1){
    next_btn.classList.add("d-none")
  }

    // Cnacel Speech
    sound_on.onclick = () => {
      optionPauseSpeech();
      sound_on.classList.add("d-none");
      sound_off.classList.remove("d-none");
    };

  


  const option = option_list.querySelectorAll(".options");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}



function optionSelected(answer) {
  const hind_icon = document.getElementById("hint-icon").classList;
  hind_icon.add("activeHideHint");
  const show_discription = document.getElementById("showDiscription").classList;
  show_discription.add("activeShowDiscription");
  let userAns = answer.textContent;
  let currentAns = questions[que_count].answer;
  
  var sound_off = document.querySelector(".sound_off")
  var sound_on = document.querySelector(".sound_on")

  cancelSpeech()
  sound_off.classList.add("d-none")
  sound_on.classList.add("d-none")
  let allOptions = option_list.children.length;
  if (userAns.replace(/\s/g, '').toLowerCase() == currentAns.replace(/\s/g, '').toLowerCase()) {
    // answer.classList.add("correct");
    answer.firstElementChild.setAttribute("checked", "checked");
    answer.firstElementChild.setAttribute("id", "option-corrent");
    answer.setAttribute("id", "main-lable");
  } else {
    // answer.classList.add("incorrect");
    answer.firstElementChild.setAttribute("checked", "checked");
    answer.firstElementChild.setAttribute("id", "option-incorrent");
    answer.setAttribute("id", "main-incorrect-lable");
    wrongClickAudio.play();
    answer.classList.add("shakeIt");
    setTimeout(function () {
      answer.classList.remove("shakeIt");
    }, 500);
    for (let i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent.replace(/\s/g, '').toLowerCase() == currentAns.replace(/\s/g, '').toLowerCase()) {
        option_list.children[i].firstElementChild.setAttribute(
          "id",
          "option-corrent"
        );
        option_list.children[i].firstElementChild.setAttribute(
          "checked",
          "checked"
        );
        option_list.children[i].setAttribute("id", "main-lable");
        // option_list.children[i].setAttribute("class", "options correct");
      }
    }
  }

  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  if (que_count < questions.length - 1) {
    next_btn.style.display = "block";
  }else{
    more_test.classList.remove("d-none")
  }

}




function ismobile() {
  const windowWidth = window.innerWidth;
  if (windowWidth <= 700) {
    document.querySelector(".mYSwiper").setAttribute("slides-per-view", 1);
  }
}
ismobile();

// function startTimer(time) {
//   counter = setInterval(timer, 1000);
//   function timer() {
//     timeCount.textContent = time;
//     time--;
//     if (time < 9) {
//       let addZero = timeCount.textContent;
//       timeCount.textContent = "0" + addZero;
//     }
//     if (time < 0) {
//       clearInterval(counter);
//       timeCount.textContent = "00";
//     }
//   }
// }

// function startTimerLine(time) {
//   counterLine = setInterval(timer, 29);
//   function timer() {
//     time += 2;
//     timeLine.style.width = time + "px";
//     if (time > 1110) {
//       clearInterval(counterLine);
//     }
//   }
// }

function queCounter(index) {
  const bottom_ques_counter = quiz_box.querySelector(".total-que");

  let totalQesCountTag =
    " <span><p>" +
    index +
    "</p>of<p>" +
    questions.length +
    "</p>Questions</span>";

  bottom_ques_counter.innerHTML = totalQesCountTag;
}



function convertText2Speech(x) {
  speech.text = x;
  speech.pitch = 1;
  speech.volume = 1;
  speech.lang = "en-US";
  speech.rate = 0.5;
  speechSynthesis.speak(speech);
}


// cancel speech

function cancelSpeech() {
  questionSpeech.cancel();
}


// speech resume
function optionResumeSpeech() {
  questionSpeech.resume();
}


// speech pause
function optionPauseSpeech() {
  questionSpeech.pause();
}