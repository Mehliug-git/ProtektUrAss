document.addEventListener('DOMContentLoaded', function() {
  // Récupère la référence de l'élément switch par son ID
  var customSwitch = document.getElementById('customSwitch');


  console.log(customSwitch)

  // Vérifie si l'élément a été trouvé avant d'ajouter l'écouteur d'événements
  if (customSwitch) {
    customSwitch.addEventListener('change', function() {
      // Récupère la référence de l'élément switch par son ID
      var checkbox = document.getElementById("switch");

      if (checkbox.checked) {
        var isSwitchOn = true;



      }else{

        var isSwitchOn = false;
      }

      console.log("Switch changed popup: " + isSwitchOn);

      // Sauvegarde l'état du switch
      chrome.storage.sync.set({ 'etat_switch': isSwitchOn });
      // Obtient l'onglet actif
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        // Envoie un message à l'onglet actif AKA content.js
        chrome.tabs.sendMessage(tabs[0].id, { 'etat_switch': isSwitchOn });
      }); 
    });
  }  
});



// Ajoute une section pour gérer la sortie console depuis content.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Si le message contient des données de User Agent personnalisé, affichez-les dans la console
  if (request.etat_switchLog) {
    console.log(request.etat_switchLog);
  }
});



function customalert(message, time) {
  var alerte = document.getElementById('custom-alert');
  alerte.innerText = message;
  alerte.style.display = 'block';

  setTimeout(function() {
    alerte.style.display = 'none';
  }, time);
}



//pour afficher le nouveau User-Agent sur popup.html
chrome.storage.local.get(['newheaders']).then((result) => { 
  const new_infos = result.newheaders;


  // Assigner la valeur à l'élément avec l'id 'Headers' (sous forme de texte)
  document.getElementById('Headers').innerText = result.newheaders;
  console.log("A Afficher sur lextention : " + result.newheaders)

    



  //pour le boutton Copier pour avoir tt les infos des changements:
  document.getElementById('copy').addEventListener('click', function() {

    // element textarea temp pour copier le texte
    var textarea = document.createElement('textarea');
    textarea.value = new_infos;
    document.body.appendChild(textarea);

    // selectionne le txt a mettre dans le clipboard
    textarea.select();
    document.execCommand('copy');

    // remove tmp element textarea
    document.body.removeChild(textarea);

    // affiche un msg pour le user
    customalert("Infos copiée avec succès !", 2000);
  });
  });



chrome.storage.sync.get('etat_switch', function(data) {
  isSwitchOn = data.etat_switch



  console.log('switchON : '+ isSwitchOn)
  var checkbox = document.getElementById("switch"); 
  const btn = document.querySelector(".btn");
  const circle = document.querySelector(".circle");
  var comment = document.getElementById("comment");


  if (isSwitchOn == true) {

    chrome.storage.sync.set({ 'etat_switch': true });
    checkbox.checked = true


    //animation JS ici aussi pour quand on rouvre l'app le btn soit synchro
    comment.textContent = "ANONYME 🥷🏻";

    btn.classList.add("move");
    circle.classList.add("expand")
  }

  else {

    chrome.storage.sync.set({ 'etat_switch': false });
    checkbox.checked = false


    //animation JS
    comment.textContent = "MY ASS IS OPEN 🍑";

    btn.classList.remove("move");
    circle.classList.remove("expand")

  }
});