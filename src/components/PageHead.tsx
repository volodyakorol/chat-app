import Head from 'next/head';

import { favicons } from '@/shared/constant/favicons';

const metaData = {
  author: 'Volodymyr Korol',
  title: 'Next.js + Tailwind CSS + TypeScript Starter',
  siteName: 'chat app',
  description:
    'A starter for Next.js, Tailwind CSS, and TypeScript with Absolute Import, Seo, Link component, pre-configured with Husky',
  type: 'website',
  image: `${location.origin}/banner.jpg`,
  locale: 'en_US',
};

export default function PageHead() {
  const { author, title, description, siteName, image, type } = metaData;

  return (
    <Head>
      <title>{metaData.title}</title>
      <meta name='description' content={description} />
      <meta name='author' property='article:author' content={author} />

      {/* Open Graph */}
      <meta property='og:type' content={type} />
      <meta property='og:site_name' content={siteName} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />

      <meta property='og:image' content={image} />
      <meta property='og:image:alt' content='Simple banner for chat app' />
      <meta property='og:image:type' content='image/jpeg' />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />

      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />

      {favicons.map((linkProps) => (
        <link key={linkProps.href} {...linkProps} />
      ))}
    </Head>
  );
}
