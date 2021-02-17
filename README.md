# familie-ef-blankett
====================
Saksbehandlingsblankett for EF-sak (midlertidig)
 
Appen lager html fra data og lager pdf ved bruk av [familie-dokument](https://github.com/navikt/familie-dokument).
Konsumenter kan få returnert html eller pdf/bytearray.

# Kjør server lokalt
* `familie-dokument` må kjøres med DevLauncher for at pdf-generering skal fungere
* Kjør `yarn build`
* Kjør `yarn dev:server`

# Bygg og deploy
Appen bygges med github actions og nais deployer appen på gcp. 

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes til:

* Charlie Midtlyng, `charlie.midtlyng@nav.no`
* Mattis Janitz `mattis.janitz@nav.no`

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-familie.



### Trigge pdf-generering lokalt
```
fetch("http://localhost:8000/api/dummy-pdf", {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "nb-NO,nb;q=0.9,no;q=0.8,nn;q=0.7,en-US;q=0.6,en;q=0.5",
    "sec-ch-ua": "\"Chromium\";v=\"88\", \"Google Chrome\";v=\"88\", \";Not A Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1"
  },
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
})        
    .then(response => response.blob())
    .then(blob => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "filename.pdf";
        document.body.appendChild(a); 
        a.click();    
        a.remove();           
    });
```