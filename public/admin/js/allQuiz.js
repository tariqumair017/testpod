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


  const edit_test = document.querySelector(".test-edit")
console.log(edit_test,"edit_test")
  edit_test.onclick=()=>{
    document.querySelector(".edit-test").classList.toggle("active")
    document.querySelector(".test-name").classList.toggle("active")
    document.querySelector(".test-edit").classList.toggle("active")

  }