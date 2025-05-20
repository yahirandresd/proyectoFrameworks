import Permisos from "../../components/Permissions/ListPermissions";
import Breadcrumb from "../../components/Breadcrumb";

const PermisosPage: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Permisos" />
      <Permisos />
    </>
  );
};

export default PermisosPage;
