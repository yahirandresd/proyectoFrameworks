import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores/store'; // Ajusta según tu estructura
import { Restaurant } from '../../models/Restaurant';
import { getRestaurants } from '../../services/restaurantService';

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

// Imágenes genéricas de restaurantes
const restaurantImages = [
  'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg',  // Hamburguesa
  'https://images.pexels.com/photos/2714722/pexels-photo-2714722.jpeg',  // Pizza
  'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',    // Pasta
  'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg',    // Tacos
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',  // Sushi
  'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',  // Ensalada
  'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg',  // Pollo
  'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg',  // Pescado
  'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg',  // Desayuno
  'https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg'   // Postres
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.user.user);
  const userLocal = localStorage.getItem('user');
  const isLoggedIn = user || userLocal;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const data = await getRestaurants();
      setRestaurants(data.slice(0, 10));
    };
    fetchRestaurants();
  }, []);

  const scrollRestaurants = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 300;
      containerRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    }
  };

  return (
    <>
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

      {/* Sección de Top 10 Restaurantes */}
      <div className="w-full py-12 px-4 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Top 10 Restaurantes
        </h2>
        <div className="max-w-7xl mx-auto relative">
          {/* Botón Izquierda */}
          <button
            onClick={() => scrollRestaurants('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Contenedor de Restaurantes */}
          <div 
            ref={containerRef}
            className="flex overflow-x-hidden pb-6 gap-6"
            style={{
              scrollBehavior: 'smooth',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            {restaurants.map((restaurant, index) => (
              <div
                key={restaurant.id}
                className="min-w-[280px] bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col flex-shrink-0 dark:shadow-gray-700"
              >
                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4">
                  <img
                    src={restaurantImages[index % restaurantImages.length]}
                    alt={restaurant.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-black">
                  {restaurant.name}
                </h3>
                <p className="text-gray-700 dark:text-black mb-2 font-medium">
                  {restaurant.address}
                </p>
                <div className="mt-auto">
                  <p className="text-gray-600 dark:text-black text-sm font-medium">
                    {restaurant.phone}
                  </p>
                  <p className="text-gray-600 dark:text-black text-sm font-medium">
                    {restaurant.email}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Botón Derecha */}
          <button
            onClick={() => scrollRestaurants('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
