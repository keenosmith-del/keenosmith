import revenueOpsCover from "../assets/images/custom-projects/crewai-revenueops.webp";
import revenueOpsCoverSmall from "../assets/images/custom-projects/crewai-revenueops-640.webp";
import streamlitCover from "../assets/images/custom-projects/eventops-low-code-streamlit.webp";
import streamlitCoverSmall from "../assets/images/custom-projects/eventops-low-code-streamlit-640.webp";
import assessFlowCover from "../assets/images/custom-projects/ms-assessflow.webp";
import assessFlowCoverSmall from "../assets/images/custom-projects/ms-assessflow-640.webp";
import huggingFaceCover from "../assets/images/ai-section/hugging-face-project.webp";
import huggingFaceCoverSmall from "../assets/images/ai-section/hugging-face-project-640.webp";
import azureCover from "../assets/images/cloud-section/ms-project.webp";
import azureCoverSmall from "../assets/images/cloud-section/ms-project-640.webp";
import awsCover from "../assets/images/cloud-section/aws-project.webp";
import awsCoverSmall from "../assets/images/cloud-section/aws-project-640.webp";
import googleCover from "../assets/images/cloud-section/gcp-project.webp";
import googleCoverSmall from "../assets/images/cloud-section/gcp-project-640.webp";
import ollamaCover from "../assets/images/ai-section/ollama-project.webp";
import ollamaCoverSmall from "../assets/images/ai-section/ollama-project-640.webp";
import claudeCover from "../assets/images/custom-projects/claude-project.webp";
import claudeCoverSmall from "../assets/images/custom-projects/claude-project-640.webp";
import n8nCover from "../assets/images/full-stack-section/n8n-project.webp";
import n8nCoverSmall from "../assets/images/full-stack-section/n8n-project-640.webp";
import workforceCover from "../assets/images/custom-projects/hr-project.webp";
import workforceCoverSmall from "../assets/images/custom-projects/hr-project-640.webp";
import reliabilityCover from "../assets/images/custom-projects/chaos-project.webp";
import reliabilityCoverSmall from "../assets/images/custom-projects/chaos-project-640.webp";
import telecomCover from "../assets/images/custom-projects/telecom-project.webp";
import telecomCoverSmall from "../assets/images/custom-projects/telecom-project-640.webp";
import fieldServiceCover from "../assets/images/custom-projects/field-service-project.webp";
import fieldServiceCoverSmall from "../assets/images/custom-projects/field-service-project-640.webp";
import fleetCover from "../assets/images/custom-projects/logistics-project.webp";
import fleetCoverSmall from "../assets/images/custom-projects/logistics-project-640.webp";

import mernCover from "../assets/images/custom-projects/mern-project.webp";
import mernCoverSmall from "../assets/images/custom-projects/mern-project-640.webp";
import ragCover from "../assets/images/custom-projects/ai-model-project.webp";
import ragCoverSmall from "../assets/images/custom-projects/ai-model-project-640.webp";
import workspaceCover from "../assets/images/custom-projects/enterprise-workspace-project.webp";
import workspaceCoverSmall from "../assets/images/custom-projects/enterprise-workspace-project-640.webp";
import musicCover from "../assets/images/custom-projects/music-api-project.webp";
import musicCoverSmall from "../assets/images/custom-projects/music-api-project-640.webp";
import manufacturingCover from "../assets/images/custom-projects/intelligence-manufacturing-project.webp";
import manufacturingCoverSmall from "../assets/images/custom-projects/intelligence-manufacturing-project-640.webp";
import mlopsCover from "../assets/images/custom-projects/enterprise-ai-mlops.webp";
import mlopsCoverSmall from "../assets/images/custom-projects/enterprise-ai-mlops-640.webp";
import eventOpsCover from "../assets/images/ai-section/eventops-project.webp";
import eventOpsCoverSmall from "../assets/images/ai-section/eventops-project-640.webp";

// Shared by Explore and Selected projects; key by ID to keep artwork and colours aligned.
export const projectArtwork = {
  "crewai-revenueops": { image: revenueOpsCover, srcSet: `${revenueOpsCoverSmall} 640w, ${revenueOpsCover} 1122w`, background: "#353336", ink: "var(--surface)" },
  "eventops-streamlit": { image: streamlitCover, srcSet: `${streamlitCoverSmall} 640w, ${streamlitCover} 1122w`, background: "#9b9692", ink: "#202022" },
  "ms-assessflow": { image: assessFlowCover, srcSet: `${assessFlowCoverSmall} 640w, ${assessFlowCover} 1024w`, background: "#b0814b", ink: "#202022" },
  "intelligence-manufacturing-llmops": {
    image: manufacturingCover, srcSet: `${manufacturingCoverSmall} 640w, ${manufacturingCover} 1083w`,
    background: "#a8a9aa",
    ink: "var(--charcoal)",
  },
  "enterprise-ai-mlops": {
    image: mlopsCover, srcSet: `${mlopsCoverSmall} 640w, ${mlopsCover} 1083w`,
    background: "#3a3a3c",
    ink: "var(--surface)",
  },
  "eventops-intelligence": {
    image: eventOpsCover, srcSet: `${eventOpsCoverSmall} 640w, ${eventOpsCover} 853w`,
    background: "#d5d7d4",
    ink: "var(--charcoal)",
  },
  "hugging-face": {
    image: huggingFaceCover, srcSet: `${huggingFaceCoverSmall} 640w, ${huggingFaceCover} 720w`,
    background: "#f2dbc2",
    ink: "var(--charcoal)",
  },
  "microsoft-devops": {
    image: azureCover, srcSet: `${azureCoverSmall} 640w, ${azureCover} 1024w`,
    background: "#90bbc2",
    ink: "var(--charcoal)",
  },
  "banking-risk": {
    image: awsCover, srcSet: `${awsCoverSmall} 640w, ${awsCover} 1122w`,
    background: "#807f7c",
    ink: "var(--surface)",
  },
  "vertex-ai-retail": {
    image: googleCover, srcSet: `${googleCoverSmall} 640w, ${googleCover} 1122w`,
    background: "#dddee0",
    ink: "var(--charcoal)",
  },
  ollama: { image: ollamaCover, srcSet: `${ollamaCoverSmall} 640w, ${ollamaCover} 1151w`, background: "#b9b3a4", ink: "var(--charcoal)" },
  claude: { image: claudeCover, srcSet: `${claudeCoverSmall} 640w, ${claudeCover} 1024w`, background: "#55504a", ink: "var(--surface)" },
  n8n: { image: n8nCover, srcSet: `${n8nCoverSmall} 640w, ${n8nCover} 1122w`, background: "#a8a9aa", ink: "var(--charcoal)" },
  deepseek: {
    image: workforceCover, srcSet: `${workforceCoverSmall} 640w, ${workforceCover} 1024w`,
    background: "#fdfdfd",
    ink: "var(--charcoal)",
  },
  "distributed-reliability": {
    image: reliabilityCover, srcSet: `${reliabilityCoverSmall} 640w, ${reliabilityCover} 1147w`,
    background: "#5a5271",
    ink: "var(--surface)",
  },
  "telecom-billing": {
    image: telecomCover, srcSet: `${telecomCoverSmall} 640w, ${telecomCover} 1122w`,
    background: "#f2dbc2",
    ink: "var(--charcoal)",
  },
  "field-service": {
    image: fieldServiceCover, srcSet: `${fieldServiceCoverSmall} 640w, ${fieldServiceCover} 1090w`,
    background: "#cbcbcb",
    ink: "var(--charcoal)",
  },
  "fleet-operations": {
    image: fleetCover, srcSet: `${fleetCoverSmall} 640w, ${fleetCover} 1122w`,
    background: "#3a3a3c",
    ink: "var(--surface)",
  },
  "productivity-platform": {
    image: mernCover, srcSet: `${mernCoverSmall} 640w, ${mernCover} 1083w`,
    background: "#d5d7d4",
    ink: "var(--charcoal)",
  },
  "ai-assistant": {
    image: ragCover, srcSet: `${ragCoverSmall} 640w, ${ragCover} 1122w`,
    background: "#d3a6a3",
    ink: "var(--charcoal)",
  },
  "enterprise-workspace": {
    image: workspaceCover, srcSet: `${workspaceCoverSmall} 640w, ${workspaceCover} 1122w`,
    background: "#d5d7d4",
    ink: "var(--charcoal)",
  },
  "music-api": {
    image: musicCover, srcSet: `${musicCoverSmall} 640w, ${musicCover} 1122w`,
    background: "#e4ceb5",
    ink: "var(--charcoal)",
  },
};
