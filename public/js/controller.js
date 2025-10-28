import { database as db } from "./model.js";
import credentialsView from "./views/credentialsView.js";
import workoutsView from "./views/workoutsView.js";
import { connectToDatabase } from "./helpers.js";

const onDataLoaded = async function () {
  try {
    workoutsView.renderSpinner();
    workoutsView.render(db.workouts);
  } catch (err) {
    workoutsView.renderError(`${err} 💣`);
  }
};

const controlWorkoutsView = (workout) => {
  console.log(workout);
  // Render stats later
};

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
        console.log(db.workouts);
        credentialsView.closeForm();

        // Render workouts after database is loaded
        await onDataLoaded();
        // Register click handler for workout selection
        workoutsView.addHandlerWorkouts(controlWorkoutsView);
      } catch (err) {
        credentialsView.renderError(`Connection failed: ${err.message}. ‼️`);
      }
    });
    workoutsView.addHandlerWorkouts(controlWorkoutsView);
    credentialsView.closeForm();
  } catch (err) {
    credentialsView.renderError(`${err} 🚩`);
  }
};

const init = function () {
  credentialsView.addHandlerOpenForm(controlCredentials);
};
init();
