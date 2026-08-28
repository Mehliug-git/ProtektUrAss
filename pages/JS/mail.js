// developermail.com est mort (le domaine résout même plus en DNS), tout le tempmail tournait dans le vide
// remplacé par mail.tm : gratuit, pas de clé API, et les extensions passent au dessus du CORS grace a host_permissions dans le manifest

//pour afficher si un email actuellement enregistrer
chrome.storage.sync.get(['address'], (result) => {
    const actualmail = document.getElementById('actual-mail');

    if (result.address) {
        actualmail.innerHTML = "Actual Temp-EMail :<br>" + result.address;
    }
    else {
        actualmail.innerHTML = "No Actual Mail Found";
    }
});

// Function to make API requests using fetch
async function apiRequest(method, url, token, body) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
        headers['Authorization'] = 'Bearer ' + token;
    }

    const options = { method, headers };
    if (body !== undefined) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error('NOT OK (' + response.status + ')');
    }

    return response.json();
}


//fonction pour envoyé des output sur le front
function displayResult(result) {
    const apiResults = document.getElementById('apiResults');
    apiResults.innerHTML = "<br>Inbox : <br>" + result.join("<br><br>");
}



document.getElementById('create').addEventListener('click', async () => {
    const apiResults = document.getElementById('apiResults');
    apiResults.innerHTML = "Création du mail temporaire en cours...";

    try {
        // récupère un nom de domaine dispo chez mail.tm (ça change de temps en temps donc on redemande a chaque creation)
        const domains = await apiRequest('GET', 'https://api.mail.tm/domains');
        const domain = domains['hydra:member'][0].domain;

        // genere une adresse et un mdp bidon, on s'en fou c'est une boite jetable
        const login = Math.random().toString(36).substring(2, 12);
        const address = login + '@' + domain;
        const password = Math.random().toString(36).substring(2, 15);

        await apiRequest('POST', 'https://api.mail.tm/accounts', null, { address, password });

        const tokenResponse = await apiRequest('POST', 'https://api.mail.tm/token', null, { address, password });
        const token = tokenResponse.token;

        console.log('Address:', address);
        console.log('Token:', token);

        // Store address, password (pour pouvoir redemander un token si jamais il expire) et token dans le chrome storage
        chrome.storage.sync.set({ address, password, token }, () => {
            console.log('address, password et token dans le storage bg');
        });

        document.getElementById('actual-mail').innerHTML = "Actual Temp-EMail :<br>" + address;
        apiResults.innerHTML = "Boite créée, clique sur Refresh pour voir les mails reçus !";

    } catch (error) {
        console.error('ERROR : ', error);
        apiResults.innerHTML = "Impossible de créer un mail temporaire (le service est peut être down), réessaie plus tard.";
    }
});



document.getElementById('refresh').addEventListener('click', async () => {
    const apiResults = document.getElementById('apiResults');
    let token;

    //quand refresh recois le token du chrome storage
    await new Promise(resolve => {
        chrome.storage.sync.get(['token'], (result) => {
            token = result.token;
            resolve();
        });
    });

    if (!token) {
        apiResults.innerHTML = "Aucune boite créée, clique d'abord sur Create !";
        return;
    }

    apiResults.innerHTML = "Chargement des mails...";

    try {
        const inbox = await apiRequest('GET', 'https://api.mail.tm/messages', token);
        const messages = inbox['hydra:member'];

        if (messages.length === 0) {
            apiResults.innerHTML = "<br>Inbox vide pour l'instant.";
            return;
        }

        //pour chaque mail on va chercher le contenu complet (la liste de base contient juste un aperçu)
        let contentList = [];
        for (const msg of messages) {
            const full = await apiRequest('GET', 'https://api.mail.tm/messages/' + msg.id, token);

            const sender = full.from ? (full.from.name ? full.from.name + " <" + full.from.address + ">" : full.from.address) : "Inconnu";
            const content = full.text || full.intro || "(pas de contenu texte)";

            // Créez un objet contenant l'expéditeur, la date et le contenu
            let mail = "Envoyé par : " + sender + "<br></br>" + "à : " + full.createdAt + "<br></br>" + content;

            // Ajoutez cet objet à la liste des mails
            contentList.push(mail);
        }

        console.log(contentList);

        displayResult(contentList);

    } catch (error) {
        console.error('ERROR : ', error);
        apiResults.innerHTML = "Impossible de récupérer les mails, le token a peut être expiré (reclique sur Create).";
    }
});
