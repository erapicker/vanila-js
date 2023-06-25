/**
 * It creates a wrapper element for the EraPicker library, and inserts it into the DOM
 *
 * @param {HTMLElement} target - HTMLElement - The target element that the calendar will be appended to.
 * @returns A function that takes a target as an argument and returns a div element.
 */
export const createMainWrapper = (target: HTMLElement): HTMLDivElement => {
	const mainElement = document.createElement('div');

	if (!target.parentElement || target instanceof HTMLBodyElement || target instanceof HTMLBaseElement) {
		document.body.appendChild(mainElement);
	} else {
		target.parentElement.insertBefore(mainElement, target.nextSibling);
	}

	return mainElement;
};
