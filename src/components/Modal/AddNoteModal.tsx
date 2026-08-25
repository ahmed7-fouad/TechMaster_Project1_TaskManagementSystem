import React, { useState } from "react";
import Button from "../Button/Button";

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNote?: (note: {
    title: string;
    content: string;
    category: string;
  }) => void;
}

export default function AddNoteModal({
  isOpen,
  onClose,
  onAddNote,
}: AddNoteModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Work");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (onAddNote) {
      onAddNote({ title, content, category });
    }

    setTitle("");
    setContent("");
    setCategory("Work");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">Add New Note</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-semibold text-xl leading-none cursor-pointer"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              placeholder="Note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-600 bg-white"
            >
              <option value="Work">Work</option>
              <option value="Ideas">Ideas</option>
              <option value="Todo">Todo</option>
              <option value="Personal">Personal</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Content
            </label>
            <textarea
              required
              rows={4}
              placeholder="Write your note content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-600 resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Note
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
