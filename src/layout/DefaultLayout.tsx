import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar2';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../stores/store';
import Footer from "../components/Footer"
const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Provider store={store}>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        {/* <!-- ===== Page Wrapper Start ===== --> */}
        <div className="flex h-screen overflow-hidden">
          {/* <!-- ===== Sidebar Start ===== --> */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Sidebar End ===== --> */}

          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {/* <!-- ===== Header Start ===== --> */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* <!-- ===== Header End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <Outlet />
              </div>
            </main>
            <footer>
              <Footer/>
            </footer>
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
        {/* <!-- ===== Page Wrapper End ===== --> */}
      </div>
    </Provider>
  );
};

export default DefaultLayout;
