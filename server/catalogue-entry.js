// Bundled before dev/build so Node never needs to load browser image imports.
export { conversationalAnswer, boundHistory } from '../src/assistant/conversation.js';
export { canonicalProjects as projects, credentials, education, experience, skills } from '../src/assistant/knowledge.js';
export { evidence } from '../src/assistant/retrieve.js';
