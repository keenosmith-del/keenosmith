import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/navigation/Header.jsx';
import Hero from './components/sections/Hero/Hero.jsx';
import Skills from './components/sections/Skills/Skills.jsx';
import About from './components/sections/About/About.jsx';
import Projects from './components/sections/Projects/Projects.jsx';
import Footer from './components/sections/Footer/Footer.jsx';

import CV from './components/pages/CV/CV.jsx';

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cv" element={<CV />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;