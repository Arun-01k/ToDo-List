import {
  projects,
  createNewProject,
  saveProjectsToLocalStorage,
} from "./storeprojects.js";

function addProjectToMain() {
  const projectsContainer = document.querySelector("#main-content");

  const projectDisplayDiv = document.createElement("div");
  projectDisplayDiv.classList.add("projects");
  projectsContainer.appendChild(projectDisplayDiv);

  const sectionDiv = document.createElement("div");
  sectionDiv.classList.add("section");
  projectDisplayDiv.appendChild(sectionDiv);

  const projectName = document.createElement("input");
  projectName.type = "text";
  projectName.placeholder = "Project Name";

  const projectDescription = document.createElement("input");
  projectDescription.type = "text";
  projectDescription.placeholder = "Project Description";

  const dueDate = document.createElement("input");
  dueDate.type = "date";

  const priority = document.createElement("select");
  const lowOption = document.createElement("option");
  lowOption.value = "low";
  lowOption.textContent = "Low";
  const mediumOption = document.createElement("option");
  mediumOption.value = "medium";
  mediumOption.textContent = "Medium";
  const highOption = document.createElement("option");
  highOption.value = "high";
  highOption.textContent = "High";
  priority.appendChild(lowOption);
  priority.appendChild(mediumOption);
  priority.appendChild(highOption);

  const tasksContainer = document.createElement("div");
  tasksContainer.classList.add("tasks");
  projectDisplayDiv.appendChild(tasksContainer);

  const addTaskBtn = document.createElement("button");
  addTaskBtn.textContent = "+ Add Task";
  addTaskBtn.classList.add("add-task");

  const submitProjectBtn = document.createElement("button");
  submitProjectBtn.textContent = "Submit Project";
  submitProjectBtn.classList.add("submit-project");
  sectionDiv.append(
    projectName,
    projectDescription,
    dueDate,
    priority,
    addTaskBtn,
    submitProjectBtn,
  );

  addTaskBtn.addEventListener("click", () => {
    const taskDiv = document.createElement("input");
    taskDiv.classList.add("task");
    taskDiv.type = "text";
    taskDiv.placeholder = "Task Name";
    tasksContainer.appendChild(taskDiv);
  });

  submitProjectBtn.addEventListener("click", () => {
    const name = projectName.value;
    const description = projectDescription.value;
    const tasks = Array.from(projectDisplayDiv.querySelectorAll(".task")).map(
      (taskInput) => taskInput.value,
    );
    const dueDateValue = dueDate.value;
    const priorityValue = priority.value;

    const newProject = createNewProject(
      name,
      description,
      tasks,
      dueDateValue,
      priorityValue,
    );
    saveProjectsToLocalStorage();
    projectDisplayDiv.remove();
    displayProjectFromStorage(newProject);
  });
}

function displayProjectFromStorage(project) {
  const projectsContainer = document.querySelector("#main-content");

  const projectDisplayDiv = document.createElement("div");
  projectDisplayDiv.classList.add("projects");
  projectsContainer.appendChild(projectDisplayDiv);

  const sectionDiv = document.createElement("div");
  sectionDiv.classList.add("section");
  projectDisplayDiv.appendChild(sectionDiv);

  const titleAndDescriptionDiv = document.createElement("div");
  titleAndDescriptionDiv.classList.add("title-description");
  sectionDiv.appendChild(titleAndDescriptionDiv);

  const projectName = document.createElement("h3");
  projectName.textContent = project.name;

  const projectDescription = document.createElement("p");
  projectDescription.textContent = project.description;

  const dueDate = document.createElement("input");
  dueDate.type = "date";
  dueDate.value = project.dueDate;
  dueDate.readOnly = true;

  const priority = document.createElement("input");
  priority.type = "text";
  priority.value = project.priority;
  priority.readOnly = true;

  const tasksContainer = document.createElement("div");
  tasksContainer.classList.add("tasks");
  projectDisplayDiv.appendChild(tasksContainer);

  const deleteProjectBtn = document.createElement("button");
  deleteProjectBtn.textContent = "Delete Project";
  deleteProjectBtn.classList.add("delete-project");

  deleteProjectBtn.addEventListener("click", () => {
    projectDisplayDiv.remove();
    const projectId = projects.findIndex((p) => p.id === project.id);
    if (projectId !== -1) {
      projects.splice(projectId, 1);
      saveProjectsToLocalStorage();
    }
  });

  project.tasks.forEach((task) => {
    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.value = task;
    taskInput.readOnly = true;
    tasksContainer.appendChild(taskInput);
  });

  titleAndDescriptionDiv.append(projectName, projectDescription);

  sectionDiv.append(dueDate, priority, deleteProjectBtn);
}

export { addProjectToMain, displayProjectFromStorage };
