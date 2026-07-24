import { useAppStore } from '../../store/useAppStore'

export default function Hero() {
  const scrollEl = useAppStore((state) => state.scrollEl)

  const handleExplore = () => {
    if (scrollEl) {
      scrollEl.scrollTo({
        top: scrollEl.scrollHeight * 0.32,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="hero-section">
      <div className="hero-content">
        <span className="hero-eyebrow">
          <span className="hero-eyebrow-dot" />
          Live Radar
        </span>
        <h1 className="hero-title">
          Discover Food<br />
          <em>Around You</em>
        </h1>
        <p className="hero-subtext">
          Real-time restaurant discovery powered by live data.
          Scroll to sweep the radar.
        </p>
        <div className="hero-actions">
          <button className="hero-cta" onClick={handleExplore}>
            Start Scanning
          </button>
          <span className="hero-cta-hint">↓ scroll to reveal</span>
        </div>
      </div>
      <div className="hero-scroll-hint">Scroll to sweep the radar ↓</div>
    </section>
  )
}
