import type { PostMeta } from "~/types";
import { Link } from "react-router";

const PostCard = ({ post }: { post: PostMeta }) => {
  const imageSrc = post.image || "/images/no-image.png";
  return (
    <article className="bg-gray-700 p-6 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-300">
      <Link to={`/blog/${post.slug}`} className="block mb-4">
        <img
          src={imageSrc}
          alt={post.title}
          className="w-full h-48 object-cover rounded"
          loading="lazy"
        />
      </Link>
      <Link
        to={`/blog/${post.slug}`}
        className="text-xl font-semibold text-blue-400 hover:text-blue-300"
      >
        {post.title}
      </Link>
      <p className="text-gray-500 text-sm mt-2">
        {new Date(post.date).toLocaleDateString()}
      </p>
      <p className="text-gray-400 mt-2">{post.excerpt}</p>
      <Link
        to={`/blog/${post.slug}`}
        className="text-blue-300 text-sm hover:underline mt-4 block"
      >
        Read More &rarr;
      </Link>
    </article>
  );
};

export default PostCard;
