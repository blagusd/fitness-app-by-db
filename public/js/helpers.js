import { database as db } from "./model.js";
import { TIMEOUT_LOAD_DB } from "./config.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error("Request took too long! ⏲️"));
    }, s * 1000);
  });
};

export async function connectToDatabase({ dbname, username, password }) {
  try {
    db.credentials = { dbname, username, password };
    const resFetch = fetch("/connect-db", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(db.credentials),
    });
    const res = await Promise.race([resFetch, timeout(TIMEOUT_LOAD_DB)]);
    const results = await res.json();
    if (!res.ok) throw new Error(results.error);
    return results;
  } catch (err) {
    throw err;
  }
}
