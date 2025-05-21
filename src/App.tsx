import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import ECommerce from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import routes from './routes';
import ProtectedRoute from '../src/components/Auth/ProtectedRoute';
import DefaultLayoutNoAuth from './layout/DefaultLayoutNoAuth';
import MapTracker from './pages/Map/PageMap';
import ChartsDashboard from './components/ChartDashboard';
import NewOrderAlert from './components/NewOrderAlert';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <NewOrderAlert /> {/* Aquí, arriba de todo */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route element={<DefaultLayoutNoAuth />}>
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route index element={<ECommerce />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<DefaultLayout />}>
            <Route path="/graphics" element={<ChartsDashboard />} />
            {/* Tu ruta fija para MapTracker */}
            <Route
              path="/map-tracker"
              element={
                <Suspense fallback={<Loader />}>
                  <MapTracker />
                </Suspense>
              }
            />
            <Route index element={<ECommerce />} />
            {routes.map((routes, index) => {
              const { path, component: Component } = routes;
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    <Suspense fallback={<Loader />}>
                      <Component />
                    </Suspense>
                  }
                />
              );
            })}
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
