/**
 * Google Apps Script для записи ответов анкеты в таблицу.
 *
 * Колонки:
 *   A — Дата и время
 *   B — Имя и Фамилия
 *   C — Присутствие
 *
 * Инструкция по деплою: docs/rsvp-google-sheets.md
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]

    sheet.appendRow([
      data.submittedAt || '',
      data.name || '',
      data.attendance || '',
    ])

    return ContentService.createTextOutput(
      JSON.stringify({ result: 'success' }),
    ).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        result: 'error',
        error: String(error),
      }),
    ).setMimeType(ContentService.MimeType.JSON)
  }
}

/** Проверка, что веб-приложение доступно */
function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ result: 'ok' }),
  ).setMimeType(ContentService.MimeType.JSON)
}
