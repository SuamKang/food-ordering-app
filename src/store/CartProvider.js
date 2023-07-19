import { useReducer } from "react";
import CartContext from "./cart-context";

// 초기 장바구니 상태
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// 장바구니 리듀서 함수
// item = {id, name, amount, price}
const cartReducer = (state, action) => {
  if (action.type === "ADD_CART") {
    // 장바구니에 추가되는 총 수량(중복된 항목 여부 관계없음)
    const updatedTotalAmount =
      state.totalAmount + action.payload.price * action.payload.amount;

    // 하지만 항목 전체가 바뀌게 될땐 업데이트 하기전에 기존에 추가된 항목이 있는지 여부를 확인해주어야 같은 항목이 또 추가되지 않고 수량만 늘어나게 보여줄 수 있게 된다.
    // 현재 배열에서 보고있는 항목이 전달된 액션으로 추가되는 항목과 동일한 id를 가지는 경우 해당항목이 존재한다고 판단하자. 그럼 그 위치의 인덱스를 반환해준다.
    const existingCartItemIdx = state.items.findIndex(
      (item) => item.id === action.payload.id
    );
    const existingCartItem = state.items[existingCartItemIdx]; // 중복된 경우에만 작동함, 그러나 중복이 아니다면 접근하게 됐을때 null값이 담김

    // 새롭게 정의할 항목 배열 선언
    let updatedItems;
    // 항목이 중복된 경우라면, 업데이트 되는 항목 1개(updateItem)는 기존 항목에 수량(amount)은 기존에 액션값을 추가로 해준다
    if (existingCartItem) {
      // 항목1개 - 수량만 액션으로 추가 되는 로직으로 구성
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.payload.amount,
      };
      // 전체항목 - 이전 객체를 복사한 새로운 배열
      updatedItems = [...state.items];
      updatedItems[existingCartItemIdx] = updatedItem; // 재할당
    } else {
      // 중복 X 경우 그냥 새항목이 추가되는것이고 항목이 새롭게 복사되어 넣어지는걸로 해결
      updatedItems = [...state.items, action.payload];
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE_CART") {
    // 우선 입력받은 액션의 항목과 기존 항목이 일치하는 것의 위치를 찾아 그 항목을 불러온다.

    // 해당 항목 위치
    const existingCartItemIdx = state.items.findIndex(
      (item) => item.id === action.payload
    );

    // 해당 항목
    const existingCartItem = state.items[existingCartItemIdx];

    // 항목들의 전체 수량 -> 항목을 배열에서 완전히 삭제되거나 혹은 해당 항목의 수량이 줄어들거나 둘중 어떤 경우든 타입 항목 하나만 삭제가 되며, 따라서 총액도 확실히 삭제된 항목 하나의 가격만큼 감소한다.
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    let updatedItems;
    // 어떤 항목을 제거후 업데이트 하는경우는 먼저 첫째로 아이템의 수량이 이미 있는경우(amount > 1)에는 수량을 1씩 줄여나가야 하고 수량이 1일때는 해당 항목을 완전히 삭제해야한다.
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.payload);
    } else {
      // 수량이 1보다 크게 있는 항목을 remove할땐 해당 항목을 다시 재정의를 해줘야하며 정의할때 해당항목의 amount를 1빼주어 정의한다.
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };

      updatedItems = [...state.items]; // by 불변성
      updatedItems[existingCartItemIdx] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

// 장바구니 컨텍스트의 데이터를 관리하고 이를 제공해주려는 프로바이더 컴포넌트 함수생성
const CartProvider = (props) => {
  // 항목이 장바구니 안에 이미 있는지 없는지 등 상태로직이 다양하고 복잡하기때문에 useState대신 useReducer를 사용

  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

  const addItemHandler = (item) => {
    dispatchCart({ type: "ADD_CART", payload: item });
  };

  const deleteItemHandler = (id) => {
    dispatchCart({ type: "REMOVE_CART", payload: id });
  };

  // 컨텍스트 데이터 관리-> useReducer로 관리되는 state를 적용해주기
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    deleteItem: deleteItemHandler,
  };

  // provider에서는 항상 value속성값으로 전역상태를 전달해주자
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
