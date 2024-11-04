import React from 'react';
import '../estilos/Reportes.css';

const Reportes = () => {
    const generarReporte = async (tipo) => {
        try {
            const response = await fetch(`http://localhost:8080/api/reportes/${tipo}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/pdf'
                }
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${tipo}_reporte.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                alert("Error al generar el reporte");
            }
        } catch (error) {
            console.error("Error al generar el reporte:", error);
        }
    };

    return (
        <div className="reportes-container">
            <h2>Generar Reportes</h2>
            <button onClick={() => generarReporte('kardex')}>Generar Reporte de Kardex</button>
            <button onClick={() => generarReporte('productos')}>Generar Reporte de Productos</button>
            <button onClick={() => generarReporte('ventas')}>Generar Reporte de Ventas</button>
        </div>
    );
};

export default Reportes;
