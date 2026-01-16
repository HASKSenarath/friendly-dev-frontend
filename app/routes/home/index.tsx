import type { Project, PostMeta, StrapiPost, StrapiResponse } from "~/types";
import type { Route } from "./+types/index";
import FeaturedProjects from "~/components/FeaturedProjects";
import AboutPreview from "~/components/AboutPreview";
import LatestPosts from "~/components/LatestPosts";
import { extractProjects } from "~/utils/projects";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev | Welcome" },
    { name: "description", content: "Custom website for The Friendly Dev" },
  ];
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[]; posts: PostMeta[] }> {
  const [prjectRes, postRes] = await Promise.all([
    fetch(
      `${import.meta.env.VITE_API_URL}/projects?filters[featured][$eq]=true&populate=*`
    ),
    fetch(
      `${import.meta.env.VITE_API_URL}/posts?populate=image&sort=date:desc`
    ),
  ]);

  if (!prjectRes.ok) {
    throw new Response("Unable to load projects right now. Please try again.", {
      status: 500,
    });
  }

  if (!postRes.ok) {
    throw new Response(
      "Unable to load recent posts right now. Please try again.",
      {
        status: 500,
      }
    );
  }

  const [projectsJson, postsJson] = await Promise.all([
    prjectRes.json(),
    postRes.json(),
  ]);

  const projects = extractProjects(projectsJson);
  const postsPayload = postsJson as StrapiResponse<StrapiPost>;
  const posts = (Array.isArray(postsPayload?.data) ? postsPayload.data : []).map(
    (post) => {
      const source = (post as StrapiPost & { attributes?: StrapiPost })
        .attributes ?? (post as StrapiPost);

      const imageValue = source.image;
      const nestedUrl =
        imageValue?.url ??
        imageValue?.data?.attributes?.url ??
        imageValue?.data?.url ??
        null;
      const imageUrl =
        typeof nestedUrl === "string"
          ? nestedUrl.startsWith("http")
            ? nestedUrl
            : `${import.meta.env.VITE_STRAPI_URL}${nestedUrl}`
          : "";

      return {
        id: String(post.id ?? source.id ?? ""),
        title: String(source.title ?? ""),
        excerpt: String(source.excerpt ?? ""),
        slug: String(source.slug ?? ""),
        date: String(source.date ?? ""),
        image: imageUrl,
      };
    }
  );

  return { projects, posts };
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
  const { projects, posts } = loaderData;
  return (
    <>
      <FeaturedProjects projects={projects} count={3} />
      <AboutPreview />
      <LatestPosts posts={posts} limit={3} />
    </>
  );
};

export default HomePage;
