let portrait = window.matchMedia("(orientation: portrait)");
var elem = document.documentElement;
var btn = document.getElementById("test");
portrait.addEventListener("change", function(e) {
    if(e.matches) {
        // Portrait mode
    } else {
      btn.click();
      
        //openFullscreen();
        //console.log("FUllscreen")
    }
})




function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}