const { app, BrowserWindow } = require("electron");
const nodeFs = require("fs");

// -----------------------------------------------------------------------------

const appParameters = (config) =>
  Object.keys(config)
    .map((key) => key + "=" + config[key])
    .join("&");

// -----------------------------------------------------------------------------

const loadConfig = () => {
  try {
    return JSON.parse(nodeFs.readFileSync("config.json", "utf-8"));
  } catch (e) {
    return {
      electron: {
        fullscreen: false,
        kiosk: false,
      },
      url: "https://github.com",
      app: {},
    };
  }
};

// -----------------------------------------------------------------------------

app.whenReady().then(() => {
  const config = loadConfig();
  const win = new BrowserWindow(config.electron);

  win.setBackgroundColor("#0f0f0f");
  win.loadURL(`${config.url}?${appParameters(config.app || {})}`);
});

// -----------------------------------------------------------------------------

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
