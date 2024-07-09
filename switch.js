const flipBtn = document.querySelector(".flipBtn");
const btn = document.querySelector(".btn");
const circle = document.querySelector(".circle");
const btncircle = document.querySelector(".btn");


//Je refou les JS du switch de base 
document.getElementById("switch").addEventListener("click", changeText);

function changeText() {
    var checkbox = document.getElementById("switch");
    var comment = document.getElementById("comment");

    if (checkbox.checked) {

        chrome.storage.sync.set({'etat_switch': true})
        comment.textContent = "ANONYME 🥷🏻";

        //animation JS
        btn.classList.add("move");
        circle.classList.add("expand")
        
    } else {

        chrome.storage.sync.set({'etat_switch': false})
        comment.textContent = "MY ASS IS OPEN 🍑";
                
        //animation JS
        btn.classList.remove("move");
        circle.classList.remove("expand")
        
    }

}



