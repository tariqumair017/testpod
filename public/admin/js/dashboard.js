

document.addEventListener("DOMContentLoaded", function (event) {
  const showNavbar = (toggleId, navId, bodyId, headerId) => {
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId),
      bodypd = document.getElementById(bodyId),
      headerpd = document.getElementById(headerId);

    // Validate that all variables exist
    if (toggle && nav && bodypd && headerpd) {
      toggle.addEventListener("click", () => {
        // show navbar
        nav.classList.toggle("toggle-show");
        // change icon
        toggle.classList.toggle("bx-x");
        // add padding to body
        !bodypd.classList.toggle("body-pd");
        // add padding to header
        headerpd.classList.toggle("body-pd");
      });
    }
  };

  showNavbar(
    "header-toggle",
    "nav-bar",
    "body-pd",
    "header",
  );
  

  const header_logo = document.getElementById("header-toggle") 

  header_logo.onclick=()=>{
    const toggle= document.querySelector(".header-logo").classList.toggle("active")
    if(toggle){
      document.querySelector(".header-logo").src = "/admin/img/logo/imgpsh_fullsize_anim.jpeg"
    }else{
      document.querySelector(".header-logo").src = "/admin/img/logo/logo1.svg"
    }
    }

    const linkColor = document.querySelectorAll(".nav_link");
    console.log(linkColor,"linkColor")
    const pathname=this.location.pathname
    linkColor.forEach((item,index)=>{
    if(pathname == "/dashboard"){
      document.getElementById("dashboard").classList.add("active")
    }
    else if(pathname == "/user-management"){
      document.getElementById("user-management").classList.add("active")
    }
    else if(pathname == "/user-management"){
      document.getElementById("user-management").classList.add("active")
    }
    else if(pathname == "/web-analytics"){
      document.getElementById("web-analytics").classList.add("active")
    }
    else if(pathname == "/game-management"){
      document.getElementById("game-management").classList.add("active")
    }
    else if(pathname == "/add-quiz"){
      document.getElementById("quiz-management").classList.add("active")
      document.getElementById("collapseTwo").classList.add("show")
      document.getElementById("add-quiz").classList.add("active")
    }
    else if(pathname == "/manage-quiz"){
      document.getElementById("quiz-management").classList.add("active")
      document.getElementById("collapseTwo").classList.add("show")
      document.getElementById("manage-quiz").classList.add("active")
    }
    else if(pathname == "/result-management"){
      document.getElementById("result-management").classList.add("active")
    }
    else if(pathname == "/content-management"){
      document.getElementById("content-management").classList.add("active")
    }
    else if(pathname == "/blogs-management"){
      document.getElementById("blogs-management").classList.add("active")
    }
    else if(pathname == "/analytics"){
      document.getElementById("analytics").classList.add("active")
    }
    else{
      document.getElementById("dashboard").classList.add("active")
    }
  }

    )
  
  
  /*===== LINK ACTIVE =====*/

  function colorLink() {
      if (linkColor) {
          linkColor.forEach((l) => l.classList.remove("active"));
          this.classList.add("active");
    }
  }
  linkColor.forEach((l) => l.addEventListener("click", colorLink));

  // Your code to run since DOM is loaded and ready
});
