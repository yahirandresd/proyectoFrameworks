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
const ListUsers= lazy(() => import('../pages/Users/page'))
const CreateUser= lazy(() => import('../pages/Users/Create'))
const UpdateUser= lazy(() => import('../pages/Users/Update'))
const CreateRole= lazy(() => import('../pages/Roles/Create'))
const UpdateRole= lazy(() => import('../pages/Roles/Update'))
/*Ejemplos Ejercicio*/
const ListUsuarios= lazy(() => import('../pages/Users/PageUsuarios'))
const ListRoles= lazy(() => import('../pages/Roles/RolesPage'))
const ListPermisos= lazy(() => import('../pages/Permisos/PermisosPage'))
const ListRestaurants = lazy(() => import('../components/Address/ListAddress'))

const coreRoutes = [
  {
    path: '/list-restaurants',
    title: 'Restaurantes',
    component: ListRestaurants,
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
    path: '/list-usuarios',
    title: 'ListUsuarios',
    component: ListUsuarios,
  },
  {
    path: '/list-users',
    title: 'ListUsers',
    component: ListUsers,
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
