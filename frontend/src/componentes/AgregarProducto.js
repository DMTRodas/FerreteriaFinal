import React, { useState } from 'react';
import ProductoServicio from '../servicios/ProductoServicio';

const AgregarProducto = () => {
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: 0, 
        estado: true,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoProducto({ ...nuevoProducto, [name]: value });
    };

    const agregarProducto = async () => {
        try {
            await ProductoServicio.crearProducto(nuevoProducto);
            alert("Producto agregado exitosamente");
            setNuevoProducto({ nombre: '', descripcion: '', precio: '', stock: 0, estado: true }); 
        } catch (error) {
            console.error("Error al agregar producto:", error);
        }
    };

    return (
        <div className="form-container">
            <h3>Agregar Producto</h3>
            <input
                type="text"
                name="nombre"
                placeholder="Nombre del producto"
                value={nuevoProducto.nombre}
                onChange={handleChange}
            />
            <input
                type="text"
                name="descripcion"
                placeholder="Descripción"
                value={nuevoProducto.descripcion}
                onChange={handleChange}
            />
            <input
                type="number"
                name="precio"
                placeholder="Precio"
                value={nuevoProducto.precio}
                onChange={handleChange}
            />
            <input
                type="number"
                name="stock" 
                placeholder="Stock"
                value={nuevoProducto.stock}
                onChange={handleChange}
            />
            <select name="estado" value={nuevoProducto.estado} onChange={handleChange}>
                <option value={true}>Disponible</option>
                <option value={false}>No Disponible</option>
            </select>
            <button className="button-primary" onClick={agregarProducto}>Agregar Producto</button>
        </div>
    );
};

export default AgregarProducto;

