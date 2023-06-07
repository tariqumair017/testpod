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
          document.getElementById("regionID").innerHTML += _html;
        })
        .catch(err => console.error('error:' + err));
 

document.getElementById("regionID").addEventListener("change", async (event) => {
  region_input = event.target.value;
  const response = await fetch(`/admin/flag-data-api/country/${event.target.value}`);
  const data = await response.json();
    var _html = '';
    document.getElementById("countryID").innerHTML = `<option hidden>Please Select Country</option>`;
    data.forEach(element => {
      _html += `<option value="${element.country}">${element.country}</option>`;
    });     

    document.getElementById("countryID").innerHTML += _html; 
    for (let i = 1; i <= Counter; i++) {
      document.getElementById(`countryID${i}`).innerHTML = `<option hidden>Please Select Country</option>`;
      document.getElementById(`countryID${i}`).innerHTML += _html; 
    }
 
});

add_new_form.onclick = async () => { 
  Counter++;
  const clone = get.cloneNode(true)  
  clone.childNodes[1].childNodes[1].childNodes[1].childNodes[3].setAttribute('id', `countryID${Counter}`);
  clone.childNodes[1].childNodes[1].childNodes[3].childNodes[3].setAttribute('id', `flagUrl${Counter}`);
  clone.childNodes[1].childNodes[5].childNodes[1].childNodes[3].setAttribute('id', `correctID${Counter}`);
  set.appendChild(clone); 
  
  if(region_input != '')
  {
    const response = await fetch(`/admin/flag-data-api/country/${region_input}`);
    const data = await response.json();
      var _html = '';
      document.getElementById(`countryID${Counter}`).innerHTML = `<option hidden>Please Select Country</option>`;
      data.forEach(element => {
        _html += `<option value="${element.country}">${element.country}</option>`;
      });     
      document.getElementById(`countryID${Counter}`).innerHTML += _html; 
  }
}


document.getElementById("countryID").addEventListener("change", async (event) => {   
  const response = await fetch(`/admin/flag-data-api/country-for-flag/${event.target.value}`);
  const data = await response.json();
  document.getElementById("flagUrl").value = data.flag;   
  document.getElementById("correctID").value = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1); 
});


async function selectedCountryHere(element)
  {
    let id = element.getAttribute("id");
    console.log(id);
    var num = id.match(/(\d+)/)[0]; 
    const countryName = document.getElementById(id).value; 
    
    const response = await fetch(`/admin/flag-data-api/country-for-flag/${countryName}`);
    const data = await response.json();
    document.getElementById(`flagUrl${num}`).value = data.flag;   
    document.getElementById(`correctID${num}`).value = countryName.charAt(0).toUpperCase() + countryName.slice(1); 
  }