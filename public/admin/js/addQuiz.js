
function clearImage() {
  let array= document.getElementsByClassName('formFile')
  for (let i = 0; i < array.length; i++) {
    array[i].value = null
  }
}

var uploadField = document.querySelector(".add-quiz-image");

var stateuploadfile = document.querySelector(".add-quiz-state-image")

stateuploadfile.children[0].onchange = function () {
  if (this.files[0].size > 100000) {
    alert("State image is too big!");
    this.value = "";
  };
};

uploadField.children[0].onchange = function () {
    if (this.files[0].size > 10000) {
    alert("Quiz image is too big!");
    this.value = "";
  };
};