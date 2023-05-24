
var colors = [
    "--dark-green",
    "--light-brown",
    "--light-red",
    "--light-teal",
    "--light-gray"
  ];
  
  var swiperZoom = new Swiper(".swiper-container", {
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "3",
    spaceBetween: 100,
  
    // loop: true,
    // autoplay: {
    //   delay: 1000,
    //   disableOnInteraction: false,
    // },
  
    // slidesOffsetAfter: 700,
    // slidesOffsetBefore: -500,
  
    effect: "coverflow",
    keyboard: true,
  
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 4,
      slideShadows: false
    }
  });
  
  swiperZoom.on("slideChange", function () {
    var index = this.activeIndex;
  
    $(".single-view-content").css({
      background: "var(" + colors[index % colors.length] + ")"
    });
  
    $(".team-info .team-info-item")
      .removeClass("active")
      .eq(this.activeIndex)
      .addClass("active");
  });
  
  $(".slideNext").click(function (argument) {
    swiperZoom.slideNext();
  });
  
  $(".slidePrev").click(function (argument) {
    swiperZoom.slidePrev();
  });