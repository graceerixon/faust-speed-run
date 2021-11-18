import Link from "next/link";
import Image from "next/image";

export default function PostCard({ post }) {
    console.log(post.featuredImage);

  return (
    <article className="card">
      {post.featuredImage ? (
        <Link href={post.uri ?? ''}>
          <a>
            { <Image
              src={post.featuredImage.node.sourceUrl ?? 'sourceUrl'}
              alt={post.featuredImage.node.altText ?? 'altText'}
              width={post.featuredImage.node.mediaDetails.width ?? ''}
              height={post.featuredImage.node.mediaDetails.height ?? ''}
            /> }
          </a>
        </Link>
      ) : null}
      <Link href={post.uri ?? ''}>
        <a>
          <h2>{post.title()}</h2>
        </a>
      </Link>
      <div dangerouslySetInnerHTML={{ __html: post.excerpt() }} />
    </article>
  );
}