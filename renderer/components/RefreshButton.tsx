import { useData } from "../hooks/useData";
import { RiRefreshLine } from "react-icons/ri";

export default function RefreshButton() {
  const { reCheckForJoplin, isRefreshLoading } = useData();
  return (
    <div className="absolute bottom-1 right-2">
      <button className={` ${isRefreshLoading ? "animate-spin" : ""}`} onClick={reCheckForJoplin}>
        <RiRefreshLine size={10} />
      </button>
    </div>
  );
}
