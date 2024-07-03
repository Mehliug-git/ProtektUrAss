var tempMailButton = document.getElementById('tempMailButton');
tempMailButton.addEventListener('click', function() {
    window.location.href = 'pages/tmpmail.html';
});
    


//Pour le choix des UA
var selectElement = document.getElementById('options');

selectElement.addEventListener('change', function () {
    var selectChoice = selectElement.value;

    if (selectChoice) {
        chrome.storage.sync.set({ 'UAtype': selectChoice }, function() {
            console.log('Jai save ton choix bg : ' + selectChoice);
        });
    }
});

