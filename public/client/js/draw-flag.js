var paintFlags; 
fetch(`/draw-flags/all`)
  .then(res => res.json())
  .then((data) => {   
    paintFlags = data[0].questions.map((val, i) => {
      var colors = ["red", "green", "yellow", "black", "orange", "blue", "pink", "white", "grey"];
      var colorOptions = JSON.parse(JSON.stringify(val.correctColors));  
      var random = 6 - val.correctColors.length;  
      for (let j = 0; j < random; j++) {
        var index = Math.floor(Math.random()*colors.length);
        var status = false;
        colorOptions.forEach(element => {
          if(colors[index] == element)
          {
            status = true;
            j--;
          }
        });
        if(status == false)
        {
          colorOptions.push(colors[index]);  
        }
      }
      
      shuffle(colorOptions);
      
      return {
        numb: i,
  
        question: val.country,
  
        image: val.flagUrl,

        shapeImg: val.shapeImg,
  
        arrangement: val.arrangement,
  
        allowedColors: val.correctColors,
  
        colorPalette: colorOptions,
      }
  });

    runDraw(paintFlags, data[0]._id); 
  });  
 
  


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

const arrangementWrapper = document.getElementById("arrangementWrapper");

const result_box = document.querySelector(".result_box");

const paint_game_color = document.querySelector(".paint-game-color")

const timer__display = document.querySelector(".timer__display")

const time_up = document.querySelector(".time_up")




//required variable

let que_count = 0;

let completeTestInterval;

let userScore = 0;

let userWrongScore = 0;

let tryAgainInterval;

let rightAnsInterval;

const randomShapeOptions = [
  {"shapeImg": "/client/img/images/white.two.layers.vertical.svg","arrangement": "twoStripesVert"},
  {"shapeImg": "/client/img/images/white.three.layers.vertical.svg","arrangement": "threeStripesVert"},
  {"shapeImg": "/client/img/images/white.two.layers.horizontal.svg","arrangement": "twoStripesHoriz"},
  ];

var bgColor = "none";

var flagOf = document.getElementById("flagCanvas").getAttribute("flagOf");

var rightFilledLayers = 0;

var wrongFilledLayers = 0;

function runDraw(paintFlags, id)
{ 
  var shapeOptions = '';
  const correctShapeOptions = [{"shapeImg": `/upload-images/${paintFlags[0].shapeImg}`,"arrangement": paintFlags[0].arrangement}];
  correctShapeOptions.push(...randomShapeOptions);
  shuffle(correctShapeOptions);

  
  correctShapeOptions.forEach(element => { 
    shapeOptions += `<img id="${element.arrangement}" onclick="choseFlagArrangemnet('${element.arrangement}')" src="${element.shapeImg}" class="img-fluid" style="cursor: pointer"/>`;

  }); 
  arrangementWrapper.innerHTML = shapeOptions;
 

window.load = startQuiz();

function startQuiz() {  
  showQuetions(0);

}


// getting questions and options from array

draw_total_questions.innerHTML = paintFlags.length

var queNumber = 0;
 
if(queNumber == paintFlags.length){
console.log("hello")
} 

//copy selected color to be used


btnDontKnow.onclick = () => {
  callNextQuestion();
  userWrongScore++;
  draw_total_in_correct.innerHTML = userWrongScore; 
  animateStepOne();
};


//timer 
disMinutes.innerHTML = "00";

disSeconds.innerHTML = "00";

window.loadd = totalTestTime(paintFlags.length, 30);

function totalTestTime(min, sec) {
  //totalTime = inpMinutes.value * 60 + inpSeconds.value * 1;

  var totalTime = min * sec
  
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
}


//allow user to select flag arrangement
function choseFlagArrangemnet(x) {  
  var paintingSarted = document
    .getElementById("flagCanvas")
    .getAttribute("paintSarted");

  var defaultArrangment = flag_canvas.getAttribute("arrangement");
  
  if (paintingSarted === "false") {
    
    if (x === defaultArrangment) {

      if (defaultArrangment == "threeStripesHoriz") {
        document.getElementById("flagCanvas").innerHTML =
          '<div id="threeSV1" onclick="fillBgColor(\'threeSV1\')" style="width: 100%;height: 100px;border-top: 1px solid #4D535A;border-right: 1px solid #4D535A;border-left: 1px solid #4D535A;cursor:url(/client/img/images/brush.png), auto;"></div><div filled="false" id="threeSV2" onclick="fillBgColor(\'threeSV2\')" style="width: 100%;height: 100px;border-top: 1px solid #4D535A;border-right: 1px solid #4D535A;border-left: 1px solid #4D535A;cursor:url(/client/img/images/brush.png), auto;"></div><div filled="false" id="threeSV3" onclick="fillBgColor(\'threeSV3\')" style="width: 100%;height: 100px;border: 1px solid #4D535A;cursor:url(/client/img/images/brush.png), auto;"></div>';

        flag_canvas.style.display = "block";
      } else if (defaultArrangment == "twoStripesHoriz") {
        document.getElementById("flagCanvas").innerHTML =
          '<div id="twoSV1" onclick="fillBgColor(\'twoSV1\')" style="width: 100%;height: 150px;border-top: 1px solid #4D535A;border-right: 1px solid #4D535A;border-left: 1px solid #4D535A;cursor: url(/client/img/images/brush.png), auto;"></div><div id="twoSV2" onclick="fillBgColor(\'twoSV2\')" style="width: 100%;height: 150px;border: 1px solid #4D535A;cursor: url(/client/img/images/brush.png), auto;"></div>';
          
        flag_canvas.style.display = "block";
      } else if (defaultArrangment == "threeStripesVert") {
        document.getElementById("flagCanvas").innerHTML =
          '<div id="threeSH1" onclick="fillBgColor(\'threeSH1\')" style="width: 33.3333%;height: 300px;border-top: 1px solid #4D535A;border-bottom: 1px solid #4D535A;border-left: 1px solid #4D535A;cursor: url(/client/img/images/brush.png), auto;"></div><div id="threeSH2" onclick="fillBgColor(\'threeSH2\')" style="width: 33.3333%;height: 300px;border-top: 1px solid #4D535A;border-bottom: 1px solid #4D535A;border-left: 1px solid #4D535A;cursor: url(/client/img/images/brush.png), auto;"></div><div id="threeSH3" onclick="fillBgColor(\'threeSH3\')" style="width: 33.3333%;height: 300px;border: 1px solid #4D535A;cursor: url(/client/img/images/brush.png), auto;"></div>';

        flag_canvas.style.display = "flex";
        
      } else if (defaultArrangment == "twoStripesVert") {
        document.getElementById("flagCanvas").innerHTML =
          '<div id="twoSH1" onclick="fillBgColor(\'twoSH1\')" style="width: 50%;height: 300px;border-top: 1px solid #4D535A;border-bottom: 1px solid #4D535A;border-left: 1px solid #4D535A;cursor: url(/client/img/images/brush.png), auto;"></div><div id="twoSH2" onclick="fillBgColor(\'twoSH2\')" style="width: 50%;height: 300px;border: 1px solid #4D535A;cursor: url(/client/img/images/brush.png), auto;"></div>';

        flag_canvas.style.display = "flex";
      }

      document.getElementById("flagCanvas").style.backgroundColor = "#ffffff";

      console.log(paintFlags[que_count],"paintFlags[que_count].allowedColors")
  
      setColorAttributeToCanvasChilds(paintFlags[que_count].allowedColors);

      //animate arrow's step two

      animateStepTwo();

      flag_canvas.setAttribute("shape", true);
    } else {
      document.getElementById(x).classList.add("shakeIt");

      wrongClickAudio.play();

      // document.getElementById("txtWrongArrangment").style.display = "block";

      setTimeout(function () {
        document.getElementById(x).classList.remove("shakeIt");
      }, 500);

      setTimeout(function () {
        // document.getElementById("txtWrongArrangment").style.display = "none";
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


function fillBgColor(x) {



  console.log(document.getElementById(x),"document.getElementById(x)")
  flag_canvas.setAttribute("paintSarted", " ");

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

//function to call try again dialog 
function callTryAgainDialog() {


  flag_canvas.innerHTML =
    '<div class="user_messages"><div class="btn_close_dialog" onclick="closeDialog()">✖</div><div class="w-100" style="display:grid;"><img class="mb-3" src="images/answer.wrong.png" style="height:100px; margin: 0px auto;"><div id="tryAgainSeconds" class="try_again_time">--</div><button onclick="callSameQuestion()" class="btn_try_again">Try Again</button></div></div>';

  flag_canvas.setAttribute("paintsarted", "false");

  tryAgainTime(0, 05);
}


//function to show timer for trying again

function tryAgainTime(min, sec) {
  var totalTime = min * 60 + sec * 1;


  if (min != "" || sec != "") {
    tryAgainInterval = setInterval(() => {
      const seconds = totalTime % 60;
      if(seconds <= 0){
        userWrongScore += 1;
        draw_total_in_correct.innerHTML = userWrongScore;
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

function textCorrection(element, value) {
  element.innerHTML = value < 10 ? "0" + value : value;
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
    '<span class="total_que" style="font-size: 30px; font-weight: bold">' +
    queNumber +
    '<span style="font-size: 30px; font-weight: bold">/' +
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



function callResultScreen() {
  que_heading.classList.add("d-none");

  result_box.classList.remove("d-none");

  document.getElementById("arrangementWrapper").classList.add("d-none");

  document.getElementById("canvasWrapper").classList.add("d-none");

  document.getElementById("arrowsRow").classList.add("d-none");

  btnDontKnow.classList.add("d-none");

  paint_game_color.classList.add("d-none")

  time_up.classList.remove("d-none")

  timer__display.classList.add("d-none")

  score_board.classList.add("d-none")



  draw_total_in_correct.innerHTML =paintFlags.length- userScore;



  // count result for result box;

  
  var valRight = (userScore / paintFlags.length) * 360;

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

      title: {
        display: true,

        text: "You got " + userScore + " out of " + paintFlags.length,
      },
  });

  // document.getElementById("scoreWrapper").style.width = "20%";
}
  
async function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
 

// async function storeResultForDrawFlagGame() { 
  // var obj = {correct: userScore, incorrect: userWrongScore, attempted: attempted};
  // console.log(flagGameID); 
  // const response = await fetch(`/drawflag-game-result/${flagGameID}`, {
  //   method: 'POST',
  //   body: JSON.stringify({objToStore: obj}),
  //   headers: {
  //     'Content-type': 'application/json; charset=UTF-8',
  //   }
  // }); 
  // console.log(response);
// }