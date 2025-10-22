import { database as db } from "./model.js";

export async function connectToDatabase({ dbname, username, password }) {
  try {
    db.credentials = { dbname, username, password };
    const res = await fetch("/connect-db", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(db.credentials),
    });
    results = await res.json();
    console.log(results);
    if (!res.ok) throw new Error(results.error);
    return results;
  } catch (err) {
    throw err;
  }
}
