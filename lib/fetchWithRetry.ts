export async function fetchWithRetry<T>(
  fetchFn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      return await fetchFn();
    } catch (error) {
      attempts++;

      if (attempts >= maxRetries) throw error;

      await new Promise((res) => setTimeout(res, delay));
    }
  }

  throw new Error("Gagal fetch data setelah beberapa percobaan");
}
