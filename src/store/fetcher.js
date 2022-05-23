import { SERVER_API_URL } from "../config";

const fetcher = async (url, method = "GET", body = {}) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            if (method !== "GET") {
                data.headers = {
                    "Content-Type": "application/json",
                };
                data.body = JSON.stringify(body);
            }

            const response = await fetch(`${SERVER_API_URL}/${url}`, {
                method,
                ...data,
            });
            const responseData = await response.json();
            if (!response.ok) {
                reject(responseData.message || response.statusText);
            }
            resolve(responseData);
        } catch (error) {
            reject(error);
        }
    });
};

export default fetcher;
