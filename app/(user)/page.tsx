import BlogList from '@/components/BlogList';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

const query = groq`
  *[_type=='post'] {
    ...,
    author->,
    categories[]->
  } | order(_createdAt desc)
`;

export const revalidate = 60; // revalidate this page every 60 seconds

export default async function HomePage() {
  const posts = await client.fetch(query);
  return <BlogList posts={posts} />;
}
