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
	AND "table_name" in(
		SELECT
			table_name FROM information_schema. "tables"
		WHERE
			table_schema = 'public')`)
    return res
  } catch (error) {}
}

getDatabaseSchemas().then(d => console.log(d.rows))
