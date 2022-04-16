import { useState } from "react";
import axios from "axios";
import { useData } from "../hooks/useData";

export default function AddNotes() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { token, refreshNotes, setRefreshNotes } = useData();
  const createNotes = async (title: string, content: string) => {
    const url = `http://localhost:41184/notes?token=${token}`;
    try {
      await axios.post(url, {
        title,
        body: content,
      });
      setTitle("");
      setContent("");
      setRefreshNotes(!refreshNotes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex  flex-col gap-2">
        <label className="text-xs font-mono text-slate-300">Title</label>
        <input
          type="text"
          className="bg-zinc-900 focus:outline-none focus:shadow-outline border border-zinc-600 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-mono text-slate-300">Content</label>
        <textarea
          className="bg-zinc-900 focus:outline-none focus:shadow-outline border border-zinc-600 rounded-lg p-2 px-4 block w-full appearance-none leading-normal"
          rows={7}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button
        className="bg-zinc-800 text-slate-400 border border-slate-700 font-sans py-1 rounded-lg"
        onClick={async () => {
          await createNotes(title, content);
        }}
      >
        Add
      </button>
    </div>
  );
}
