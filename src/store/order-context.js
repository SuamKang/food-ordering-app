import React from "react";

// 주문서 컨텍스트 생성 (초기값 설정)
const OrderContext = React.createContext({
  user: {},
  orderedItems: [],
});

export default OrderContext;
