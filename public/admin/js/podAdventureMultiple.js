//=====================================
// Flag Data Api for All Regions
//=====================================

fetch("/admin/flag-data-api/distinct-region")
  .then((res) => res.json())
  .then((json) => {
    var _html = "";
    json.forEach((element) => {
      _html += `<option value="${element}">${element}</option>`;
    });
    document.getElementById("regionID").innerHTML += _html;
  })
  .catch((err) => console.error("error:" + err));


//=====================================
// Toggle Game Modules
//=====================================  
const moduleAppendDiv = document.getElementById("moduleAppendDiv");
document.getElementById("module").addEventListener("change", function (event) {
  if (event.target.value == "flag quest game") {
    var getNewFormForQuest = document.querySelector("#FormForFlagQuestGame"); 
    const clone = getNewFormForQuest.cloneNode(true); 
    moduleAppendDiv.innerHTML = '';
    moduleAppendDiv.appendChild(clone);

    document.getElementById("formButtonDiv").classList.remove("d-none");
    document.getElementById("regionDiv").classList.remove("d-none");

    document.getElementById("regionID").addEventListener("change", async (event) => {
    // region_input_flag_quest = event.target.value;
    const response = await fetch(`/admin/flag-data-api/country/${event.target.value}`);
    const data = await response.json();
    var _html = "";
    data.forEach((element) => {
      _html += `<option value="${element.country}">${element.country}</option>`;
    });

    document.getElementById(`allCountriesForQuest1`).innerHTML = `<option hidden>Please Select Country</option>`;
    document.getElementById(`allCountriesForQuest1`).innerHTML += _html;
    document.getElementById(`allCountriesForQuest2`).innerHTML = `<option hidden>Please Select Country</option>`;
    document.getElementById(`allCountriesForQuest2`).innerHTML += _html;
    document.getElementById(`allCountriesForQuest3`).innerHTML = `<option hidden>Please Select Country</option>`;
    document.getElementById(`allCountriesForQuest3`).innerHTML += _html; 
  });

  } else if (event.target.value == "guess country game") {
    var getNewFormForGuessCountry = document.querySelector("#FormForGuessCountryGame"); 
    const clone = getNewFormForGuessCountry.cloneNode(true);
    moduleAppendDiv.innerHTML = '';
    moduleAppendDiv.appendChild(clone);

    document.getElementById("formButtonDiv").classList.remove("d-none");
    document.getElementById("regionDiv").classList.remove("d-none");

    document.getElementById("regionID").addEventListener("change", async (event) => {
        // region_input_guess_country = event.target.value;
        const response = await fetch(`/admin/flag-data-api/country/${event.target.value}`);
        const data = await response.json();
        var _html = "";
        data.forEach((element) => {
        _html += `<option value="${element.country}">${element.country}</option>`;
        });

        document.getElementById(`countryIDForGuessCountry1`).innerHTML = `<option hidden>Please Select Country</option>`;
        document.getElementById(`countryIDForGuessCountry1`).innerHTML += _html;
        document.getElementById(`countryIDForGuessCountry2`).innerHTML = `<option hidden>Please Select Country</option>`;
        document.getElementById(`countryIDForGuessCountry2`).innerHTML += _html;
        document.getElementById(`countryIDForGuessCountry3`).innerHTML = `<option hidden>Please Select Country</option>`;
        document.getElementById(`countryIDForGuessCountry3`).innerHTML += _html; 
    });   
  } else if (event.target.value == "guess flag game") {
    var getNewFormForGuessFlagGame = document.querySelector("#FormForGuessFlagGame"); 
    const clone = getNewFormForGuessFlagGame.cloneNode(true);
    moduleAppendDiv.innerHTML = '';
    moduleAppendDiv.appendChild(clone);

    document.getElementById("formButtonDiv").classList.remove("d-none");
    document.getElementById("regionDiv").classList.remove("d-none");

    document.getElementById("regionID").addEventListener("change", async (event) => {
        // region_input_guess_country = event.target.value;
        const response = await fetch(`/admin/flag-data-api/country/${event.target.value}`);
        const data = await response.json();
        var _html = "";
        data.forEach((element) => {
        _html += `<option value="${element.country}">${element.country}</option>`;
        });

        document.getElementById(`allCountriesForGuessFlag1`).innerHTML = `<option hidden>Please Select Country</option>`;
        document.getElementById(`allCountriesForGuessFlag1`).innerHTML += _html;
        document.getElementById(`allCountriesForGuessFlag2`).innerHTML = `<option hidden>Please Select Country</option>`;
        document.getElementById(`allCountriesForGuessFlag2`).innerHTML += _html;
        document.getElementById(`allCountriesForGuessFlag3`).innerHTML = `<option hidden>Please Select Country</option>`;
        document.getElementById(`allCountriesForGuessFlag3`).innerHTML += _html; 
    });   
  } else if (event.target.value == "flag detective game") {
    var getNewFormForFlagDetectiveGame = document.querySelector("#FormForFlagDetectiveGame"); 
    const clone = getNewFormForFlagDetectiveGame.cloneNode(true);
    moduleAppendDiv.innerHTML = '';
    moduleAppendDiv.appendChild(clone);

    document.getElementById("formButtonDiv").classList.remove("d-none");
    document.getElementById("regionDiv").classList.remove("d-none");

    document.getElementById("regionID").addEventListener("change", async (event) => {
        // region_input_guess_country = event.target.value;
        const response = await fetch(`/admin/flag-data-api/country/${event.target.value}`);
        const data = await response.json();
        var _html = "";
        data.forEach((element) => {
        _html += `<option value="${element.country}">${element.country}</option>`;
        });

        document.getElementById(`allCountriesForDetective1`).innerHTML = `<option hidden>Please Select Country</option>`;
        document.getElementById(`allCountriesForDetective1`).innerHTML += _html;
        document.getElementById(`allCountriesForDetective2`).innerHTML = `<option hidden>Please Select Country</option>`;
        document.getElementById(`allCountriesForDetective2`).innerHTML += _html;
        document.getElementById(`allCountriesForDetective3`).innerHTML = `<option hidden>Please Select Country</option>`;
        document.getElementById(`allCountriesForDetective3`).innerHTML += _html; 
    });   
  } else if (event.target.value == "flag puzzle game") {
    var getNewFormForFlagPuzzleGame = document.querySelector("#FormForFlagPuzzleGame"); 
    const clone = getNewFormForFlagPuzzleGame.cloneNode(true);
    moduleAppendDiv.innerHTML = '';
    moduleAppendDiv.appendChild(clone);

    document.getElementById("formButtonDiv").classList.remove("d-none");
    document.getElementById("regionDiv").classList.remove("d-none");

    document.getElementById("regionID").addEventListener("change", async (event) => {
        // region_input_guess_country = event.target.value;
        const response = await fetch(`/admin/flag-data-api/country/${event.target.value}`);
        const data = await response.json();
        var _html = "";
        data.forEach((element) => {
        _html += `<option value="${element.country}">${element.country}</option>`;
        });

        document.getElementById(`allCountriesForFlagPuzzle1`).innerHTML = `<option hidden>Please Select Country</option>`;
        document.getElementById(`allCountriesForFlagPuzzle1`).innerHTML += _html;
        document.getElementById(`allCountriesForFlagPuzzle2`).innerHTML = `<option hidden>Please Select Country</option>`;
        document.getElementById(`allCountriesForFlagPuzzle2`).innerHTML += _html;
        document.getElementById(`allCountriesForFlagPuzzle3`).innerHTML = `<option hidden>Please Select Country</option>`;
        document.getElementById(`allCountriesForFlagPuzzle3`).innerHTML += _html; 
    });   
  }
});


//=====================================
// Flag Quest Game
//===================================== 
async function flagQuestselectedCountry(e) {
  const id = e.getAttribute("id");
  const countryName = document.getElementById(id).value;
  const shuffledCountry = shuffleStr(countryName);
  const num = id.match(/(\d+)/)[0];
  document.getElementById(`IcountryForQuest${num}`).value = shuffledCountry;

  const response = await fetch(`/admin/flag-data-api/country-for-flag/${countryName}`);
  const data = await response.json();
  document.getElementById(`flagUrlForQuest${num}`).value = data.flag;
}


// const add_new_form_for_quest = document.querySelector(".show-form-for-Quest");
// var region_input_flag_quest = "";
// var CounterFlagQuest = 1;

// document
//   .getElementById("regionID")
//   .addEventListener("change", async (event) => {
//     region_input_flag_quest = event.target.value;
//     const response = await fetch(
//       `/admin/pod-adventure/all-flags-data/country/${event.target.value}`
//     );
//     const data = await response.json();
//     var _html = "";
//     data.forEach((element) => {
//       _html += `<option value="${element.country}">${element.country}</option>`;
//     });

//     for (let i = 1; i <= CounterFlagQuest; i++) {
//       document.getElementById(
//         `allCountriesForQuest${i}`
//       ).innerHTML = `<option hidden>Please Select Country</option>`;
//       document.getElementById(`allCountriesForQuest${i}`).innerHTML += _html;
//     }
//   });

// if (add_new_form_for_quest) {
//   add_new_form_for_quest.onclick = async () => {
//     CounterFlagQuest++;
//     const clone = getNewFormForQuest.cloneNode(true);
//     clone.childNodes[1].childNodes[1].childNodes[3].setAttribute(
//       "id",
//       `allCountriesForQuest${CounterFlagQuest}`
//     );
//     clone.childNodes[1].childNodes[3].childNodes[1].setAttribute(
//       "id",
//       `IcountryForQuest${CounterFlagQuest}`
//     );
//     clone.childNodes[1].childNodes[5].childNodes[3].childNodes[1].setAttribute(
//       "id",
//       `flagUrlForQuest${CounterFlagQuest}`
//     );
//     clone.childNodes[1].childNodes[7].childNodes[3].childNodes[1].setAttribute(
//       "name",
//       `IcorrectImg[${CounterFlagQuest}]`
//     );
//     clone.childNodes[1].childNodes[9].childNodes[3].childNodes[1].setAttribute(
//       "name",
//       `IcorrectImg[${CounterFlagQuest}]`
//     );
//     clone.childNodes[1].childNodes[11].childNodes[3].childNodes[1].setAttribute(
//       "name",
//       `IcorrectImg[${CounterFlagQuest}]`
//     );
//     moduleAppendDiv.appendChild(clone);

//     if (region_input_flag_quest != "") {
//       const allData = await fetch(
//         `/admin/pod-adventure/all-flags-data/country/${region_input_flag_quest}`
//       );
//       const data = await allData.json();
//       var _html = "";
//       document.getElementById(
//         `allCountriesForQuest${CounterFlagQuest}`
//       ).innerHTML = `<option hidden>Please Select Country</option>`;
//       for (const key in data) {
//         _html += `<option value="${data[key].country}">${data[key].country}</option>`;
//       }
//       document.getElementById(
//         `allCountriesForQuest${CounterFlagQuest}`
//       ).innerHTML += _html;
//     }
//   };
// }



//=====================================
// Guess Country Game
//=====================================
    async function guessCountryselectedCountry(element) {
    let id = element.getAttribute("id"); 
    var num = id.match(/(\d+)/)[0];
    const countryName = document.getElementById(id).value;

    const response = await fetch(`/admin/flag-data-api/country-for-flag/${countryName}`);
    const data = await response.json();
    document.getElementById(`flagUrlForGuessCountry${num}`).value = data.flag;
    document.getElementById(`correctIDForGuessCountry${num}`).value = countryName.charAt(0).toUpperCase() + countryName.slice(1);
    }

// const add_new_form_for_Guess_Country = document.querySelector(
//   ".show-form-for-Guess-Country"
// );
// var region_input_guess_country = "";
// var CounterGuessCountry = 1;

// document
//   .getElementById("regionID")
//   .addEventListener("change", async (event) => {
//     region_input_guess_country = event.target.value;
//     const response = await fetch(
//       `/admin/pod-adventure/all-flags-data/country/${event.target.value}`
//     );
//     const data = await response.json();
//     var _html = "";
//     data.forEach((element) => {
//       _html += `<option value="${element.country}">${element.country}</option>`;
//     });

//     for (let i = 1; i <= CounterGuessCountry; i++) {
//       document.getElementById(
//         `countryIDForGuessCountry${i}`
//       ).innerHTML = `<option hidden>Please Select Country</option>`;
//       document.getElementById(`countryIDForGuessCountry${i}`).innerHTML +=
//         _html;
//     }
//   });

//   if(add_new_form_for_Guess_Country){
// add_new_form_for_Guess_Country.onclick = async () => {
//   CounterGuessCountry++;
//   const clone = getNewFormForGuessCountry.cloneNode(true);
//   clone.childNodes[1].childNodes[1].childNodes[1].childNodes[3].setAttribute(
//     "id",
//     `countryIDForGuessCountry${CounterGuessCountry}`
//   );
//   clone.childNodes[1].childNodes[1].childNodes[3].childNodes[3].setAttribute(
//     "id",
//     `flagUrlForGuessCountry${CounterGuessCountry}`
//   );
//   clone.childNodes[1].childNodes[5].childNodes[1].childNodes[3].setAttribute(
//     "id",
//     `correctIDForGuessCountry${CounterGuessCountry}`
//   );
//   moduleAppendDiv.appendChild(clone);
//   debugger;
//   if (region_input_guess_country != "") {
//     const response = await fetch(
//       `/admin/pod-adventure/all-flags-data/country/${region_input_guess_country}`
//     );
//     const data = await response.json();
//     var _html = "";
//     document.getElementById(
//       `countryIDForGuessCountry${CounterGuessCountry}`
//     ).innerHTML = `<option hidden>Please Select Country</option>`;
//     data.forEach((element) => {
//       _html += `<option value="${element.country}">${element.country}</option>`;
//     });
//     document.getElementById(
//       `countryIDForGuessCountry${CounterGuessCountry}`
//     ).innerHTML += _html;
//   }
// };
//   }

// async function guessCountryselectedCountry(element) {
//   let id = element.getAttribute("id");
//   console.log(id);
//   var num = id.match(/(\d+)/)[0];
//   const countryName = document.getElementById(id).value;

//   const response = await fetch(
//     `/admin/pod-adventure/all-flags-data/country-for-flag/${countryName}`
//   );
//   const data = await response.json();
//   document.getElementById(`flagUrlForGuessCountry${num}`).value = data.flag;
//   document.getElementById(`correctIDForGuessCountry${num}`).value =
//     countryName.charAt(0).toUpperCase() + countryName.slice(1);
// }

//=====================================
// Guess Flag Game
//=====================================
async function guessFlagselectedCountry(e) {
  const id = e.getAttribute("id");
  const countryName = document.getElementById(id).value;
  const shuffledCountry = shuffleStr(countryName);
  const num = id.match(/(\d+)/)[0];
  document.getElementById(`IcountryforGuessFlag${num}`).value = shuffledCountry;

  const response = await fetch(`/admin/flag-data-api/country-for-flag/${countryName}`);
  const data = await response.json();
  document.getElementById(`flagUrlForGuessFlag${num}`).value = data.flag;
}



// const add_new_form_for_Guess_Flag = document.querySelector(
//   ".show-form-for-Guess-Flag"
// );
// var getNewFormForGuessFlag = document.querySelector("#addNewFormForGuessFlag");
// var setNewFormForGuessFlag = document.getElementById("setNewFormForGuessFlag");
// var region_input_for_guess_flag = "";
// var CounterGuessFlag = 0;

// document
//   .getElementById("regionID")
//   .addEventListener("change", async (event) => {
//     region_input_for_guess_flag = event.target.value;
//     const response = await fetch(
//       `/admin/pod-adventure/all-flags-data/country/${event.target.value}`
//     );
//     const data = await response.json();
//     var _html = "";
//     document.getElementById(
//       "allCountriesForGuessFlag"
//     ).innerHTML = `<option hidden>Please Select Country</option>`;
//     data.forEach((element) => {
//       _html += `<option value="${element.country}">${element.country}</option>`;
//     });
//     document.getElementById("allCountriesForGuessFlag").innerHTML += _html;
//     for (let i = 1; i <= CounterGuessFlag; i++) {
//       document.getElementById(
//         `allCountriesForGuessFlag${i}`
//       ).innerHTML = `<option hidden>Please Select Country</option>`;
//       document.getElementById(`allCountriesForGuessFlag${i}`).innerHTML +=
//         _html;
//     }
//   });

// add_new_form_for_Guess_Flag.onclick = async () => {
//   CounterGuessFlag++;
//   const clone = getNewFormForGuessFlag.cloneNode(true);
//   clone.childNodes[1].childNodes[1].childNodes[3].setAttribute(
//     "id",
//     `allCountriesForGuessFlag${CounterGuessFlag}`
//   );
//   clone.childNodes[1].childNodes[3].childNodes[1].setAttribute(
//     "id",
//     `IcountryforGuessFlag${CounterGuessFlag}`
//   );
//   clone.childNodes[1].childNodes[5].childNodes[3].childNodes[1].setAttribute(
//     "id",
//     `flagUrlForGuessFlag${CounterGuessFlag}`
//   );
//   setNewFormForGuessFlag.appendChild(clone);

//   if (region_input_for_guess_flag != "") {
//     const allCountries = await fetch(
//       `/admin/pod-adventure/all-flags-data/country/${region_input_for_guess_flag}`
//     );
//     const data = await allCountries.json();
//     var _html = "";
//     document.getElementById(
//       `allCountriesForGuessFlag${CounterGuessFlag}`
//     ).innerHTML = `<option hidden>Please Select Country</option>`;
//     for (const key in data) {
//       _html += `<option value="${data[key].country}">${data[key].country}</option>`;
//     }
//     document.getElementById(
//       `allCountriesForGuessFlag${CounterGuessFlag}`
//     ).innerHTML += _html;
//   }
// };

// document
//   .getElementById("allCountriesForGuessFlag")
//   .addEventListener("change", async (event) => {
//     const response = await fetch(
//       `/admin/pod-adventure/all-flags-data/country-for-flag/${event.target.value}`
//     );
//     const data = await response.json();
//     document.getElementById("flagUrlForGuessFlag").value = data.flag;

//     const shuffledCountry = shuffleStr(event.target.value);
//     document.getElementById(`IcountryforGuessFlag`).value = shuffledCountry;
//   });

// async function guessFlagselectedCountry(e) {
//   const id = e.getAttribute("id");
//   const countryName = document.getElementById(id).value;
//   const shuffledCountry = shuffleStr(countryName);
//   const num = id.match(/(\d+)/)[0];
//   document.getElementById(`IcountryforGuessFlag${num}`).value = shuffledCountry;

//   const response = await fetch(
//     `/admin/pod-adventure/all-flags-data/country-for-flag/${countryName}`
//   );
//   const data = await response.json();
//   document.getElementById(`flagUrlForGuessFlag${num}`).value = data.flag;
// }

//=====================================
// Flag Detective Game
//=====================================
async function flagDetectiveSelectedCountry(e) {
  const id = e.getAttribute("id");
  const countryName = document.getElementById(id).value;
  const num = id.match(/(\d+)/)[0];

  const response = await fetch(`/admin/flag-data-api/country-for-flag/${countryName}`);
  const data = await response.json();
  document.getElementById(`flagUrlForDetective${num}`).value = data.flag;
}

// const add_new_form_for_flag_detective = document.querySelector(
//   ".show-form-for-flag-detective"
// );
// var getNewFormForFlagDetective = document.querySelector(
//   "#addNewFormForFlagDetective"
// );
// var setNewFormForFlagDetective = document.getElementById(
//   "setNewFormForFlagDetective"
// );
// var region_input_flag_detective = "";
// var CounterFlagDetective = 0;

// document
//   .getElementById("regionID")
//   .addEventListener("change", async (event) => {
//     region_input_flag_detective = event.target.value;
//     const response = await fetch(
//       `/admin/pod-adventure/all-flags-data/country/${event.target.value}`
//     );
//     const data = await response.json();
//     var _html = "";
//     document.getElementById(
//       "allCountriesForDetective"
//     ).innerHTML = `<option hidden>Please Select Country</option>`;
//     data.forEach((element) => {
//       _html += `<option value="${element.country}">${element.country}</option>`;
//     });
//     document.getElementById("allCountriesForDetective").innerHTML += _html;
//     for (let i = 1; i <= CounterFlagDetective; i++) {
//       document.getElementById(
//         `allCountriesForDetective${i}`
//       ).innerHTML = `<option hidden>Please Select Country</option>`;
//       document.getElementById(`allCountriesForDetective${i}`).innerHTML +=
//         _html;
//     }
//   });

// add_new_form_for_flag_detective.onclick = async () => {
//   CounterFlagDetective++;
//   const clone = getNewFormForFlagDetective.cloneNode(true);
//   clone.childNodes[1].childNodes[1].childNodes[3].setAttribute(
//     "id",
//     `allCountriesForDetective${CounterFlagDetective}`
//   );
//   clone.childNodes[1].childNodes[3].childNodes[3].childNodes[1].setAttribute(
//     "id",
//     `flagUrlForDetective${CounterFlagDetective}`
//   );
//   setNewFormForFlagDetective.appendChild(clone);

//   if (region_input_flag_detective != "") {
//     const allCountries = await fetch(
//       `/admin/pod-adventure/all-flags-data/country/${region_input_flag_detective}`
//     );
//     const data = await allCountries.json();
//     var _html = "";
//     document.getElementById(
//       `allCountriesForDetective${CounterFlagDetective}`
//     ).innerHTML = `<option hidden>Please Select Country</option>`;
//     for (const key in data) {
//       _html += `<option value="${data[key].country}">${data[key].country}</option>`;
//     }
//     document.getElementById(
//       `allCountriesForDetective${CounterFlagDetective}`
//     ).innerHTML += _html;
//   }
// };

// document
//   .getElementById("allCountriesForDetective")
//   .addEventListener("change", async (event) => {
//     const response = await fetch(
//       `/admin/pod-adventure/all-flags-data/country-for-flag/${event.target.value}`
//     );
//     const data = await response.json();
//     document.getElementById("flagUrlForDetective").value = data.flag;
//   });

// async function flagDetectiveSelectedCountry(e) {
//   const id = e.getAttribute("id");
//   const countryName = document.getElementById(id).value;
//   const num = id.match(/(\d+)/)[0];

//   const response = await fetch(
//     `/admin/pod-adventure/all-flags-data/country-for-flag/${countryName}`
//   );
//   const data = await response.json();
//   document.getElementById(`flagUrlForDetective${num}`).value = data.flag;
// }

//=====================================
// Flag Puzzle Game
//=====================================
async function flagPuzzleSelectedCountry(e) {
  const id = e.getAttribute("id");
  const countryName = document.getElementById(id).value;
  const num = id.match(/(\d+)/)[0];

  const response = await fetch(`/admin/flag-data-api/country-for-flag/${countryName}`);
  const data = await response.json();
  document.getElementById(`flagUrlForPuzzle${num}`).value = data.flag;
}

// const add_new_form_flag_puzzle = document.querySelector(
//   ".show-form-for-flag-puzzle"
// );
// var getNewFormForFlagPuzzle = document.querySelector(
//   "#addNewFormForFlagPuzzle"
// );
// var setNewFormForFlagPuzzle = document.getElementById(
//   "setNewFormForFlagPuzzle"
// );
// var region_input_flag_puzzle = "";
// var CounterFlagPuzzle = 0;

// document
//   .getElementById("regionID")
//   .addEventListener("change", async (event) => {
//     region_input_flag_puzzle = event.target.value;
//     const response = await fetch(
//       `/admin/pod-adventure/all-flags-data/country/${event.target.value}`
//     );
//     const data = await response.json();
//     var _html = "";
//     document.getElementById(
//       "allCountriesForFlagPuzzle"
//     ).innerHTML = `<option hidden>Please Select Country</option>`;
//     data.forEach((element) => {
//       _html += `<option value="${element.country}">${element.country}</option>`;
//     });
//     document.getElementById("allCountriesForFlagPuzzle").innerHTML += _html;
//     for (let i = 1; i <= CounterFlagPuzzle; i++) {
//       document.getElementById(
//         `allCountriesForFlagPuzzle${i}`
//       ).innerHTML = `<option hidden>Please Select Country</option>`;
//       document.getElementById(`allCountriesForFlagPuzzle${i}`).innerHTML +=
//         _html;
//     }
//   });

// add_new_form_flag_puzzle.onclick = async () => {
//   CounterFlagPuzzle++;
//   const clone = getNewFormForFlagPuzzle.cloneNode(true);
//   clone.childNodes[1].childNodes[1].childNodes[3].setAttribute(
//     "id",
//     `allCountriesForFlagPuzzle${CounterFlagPuzzle}`
//   );
//   console.log(clone.childNodes[1].childNodes[3].childNodes[3]);
//   clone.childNodes[1].childNodes[3].childNodes[3].childNodes[1].setAttribute(
//     "id",
//     `flagUrlForPuzzle${CounterFlagPuzzle}`
//   );
//   setNewFormForFlagPuzzle.appendChild(clone);

//   if (region_input_flag_puzzle != "") {
//     const allCountries = await fetch(
//       `/admin/pod-adventure/all-flags-data/country/${region_input_flag_puzzle}`
//     );
//     const data = await allCountries.json();
//     var _html = "";
//     document.getElementById(
//       `allCountriesForFlagPuzzle${CounterFlagPuzzle}`
//     ).innerHTML = `<option hidden>Please Select Country</option>`;
//     for (const key in data) {
//       _html += `<option value="${data[key].country}">${data[key].country}</option>`;
//     }
//     document.getElementById(
//       `allCountriesForFlagPuzzle${CounterFlagPuzzle}`
//     ).innerHTML += _html;
//   }
// };

// document
//   .getElementById("allCountriesForFlagPuzzle")
//   .addEventListener("change", async (event) => {
//     const response = await fetch(
//       `/admin/pod-adventure/all-flags-data/country-for-flag/${event.target.value}`
//     );
//     const data = await response.json();
//     document.getElementById("flagUrlForPuzzle").value = data.flag;
//   });



//===================================
//Shuffle String Characters Function
//===================================
function shuffleStr(s) {
  let arr = s.split(""),
    arr_len = arr.length;
  while (arr_len) {
    let rnd = Math.floor(Math.random() * arr_len--);
    [arr[arr_len], arr[rnd]] = [arr[rnd], arr[arr_len]];
  }
  let str = arr.join("");
  return str;
}
