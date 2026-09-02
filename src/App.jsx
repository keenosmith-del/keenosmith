import Header from './components/navigation/Header.jsx';
import Hero from './components/sections/Hero/Hero.jsx';
import Skills from './components/sections/Skills/Skills.jsx';
import About from './components/sections/About/About.jsx';
import Projects from './components/sections/Projects/Projects.jsx';
import Footer from './components/sections/Footer/Footer.jsx';

function App() {
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

export default App;