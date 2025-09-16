let index = 0;
const slides = document.querySelector('.slides');
const slideItems = document.querySelectorAll('.slide');
const totalSlides = slideItems.length;
// console.log(totalSlides);


// Clone first and last slides to create an infinite loop effect
const firstClone = slideItems[0].cloneNode(true);
const lastClone = slideItems[totalSlides - 1].cloneNode(true);

// Append and prepend clones
slides.appendChild(firstClone);
slides.insertBefore(lastClone, slideItems[0]);

// Update total slides count (including clones)
const updatedSlides = document.querySelectorAll('.slide');
const totalUpdatedSlides = updatedSlides.length;

// Adjust initial position
slides.style.transform = `translateX(-100%)`;

function moveSlide(step) {
    index += step;

    slides.style.transition = "transform 0.5s ease-in-out";
    slides.style.transform = `translateX(-${(index + 1) * 100}%)`;

    // If reaching the end of cloned slides, reset without transition
    setTimeout(() => {
        if (index >= totalSlides) {
            slides.style.transition = "none";
            index = 0;
            slides.style.transform = `translateX(-100%)`;
        } else if (index < 0) {
            slides.style.transition = "none";
            index = totalSlides - 1;
            slides.style.transform = `translateX(-${totalSlides * 100}%)`;
        }
    }, 500); // Matches transition time
    window.onload
}

// Auto-slide every 3 seconds
setInterval(() => moveSlide(1), 4000);

// Image slider
let imageSlides = document.querySelectorAll(".slidee");
let currentSlide = 0;

function nextImageSlide() {
    imageSlides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % imageSlides.length;
    imageSlides[currentSlide].classList.add("active");
}

// Change slide every 6 seconds
setInterval(nextImageSlide, 6000);