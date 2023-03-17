let questions = [
    {
      numb: 1,
  
      question: "Germany",
  
      image: "https://flagpedia.net/data/flags/h80/de.webp",
  
      arrangement: "threeStripesVert",
  
      allowedColors: ["black", "red", "orange"],
  
      colorPalette: ["red", "green", "yellow", "black", "orange", "blue"],
    },
  
    {
      numb: 2,
  
      question: "Ukraine",
  
      image: "https://flagpedia.net/data/flags/h80/ua.webp",
  
      arrangement: "twoStripesVert",
  
      allowedColors: ["blue", "yellow"],
  
      colorPalette: ["blue", "green", "yellow", "black", "orange", "pink"],
    },
  
    {
      numb: 3,
  
      question: "Netherlands",
  
      image: "https://flagpedia.net/data/flags/h80/nl.webp",
  
      arrangement: "threeStripesVert",
  
      allowedColors: ["red", "white", "blue"],
  
      colorPalette: ["red", "green", "white", "pink", "orange", "blue"],
    },
  
    {
      numb: 4,
  
      question: "Austria",
  
      image: "https://flagpedia.net/data/flags/h80/at.webp",
  
      arrangement: "threeStripesVert",
  
      allowedColors: ["red", "white", "red"],
  
      colorPalette: ["red", "green", "white", "yellow", "grey", "blue"],
    },
  
    {
      numb: 5,
  
      question: "Indonasia",
  
      image: "https://flagpedia.net/data/flags/h80/id.webp",
  
      arrangement: "twoStripesVert",
  
      allowedColors: ["red", "white"],
  
      colorPalette: ["red", "green", "white", "yellow", "pink", "blue"],
    },
  
    {
      numb: 6,
  
      question: "Romania",
  
      image: "https://flagpedia.net/data/flags/h80/ro.webp",
  
      arrangement: "threeStripesHoriz",
  
      allowedColors: ["blue", "yellow", "red"],
  
      colorPalette: ["red", "green", "black", "yellow", "pink", "blue"],
    },
  
    {
      numb: 7,
  
      question: "Hungary",
  
      image: "https://flagpedia.net/data/flags/h80/hu.webp",
  
      arrangement: "threeStripesVert",
  
      allowedColors: ["#CD2A3E", "white", "#436F4D"],
  
      colorPalette: ["#CD2A3E", "grey", "black", "yellow", "#436F4D", "white"],
    },
  
    {
      numb: 8,
  
      question: "Colombia",
  
      image: "https://flagpedia.net/data/flags/h80/co.webp",
  
      arrangement: "threeStripesVert",
  
      allowedColors: ["yellow", "blue", "red"],
  
      colorPalette: ["red", "grey", "black", "yellow", "green", "blue"],
    },
  
    {
      numb: 9,
  
      question: "France",
  
      image: "https://flagpedia.net/data/flags/h80/fr.webp",
  
      arrangement: "threeStripesHoriz",
  
      allowedColors: ["blue", "white", "red"],
  
      colorPalette: ["red", "pink", "black", "yellow", "white", "blue"],
    },
  
    {
      numb: 10,
  
      question: "Italy",
  
      image: "https://flagpedia.net/data/flags/h80/it.webp",
  
      arrangement: "threeStripesHoriz",
  
      allowedColors: ["green", "white", "red"],
  
      colorPalette: ["red", "pink", "green", "yellow", "white", "black"],
    },
  ];

let shapes = [
    {
        name: "Three.Layers.Horizontal",
        shape: "white.three.layers.horizontal.svg"
    },
    {
        name: "Three.Layers.Vertical",
        shape: "white.three.layers.vertical.svg"
    },
    {
        name: "Two.Layers.Horizontal",
        shape: "white.two.layers.horizontal.svg"
    },
    {
        name: "Two.Layers.Vertical",
        shape: "white.two.layers.vertical.svg"
    }
]


//Fill Select Country 
var countryID = document.getElementById("countryID");
const countryOptions = questions.map(val => '<option hidden >Please Select Country Name</option><option value='+ val.question +' >'+ val.question.toUpperCase() +'</option> ');
countryID.innerHTML = countryOptions
function selectedOption() {
    for (let i = 0; i < questions.length; i++) {
        if(questions[i].question.toUpperCase() === document.getElementById("countryID").value.toUpperCase())
        {
            document.getElementById("flagUrl").value = `${questions[i].image}`;
            break;
        }
    }  
}

//Fill Select Shape 
var shapeID   = document.getElementById("shapeID");
const shapeOptions = shapes.map(val => '<option hidden >Please Select Flag Shape</option><option style="background: lightGray" value='+ val.shape +' ><img src="" alt=""/></option>');
// shapeID.innerHTML = shapeOptions; 

