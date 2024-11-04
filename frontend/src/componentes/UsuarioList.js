import React, { useEffect, useState } from 'react';
import UsuarioServicio from '../servicios/UsuarioServicio';
import '../estilos/UsuarioList.css';

const UsuarioList = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [nuevoUsuario, setNuevoUsuario] = useState({
        username: '',
        correoElectronico: '',
        contrasena: '',
        rol: 'Operativo'
    });

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await UsuarioServicio.obtenerUsuarios();
                setUsuarios(response.data);
            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
            }
        };

        fetchUsuarios();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoUsuario({ ...nuevoUsuario, [name]: value });
    };

    const agregarUsuario = async () => {
        try {
            const response = await UsuarioServicio.agregarUsuario(nuevoUsuario);
            setUsuarios([...usuarios, response.data]);
            setNuevoUsuario({ username: '', correoElectronico: '', contrasena: '', rol: 'Operativo' });
            alert("Usuario agregado exitosamente");
        } catch (error) {
            console.error("Error al agregar usuario:", error);
        }
    };

    return (
        <div className="usuarios-container">
            <h3>Agregar Usuario</h3>
            <div className="agregar-usuario-form">
                <input
                    type="text"
                    name="username"
                    placeholder="Nombre de Usuario"
                    value={nuevoUsuario.username}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="correoElectronico"
                    placeholder="Correo Electrónico"
                    value={nuevoUsuario.correoElectronico}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="contrasena"
                    placeholder="Contraseña"
                    value={nuevoUsuario.contrasena}
                    onChange={handleChange}
                />
                <select name="rol" value={nuevoUsuario.rol} onChange={handleChange}>
                    <option value="Administrador">Administrador</option>
                    <option value="Técnico">Técnico</option>
                    <option value="Operativo">Operativo</option>
                </select>
                <button onClick={agregarUsuario}>Agregar Usuario</button>
            </div>
            
            <h2>Lista de Usuarios</h2>
            <table className="usuarios-table">
                <thead>
                    <tr>
                        <th>Nombre de Usuario</th>
                        <th>Correo Electrónico</th>
                        <th>Rol</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.username}</td>
                            <td>{usuario.correoElectronico}</td>
                            <td>{usuario.rol}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsuarioList;
