const play_video = document.getElementById("play-video")

const vid = document.querySelector(".about-video");

play_video.onclick=()=>{
    document.querySelector(".video-i").classList.add("d-none")
    vid.play()
  }

  vid.onclick=()=>{
    document.querySelector(".video-i").classList.toggle("d-none")
  }