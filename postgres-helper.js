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
  "table_schema",
	"table_name",
	"column_name",
	data_type,
	is_nullable,
	column_default
FROM
	information_schema. "columns"
WHERE
	table_schema = 'public'
	AND "table_name" IN(
		SELECT
			table_name FROM information_schema. "tables"
		WHERE
			table_schema = 'public')`)
    return res.rows
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getDatabaseSchemas }
