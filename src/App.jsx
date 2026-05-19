import { Suspense, lazy, useEffect, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import Lenis from 'lenis';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ZSection from './components/ZSection';
import NavDots from './components/NavDots';
import NavDotsDesktop from './components/NavDotsDesktop';
import useIsMobile from './hooks/useIsMobile';

const GeometricNetwork = lazy(() => import('./components/3d/GeometricNetwork'));

class CanvasErrorBoundary extends Component {
  state = { crashed: false };
  static getDerivedStateFromError() { return { crashed: true }; }
  render() {
    if (this.state.crashed) return <div className="fixed inset-0 -z-10 bg-background" />;
    return this.props.children;
  }
}

function App() {
  const isMobile = useIsMobile();

  useEffect(() => {
    const lenis = new Lenis({
      duration: isMobile ? 1.0 : 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    window.scrollToSection = (index) => {
      const ids = ['hero', 'about', 'skills', 'projects', 'contact'];
      const id = ids[index];
      const element = document.getElementById(id);

      if (isMobile && element) {
        lenis.scrollTo(element, { duration: 1.5 });
      } else {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        let target;
        if (index === 4) {
          target = totalHeight;
        } else {
          target = totalHeight * (index / 5);
        }
        lenis.scrollTo(target, { duration: 1.5 });
      }
    };

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.scrollToSection;
    };
  }, [isMobile]);

  return (
    <div className="min-h-screen text-text selection:bg-primary/30 relative">
      <a href="#hero" className="skip-link">Skip to content</a>

      {/* 3D Background — fades in after mount */}
      <CanvasErrorBoundary>
        <motion.div
          className="fixed top-0 left-0 w-full h-full -z-10 bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
            <Suspense fallback={null}>
              <GeometricNetwork />
            </Suspense>
          </Canvas>
        </motion.div>
      </CanvasErrorBoundary>

      {/* Navigation */}
      <NavDotsDesktop />

      {isMobile ? (
        // --- MOBILE LAYOUT (Vertical Stack) ---
        <>
          <NavDots />
          <div className="relative z-10 flex flex-col w-full overflow-hidden">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </div>
        </>
      ) : (
        // --- DESKTOP LAYOUT (Warp Tunnel) ---
        <div style={{ height: '500vh' }}>
          <ZSection index={0} total={5}><Hero /></ZSection>
          <ZSection index={1} total={5}><About /></ZSection>
          <ZSection index={2} total={5}><Skills /></ZSection>
          <ZSection index={3} total={5}><Projects /></ZSection>
          <ZSection index={4} total={5}><Contact /></ZSection>
        </div>
      )}
    </div>
  );
}

export default App;
