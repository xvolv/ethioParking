import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./components/client/home.jsx";
import WelcomeBanner from "./components/client/WelcomeBanner.jsx";
import Reserve from "./components/client/Reserve.jsx"; // your reserve page

function App() {
  return (
    <BrowserRouter>
      <WelcomeBanner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reserve/:id" element={<Reserve />} />
        {/* add other routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
