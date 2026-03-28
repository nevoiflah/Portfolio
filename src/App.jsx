import { Suspense, lazy, useEffect, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import Lenis from 'lenis';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ZSection from './components/ZSection';
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
      duration: isMobile ? 1.0 : 1.5, // Faster on mobile
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

    // Helper: Global Scroll Function for buttons
    window.scrollToSection = (index) => {
      // Map index to ID for cleaner mobile scrolling, or use math for Desktop Warp
      const ids = ['hero', 'about', 'skills', 'projects', 'contact'];
      const id = ids[index];
      const element = document.getElementById(id);

      if (isMobile && element) {
        // Mobile: Scroll to actual element
        lenis.scrollTo(element, { duration: 1.5 });
      } else {
        // Desktop (Warp Tunnel): Scroll to calculated 'time' position
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        let target;

        if (index === 4) {
          target = totalHeight; // Contact: Always go to the very end
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
      {/* 3D Background Layer — desktop only */}
      {!isMobile ? (
        <CanvasErrorBoundary>
          <div className="fixed top-0 left-0 w-full h-full -z-10 bg-background">
            <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
              <Suspense fallback={null}>
                <GeometricNetwork />
              </Suspense>
            </Canvas>
          </div>
        </CanvasErrorBoundary>
      ) : (
        <div className="fixed inset-0 -z-10 bg-background" />
      )}

      {isMobile ? (
        // --- MOBILE LAYOUT (Vertical Stack) ---
        <div className="relative z-10 grid gap-0"> {/* No gap, natural flow */}
          <div className="min-h-screen flex items-center justify-center p-6"><Hero /></div>
          <div className="min-h-screen flex items-center justify-center p-6"><About /></div>
          <div className="min-h-screen flex items-center justify-center p-6"><Skills /></div>
          <div className="min-h-screen flex items-center justify-center p-6"><Projects /></div>
          <div className="min-h-screen flex items-center justify-center p-6"><Contact /></div>
        </div>
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
