import fullpage from 'fullpage.js'

window.onload = function() {
  new fullpage('#fullpage', {
    //options here
    autoScrolling:true,
    scrollHorizontally: true
  });
}