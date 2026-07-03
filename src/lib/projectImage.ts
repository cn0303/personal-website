import type { ImageMetadata } from 'astro';

// Eagerly resolve every project image so components can pick by slug + filename.
// Path is relative to this file (src/lib) → project assets live at src/assets.
const imgs = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/projects/*/*.{png,jpg,jpeg,webp}',
  { eager: true },
);

export function projectImg(slug: string, name?: string): ImageMetadata | undefined {
  return name ? imgs[`../assets/projects/${slug}/${name}`]?.default : undefined;
}
