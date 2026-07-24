import { create } from 'zustand'

// Computed once at module load. Used by the 3D scene to tone down or swap out
// continuous/autoplaying animations (radar spin, pulse rings) for users who
// have requested reduced motion at the OS level.
export const prefersReducedMotion =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const useAppStore = create((set) => ({
  // 0 -> 1 scroll progress across the whole ScrollControls region.
  // Drives camera dolly + radar sweep speed.
  scrollProgress: 0,
  setScrollProgress: (value) => set({ scrollProgress: value }),

  // The DOM element drei's ScrollControls uses to capture scroll.
  // Exposed so HTML overlay buttons (Hero CTA, Sticky CTA) outside the
  // R3F tree can still trigger a smooth scroll.
  scrollEl: null,
  setScrollEl: (el) => set({ scrollEl: el }),

  // Current radar sweep angle in degrees (0-360), updated every frame by
  // RadarSweep. Intentionally NOT subscribed-to reactively anywhere — nodes
  // read it via useAppStore.getState() inside their own useFrame to avoid
  // triggering a re-render on every animation frame.
  sweepAngle: 0,
  setSweepAngle: (angle) => set({ sweepAngle: angle }),

  // Ids of restaurants the radar sweep has revealed so far.
  revealedRestaurants: [],
  revealRestaurant: (id) =>
    set((state) =>
      state.revealedRestaurants.includes(id)
        ? state
        : { revealedRestaurants: [...state.revealedRestaurants, id] }
    ),
  resetReveals: () => set({ revealedRestaurants: [] }),

  // Selected category pill filter, 'all' by default.
  activeCategory: 'all',
  setActiveCategory: (category) => set({ activeCategory: category }),
}))
