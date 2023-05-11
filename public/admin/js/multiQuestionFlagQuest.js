const add_new_form = document.querySelector(".show-form")
var get = document.querySelector("#addNewForm")
var set = document.getElementById("setNewForm")
var region_input = '';
var Counter = 0;


fetch('/admin/flag-quest-game/all-flags-data')
        .then(res => res.json())
        .then((json) => {   
            var _html = '';
            json.forEach(element => {
              _html += `<option value="${element}">${element}</option>`;
            });     
          document.getElementById("flagQuestRegionID").innerHTML += _html;
        })
        .catch(err => console.error('error:' + err));


  document.getElementById("flagQuestRegionID").addEventListener("change", async (event) => {
      region_input = event.target.value;
      const response = await fetch(`/admin/flag-quest-game/all-flags-data/country/${event.target.value}`);
      const data = await response.json(); 
        var _html = '';
        document.getElementById("allCountries").innerHTML = `<option hidden>Please Select Country</option>`;
        data.forEach(element => {
          _html += `<option value="${element.country}">${element.country}</option>`;
        });      
        document.getElementById("allCountries").innerHTML += _html; 
        for (let i = 1; i <= Counter; i++) {
          document.getElementById(`allCountries${i}`).innerHTML = `<option hidden>Please Select Country</option>`;
          document.getElementById(`allCountries${i}`).innerHTML += _html; 
        } 
  });

 
add_new_form.onclick = async () => { 
  Counter++;
  const clone = get.cloneNode(true) 
  clone.childNodes[1].childNodes[1].childNodes[3].setAttribute('id', `allCountries${Counter}`); 
  clone.childNodes[1].childNodes[3].childNodes[1].setAttribute('id', `Icountry${Counter}`);
  clone.childNodes[1].childNodes[5].childNodes[3].childNodes[1].setAttribute('id', `flagUrl${Counter}`);
  clone.childNodes[1].childNodes[7].childNodes[3].childNodes[1].setAttribute('name', `IcorrectImg[${Counter}]`);
  clone.childNodes[1].childNodes[9].childNodes[3].childNodes[1].setAttribute('name', `IcorrectImg[${Counter}]`);
  clone.childNodes[1].childNodes[11].childNodes[3].childNodes[1].setAttribute('name', `IcorrectImg[${Counter}]`);
  set.appendChild(clone);
  
  if(region_input != '')
  {
    const allCountries = await fetch(`/admin/flag-quest-game/all-flags-data/country/${region_input}`);
    const data = await allCountries.json(); 
    var _html = '';
    document.getElementById(`allCountries${Counter}`).innerHTML = `<option hidden>Please Select Country</option>`;
    for (const key in data) { 
        _html += `<option value="${data[key].country}">${data[key].country}</option>`; 
    } 
    document.getElementById(`allCountries${Counter}`).innerHTML += _html;
  }
}


  document.getElementById("allCountries").addEventListener("change", async (event) => {   
  const response = await fetch(`/admin/flag-quest-game/all-flags-data/country-for-flag/${event.target.value}`);
  const data = await response.json(); 
  document.getElementById("flagUrl").value = data.flag;   

  const shuffledCountry = shuffleStr(event.target.value); 
  document.getElementById(`Icountry`).value = shuffledCountry; 
});


async function selectedCountry(e)
    {  
      const id = e.getAttribute("id");
      const countryName = document.getElementById(id).value;
      const shuffledCountry = shuffleStr(countryName); 
      const num = id.match(/(\d+)/)[0];
      document.getElementById(`Icountry${num}`).value = shuffledCountry; 
    
      const response = await fetch(`/admin/flag-quest-game/all-flags-data/country-for-flag/${countryName}`);
      const data = await response.json();
      document.getElementById(`flagUrl${num}`).value = data.flag;   
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