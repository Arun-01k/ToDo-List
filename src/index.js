import "./styles.css";
import { addProjectToMain, displayProjectFromStorage } from "./dom.js";

import {
  createNewProject,
  saveProjectsToLocalStorage,
  loadProjectsFromLocalStorage,
  projects,
} from "./storeprojects.js";

addProjectToMain();

loadProjectsFromLocalStorage();

function renderProjects() {
  projects.forEach((project) => {
    displayProjectFromStorage(project);
  });
}

const addNewProjectBtn = document.querySelector("#add-new-project-button");
addNewProjectBtn.addEventListener("click", () => {
  addProjectToMain();
});

renderProjects();
