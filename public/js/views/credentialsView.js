import View from "./View.js";

class CredentialsView extends View {
  _parentElement = document.querySelector(".overlay-container");
  _errorMessage = "No workouts found. Check your database connection.";
  _message = "Credentials correct! Connection to database available.";

  _generateMarkup() {
    return `<div class="overlay">
                <div class="form-container">
                    <h3>Enter <b>database</b> credentials:</h3>
                    <form class="form" id="dbform">
                        <label for="dbname">Database name:</label>
                        <input type="text" id="dbname" name="dbname" required/>
                        <label for="username">Username:</label>
                        <input type="text" id="username" name="username" required/>
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password" required/>
                        <button type="submit" class="submit__btn">Connect</button>
                    </form>
                </div>
            </div>`;
  }

  addHandlerOpenForm(handler) {
    document.querySelector(".update__btn").addEventListener("click", handler);
  }

  closeForm() {
    const overlay = document.querySelector(".overlay");
    if (!overlay) return;
    // Outside click
    overlay.addEventListener("click", function (e) {
      const clickedInside = e.target.closest(".form-container");
      if (!clickedInside) overlay.remove();
    });
    // Escape
    function escHandler(e) {
      if (e.key === "Escape" && document.body.contains(overlay)) {
        overlay.remove();
        document.removeEventListener("keydown", escHandler);
      }
    }
    document.addEventListener("keydown", escHandler);
  }

  getDatabaseCredentials(handler) {
    const btn = document.querySelector(".submit__btn");
    if (!btn) return;
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const dbname = document.querySelector("#dbname")?.value;
      const username = document.querySelector("#username")?.value;
      const password = document.querySelector("#password")?.value;
      if (!dbname || !username || !password) {
        this.renderError("Credentials are not complete. Please enter again!");
        return;
      }
      handler({ dbname, username, password });
    });
  }
}

export default new CredentialsView();
