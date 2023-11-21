import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector("ul.gallery");
const images = galleryItems.map(({ preview, original, description }) => {
  return `
<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
});
galleryContainer.insertAdjacentHTML("beforeend", images.join(""));

galleryContainer.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.classList.contains("gallery__image")) {
    const instance = basicLightbox.create(
      `<img src="${event.target.dataset.source}" alt="${event.target.alt}" />`
    );
    instance.show();
  }
});
