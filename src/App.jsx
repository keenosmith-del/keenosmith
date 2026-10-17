import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { projectConcepts } from "./data/projectConcepts.js";

import PageScroll from "./components/navigation/PageScroll.jsx";
import Header from "./components/navigation/Header.jsx";
import PortfolioActions from "./components/navigation/PortfolioActions.jsx";
import Hero from "./components/sections/Hero/Hero.jsx";
import Cloud from "./components/sections/Cloud/Cloud.jsx";
import ProjectPreview from "./components/pages/ProjectPreview/ProjectPreview.jsx";
import ProjectPlaceholder from "./components/pages/ProjectPlaceholder/ProjectPlaceholder.jsx";
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

import Company from "./components/pages/Company/Company.jsx";
import Explore from "./components/pages/Explore/Explore.jsx";
import ExploreProjectPreview from "./components/pages/Explore/ExploreProjectPreview.jsx";
import CV from "./components/pages/CV/CV.jsx";
import RecruiterView from "./components/pages/RecruiterView/RecruiterView.jsx";

import { rebuildingProjects } from "./data/rebuildingProjects.js";
import { canonicalProjects } from "./assistant/knowledge.js";

import AWSBankingRisk from "./components/pages/projects/AWSBankingRisk/AWSBankingRisk.jsx";
import MicrosoftDevOps from "./components/pages/projects/MicrosoftDevOps/MicrosoftDevOps.jsx";
import GCPRetail from "./components/pages/projects/GCPRetail/GCPRetail.jsx";
import EventOpsIntelligence from "./components/pages/projects/EventOpsIntelligence/EventOpsIntelligence.jsx";

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
              project.route !== "/projects/eventops-intelligence",
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
            "company-websites",
            "kailor-ai",
          ]),
        ]
          .filter(
            (id) =>
              id !== "banking-risk" &&
              id !== "microsoft-devops" &&
              id !== "gcp-retail" &&
              id !== "eventops-intelligence" &&
              !placeholderProjects.some((project) => project.id === id),
          )
          .map((project) => (
            <Route
              key={project}
              path={`/projects/${project}`}
              element={<ProjectPreview project={project} />}
            />
          ))}

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

        <Route
          path="/companies/kailor"
          element={<Company company="kailor" />}
        />

        <Route path="/companies/kai" element={<Company company="kai" />} />

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
    </BrowserRouter>
  );
}

export default App;
