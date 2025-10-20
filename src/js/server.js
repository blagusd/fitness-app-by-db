import { PORT } from "./config.js";
/*https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs*/
import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();

// Fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(dirname);

// Serve static file
app.use(express.static(path.join(__dirname, "../../public")));
//app.use(express.json());

app.get("/", (req, res) => res.send("Fitness App by DB is running!"));
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
