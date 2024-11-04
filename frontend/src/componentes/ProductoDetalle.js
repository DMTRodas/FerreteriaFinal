import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductoServicio from '../servicios/ProductoServicio';

const ProductoDetalle = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await ProductoServicio.obtenerProductoPorId(id);
                setProducto(response.data);
            } catch (error) {
                console.error("Error al obtener el producto:", error);
            }
        };

        fetchProducto();
    }, [id]);

    return (
        <div>
            {producto ? (
                <>
                    <h2>Detalle de Producto</h2>
                    <p>Nombre: {producto.nombre}</p>
                    <p>Descripción: {producto.descripcion}</p>
                    <p>Categoría: {producto.categoria}</p>
                    <p>Precio: Q{producto.precio}</p>
                    <p>Stock: {producto.stock}</p>
                </>
            ) : (
                <p>Cargando producto...</p>
            )}
        </div>
    );
};

export default ProductoDetalle;
