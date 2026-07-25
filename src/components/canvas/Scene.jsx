import { useEffect } from 'react'
import { ScrollControls, Scroll, useScroll } from '@react-three/drei'
import { useAppStore } from '../../store/useAppStore'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import CameraRig from './CameraRig'
import RadarGrid from './RadarGrid'
import RadarSweep from './RadarSweep'
import PulseRing from './PulseRing'
import RestaurantNodes from './RestaurantNodes'

function ScrollSync() {
  useScrollProgress()
  const scroll = useScroll()
  const setScrollEl = useAppStore((s) => s.setScrollEl)

  useEffect(() => {
    setScrollEl(scroll.el)

    // Force a micro-scroll on mount so ScrollControls initialises its
    // internal offset immediately — prevents the "radar missing on first load"
    // bug where the scene appears blank until the user physically scrolls.
    const el = scroll.el
    if (!el) return
    requestAnimationFrame(() => {
      el.scrollTop = 1
      requestAnimationFrame(() => {
        // let it settle; don't snap back to 0 so offset stays non-zero
      })
    })
  }, [scroll.el, setScrollEl])

  return null
}

export default function Scene({ children }) {
  return (
    // 6.5 pages: enough for all content sections without dead empty-space at bottom
    <ScrollControls pages={6.5} damping={0.18}>
      <ScrollSync />
      <fog attach="fog" args={['#0b0f0e', 14, 40]} />

      {/* Scene lighting */}
      <ambientLight intensity={0.7} color="#1e2e28" />
      {/* Primary overhead orange — illuminates terrain and gives radar warmth */}
      <pointLight position={[0, 9, 0]} intensity={2.2} color="#f97316" distance={30} decay={2} />
      {/* Subtle green fill from behind to separate terrain from background */}
      <pointLight position={[0, 3, -12]} intensity={0.5} color="#22c55e" distance={22} decay={2} />

      <CameraRig />
      <RadarGrid />
      <RadarSweep />
      <PulseRing />
      <RestaurantNodes />

      <Scroll html style={{ width: '100%' }}>
        {children}
      </Scroll>
    </ScrollControls>
  )
}
