//test
chrome.runtime.onInstalled.addListener(function() {
  chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
    chrome.tabs.executeScript(details.tabId, { file: 'content.js' });
  });
});




chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.etat_switch !== undefined) {
      // Stockez l'état du switch dans le stockage local
      chrome.storage.local.set({ 'etat_switch': request.etat_switch });
      
      // Envoyez un message à la page active
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { 'etat_switch': request.etat_switch });
      });
  }
});


// Add listener for messages from popup.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.etat_switch !== undefined) {
    // Store the checkbox state in local storage
    chrome.storage.local.set({ 'etat_switch': request.etat_switch });
  }
});

