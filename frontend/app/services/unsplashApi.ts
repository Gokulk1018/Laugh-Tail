const UNSPLASH_ACCESS_KEY = process.env.EXPO_PUBLIC_UNSPLASH_KEY;
const BASE_URL = "https://api.unsplash.com";

export const fetchPlacesByCategory = async (category: string) => {
  console.log("API CALLED WITH:", category);
  console.log("KEY:", UNSPLASH_ACCESS_KEY);

  const response = await fetch(
    `${BASE_URL}/search/photos?query=${category}&per_page=5`,
    {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    }
  );

  const data = await response.json();
  console.log("API RESPONSE:", data);

  return data.results || [];
};