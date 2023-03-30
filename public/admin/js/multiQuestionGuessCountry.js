const add_new_form = document.querySelector(".show-form")
var get = document.querySelector("#addNewForm")
var set = document.getElementById("setNewForm")




add_new_form.onclick = async () => { 
  const clone = get.cloneNode(true) 
  console.log(clone,"cloneeeeeeeeeeee")
  set.appendChild(clone);

}