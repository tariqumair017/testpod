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

var option_text = [];
var wrong = 0;
var correct = 0;

var optionSeletWrong = 0;
var optionSeletCorrect = 0;
var attempetedQuestions =  0;
var previousAttempte;

// document.getElementById("total-questions").innerHTML = "0" + correct.length;
// document.getElementById("total-score").innerHTML = "00";

async function showAns(numer, selectedOptions, id) {  
  if(previousAttempte != numer)
  {
    attempetedQuestions++;
  }
  previousAttempte = numer; 

  option_text[numer] = selectedOptions; 

  id1 = "p" + numer;

  labels = document.getElementById(id1).childNodes;

  labels[1].style.backgroundColor = "white";
  labels[3].style.backgroundColor = "white";
  labels[5].style.backgroundColor = "white";
  labels[7].style.backgroundColor = "white";

  selectedOptions.parentNode.style.backgroundColor = "#EBEFF5"; 


  const getData = await fetch(`/quiz-list/${id}`)
  .then((response) => response.json())
  .then((data) => data);  

  var farzi = --numer;
    if (getData.questions[farzi].correct.toLowerCase().replaceAll(/\s/g, "") == selectedOptions.value.toLowerCase().replaceAll(/\s/g, "")) 
    {
      optionSeletCorrect++; 
    }
    else
    {
      optionSeletWrong++;
    }      
  
  await storeResultForQuiz(id);
}

const showDiscription = document.querySelectorAll("#all-quiz-discription");
const all_quiz_allradio_option = document.querySelector(".questions-box");

 

async function checkResult(id) {
  const getData = await fetch(`/quiz-list/${id}`)
  .then((response) => response.json())
  .then((data) => data); 

  var filtered = option_text.filter(elm => elm);
    if(filtered.length == getData.questions.length)
  {
    for (let j = 0; j < getData.questions.length; j++) {  
      if (getData.questions[j].correct.toLowerCase().replaceAll(/\s/g, "") == filtered[j].value.toLowerCase().replaceAll(/\s/g, "")) {
        correct++;
        filtered[j].parentNode.querySelector("h6").classList.add("correct-quiz");
        filtered[j].parentNode.querySelector("input").classList.add("option-corrent");
        
      } else {
        wrong++;
        filtered[j].parentNode.querySelector("h6").classList.add("incorrect-quiz");
        filtered[j].parentNode.querySelector("input").classList.add("option-incorrent");
  
      }
     
      showDiscription[j] && showDiscription[j].classList.add("all-quiz-show-discription");
      
    }   
    if (correct < 10) {
      document.getElementById("total-correct").innerHTML = "0" + correct;
    } else {
      document.getElementById("total-correct").innerHTML = correct;
    }
    if (wrong < 10) {
      document.getElementById("total-in-correct").innerHTML = "0" + wrong;
    } else {
      document.getElementById("total-in-correct").innerHTML = wrong;
    }
    all_quiz_allradio_option.classList.add("disable");
  }
}


async function storeResultForQuiz(id) {    
  var obj = {correct: optionSeletCorrect, incorrect: optionSeletWrong, attempted: attempetedQuestions};
  console.log(obj); 
  const response = await fetch(`/quiz-result/${id}`, {
    method: 'POST',
    body: JSON.stringify({objToStore: obj}),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  }); 
  console.log(response);
}