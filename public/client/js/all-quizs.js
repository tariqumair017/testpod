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

  labels[1].children[0].children[0].style.backgroundColor = "white";
  labels[1].children[0].children[1].style.backgroundColor = "white";
  labels[1].children[0].children[2].style.backgroundColor = "white";
  labels[1].children[0].children[3].style.backgroundColor = "white";

  selectedOptions.parentNode.style.backgroundColor = "#EBEFF5"; 


  const getData = await fetch(`/quiz-list/${id}`)
  .then((response) => response.json())
  .then((data) => data);  

  var farzi = --numer;
    if (getData.questions[farzi].correct.toLowerCase().replaceAll(/\s/g, "") == selectedOptions.value.toLowerCase().replaceAll(/\s/g, "") && previousAttempte != numer) 
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

const option_list = document.querySelectorAll(".option-list")

console.log(option_list[0].children[0].querySelector("input"),"option_list")



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
        for (let i = 0; i < option_list[j].children.length; i++) {
          if(option_list[j].children[i].textContent.toLocaleLowerCase().replaceAll(/\s/g, "") == getData.questions[j].correct.toLowerCase().replaceAll(/\s/g, "")){
            option_list[j].children[i].querySelector("input").classList.add("option-corrent")
            option_list[j].children[i].querySelector("h6").classList.add("correct-quiz")
          }
          
        }
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
    location='#firstQuizQuestion'
  }
}



async function storeResultForQuiz(id) {    
  var obj = {correct: optionSeletCorrect, incorrect: optionSeletWrong, attempted: attempetedQuestions};
  const response = await fetch(`/quiz-result/${id}`, {
    method: 'POST',
    body: JSON.stringify({objToStore: obj}),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  }); 
}