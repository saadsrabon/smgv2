import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Programs from './components/sections/Programs'
import Impact from './components/sections/Impact'
import Contact from './components/sections/Contact'

function App() {
  return (
    <div className="min-h-screen bg-light-bg">
      <Header />
      <main>
        <Hero />
        <About />
        <Programs />
        <Impact />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
