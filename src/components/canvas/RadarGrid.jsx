import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { prefersReducedMotion } from '../../store/useAppStore'

const SIZE = 60
const SEGMENTS = 48

export default function RadarGrid() {
  const meshRef = useRef()

  // High-subdivision plane for smooth terrain displacement.
  // 48×48 = 2401 vertices — lightweight enough for per-frame updates.
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEGMENTS, SEGMENTS)
    geo.rotateX(-Math.PI / 2)
    return geo
  }, [])

  useFrame((state) => {
    if (prefersReducedMotion) return
    const time = state.clock.elapsedTime * 0.28 // slow drift
    const pos = geometry.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)
      // Very gentle multi-octave sine displacement — almost flat, just breathing
      const y =
        Math.sin(x * 0.16 + time * 0.38) * 0.07 +
        Math.cos(z * 0.19 + time * 0.29) * 0.06 +
        Math.sin((x - z) * 0.11 + time * 0.21) * 0.04
      pos.setY(i, y)
    }
    pos.needsUpdate = true
    geometry.computeVertexNormals()
  })

  return (
    <group>
      {/* Terrain mesh — dark, smooth, no wireframe */}
      <mesh ref={meshRef} geometry={geometry} receiveShadow>
        <meshLambertMaterial color="#0d1612" />
      </mesh>

      {/* Radar range rings — very subtle orange tint */}
      {[4, 8, 12, 16].map((r) => (
        <mesh key={r} rotation-x={-Math.PI / 2} position={[0, 0.14, 0]}>
          <ringGeometry args={[r - 0.018, r, 80]} />
          <meshBasicMaterial
            color="#f97316"
            transparent
            opacity={0.055}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}
