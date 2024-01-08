# familie-ef-blankett

## OBS, denne applikasjonen er ikke lenger i bruk
Siden denne applikasjonen delte mye duplikat kode og dependencies med [familie-brev](https://github.com/navikt/familie-brev), har all blankett-relatert kode blitt flyttet over dit. 
Denne applikasjonen er derfor arkivert og ikke lenger i bruk.

## Om appen
Saksbehandlingsblankett for EF-sak (midlertidig)
 
Appen lager html fra data og lager pdf ved bruk av [familie-dokument](https://github.com/navikt/familie-dokument).
Konsumenter kan få returnert html eller pdf/bytearray.

### Kjør server lokalt
* Opprett `.env` og sett
```
  REACT_APP_FAMILIE_DOKUMENT=http://localhost:8082
  REACT_APP_BACKEND=http://localhost:8033
```
* `familie-dokument` må kjøres med DevLauncher for at pdf-generering skal fungere
* Kjør `yarn build`
* Kjør `yarn dev:server`

### Bygg og deploy
Appen bygges med github actions og nais deployer appen på gcp. 

### Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes til:

* Charlie Midtlyng, `charlie.midtlyng@nav.no`
* Mattis Janitz `mattis.janitz@nav.no`

### For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-familie.



### Trigge pdf-generering lokalt
Gå til localhost:8033/api/status i nettleseren og kjør følgende kommando i console:
```
fetch("http://localhost:8033/api/dummy-pdf", {
  "body": null,
  "method": "POST",
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
For at pdf-generiring skal fungere må man være pålogget Naisdevice.
