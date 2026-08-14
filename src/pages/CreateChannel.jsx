import { useState } from "react";

function CreateChannel() {
  const [channelData, setChannelData] = useState({
    channelName: "",
    handle: "",
    description: "",
    profileImage: "",
    bannerImage: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setChannelData({
      ...channelData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      channelData.channelName.trim() === "" ||
      channelData.handle.trim() === "" ||
      channelData.description.trim() === ""
    ) {
      setError("Please fill all required fields");
      return;
    }

    setError("");

    console.log(channelData);

    alert("Channel created successfully");

    // Backend and real user connection will come later
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">

        <h1 className="text-2xl font-bold mb-2">
          Create your channel
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          Add your channel details below.
        </p>

        {error && (
          <p className="text-sm text-red-600 mb-4">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Channel Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Channel Name
            </label>

            <input
              type="text"
              name="channelName"
              value={channelData.channelName}
              onChange={handleChange}
              placeholder="Enter channel name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Handle */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Handle
            </label>

            <input
              type="text"
              name="handle"
              value={channelData.handle}
              onChange={handleChange}
              placeholder="@yourchannel"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>

            <textarea
              name="description"
              value={channelData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Tell viewers about your channel"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Profile Image URL
            </label>

            <input
              type="text"
              name="profileImage"
              value={channelData.profileImage}
              onChange={handleChange}
              placeholder="Paste profile image URL"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Banner Image */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Banner Image URL
            </label>

            <input
              type="text"
              name="bannerImage"
              value={channelData.bannerImage}
              onChange={handleChange}
              placeholder="Paste banner image URL"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end">

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium"
            >
              Create Channel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateChannel;