import axios from "axios";

const API_KEY = '46842885-9f0c2ceed82c15a306e254aa9';
const BASE_URL = `https://pixabay.com/api/`;
const PER_PAGE = 15;
let currentPage = 1;
export async function fetchImages(query, page = 1) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: true,
                page: page,
                per_page: PER_PAGE,
            }
        });

        return {
            images: response.data.hits,
            totalHits: response.data.totalHits
        };
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error;
    }
}