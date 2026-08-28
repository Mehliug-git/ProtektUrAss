document.addEventListener('DOMContentLoaded', function() {
  // Récupère la référence de l'élément switch par son ID
  var customSwitch = document.getElementById('customSwitch');


  console.log(customSwitch)

  // Vérifie si l'élément a été trouvé avant d'ajouter l'écouteur d'événements
  if (customSwitch) {
    customSwitch.addEventListener('change', function(event) {
      // le customSwitch contient AUSSI la checkbox du petit menu déroulant (settings/mail), et son 'change' bubble jusqu'ici
      // du coup ouvrir juste le menu redéclenchait tout le block en dessous (et reload la page pour rien) si on filtrait pas sur le bon element
      if (event.target.id !== 'switch') return;

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
        chrome.tabs.sendMessage(tabs[0].id, { 'etat_switch': isSwitchOn }).catch(function(error) {
          // ça arrive si l'onglet actif a pas de content script (page chrome://, nouvel onglet, page ouverte avant le chargement de l'extension...)
          // "Could not establish connection. Receiving end does not exist." sinon ça plantait en Uncaught (in promise) pour rien
          // dans ce cas on previent quand meme background.js en direct, sinon la protection s'active jamais pour de vrai sur cet onglet
          console.warn('Onglet actif sans content script, on previent background.js en direct :', error);
          chrome.runtime.sendMessage({ action: isSwitchOn ? 'BackgroundFunction' : 'StopBackgroundFunction' });
        });
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
  // avant ça affichait littéralement "undefined" tant que le switch avait jamais été activé, on met un texte correct a la place
  document.getElementById('Headers').innerText = new_infos ? new_infos : "Aucun header généré pour l'instant, active le switch !";
  console.log("A Afficher sur lextention : " + result.newheaders)





  //pour le boutton Copier pour avoir tt les infos des changements:
  document.getElementById('copy').addEventListener('click', function() {

    if (!new_infos) {
      customalert("Rien à copier, active d'abord le switch !", 2000);
      return;
    }

    // navigator.clipboard car document.execCommand('copy') est deprecated et marche plus toujours depuis une popup d'extension
    navigator.clipboard.writeText(new_infos).then(function() {
      // affiche un msg pour le user
      customalert("Infos copiée avec succès !", 2000);
    }).catch(function() {
      // fallback si jamais le clipboard API est bloqué : element textarea temp pour copier le texte
      var textarea = document.createElement('textarea');
      textarea.value = new_infos;
      document.body.appendChild(textarea);

      // selectionne le txt a mettre dans le clipboard
      textarea.select();
      document.execCommand('copy');

      // remove tmp element textarea
      document.body.removeChild(textarea);

      customalert("Infos copiée avec succès !", 2000);
    });
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
    comment.textContent = "ANONYME 🍆💦";

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