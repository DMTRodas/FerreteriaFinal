import React, { useEffect, useState } from 'react';
import PedidoServicio from '../servicios/PedidoServicio';
import '../estilos/PedidosList.css';

const PedidosList = () => {
    const [pedidos, setPedidos] = useState([]);
    const [nuevoPedido, setNuevoPedido] = useState({
        cliente: '',
        productos: '',
        fecha: new Date().toISOString().split("T")[0],
        estado: 'Pendiente',
        total: 0
    });

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await PedidoServicio.obtenerPedidos();
                setPedidos(response.data);
            } catch (error) {
                console.error("Error al obtener los pedidos:", error);
            }
        };

        fetchPedidos();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoPedido({ ...nuevoPedido, [name]: value });
    };

    const agregarPedido = async () => {
        try {
            const pedido = {
                ...nuevoPedido,
                productos: nuevoPedido.productos.split(",").map(prod => prod.trim())
            };
            const response = await PedidoServicio.agregarPedido(pedido);
            setPedidos([...pedidos, response.data]);
            setNuevoPedido({
                cliente: '',
                productos: '',
                fecha: new Date().toISOString().split("T")[0],
                estado: 'Pendiente',
                total: 0
            });
            alert("Pedido agregado exitosamente");
        } catch (error) {
            console.error("Error al agregar pedido:", error);
        }
    };

    const formatFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString();
    };

    return (
        <div className="pedidos-container">
            <h2>Lista de Pedidos</h2>
            <ul className="pedidos-lista">
                {pedidos.map((pedido) => (
                    <li key={pedido.id}>
                        Cliente: {pedido.cliente}, Productos: {pedido.productos.join(", ")},
                        Fecha: {formatFecha(pedido.fecha)}, Estado: {pedido.estado}, Total: Q{pedido.total}
                    </li>
                ))}
            </ul>

            <h3>Agregar Pedido</h3>
            <div className="agregar-pedido-form">
                <input
                    type="text"
                    name="cliente"
                    placeholder="Cliente"
                    value={nuevoPedido.cliente}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="productos"
                    placeholder="Productos (separados por comas)"
                    value={nuevoPedido.productos}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="fecha"
                    value={nuevoPedido.fecha}
                    onChange={handleChange}
                />
                <select name="estado" value={nuevoPedido.estado} onChange={handleChange}>
                    <option value="Pendiente">Pendiente</option>
                    <option value="En Proceso">En Proceso</option>
                    <option value="Completado">Completado</option>
                </select>
                <input
                    type="number"
                    name="total"
                    placeholder="Total"
                    value={nuevoPedido.total}
                    onChange={handleChange}
                />
                <button onClick={agregarPedido}>Agregar Pedido</button>
            </div>
        </div>
    );
};

export default PedidosList;
