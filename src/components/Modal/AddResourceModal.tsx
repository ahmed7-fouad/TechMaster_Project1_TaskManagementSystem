import React, { useState } from "react";
import Button from "../Button/Button";

interface AddResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddResource?: (resource: {
    title: string;
    source: string;
    category: "Document" | "Design" | "API" | "Development";
  }) => void;
}

export default function AddResourceModal({
  isOpen,
  onClose,
  onAddResource,
}: AddResourceModalProps) {
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState<
    "Document" | "Design" | "API" | "Development"
  >("Document");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !source.trim()) return;

    if (onAddResource) {
      onAddResource({ title, source, category });
    }

    setTitle("");
    setSource("");
    setCategory("Document");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4">
      <div className="border-gray-200 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-2xl w-full max-w-lg shadow-xl overflow-hidden border animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            Add New Resource
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 font-semibold text-xl leading-none cursor-pointer transition-colors"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
              Resource Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Design System"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-transparent text-gray-800 dark:text-gray-100 outline-none focus:border-indigo-600 dark:focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
              Source / Platform
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Figma, Google Docs"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-transparent text-gray-800 dark:text-gray-100 outline-none focus:border-indigo-600 dark:focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm outline-none focus:border-indigo-600 dark:focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 transition-colors"
            >
              <option value="Document">Document</option>
              <option value="Design">Design</option>
              <option value="API">API</option>
              <option value="Development">Development</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="hover:bg-thirdc hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-thirdc cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="text-white bg-secondaryc hover:bg-primaryc cursor-pointer"
            >
              Save Resource
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
