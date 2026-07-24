import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { prefersReducedMotion } from '../../store/useAppStore'

const RING_COUNT = 3
const CYCLE = 4 // seconds
const MIN_SCALE = 0.4
const MAX_SCALE = 9

export default function PulseRing() {
  const refs = useRef([])

  useFrame((state) => {
    if (prefersReducedMotion) return
    const time = state.clock.elapsedTime
    refs.current.forEach((mesh, i) => {
      if (!mesh) return
      const offset = (i / RING_COUNT) * CYCLE
      const t = ((time + offset) % CYCLE) / CYCLE
      const scale = THREE.MathUtils.lerp(MIN_SCALE, MAX_SCALE, t)
      mesh.scale.set(scale, scale, scale)
      mesh.material.opacity = (1 - t) * 0.5
    })
  })

  if (prefersReducedMotion) {
    // Static single ring — communicates the radar concept without an
    // unprompted, continuously animating loop.
    return (
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.02, 0]}>
        <ringGeometry args={[3.9, 4, 64]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.25} side={THREE.DoubleSide} />
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
          <ringGeometry args={[0.92, 1, 64]} />
          <meshBasicMaterial
            color="#22d3ee"
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}
