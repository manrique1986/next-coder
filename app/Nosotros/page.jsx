import React from 'react';
import Image from 'next/image';

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Imagen Principal */}
        <div className="relative">
          <Image
            src="https://res.cloudinary.com/dytpump6i/image/upload/v1725925989/pizza-2487090_1280_mftfam.jpg" // Cambia esta ruta por la ruta de tu imagen
            alt="Pizzas deliciosas"
            layout="responsive"
            width={1200}
            height={800}
            className="w-full object-cover "
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white text-center px-4">Nosotros</h1>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#EB3A00] mb-4">Nuestra Historia</h2>
            <p className="text-lg mb-4">
              En <strong>Alta pinta</strong>, nuestra pasión por las pizzas se refleja en cada bocado. Desde nuestros inicios, nos hemos comprometido a ofrecer una experiencia gastronómica única, combinando ingredientes frescos de la más alta calidad con recetas tradicionales y un toque de innovación.
              Cada pizza es elaborada con cuidado y dedicación, desde la masa artesanal hasta los ingredientes locales que elegimos meticulosamente. Nuestro equipo está compuesto por amantes de la pizza que valoran la autenticidad y el sabor en cada creación.
            </p>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#EB3A00] mb-4">Nuestro Compromiso</h2>
            <p className="text-lg mb-4">
              Creemos que compartir una buena pizza es una experiencia que une a las personas, y por eso nos esforzamos por crear un ambiente acogedor en cada una de nuestras ubicaciones. En <strong>Alta pinta</strong>, no solo servimos pizza; servimos momentos memorables. Gracias por ser parte de nuestra historia y permitirnos llevar un pedazo de nuestra pasión a tu mesa.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="https://res.cloudinary.com/dytpump6i/image/upload/v1725926058/pizza-1471406_1280_kh0kxj.jpg" // Cambia esta ruta por la ruta de tu imagen
              alt="Nuestro equipo"
              width={800}
              height={600}
              className="object-cover rounded-lg mb-6"
            />
            <h2 className="text-xl font-semibold text-[#EB3A00] mb-4">Conoce a Nuestro Equipo</h2>
            <p className="text-lg text-center mb-8">
              Nuestro equipo está compuesto por apasionados de la pizza que trabajan incansablemente para ofrecerte la mejor experiencia culinaria. Cada miembro aporta su dedicación y amor por la pizza, asegurando que cada visita sea especial.
            </p>
            <button className="bg-[#EB3A00] hover:bg-[#d26b48] text-white font-bold py-2 px-6 rounded">
              Conócenos Más
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;