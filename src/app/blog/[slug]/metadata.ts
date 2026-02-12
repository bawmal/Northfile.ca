import { Metadata } from 'next';
import { getPostBySlug } from '@/lib/blog-data';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found | Northfile',
      description: 'The requested blog post could not be found.',
    };
  }

  const baseUrl = 'https://northfile.ca';
  const url = `${baseUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} | Northfile Blog`,
    description: post.excerpt,
    keywords: post.keywords?.join(', '),
    authors: post.author ? [{ name: post.author }] : undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: url,
      siteName: 'Northfile',
      images: [
        {
          url: post.image,
          width: 1200,
          height: 600,
          alt: post.title,
        },
      ],
      locale: 'en_CA',
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: post.author ? [post.author] : undefined,
      tags: post.keywords,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
    alternates: {
      canonical: url,
    },
  };
}
