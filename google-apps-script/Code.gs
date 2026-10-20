/**
 * 20/10 Love Puzzle -> Google Sheets
 * Deploy this script as a Web App, executing as YOUR account.
 * Sheet viewers are not made public by this script.
 */
const SHEET_NAME = "CauTraLoi20-10";
const HEADERS = [
  "Thời gian nhận", "Mã lượt", "Người trả lời", "Câu hỏi 1", "Lựa chọn 1", "Câu trả lời riêng 1",
  "Câu hỏi 2", "Lựa chọn 2", "Câu trả lời riêng 2",
  "Câu hỏi 3", "Lựa chọn 3", "Câu trả lời riêng 3",
  "Câu hỏi 4", "Lựa chọn 4", "Câu trả lời riêng 4",
  "Câu hỏi 5", "Lựa chọn 5", "Câu trả lời riêng 5",
  "Câu hỏi 6", "Lựa chọn 6", "Câu trả lời riêng 6"
];

function doPost(e) {
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (!payload.submissionId || !Array.isArray(payload.answers) || payload.answers.length !== 6) {
      return jsonOutput({ ok: false, error: "Invalid payload" });
    }
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = getSheet_();
      // Avoid duplicate rows if the browser retries a submission.
      const lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        const ids = sheet.getRange(2, 2, lastRow - 1, 1).getValues().flat();
        if (ids.includes(payload.submissionId)) return jsonOutput({ ok: true, duplicate: true });
      }
      const row = [new Date(), payload.submissionId, safeCell_(payload.personLabel)];
      payload.answers.forEach((a) => {
        row.push(safeCell_(a.question), safeCell_(a.choice), safeCell_(a.note));
      });
      sheet.appendRow(row);
      return jsonOutput({ ok: true });
    } finally {
      lock.releaseLock();
    }
  } catch (err) {
    return jsonOutput({ ok: false, error: String(err) });
  }
}

function getSheet_() {
  const props = PropertiesService.getScriptProperties();
  const spreadsheetId = props.getProperty("SPREADSHEET_ID");
  if (!spreadsheetId) throw new Error("Set SPREADSHEET_ID in Script Properties first.");
  const ss = SpreadsheetApp.openById(spreadsheetId);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.autoResizeColumns(1, HEADERS.length);
  }
  return sheet;
}

function safeCell_(value) {
  let s = String(value == null ? "" : value).slice(0, 5000);
  // Prevent spreadsheet formula injection from free-text answers.
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function jsonOutput(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
