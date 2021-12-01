import Link from "next/link";
import Layout from "../components/Layout";
import Image from "next/image";
import { client } from '../client';
import { GetStaticPropsContext } from 'next';
import { getNextStaticProps } from '@faustjs/next';

const formatDate = (date) => new Date(date).toLocaleDateString();

export default function SinglePost() {
  const { usePost } = client;
  const post = usePost();
  const haveCategories = Boolean(post.categories().nodes?.length);
  const srcUrl = post?.featuredImage?.node?.sourceUrl();
  const altText = post?.featuredImage?.node?.altText;
  const width = post?.featuredImage?.node?.mediaDetails?.width;
  const height = post?.featuredImage?.node?.mediaDetails?.height;

  return (
    <Layout>
      <article className="blog-post">
        <Image src={srcUrl} alt={altText} width={width} height={height} />
        <h1>{post.title()}</h1>
        <p className="post-meta">
          ✍️ {post.author.node.name} on {formatDate(post.date)}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.content() }} />
        {haveCategories ? (
          <div className="category-list">
            <h4>Categorized As</h4>
            <ul>
              {post.categories().nodes.map((category) => {
                const { slug, name } = category;
                return (
                  <li key={slug}>
                    <Link href={`/category/${slug}`}>
                      <a>
                        <li>{name}</li>
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </article>
    </Layout>
  );
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page: SinglePost,
    client,
    revalidate: 60
  });
}