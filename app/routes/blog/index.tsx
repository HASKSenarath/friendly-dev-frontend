import { useState } from "react";
import type { Route } from "./+types";
import type { PostMeta, StrapiResponse, StrapiPost } from "~/types";
import PostCard from "~/components/PostCard";
import Pagination from "~/components/Pagination";
import PostFilter from "~/components/PostFilter";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/posts?populate=image&sort=date:desc`
  );

  if (!res.ok) {
    throw new Response("Failed to fetch posts metadata", { status: 500 });
  }

  const json: StrapiResponse<StrapiPost> = await res.json();

  const posts = (Array.isArray(json.data) ? json.data : []).map((post) => {
    const source =
      (post as StrapiPost & { attributes?: StrapiPost }).attributes ??
      (post as StrapiPost);

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
      body: String(source.body ?? ""),
      image: imageUrl,
    };
  });

  return { posts };
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const normalizedQuery = searchQuery.toLowerCase();
  const filteredPosts = loaderData.posts.filter((post) => {
    const title = post.title?.toLowerCase?.() ?? "";
    const excerpt = post.excerpt?.toLowerCase?.() ?? "";
    return title.includes(normalizedQuery) || excerpt.includes(normalizedQuery);
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const { posts } = loaderData;

  return (
    <div className="max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Blog Page
      </h2>

      <PostFilter
        searchQuery={searchQuery}
        onSearchChange={(query) => {
          setSearchQuery(query);
          setCurrentPage(1);
        }}
      />

      <div className="space-y-6">
        {filteredPosts.length === 0 && (
          <p className="text-gray-400 text-center">No posts found.</p>
        )}

        {currentPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default BlogPage;
