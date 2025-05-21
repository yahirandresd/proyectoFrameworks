//
// import { Component } from 'lucide-react';
import { Map } from 'lucide-react';
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
const ListUser = lazy(() => import('../components/Users/ListUsers'));

/*PROYECTO*/
/*Crear*/
const CreateAddress= lazy(() => import('../pages/Address/CreateAddress'))
const CreateCustomer= lazy(()=> import ('../pages/Customers/CreateCustomer'))
const CreateDriver= lazy(()=> import('../pages/Drivers/CreateDrivers'))
const CreateIssue= lazy(()=> import('../pages/Issues/CreateIssue'))
const CreateMenu= lazy(()=> import('../pages/Menu/CreateMenu'))
const CreateMotorcycle= lazy(()=> import('../pages/Motorcycle/CreateMotorcycle'))
const CreateOrder= lazy(()=> import('../pages/Orders/CreateOrders'))
const CreatePhoto= lazy(()=> import('../pages/Photos/CreatePhotos'))
const CreateProduct=lazy(()=> import('../pages/Products/CreateProduct'))
const CreateRestaurant= lazy(()=> import('../pages/Restaurants/CreateRestaurant'))
const CreateShift= lazy(()=>import('../pages/Shifts/CreateShift'))
/*PROYECTO*/
/*Actualizar*/
const UpdateAddress= lazy(() => import('../pages/Address/UpdateAddress'))
const UpdateCustomer= lazy(()=> import ('../pages/Customers/UpdateCustomer'))
const UpdateDriver= lazy(()=> import('../pages/Drivers/UpdateDrivers'))
const UpdateIssue= lazy(()=> import('../pages/Issues/UpdateIssue'))
const UpdateMenu= lazy(()=> import('../pages/Menu/UpdateMenu'))
const UpdateMotorcycle= lazy(()=> import('../pages/Motorcycle/UpdateMotorcycle'))
const UpdateOrder= lazy(()=> import('../pages/Orders/UpdateOrders'))
const UpdatePhoto= lazy(()=> import('../pages/Photos/UpdatePhoto'))
const UpdateProduct=lazy(()=> import('../pages/Products/UpdateProduct'))
const UpdateRestaurant= lazy(()=> import('../pages/Restaurants/UpdateRestaurant'))
const UpdateShift= lazy(()=>import('../pages/Shifts/UpdateShift'))

/*PROYECTO*/
/*ver*/
const ViewMenu = lazy(() => import("../pages/Menu/ViewMenu"))
const ViewUser = lazy(() => import("../pages/Users/ViewUser"))
const ViewMotorcycle = lazy(() => import("../pages/Motorcycle/ViewMotorcycle"))
const ViewIssue = lazy(() => import("../pages/Issues/ViewIssue"))
const ViewDriver = lazy(() => import("../pages/Drivers/ViewDriver"))
const ViewCustomer = lazy(() => import("../pages/Customers/ViewCustomer"))
const ViewAddress = lazy(() => import("../pages/Address/ViewAddress"))
const ViewOrder = lazy(() => import("../pages/Orders/ViewOrder"))
const ViewPhoto = lazy(() => import("../pages/Photos/ViewPhoto"))
const ViewProduct = lazy(() => import("../pages/Products/ViewProduct"))
const ViewRestaurant = lazy(() => import("../pages/Restaurants/ViewRestaurant"))
const ViewShift = lazy(() => import("../pages/Shifts/ViewShift"))

const Mapa= lazy(()=> import('../components/Map/Map'))

const coreRoutes = [
  {
    path: "/map",
    title: "ViewShift",
    component: Mapa,
  },
  {
    path: "/view-shift/:id",
    title: "ViewShift",
    component: ViewShift,
  },
  {
    path: "/view-restaurant/:id",
    title: "ViewRestaurant",
    component: ViewRestaurant,
  },
  {
    path: "/view-product/:id",
    title: "ViewProduct",
    component: ViewProduct,
  },
  {
    path: "/view-photo/:id",
    title: "ViewPhoto",
    component: ViewPhoto,
  },
  {
    path: "/view-orders/:id",
    title: "ViewOrder",
    component: ViewOrder,
  },
  {
    path: "/view-menus/:id",
    title: "ViewMenu",
    component: ViewMenu,
  },
  {
    path: "/view-users/:id",
    title: "ViewUser",
    component: ViewUser,
  },
  {
    path: "/view-motorcycles/:id",
    title: "ViewMotorcycle",
    component: ViewMotorcycle,
  },
  {
    path: "/view-issues/:id",
    title: "ViewIssue",
    component: ViewIssue,
  },
  {
    path: "/view-driver/:id",
    title: "ViewDriver",
    component: ViewDriver,
  },
  {
    path: "/view-customers/:id",
    title: "ViewCustomer",
    component: ViewCustomer,
  },
  {
    path: "/view-address/:id",
    title: "ViewAddress",
    component: ViewAddress,
  },
  {
    path: '/list-restaurants',
    title: 'Restaurantes',
    component: ListRestaurants,
  },
    {
    path: '/create-restaurants',
    title: 'CreateRestaurants',
    component: CreateRestaurant,
  },
    {
    path: '/update-restaurants',
    title: 'UpdateRestaurants',
    component: UpdateRestaurant,
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
    path: '/update-address/:id',
    title: 'UpdateAddress',
    component: UpdateAddress,
  },
  {
    path: '/list-customers',
    title: 'Clientes',
    component: ListCustomers,
  },
  {
    path: '/create-customers',
    title: 'CreateCustomers',
    component: CreateCustomer,
  },
  {
    path: '/update-customers/:id',
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
    path: '/update-drivers/:id',
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
    path: '/update-issues/:id',
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
    path: '/update-menu/:id',
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
    path: '/update-motorcycles/:id',
    title: 'UpdateMotorcycles',
    component: UpdateMotorcycle,
  },
  {
    path: '/list-orders',
    title: 'Ordenes',
    component: ListOrders,
  },
  {
    path: '/create-orders',
    title: 'CreateOrdens',
    component: CreateOrder,
  },
  {
    path: '/update-orders',
    title: 'UpdateOrdens',
    component: UpdateOrder,
  },
  {
    path: '/list-photos',
    title: 'Photos',
    component: ListPhotos,
  },
    {
    path: '/create-photos',
    title: 'CreatePhotos',
    component: CreatePhoto,
  },
    {
    path: '/update-photos',
    title: 'UpdatePhotos',
    component: UpdatePhoto,
  },
  {
    path: '/list-products',
    title: 'Productos',
    component: ListProducts,
  },
  {
    path: '/create-products',
    title: 'CreateProducts',
    component: CreateProduct,
  },
  {
    path: '/Update-products',
    title: 'UpdateProducts',
    component: UpdateProduct,
  },
  {
    path: '/list-shifts',
    title: 'Turnos',
    component: ListShifts,
  },
    {
    path: '/create-shifts',
    title: 'CreateShifts',
    component: CreateShift,
  },
    {
    path: '/update-shifts',
    title: 'UpdateShifts',
    component: UpdateShift,
  },
  {
    path: '/update-user/:id',
    title: 'UpdateUser',
    component: UpdateUser,
  },
  {
    path: '/list-user',
    title: 'ListUser',
    component: ListUser,
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
