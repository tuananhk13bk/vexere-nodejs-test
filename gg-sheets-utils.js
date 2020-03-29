const { GoogleSpreadsheet } = require("google-spreadsheet")
const _ = require("lodash")

const creds = require("./config/google-drive-api.json")
const APIKey = "1atmqIzXqoYxJNZc1rAZAL6GkPMzeRzkENKT_1gkJwIQ"

class GgSheet {
  constructor(doc) {
    this.doc = doc
  }

  static async getInstance() {
    if (!this.instance) {
      const doc = new GoogleSpreadsheet(APIKey)
      await doc.useServiceAccountAuth(creds)
      this.instance = new GgSheet(doc)
      return this.instance
    } else {
      return this.instance
    }
  }

  async addSheet(arr) {
    return await this.doc.addSheet({ headerValues: arr })
  }

  async getSheet() {
    await this.doc.loadInfo()
    return this.doc.sheetsByIndex[0]
  }

  async getRows() {
    await this.doc.loadInfo()
    const sheet = this.doc.sheetsByIndex[0]

    const rows = await sheet.getRows()
    return rows
  }
}

module.exports = { GgSheet }
