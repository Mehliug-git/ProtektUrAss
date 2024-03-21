function performActionBasedOnSwitchState(isSwitchOn) {
  if (isSwitchOn == true) {
    // Si le switch est ON
    console.log('Switch is ON. LETZ GOOOOOOOOOOOOOOOOOOOO');
      //start all function


    //change useragent from Header
    // Call the funciton in background.js
    chrome.runtime.sendMessage({ action: 'BackgroundFunction' }, function(useragent) {
      console.log('Response from background.js:', useragent);
      let JSuseragent = useragent;
      ChangeJS(JSuseragent);
    });

    

    //delete cookies
    document.cookie.split(";").forEach(function(c) {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

  } else {
    //bah s'il l'est pas connard
    console.log('Switch is OFF');

    chrome.runtime.sendMessage({ action: 'StopBackgroundFunction' }, function(response) {
      console.log('Response from background.js:', response);
    });
  }
}


// Récupérez l'état du switch depuis le stockage local
chrome.storage.local.get('etat_switch', function(data) {
  const isSwitchOn = data.etat_switch || false;
  
  // Exécutez les actions en fonction de l'état du switch
  performActionBasedOnSwitchState(isSwitchOn);
});

// Function for knowing if the checkbox is checked on the active page 
function handleMessage(request) {
  if (request.etat_switch !== undefined) {
    // Store the checkbox state in local storage
    chrome.storage.local.set({ 'etat_switch': request.etat_switch });

    if (request.etat_switch) {
      // If checkbox is checked ONLY WHEN USER CLICK !!
      console.log('CHECKED // ON');
      //reload for take effect
      window.location.reload(true);
    } else {
      // If checkbox is checked
      console.log('NOT CHECKED // OFF');
      //reload for take effect
      window.location.reload(true);
    }
  }
}

// Add listener for messages from popup.js
chrome.runtime.onMessage.addListener(handleMessage);

// Check if chrome.tabs is defined before using it
if (chrome.tabs) {
  // Listen for tab updates to restore the checkbox state
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.storage.local.get('etat_switch', function(data) {
      const checkboxState = data.etat_switch;
      chrome.tabs.sendMessage(tabId, { 'etat_switch': checkboxState });
    });
  });
}



// FONCTION FOR THIS BROKEN SHITTY CODE SRX JVAI CLAQUER 

//Funciton for change navigator properties  
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