import axiosInstance from './axiosConfig';

const ProductoServicio = {
    obtenerProductos: () => axiosInstance.get('/productos'),
    obtenerProductoPorId: (nombre) => axiosInstance.get(`/productos/${nombre}`),
    agregarPedido: (pedido) => axiosInstance.post('/pedidos', pedido),
    crearProducto: (producto) => axiosInstance.post('/productos', producto),
    actualizarProducto: (id, producto) => axiosInstance.put(`/productos/${id}`, producto),
    eliminarProducto: (id) => axiosInstance.delete(`/productos/${id}`)
};

export default ProductoServicio;
