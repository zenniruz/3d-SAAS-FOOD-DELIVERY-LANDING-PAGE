import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { prefersReducedMotion } from '../../store/useAppStore'

const SIZE = 60
const SEGMENTS = 48
// Rings drawn ABOVE terrain so they're never occluded by it
const RING_Y = 0.22
const RING_RADII = [4, 8, 12, 16]

export default function RadarGrid() {
  const meshRef = useRef()

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEGMENTS, SEGMENTS)
    geo.rotateX(-Math.PI / 2)
    return geo
  }, [])

  useFrame((state) => {
    if (prefersReducedMotion) return
    const time = state.clock.elapsedTime * 0.25
    const pos = geometry.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)
      // Keep amplitude tiny — terrain is a backdrop, not a landscape
      const y =
        Math.sin(x * 0.14 + time * 0.36) * 0.06 +
        Math.cos(z * 0.17 + time * 0.27) * 0.05 +
        Math.sin((x - z) * 0.09 + time * 0.19) * 0.03
      pos.setY(i, y)
    }
    pos.needsUpdate = true
    geometry.computeVertexNormals()
  })

  return (
    <group>
      {/* Terrain — slightly elevated from pure black so depth reads */}
      <mesh ref={meshRef} geometry={geometry} receiveShadow position={[0, -0.15, 0]}>
        <meshLambertMaterial color="#101a15" />
      </mesh>

      {/* Radar range rings — raised well above terrain, clearly visible */}
      {RING_RADII.map((r) => (
        <mesh key={r} rotation-x={-Math.PI / 2} position={[0, RING_Y, 0]}>
          <ringGeometry args={[r - 0.025, r, 96]} />
          <meshBasicMaterial
            color="#f97316"
            transparent
            opacity={0.12}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Cross-hair centre marker */}
      {[0, Math.PI / 2].map((rot, i) => (
        <mesh key={i} rotation-x={-Math.PI / 2} position={[0, RING_Y + 0.01, 0]}>
          <planeGeometry args={[32, 0.018]} />
          <meshBasicMaterial
            color="#f97316"
            transparent
            opacity={0.07}
            side={THREE.DoubleSide}
            depthWrite={false}
            rotation={rot}
          />
        </mesh>
      ))}
    </group>
  )
}
