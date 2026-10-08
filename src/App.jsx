import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { projectConcepts } from './data/projectConcepts.js';

import PageScroll from './components/navigation/PageScroll.jsx';
import Header from './components/navigation/Header.jsx';
import PortfolioActions from './components/navigation/PortfolioActions.jsx';
import Hero from './components/sections/Hero/Hero.jsx';
import Skills from './components/sections/Skills/Skills.jsx';
import SkillsProjectPreview from './components/sections/Skills/SkillsProjectPreview.jsx';
import About from './components/sections/About/About.jsx';
import Projects from './components/sections/Projects/Projects.jsx';
import Footer from './components/sections/Footer/Footer.jsx';

import Company from './components/pages/Company/Company.jsx';
import Explore from './components/pages/Explore/Explore.jsx';
import ExploreProjectPreview from './components/pages/Explore/ExploreProjectPreview.jsx';
import CV from './components/pages/CV/CV.jsx';
import RecruiterView from './components/pages/RecruiterView/RecruiterView.jsx';

import AIModel from './components/pages/projects/AI/AIModel.jsx';
import ProductivityPlatform from './components/pages/projects/ProductivityPlatform/ProductivityPlatform.jsx';
import MusicAPI from './components/pages/projects/MusicAPI/MusicAPI.jsx';
import EnterpriseWorkspace from './components/pages/projects/EnterpriseWorkspace/EnterpriseWorkspace.jsx';

import Microsoft from './components/pages/projects/Microsoft/Microsoft.jsx';
import AWS from './components/pages/projects/AWS/AWS.jsx';
import GCP from './components/pages/projects/GCP/GCP.jsx';


function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Skills />
        <About />
        <Projects />
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
        {[...new Set([...projectConcepts.map(project => project.id), 'rabbitmq', 'kinesis', 'opentofu', 'duckdb', 'go-dotnet', 'openai', 'jwt-redpanda', 'company-websites', 'kailor-ai'])].map((project) => (
          <Route key={project} path={`/projects/${project}`} element={<SkillsProjectPreview project={project} />} />
        ))}
        <Route path="/companies/kailor" element={<Company company="kailor" />} />
        <Route path="/companies/kai" element={<Company company="kai" />} />
        <Route path="/explore" element={<Explore />} />
        {['ux-ui-visual-1', 'ux-ui-visual-2', 'ux-ui-visual-3'].map(id => <Route key={id} path={`/projects/${id}`} element={<ExploreProjectPreview projectId={id} />} />)}
        <Route path="/explore/projects/:projectId" element={<ExploreProjectPreview />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/recruiter-view" element={<RecruiterView />} />
        <Route
          path="/projects/ai-assistant"
          element={<AIModel />}
        />
        <Route
          path="/projects/productivity-platform"
          element={<ProductivityPlatform />}
        />
        <Route
          path="/projects/music-api"
          element={<MusicAPI />}
        />
        <Route
          path="/projects/enterprise-workspace"
          element={<EnterpriseWorkspace />}
        />

        <Route
          path="/projects/microsoft"
          element={<Microsoft />}
        />
        <Route
          path="/projects/aws"
          element={<AWS />}
        />
        <Route
          path="/projects/gcp"
          element={<GCP />}
        />

        <Route
          path="/certifications"
          element={<Navigate to="/explore?tab=credentials" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
