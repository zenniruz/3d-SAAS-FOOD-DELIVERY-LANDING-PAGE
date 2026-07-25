import { useAppStore } from '../../store/useAppStore'
import { IconArrow } from './Icons'

export default function Hero() {
  const scrollEl = useAppStore((state) => state.scrollEl)

  const handleExplore = () => {
    if (scrollEl) {
      scrollEl.scrollTo({ top: scrollEl.scrollHeight * 0.3, behavior: 'smooth' })
    }
  }

  return (
    <section className="hero-section">
      <div className="hero-content">
        <span className="hero-eyebrow">
          <span className="hero-eyebrow-dot" />
          Now live in your city
        </span>

        <h1 className="hero-title">
          Hot food,<br />
          <em>at your door.</em>
        </h1>

        <p className="hero-subtext">
          Set your location and instantly see nearby restaurants.
          Pick your favourite dishes, pay in seconds, and get your
          order delivered while it's still hot.
        </p>

        <div className="hero-actions">
          <button className="hero-cta" onClick={handleExplore}>
            Start Ordering
          </button>
          <span className="hero-cta-hint">Fast &amp; easy</span>
        </div>

        <p className="hero-punchline">
          <em>cbites</em> delivers as he dey hot&nbsp;🔥
        </p>
      </div>

      <div className="hero-scroll-hint">
        <span className="hero-scroll-text">Start ordering · Get fast deliveries</span>
        <span className="hero-scroll-icon"><IconArrow /></span>
      </div>
    </section>
  )
}
