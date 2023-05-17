// const menu_tigger = document.querySelector(".menu-tigger")
const menu_close = document.getElementById("menu-close")
const menu_button = document.getElementById("menu") 




// menu_tigger.onclick=()=>{
//   document.getElementById("offcanvas-menu").classList.toggle("active")
// }


menu_close.onclick=()=>{
  document.getElementById("offcanvas-menu").classList.remove("active")
  document.body.classList.remove("stop-scrolling");
  
}
menu_button.onclick=()=>{
    document.getElementById("offcanvas-menu").classList.toggle("active")
    document.body.classList.toggle("stop-scrolling");
  }

 

  

