import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { date } from "yup";

const socket = io("http://localhost:5000"); // Ajusta la URL de tu backend

const Navbar = () => {
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    socket.on("new_notification", (data) => {
        console.log("Nueva notificacion", JSON.stringify(data))
      setNotifications((prev) => prev + 1);
    });

    return () => {  
      socket.off("new_notification");
    };
  }, []);

  return (
    <nav className="p-4 bg-blue-600 text-white flex justify-between">
      <h1 className="text-xl">Mi App</h1>
      <div className="relative">
        <button className="relative">
          🔔
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