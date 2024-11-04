import React from 'react';
import PedidosList from './PedidosList';
import ProductosList from './ProductosList';

const DashboardOperativo = () => {
    return (
        <div>
            <h2>Dashboard Operativo</h2>
            <PedidosList />
            <ProductosList />
        </div>
    );
};

export default DashboardOperativo;
