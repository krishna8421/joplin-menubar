import { IpcRenderer } from "electron";

declare global {
  namespace NodeJS {
    interface Global {
      ipcRenderer: IpcRenderer;
    }
  }
}

export type MenuOptions = "add" | "all";

export interface Note {
  id: string;
  parent_id: string;
  title: string;
}
