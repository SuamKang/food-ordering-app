import React, { useState, useContext } from "react";

import classes from "./Cart.module.css";

import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart(props) {
  const [isCheckout, setIsCheckout] = useState(false);
  // 제출 진행상태와 제출된 상태 여부에 따라 사용자에게 메시지 피드백 줄 상태 설정
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  // 전체 수량값 가져오기(from 컨텍스트)
  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  // 장바구니 아이템 존재 여부 판단(from 컨택스트)
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.deleteItem(id);
  };
  const cartItemAddHandler = (item) => {
    // 항목이 추가될때마다 그 항목의 수량은 1개씩 늘어나도록 고정되어야 하기에 item객체의 속성중 amount값은 1로 고정된값으로 새로운 객체를 만들어 addItem에 전달해줘야 추가 버튼을 클릭시 수량이 2배씩 커져나가는 버그를 방지할 수 있다.
    cartCtx.addItem({ ...item, amount: 1 });
  };
  // 주문서 오픈
  const orderHandler = () => {
    setIsCheckout(true);
  };

  // 최종 서버로 양식 제출
  const submitOrderHandler = async (userDataObj) => {
    setIsSubmitting(true);

    const response = await fetch(
      "https://food-ordering-app-2401d-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "applycation/json",
        },
        body: JSON.stringify({
          user: userDataObj, // 사용자 정보 및 주소 전달
          orderedItems: cartCtx.items, // 사용자가 선택한 장바구니 항목들 전달
        }),
      }
    );

    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart(); // 서버 제출 완료후 기존 장바구니 비우기
  };

  // 조건부 렌더링 변수화
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

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCartClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onCartClose} onSubmit={submitOrderHandler} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <>
      <p>Successfully sent the your order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onCartClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onCartClose={props.onCartClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
}

export default Cart;
