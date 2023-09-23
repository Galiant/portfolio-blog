import BlogList from '@/components/BlogList';
import PreviewBlogList from '@/components/PreviewBlogList';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import { draftMode } from 'next/headers';

const query = groq`
  *[_type=='post'] {
    ...,
    author->,
    categories[]->
  } | order(_createdAt desc)
`;

export const revalidate = 60; // revalidate this page every 60 seconds

export default async function HomePage() {
  const { isEnabled } = draftMode();
  const posts = await client.fetch(query);
  console.log('IS_PREVIEW', isEnabled);

  if (isEnabled) {
    return <PreviewBlogList />;
  }

  return <BlogList posts={posts} />;
}
