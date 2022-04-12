// @ts-ignore
import Store from "electron-store";
import { checkJoplinStatus } from "./checkJoplinStatus";
import axios from "axios";

export const getAuthToken = async () => {
  const store = new Store();
  let port = store.get("port");
  if (!port) {
    await checkJoplinStatus();
    port = store.get("port");
  }
  const baseUrl = `http://localhost:${port}`;
  try {
    const authToken = await axios.post(`${baseUrl}/auth`);
    return authToken.data.auth_token;
  } catch (_e) {
    return null;
  }
};
