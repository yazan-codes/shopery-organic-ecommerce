import { Link } from "react-router";
import { shoperyIcons } from "../../data/data";
import "./ProductSection.css";

const formatPrice = (value) => `$${Number(value).toFixed(2)}`;

function ProductSectionCard({
  product,
  isActive = false,
}) {
  const CartIcon = shoperyIcons.addToCart;
  const QuickViewIcon = shoperyIcons.quickView;
  const WishlistIcon = shoperyIcons.addToWishlist;
  const RatingIcon = shoperyIcons.ratingStar;

  const { title, price, rating = 0, thumbnail } = product;
  return (
    <Link >
      <article
        className={`product-section-card d-flex align-items-center ${
          isActive ? "product-section-card--active" : ""
        }`}
      >
        <div className="product-section-card__media flex-shrink-0">
          <img
            className="product-section-card__image"
            src={thumbnail}
            alt={title}
            loading="lazy"
          />
        </div>

        <div className="product-section-card__content flex-grow-1">
          <h3 className="product-section-card__title">{title}</h3>

          <div className="product-section-card__meta">
            <p className="product-section-card__price">{formatPrice(price)}</p>
            <div
              className="product-section-card__rating d-flex align-items-center"
            >
              {Array.from({ length: 5 }, (_, index) => (
                <RatingIcon
                  key={`${product.id}-star-${index}`}
                  className={
                    index < Math.floor(rating) ? "is-filled" : "is-empty"
                  }
                />
              ))}
            </div>
          </div>

          <div className="product-section-card__actions align-items-center gap-2">
            <button
              className="product-section-card__action product-section-card__action--cart"
              type="button"
            >
              {/* onClick wiring will be added with cart state. */}
              <CartIcon />
            </button>
            <button
              className="product-section-card__action"
              type="button"
            >
              {/* Quick-view wiring will be added with product details state. */}
              <QuickViewIcon />
            </button>
            <button
              className="product-section-card__action"
              type="button"
            >
              {/* Wishlist wiring will be added with wishlist state. */}
              <WishlistIcon />
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default ProductSectionCard;
