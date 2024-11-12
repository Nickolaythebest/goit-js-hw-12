import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { fetchImages } from "./js/pixabay-api";
import { renderGallery, showLoader, hideLoader, toggleLoadMoreButton } from "./js/render-functions";

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const gallery = document.getElementById("gallery");
const loadMoreButton = document.getElementById("load-more");

let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    query = input.value.trim();
    
    if (!query) {
        iziToast.error({ title: "Error", message: "Please enter a search term." });
        return;
    }

    page = 1;
    gallery.innerHTML = '';
    loadMoreButton.style.display = 'none';
    await fetchAndRenderImages();
});

loadMoreButton.addEventListener("click", fetchAndRenderImages);

async function fetchAndRenderImages() {
    showLoader();
    
    try {
        const { images, totalHits: newTotalHits } = await fetchImages(query, page);
        
        if (images.length === 0 && page === 1) {
            iziToast.warning({ message: "Sorry, there are no images matching your search query. Please try again!" });
        } else {
            renderGallery(images);
            totalHits = newTotalHits;
            
            if (page * 15 >= totalHits) {
                toggleLoadMoreButton(false);
                iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
            } else {
                toggleLoadMoreButton(true);
                page += 1;
            }

            smoothScroll();
        }
    } catch (error) {
        iziToast.error({ title: "Error", message: "Something went wrong. Please try again later." });
    } finally {
        hideLoader();
        input.value = '';
    }
}

function smoothScroll() {
    const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}
