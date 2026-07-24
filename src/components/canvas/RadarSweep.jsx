import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'
import { useAppStore, prefersReducedMotion } from '../../store/useAppStore'

const RADIUS = 18
const BEAM_ANGLE = THREE.MathUtils.degToRad(28)
const BASE_SPEED = 0.42 // rad/sec — slightly slower for a calmer feel
const SCROLL_SPEED_BOOST = 0.9

function useSweepGeometry() {
  return useMemo(() => {
    const segments = 40
    const positions = [0, 0, 0]
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * BEAM_ANGLE
      positions.push(RADIUS * Math.cos(t), 0, RADIUS * Math.sin(t))
    }
    const indices = []
    for (let i = 1; i <= segments; i++) {
      indices.push(0, i, i + 1)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geo.setIndex(indices)
    geo.computeVertexNormals()
    return geo
  }, [])
}

export default function RadarSweep() {
  const meshRef = useRef()
  const angleRef = useRef(0)
  const scroll = useScroll()
  const setSweepAngle = useAppStore((state) => state.setSweepAngle)
  const geometry = useSweepGeometry()

  useFrame((state, delta) => {
    if (prefersReducedMotion) {
      angleRef.current = scroll.offset * Math.PI * 6
    } else {
      const speed = BASE_SPEED + scroll.offset * SCROLL_SPEED_BOOST
      angleRef.current += speed * delta
    }
    angleRef.current = ((angleRef.current % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)

    if (meshRef.current) {
      meshRef.current.rotation.y = -angleRef.current
    }

    setSweepAngle(THREE.MathUtils.radToDeg(angleRef.current))
  })

  return (
    // Two layered meshes: a dim base + a brighter thin leading edge
    <group>
      {/* Main beam — subtle, translucent */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshBasicMaterial
          color="#22c55e"
          transparent
          opacity={0.10}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}
