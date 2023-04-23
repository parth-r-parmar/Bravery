import React from "react";
import Header from "../Components/Header/Header";
import {Navigate, Route, Routes} from "react-router-dom";
import UserDashBoard from "../pages/User/UserDashBoard";
import {LayoutContainer, SectionWrapper} from "./Layout";
import {Chat, RegisterComplaint, ViewComplaint} from "../pages/User";
import {userDashBoardRoutes} from "../Routes/MenuLists/userDashBoardRoutes";
import ProtectedRoute from "../Routes/ProtectedRoute";

export const UserLayout = () => {
  return (
    <ProtectedRoute
      element={
        <LayoutContainer>
          <Header routes={userDashBoardRoutes} isUser={true} />
          <SectionWrapper>
            <Routes>
              <Route exact path='dashboard' element={<UserDashBoard />} />
              <Route exact path='chat' element={<Chat />} />
              <Route exact path='register-complaint' element={<RegisterComplaint />} />
              <Route exact path='view-complaint' element={<ViewComplaint />} />
              <Route path='*' element={<Navigate to='dashboard' replace={true} />} />
            </Routes>
          </SectionWrapper>
        </LayoutContainer>
      }
    />
  );
};
