export function recipeFetch() {
  if (!window.recipes || !Array.isArray(window.recipes)) {
    console.error('Missing or invalid window.recipes data');
    return [];
  }
  return window.recipes;
}
