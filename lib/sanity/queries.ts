// GROQ-запросы к Sanity. Сортировка по полю order.
export const siteQuery = `*[_type == "siteSettings"][0]`;

export const fractionsQuery = `*[_type == "fraction"] | order(order asc){
  "slug": slug.current, name, color, hex, tagline, sizes, weightPerCubic,
  packaging, applications, rare, images
}`;

export const applicationsQuery = `*[_type == "application"] | order(order asc){
  "slug": slug.current, title, blurb, image
}`;

export const faqQuery = `*[_type == "faqItem"] | order(order asc){ question, answer }`;
