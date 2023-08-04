import React, { useState, useEffect } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

import classes from "./AvailableMeals.module.css";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

function AvailableMeals(props) {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // http get
    const fetchGetRequest = async () => {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        "https://food-ordering-app-2401d-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log(data); // {m1:{...}, m2:{...}, m3:{...}, m4:{...}}

      let loadedMeals = [];

      for (let key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };
    // fetchGetRequest는 비동기 함수 -> 항상 promise 리턴 -> 오류를 가져오게 된다면 반환되는 promise객체가 거부된다. 따라서 오류에 대해서 try/catch처럼 외부에서 래핑하여 다룰 수 없고, promise내부 반환되는 메소드(.catch())를 사용해서 오류를 잡아주는것이 좋을것 같다.

    fetchGetRequest().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  // elary return
  if (isLoading) {
    return (
      <section className={classes["meals-loading"]}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes["meals-error"]}>
        <p>{error}</p>
      </section>
    );
  }

  let content;
  if (meals.length > 0) {
    content = meals.map((meal) => (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ));
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{content}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
