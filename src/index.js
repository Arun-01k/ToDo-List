import "./styles.css";
import { addProjectToSidebar, addProjectToMain } from "./dom.js";

class Project {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }
}

let projects = [];

function loadProjects() {                                        //page load rendering
    const savedProjects = localStorage.getItem("projects");
    if (savedProjects) {
    projects = JSON.parse(savedProjects);
    }

    projects.forEach((project) => {                     
    addProjectToSidebar(project);
    addProjectToMain(project);
    });                                             
};

loadProjects();

function saveAllProjectsToLocalStorage(){
    localStorage.setItem("projects", JSON.stringify(projects));
}

const addNewProjectBtn = document.querySelector("#add-new-project-button");
const projectDialog = document.querySelector("#add-project-dialog");
const closeDialogBtn = document.querySelector("#close-button");

addNewProjectBtn.addEventListener("click", () => projectDialog.showModal());
closeDialogBtn.addEventListener("click", () => projectDialog.close());



const form = document.querySelector("form");
    
form.addEventListener("submit", (event) => {                            //submit new project
    event.preventDefault();
    const name = document.querySelector("#project-name").value;
    const description = document.querySelector("#project-description").value;
    const newProject = new Project(name, description);
    projects.push(newProject);
    saveAllProjectsToLocalStorage();
    addProjectToSidebar(newProject);
    addProjectToMain(newProject);
    form.reset();
    projectDialog.close();
});
