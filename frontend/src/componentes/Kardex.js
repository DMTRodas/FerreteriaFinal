import React, { useEffect, useState } from 'react';
import KardexServicio from '../servicios/KardexServicio';
import '../estilos/Kardex.css';

const Kardex = () => {
    const [movimientos, setMovimientos] = useState([]);
    const [nuevoMovimiento, setNuevoMovimiento] = useState({
        productoNombre: '',
        cantidad: 0,
        tipoMovimiento: 'Entrada',
        fecha: new Date().toISOString().split("T")[0]
    });

    useEffect(() => {
        const fetchMovimientos = async () => {
            try {
                const response = await KardexServicio.obtenerMovimientos();
                setMovimientos(response.data);
            } catch (error) {
                console.error("Error al obtener los movimientos:", error);
            }
        };

        fetchMovimientos();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoMovimiento({ ...nuevoMovimiento, [name]: value });
    };

    const registrarMovimiento = async () => {
        try {
            const response = await KardexServicio.registrarMovimiento(nuevoMovimiento);
            setMovimientos([...movimientos, response.data]);
            setNuevoMovimiento({
                productoNombre: '',
                cantidad: 0,
                tipoMovimiento: 'Entrada',
                fecha: new Date().toISOString().split("T")[0]
            });
            alert("Movimiento registrado exitosamente");
        } catch (error) {
            console.error("Error al registrar el movimiento:", error);
        }
    };

    const formatFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString(); 
    };

    return (
        <div className="kardex-container">
            <h2 className="kardex-header">Kardex</h2>
            <ul className="movimientos-lista">
                {movimientos.map((movimiento) => (
                    <li key={movimiento.id}>
                        Producto: {movimiento.productoNombre}, Cantidad: {movimiento.cantidad}, 
                        Tipo: {movimiento.tipoMovimiento}, Fecha: {formatFecha(movimiento.fecha)}, 
                        Saldo: {movimiento.saldo}
                    </li>
                ))}
            </ul>

            <h3>Registrar Movimiento</h3>
            <div className="registro-formulario">
                <input
                    type="text"
                    name="productoNombre"
                    placeholder="Producto"
                    value={nuevoMovimiento.productoNombre}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="cantidad"
                    placeholder="Cantidad"
                    value={nuevoMovimiento.cantidad}
                    onChange={handleChange}
                />
                <select name="tipoMovimiento" value={nuevoMovimiento.tipoMovimiento} onChange={handleChange}>
                    <option value="Entrada">Entrada</option>
                    <option value="Salida">Salida</option>
                </select>
                <input
                    type="date"
                    name="fecha"
                    value={nuevoMovimiento.fecha}
                    onChange={handleChange}
                />
                <button onClick={registrarMovimiento}>Registrar Movimiento</button>
            </div>
        </div>
    );
};


export default Kardex;
