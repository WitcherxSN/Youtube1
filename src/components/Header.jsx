import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Header({
  toggleSidebar,
  searchInput,
  setSearchInput,
  handleSearch,
}) {
  const [userChannel, setUserChannel] = useState(null);
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const storedUser = localStorage.getItem("user");

  const user = storedUser
  ? JSON.parse(storedUser)
  : null;

  const [showMenu, setShowMenu] = useState(false);

  const [darkMode, setDarkMode] = useState(
    document.body.classList.contains("dark-mode")
  );

  useEffect(() => {
  async function getMyChannel() {
    if (!user) return;

    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/channels/my/channel",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserChannel(response.data);
    } catch (error) {
      setUserChannel(null);
    }
  }

  getMyChannel();
}, []);

  function toggleDarkMode() {
    const newMode = !darkMode;

    setDarkMode(newMode);

    if (newMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    setShowMenu(false);
  }

  return (
    <header
      className={`flex items-center justify-between px-4 py-2 sticky top-0 z-50 ${
        darkMode
          ? "bg-[#0f0f0f] text-white"
          : "bg-white text-black"
      }`}
    >

      {/* LEFT */}
      <div className="flex items-center gap-4">

        {/* Hamburger */}
        <button
          onClick={toggleSidebar}
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            darkMode
              ? "hover:bg-[#272727]"
              : "hover:bg-gray-100"
          }`}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/17308/17308963.png"
            alt="Menu"
            className={`w-7 h-7 object-contain ${
              darkMode ? "invert" : ""
            }`}
          />
        </button>


        {/* YouTube Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center cursor-pointer"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/174/174883.png"
            alt="YouTube"
            className="w-7 h-7"
          />

          <div className="relative ml-1">

            <span
              className="inline-block text-[23px] font-black leading-none tracking-[-1.6px]"
              style={{
                fontFamily:
                  'Arial',
                transform: "scaleX(0.84)",
                transformOrigin: "left center",
              }}
            >
              YouTube
            </span>

            <span className="absolute -top-1 -right-0 text-[9px] text-gray-500 font-normal">
              IN
            </span>

          </div>
        </div>

      </div>


      {/* CENTER */}
      <div className="flex items-center w-[43%] gap-3">

        {/* Search */}
        <div className="flex items-center flex-1">

          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(e) =>
              setSearchInput(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className={`w-full border rounded-l-full px-4 py-2 outline-none ${
              darkMode
                ? "bg-[#121212] border-[#303030] text-white placeholder:text-gray-400"
                : "bg-white border-gray-300 text-black"
            }`}
          />

          <button
            onClick={handleSearch}
            className={`border border-l-0 rounded-r-full px-5 py-2 ${
              darkMode
                ? "bg-[#222222] border-[#303030]"
                : "bg-gray-50 border-gray-300"
            }`}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/2801/2801881.png"
              alt="Search"
              className={`w-6 h-6 ${
                darkMode ? "invert" : ""
              }`}
            />
          </button>

        </div>


        {/* Microphone */}
        <button
          className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${
            darkMode
              ? "bg-[#272727] hover:bg-[#3f3f3f]"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/709/709950.png"
            alt="Voice search"
            className={`w-5 h-5 ${
              darkMode ? "invert" : ""
            }`}
          />
        </button>

      </div>


      {/* RIGHT */}
      <div className="flex items-center gap-2">

        {/* 3 Dot */}
        <div className="relative">

          <button
            onClick={() =>
              setShowMenu(!showMenu)
            }
            className={`w-10 h-10 rounded-full flex items-center justify-center text-2xl ${
              darkMode
                ? "hover:bg-[#272727]"
                : "hover:bg-gray-100"
            }`}
          >
            ⋮
          </button>


          {showMenu && (
            <div
              className={`absolute right-0 top-11 w-52 rounded-xl shadow-lg border overflow-hidden ${
                darkMode
                  ? "bg-[#282828] border-gray-700 text-white"
                  : "bg-white border-gray-200 text-black"
              }`}
            >

              <button
                onClick={toggleDarkMode}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm ${
                  darkMode
                    ? "hover:bg-[#3f3f3f]"
                    : "hover:bg-gray-100"
                }`}
              >
                <span className="text-lg">
                  {darkMode ? "" : ""}
                </span>

                <span>
                  {darkMode
                    ? "Light theme"
                    : "Dark theme"}
                </span>
              </button>

            </div>
          )}

        </div>


        {/* Sign In */}
{user ? (
  <div className="relative">

    <button
      onClick={() => setShowUserMenu(!showUserMenu)}
      className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold text-lg"
    >
      {user.username.charAt(0).toUpperCase()}
    </button>

    {showUserMenu && (
      <div
        className={`absolute right-0 top-12 w-56 rounded-xl shadow-lg border overflow-hidden ${
          darkMode
            ? "bg-[#282828] border-gray-700 text-white"
            : "bg-white border-gray-200 text-black"
        }`}
      >

        <div className="px-4 py-3 border-b border-gray-200">
          <p className="font-semibold">
            {user.username}
          </p>

          <p className="text-xs text-gray-500">
            {user.email}
          </p>
        </div>

    {userChannel ? (
  <button
    onClick={() => {
      navigate(`/channel/${userChannel.handle}`);
      setShowUserMenu(false);
    }}
    className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm"
  >
    Your Channel
  </button>
) : (
  <button
    onClick={() => {
      navigate("/create-channel");
      setShowUserMenu(false);
    }}
    className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm"
  >
    Create Channel
  </button>
)}

        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            setShowUserMenu(false);

            navigate("/");
            window.location.reload();
          }}
          className={`w-full text-left px-4 py-3 text-sm text-red-600 ${
            darkMode
              ? "hover:bg-[#3f3f3f]"
              : "hover:bg-gray-100"
          }`}
        >
          Logout
        </button>

      </div>
    )}

  </div>
) : (
  <button
    onClick={() => navigate("/login")}
    className={`border px-4 py-2 rounded-full font-medium ${
      darkMode
        ? "border-[#3f3f3f] text-[#3ea6ff] hover:bg-[#263850]"
        : "border-gray-300 text-blue-600 hover:bg-blue-50"
    }`}
  >
    Sign in
  </button>
)}
      </div>

    </header>
  );
}

export default Header;