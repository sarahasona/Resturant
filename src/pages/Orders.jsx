import { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import OrderSummary from "../components/OrderSummary"; 

function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    
    const getOrders = async () => {
      try {
        const response = await axios.get("/orders.json"); 
        const orders = response.data.orders; 
        setOrders(orders); 
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getOrders();
  }, []); 

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleBack = () => {
    setSelectedOrder(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="loader">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-500"></div>
        </div>
      </div>
    ); 
  }

  if (error) {
    return <p>Error: {error}</p>; 
  }

  return (
    <div className="p-4">
      {selectedOrder ? (
        <OrderSummary order={selectedOrder} onBack={handleBack} />
      ) : (
        <div className="grid grid-cols-1 gap-4 cursor-pointer">
          {orders.map((order) => (
            <div
              key={order.id}
              className="relative flex items-center w-full p-2 border rounded-lg shadow-lg hover:bg-gray-100 transition mx-auto"
              onClick={() => handleOrderClick(order)}
            >
              <img
                src={order.image}
                alt={order.name}
                className="w-16 h-16 object-cover rounded-md mr-3"
              />
              <div className="flex-grow">
                <h3 className="text-sm font-bold">{order.name}</h3>
                <p className="text-xs text-gray-500">{order.status}</p>
                {order.status === "Delivered" && (
                  <p className="text-xs text-green-600">
                    Delivered on: {order.deliveryDate}
                  </p>
                )}
                <p className="text-sm font-bold mt-1">
                  Total: ${order.totalPrice.toFixed(2)}
                </p>
              </div>
              <p className="absolute bottom-2 right-2 text-xs text-gray-600">
                Order ID: {order.id}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
