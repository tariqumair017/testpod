

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
    const pathname=this.location.pathname
    linkColor.forEach((item,index)=>{
    if(pathname == "/admin/dashboard"){
      document.getElementById("dashboard").classList.add("active")
    }
    else if(pathname == "/admin/user-management"){
      document.getElementById("user-management").classList.add("active")
    }
    else if(pathname == "/admin/web-analytics"){
      document.getElementById("web-analytics").classList.add("active")
    }
    else if(pathname == "/admin/web-analytics/quizzes"){
      document.getElementById("web-analytics").classList.add("active")
      document.getElementById("collapseThree").classList.add("show")
      document.getElementById("quizze").classList.add("active")
    }
    else if(pathname == "/admin/web-analytics/guess-flag-game"){
      document.getElementById("web-analytics").classList.add("active")
      document.getElementById("collapseThree").classList.add("show")
      document.getElementById("flag-game").classList.add("active")
    }
    else if(pathname == "/admin/guess-country-game/add"){
      document.getElementById("game-management").classList.add("active")
      document.getElementById("collapseOne").classList.add("show")
      document.getElementById("add-flags-games").classList.add("active")
    }
    else if(pathname == "/admin/guess-country-game/manage"){
      document.getElementById("game-management").classList.add("active")
      document.getElementById("collapseOne").classList.add("show")
      document.getElementById("manage-flags-games").classList.add("active")
    } 
    else if(pathname == "/admin/draw-flag-game/add"){
      document.getElementById("game-management").classList.add("active")
      document.getElementById("collapseOne").classList.add("show")
      document.getElementById("draw-flags-games").classList.add("active")
    }
    else if(pathname == "/admin/draw-flag-game/manage"){
      document.getElementById("game-management").classList.add("active")
      document.getElementById("collapseOne").classList.add("show")
      document.getElementById("manage-draw-flags-games").classList.add("active")
    } 
    else if(pathname == "/admin/guess-flag-game/add"){
      document.getElementById("game-management").classList.add("active")
      document.getElementById("collapseOne").classList.add("show")
      document.getElementById("create-guess-flag-game").classList.add("active")
    }
     else if(pathname == "/admin/guess-flag-game/manage"){
      document.getElementById("game-management").classList.add("active")
      document.getElementById("collapseOne").classList.add("show")
      document.getElementById("manage-guess-flag-game").classList.add("active")
    }
    else if(pathname == "/admin/flag-detective-game/add"){
      document.getElementById("game-management").classList.add("active")
      document.getElementById("collapseOne").classList.add("show")
      document.getElementById("create-flag-detective-game").classList.add("active")
    }
    else if(pathname == "/admin/flag-detective-game/manage"){
      document.getElementById("game-management").classList.add("active")
      document.getElementById("collapseOne").classList.add("show")
      document.getElementById("manage-flag-detective-game").classList.add("active")
    }
    else if(pathname == "/admin/flag-puzzle-game/add"){
      document.getElementById("game-management").classList.add("active")
      document.getElementById("collapseOne").classList.add("show")
      document.getElementById("create-flag-puzzle-game").classList.add("active")
    }
    else if(pathname == "/admin/flag-puzzle-game/manage"){
      document.getElementById("game-management").classList.add("active")
      document.getElementById("collapseOne").classList.add("show")
      document.getElementById("manage-flag-puzzle-game").classList.add("active")
    }
    else if(pathname == "/admin/test/add"){
      document.getElementById("quiz-management").classList.add("active")
      document.getElementById("collapseTwo").classList.add("show")
      document.getElementById("add-test").classList.add("active")
    }
    else if(pathname == "/admin/test/manage"){
      document.getElementById("quiz-management").classList.add("active")
      document.getElementById("collapseTwo").classList.add("show")
      document.getElementById("manage-quiz").classList.add("active")
    }
    else if(pathname == "/admin/result-management"){
      document.getElementById("result-management").classList.add("active")
    }
    else if(pathname == "/admin/content-management"){
      document.getElementById("content-management").classList.add("active")
    }
    else if(pathname == "/admin/blogs-management"){
      document.getElementById("blogs-management").classList.add("active")
    }
    else if(pathname == "/admin/analytics"){
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
