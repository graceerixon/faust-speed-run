import Link from "next/link";
import Image from "next/image";
import { Post } from "../client";

export default function PostCard({ post }: { post: Post }) {
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