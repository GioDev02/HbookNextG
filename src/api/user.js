import { ENV, authFetch } from "@/utils";

export class User {
    async getMe() {
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS_ME} `;

            /* const params = {
                 headers: {
                     Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzYwNTAwMTE5LCJleHAiOjE3NjMwOTIxMTl9.EPYAQnyLgUYnOeUVMhDOh8ohXBSYrXzJ-mz4gQOS8e8"
                 },
             };*/

            const response = await authFetch(url);

            const result = await response.json();
            if (response.status != 200) throw result;
            console.log("holam edsde user")
            return result;
        }
        catch (error) {
            throw error;
        }
    }

    async updateMe(userId, data) {
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS}/${userId}`;

            const params = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            };

            const response = await authFetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }
}

