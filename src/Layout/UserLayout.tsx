import {Navigate, Route, Routes} from "react-router-dom";
import Header from "../Components/Header/Header";
import UserDashBoard from "../pages/User/UserDashBoard";
import ProtectedRoute from "../Routes/ProtectedRoute";
import {LayoutContainer, SectionWrapper} from "./Layout";
import {Chat, RegisterComplaint, ViewComplaint} from "../pages/User";
import {userDashBoardRoutes} from "../Routes/MenuLists/userDashBoardRoutes";

export const UserLayout = () => (
  <ProtectedRoute
    element={
      <LayoutContainer>
        <Header routes={userDashBoardRoutes} isUser={true} />
        <SectionWrapper>
          <Routes>
            <Route path='dashboard' element={<UserDashBoard />} />
            <Route path='chat' element={<Chat />} />
            <Route path='register-complaint' element={<RegisterComplaint />} />
            <Route path='view-complaint' element={<ViewComplaint />} />
            <Route path='*' element={<Navigate to='dashboard' replace={true} />} />
          </Routes>
        </SectionWrapper>
      </LayoutContainer>
    }
  />
);
