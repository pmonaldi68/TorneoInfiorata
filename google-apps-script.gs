/**
 * Google Apps Script - Webhook per ricezione referti Torneo Infiorata 2026
 *
 * Come usare:
 * 1) Crea un Google Sheet e rinomina il primo foglio in "Referti".
 * 2) Apri Extensions -> Apps Script e incolla questo file.
 * 3) Deploy -> New deployment -> Web app
 *    - Execute as: Me
 *    - Who has access: Anyone with the link
 * 4) Copia l'URL della Web App e incollalo nell'app (campo webhook).
 */

const SHEET_NAME = 'Referti';

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    ensureHeader(sheet);

    const body = JSON.parse(e.postData.contents || '{}');

    const row = [
      new Date(),
      body.id || '',
      body.dataOra || '',
      body.categoria || '',
      body.girone || '',
      body.giornata || '',
      body.campo || '',
      body.squadraCasa || '',
      body.squadraOspite || '',
      body.risultato || '',
      body.arbitro || '',
      arrayToText(body.ammonitiSquadraCasa),
      arrayToText(body.ammonitiSquadraOspite),
      arrayToText(body.espulsiSquadraCasa),
      arrayToText(body.espulsiSquadraOspite),
      body.note || '',
      body.inseritoIl || ''
    ];

    sheet.appendRow(row);

    return jsonResponse({ ok: true, message: 'Referto salvato' });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function ensureHeader(sheet) {
  if (sheet.getLastRow() > 0) return;

  sheet.appendRow([
    'RicevutoIl',
    'RefId',
    'DataOraGara',
    'Categoria',
    'Girone',
    'Giornata',
    'Campo',
    'SquadraCasa',
    'SquadraOspite',
    'Risultato',
    'Arbitro',
    'AmmonitiCasa',
    'AmmonitiOspite',
    'EspulsiCasa',
    'EspulsiOspite',
    'Note',
    'InseritoIlApp'
  ]);
}

function arrayToText(value) {
  if (!Array.isArray(value)) return '';
  return value.join(' | ');
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
