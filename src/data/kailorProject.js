import { projectConcepts } from "./projectConcepts.js";

const project = projectConcepts.find((item) => item.id === "hugging-face");

export const kailorProject = {
  id: project.id,
  title: project.title,
  name: project.title,
  route: project.path,
  description: project.description,
  // Verified against the implemented OCR and Hugging Face NER pipelines.
  skills: ["Hugging Face", "OCR", "NER"],
  showCoverBackground: true,
};
