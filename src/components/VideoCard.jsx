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
      console.log(
        "Channel handle missing for:",
        channel
      );

      return;
    }

    navigate(
      `/channel/${channelHandle}`
    );
  }


  return (
    <div
      onClick={openVideo}
      className="cursor-pointer"
    >

      {/* Thumbnail */}
      <img
        src={thumbnail}
        alt={title}
        className="w-full aspect-video object-cover rounded-xl"
      />


      <div className="flex gap-3 mt-3">

        {/* Channel Image */}
        {channelImage && (
          <img
            src={channelImage}
            alt={channel}
            onClick={openChannel}
            className="w-9 h-9 rounded-full object-cover shrink-0 cursor-pointer"
          />
        )}


        <div>

          {/* Title */}
          <h3 className="font-semibold text-base leading-5">
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