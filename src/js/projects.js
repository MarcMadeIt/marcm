// Her bruger jeg OOP til at indkapsle data og oprette klasser der definere egenskaberne og kan håndtere et projekt fx.

class MultiMedieDesigner {
    #name
    #img
    #biography
    #skills
    #portfolioProject

    constructor(name, img, biography, skills, portfolioProject = []) {
        this.#name = name;
        this.#img = img;
        this.#biography = biography;
        this.#skills = skills;
        this.#portfolioProject = portfolioProject;
    }

    getName() {
        return this.#name;
    }

    setName(name) {
        this.#name = name;
    }

    getImg() {
        return this.#img;
    }

    setImg(img) {
        this.#img = img;
    }

    getBiography() {
        return this.#biography;
    }

    setBiography(biography) {
        this.#biography = biography;
    }

    getSkills() {
        return this.#skills;
    }

    setSkills(skills) {
        this.#skills = skills;
    }

    getPortfolioProject() {
        return this.#portfolioProject;
    }

    setPortfolioProject(portfolioProject) {
        this.#portfolioProject = portfolioProject;
    }

    addPortfolioProject(project) {
        this.#portfolioProject.push(project);
    }

    filterProjectsBySkill(skill) {
        if (skill === 'all') {
            return this.#portfolioProject;
        }
        return this.#portfolioProject.filter(project =>
            project.projectSkills && project.projectSkills.includes(skill)
        );
    }
}

// definere mine detaljer som multimedesigner
const mydetails = new MultiMedieDesigner(
    "Marc Møller",
    "../../assets/img/profile/profile-website.png",
    "Multimediedesigner",
    ["HTML", "CSS", "SASS", "JS", "React", "Photoshop", "Illustrator", "Figma", "InDesign", "PremierPro"]
);

// Funktion til at fetche / indhente data fra min oprettet .json fil. 
const loadProjects = async () => {
    try {
        const response = await fetch('./projects.json');
        if (!response.ok) {
            throw new Error("Kunne ikke hente projektdata");
        }
        const projects = await response.json();
        mydetails.setPortfolioProject(projects);
        displayProjects(projects);
    } catch (error) {
        console.error('Fejl ved hentning af data:', error);
    }
};

// Funktion til vise indhold og hvilken opstilling det skal sættes i HTML
const displayProjects = (projects) => {
    const projectCards = document.getElementById('projectCards');
    projectCards.innerHTML = '';

    projects.forEach((project) => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        projectCard.innerHTML = `
            <a href="${project.projectLink}">
                <div class="card">
                    <img class="batch" src="${project.projectBatch}" alt="Batch Image">
                    <div class="card-img">
                        <img src="${project.projectImg}" alt="Project Image">
                    </div>
                    <h3>${project.projectFlow}</h3>
                    <h4>${project.projectName}</h4>
                    <div class="tags">
                        ${project.projectSkills.map(skill => `<span>#${skill}</span>`).join(' ')} <!-- Prepend # to each skill -->
                    </div>
                    <p>${project.projectDesc}</p>
                    <button>Se projektet</button>
                </div>
            </a>
        `;
        projectCards.appendChild(projectCard);
    });
};

// Funktion til at filtrer ift til kodning skills. 
document.addEventListener('DOMContentLoaded', () => {
    const filterHTML = document.getElementById('filterHTML');
    const filterCSS = document.getElementById('filterCSS');
    const filterJS = document.getElementById('filterJS');
    const filterAll = document.getElementById('filterAll');

    const updateProjectDisplay = (skill) => {
        const filterButtons = document.querySelectorAll('.btn-style');
        filterButtons.forEach(button => button.classList.remove('filter-active'));

        const activeButton = Array.from(filterButtons).find(button => button.id === `filter${skill}`);
        if (activeButton) {
            activeButton.classList.add('filter-active');
        } else {
            filterAll.classList.add('filter-active');
        }

        const filteredProjects = mydetails.filterProjectsBySkill(skill.replace('#', ''));
        displayProjects(filteredProjects);
    };

    if (filterAll) filterAll.addEventListener('click', () => updateProjectDisplay("all"));
    if (filterHTML) filterHTML.addEventListener('click', () => updateProjectDisplay("HTML"));
    if (filterCSS) filterCSS.addEventListener('click', () => updateProjectDisplay("CSS"));
    if (filterJS) filterJS.addEventListener('click', () => updateProjectDisplay("JS"));
});


// Function to display the latest projects
const displayLatest = (projects) => {
    const latestCards = document.getElementById('projectLatest');
    latestCards.innerHTML = '';

    projects.forEach((project) => {
        const latestCard = document.createElement('div');
        latestCard.classList.add('pro-item');

        latestCard.innerHTML = `
            <a href="${project.projectLink}">
                <div class="pro-item">
                    <img class="latest-batch" src="${project.projectBatch}" alt="Batch Image">
                    <span class="flow-text"> ${project.projectName}</span>
                    <img class="pro-img" src="${project.projectImg}" alt="">
                </div>
            </a>
        `;

        latestCards.appendChild(latestCard);
    });
};

// Funktion til at indhente kun tre af de seneste (øverste) projekter fra min .json fil.
const loadLatest = async () => {
    try {
        const getLatest = await fetch('./projects/projects.json');
        if (!getLatest.ok) {
            throw new Error("Kunne ikke hente projektdata");
        }

        const projects = await getLatest.json();
        const threeFirst = projects.slice(0, 3);
        displayLatest(threeFirst);
    } catch (error) {
        console.error('Kan ikke hente seneste projekter', error);
    }
};

// onloader de to funktioner på være deres side, ellers vil den forsøge at oploade begge steder, og give error.
window.onload = () => {
    const path = window.location.pathname;

    if (path === "/" || path === "") {
        loadLatest();
    }

    if (path.includes("/projects/")) {
        loadProjects();
    }
};
