import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export interface Note {
  id: number | string;
  title: string;
  content: string;
  category: string;
  date: string;
}

interface NotesContextType {
  notes: Note[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addNote: (newNoteData: {
    title: string;
    content: string;
    category: string;
  }) => void;
  deleteNote: (id: number | string) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem("app_notes");
    if (savedNotes) {
      try {
        return JSON.parse(savedNotes);
      } catch (e) {
        console.error("Failed to parse notes from localStorage", e);
      }
    }
    return [
      {
        id: 1,
        title: "Welcome Note",
        content:
          "Welcome to your new notes app! You can add, search, and delete notes easily.",
        category: "General",
        date: "Aug 27, 2026",
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("app_notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (titleOrData: any, content?: string, category?: string) => {
    let newNoteData;

    if (typeof titleOrData === "object" && titleOrData !== null) {
      newNoteData = titleOrData;
    } else {
      newNoteData = {
        title: titleOrData,
        content: content || "",
        category: category || "Work",
      };
    }

    const newNote: Note = {
      id: Date.now(),
      title: newNoteData.title,
      content: newNoteData.content,
      category: newNoteData.category,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    setNotes((prev) => [newNote, ...prev]);
    window.alert("The Note Is Added Successfully")
  };

  const deleteNote = (id: number | string) => {
    let updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <NotesContext.Provider
      value={{ notes, searchQuery, setSearchQuery, addNote, deleteNote }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};
