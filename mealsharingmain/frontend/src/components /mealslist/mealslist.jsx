import React, { useEffect, useState } from "react";
import Meal from "../Meal/Meal";
import "./MealsList.css"; 

const MealsList = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch("http://localhost:3300/api/meals");
        const data = await response.json();
        setMeals(data.meals);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, []);

  return (
    <div className="meals-grid">
      {meals.length > 0 ? (
        meals.map((meal) => <Meal key={meal.id} meal={meal} />)
      ) : (
        <p>No meals available.</p>
      )}
    </div>
  );
};

export default MealsList;
