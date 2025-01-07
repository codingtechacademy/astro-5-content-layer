import { defineCollection, z, reference } from "astro:content";
import { glob, file } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: reference("authors"),
  }),
});

const authors = defineCollection({
  loader: file("src/authors/authors.json"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    job: z.string(),
  }),
});

export const collections = { posts, authors };
