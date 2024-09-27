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

    setImg() {
        this.#img = img;
    }


    getBiography() {
        return this.#biography
    }

    setBiography(biography) {
        this.#biography = biography;
    }

    getSkills() {
        return this.#skills
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
        this.#portfolioProject.push(project)
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

// definere alle metoderne



const mydetails = new MultiMedieDesigner("Marc Møller",
    "https://images.pexels.com/photos/69932/tabby-cat-close-up-portrait-69932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "Web Developer",
    ["HTML", "CSS", "SASS", "Tailwind", "JS", "React", "NextJS", "NodeJS", "Express", "MongoDB", "MySQL"]
)


// Funktion til at vise projekterne
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
                    ${project.projectSkills.map(skill => `<span>${skill}</span>`).join(' ')}
                    </div>
                    <p>${project.projectDesc}</p>
                    <button>Se projektet</button>
                </div>
            </a>
        `;

        projectCards.appendChild(projectCard);
    });
}

const loadProjects = async () => {
    try {
        const response = await fetch('./projects.json');
        if (!response.ok) {
            throw new Error("Kunne ikke hente projektdata");
        }
        const projects = await response.json();
        displayProjects(projects);
    } catch (error) {
        console.error('Fejl ved hentning af data:', error);
    }
}


const displayLatest = (projects) => {
    const latestCards = document.getElementById('projectLatest');
    latestCards.innerHTML = '';


    projects.forEach((project) => {
        const latestCard = document.createElement('div');
        latestCard.classList.add('pro-item')

        latestCard.innerHTML = `
            <a href="${project.projectLink}">
                <div class="pro-item">
                    <img class="latest-batch" src="${project.projectBatch}" alt="Batch Image">
                    <span class="flow-text"> ${project.projectName}</span>
                    <img class="pro-img" src="${project.projectImg}" alt="">
                </div>
            </a>
        `;

        latestCards.appendChild(latestCard)
    });

}


const loadLatest = async () => {
    try {
        const getLatest = await fetch('./projects/projects.json');
        if (!getLatest.ok) {
            throw new Error("Kunne ikke hente projektdata");
        }

        const projects = await getLatest.json();
        const threeFirst = projects.slice(0, 3);

        displayLatest(threeFirst)
    } catch (error) {
        console.error('Kan ikke hente seneste projekter', error)
    }
}


window.onload = () => {
    const path = window.location.pathname;

    if (path.includes("index.html") || path === "/") {
        loadLatest();
    }

    if (path.includes("projects.html")) {
        loadProjects();
    }
};