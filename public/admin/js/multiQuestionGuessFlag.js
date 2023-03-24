const add_new_form = document.querySelector(".show-form")
var get = document.querySelector("#addNewForm")
var set = document.getElementById("setNewForm")




var imgCounter = 1;
add_new_form.onclick = async () => { 
  const clone = get.cloneNode(true) 
  clone.childNodes[1].childNodes[1].childNodes[1].setAttribute('id', `allCountries${imgCounter}`)
  clone.childNodes[1].childNodes[1].childNodes[1].setAttribute('onchange', `selectedCountry(this)`)
  clone.childNodes[1].childNodes[3].childNodes[1].setAttribute('id', `Icountry${imgCounter}`)
  set.appendChild(clone);

  const allCountries = await fetch('/game-management/create-guess-flag-game/allCountries');
  const data = await allCountries.json();
      var _html = '';
      for (const key in data) { 
          _html += `<option hidden>Please Select Counrty</option><option value="${data[key].country.toLowerCase()}">${data[key].country}</option>`; 
      } 
      document.getElementById(`allCountries${imgCounter}`).innerHTML = _html;

  imgCounter++;
}


fetch('/game-management/create-guess-flag-game/allCountries')
        .then(res => res.json())
        .then((json) => {
            var _html = '';
            for (const key in json) { 
                _html += `<option hidden>Please Select Counrty</option><option value="${json[key].country.toLowerCase()}">${json[key].country}</option>`; 
            }
            document.getElementById("allCountries0").innerHTML = _html;
        })
        .catch(err => console.error('error:' + err));

    function selectedCountry(e)
    { 
      const id = e.getAttribute("id")
      const shuffledCountry = shuffleStr(document.getElementById(id).value); 
      const num = id.match(/(\d+)/)[0];
      document.getElementById(`Icountry${num}`).value = shuffledCountry;
    }


    //Shuffle String Character Function
    function shuffleStr(s) { 
    let arr = s.split(''), arr_len = arr.length; 
    while (arr_len) {
      let rnd = Math.floor(Math.random() * arr_len--);
      [arr[arr_len], arr[rnd]] = [arr[rnd] , arr[arr_len]];
    } 
    let str = arr.join('');
    return str;
  }
