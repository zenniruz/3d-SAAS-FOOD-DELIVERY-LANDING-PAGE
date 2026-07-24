import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { prefersReducedMotion } from '../../store/useAppStore'

// Slow, organic breathing pulse — NOT a fast uniform ring.
// Each ring uses an asymmetric easing curve + subtle x/z scale variation
// so it reads as a frequency waveform rather than a perfect geometric circle.
const RING_COUNT = 3
const CYCLE = 11 // seconds — long, breath-like

export default function PulseRing() {
  const refs = useRef([])

  useFrame((state) => {
    if (prefersReducedMotion) return
    const time = state.clock.elapsedTime

    refs.current.forEach((mesh, i) => {
      if (!mesh) return
      const offset = (i / RING_COUNT) * CYCLE
      const raw = ((time + offset) % CYCLE) / CYCLE

      // Ease-in: start slow, accelerate near end → feels like a breath exhale
      const t = Math.pow(raw, 0.55)

      // Scale — grows from near-0 to large
      const baseScale = THREE.MathUtils.lerp(0.2, 11, t)

      // Slight asymmetry on x vs z — breaks the perfect-circle feel
      const wobble = 1 + Math.sin(time * 0.4 + i * 2.3) * 0.03
      mesh.scale.set(baseScale * wobble, baseScale, baseScale)

      // Opacity — strong early, fades quadratically so end is invisible
      const fade = Math.pow(1 - raw, 2.2)
      mesh.material.opacity = fade * 0.09 // dim, barely there
    })
  })

  if (prefersReducedMotion) {
    return (
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.02, 0]}>
        <ringGeometry args={[3.9, 4, 64]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>
    )
  }

  return (
    <group>
      {Array.from({ length: RING_COUNT }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (refs.current[i] = el)}
          rotation-x={-Math.PI / 2}
          position={[0, 0.02, 0]}
        >
          <ringGeometry args={[0.9, 1, 72]} />
          <meshBasicMaterial
            color="#f97316"
            transparent
            opacity={0}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}
