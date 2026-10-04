import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/navigation/Header.jsx';
import PortfolioActions from './components/navigation/PortfolioActions.jsx';
import Hero from './components/sections/Hero/Hero.jsx';
import Skills from './components/sections/Skills/Skills.jsx';
import SkillsProjectPreview from './components/sections/Skills/SkillsProjectPreview.jsx';
import About from './components/sections/About/About.jsx';
import Projects from './components/sections/Projects/Projects.jsx';
import Footer from './components/sections/Footer/Footer.jsx';

import CV from './components/pages/CV/CV.jsx';

import AIModel from './components/pages/projects/AI/AIModel.jsx';
import ProductivityPlatform from './components/pages/projects/ProductivityPlatform/ProductivityPlatform.jsx';
import MusicAPI from './components/pages/projects/MusicAPI/MusicAPI.jsx';
import EnterpriseWorkspace from './components/pages/projects/EnterpriseWorkspace/EnterpriseWorkspace.jsx';

import Microsoft from './components/pages/projects/Microsoft/Microsoft.jsx';
import AWS from './components/pages/projects/AWS/AWS.jsx';
import GCP from './components/pages/projects/GCP/GCP.jsx';

import Certifications from './components/pages/certifications/Certifications.jsx';

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
      <Routes>
        <Route path="/" element={<Home />} />
        {['claude', 'n8n', 'ollama', 'rabbitmq', 'kinesis', 'opentofu', 'vertex-ai-retail', 'duckdb', 'hugging-face', 'go-dotnet', 'openai', 'jwt-redpanda'].map((project) => (
          <Route key={project} path={`/projects/${project}`} element={<SkillsProjectPreview project={project} />} />
        ))}
        <Route path="/cv" element={<CV />} />
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
          element={<Certifications />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;