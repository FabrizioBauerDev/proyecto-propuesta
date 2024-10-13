"use client";
import { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import confetti from "canvas-confetti";

export default function Home() {
  const sectionsRef = useRef([]);
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  useEffect(() => {
    // Lógica para fondo animado de estrellas
    const canvas = document.getElementById("stars");
    const ctx = canvas.getContext("2d");
    let stars = [];
    const numStars = 100;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2,
          velocity: Math.random() * 0.5,
          color: Math.random() > 0.5 ? "white" : "gold",
        });
      }
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();
      });
    };

    const updateStars = () => {
      stars.forEach((star) => {
        star.y += star.velocity;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
    };

    const animate = () => {
      drawStars();
      updateStars();
      requestAnimationFrame(animate);
    };

    resizeCanvas();
    createStars();
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const [audio, setAudio] = useState(null);

  useEffect(() => {
    setAudio(new Audio("/cancion.mp3"));
    // Intersection Observer para animar las secciones
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          } else {
            entry.target.classList.remove("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // Función para lanzar el confeti
  const launchConfetti = () => {
    if (isConfettiActive) {
      alert("Ya me confirmaste, estas sentenciada 😜");
      return;
    }
    setIsConfettiActive(true); // Deshabilitar el botón
    audio.play(); // Reproducir la canción
    // Dispara el confeti
    var heart = confetti.shapeFromPath({
      path: "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z",
      matrix: [
        0.03333333333333333, 0, 0, 0.03333333333333333, -5.566666666666666,
        -5.533333333333333,
      ],
    });
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 20,
      shapes: [heart],
      colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
    };

    // Dispara confeti
    confetti({
      ...defaults,
      particleCount: 50,
      scalar: 2,
    });

    confetti({
      ...defaults,
      particleCount: 25,
      scalar: 3,
    });

    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 4,
    });

    // Luego dispara los fuegos artificiales
    setTimeout(() => {
      var end = Date.now() + 5 * 1000;

      // Definir colores de los fuegos artificiales
      var colors = ["#bb0000", "#ffffff"];

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
          shapes: [heart],
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
          shapes: [heart],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        } else {
          alert("Gracias por confirmar 🥰😍💖💕");
        }
      })();
    }, 500);
  };

  // Función para el cartel gracioso al presionar "No, cágate"
  const showFunnyMessage = () => {
    alert("Ups! Ya no podes decir que no 😜");
  };

  return (
    <div className="relative h-screen w-full overflow-auto snap-y snap-mandatory">
      {/* Canvas animado como fondo */}
      <canvas id="stars" className="absolute inset-0 z-0 h-full"></canvas>

      {/* Secciones con scroll snapping */}
      <div className="relative z-10 flex flex-col text-white">
        {/* Sección 1 */}
        <div
          ref={(el) => (sectionsRef.current[0] = el)}
          className="snap-start flex flex-col items-center justify-center opacity-0 transform translate-y-5 transition-all duration-700 h-screen"
        >
          <h1 className="text-3xl">Hola Iara🥰</h1>
          <p className="mt-4 text-center text-2xl mx-5">
            ¿Cómo estas? Espero que muy bien, y si no es así, espero que esta
            bonita historia de amor te haga sentir mejor. Te la voy a contar en
            varios pasos, no soy el mejor narrador del mundo pero ahí voy.
          </p>
          <br />
          <p className="mt-4 text-center text-2xl underline">
            Desliza hacia abajo para comenzar.
          </p>
        </div>

        {/* Sección 2 */}
        <div
          ref={(el) => (sectionsRef.current[1] = el)}
          className="snap-start flex flex-col items-center justify-center opacity-0 transform translate-y-5 transition-all duration-700 h-screen"
        >
          <h1 className="text-3xl">Una bonita casualidad🌠</h1>
          <p className="mt-4 text-center text-md mx-5">
            Esta bonita historia tiene un inicio fiestero, como todas las buenas
            historias de amor. Una fiesta random a la que fuí por casualidad, en
            un bar-casa antigua, nos conocimos, dos personas que no sabían que
            su vida iba a cambiar de una forma tan bonita.
          </p>
          <p className="mt-4 text-center text-md mx-5">
            Ahí conocí a mi Iara, y luego por cuestiones raras de la vida nos
            fuimos cruzando cada vez más, conociendonos hasta un día compartir
            previa en tu departamento, ahí fue donde todo realmente comenzó.
          </p>
          <p className="mt-4 text-center text-md mx-5">
            Aunque después con tus amigas yo fuera &quot;futuros turnitos de
            terapia&quot;, me diste la oportunidad en tu corazoncito, nos vimos
            más y más y obvio, seguimos de fiesta pero ahora juntos, a eso se
            remontan las primeras fotos, a fiestas, dormir juntos y compartir.
          </p>
        </div>
        {/* Carrusel de Sección 2 */}
        <div
          ref={(el) => (sectionsRef.current[2] = el)}
          className="snap-start flex flex-col items-center opacity-0 transform translate-y-5 transition-all duration-700 h-screen"
        >
          <Carousel
            images={[
              "/foto_1.jpeg",
              "/foto_2.jpeg",
              "/foto_3.jpeg",
              "/foto_4.jpeg",
              "/foto_5.jpeg",
              "/foto_6.jpeg",
              "/foto_7.jpeg",
              "/foto_8.jpeg",
            ]}
          />
        </div>
        {/* Sección 3 */}
        <div
          ref={(el) => (sectionsRef.current[3] = el)}
          className="snap-start flex flex-col items-center justify-center opacity-0 transform translate-y-5 transition-all duration-700 h-screen"
        >
          <h1 className="text-3xl">Compartir🫂</h1>
          <p className="mt-4 text-center mx-5">
            Compartir, esa es una de las palabras a la que nuestra relación se
            podría resumir, compartir momentos, compartir risas, compartir
            tristezas, compartir enojos, compartir todo, y eso es lo que nos
            hace tan fuertes, que siempre estamos ahí el uno para el otro.
          </p>
          <p className="mt-4 text-center mx-5">
            Y es que compartir no solo significa estar en los buenos momentos,
            sino también en los difíciles, creciendo juntos en cada paso. Lo que
            hemos construido es más que una relación, es un equipo, donde
            nuestras risas, sueños y hasta nuestras imperfecciones se entrelazan
            para crear algo único.
          </p>

          <p className="mt-4 text-center mx-5">
            Al pasar el tiempo fuimos abriendo nuestros espacios personales al
            otro, compartiendo un almuerzo con amigos, una marcha juntos por la
            educación pública (nunca había ido a una marcha), una cena o
            almuerzo con la familia, dormir juntos los 3 (con la pequeña
            Roxy🐶🐕), mi acto en la bandera, entre muchas otras cosas.
          </p>
          <p className="mt-4 text-center mx-5">
            Las fotos que siguen son un poco un resumen de esos momentos, que
            nos hacen ser felices el uno con el otro, porque de eso se trata, de
            vivir, compartir y ser felices juntos.
          </p>
        </div>
        {/* Carrusel de la Sección 3 */}
        <div
          ref={(el) => (sectionsRef.current[4] = el)}
          className="snap-start flex flex-col items-center justify-center opacity-0 transform translate-y-5 transition-all duration-700 h-screen"
        >
          <Carousel
            images={[
              "/foto_10.jpg",
              "/foto_11.jpeg",
              "/foto_12.jpeg",
              "/foto_13.jpeg",
              "/foto_14.jpeg",
              "/foto_15.jpeg",
              "/foto_16.jpeg",
              "/foto_17.jpeg",
              "/foto_18.jpeg",
            ]}
          />
        </div>
        {/* Sección 4 */}
        <div
          ref={(el) => (sectionsRef.current[5] = el)}
          className="snap-start flex flex-col items-center justify-center opacity-0 transform translate-y-10 transition-all duration-700 h-screen"
        >
          <h1 className="text-3xl">Compañera❤️‍🩹</h1>
          <p className="mt-4 text-center text-md mx-5">
            Porque eso es lo que sos para mí, la mejor compañera que me pudo
            haber tocado, con la palabra justa, la sonrisa perfecta, el abrazo
            necesario y la energía de la alegría que a veces a uno le hace
            falta.
          </p>
          <p className="mt-4 text-center text-md mx-5">
            Aunque suene un poco redundante todo lo que digo, siempre estoy
            agradecido por tenerte a mi lado, por ser mi compañera de vida, por
            ser mi amiga, mi confidente, mi amor, mi todo. Como te dije el otro
            día, no te necesito para vivir mi vida, pero quiero vivirla con vos,
            porque todo es más lindo a tu lado.
          </p>
          <p className="mt-4 text-center text-md mx-5">
            Las fotos que siguen son un reflejo de eso, el compañerismo que
            tenes conmigo y las ganas de compartir que tengo yo contigo. Son de
            nuestro primer viaje juntos, a Córdoba, donde decidiste acompañarme
            a algo que te era ajeno, simplemente por darme una mano y mi crear
            nuevos recuerdos juntos.
          </p>
        </div>
        {/* Carrusel de la Sección 4 */}
        <div
          ref={(el) => (sectionsRef.current[6] = el)}
          className="snap-start flex flex-col items-center justify-center opacity-0 transform translate-y-10 transition-all duration-700 h-screen"
        >
          <Carousel
            images={[
              "/foto_20.jpeg",
              "/foto_21.jpeg",
              "/foto_22.jpeg",
              "/foto_23.jpeg",
              "/foto_24.jpeg",
              "/foto_25.jpeg",
              "/foto_26.jpeg",
            ]}
          />
        </div>
        {/* Sección 5 */}
        <div
          ref={(el) => (sectionsRef.current[7] = el)}
          className="snap-start flex flex-col items-center justify-center opacity-0 transform translate-y-10 transition-all duration-700 h-screen"
        >
          <h1 className="text-3xl mt-5">Más fiesta💃🕺</h1>
          <p className="mt-4 text-center text-md mx-5">
            Pasaron los meses y todos los días el amor siguió, y lo más lindo de
            esto es que siguió el amor sano, el amor que te hace crecer, el amor
            que te hace ser mejor persona, el amor que te hace feliz, el amor
            que no te priva.
          </p>
          <p className="mt-4 text-center text-md mx-5">
            Por esto que tuvimos más fiesta, porque a pesar de nuestra relación
            no dejamos de ser libres de disfrutar, de compartir con amigos, de
            bailar, de reír sanamente.
          </p>
          <p className="mt-4 text-center text-md mx-5">
            Queria incluir estas fotos porque son de las que más me gustan,
            asique este capitulo lo resumen algunas de nuestras fotos de La
            Florida. Espero que te gusten tanto como a mí.
          </p>
        </div>
        {/* Carrusel de la Sección 5 */}
        <div
          ref={(el) => (sectionsRef.current[8] = el)}
          className="snap-start flex flex-col items-center justify-center opacity-0 transform translate-y-10 transition-all duration-700 h-screen"
        >
          <Carousel
            images={[
              "/foto_30.jpeg",
              "/foto_31.jpeg",
              "/foto_32.jpeg",
              "/foto_33.jpeg",
              "/foto_34.jpeg",
              "/foto_35.jpeg",
              "/foto_36.jpeg",
            ]}
          />
        </div>
        {/* Sección 6 con botones */}
        <div
          ref={(el) => (sectionsRef.current[9] = el)}
          className="snap-start flex flex-col items-center justify-center opacity-0 transform translate-y-10 transition-all duration-700 h-screen"
        >
          <h1 className="text-3xl">Y la historia continúa...</h1>
          <p className="mt-4 text-center text-md mx-5">
            Y así es como llegamos a este punto, a este momento, a este lugar,
            después de 9 meses juntos con muchisimas cosas vividas, con muchas
            cosas compartidas, con muchas cosas por compartir.
          </p>
          <p className="mt-4 text-center text-md mx-5">
            Mi persona favorita, mi compañera de aventuras, mi amor, mi todo. Te
            amo Iara, y espero que esta historia de amor que te cuento te haga
            sentir tan feliz como me haces sentir a mí.
          </p>
          <p className="mt-4 text-center text-md mx-5">
            Esta página es un pequeño regalo para vos, no es el mejor pero esta
            hecho con mucho amor, pero especialmente con un fin. ¿Querés seguir
            compartiendo tu vida conmigo?
          </p>
          <p className="mt-4 text-center text-2xl mx-5 underline">
            ¿Querés ser mi novia?
          </p>
          <div className="mt-6 flex space-x-4">
            {/* Botón "Sí, quiero" */}
            <button
              onClick={launchConfetti}
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Sí, quiero
            </button>

            {/* Botón "No, cágate" */}
            <button
              onClick={showFunnyMessage}
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              No, cágate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente del carrusel
const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
  });

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div
      {...handlers}
      className="flex flex-col items-center justify-center w-full h-full"
    >
      <img
        src={images[currentIndex]}
        alt={`Imagen ${currentIndex + 1}`}
        className="w-full h-auto object-cover"
      />

      {/* Indicadores tipo puntos */}
      <div className="mt-4 flex justify-center space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
