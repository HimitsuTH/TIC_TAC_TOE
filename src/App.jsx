import "./App.css";

import CustomBoard from "./components/CustomBoard";
import GitHubIcon from "@mui/icons-material/GitHub";

function App() {
  return (
    <div className="App h-auto md:h-screen font-mono">
      <CustomBoard />
      <div className=" fixed top-0 right-0 m-5 hover:scale-125 transition-all">
        <a
          href="https://github.com/HimitsuTH/TIC_TAC_TOE"
          target="_blank"
          rel="noreferrer"
        >
          <GitHubIcon />
        </a>
      </div>
    </div>
  );
}

export default App;
