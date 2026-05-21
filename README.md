# TorneoInfiorata

Mini web app per la raccolta referti arbitri del **Torneo Città dell'Infiorata 2026**.

## Funzioni
- Inserimento gara manuale con selettori: data/ora, categoria, girone, giornata, squadra casa, squadra ospite, campo.
- Inserimento risultato, ammoniti, espulsi e note disciplinari.
- Salvataggio locale sul dispositivo arbitro (LocalStorage).
- Elenco referti compilati.
- Export in JSON e CSV da inviare all'organizzazione.
- Invio diretto del singolo referto a Google Sheets tramite webhook Google Apps Script.

## Avvio
È un'app statica, basta aprire `index.html` in un browser (anche da smartphone).


## Google Sheets (opzionale)
- Nel repository trovi `google-apps-script.gs` già pronto.
- Crea un Google Sheet, apri **Extensions > Apps Script** e incolla il contenuto.
- Fai deploy come **Web app** (accesso con link).
- Copia l'URL del deploy e incollalo nel campo **Webhook Google Apps Script** dell'app.
- Da quel momento, con **Invia a Google Sheets** il referto selezionato viene scritto nel foglio `Referti`.
