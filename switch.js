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