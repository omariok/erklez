// Единая точка доступа к контенту. Если Sanity сконфигурирован — берём оттуда,
// иначе — файловый фолбэк из /content. Компоненты вызывают эти async-геттеры,
// поэтому переключение на CMS происходит без изменения UI (drop-in).

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
  SiteConfig, Fraction, Application, FaqItem, MediaAsset,
} from "@/types/content";

// Преобразует изображение Sanity (с alt) в MediaAsset UI.
function toMedia(img: any, fallbackAlt = ""): MediaAsset {
  return { src: urlForImage(img), alt: img?.alt ?? fallbackAlt };
}

export async function getSite(): Promise<SiteConfig> {
  if (!sanityClient) return siteFile;
  const d = await sanityClient.fetch(siteQuery);
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
  const rows = await sanityClient.fetch(fractionsQuery);
  if (!rows?.length) return fractionsFile;
  return rows.map((r: any) => ({
    ...r,
    images: (r.images ?? []).map((i: any) => toMedia(i, r.name)),
  }));
}

export async function getApplications(): Promise<Application[]> {
  if (!sanityClient) return appsFile;
  const rows = await sanityClient.fetch(applicationsQuery);
  if (!rows?.length) return appsFile;
  return rows.map((r: any) => ({ ...r, image: toMedia(r.image, r.title) }));
}

export async function getFaq(): Promise<FaqItem[]> {
  if (!sanityClient) return faqFile;
  const rows = await sanityClient.fetch(faqQuery);
  return rows?.length ? rows : faqFile;
}

