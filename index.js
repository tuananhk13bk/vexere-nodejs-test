// const CronJob = require("cron").CronJob

// const job = new CronJob(
//   "* * * * * *",
//   function() {
//     console.log("You will see this message every second")
//   },
//   null,
//   true,
// )

// job.start()

const { getDatabaseSchemas } = require("./postgres-helper")
const { GgSheet } = require("./gg-sheets-utils")

async function main() {
  const schemas = await getDatabaseSchemas()

  const doc = await GgSheet.getInstance()

  const sheet = await doc.getSheet()
  const rows = await sheet.getRows()

  const promisesList = []
  if (rows.length === 0) {
    await sheet.addRows(schemas)
  } else {
    schemas.forEach(async (v, i) => {
      if (i < rows.length) {
        Object.keys(v).forEach(k => {
          rows[i][k] = schemas[i][k]
        })
        promisesList.push(rows[i].save())
      } else {
        promisesList.push(sheet.addRow(schemas[i]))
      }
    })
  }

  await Promise.all(promisesList)
}

main()
