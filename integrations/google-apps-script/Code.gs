/*
 * 1. Create a Google Sheet with a tab named "Admissions".
 * 2. In script.google.com, create a project and paste this file.
 * 3. Set script properties: SPREADSHEET_ID and ADMISSION_WEBHOOK_TOKEN.
 * 4. Deploy as a Web app: execute as yourself; access: Anyone.
 * 5. Add the deployment URL and the same token to Vercel environment variables.
 */
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const expectedToken = PropertiesService.getScriptProperties().getProperty('ADMISSION_WEBHOOK_TOKEN');
  if (!expectedToken || data.token !== expectedToken) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false })).setMimeType(ContentService.MimeType.JSON);
  }
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('Admissions');
  sheet.appendRow([data.submittedAt, data.name, data.phone, data.email || '', data.course, data.city || '', data.qualification || '', data.message || '', data.consent]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
