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
  const setScrollEl = useAppStore((state) => state.setScrollEl)

  useEffect(() => {
    setScrollEl(scroll.el)
  }, [scroll.el, setScrollEl])

  return null
}

export default function Scene({ children }) {
  return (
    // 8 pages gives enough room: radar intro + scroll interaction + discovery + content sections
    <ScrollControls pages={8} damping={0.22}>
      <ScrollSync />
      <fog attach="fog" args={['#0b0f0e', 12, 38]} />

      {/* Terrain lighting — very dim atmospheric */}
      <ambientLight intensity={0.55} color="#1a2620" />
      <pointLight position={[0, 10, 0]} intensity={1.4} color="#f97316" distance={28} decay={2} />
      <pointLight position={[-8, 4, -8]} intensity={0.4} color="#22c55e" distance={20} decay={2} />

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
