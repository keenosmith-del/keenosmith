export const starterQuestions = ['Does Keeno know React?', 'Show me his AI projects', 'What certifications does he have?'];
export const normalizeSocial = (text) => text.trim().toLowerCase().replace(/[.!?,]+$/g, '').trim();

// Shared by both the original deterministic entry point and the reasoning wrapper.
export function socialAnswer(question, context = {}) {
  const social = normalizeSocial(question);
  const simple = (text, intent, suggestions = []) => ({ text, projects: [], credentials: [], indicators: [], suggestions,
    interpretation: { intent, entities: [] }, context, local: true });
  if (/^(hi|hey|hello|hello there|hi there|hey there|good morning|good afternoon|good evening)$/.test(social))
    return simple("Hey there! I'm Keeno's portfolio assistant. I can help you explore his technical experience, projects and skills, or consider his background for a role—what would you like to know?", 'greeting', starterQuestions);
  if (/^(thanks|thank you|thank you so much|thanks a lot|cheers|ok thanks)$/.test(social))
    return simple("You're welcome! Feel free to explore another skill or project.", 'thanks');
  if (/^(what can you do|how can you help|help)$/.test(social))
    return simple("I can explain Keeno's documented skills, projects, experience and credentials, and briefly compare his background with a role. For a detailed job-description assessment, use Recruiter View.", 'help', starterQuestions);
  if (/\b(weather|sports scores|stock price|recipe)\b/.test(social))
    return simple("I specialise in Keeno's engineering background, so I can't help with that. Would you like to explore his projects or skills?", 'unknown', starterQuestions);

  return null;
}
