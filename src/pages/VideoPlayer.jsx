import { useParams } from "react-router-dom";
import { videos } from "../data/videos";

function VideoPlayer() {
  const { id } = useParams();

  const video = videos.find(
    (video) => video.id === Number(id)
  );

  if (!video) {
    return (
      <h1 className="text-2xl font-bold p-10">
        Video not found
      </h1>
    );
  }

  return (
    <div className="p-6">

      <div className="w-full max-w-5xl mx-auto">

        <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">

          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
          />

        </div>

        <h1 className="text-xl font-bold mt-4">
          {video.title}
        </h1>

        <div className="mt-3">

          <p className="font-semibold">
            {video.channel}
          </p>

          <p className="text-sm text-gray-600 mt-1">
            {video.views} views • {video.uploadedAt}
          </p>

        </div>

      </div>

    </div>
  );
}

export default VideoPlayer;