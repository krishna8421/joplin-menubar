import { useData } from "../hooks/useData";
interface Props {}

export default function MyNotes({}: Props) {
  const { allNotes } = useData();
  return (
    <div className="flex flex-col gap-2 rounded overflow-y-auto h-80 ">
      {allNotes.map((note, i) => (
        <a key={i} href={`joplin://x-callback-url/openNote?id=${note.id}`}>
          <div className="border rounded-md px-4 py-2 border-zinc-700 cursor-pointer">
            <h1>{note.title}</h1>
          </div>
        </a>
      ))}
    </div>
  );
}
