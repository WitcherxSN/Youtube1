import { useNavigate } from "react-router-dom";

function VideoCard({
  id,
  thumbnail,
  title,
  channel,
  channelHandle,
  views,
  uploadedAt,
  channelImage,
}) {
  const navigate = useNavigate();

  function openVideo() {
    navigate(`/video/${id}`);
  }

  function openChannel(e) {
    e.stopPropagation();

    if (!channelHandle) {
      console.log("Channel handle missing for:", channel);
      return;
    }

    navigate(`/channel/${channelHandle}`);
  }

  return (
    <div
      onClick={openVideo}
      className="group cursor-pointer rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-gray-200"
    >

      {/* Thumbnail */}
      <div className="overflow-hidden rounded-xl">
        <img
          src={thumbnail}
          alt={title}
          className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Video Details */}
      <div className="flex gap-3 mt-3 p-2">

        {/* Channel Image */}
        {channelImage && (
          <img
            src={channelImage}
            alt={channel}
            onClick={openChannel}
            className="w-9 h-9 rounded-full object-cover shrink-0 cursor-pointer"
          />
        )}

        <div className="min-w-0">

          {/* Title */}
          <h3 className="font-semibold text-base leading-5 line-clamp-2">
            {title}
          </h3>

          {/* Channel Name */}
          <p
            onClick={openChannel}
            className="text-sm text-gray-600 mt-1 hover:text-black cursor-pointer"
          >
            {channel}
          </p>

          {/* Views + Upload Time */}
          <p className="text-sm text-gray-600">
            {views} views • {uploadedAt}
          </p>

        </div>

      </div>

    </div>
  );
}

export default VideoCard;