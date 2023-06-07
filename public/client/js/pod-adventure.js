const skip_guess_flag = document.querySelector(".skip-guess-flag")
const check_Button = document.querySelector(".check-guess-flag")
const continue_guess_flag = document.querySelector(".continue-guess-flag")
const pod_adventure_footer = document.querySelector('.pod-adventure-footer')
const cross_guess_flag = document.querySelector('.cross-guess-flag')
const right_guess_flag = document.querySelector(".right-guess-flag")
const guess_flag_details = document.getElementById("guess-flag-details")
const mypopover_content = document.getElementById("mypopover-content")
const continue_button = document.querySelector(".button-19")
const well_done = document.querySelector(".well_done")
const Not_true = document.querySelector(".Not_true")
const time_line = document.querySelector(".time_line");
const time_line_inner = document.querySelector(".time_line_inner");


const multiple_game = document.getElementById("Multiple-game")



var popover = new bootstrap.Popover(document.querySelector('.example-popover'), {
  container: 'body',
  html: true,
  trigger: 'hover',
  delay: { show: 0, hide: 100 },
  content: document.getElementById('mypopover-content'),
})

const gameChnager = 0
const questionChange = 0
let total_inputs = [];
let counterLine;

function game(i) {
  if (data[gameChnager]?.modules[i] == "flag detective game") {
    multiple_game.innerHTML = `<div >
    <h2 class="score-text-slide-top text-center pb-4" style="margin: 0%">Which Country Is This?</h2>
    <div class="pod-adventure-game-detective-image pb-4">
    <span style="border-radius:7px;width:fit-content;height:250px;display:flex;justify-content:center;margin-right:5px; border: 2px solid #f9f9f9;padding:10px"><img class="border" src=${data[0]?.flagDetective[questionChange].flagUrl}
    alt="img"></span>
    </div>
    <div class="siblings-input"></div>
    </div>`;
    const siblings_input = document.querySelector(".siblings-input");
    for (let i = 0; i < data[0].flagDetective[questionChange].country.split("").length; i++) {
      siblings_input.innerHTML +=
        '<input class="current-input" maxlength="1"  />' || ` <div class="loading-skeleton-inputs"></div>`;
    }

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
            for (let i = 0; i < total_inputs.length; i++) {
              total_inputs[i].classList.add("disabled")
            }
          }
        });
      });
    }
    showNextInputs();
  }



  else if (data[gameChnager]?.modules[i] == "flag quest game") {

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
    </div>
    `


  }


  else if (data[gameChnager]?.modules[i] == "guess country game") {

    multiple_game.innerHTML =
      `
    <div class="align-items-center">
      <h2 class="score-text-slide-top text-center" style="margin: 0%">Which Flag Is "${data[gameChnager]?.guessCountry[questionChange]?.country}" ?</h2>
      <div class="quiz-image">
        <div class="que_text" style="display: flex;justify-content: center;">
          <span class="flag-icon-background" style="border-radius:7px;width:100%;height:250px;display:flex;justify-content:center;margin-right:5px; border: 2px solid #f9f9f9;padding:10px"><img class="border" src="${data[0]?.guessCountry[questionChange]?.flag}" alt="img"></span>
        </div>
      </div>
      <div style="margin-top: 10px">
        <div class="pod-adventure-option_list">
          <div class="pod-adventure-customLable wow animate__fadeInUp" style="padding-left:0px" data-wow-delay="0.1s"><strong>A</strong>
            ${data[gameChnager]?.guessCountry[questionChange]?.optionA}
          </div>
          <div class="pod-adventure-customLable wow animate__fadeInUp" style="padding-left:0px" data-wow-delay="0.2s"><strong>B</strong>
            ${data[gameChnager]?.guessCountry[questionChange]?.optionB}
          </div>
        </div>                
      </div>
    </div>
    `

    multiple_game.querySelectorAll(".pod-adventure-customLable")[0].onclick = () => {
      multiple_game.querySelectorAll(".pod-adventure-customLable")[0].classList.add("pod-adventure-customLable-avtive")
      multiple_game.querySelectorAll(".pod-adventure-customLable")[1].classList.remove("pod-adventure-customLable-avtive")
      multiple_game.querySelectorAll(".pod-adventure-customLable")[0].setAttribute("select", `${data[gameChnager]?.guessCountry[questionChange]?.optionA}`)
      multiple_game.querySelectorAll(".pod-adventure-customLable")[1].removeAttribute("select")

      check_Button.classList.remove("button-18-disabled")
      check_Button.classList.add("button-18")
    }
    multiple_game.querySelectorAll(".pod-adventure-customLable")[1].onclick = () => {
      multiple_game.querySelectorAll(".pod-adventure-customLable")[0].classList.remove("pod-adventure-customLable-avtive")
      multiple_game.querySelectorAll(".pod-adventure-customLable")[1].classList.add("pod-adventure-customLable-avtive")
      multiple_game.querySelectorAll(".pod-adventure-customLable")[1].setAttribute("select", `${data[gameChnager]?.guessCountry[questionChange]?.optionB}`)
      multiple_game.querySelectorAll(".pod-adventure-customLable")[0].removeAttribute("select")

      check_Button.classList.remove("button-18-disabled")
      check_Button.classList.add("button-18")
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
        pod_adventure_footer.classList.add("pod-correct-ans-footer")
        continue_guess_flag.classList.remove("d-none")
        continue_guess_flag.classList.add("button-18")
        right_guess_flag.classList.remove("d-none")
        well_done.classList.remove("d-none")
        startTimerLineCorrect(10)
      } else {
        skip_guess_flag.classList.add("d-none")
        cross_guess_flag.classList.remove("d-none")
        pod_adventure_footer.classList.add("pod-incorrect-ans-footer")
        check_Button.classList.add("d-none")
        continue_guess_flag.classList.remove("d-none")
        guess_flag_details.classList.remove("d-none")
        Not_true.classList.remove("d-none")
      }
    }


  }



  else if (data[gameChnager]?.modules[i] == "guess flag game") {
    multiple_game.innerHTML =
      `
    <div class="text-center mb-4 questions-name wow animate__fadeInUp" data-wow-delay="0.1s">
    <span style="font-size: 30px;font-weight: bold;color: back">
        Can you guess flag of "${data[gameChnager].guessFlag[questionChange].country}"
    </span>
  </div>
  <div class="pod-adventure">
        <div style="width: 100%;display: flex;justify-content: space-around;">
            <div class="pod-adventure-guess-option-left">
                <input class="customRadio" ans="correct" type="radio" name=q1 id="1"/>
                <label class="customLableWimage" for="1" style="width:100%;height:250px;">
                <img class="guess-flag-image" style="height:240px;padding:10px"src=${data[gameChnager].guessFlag[questionChange].correctImg} alt=""/>
                </label>
            </div>
  
            <div class="pod-adventure-guess-option-right" >
                <div class="pod-adventure-guess-option-right">
                    <input class="customRadio"  type="radio" name=q1 id="2"/>
                    <label class="customLableWimage" for="2" style="width:100%;height:250px;">
                        <img class="guess-flag-image" style="height:240px;padding:10px" src=${data[gameChnager].guessFlag[questionChange].IcorrectImg} alt=""/>
                      </label>
                </div>
            </div>
        </div>
  </div>
    `
  }
}

var i = 0;
game(i)

continue_button.onclick = () => {
  
  i++
  game(i)
}






skip_guess_flag.onclick = () => {
  skip_guess_flag.classList.add("d-none")
  cross_guess_flag.classList.remove("d-none")
  pod_adventure_footer.classList.add("pod-incorrect-ans-footer")

  check_Button.classList.add("d-none")
  continue_guess_flag.classList.remove("d-none")
  guess_flag_details.classList.remove("d-none")
  Not_true.classList.remove("d-none")

}









function startTimerLineCorrect(points) {
    time_line.style.width = points + "%"; //increasing width of time_line with px by time value
    time_line_inner.style.width = 78 + "%"

}


function startTimerLineInCorrect(points) {
  time_line.style.width = points + "%"; //increasing width of time_line with px by time value

}