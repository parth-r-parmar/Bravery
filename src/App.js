import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {GlobalProvider} from "./contexts/userContext";
import AuthRoute from "./NavRoutes/AuthRoute";
import ProtectedRoute from "./NavRoutes/ProtectedRoute";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Register from "./pages/Register";
import UserDashBoard from "./pages/UserDashBoard";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />

          {/* Auth Routes */}
          <Route exact path='/login' element={<AuthRoute element={<Login />} />}></Route>
          <Route exact path='/register' element={<Register />}></Route>

          {/* Private Routes */}
          <Route
            exact
            path='/dashboard'
            element={<ProtectedRoute element={<UserDashBoard />} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default React.memo(App);
