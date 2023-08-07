import { useContext } from "react";
import OrderContext from "./order-context";

const defaultOrderState = {
  user: {},
  orderedItems: [],
};

const orderReducer = (state, action) => {
  if (action.type === "ADD_ORDER") {
  }
  if (action.type === "DELETE_ORDER") {
  }

  return defaultOrderState;
};

const OrderProvider = (props) => {
  const [orderState, dispatch] = useContext(orderReducer, defaultOrderState);

  const AddOrderHandler = (order) => {
    dispatch({ type: "ADD_ORDER", payload: order });
  };

  const deleteOrderHandler = (id) => {
    dispatch({ type: "DELETE_ORDER", payload: id });
  };

  const orderContext = {
    user: orderState.user,
    orderedItems: orderState.orderedItems,
    addOrder: AddOrderHandler,
    deleteOrder: deleteOrderHandler,
  };

  return (
    <OrderContext.Provider value={orderContext}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
