import React, { useEffect, useState } from 'react';
import VentasServicio from '../servicios/VentasServicio';
import '../estilos/VentasList.css';

const VentasList = () => {
    const [ventas, setVentas] = useState([]);
    const [nuevaVenta, setNuevaVenta] = useState({
        cliente: '',
        productos: '',
        fecha: new Date().toISOString().split("T")[0], 
        total: 0,
        metodoPago: 'Efectivo'
    });

    useEffect(() => {
        const fetchVentas = async () => {
            try {
                const response = await VentasServicio.obtenerVentas();
                setVentas(response.data);
            } catch (error) {
                console.error("Error al obtener las ventas:", error);
            }
        };

        fetchVentas();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevaVenta({ ...nuevaVenta, [name]: value });
    };

    const agregarVenta = async () => {
        try {
            const venta = {
                ...nuevaVenta,
                productos: nuevaVenta.productos.split(",").map(prod => prod.trim())
            };
            const response = await VentasServicio.agregarVenta(venta);
            setVentas([...ventas, response.data]);
            setNuevaVenta({
                cliente: '',
                productos: '',
                fecha: new Date().toISOString().split("T")[0],
                total: 0,
                metodoPago: 'Efectivo'
            });
            alert("Venta agregada exitosamente");
        } catch (error) {
            console.error("Error al agregar venta:", error);
        }
    };

    return (
        <div className="ventas-container">
            <h2>Lista de Ventas</h2>
            <ul className="ventas-lista">
                {ventas.map((venta) => (
                    <li key={venta.id}>
                        Cliente: {venta.cliente}, Productos: {venta.productos.join(", ")}, 
                        Fecha: {new Date(venta.fecha).toLocaleDateString()}, Total: Q{venta.total}, Método de Pago: {venta.metodoPago}
                    </li>
                ))}
            </ul>

            <h3>Agregar Venta</h3>
            <div className="agregar-venta-form">
                <input
                    type="text"
                    name="cliente"
                    placeholder="Cliente"
                    value={nuevaVenta.cliente}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="productos"
                    placeholder="Productos (separados por comas)"
                    value={nuevaVenta.productos}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="fecha"
                    value={nuevaVenta.fecha}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="total"
                    placeholder="Total"
                    value={nuevaVenta.total}
                    onChange={handleChange}
                />
                <select name="metodoPago" value={nuevaVenta.metodoPago} onChange={handleChange}>
                    <option value="Efectivo">Efectivo</option>
                    <option value="Tarjeta">Tarjeta</option>
                    <option value="Transferencia">Transferencia</option>
                </select>
                <button onClick={agregarVenta}>Agregar Venta</button>
            </div>
        </div>
    );
};

export default VentasList;
