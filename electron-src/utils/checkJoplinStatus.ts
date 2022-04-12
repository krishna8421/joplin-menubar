// @ts-ignore
import Store from "electron-store";
import axios from "axios";

interface IJoplinStatus {
  isRunning: boolean;
  port: number | null;
}
export const checkJoplinStatus = async (): Promise<IJoplinStatus> => {
  const store = new Store();
  for (let port = 41184; port <= 41190; port++) {
    try {
      const result = await axios.get(`http://localhost:${port}/ping`);
      if (result.data == "JoplinClipperServer") {
        store.set("port", port);
        return {
          isRunning: true,
          port,
        };
      }
    } catch (_e) {
      return {
        isRunning: false,
        port: null,
      };
    }
  }
  return {
    isRunning: false,
    port: null,
  };
};
