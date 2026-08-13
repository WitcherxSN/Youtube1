import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import FilterBar from "./components/FilterBar";
import VideoCard from "./components/VideoCard";

function App() {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <>
      <Header
        toggleSidebar={() => setShowSidebar(!showSidebar)}
      />

      <div className="flex">

        {showSidebar && <Sidebar />}

        <main className="flex-1">

          <FilterBar />
<div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">

  <VideoCard
    thumbnail="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
    title="Learn React in 30 Minutes"
    channel="Code With John"
    views="15K"
    uploadedAt="2 months ago"
  />

  <VideoCard
    thumbnail="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
    title="JavaScript Full Course for Beginners"
    channel="Web Dev Academy"
    views="120K"
    uploadedAt="1 year ago"
  />

  <VideoCard
    thumbnail="https://images.unsplash.com/photo-1550745165-9bc0b252726f"
    title="My Ultimate Gaming Setup Tour"
    channel="Tech Gaming"
    views="85K"
    uploadedAt="3 weeks ago"
  />

  <VideoCard
    thumbnail="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b"
    title="Best Live Music Performance"
    channel="Music World"
    views="245K"
    uploadedAt="5 days ago"
  />

  <VideoCard
    thumbnail="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba"
    title="Top Movies You Should Watch"
    channel="Movie Central"
    views="98K"
    uploadedAt="4 months ago"
  />

  <VideoCard
    thumbnail="https://images.unsplash.com/photo-1504711434969-e33886168f5c"
    title="Today's Top News Explained"
    channel="Daily News"
    views="56K"
    uploadedAt="2 hours ago"
  />

  <VideoCard
    thumbnail="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
    title="Build Your First MERN Stack Project"
    channel="Coding Master"
    views="32K"
    uploadedAt="1 month ago"
  />

  <VideoCard
    thumbnail="https://images.unsplash.com/photo-1511512578047-dfb367046420"
    title="Top 10 Games You Need to Play"
    channel="Gaming Zone"
    views="175K"
    uploadedAt="6 months ago"
  />

</div>

        </main>

      </div>
    </>
  );
}

export default App;