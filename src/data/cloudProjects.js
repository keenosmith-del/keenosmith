import { featuredProjects } from './featuredProjects.js';
import { projectConcepts } from './projectConcepts.js';

export const cloudProjects = [
    { id: 'banking-risk', platform: 'AWS', route: '/projects/aws' },
    { id: 'microsoft-devops', platform: 'Microsoft Azure', route: '/projects/microsoft' },
    { id: 'vertex-ai-retail', platform: 'Google Cloud', route: '/projects/gcp' },
].map(project => {
    const featured = featuredProjects.find(item => item.id === project.id);
    return {
        ...project,
        title: featured.title,
        skill: featured.skill,
        description: featured.description,
        name: projectConcepts.find(item => item.id === project.id).title,
    };
});

export const cloudProfiles = [
    { label: 'Microsoft Profile', url: 'https://learn.microsoft.com/en-us/users/keenosmith/' },
    { label: 'Google Profile', url: 'https://www.skills.google/public_profiles/105079cb-27bf-46a4-9c48-9ce8fc594527' },
    { label: 'AWS Profile', url: 'https://skillsprofile.skillbuilder.aws/user/keenosmith' },
];
