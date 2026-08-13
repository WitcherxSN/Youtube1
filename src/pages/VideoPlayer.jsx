import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { videos } from "../data/videos";


function VideoPlayer() {
  const { id } = useParams();

  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(1200);
  const [subscribed, setSubscribed] = useState(false);
  const [commentText, setCommentText] = useState("");

const [comments, setComments] = useState([
  {
    id: 1,
    user: "Shravan",
    text: "Great video! Very helpful.",
  },
  {
    id: 2,
    user: "Rahul",
    text: "This explanation was really clear.",
  },
]);

  const video = videos.find(
    (video) => video.id === Number(id)
  );

  function handleProgressClick(e) {
  const progressBar = e.currentTarget;

  const clickPosition =
    e.nativeEvent.offsetX / progressBar.clientWidth;

  const newTime =
    clickPosition * videoRef.current.duration;

  videoRef.current.currentTime = newTime;
}

function handleLike() {
  if (liked) {
    setLiked(false);
    setLikeCount(likeCount - 1);
  } else {
    setLiked(true);
    setLikeCount(likeCount + 1);

    if (disliked) {
      setDisliked(false);
    }
  }
}

function handleDislike() {
  if (disliked) {
    setDisliked(false);
  } else {
    setDisliked(true);

    if (liked) {
      setLiked(false);
      setLikeCount(likeCount - 1);
    }
  }
}

function handleFullscreen() {
  const player = videoRef.current.parentElement;

  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    player.requestFullscreen();
  }
}

function handleVolumeChange(e) {
  const newVolume = Number(e.target.value);

  setVolume(newVolume);
  videoRef.current.volume = newVolume;

  if (newVolume === 0) {
    setIsMuted(true);
  } else {
    setIsMuted(false);
  }
}

function toggleMute() {
  if (isMuted) {
    videoRef.current.muted = false;
    setIsMuted(false);
  } else {
    videoRef.current.muted = true;
    setIsMuted(true);
  }
}

  function handleTimeUpdate() {
  const current = videoRef.current.currentTime;
  const total = videoRef.current.duration;

  setCurrentTime(current);
  setDuration(total);

  if (total) {
    setProgress((current / total) * 100);
  }
}

function formatTime(time) {
  if (!time || isNaN(time)) {
    return "0:00";
  }

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

  function togglePlay() {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }

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

        {/* Video Player */}
        <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">

          <video
  ref={videoRef}
  src={video.videoUrl}
  className="w-full h-full object-contain"
  onClick={togglePlay}
  onTimeUpdate={handleTimeUpdate}
  onLoadedMetadata={handleTimeUpdate}
/>
          {/* Player Controls */}
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-10 bg-gradient-to-t from-black/80 to-transparent">

             {/* Progress Bar */}
  <div
onClick={handleProgressClick}
  className="w-full h-1 bg-gray-500 cursor-pointer mb-3">

    <div
      className="h-full bg-red-600"
      style={{ width: `${progress}%` }}
    ></div>

  </div>

  {/* Bottom Controls */}
  {/* Bottom Controls */}
<div className="flex items-center justify-between">

  {/* Left Controls */}
  <div className="flex items-center gap-4">

    <button
      onClick={togglePlay}
      className="text-white text-2xl"
    >
      {isPlaying ? "❚❚" : "▶"}
    </button>

    <button
      onClick={toggleMute}
      className="text-white text-xl"
    >
      {isMuted ? "🔇" : "🔊"}
    </button>

    <input
      type="range"
      min="0"
      max="1"
      step="0.1"
      value={volume}
      onChange={handleVolumeChange}
      className="w-24 cursor-pointer"
    />

    <span className="text-white text-sm">
      {formatTime(currentTime)} / {formatTime(duration)}
    </span>

  </div>

  {/* Right Control */}
  <button
    onClick={handleFullscreen}
    className="text-white text-2xl"
  >
    ⛶
  </button>

</div>
  

          </div>

        </div>

        {/* Video Title */}
        <h1 className="text-xl font-bold mt-4">
          {video.title}
        </h1>

        {/* Channel Information */}
<div className="flex items-center justify-between mt-4 gap-4 flex-wrap">

  {/* Channel Side */}
  <div className="flex items-center gap-3">

    {video.channelImage && (
      <img
        src={video.channelImage}
        alt={video.channel}
        className="w-10 h-10 rounded-full object-cover"
      />
    )}

    <div>
      <p className="font-semibold">
        {video.channel}
      </p>

      <p className="text-xs text-gray-500">
        1.2M subscribers
      </p>
    </div>

    <button
  onClick={() => setSubscribed(!subscribed)}
  className={`ml-2 px-4 py-2 rounded-full font-medium ${
    subscribed
      ? "bg-gray-200 text-black"
      : "bg-black text-white"
  }`}
 >
  {subscribed ? "Subscribed" : "Subscribe"}
 </button>

  </div>

  {/* Right Side - Actions */}
 <div className="flex items-center gap-2 flex-wrap">

  {/* Like / Dislike */}
  <div className="flex items-center bg-gray-100 rounded-full">

    <button
  onClick={handleLike}
  className={`flex items-center gap-2 px-4 py-2 rounded-l-full ${
    liked
      ? "bg-gray-300"
      : "hover:bg-gray-200"
  }`}
 >
  <img
    src="https://cdn-icons-png.flaticon.com/128/3405/3405355.png"
    alt="Like"
    className="w-5 h-5 object-contain"
  />

  <span className="font-medium">
    {likeCount}
  </span>
 </button>

    <div className="h-6 w-px bg-gray-300"></div>

    <button
  onClick={handleDislike}
  className={`flex items-center px-4 py-2 rounded-r-full ${
    disliked
      ? "bg-gray-300"
      : "hover:bg-gray-200"
  }`}
 >
  <img
    src="https://cdn-icons-png.flaticon.com/128/4466/4466315.png"
    alt="Dislike"
    className="w-5 h-5 object-contain"
  />
 </button>

  </div>


  {/* Share */}
  <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full font-medium">

    <img
      src="https://cdn-icons-png.flaticon.com/128/2990/2990295.png"
      alt="Share"
      className="w-5 h-5 object-contain"
    />

    <span>Share</span>

  </button>


  {/* Download */}
  <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full font-medium">

    <img
      src="https://cdn-icons-png.flaticon.com/128/3502/3502477.png"
      alt="Download"
      className="w-5 h-5 object-contain"
    />

    <span>Download</span>

  </button>


  {/* Save */}
  <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full font-medium">

    <img
      src="https://cdn-icons-png.flaticon.com/128/9511/9511721.png"
      alt="Save"
      className="w-5 h-5 object-contain"
    />

    <span>Save</span>

  </button>


  {/* Three Dot Menu */}
  <button className="bg-gray-100 hover:bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center">

    <img
      src="https://cdn-icons-png.flaticon.com/128/2740/2740657.png"
      alt="More options"
      className="w-5 h-5 object-contain"
    />

  </button>

 </div>

 </div>

      </div>
      {/* Description Box */}
<div className="mt-4 bg-gray-100 rounded-xl p-4">

  <p className="font-semibold text-sm">
    {video.views} views • {video.uploadedAt}
  </p>

  <p className="mt-2 text-sm leading-5">
    {video.description}
  </p>

</div>

  {/* Comments Section */}
<div className="mt-8">

  <h2 className="text-xl font-semibold mb-5">
    {comments.length} Comments
  </h2>

  {/* Add Comment */}
  <div className="flex gap-3 mb-6">

    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold">
      S
    </div>

    <div className="flex-1">

      <input
        type="text"
        placeholder="Add a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className="w-full border-b border-gray-300 py-2 outline-none focus:border-black"
      />

      <div className="flex justify-end gap-3 mt-3">

        <button
          onClick={() => setCommentText("")}
          className="px-4 py-2 rounded-full hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          className="px-4 py-2 rounded-full bg-blue-600 text-white font-medium"
        >
          Comment
        </button>

      </div>

    </div>

  </div>

 {/* Existing Comments */}
<div className="space-y-7">

  {comments.map((comment) => (
    <div
      key={comment.id}
      className="flex gap-3"
    >

      {/* User Avatar */}
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold shrink-0">
        {comment.user.charAt(0)}
      </div>

      {/* Comment Content */}
      <div className="flex-1">

        {/* Username */}
        <p className="text-sm font-semibold">
          @{comment.user}
          <span className="ml-2 text-xs text-gray-500 font-normal">
            2 days ago
          </span>
        </p>

        {/* Comment Text */}
        <p className="text-sm mt-1">
          {comment.text}
        </p>


        {/* Comment Actions */}
        <div className="flex items-center gap-2 mt-2">

          {/* Like */}
          <button
            className="flex items-center gap-1 px-2 py-2 rounded-full hover:bg-gray-100"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/3405/3405355.png"
              alt="Like comment"
              className="w-4 h-4 object-contain"
            />

            <span className="text-xs text-gray-600">
              12
            </span>
          </button>


          {/* Dislike */}
          <button
            className="flex items-center px-2 py-2 rounded-full hover:bg-gray-100"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/4466/4466315.png"
              alt="Dislike comment"
              className="w-4 h-4 object-contain"
            />
          </button>


          {/* Reply */}
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 font-medium text-sm"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/2990/2990295.png"
              alt="Reply"
              className="w-4 h-4 object-contain"
            />

            Reply
          </button>

        </div>

      </div>

    </div>
  ))}

</div>

</div>

    </div>
  );
}

export default VideoPlayer;