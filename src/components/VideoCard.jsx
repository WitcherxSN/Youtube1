function VideoCard({
  thumbnail,
  title,
  channel,
  views,
  uploadedAt,
  channelImage,
}) {
  return (
    <div className="cursor-pointer">

      <img
        src={thumbnail}
        alt={title}
        className="w-full aspect-video object-cover rounded-xl"
      />

      <div className="flex gap-3 mt-3">

        <img
          src={channelImage}
          alt={channel}
          className="w-9 h-9 rounded-full object-cover shrink-0"
        />

        <div>
          <h3 className="font-semibold text-base leading-5">
            {title}
          </h3>

          <p className="text-sm text-gray-600 mt-1">
            {channel}
          </p>

          <p className="text-sm text-gray-600">
            {views} views • {uploadedAt}
          </p>
        </div>

      </div>

    </div>
  );
}

export default VideoCard;