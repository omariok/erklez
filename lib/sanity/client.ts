import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion, sanityEnabled } from "./env";

// Клиент создаётся только если Sanity сконфигурирован.
export const sanityClient = sanityEnabled
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;
