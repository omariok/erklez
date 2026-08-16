// Единая точка доступа к контенту. Если Sanity сконфигурирован — берём оттуда,
// иначе — файловый фолбэк из /content. Серверные компоненты вызывают эти
// async-геттеры и передают данные секциям как props, поэтому переключение
// на CMS происходит без изменения UI (drop-in).

import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityClient } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import {
  siteQuery, fractionsQuery, applicationsQuery, faqQuery,
} from "@/lib/sanity/queries";

import { site as siteFile } from "@/content/site";
import { fractions as fractionsFile } from "@/content/catalog";
import { applications as appsFile } from "@/content/applications";
import { faq as faqFile } from "@/content/faq";

import type {
  SiteConfig, Fraction, FractionColor, Application, FaqItem, MediaAsset,
} from "@/types/content";

// Сырые строки GROQ-ответов (граница с внешними данными).
interface RawImage {
  alt?: string | null;
}

interface SiteRow {
  name: string;
  domain: string;
  phone: string;
  telegram: string;
  whatsapp: string;
  entity: string;
  inn: string;
  vat?: boolean | null;
  stats?: { label: string; value: string }[] | null;
}

interface FractionRow {
  slug: string;
  name: string;
  color: FractionColor; // значения ограничены списком в sanity/schemaTypes/fraction.ts
  hex: string;
  tagline: string;
  sizes: string[];
  weightPerCubic: string;
  packaging: string[];
  applications: string[];
  rare?: boolean | null;
  images?: (RawImage | null)[] | null;
}

interface ApplicationRow {
  slug: string;
  title: string;
  blurb: string;
  image?: RawImage | null;
}

interface FaqRow {
  question: string;
  answer: string;
}

// Преобразует изображение Sanity (с alt) в MediaAsset UI.
function toMedia(img: RawImage | null | undefined, fallbackAlt: string): MediaAsset {
  return {
    src: urlForImage(img as SanityImageSource),
    alt: img?.alt ?? fallbackAlt,
  };
}

export async function getSite(): Promise<SiteConfig> {
  if (!sanityClient) return siteFile;
  const d = await sanityClient.fetch<SiteRow | null>(siteQuery);
  if (!d) return siteFile;
  return {
    name: d.name, domain: d.domain, phone: d.phone,
    telegram: d.telegram, whatsapp: d.whatsapp,
    legal: { entity: d.entity, inn: d.inn, vat: !!d.vat },
    stats: d.stats ?? siteFile.stats,
  };
}

export async function getFractions(): Promise<Fraction[]> {
  if (!sanityClient) return fractionsFile;
  const rows = await sanityClient.fetch<FractionRow[] | null>(fractionsQuery);
  if (!rows?.length) return fractionsFile;
  return rows.map((r) => ({
    ...r,
    rare: !!r.rare,
    images: (r.images ?? []).map((i) => toMedia(i, r.name)),
  }));
}

export async function getApplications(): Promise<Application[]> {
  if (!sanityClient) return appsFile;
  const rows = await sanityClient.fetch<ApplicationRow[] | null>(applicationsQuery);
  if (!rows?.length) return appsFile;
  return rows.map((r) => ({ ...r, image: toMedia(r.image, r.title) }));
}

export async function getFaq(): Promise<FaqItem[]> {
  if (!sanityClient) return faqFile;
  const rows = await sanityClient.fetch<FaqRow[] | null>(faqQuery);
  return rows?.length ? rows : faqFile;
}
