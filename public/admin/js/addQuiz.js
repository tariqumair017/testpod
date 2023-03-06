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

const add_new_form = document.querySelector(".show-form")
var get = document.querySelector("#addNewForm")
var set = document.getElementById("setNewForm")

add_new_form.onclick=()=>{
    const clone =get.cloneNode(true)
    set.appendChild(clone)
    }

    function clearImage() {
      document.getElementById('formFile').value = null;
  }

var uploadField = document.querySelector(".add-quiz-image");

var stateuploadfile = document.querySelector(".add-quiz-state-image")

stateuploadfile.children[0].onchange = function() {
  if(this.files[0].size > 15000){
     alert("State image is too big!");
     this.value = "";
  };
};

uploadField.children[0].onchange = function() {
    if(this.files[0].size > 10000){
       alert("Quiz image is too big!");
       this.value = "";
    };
};