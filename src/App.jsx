import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import FilterBar from "./components/FilterBar";
import VideoCard from "./components/VideoCard";

import VideoPlayer from "./pages/VideoPlayer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Channel from "./pages/Channel";
import CreateChannel from "./pages/CreateChannel";


function formatViews(views) {
  if (views >= 1000000) {
    return `${(views / 1000000)
      .toFixed(1)
      .replace(".0", "")}M`;
  }

  if (views >= 1000) {
    return `${(views / 1000)
      .toFixed(1)
      .replace(".0", "")}K`;
  }

  return views.toString();
}


function formatUploadedTime(date) {
  const uploadedDate = new Date(date);
  const now = new Date();

  const seconds = Math.floor(
    (now - uploadedDate) / 1000
  );

  if (seconds < 60) {
    return "Just now";
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes} minute${
      minutes === 1 ? "" : "s"
    } ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hour${
      hours === 1 ? "" : "s"
    } ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days} day${
      days === 1 ? "" : "s"
    } ago`;
  }

  const weeks = Math.floor(days / 7);

  if (weeks < 4) {
    return `${weeks} week${
      weeks === 1 ? "" : "s"
    } ago`;
  }

  const months = Math.floor(days / 30);

  if (months < 12) {
    return `${months} month${
      months === 1 ? "" : "s"
    } ago`;
  }

  const years = Math.floor(days / 365);

  return `${years} year${
    years === 1 ? "" : "s"
  } ago`;
}


function App() {
  const [showSidebar, setShowSidebar] =
    useState(true);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [searchInput, setSearchInput] =
    useState("");

  const [searchText, setSearchText] =
    useState("");

  const [videos, setVideos] =
    useState([]);


  const filteredVideos = videos.filter(
    (video) => {

      const matchesCategory =
        selectedCategory === "All" ||
        video.category === selectedCategory;

      const matchesSearch =
        video.title
          .toLowerCase()
          .includes(
            searchText.toLowerCase()
          );

      return (
        matchesCategory &&
        matchesSearch
      );
    }
  );


  function handleSearch() {
    setSearchText(searchInput);
  }


  useEffect(() => {

    async function fetchVideos() {
      try {

        const response =
          await axios.get(
            "http://localhost:5000/api/videos"
          );

        const formattedVideos =
          response.data.map((video) => ({

            ...video,

            id: video._id,

            thumbnail:
              video.thumbnailUrl,

            channel:
              video.channel?.channelName ||
              "Unknown Channel",

            channelHandle:
              video.channel?.handle ||
              "",

            channelImage:
              video.channel?.profileImage ||
              "",

            views:
              formatViews(
                video.views || 0
              ),

            uploadedAt:
              formatUploadedTime(
                video.createdAt
              ),
          }));

        setVideos(
          formattedVideos
        );

      } catch (error) {

        console.log(
          "Video fetch error:",
          error
        );

      }
    }

    fetchVideos();

  }, []);


  return (
    <Routes>

      {/* HOME */}
      <Route
        path="/"
        element={
          <>
            <Header
              toggleSidebar={() =>
                setShowSidebar(
                  !showSidebar
                )
              }
              searchInput={
                searchInput
              }
              setSearchInput={
                setSearchInput
              }
              handleSearch={
                handleSearch
              }
            />

            <div className="flex">

              {showSidebar && (
                <Sidebar />
              )}

              <main className="flex-1">

                <FilterBar
                  selectedCategory={
                    selectedCategory
                  }
                  setSelectedCategory={
                    setSelectedCategory
                  }
                />

                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">

                  {filteredVideos.map(
                    (video) => (

                      <VideoCard
                        key={video.id}

                        id={video.id}

                        thumbnail={
                          video.thumbnail
                        }

                        title={
                          video.title
                        }

                        channel={
                          video.channel
                        }

                        channelHandle={
                          video.channelHandle
                        }

                        views={
                          video.views
                        }

                        uploadedAt={
                          video.uploadedAt
                        }

                        channelImage={
                          video.channelImage
                        }
                      />

                    )
                  )}

                </div>

              </main>

            </div>
          </>
        }
      />


      {/* VIDEO PLAYER */}
      <Route
        path="/video/:id"
        element={
          <>
            <Header
              toggleSidebar={() =>
                setShowSidebar(
                  !showSidebar
                )
              }
              searchInput={
                searchInput
              }
              setSearchInput={
                setSearchInput
              }
              handleSearch={
                handleSearch
              }
            />

            <VideoPlayer
              videos={videos}
            />
          </>
        }
      />


      {/* CHANNEL */}
      <Route
        path="/channel/:handle"
        element={
          <>
            <Header
              toggleSidebar={() =>
                setShowSidebar(
                  !showSidebar
                )
              }
              searchInput={
                searchInput
              }
              setSearchInput={
                setSearchInput
              }
              handleSearch={
                handleSearch
              }
            />

            <div className="flex">

              {showSidebar && (
                <Sidebar />
              )}

              <main className="flex-1">

                <Channel
                  videos={videos}
                  setVideos={setVideos}
                />

              </main>

            </div>
          </>
        }
      />


      {/* REGISTER */}
      <Route
        path="/register"
        element={
          <Register />
        }
      />


      {/* LOGIN */}
      <Route
        path="/login"
        element={
          <Login />
        }
      />


      {/* CREATE CHANNEL */}
      <Route
        path="/create-channel"
        element={
          <CreateChannel />
        }
      />

    </Routes>
  );
}

export default App;