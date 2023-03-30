const add_new_form = document.querySelector(".show-form")
var get = document.querySelector("#addNewForm")
var set = document.getElementById("setNewForm")




var imgCounter = 1;
add_new_form.onclick = () => {
  const clone = get.cloneNode(true)
  clone.childNodes[1].childNodes[1].childNodes[1].setAttribute('name', `questionImg${imgCounter}`) 
  set.appendChild(clone);
  imgCounter++;
}