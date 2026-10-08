import elephantCover from '../assets/explore-projects/elephant.png';
import azureCover from '../assets/explore-projects/goofy-guy.png';
import awsCover from '../assets/explore-projects/whimsical-guy.png';
import googleCover from '../assets/explore-projects/furry-monkey.png';
import ollamaCover from '../assets/explore-projects/aloof-blonde.png';
import claudeCover from '../assets/explore-projects/pink-monkey.png';
import n8nCover from '../assets/explore-projects/curly-haired-guy.png';
import workforceCover from '../assets/explore-projects/grumpy-old-man.png';
import reliabilityCover from '../assets/explore-projects/smyle.png';
import telecomCover from '../assets/explore-projects/elderly-traveller.png';
import fieldServiceCover from '../assets/explore-projects/duck.png';
import fleetCover from '../assets/explore-projects/boy.png';

import mernCover from '../assets/explore-projects/furry-green.png';
import ragCover from '../assets/explore-projects/elderly-man-sage.png';
import workspaceCover from '../assets/explore-projects/cozy-sheep.png';
import musicCover from '../assets/explore-projects/pink-monster.png';
import visualOneCover from '../assets/explore-projects/pink-sweater.png';
import visualTwoCover from '../assets/explore-projects/red-stoic-man.png';
import visualThreeCover from '../assets/explore-projects/reading.png';

// Shared by Explore and Selected projects; key by ID to keep artwork and colours aligned.
export const projectArtwork = {
    'hugging-face': { image: elephantCover, background: '#fedc6f', ink: 'var(--charcoal)' },
    'microsoft-devops': { image: azureCover, background: '#f86d04', ink: 'var(--charcoal)' },
    'banking-risk': { image: awsCover, background: '#397b88', ink: 'var(--surface)' },
    'vertex-ai-retail': { image: googleCover, background: '#d5e0ee', ink: 'var(--charcoal)' },
    'ollama': { image: ollamaCover, background: '#5a5271', ink: 'var(--surface)' },
    'claude': { image: claudeCover, background: '#e4d1c5', ink: 'var(--charcoal)' },
    'n8n': { image: n8nCover, background: '#ebb013', ink: 'var(--charcoal)' },
    'deepseek': { image: workforceCover, background: '#1b1f20', ink: 'var(--surface)' },
    'distributed-reliability': { image: reliabilityCover, background: '#e8bda7', ink: 'var(--charcoal)' },
    'telecom-billing': { image: telecomCover, background: '#9a8573', ink: 'var(--charcoal)' },
    'field-service': { image: fieldServiceCover, background: '#b3aca2', ink: 'var(--charcoal)' },
    'fleet-operations': { image: fleetCover, background: '#89c3c1', ink: 'var(--charcoal)' },
    'productivity-platform': { image: mernCover, background: '#169f7d', ink: 'var(--surface)' },
    'ai-assistant': { image: ragCover, background: '#d2ccc8', ink: 'var(--charcoal)' },
    'enterprise-workspace': { image: workspaceCover, background: '#97b2c4', ink: 'var(--charcoal)' },
    'music-api': { image: musicCover, background: '#d3a6a3', ink: 'var(--charcoal)' },
    'ux-ui-visual-1': { image: visualOneCover, background: '#d97c83', ink: 'var(--charcoal)' },
    'ux-ui-visual-2': { image: visualTwoCover, background: '#9e3c46', ink: 'var(--surface)' },
    'ux-ui-visual-3': { image: visualThreeCover, background: '#e3e9df', ink: 'var(--charcoal)' },
};
