const { GoogleSpreadsheet } = require("google-spreadsheet")

const creds = require("./config/google-drive-api.json")

async function accessSpreadSheet() {
  const doc = new GoogleSpreadsheet(
    "1atmqIzXqoYxJNZc1rAZAL6GkPMzeRzkENKT_1gkJwIQ",
  )

  await doc.useServiceAccountAuth(creds)

  await doc.loadInfo()

  const sheet = doc.sheetsByIndex[0]

  await sheet.addRow({ Name: "ahihi", Age: 22, Gender: "Female" })

  const rows = await sheet.getRows()
}

accessSpreadSheet()
