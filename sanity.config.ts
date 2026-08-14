import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";
import { projectId, dataset } from "./lib/sanity/env";

// Русскоязычная админка. Открывается по адресу /studio.
export default defineConfig({
  name: "erklez",
  title: "Эрклёз — контент",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
