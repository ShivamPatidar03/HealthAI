const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const fetchWithTimeout = async (endpoint, options = {}, timeout = 10000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    
    const url = `${API_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
    
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
            const err = await response.json().catch(() => ({}));
            throw new Error(err.detail || `Request failed: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        clearTimeout(id);
        if (error.name === 'AbortError') {
            throw new Error('Request timed out');
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
