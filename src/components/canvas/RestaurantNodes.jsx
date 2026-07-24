import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useAppStore } from '../../store/useAppStore'
import { restaurants } from '../../data/restaurants'

const REVEAL_TOLERANCE = 9 // degrees either side of the sweep's leading edge

function angleDiff(a, b) {
  let diff = Math.abs(a - b) % 360
  if (diff > 180) diff = 360 - diff
  return diff
}

function Node({ restaurant }) {
  const groupRef = useRef()
  const meshRef = useRef()
  const ringMatRef = useRef()
  const progress = useRef(0)

  const revealed = useAppStore((state) =>
    state.revealedRestaurants.includes(restaurant.id)
  )
  const revealRestaurant = useAppStore((state) => state.revealRestaurant)

  useFrame((state, delta) => {
    if (!revealed) {
      // Read the sweep angle without subscribing — avoids a re-render on
      // every animation frame for every node.
      const sweepAngle = useAppStore.getState().sweepAngle
      if (angleDiff(sweepAngle, restaurant.angle) < REVEAL_TOLERANCE) {
        revealRestaurant(restaurant.id)
      }
    }

    const target = revealed ? 1 : 0
    progress.current = THREE.MathUtils.damp(progress.current, target, 5, delta)
    const s = progress.current

    if (groupRef.current) {
      groupRef.current.scale.setScalar(Math.max(0.001, s))
      groupRef.current.position.y = -0.6 + s * 0.6
    }
    if (meshRef.current) {
      meshRef.current.material.opacity = s * 0.95
    }
    if (ringMatRef.current) {
      ringMatRef.current.opacity = s * 0.4
    }
  })

  return (
    <group
      ref={groupRef}
      position={[restaurant.position.x, -0.6, restaurant.position.z]}
    >
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial color="#4ade80" transparent opacity={0} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.05, 0]}>
        <ringGeometry args={[0.2, 0.24, 24]} />
        <meshBasicMaterial
          ref={ringMatRef}
          color="#4ade80"
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>
      {revealed && (
        <Html distanceFactor={12} position={[0, 0.35, 0]} center>
          <div className="node-label">
            <span className="node-label-name">{restaurant.name}</span>
            <span className="node-label-meta">★ {restaurant.rating.toFixed(1)}</span>
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
