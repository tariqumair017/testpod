var allColors = {
  AliceBlue: "#F0F8FF",
  AntiqueWhite: "#FAEBD7",
  Aqua: "#00FFFF",
  Aquamarine: "#7FFFD4",
  Azure: "#F0FFFF",
  Beige: "#F5F5DC",
  Bisque: "#FFE4C4",
  Black: "#000000",
  BlanchedAlmond: "#FFEBCD",
  Blue: "#0000FF",
  BlueViolet: "#8A2BE2",
  Brown: "#A52A2A",
  BurlyWood: "#DEB887",
  CadetBlue: "#5F9EA0",
  Chartreuse: "#7FFF00",
  Chocolate: "#D2691E",
  Coral: "#FF7F50",
  CornflowerBlue: "#6495ED",
  Cornsilk: "#FFF8DC",
  Crimson: "#DC143C",
  Cyan: "#00FFFF",
  DarkBlue: "#00008B",
  DarkCyan: "#008B8B",
  DarkGoldenRod: "#B8860B",
  DarkGray: "#A9A9A9",
  DarkGrey: "#A9A9A9",
  DarkGreen: "#006400",
  DarkKhaki: "#BDB76B",
  DarkMagenta: "#8B008B",
  DarkOliveGreen: "#556B2F",
  DarkOrange: "#FF8C00",
  DarkOrchid: "#9932CC",
  DarkRed: "#8B0000",
  DarkSalmon: "#E9967A",
  DarkSeaGreen: "#8FBC8F",
  DarkSlateBlue: "#483D8B",
  DarkSlateGray: "#2F4F4F",
  DarkSlateGrey: "#2F4F4F",
  DarkTurquoise: "#00CED1",
  DarkViolet: "#9400D3",
  DeepPink: "#FF1493",
  DeepSkyBlue: "#00BFFF",
  DimGray: "#696969",
  DimGrey: "#696969",
  DodgerBlue: "#1E90FF",
  FireBrick: "#B22222",
  FloralWhite: "#FFFAF0",
  ForestGreen: "#228B22",
  Fuchsia: "#FF00FF",
  Gainsboro: "#DCDCDC",
  GhostWhite: "#F8F8FF",
  Gold: "#FFD700",
  GoldenRod: "#DAA520",
  Gray: "#808080",
  Grey: "#808080",
  Green: "#008000",
  GreenYellow: "#ADFF2F",
  HoneyDew: "#F0FFF0",
  HotPink: "#FF69B4",
  IndianRed: "#CD5C5C",
  Indigo: "#4B0082",
  Ivory: "#FFFFF0",
  Khaki: "#F0E68C",
  Lavender: "#E6E6FA",
  LavenderBlush: "#FFF0F5",
  LawnGreen: "#7CFC00",
  LemonChiffon: "#FFFACD",
  LightBlue: "#ADD8E6",
  LightCoral: "#F08080",
  LightCyan: "#E0FFFF",
  LightGoldenRodYellow: "#FAFAD2",
  LightGray: "#D3D3D3",
  LightGrey: "#D3D3D3",
  LightGreen: "#90EE90",
  LightPink: "#FFB6C1",
  LightSalmon: "#FFA07A",
  LightSeaGreen: "#20B2AA",
  LightSkyBlue: "#87CEFA",
  LightSlateGray: "#778899",
  LightSlateGrey: "#778899",
  LightSteelBlue: "#B0C4DE",
  LightYellow: "#FFFFE0",
  Lime: "#00FF00",
  LimeGreen: "#32CD32",
  Linen: "#FAF0E6",
  Magenta: "#FF00FF",
  Maroon: "#800000",
  MediumAquaMarine: "#66CDAA",
  MediumBlue: "#0000CD",
  MediumOrchid: "#BA55D3",
  MediumPurple: "#9370DB",
  MediumSeaGreen: "#3CB371",
  MediumSlateBlue: "#7B68EE",
  MediumSpringGreen: "#00FA9A",
  MediumTurquoise: "#48D1CC",
  MediumVioletRed: "#C71585",
  MidnightBlue: "#191970",
  MintCream: "#F5FFFA",
  MistyRose: "#FFE4E1",
  Moccasin: "#FFE4B5",
  NavajoWhite: "#FFDEAD",
  Navy: "#000080",
  OldLace: "#FDF5E6",
  Olive: "#808000",
  OliveDrab: "#6B8E23",
  Orange: "#FFA500",
  OrangeRed: "#FF4500",
  Orchid: "#DA70D6",
  PaleGoldenRod: "#EEE8AA",
  PaleGreen: "#98FB98",
  PaleTurquoise: "#AFEEEE",
  PaleVioletRed: "#DB7093",
  PapayaWhip: "#FFEFD5",
  PeachPuff: "#FFDAB9",
  Peru: "#CD853F",
  Pink: "#FFC0CB",
  Plum: "#DDA0DD",
  PowderBlue: "#B0E0E6",
  Purple: "#800080",
  RebeccaPurple: "#663399",
  Red: "#FF0000",
  RosyBrown: "#BC8F8F",
  RoyalBlue: "#4169E1",
  SaddleBrown: "#8B4513",
  Salmon: "#FA8072",
  SandyBrown: "#F4A460",
  SeaGreen: "#2E8B57",
  SeaShell: "#FFF5EE",
  Sienna: "#A0522D",
  Silver: "#C0C0C0",
  SkyBlue: "#87CEEB",
  SlateBlue: "#6A5ACD",
  SlateGray: "#708090",
  SlateGrey: "#708090",
  Snow: "#FFFAFA",
  SpringGreen: "#00FF7F",
  SteelBlue: "#4682B4",
  Tan: "#D2B48C",
  Teal: "#008080",
  Thistle: "#D8BFD8",
  Tomato: "#FF6347",
  Turquoise: "#40E0D0",
  Violet: "#EE82EE",
  Wheat: "#F5DEB3",
  White: "#FFFFFF",
  WhiteSmoke: "#F5F5F5",
  Yellow: "#FFFF00",
  YellowGreen: "#9ACD32",
};

var colorsID = document.getElementById("colorsID");
var editColorsID = document.getElementById("editColorsID");

var colorsOptions;
for (const key in allColors) {
  colorsOptions += `<option value="${key.toLowerCase()}" >${key.toLowerCase()}</option>`;
}
colorsID.innerHTML = colorsOptions;
editColorsID.innerHTML = colorsOptions;

function init(element) {
  // Create div that wroaps all the elements inside (select, elements selected, search div) to put select inside
  const wrapper = document.createElement("div");
  wrapper.addEventListener("click", clickOnWrapper);
  wrapper.classList.add("multi-select-component");

  // Create elements of search
  const search_div = document.createElement("div");
  search_div.classList.add("search-container");
  const input = document.createElement("input");
  input.classList.add("selected-input");
  input.setAttribute("autocomplete", "off");
  input.setAttribute("tabindex", "0");
  input.addEventListener("keyup", inputChange);
  input.addEventListener("keydown", deletePressed);
  input.addEventListener("click", openOptions);

  const dropdown_icon = document.createElement("a");
  dropdown_icon.setAttribute("href", "#");
  dropdown_icon.classList.add("dropdown-icon");

  dropdown_icon.addEventListener("click", clickDropdown);
  const autocomplete_list = document.createElement("ul");
  autocomplete_list.classList.add("autocomplete-list");
  search_div.appendChild(input);
  search_div.appendChild(autocomplete_list);
  search_div.appendChild(dropdown_icon);

  // set the wrapper as child (instead of the element)
  element.parentNode.replaceChild(wrapper, element);
  // set element as child of wrapper
  wrapper.appendChild(element);
  wrapper.appendChild(search_div);

  createInitialTokens(element);
  addPlaceholder(wrapper);
}

function removePlaceholder(wrapper) {
  const input_search = wrapper.querySelector(".selected-input");
  input_search.removeAttribute("placeholder");
}

function addPlaceholder(wrapper) {
  const input_search = wrapper.querySelector(".selected-input");
  const tokens = wrapper.querySelectorAll(".selected-wrapper");
  if (!tokens.length && !(document.activeElement === input_search))
    input_search.setAttribute("placeholder", "--");
}

// Function that create the initial set of tokens with the options selected by the users
function createInitialTokens(select) {
  let { options_selected } = getOptions(select);
  const wrapper = select.parentNode;
  for (let i = 0; i < options_selected.length; i++) {
    createToken(wrapper, options_selected[i]);
  }
}

// Listener of user search
function inputChange(e) {
  const wrapper = e.target.parentNode.parentNode;
  const select = wrapper.querySelector("select");
  const dropdown = wrapper.querySelector(".dropdown-icon");

  const input_val = e.target.value;

  if (input_val) {
    dropdown.classList.add("select-active");
    populateAutocompleteList(select, input_val.trim());
  } else {
    dropdown.classList.remove("select-active");
    const event = new Event("click");
    dropdown.dispatchEvent(event);
  }
}

// Listen for clicks on the wrapper, if click happens focus on the input
function clickOnWrapper(e) {
  const wrapper = e.target;
  if (wrapper.tagName == "DIV") {
    const input_search = wrapper.querySelector(".selected-input");
    const dropdown = wrapper.querySelector(".dropdown-icon");
    if (!dropdown.classList.contains("select-active")) {
      const event = new Event("click");
      dropdown.dispatchEvent(event);
    }
    input_search.focus();
    removePlaceholder(wrapper);
  }
}

function openOptions(e) {
  const input_search = e.target;
  const wrapper = input_search.parentElement.parentElement;
  const dropdown = wrapper.querySelector(".dropdown-icon");
  if (!dropdown.classList.contains("select-active")) {
    const event = new Event("click");
    dropdown.dispatchEvent(event);
  }
  e.stopPropagation();
}

// Function that create a token inside of a wrapper with the given value
function createToken(wrapper, value) {
  const search = wrapper.querySelector(".search-container");
  // Create token wrapper
  const token = document.createElement("div");
  token.classList.add("selected-wrapper");
  const token_span = document.createElement("span");
  token_span.classList.add("selected-label");
  token_span.innerText = value;
  const close = document.createElement("a");
  close.classList.add("selected-close");
  close.setAttribute("tabindex", "-1");
  close.setAttribute("data-option", value);
  close.setAttribute("data-hits", 0);
  close.setAttribute("href", "#");
  close.innerText = "x";
  close.addEventListener("click", removeToken);
  token.appendChild(token_span);
  token.appendChild(close);
  wrapper.insertBefore(token, search);
}

// Listen for clicks in the dropdown option
function clickDropdown(e) {
  const dropdown = e.target;
  const wrapper = dropdown.parentNode.parentNode;
  const input_search = wrapper.querySelector(".selected-input");
  const select = wrapper.querySelector("select");
  dropdown.classList.toggle("select-active");

  if (dropdown.classList.contains("select-active")) {
    removePlaceholder(wrapper);
    input_search.focus();

    if (!input_search.value) {
      populateAutocompleteList(select, "", true);
    } else {
      populateAutocompleteList(select, input_search.value);
    }
  } else {
    clearAutocompleteList(select);
    addPlaceholder(wrapper);
  }
}

// Clears the results of the autocomplete list
function clearAutocompleteList(select) {
  const wrapper = select.parentNode;

  const autocomplete_list = wrapper.querySelector(".autocomplete-list");
  autocomplete_list.innerHTML = "";
}

// Populate the autocomplete list following a given query from the user
function populateAutocompleteList(select, query, dropdown = false) {
  const { autocomplete_options } = getOptions(select);

  let options_to_show;

  if (dropdown) options_to_show = autocomplete_options;
  else options_to_show = autocomplete(query, autocomplete_options);

  const wrapper = select.parentNode;
  const input_search = wrapper.querySelector(".search-container");
  const autocomplete_list = wrapper.querySelector(".autocomplete-list");
  autocomplete_list.innerHTML = "";
  const result_size = options_to_show.length;

  if (result_size == 1) {
    const li = document.createElement("li");
    li.innerText = options_to_show[0];
    li.setAttribute("data-value", options_to_show[0]);
    li.addEventListener("click", selectOption);
    autocomplete_list.appendChild(li);
    if (query.length == options_to_show[0].length) {
      const event = new Event("click");
      li.dispatchEvent(event);
    }
  } else if (result_size > 1) {
    for (let i = 0; i < result_size; i++) {
      const li = document.createElement("li");
      li.innerText = options_to_show[i];
      li.setAttribute("data-value", options_to_show[i]);
      li.addEventListener("click", selectOption);
      autocomplete_list.appendChild(li);
    }
  } else {
    const li = document.createElement("li");
    li.classList.add("not-cursor");
    li.innerText = "No options found";
    autocomplete_list.appendChild(li);
  }
}

// Listener to autocomplete results when clicked set the selected property in the select option
const selected_options = [];
function selectOption(e) {
  const wrapper = e.target.parentNode.parentNode.parentNode;
  const input_search = wrapper.querySelector(".selected-input");
  const option = wrapper.querySelector(
    `select option[value="${e.target.dataset.value}"]`
  );
  option.setAttribute("selected", "");
  selected_options.push(option);
  createToken(wrapper, e.target.dataset.value);
  if (input_search.value) {
    input_search.value = "";
  }

  input_search.focus();

  e.target.remove();
  const autocomplete_list = wrapper.querySelector(".autocomplete-list");

  if (!autocomplete_list.children.length) {
    const li = document.createElement("li");
    li.classList.add("not-cursor");
    li.innerText = "No options found";
    autocomplete_list.appendChild(li);
  }

  const event = new Event("keyup");
  input_search.dispatchEvent(event);
  e.stopPropagation();
}

// function that returns a list with the autcomplete list of matches
function autocomplete(query, options) {
  // No query passed, just return entire list
  if (!query) {
    return options;
  }
  let options_return = [];

  for (let i = 0; i < options.length; i++) {
    if (
      query.toLowerCase() === options[i].slice(0, query.length).toLowerCase()
    ) {
      options_return.push(options[i]);
    }
  }
  return options_return;
}

// Returns the options that are selected by the user and the ones that are not
function getOptions(select) {
  // Select all the options available
  const all_options = Array.from(select.querySelectorAll("option")).map(
    (el) => el.value
  );

  // Get the options that are selected from the user
  const options_selected = selected_options.map((el) => el.value);

  // Create an autocomplete options array with the options that are not selected by the user
  const autocomplete_options = [];
  all_options.forEach((option) => {
    if (!options_selected.includes(option)) {
      autocomplete_options.push(option);
    }
  });

  autocomplete_options;

  return {
    options_selected,
    autocomplete_options,
  };
}

// Listener for when the user wants to remove a given token.
function removeToken(e) {
  // Get the value to remove
  const value_to_remove = e.target.dataset.option;
  const wrapper = e.target.parentNode.parentNode;
  const input_search = wrapper.querySelector(".selected-input");
  const dropdown = wrapper.querySelector(".dropdown-icon");
  // Get the options in the select to be unselected
  const option_to_unselect = wrapper.querySelector(
    `select option[value="${value_to_remove}"]`
  );
  option_to_unselect.removeAttribute("selected");
  // Remove token attribute
  e.target.parentNode.remove();
  input_search.focus();
  dropdown.classList.remove("select-active");
  const event = new Event("click");
  dropdown.dispatchEvent(event);
  e.stopPropagation();
}

// Listen for 2 sequence of hits on the delete key, if this happens delete the last token if exist
function deletePressed(e) {
  const wrapper = e.target.parentNode.parentNode;
  const input_search = e.target;
  const key = e.keyCode || e.charCode;
  const tokens = wrapper.querySelectorAll(".selected-wrapper");

  if (tokens.length) {
    const last_token_x = tokens[tokens.length - 1].querySelector("a");
    let hits = +last_token_x.dataset.hits;

    if (key == 8 || key == 46) {
      if (!input_search.value) {
        if (hits > 1) {
          // Trigger delete event
          const event = new Event("click");
          last_token_x.dispatchEvent(event);
        } else {
          last_token_x.dataset.hits = 2;
        }
      }
    } else {
      last_token_x.dataset.hits = 0;
    }
  }
  return true;
}

// You can call this function if you want to add new options to the select plugin
// Target needs to be a unique identifier from the select you want to append new option for example #multi-select-plugin
// Example of usage addOption("#multi-select-plugin", "tesla", "Tesla")
function addOption(target, val, text) {
  const select = document.querySelector(target);
  let opt = document.createElement("option");
  opt.value = val;
  opt.innerHTML = text;
  select.appendChild(opt);
}

document.addEventListener("DOMContentLoaded", () => {
  // get select that has the options available
  const select = document.querySelectorAll("[data-multi-select-plugin]");
  select.forEach((select) => {
    init(select);
  });

  // Dismiss on outside click
  document.addEventListener("click", () => {
    // get select that has the options available
    const select = document.querySelectorAll("[data-multi-select-plugin]");
    for (let i = 0; i < select.length; i++) {
      if (event) {
        var isClickInside = select[i].parentElement.parentElement.contains(
          event.target
        );

        if (!isClickInside) {
          const wrapper = select[i].parentElement.parentElement;
          const dropdown = wrapper.querySelector(".dropdown-icon");
          const autocomplete_list = wrapper.querySelector(".autocomplete-list");
          //the click was outside the specifiedElement, do something
          dropdown.classList.remove("select-active");
          autocomplete_list.innerHTML = "";
          addPlaceholder(wrapper);
        }
      }
    }
  });
});

//Add New Flag
let draw_flag_form = document.getElementById("drawFlagForm");
draw_flag_form.addEventListener("submit", getFormData);
function getFormData(e) {
  e.preventDefault();
 
  for (let i = 0; i < 6; i++) { 
    let id = document.forms.drawFlagForm[i].value; 
    if(id === ""){
      // document.forms.drawFlagForm.submit.disabled = true;
      return;
    } 
  }

  var formData = new FormData(draw_flag_form); //.forEach((val, key) => dataToSave[key] = val)

  var selectedColors = [];
  for (let i = 0; i < selected_options.length; i++) {
    selectedColors.push(selected_options[i].value);
  }
  formData.append("selectedColors", JSON.stringify(selectedColors));

  fetch(`/admin/draw-flag-game/add-new-flag`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => { 
      sessionStorage.clear();
      window.location.href = data.url;
    })
    .catch(console.log);

}

//Edit New Flag
async function editFlag(id) {
  const response = await fetch(`/admin/draw-flag-game/add-new-flag/${id}/edit`);
  const data = await response.json();

  document.getElementById("editCountry").value = data.country;
  document.getElementById("editFlagUrl").value = data.flagUrl;
  document.getElementById("editFlagDetails").value = data.flagDetails;
  document.getElementById("editArrangementID").value = data.arrangement;
  document.getElementById("hideID").value = id;
}
//Update New Flag
let edit_Flag_Form = document.getElementById("editFlagForm");
edit_Flag_Form.addEventListener("submit", updateFormData);
function updateFormData(e) {
  e.preventDefault();

  for (let i = 1; i < 7; i++) { 
    let id = document.forms.editFlagForm[i].value; 
    if(id === ""){
      // document.forms.editFlagForm.submit.disabled = true;
      return;
    } 
  }

  var formData = new FormData(edit_Flag_Form); //.forEach((val, key) => dataToSave[key] = val)
  var selectedColors = [];
  for (let i = 0; i < selected_options.length; i++) {
    selectedColors.push(selected_options[i].value);
  }
  formData.append("selectedColors", JSON.stringify(selectedColors));

  fetch(`/admin/draw-flag-game/add-new-flag/${hideID.value}`, {
    method: "PUT",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      window.location.href = data.url;
    })
    .catch(console.log);
}

// add hint images 
const new_arrangement = document.querySelector(".new-arrangement");
const hint_images = document.querySelector(".hint-images");

function getNewArrangemwnts(e) {
  if (e.value == "threeStripesHoriz") {
    hint_images.classList.remove("d-none");
    hint_images.innerHTML = `<div style="position: relative;" ><img src='/client/img/images/white.three.layers.horizontal.svg' alt=""/><p style="position: absolute;left: 45%;top:15%" >Step 1</p><p style="position: absolute;left: 45%;top:48%;">Step 2</p><p style="position: absolute;left: 45%;top:79%;">Step 3</p></div>`;
  }
  else if(e.value == "threeStripesVert"){
    hint_images.classList.remove("d-none");
    hint_images.innerHTML = `<div style="position: relative;" ><img src='/client/img/images/white.three.layers.vertical.svg' alt=""/><p style="position: absolute;left: 13%;top:48%" >Step 1</p><p style="position: absolute;left: 45%;top:48%;">Step 2</p><p style="position: absolute;left: 78%;top:48%;">Step 3</p></div>`;

  }
  else if(e.value == "twoStripesHoriz"){
    hint_images.classList.remove("d-none");
    hint_images.innerHTML = `<div style="position: relative;" ><img src='/client/img/images/white.two.layers.horizontal.svg' alt=""/><p style="position: absolute;left: 45%;top:23%" >Step 1</p><p style="position: absolute;left: 45%;top:70%;">Step 2</p></div>`;

  }
  else if(e.value == "twoStripesVert"){
    hint_images.classList.remove("d-none");
    hint_images.innerHTML = `<div style="position: relative;" ><img src='/client/img/images/white.two.layers.vertical.svg' alt=""/><p style="position: absolute;left: 22%;top:48%" >Step 1</p><p style="position: absolute;left: 70%;top:48%;">Step 2</p></div>`;

  }
}
