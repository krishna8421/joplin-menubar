import { useState, createContext, useEffect } from "react";
import { MenuOptions } from "../interfaces";
import axios from "axios";
import { Simulate } from "react-dom/test-utils";
import waiting = Simulate.waiting;

interface RootContext {
  activeMenu?: MenuOptions;
  setActiveMenu?: (activeMenu: MenuOptions) => void;
  isJoplinRunning?: boolean;
  setIsJoplinRunning?: (isJoplinRunning: boolean) => void;
  isRefreshLoading?: boolean;
  reCheckForJoplin?: () => void;
  token?: string;
  setToken?: (token: string) => void;
  isTokenLoading?: boolean;
  getAuthToken?: () => void;
  tempAuthToken?: string;
  setTempAuthToken?: (tempAuthToken: string) => void;
  getToken?: () => void;
  err?: string;
  setErr?: (err: any) => void;
}
export const RootContext = createContext<RootContext>({});

export const RootProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState<MenuOptions>("add");
  const [isJoplinRunning, setIsJoplinRunning] = useState(false);
  const [isRefreshLoading, setIsRefreshLoading] = useState(false);
  const [isTokenLoading, setIsTokenLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [tempAuthToken, setTempAuthToken] = useState<string | null>(null);
  const [port, setPort] = useState<number | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    reCheckForJoplin();
    global.ipcRenderer.send("getTokenFromLS", "");
    global.ipcRenderer.addListener("getTokenFromLS", (_event, args) => {
      if (args) {
        setToken(args.token);
        setPort(args.port);
      }
    });
  }, []);

  const reCheckForJoplin = () => {
    setIsRefreshLoading(true);
    global.ipcRenderer.send("joplinStatus", "");
    global.ipcRenderer.addListener("joplinStatus", (_event, args) => {
      args.isRunning ? setIsJoplinRunning(true) : setIsJoplinRunning(false);
      args.isRunning ? setPort(args.port) : setPort(null);
    });
    setTimeout(() => {
      setIsRefreshLoading(false);
    }, 1000);
  };

  const getAuthToken = async () => {
    setErr(null);
    setIsTokenLoading(true);
    global.ipcRenderer.send("getToken", "");
    if (isJoplinRunning) {
      global.ipcRenderer.send("getAuthToken", "");
      global.ipcRenderer.addListener("getAuthToken", (_event, args) => {
        if (args) {
          setTempAuthToken(args);
        }
      });
    }
  };

  const getToken = async () => {
    setErr(null);
    setIsTokenLoading(true);
    const baseUrl = `http://localhost:${port}`;
    try {
      const token = await axios.get(`${baseUrl}/auth/check?auth_token=${tempAuthToken}`);
      if (token.data.status === waiting) {
        setTimeout(() => {
          getToken();
        }, 1000);
      }
      if (token.data.status === "rejected") {
        setErr("Request rejected");
        setIsTokenLoading(false);
      }
      if (token.data.status === "accepted") {
        setToken(token.data.token);
        global.ipcRenderer.send("saveTokenToLS", token.data.token);
        setIsTokenLoading(false);
      }
    } catch (e) {
      setErr(e.message);
      setIsTokenLoading(false);
    }
  };

  return (
    <RootContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        isJoplinRunning,
        setIsJoplinRunning,
        isRefreshLoading,
        reCheckForJoplin,
        token,
        setToken,
        isTokenLoading,
        getAuthToken,
        tempAuthToken,
        setTempAuthToken,
        getToken,
        err,
        setErr,
      }}
    >
      {children}
    </RootContext.Provider>
  );
};
