import { Link } from "react-router";

type HeroProps = {
  name?: string;
  text?: string;
};

const Hero = ({
  name = "Sapumal",
  text = "A passionate developer crafting web experiences with Java Spring Boot, React, Remix, and Tailwind CSS.",
}: HeroProps) => {
  return (
    <header className="text-center py-20 px-4 bg-gray-900 text-white transition-colors duration-300">
      <h2 className="text-4xl font-bold mb-4">Hey, I'm {name}</h2>
      <p className="text-lg text-gray-300 max-w-2xl mx-auto md-6">{text}</p>
      <div className="flex justify-center gap-4">
        <Link
          to="/projects"
          className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
        >
          View Projects
        </Link>
        <Link
          to="/contact"
          className="mt-8 inline-block bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
        >
          Contact Me
        </Link>
      </div>
    </header>
  );
};

export default Hero;
