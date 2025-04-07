import React from "react";
import MealsList from "/mealsList/mealsList.jsx"; 

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Meal Sharing App</h1>
      <MealsList /> {MealsList}
    </div>
  );
};

export default HomePage;
