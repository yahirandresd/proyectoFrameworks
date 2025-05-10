import Usuarios from "../../components/Users/Usuarios";
import Breadcrumb from "../../components/Breadcrumb";

const UsuariosPage: React.FC = () => {
    return (
        <>
            <Breadcrumb pageName="Usuarios" />
            <Usuarios />
        </>
    );
};

export default UsuariosPage;
