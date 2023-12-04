let webRequestListener;

chrome.runtime.onInstalled.addListener(function() {
  chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
    chrome.tabs.executeScript(details.tabId, { file: 'content.js' });
  });
});



// for listen if BackgroundFunction is call from content.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'BackgroundFunction') {

      chrome.webRequest.onBeforeSendHeaders.addListener(
        changeHeaderListener,
        { urls: ["<all_urls>"] },
        ["blocking", "requestHeaders"]
      );   

      sendResponse({ message: 'Header changed successfully !' });
            
  }
  else if (request.action === 'StopBackgroundFunction') {
    chrome.webRequest.onBeforeSendHeaders.removeListener(changeHeaderListener);
    sendResponse({ message: 'Header reset successfully !' });
  }
});



// listen event webRequest for intercept request
let changeHeaderListener = function(details) {
    // Modifie le User-Agent dans les en-têtes de la requête
    for (var i = 0; i < details.requestHeaders.length; ++i) {
      //For useragent
      if (details.requestHeaders[i].name === 'User-Agent') {
        const userAgent_list = [
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0",
          "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/5.0; Trident/5.0)",
          "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; MDDCJS)",
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393",
          "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)"
        ];
        var randomUserAgent = Math.floor(Math.random() * userAgent_list.length);
        details.requestHeaders[i].value = userAgent_list[randomUserAgent];
        
      } else if (details.requestHeaders[i].name === 'sec-ch-ua-platform') {
        //For OS detection
        const os_list = ["Android", "Chrome OS", "Chromium OS", "iOS", "Linux", "macOS", "Windows", "Unknown"];
        var randomOS = Math.floor(Math.random() * os_list.length);
        details.requestHeaders[i].value = os_list[randomOS];
        
      }
      else if (details.requestHeaders[i].name === 'sec-ch-ua-mobile') {
        //For know if mobile device or not 
        const mobile_list = ["0", "1"];
        var randomMobile = Math.floor(Math.random() * mobile_list.length);
        details.requestHeaders[i].value = mobile_list[randomMobile];
        
      }
      else if (details.requestHeaders[i].name === 'accept-language') {
        //For Accept-Language most common
        details.requestHeaders[i].value = "en-US";
        
      }
      else if (details.requestHeaders[i].name === 'accept') {
        //For know if mobile device or not 
        const acceptHeaderValues_list = [
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "text/html, application/xhtml+xml, image/jxr, */*",
          "text/html, application/xml;q=0.9, application/xhtml+xml, image/png, image/webp, image/jpeg, image/gif, image/x-xbitmap, */*;q=0.1"
        ];
        
        var randomAccept = Math.floor(Math.random() * acceptHeaderValues_list.length);
        details.requestHeaders[i].value = acceptHeaderValues_list[randomAccept];
        
      }
    }
    //for stop listener after changeHeader if user want to reset headers
    //chrome.webRequest.onBeforeSendHeaders.removeListener(changeHeaderListener);
    return { requestHeaders: details.requestHeaders };
  };




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
