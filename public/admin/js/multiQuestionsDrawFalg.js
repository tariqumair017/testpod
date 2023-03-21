const add_new_form = document.querySelector(".show-form")
var get = document.querySelector("#addNewForm")
var set = document.getElementById("setNewForm")




let count = 0;
add_new_form.onclick = () => {
  const clone = get.cloneNode(true)
  count++
  clone.childNodes[1].childNodes[1].childNodes[1].setAttribute("id",`countryIDAdd${count}`)
  clone.childNodes[1].childNodes[3].childNodes[1].setAttribute("id",`flagUrlAdd${count}`)
  clone.childNodes[1].childNodes[5].childNodes[1].setAttribute("id",`flagDetailsAdd${count}`)
  clone.childNodes[1].childNodes[7].childNodes[1].setAttribute("id",`shapeImgAdd${count}`)
  clone.childNodes[1].childNodes[9].childNodes[1].setAttribute("id",`correctColorsAdd${count}`)
  clone.childNodes[1].childNodes[11].childNodes[1].setAttribute("id",`arrangementAdd${count}`)
  set.appendChild(clone);
}