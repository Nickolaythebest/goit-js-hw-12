// js/render-functions.js
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox;

export function renderGallery(images) {
    const gallery = document.getElementById("gallery");
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <li class="item gallery-item">
        <a href="${largeImageURL}" class="image-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery-image"/>
            <div class="image-info">
                <span>❤️ ${likes}</span>
                <span>👁️ ${views}</span>
                <span>💬 ${comments}</span>
                <span>⬇️ ${downloads}</span>
            </div>
        </a>
        </li>
    `).join('');
    
    gallery.insertAdjacentHTML("beforeend", markup);

    if (!lightbox) {
        lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
    } else {
        lightbox.refresh();
    }
}

export function showLoader() {
    document.getElementById("loader").classList.remove("hidden");
}

export function hideLoader() {
    document.getElementById("loader").classList.add("hidden");
}
export function toggleLoadMoreButton(show) {
    const loadMoreButton = document.getElementById("load-more");
    loadMoreButton.style.display = show ? "block" : "none";
}