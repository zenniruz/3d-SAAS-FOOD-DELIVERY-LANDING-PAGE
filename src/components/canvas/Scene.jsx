import { useEffect } from 'react'
import { ScrollControls, Scroll, useScroll } from '@react-three/drei'
import { useAppStore } from '../../store/useAppStore'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import CameraRig from './CameraRig'
import RadarGrid from './RadarGrid'
import RadarSweep from './RadarSweep'
import PulseRing from './PulseRing'
import RestaurantNodes from './RestaurantNodes'

// Lives inside <ScrollControls> so it can read the scroll context and mirror
// what it needs into the global store for components outside the Canvas.
function ScrollSync() {
  useScrollProgress()
  const scroll = useScroll()
  const setScrollEl = useAppStore((state) => state.setScrollEl)

  useEffect(() => {
    setScrollEl(scroll.el)
  }, [scroll.el, setScrollEl])

  return null
}

export default function Scene({ children }) {
  return (
    <ScrollControls pages={5} damping={0.25}>
      <ScrollSync />
      <fog attach="fog" args={['#03050a', 10, 34]} />

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
