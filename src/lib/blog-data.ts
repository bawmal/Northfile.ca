// Centralized blog data structure for easy extensibility
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author?: string;
  keywords?: string[];
  published: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-prepare-t776-ontario-rental-taxes",
    title: "How to Prepare a T776 in Ontario: Rental Taxes Without the Year-End Scramble",
    excerpt: "If you own a rental property in Ontario, tax season probably feels familiar. This guide explains how Ontario landlords can prepare their T776 rental income form, track deductions properly, and avoid last-minute stress every spring.",
    category: "Tax Forms",
    date: "February 11, 2026",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=600&fit=crop",
    author: "Northfile Team",
    keywords: ["T776", "Ontario rental taxes", "landlord tax preparation", "rental income form", "CRA tax forms", "rental property taxes"],
    published: true,
  },
];

// Helper function to get all published posts
export function getPublishedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.published);
}

// Helper function to get a post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug && post.published);
}

// Helper function to get posts by category
export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category && post.published);
}

// Get all unique categories
export function getCategories(): string[] {
  const categories = new Set(blogPosts.map(post => post.category));
  return Array.from(categories);
}
