/* eslint-disable solid/no-innerhtml */
import styles from './ArrowsIcons.module.scss';

import { type Component, Match, Switch, createMemo } from 'solid-js';

import { useConfig } from '~lib/context/ConfigProvider';

export const ArrowsIcons: Component = () => {
	const {
		icons,
		setDate,
		date,
		calendar,
		initialViewMode,
		minDate,
		maxDate,
		isShowArrowsInDaysMode,
		isShowArrowsInMonthsMode,
		isShowArrowsInYearsMode,
		isShowHeader,
	} = useConfig();

	/**
	 * Determine whether the "prev" arrows button should be disabled or not
	 */
	const isDisabledPrevArrows = createMemo(() => {
		const dateInMs = date().clone().startOf('month').hour(1).valueOf();

		if (!minDate()) return false;

		return dateInMs <= minDate();
	});

	/**
	 * Determine whether the "next" arrows button should be disabled or not
	 */
	const isDisabledNextArrows = createMemo(() => {
		const dateInMs = date().clone().endOf('month').hour(1).valueOf();

		if (!maxDate()) return false;

		return dateInMs >= maxDate();
	});

	const prevArrowsClassNames = createMemo(() => {
		return {
			'btn-prev': true,
			'btn-arrows': true,
			'disabled': isDisabledPrevArrows(),
		};
	});

	const nextArrowsClassNames = createMemo(() => {
		return {
			'btn-next': true,
			'btn-arrows': true,
			'disabled': isDisabledNextArrows(),
		};
	});

	const handleNextArrows = () => {
		const viewMode = initialViewMode();
		const cloneDate = date().clone();

		if (viewMode === 'days') {
			setDate(cloneDate.add('month', 1));
		}

		if (viewMode === 'months') {
			setDate(cloneDate.add('year', 1));
		}

		if (viewMode === 'years') {
			setDate(cloneDate.add('year', 16));
		}
	};

	const handlePrevArrows = () => {
		const viewMode = initialViewMode();
		const cloneDate = date().clone();

		if (viewMode === 'days') {
			setDate(cloneDate.add('month', -1));
		}

		if (viewMode === 'months') {
			setDate(cloneDate.add('year', -1));
		}

		if (viewMode === 'years') {
			setDate(cloneDate.add('year', -16));
		}
	};

	const arrowsClassList = createMemo(() => {
		const showArrowsInDaysMode = !isShowArrowsInDaysMode && initialViewMode() === 'days';

		const showArrowsInMonthsMode = !isShowArrowsInMonthsMode && initialViewMode() === 'months';

		const showArrowsInYearsMode = !isShowArrowsInYearsMode && initialViewMode() === 'years';

		return {
			'arrows-wrapper': true,
			[styles.arrows]: true,
			[styles.hiddenArrows]: showArrowsInDaysMode || showArrowsInMonthsMode || showArrowsInYearsMode,
		};
	});

	return (
		<Switch fallback={null}>
			<Match when={calendar() === 'gregorian' && isShowHeader}>
				<div classList={arrowsClassList()}>
					<button type="button" classList={nextArrowsClassNames()} innerHTML={icons.prevArrow} onClick={handleNextArrows} />

					<button type="button" classList={prevArrowsClassNames()} innerHTML={icons.nextArrow} onClick={handlePrevArrows} />
				</div>
			</Match>

			<Match when={calendar() === 'persian' && isShowHeader}>
				<div classList={arrowsClassList()}>
					<button type="button" classList={prevArrowsClassNames()} innerHTML={icons.prevArrow} onClick={handlePrevArrows} />

					<button type="button" classList={nextArrowsClassNames()} innerHTML={icons.nextArrow} onClick={handleNextArrows} />
				</div>
			</Match>
		</Switch>
	);
};
