import { ReactNode } from "react";
import HomeButton from "../components/HomeButton";
import { MdCreate } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import RefreshButton from "../components/RefreshButton";

interface Props {
  children: ReactNode;
}

export default function HomeLayout({ children }: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center p-4 text-sm gap-4 relative">
      <RefreshButton />
      <div className="h-8 w-full flex gap-4 text-slate-400">
        <HomeButton type="add">
          <MdCreate className="-ml-2" />
          Create
        </HomeButton>
        <HomeButton type="all">
          <CgNotes />
          My Notes
        </HomeButton>
      </div>
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
