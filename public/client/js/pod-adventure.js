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
dataForRepeat[0] = {};
dataForRepeat[0].modules = [];
dataForRepeat[0].guessCountry = [];
dataForRepeat[0].guessFlag = [];   
dataForRepeat[0].flagDetective = [];
let pod_adventure_guess_country = 1
let counterLine;
let question_counter = 1

let points = 0
let repeat = 0;

function gameChanger(num) {
  
  if(num == data[gameChnager].modules.length)
  {  
    repeat++;
    if(repeat == 1){
      data = JSON.parse(JSON.stringify(dataForRepeat)); 
      i = 0;
      num = 0;
    } else {
      return;
    }
  }
  
  if (data[gameChnager]?.modules[num] == "flag detective game") {
      multiple_game.innerHTML = `<div >
      <h2 class="score-text-slide-top text-center pb-4" style="margin: 0%">Which Country Is This?</h2>
      <div class="pod-adventure-game-detective-image pb-4">
      <span style="border-radius:7px;width:fit-content;height:250px;display:flex;justify-content:center;margin-right:5px; border: 2px solid #f9f9f9;padding:10px"><img class="border" src=${data[gameChnager]?.flagDetective[questionChange].flagUrl}
      alt="img"></span>
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
              // for (let i = 0; i < total_inputs.length; i++) {
              //   total_inputs[i].classList.add("disabled")
              // }
            }
            check_Button.onclick = () => { 
              if (baba.replace(/\s/g, '').toLowerCase() == data[gameChnager]?.flagDetective[questionChange].country.replace(/\s/g, '').toLowerCase()) {
                continue_guess_flag.classList.remove("d-none")
                well_done.classList.remove("d-none")
                check_Button.classList.add("d-none")
                skip_guess_flag.classList.add("d-none")
                controller.classList.remove("pod-adventure-footer-inner")
                controller.classList.add("pod-adventure-footer-inner-green")
                startTimerLineCorrect()
              } else {
                dataForRepeat[0].flagDetective.push(data[gameChnager]?.flagDetective[questionChange]);
                if(dataForRepeat[0].flagDetective.length == 1)
                {
                  dataForRepeat[0].modules.push(data[gameChnager]?.modules[i]);
                }

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

              if (question_counter == data[gameChnager]?.flagDetective.length) { 
                game_change.classList.remove('d-none')
                continue_guess_flag.classList.add("d-none")
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
        <div class="que_text" style="display: flex;justify-content: center;">
          <span class="flag-icon-background" style="border-radius:7px;width:100%;height:250px;display:flex;justify-content:center;margin-right:5px; border: 2px solid #f9f9f9;padding:10px"><img class="border" src="${data[0]?.guessCountry[questionChange]?.flag}" alt="img"></span>
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
        startTimerLineCorrect()
      } else {
        dataForRepeat[0].guessCountry.push(data[gameChnager]?.guessCountry[questionChange]);
        if(dataForRepeat[0].guessCountry.length == 1)
        {
          dataForRepeat[0].modules.push(data[gameChnager]?.modules[i]); 
        } 
        
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
              </div>
    
              <div class="pod-adventure-guess-option-right" >
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
          startTimerLineCorrect()
        } else {  
          dataForRepeat[0].guessFlag.push(data[gameChnager].guessFlag[questionChange]);
          if(dataForRepeat[0].guessFlag.length == 1)
          {
            dataForRepeat[0].modules.push(data[gameChnager]?.modules[i]); 
          }

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
  well_done.classList.add("d-none")
  game_change.classList.add("d-none")
}


skip_guess_flag.onclick = () => { 
  
  if(data[gameChnager]?.modules[i] == "guess country game") { 
    dataForRepeat[0].guessCountry.push(data[gameChnager]?.guessCountry[questionChange]); 
    if(dataForRepeat[0].guessCountry.length == 1) {
      dataForRepeat[0].modules.push(data[gameChnager]?.modules[i]);
    }  
  } else if (data[gameChnager]?.modules[i] == "guess flag game") {
    dataForRepeat[0].guessFlag.push(data[gameChnager].guessFlag[questionChange]); 
    if(dataForRepeat[0].guessFlag.length == 1) {
      dataForRepeat[0].modules.push(data[gameChnager]?.modules[i]); 
    }
  } else if (data[gameChnager]?.modules[i] == "flag detective game") {
    dataForRepeat[0].flagDetective.push(data[gameChnager]?.flagDetective[questionChange]); 
    if(dataForRepeat[0].flagDetective.length == 1) {
      dataForRepeat[0].modules.push(data[gameChnager]?.modules[i]);
    } 
  }   


  if(question_counter < (data[gameChnager].guessFlag.length || data[gameChnager].guessCountry.length || data[gameChnager].flagDetective.length)){
  questionChange++
  question_counter++
  gameChanger(i)
}
else{ 
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
    <img src="/client/img/png/png.svg" />
    <div class="game-half-message">
    <img style="position: relative" src="/client/img/png/message.svg" />
    <p class="half-image-text" >
    You are crushing it
    </p>
    </div>
    </div>
    <div class="chr-png-shadow">
    <img src="/client/img/png/chr-shadow.svg" />
    </div>
    </div>
    `
    document.querySelector(".controller").classList.add("d-none")
    document.querySelector(".dublicate").classList.remove("d-none")

  }

}


half_game_continue.onclick = () => {
  console.log(half_game_continue)
  console.log("hello")
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