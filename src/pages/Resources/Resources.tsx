import React, { useState, useEffect } from "react";
import {
  FileText,
  PenTool,
  Braces,
  Layers,
  Trash2,
  Folder,
  Plus,
} from "lucide-react";
import SearchInput from "../../components/Input/Input";
import Nav from "../../shared/Nav";

export interface Resource {
  id: number;
  title: string;
  source: string;
  category: "Document" | "Design" | "API" | "Development";
}

const INITIAL_RESOURCES: Resource[] = [
  {
    id: 1,
    title: "Project Requirements",
    source: "Google Docs",
    category: "Document",
  },
  { id: 2, title: "Design System", source: "Figma", category: "Design" },
  { id: 3, title: "API Documentation", source: "Postman", category: "API" },
  {
    id: 4,
    title: "UI Components",
    source: "Storybook",
    category: "Development",
  },
];

interface ResourcesProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export default function Resources({
  isModalOpen,
  setIsModalOpen,
}: ResourcesProps) {
  const [resources, setResources] = useState<Resource[]>(() => {
    const saved = localStorage.getItem("resources");
    return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const [newTitle, setNewTitle] = useState("");
  const [newSource, setNewSource] = useState("");
  const [newCategory, setNewCategory] =
    useState<Resource["category"]>("Document");

  useEffect(() => {
    localStorage.setItem("resources", JSON.stringify(resources));
  }, [resources]);

  const getCategoryConfig = (category: Resource["category"]) => {
    switch (category) {
      case "Document":
        return {
          icon: <FileText size={22} className="text-blue-600" />,
          iconBg: "bg-blue-100",
          badgeText: "text-blue-600",
          badgeBg: "bg-blue-50",
        };
      case "Design":
        return {
          icon: <PenTool size={22} className="text-pink-600" />,
          iconBg: "bg-pink-100",
          badgeText: "text-pink-600",
          badgeBg: "bg-pink-50",
        };
      case "API":
        return {
          icon: <Braces size={22} className="text-orange-600" />,
          iconBg: "bg-orange-100",
          badgeText: "text-orange-600",
          badgeBg: "bg-orange-50",
        };
      case "Development":
        return {
          icon: <Layers size={22} className="text-teal-600" />,
          iconBg: "bg-teal-100",
          badgeText: "text-teal-600",
          badgeBg: "bg-teal-50",
        };
    }
  };

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSource.trim()) return;

    const newRes: Resource = {
      id: Date.now(),
      title: newTitle,
      source: newSource,
      category: newCategory,
    };

    setResources([newRes, ...resources]);
    setNewTitle("");
    setNewSource("");
    setIsModalOpen(false);
  };

  const handleDeleteResource = (id: number) => {
    setResources(resources.filter((res) => res.id !== id));
  };

  const filteredResources = resources.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.source.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      selectedCategory === "All Categories" ||
      res.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const getCount = (cat: Resource["category"]) =>
    resources.filter((r) => r.category === cat).length;

  const usedStorage = Number((resources.length * 0.4).toFixed(1));
  const storagePercentage = Math.min((usedStorage / 10) * 100, 100);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-6 border-b border-gray-100 bg-white">
        <Nav
          title="Resources"
          desc="Store and manage your important links & files"
          btnContent="Add Resource"
          btnColor="bg-indigo-600 hover:bg-indigo-700 transition-colors"
          btnContentColor="text-white"
          icon={<Plus size={18} />}
          onBtnClick={() => setIsModalOpen(true)}
        />
      </div>

      <div className="p-6 max-w-7xl mx-auto space-y-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="w-full sm:w-72">
                <SearchInput
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search resources..."
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="All Categories">All Categories</option>
                <option value="Document">Document</option>
                <option value="Design">Design</option>
                <option value="API">API</option>
                <option value="Development">Development</option>
              </select>
            </div>

            <div className="space-y-3">
              {filteredResources.length > 0 ? (
                filteredResources.map((item) => {
                  const config = getCategoryConfig(item.category);
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${config.iconBg}`}
                        >
                          {config.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-400">{item.source}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs font-medium px-3 py-1 rounded-full ${config.badgeBg} ${config.badgeText}`}
                        >
                          {item.category}
                        </span>
                        <button
                          onClick={() => handleDeleteResource(item.id)}
                          className="text-gray-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
                          title="Delete resource"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-200">
                  <p className="text-gray-400 font-medium">
                    No resources found.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-800 text-sm">Categories</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center text-gray-600">
                  <span className="flex items-center gap-2">
                    <Folder size={16} className="text-blue-500" /> Document
                  </span>
                  <span className="font-semibold">{getCount("Document")}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span className="flex items-center gap-2">
                    <Folder size={16} className="text-pink-500" /> Design
                  </span>
                  <span className="font-semibold">{getCount("Design")}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span className="flex items-center gap-2">
                    <Folder size={16} className="text-orange-500" /> API
                  </span>
                  <span className="font-semibold">{getCount("API")}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span className="flex items-center gap-2">
                    <Folder size={16} className="text-teal-500" /> Development
                  </span>
                  <span className="font-semibold">
                    {getCount("Development")}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-3">
              <div className="flex justify-between items-center text-sm">
                <h3 className="font-bold text-gray-800">Storage Used</h3>
                <span className="text-xs font-semibold text-gray-500">
                  {usedStorage} GB / 10 GB
                </span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${storagePercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-5 shadow-xl">
              <h3 className="text-lg font-bold text-gray-800">
                Add New Resource
              </h3>
              <form onSubmit={handleAddResource} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Project Specs"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Source / Platform
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Google Drive, Notion, Figma"
                    value={newSource}
                    onChange={(e) => setNewSource(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) =>
                      setNewCategory(e.target.value as Resource["category"])
                    }
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Document">Document</option>
                    <option value="Design">Design</option>
                    <option value="API">API</option>
                    <option value="Development">Development</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg cursor-pointer transition-colors"
                  >
                    Save Resource
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
