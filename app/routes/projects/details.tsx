import type { Route } from "./+types";
import type { Project, StrapiResponse, StrapiProject } from "~/types";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";
import { extractProject } from "~/utils/projects";

export async function loader({
  request,
  params,
}: Route.LoaderArgs): Promise<{ project: Project }> {
  const { id } = params;
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/projects?filters[documentId][$eq]=${id}&populate=*`
  );
  if (!res.ok) {
    throw new Response("Project not found", { status: 404 });
  }

  const json: StrapiResponse<StrapiProject> = await res.json();

  const item = json.data?.[0];
  if (!item) {
    throw new Response("Project not found", { status: 404 });
  }

  const project: Project = extractProject(item);
  return { project };
}

export function HydrateFallback() {
  return (
    <div className="text-center text-white">Loading project details...</div>
  );
}

const ProjectDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const project = loaderData.project;
  const imageSrc = project.image || "/images/no-image.png";
  return (
    <>
      <Link
        to="/projects"
        className="text-blue-500 hover:underline flex items-center mb-4"
      >
        <FaArrowLeft className="mr-2" />
        Back to Projects
      </Link>
      <div className="grid gap-8 md:grid-cols-2 items-start mb-12">
        <div>
          <img
            src={imageSrc}
            alt={project.title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-4xl font-bold mb-4 text-white">
            {project.title}
          </h2>
          {/* add date */}
          <p className="text-sm text-gray-400 mb-2">
            Published on: {new Date(project.date).toLocaleDateString()}{" "}
            {project.category && `| Category: ${project.category}`}
          </p>
          <p className="text-lg text-gray-300 mb-6">{project.description}</p>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-blue-500 hover:underline"
          >
            View Live Site
          </a>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsPage;
