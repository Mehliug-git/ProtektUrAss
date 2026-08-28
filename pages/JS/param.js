//pour afficher le header actuel sur la page reglages (le carré existait mais rien le remplissait avant)
chrome.storage.local.get(['newheaders'], (result) => {
    var headersDiv = document.getElementById('Headers');
    if (headersDiv) {
        headersDiv.innerText = result.newheaders ? result.newheaders : "Aucun header généré pour l'instant, active le switch !";
    }
});

//Pour le choix des UA
var selectElement = document.getElementById('options');

selectElement.addEventListener('change', function () {
    var selectChoice = selectElement.value;

    if (selectChoice) {
        chrome.storage.sync.set({ 'UAtype': selectChoice }, function() {
            console.log('Jai save ton choix bg : ' + selectChoice);

            // avant ça sauvegardait juste le choix mais ça prenait effet que au prochain toggle du switch, on avait l'impression que ça marchait pas
            // du coup si la protection est deja active on regenere direct le header avec le nouvel OS choisi
            chrome.storage.sync.get('etat_switch', function(data) {
                if (data.etat_switch) {
                    chrome.runtime.sendMessage({ action: 'BackgroundFunction' }, function() {
                        chrome.storage.local.get(['newheaders'], (result) => {
                            var headersDiv = document.getElementById('Headers');
                            if (headersDiv) {
                                headersDiv.innerText = result.newheaders ? result.newheaders : "Aucun header généré pour l'instant, active le switch !";
                            }
                        });
                    });
                }
            });
        });
    }
});
