import type { PostMeta } from "~/types";
import { Link } from "react-router";

type LatestPostsProps = {
  posts: PostMeta[];
  limit?: number;
};

const LatestPosts = ({ posts, limit = 3 }: LatestPostsProps) => {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Latest Posts</h2>
      <div className="grid gap-4 lg:grid-cols-3">
        {sortedPosts.slice(0, limit).map((post) => (
          <div
            key={post.slug}
            className="block p-4 border border-gray-600 bg-gray-800 rounded-lg shadow-md transition-colors duration-300 hover:bg-gray-700 rounded-lg"
          >
            <Link to={`/blog/${post.slug}`} className="block mb-3">
              <img
                src={post.image || "/images/no-image.png"}
                alt={post.title}
                className="w-full h-40 object-cover rounded"
                loading="lazy"
              />
            </Link>
            <Link
              to={`/blog/${post.slug}`}
              className="text-xl font-semibold text-blue-400 hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-gray-400 mt-2">{post.excerpt}</p>
            <p className="text-sm text-gray-500 mt-1">
              Published on {new Date(post.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestPosts;
