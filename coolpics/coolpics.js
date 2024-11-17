function viewerTemplate(pic, alt) {
    return `<div class="viewer">
        <button class="close-viewer">X</button>
        <img src="${pic}" alt="${alt}">
    </div>`;
}

function viewHandler(event) {
    const clickedElement = event.target;

    if (clickedElement.tagName === 'IMG') {
        const imagePathParts = clickedElement.src.split('-');
        const fullImagePath = `${imagePathParts[0]}-full.jpeg`;

        document.body.insertAdjacentHTML("afterbegin", viewerTemplate(fullImagePath, clickedElement.alt));

        const closeButton = document.querySelector('.close-viewer');
        closeButton.addEventListener('click', closeViewer);
    }
}

function closeViewer() {
    const viewer = document.querySelector('.viewer');
    if (viewer) {
        viewer.remove();
    }
}

const gallery = document.querySelector('.gallery');
gallery.addEventListener('click', viewHandler);
