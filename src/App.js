import "./App.css";

import { Header } from "./components/Header";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Character } from "./pages/Character";
import { Comic } from "./pages/Comic";
import { Serie } from "./pages/Serie";
import { Comics } from "./pages/Comics";
import { Series } from "./pages/Series";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/character/:id" element={<Character />}></Route>
          <Route
            path="/character/:idCharacter/comic/:idComic"
            element={<Comic />}
          ></Route>
          <Route
            path="/character/:idCharacter/serie/:idSerie"
            element={<Serie />}
          ></Route>
          <Route path="/comics/character/:id" element={<Comics />}></Route>
          <Route path="/series/character/:id" element={<Series />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
