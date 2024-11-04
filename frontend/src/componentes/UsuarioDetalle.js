import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UsuarioServicio from '../servicios/UsuarioServicio';

const UsuarioDetalle = () => {
    const { id } = useParams();
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const response = await UsuarioServicio.obtenerUsuarioPorId(id);
                setUsuario(response.data);
            } catch (error) {
                console.error("Error al obtener el usuario:", error);
            }
        };

        fetchUsuario();
    }, [id]);

    return (
        <div>
            {usuario ? (
                <>
                    <h2>Detalle de Usuario</h2>
                    <p>Nombre: {usuario.nombre}</p>
                    <p>Correo: {usuario.correoElectronico}</p>
                    <p>Rol: {usuario.rol}</p>
                </>
            ) : (
                <p>Cargando usuario...</p>
            )}
        </div>
    );
};

export default UsuarioDetalle;
