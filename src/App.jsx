
import './App.css'
import './index.css'

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <Header />

      <div className="flex">
        <Sidebar />

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