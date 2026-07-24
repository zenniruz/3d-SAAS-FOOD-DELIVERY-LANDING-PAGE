import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'
import { useAppStore, prefersReducedMotion } from '../../store/useAppStore'

const RADIUS = 18
const BEAM_ANGLE = THREE.MathUtils.degToRad(26)
const BASE_SPEED = 0.5 // rad/sec
const SCROLL_SPEED_BOOST = 1.2 // additional rad/sec at full scroll

// Builds a flat pie-slice wedge directly in the XZ ground plane using the
// same (x = r*cos, z = r*sin) convention as the restaurant node positions,
// so the sweep angle and restaurant angles line up without any conversion.
function useSweepGeometry() {
  return useMemo(() => {
    const segments = 32
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
      // Avoid an autonomous, ever-spinning animation: tie the sweep directly
      // to scroll position instead so motion only happens in response to
      // the user's own input.
      angleRef.current = scroll.offset * Math.PI * 6
    } else {
      const speed = BASE_SPEED + scroll.offset * SCROLL_SPEED_BOOST
      angleRef.current += speed * delta
    }
    angleRef.current = ((angleRef.current % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)

    if (meshRef.current) {
      // Three.js rotation.y is inverted relative to our (cos, sin) angle
      // convention, so negate here to keep the visible beam and the
      // published sweepAngle pointing at the same world direction.
      meshRef.current.rotation.y = -angleRef.current
    }

    setSweepAngle(THREE.MathUtils.radToDeg(angleRef.current))
  })

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial
        color="#22ff88"
        transparent
        opacity={0.28}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}
