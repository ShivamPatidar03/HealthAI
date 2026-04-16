const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const DEFAULT_TIMEOUT = 60000;

const buildUrl = (endpoint) => {
  const cleanBaseURL = API_BASE_URL.replace(/\/$/, "");
  const cleanEndpoint = endpoint.replace(/^\//, "");
  return `${cleanBaseURL}/${cleanEndpoint}`;
};

const parseErrorResponse = async (response) => {
  try {
    const data = await response.json();
    return data?.detail || data?.message || response.statusText;
  } catch {
    return response.statusText || "Unknown server error";
  }
};

const fetchWithTimeout = async (endpoint, options = {}, timeout = DEFAULT_TIMEOUT) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  const url = buildUrl(endpoint);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    clearTimeout(timer);

    if (!response.ok) {
      const errorDetail = await parseErrorResponse(response);
      throw new Error(`API Error (${response.status}): ${errorDetail}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timer);

    if (error.name === "AbortError") {
      throw new Error(
        "Backend response timed out. Render may be waking up from cold start. Wait 20-40 seconds and try again."
      );
    }

    if (
      error.message?.includes("Failed to fetch") ||
      error.message?.includes("NetworkError")
    ) {
      throw new Error(
        "Network error: Could not connect to the backend. Check whether the Render service is live and VITE_API_BASE_URL is correct."
      );
    }

    throw error;
  }
};

export const predictDiabetes = async (data) => {
  try {
    return await fetchWithTimeout("/predict/diabetes", {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Diabetes prediction error:", error);
    throw error;
  }
};

export const predictHeart = async (data) => {
  try {
    return await fetchWithTimeout("/predict/heart", {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Heart prediction error:", error);
    throw error;
  }
};

export const predictStress = async (data) => {
  try {
    return await fetchWithTimeout("/predict/stress", {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Stress prediction error:", error);
    throw error;
  }
};