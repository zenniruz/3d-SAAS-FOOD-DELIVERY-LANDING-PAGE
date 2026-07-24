import { useAppStore } from '../../store/useAppStore'

export default function Hero() {
  // Read the scroll container from the store rather than calling drei's
  // useScroll() directly — Hero is also rendered in the no-WebGL fallback
  // page, outside any <ScrollControls> context, so it must stay safe there.
  const scrollEl = useAppStore((state) => state.scrollEl)

  const handleExplore = () => {
    if (scrollEl) {
      scrollEl.scrollTo({
        top: scrollEl.scrollHeight * 0.35,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="hero-section">
      <div className="hero-content">
        <span className="hero-eyebrow">Live Radar</span>
        <h1 className="hero-title">Discover Food Around You</h1>
        <p className="hero-subtext">
          Real-time restaurant discovery powered by live data
        </p>
        <button className="hero-cta" onClick={handleExplore}>
          Start Scanning
        </button>
      </div>
      <div className="hero-scroll-hint">Scroll to sweep the radar ↓</div>
    </section>
  )
}
