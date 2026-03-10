import { Project } from "../modules/interfaces";

let projects: Project[] = [
    {
        id: 1,
        name: "Website Redesign",
        status: "active",
        createdAt: "2025-01-10T10:00:00.000Z",
    },
    {
        id: 2,
        name: "Mobile App v2",
        status: "planning",
        createdAt: "2025-01-08T10:00:00.000Z",
    },
    {
        id: 3,
        name: "API Migration",
        status: "active",
        createdAt: "2025-01-05T10:00:00.000Z",
    },
    {
        id: 4,
        name: "Security Audit",
        status: "completed",
        createdAt: "2025-01-03T10:00:00.000Z",
    },
];


export const getAllProjects = (): Project[] => {
    return [...projects];
};

export const getProjectById = (id: number): Project | undefined => {
    return projects.find((project) => project.id === id);
};

export const createProject = (name: string, status: string): Project => {
    const newProject: Project = {
        id: projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1,
        name,
        status,
        createdAt: new Date().toISOString(),
    };

    projects.push(newProject);
    return newProject;
};

export const updateProject = (
    id: number,
    name: string,
    status: string
): Project | undefined => {
    const project = projects.find((p) => p.id === id);

    if (!project) {
        return undefined;
    }

    project.name = name;
    project.status = status;

    return project;
};

export const deleteProject = (id: number): Project | undefined => {
    const index = projects.findIndex((p) => p.id === id);

    if (index === -1) {
        return undefined;
    }

    const deleted = projects[index];
    projects.splice(index, 1);
    return deleted;
};