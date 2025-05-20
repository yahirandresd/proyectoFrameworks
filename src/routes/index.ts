import { lazy } from 'react';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
const CreateUser= lazy(() => import('../pages/Users/CreateUser'))
const UpdateUser= lazy(() => import('../pages/Users/UpdateUsers'))
const CreateRole= lazy(() => import('../pages/Roles/Create'))
const UpdateRole= lazy(() => import('../pages/Roles/Update'))
/*Ejemplos Ejercicio*/
const ListRoles= lazy(() => import('../pages/Roles/RolesPage'))
const ListPermisos= lazy(() => import('../pages/Permisos/PermisosPage'))

/*PROYECTO*/
/*Listar*/
const ListAddresses = lazy(() => import('../components/Address/ListAddress'));
const ListCustomers = lazy(() => import('../components/Customers/ListCustomers'));
const ListDrivers = lazy(() => import('../components/Drivers/ListDriver'));
const ListIssues = lazy(() => import('../components/Issues/ListIssues'));
const ListMenu = lazy(() => import('../components/Menu/ListMenu'));
const ListMotorcycles = lazy(() => import('../components/Motorcycle/ListMotorcycle'));
const ListOrders = lazy(() => import('../components/Order/ListOrder'));
const ListPhotos = lazy(() => import('../components/Photos/ListPhotos'));
const ListProducts = lazy(() => import('../components/Products/ListProducts'));
const ListShifts = lazy(() => import('../components/Shifts/ListShifts'));
const ListRestaurants = lazy(() => import('../components/Restaurants/ListRestaurants'));


const coreRoutes = [
  {
    path: '/list-restaurants',
    title: 'Restaurantes',
    component: ListRestaurants,
  },
  {
    path: '/list-address',
    title: 'Direcciones',
    component: ListAddresses,
  },
  {
    path: '/list-customer',
    title: 'Clientes',
    component: ListCustomers,
  },
  {
    path: '/list-drivers',
    title: 'Conductores',
    component: ListDrivers,
  },
  {
    path: '/list-issues',
    title: 'Asuntos',
    component: ListIssues,
  },
  {
    path: '/list-menu',
    title: 'Menu',
    component: ListMenu,
  },
  {
    path: '/list-motorcycles',
    title: 'Motocicletas',
    component: ListMotorcycles,
  },
  {
    path: '/list-orders',
    title: 'Ordenes',
    component: ListOrders,
  },
  {
    path: '/list-photos',
    title: 'Photos',
    component: ListPhotos,
  },
  {
    path: '/list-products',
    title: 'Productos',
    component: ListProducts,
  },
  {
    path: '/list-roles',
    title: 'Roles',
    component: ListRoles,
  },
  {
    path: '/list-shifts',
    title: 'Turnos',
    component: ListShifts,
  },
  {
    path: '/update-role/:id',
    title: 'UpdateUser',
    component: UpdateRole,
  },
  {
    path: '/create-role',
    title: 'CreateRole',
    component: CreateRole,
  },
  {
    path: '/update-user/:id',
    title: 'UpdateUser',
    component: UpdateUser,
  },
  {
    path: '/create-user',
    title: 'CreateUser',
    component: CreateUser,
  },
  {
    path: '/list-permisos',
    title: 'ListPermisos',
    component: ListPermisos,
  },
  {
    path: '/list-roles',
    title: 'ListRoles',
    component: ListRoles,
  },
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
];

const routes = [...coreRoutes];
export default routes;
