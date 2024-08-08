const sliderCards = document.querySelector('.slider-cards');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const background = document.querySelector('.background');
const indicatorsContainer = document.querySelector('.indicators');
const audio = document.getElementById('background-music');
const muteButton = document.querySelector('.mute-button');
const muteIcon = document.querySelector('.mute-icon');

const travelImages = [
    { src: 'image1.jpg' },
    { src: 'image2.jpg' },
    { src: 'image3.jpg' },
    { src: 'image4.jpg' },
    { src: 'image5.jpg' },
    { src: 'image6.jpg' },
    { src: 'image7.jpg' },
    { src: 'image8.jpg' },
    { src: 'image9.jpg' },
    { src: 'image10.jpg' },
    { src: 'image11.jpg' },
    { src: 'image12.jpg' },
    { src: 'image13.jpg' },
    { src: 'image14.jpg' },
    { src: 'image15.jpg' },
    { src: 'image16.jpg' },
    { src: 'image17.jpg' },
    { src: 'image18.jpg' },
    { src: 'image19.jpg' },
    { src: 'image20.jpg' },
    { src: 'image21.jpg' },
    { src: 'image22.jpg' },
    { src: 'image23.jpg' },
    { src: 'image24.jpg' },
    { src: 'image25.jpg' },
    { src: 'image26.jpg' },
    { src: 'image27.jpg' },
    { src: 'image28.jpg' },
    { src: 'image29.jpg' },
    { src: 'image30.jpg' },
    { src: 'image31.jpg' },
    { src: 'image32.jpg' },
    { src: 'image33.jpg' },
    { src: 'image34.jpg' },
    { src: 'image35.jpg' },
    { src: 'image36.jpg' },
    { src: 'image37.jpg' },
    { src: 'image38.jpg' },
    { src: 'image39.jpg' },
    { src: 'image40.jpg' },
    { src: 'image41.jpg' },
    { src: 'image42.jpg' },
    { src: 'image43.jpg' },
    { src: 'image44.jpg' },
    { src: 'image45.jpg' },
    { src: 'image46.jpg' },
    { src: 'image47.jpg' },
    { src: 'image48.jpg' },
    { src: 'image49.jpg' },
    { src: 'image50.jpg' },
    { src: 'image51.jpg' },
    { src: 'image52.jpg' },
    { src: 'image53.jpg' },
    { src: 'image54.jpg' },
    { src: 'image55.jpg' },
    { src: 'image56.jpg' },
    { src: 'image57.jpg' },
    { src: 'image58.jpg' },
    { src: 'image59.jpg' },
    { src: 'image60.jpg' },
    { src: 'image61.jpg' },
    { src: 'image62.jpg' },
    { src: 'image63.jpg' },
    { src: 'image64.jpg' },
    { src: 'image65.jpg' },
    { src: 'image66.jpg' },
    { src: 'image67.jpg' },
    { src: 'image68.jpg' },
    { src: 'image69.jpg' },
    { src: 'image70.jpg' },
    { src: 'image71.jpg' },
    { src: 'image72.jpg'}
];

let currentIndex = 0;
let slideInterval;
let isMuted = false;

muteButton.addEventListener('click', () => {
    isMuted = !isMuted;
    audio.muted = isMuted;
    muteIcon.src = isMuted ? 'audio-mute.png' : 'audio-on.png';
});

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-music');
    audio.volume = 0.2;

    document.body.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch(error => {
                console.log('Autoplay not allowed', error);
            });
        }
    });
});

function createCard(image, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('role', 'tabpanel');
    card.setAttribute('aria-hidden', 'true');

    const cardImage = document.createElement('div');
    cardImage.classList.add('card-image');
    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.title || '';
    cardImage.appendChild(img);

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');
    const title = document.createElement('h3');
    title.textContent = image.title || '';
    const description = document.createElement('p');
    description.textContent = image.description || '';
    cardContent.appendChild(title);
    cardContent.appendChild(description);

    card.appendChild(cardImage);
    card.appendChild(cardContent);

    if (index === currentIndex) {
        card.classList.add('active');
        card.setAttribute('aria-hidden', 'false');
        background.style.backgroundImage = `url(${image.src})`;
    }

    addParallaxEffect(card);

    return card;
}

function updateSlider() {
    sliderCards.innerHTML = '';

    travelImages.forEach((image, index) => {
        const card = createCard(image, index);
        sliderCards.appendChild(card);
    });

    const cardWidth = parseFloat(getComputedStyle(document.querySelector('.card')).width) + 30; // Adjusted for margin
    const offset = -currentIndex * cardWidth;
    sliderCards.style.transition = 'transform 0.5s ease'; // Smooth transition
    sliderCards.style.transform = `translateX(${offset}px)`;

    // Update indicators
    indicatorsContainer.innerHTML = '';
    travelImages.forEach((_, index) => {
        const indicator = document.createElement('span');
        indicator.classList.add('indicator');
        if (index === currentIndex) {
            indicator.classList.add('active');
        }
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
        indicatorsContainer.appendChild(indicator);
    });
}

function addParallaxEffect(card) {
    const img = card.querySelector('img');
    const sensitivity = 0.02;

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        img.style.transform = `translate(${x * sensitivity}px, ${y * sensitivity}px)`;
    });

    card.addEventListener('mouseleave', () => {
        img.style.transform = 'translate(0, 0)';
    });
}

function goToPreviousSlide() {
    currentIndex = (currentIndex - 1 + travelImages.length) % travelImages.length;
    updateSlider();
}

function goToNextSlide() {
    currentIndex = (currentIndex + 1) % travelImages.length;
    updateSlider();
}

function startAutoSlide() {
    slideInterval = setInterval(goToNextSlide, 5000);
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

prevBtn.addEventListener('click', () => {
    goToPreviousSlide();
    stopAutoSlide();
    startAutoSlide();
});
nextBtn.addEventListener('click', () => {
    goToNextSlide();
    stopAutoSlide();
    startAutoSlide();
});

prevBtn.setAttribute('aria-label', 'Previous Slide');
nextBtn.setAttribute('aria-label', 'Next Slide');

// Initialize slider and start auto-slide
updateSlider();
startAutoSlide();