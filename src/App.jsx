import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import FilterBar from "./components/FilterBar";
import VideoCard from "./components/VideoCard";
import { videos } from "./data/videos";
import { Routes, Route } from "react-router-dom";
import VideoPlayer from "./pages/VideoPlayer";

function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [searchText, setSearchText] = useState("");

  const filteredVideos = videos.filter((video) => {
  const matchesCategory =
    selectedCategory === "All" ||
    video.category === selectedCategory;

  const matchesSearch =
    video.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

  return matchesCategory && matchesSearch;
});

function handleSearch() {
  setSearchText(searchInput);
}

  return (
     <Routes>

    <Route
      path="/"
      element={
        <>
          <Header
            toggleSidebar={() => setShowSidebar(!showSidebar)}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            handleSearch={handleSearch}
          />

          <div className="flex">

            {showSidebar && <Sidebar />}

            <main className="flex-1">

              <FilterBar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />

              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">

                {filteredVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    id={video.id}
                    thumbnail={video.thumbnail}
                    title={video.title}
                    channel={video.channel}
                    views={video.views}
                    uploadedAt={video.uploadedAt}
                    channelImage={video.channelImage}
                  />
                ))}

              </div>

            </main>

          </div>
        </>
      }
    />

    <Route
  path="/video/:id"
  element={<VideoPlayer />}
/>

  </Routes>
  );
}

export default App;