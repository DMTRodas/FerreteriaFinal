import axiosInstance from './axiosConfig';

const VentaServicio = {
    obtenerVentas: () => axiosInstance.get('/ventas'),
    obtenerVentaPorId: (id) => axiosInstance.get(`/ventas/${id}`),
    agregarVenta: (venta) => axiosInstance.post('/ventas', venta),
    eliminarVenta: (id) => axiosInstance.delete(`/ventas/${id}`)
};

export default VentaServicio;
