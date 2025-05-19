import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar2";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../stores/store";
import Footer from "../components/Footer"

const DefaultLayoutNoAuth = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Provider store={store}>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar puede estar oculto o con diseño distinto para no auth */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {/* Header también recibe prop para mostrar diferente */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

            <main>
              <div className="flex-1 w-full">
                <Outlet />
              </div>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default DefaultLayoutNoAuth;
