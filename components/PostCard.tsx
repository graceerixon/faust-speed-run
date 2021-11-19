import Link from "next/link";
import Image from "next/image";
import { Post } from "../client";

export default function PostCard({ post }: { post: Post }) {
  /**
   * Since the <Image /> component is behind a condition (checking if srcUrl exists),
   * we need to define the data selections outside of the condition so they are
   * reachable when building the GraphQL queries in Faust/GQty.
   *
   * Additionally, we can use optional chaining to ensure that these values do
   * not cause errors if accessed and the data is not available yet.
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
   * @link https://gqty.dev/docs/react/troubleshooting#data-selections--conditionals
   */
  const srcUrl = post?.featuredImage?.node?.sourceUrl();
  const altText = post?.featuredImage?.node?.altText;
  const width = post?.featuredImage?.node?.mediaDetails?.width;
  const height = post?.featuredImage?.node?.mediaDetails?.height;

  return (
    <article className="card">
      {srcUrl ? (
        <Link href={post.uri ?? ""}>
          <a>
            {<Image src={srcUrl} alt={altText} width={width} height={height} />}
          </a>
        </Link>
      ) : null}
      <Link href={post.uri ?? ""}>
        <a>
          <h2>{post.title()}</h2>
        </a>
      </Link>
      <div dangerouslySetInnerHTML={{ __html: post.excerpt() }} />
    </article>
  );
}