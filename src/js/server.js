import { PORT } from "./config.js";
import { loadDatabaseData } from "./utils/databaseLoader.js";
/*https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs*/
import express from "express";
import pg from "pg";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();

// Fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(dirname);

// Serve static file
app.use(express.static(path.join(__dirname, "../../public")));
app.use(express.json());

app.get("/", (req, res) => res.send("Fitness App by DB is running!"));
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);

app.post("/connect-db", async (req, res) => {
  const { dbname, username, password } = req.body;
  try {
    const client = new pg.Client({
      database: dbname,
      user: username,
      password: password,
      host: "localhost",
      port: 5432,
    });
    await client.connect();
    const data = await loadDatabaseData(client);
    await client.end();
    res.status(200).json({ message: "Connected and loaded", data: data });
  } catch (err) {
    res.status(401).json({ error: "Connection failed", details: err.message });
  }
});
