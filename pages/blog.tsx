import { client } from '../client';
import Layout from "../components/Layout";
import PostsList from "../components/PostsList";
import { GetStaticPropsContext } from 'next';
import { getNextStaticProps } from '@faustjs/next';

export default function Blog() {
  const { usePosts } = client;
  const posts = usePosts()?.nodes;

  return (
    <Layout>
      <h1>Blog</h1>
      <PostsList posts={posts} />
    </Layout>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
    return getNextStaticProps(context, {
      Page: Blog,
      client,
    });
}