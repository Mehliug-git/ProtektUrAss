document.getElementById("switch").addEventListener("click", changeText);

function changeText() {
    var checkbox = document.getElementById("switch");
    var comment = document.querySelector(".comment");

    if (checkbox.checked) {

        chrome.storage.sync.set({'etat_switch': true})
        comment.textContent = "ANONYME 🥷🏻";
        


    } else {

        chrome.storage.sync.set({'etat_switch': false})
        comment.textContent = "MY ASS IS OPEN 🍑";
    }

}
