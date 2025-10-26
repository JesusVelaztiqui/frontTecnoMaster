import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../Components/Login";
import Layout from "../Layout/Layout";
import Productos from "../pages/Productos";
import Dashborad from "../pages/Dashborad";
import Pedidos from "../pages/Pedidos";
import Aperturas from "../pages/Aperturas";

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
      <Routes>
        <Route
          path="/pedidos"
          element={
            <Layout>
              <Pedidos />
            </Layout>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/apertura"
          element={
            <Layout>
              <Aperturas />
            </Layout>
          }
        />
      </Routes>
    </HashRouter>
  );
}
export default AppRoutes;
