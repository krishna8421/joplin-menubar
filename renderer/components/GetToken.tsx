import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useData } from "../hooks/useData";
import { useState } from "react";
import { RiRefreshLine } from "react-icons/ri";
import RefreshButton from "./RefreshButton";
import { MdCancel } from "react-icons/md";

export default function GetToken() {
  const [waitingArea, setWaitingArea] = useState(false);
  const { isTokenLoading, getAuthToken, getToken, err } = useData();
  return (
    <div className="flex flex-col justify-around w-screen h-screen relative">
      <RefreshButton />
      <div className="flex flex-col items-center">
        <img src="/static/icon.png" alt="Get Token" className="w-16 h-16" />
        <h2 className="text-2xl w-2/3 mt-4 text-center font-semibold font-mono text-slate-300 select-none">
          Welcome To Joplin MenuBar
        </h2>
      </div>
      {waitingArea ? (
        <div className="flex flex-col items-center">
          <div className="mb-6">
            {isTokenLoading && (
              <button className="animate-spin">
                <RiRefreshLine size={40} className="text-slate-500 select-none" />
              </button>
            )}
            {err && (
              <button>
                <MdCancel size={40} className="text-red-500 select-none" />
              </button>
            )}
          </div>
          <p className="text-sm text-slate-400 select-none">
            {err ? <span className="text-red-500">{err}</span> : "Accept the Request in Joplin App"}
          </p>
          <button
            onClick={() => {
              if (err) {
                getAuthToken();
                getToken();
              }
              getToken();
            }}
            className="mt-4 bg-zinc-800 hover:bg-zinc-700/50  px-6 py-2 rounded-xl"
          >
            {err ? "Try Again" : "Finish"}
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <button
            className={`mb-6`}
            onClick={() => {
              getAuthToken();
              setWaitingArea(true);
            }}
          >
            <BsFillArrowRightCircleFill
              size={40}
              className="text-slate-500 hover:text-slate-400 select-none transition-all duration-300"
            />
          </button>
          <p className="text-sm text-slate-400 select-none">Get started</p>
        </div>
      )}
    </div>
  );
}
