'use client';

import BlogList from '@/components/BlogList';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

type Props = {
  query: string;
  posts: Post[];
};

const previewQuery = groq`
  *[_type=='post'] {
    ...,
    author->,
    categories[]->
  } | order(_createdAt desc)
`;

async function PreviewBlogList() {
  //   const posts = useLiveQuery(null, query);

  const previewPosts = await client.fetch(previewQuery);
  // const [data, loading] = await useLiveQuery(posts, query);

  // console.log('DATA', data);

  // if (loading) {
  //   return <h1>Loading data....</h1>;
  // }

  return (
    <div>
      <h2>Preview Mode</h2>
      <BlogList posts={previewPosts} />
    </div>
  );
}

export default PreviewBlogList;
