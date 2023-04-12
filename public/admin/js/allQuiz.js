
  const edit_test = document.querySelector(".test-edit")
  
  edit_test.onclick=()=>{
    document.querySelector(".edit-test").classList.toggle("active")
    document.querySelector(".test-name").classList.toggle("active")
    document.querySelector(".test-edit").classList.toggle("active") 
  }