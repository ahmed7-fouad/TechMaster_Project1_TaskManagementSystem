import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export interface Resource {
  id: number|string;
  title: string;
  source: string;
  category: "Document" | "Design" | "API" | "Development";
  date: string;
}

interface ResourcesContextType {
  resources: Resource[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addResource: (
    title: string,
    source: string,
    category: Resource["category"],
  ) => void;
  deleteResource: (id: number|string) => void;
}

const ResourcesContext = createContext<ResourcesContextType | undefined>(
  undefined,
);

export const ResourcesProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [resources, setResources] = useState<Resource[]>(() => {
    const saved =
      localStorage.getItem("app_resources") ??
      localStorage.getItem("resources");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse resources from localStorage", e);
      }
    }
    return [
      {
        id: 1,
        title: "Project Documentation",
        source: "Google Drive",
        category: "Document",
        date: "Aug 27, 2026",
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("app_resources", JSON.stringify(resources));
  }, [resources]);

  const addResource = (
    title: string,
    source: string,
    category: Resource["category"],
  ) => {
    const newRes: Resource = {
      id: Date.now(),
      title,
      source,
      category,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
    setResources((prev) => [newRes, ...prev]);
    window.alert("The Resource Is Added Successfully");
  };

  const deleteResource = (id: number|string) => {
    const updatedData = resources.filter((resource) => resource.id !== id);
    setResources(updatedData);
  };

  return (
    <ResourcesContext.Provider
      value={{
        resources,
        searchQuery,
        setSearchQuery,
        addResource,
        deleteResource,
      }}
    >
      {children}
    </ResourcesContext.Provider>
  );
};

export const useResources = () => {
  const context = useContext(ResourcesContext);
  if (!context) {
    throw new Error("useResources must be used within a ResourcesProvider");
  }
  return context;
};
