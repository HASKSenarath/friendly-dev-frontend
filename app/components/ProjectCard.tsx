import type { Project } from "~/types";
import { Link } from "react-router";

const ProjectCard = ({ project }: { project: Project }) => {
  const imageSrc = project.image || "/images/no-image.png";
  return (
    <Link
      to={`/projects/${project.documentId}`}
      className="block transform transition duration-300 hover:scale-[1.02]"
    >
      <div
        key={project.id}
        className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
      >
        <img
          src={imageSrc}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-white">
            {project.title}
          </h3>
          <p className="text-gray-300 mb-4">{project.description}</p>
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span className="bg-blue-500 text-white px-2 py-1 rounded">
              {project.category}
            </span>
            <span>{project.date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
