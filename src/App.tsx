import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Explore from "./pages/Explore";

import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
