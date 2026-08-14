import { useNavigate } from "react-router-dom";

function Sidebar() {

   const navigate = useNavigate();
  return (
    <aside className="w-60 h-[calc(100vh-60px)] overflow-y-auto px-3 py-3 bg-white text-sm shrink-0">

      {/* Main Section */}
      <div className="pb-1">

        <a onClick={() => navigate("/")}
          href="#"
          className="flex items-center gap-6 px-3 py-2.5 rounded-lg bg-gray-100 font-medium"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/20/20176.png"
            className="w-[21px] h-[21px] object-contain"
            alt="Home"
          />
          Home
        </a>

        <a
          href="#"
          className="flex items-center gap-6 px-3 py-2.5 rounded-lg hover:bg-gray-100"
        >
          <img
            src="https://img.icons8.com/material-outlined/24/youtube-shorts.png"
            className="w-[21px] h-[21px] object-contain"
            alt="Shorts"
          />
          Shorts
        </a>

        <a
          href="#"
          className="flex items-center gap-6 px-3 py-2.5 rounded-lg hover:bg-gray-100"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/2989/2989849.png"
            className="w-[21px] h-[21px] object-contain"
            alt="Subscriptions"
          />
          Subscriptions
        </a>

        <a
          href="#"
          className="flex items-center gap-6 px-3 py-2.5 rounded-lg hover:bg-gray-100"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/2609/2609282.png"
            className="w-[21px] h-[21px] object-contain"
            alt="You"
          />
          You
        </a>

        <a
          href="#"
          className="flex items-center gap-6 px-3 py-2.5 rounded-lg hover:bg-gray-100"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/2961/2961948.png"
            className="w-[21px] h-[21px] object-contain"
            alt="History"
          />
          History
        </a>

      </div>

      {/* Sign In Section */}
      <div className="border-t border-b border-gray-200 px-3 py-4 mt-2">

        <p className="mb-3 leading-5">
          Sign in to like videos, comment, and subscribe.
        </p>

        <button onClick={() => navigate("/login")} className="border border-gray-300 text-blue-600 px-4 py-2 rounded-full font-medium hover:bg-blue-50">
          Sign in
        </button>

      </div>

      {/* Explore */}
      <div className="border-b border-gray-200 py-3">

        <h2 className="px-3 mb-2 text-base font-semibold">
          Explore
        </h2>

        <a
          href="#"
          className="flex items-center gap-6 px-3 py-2.5 rounded-lg hover:bg-gray-100"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/2662/2662503.png"
            className="w-[21px] h-[21px] object-contain"
            alt="Shopping"
          />
          Shopping
        </a>

        <a
          href="#"
          className="flex items-center gap-6 px-3 py-2.5 rounded-lg hover:bg-gray-100"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/727/727218.png"
            className="w-[21px] h-[21px] object-contain"
            alt="Music"
          />
          Music
        </a>

        <a
          href="#"
          className="flex items-center gap-6 px-3 py-2.5 rounded-lg hover:bg-gray-100"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/7696/7696569.png"
            className="w-[21px] h-[21px] object-contain"
            alt="Movies and TV"
          />
          Movies & TV
        </a>

        <button className="flex items-center gap-6 w-full px-3 py-2.5 rounded-lg hover:bg-gray-100">
          <span className="w-[21px] text-center text-xl">
            <img className="w-[21px] h-[21px] object-contain" src="https://cdn-icons-png.flaticon.com/128/15785/15785497.png" alt="" />
          </span>
          Show more
        </button>

      </div>

      {/* More From YouTube */}
      <div className="border-b border-gray-200 py-3">

        <h2 className="px-3 mb-2 text-base font-semibold">
          More from YouTube
        </h2>

        <a
          href="#"
          className="flex items-center gap-6 px-3 py-2.5 rounded-lg hover:bg-gray-100"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/174/174883.png"
            className="w-[21px] h-[21px] object-contain"
            alt="YouTube Premium"
          />
          Try Premium for ₹0
        </a>

        <a
          href="#"
          className="flex items-center gap-6 px-3 py-2.5 rounded-lg hover:bg-gray-100"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/15047/15047447.png"
            className="w-[21px] h-[21px] object-contain"
            alt="YouTube Music"
          />
          YouTube Music
        </a>

        <a
          href="#"
          className="flex items-center gap-6 px-3 py-2.5 rounded-lg hover:bg-gray-100"
        >
          <img
            src="https://images.seeklogo.com/logo-png/43/3/youtube-kids-logo-png_seeklogo-435171.png"
            className="w-[21px] h-[21px] object-contain"
            alt="YouTube Kids"
          />
          YouTube Kids
        </a>

        <a
          href="#"
          className="flex items-center gap-6 px-3 py-2.5 rounded-lg hover:bg-gray-100"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/2958/2958784.png"
            className="w-[21px] h-[21px] object-contain"
            alt="Report history"
          />
          Report history
        </a>

      </div>

      {/* Footer */}
      <div className="px-3 py-4 text-xs text-gray-600 leading-5">

        <div className="mb-3 font-semibold">
          <a href="#" className="mr-2">
            About
          </a>

          <a href="#" className="mr-2">
            Press
          </a>

          <a href="#" className="mr-2">
            Copyright
          </a>

          <a href="#" className="mr-2">
            Contact us
          </a>

          <a href="#" className="mr-2">
            Creators
          </a>

          <a href="#" className="mr-2">
            Advertise
          </a>

          <a href="#">
            Developers
          </a>
        </div>

        <div className="mb-4 font-semibold">
          <a href="#" className="mr-2">
            Terms
          </a>

          <a href="#" className="mr-2">
            Privacy
          </a>

          <a href="#" className="mr-2">
            Policy & Safety
          </a>

          <a href="#" className="mr-2">
            How YouTube works
          </a>

          <a href="#">
            Test new features
          </a>
        </div>

        <p className="text-gray-500">
          © 2026 Google LLC
        </p>

      </div>

    </aside>
  );
}

export default Sidebar;