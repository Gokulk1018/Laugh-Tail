const UNSPLASH_ACCESS_KEY = process.env.EXPO_PUBLIC_UNSPLASH_KEY;
const BASE_URL = "https://api.unsplash.com";

export const fetchImageForPlace = async (query: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/photos?query=${query}&per_page=1`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    const data = await response.json();
    return data.results?.[0] || null;
  } catch (error) {
    console.error("Unsplash error:", error);
    return null;
  }
};