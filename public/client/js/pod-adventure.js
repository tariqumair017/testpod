const skip_guess_flag = document.querySelector(".skip-guess-flag")
const check_guess_flag = document.querySelector(".check-guess-flag")
const continue_guess_flag = document.querySelector(".continue-guess-flag")
const pod_adventure_footer = document.querySelector('.pod-adventure-footer')
const cross_guess_flag = document.querySelector('.cross-guess-flag')
const guess_flag_details = document.getElementById("guess-flag-details")
const mypopover_content = document.getElementById("mypopover-content")



var popover = new bootstrap.Popover(document.querySelector('.example-popover'), {
  container: 'body',
  html: true,
  trigger: 'hover',
  delay: { show: 0, hide: 100 },
  content: document.getElementById('mypopover-content'),
})


skip_guess_flag.onclick=()=>{
  skip_guess_flag.classList.add("d-none")
  cross_guess_flag.classList.remove("d-none")
  pod_adventure_footer.classList.add("guess-flag-footer")
  check_guess_flag.classList.add("d-none")
  continue_guess_flag.classList.remove("d-none")
  guess_flag_details.classList.remove("d-none")
}

