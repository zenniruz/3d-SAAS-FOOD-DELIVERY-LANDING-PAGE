export default function RestaurantCard({ restaurant }) {
  return (
    <article className="restaurant-card">
      <div className="restaurant-card-image">
        <img src={restaurant.image} alt={restaurant.name} loading="lazy" />
        <span className="restaurant-card-category">{restaurant.category}</span>
      </div>
      <div className="restaurant-card-body">
        <h3 className="restaurant-card-name">{restaurant.name}</h3>
        <div className="restaurant-card-meta">
          <span className="restaurant-card-rating">★ {restaurant.rating.toFixed(1)}</span>
          <span className="restaurant-card-dot" aria-hidden="true">
            •
          </span>
          <span className="restaurant-card-distance">{restaurant.distance}</span>
        </div>
      </div>
    </article>
  )
}
