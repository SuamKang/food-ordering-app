import React, { useState, useEffect } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

import classes from "./AvailableMeals.module.css";
import useFetch from "../../hooks/use-fetch";

function AvailableMeals(props) {
  const [meals, setMeals] = useState([]);

  const { isLoading, error, sendRequest: getFetching } = useFetch();

  useEffect(() => {
    const transformData = (responseData) => {
      let loadedMeals = [];

      for (let key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
    };

    getFetching(
      {
        url: "https://food-ordering-app-2401d-default-rtdb.firebaseio.com/meals.json",
      },
      transformData
    );
  }, [getFetching]);

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
