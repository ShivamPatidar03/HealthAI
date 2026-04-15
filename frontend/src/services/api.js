const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const predictDiabetes = async (data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/predict/diabetes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.detail || `Prediction failed: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Diabetes prediction error:", error);
        throw error;
    }
};

export const predictHeart = async (data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/predict/heart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.detail || `Heart prediction failed: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Heart prediction error:", error);
        throw error;
    }
};

export const predictStress = async (data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/predict/stress`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.detail || `Stress prediction failed: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Stress prediction error:", error);
        throw error;
    }
};
