import axiosInstance from './axiosConfig';

const UsuarioServicio = {
    obtenerUsuarios: () => axiosInstance.get('/usuarios'),
    obtenerUsuarioPorId: (id) => axiosInstance.get(`/usuarios/${id}`),
    agregarUsuario: (usuario) => axiosInstance.post('/usuarios', usuario),
    eliminarUsuario: (id) => axiosInstance.delete(`/usuarios/${id}`)
};

export default UsuarioServicio;
