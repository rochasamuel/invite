/**
 * Recebe as confirmações do convite e grava na planilha.
 * Uma linha por código (cada código = uma pessoa); responder de novo atualiza a linha.
 * A aba "Resumo" mostra quantas pessoas confirmaram.
 */
const SHEET = 'Respostas'
const HEADERS = ['Código', 'Nome', 'Tipo de convite', 'Vem?', 'Recado', 'Atualizado em']

function doPost(e) {
  const lock = LockService.getScriptLock()
  lock.waitLock(10000)
  try {
    const data = JSON.parse(e.postData.contents)
    const code = String(data.code || '').replace(/\D/g, '').slice(0, 4)
    if (code.length !== 4) return json({ ok: false, error: 'código inválido' })

    const sheet = setup_()
    const row = [
      "'" + code,
      String(data.name || ''),
      data.type === 'completo' ? 'Cartório + pizzaria' : 'Só pizzaria',
      data.attending ? 'Sim' : 'Não',
      String(data.message || '').slice(0, 500),
      new Date(),
    ]

    const codes = sheet.getRange(2, 1, Math.max(sheet.getLastRow() - 1, 1), 1).getValues().map((r) => String(r[0]))
    const index = codes.indexOf(code)
    if (index >= 0) sheet.getRange(index + 2, 1, 1, row.length).setValues([row])
    else sheet.appendRow(row)

    return json({ ok: true })
  } catch (err) {
    return json({ ok: false, error: String(err) })
  } finally {
    lock.releaseLock()
  }
}

function setup_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(SHEET)
  if (!sheet) {
    sheet = ss.insertSheet(SHEET)
    sheet.appendRow(HEADERS)
    sheet.setFrozenRows(1)
    sheet.getRange('A:A').setNumberFormat('@')
  }
  if (!ss.getSheetByName('Resumo')) {
    const resumo = ss.insertSheet('Resumo')
    resumo.getRange('A1:A3').setValues([['Confirmados (vêm)'], ['Não vêm'], ['Responderam']])
    // setFormulas usa sempre a sintaxe em inglês (vírgula), independente do idioma da planilha
    resumo.getRange('B1:B3').setFormulas([
      [`=COUNTIF(${SHEET}!D:D,"Sim")`],
      [`=COUNTIF(${SHEET}!D:D,"Não")`],
      [`=COUNTA(${SHEET}!A:A)-1`],
    ])
  }
  return sheet
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}
