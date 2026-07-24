import { categories } from '../../data/categories'
import { useAppStore } from '../../store/useAppStore'

export default function CategoryPills() {
  const activeCategory = useAppStore((state) => state.activeCategory)
  const setActiveCategory = useAppStore((state) => state.setActiveCategory)

  return (
    <section className="category-section">
      <div className="category-pills">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={
              'category-pill' +
              (activeCategory === category.id ? ' category-pill-active' : '')
            }
            onClick={() => setActiveCategory(category.id)}
          >
            <span className="category-icon" aria-hidden="true">
              {category.icon}
            </span>
            {category.label}
          </button>
        ))}
      </div>
    </section>
  )
}
