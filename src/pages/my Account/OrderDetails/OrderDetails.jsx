import { Link, useParams } from "react-router";
import { mockOrders, calculateOrderTotals } from "../../../data/mockOrders";
import "../Orders/Orders.css";
import "./OrderDetails.css";

const stages = ["Order received", "Processing", "On the way", "Delivered"];

function OrderDetails() {
  const { orderId } = useParams();
  const order = mockOrders.find((item) => item.id === orderId);

  if (!order) {
    return (
      <section className="order-details w-100 py-4">
        <h1 className="order-details__title mb-3">Order not found</h1>
        <p className="mb-3">We could not find this order.</p>
        <Link className="account-orders__details-link" to=".." relative="path">Back to Orders</Link>
      </section>
    );
  }

  const totals = calculateOrderTotals(order);
  const currentStage = order.status === "Completed" ? 3 : 1;

  return (
    <section className="order-details w-100">
      <header className="order-details__header d-flex flex-wrap align-items-center justify-content-between gap-3 p-4">
        <div>
          <h1 className="order-details__title mb-2">Order Details</h1>
          <p className="order-details__meta">#{order.id} · {order.date} · {order.items.length} {order.items.length === 1 ? "product" : "products"}</p>
        </div>
        <Link className="account-orders__details-link" to=".." relative="path">Back to List</Link>
      </header>

      <div className="row g-3 m-0 p-3 p-md-4">
        {[
          { title: "Billing Address", address: order.billingAddress },
          { title: "Shipping Address", address: order.shippingAddress },
        ].map(({ title, address }) => (
          <div className="col-12 col-md-6 col-xl-4" key={title}>
            <section className="order-details__card h-100">
              <h2 className="order-details__card-title p-3">{title}</h2>
              <div className="p-3">
                <p className="order-details__name mb-2">{address.name}</p>
                <p className="mb-4">{address.street}, {address.city}, {address.country}</p>
                <p className="order-details__label mb-1">Email</p>
                <p className="mb-3 text-break">{address.email}</p>
                <p className="order-details__label mb-1">Phone</p>
                <p>{address.phone}</p>
              </div>
            </section>
          </div>
        ))}
        <div className="col-12 col-xl-4">
          <section className="order-details__card h-100">
            <h2 className="order-details__card-title p-3">Order Summary</h2>
            <div className="p-3">
              <p className="order-details__label mb-1">Payment Method</p>
              <p className="mb-3">{order.paymentMethod}</p>
              <dl className="order-details__totals mb-0">
                <div className="d-flex justify-content-between gap-2 py-2"><dt>Subtotal</dt><dd>${totals.subtotal.toFixed(2)}</dd></div>
                <div className="d-flex justify-content-between gap-2 py-2"><dt>Discount</dt><dd>−${totals.discount.toFixed(2)}</dd></div>
                <div className="d-flex justify-content-between gap-2 py-2"><dt>Shipping</dt><dd>{totals.shipping === 0 ? "Free" : `$${totals.shipping.toFixed(2)}`}</dd></div>
                <div className="order-details__total d-flex justify-content-between gap-2 pt-3"><dt>Total</dt><dd>${totals.total.toFixed(2)}</dd></div>
              </dl>
            </div>
          </section>
        </div>
      </div>

      {order.status === "Cancelled" ? (
        <p className="order-details__cancelled mx-3 mx-md-4 mb-4 p-3">This order has been cancelled.</p>
      ) : (
        <ol className="order-details__stages d-flex px-3 px-md-4 py-4">
          {stages.map((stage, index) => (
            <li className={`order-details__stage flex-fill text-center${index <= currentStage ? " order-details__stage--complete" : ""}`} key={stage}>
              <span className="order-details__step d-inline-flex align-items-center justify-content-center mb-2">{index + 1}</span>
              <span className="d-block">{stage}</span>
            </li>
          ))}
        </ol>
      )}

      <div className="table-responsive">
        <table className="account-orders__table table align-middle mb-0">
          <thead><tr><th>Product</th><th>Price</th><th>Quantity</th><th className="text-end">Subtotal</th></tr></thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.productId}>
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <img className="account-orders__image flex-shrink-0" src={item.image} />
                    <div><p className="account-orders__product mb-1">{item.name}</p><span className="account-orders__size">{item.size}</span></div>
                  </div>
                </td>
                <td>${item.price.toFixed(2)}</td>
                <td>×{item.quantity}</td>
                <td className="text-end">${(Math.round(item.price * 100) * item.quantity / 100).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default OrderDetails;
