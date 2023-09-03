import {Route, Routes} from "react-router-dom";
import Header from "../Components/Header/Header";
import UserDashBoard from "../pages/User/UserDashBoard";
import ProtectedRoute from "../Routes/ProtectedRoute";
import {LayoutContainer, SectionWrapper} from "./Layout";
import {RegisterComplaint, ViewComplaint} from "../pages/User";
import {userDashBoardRoutes} from "../Routes/MenuLists/userDashBoardRoutes";
import {PageNotFound} from "../pages/PageNotFound";

export const UserLayout = () => (
  <ProtectedRoute
    element={
      <LayoutContainer>
        <Header routes={userDashBoardRoutes} isUser={true} />
        <SectionWrapper>
          <Routes>
            <Route path='dashboard' element={<UserDashBoard />} />
            <Route path='register-complaint' element={<RegisterComplaint />} />
            <Route path='view-complaint' element={<ViewComplaint />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </SectionWrapper>
      </LayoutContainer>
    }
  />
);
