const add_new_form = document.querySelector(".show-form")
var get = document.querySelector("#addNewForm")
var set = document.getElementById("setNewForm")
var region_input = '';
var Counter = 0;


fetch('/admin/flag-data-api/distinct-region')
        .then(res => res.json())
        .then((json) => {   
            var _html = '';
            json.forEach(element => {
              _html += `<option value="${element}">${element}</option>`;
            });     
          document.getElementById("flagDetectiveID").innerHTML += _html;
        })
        .catch(err => console.error('error:' + err));


document.getElementById("flagDetectiveID").addEventListener("change", async (event) => {
    region_input = event.target.value;
    const response = await fetch(`/admin/flag-data-api/country/${event.target.value}`);
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
  clone.childNodes[1].childNodes[3].childNodes[3].childNodes[1].setAttribute('id', `flagUrl${Counter}`);
  set.appendChild(clone); 

  if(region_input != '')
  {
    const allCountries = await fetch(`/admin/flag-data-api/country/${region_input}`);
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
    const response = await fetch(`/admin/flag-data-api/country-for-flag/${event.target.value}`);
    const data = await response.json(); 
    document.getElementById("flagUrl").value = data.flag;    
});

async function flagDetectiveSelectedCountry(e)
    { 
      const id = e.getAttribute("id");
      const countryName = document.getElementById(id).value; 
      const num = id.match(/(\d+)/)[0]; 
    
      const response = await fetch(`/admin/flag-data-api/country-for-flag/${countryName}`);
      const data = await response.json();
      document.getElementById(`flagUrl${num}`).value = data.flag;   
    }
