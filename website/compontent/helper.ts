export const getURL = (url: string) => {
  return new URL(url, import.meta.url).href;
};
