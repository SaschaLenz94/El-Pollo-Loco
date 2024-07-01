function startGame() {
  document.getElementById("start").style.display = "none";
  document.getElementById("canvas").style.display = "block";
}

function gameOver() {
  document.getElementById("canvas").style.display = "none";
  document.getElementById("progress-bar").style.display = "none";
  document.getElementById("looseDiv").style.display = "block";
  clearAllIntervals();
}

function winningGame() {
  music.pause();
  document.getElementById("canvas").style.display = "none";
  document.getElementById("progress-bar").style.display = "none";
  document.getElementById("winDiv").style.display = "block";
  clearAllIntervals();
}

function restart() {
  music.pause();
  document.getElementById("looseDiv").style.display = "none";
  document.getElementById("progress-bar").style.display = "none";
  document.getElementById("winDiv").style.display = "none";
  initGame();
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * open the info window for the Settings
 */
function openInfoPopup() {
  var popup = document.getElementById("infoPopup");

  if (popup.style.display === "block") {
    popup.style.display = "none";
    document.removeEventListener("click", closeInfoPopupOutside);
  } else {
    popup.style.display = "block";
    document.addEventListener("click", closeInfoPopupOutside);
  }
}
/**
 * close the window with an eventlistener and remove the eventlistener
 */
function closeInfoPopupOutside(event) {
  var popup = document.getElementById("infoPopup");
  var infoButton = document.getElementById("infoButton");

  if (!popup.contains(event.target) && event.target !== infoButton) {
    popup.style.display = "none";
    document.removeEventListener("click", closeInfoPopupOutside);
  }
}
