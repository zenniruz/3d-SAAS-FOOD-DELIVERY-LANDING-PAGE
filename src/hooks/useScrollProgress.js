import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import { useAppStore } from '../store/useAppStore'

// Must be called from inside <ScrollControls> (i.e. within the Canvas tree).
// Mirrors drei's per-frame scroll offset into the global store so any
// component — 3D or HTML overlay — can read scroll progress without needing
// direct access to the ScrollControls context.
export function useScrollProgress() {
  const scroll = useScroll()
  const setScrollProgress = useAppStore((state) => state.setScrollProgress)

  useFrame(() => {
    setScrollProgress(scroll.offset)
  })

  return scroll
}
