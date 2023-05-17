const questionSpeech = speechSynthesis;

const detailSpeechClose = speechSynthesis;

// const copy_right_testpod = document.querySelector(".copy_right_testpod")

window.load = startQuiz();

function startQuiz() {
  cancelSpeech();
  cancelDetailSpeech();
}

// const d = new Date();
// let year = d.getFullYear();
// copy_right_testpod.innerHTML = `Copyright © ${year} Testpod. All rights reserved.`

function cancelSpeech() {
  questionSpeech.cancel();
}

function cancelDetailSpeech() {
  detailSpeechClose.cancel();
}

