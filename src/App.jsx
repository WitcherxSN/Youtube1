import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import FilterBar from "./components/FilterBar";
import VideoCard from "./components/VideoCard";
import VideoPlayer from "./pages/VideoPlayer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Channel from "./pages/Channel";
import { videos as initialVideos } from "./data/videos";
import CreateChannel from "./pages/CreateChannel";

function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [searchText, setSearchText] = useState("");
  const [videos, setVideos] = useState(initialVideos);

  const filteredVideos = videos.filter((video) => {
    const matchesCategory =
      selectedCategory === "All" ||
      video.category === selectedCategory;

    const matchesSearch = video.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  function handleSearch() {
    setSearchText(searchInput);
  }

  return (
    <Routes>

      {/* Home Page */}
      <Route
        path="/"
        element={
          <>
            <Header
              toggleSidebar={() =>
                setShowSidebar(!showSidebar)
              }
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


      {/* Video Player Page */}
      <Route
        path="/video/:id"
        element={
          <>
            <Header
              toggleSidebar={() =>
                setShowSidebar(!showSidebar)
              }
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              handleSearch={handleSearch}
            />

            <VideoPlayer videos={videos} />
          </>
        }
      />


      {/* Channel Page */}
      <Route
        path="/channel/:handle"
        element={
          <>
            <Header
              toggleSidebar={() =>
                setShowSidebar(!showSidebar)
              }
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              handleSearch={handleSearch}
            />
            <div className="flex">

              {showSidebar && <Sidebar/>}
              <main className="flex-1">
                <Channel videos={videos}
                 setVideos={setVideos} />
                </main>
            </div>

            
          </>
        }
      />


      {/* Register Page */}
      <Route
        path="/register"
        element={<Register />}
      />


      {/* Login Page */}
      <Route
        path="/login"
        element={<Login />}
      />

            //Channel page
           <Route
           path="/create-channel"
         element={<CreateChannel />}
          />

    </Routes>
  );
}

export default App;