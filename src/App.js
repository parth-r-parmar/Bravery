import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {GlobalProvider} from "./contexts/userContext";
import {UserLayout} from "./Layout/UserLayout";
import {AuthLayout} from "./Layout/AuthLayout";
import {PageNotFound} from "./pages/PageNotFound";
import LandingPage from "./pages/LandingPage";
import {SocketProvider} from "./contexts/SocketProvider";
import {ConversationsProvider} from "./contexts/ConversationsProvider";

function App() {
  return (
    <GlobalProvider>
      <SocketProvider>
        <ConversationsProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<LandingPage />} />

              {/* Auth Routes */}
              <Route path='auth/*' element={<AuthLayout />} />

              {/* User Routes */}
              <Route path='user/*' element={<UserLayout />} />

              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </ConversationsProvider>
      </SocketProvider>
    </GlobalProvider>
  );
}

export default React.memo(App);
