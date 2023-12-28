import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Explore from "./pages/Explore";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Stream from "./pages/Stream";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/stream" element={<Stream />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
