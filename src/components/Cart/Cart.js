import React, { useContext } from "react";

import classes from "./Cart.module.css";

import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

function Cart(props) {
  const cartCtx = useContext(CartContext);

  // 전체 수량값 가져오기(from 컨텍스트)
  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  // 장바구니 아이템 존재 여부 판단(from 컨택스트)
  const hasItems = cartCtx.items.length > 0;

  // 삭제, 추가 함수 바인딩(from 컨텍스트)
  const cartItemRemoveHandler = (id) => {
    cartCtx.deleteItem(id);
  };

  const cartItemAddHandler = (item) => {
    // 항목이 추가될때마다 그 항목의 수량은 1개씩 늘어나도록 고정되어야 하기에 item객체의 속성중 amount값은 1로 고정된값으로 새로운 객체를 만들어 addItem에 전달해줘야 추가 버튼을 클릭시 수량이 2배씩 커져나가는 버그를 방지할 수 있다.
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
        // bind는 향후 실행을 위해 함수를 사전에 구성하는것이므로 CartItem에서 항목 삭제,추가를 위한 on함수들이 실행되도록 이처럼 미리 들어가야할 매개변수를 구성해주는 것이다.
      ))}
    </ul>
  );

  return (
    <Modal onCartClose={props.onCartClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCartClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
}

export default Cart;
