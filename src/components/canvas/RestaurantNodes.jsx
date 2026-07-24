import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useAppStore } from '../../store/useAppStore'
import { restaurants } from '../../data/restaurants'

const REVEAL_TOLERANCE = 9 // degrees either side of sweep's leading edge

function angleDiff(a, b) {
  let diff = Math.abs(a - b) % 360
  if (diff > 180) diff = 360 - diff
  return diff
}

function Node({ restaurant }) {
  const groupRef = useRef()
  const meshRef = useRef()
  const glowRef = useRef()
  const progress = useRef(0)

  const revealed = useAppStore((state) =>
    state.revealedRestaurants.includes(restaurant.id)
  )
  const revealRestaurant = useAppStore((state) => state.revealRestaurant)

  useFrame((state, delta) => {
    if (!revealed) {
      const sweepAngle = useAppStore.getState().sweepAngle
      if (angleDiff(sweepAngle, restaurant.angle) < REVEAL_TOLERANCE) {
        revealRestaurant(restaurant.id)
      }
    }

    const target = revealed ? 1 : 0
    progress.current = THREE.MathUtils.damp(progress.current, target, 6, delta)
    const s = progress.current

    if (groupRef.current) {
      groupRef.current.scale.setScalar(Math.max(0.001, s))
      groupRef.current.position.y = -0.6 + s * 0.6
    }
    if (meshRef.current) {
      meshRef.current.material.opacity = s * 0.92
    }
    if (glowRef.current) {
      // Subtle pulse on the glow ring
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.5 + restaurant.angle) * 0.08
      glowRef.current.scale.setScalar(pulse)
      glowRef.current.material.opacity = s * 0.35
    }
  })

  return (
    <group
      ref={groupRef}
      position={[restaurant.position.x, -0.6, restaurant.position.z]}
    >
      {/* Core dot */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0} />
      </mesh>

      {/* Glow ring */}
      <mesh ref={glowRef} rotation-x={-Math.PI / 2} position={[0, -0.04, 0]}>
        <ringGeometry args={[0.18, 0.26, 32]} />
        <meshBasicMaterial
          color="#f97316"
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {revealed && (
        <Html distanceFactor={13} position={[0, 0.38, 0]} center>
          <div className="node-label">
            <span className="node-label-name">{restaurant.name}</span>
            <span className="node-label-meta">★ {restaurant.rating.toFixed(1)} · {restaurant.distance}</span>
          </div>
        </Html>
      )}
    </group>
  )
}

export default function RestaurantNodes() {
  return (
    <group>
      {restaurants.map((restaurant) => (
        <Node key={restaurant.id} restaurant={restaurant} />
      ))}
    </group>
  )
}
