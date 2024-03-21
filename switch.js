document.getElementById("switch").addEventListener("click", changeText);

function changeText() {
    var checkbox = document.getElementById("switch");
    var comment = document.querySelector(".comment");
    if (checkbox.checked) {
        comment.textContent = "ANONYME";
    } else {
        comment.textContent = "MY ASS IS OPEN";
    }

}


chrome.storage.sync.get('etat_switch', function(data) {
    var isSwitchOn = data.etat_switch || false;
  
    // Applique l'animation en fonction de l'état actuel du switch
    if (isSwitchOn) {
        //pour checked restart pour le faire aller de on a off et reverse pour linverse

        animate.reverse();
        animateBackground.reverse();
    }
})