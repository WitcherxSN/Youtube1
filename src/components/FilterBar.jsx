function FilterBar({ selectedCategory, setSelectedCategory }) {
  const filters = [
    "All",
    "Music",
    "Gaming",
    "React",
    "JavaScript",
    "News",
    "Live",
    "Movies",
  ];

  return (
    <div className="flex gap-3 overflow-x-auto px-4 py-3 bg-white">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setSelectedCategory(filter)}
          className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium ${
            selectedCategory === filter
              ? "bg-black text-white"
              : "bg-gray-100 hover:bg-gray-200 text-black"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;