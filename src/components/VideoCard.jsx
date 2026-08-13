function VideoCard({ thumbnail, title, channel, views, uploadedAt }) {
  return (
    <div className="cursor-pointer">

      <img
        src={thumbnail}
        alt={title}
        className="w-full aspect-video object-cover rounded-xl"
      />

      <div className="mt-3">

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
  );
}

export default VideoCard;