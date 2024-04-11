import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import AuthCallBackPage from "./pages/AuthCallBackPage";
import UserProfilePage from "./pages/UserProfilePage";
import AuthLayout from "./auth/AuthLayout";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout showHero={true}>
              <HomePage />
            </Layout>
          }
        />
        <Route path="/auth-callback" element={<AuthCallBackPage />} />
        <Route element={<AuthLayout />}>
          <Route
            path="/user-profile"
            element={
              <Layout>
                <UserProfilePage />
              </Layout>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
