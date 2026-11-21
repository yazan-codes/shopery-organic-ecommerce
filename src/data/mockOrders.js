// Preview data only; no orders are saved or fetched from the server.
const sampleAddress = {
  "name": "Ahmad",
  "street": "12 Market Street",
  "city": "Hebron",
  "country": "Palestine",
  "email": "customer@example.test",
  "phone": "000-000-0000"
};

export const mockOrders = [
  {
    "id": "14899",
    "date": "Nov 15, 2026",
    "status": "Processing",
    "paymentMethod": "Cash on delivery",
    "shipping": 2.5,
    "discount": 1,
    "items": [
      {
        "productId": "1",
        "name": "Organic Green Apples",
        "size": "1 kg",
        "image": "/images/green-apples-with-leaf-large.jpg",
        "price": 4.99,
        "quantity": 2
      },
      {
        "productId": "2",
        "name": "Fresh Ripe Mango",
        "size": "500 g",
        "image": "/images/mango-isolated.jpg",
        "price": 3.49,
        "quantity": 1
      }
    ]
  },
  {
    "id": "14658",
    "date": "Nov 12, 2026",
    "status": "Completed",
    "paymentMethod": "Cash on delivery",
    "shipping": 0,
    "discount": 0,
    "items": [
      {
        "productId": "2",
        "name": "Fresh Ripe Mango",
        "size": "500 g",
        "image": "/images/mango-isolated.jpg",
        "price": 3.49,
        "quantity": 3
      }
    ]
  },
  {
    "id": "13778",
    "date": "Nov 8, 2026",
    "status": "Completed",
    "paymentMethod": "Cash on delivery",
    "shipping": 0,
    "discount": 0,
    "items": [
      {
        "productId": "3",
        "name": "Juicy Navel Oranges",
        "size": "1 kg",
        "image": "/images/oranges-pile-large.jpg",
        "price": 5.99,
        "quantity": 1
      }
    ]
  },
  {
    "id": "13746",
    "date": "Nov 3, 2026",
    "status": "Completed",
    "paymentMethod": "Cash on delivery",
    "shipping": 0,
    "discount": 0,
    "items": [
      {
        "productId": "4",
        "name": "Fresh Strawberries",
        "size": "250 g",
        "image": "/images/strawberry-isolated.jpg",
        "price": 6.49,
        "quantity": 2
      }
    ]
  },
  {
    "id": "13566",
    "date": "Oct 28, 2026",
    "status": "Cancelled",
    "paymentMethod": "Cash on delivery",
    "shipping": 0,
    "discount": 0,
    "items": [
      {
        "productId": "5",
        "name": "Blueberries Bowl Pack",
        "size": "250 g",
        "image": "/images/blueberries-bowl.jpg",
        "price": 7.25,
        "quantity": 1
      }
    ]
  },
  {
    "id": "12094",
    "date": "Oct 21, 2026",
    "status": "Completed",
    "paymentMethod": "Cash on delivery",
    "shipping": 0,
    "discount": 0,
    "items": [
      {
        "productId": "8",
        "name": "Fresh Broccoli Crown",
        "size": "500 g",
        "image": "/images/broccoli-isolated.jpg",
        "price": 3.29,
        "quantity": 4
      }
    ]
  }
].map((order) => ({
  ...order,
  billingAddress: { ...sampleAddress },
  shippingAddress: { ...sampleAddress },
}));

export function calculateOrderTotals(order) {
  const subtotalCents = order.items.reduce((sum, item) => sum + Math.round(item.price * 100) * item.quantity, 0);
  return {
    subtotal: subtotalCents / 100,
    shipping: order.shipping,
    discount: order.discount,
    total: (subtotalCents + Math.round(order.shipping * 100) - Math.round(order.discount * 100)) / 100,
  };
}
