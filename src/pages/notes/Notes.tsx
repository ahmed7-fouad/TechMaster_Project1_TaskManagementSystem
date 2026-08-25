import { useState, useEffect } from "react";
import SearchInput from "../../components/Input/Input";
import AddNoteModal from "../../components/Modal/AddNoteModal";

export interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
}

interface NotesProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export default function Notes({ isModalOpen, setIsModalOpen }: NotesProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem("app_notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(() => {
    localStorage.setItem("app_notes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = (newNoteData: {
    title: string;
    content: string;
    category: string;
  }) => {
    const newNote: Note = {
      id: Date.now(),
      ...newNoteData,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  const handleDeleteNote = (id: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <section id="notes-section" className="w-full">
      <div className="w-full space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-48"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-slate-800 text-lg line-clamp-1">
                    {note.title}
                  </h3>
                  <span className="text-xs px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-full font-semibold">
                    {note.category}
                  </span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed whitespace-pre-line">
                  {note.content}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>{note.date}</span>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="text-red-500 hover:text-red-700 font-semibold transition-colors cursor-pointer"
                  title="Delete Note"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddNoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddNote={handleAddNote}
      />
    </section>
  );
}

export { Notes };
