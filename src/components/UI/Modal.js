import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

// React portal로 오버레이 적용시키기
const BackDrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onCartClose}></div>;
};

const ModalView = (props) => {
  return (
    <div className={classes.modal}>
      <div>{props.children}</div>
    </div>
  );
};

function Modal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onCartClose={props.onCartClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalView>{props.children}</ModalView>,
        document.getElementById("overlay-root")
      )}
    </>
  );
}

export default Modal;
