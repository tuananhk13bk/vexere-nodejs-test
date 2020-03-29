const { Client } = require("pg")

async function getDatabaseSchemas(dbName) {
  try {
    const client = new Client({
      user: "postgres",
      host: "localhost",
      database: "vexere_test",
      password: "postgres",
      port: 5432,
    })

    await client.connect()

    const res = await client.query(`SELECT
	*
FROM
	information_schema. "columns"
WHERE
	table_schema = 'public'
	AND "table_name" in(
		SELECT
			table_name FROM information_schema. "tables"
		WHERE
			table_schema = 'public')
ORDER BY
	"table_name"`)
    return res.rows
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getDatabaseSchemas }
