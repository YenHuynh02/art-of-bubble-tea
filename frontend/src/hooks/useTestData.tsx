import { KFTeaDrink } from '@backend/types/kf';
import { useState, useMemo, useEffect } from 'react';
import { debounce } from './useDebounce';
import { getRandomDrinks } from '@backend/controllers/logic';

// Add id to KFTea
interface CustomKFTea extends KFTeaDrink {
	id: number;
}

export default function useTestData({
	recipesCount,
	requestShuffle,
	resetOriginalOrder,
}: {
	recipesCount?: number;
	requestShuffle: boolean;
	resetOriginalOrder: boolean;
}) {
	const [search, setSearch] = useState<string>('');
	const [drinks, setDrinks] = useState<CustomKFTea[]>(getRandomDrinks(recipesCount || 10));

	const updateSearch = debounce((value: string) => {
		setSearch((prev: any) => value);
	}, 1000);

	// const recipes: any[] = KF_TEA_LIST;

	useEffect(() => {
		const getDrinks = getRandomDrinks(recipesCount || 10);

		if (requestShuffle) {
			setDrinks((prev) => getDrinks);
		}
		if (resetOriginalOrder) {
			setDrinks((prev) => getDrinks.sort((a, b) => a.id - b.id));
		}

		setDrinks((prev) => getDrinks);
	}, [recipesCount, requestShuffle, resetOriginalOrder]);

	const filteredRecipes: CustomKFTea[] = useMemo(() => {
		return drinks.filter((recipe: KFTeaDrink) => {
			return recipe.name.toLowerCase().includes(search.toLowerCase());
		});
	}, [search, drinks]);

	return {
		updateSearch,
		recipes: filteredRecipes,
	};
}
