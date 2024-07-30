
// Denne unktion tilføjer ny class "animate-load" når DOM loades.

document.addEventListener("DOMContentLoaded", function () {
    addAnimationToSections("intro", "animate-load");
    addAnimationToSections("cards", "animate-load");
    addAnimationToSections("doc-content", "animate-load");
    addAnimationToSections("process-content", "animate-load");
});

// Og derudover kan denne bruges til at sætte andre animation igang, ved brug af classname. 

function addAnimationToSections(className, animationClass) {
    var sections = document.querySelectorAll("." + className);
    sections.forEach(function (section) {
        section.classList.add(animationClass);
    });
}


// Denne funktion tilføjer og fjerner ny class "change" til at for headeren til at reagere. Samt sætte en event på der gøre det når vinduets y akse er rykket med 50px. 

const header = document.querySelector("header");
const navDiv = document.querySelector(".nav");
const logoDiv = document.querySelector(".logo");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("change");
        navDiv.classList.add("change");
        logoDiv.classList.add("change");
    } else {
        header.classList.remove("change");
        navDiv.classList.remove("change");
        logoDiv.classList.remove("change");
    }
});

// Denne funktion tilføjer ny class "show" til nav-menu, ved klik på henholdvis toggle-menu (hamburger) og close-menu (xmark) logoerne. Så den ændre egenskaberne. 

const navMenu = document.getElementById('nav-menu');
toggleMenu = document.getElementById('toggle-menu');
closeMenu = document.getElementById('close-menu')
const navLinks = document.querySelectorAll('.nav a');

toggleMenu.addEventListener('click', () => {
    navMenu.classList.toggle('show')
})
closeMenu.addEventListener('click', () => {
    navMenu.classList.remove('show')
});

// Denne sikre at den også fjerne show ved klik på .nav a, som er diffineret oppe som const. 

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
});


// Funktion der kan skifte mellem webNum 1 og 2 via, ved brug af displays egenskaber: block og none, så det er skiftende. 

function toggleWeb(webNum) {
    if (webNum === 1) {
        document.getElementById('webdes').style.display = 'block';
        document.getElementById('webdev').style.display = 'none';
    } else if (webNum === 2) {
        document.getElementById('webdes').style.display = 'none';
        document.getElementById('webdev').style.display = 'block';
    }
}


// Funktion til at tilføje class .popup-overlay og dernæst id videoPopup, og dermed sætte video tags som autoplay, load og play til. Så det automatisk starter. 

function openPopup(event) {
    event.preventDefault();
    document.querySelector('.popup-overlay').style.display = 'block';
    const videoPopup = document.getElementById('videoPopup');
    videoPopup.style.display = 'block';

    const video = videoPopup.querySelector('.video');

    if (video) {
        video.autoplay = true;
        video.load();
        video.play();
    }
}

// Close funktion, tilføjer display: none; til videoPopup

function closePopup() {
    document.querySelector('.popup-overlay').style.display = 'none';
    const videoPopup = document.getElementById('videoPopup');
    videoPopup.style.display = 'none';


    // Denne vil sætte videoen på pause, når man forlader videoPopup
    const video = videoPopup.querySelector('.video');
    if (video) {
        video.pause();
    }
}