(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()



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