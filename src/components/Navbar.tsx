import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // URL de tu backend con Socket.IO

const Navbar = () => {
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    


    // Cleanup al desmontar componente
    return () => {
      socket.off("new_notification");
    };
  }, []);

  return (
    <nav className="p-4  text-white flex justify-between">
      <div className="relative">
        <button className="relative">
          🔔 Notificaciones
          {notifications > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-xs px-2 py-1 rounded-full">
              {notifications}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
