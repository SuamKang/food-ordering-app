import React from "react";

import classes from "./Header.module.css";

import mealsImage from "../../assets/meals.jpg";

import HeaderButton from "./HeaderButton";

function Header(props) {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderButton onCartOpen={props.onCartOpen} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="delicious food" />
      </div>
    </>
  );
}

export default Header;
