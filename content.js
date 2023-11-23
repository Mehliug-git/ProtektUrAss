let webRequestListener;

function performActionBasedOnSwitchState(isSwitchOn) {
  if (isSwitchOn) {
      // Si le switch est ON
      console.log('Switch is ON. LETZ GOOOOOOOOOOOOOOOOOOOO');

      //start all function
      launch()

      //change useragent from Header
      // Call the funciton in background.js
      chrome.runtime.sendMessage({ action: 'BackgroundFunction' });


  } else {
    //bah s'il l'est pas connard
      console.log('Switch is OFF');
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
      launch();
      window.location.reload(true);

    } else {
      // If checkbox is checked
      console.log('NOT CHECKED // OFF');
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

//Change useragent
function setUserAgent(userAgent) {
  Object.defineProperty(navigator, 'userAgent', {
    value: userAgent,
    writable: false,
    configurable: false,
    enumerable: true
  });

  // Crée un nouvel objet avec la propriété userAgent pour navigator
  window.navigator = Object.create(navigator, {
    userAgent: {
      value: userAgent,
      writable: false,
      configurable: false,
      enumerable: true
    }
  });
}

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

// Launch all functions
function launch() {
  // Make a list with all important navigator properties
  var funct_list = ["userAgent", "platform", "appCodeName", "appVersion", "appName", "gpu", "plugins", "language", "doNotTrack", "cookieEnabled", "hardwareConcurrency"];

  var value = "BOOM";

  // For each function in the list
  funct_list.forEach(function(funct) {
    // Crée un nouvel élément script
    var script = document.createElement('script');

    // Ajoute le code du script
    script.textContent = '(' + setNavigatorProperty.toString() + ')("' + funct + '", "' + value + '");';

    // Ajoute le script à la page
    (document.head || document.documentElement).appendChild(script);

    // Supprime l'élément script pour éviter tout impact sur la page
    script.parentNode.removeChild(script);
  });
}

