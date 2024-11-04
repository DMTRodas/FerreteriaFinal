import axiosInstance from './axiosConfig';

const KardexServicio = {
    obtenerMovimientos: () => axiosInstance.get('/kardex'),
    registrarMovimiento: (movimiento) => {
        
        const movimientoConNombre = {
            ...movimiento,
            productoNombre: movimiento.productoNombre, 
        };
        return axiosInstance.post('/kardex/registrar', movimientoConNombre);
    },
};

export default KardexServicio;

