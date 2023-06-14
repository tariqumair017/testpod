const skip_guess_flag = document.querySelector(".skip-guess-flag")
const check_Button = document.querySelector(".check-guess-flag")
const continue_guess_flag = document.querySelector(".continue-guess-flag")
const pod_adventure_footer = document.querySelector('.pod-adventure-footer')
const right_guess_flag = document.querySelector(".right-guess-flag")
const guess_flag_details = document.getElementById("guess-flag-details")
const mypopover_content = document.getElementById("mypopover-content")
const well_done = document.querySelector(".well_done")
const Not_true = document.querySelector(".Not_true")
const time_line = document.querySelector(".time_line");
const time_line_inner = document.querySelector(".time_line_inner");
const game_change = document.querySelector(".game-change")
const controller = document.querySelector(".controller")
const half_game_continue = document.querySelector(".half-game-continue")
const details = document.getElementById("details")
const well_done_img = document.querySelector(".well_done_img")
const Not_true_img = document.querySelector(".Not_true_img")
const greats_text = document.querySelector(".greats")



const multiple_game = document.getElementById("Multiple-game")




var popover = new bootstrap.Popover(document.querySelector('.example-popover'), {
  container: 'body',
  html: true,
  trigger: 'hover',
  delay: { show: 0, hide: 100 },
  content: document.getElementById('mypopover-content'),
  placement: 'top',
})

let gameChnager = 0
let questionChange = 0
let total_inputs = [];
let dataForRepeat = [];
dataForRepeat[gameChnager] = {};
dataForRepeat[gameChnager].modules = [];
dataForRepeat[gameChnager].guessCountry = [];
dataForRepeat[gameChnager].guessFlag = [];
dataForRepeat[gameChnager].flagDetective = [];
let pod_adventure_guess_country = 1
let counterLine;
let question_counter = 1

let points = 0
let repeat = 0;


const greats= ["Excellent!",
"Well done!",
"Bravo!",
"Impressive!",
"Superb!",
"Amazing job!",
"Kudos!",
"Way to go!",
"Nice!",
"Correct!",
"Nice job!",
"Awesome!",
"Nicely done!",
"Good job!"]





function gameChanger(num) {
  let shuffledGreats = greats.sort(function () {
    return Math.random() - 0.5;
  });
  
  if (num == data[gameChnager].modules.length) {
    if (dataForRepeat[gameChnager].modules.length) {
      repeat++;
      if (repeat == 1) {
        data[gameChnager] = JSON.parse(JSON.stringify(dataForRepeat[gameChnager]));
        i = 0;
        num = 0;
      } else {
        document.querySelector(".game").classList.add("d-none")
        confettiExplosion(origin);
        document.querySelector(".pod-percentage").innerHTML = Math.round(points) + "%"
        document.querySelector(".pod_adventure_result_screen").classList.remove("d-none")
        document.querySelector(".next-unit").onclick = () => { 
          startTimerLineEmpty();
          document.querySelector(".game").classList.remove("d-none");
          document.querySelector(".pod_adventure_result_screen").classList.add("d-none");
          gameChnager++;
          points = 0;
          dataForRepeat[gameChnager] = {};
          dataForRepeat[gameChnager].modules = [];
          dataForRepeat[gameChnager].guessCountry = [];
          dataForRepeat[gameChnager].guessFlag = [];
          dataForRepeat[gameChnager].flagDetective = [];
          repeat = 0;
          i=0;
          gameChanger(i);
        }
      }
    }
    else {
      document.querySelector(".game").classList.add("d-none")
      confettiExplosion(origin);
      document.querySelector(".pod-percentage").innerHTML = Math.round(points) + "%"
      document.querySelector(".pod_adventure_result_screen").classList.remove("d-none")
      document.querySelector(".next-unit").onclick = () => { 
        startTimerLineEmpty();
        document.querySelector(".game").classList.remove("d-none");
        document.querySelector(".pod_adventure_result_screen").classList.add("d-none");
        gameChnager++;
        points = 0;
        dataForRepeat[gameChnager] = {};
        dataForRepeat[gameChnager].modules = [];
        dataForRepeat[gameChnager].guessCountry = [];
        dataForRepeat[gameChnager].guessFlag = [];
        dataForRepeat[gameChnager].flagDetective = [];
        repeat = 0;
        i=0;
        gameChanger(i);
      }
    }
  }

  if (data[gameChnager]?.modules[num] == "flag detective game") {
    multiple_game.innerHTML = `<div >
    <h2 class="score-text-slide-top text-center pb-4" style="margin: 0%">Which Country Is This?</h2>
    <div class="pod-adventure-game-detective-image pb-4">
    <div class="loading-skeleton"></div>
    </div>
    <div class="siblings-input"></div>
    </div>`;
    const siblings_input = document.querySelector(".siblings-input");
    for (let i = 0; i < data[gameChnager].flagDetective[questionChange].country.split("").length; i++) {
      siblings_input.innerHTML +=
        '<input class="current-input" maxlength="1" />' || ` <div class="loading-skeleton-inputs"></div>`;
    }

    details.innerHTML = data[gameChnager].flagDetective[questionChange].detail

    const inputs = document.querySelectorAll(".current-input");
    total_inputs = inputs;
    total_inputs[0].focus()


    setTimeout(() => {
      document.querySelector(".pod-adventure-game-detective-image").innerHTML =
        `<span style="border-radius:7px;width:fit-content;height:260px;display:flex;justify-content:center; border: 2px solid #f9f9f9;padding:10px"><img class="border" src=${data[gameChnager]?.flagDetective[questionChange].flagUrl}
       alt="img"></span>`
    }, 1000)


    let baba = ""

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
            baba = _finalKey
            check_Button.classList.remove("pod-adventure-skip2-disabled")
            check_Button.classList.add("pod-adventure-skip2")
          }
          check_Button.onclick = () => {
            if (baba.replace(/\s/g, '').toLowerCase() == data[gameChnager]?.flagDetective[questionChange].country.replace(/\s/g, '').toLowerCase()) {
              continue_guess_flag.classList.remove("d-none")
              well_done.classList.remove("d-none")
              check_Button.classList.add("d-none")
              skip_guess_flag.classList.add("d-none")
              controller.classList.remove("pod-adventure-footer-inner")
              controller.classList.add("pod-adventure-footer-inner-green")
              well_done_img.classList.add("controllers-zoom-in")
              Not_true_img.classList.remove("controllers-zoom-in")
              startTimerLineCorrect()
            } else {
              dataForRepeat[gameChnager].flagDetective.push(data[gameChnager]?.flagDetective[questionChange]);
              if (dataForRepeat[gameChnager].flagDetective.length == 1) {
                dataForRepeat[gameChnager].modules.push(data[gameChnager]?.modules[i]);
              }

              controller.classList.remove("pod-adventure-footer-inner")
              controller.classList.remove("pod-adventure-footer-inner-green")
              controller.classList.add("pod-adventure-footer-inner-red")
              check_Button.classList.add("d-none")
              skip_guess_flag.classList.add("d-none")
              Not_true.classList.remove("d-none")
              skip_guess_flag.classList.add("d-none")
              continue_guess_flag.classList.remove("d-none")
              well_done_img.classList.remove("controllers-zoom-in")
              Not_true_img.classList.add("controllers-zoom-in")

              startTimerLineInCorrect()
            }

            if (question_counter == data[gameChnager]?.flagDetective.length) {
              game_change.classList.remove('d-none')
              continue_guess_flag.classList.add("d-none")
            }
            guess_flag_details.classList.remove("d-none")
            greats_text.innerHTML=shuffledGreats[0]
            for (let i = 0; i < total_inputs.length; i++) {
              total_inputs[i].classList.add("disabled")
            }
          }
        });
      });
    }
    showNextInputs();
  }


  else if (data[gameChnager]?.modules[num] == "flag quest game") {
    multiple_game.innerHTML =
      `
      <p class="flag-quest-box-left-name slide-right quest_question_name pb-4">Flag of ${data[gameChnager]?.flagQuest[i]?.country}</p>
      <div class="pod-adventure-quest-game" style="justify-content:center" >
      <div class="flag-quest-pair" style="gap:20px">
        <div class="option-one pod-adventure-options">
        <input class="customRadio" ans="correct" type="radio" name=q${i} id=${data[gameChnager]?.flagQuest[i]?.country}>
        <label class="customLableWimageQuest" style='height:130px;width:' for=${data[gameChnager]?.flagQuest[i]?.country}>
        <img class="flag-quest-image" style='height:120px;width:180px;padding-top:0px;padding-bottom:0px' src=${data[1]?.flagQuest[i]?.correctImg} alt="" ></label>
        </div>
        <div class="option-two pod-adventure-options">
        <input class="customRadio" ans="correct" type="radio" name=q${i} id=${data[gameChnager]?.flagQuest[i]?.country}>
        <label class="customLableWimageQuest" style='height:130px;' for=${data[gameChnager]?.flagQuest[i]?.country}>
        <img class="flag-quest-image" style='height:120px;width:180px;padding-top:0px;padding-bottom:0px' src=${data[gameChnager]?.flagQuest[i]?.IcorrectImg1} alt="" ></label>
        </div>
      </div>
      <div class="flag-quest-pair" style="gap:20px">
        <div class="option-three pod-adventure-options">
        <input class="customRadio" ans="correct" type="radio" name=q${i} id=${data[gameChnager]?.flagQuest[1]?.country}>
        <label class="customLableWimageQuest" style='height:130px;' for=${data[gameChnager]?.flagQuest[1]?.country}>
        <img class="flag-quest-image" style='height:120px;width:180px;padding-top:0px;padding-bottom:0px' src=${data[gameChnager]?.flagQuest[i]?.IcorrectImg2} alt="" ></label>
        </div>
        <div class="option-four pod-adventure-options">
        <input class="customRadio" ans="correct" type="radio" name=q${i} id=${data[gameChnager]?.flagQuest[1]?.country}>
        <label class="customLableWimageQuest" style='height:130px;' for=${data[gameChnager]?.flagQuest[1]?.country}>
        <img class="flag-quest-image" style='height:120px;width:180px;padding-top:0px;padding-bottom:0px' src=${data[gameChnager]?.flagQuest[i]?.IcorrectImg3} alt="" ></label>
        </div>
      </div>
      </div>`

  }


  else if (data[gameChnager]?.modules[num] == "guess country game") {

    multiple_game.innerHTML =
      `
    <div class="align-items-center">
      <h2 class="score-text-slide-top text-center" style="margin: 0%">Guess the name of this flag ?</h2>
      
      <div class="quiz-image">
      <div class="loading-skeleton"></div>
    </div>
      </div>
      <div style="margin-top: 10px">
        <div class="pod-adventure-option_list">
          <div class="pod-adventure-customLable wow animate__fadeInUp" style="padding-left:0px" data-wow-delay="0.1s">
            ${data[gameChnager]?.guessCountry[questionChange]?.optionA}
          </div>
          <div class="pod-adventure-customLable wow animate__fadeInUp" style="padding-left:0px" data-wow-delay="0.2s">
            ${data[gameChnager]?.guessCountry[questionChange]?.optionB}
          </div>
        </div>                
      </div>
    </div>
    `
    details.innerHTML = data[gameChnager].guessCountry[questionChange].detail

    multiple_game.querySelectorAll(".pod-adventure-customLable")[0].onclick = () => {
      multiple_game.querySelectorAll(".pod-adventure-customLable")[0].classList.add("pod-adventure-customLable-avtive")
      multiple_game.querySelectorAll(".pod-adventure-customLable")[1].classList.remove("pod-adventure-customLable-avtive")
      multiple_game.querySelectorAll(".pod-adventure-customLable")[0].setAttribute("select", `${data[gameChnager]?.guessCountry[questionChange]?.optionA}`)
      multiple_game.querySelectorAll(".pod-adventure-customLable")[1].removeAttribute("select")
      check_Button.classList.remove("pod-adventure-skip2-disabled")
      check_Button.classList.add("pod-adventure-skip2")
    }
    multiple_game.querySelectorAll(".pod-adventure-customLable")[1].onclick = () => {
      multiple_game.querySelectorAll(".pod-adventure-customLable")[0].classList.remove("pod-adventure-customLable-avtive")
      multiple_game.querySelectorAll(".pod-adventure-customLable")[1].classList.add("pod-adventure-customLable-avtive")
      multiple_game.querySelectorAll(".pod-adventure-customLable")[1].setAttribute("select", `${data[gameChnager]?.guessCountry[questionChange]?.optionB}`)
      multiple_game.querySelectorAll(".pod-adventure-customLable")[0].removeAttribute("select")
      check_Button.classList.remove("pod-adventure-skip2-disabled")
      check_Button.classList.add("pod-adventure-skip2")
    }

    // set onclick attribute to all available options

    setTimeout(() => {
      document.querySelector(".quiz-image").innerHTML =
        `<div class="que_text" style="display: flex;justify-content: center;">
          <span class="flag-icon-background" style="border-radius:7px;width:100%;height:260px;display:flex;justify-content:center; border: 2px solid #f9f9f9;padding:10px"><img class="border" src="${data[gameChnager]?.guessCountry[questionChange]?.flag}" alt="img"></span>
        </div>`
    }, 1000)



    check_Button.onclick = () => {
      let userAns = []
      for (j = 0; j < document.querySelectorAll(".pod-adventure-customLable").length; j++) {
        userAns.push(document.querySelectorAll(".pod-adventure-customLable")[j].getAttribute("select"))
      }
      const s = new Set(userAns);

      s.delete(null)
      check_Button.classList.add("d-none")
      skip_guess_flag.classList.add("d-none")
      document.querySelector(".pod-adventure-option_list").classList.add("disabled")
      if (Array.from(s)[0].replace(/\s/g, '').toLowerCase() === data[gameChnager]?.guessCountry[questionChange]?.correct.replace(/\s/g, '').toLowerCase()) {
        continue_guess_flag.classList.remove("d-none")
        well_done.classList.remove("d-none")
        check_Button.classList.add("d-none")
        skip_guess_flag.classList.add("d-none")
        controller.classList.remove("pod-adventure-footer-inner")
        controller.classList.add("pod-adventure-footer-inner-green")
        well_done_img.classList.add("controllers-zoom-in")
        Not_true_img.classList.remove("controllers-zoom-in")
        startTimerLineCorrect()
      } else {
        dataForRepeat[gameChnager].guessCountry.push(data[gameChnager]?.guessCountry[questionChange]);
        if (dataForRepeat[gameChnager].guessCountry.length == 1) {
          dataForRepeat[gameChnager].modules.push(data[gameChnager]?.modules[i]);
        }

        well_done_img.classList.remove("controllers-zoom-in")
        Not_true_img.classList.add("controllers-zoom-in")
        controller.classList.remove("pod-adventure-footer-inner")
        controller.classList.remove("pod-adventure-footer-inner-green")
        controller.classList.add("pod-adventure-footer-inner-red")
        check_Button.classList.add("d-none")
        skip_guess_flag.classList.add("d-none")
        Not_true.classList.remove("d-none")
        skip_guess_flag.classList.add("d-none")
        continue_guess_flag.classList.remove("d-none")
        startTimerLineInCorrect()
      }
      if (question_counter == data[gameChnager]?.guessCountry.length) {
        game_change.classList.remove('d-none')
        continue_guess_flag.classList.add("d-none")
      }
      guess_flag_details.classList.remove("d-none")

      greats_text.innerHTML=shuffledGreats[0]

    }
  }


  else if (data[gameChnager]?.modules[num] == "guess flag game") {

    data[gameChnager].guessFlag[questionChange].country
    multiple_game.innerHTML =
      `
      <div class="text-center mb-4 questions-name wow animate__fadeInUp" data-wow-delay="0.1s">
        <span style="font-size: 40px;font-weight: bold;color: back">
          Can you guess the flag of "${data[gameChnager].guessFlag[questionChange].country}"
        </span>
      </div>
      <div class="pod-adventure" style="margin-bottom:50px">
          <div style="width: 100%;display: flex;justify-content: space-around;">
              <div class="pod-adventure-guess-option-left">
                <div class="loading-skeleton"></div>
              </div>
    
              <div class="pod-adventure-guess-option-right" >
                <div class="loading-skeleton"></div>
              </div>
          </div>
      </div>`


    var leftSide =
      ` <input class="customRadio" ans="correct" type="radio" name="q1${data[gameChnager].guessFlag[questionChange].country}" id=${data[gameChnager].guessFlag[questionChange].country} >
        <label class="podcustomLableWimage" for=${data[gameChnager].guessFlag[questionChange].country} style="width:100%;height:250px;">
        <img class="guess-flag-image border " style="height:240px;"src=${data[gameChnager].guessFlag[questionChange].correctImg} alt=""/>
        </label>`
    var RightSide =
      ` <input class="customRadio" ans="incorrect" type="radio" name="q1${data[gameChnager].guessFlag[questionChange].country}" id=${data[gameChnager].guessFlag[questionChange].Icountry}>
      <label class="podcustomLableWimage" for=${data[gameChnager].guessFlag[questionChange].Icountry} style="width:100%;height:250px;">
      <img class="guess-flag-image border " style="height:240px;"src=${data[gameChnager].guessFlag[questionChange].IcorrectImg} alt=""/>
      </label>`

    var FlagOptions = [];
    FlagOptions.push(RightSide);
    FlagOptions.push(leftSide);

    let shuffledFlagOptions = FlagOptions.sort(function () {
      return Math.random() - 0.5;
    });

    details.innerHTML = data[gameChnager].guessFlag[questionChange].detail


    setTimeout(() => {
      multiple_game.querySelector(".pod-adventure-guess-option-left").innerHTML = shuffledFlagOptions[0];
      multiple_game.querySelector(".pod-adventure-guess-option-right").innerHTML = shuffledFlagOptions[1];

      multiple_game.querySelectorAll(".podcustomLableWimage")[0].onclick = () => {
        check_Button.classList.remove("pod-adventure-skip2-disabled")
        check_Button.classList.add("pod-adventure-skip2")
        multiple_game.querySelectorAll(".customRadio")[0].classList.add("select")
        multiple_game.querySelectorAll(".customRadio")[1].classList.remove("select")
        multiple_game.querySelectorAll(".podcustomLableWimage")[0].classList.add("select-child")
        multiple_game.querySelectorAll(".podcustomLableWimage")[1].classList.remove("select-child")
      }

      multiple_game.querySelectorAll(".podcustomLableWimage")[1].onclick = () => {
        check_Button.classList.remove("pod-adventure-skip2-disabled")
        check_Button.classList.add("pod-adventure-skip2")
        multiple_game.querySelectorAll(".customRadio")[1].classList.add("select")
        multiple_game.querySelectorAll(".customRadio")[0].classList.remove("select")
        multiple_game.querySelectorAll(".podcustomLableWimage")[1].classList.add("select-child")
        multiple_game.querySelectorAll(".podcustomLableWimage")[0].classList.remove("select-child")
      }

    }, 1000)

    check_Button.onclick = () => {
      multiple_game.querySelector(".pod-adventure").classList.add("disabled")
      if (document.querySelector(".select").getAttribute("ans") == "correct") {
        document.querySelector(".select-child").classList.add("podcustomLableWimage-write")
        continue_guess_flag.classList.remove("d-none")
        well_done.classList.remove("d-none")
        check_Button.classList.add("d-none")
        skip_guess_flag.classList.add("d-none")
        controller.classList.remove("pod-adventure-footer-inner")
        controller.classList.add("pod-adventure-footer-inner-green")
        well_done_img.classList.add("controllers-zoom-in")
        Not_true_img.classList.remove("controllers-zoom-in")
        startTimerLineCorrect()
      } else {
        dataForRepeat[gameChnager].guessFlag.push(data[gameChnager].guessFlag[questionChange]);
        if (dataForRepeat[gameChnager].guessFlag.length == 1) {
          dataForRepeat[gameChnager].modules.push(data[gameChnager]?.modules[i]);
        }

        well_done_img.classList.remove("controllers-zoom-in")
        Not_true_img.classList.add("controllers-zoom-in")
        document.querySelector(".select-child").classList.add("podcustomLableWimage-wrong")
        controller.classList.remove("pod-adventure-footer-inner")
        controller.classList.remove("pod-adventure-footer-inner-green")
        controller.classList.add("pod-adventure-footer-inner-red")
        check_Button.classList.add("d-none")
        skip_guess_flag.classList.add("d-none")
        Not_true.classList.remove("d-none")
        skip_guess_flag.classList.add("d-none")
        continue_guess_flag.classList.remove("d-none")
        startTimerLineInCorrect()
      }
      if (question_counter == data[gameChnager]?.guessFlag.length) {
        game_change.classList.remove('d-none')
        continue_guess_flag.classList.add("d-none")
      }
      guess_flag_details.classList.remove("d-none")
      greats_text.innerHTML=shuffledGreats[0]


    }
  }
}




var i = 0;
gameChanger(i)

continue_guess_flag.onclick = () => {
  // if (question_counter < data[gameChnager]?.guessCountry.length) {
  questionChange++
  question_counter++
  check_Button.classList.remove("d-none")
  check_Button.classList.add("pod-adventure-skip2-disabled")
  continue_guess_flag.classList.add("d-none")
  pod_adventure_footer.classList.remove("pod-incorrect-ans-footer")
  pod_adventure_footer.classList.remove("pod-correct-ans-footer")
  guess_flag_details.classList.add("d-none")
  Not_true.classList.add("d-none")
  skip_guess_flag.classList.remove("d-none")
  well_done.classList.add("d-none")
  controller.classList.add("pod-adventure-footer-inner")
  controller.classList.remove("pod-adventure-footer-inner-green")
  controller.classList.remove("pod-adventure-footer-inner-red")
  gameChanger(i)
  // }
}
game_change.onclick = () => {
  i++
  questionChange = 0
  question_counter = 1
  gameChanger(i)
  controller.classList.add("pod-adventure-footer-inner")
  controller.classList.remove("pod-adventure-footer-inner-green")
  controller.classList.remove("pod-adventure-footer-inner-red")
  skip_guess_flag.classList.remove("d-none")
  check_Button.classList.remove("d-none")
  check_Button.classList.add("pod-adventure-skip2-disabled")
  continue_guess_flag.classList.add("d-none")
  Not_true.classList.add("d-none")
  guess_flag_details.classList.add("d-none")
  well_done.classList.add("d-none")
  game_change.classList.add("d-none")
}


skip_guess_flag.onclick = () => {

  if (data[gameChnager]?.modules[i] == "guess country game") {
    dataForRepeat[gameChnager].guessCountry.push(data[gameChnager]?.guessCountry[questionChange]);
    if (dataForRepeat[gameChnager].guessCountry.length == 1) {
      dataForRepeat[gameChnager].modules.push(data[gameChnager]?.modules[i]);
    }
  } else if (data[gameChnager]?.modules[i] == "guess flag game") {
    dataForRepeat[gameChnager].guessFlag.push(data[gameChnager].guessFlag[questionChange]);
    if (dataForRepeat[gameChnager].guessFlag.length == 1) {
      dataForRepeat[gameChnager].modules.push(data[gameChnager]?.modules[i]);
    }
  } else if (data[gameChnager]?.modules[i] == "flag detective game") {
    dataForRepeat[gameChnager].flagDetective.push(data[gameChnager]?.flagDetective[questionChange]);
    if (dataForRepeat[gameChnager].flagDetective.length == 1) {
      dataForRepeat[gameChnager].modules.push(data[gameChnager]?.modules[i]);
    }
  }


  if (question_counter < (data[gameChnager].guessFlag.length || data[gameChnager].guessCountry.length || data[gameChnager].flagDetective.length)) {
    questionChange++
    question_counter++
    gameChanger(i)
  }
  else {
    i++
    questionChange = 0
    question_counter = 1
    gameChanger(i)
  }
}








function startTimerLineCorrect() {
  points = points + 11.1
  time_line.style.width = points + "%"; //increasing width of time_line with px by time value
  document.querySelector(".progess-flag").classList.remove("d-none")
  if (points == 55.5) {
    document.querySelector(".hello-baba").classList.remove("d-none")
    multiple_game.classList.add("d-none")
    document.getElementById("half-game-screen").innerHTML =
      `
    <div style="height:55vh" class="chr-screen">
    <div class="chr-png" >
    <img src="https://testpod-bucket.s3.amazonaws.com/pod-adventure/png.svg" />
    <div class="game-half-message">
    <img style="position: relative" src="https://testpod-bucket.s3.amazonaws.com/pod-adventure/message.svg" />
    <p class="half-image-text" >
    You are crushing it
    </p>
    </div>
    </div>
    <div class="chr-png-shadow">
    <img src="https://testpod-bucket.s3.amazonaws.com/pod-adventure/chr-shadow.svg" />
    </div>
    </div>
    `

   
    document.querySelector(".controller").classList.add("d-none")
    document.querySelector(".dublicate").classList.remove("d-none")

  }

  document.querySelector(".has-fi-fav").innerHTML =
  `
<div class="favorite-selector fi-fav_selected fi-fav_got-selected">
                                    <svg class="fi-icon fi-icon_fill fi-fav fi-fav_filled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M0 0h24v24H0z" fill="none"/>
                            
                                    </svg>
                                    <svg class="fi-icon fi-icon_fill hi-fav_explosion" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <circle class="explosion" cx="12" cy="12" r="8"></circle>
                                        <circle class="particle particle-1" cx="20"                 cy="12"                 r=".75" style="fill:#58cc02;"></circle>
                                        <circle class="particle particle-2" cx="19.91846879578665"  cy="10.650420754361766" r=".5"  style="fill:#58cc02;"></circle>
                                        <circle class="particle particle-1" cx="16.972879746165315" cy="18.266615277019866" r=".75" style="fill:#58cc02;"></circle>
                                        <circle class="particle particle-2" cx="16.926943203175824" cy="18.54486444277137"  r=".5"  style="fill:#58cc02;"></circle>
                                        <circle class="particle particle-1" cx="10.182383242455304" cy="19.79078104702556"  r=".75" style="fill:#58cc02;"></circle>
                                        <circle class="particle particle-2" cx="10.486311661105013" cy="19.872096630662394" r=".5"  style="fill:#58cc02;"></circle>
                                        <circle class="particle particle-1" cx="4.76742286386351"   cy="15.419039041870638" r=".75" style="fill:#58cc02;"></circle>
                                        <circle class="particle particle-2" cx="5.634167923999488"  cy="14.000702054580593" r=".5"  style="fill:#58cc02;"></circle>
                                        <circle class="particle particle-1" cx="4.825932669326824"  cy="8.45983645364118"   r=".75" style="fill:#58cc02;"></circle>
                                        <circle class="particle particle-2" cx="4.833803538780229"  cy="9.494569493035156"  r=".5"  style="fill:#58cc02;"></circle>
                                        <circle class="particle particle-1" cx="10.313633604553763" cy="4.179759058679224"  r=".75" style="fill:#58cc02;"></circle>
                                        <circle class="particle particle-2" cx="10.80120673085787"  cy="4.270899612031962"  r=".5"  style="fill:#58cc02;"></circle>
                                        <circle class="particle particle-1" cx="17.077543007541077" cy="5.817884099552103"  r=".75" style="fill:#58cc02;"></circle>
                                        <circle class="particle particle-2" cx="17.270852881861437" cy="5.105744706123251"  r=".5"  style="fill:#58cc02;"></circle>
                                    </svg>
                                </div>
`

}


function startTimerLineEmpty() {
  points = 0;
  time_line.style.width = points + "%"; //increasing width of time_line with px by time value
  document.querySelector(".progess-flag").classList.add("d-none")
}


half_game_continue.onclick = () => {
  document.querySelector(".hello-baba").classList.add("d-none")
  multiple_game.classList.remove("d-none")
  document.querySelector(".controller").classList.remove("d-none")
  document.querySelector(".dublicate").classList.add("d-none")
  // questionChange++
  // question_counter++
  // gameChanger(i)
  // document.querySelector(".controller").classList.remove("d-none")
  // document.querySelector(".dublicate").classList.add("d-none")
  // document.querySelector(".chr-screen").remove(".d-none")
  // half_game_continue.classList.add("d-none")
}

function startTimerLineInCorrect() {
  points = points - 11.1
  if (points <= 0) {
    points = 0
    document.querySelector(".progess-flag").classList.add("d-none")
  }
  time_line.style.width = points + "%"; //increasing width of time_line with px by time value
}



const defaults = {
  disableForReducedMotion: true
};

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(200 * particleRatio)
    })
  );
}

function confettiExplosion(origin) {
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    origin
  });
  fire(0.2, {
    spread: 60,
    origin
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    origin
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    origin
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    origin
  });
}


