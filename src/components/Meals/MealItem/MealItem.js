import React, { useContext } from "react";

import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
import CartContext from "../../../store/cart-context";

function MealItem(props) {
  // 이 컴포넌트는 주문 항목의 내용을 다 렌더링 되는 컴포넌트이기에 렌더링 될때 새롭게 업데이트된 항목을 구현해줄 수 있다. 따라서 ContextAPI를 여기에 활용하여 설정했던 전역 cart상태를 불러와서 적용해준다.
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (newAmount) => {
    const newItem = {
      id: props.id,
      name: props.name,
      description: props.description,
      price: props.price,
      amount: newAmount,
    };

    cartCtx.addItem(newItem);
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>${props.price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddtoCart={addToCartHandler} />
      </div>
    </li>
  );
}

export default MealItem;
