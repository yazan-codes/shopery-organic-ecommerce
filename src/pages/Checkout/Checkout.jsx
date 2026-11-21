import { useContext, useState } from "react";
import { Link } from "react-router";
import { Category_Product_Context } from "../../context/Context";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import FormField from "../../Components/Forms/FormField";
import "../../styles/content-pages.css";
import "./Checkout.css";
import Address from "../my Account/Address/Address";
import { shoperyIcons } from "../../data/data";

const formatPrice = (price) => `$${price.toFixed(2)}`;

const paymentMethods = [
  { id: "paypal", title: "Payment with PayPal", description: "Complete your payment with your PayPal account." },
  { id: "card", title: "Credit / Debit Card", description: "Enter your card details below." },
  { id: "amazon", title: "Amazon Pay", description: "Use your Amazon account to complete your payment." },
  { id: "cash", title: "Cash on Delivery", description: "Pay with cash when your order is delivered." },
];

function Checkout() {
  const { cartItems = [] } = useContext(Category_Product_Context);
  const [status, setStatus] = useState("");
  const [openSection, setOpenSection] = useState("address");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const LocationIcon = shoperyIcons.location;
  const InstructionsIcon = shoperyIcons.comment;
  const PaymentIcon = shoperyIcons.checkout;
  const ChevronIcon = shoperyIcons.dropdown;
  const items = cartItems;
  // Match the cart's existing summary calculation without changing its context.
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  function toggleSection(section) {
    setOpenSection((current) => current === section ? "" : section);
  }

  function handlePlaceOrder(event) {
    event.preventDefault();
    if (!selectedAddressId) {
      setOpenSection("address");
      setStatus("Add and select a delivery address before continuing.");
      return;
    }
    setStatus("This checkout is a preview. No order has been placed and no payment has been taken.");
  }

  return (
    <main className="shopery-content-page checkout-page">
      <Breadcrumb
        items={[
          { label: "Shopping Cart", to: "/shopping-cart" },
          { label: "Checkout" },
        ]}
      />

      <div className="container checkout-page__content">
        <h1 className="checkout-page__title">Checkout</h1>
        {items.length === 0 ? (
          <div className="text-center py-5">
            <h2 className="checkout-page__heading">Your cart is empty</h2>
            <p className="mb-4">Add products to your cart before continuing to checkout.</p>
            <Link className="shopery-button" to="/shop">Continue Shopping</Link>
          </div>
        ) : (
        <div className="row g-4 align-items-start">
          <div className="col-12 col-lg-8">
            <section className="checkout-step">
              <h2>
                <button type="button" className={`checkout-step__toggle ${openSection === "address" ? "is-open" : ""}`} onClick={() => toggleSection("address")}>
                  <LocationIcon /><span>Add delivery address</span><ChevronIcon className="checkout-step__chevron ms-auto" />
                </button>
              </h2>
              <div className="checkout-step__body" hidden={openSection !== "address"}>
                <Address checkout selectedAddressId={selectedAddressId} onSelectAddress={setSelectedAddressId} />
                <div className="d-flex justify-content-end mt-4">
                  <button type="button" className="shopery-button" onClick={() => setOpenSection("instructions")}>Continue</button>
                </div>
              </div>
            </section>
            <section className="checkout-step">
              <h2>
                <button type="button" className={`checkout-step__toggle ${openSection === "instructions" ? "is-open" : ""}`} onClick={() => toggleSection("instructions")}>
                  <InstructionsIcon /><span>Delivery instructions</span><ChevronIcon className="checkout-step__chevron ms-auto" />
                </button>
              </h2>
              <div className="checkout-step__body" hidden={openSection !== "instructions"}>
                <FormField
                  as="textarea"
                  id="order-notes"
                  label="Delivery instructions (optional)"
                  placeholder="Add any instructions for your delivery, e.g. leave at the front door."
                  rows={3}
                />
                <p className="checkout-step__hint mt-2">Let us know where to leave your order or how to reach you.</p>
                <div className="d-flex justify-content-end gap-3 mt-4">
                  <button type="button" className="checkout-step__previous" onClick={() => setOpenSection("address")}>Prev</button>
                  <button type="button" className="shopery-button" onClick={() => setOpenSection("payment")}>Continue to Payment</button>
                </div>
              </div>
            </section>
            <section className="checkout-step">
              <h2>
                <button type="button" className={`checkout-step__toggle ${openSection === "payment" ? "is-open" : ""}`} onClick={() => toggleSection("payment")}>
                  <PaymentIcon /><span>Payment Method</span><ChevronIcon className="checkout-step__chevron ms-auto" />
                </button>
              </h2>
              <div className="checkout-step__body" hidden={openSection !== "payment"}>
                <form onSubmit={handlePlaceOrder}>
                  <div className="d-flex flex-column gap-3">
                    {paymentMethods.map((method) => (
                      <div className={`checkout-payment ${paymentMethod === method.id ? "is-selected" : ""}`} key={method.id}>
                        <label className="checkout-payment__choice d-flex align-items-start gap-3" htmlFor={`payment-${method.id}`}>
                          <input className="form-check-input" type="radio" name="payment" id={`payment-${method.id}`} value={method.id} checked={paymentMethod === method.id} onChange={() => { setPaymentMethod(method.id); setStatus(""); }} />
                          <span><strong>{method.title}</strong><span className="checkout-step__hint d-block mt-1">{method.description}</span></span>
                        </label>
                        {method.id === "card" && paymentMethod === "card" && (
                          <div className="row g-3 checkout-payment__fields mt-1">
                            <FormField className="col-12" id="checkout-card-number" label="Card number" placeholder="0000 0000 0000 0000" inputMode="numeric" autoComplete="off" maxLength={23} pattern="[0-9 ]{13,23}" required />
                            <FormField className="col-12" id="checkout-card-name" label="Name on card" placeholder="Name as shown on card" autoComplete="off" required />
                            <FormField className="col-12 col-sm-6" id="checkout-card-expiry" label="Expiry date" placeholder="MM/YY" inputMode="numeric" autoComplete="off" maxLength={5} pattern="(0[1-9]|1[0-2])/[0-9]{2}" title="Use MM/YY, for example 12/29" required />
                            <FormField className="col-12 col-sm-6" id="checkout-card-cvv" label="CVV code" placeholder="3 or 4 digits" type="password" inputMode="numeric" autoComplete="off" maxLength={4} pattern="[0-9]{3,4}" required />
                            <p className="checkout-step__hint col-12">Preview only. Use fictional card details; online payments are not connected yet.</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="d-flex justify-content-end gap-3 mt-4">
                    <button type="button" className="checkout-step__previous" onClick={() => setOpenSection("instructions")}>Prev</button>
                    <button className="shopery-button" type="submit">Place Order</button>
                  </div>
                </form>
              </div>
            </section>
            {status && <p className="shopery-form-status checkout-page__status">{status}</p>}
          </div>
          <div className="col-12 col-lg-4">
            <aside className="checkout-summary">
              <h2 id="order-summary-title" className="checkout-summary__heading">Order Summary</h2>
              <ul className="checkout-summary__products">
                {items.map((item) => (
                  <li key={item.id} className="d-flex align-items-center">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      width="60"
                      height="60"
                    />
                    <span className="checkout-summary__product-name">
                      {item.title}
                    </span>
                    <span className="checkout-summary__quantity">{item.quantity}</span>
                    <strong className="ms-auto text-nowrap">
                      {formatPrice(item.price * item.quantity)}
                    </strong>
                  </li>
                ))}
              </ul>
              <dl className="checkout-summary__totals">
                <div>
                  <dt>Subtotal:</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                <div>
                  <dt>Shipping:</dt>
                  <dd>Free</dd>
                </div>
                <div className="checkout-summary__total">
                  <dt>Total:</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
        )}
      </div>
    </main>
  );
}

export default Checkout;
