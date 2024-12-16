import { galleryImages } from './gallery.mjs';
// navigation.js (ES Module)
export const toggleMenu = () => {
    const nav = document.querySelector('nav');
    nav.classList.toggle('open');
};

// gallery.js (ES Module)



const galleryContainer = document.querySelector('.gallery-container');

const createImageElement = (image) => {
    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt;
    img.title = image.title;
    img.addEventListener('click', () => {
        createLightbox(image.src);
    });
    return img;
};

const galleryElements = galleryImages.map(createImageElement);

galleryContainer.append(...galleryElements);

// lightbox.js (ES Module)
export const createLightbox = (imageUrl) => {
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Lightbox Image';

    lightbox.appendChild(img);
    document.body.appendChild(lightbox);

    lightbox.addEventListener('click', () => {
        lightbox.remove();
    });
};

// contact.js (ES Module)
const contactForm = document.getElementById('contact-form');
if(contactForm){
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
    
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
    
        // Basic client-side validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
    
        // Send form data (e.g., using fetch API)
        // ...
    
        alert('Your message has been sent!');
        contactForm.reset(); 
    });
   
}

