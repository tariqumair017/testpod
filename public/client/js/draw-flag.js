  let paintFlags = [
    {
      numb: 1,

      question: "Germany",

      image: "https://flagpedia.net/data/flags/h80/de.webp",

      arrangement: "threeStripesVert",

      allowedColors: ["black", "red", "orange"],

      colorPalette: ["red", "green", "yellow", "black", "orange", "blue"],
    },

    {
      numb: 2,

      question: "Ukraine",

      image: "https://flagpedia.net/data/flags/h80/ua.webp",

      arrangement: "twoStripesVert",

      allowedColors: ["blue", "yellow"],

      colorPalette: ["blue", "green", "yellow", "black", "orange", "pink"],
    },

    {
      numb: 3,

      question: "Netherlands",

      image: "https://flagpedia.net/data/flags/h80/nl.webp",

      arrangement: "threeStripesVert",

      allowedColors: ["red", "white", "blue"],

      colorPalette: ["red", "green", "white", "pink", "orange", "blue"],
    },

    {
      numb: 4,

      question: "Austria",

      image: "https://flagpedia.net/data/flags/h80/at.webp",

      arrangement: "threeStripesVert",

      allowedColors: ["red", "white", "red"],

      colorPalette: ["red", "green", "white", "yellow", "grey", "blue"],
    },

    {
      numb: 5,

      question: "Indonasia",

      image: "https://flagpedia.net/data/flags/h80/id.webp",

      arrangement: "twoStripesVert",

      allowedColors: ["red", "white"],

      colorPalette: ["red", "green", "white", "yellow", "pink", "blue"],
    },

    {
      numb: 6,

      question: "Romania",

      image: "https://flagpedia.net/data/flags/h80/ro.webp",

      arrangement: "threeStripesHoriz",

      allowedColors: ["blue", "yellow", "red"],

      colorPalette: ["red", "green", "black", "yellow", "pink", "blue"],
    },

    {
      numb: 7,

      question: "Hungary",

      image: "https://flagpedia.net/data/flags/h80/hu.webp",

      arrangement: "threeStripesVert",

      allowedColors: ["#CD2A3E", "white", "#436F4D"],

      colorPalette: ["#CD2A3E", "grey", "black", "yellow", "#436F4D", "white"],
    },

    {
      numb: 8,

      question: "Colombia",

      image: "https://flagpedia.net/data/flags/h80/co.webp",

      arrangement: "threeStripesVert",

      allowedColors: ["yellow", "blue", "red"],

      colorPalette: ["red", "grey", "black", "yellow", "green", "blue"],
    },

    {
      numb: 9,

      question: "France",

      image: "https://flagpedia.net/data/flags/h80/fr.webp",

      arrangement: "threeStripesHoriz",

      allowedColors: ["blue", "white", "red"],

      colorPalette: ["red", "pink", "black", "yellow", "white", "blue"],
    },

    {
      numb: 10,

      question: "Italy",

      image: "https://flagpedia.net/data/flags/h80/it.webp",

      arrangement: "threeStripesHoriz",

      allowedColors: ["green", "white", "red"],

      colorPalette: ["red", "pink", "green", "yellow", "white", "black"],
    },
  ];

//audios

var wrongClickAudio = new Audio("/client/sounds/wrong-click.mp3");

var paintAudio = new Audio("/client/sounds/paint.mp3");

var paintSartedAudio = new Audio("/client/sounds/paint-started.mp3");

var bell = new Audio("/client/sounds/bell.mp3");

//required constants

const flag_canvas = document.querySelector(".flag_canvas");

const color_palette = document.querySelector(".color_palette");

const ques_counter = document.querySelector(".total_que");

const que_heading = document.querySelector(".que_heading");

const draw_total_questions = document.querySelector('.draw-total-questions')

const draw_total_correct = document.querySelector(".draw-total-correct");

const draw_total_in_correct = document.querySelector(".draw-total-in-correct");


const score_board = document.querySelector(".score_board");

const outOf = document.querySelector(".outOf");

const disMinutes = document.querySelector(".minute");

const disSeconds = document.querySelector(".seconds");

const circleSvg = document.querySelector("circle");

const btnDontKnow = document.querySelector(".btn_I_dont_know");

//required variable

let que_count = 0;

let completeTestInterval;

let userScore = 0;

let incorrect = 0;

let tryAgainInterval;

let rightAnsInterval;

window.load = startQuiz();

function startQuiz() {
  showQuetions(0);

  // outOf.innerHTML =
  //   '<span style="font-family: cursive;font-size: 30px;color:#CCCCCC"> / </span>' +
  //   paintFlags.length;
}


// getting questions and options from array

draw_total_questions.innerHTML = paintFlags.length

var queNumber = 0;
function showQuetions(index) {
  //set attribute in flag canvas

  flag_canvas.setAttribute("flagOf", paintFlags[index].question);

  flag_canvas.setAttribute("arrangement", paintFlags[index].arrangement);

  queNumber = index+1

  let questionHeadingHtml =
    "<h2>" +
    "<span>Can you paint flag of " +
    paintFlags[index].question +
    "?</span></h2>";

  score_board.innerHTML =
    '<span class="total_que" style="font-weight: bold">' +
    queNumber +
    '<span style="font-size: 15px;">/' +
    paintFlags.length +
    " </span></span>";

  que_heading.innerHTML = questionHeadingHtml;

  let colorPaletteHtml = "";

  for (var i = 0; i < paintFlags[index].colorPalette.length; i++) {
    colorPaletteHtml +=
      '<li class="cpli" onclick="getColor(\'' +
      paintFlags[index].colorPalette[i] +
      '\')" style="background: ' +
      paintFlags[index].colorPalette[i] +
      ';"></li>';
  }

  color_palette.innerHTML = colorPaletteHtml;
}

console.log(queNumber,"queNumberqueNumber")
if(queNumber == paintFlags.length){
console.log("hello")
}

//allow user to select flag arrangement



function choseFlagArrangemnet(x) {
  var paintingSarted = document
    .getElementById("flagCanvas")
    .getAttribute("paintSarted");

  var defaultArrangment = flag_canvas.getAttribute("arrangement");

  if (paintingSarted === "false") {

    if (x === defaultArrangment) {
      if (defaultArrangment === "threeStripesVert") {
        document.getElementById("flagCanvas").innerHTML =
          '<div id="threeSV1" onclick="fillBgColor(\'threeSV1\')" style="width: 100%;height: 100px;border-top: 1px solid #4D535A;border-right: 1px solid #4D535A;border-left: 1px solid #4D535A;cursor:url(images/brush.png), auto;"></div><div filled="false" id="threeSV2" onclick="fillBgColor(\'threeSV2\')" style="width: 100%;height: 100px;border-top: 1px solid #4D535A;border-right: 1px solid #4D535A;border-left: 1px solid #4D535A;cursor:url(images/brush.png), auto;"></div><div filled="false" id="threeSV3" onclick="fillBgColor(\'threeSV3\')" style="width: 100%;height: 100px;border: 1px solid #4D535A;cursor:url(images/brush.png), auto;"></div>';

        flag_canvas.style.display = "block";
      } else if (defaultArrangment === "twoStripesVert") {
        document.getElementById("flagCanvas").innerHTML =
          '<div id="twoSV1" onclick="fillBgColor(\'twoSV1\')" style="width: 100%;height: 150px;border-top: 1px solid #4D535A;border-right: 1px solid #4D535A;border-left: 1px solid #4D535A;cursor: url(images/brush.png), auto;"></div><div id="twoSV2" onclick="fillBgColor(\'twoSV2\')" style="width: 100%;height: 150px;border: 1px solid #4D535A;cursor: url(images/brush.png), auto;"></div>';

        flag_canvas.style.display = "block";
      } else if (defaultArrangment === "threeStripesHoriz") {
        document.getElementById("flagCanvas").innerHTML =
          '<div id="threeSH1" onclick="fillBgColor(\'threeSH1\')" style="width: 33.3333%;height: 300px;border-top: 1px solid #4D535A;border-bottom: 1px solid #4D535A;border-left: 1px solid #4D535A;cursor: url(images/brush.png), auto;"></div><div id="threeSH2" onclick="fillBgColor(\'threeSH2\')" style="width: 33.3333%;height: 300px;border-top: 1px solid #4D535A;border-bottom: 1px solid #4D535A;border-left: 1px solid #4D535A;cursor: url(images/brush.png), auto;"></div><div id="threeSH3" onclick="fillBgColor(\'threeSH3\')" style="width: 33.3333%;height: 300px;border: 1px solid #4D535A;cursor: url(images/brush.png), auto;"></div>';

        flag_canvas.style.display = "flex";
      } else if (defaultArrangment === "twoStripesHoriz") {
        document.getElementById("flagCanvas").innerHTML =
          '<div id="twoSH1" onclick="fillBgColor(\'twoSH1\')" style="width: 50%;height: 300px;border-top: 1px solid #4D535A;border-bottom: 1px solid #4D535A;border-left: 1px solid #4D535A;cursor: url(images/brush.png), auto;"></div><div id="twoSH2" onclick="fillBgColor(\'twoSH2\')" style="width: 50%;height: 300px;border: 1px solid #4D535A;cursor: url(images/brush.png), auto;"></div>';

        flag_canvas.style.display = "flex";
      }

      document.getElementById("flagCanvas").style.backgroundColor = "#ffffff";

      setColorAttributeToCanvasChilds(paintFlags[que_count].allowedColors);

      //animate arrow's step two

      animateStepTwo();

      flag_canvas.setAttribute("shape", true);
    } else {
      document.getElementById(x).classList.add("shakeIt");

      wrongClickAudio.play();

      document.getElementById("txtWrongArrangment").style.display = "block";

      setTimeout(function () {
        document.getElementById(x).classList.remove("shakeIt");
      }, 500);

      setTimeout(function () {
        document.getElementById("txtWrongArrangment").style.display = "none";
      }, 1000);
    }
  } else if (paintingSarted === "true") {
    paintSartedAudio.play();

    document.getElementById("txtWarnArrangment").style.display = "block";

    setTimeout(function () {
      document.getElementById("txtWarnArrangment").style.display = "none";
    }, 1000);
  }
}

//setting allowed color attribute to each flag layer

function setColorAttributeToCanvasChilds(colors) {
  const flagLayers = flag_canvas.children.length;

  var getArrangement;

  for (var i = 0; i < flagLayers; i++) {

    flag_canvas.children[i].setAttribute("allowedColor", colors[i]);
  }
}

//copy selected color to be used

var bgColor = "none";

function getColor(color) {
  if (flag_canvas.getAttribute("shape") === "true") {
    bgColor = color;


    //animate arrow's step three

    animateStepThree();
  } else if (flag_canvas.getAttribute("shape") === "false") {

    //animate arrow's step one

    animateStepOne();

    document.getElementById("txtpickShape").classList.add("shakeIt");

    setTimeout(function () {
      document.getElementById("txtpickShape").classList.remove("shakeIt");
    }, 500);
  }
}

var flagOf = document.getElementById("flagCanvas").getAttribute("flagOf");

function fillBgColor(x) {
  flag_canvas.setAttribute("paintSarted", "true");

  var allowedColor = document.getElementById(x).getAttribute("allowedcolor");


  paintAudio.play();

  document.getElementById(x).style.backgroundColor = bgColor;

  animateStepTwo();

  if (bgColor === "none") {
    document.getElementById("txtSelectColor").classList.add("shakeIt");

    setTimeout(function () {
      document.getElementById("txtSelectColor").classList.remove("shakeIt");
    }, 500);
  } else if (bgColor === allowedColor) {
    document.getElementById(x).setAttribute("filled", "true");

    checkIfFlagPaintingIsComplete(x);
  } else if (allowedColor === "yellow" && bgColor === "orange") {
    document.getElementById(x).setAttribute("filled", "true");

    checkIfFlagPaintingIsComplete(x);
  } else if (allowedColor === "orange" && bgColor === "yellow") {
    document.getElementById(x).setAttribute("filled", "true");

    checkIfFlagPaintingIsComplete(x);
  } else {
    document.getElementById("flagCanvas").classList.add("shakeIt");

    wrongClickAudio.play();

    setTimeout(function () {
      document.getElementById("flagCanvas").classList.remove("shakeIt");
    }, 500);

    document.getElementById(x).setAttribute("filled", "false");

    checkIfFlagPaintingIsComplete(x);
  }
}

var rightFilledLayers = 0;

var wrongFilledLayers = 0;

function checkIfFlagPaintingIsComplete(x) {
  const flagLayersLength = flag_canvas.children.length;

  var boolFilled = document.getElementById(x).getAttribute("filled");


  var layerCounted = document.getElementById(x).getAttribute("counted");


  if (boolFilled === "true" && layerCounted != "true") {
    rightFilledLayers += 1;

    document.getElementById(x).setAttribute("counted", "true");


  } else if (boolFilled === "false" && layerCounted != "true") {
    wrongFilledLayers += 1;

    document.getElementById(x).setAttribute("counted", "true");


  }

  if (rightFilledLayers === flagLayersLength) {
    userScore += 1; //upgrading score value with 1

    draw_total_correct.innerHTML = userScore;


    callRightAnsDialog();

    animateStepOne();
  }

  var totalFilledLayers = rightFilledLayers + wrongFilledLayers;


  if (wrongFilledLayers != 0 && totalFilledLayers === flagLayersLength) {
    callTryAgainDialog();


    animateStepOne();
  }
}

btnDontKnow.onclick = () => {
  callNextQuestion();

  animateStepOne();
};

// call next Question

function callNextQuestion() {
  flag_canvas.setAttribute("shape", "false");

  bgColor = "none";

  rightFilledLayers = 0;

  wrongFilledLayers = 0;

  clearInterval(rightAnsInterval);

  clearInterval(tryAgainInterval);


  flag_canvas.style.backgroundColor = "#fff";

  flag_canvas.innerHTML = "";

  if (que_count < paintFlags.length - 1) {
    que_count++;

    showQuetions(que_count); //passing index of array to showQestions for current question

    flag_canvas.setAttribute("paintsarted", "false");

    flag_canvas.classList.remove("canvasWarning");
  } else if (que_count === paintFlags.length - 1) {
    callResultScreen();
  }
}

// call next Question

function callSameQuestion() {
  flag_canvas.setAttribute("shape", "false");

  bgColor = "none";

  rightFilledLayers = 0;

  wrongFilledLayers = 0;


  flag_canvas.style.backgroundColor = "#fff";

  flag_canvas.innerHTML = "";

  clearInterval(tryAgainInterval);

  if (que_count > 0) {

    que_count;

    showQuetions(que_count); //passing index of array to showQestions for current question

    flag_canvas.setAttribute("paintsarted", "false");

    flag_canvas.setAttribute("shape", "false");

    flag_canvas.classList.remove("canvasWarning");
  }
}

//Closing message dialog

function closeDialog() {
  flag_canvas.innerHTML = "";

  callNextQuestion();
}

//function to call try again dialog

function callTryAgainDialog() {
  flag_canvas.innerHTML =
    '<div class="user_messages"><div class="btn_close_dialog" onclick="closeDialog()">✖</div><div class="w-100" style="display:grid;"><img class="mb-3" src="images/answer.wrong.png" style="height:100px; margin: 0px auto;"><div id="tryAgainSeconds" class="try_again_time">--</div><button onclick="callSameQuestion()" class="btn_try_again">Try Again</button></div></div>';

  flag_canvas.setAttribute("paintsarted", "false");

  tryAgainTime(0, 05);
}

//function to call try again dialog

function callRightAnsDialog() {
  flag_canvas.innerHTML =
    '<div class="user_messages"><div class="btn_close_dialog" onclick="closeDialog()">✖</div><div class="w-100" style="display:grid;"><img src="images/checkmark.png" style="height:50px; margin: 0px auto;"><img src="' +
    paintFlags[que_count].image +
    '" style="margin: 0px auto;"><div id="nextQueSeconds" class="try_again_time">--</div><button onclick="callNextQuestion()" class="btn_try_again" id="btnNextQue">Next Question</button></div></div>';

  flag_canvas.setAttribute("paintsarted", "false");

  rightAnsTime(0, 05);

  if (que_count === paintFlags.length - 1) {
    document.getElementById("btnNextQue").classList.add("d-none");
  }
}

//timer

disMinutes.innerHTML = "00";

disSeconds.innerHTML = "00";

function textCorrection(element, value) {
  element.innerHTML = value < 10 ? "0" + value : value;
}

window.loadd = totalTestTime(0, 300);

function totalTestTime(min, sec) {
  //totalTime = inpMinutes.value * 60 + inpSeconds.value * 1;

  var totalTime = min * 60 + sec * 1;


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

//function to show timer for trying again

function tryAgainTime(min, sec) {
  var totalTime = min * 60 + sec * 1;


  if (min != "" || sec != "") {
    tryAgainInterval = setInterval(() => {
      const seconds = totalTime % 60;

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

//function to show timer when user draws flag correctly

function rightAnsTime(min, sec) {
  var totalTime = min * 60 + sec * 1;


  if (min != "" || sec != "") {
    rightAnsInterval = setInterval(() => {
      const seconds = totalTime % 60;

      document.getElementById("nextQueSeconds").style.animation =
        "popup 800ms infinite ease-in-out";

      document.getElementById("nextQueSeconds").style.animationPlayState =
        "running";

      textCorrection(document.getElementById("nextQueSeconds"), seconds);

      if (totalTime > 0) {
        totalTime--;
      } else {

        closeDialog();

        clearInterval(rightAnsInterval);
      }
    }, 1000);
  } else {
    document.getElementById("nextQueSeconds").innerHTML = "00";
  }

  return totalTime;
}

  questions_box.classList.add("d-none");

result_box.classList.remove("d-none");

result_btn.classList.add("d-none");

time_up.classList.add("d-none");

document.querySelector("#testDuration").classList.add("d-none");

//Post Api  


var valRight = (userScore / questions.length) * 360;

var valWrong = 360 - valRight;


var xValues = ["Right", "Wrong"];

var yValues = [valRight, valWrong];

var barColors = ["#1DCF71", "#EA4A4A"];

new Chart("DrawMyChart", {
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

function callResultScreen() {
  que_heading.classList.add("d-none");

  document.getElementById("arrangementWrapper").classList.add("d-none");

  document.getElementById("canvasWrapper").classList.add("d-none");

  document.getElementById("arrowsRow").classList.add("d-none");

  btnDontKnow.classList.add("d-none");

  document.getElementById("scoreWrapper").style.width = "20%";
}

function animateStepOne() {
  document.getElementById("emptyArrow1").classList.add("buzzAnimation3Empty");

  document
    .getElementById("emptyArrow1")
    .classList.add("buzzAnimationBefore3Empty");

  document.getElementById("emptyArrow1").classList.remove("inactiveEmptyArrow");

  document.getElementById("step1").classList.add("buzzAnimation3");

  document.getElementById("step1").classList.add("buzzAnimationBefore3");

  document.getElementById("step1").classList.remove("inactiveArrow");

  document.getElementById("emptyArrow2").classList.add("inactiveEmptyArrow");

  document
    .getElementById("emptyArrow2")
    .classList.remove("buzzAnimation3Empty");

  document
    .getElementById("emptyArrow2")
    .classList.remove("buzzAnimationBefore3Empty");

  document.getElementById("step2").classList.add("inactiveArrow");

  document.getElementById("step2").classList.remove("buzzAnimation3");

  document.getElementById("step2").classList.remove("buzzAnimationBefore3");

  document.getElementById("emptyArrow3").classList.add("inactiveEmptyArrow");

  document
    .getElementById("emptyArrow3")
    .classList.remove("buzzAnimation3Empty");

  document
    .getElementById("emptyArrow3")
    .classList.remove("buzzAnimationBefore3Empty");

  document.getElementById("step3").classList.add("inactiveArrow");

  document.getElementById("step3").classList.remove("buzzAnimation3");

  document.getElementById("step3").classList.remove("buzzAnimationBefore3");
}

function animateStepTwo() {
  document
    .getElementById("emptyArrow1")
    .classList.remove("buzzAnimation3Empty");

  document
    .getElementById("emptyArrow1")
    .classList.remove("buzzAnimationBefore3Empty");

  document.getElementById("emptyArrow1").classList.add("inactiveEmptyArrow");

  document.getElementById("step1").classList.remove("buzzAnimation3");

  document.getElementById("step1").classList.remove("buzzAnimationBefore3");

  document.getElementById("step1").classList.add("inactiveArrow");

  document.getElementById("emptyArrow2").classList.remove("inactiveEmptyArrow");

  document.getElementById("emptyArrow2").classList.add("buzzAnimation3Empty");

  document
    .getElementById("emptyArrow2")
    .classList.add("buzzAnimationBefore3Empty");

  document.getElementById("step2").classList.remove("inactiveArrow");

  document.getElementById("step2").classList.add("buzzAnimation3");

  document.getElementById("step2").classList.add("buzzAnimationBefore3");

  document.getElementById("emptyArrow3").classList.add("inactiveEmptyArrow");

  document
    .getElementById("emptyArrow3")
    .classList.remove("buzzAnimation3Empty");

  document
    .getElementById("emptyArrow3")
    .classList.remove("buzzAnimationBefore3Empty");

  document.getElementById("step3").classList.add("inactiveArrow");

  document.getElementById("step3").classList.remove("buzzAnimation3");

  document.getElementById("step3").classList.remove("buzzAnimationBefore3");
}

function animateStepThree() {
  document
    .getElementById("emptyArrow2")
    .classList.remove("buzzAnimation3Empty");

  document
    .getElementById("emptyArrow2")
    .classList.remove("buzzAnimationBefore3Empty");

  document.getElementById("emptyArrow2").classList.add("inactiveEmptyArrow");

  document.getElementById("step2").classList.remove("buzzAnimation3");

  document.getElementById("step2").classList.remove("buzzAnimationBefore3");

  document.getElementById("step2").classList.add("inactiveArrow");

  document.getElementById("emptyArrow3").classList.remove("inactiveEmptyArrow");

  document.getElementById("emptyArrow3").classList.add("buzzAnimation3Empty");

  document
    .getElementById("emptyArrow3")
    .classList.add("buzzAnimationBefore3Empty");

  document.getElementById("step3").classList.remove("inactiveArrow");

  document.getElementById("step3").classList.add("buzzAnimation3");

  document.getElementById("step3").classList.add("buzzAnimationBefore3");
}
