import  React, {useEffect, useState} from "react";


const MealsList = () => {
    const[ meals, setMeals] = useState([]);

    useEffect(() => {
        const fetchMeals = async () => {
          try {
            const response = await fetch('http://localhost:3306/api/meals');  
            const data = await response.json(); 
            setMeals(data.meals);  
          } catch (error) {
            console.error('Error fetching meals:', error);
          }
        };
    
        fetchMeals();  
      }, []);
    
      return (
        <div>
          {meals.length > 0 ? (
            meals.map((meal) => (
              <div key={meal.id}>
                <h3>{meal.title}</h3>
                <p>{meal.description}</p>
                <p>${meal.price}</p>
              </div>
            ))
          ) : (
            <p>No meals available.</p>
          )}
        </div>
      );
    }
    
    export default MealsList;