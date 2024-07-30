// En toggle function der får den til "sidebar" til at dække hele skærmen ved klik på icon

const navMenu = document.getElementById('navbar');
toggleMenu = document.getElementById('drawer-open');
closeMenu = document.getElementById('drawer-close');

toggleMenu.addEventListener('click', () => {
    navMenu.classList.toggle('show')
})
closeMenu.addEventListener('click', () => {
    navMenu.classList.remove('show')
})


// Popup function open/close

function openPopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "block";
}

function closePopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
}

function changePopupContent() {
    var popupContent = document.querySelector(".popup-content");
    popupContent.innerHTML = '<p>Tak for din tilmelding! <i class="fa-regular fa-face-smile-beam happy"></i></p> <p>Du vil nu modtage mine nyhedsbreve.</p>';
    setTimeout(closePopup, 8000);
}

// Kommer frem efter 5 sekunder

setTimeout(openPopup, 5000);