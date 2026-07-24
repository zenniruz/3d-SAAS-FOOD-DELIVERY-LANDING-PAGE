// Category taxonomy for restaurant filtering.
// Replace this with a fetch to `${API_BASE}/categories` when a backend is available —
// the `id` values are used as filter keys throughout the app, so keep them stable.

export const categories = [
  { id: 'all', label: 'All', icon: '📡' },
  { id: 'pizza', label: 'Pizza', icon: '🍕' },
  { id: 'sushi', label: 'Sushi', icon: '🍣' },
  { id: 'vegan', label: 'Vegan', icon: '🥗' },
  { id: 'fastfood', label: 'Fast Food', icon: '🍔' },
  { id: 'desserts', label: 'Desserts', icon: '🍰' },
]
