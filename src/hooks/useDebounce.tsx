import { useState, useEffect } from 'react';

export const useDebounce = (value: string, time: number) => {
	const [debouncedValue, setDebouncedValue] = useState<string>(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, time);

		return () => {
			clearTimeout(handler);
		};
	}, [value, time]);

	return debouncedValue;
};
