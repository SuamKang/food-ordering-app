import React, { useContext, useEffect, useState } from "react";

import classes from "./HeaderButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

function HeaderButton(props) {
  const cartCtx = useContext(CartContext);
  const [isBtnHighlighted, setIsBtnHighlighted] = useState(false); // 버튼클래스 에니메이션 여부를 위한 상태

  const { items } = cartCtx;

  useEffect(() => {
    console.log("이펙트 실행");
    // 장바구니에 있는 항목이 하나 이상있는경우에만 에니메이션 효과를 주고싶기때문에 길이가 0일땐 바꾸지않고 그대로 반환해준다.
    if (items.length === 0) {
      return;
    }
    setIsBtnHighlighted(true);
    // items가 변경될때 위 사이드 이펙트가 살행이 되며, 해당 이펙트 로직인 에니메이션 로직의 시간이 지나고 나면(300ms) 타이머 딜레이를 동일하게 설정해 다시 상태를 false로 변경시켜주게 되면, 다시금 렌더링되어 의존성이 변경될때 초기값과 유사한상태로 변경되는 시점을 설정할 수 있게 된다.
    const timer = setTimeout(() => {
      setIsBtnHighlighted(false);
      // 사실 클린업 함수는 해당 컴포넌트가 더이상 화면에 나타나지않고(언마운트)메모리에서 완전히 제거되는 시점에 동작하기 위한 설정인데, 이는 보통 페이지를 이동하거나 라우팅되는경우, 조건부로 렌더링이 되는경우에 설정하게 된다. 여기서는 타이머가 만료되기전에 다시설정될 수도 있기 때문에(사용자가 추가 버튼을 매우빠르게 추가하게되는 때) 확실이 새타이머를 설정하고 이전 타이머는 삭제되도록 하는게 좋다. 이렇게 하게되면 더이상 해당 컴포넌트가 필요하지 않을땐 해당 컴포넌트를 메모리에서 제거하여 메모리 누수를방지하고 앱의 성능을 개선할 수 있게 된다.
      return () => {
        clearTimeout(timer);
      };
    }, 300);
  }, [items]);

  // 장바구니에 담긴 items 항목들의 총 합(배열원소들의 어떠한 값을 구하는 고차함수 reduce사용)
  const numberOfCartItems = items.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);

  // 장바구니의 수량 및 항목의 상태가 업데이트(추가,삭제)될때마다 header의 버튼에서 보여주는 수량부분에서 bump 에니메이션 효과를 주기위한 버튼클래스 변수를 설정해준다.
  const btnClasses = `${classes.button} ${isBtnHighlighted && classes.bump}`;

  return (
    <button className={btnClasses} onClick={props.onCartOpen}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}

export default HeaderButton;
