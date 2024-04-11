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
    

    //Chopper le code html de la page settings pour le mettre sur la page 
    fetch('pages/settings.html')
    .then(response => response.text())
    .then(html => {
        const range = document.createRange();
        const fragment = range.createContextualFragment(html);
        document.body.appendChild(fragment);
    });
        
        
    
  

/*

    if (setting_page.style.display == 'none') {
      setting_page.style.display = 'block';
    } else {
      setting_page.style.display = 'none';
    }

    */
  }
  
