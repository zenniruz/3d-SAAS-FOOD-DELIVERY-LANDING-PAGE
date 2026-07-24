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
        <span className="section-eyebrow">Radar Feed</span>
        <h2>Nearby, revealed by radar</h2>
        <p>
          <strong>{visible.length}</strong> of {restaurants.length} spots detected
        </p>
      </div>

      {visible.length === 0 ? (
        <div className="discovery-empty">
          <div className="discovery-empty-icon">📡</div>
          <p>Sweep the radar above to reveal restaurants near you.</p>
          <span>Keep scrolling to spin the beam</span>
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

function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      icon: '📡',
      title: 'Open the Radar',
      desc: 'Launch the live radar and see your neighbourhood lit up in real time. Every dot is a verified, open restaurant within reach.',
    },
    {
      number: '02',
      icon: '🔍',
      title: 'Sweep & Discover',
      desc: 'Scroll to spin the beam. As it sweeps past each location, the restaurant surfaces with its name, rating, and distance.',
    },
    {
      number: '03',
      icon: '🚀',
      title: 'Order in Seconds',
      desc: 'Tap any revealed spot to see the full menu, check live wait times, and place your order — all without leaving the app.',
    },
  ]

  return (
    <section className="how-section">
      <div className="how-inner">
        <span className="section-eyebrow">How it works</span>
        <h2 className="how-title">
          Three steps to<br />
          <em>your next meal</em>
        </h2>
        <div className="how-steps">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`how-step how-step--${i % 2 === 0 ? 'left' : 'right'}`}
            >
              <div className="how-step-number">{step.number}</div>
              <div className="how-step-icon">{step.icon}</div>
              <h3 className="how-step-title">{step.title}</h3>
              <p className="how-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const features = [
    {
      icon: '⚡',
      title: 'Live data',
      desc: 'Restaurant availability updates every 30 seconds. No stale listings.',
    },
    {
      icon: '📍',
      title: 'Hyper-local',
      desc: 'Radius from 0.5 km to 10 km. Zoom the radar to what matters to you.',
    },
    {
      icon: '🎯',
      title: 'Smart filters',
      desc: 'Filter by cuisine, dietary needs, or price — instantly re-sweeps the map.',
    },
    {
      icon: '🔒',
      title: 'Privacy first',
      desc: 'Location is processed on-device. We never store your GPS coordinates.',
    },
  ]

  return (
    <section className="features-section">
      <div className="features-inner">
        <span className="section-eyebrow from-left">Platform</span>
        <h2 className="features-title from-right">
          Built different.<br />Feels instant.
        </h2>
        <p className="features-lead from-left">
          Most food apps show you a static list. We built a spatial radar so you
          can <em>see</em> what's around you, not just read about it.
        </p>
        <div className="features-grid">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`feature-card feature-card--${i % 2 === 0 ? 'from-left' : 'from-right'}`}
            >
              <span className="feature-icon">{f.icon}</span>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  const stats = [
    { value: '12 K+', label: 'Restaurants listed' },
    { value: '4.8★', label: 'Average rating' },
    { value: '< 2 min', label: 'Order to confirmed' },
    { value: '38 cities', label: 'Active markets' },
  ]

  return (
    <section className="stats-section">
      {stats.map((s) => (
        <div key={s.label} className="stat-item">
          <span className="stat-value">{s.value}</span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </section>
  )
}

function AboutSection() {
  return (
    <footer className="about-section" id="about">
      <div className="about-inner">
        <div className="about-brand">
          <span className="about-logo">●&nbsp;RADAR</span>
          <p className="about-tagline">
            The spatial food discovery platform.<br />
            Built for cities that never stop.
          </p>
          <p className="about-body">
            We started Radar because search bars are the wrong interface for hunger.
            You don't know what you want until you see what's around you. So we
            built a live, scrollable radar that surfaces real restaurants in real time
            — no ads, no sponsored placements, just the closest great food to wherever
            you are right now.
          </p>
        </div>

        <div className="about-links">
          <div className="about-col">
            <h4>Product</h4>
            <a href="#">How it works</a>
            <a href="#">For restaurants</a>
            <a href="#">Pricing</a>
            <a href="#">Changelog</a>
          </div>
          <div className="about-col">
            <h4>Company</h4>
            <a href="#">About us</a>
            <a href="#">Blog</a>
            <a href="#">Careers</a>
            <a href="#">Press kit</a>
          </div>
          <div className="about-col">
            <h4>Legal</h4>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>

      <div className="about-bar">
        <span>© 2025 Radar Technologies Inc.</span>
        <span className="about-bar-right">
          Made with <span style={{ color: 'var(--accent)' }}>●</span> and good taste
        </span>
      </div>
    </footer>
  )
}

export default function App() {
  const [webglOK] = useState(() => isWebGLAvailable())

  if (!webglOK) {
    return (
      <div className="fallback-page">
        <Hero />
        <HowItWorksSection />
        <CategoryPills />
        <DiscoverySection forceShowAll />
        <FeaturesSection />
        <StatsSection />
        <AboutSection />
        <div className="fallback-note">
          <p>Your browser doesn&apos;t support 3D rendering — simplified view shown.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app-root">
      {/* Vignette overlay — darkens edges without touching the canvas */}
      <div className="vignette" aria-hidden="true" />

      <Canvas
        className="app-canvas"
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'low-power', alpha: false }}
        camera={{ position: [0, 8, 6], fov: 50, near: 0.1, far: 100 }}
      >
        <color attach="background" args={['#0b0f0e']} />
        <Suspense fallback={null}>
          <Scene>
            <Hero />
            <HowItWorksSection />
            <CategoryPills />
            <DiscoverySection />
            <FeaturesSection />
            <StatsSection />
            <AboutSection />
          </Scene>
        </Suspense>
      </Canvas>
      <StickyCTA />
    </div>
  )
}
