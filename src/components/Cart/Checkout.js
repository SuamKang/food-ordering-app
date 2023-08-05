// 장바구니에 있는 항목들을 가지고 사용자 정보를 담아 최종적으로 주문하기위해 서버로 전송할 양식 컴포넌트

import { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

function Checkout(props) {
  // 오류 메시지 피드백을 위한 상태
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    address: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();

    // ref로 DOM접근하여 값 추출
    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    // 각 input양식의 유효성 검증
    const nameIsValid = !isEmpty(enteredName);

    const addressIsValid = !isEmpty(enteredAddress);
    const cityIsValid = !isEmpty(enteredCity);
    const postalCodeIsValid = isFiveChars(enteredPostal);

    setFormInputValidity({
      name: nameIsValid,
      address: addressIsValid,
      city: cityIsValid,
      postalCode: postalCodeIsValid,
    });

    const formIsValid =
      nameIsValid && addressIsValid && cityIsValid && postalCodeIsValid;

    if (!formIsValid) return;

    // submit cart data
    props.onSubmit({
      name: enteredName,
      address: enteredAddress,
      postalCode: enteredPostal,
      city: enteredCity,
    });
  };

  // css 에러 스타일
  const nameControlClasses = formInputValidity.name
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;

  const addressControlClasses = formInputValidity.address
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;

  const postalCodeControlClasses = formInputValidity.postalCode
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;

  const cityControlClasses = formInputValidity.city
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && (
          <p className={classes["error-text"]}>Please enter a valid name.</p>
        )}
      </div>
      <div className={addressControlClasses}>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" ref={addressInputRef} />
        {!formInputValidity.address && (
          <p className={classes["error-text"]}>Please enter a valid address.</p>
        )}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputValidity.postalCode && (
          <p className={classes["error-text"]}>
            Please enter a valid postalCode.
          </p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && (
          <p className={classes["error-text"]}>Please enter a valid city.</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
}

export default Checkout;
