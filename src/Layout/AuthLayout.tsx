import Header from "../Components/Header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import { LayoutContainer, SectionWrapper } from "./Layout";
import { Login, Register } from "../pages/Auth";
import { authRoutes } from "../Routes/MenuLists/authRoutes";
import AuthRoute from "../Routes/AuthRoute";

export const AuthLayout = () => {
  return (
    <AuthRoute
      element={
        <LayoutContainer>
          <Header routes={authRoutes} />
          <SectionWrapper>
            <Routes>
              <Route index path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route
                path="*"
                element={<Navigate to="login" replace={true} />}
              />
            </Routes>
          </SectionWrapper>
        </LayoutContainer>
      }
    />
  );
};
