import { useState } from "react";
import { useParams } from "react-router-dom";
import { videos } from "../data/videos";

function Channel() {
    const [isOwner] = useState(true);
  const { channelName } = useParams();

  const [subscribed, setSubscribed] = useState(false);

  const channelVideos = videos.filter(
    (video) => video.channel === channelName
  );

  const channel = channelVideos[0];

  if (!channel) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">
          Channel not found
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">

      {/* Banner */}
      <div className="w-full h-48 bg-gray-200 rounded-xl"></div>

     {/* Channel Info */}
<div className="flex items-center gap-5 mt-6">

  {/* Channel Image */}
  {channel.channelImage ? (
    <img
      src={channel.channelImage}
      alt={channel.channel}
      className="w-24 h-24 rounded-full object-cover"
    />
  ) : (
    <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-bold">
      {channel.channel.charAt(0)}
    </div>
  )}

  {/* Channel Details */}
  <div>

    <h1 className="text-3xl font-bold">
      {channel.channel}
    </h1>

    <p className="text-sm text-gray-600 mt-1">
      @{channel.channel.replaceAll(" ", "").toLowerCase()}
      {" "}• 1.2M subscribers
      {" "}• {channelVideos.length} videos
    </p>

    <p className="text-sm text-gray-600 mt-2">
      Welcome to {channel.channel}
    </p>

    {/* Subscribe + More */}
    <div className="flex items-center gap-2 mt-4">

      <button
        onClick={() => setSubscribed(!subscribed)}
        className={`px-5 py-2 rounded-full font-medium ${
          subscribed
            ? "bg-gray-200 text-black"
            : "bg-black text-white"
        }`}
      >
        {subscribed ? "Subscribed" : "Subscribe"}
      </button>

     

    </div>

  </div>

</div>

      {/* Tabs */}
      <div className="flex gap-8 mt-8 border-b">

        <button className="font-semibold border-b-2 border-black pb-3">
          Home
        </button>

        <button className="text-gray-600 pb-3">
          Videos
        </button>

        <button className="text-gray-600 pb-3">
          About
        </button>

      </div>

      {/* Videos */}
      <div className="flex items-center justify-between mt-3 mb-5">

  <h2 className="text-xl font-bold">
    Videos
  </h2>

  {isOwner && (
    <button
      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
    >
      <img
        src="https://cdn-icons-png.flaticon.com/128/2740/2740657.png"
        alt="Video options"
        className="w-5 h-5 object-contain"
      />
    </button>
  )}

</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {channelVideos.map((video) => (

          <div
            key={video.id}
            className="cursor-pointer"
          >

            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full aspect-video object-cover rounded-xl"
            />

            <h3 className="font-semibold mt-3">
              {video.title}
            </h3>

            <p className="text-sm text-gray-600 mt-1">
              {video.views} views • {video.uploadedAt}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Channel;