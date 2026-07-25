import { Suspense, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './components/canvas/Scene'
import Hero from './components/ui/Hero'
import CategoryPills from './components/ui/CategoryPills'
import RestaurantCard from './components/ui/RestaurantCard'
import StickyCTA from './components/ui/StickyCTA'
import { useAppStore } from './store/useAppStore'
import { restaurants } from './data/restaurants'
import {
  IconPin, IconBowl, IconTruck,
  IconBolt, IconRadar, IconSliders, IconShield,
} from './components/ui/Icons'

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

/* ── Cbites fixed brand bar ────────────────────────────── */
function CbitesNav() {
  return (
    <div className="cbites-nav" aria-label="cbites brand">
      <span className="cbites-logo">cbites</span>
      <span className="cbites-tagline">delivers as he dey hot</span>
    </div>
  )
}

/* ── Discovery ─────────────────────────────────────────── */
function DiscoverySection({ forceShowAll = false }) {
  const revealedRestaurants = useAppStore((s) => s.revealedRestaurants)
  const activeCategory = useAppStore((s) => s.activeCategory)

  const visible = useMemo(() => restaurants.filter((r) => {
    const isRevealed = forceShowAll || revealedRestaurants.includes(r.id)
    const matchesCategory = activeCategory === 'all' || r.category === activeCategory
    return isRevealed && matchesCategory
  }), [revealedRestaurants, activeCategory, forceShowAll])

  return (
    <section className="discovery-section" id="discovery">
      <div className="discovery-header">
        <span className="section-eyebrow">Radar Feed</span>
        <h2>Restaurants near you</h2>
        <p><strong>{visible.length}</strong> of {restaurants.length} spots detected</p>
      </div>

      {visible.length === 0 ? (
        <div className="discovery-empty">
          <div className="discovery-empty-icon">
            <IconRadar />
          </div>
          <p>Scroll to spin the radar and reveal restaurants near you.</p>
          <span>Keep scrolling to sweep the beam</span>
        </div>
      ) : (
        <div className="discovery-grid">
          {visible.map((r) => <RestaurantCard key={r.id} restaurant={r} />)}
        </div>
      )}
    </section>
  )
}

/* ── How It Works ──────────────────────────────────────── */
function HowItWorksSection() {
  const steps = [
    {
      n: '01', Icon: IconPin,
      title: 'Set your location',
      desc: 'Allow location access or type your address. The radar locks onto your area and shows every open restaurant within reach in real time.',
    },
    {
      n: '02', Icon: IconBowl,
      title: 'Pick your dishes',
      desc: 'Browse nearby spots as the radar sweeps them into view. Filter by cuisine, check live ratings, and add your favourites to your order.',
    },
    {
      n: '03', Icon: IconTruck,
      title: 'Pay & get it delivered',
      desc: 'Check out in seconds with your saved payment method. Your food is confirmed instantly and delivered to your door — still hot.',
    },
  ]

  return (
    <section className="how-section">
      <div className="how-inner">
        <span className="section-eyebrow">How it works</span>
        <h2 className="how-title">Order in three<br /><em>simple steps</em></h2>
        <div className="how-steps">
          {steps.map(({ n, Icon, title, desc }) => (
            <div key={n} className="how-step">
              <div className="how-step-number">{n}</div>
              <div className="how-step-icon"><Icon /></div>
              <h3 className="how-step-title">{title}</h3>
              <p className="how-step-desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Features ──────────────────────────────────────────── */
function FeaturesSection() {
  const features = [
    { Icon: IconBolt,    title: 'Live data',      desc: 'Restaurant availability refreshes every 30 seconds. No stale listings, no false "open" signs.' },
    { Icon: IconRadar,   title: 'Hyper-local',    desc: 'Set your radius from 0.5 km to 10 km. The radar re-sweeps instantly whenever you adjust it.' },
    { Icon: IconSliders, title: 'Smart filters',  desc: 'Filter by cuisine, price range, or dietary needs. Results update live without reloading.' },
    { Icon: IconShield,  title: 'Privacy first',  desc: 'Your location is processed on-device. We never store GPS data or sell your info to third parties.' },
  ]

  return (
    <section className="features-section">
      <div className="features-inner">
        <span className="section-eyebrow">Platform</span>
        <h2 className="features-title">Built different.<br /><em>Feels instant.</em></h2>
        <p className="features-lead">
          Most delivery apps show a static list. cbites built a live spatial radar
          so you can <em>see</em> what's around you — not just scroll through a catalogue.
        </p>
        <div className="features-grid">
          {features.map(({ Icon, title, desc }) => (
            <div key={title} className="feature-card">
              <span className="feature-icon"><Icon /></span>
              <h3 className="feature-title">{title}</h3>
              <p className="feature-desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Stats strip ───────────────────────────────────────── */
function StatsSection() {
  const stats = [
    { value: '12 K+',   label: 'Restaurants' },
    { value: '4.8 ★',   label: 'Avg rating' },
    { value: '< 2 min', label: 'To confirm' },
    { value: '38',      label: 'Cities' },
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

/* ── Footer / About ────────────────────────────────────── */
function AboutSection() {
  return (
    <footer className="about-section" id="about">
      <div className="about-inner">
        <div className="about-brand">
          <span className="about-logo">cbites</span>
          <p className="about-tagline">The spatial food discovery platform.<br />Built for cities that never stop.</p>
          <p className="about-body">
            We started cbites because search bars are the wrong interface for hunger.
            You don't know what you want until you see what's around you. So we built
            a live radar that surfaces real restaurants in real time — no sponsored
            placements, no dark patterns. Just the closest great food, delivered hot.
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
        <span>© 2025 cbites Technologies</span>
        <span className="about-tagline-footer">delivers as he dey hot 🔥</span>
      </div>
    </footer>
  )
}

/* ── Root ──────────────────────────────────────────────── */
export default function App() {
  const [webglOK] = useState(() => isWebGLAvailable())

  if (!webglOK) {
    return (
      <div className="fallback-page">
        <CbitesNav />
        <Hero />
        <HowItWorksSection />
        <CategoryPills />
        <DiscoverySection forceShowAll />
        <FeaturesSection />
        <StatsSection />
        <AboutSection />
      </div>
    )
  }

  return (
    <div className="app-root">
      {/* Fixed cbites brand — sits above everything */}
      <CbitesNav />

      {/* Radial vignette to focus eye on radar centre */}
      <div className="vignette" aria-hidden="true" />

      <Canvas
        className="app-canvas"
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'low-power', alpha: false }}
        camera={{ position: [0, 8, 6], fov: 50, near: 0.1, far: 100 }}
      >
        <color attach="background" args={['#0b0f0e']} />
        {/* No Suspense wrapper — scene has no async assets; avoid hidden first-frame delay */}
        <Scene>
          <Hero />
          <HowItWorksSection />
          <CategoryPills />
          <DiscoverySection />
          <FeaturesSection />
          <StatsSection />
          <AboutSection />
        </Scene>
      </Canvas>

      <StickyCTA />
    </div>
  )
}
