import { defineCollection, z, reference } from "astro:content";
import { glob, file } from "astro/loaders";
import type { Country } from "./models/country";

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
    country: reference("countries"),
  }),
});

const countries = defineCollection({
  loader: async () => {
    const response = await fetch("https://api.first.org/data/v1/countries");

    const { data } = (await response.json()) as Record<string, Country>;

    return Object.entries(data).map(([key, country]: [string, Country]) => ({
      id: key,
      country: country.country,
      region: country.region,
    }));
  },
  schema: z.object({
    id: z.string(),
    country: z.string(),
    region: z.string(),
  }),
});

export const collections = { posts, countries, authors };
