// helpers/chat/image-helpers.js
export function extractImageUrls(text = "") {
  if (!text) return [];
  // http/https ve bilinen görsel uzantıları
  const regex =
    /(https?:\/\/[^\s)"'<>]+?\.(?:png|jpg|jpeg|webp))(?![^(\s]*\))/gi;
  const urls = new Set();
  let m;
  while ((m = regex.exec(text)) !== null) {
    const u = m[1];
    if (/^https?:\/\//i.test(u)) urls.add(u);
  }
  return [...urls];
}

export function preloadImage(url, onDone) {
  try {
    const img = new Image();
    img.referrerPolicy = "no-referrer";
    img.crossOrigin = "anonymous";
    img.onload = () => onDone?.(true);
    img.onerror = () => onDone?.(false);
    img.src = url;
  } catch (e) {
    onDone?.(false);
  }
}
