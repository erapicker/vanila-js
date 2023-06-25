import type { HandleChangeMode } from '~lib/types';

/**
 * @description
 * Creates an array of numbers progressing from start to end (including start & including end)
 */
export const rangeNumber = (start: number, end: number): number[] => {
	if (start - end === 0) {
		return [start];
	}

	const numbers = rangeNumber(start, end - 1);

	return [...numbers, end];
};

/**
 * The function is a bit long, but it's not too complicated. It's just a bunch of if statements
 *  - If the initial view is days and the possible view is months, then change the view to months.
 *  - If the initial view is days and the possible view is years, then change the view to years.
 *  - If the initial view is months and the possible view is years, then change the view to years.
 *  - If the initial view is months and the possible view is days, then change the view to days.
 *  - Otherwise, view the months.
 *
 * @returns A function that takes an object with the following properties:
 * 	- initialView: string
 * 	- possibleView: string[]
 * 	- handler: (view: string) => void
 */
export const handleChangeMode = ({ initialView, possibleView, handler }: HandleChangeMode) => {
	if (possibleView.length === 1) return;

	if (initialView === 'days' && possibleView.includes('months')) {
		handler('months');
		return;
	}

	if (initialView === 'days' && possibleView.includes('years')) {
		handler('years');
		return;
	}

	if (initialView === 'months' && possibleView.includes('years')) {
		handler('years');
		return;
	}

	if (initialView === 'months' && possibleView.includes('days')) {
		handler('days');
		return;
	}

	if (initialView === 'years' && possibleView.includes('days')) {
		handler('days');
		return;
	}

	handler('months');
};
