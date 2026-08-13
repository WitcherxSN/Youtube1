import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import FilterBar from "./components/FilterBar";

function App() {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <>
      <Header
        toggleSidebar={() => setShowSidebar(!showSidebar)}
      />

      <div className="flex">

        {showSidebar && <Sidebar />}

        <main className="flex-1">

          <FilterBar />

          <div className="p-4">
            <h2 className="text-2xl font-semibold">
              Videos will come here
            </h2>
          </div>

        </main>

      </div>
    </>
  );
}

export default App;