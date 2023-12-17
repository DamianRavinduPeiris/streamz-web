
import NavBar from './components/NavBar';
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {


  return (
    <>
    <BrowserRouter>
          <NavBar />
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            
          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
    
    
    </>
  )
}

export default App
