import { ENV } from "@/utils";

export class Book {
    async getLastPublished() {
        try {
            //usnado el ultimo que se ha "publicado" y no " creado"
            const sort = "sort=publishedAt:desc";
            const pagination = "pagination[limit]=1";
            const populate = "populate=*";
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.BOOK}?${sort}&${pagination}&${populate}`;

            const response = await fetch(url);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }

    async getLatestPublished({ limit = 9, categoryId = null }) {
        try {
            const filterCategory =
                categoryId && `filters[category][id][$eq]=${categoryId}`;
            const paginationLimit = `pagination[limit]=${limit}`;
            const sort = `sort[0]=publishedAt:desc`;//primer creiterio de ordenamiento
            const populate = `populate=*`;
            const urlParams = `${sort}&${paginationLimit}&${filterCategory}&${populate}`;

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.BOOK}?${urlParams}`;

            const response = await fetch(url);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }
    async getBooksByCategorySlug(slug, page) {
        try {
            const filters = `filters[category][slug][$eq]=${slug}`;
            const pagination = `pagination[page]=${page}&pagination[pageSize]=30`;
            const populate = "populate=*";
            const urlParams = `${filters}&${pagination}&${populate}`;

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.BOOK}?${urlParams}`;

            const response = await fetch(url);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }

    async searchBooks(text, page) {
        try {
            const filters = `filters[title][$contains]=${text}`; /**contains=que contenta lo que hay en el texto */
            const pagination = `pagination[page]=${page}&pagination[pageSize]=30`;
            const populate = "populate=*";
            const urlParams = `${filters}&${pagination}&${populate}`;

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.BOOK}?${urlParams}`;

            const response = await fetch(url);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }
    async getBySlug(slug) {
        try {
            //cuando se quiere haer populate de manera especifica, se tiene que hacer todos los populate necesarios
            const filters = `filters[slug][$eq]=${slug}`;
            const populate = `populate[0]=wallpaper&populate[1]=cover&populate&populate[2]=screenshots&populate[3]=category&populate[4]=category.icon`;
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.BOOK}?${filters}&${populate}`;

            const response = await fetch(url);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result.data[0];
        } catch (error) {
            throw error;
        }
    }

    async getBookById(id) {
        try {
            const populate = `populate[0]=cover&populate[1]=category`;

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.BOOK}/${id}?${populate}`;
            const response = await fetch(url);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }

}

