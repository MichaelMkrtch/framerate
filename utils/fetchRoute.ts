export default async function fetchRoute(endpoint: string) {
  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      let error = new Error("An error occurred while fetching endpoint!");
      throw error;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}
