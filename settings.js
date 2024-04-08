button.addEventListener('click', function() {
    button.classList.toggle('close');
    settingpage() 
  });

  function settingpage() {
    var mainpage = document.getElementById('mainpage');
  
    if (mainpage.style.display == 'block') {
      mainpage.style.display = 'none';
    } else {
      mainpage.style.display = 'block';
    }
    
    const html = "<head><meta http-equiv=\"Content-Security-Policy\" content=\"script-src 'nonce-EDNnf03nceIOfn39fn3e9h3sdfa'\"></head><div id='setting_page' style='display: block;'><h1>Settings</h1><div id='tmp-mail' style='display: none;'></div><div id='Headers'></div><button id='btn-tmp-mail'>Temp Mail</button></div>";
    
    var setting_page = document.getElementById('setting_page');
    setting_page.innerHTML = html;
  
    if (setting_page.style.display == 'none') {
      setting_page.style.display = 'block';
    } else {
      setting_page.style.display = 'none';
    }

    // gestionnaire devenement pour le bouton tmp-mail
    var tmpMailButton = document.getElementById('btn-tmp-mail');

    tmpMailButton.addEventListener('click', function() {
      // redirect tmpmail.html
      window.location.href = 'pages/tmpmail.html';

      //ouverture popup
     // var url = chrome.runtime.getURL('pages/tmpmail.html');

     // chrome.tabs.create({ url: url });
    });
  }
  
