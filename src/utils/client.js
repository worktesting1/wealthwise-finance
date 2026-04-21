import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "2qn5yyrb",
  dataset: "production",
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "2025-08-09", // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
});
