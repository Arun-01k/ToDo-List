import {
  createNewProject,
  saveProjectsToLocalStorage,
} from "./storeprojects.js";

function addProjectToMain() {
  const projectsContainer = document.querySelector("#main-content");

  const projectDisplayDiv = document.createElement("div");
  projectDisplayDiv.classList.add("projects");
  projectsContainer.appendChild(projectDisplayDiv);

  const projectName = document.createElement("input");
  projectName.type = "text";
  projectName.placeholder = "Project Name";

  const projectDescription = document.createElement("textarea");
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

  const addTaskBtn = document.createElement("button");
  addTaskBtn.textContent = "+ Add Task";
  addTaskBtn.classList.add("add-task");

  const submitProjectBtn = document.createElement("button");
  submitProjectBtn.textContent = "Submit Project";
  submitProjectBtn.classList.add("submit-project");
  projectDisplayDiv.append(
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
    projectDisplayDiv.appendChild(taskDiv);
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

  const projectName = document.createElement("input");
  projectName.type = "text";
  projectName.value = project.name;
  projectName.readOnly = true;

  const projectDescription = document.createElement("textarea");
  projectDescription.value = project.description;
  projectDescription.readOnly = true;

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

  project.tasks.forEach((task) => {
    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.value = task;
    taskInput.readOnly = true;
    tasksContainer.appendChild(taskInput);
  });

  projectDisplayDiv.append(projectName, projectDescription, dueDate, priority);
}

export { addProjectToMain, displayProjectFromStorage };
