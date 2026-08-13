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