let webRequestListener;


function reloadOnce() {
  // Vérifie si le cookie indiquant le rechargement existe
  var hasReloaded = document.cookie.replace(/(?:(?:^|.*;\s*)hasReloaded\s*=\s*([^;]*).*$)|^.*$/, '$1');

  // Si le cookie n'existe pas, effectue le rechargement, crée le cookie avec expiration de 10 secondes
  if (!hasReloaded) {
    window.location.reload();
    console.log('RELOAD');

    
    var expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 10000); // 10 secondes en millisecondes
    document.cookie = "hasReloaded=true; expires=" + expirationDate.toUTCString() + "; path=/";
  }
  else {
    console.log('NO RELOAD');
  }
}


function performActionBasedOnSwitchState(isSwitchOn) {
  if (isSwitchOn) {
      // Si le switch est ON
      console.log('Switch is ON. LETZ GOOOOOOOOOOOOOOOOOOOO');
      //document.body.innerHTML = '<p>HEHEHE</p>';

      //start function 1 
      setUserAgent('truc de zinzin');



      //reload page for take effect
     // reloadOnce();
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
      // If checkbox is checked
      console.log('CHECKED // ON');

    } else {
      // If checkbox is checked
      console.log('NOT CHECKED // OFF');
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


// Crée un élément script
var script = document.createElement('script');

// Ajoute le code du script
script.textContent = '(' + setUserAgent.toString() + ')("Votre chaîne de User-Agent personnalisée");';

// Ajoute le script à la page
(document.head || document.documentElement).appendChild(script);

// Supprime l'élément script pour éviter tout impact sur la page
script.parentNode.removeChild(script);