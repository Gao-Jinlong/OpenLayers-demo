export function getImageSrc(image: string) {
  return new URL(`/src/assets/${image}`, import.meta.url).href
}
