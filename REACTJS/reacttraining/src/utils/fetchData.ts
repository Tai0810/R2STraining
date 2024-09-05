const BASE_URL = 'https://jsonplaceholder.typicode.com/'
export const fetchData = async (path: string) => {
  try {
    const response = await fetch(BASE_URL + path);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw error;
  }
};
