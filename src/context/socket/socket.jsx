import React, { createContext, useContext, useState, useCallback } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [orderStatus, setOrderStatus] = useState(null);

  const initializeSocket = useCallback(
    (userId) => {
      if (!socket) {
        const socketIo = io("http://127.0.0.1:8080", {
          query: {
            id: userId,
          },
        });

        socketIo.on("connect", () => {
          console.log("connected ", socketIo.id);
          setSocket(socketIo);
        });

        socketIo.on("notification", (notification) => {
          alert(`Notification received: ${notification.message}`);
          console.log(notification);
          setNotifications((prev) => [...prev, notification]);
        });

        socketIo.on("orderStatus", (status) => {
          console.log("Order status received:", status);
          setOrderStatus(status);
        });

        socketIo.on("disconnect", () => {
          console.log("Socket.IO disconnected");
          setSocket(null);
        });
      }
    },
    [socket]
  );

  return (
    <SocketContext.Provider
      value={{ socket, notifications, orderStatus, initializeSocket }}
    >
      {children}
    </SocketContext.Provider>
  );
};
