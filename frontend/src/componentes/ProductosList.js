import React, { useEffect, useState } from 'react';
import ProductoServicio from '../servicios/ProductoServicio';

const ProductosList = () => {
    const [productos, setProductos] = useState([]);
    const [productoEditado, setProductoEditado] = useState(null); 

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        try {
            const response = await ProductoServicio.obtenerProductos();
            setProductos(response.data);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    };

    const eliminarProducto = async (id) => {
        try {
            await ProductoServicio.eliminarProducto(id);
            alert("Producto eliminado exitosamente");
            setProductos(productos.filter((producto) => producto.id !== id));
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    };

    const seleccionarProductoParaEditar = (producto) => {
        setProductoEditado(producto);
    };

    const actualizarProducto = async () => {
        try {
            await ProductoServicio.actualizarProducto(productoEditado.nombre, productoEditado);
            alert("Producto actualizado exitosamente");
            fetchProductos();
            setProductoEditado(null);
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductoEditado({ ...productoEditado, [name]: value });
    };

    return (
        <div>
            <h2>Lista de Productos</h2>
            <div>
                {productos.map((producto) => (
                    <div key={producto.id} className="list-item">
                        <div>
                            <h3>{producto.nombre}</h3>
                            <p>Descripción: {producto.descripcion}</p>
                            <p>Precio: Q{producto.precio}</p>
                            <p>Stock: {producto.stock}</p> 
                            <p>Estado: {producto.estado ? "Disponible" : "No Disponible"}</p>
                        </div>
                        <div>
                            <button className="button-primary" onClick={() => seleccionarProductoParaEditar(producto)}>Editar</button>
                            <button className="button-primary" onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>

            {productoEditado && (
                <div className="form-container">
                    <h3>Editar Producto</h3>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre del producto"
                        value={productoEditado.nombre}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="descripcion"
                        placeholder="Descripción"
                        value={productoEditado.descripcion}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="precio"
                        placeholder="Precio"
                        value={productoEditado.precio}
                        onChange={handleChange}
                    />
                    <select name="estado" value={productoEditado.estado} onChange={handleChange}>
                        <option value={true}>Disponible</option>
                        <option value={false}>No Disponible</option>
                    </select>
                        <input type="number" 
                        name="stock" 
                        placeholder="Stock" 
                        value={productoEditado.stock} 
                        onChange={handleChange} />
                    <button className="button-primary" onClick={actualizarProducto}>Guardar Cambios</button>
                    <button className="button-primary" onClick={() => setProductoEditado(null)}>Cancelar</button>
                </div>
            )}
        </div>
    );
};

export default ProductosList;


