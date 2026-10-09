import useRevealOnScroll from './hooks/useRevealOnScroll'
import Home from './pages/Home/Home'
import About from './pages/About/About'
// Temporarily disabled: only Home and About are live for now. Uncomment the import and its route below to bring a page back.
// import Masterplan from './pages/Masterplan/Masterplan'
// import Facilities from './pages/Facilities/Facilities'
// import Iris3 from './pages/Iris3/Iris3'

export default function App() {
  useRevealOnScroll()
  const pathname = window.location.pathname

  // More-specific paths must precede parent paths. Public catch-all returns Home.
  if (pathname === '/about') return <About />
  // if (pathname === '/masterplan') return <Masterplan />
  // if (pathname === '/facilities/iris-3') return <Iris3 />
  // if (pathname === '/facilities') return <Facilities />
  return <Home />
}
