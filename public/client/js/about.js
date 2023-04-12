const menu_tigger = document.querySelector(".menu-tigger")
const menu_close = document.querySelector(".menu-close,i")
const menu_button = document.querySelector("#menu") 


menu_tigger.onclick=()=>{
  document.getElementById("offcanvas-menu").classList.toggle("active")

}

menu_button.onclick=()=>{
    document.getElementById("offcanvas-menu").classList.toggle("active")
    document.body.classList.toggle("stop-scrolling");
  }
  
menu_close.onclick=()=>{
    document.getElementById("offcanvas-menu").classList.remove("active")
      document.body.classList.remove("stop-scrolling");

}

// window.onclick = function ustad() {
//   const notActive= document.getElementById("offcanvas-menu").classList.toggle("ustad")
//   if (notActive == false) {
//     document.getElementById("offcanvas-menu").classList.remove("active")
//     }
// }

 

  

