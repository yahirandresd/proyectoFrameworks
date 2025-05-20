import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores/store'; // Ajusta según tu estructura

const slides = [
  {
    title: 'Descubre restaurantes increíbles',
    subtitle: 'Explora los mejores lugares para comer en tu ciudad',
    image:
      'https://cdn.colombia.com/gastronomia/2011/08/02/bandeja-paisa-1616.gif',
  },
  {
    title: 'Pide tu comida favorita desde donde quieras',
    subtitle: 'Encuentra comida con solo unos clics',
    image:
      'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/24P2OKC3RVEHRD3F2VKQ76XX7M.jpg',
  },
  {
    title: 'Tus sabores favoritos',
    subtitle: 'Recomendaciones personalizadas para ti',
    image:
      'https://imagenes.eltiempo.com/files/og_thumbnail/uploads/2022/02/24/62181486c8e65.jpeg',
  },
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const user = useSelector((state: RootState) => state.user.user);
  const userLocal = localStorage.getItem('user');
  const isLoggedIn = user || userLocal;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {isLoggedIn ? (
        // 👇 Aquí puedes modificar la vista cuando el usuario ESTÁ autenticado
        slides.map((slide, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute w-full h-full top-0 left-0"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="w-full h-full bg-black bg-opacity-60 flex flex-col items-center justify-center text-center text-white p-4">
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-4"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {slide.title}
              </motion.h1>
              <motion.p
                className="text-lg md:text-2xl"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {slide.subtitle}
              </motion.p>
            </div>
          </motion.div>
        ))
      ) : (
        // 👇 Aquí puedes modificar la vista cuando el usuario NO está autenticado
        <div
          className="absolute w-full h-full top-0 left-0 flex items-center justify-center text-white text-center px-4"
          style={{
            backgroundImage: 'url("https://static.vecteezy.com/system/resources/previews/001/937/737/non_2x/digital-online-free-global-delivery-on-scooter-with-mobile-phone-in-website-background-concept-for-passenger-food-shipment-vector.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Capa negra opaca que cubre todo */}
          <div className="absolute w-full h-full bg-black opacity-60 top-0 left-0"></div>

          {/* Contenido centrado y encima de la capa negra */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <motion.h1
              className="text-3xl md:text-6xl font-bold mb-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              ¡Bienvenido a Chami!
            </motion.h1>
            <motion.p
              className="text-lg md:text-2xl mb-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Regístrate o inicia sesión para disfrutar lo mejor de la comida
              local
            </motion.p>
            <motion.div
              className="flex flex-col md:flex-row gap-4"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                to="/auth/signin"
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/auth/signup"
                className="bg-white text-primary px-6 py-2 rounded-md hover:bg-gray-100 transition"
              >
                Registrarse
              </Link>
            </motion.div>
          </div>
        </div>
      )}

      {/* Indicadores solo si el usuario está logueado */}
      {isLoggedIn && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === index ? 'bg-white' : 'bg-white/50'
              } transition-all duration-300`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSection;
