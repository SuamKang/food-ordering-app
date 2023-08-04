import React from "react";

// 장바구니 컨텍스트 생성 (초기값 설정)
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  deleteItem: (id) => {},
});

export default CartContext;
