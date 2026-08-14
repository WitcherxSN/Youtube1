import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";



function Channel({videos, setVideos}) {
    const [isOwner] = useState(true);
  const [showVideoMenu, setShowVideoMenu] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const { channelName } = useParams();
  const [subscribed, setSubscribed] = useState(false);
  const navigate = useNavigate();
  const [deleteMode, setDeleteMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newVideo, setNewVideo] = useState({
  title: "",
  description: "",
  category: "",
  thumbnail: "",
  videoUrl: "",
});

const [editingVideoId, setEditingVideoId] = useState(null);

const [editVideoData, setEditVideoData] = useState({
  title: "",
  description: "",
  category: "",
  thumbnail: "",
  videoUrl: "",
});

  const initialChannelVideos = videos.filter(
  (video) => video.channel === channelName
);

const [channelVideos, setChannelVideos] = useState(initialChannelVideos);

  const channel = videos.find(
  (video) => video.channel === channelName
);

  if (!channel) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">
          Channel not found
        </h1>
      </div>
    );
  }

  function handleVideoChange(e) {
  setNewVideo({
    ...newVideo,
    [e.target.name]: e.target.value,
  });
}

function uploadVideo() {
  if (
    newVideo.title.trim() === "" ||
    newVideo.description.trim() === "" ||
    newVideo.category === "" ||
    newVideo.thumbnail.trim() === "" ||
    newVideo.videoUrl.trim() === ""
  ) {
    alert("Please fill all fields");
    return;
  }

  const videoToAdd = {
    id: Date.now(),
    title: newVideo.title,
    description: newVideo.description,
    category: newVideo.category,
    thumbnail: newVideo.thumbnail,
    videoUrl: newVideo.videoUrl,
    channel: channel.channel,
    channelImage: channel.channelImage || "",
    views: "0",
    uploadedAt: "Just now",
  };

  setChannelVideos([videoToAdd, ...channelVideos]);
  setVideos([videoToAdd, ...videos,]);

  setNewVideo({
    title: "",
    description: "",
    category: "",
    thumbnail: "",
    videoUrl: "",
  });

  setShowUploadForm(false);
}

function startEditVideo(video) {
  setEditingVideoId(video.id);

  setEditVideoData({
    title: video.title,
    description: video.description,
    category: video.category,
    thumbnail: video.thumbnail,
    videoUrl: video.videoUrl,
  });
}

function handleEditVideoChange(e) {
  setEditVideoData({
    ...editVideoData,
    [e.target.name]: e.target.value,
  });
}

function saveEditedVideo(id) {
  const updatedChannelVideos = channelVideos.map((video) =>
    video.id === id
      ? {
          ...video,
          ...editVideoData,
        }
      : video
  );

  const updatedVideos = videos.map((video) =>
    video.id === id
      ? {
          ...video,
          ...editVideoData,
        }
      : video
  );

  setChannelVideos(updatedChannelVideos);
  setVideos(updatedVideos);

  setEditingVideoId(null);

  setEditVideoData({
    title: "",
    description: "",
    category: "",
    thumbnail: "",
    videoUrl: "",
  });
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
      <div className="relative flex items-center justify-between mt-3 mb-5">

  <h2 className="text-xl font-bold">
    Videos
  </h2>

  {isOwner && (
    <div className="relative">

      <button
        onClick={() => setShowVideoMenu(!showVideoMenu)}
        className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/128/2740/2740657.png"
          alt="Video options"
          className="w-5 h-5 object-contain"
        />
      </button>

      {showVideoMenu && (
        <div className="absolute right-0 top-11 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">

          <button
            onClick={() => {
              setShowUploadForm(true);
              setShowVideoMenu(false);
            }}
            className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm"
          >
            Upload Video
          </button>

                            <button
                    onClick={() => {
                      setEditMode(true);
                      setDeleteMode(false);
                      setShowVideoMenu(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm"
                  >
                    Edit Video
                  </button>

          <button
            onClick={() =>  {setDeleteMode(true);
                setShowVideoMenu(false);}}
            className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm text-red-600"
          >
            Delete Video
          </button>

        </div>
      )}

    </div>
  )}

</div>
         {showUploadForm && (
  <div className="mb-6 border border-gray-200 rounded-xl p-5 bg-white">

    <div className="flex items-center justify-between mb-4">

      <h3 className="text-lg font-semibold">
        Upload Video
      </h3>

      <button
        onClick={() => setShowUploadForm(false)}
        className="text-xl"
      >
        ×
      </button>

    </div>

    <div className="space-y-4">

  <input
    type="text"
    name="title"
    value={newVideo.title}
    onChange={handleVideoChange}
    placeholder="Video title"
    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
  />

  <textarea
    name="description"
    value={newVideo.description}
    onChange={handleVideoChange}
    placeholder="Video description"
    rows="4"
    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
  />

  <select
    name="category"
    value={newVideo.category}
    onChange={handleVideoChange}
    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
  >
    <option value="">Select category</option>
    <option value="React">React</option>
    <option value="JavaScript">JavaScript</option>
    <option value="Gaming">Gaming</option>
    <option value="Music">Music</option>
    <option value="News">News</option>
    <option value="Live">Live</option>
    <option value="Movies">Movies</option>
  </select>

  <input
    type="text"
    name="thumbnail"
    value={newVideo.thumbnail}
    onChange={handleVideoChange}
    placeholder="Thumbnail URL"
    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
  />

  <input
    type="text"
    name="videoUrl"
    value={newVideo.videoUrl}
    onChange={handleVideoChange}
    placeholder="Video URL"
    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
  />

  <div className="flex justify-end gap-3">

    <button
      onClick={() => setShowUploadForm(false)}
      className="px-4 py-2 rounded-full hover:bg-gray-100"
    >
      Cancel
    </button>

    <button
    onClick={uploadVideo}
      className="px-5 py-2 rounded-full bg-blue-600 text-white font-medium"
    >
      Upload
    </button>

  </div>

</div>

  </div>
)}

{deleteMode && (
  <div className="flex items-center justify-between mb-4">

    <p className="text-sm text-red-600 font-medium">
      Select a video to delete
    </p>

    <button
      onClick={() => setDeleteMode(false)}
      className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm"
    >
      Cancel
    </button>

  </div>
)}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {channelVideos.map((video) => (

  <div
    key={video.id}
    className="relative cursor-pointer"
    onClick={() => {
      if (!deleteMode && !editMode) {
        navigate(`/video/${video.id}`);
      }
    }}
  >

    {/* Delete Mode */}
    {deleteMode && (
      <button
        onClick={(e) => {
          e.stopPropagation();

          const updatedChannelVideos = channelVideos.filter(
            (item) => item.id !== video.id
          );

          const updatedVideos = videos.filter(
            (item) => item.id !== video.id
          );

          setChannelVideos(updatedChannelVideos);
          setVideos(updatedVideos);

          setDeleteMode(false);
        }}
        className="absolute top-2 right-2 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-sm"
      >
        Delete
      </button>
    )}

    {/* Edit Mode */}
    {editMode && (
      <button
        onClick={(e) => {
          e.stopPropagation();

          startEditVideo(video);
          setEditMode(false);
        }}
        className="absolute top-2 right-2 z-10 bg-gray-400 text-white px-3 py-1 rounded-full text-sm"
      >
        Edit
      </button>
    )}

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

    {editingVideoId === video.id && (
      <div
        onClick={(e) => e.stopPropagation()}
        className="mt-4 border border-gray-200 rounded-xl p-4 space-y-3 bg-white"
      >

        <input
          type="text"
          name="title"
          value={editVideoData.title}
          onChange={handleEditVideoChange}
          placeholder="Video title"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
        />

        <textarea
          name="description"
          value={editVideoData.description}
          onChange={handleEditVideoChange}
          placeholder="Description"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
        />

        <select
          name="category"
          value={editVideoData.category}
          onChange={handleEditVideoChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="React">React</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Gaming">Gaming</option>
          <option value="Music">Music</option>
          <option value="News">News</option>
          <option value="Live">Live</option>
          <option value="Movies">Movies</option>
        </select>

        <input
          type="text"
          name="thumbnail"
          value={editVideoData.thumbnail}
          onChange={handleEditVideoChange}
          placeholder="Thumbnail URL"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
        />

        <input
          type="text"
          name="videoUrl"
          value={editVideoData.videoUrl}
          onChange={handleEditVideoChange}
          placeholder="Video URL"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
        />

        <div className="flex gap-2 justify-end">

          <button
            onClick={() => setEditingVideoId(null)}
            className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={() => saveEditedVideo(video.id)}
            className="px-4 py-2 rounded-full bg-blue-600 text-white"
          >
            Save
          </button>

        </div>

      </div>
    )}

  </div>

))}

      </div>

    </div>
  );
}

export default Channel;