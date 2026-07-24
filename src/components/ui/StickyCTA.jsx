import { useAppStore } from '../../store/useAppStore'

export default function StickyCTA() {
  const scrollEl = useAppStore((state) => state.scrollEl)

  const handleClick = () => {
    if (scrollEl) {
      scrollEl.scrollTo({
        top: scrollEl.scrollHeight * 0.6,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="sticky-cta">
      <button type="button" className="sticky-cta-button" onClick={handleClick}>
        Explore Nearby
      </button>
    </div>
  )
}
