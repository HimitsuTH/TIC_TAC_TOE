import { useState } from "react";
import "./App.css";
import Board3 from "./components/Board3";
import Board4 from "./components/Board4";
import CustomBoard from "./components/CustomBoard";

function App() {
  const [tabActive, setTabActive] = useState("tab1");


  const handleTabActive = (e) => {
    setTabActive(e.currentTarget.id);
  };
  return (
    <div className="App h-screen">
      <CustomBoard/>
      <ul className=" border-b  flex-row gap-5  flex z-30 border-black transition-all mb-2 duration-700">
        <li
          id="tab1"
          onClick={(e) => handleTabActive(e)}
          className="-mb-px mr-1  cursor-pointer list-item"
        >
          <p
            className={` inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold hover:text-white hover:bg-slate-700 border-black   ${
              tabActive == "tab1" ? " text-white bg-black " : " text-black  "
            }`}
          >
            3X3
          </p>
        </li>
        <li
          className="mr-1 cursor-pointer list-item"
          id="tab2"
          onClick={(e) => handleTabActive(e)}
        >
          <p
            className={` inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold hover:text-white hover:bg-slate-700 border-black   ${
              tabActive == "tab2" ? " text-white bg-black " : " text-black  "
            }`}
          >
            4X4
          </p>
        </li>
      </ul>
      <div className="board">
        {tabActive == "tab1" ? <Board3 size={9} /> : <Board4 size={16} />}
      </div>
    </div>
  );
}

export default App;
