/*  
SCRIPT DU GIT EN TEST



CA MARCHE !!!!!!!!!!!!!!!!

*/
let webRequestListener;
let BaseOS
/*
chrome.runtime.onInstalled.addListener(function() {
  chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
    chrome.tabs.executeScript(details.tabId, { file: 'content.js' });
  });
});

*/





// viré : ça réinjectait content.js a la mano a CHAQUE navigation pour rien, le manifest le fait deja tout seul (content_scripts, document_start, <all_urls>)
// en double comme ça servait a rien, et en plus ça plantait "Erreur d'injection du script de contenu" sur les pages ou on a pas le droit d'injecter (chrome://, Web Store, autres extensions...)


chrome.action.onClicked.addListener(function() {
  chrome.windows.create({'url': 'popup.html', 'type': 'popup', 'width': 500, 'height': 600});
});


//un jour j'arriverai à coder cette merde 


// declaration en globale pour pas que il soit limiter au bloc et pouvoir le renvoyer dans la console user
let randomUserAgent
let final



// listen event webRequest for intercept request
async function changeHeaderListener() {
      let CustomHeaderUA
      let varOS
      let secchuamobile
      let acceptlanguage
      let acceptvalue
      let newRules


      //met le mode de fonctionnement sur le choix user
      //avant le reste de la fonction continuait direct sans attendre ce get (callback async) du coup BaseOS avait tjr 1 requête de retard, on await maintenant pour avoir la bonne valeur direct
      const uaTypeResult = await chrome.storage.sync.get(['UAtype']);
      BaseOS = uaTypeResult.UAtype
      console.log("BaseOS choisi : " + BaseOS)





      // Modifie le User-Agent dans les en-têtes de la requête
      // definie dans une var l'actuel type de device pour changement header cohérent
      //For OS detection
      const os_list = ["Android", "Chrome OS", "Chromium OS", "iOS", "macOS", "Windows", "Unknown"]; //tout sauf linux casse les couilles 
      var randomOS = Math.floor(Math.random() * os_list.length);
      
      varOS = os_list[randomOS]
        
      



      //For useragent
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


        if (BaseOS == undefined) {
          BaseOS = "PC";
          console.log("OS de base non détecté, OS par défaut : PC")
        }
        
        if (BaseOS == "PC") {
          randomUserAgent = Math.floor(Math.random() * PCsuserAgent_list.length);
          //pour utiliser sa valeure plus tard
          final = PCsuserAgent_list[randomUserAgent];
          CustomHeaderUA = final
        }
        if (BaseOS == "Smartphone") {
          randomUserAgent = Math.floor(Math.random() * PhoneuserAgent_list.length);
          final = PhoneuserAgent_list[randomUserAgent];
          CustomHeaderUA = final
        }
        if (BaseOS == "Autre") {
          randomUserAgent = Math.floor(Math.random() * OtheruserAgent_list.length);
          final = OtheruserAgent_list[randomUserAgent];
          CustomHeaderUA = final

        }
        if (BaseOS == "Bot") {
          randomUserAgent = Math.floor(Math.random() * BotsuserAgent_list.length);
          final = BotsuserAgent_list[randomUserAgent];
          CustomHeaderUA = final

        }
      //hophop dans le chrome storage pour l'afficher sur cette si belle interface sa race 
      chrome.storage.local.set({ 'newheaders': CustomHeaderUA }, function() {
        console.log('New Headers save in chrome storage : '+ CustomHeaderUA);
      });
        
      

      // for sec-ch-ua-mobile
      //For know if mobile device or not 
      const mobile_list = ["0", "1"];
      var randomMobile = Math.floor(Math.random() * mobile_list.length);
      secchuamobile = mobile_list[randomMobile];
        
      
     // for Accept-Language
        //For Accept-Language most common
        acceptlanguage = "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7";
        
      
      //for accept
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
        acceptvalue = acceptHeaderValues_list[randomAccept];


      // pour que le spoofing JS (navigator, canvas, webgl, audio) soit cohérent avec le header envoyé, je construit un profil complet ici et je le garde en storage
      // varOS c'est la valeur pour le header Sec-Ch-Ua-Platform, mais navigator.platform veut un format different (Win32, MacIntel etc), d'ou la table de correspondance
      const platform_map = {
        "Android": "Linux armv8l",
        "Chrome OS": "Linux x86_64",
        "Chromium OS": "Linux x86_64",
        "iOS": "iPhone",
        "macOS": "MacIntel",
        "Windows": "Win32",
        "Unknown": "Win32"
      };

      // pour le faux vendor/renderer WebGL (evite de filer le vrai GPU de la machine)
      const webgl_profiles_list = [
        { vendor: "Google Inc. (Intel)", renderer: "ANGLE (Intel, Intel(R) UHD Graphics 620 Direct3D11 vs_5_0 ps_5_0, D3D11)" },
        { vendor: "Google Inc. (NVIDIA)", renderer: "ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 Direct3D11 vs_5_0 ps_5_0, D3D11)" },
        { vendor: "Google Inc. (AMD)", renderer: "ANGLE (AMD, AMD Radeon RX 580 Direct3D11 vs_5_0 ps_5_0, D3D11)" },
        { vendor: "Apple Inc.", renderer: "Apple M1" },
        { vendor: "Google Inc. (Google)", renderer: "ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero) (0x0000C0DE)), SwiftShader driver)" }
      ];
      const randomWebgl = webgl_profiles_list[Math.floor(Math.random() * webgl_profiles_list.length)];

      const hardwareConcurrency_list = [2, 4, 6, 8, 12, 16];
      const deviceMemory_list = [2, 4, 8];

      const spoofProfile = {
        userAgent: CustomHeaderUA,
        platform: platform_map[varOS] || "Win32",
        language: "fr-FR",
        languages: ["fr-FR", "fr", "en-US", "en"],
        hardwareConcurrency: hardwareConcurrency_list[Math.floor(Math.random() * hardwareConcurrency_list.length)],
        deviceMemory: deviceMemory_list[Math.floor(Math.random() * deviceMemory_list.length)],
        maxTouchPoints: (BaseOS == "Smartphone") ? (Math.floor(Math.random() * 5) + 1) : 0,
        webglVendor: randomWebgl.vendor,
        webglRenderer: randomWebgl.renderer
      };

      // storage.local plutot que sync, ce profil est propre à cette session, pas la peine de le sync entre appareils
      chrome.storage.local.set({ 'spoofProfile': spoofProfile }, function() {
        console.log('Spoof profile save in chrome storage : ', spoofProfile);
      });


        newRules =   [{
          "id": 1,
          "priority": 1,
          "action": {
            "type": "modifyHeaders",
            "requestHeaders": [
              {
                "operation": "set",
                "header": "User-Agent",
                "value": CustomHeaderUA
              },
              {
                "operation": "set",
                "header": "Sec-Ch-Ua-Platform",
                "value": varOS
              },
              {
                "operation": "set",
                "header": "Accept",
                "value": acceptvalue
              },
              {
                "operation": "set",
                "header": "Accept-Language",
                "value": acceptlanguage
              },
              {
                "operation": "set",
                "header": "sec-ch-ua-mobile",
                "value": secchuamobile
              }
            ]
          },
          "condition": {
            "urlFilter": "*",
            "resourceTypes": ["main_frame", "sub_frame", "xmlhttprequest"]
          }
        }
        ]
        //on attend que la regle soit bien posée avant de continuer (sinon content.js reload la page avant que le nouveau header soit actif)
        await updateRules(newRules)



      }

    // Fonction pour mettre à jour les règles directement dans rules.json
    function updateRules(newRules) {

      // Structure de l'objet UpdateRequest
      const updateRequest = {
        removeRuleIds: [1], // Supprimer l'ancienne regle
        addRules: newRules,
      };

      // Appel  chrome.declarativeNetRequest.updateDynamicRules
      //renvoie une Promise pour pouvoir l'await depuis changeHeaderListener
      return new Promise((resolve) => {
        chrome.declarativeNetRequest.updateDynamicRules(updateRequest, () => {
          if (chrome.runtime.lastError) {
            console.error("Erreur lors du rechargement des règles :", chrome.runtime.lastError.message);
          } else {
            console.log("Les règles ont été MAJ:", newRules);
          }
          resolve();
        });
      });



      // nouvelles regles
      console.log("HMM Bah ouais " + varOS)



    //for stop listener after changeHeader if user want to reset headers
    return { requestHeaders: CustomHeaderUA};
  };




  //si ça marche pas jsuis la reine des putes 
  // Fonction pour remove les rules
  function removeRules() {
    // Structure de l'objet UpdateRequest
    const updateRequest = {
      removeRuleIds: [1] // Supprimer l'ancienne regle
    };
  
    // Appel  chrome.declarativeNetRequest.updateDynamicRules
    chrome.declarativeNetRequest.updateDynamicRules(updateRequest, () => {
      if (chrome.runtime.lastError) {
        console.error("Erreur lors du remove des règles :", chrome.runtime.lastError.message);
      } else {
        console.log("Les règles ont été viré chef !");
      }
    });
  }



// LE SPOOFING JS (navigator, canvas, webgl, audiocontext, webrtc)
// avant y'avait ChangeJS dans content.js mais ça marche plus depuis MV3 (bloqué par la CSP, il fallait un nonce sur le script injecté)
// donc on fait plus propre : chrome.scripting.executeScript avec world: 'MAIN' qui execute direct dans le contexte JS de la page
// (obligé, sinon nos overrides sont dans le monde isolé du content script et le site les voit jamais)

// cette fonction tourne DANS LA PAGE, pas dans le content script, donc pas d'accès a chrome.* ici, tout doit lui être passé en argument
function applyFingerprintSpoof(profile) {
  try {

    // ===== NAVIGATOR =====
    function fakeProp(obj, prop, value) {
      try {
        Object.defineProperty(obj, prop, {
          get: function () { return value; },
          configurable: true
        });
      } catch (e) {}
    }

    fakeProp(navigator, 'userAgent', profile.userAgent);
    fakeProp(navigator, 'appVersion', profile.userAgent.replace('Mozilla/', ''));
    fakeProp(navigator, 'platform', profile.platform);
    fakeProp(navigator, 'language', profile.language);
    fakeProp(navigator, 'languages', Object.freeze(profile.languages));
    fakeProp(navigator, 'hardwareConcurrency', profile.hardwareConcurrency);
    fakeProp(navigator, 'maxTouchPoints', profile.maxTouchPoints);
    if ('deviceMemory' in navigator) fakeProp(navigator, 'deviceMemory', profile.deviceMemory);
    fakeProp(navigator, 'doNotTrack', '1');

    // ===== CANVAS FINGERPRINT =====
    // bruit stable pour la session (base sur un seed), sinon un site qui lit 2 fois le meme canvas voit 2 résultats différents et sait direct qu'on triche
    var canvasSeed = Math.random();
    function seededNoise(x, y) {
      var n = Math.sin(x * 12.9898 + y * 78.233 + canvasSeed * 1000) * 43758.5453;
      return Math.floor((n - Math.floor(n)) * 3) - 1; // -1, 0 ou 1, invisible a l'oeil
    }

    function noiseCanvas(canvas) {
      try {
        var ctx = canvas.getContext('2d');
        if (!ctx) return; // canvas webgl ou deja utilisé autrement, on touche pas
        var w = canvas.width, h = canvas.height;
        if (w === 0 || h === 0) return;
        var imageData = ctx.getImageData(0, 0, w, h);
        var data = imageData.data;
        for (var i = 0; i < data.length; i += 4) {
          var pixel = i / 4;
          var x = pixel % w;
          var y = Math.floor(pixel / w);
          var n = seededNoise(x, y);
          data[i] = data[i] + n;
          data[i + 1] = data[i + 1] + n;
          data[i + 2] = data[i + 2] + n;
        }
        ctx.putImageData(imageData, 0, 0);
      } catch (e) {}
    }

    var origToDataURL = HTMLCanvasElement.prototype.toDataURL;
    HTMLCanvasElement.prototype.toDataURL = function () {
      noiseCanvas(this);
      return origToDataURL.apply(this, arguments);
    };

    var origToBlob = HTMLCanvasElement.prototype.toBlob;
    HTMLCanvasElement.prototype.toBlob = function () {
      noiseCanvas(this);
      return origToBlob.apply(this, arguments);
    };

    var origGetImageData = CanvasRenderingContext2D.prototype.getImageData;
    CanvasRenderingContext2D.prototype.getImageData = function () {
      var imageData = origGetImageData.apply(this, arguments);
      var data = imageData.data;
      for (var i = 0; i < data.length; i += 4) {
        var pixel = i / 4;
        var x = pixel % imageData.width;
        var y = Math.floor(pixel / imageData.width);
        var n = seededNoise(x, y);
        data[i] = data[i] + n;
        data[i + 1] = data[i + 1] + n;
        data[i + 2] = data[i + 2] + n;
      }
      return imageData;
    };

    // ===== WEBGL FINGERPRINT =====
    // renvoie un faux vendor/renderer au lieu du vrai GPU de la machine (UNMASKED_VENDOR_WEBGL / UNMASKED_RENDERER_WEBGL)
    function patchWebglContext(proto) {
      if (!proto) return;
      var origGetParameter = proto.getParameter;
      proto.getParameter = function (param) {
        if (param === 37445) return profile.webglVendor;   // UNMASKED_VENDOR_WEBGL
        if (param === 37446) return profile.webglRenderer;  // UNMASKED_RENDERER_WEBGL
        if (param === 7936) return profile.webglVendor;    // VENDOR
        if (param === 7937) return profile.webglRenderer;  // RENDERER
        return origGetParameter.apply(this, arguments);
      };
    }
    if (window.WebGLRenderingContext) patchWebglContext(WebGLRenderingContext.prototype);
    if (window.WebGL2RenderingContext) patchWebglContext(WebGL2RenderingContext.prototype);

    // ===== AUDIOCONTEXT FINGERPRINT =====
    // meme principe que le canvas : un poil de bruit pour casser le hash, sans niquer le son pour de vrai
    var audioSeed = (Math.random() - 0.5) * 0.0001;

    if (window.AudioBuffer) {
      var origGetChannelData = AudioBuffer.prototype.getChannelData;
      AudioBuffer.prototype.getChannelData = function () {
        var data = origGetChannelData.apply(this, arguments);
        for (var i = 0; i < data.length; i += 100) { // pas la peine de bruiter chaque sample un sur 100 suffit largement
          data[i] = data[i] + audioSeed;
        }
        return data;
      };
    }

    if (window.AnalyserNode) {
      var origGetFloatFrequencyData = AnalyserNode.prototype.getFloatFrequencyData;
      AnalyserNode.prototype.getFloatFrequencyData = function (array) {
        origGetFloatFrequencyData.apply(this, arguments);
        for (var i = 0; i < array.length; i++) {
          array[i] = array[i] + audioSeed;
        }
      };
    }

    // ===== WEBRTC (fuite IP locale) =====
    // meme derriere un VPN, WebRTC peut balancer l'IP locale via les ICE candidates, on vire celles de type "host"
    var OrigRTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection;
    if (OrigRTCPeerConnection) {
      var PatchedRTCPeerConnection = function () {
        var pc = new OrigRTCPeerConnection(...arguments);

        pc.addEventListener('icecandidate', function (e) {
          if (e.candidate && e.candidate.candidate && e.candidate.candidate.indexOf('typ host') !== -1) {
            e.stopImmediatePropagation();
          }
        }, true);

        return pc;
      };
      PatchedRTCPeerConnection.prototype = OrigRTCPeerConnection.prototype;
      window.RTCPeerConnection = PatchedRTCPeerConnection;
      if (window.webkitRTCPeerConnection) window.webkitRTCPeerConnection = PatchedRTCPeerConnection;
    }

  } catch (e) {
    console.error('ProtektUrAss spoof error :', e);
  }
}

// declenché a chaque navigation (page ET iframes), tant que le switch est ON
chrome.webNavigation.onCommitted.addListener((details) => {
  chrome.storage.sync.get('etat_switch', (syncData) => {
    if (!syncData.etat_switch) return;

    chrome.storage.local.get('spoofProfile', (localData) => {
      if (!localData.spoofProfile) return;

      chrome.scripting.executeScript({
        target: { tabId: details.tabId, frameIds: [details.frameId] },
        world: 'MAIN',
        injectImmediately: true,
        func: applyFingerprintSpoof,
        args: [localData.spoofProfile]
      }, () => {
        if (chrome.runtime.lastError) {
          console.error("Erreur injection spoof JS :", chrome.runtime.lastError.message);
        }
      });
    });
  });
});


//AVEC CA JE CHANGE LE HEADERS
chrome.runtime.onInstalled.addListener(() => {
  // Confirmer que les règles sont bien installées
  console.log("Rules bien installée chef");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'BackgroundFunction') {
    //reset des rules
    removeRules()

    console.log("BackgroundFunction active !")

    // avant ça relançait changeHeaderListener a CHAQUE requête (onBeforeSendHeaders), du coup le User-Agent changeait en plein milieu du chargement d'une page
    // maintenant on génère le profil UNE seule fois a l'activation, puis on attend que la regle soit posée avant de repondre (sinon la page reload avant que le nouveau header soit actif)
    changeHeaderListener().then(() => {
      // Envoyer le statut des règles
      chrome.declarativeNetRequest.getEnabledRulesets((ruleSets) => {
        sendResponse({ enabledRuleSets: ruleSets });
      });
    });

    return true; // Indique que sendResponse sera asynchrone


  }
  if (request.action === 'StopBackgroundFunction') {

    //pour eteindre l'extention

    sendResponse({ message: 'Header reset !' });

    //reset des rules
    removeRules()

  }
});


// Add listener for messages from popup.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.etat_switch !== undefined) {
    // Store the checkbox state in local storage
    chrome.storage.local.set({ 'etat_switch': request.etat_switch });
  }
});