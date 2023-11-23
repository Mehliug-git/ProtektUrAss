/*
chrome.runtime.onInstalled.addListener(function() {
  chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
    chrome.tabs.executeScript(details.tabId, { file: 'content.js' });
  });
});
*/

// for listen if BackgroundFunction is called from content.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'BackgroundFunction') {
      // when BackgroundFunction is call from content.js :
      changeHeader();
  }
});

function changeHeader() {

  // listen event webRequest for intercept request
  chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
      // Modifie le User-Agent dans les en-têtes de la requête
      for (var i = 0; i < details.requestHeaders.length; ++i) {
        details.requestHeaders[i].value = 'HEHE';

        //For useragent
        if (details.requestHeaders[i].name === 'User-Agent') {
          details.requestHeaders[i].value = 'BOOM';
          
        } else if (details.requestHeaders[i].name === 'sec-ch-ua-platform') {
          //For OS detection

          details.requestHeaders[i].value = 'BOOM';
          
        }
        

      }
      return { requestHeaders: details.requestHeaders };
    },
    { urls: ["<all_urls>"] }, // Intercepte toutes les URLs
    ["blocking", "requestHeaders"]
  );

}





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

