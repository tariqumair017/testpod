const questionSpeech = speechSynthesis;

const detailSpeechClose = speechSynthesis;

window.load = startQuiz();

function startQuiz() {
  cancelSpeech();
  cancelDetailSpeech();
}

function cancelSpeech() {
  questionSpeech.cancel();
}

function cancelDetailSpeech() {
  detailSpeechClose.cancel();
}
