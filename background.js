// Voir aussi pour mettre un mode troll pour pouvoir mettre des trucs a la con dedans genre changer tout les headers par des nom random
// tfacon s'il sont pas OK je le   fait en soumsoum 
/*
NOTES 

J'ai fait en sorte que le useragent soit proche de celui déjà used 

JS entities en cours de build UA OK

*/

let webRequestListener;

chrome.runtime.onInstalled.addListener(function() {
  chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
    chrome.tabs.executeScript(details.tabId, { file: 'content.js' });
  });
});


//un jour j'arriverai à coder cette merde 


// declaration en globale pour pas que il soit limiter au bloc et pouvoir le renvoyer dans la console user
let randomUserAgent
let BaseOS
let final

// listen event webRequest for intercept request
let changeHeaderListener = function(details) {

    // Modifie le User-Agent dans les en-têtes de la requête
    for (var i = 0; i < details.requestHeaders.length; ++i) {

      // definie dans une var l'actuel type de device pour changement header cohérent
      if (details.requestHeaders[i].name === 'sec-ch-ua-platform') {

        if (details.requestHeaders[i].value === 'Windows') {
          BaseOS = "PC";
        }

        if (details.requestHeaders[i].value === 'Linux') {
          BaseOS = "PC";
        }

        if (details.requestHeaders[i].value === 'macOS') {
          BaseOS = "PC";
        }

        if (details.requestHeaders[i].value === 'iOS') {
          BaseOS = "Phone";
        }

        
        if (details.requestHeaders[i].value === 'Android') {
          BaseOS = "Phone";
        }

        else {
          BaseOS = "PC";
        }

        //For OS detection
        const os_list = ["Android", "Chrome OS", "Chromium OS", "iOS", "macOS", "Windows", "Unknown"]; //tout sauf linux casse les couilles 
        var randomOS = Math.floor(Math.random() * os_list.length);
        details.requestHeaders[i].value = os_list[randomOS];
        
      }



      //For useragent
      if (details.requestHeaders[i].name === 'User-Agent') {

        const PCsuserAgent_list = [
        //Windows
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0	",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.3",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.3",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.57",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 OPR/104.0.0.0",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36 Edg/90.0.818.66",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.81",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36 Edg/84.0.522.52",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.57",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.50",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
        //Linux
        "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/119.0",
        "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/113.0",
        "Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0",
        "Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.3",
        "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/119.0",
        "Mozilla/5.0 (X11; Linux aarch64; rv:91.0) Gecko/20100101 Firefox/91.0",
        "Mozilla/5.0 (X11; Linux i686 (x86_64)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36",
        "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/116.0",

        //Apple
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/118.",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36	",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.1",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9",
        ]

        const PhoneuserAgent_list = [
          //Iphone X
        "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
        // Samsung Galaxy S22 5G
        'Mozilla/5.0 (Linux; Android 13; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 13; SM-S901U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
        // Samsung Galaxy S10
        'Mozilla/5.0 (Linux; Android 12; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 12; SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
        // Google Pixel 6
        'Mozilla/5.0 (Linux; Android 13; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
        // Google Pixel 6a
        'Mozilla/5.0 (Linux; Android 13; Pixel 6a) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
        // Motorola Moto G Pure
        'Mozilla/5.0 (Linux; Android 12; moto g pure) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
        // Motorola Moto G Stylus 5G
        'Mozilla/5.0 (Linux; Android 12; moto g stylus 5G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
        // Redmi Note 9 Pro
        'Mozilla/5.0 (Linux; Android 12; Redmi Note 9 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
        // Redmi Note 8 Pro
        'Mozilla/5.0 (Linux; Android 11; Redmi Note 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
        // Huawei P30 Pro
        'Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
        // Huawei P30 lite
        'Mozilla/5.0 (Linux; Android 10; MAR-LX1A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
        // OnePlus Nord N200 5G
        'Mozilla/5.0 (Linux; Android 12; DE2118) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36']

        const OtheruserAgent_list = [
        // Amazon Kindle 4
        'Mozilla/5.0 (X11; U; Linux armv7l like Android; en-us) AppleWebKit/531.2+ (KHTML, like Gecko) Version/5.0 Safari/533.2+ Kindle/3.0+',
        // Amazon Kindle 3
        'Mozilla/5.0 (Linux; U; en-US) AppleWebKit/528.5+ (KHTML, like Gecko, Safari/528.5+) Version/4.0 Kindle/3.0 (screen 600x800; rotate)',
        // Google ADT-2
        'Dalvik/2.1.0 (Linux; U; Android 9; ADT-2 Build/PTT5.181126.002)',
        // Chromecast
        'Mozilla/5.0 (CrKey armv7l 1.5.16041) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.0 Safari/537.36',
        // Roku Ultra
        'Roku4640X/DVP-7.70 (297.70E04154A)',
        // Minix NEO X5
        'Mozilla/5.0 (Linux; U; Android 4.2.2; he-il; NEO-X5-116A Build/JDQ39) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30',
        // Amazon AFTWMST22
        'Mozilla/5.0 (Linux; Android 9; AFTWMST22 Build/PS7233; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/88.0.4324.152 Mobile Safari/537.36',
        // Amazon 4K Fire TV
        'Mozilla/5.0 (Linux; Android 5.1; AFTS Build/LMY47O) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/41.99900.2250.0242 Safari/537.36',
        // Google Nexus Player
        'Dalvik/2.1.0 (Linux; U; Android 6.0.1; Nexus Player Build/MMB29T)',
        // Apple TV 6th Gen 4K
        'AppleTV11,1/11.1',
        // Apple TV 5th Gen 4K
        'AppleTV6,2/11.1',
        // Apple TV 4th Gen
        'AppleTV5,3/9.1.1',
        // Playstation 5
        'Mozilla/5.0 (PlayStation; PlayStation 5/2.26) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Safari/605.1.15',
        // Playstation 4
        'Mozilla/5.0 (PlayStation 4 3.11) AppleWebKit/537.73 (KHTML, like Gecko)',
        // Playstation Vita
        'Mozilla/5.0 (PlayStation Vita 3.61) AppleWebKit/537.73 (KHTML, like Gecko) Silk/3.2',
        // Xbox One
        'Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Xbox; Xbox One) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/13.10586',
        // Nintendo Switch
        'Mozilla/5.0 (Nintendo Switch; WifiWebAuthApplet) AppleWebKit/601.6 (KHTML, like Gecko) NF/4.0.0.5.10 NintendoBrowser/5.1.0.13343',
        // Nintendo Wii U
        'Mozilla/5.0 (Nintendo WiiU) AppleWebKit/536.30 (KHTML, like Gecko) NX/3.0.4.2.12 NintendoBrowser/4.3.1.11264.US',
        // Nintendo 3DS
        'Mozilla/5.0 (Nintendo 3DS; U; ; en) Version/1.7412.EU']

        const BotsuserAgent_list = [
        // Google bot
        'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        // Bing bot
        'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
        // Yahoo! bot
        'Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)'
        ];

        if (BaseOS === undefined) {
          BaseOS = "PC";
          console.log("OS de base non détecté, OS par défaut : PC")
        }
        
        if (BaseOS === "PC") {
          randomUserAgent = Math.floor(Math.random() * PCsuserAgent_list.length);
          //pour utiliser sa valeure plus tard
          final = PCsuserAgent_list[randomUserAgent];
          details.requestHeaders[i].value = final
        }
        if (BaseOS === "Phone") {
          randomUserAgent = Math.floor(Math.random() * PhoneuserAgent_list.length);
          final = PhoneuserAgent_list[randomUserAgent];
          details.requestHeaders[i].value = final
        }
        if (BaseOS === "Other") {
          randomUserAgent = Math.floor(Math.random() * OtheruserAgent_list.length);
          final = OtheruserAgent_list[randomUserAgent];
          details.requestHeaders[i].value = final

        }
        if (BaseOS === "Bot") {
          randomUserAgent = Math.floor(Math.random() * BotsuserAgent_list.length);
          final = BotsuserAgent_list[randomUserAgent];
          details.requestHeaders[i].value = final

        }
        
      } 

      if (details.requestHeaders[i].name === 'sec-ch-ua-mobile') {
        //For know if mobile device or not 
        const mobile_list = ["0", "1"];
        var randomMobile = Math.floor(Math.random() * mobile_list.length);
        details.requestHeaders[i].value = mobile_list[randomMobile];
        
      }
      if (details.requestHeaders[i].name === 'Accept-Language') {
        //For Accept-Language most common
        details.requestHeaders[i].value = "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7";
        
      }
      if (details.requestHeaders[i].name === 'accept') {
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
    return { requestHeaders: details.requestHeaders};
  };


// for listen if BackgroundFunction is call from content.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'BackgroundFunction') {

      // Add changeHeaderListener listener for change header tdc
      chrome.webRequest.onBeforeSendHeaders.addListener(

        //lancement de la fonction pour changer les headers
        changeHeaderListener,
        { urls: ["<all_urls>"] },
        ["blocking", "requestHeaders"]
      );
      //final pour final UA connard
      sendResponse(final);
            
  }
  else if (request.action === 'StopBackgroundFunction') {

    chrome.webRequest.onBeforeSendHeaders.removeListener(changeHeaderListener);
    sendResponse({ message: 'Header reset successfully !' });
  }
});


/*
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.etat_switch !== undefined) {
      // fou l'état du switch dans le storage chrome
      chrome.storage.local.set({ 'etat_switch': request.etat_switch });
      
      // send msg page active
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { 'etat_switch': request.etat_switch });
      });
  }
});
*/

// Add listener for messages from popup.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.etat_switch !== undefined) {
    // Store the checkbox state in local storage
    chrome.storage.local.set({ 'etat_switch': request.etat_switch });
  }
});


