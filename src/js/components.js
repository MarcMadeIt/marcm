

// Denne function er et eksempel på hvordan jeg kan lave components og den flere forskellige steder

class SoMe {
    renderSoMe() {
        return `
            <a href="https://www.facebook.com/marcm1703" target="_blank"><iconify-icon
            icon="fa6-brands:square-facebook" style="color: #9ef9ff;" width="40" height="40"></iconify-icon>
            </a>
            <a href="https://www.linkedin.com/in/marcmoller/" target="_blank"><iconify-icon
            icon="fa6-brands:linkedin" style="color: #9ef9ff;" width="45" height="40"></iconify-icon>
            </a>
            <a href="https://github.com/MarcMadeIt" target="_blank"><iconify-icon icon="fa6-brands:square-github"
            style="color: #9ef9ff;" width="40" height="40"></iconify-icon>
            </a>
            `;
    }
}

const contentSoMe = new SoMe();

const showSoMe = () => {
    const handleSoMe = document.querySelectorAll("#socials");
    handleSoMe.forEach(element => {
        element.innerHTML = contentSoMe.renderSoMe();
    });
}

showSoMe();
