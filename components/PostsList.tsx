import PostCard from "../components/PostCard";

export default function PostsList({ posts }) {
    console.log(posts);

  return (
    <ul className="posts-list">
      {posts.map((post) => (
        <li key={post.databaseId}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}