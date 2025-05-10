import Roles from '../../components/Roles/ListRoles';
import Breadcrumb from '../../components/Breadcrumb';

const RolesPage: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Roles" />
      <Roles />
    </>
  );
};

export default RolesPage;
