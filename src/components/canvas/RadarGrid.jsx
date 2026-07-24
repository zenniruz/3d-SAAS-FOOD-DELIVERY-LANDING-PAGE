import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { prefersReducedMotion } from '../../store/useAppStore'

const SIZE = 40
const SEGMENTS = 24
const RING_RADII = [4, 8, 12, 16]

export default function RadarGrid() {
  const meshRef = useRef()

  // Low-res plane kept lightweight on purpose: 25x25 vertices is enough for a
  // subtle topography feel without any per-frame cost concerns.
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEGMENTS, SEGMENTS)
    geo.rotateX(-Math.PI / 2)
    return geo
  }, [])

  useFrame((state) => {
    if (prefersReducedMotion) return
    const time = state.clock.elapsedTime
    const pos = geometry.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)
      const y =
        Math.sin(x * 0.25 + time * 0.4) * 0.15 +
        Math.cos(z * 0.25 + time * 0.3) * 0.15
      pos.setY(i, y)
    }
    pos.needsUpdate = true
  })

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry}>
        <meshBasicMaterial color="#0f4c5c" wireframe transparent opacity={0.25} />
      </mesh>

      {RING_RADII.map((r) => (
        <mesh key={r} rotation-x={-Math.PI / 2} position={[0, 0.01, 0]}>
          <ringGeometry args={[r - 0.03, r, 64]} />
          <meshBasicMaterial
            color="#22d3ee"
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}
