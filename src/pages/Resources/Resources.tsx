import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  FileText,
  PenTool,
  Braces,
  Layers,
  Trash2,
  Folder,
} from "lucide-react";
import SearchInput from "../../components/Input/Input";
import AddResourceModal from "../../components/Modal/AddResourceModal";
import { useResources, type Resource } from "../../context/ResourcesContext";

interface ResourcesProps {
  isModalOpen?: boolean;
  setIsModalOpen?: (open: boolean) => void;
}

interface AppOutletContext {
  isResourcesModalOpen: boolean;
  setIsResourcesModalOpen: (open: boolean) => void;
}

export default function Resources({
  isModalOpen,
  setIsModalOpen,
}: ResourcesProps) {
  const outletContext = useOutletContext<AppOutletContext>();
  const modalOpen = isModalOpen ?? outletContext.isResourcesModalOpen;
  const closeModal = setIsModalOpen ?? outletContext.setIsResourcesModalOpen;
  const { resources, addResource, deleteResource } = useResources();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const handleAddResource = (newResData: {
    title: string;
    source: string;
    category: "Document" | "Design" | "API" | "Development";
  }) => {
    addResource(newResData.title, newResData.source, newResData.category);
  };

  const getCategoryConfig = (category: Resource["category"]) => {
    switch (category) {
      case "Document":
        return {
          icon: (
            <FileText size={22} className="text-blue-600 dark:text-blue-400" />
          ),
          iconBg: "bg-blue-100 dark:bg-blue-950/60",
          badgeText: "text-blue-600 dark:text-blue-400",
          badgeBg: "bg-blue-50 dark:bg-blue-950/40",
        };
      case "Design":
        return {
          icon: (
            <PenTool size={22} className="text-pink-600 dark:text-pink-400" />
          ),
          iconBg: "bg-pink-100 dark:bg-pink-950/60",
          badgeText: "text-pink-600 dark:text-pink-400",
          badgeBg: "bg-pink-50 dark:bg-pink-950/40",
        };
      case "API":
        return {
          icon: (
            <Braces
              size={22}
              className="text-orange-600 dark:text-orange-400"
            />
          ),
          iconBg: "bg-orange-100 dark:bg-orange-950/60",
          badgeText: "text-orange-600 dark:text-orange-400",
          badgeBg: "bg-orange-50 dark:bg-orange-950/40",
        };
      case "Development":
        return {
          icon: (
            <Layers size={22} className="text-teal-600 dark:text-teal-400" />
          ),
          iconBg: "bg-teal-100 dark:bg-teal-950/60",
          badgeText: "text-teal-600 dark:text-teal-400",
          badgeBg: "bg-teal-50 dark:bg-teal-950/40",
        };
    }
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
    <div className="flex flex-col h-full w-full bg-slate-50 dark:bg-gray-900 transition-colors">
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
                className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                      className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${config?.iconBg}`}
                        >
                          {config?.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-400 dark:text-gray-400">
                            {item.source}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs font-medium px-3 py-1 rounded-full ${config?.badgeBg} ${config?.badgeText}`}
                        >
                          {item.category}
                        </span>
                        <button
                          onClick={() => deleteResource(item.id)}
                          className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-1 transition-colors cursor-pointer"
                          title="Delete resource"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                  <p className="text-gray-400 dark:text-gray-500 font-medium">
                    No resources found.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm">
                Categories
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                  <span className="flex items-center gap-2">
                    <Folder size={16} className="text-blue-500" /> Document
                  </span>
                  <span className="font-semibold">{getCount("Document")}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                  <span className="flex items-center gap-2">
                    <Folder size={16} className="text-pink-500" /> Design
                  </span>
                  <span className="font-semibold">{getCount("Design")}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                  <span className="flex items-center gap-2">
                    <Folder size={16} className="text-orange-500" /> API
                  </span>
                  <span className="font-semibold">{getCount("API")}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                  <span className="flex items-center gap-2">
                    <Folder size={16} className="text-teal-500" /> Development
                  </span>
                  <span className="font-semibold">
                    {getCount("Development")}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-3">
              <div className="flex justify-between items-center text-sm">
                <h3 className="font-bold text-gray-800 dark:text-gray-100">
                  Storage Used
                </h3>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  {usedStorage} GB / 10 GB
                </span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-700 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${storagePercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddResourceModal
        isOpen={modalOpen}
        onClose={() => closeModal(false)}
        onAddResource={handleAddResource}
      />
    </div>
  );
}

export { Resources };
