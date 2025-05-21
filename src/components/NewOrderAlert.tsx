import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { io, Socket } from 'socket.io-client';

let socket: Socket;

const NewOrderAlert = () => {
  useEffect(() => {

    socket = io('http://localhost:5000');

    socket.on('new_order', (data: any) => {
        setTimeout(() => {
          const audio = new Audio('/notification.mp3');
          audio.play().catch((e) => console.log('Error al reproducir sonido:', e));
      
          Swal.fire({
            toast: true,
            position: 'top',
            icon: 'info',
            title: 'Se ha asignado un pedido nuevo',
            showConfirmButton: false,
            timer: 5000,
          });
        }, 2000);
      
        console.log('Nuevo pedido recibido:', data);
      });
      
      

    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
};

export default NewOrderAlert;
