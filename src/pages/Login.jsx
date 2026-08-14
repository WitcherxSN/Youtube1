import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      formData.email.trim() === "" ||
      formData.password.trim() === ""
    ) {
      setError("Please fill all fields");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    setError("");

    // Backend login will be connected later
    console.log(formData);

    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">

        <div className="flex items-center justify-center gap-2 mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/128/174/174883.png"
            alt="YouTube"
            className="w-9 h-9"
          />

          <h1 className="text-2xl font-bold">
            YouTube
          </h1>
        </div>

        <h2 className="text-2xl font-semibold text-center">
          Sign in
        </h2>

        <p className="text-sm text-gray-500 text-center mt-2 mb-6">
          Sign in to continue 
        </p>

        {error && (
          <p className="mb-4 text-sm text-red-600 text-center">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium"
          >
            Sign in
          </button>

        </form>

        <p className="text-center text-sm mt-6">
          Don't have an account?{" "}

          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 font-medium"
          >
            Register
          </button>
        </p>

      </div>

    </div>
  );
}

export default Login;