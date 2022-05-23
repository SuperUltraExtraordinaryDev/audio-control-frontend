import { SERVER_API_URL } from "../config";

const upload = async (formData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${SERVER_API_URL}/upload/audio`, {
                method: "POST",
                body: formData,
            });
            const responseData = await response.json();
            if (!response.ok) {
                reject(responseData.message || response.statusText);
            }
            resolve(responseData.url);
        } catch (error) {
            reject(error);
        }
    });
};

export default upload;
