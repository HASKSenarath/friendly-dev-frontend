import ReactMarkdown from "react-markdown";
import type { Route } from "./+types/details";
import type { PostMeta, StrapiPost, StrapiResponse } from "~/types";
import { Link } from "react-router";

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/posts?filters[slug][$eq]=${encodeURIComponent(
      slug ?? ""
    )}&populate=image`
  );

  if (!res.ok) {
    throw new Response("Failed to fetch posts metadata", { status: 500 });
  }

  const json: StrapiResponse<StrapiPost> = await res.json();
  const rawPost = Array.isArray(json.data) ? json.data[0] : null;
  if (!rawPost) {
    throw new Response("Post not found", { status: 404 });
  }

  const source =
    (rawPost as StrapiPost & { attributes?: StrapiPost }).attributes ??
    (rawPost as StrapiPost);

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
        : `${nestedUrl}`
      : "/images/no-image.png";

  const bodyValue = source.body;
  const bodyText = Array.isArray(bodyValue)
    ? bodyValue
        .map((block: any) =>
          Array.isArray(block?.children)
            ? block.children.map((child: any) => child?.text ?? "").join("")
            : ""
        )
        .filter((text: string) => text.trim().length > 0)
        .join("\n\n")
    : String(bodyValue ?? "");

  const postMeta: PostMeta & { body: string } = {
    id: String(rawPost.id ?? source.id ?? ""),
    title: String(source.title ?? ""),
    excerpt: String(source.excerpt ?? ""),
    slug: String(source.slug ?? ""),
    date: String(source.date ?? ""),
    image: imageUrl,
    body: bodyText,
  };

  return { postMeta };
}

const BlogPostDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const { postMeta } = loaderData;
  const imageSrc = postMeta.image || "/images/no-image.png";
  return (
    <div className="max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-blue-500 mb-8 text-center">
        {postMeta.title}
      </h2>
      <p className="text-gray-500 text-sm mb-4">
        {new Date(postMeta.date).toLocaleDateString()}
      </p>
      <img
        src={imageSrc}
        alt={postMeta.title}
        className="w-full rounded-lg mb-6"
        loading="lazy"
      />
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown>{postMeta.body}</ReactMarkdown>
      </div>
      <Link
        to="/blog"
        className="inline-block bg-blue-500 text-white px-4 py-2 mt-8 rounded hover:bg-blue-600"
      >
        &larr; Back to Blog
      </Link>
    </div>
  );
};
export default BlogPostDetailsPage;
