import { useState, useContext, useRef } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
import CartContext from "../../../store/cart-context";

// useRef를 일반 요소가 아닌 사용자정의 컴포넌트에 사용하기 위해선 해당 컴포넌트에 가서  React.forwards Ref 작업을 해주어야 한다.
function MealItemForm(props) {
  const inputRef = useRef();
  const [isAmountValid, setIsAmountValid] = useState(true);

  // 입력받은 수량(amount)을 전송하는 함수
  const submitHandler = (event) => {
    event.preventDefault();
    // 입력을 받는 인풋 DOM요소에 ref로 직접접근하여 값 받기
    const enteredAmount = inputRef.current.value;
    const enteredAmountNumber = Number(inputRef.current.value);

    // 유효성 검사로직(입력이 안되어있거나 최소,최대를 넘었을때 안보내지게!) -> 예외처리
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setIsAmountValid(false);
      return;
    }

    // 추가하려는 장바구니 item은 입력받은 수량 외에 다른 값들이 더 필요하기 때문인데 이 컴포넌트에선 수량만 관리해주고 있기 때문이다. 따라서 입력인 amount을 받기만 위해서 만들어진 props함수를 호출해준다.
    props.onAddtoCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={inputRef}
        label="Amount"
        input={{
          id: `amount_ ${props.id}`,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
        style={{ marginBottom: "0.75rem" }}
      />
      <button>+ Add</button>
      {!isAmountValid && <p>Please enter a valid amount(1 ~ 5)</p>}
    </form>
  );
}

export default MealItemForm;
