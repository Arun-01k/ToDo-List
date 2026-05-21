function addProjectToSidebar(project) {                             //for sidebar
    const sidebar = document.querySelector("#sidebar");
    const projectElement = document.createElement("div");
    const projectName = document.createElement("p");
    projectName.textContent = project.name;
    projectElement.appendChild(projectName);
    sidebar.appendChild(projectElement);
}

function addProjectToMain(project) {                                //for main content
    const mainContent = document.querySelector("#main-content");
    const projectElement = document.createElement("div");
    const projectName = document.createElement("h2");
    const projectDescription = document.createElement("p");
    projectName.textContent = project.name;
    projectDescription.textContent = project.description;
    projectElement.appendChild(projectName);
    projectElement.appendChild(projectDescription);
    mainContent.appendChild(projectElement);
}

export { addProjectToSidebar, addProjectToMain };