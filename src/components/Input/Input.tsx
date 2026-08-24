interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchInput({
  searchQuery,
  setSearchQuery,
}: SearchInputProps) {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search notes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-3 border border-slate-300 rounded-lg outline-none focus:border-indigo-600 text-sm shadow-sm"
      />
    </div>
  );
}
