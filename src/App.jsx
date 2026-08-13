import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import FilterBar from "./components/FilterBar";
import VideoCard from "./components/VideoCard";
import { videos } from "./data/videos";

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

  {videos.map((video) => (
    <VideoCard
      key={video.id}
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
  );
}

export default App;