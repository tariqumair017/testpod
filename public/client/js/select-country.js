//array of questions

var wrongClickAudio = new Audio("/client/sounds/wrong-click.mp3");
var music = new Audio("/client/sounds/Lobby-Time.mp3");


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
const flag_detective_game_card = document.querySelector(".flag-detective-game-timer")

const detective_total_questions = document.querySelector(
  ".detective-total-questions"
);
const detective_total_in_correct = document.querySelector(
  ".detective-total-in-correct"
);

const flag_detective_score_card = document.querySelector(".flag-detective-score-card")


const circleSvg = document.querySelector("circle");

const detective_level = document.querySelector(".detective-level");


const mypopover_content = document.getElementById("mypopover-content")



const result_box = document.querySelector(".result_box");

const time_up = document.querySelector(".time_up");

const focus_question = document.querySelector(".focus-input")

const flag_detective_music_on = document.querySelector(
  ".flag-detective-music-on"
);
const flag_detective_music_off = document.querySelector(
  ".flag-detective-music-off"
);








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
var questions;





document.getElementById("nextLevel").addEventListener("click", function (e) {
  e.preventDefault();

  currenLevel++;
  if (currenLevel == 0) {
    window.location.href = `/guess-country/${region.toLowerCase()}/easy`;
  } else if (currenLevel == 1) {
    window.location.href = `/guess-country/${region.toLowerCase()}/normal`;
  } else if (currenLevel == 2) {
    window.location.href = `/guess-country/${region.toLowerCase()}/hard`;
  } else if (currenLevel == 3) {
    window.location.href = `/guess-country/${region.toLowerCase()}/extreme`;
  } else if (currenLevel == 4) {
    window.location.href = `/guess-country/${region.toLowerCase()}/next`;
  }
});


fetch(`/game/all/${region}/${currenLevel}`)
  .then(res => res.json())
  .then(data => {
    questions = data.questions.map((val, i) => (
      {
        numb: i,

        question: val.flag,

        answer: val.correct,

        options: [val.optionA, val.optionB, val.optionC, val.optionD],

        hint: val.hint
      }
    ));

    window.load = startQuiz();

    function startQuiz() {
      showQuetions(0); //calling showQestions function

      queCounter(1); //passing 1 parameter to queCounter

      startTimerLine(0);


    }

    var popover = new bootstrap.Popover(document.querySelector('.example-popover'), {
      container: 'body',
      html: true,
      trigger: 'hover',
      delay: { show: 0, hide: 100 },
      content: document.getElementById('mypopover-content'),
    })



    const FULL_DASH_ARRAY = 283;
    const WARNING_THRESHOLD = questions.length * 30 / 2;
    const ALERT_THRESHOLD = questions.length * 30 / 4;

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

    const TIME_LIMIT = questions.length * 30;
    let timePassed = 0;
    let timeLeft = TIME_LIMIT;
    let timerInterval = null;
    let remainingPathColor = COLOR_CODES.info.color;

    detective_total_questions.innerHTML =
      questions.length < 10 ? "0" + questions.length : questions.length;

    // getting questions and options from array

    function showQuetions(index) {

      //creating a new span and div tag for question and option and passing the value using array index

      let que_tag =
        `<span class="flag-icon-background" style="border-radius:7px;width:100%;height:250px;display:flex;justify-content:center;margin-right:5px; border: 2px solid #f9f9f9;padding:10px"><img class="border" src="${questions[index].question}" alt="img"></span>`;

      // let detail = '<p class="your-quiz-progress-detail" >'+ questions[index].hint +'<p>'

      let option_tag =
        '<div class="customLable wow animate__fadeInUp" data-wow-delay="0.1s"><strong>A</strong>' +
        questions[index].options[0] +
        "</div>" +
        '<div class="customLable wow animate__fadeInUp" data-wow-delay="0.2s"><strong>B</strong>' +
        questions[index].options[1] +
        "</div>" +
        '<div class="customLable wow animate__fadeInUp" data-wow-delay="0.3s"><strong>C</strong>' +
        questions[index].options[2] +
        "</div>" +
        '<div class="customLable wow animate__fadeInUp" data-wow-delay="0.4s"><strong>D</strong>' +
        questions[index].options[3] +
        "</div>";

      que_text.innerHTML = que_tag; //adding new span tag inside que_tag

      option_list.innerHTML = option_tag; //adding new div tag inside option_tag

      window.addEventListener("load", focus_question.focus())
      focus_question.classList.add("d-none")
      const option = option_list.querySelectorAll(".customLable");


      // set onclick attribute to all available options

      for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", `optionSelected(this)`);
      }
      detective_total_questions.innerHTML =
        '<span class="total_que">' +
        que_count +
        '<span>/' +
        questions.length
      " </span></span>";

      mypopover_content.innerHTML = questions[index].hint;

      detective_level.innerHTML =
        (data.level == "0" && "Easy") ||
        (data.level == "1" && "Normal") ||
        (data.level == "2" && "Hard") ||
        (data.level == "3" && "Extream");
    }



    // if Next Que button clicked

    next_btn.onclick = () => {
      if (que_count < questions.length - 1) {
        que_count++; //increment index of array

        que_numb++; //increment question number

        showQuetions(que_count); //passing index of array to showQestions for current question

        queCounter(que_numb); //passing question number to queCounter
        next_btn.classList.add("d-none");

        startTimerLine(0);
      }
    };

    function queCounter(index) {
      let totalQueCounTag =
        index + "/" + questions.length

      detective_total_questions.innerHTML = totalQueCounTag;
    }


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
          detective_total_in_correct.innerHTML = ++incorrect;
          // await storeResultForGame();
        }
      }
    }



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

          document.querySelector("#testDuration").classList.add("d-none")


          ques_counter.classList.add("d-none")

          disableOptions()
        }
      }
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
       >
       </path>
       </g>
       </svg>
       <span id="base-timer-label" class="base-timer__label">${formatTime(
      timeLeft
    )}</span>
 </div>
 `;

    const base_timer__label = document.querySelector(".base-timer__label")

    function onTimesUp(timerInterval) {
      console.log(timerInterval)
      clearInterval(timerInterval);
      console.log(timerInterval)
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
          onTimesUp(timerInterval);
          result_btn.click()
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

       //show result box-shadow

       result_btn.onclick = async () => {
        // onTimesUp()
        questions_box.classList.add("d-none");
  
        result_box.classList.remove("d-none");
  
        result_btn.classList.add("d-none");
  
  
  
        // time_up.classList.remove("d-none");
  
        // ques_counter.classList.add("d-none")
        // document.querySelector("#testDuration").classList.add("d-none")
  
        flag_detective_score_card.innerHTML = questions.length - userScore
  
  
  
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
  
  

    // runInterval();
    // function runInterval() {  
    // var interval = questions.length * 30,
    //   display = document.querySelector("#testDuration");

    // startTimer(interval, display);
    // };

  });

//when user clicks on options 
async function optionSelected(answer) {
  clearInterval(counterLine); //clear counterLine

  answer.classList.add("correct");

  let userAns = answer.textContent; //getting user selected option

  userAns = userAns.substring(1);

  let correcAns = questions[que_count].answer; //getting correct answer from array

  // if (que_numb === questions.length) {
  //   document.querySelector("#testDuration").classList.add("d-none");
  // }


  if (userAns.replace(/\s/g, '').toLowerCase() === correcAns.replace(/\s/g, '').toLowerCase()) {
    userScore += 1; //upgrading score value with 1

    flag_detective_score_card.innerHTML = userScore;

    answer.classList.add("correct");

    answer.firstChild.classList.add("number-of-questions-correct-active")

    answer.insertAdjacentHTML("beforeend", tickIconTag);

    if (que_numb === questions.length) {
      result_btn.classList.remove("d-none");
      // time_up.classList.add("d-none");
      next_btn.classList.add("d-none");

    } else {
      next_btn.classList.remove("d-none");
    }
  } else {
    console.log("wrong")
    incorrect++
    detective_total_in_correct.innerHTML = incorrect
    answer.classList.add("incorrect");
    answer.classList.add("option-content-active");
    answer.classList.add("shakeIt");

    wrongClickAudio.play();

    setTimeout(function () {
      answer.classList.remove("shakeIt");
    }, 500);

    answer.insertAdjacentHTML("beforeend", crossIconTag);


    //auto select correct option

    callCorrectOption();
  }

  // await storeResultForGame();

  //disable all options

  disableOptions();
}

//auto call correct option 
function callCorrectOption() {
  const allOptions = option_list.children.length;

  let correcAns1 = questions[que_count].answer; //getting correct answer from array

  for (i = 0; i < allOptions; i++) {
    let optionAns = option_list.children[i].textContent;

    optionAns = optionAns.substring(1);

    if (optionAns.replace(/\s/g, '').toLowerCase() == correcAns1.replace(/\s/g, '').toLowerCase()) {
      option_list.children[i].setAttribute(
        "class",
        "customLable correct disabled"
      ); //adding green color to matched option
      option_list.children[i].firstChild.classList.add("number-of-questions-correct-active")
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

// async function storeResultForGame() { 
//   var obj = {correct: userScore, incorrect: incorrect, attempted: que_numb};
//   const response = await fetch(`/game-result/${_id}`, {
//     method: 'POST',
//     body: JSON.stringify({objToStore: obj}),
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     }
//   });
//   const finalData = await response.json();}




flag_detective_music_on.onclick = () => {
  flag_detective_music_on.classList.add("d-none");
  flag_detective_music_off.classList.remove("d-none");
  music.pause();
};

flag_detective_music_off.onclick = () => {
  flag_detective_music_on.classList.remove("d-none");
  flag_detective_music_off.classList.add("d-none");
  music.play();
  music.loop = "true";
};