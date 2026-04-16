const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const fetchWithTimeout = async (endpoint, options = {}, timeout = 12000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    
    // Ensure accurate URL construction without trailing/leading slash conflicts
    const cleanBaseURL = API_BASE_URL.replace(/\/$/, '');
    const cleanEndpoint = endpoint.replace(/^\//, '');
    const url = `${cleanBaseURL}/${cleanEndpoint}`;
    
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
        clearTimeout(id);
        
        if (!response.ok) {
            let errorDetail = response.statusText;
            try {
                const errData = await response.json();
                errorDetail = errData.detail || errorDetail;
            } catch (e) {
                // Not a JSON error
            }
            throw new Error(`API Error (${response.status}): ${errorDetail}`);
        }
        
        return await response.json();
    } catch (error) {
        clearTimeout(id);
        
        if (error.name === 'AbortError') {
            throw new Error('Connection timeout: The backend is taking too long to respond. It might be waking up (Cold Start).');
        }
        
        if (error.message.includes('Failed to fetch')) {
            throw new Error('Network Error: Could not connect to the backend. Please check your internet or verify if the backend is live.');
        }
        
        throw error;
    }
};

export const predictDiabetes = async (data) => {
    try {
        return await fetchWithTimeout('/predict/diabetes', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error("Diabetes prediction error:", error);
        throw error;
    }
};

export const predictHeart = async (data) => {
    try {
        return await fetchWithTimeout('/predict/heart', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error("Heart prediction error:", error);
        throw error;
    }
};

export const predictStress = async (data) => {
    try {
        return await fetchWithTimeout('/predict/stress', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error("Stress prediction error:", error);
        throw error;
    }
};
