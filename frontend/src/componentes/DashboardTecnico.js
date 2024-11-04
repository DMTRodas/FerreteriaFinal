import React from 'react';
import Kardex from './Kardex';
import ProductosList from './ProductosList';

const DashboardTecnico = () => {
    return (
        <div>
            <h2>Dashboard Técnico</h2>
            <Kardex />
            <ProductosList />
        </div>
    );
};

export default DashboardTecnico;
