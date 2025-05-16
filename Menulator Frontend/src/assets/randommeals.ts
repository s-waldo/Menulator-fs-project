export function makeMenu({breakfast, lunch, dinner}) {
  // destructure the object into three meals

  // for each meal, select 7 random recipes
  const breakfastMeals = randomMeals(breakfast)
  const lunchMeals = randomMeals(lunch)
  const dinnerMeals = randomMeals(dinner)
 
  // merge meals into menu list
  let menu = [];
  for (let i = 0; i < 7; i++) {
    menu.push({id: i, breakfast: breakfastMeals[i], lunch: lunchMeals[i], dinner: dinnerMeals[i]})
  }
  // return menu list
  return menu
}

export function randomMeals(meal) {
  const mealLen = meal.length
  let mealList = []
  // select 7 random recipes
  for (let i = 0; i < 7; i++) {
    let tempMeal = meal[Math.floor(Math.random() * mealLen)]
    // if meal has less than 7 recipes, ok to use twice.
    if (mealLen <= 7) {
      mealList.push(tempMeal)
      continue
    }
    // only keep recipes if not already in menu
    if (mealList.includes(tempMeal)) {
      i--;
    } else {
      mealList.push(tempMeal);
    }
  }

  return mealList
}