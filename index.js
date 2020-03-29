const CronJob = require("cron").CronJob

const job = new CronJob("0 8 * * *", main, null, true)

job.start()

const { getDatabaseSchemas } = require("./postgres-helper")
const { GgSheet } = require("./gg-sheets-utils")

async function main() {
  const schemas = await getDatabaseSchemas()

  const doc = await GgSheet.getInstance()

  const sheet = await doc.getSheet()
  const rows = await sheet.getRows()

  if (rows.length === 0) {
    await sheet.addRows(schemas)
    return
  }

  if (schemas.length === rows.length) {
    const promisesList = []
    schemas.forEach((v, i) => {
      Object.keys(v).forEach(k => {
        rows[i][k] = schemas[i][k]
      })
      promisesList.push(rows[i].save())
    })

    await Promise.all(promisesList)
    return
  }

  if (schemas.length < rows.length) {
    const promisesList = []
    schemas.forEach((v, i) => {
      Object.keys(v).forEach(k => {
        rows[i][k] = schemas[i][k]
      })
      promisesList.push(rows[i].save())
    })

    for (let i = schemas.length; i < rows.length; i++) {
      promisesList.push(rows[i].delete())
    }

    await Promise.all(promisesList)
    return
  }

  if (schemas.length > rows.length) {
    const promisesList = []
    schemas.forEach((v, i) => {
      Object.keys(v).forEach(k => {
        rows[i][k] = schemas[i][k]
      })
      promisesList.push(rows[i].save())
    })

    for (let i = rows.length; i < schema.length; i++) {
      promisesList.push(sheet.addRow(schemas[i]))
    }

    await Promise.all(promisesList)
    return
  }
}
