//Je refou les JS du switch de base 
document.getElementById("switch").addEventListener("click", changeText);

function changeText() {
    var checkbox = document.getElementById("switch");
    var comment = document.getElementById("comment");

    if (checkbox.checked) {

        chrome.storage.local.set({'etat_switch': true})
        comment.textContent = "ANONYME 🥷🏻";
        
    } else {

        chrome.storage.local.set({'etat_switch': false})
        comment.textContent = "MY ASS IS OPEN 🍑";
    }

}


const flipBtn = document.querySelector(".flipBtn");
const btn = document.querySelector(".btn");
const circle = document.querySelector(".circle");

flipBtn.addEventListener("click", () => {
  btn.classList.toggle("move");
  circle.classList.toggle("expand");
});


const test = document.querySelector(".btn");

test.addEventListener("click", () => {
  btn.classList.toggle("move");
  circle.classList.toggle("expand");
});