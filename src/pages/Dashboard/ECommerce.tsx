import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const slides = [
  {
    title: "Descubre restaurantes increíbles",
    subtitle: "Explora los mejores lugares para comer en tu ciudad",
    image: "https://cdn.colombia.com/gastronomia/2011/08/02/bandeja-paisa-1616.gif",
  },
  {
    title: "Pide tu comida favorita desde donde quieras",
    subtitle: "Encuentra comida con solo unos clics",
    image: "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/24P2OKC3RVEHRD3F2VKQ76XX7M.jpg",
  },
  {
    title: "Tus sabores favoritos",
    subtitle: "Recomendaciones personalizadas para ti",
    image: "https://imagenes.eltiempo.com/files/og_thumbnail/uploads/2022/02/24/62181486c8e65.jpeg",
  },
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {slides.map((slide, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="absolute w-full h-full top-0 left-0"
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="w-full h-full bg-black bg-opacity-60 flex flex-col items-center justify-center text-center text-white">
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
      ))}

      {/* Indicadores */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-white" : "bg-white/50"
            } transition-all duration-300`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
