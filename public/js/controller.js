import { database as db } from "./model.js";
import credentialsView from "./views/credentialsView.js";
import { connectToDatabase } from "./helpers.js";

const controlCredentials = async function () {
  try {
    credentialsView.renderStatic();
    credentialsView.getDatabaseCredentials(async function ({
      dbname,
      username,
      password,
    }) {
      try {
        credentialsView.renderSpinner();
        const results = await connectToDatabase({ dbname, username, password });
        credentialsView.renderMessage(`${results.message}`);
        db.workouts = results.data;
        credentialsView.closeForm();
      } catch (err) {
        credentialsView.renderError(`Connection failed: ${err.message}. ‼️`);
      }
    });
    credentialsView.closeForm();
  } catch (err) {
    credentialsView.renderError(`${err} 🚩`);
  }
};

const init = function () {
  credentialsView.addHandlerOpenForm(controlCredentials);
};
init();
