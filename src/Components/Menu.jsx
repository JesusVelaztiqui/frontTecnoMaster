import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const [objtMenu] = useState({
    admin: [
      { pantalla: "inicio", icono: "fas fa-home", routes: "/home" },
      {
        pantalla: "productos",
        icono: "fas fa-truck-loading",
        routes: "/productos",
      },
      { pantalla: "pedidos", icono: "fas fa-people-carry", routes: "/pedidos" },
      {
        pantalla: "presupuestos",
        icono: "fas fa-calculator",
        routes: "/presupuestos",
      },
      {
        pantalla: "orden de compras",
        icono: "fas fa-shopping-cart",
        routes: "/orden-compras",
      },
      { pantalla: "compras", icono: "fas fa-box", routes: "/compras" },
      {
        pantalla: "apertura y cierre",
        icono: "fas fa-key",
        routes: "/apertura-cierre",
      },
      { pantalla: "cobros", icono: "fas fa-dollar-sign", routes: "/cobros" },
      { pantalla: "ventas", icono: "fas fa-chart-line", routes: "/ventas" },
      {
        pantalla: "configuracion",
        icono: "fas fa-cog",
        routes: "/configuracion",
      },
      { pantalla: "usuarios", icono: "fas fa-users", routes: "/usuarios" },
    ],
    ventas: [
      { pantalla: "inicio", icono: "fas fa-home", routes: "/home" },
      {
        pantalla: "productos",
        icono: "fas fa-truck-loading",
        routes: "/productos",
      },
      { pantalla: "pedidos", icono: "fas fa-people-carry", routes: "/pedidos" },
      {
        pantalla: "presupuesto",
        icono: "fas fa-calculator",
        routes: "/presupuesto",
      },
      { pantalla: "ventas", icono: "fas fa-chart-line", routes: "/ventas" },
      { pantalla: "cobros", icono: "fas fa-dollar-sign", routes: "/cobros" },
    ],
    compras: [
      { pantalla: "inicio", icono: "fas fa-home", routes: "/home" },
      {
        pantalla: "productos",
        icono: "fas fa-truck-loading",
        routes: "/productos",
      },
      {
        pantalla: "orden de compras",
        icono: "fas fa-shopping-cart",
        routes: "/orden-compras",
      },
      { pantalla: "compras", icono: "fas fa-box", routes: "/compras" },
      {
        pantalla: "apertura y cierre",
        icono: "fas fa-key",
        routes: "/apertura-cierre",
      },
    ],
    servicios: [
      { pantalla: "inicio", icono: "fas fa-home", routes: "/home" },
      { pantalla: "servicios", icono: "fas fa-tools", routes: "/servicios" },
      {
        pantalla: "ordenes de servicio",
        icono: "fas fa-list",
        routes: "/ordenes-servicio",
      },
      { pantalla: "clientes", icono: "fas fa-users", routes: "/clientes" },
    ],
  });
  const user = JSON.parse(localStorage.getItem("user"));
  function closeSesion() {
    navigate("/login"), localStorage.removeItem("user");
  }

  useEffect(() => {
    setMenu(objtMenu[user.roles]);
  }, []);
  return (
    <div className="sidebarIn">
      <div className="profile">
        <div className="perfil">
          <img
            src="/public/Imagenes/f889af90-977e-423f-886d-2b7636f81d61.png"
            alt=""
          />
        </div>
        <div className="dateuser">
          <div className="user">
            <h2>{user?.nombre}</h2>
          </div>
          <div className="mailuser">
            <h2>{user?.email}</h2>
          </div>
        </div>
      </div>
      <div className="contentItemsMenu">
        {menu?.map((m, i) => (
          <div className="itemsnav" key={i}>
            <div className="icon">
              <i className={m.icono} />
            </div>
            <div className="navmenu" onClick={() => navigate(m.routes)}>
              <h2>{m.pantalla}</h2>
            </div>
          </div>
        ))}
        <div className="itemsnav" onClick={() => closeSesion()}>
          <div className="icon">
            <i className="fas fa-sign-out-alt" />
          </div>
          <div className="navmenu">
            <h2>Cerrar Sesión</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
