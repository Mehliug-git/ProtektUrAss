document.addEventListener('DOMContentLoaded', function() {
  // Récupère la référence de l'élément switch par son ID
  var customSwitch = document.getElementById('customSwitch');

  // Vérifie si l'élément a été trouvé avant d'ajouter l'écouteur d'événements
  if (customSwitch) {
    customSwitch.addEventListener('click', function() {
      // Basculer la classe 'on' pour changer l'état visuel du switch
      customSwitch.classList.toggle('on');

      
      // Vérifie si le switch est en position 'on'
      var isSwitchOn = customSwitch.classList.contains('on');
      console.log("Switch changed: " + isSwitchOn);

      // Sauvegarde l'état du switch
      chrome.storage.sync.set({ 'etat_switch': isSwitchOn });

      // Obtient l'onglet actif
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        // Envoie un message à l'onglet actif
      chrome.tabs.sendMessage(tabs[0].id, { 'etat_switch': isSwitchOn });
      });
    });
  }

  // Récupère la référence de la case à cocher
  var switchElement = document.getElementById('toggleSwitch');

  // Vérifie si l'élément a été trouvé avant de lui ajouter l'écouteur d'événements
  if (switchElement) {
    switchElement.addEventListener('change', function() {
      // Vérifie si la case à cocher est cochée
      var isChecked = switchElement.checked;
      console.log("Checkbox changed: " + isChecked);

      // Sauvegarde l'état de la case à cocher
      chrome.storage.sync.set({ 'etat_switch': isChecked });

      // Obtient l'onglet actif
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        // Envoie un message à l'onglet actif
        chrome.tabs.sendMessage(tabs[0].id, { 'etat_switch': isChecked });
      });
    });

    // Obtient la valeur de etat_switch depuis le stockage Chrome sync
    chrome.storage.sync.get('etat_switch', function(data) {
      switchElement.checked = data.etat_switch || false;
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
chrome.storage.local.get(['newheaders'], function(result) {
  const new_infos = JSON.stringify(result.newheaders);
  console.log('Valeur actuelle est ' + new_infos);
  
  // trouve lee userAgent
  result.newheaders.forEach(function(header) {
    if (header.name === "User-Agent") {
      // Assigner la valeur à l'élément avec l'id 'Headers' (sous forme de texte)
      document.getElementById('Headers').innerText = header.value;
    }




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
    customalert("Infos copié avec succès !", 2000);
  });
  });
});













/*
chrome.storage.sync.get('newheaders', function(data) {
  var newheaders_data = data.newheaders; // Access the 'newheaders' property correctly
  console.log('data.newheaders: ', newheaders_data);
  if (newheaders_data) {
    document.getElementById('Headers').innerText = newheaders_data;
  }
});*/

