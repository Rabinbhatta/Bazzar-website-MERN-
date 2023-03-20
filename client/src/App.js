import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/Home/Home.js";
import LoginPage from "./scenes/Login/index";
import { useSelector } from "react-redux";


function App() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              // element={isAuth ? <HomePage /> : <Navigate to="/" />}
              element={<HomePage />}
            />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
