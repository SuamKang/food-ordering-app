import React from "react";

import classes from "./Input.module.css";

// 요소에 전개연산자를 적용할 수 있는 방법은
// input요소에서와 같이 Input컴포넌트에서 받는 props에 해당하는 속성들에 접근을 파라미터로 할 수 있다.
// 이 컴포넌트를 사용하는 컴포넌트에서 재사용할때 props로 전달하는 속성이 많아질수 있다. 예를 들어 input tpye이 number이면 min,max,step,defaltValue등등 많은 속성값을 전달 받을수 있기때문에
// 위 전개 연산자를 사용하게 되면 더욱 편리하다.

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input} style={props.style}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
