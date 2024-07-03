function onRefresh() {
  alert("La page a été rafraîchie");
  // Ajoutez ici le code que vous voulez exécuter
}

// Vérification si la page est rechargée
window.addEventListener('beforeunload', function (event) {
  // Détection si la page est rechargée
  sessionStorage.setItem('is_reloaded', 'true');
});




function performActionBasedOnSwitchState(isSwitchOn) {
  if (isSwitchOn) {

    // Si le switch est ON
    console.log('Switch is ON. LETZ GOOOOOOOOOOOOOOOOOOOO  ' + isSwitchOn);
    

    //change useragent from Header
    // Call the funciton in background.js
    chrome.runtime.sendMessage({ action: 'BackgroundFunction' }, function(useragent) { // pas chrome.tabs mais chrome.runtime car on envoie le msg a background 
      console.log('Response from background.js:', useragent);
      let JSuseragent = useragent;
      //ChangeJS(JSuseragent); MARCHE PLUS AVEC V3 faut mettre un nonce
    });

    
    //delete cookies
    document.cookie.split(";").forEach(function(c) {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    

  } else {
    //bah s'il l'est pas connard
    console.log('Switch is OFF  ' + isSwitchOn);

    chrome.storage.local.set({ 'etat_switch': false });

    chrome.runtime.sendMessage({ action: 'StopBackgroundFunction' }, function(response) {

      console.log('Response from background.js:', response);
    });


  }
}



function punycode() {
  var domain = window.location.hostname;
  
  // Lancer punycode.js
  if (containsPunycode(domain)) {
    console.log("NORMAL !!!!!!  " + domain)

  } else {
    console.log("PUNYCODE !!!!!!")
    alert("punycode.js returned false");
  }
}


// Add listener for messages de popup.js
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  // Vérifie si le message contient l'état du switch
  if (message.etat_switch !== undefined) {
    var isSwitchOn = message.etat_switch;

    console.log("État du switch reçu dans content.js: " + isSwitchOn);

    //punnycode check
    punycode()

    //lance les actions en fonction de letat du switch
    performActionBasedOnSwitchState(isSwitchOn);
    //reload for take effect hehe
    window.location.reload();
    
  }
});



// Check if chrome.tabs is defined before using it
if (chrome.tabs) {
  // Listen for tab updates to restore the checkbox state
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.storage.local.get('etat_switch', function(data) {
      var checkboxState = data.etat_switch;
      chrome.tabs.sendMessage(tabId, { 'etat_switch': checkboxState });
    });
  });
}



// FONCTION FOR THIS BROKEN SHITTY CODE SRX JVAI CLAQUER 

// Funciton for change navigator properties  
function setNavigatorProperty(propertyName, propertyValue) {
  Object.defineProperty(navigator, propertyName, {
    value: propertyValue,
    writable: false,
    configurable: false,
    enumerable: true
  });

  // Crée un nouvel objet avec la propriété spécifiée pour navigator
  window.navigator = Object.create(navigator, {
    [propertyName]: {
      value: propertyValue,
      writable: false,
      configurable: false,
      enumerable: true
    }
  });
}

// Change JS entities 
function ChangeJS(JSuseragent) {
  // Make a list with all important navigator properties
  var funct_list = ["userAgent", "platform", "appCodeName", "appVersion", "appName", "gpu", "plugins", "language", "doNotTrack", "cookieEnabled", "hardwareConcurrency"];

  // For each function in the list
  funct_list.forEach(function(funct) {

    if (funct == 'userAgent') {
      var value = JSuseragent;
      console.log(value)

    }
    else {
      var value = "💀💀💀";
    }

    // Crée un nouvel élément script
    var script = document.createElement('script');

    // Ajoute le code du script pour tout le reste
    script.textContent = '(' + setNavigatorProperty.toString() + ')("' + funct + '", "' + value + '");';

    // Ajoute le script à la page
    (document.head || document.documentElement).appendChild(script);

    // Supprime l'élément script pour éviter tout impact sur la page
    script.parentNode.removeChild(script);
  });
}
