import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import MyPhotos from './pages/MyPhotos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />}></Route>
        <Route path="/MyPhotos" element={<MyPhotos />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
