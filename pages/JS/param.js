
var tempMailButton = document.getElementById('tempMailButton');
tempMailButton.addEventListener('click', function() {
    window.location.href = 'pages/tmpmail.html';
});
// Autres gestionnaires d'événements...
    


function UAtype(choice) {
        chrome.storage.sync.set({ 'UAtype': choice }, function() {
            console.log('Jai save ton choix bg : ' + choice);
        });
    }
