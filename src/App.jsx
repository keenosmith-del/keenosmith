import NotFound from "./components/pages/NotFound.jsx";
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { projectConcepts } from "./data/projectConcepts.js";

import RouteMetadata from "./components/navigation/RouteMetadata.jsx";
import PageScroll from "./components/navigation/PageScroll.jsx";
import Header from "./components/navigation/Header.jsx";
import PortfolioActions from "./components/navigation/PortfolioActions.jsx";
import Hero from "./components/sections/Hero/Hero.jsx";
import Cloud from "./components/sections/Cloud/Cloud.jsx";
import "./components/pages/ProjectPreview/ProjectPreview.css";
const ProjectPreview = lazy(() => import("./components/pages/ProjectPreview/ProjectPreview.jsx"));
import "./components/pages/ProjectPlaceholder/ProjectPlaceholder.css";
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

import "./components/pages/Explore/components/CredentialGallery.css";
import "./components/pages/Explore/Explore.css";
const Explore = lazy(() => import("./components/pages/Explore/Explore.jsx"));
const ExploreProjectPreview = lazy(() => import("./components/pages/Explore/ExploreProjectPreview.jsx"));
import "./components/pages/CV/CV.css";
const CV = lazy(() => import("./components/pages/CV/CV.jsx"));
import "./components/pages/RecruiterView/RecruiterView.css";
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

// Concrete pages are declared once; placeholders cannot shadow these routes.
const projectPageRoutes = [
  ["/projects/crewai-revenueops", CrewAIRevenueOps],
  ["/explore/projects/crewai-revenueops", CrewAIRevenueOps],
  ["/projects/eventops-streamlit", EventOpsStreamlit],
  ["/explore/projects/eventops-streamlit", EventOpsStreamlit],
  ["/projects/ms-assessflow", MicrosoftAssessFlow],
  ["/explore/projects/ms-assessflow", MicrosoftAssessFlow],
  ["/projects/banking-risk", AWSBankingRisk],
  ["/projects/microsoft-devops", MicrosoftDevOps],
  ["/projects/gcp-retail", GCPRetail],
  ["/projects/eventops-intelligence", EventOpsIntelligence],
  ["/projects/ollama", OllamaPrivateBI],
  ["/projects/n8n", OpsFlow],
  ["/companies/kailor", KailorVentures],
  ["/projects/claude", ClaudeProcurement],
  ["/projects/distributed-reliability", SREChaosEngineering],
  ["/projects/deepseek", DeepSeekWorkforce],
  ["/projects/telecom-billing", TelecomBilling],
  ["/projects/field-service", FieldServiceMaintenance],
  ["/projects/fleet-operations", FleetOperations],
  ["/projects/hugging-face", HuggingFaceInsurance],
  ["/projects/productivity-platform", ProductivityPlatform],
  ["/projects/music-api", MusicAPI],
  ["/projects/enterprise-workspace", EnterpriseWorkspace],
  ["/projects/ai-assistant", AIEntity],
  ["/projects/intelligence-manufacturing-llmops", ManufacturingQC],
  ["/projects/enterprise-ai-mlops", EnterpriseCustomerOperations],
  ["/explore/projects/:projectId", ExploreProjectPreview],
];
const detailedPaths = new Set(projectPageRoutes.map(([route]) => route));
const detailedIds = new Set(projectPageRoutes.map(([route]) => route.split('/').at(-1)));

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
      <RouteMetadata />
      <Suspense fallback={<div role="status" aria-label="Loading page" style={{ minHeight: '100svh', background: '#faf9f6' }} />}>
      <Routes>
        <Route path="/" element={<Home />} />
        {projectPageRoutes.map(([route, Component]) => <Route key={route} path={route} element={<Component />} />)}

        {placeholderProjects
          .filter(project => !detailedIds.has(project.id) && !detailedPaths.has(project.route))
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
          .filter(id => !detailedIds.has(id) && !placeholderProjects.some(project => project.id === id))
          .map((project) => (
            <Route
              key={project}
              path={`/projects/${project}`}
              element={<ProjectPreview project={project} />}
            />
          ))}

        <Route path="/companies/kai" element={<Navigate to="/companies/kailor#kailor-insider" replace />} />
        <Route path="/companies/kailor-insider" element={<Navigate to="/companies/kailor#kailor-insider" replace />} />
        <Route path="/explore/projects/kai" element={<Navigate to="/companies/kailor#kailor-insider" replace />} />
        <Route path="/explore/projects/kailor-insider" element={<Navigate to="/companies/kailor#kailor-insider" replace />} />
        <Route path="/projects/company-websites" element={<Navigate to="/companies/kailor" replace />} />
        <Route path="/projects/kailor-ai" element={<Navigate to="/companies/kailor#kailor-platform" replace />} />
        <Route path="/explore/projects/kailor-ai" element={<Navigate to="/companies/kailor#kailor-platform" replace />} />

        <Route path="/explore" element={<Explore />} />

        <Route path="/cv" element={<CV />} />

        <Route path="/recruiter-view" element={<RecruiterView />} />

        <Route
          path="/certifications"
          element={<Navigate to="/explore?tab=credentials" replace />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
