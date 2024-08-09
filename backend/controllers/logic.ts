/**
 * logic.ts file implement the logic for generating random drink orders.
 */
import {
  toppings,
  milks,
  sweetnessLevels,
  iceLevels,
  cupSizes,
  drinksWithMilk,
  allDrinks,
} from '../db/data/kungfu/order-options';

// 2. Kien
//
// Kien chỉnh sửa lại file queries/order.ts thành controller/logic.ts để sử dụng dữ liệu từ data/drinkData.ts.
// Mục đích để tạo ra 1 order ngẫu nhiên từ 3 methods: getRandomItem(), getRandomToppings(), generateRandomDrink()

/**
 * getRandomItem() is a utility function used to retrieve a random item from an array of strings.
 * @param arr An array of strings from which to select a random item.(data from drinkData.ts)
 * @returns A random item from the provided array.
 */
export const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

/**
 * getRandomToppings() is a function used to generate a random selection of toppings for a drink.
 * Toppings are selected from the 'toppings' array in 'drinkData.ts'.
 * numToppings determines the number of toppings to be selected, ranging from 1 to 10.
 * @returns An array of randomly selected unique toppings.
 */
export const getRandomToppings = () => {
	const numToppings = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10 (defines the number of toppings)
	// const uniqueToppings = new Set<string>(); // Use a Set<string>() to ensure no duplicate toppings

	// while uniqueToppings size is less than numToppings, keep adding a random topping until it reaches numToppings
	// while (uniqueToppings.size < numToppings) {
	// 	uniqueToppings.add(getRandomItem(toppings));
	// }

	// return Array.from(uniqueToppings);

	return toppings.sort(() => 0.5 - Math.random()).slice(0, numToppings)
		.map((topping) => topping.charAt(0) + topping.slice(1));
};

/**
 * Generate a random drink order containing the following properties: name, milk, sweetness, ice, cupSize, toppings
 * If the drink contains milk, a random milk type is selected from the 'milks' array in 'drinkData.ts'.
 * If the drink does not contain milk, the milk property is set to undefined or null.
 * @returns A randomly generated drink object.
 */
export const generateRandomDrink = (drinkName: string = '') => {
  const withMilk = drinksWithMilk.includes(drinkName);

  const sweetness = getRandomItem(sweetnessLevels);
  const ice = getRandomItem(iceLevels);
  const cupSize = getRandomItem(cupSizes);
  const toppings = getRandomToppings();

  // Construct the drink object with or without the note based on the condition
  const drinkObject: any = {
    name: drinkName,
    sweetness: sweetness,
    ice: ice,
    cupSize: cupSize,
    toppings: toppings,
    ...(withMilk && { milks: getRandomItem(milks) }),
  };

  return drinkObject;
};

export const getRandomDrinks = (numDrinks: number) => {
  const drinks = [...allDrinks];

  const randomDrinks = drinks
    .sort(() => 0.5 - Math.random())
    .slice(0, numDrinks);

  // Generate a random drink order for each drink name
  const drinkOrders = randomDrinks.map((drink: any, index: number) => {
    return {
      id: index,
      ...generateRandomDrink(drink)
    };
  });

  return drinkOrders;
};
