import { SCHEMA_BLACKLIST } from "../config.js";

export async function loadDatabaseData(client) {
  const schemasRes = await client.query(
    `SELECT schema_name FROM information_schema.schemata WHERE schema_name NOT IN ${SCHEMA_BLACKLIST}`
  );
  const schemas = schemasRes.rows.map((row) => row.schema_name);
  let results = {};
  for (const schema of schemas) {
    results[schema] = {};
    const tableRes = await client.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = $1`,
      [schema]
    );
    for (const { table_name } of tableRes.rows) {
      const dataRes = await client.query(
        `SELECT * FROM "${schema}"."${table_name}"`
      );
      results[schema][table_name] = dataRes.rows;
    }
  }
  return results;
}
