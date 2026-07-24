import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

const START = new THREE.Vector3(0, 8, 6)
const END = new THREE.Vector3(0, 1.5, 15)
const LOOK_AT = new THREE.Vector3(0, 0, 0)

// Reused scratch vector to avoid per-frame allocation.
const targetScratch = new THREE.Vector3()

export default function CameraRig() {
  const scroll = useScroll()
  const current = useRef(START.clone())

  useFrame((state, delta) => {
    const t = scroll.offset
    targetScratch.lerpVectors(START, END, t)
    // Smooth pursuit rather than an instant snap, but still fully driven by scroll.
    current.current.lerp(targetScratch, Math.min(1, delta * 4))
    state.camera.position.copy(current.current)
    state.camera.lookAt(LOOK_AT)
  })

  return null
}
