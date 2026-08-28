import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import SearchInput from "../../components/Input/Input";
import AddNoteModal from "../../components/Modal/AddNoteModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";

export interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
}

interface NotesProps {
  isModalOpen?: boolean;
  setIsModalOpen?: (open: boolean) => void;
}

interface AppOutletContext {
  isNotesModalOpen: boolean;
  setIsNotesModalOpen: (open: boolean) => void;
}

export default function Notes({ isModalOpen, setIsModalOpen }: NotesProps) {
  const outletContext = useOutletContext<AppOutletContext>();
  const modalOpen = isModalOpen ?? outletContext.isNotesModalOpen;
  const closeModal = setIsModalOpen ?? outletContext.setIsNotesModalOpen;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);

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
    setNoteToDelete(null);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 dark:bg-gray-900 transition-colors">
      <section id="notes-section" className="w-full p-6 max-w-7xl mx-auto">
        <div className="w-full space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-72">
              <SearchInput
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="p-5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-48"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-slate-800 dark:text-gray-100 text-lg line-clamp-1">
                      {note.title}
                    </h3>
                    <span className="text-xs px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-full font-semibold">
                      {note.category}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-gray-300 line-clamp-3 leading-relaxed whitespace-pre-line">
                    {note.content}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-gray-700 flex items-center justify-between text-xs text-slate-400 dark:text-gray-500 font-medium">
                  <span>{note.date}</span>
                  <button
                    onClick={() => setNoteToDelete(note)}
                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400 font-semibold transition-colors cursor-pointer"
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
          isOpen={modalOpen}
          onClose={() => closeModal(false)}
          onAddNote={handleAddNote}
        />

        <Dialog
          open={noteToDelete !== null}
          onOpenChange={(open) => !open && setNoteToDelete(null)}
        >
          <DialogContent className="border-gray-200 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100">
            <DialogHeader>
              <DialogTitle>Delete note?</DialogTitle>
              <DialogDescription className="dark:text-gray-300">
                Are you sure you want to delete this note? This action cannot be
                undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setNoteToDelete(null)}
                className="border-gray-300 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() =>
                  noteToDelete && handleDeleteNote(noteToDelete.id)
                }
                className="transition-colors hover:bg-red-700"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  );
}

export { Notes };
