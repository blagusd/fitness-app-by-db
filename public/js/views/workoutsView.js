//import { database as db } from "./model.js";
import View from "./View.js";

class WorkoutsView extends View {
  _parentElement = document.querySelector(".workouts");
  _errorMessage = "There is no database connection or any data to be loaded.";
  _message = "";

  _generateMarkup() {
    const workouts = Object.keys(this._data);
    if (!workouts) this.renderError();
    return workouts
      .map(
        (workoutName) => `
        <li>
            <button class="workout__btn" id="btn-${workoutName}" data-workout="${workoutName}">${this._formatWorkoutName(
          workoutName
        )}</button>
        </li>`
      )
      .join("");
  }

  _formatWorkoutName(workoutName) {
    return (
      workoutName[0].toUpperCase() +
      workoutName.slice(1, workoutName.indexOf("data") - 1)
    ).replaceAll("_", " ");
  }

  addHandlerWorkouts(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".workout__btn");
      if (!btn) return;
      const workout = btn.dataset.workout;
      console.log(workout);
      handler(workout);
    });
  }
}

export default new WorkoutsView();
