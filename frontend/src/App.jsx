import React, { useState } from "react";

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Toaster from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Home from "./views/home";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {location.pathname !== "/login" &&
        location.pathname !== "/form" &&
        location.pathname !== "/register" &&
        !location.pathname.includes("/dashboard") && <Footer />}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
