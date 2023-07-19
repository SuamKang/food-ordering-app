import { useState, useEffect } from "react";

import CartProvider from "./store/CartProvider";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

// 앱구성에 필요한 컴포넌트를 다 구현 했다면 먼저 여기 App으로 와서 어떤 state가 필요한지 판단하고 설정하자.
function App() {
  const [cart, setCart] = useState([]);
  const [isOpenCart, setIsOpenCart] = useState(false);

  const openCartHandler = () => {
    setIsOpenCart(true);
  };

  const closeCartHandler = () => {
    setIsOpenCart(false);
  };

  return (
    <CartProvider>
      {isOpenCart && (
        <Cart onCartOpen={openCartHandler} onCartClose={closeCartHandler} />
      )}
      <Header onCartOpen={openCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
