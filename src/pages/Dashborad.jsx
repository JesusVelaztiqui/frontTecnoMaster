import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = ({
  productos = [],
  ventas = [],
  cobros = [],
  ingresos = [],
  egresos = [],
  pedidos = [],
  compras = [],
}) => {
  const totalProductos = productos.length;
  const productosStockBajo = productos.filter((p) => p.stock < 10).length;

  const ventasHoy = ventas.filter(
    (v) => new Date(v.fecha).toDateString() === new Date().toDateString()
  ).length;
  const totalVentas = ventas.reduce((sum, v) => sum + (v.monto || 0), 0);

  const cobrosPendientes = cobros.filter(
    (c) => c.estado === "pendiente"
  ).length;
  const totalCobros = cobros.reduce((sum, c) => sum + (c.monto || 0), 0);

  const pedidosPendientes = pedidos.filter(
    (p) => p.estado === "pendiente"
  ).length;
  const comprasDelMes = compras.filter(
    (c) => new Date(c.fecha).getMonth() === new Date().getMonth()
  ).length;

  const totalIngresos = ingresos.reduce((sum, i) => sum + (i.monto || 0), 0);
  const totalEgresos = egresos.reduce((sum, e) => sum + (e.monto || 0), 0);
  const balance = totalIngresos - totalEgresos;

  const ventasData = [
    { mes: "Ene", ventas: 4000 },
    { mes: "Feb", ventas: 3000 },
    { mes: "Mar", ventas: 5000 },
    { mes: "Abr", ventas: 4500 },
    { mes: "May", ventas: 6000 },
    { mes: "Jun", ventas: 7000 },
  ];

  const ingresosEgresosData = [
    { mes: "Ene", ingresos: 120000, egresos: 80000 },
    { mes: "Feb", ingresos: 15000, egresos: 9000 },
    { mes: "Mar", ingresos: 18000, egresos: 10000 },
    { mes: "Abr", ingresos: 16000, egresos: 11000 },
    { mes: "May", ingresos: 20000, egresos: 12000 },
    { mes: "Jun", ingresos: 22000, egresos: 13000 },
  ];

  const estadoPedidos = [
    { name: "Completados", value: 65, color: "#81a684" },
    { name: "Pendientes", value: 25, color: "#57886c" },
    { name: "Cancelados", value: 10, color: "#f8c7cc" },
  ];

  const MetricCard = ({ title, value, icon, trend, trendValue }) => (
    <div className="metric-card">
      <div className="metric-header">
        <div className="metric-info">
          <p className="metric-title">{title}</p>
          <h3 className="metric-value">{value}</h3>
          {trend && (
            <div className={`metric-trend ${trend}`}>
              <i
                className={
                  trend === "up" ? "fas fa-arrow-up" : "fas fa-arrow-down"
                }
              ></i>
              <span>{trendValue}%</span>
            </div>
          )}
        </div>
        <div className="metric-icon">
          <i className={icon}></i>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Inicio</h1>
          <p>Resumen completo del estado del negocio</p>
        </div>

        <div className="metrics-grid">
          <MetricCard
            title="Total Revenue"
            value={`$${totalVentas.toLocaleString()}`}
            icon="fas fa-dollar-sign"
            trend="up"
            trendValue="12"
          />
          <MetricCard
            title="Products"
            value={totalProductos.toLocaleString()}
            icon="fas fa-truck-loading"
            trend="up"
            trendValue="8"
          />
          <MetricCard
            title="Clients"
            value="1,423"
            icon="fas fa-users"
            trend="up"
            trendValue="5"
          />
          <MetricCard
            title="Balance"
            value={`$${balance.toLocaleString()}`}
            icon={balance >= 0 ? "fas fa-trending-up" : "fas fa-trending-down"}
            trend={balance >= 0 ? "up" : "down"}
            trendValue="15"
          />
        </div>

        <div className="charts-section">
          <div className="chart-card large">
            <div className="chart-header">
              <h3>Monthly Revenue</h3>
              <div className="chart-value">$ 15,000</div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={ventasData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="mes" stroke="#466060" />
                  <YAxis stroke="#466060" />
                  <Line
                    type="monotone"
                    dataKey="ventas"
                    stroke="#57886c"
                    strokeWidth={3}
                    dot={{ fill: "#57886c", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="notification-card">
            <div className="notification-badge">NEW</div>
            <h3>Sistema actualizado!</h3>
            <p>Nuevas funcionalidades disponibles para mejorar tu gestión.</p>
            <button className="notification-btn">Ver detalles</button>
          </div>
        </div>

        <div className="secondary-charts">
          <div className="chart-card medium">
            <div className="chart-header">
              <h3>Ingresos vs Egresos</h3>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={ingresosEgresosData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="mes" stroke="#466060" />
                  <YAxis stroke="#466060" />
                  <Bar dataKey="ingresos" fill="#81a684" />
                  <Bar dataKey="egresos" fill="#f8c7cc" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-card medium">
            <div className="chart-header">
              <h3>Estado de Pedidos</h3>
            </div>
            <div className="chart-container pie-container">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={estadoPedidos}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    dataKey="value"
                  >
                    {estadoPedidos.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-legend">
                {estadoPedidos.map((item, index) => (
                  <div key={index} className="legend-item">
                    <div
                      className="legend-color"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span>{item.name}</span>
                    <strong>{item.value}%</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="activity-card">
            <div className="chart-header">
              <h3>Actividad Reciente</h3>
            </div>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon green">
                  <i className="fas fa-check"></i>
                </div>
                <div className="activity-content">
                  <p>
                    <strong>Nueva venta</strong> completada
                  </p>
                  <span>Hace 5 minutos</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon orange">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="activity-content">
                  <p>
                    <strong>Pedido pendiente</strong> de revisión
                  </p>
                  <span>Hace 1 hora</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon blue">
                  <i className="fas fa-user-plus"></i>
                </div>
                <div className="activity-content">
                  <p>
                    <strong>Nuevo cliente</strong> registrado
                  </p>
                  <span>Hace 2 horas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
