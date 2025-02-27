import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "33vcr9an",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});