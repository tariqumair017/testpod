// function checkValue() {
//   var data = document.getElementsByName("exampleRadios");
//   let userAns = "";
//   for (let i = 0; i < data.length; i++) {
//     if (data[i].checked) {
//       userAns += data[i].value;
//     }
//   }
//   console.log(userAns, "userAns");
// }

// function showQuestionsText() {
//   const question_text = document.querySelector(".all-quiz-left-part");
//   const question_options_text = document.querySelector(".ooooo");
//   console.log(question_options_text, "question_options_text");
//   let question_tag = "";
//   let question_options = "";
//   for (let i = 0; i < allQuestipons.length; i++) {
//     question_tag +=
//       '<div class="questions-text"><h5> ' +
//       allQuestipons[i].numer +
//       ". " +
//       allQuestipons[i].question +
//       "</h5></div>";
//       question_options += '<div class="form-check" ><input type="radio" name="answer" id="a" class="answer"> <label for="a" id="a_text">'+ allQuestipons[i].question +'</label></div';
//     for (let j = 0; j < allQuestipons[i].options.length; j++) {
//       question_options += allQuestipons[i].options[j].name + "br";
//       '<div> <div><input class="form-check-input" type="radio" name="exampleRadios" id=exampleRadios'
//       " value=option"
//       '/><label class="form-check-label" style="margin-left: 20px" for=exampleRadios'
//       ">" +
//       allQuestipons[i].options[j] +
//       "</label></div></div>";
//     }
//   }

//   question_text.innerHTML = question_tag;
//   question_options_text.innerHTML = question_options;
// }
// showQuestionsText();

let correct = [1, 1, 1, 1, 1];

let option_text = [];

let wrong = 0;

document.getElementById("total-questions").innerHTML = "0" + correct.length;
document.getElementById("total-score").innerHTML = "00";

function showAns(numer, selectedOptions) {
  option_text[numer] = selectedOptions;

  id = "p" + numer;

  labels = document.getElementById(id).childNodes;

  labels[1].style.backgroundColor = "white";
  labels[3].style.backgroundColor = "white";
  labels[5].style.backgroundColor = "white";
  labels[7].style.backgroundColor = "white";

  selectedOptions.parentNode.style.backgroundColor = "#EBEFF5";
}
const showDiscription = document.querySelectorAll("#all-quiz-discription");
const all_quiz_allradio_option = document.querySelector(".questions-box")

function checkResult() {
  wrong = 0;
  for (let i = 0; i < correct.length; i++) {
    if (correct[i] == option_text[i + 1].value) {
      wrong++;
      option_text[i + 1].parentNode.style.backgroundColor = "#4dea8e";
    }
     else {
      option_text[i + 1].parentNode.style.backgroundColor = "red";
    }
    showDiscription[i].classList.add("all-quiz-show-discription");
  }
  all_quiz_allradio_option.classList.add("disable")
  document.getElementById("total-score").innerHTML = "0" + wrong;

}
