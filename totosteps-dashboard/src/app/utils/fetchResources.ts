const baseUrl = '/api/resources/';
export const getResources = async () => {
    try {
        const response = await fetch(`${baseUrl}`);
        if (!response.ok) {
            throw new Error(`Error fetching post: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching post:", error);
        throw error;
    }
};