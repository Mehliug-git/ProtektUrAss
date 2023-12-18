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