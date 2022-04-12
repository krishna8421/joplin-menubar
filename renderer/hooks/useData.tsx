import { RootContext } from "../context/RootContext";
import { useContext } from "react";

export const useData = () => useContext(RootContext);
