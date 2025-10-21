import credentialsView from "./views/credentialsView.js";

const controlCredentials = async function () {
  try {
    credentialsView.renderSpinner();
    credentialsView.renderStatic();
    credentialsView.addHandlerCloseOverlay();
  } catch (err) {
    credentialsView.renderError(`${err} 🚩`);
  }
};

const init = function () {
  credentialsView.addHandlerConnect(controlCredentials);
};
init();
