class Project {
  constructor(name, description, tasks = [], dueDate, priority) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.description = description;
    this.tasks = tasks;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

let projects = [];

function createNewProject(name, description, tasks = [], dueDate, priority) {
  const newproject = new Project(name, description, tasks, dueDate, priority);
  projects.push(newproject);
  return newproject;
}

function saveProjectsToLocalStorage() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function loadProjectsFromLocalStorage() {
  const savedProjects = localStorage.getItem("projects");
  if (savedProjects) {
    projects = JSON.parse(savedProjects);
  }
}

export {
  createNewProject,
  saveProjectsToLocalStorage,
  loadProjectsFromLocalStorage,
  projects,
};
