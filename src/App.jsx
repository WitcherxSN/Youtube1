import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <>
      <Header
        toggleSidebar={() => setShowSidebar(!showSidebar)}
      />

      <div className="flex">
        {showSidebar && <Sidebar />}

        <main className="flex-1 p-6">
          <h2 className="text-2xl font-semibold">
            Videos will come here
          </h2>
        </main>
      </div>
    </>
  );
}

export default App;