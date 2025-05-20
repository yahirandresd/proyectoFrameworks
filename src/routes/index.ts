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
/*PROYECTO*/
/*Crear*/
const CreateAddress= lazy(() => import('../pages/Address/CreateAddress'))
const CreateCustomer= lazy(()=> import ('../pages/Customers/CreateCustomer'))
const CreateDriver= lazy(()=> import('../pages/Drivers/CreateDrivers'))
const CreateIssue= lazy(()=> import('../pages/Issues/CreateIssue'))
const CreateMenu= lazy(()=> import('../pages/Menu/CreateMenu'))
const CreateMotorcycle= lazy(()=> import('../pages/Motorcycle/CreateMotorcycle'))




/*PROYECTO*/
/*Actualizar*/
const UpdateAddress= lazy(() => import('../pages/Address/UpdateAddress'))
const UpdateCustomer= lazy(()=> import ('../pages/Customers/UpdateCustomer'))
const UpdateDriver= lazy(()=> import('../pages/Drivers/UpdateDrivers'))
const UpdateIssue= lazy(()=> import('../pages/Issues/UpdateIssue'))
const UpdateMenu= lazy(()=> import('../pages/Menu/UpdateMenu'))
const UpdateMotorcycle= lazy(()=> import('../pages/Motorcycle/UpdateMotorcycle'))


const coreRoutes = [
  {
    path: '/list-restaurants',
    title: 'Restaurantes',
    component: ListRestaurants,
  },
  {
    path: '/list-address',
    title: 'CreateAddress',
    component: ListAddresses,
  },
  {
    path: '/create-address',
    title: 'Direcciones',
    component: CreateAddress,
  },
  {
    path: '/update-address',
    title: 'UpdateAddress',
    component: UpdateAddress,
  },
  {
    path: '/list-customer',
    title: 'Clientes',
    component: ListCustomers,
  },
  {
    path: '/create-customer',
    title: 'CreateCustomers',
    component: CreateCustomer,
  },
  {
    path: '/update-customer',
    title: 'UpdateCustomers',
    component: UpdateCustomer,
  },
  {
    path: '/list-drivers',
    title: 'Conductores',
    component: ListDrivers,
  },
  {
    path: '/create-drivers',
    title: 'CreateDrivers',
    component: CreateDriver,
  },
  {
    path: '/update-drivers',
    title: 'UpdateDrivers',
    component: UpdateDriver,
  },
  {
    path: '/list-issues',
    title: 'Asuntos',
    component: ListIssues,
  },
  {
    path: '/create-issues',
    title: 'CreateIssues',
    component: CreateIssue,
  },
  {
    path: '/update-issues',
    title: 'UpdateIssues',
    component: UpdateIssue,
  },
  {
    path: '/list-menu',
    title: 'Menu',
    component: ListMenu,
  },
  {
    path: '/create-menu',
    title: 'CreateMenu',
    component: CreateMenu,
  },
  {
    path: '/update-menu',
    title: 'UpdateMenu',
    component: UpdateMenu,
  },
  {
    path: '/list-motorcycles',
    title: 'Motocicletas',
    component: ListMotorcycles,
  },
  {
    path: '/create-motorcycles',
    title: 'CreateMotorcycles',
    component: CreateMotorcycle,
  },
  {
    path: '/update-motorcycles',
    title: 'UpdateMotorcycles',
    component: UpdateMotorcycle,
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
    path: '/list-shifts',
    title: 'Turnos',
    component: ListShifts,
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
