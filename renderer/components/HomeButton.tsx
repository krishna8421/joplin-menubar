import { ReactNode } from "react";
import { useData } from "../hooks/useData";
import { MenuOptions } from "../interfaces";

interface Props {
  children: ReactNode;
  type: MenuOptions;
  className?: string;
}
export default function HomeButton({ children, type, className }: Props) {
  const { setActiveMenu, activeMenu } = useData();
  return (
    <div
      className={`${className} ${
        type === activeMenu ? " border border-slate-700" : ""
      } flex-1 gap-2  bg-zinc-800 flex justify-center items-center rounded-md hover:bg-zinc-700/50 select-none cursor-pointer`}
      onClick={() => setActiveMenu(type)}
    >
      {children}
    </div>
  );
}
