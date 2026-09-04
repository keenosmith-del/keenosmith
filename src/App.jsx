import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/navigation/Header.jsx';
import Hero from './components/sections/Hero/Hero.jsx';
import Skills from './components/sections/Skills/Skills.jsx';
import About from './components/sections/About/About.jsx';
import Projects from './components/sections/Projects/Projects.jsx';
import Footer from './components/sections/Footer/Footer.jsx';

import CV from './components/pages/CV/CV.jsx';

import AIModel from './components/pages/projects/AI/AIModel.jsx';
import ProductivityPlatform from './components/pages/projects/ProductivityPlatform/ProductivityPlatform.jsx';
import MusicAPI from './components/pages/projects/MusicAPI/MusicAPI.jsx';
import EnterpriseWorkspace from './components/pages/projects/EnterpriseWorkspace/EnterpriseWorkspace.jsx';

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
    </>
  );
}

function App() {
  return (
    <BrowserRouter basename="/keenosmith">
      <Routes>
        <Route path="/" element={<Home />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;