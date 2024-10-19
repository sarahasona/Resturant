import PropTypes from 'prop-types';
import { IoIosArrowBack } from "react-icons/io";

function OrderSummary({ order, onBack }) {
  return (
    <div className="p-4">
      <button
        onClick={onBack}
        className="mb-4 text-orange-500 rounded flex items-center gap-2 transition-colors duration-300 hover:text-orange-400"
      >
        <IoIosArrowBack className="transition-colors duration-300 hover:text-orange-400" />
        Back to Orders
      </button>

      <h1 className="text-3xl font-bold mb-6">Order Summary</h1>
      <p className="mb-6">Find order invoice, payment, and shipping details here</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2 p-4 border rounded-lg shadow-lg">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Order ID {order.id}</h2>
            {order.status && (
              <p className={`text-lg font-semibold mb-2 ${order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>
                {order.status}
              </p>
            )}
            <p className="text-sm text-gray-500">Order placed on: {order.placedDate}</p>
          </div>

          <h3 className="text-lg font-bold mb-4">Delivery Details</h3>
          {order.deliveryDate && (
            <p className="text-sm text-gray-500 mb-4">Delivery Date: {order.deliveryDate}</p>
          )}

          <ul className="space-y-4">
            {order.items.map((item, index) => (
              <li key={index} className="flex gap-4 items-start border-b pb-4">
                <img
                  src={item.image} 
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex flex-col justify-between">
                  <p className="font-bold text-lg">{item.name}</p>
                  <p className="text-gray-500 mb-2">
                    Description: {item.description}
                  </p>
                  <p>
                    Quantity: {item.quantity} | Price: ${item.price.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-bold">Total Price: ${order.totalPrice.toFixed(2)}</p>
        </div>

        <div className="col-span-1 grid grid-cols-1 gap-4">
          <div className="p-3 border rounded-lg shadow-lg">
            <h4 className="font-bold mb-2">Delivery Address:</h4>
            <p>{order.user.address}</p>
            <p>{order.user.name}</p>
            <p>{order.user.phone}</p>
          </div>

          <div className="p-3 border rounded-lg shadow-lg">
            <h4 className="font-bold mb-2">Payment Method:</h4>
            <p>{order.user.paymentMethod}</p>
          </div>

          <div className="p-3 border rounded-lg shadow-lg">
            <h4 className="font-bold mb-2">Fees and Charges:</h4>
            <p>Delivery Fee: $5.00</p>
            <p>Tax: $2.50</p>
            <p>Total: ${(order.totalPrice + 7.5).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

OrderSummary.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string,
    deliveryDate: PropTypes.string,
    placedDate: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired, 
        description: PropTypes.string
      })
    ).isRequired,
    totalPrice: PropTypes.number.isRequired,
    user: PropTypes.shape({
      address: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      paymentMethod: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  onBack: PropTypes.func.isRequired
};

export default OrderSummary;
