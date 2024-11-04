import axiosInstance from './axiosConfig';

const PedidoServicio = {
    obtenerPedidos: () => axiosInstance.get('/pedidos'),
    obtenerPedidoPorId: (id) => axiosInstance.get(`/pedidos/${id}`),
    agregarPedido: (pedido) => axiosInstance.post('/pedidos', pedido),
    eliminarPedido: (id) => axiosInstance.delete(`/pedidos/${id}`)
};

export default PedidoServicio;
