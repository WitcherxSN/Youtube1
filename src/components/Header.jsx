function Header({
  toggleSidebar,
  searchInput,
  setSearchInput,
  handleSearch,
}) {
  return (
    <header className="flex items-center justify-between px-4 py-2 sticky top-0 bg-white z-50">

      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-2xl"
        >
          ☰
        </button>

        <div className="flex items-center gap-1">
          <img
            src="https://cdn-icons-png.flaticon.com/128/174/174883.png"
            alt="YouTube"
            className="w-7 h-7"
          />

          <span className="text-xl font-bold tracking-tight">
            YouTube
          </span>
        </div>
      </div>

      <div className="flex items-center w-[50%]">
        <input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="w-full border border-gray-300 rounded-l-full px-4 py-2 outline-none"
        />

        <button
          onClick={handleSearch}
          className="border border-gray-300 border-l-0 rounded-r-full px-5 py-2 bg-gray-50"
        >
          🔍
        </button>
      </div>

      <button className="border border-blue-500 text-blue-600 px-4 py-2 rounded-full font-medium">
        Sign in
      </button>

    </header>
  );
}

export default Header;