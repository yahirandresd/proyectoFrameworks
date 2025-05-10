import React, { useState } from 'react'; // Asegúrate de importar useState
import { Role } from '../../models/Role';
//import RoleFormValidator from '../../components/Role/RoleFormValidator'; 

import Swal from 'sweetalert2';
import { createRole } from "../../services/roleService";
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from "react-router-dom";

const App = () => {
    const navigate = useNavigate();

    // Estado para almacenar el usuario a editar

    // Lógica de creación
    const handleCreateRole = async (Role: Role) => {

        try {
            const createdRole = await createRole(Role);
            if (createdRole) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el registro",
                    icon: "success",
                    timer: 3000
                })
                console.log("Usuario creado con éxito:", createdRole);
                navigate("/roles");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de crear el registro",
                    icon: "error",
                    timer: 3000
                })
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de crear el registro",
                icon: "error",
                timer: 3000
            })
        }
    };
    return (
        <div>
            {/* Formulario para crear un nuevo usuario */}
            <h2>Create Role</h2>
                <Breadcrumb pageName="Crear Usuario" />
                {/*<RolFormValidator
                    handleCreate={handleCreateRole}
                    mode={1} // 1 significa creación
                />*/}
        </div>
    );
};

export default App;
