import { Suspense, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './components/canvas/Scene'
import Hero from './components/ui/Hero'
import CategoryPills from './components/ui/CategoryPills'
import RestaurantCard from './components/ui/RestaurantCard'
import StickyCTA from './components/ui/StickyCTA'
import { useAppStore } from './store/useAppStore'
import { restaurants } from './data/restaurants'

function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch (e) {
    return false
  }
}

function DiscoverySection({ forceShowAll = false }) {
  const revealedRestaurants = useAppStore((state) => state.revealedRestaurants)
  const activeCategory = useAppStore((state) => state.activeCategory)

  const visible = useMemo(() => {
    return restaurants.filter((r) => {
      const isRevealed = forceShowAll || revealedRestaurants.includes(r.id)
      const matchesCategory = activeCategory === 'all' || r.category === activeCategory
      return isRevealed && matchesCategory
    })
  }, [revealedRestaurants, activeCategory, forceShowAll])

  return (
    <section className="discovery-section" id="discovery">
      <div className="discovery-header">
        <h2>Nearby, revealed by radar</h2>
        <p>
          {visible.length} of {restaurants.length} spots detected
        </p>
      </div>

      {visible.length === 0 ? (
        <div className="discovery-empty">
          <p>Scroll to sweep the radar and reveal restaurants near you.</p>
        </div>
      ) : (
        <div className="discovery-grid">
          {visible.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      )}
    </section>
  )
}

export default function App() {
  // Computed once, synchronously, before first paint — so a WebGL-less
  // browser never attempts to mount the Canvas at all.
  const [webglOK] = useState(() => isWebGLAvailable())

  if (!webglOK) {
    return (
      <div className="fallback-page">
        <Hero />
        <CategoryPills />
        <DiscoverySection forceShowAll />
        <div className="fallback-note">
          <p>
            Your browser doesn&apos;t support 3D rendering, so we&apos;re showing the
            simplified experience.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="app-root">
      <Canvas
        className="app-canvas"
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'low-power', alpha: false }}
        camera={{ position: [0, 8, 6], fov: 50, near: 0.1, far: 100 }}
      >
        <color attach="background" args={['#03050a']} />
        <Suspense fallback={null}>
          <Scene>
            <Hero />
            <CategoryPills />
            <DiscoverySection />
          </Scene>
        </Suspense>
      </Canvas>
      <StickyCTA />
    </div>
  )
}
