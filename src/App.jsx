import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { projectConcepts } from "./data/projectConcepts.js";

import PageScroll from "./components/navigation/PageScroll.jsx";
import Header from "./components/navigation/Header.jsx";
import PortfolioActions from "./components/navigation/PortfolioActions.jsx";
import Hero from "./components/sections/Hero/Hero.jsx";
import Cloud from "./components/sections/Cloud/Cloud.jsx";
const ProjectPreview = lazy(() => import("./components/pages/ProjectPreview/ProjectPreview.jsx"));
const ProjectPlaceholder = lazy(() => import("./components/pages/ProjectPlaceholder/ProjectPlaceholder.jsx"));
import { cloudProjects } from "./data/cloudProjects.js";
import AI from "./components/sections/AI/AI.jsx";
import { aiProjects } from "./data/aiProjects.js";
import Kailor from "./components/sections/Kailor/Kailor.jsx";
import { kailorProject } from "./data/kailorProject.js";
import FullStack from "./components/sections/FullStack/FullStack.jsx";
import { fullStackProject } from "./data/fullStackProject.js";
import Timeline from "./components/sections/Timeline/Timeline.jsx";
import { selectedProjects } from "./data/selectedProjects.js";
import SelectedProjects from "./components/sections/SelectedProjects/SelectedProjects.jsx";
import Footer from "./components/sections/Footer/Footer.jsx";

const Explore = lazy(() => import("./components/pages/Explore/Explore.jsx"));
const ExploreProjectPreview = lazy(() => import("./components/pages/Explore/ExploreProjectPreview.jsx"));
const CV = lazy(() => import("./components/pages/CV/CV.jsx"));
const RecruiterView = lazy(() => import("./components/pages/RecruiterView/RecruiterView.jsx"));

import { rebuildingProjects } from "./data/rebuildingProjects.js";
import { canonicalProjects } from "./assistant/knowledge.js";

const AWSBankingRisk = lazy(() => import("./components/pages/projects/AWSBankingRisk/AWSBankingRisk.jsx"));
const MicrosoftDevOps = lazy(() => import("./components/pages/projects/MicrosoftDevOps/MicrosoftDevOps.jsx"));
const GCPRetail = lazy(() => import("./components/pages/projects/GCPRetail/GCPRetail.jsx"));

const EventOpsIntelligence = lazy(() => import("./components/pages/projects/EventOpsIntelligence/EventOpsIntelligence.jsx"));
const CrewAIRevenueOps = lazy(() => import("./components/pages/projects/CrewAIRevenueOps/CrewAIRevenueOps.jsx"));
const EventOpsStreamlit = lazy(() => import("./components/pages/projects/EventOpsStreamlit/EventOpsStreamlit.jsx"));
const MicrosoftAssessFlow = lazy(() => import("./components/pages/projects/MicrosoftAssessFlow/MicrosoftAssessFlow.jsx"));
const OllamaPrivateBI = lazy(() => import("./components/pages/projects/OllamaPrivateBI/OllamaPrivateBI.jsx"));

const KailorVentures = lazy(() => import("./components/pages/projects/KailorVentures/KailorVentures.jsx"));

const OpsFlow = lazy(() => import("./components/pages/projects/OpsFlow/OpsFlow.jsx"));

const ClaudeProcurement = lazy(() => import("./components/pages/projects/ClaudeProcurement/ClaudeProcurement.jsx"));

const SREChaosEngineering = lazy(() => import("./components/pages/projects/SREChaosEngineering/SREChaosEngineering.jsx"));

const DeepSeekWorkforce = lazy(() => import("./components/pages/projects/DeepSeekWorkforce/DeepSeekWorkforce.jsx"));

const TelecomBilling = lazy(() => import("./components/pages/projects/TelecomBilling/TelecomBilling.jsx"));

const FieldServiceMaintenance = lazy(() => import("./components/pages/projects/FieldServiceMaintenance/FieldServiceMaintenance.jsx"));

const FleetOperations = lazy(() => import("./components/pages/projects/FleetOperations/FleetOperations.jsx"));

const HuggingFaceInsurance = lazy(() => import("./components/pages/projects/HuggingFaceInsurance/HuggingFaceInsurance.jsx"));

const ProductivityPlatform = lazy(() => import("./components/pages/projects/ProductivityPlatform/ProductivityPlatform.jsx"));

const MusicAPI = lazy(() => import("./components/pages/projects/MusicAPI/MusicAPI.jsx"));

const EnterpriseWorkspace = lazy(() => import("./components/pages/projects/EnterpriseWorkspace/EnterpriseWorkspace.jsx"));

const AIEntity = lazy(() => import("./components/pages/projects/AIEntity/AIEntity.jsx"));

const ManufacturingQC = lazy(() => import("./components/pages/projects/ManufacturingQC/ManufacturingQC.jsx"));

const EnterpriseCustomerOperations = lazy(() => import("./components/pages/projects/EnterpriseCustomerOperations/EnterpriseCustomerOperations.jsx"));

import "./components/pages/projects/AWSBankingRisk/AWSBankingRisk.css";
import "./components/pages/projects/MicrosoftDevOps/MicrosoftDevOps.css";
import "./components/pages/projects/GCPRetail/GCPRetail.css";
import "./components/pages/projects/EventOpsIntelligence/EventOpsIntelligence.css";
import "./components/pages/projects/CrewAIRevenueOps/CrewAIRevenueOps.css";
import "./components/pages/projects/EventOpsStreamlit/EventOpsStreamlit.css";
import "./components/pages/projects/MicrosoftAssessFlow/MicrosoftAssessFlow.css";
import "./components/pages/projects/OllamaPrivateBI/OllamaPrivateBI.css";
import "./components/pages/projects/KailorVentures/KailorVentures.css";
import "./components/pages/projects/OpsFlow/OpsFlow.css";
import "./components/pages/projects/ClaudeProcurement/ClaudeProcurement.css";
import "./components/pages/projects/SREChaosEngineering/SREChaosEngineering.css";
import "./components/pages/projects/DeepSeekWorkforce/DeepSeekWorkforce.css";
import "./components/pages/projects/TelecomBilling/TelecomBilling.css";
import "./components/pages/projects/FieldServiceMaintenance/FieldServiceMaintenance.css";
import "./components/pages/projects/FleetOperations/FleetOperations.css";
import "./components/pages/projects/HuggingFaceInsurance/HuggingFaceInsurance.css";
import "./components/pages/projects/ProductivityPlatform/ProductivityPlatform.css";
import "./components/pages/projects/MusicAPI/MusicAPI.css";
import "./components/pages/projects/EnterpriseWorkspace/EnterpriseWorkspace.css";
import "./components/pages/projects/AIEntity/AIEntity.css";
import "./components/pages/projects/ManufacturingQC/ManufacturingQC.css";
import "./components/pages/projects/EnterpriseCustomerOperations/EnterpriseCustomerOperations.css";
import "./components/pages/projects/shared/ProjectPage.css";

const placeholderProjects = [
  ...rebuildingProjects.map((project) => ({
    ...project,
    repositoryUrl: canonicalProjects.find((p) => p.id === project.id)
      ?.repositoryUrl,
  })),
  ...cloudProjects,
  ...aiProjects,
  kailorProject,
  fullStackProject,
  ...selectedProjects,
];

function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Cloud />
        <AI />
        <Kailor />
        <FullStack />
        <Timeline />
        <SelectedProjects />
        <Footer />
      </main>
      <PortfolioActions />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <PageScroll />
      <Suspense fallback={<div role="status" aria-label="Loading page" style={{ minHeight: '100svh', background: '#faf9f6' }} />}>
      <Routes>
        <Route path="/" element={<Home />} />

        {placeholderProjects
          .filter(
            (project) =>
              project.id !== "banking-risk" &&
              project.route !== "/projects/banking-risk" &&
              project.id !== "microsoft-devops" &&
              project.route !== "/projects/microsoft-devops" &&
              project.id !== "gcp-retail" &&
              project.route !== "/projects/gcp-retail" &&
              project.id !== "eventops-intelligence" &&
              project.route !== "/projects/eventops-intelligence" &&
              project.id !== "ollama" &&
              project.route !== "/projects/ollama" &&
              project.id !== "n8n" &&
              project.route !== "/projects/n8n" &&
              project.id !== "claude" &&
              project.route !== "/projects/claude" &&
              project.id !== "distributed-reliability" &&
              project.route !== "/projects/distributed-reliability" &&
              project.id !== "deepseek" &&
              project.route !== "/projects/deepseek" &&
              project.id !== "telecom-billing" &&
              project.route !== "telecom-billing" &&
              project.id !== "field-service" &&
              project.route !== "field-service" &&
              project.id !== "fleet-operations" &&
              project.route !== "fleet-operations" &&
              project.id !== "hugging-face" &&
              project.route !== "/projects/hugging-face" &&
              project.id !== "productivity-platform" &&
              project.route !== "productivity-platform" &&
              project.id !== "music-api" &&
              project.route !== "music-api" &&
              project.id !== "enterprise-workspace" &&
              project.route !== "enterprise-workspace" &&
              project.id !== "ai-assistant" &&
              project.route !== "ai-assistant" &&
              project.id !== "intelligence-manufacturing-llmops" &&
              project.route !== "intelligence-manufacturing-llmops" &&
              project.id !== "enterprise-ai-mlops" &&
              project.route !== "enterprise-ai-mlops",
          )
          .flatMap((project) =>
            [...new Set([project.route, `/projects/${project.id}`])].map(
              (path) => (
                <Route
                  key={path}
                  path={path}
                  element={<ProjectPlaceholder project={project} />}
                />
              ),
            ),
          )}

        {[
          ...new Set([
            ...projectConcepts.map((project) => project.id),
            "rabbitmq",
            "kinesis",
            "opentofu",
            "duckdb",
            "go-dotnet",
            "openai",
            "jwt-redpanda",
          ]),
        ]
          .filter(
            (id) =>
              id !== "banking-risk" &&
              id !== "microsoft-devops" &&
              id !== "gcp-retail" &&
              id !== "eventops-intelligence" &&
              id !== "ollama" &&
              id !== "n8n" &&
              id !== "claude" &&
              id !== "distributed-reliability" &&
              id !== "deepseek" &&
              id !== "field-service" &&
              id !== "fleet-operations" &&
              id !== "hugging-face" &&
              id != "productivity-platform" &&
              id !== "music-api" &&
              id !== "enterprise-workspace" &&
              id !== "ai-entity" &&
              id != "intelligence-manufacturing-llmops" &&
              id !== "enterprise-ai-mlops" &&
              !placeholderProjects.some((project) => project.id === id),
          )
          .map((project) => (
            <Route
              key={project}
              path={`/projects/${project}`}
              element={<ProjectPreview project={project} />}
            />
          ))}

        <Route path="/projects/crewai-revenueops" element={<CrewAIRevenueOps />} />
        <Route path="/explore/projects/crewai-revenueops" element={<CrewAIRevenueOps />} />
        <Route path="/projects/eventops-streamlit" element={<EventOpsStreamlit />} />
        <Route path="/explore/projects/eventops-streamlit" element={<EventOpsStreamlit />} />
        <Route path="/projects/ms-assessflow" element={<MicrosoftAssessFlow />} />
        <Route path="/explore/projects/ms-assessflow" element={<MicrosoftAssessFlow />} />
        <Route path="/projects/banking-risk" element={<AWSBankingRisk />} />

        <Route
          path="/projects/microsoft-devops"
          element={<MicrosoftDevOps />}
        />

        <Route path="/projects/gcp-retail" element={<GCPRetail />} />

        <Route
          path="/projects/eventops-intelligence"
          element={<EventOpsIntelligence />}
        />

        <Route path="/projects/ollama" element={<OllamaPrivateBI />} />

        <Route path="/projects/n8n" element={<OpsFlow />} />

        <Route path="/companies/kailor" element={<KailorVentures />} />

        <Route path="/companies/kai" element={<Navigate to="/companies/kailor#kailor-insider" replace />} />
        <Route path="/companies/kailor-insider" element={<Navigate to="/companies/kailor#kailor-insider" replace />} />
        <Route path="/explore/projects/kai" element={<Navigate to="/companies/kailor#kailor-insider" replace />} />
        <Route path="/explore/projects/kailor-insider" element={<Navigate to="/companies/kailor#kailor-insider" replace />} />
        <Route path="/projects/company-websites" element={<Navigate to="/companies/kailor" replace />} />
        <Route path="/projects/kailor-ai" element={<Navigate to="/companies/kailor#kailor-platform" replace />} />
        <Route path="/explore/projects/kailor-ai" element={<Navigate to="/companies/kailor#kailor-platform" replace />} />

        <Route path="/projects/claude" element={<ClaudeProcurement />} />

        <Route
          path="/projects/distributed-reliability"
          element={<SREChaosEngineering />}
        />

        <Route path="/projects/deepseek" element={<DeepSeekWorkforce />} />

        <Route path="/projects/telecom-billing" element={<TelecomBilling />} />

        <Route
          path="/projects/field-service"
          element={<FieldServiceMaintenance />}
        />

        <Route
          path="/projects/fleet-operations"
          element={<FleetOperations />}
        />

        <Route
          path="/projects/hugging-face"
          element={<HuggingFaceInsurance />}
        />

        <Route
          path="/projects/productivity-platform"
          element={<ProductivityPlatform />}
        />

        <Route path="/projects/music-api" element={<MusicAPI />} />

        <Route
          path="/projects/enterprise-workspace"
          element={<EnterpriseWorkspace />}
        />

        <Route path="/projects/ai-assistant" element={<AIEntity />} />

        <Route
          path="/projects/intelligence-manufacturing-llmops"
          element={<ManufacturingQC />}
        />

        <Route
          path="/projects/enterprise-ai-mlops"
          element={<EnterpriseCustomerOperations />}
        />

        <Route path="/explore" element={<Explore />} />

        <Route
          path="/explore/projects/:projectId"
          element={<ExploreProjectPreview />}
        />

        <Route path="/cv" element={<CV />} />

        <Route path="/recruiter-view" element={<RecruiterView />} />

        <Route
          path="/certifications"
          element={<Navigate to="/explore?tab=credentials" replace />}
        />
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
