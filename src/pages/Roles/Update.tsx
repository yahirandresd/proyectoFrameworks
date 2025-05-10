
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getRoleById, updateRole } from "../../services/roleService";
import Swal from "sweetalert2";

import { Role } from '../../models/Role';
import RoleFormValidator from '../../components/Roles/RoleFormValidator';
import Breadcrumb from "../../components/Breadcrumb";

const UpdateRolePage = () => {
    const { id } = useParams(); // Obtener el ID de la URL
    
    const navigate = useNavigate();
    const [Role, setRole] = useState<Role | null>(null);

    // Cargar datos del usuario después del montaje
    useEffect(() => {
        console.log("Id->"+id)
        const fetchRole = async () => {
            if (!id) return; // Evitar errores si el ID no está disponible
            const RoleData = await getRoleById(parseInt(id));
            setRole(RoleData);
        };

        fetchRole();
    }, [id]);

    const handleUpdateRole = async (theRole: Role) => {
        try {
            const updatedRole = await updateRole(theRole.id || 0, theRole);
            if (updatedRole) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/roles"); // Redirección en React Router
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de actualizar el registro",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de actualizar el registro",
                icon: "error",
                timer: 3000
            });
        }
    };

    if (!Role) {
        return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Usuario" />
            <RoleFormValidator
                handleUpdate={handleUpdateRole}
                mode={2} // 2 significa actualización
                Role={Role}
            />
        </>
    );
};

export default UpdateRolePage;