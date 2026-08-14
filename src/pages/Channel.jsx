import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Channel({ videos, setVideos }) {
  const { handle } = useParams();
  const navigate = useNavigate();

  const [channel, setChannel] = useState(null);
  const [channelVideos, setChannelVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedUser = localStorage.getItem("user");

const currentUser = storedUser
  ? JSON.parse(storedUser)
  : null;

const isOwner =
  currentUser &&
  channel &&
  channel.handle === "codewithshravan" &&
  String(channel.owner?._id || channel.owner) ===
    String(currentUser.id || currentUser._id);
  const [subscribed, setSubscribed] = useState(false);

  const [showVideoMenu, setShowVideoMenu] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);

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


  // FETCH CHANNEL
  useEffect(() => {
    async function getChannel() {
      try {
        setLoading(true);

        const response = await axios.get(
          `http://localhost:5000/api/channels/${handle}`
        );

        const fetchedChannel = response.data;

        setChannel(fetchedChannel);

        const matchedVideos = videos.filter((video) => {
          if (typeof video.channel === "string") {
            return (
              video.channel === fetchedChannel.channelName
            );
          }

          if (
            video.channel &&
            typeof video.channel === "object"
          ) {
            return (
              video.channel._id === fetchedChannel._id ||
              video.channel.channelName ===
                fetchedChannel.channelName
            );
          }

          return false;
        });

        setChannelVideos(matchedVideos);

      } catch (error) {
        console.log(
          "Channel fetch error:",
          error
        );

        setChannel(null);

      } finally {
        setLoading(false);
      }
    }

    getChannel();

  }, [handle, videos]);


  // HANDLE UPLOAD INPUT
  function handleVideoChange(e) {
    setNewVideo({
      ...newVideo,
      [e.target.name]: e.target.value,
    });
  }


  // UPLOAD VIDEO
  async function uploadVideo() {
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

    try {
      const token =
        localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/videos",
        {
          title: newVideo.title,

          description:
            newVideo.description,

          category:
            newVideo.category,

          thumbnailUrl:
            newVideo.thumbnail,

          videoUrl:
            newVideo.videoUrl,

          channelId:
            channel._id,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const savedVideo =
        response.data.video;

      const frontendVideo = {
        ...savedVideo,

        id: savedVideo._id,

        thumbnail:
          savedVideo.thumbnailUrl,

        channel:
          channel.channelName,

        channelHandle:
          channel.handle,

        channelImage:
          channel.profileImage || "",

        uploadedAt:
          "Just now",
      };

      setChannelVideos([
        frontendVideo,
        ...channelVideos,
      ]);

      setVideos([
        frontendVideo,
        ...videos,
      ]);

      setNewVideo({
        title: "",
        description: "",
        category: "",
        thumbnail: "",
        videoUrl: "",
      });

      setShowUploadForm(false);

    } catch (error) {
      console.log(
        "UPLOAD VIDEO ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Video upload failed"
      );
    }
  }


  // START EDIT
  function startEditVideo(video) {
    const videoId =
      video.id || video._id;

    setEditingVideoId(videoId);

    setEditVideoData({
      title:
        video.title || "",

      description:
        video.description || "",

      category:
        video.category || "",

      thumbnail:
        video.thumbnail ||
        video.thumbnailUrl ||
        "",

      videoUrl:
        video.videoUrl || "",
    });
  }


  // EDIT INPUT CHANGE
  function handleEditVideoChange(e) {
    setEditVideoData({
      ...editVideoData,
      [e.target.name]: e.target.value,
    });
  }


  // SAVE EDITED VIDEO TO MONGODB
  async function saveEditedVideo(id) {
    try {
      const token =
        localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:5000/api/videos/${id}`,
        {
          title:
            editVideoData.title,

          description:
            editVideoData.description,

          category:
            editVideoData.category,

          thumbnailUrl:
            editVideoData.thumbnail,

          videoUrl:
            editVideoData.videoUrl,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const updatedVideo =
        response.data.video;

      setChannelVideos(
        channelVideos.map((video) => {
          const videoId =
            video._id || video.id;

          if (videoId === id) {
            return {
              ...video,
              ...updatedVideo,

              id:
                updatedVideo._id,

              thumbnail:
                updatedVideo.thumbnailUrl,
            };
          }

          return video;
        })
      );

      setVideos(
        videos.map((video) => {
          const videoId =
            video._id || video.id;

          if (videoId === id) {
            return {
              ...video,
              ...updatedVideo,

              id:
                updatedVideo._id,

              thumbnail:
                updatedVideo.thumbnailUrl,
            };
          }

          return video;
        })
      );

      setEditingVideoId(null);

      setEditVideoData({
        title: "",
        description: "",
        category: "",
        thumbnail: "",
        videoUrl: "",
      });

    } catch (error) {
      console.log(
        "EDIT VIDEO ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Could not update video"
      );
    }
  }


  // DELETE VIDEO FROM MONGODB
  async function deleteVideo(id) {
    try {
      const token =
        localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/videos/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setChannelVideos(
        channelVideos.filter(
          (video) =>
            (video._id || video.id) !== id
        )
      );

      setVideos(
        videos.filter(
          (video) =>
            (video._id || video.id) !== id
        )
      );

      setDeleteMode(false);

    } catch (error) {
      console.log(
        "DELETE VIDEO ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Could not delete video"
      );
    }
  }


  // LOADING
  if (loading) {
    return (
      <div className="p-10">
        <h1 className="text-xl font-medium">
          Loading channel...
        </h1>
      </div>
    );
  }


  // CHANNEL NOT FOUND
  if (!channel) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">
          Channel not found
        </h1>
      </div>
    );
  }
console.log("CURRENT USER:", currentUser);
console.log("CHANNEL:", channel);
console.log("CHANNEL OWNER:", channel?.owner);
console.log("IS OWNER:", isOwner);



  return (
    <div className="max-w-6xl mx-auto px-6 py-6">

      {/* BANNER */}
      {channel.bannerImage ? (
        <img
          src={channel.bannerImage}
          alt="Channel banner"
          className="w-full h-48 object-cover rounded-xl"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 rounded-xl"></div>
      )}


      {/* CHANNEL INFO */}
      <div className="flex items-center gap-5 mt-6">

        {/* PROFILE IMAGE */}
        {channel.profileImage ? (
          <img
            src={channel.profileImage}
            alt={channel.channelName}
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-purple-600 text-white flex items-center justify-center text-3xl font-bold">
            {channel.channelName
              .charAt(0)
              .toUpperCase()}
          </div>
        )}


        <div>

          <h1 className="text-3xl font-bold">
            {channel.channelName}
          </h1>

          <p className="text-sm text-gray-600 mt-1">
            @{channel.handle}
            {" "}•{" "}
            {channel.subscribers || 0} subscribers
            {" "}•{" "}
            {channelVideos.length} videos
          </p>

          <p className="text-sm text-gray-600 mt-2">
            {channel.description}
          </p>


          {/* SUBSCRIBE */}
          <div className="flex items-center gap-2 mt-4">

            <button
              onClick={() =>
                setSubscribed(!subscribed)
              }
              className={`px-5 py-2 rounded-full font-medium ${
                subscribed
                  ? "bg-gray-200 text-black"
                  : "bg-black text-white"
              }`}
            >
              {subscribed
                ? "Subscribed"
                : "Subscribe"}
            </button>

          </div>

        </div>

      </div>


      {/* TABS */}
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


      {/* VIDEOS HEADING */}
      <div className="relative flex items-center justify-between mt-3 mb-5">

        <h2 className="text-xl font-bold">
          Videos
        </h2>


        {/* OWNER MENU */}
        {isOwner && (
          <div className="relative">

            <button
              onClick={() =>
                setShowVideoMenu(
                  !showVideoMenu
                )
              }
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

                {/* UPLOAD */}
                <button
                  onClick={() => {
                    setShowUploadForm(true);

                    setShowVideoMenu(false);

                    setEditMode(false);

                    setDeleteMode(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm"
                >
                  Upload Video
                </button>


                {/* EDIT */}
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


                {/* DELETE */}
                <button
                  onClick={() => {
                    setDeleteMode(true);

                    setEditMode(false);

                    setShowVideoMenu(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm text-red-600"
                >
                  Delete Video
                </button>

              </div>
            )}

          </div>
        )}

      </div>


      {/* UPLOAD FORM */}
      {showUploadForm && (
        <div className="mb-6 border border-gray-200 rounded-xl p-5 bg-white">

          <div className="flex items-center justify-between mb-4">

            <h3 className="text-lg font-semibold">
              Upload Video
            </h3>

            <button
              onClick={() =>
                setShowUploadForm(false)
              }
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
              <option value="">
                Select category
              </option>

              <option value="React">
                React
              </option>

              <option value="JavaScript">
                JavaScript
              </option>

              <option value="Gaming">
                Gaming
              </option>

              <option value="Music">
                Music
              </option>

              <option value="News">
                News
              </option>

              <option value="Live">
                Live
              </option>

              <option value="Movies">
                Movies
              </option>
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
                onClick={() =>
                  setShowUploadForm(false)
                }
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


      {/* DELETE MODE */}
      {deleteMode && (
        <div className="flex items-center justify-between mb-4">

          <p className="text-sm text-red-600 font-medium">
            Select a video to delete
          </p>

          <button
            onClick={() =>
              setDeleteMode(false)
            }
            className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm"
          >
            Cancel
          </button>

        </div>
      )}


      {/* EDIT MODE */}
      {editMode && (
        <div className="flex items-center justify-between mb-4">

          <p className="text-sm text-blue-600 font-medium">
            Select a video to edit
          </p>

          <button
            onClick={() =>
              setEditMode(false)
            }
            className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm"
          >
            Cancel
          </button>

        </div>
      )}


      {/* VIDEO GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {channelVideos.map((video) => {

          const videoId =
            video.id || video._id;

          return (
            <div
              key={videoId}
              className="relative cursor-pointer"
              onClick={() => {

                if (
                  !deleteMode &&
                  !editMode &&
                  editingVideoId !== videoId
                ) {
                  navigate(
                    `/video/${videoId}`
                  );
                }

              }}
            >


              {/* DELETE BUTTON */}
              {deleteMode && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    deleteVideo(videoId);
                  }}
                  className="absolute top-2 right-2 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-sm"
                >
                  Delete
                </button>
              )}


              {/* EDIT BUTTON */}
              {editMode && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    startEditVideo(video);

                    setEditMode(false);
                  }}
                  className="absolute top-2 right-2 z-10 bg-gray-500 text-white px-3 py-1 rounded-full text-sm"
                >
                  Edit
                </button>
              )}


              {/* THUMBNAIL */}
              <img
                src={
                  video.thumbnail ||
                  video.thumbnailUrl
                }
                alt={video.title}
                className="w-full aspect-video object-cover rounded-xl"
              />


              <h3 className="font-semibold mt-3">
                {video.title}
              </h3>


              <p className="text-sm text-gray-600 mt-1">
                {video.views || 0} views

                {video.uploadedAt
                  ? ` • ${video.uploadedAt}`
                  : ""}
              </p>


              {/* EDIT FORM */}
              {editingVideoId === videoId && (

                <div
                  onClick={(e) =>
                    e.stopPropagation()
                  }
                  className="mt-4 border border-gray-200 rounded-xl p-4 space-y-3 bg-white"
                >

                  <input
                    type="text"
                    name="title"
                    value={
                      editVideoData.title
                    }
                    onChange={
                      handleEditVideoChange
                    }
                    placeholder="Video title"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                  />


                  <textarea
                    name="description"
                    value={
                      editVideoData.description
                    }
                    onChange={
                      handleEditVideoChange
                    }
                    placeholder="Description"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                  />


                  <select
                    name="category"
                    value={
                      editVideoData.category
                    }
                    onChange={
                      handleEditVideoChange
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >

                    <option value="React">
                      React
                    </option>

                    <option value="JavaScript">
                      JavaScript
                    </option>

                    <option value="Gaming">
                      Gaming
                    </option>

                    <option value="Music">
                      Music
                    </option>

                    <option value="News">
                      News
                    </option>

                    <option value="Live">
                      Live
                    </option>

                    <option value="Movies">
                      Movies
                    </option>

                  </select>


                  <input
                    type="text"
                    name="thumbnail"
                    value={
                      editVideoData.thumbnail
                    }
                    onChange={
                      handleEditVideoChange
                    }
                    placeholder="Thumbnail URL"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                  />


                  <input
                    type="text"
                    name="videoUrl"
                    value={
                      editVideoData.videoUrl
                    }
                    onChange={
                      handleEditVideoChange
                    }
                    placeholder="Video URL"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                  />


                  <div className="flex gap-2 justify-end">

                    <button
                      onClick={() => {
                        setEditingVideoId(null);

                        setEditVideoData({
                          title: "",
                          description: "",
                          category: "",
                          thumbnail: "",
                          videoUrl: "",
                        });
                      }}
                      className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                      Cancel
                    </button>


                    <button
                      onClick={() =>
                        saveEditedVideo(
                          videoId
                        )
                      }
                      className="px-4 py-2 rounded-full bg-blue-600 text-white"
                    >
                      Save
                    </button>

                  </div>

                </div>

              )}

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default Channel;