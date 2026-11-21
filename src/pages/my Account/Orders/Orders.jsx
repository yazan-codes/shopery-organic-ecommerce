import { Link } from "react-router";
import { mockOrders, calculateOrderTotals } from "../../../data/mockOrders";
import "./Orders.css";


function Orders() {
  return (
    <section className="account-orders w-100">
      <h1 className="account-orders__title mb-4">Your Orders</h1>
      <div className="table-responsive">
        <table className="account-orders__table table align-middle mb-0">
          <thead>
            <tr>
              <th>Product</th>
              <th>Order</th>
              <th>Date</th>
              <th>Items</th>
              <th>Status</th>
              <th className="text-end">Amount</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr key={order.id}>
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <img className="account-orders__image flex-shrink-0" src={order.items[0].image} />
                    <div>
                      <p className="account-orders__product mb-1">{order.items[0].name}</p>
                      <span className="account-orders__size">{order.items.length > 1 ? `+${order.items.length - 1} more product` : order.items[0].size}</span>
                    </div>
                  </div>
                </td>
                <td>#{order.id}</td>
                <td>{order.date}</td>
                <td>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</td>
                <td>
                  <span className={`account-orders__status account-orders__status--${order.status.toLowerCase()} badge`}>
                    {order.status}
                  </span>
                </td>
                <td className="text-end">${calculateOrderTotals(order).total.toFixed(2)}</td>
                <td><Link className="account-orders__details-link" to={order.id}>View Details</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Orders
