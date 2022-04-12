import { menubar } from "menubar";
import { join } from "path";
import { ipcMain, IpcMainEvent } from "electron";
import prepareNext from "electron-next";
// @ts-ignore
import isDev from "electron-is-dev";
import { format } from "url";
import { checkJoplinStatus } from "./utils/checkJoplinStatus";
import { getAuthToken } from "./utils/getAuthToken";
// @ts-ignore
import Store from "electron-store";
// import { app } from "electron";

const url = isDev
  ? "http://localhost:8000/"
  : format({
      pathname: join(__dirname, "../renderer/out/index.html"),
      protocol: "file:",
      slashes: true,
    });
const mb = menubar({
  index: url,
  icon: join(__dirname, "../assets/JoplinMenuBarTemplate.png"),
  showDockIcon: false,
  browserWindow: {
    width: isDev ? 700 : 320,
    height: isDev ? 500 : 400,
    resizable: false,
    // minWidth: isDev ? undefined : 320,
    // minHeight: isDev ? undefined : 400,
    // maxWidth: isDev ? undefined : 320,
    // maxHeight: isDev ? undefined : 400,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      preload: join(__dirname, "preload.js"),
    },
  },
});

mb.on("ready", async () => {
  await prepareNext("./renderer")
  if(mb.app.dock) {
    mb.app.dock.hide();
  }
  console.log("app is ready");
  
});

mb.on("after-create-window", async () => {
  console.log("after-create-window");
  if(mb.app.dock) {
    mb.app.dock.hide();
  }
});

// app.on('ready', () => {
//   console.log(app.dock);
//   if (app.dock) app.dock.hide();
// });

/**
 * Check if Joplin is Running or not.
 */
ipcMain.on("joplinStatus", async (event: IpcMainEvent) => {
  const joplinStatus = await checkJoplinStatus();
  event.sender.send("joplinStatus", joplinStatus);
});

/**
 * Get Auth Token from Joplin
 */
ipcMain.on("getAuthToken", async (event: IpcMainEvent) => {
  const authToken = await getAuthToken();
  event.sender.send("getAuthToken", authToken);
});

/**
 * Save Token to Local Storage
 */
ipcMain.on("saveTokenToLS", async (_event: IpcMainEvent, token: string) => {
  const store = new Store();
  store.set("token", token);
});

/**
 * Get Token from Local Storage
 */
ipcMain.on("getTokenFromLS", async (event: IpcMainEvent) => {
  const store = new Store();
  const token = store.get("token") || null;
  const port = store.get("port") || null;
  event.sender.send("getTokenFromLS", {
    token,
    port,
  });
});
