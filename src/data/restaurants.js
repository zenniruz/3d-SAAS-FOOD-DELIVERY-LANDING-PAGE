// Mock restaurant data.
//
// Replace this with a fetch to `${API_BASE}/restaurants?lat=..&lng=..` when a backend
// is available. Keep the shape identical so the 3D scene and UI don't need changes:
//
//   id        — stable unique identifier
//   name      — display name
//   category  — must match an id in `categories.js`
//   rating    — number, 0-5
//   distance  — pre-formatted display string (e.g. from the backend's geo calc)
//   image     — image URL
//   angle     — degrees (0-360) from center, used by the radar sweep to trigger reveals
//   position  — { x, z } world coordinates on the ground plane, derived from angle/radius
//
// angle/position are kept in sync here; if this becomes backend-driven, compute
// `position` server-side (or client-side) from `angle` and a chosen radius.

export const restaurants = [
  {
    id: 'r1',
    name: 'Urban Bites',
    category: 'fastfood',
    rating: 4.3,
    distance: '0.6 km',
    image: 'https://picsum.photos/seed/urban-bites/400/300',
    angle: 0,
    position: { x: 5.0, z: 0.0 },
  },
  {
    id: 'r2',
    name: 'Sushi Haven',
    category: 'sushi',
    rating: 4.7,
    distance: '1.2 km',
    image: 'https://picsum.photos/seed/sushi-haven/400/300',
    angle: 30,
    position: { x: 5.2, z: 3.0 },
  },
  {
    id: 'r3',
    name: 'Green Garden',
    category: 'vegan',
    rating: 4.5,
    distance: '0.9 km',
    image: 'https://picsum.photos/seed/green-garden/400/300',
    angle: 60,
    position: { x: 2.25, z: 3.9 },
  },
  {
    id: 'r4',
    name: 'Pizza Nova',
    category: 'pizza',
    rating: 4.4,
    distance: '1.8 km',
    image: 'https://picsum.photos/seed/pizza-nova/400/300',
    angle: 90,
    position: { x: 0.0, z: 5.5 },
  },
  {
    id: 'r5',
    name: 'Sweet Tooth Bakery',
    category: 'desserts',
    rating: 4.8,
    distance: '2.4 km',
    image: 'https://picsum.photos/seed/sweet-tooth-bakery/400/300',
    angle: 120,
    position: { x: -3.25, z: 5.63 },
  },
  {
    id: 'r6',
    name: 'Basil & Vine',
    category: 'vegan',
    rating: 4.6,
    distance: '1.5 km',
    image: 'https://picsum.photos/seed/basil-and-vine/400/300',
    angle: 150,
    position: { x: -4.33, z: 2.5 },
  },
  {
    id: 'r7',
    name: 'Dragon Roll Sushi',
    category: 'sushi',
    rating: 4.2,
    distance: '2.0 km',
    image: 'https://picsum.photos/seed/dragon-roll-sushi/400/300',
    angle: 180,
    position: { x: -4.8, z: 0.0 },
  },
  {
    id: 'r8',
    name: 'Crust & Co.',
    category: 'pizza',
    rating: 4.5,
    distance: '2.7 km',
    image: 'https://picsum.photos/seed/crust-and-co/400/300',
    angle: 210,
    position: { x: -5.2, z: -3.0 },
  },
  {
    id: 'r9',
    name: 'Burger Forge',
    category: 'fastfood',
    rating: 4.1,
    distance: '1.1 km',
    image: 'https://picsum.photos/seed/burger-forge/400/300',
    angle: 240,
    position: { x: -2.6, z: -4.5 },
  },
  {
    id: 'r10',
    name: 'Cocoa Lane',
    category: 'desserts',
    rating: 4.6,
    distance: '0.8 km',
    image: 'https://picsum.photos/seed/cocoa-lane/400/300',
    angle: 270,
    position: { x: 0.0, z: -4.6 },
  },
  {
    id: 'r11',
    name: 'Olive & Thyme',
    category: 'vegan',
    rating: 4.4,
    distance: '3.1 km',
    image: 'https://picsum.photos/seed/olive-and-thyme/400/300',
    angle: 300,
    position: { x: 2.9, z: -5.02 },
  },
  {
    id: 'r12',
    name: 'Frosted Cup',
    category: 'desserts',
    rating: 4.9,
    distance: '1.4 km',
    image: 'https://picsum.photos/seed/frosted-cup/400/300',
    angle: 330,
    position: { x: 4.33, z: -2.5 },
  },
]
