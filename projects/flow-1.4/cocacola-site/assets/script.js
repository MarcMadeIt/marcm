// Snow effekt hentet fra webdesign.tutsplus.com af Jemima Abu


const snowContainer = document.getElementById("snow-container");

const snowContent = ['&#10052', '&#10053', '&#10054'];

const random = (num) => {
    return Math.floor(Math.random() * num);
}

const getRandomStyles = () => {
    const top = random(100);
    const left = random(100);
    const dur = random(10) + 15;
    const size = random(10) + 10;
    return ` 
    top: -${top}%; 
    left: ${left}%; 
    font-size: ${size}px; 
    animation-duration: ${dur}s; 
    `;
}

const createSnow = (num) => {
    for (var i = num; i > 0; i--) {
        var snow = document.createElement("div");
        snow.className = "snow";
        snow.style.cssText = getRandomStyles();
        snow.innerHTML = snowContent[random(3)];
        snowContainer.append(snow);
    }
}

window.addEventListener("load", () => {
    createSnow(100);
});



document.addEventListener('DOMContentLoaded', function () {
    var overlay = document.getElementById('overlay');
    var popup = document.getElementById('popup');
    var openButton = document.getElementById('openButton');
    var closeButton = document.getElementById('closeButton');
    var originalPopupContent = document.querySelector('.popup-content').innerHTML;

    function openPopup() {
        overlay.style.display = 'block';
        popup.style.display = 'block';
    }

    function closePopup() {
        overlay.style.display = 'none';
        popup.style.display = 'none';
        document.querySelector('.popup-content').innerHTML = originalPopupContent;
    }

    openButton.addEventListener('click', openPopup);
    ª
    popup.addEventListener('click', function (event) {
        if (event.target.id === 'closeButton') {
            closePopup();
        }
    });

    closeButton.addEventListener('click', closePopup);
});

function confirmPopupContent() {
    var popupContent = document.querySelector('.popup-content');

    popupContent.innerHTML = '<h1>Du er nu med i konkurrence! </h1> <br> <h4>Vi trækker den heldige vinder d. 02 december 2023 kl 12:00, vi sender mail om hvem den heldige er! <br> <br> <Strong> God Jul! </strong></h4>';

    document.getElementById('closeButton').removeEventListener('click', closePopup);
    document.getElementById('closeButton').addEventListener('click', closePopup);
}