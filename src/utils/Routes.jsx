import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../Components/Login";
import Layout from "../Layout/Layout";
import Productos from "../pages/Productos";
import Dashborad from "../pages/Dashborad";

function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      <Routes>
        <Route
          path="/home"
          element={
            <Layout>
              <Dashborad />
            </Layout>
          }
        ></Route>
      </Routes>
      <Routes>
        <Route
          path="/productos"
          element={
            <Layout>
              <Productos />
            </Layout>
          }
        />
      </Routes>
    </HashRouter>
  );
}
export default AppRoutes;
