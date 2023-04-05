const add_new_form = document.querySelector(".show-form")
var get = document.querySelector("#addNewForm")
var set = document.getElementById("setNewForm")




var imgCounter = 1;
add_new_form.onclick = async () => {
  const clone = get.cloneNode(true) 
  clone.childNodes[1].childNodes[1].childNodes[3].setAttribute('id', `flagName${imgCounter}`) 
  set.appendChild(clone);

  const allCountries = await fetch('/admin/flag-detective-game/game-management/create-flag-detective-game/allCountries/detectiveGame');
  const data = await allCountries.json();
      var _html = '';
      for (const key in data) { 
          _html += `<option hidden>Please Select Counrty</option><option value="${data[key].country.toLowerCase()}">${data[key].country}</option>`; 
      } 
      document.getElementById(`flagName${imgCounter}`).innerHTML = _html;

  imgCounter++;
}



fetch('/admin/flag-detective-game/game-management/create-flag-detective-game/allCountries/detectiveGame')
        .then(res => res.json())
        .then((json) => {
            var _html = '';
            for (const key in json) { 
                _html += `<option hidden>Please Select Counrty</option><option value="${json[key].country.toLowerCase()}">${json[key].country}</option>`; 
            }
            document.getElementById("flagName0").innerHTML = _html;
        })
        .catch(err => console.error('error:' + err));