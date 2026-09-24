import { Navbar } from './components/Navbar'
import { PageAtmosphere } from './components/PageAtmosphere'
import { Hero } from './components/Hero'
import { Summary } from './components/Summary'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Certifications } from './components/Certifications'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="relative min-h-svh overflow-x-hidden text-mist">
      <PageAtmosphere />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Summary />
          <Skills />
          <Projects />
          <Education />
          <Experience />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
