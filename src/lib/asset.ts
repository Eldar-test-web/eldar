// Prefix for absolute asset URLs (models, certificates, icons).
// The live site is served under the /eldar basePath on GitHub Pages,
// so a hardcoded "/models/x.glb" would 404 at the domain root.
// NEXT_PUBLIC_BASE_PATH is "" in dev and "/eldar" in PAGES builds.

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetUrl(path: string): string {
  if (!path.startsWith("/")) return `${BASE_PATH}/${path}`;
  return `${BASE_PATH}${path}`;
}
