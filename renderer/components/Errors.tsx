import { TiWarning } from "react-icons/ti";
import { RiRefreshLine } from "react-icons/ri";
import { useData } from "../hooks/useData";

interface Props {
  message: string;
}

export default function Errors({ message }: Props) {
  const { reCheckForJoplin, isRefreshLoading } = useData();
  return (
    <div className="w-screen h-screen flex flex-col items-center pt-12 overflow-hidden">
      <div className="flex justify-center items-center mb-8 rounded-full p-8 bg-red-200">
        <TiWarning size={80} className="text-red-800" />
      </div>
      <div className="w-2/3">
        <p className="text-center text-gray-400 text-xl text-xs">{message}</p>
      </div>
      <button
        className={`mt-4 ${isRefreshLoading ? "animate-spin" : ""} outline-none`}
        onClick={reCheckForJoplin}
      >
        <RiRefreshLine size={24} />
      </button>
    </div>
  );
}
