import React, { useEffect } from 'react';
import { Route, Routes, Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProductosList from './componentes/ProductosList';
import AgregarProducto from './componentes/AgregarProducto';
import UsuarioList from './componentes/UsuarioList';
import PedidosList from './componentes/PedidosList';
import VentasList from './componentes/VentasList';
import Kardex from './componentes/Kardex';
import Login from './componentes/Login';
import './estilos/AdminDashboard.css';
import Reportes from './componentes/Reportes';

const ROLES = {
    ADMINISTRADOR: "Administrador",
    TECNICO: "Técnico",
    OPERATIVO: "Operativo"
};

const App = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login'); 
        }
    }, [user, navigate]);

    const renderDashboard = () => {
        if (user?.role === ROLES.ADMINISTRADOR) {
            return (
                <>
                    <Route path="/productos" element={<ProductosList />} />
                    <Route path="/agregar-producto" element={<AgregarProducto />} />
                    <Route path="/usuarios" element={<UsuarioList />} />
                    <Route path="/pedidos" element={<PedidosList />} />
                    <Route path="/ventas" element={<VentasList />} />
                    <Route path="/kardex" element={<Kardex />} />
                    <Route path="/reportes" element={<Reportes />} />
                </>
            );
        } else if (user?.role === ROLES.TECNICO) {
            return (
                <>
                    <Route path="/kardex" element={<Kardex />} />
                    <Route path="/productos" element={<ProductosList />} />
                </>
            );
        } else if (user?.role === ROLES.OPERATIVO) {
            return (
                <>
                    <Route path="/pedidos" element={<PedidosList />} />
                    <Route path="/productos" element={<ProductosList />} />
                </>
            );
        } else {
            return <Navigate to="/login" />;
        }
    };

    return (
        <div className="dashboard-container">
            {user && <Navbar userRole={user.role} />}
            <div className="content">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    {user ? renderDashboard() : <Route path="*" element={<Navigate to="/login" />} />}
                    <Route path="/" element={<Navigate to={user ? "/productos" : "/login"} />} />
                </Routes>
            </div>
        </div>
    );
};

const Navbar = ({ userRole }) => {
    const { logout } = useAuth();

    return (
        <nav className="sidebar">
            <h1>Ferretería Online</h1>
            <ul>
                {userRole === ROLES.ADMINISTRADOR && (
                    <>
                        <li><Link to="/productos">Lista de Productos</Link></li>
                        <li><Link to="/agregar-producto">Agregar Producto</Link></li>
                        <li><Link to="/usuarios">Lista de Usuarios</Link></li>
                        <li><Link to="/pedidos">Lista de Pedidos</Link></li>
                        <li><Link to="/ventas">Lista de Ventas</Link></li>
                        <li><Link to="/kardex">Kardex</Link></li>
                        <li><Link to="/reportes">Reportes</Link></li>
                    </>
                )}
                {userRole === ROLES.TECNICO && (
                    <>
                        <li><Link to="/kardex">Kardex</Link></li>
                        <li><Link to="/productos">Lista de Productos</Link></li>
                    </>
                )}
                {userRole === ROLES.OPERATIVO && (
                    <>
                        <li><Link to="/pedidos">Lista de Pedidos</Link></li>
                        <li><Link to="/productos">Lista de Productos</Link></li>
                    </>
                )}
            </ul>
            <button className="logout-button" onClick={logout}>Cerrar Sesión</button>
        </nav>
    );
};

export default App;
