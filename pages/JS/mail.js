
// Function to make API requests using fetch
async function makeRequest(method, url, token, msg_id_list) {

    //GET peux pas avoir de body donc :
    if (method == 'POST') {

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'X-MailboxToken': token
                },
                body: JSON.stringify(msg_id_list)
            });

            if (!response.ok) {
                throw new Error('NOT OK');
            }

            return response.json();
        } catch (error) {
            console.error('ERROR : ', error);
        }
    }

    else {
        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'X-MailboxToken': token
                }
            });

            if (!response.ok) {
                throw new Error('NOT OK');
            }

            return response.json();
        } catch (error) {
            console.error('ERROR : ', error);
        }
    }
}


//fonction pour envoyé des output sur le front
function displayResult(result) {
    const apiResults = document.getElementById('apiResults');
    apiResults.innerHTML = JSON.stringify(result, null, 2);
}



document.getElementById('create').addEventListener('click', async () => {
    const url = 'https://www.developermail.com/api/v1/mailbox';
    const response = await makeRequest('PUT', url);

        // extract name and token from the response
    const { result } = response;
    const { name, token } = result;

    console.log('Name:', name);
    console.log('Token:', token);

    displayResult(name + "@developermail.com", token); 

    // Store name and token in chrome storage
    chrome.storage.sync.set({ name, token }, () => {
        console.log('name et token dans le storage bg');
    });

    //attendre 2s et refresh NE MARCHE PLUS AVEC MANIFEST V3
   // setInterval(refresh_mail(name), 2000);
});


document.getElementById('refresh').addEventListener('click', async () => {
    let name, token;


    await new Promise(resolve => {
        chrome.storage.sync.get(['name', 'token'], (result) => {
            name = result.name;
            token = result.token;
            resolve();
        });
    });
    //recup les ID des mails

    //name = 'w-iypmi3'
    //token = 'B48EFCE219BBC7DB784DA36D66E1C27E914D7413'
    
    const url_get_msg_id = `https://www.developermail.com/api/v1/mailbox/${name}`;
    const response_msg_id = await makeRequest('GET', url_get_msg_id, token);

    //la response avec les id des mails
    var msg_id_result = response_msg_id.result 

    //foreach pour avoir les id de mails dans une liste snn il passent pas dans l'api se chacal
    let msg_id_list = []
    msg_id_result.forEach(function(msg_id) {
        
        msg_id_list.push(msg_id);
    });


    displayResult(msg_id_list); 



    
    //c'est bien mimi de vouloir lire les mails mais sans l'id des mails c'est po possible...
    //bon ça a l'air d'etre pas loin de marcher regarde juste dans la doc si tu doit bien mettre les ID comme ça 
    const url_refresh = `https://www.developermail.com/api/v1/mailbox/${name}/messages`;
    const response_refresh = await makeRequest('POST', url_refresh, token, msg_id_list);


    mail_result = response_refresh.result

  


    //bah le second pour enlever la merde et ne garder que la date l'expediteur et le content hehehe
    let contentList = [];
    mail_result.forEach(function(item) {
        // Extrayez l'expéditeur, la date et le contenu de chaque mail
        let sender = item.value.match(/From: (.+?)\r\n/)[1];
        let date = item.value.match(/Date: (.+?)\r\n/)[1];
        let content = item.value.match(/Content-Type: text\/plain; charset="UTF-8"\r\n\r\n(.+)/s)[1];

        // Créez un objet contenant l'expéditeur, la date et le contenu
        let mail = {
            sender: sender,
            date: date,
            content: content
        };

        // Ajoutez cet objet à la liste des mails
        contentList.push(mail);
    });





    console.log(contentList)

    displayResult(contentList) 


    
})
