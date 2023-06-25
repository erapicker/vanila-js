/* eslint-disable complexity */

/* eslint-disable max-lines-per-function */
import styles from './Days.module.scss';

import type { Component } from 'solid-js';
import { Index, Match, Switch, createMemo } from 'solid-js';

import { useConfig } from '~lib/context/ConfigProvider';

import type { BodyProps } from './Days.type';

export const Body: Component<BodyProps> = (props) => {
	const {
		locale,
		isHighlightWeekends,
		isShowOffsetMonth,
		isHighlightCurrentDay,
		selectedDate,
		setSelectedDate,
		mode,
		minDate,
		maxDate,
		disabledDates,
	} = useConfig();

	/**
	 * A memoized function that returns an object for main class names.
	 **/
	const mainClassNames = createMemo(() => ({
		'body-container': true,
		[styles.body]: true,
	}));

	/**
	 * Handles the selection of a day in a calendar component based on the mode (single, range, or multiple) and updates the selected date accordingly.
	 */
	const handleSelectedDay = (millisecondDay: number) => {
		if (mode() === 'single') {
			return setSelectedDate((prev) => {
				if (prev.includes(millisecondDay)) return [];

				return [millisecondDay];
			});
		}

		if (mode() === 'range') {
			return setSelectedDate((prev) => {
				if (prev.includes(millisecondDay)) return prev.filter((item) => item !== millisecondDay);

				if (prev.length === 2) {
					const [start, end] = [prev[0], prev[1]];
					const isInSelectedRange = start >= millisecondDay || end <= millisecondDay;

					if (isInSelectedRange) return [millisecondDay];

					const diffToStart = millisecondDay - start;
					const diffToEnd = end - millisecondDay;
					const isNearToStart = diffToStart < diffToEnd;

					if (isNearToStart) {
						return [millisecondDay, end];
					}

					return [start, millisecondDay];
				}

				// eslint-disable-next-line fp/no-mutating-methods
				return [...prev, millisecondDay].sort((a, b) => a - b);
			});
		}

		return setSelectedDate((prev) => {
			if (prev.includes(millisecondDay)) return prev.filter((item) => item !== millisecondDay);

			return [...prev, millisecondDay];
		});
	};

	/**
	 * Finds the nearest disabled dates in range mode.
	 */
	const findNearestDisabledDatesInRangeMode = createMemo(() => {
		if (mode() !== 'range' || selectedDate().length !== 1 || disabledDates().length === 0) return [];

		if (disabledDates().length <= 2) {
			return [disabledDates()[0], disabledDates()[disabledDates().length - 1]];
		}

		const startSelected = selectedDate()[0];

		const startDisabledDates = disabledDates().reduce(
			(previousValue: { number: number; index: number }, currentNumber, index) => {
				return Math.abs(currentNumber - startSelected) < Math.abs(previousValue.number - startSelected)
					? { number: currentNumber, index }
					: previousValue;
			},
			{ number: 0, index: 0 }
		);

		const endDisabledDates = disabledDates()[startDisabledDates.index + 1] || startDisabledDates.number;

		return [startDisabledDates.number, endDisabledDates];
	});

	return (
		<div classList={mainClassNames()}>
			<Index each={props.days}>
				{(item, dayIndex) => {
					const calculateWeekend = () => {
						const { weekends, startDay } = locale();

						if (!isHighlightWeekends || !Array.isArray(weekends) || weekends.length === 0) return false;

						return locale().weekends.includes((dayIndex + startDay) % 7);
					};

					/**
					 * `checkDisabledDaysInRangeMode` is a memoized function that checks if a day item should be disabled based on the `current selected date`, `disabled dates`, and `mode`.
					 * It returns a boolean value indicating whether the day item should be disabled or not.
					 */
					const checkDisabledDaysInRangeMode = createMemo(() => {
						if (findNearestDisabledDatesInRangeMode().length === 0) return false;

						const startSelected = selectedDate()[0];

						const [minDisabledDates, maxDisabledDates] = findNearestDisabledDatesInRangeMode();

						const millisecond = item().millisecond;

						if (
							(minDisabledDates > startSelected && millisecond > minDisabledDates) ||
							(minDisabledDates < startSelected && millisecond < minDisabledDates)
						)
							return true;

						if (
							(millisecond < maxDisabledDates && maxDisabledDates < startSelected) ||
							(millisecond > maxDisabledDates && maxDisabledDates > startSelected)
						) {
							return true;
						}

						return false;
					});

					/**
					 * A memoized function that returns an object for day item class names.
					 **/
					const dayClassNames = createMemo(() => {
						const millisecond = item().millisecond;

						const handleInRangeClass = () => {
							if (selectedDate().length < 2 || mode() !== 'range') return false;

							const startDate = selectedDate()[0];
							const endDate = selectedDate()[selectedDate().length - 1];

							return millisecond > startDate && millisecond < endDate;
						};

						return {
							'day-item': true,
							'offset-item': item().isOffset,
							'weekend-item': calculateWeekend(),
							'today-item': item().isToday && isHighlightCurrentDay,
							'selected': selectedDate().includes(millisecond),
							'in-range': handleInRangeClass(),
							'disabled':
								(!!minDate() && item().millisecond < minDate()) ||
								(!!maxDate() && item().millisecond > maxDate()) ||
								disabledDates().includes(item().millisecond) ||
								checkDisabledDaysInRangeMode(),
							'manual-disabled': disabledDates().includes(item().millisecond),
							'holiday-item': locale().holidayDates.includes(item().millisecond),
						};
					});

					return (
						<>
							<Switch
								fallback={
									<button classList={dayClassNames()} disabled={item().isOffset} onClick={() => handleSelectedDay(item().millisecond)}>
										{item().day}
									</button>
								}
							>
								<Match when={checkDisabledDaysInRangeMode()}>
									<span classList={dayClassNames()}>{item().day}</span>
								</Match>

								<Match when={!!minDate() && item().millisecond < minDate()}>
									<span classList={dayClassNames()}>{item().day}</span>
								</Match>

								<Match when={!!maxDate() && item().millisecond > maxDate()}>
									<span classList={dayClassNames()}>{item().day}</span>
								</Match>

								<Match when={disabledDates().includes(item().millisecond)}>
									<span classList={dayClassNames()}>{item().day}</span>
								</Match>

								<Match when={!isShowOffsetMonth && item().isOffset}>
									<span classList={dayClassNames()} />
								</Match>

								<Match when={isShowOffsetMonth && item().isOffset}>
									<span classList={dayClassNames()}>{item().day}</span>
								</Match>
							</Switch>
						</>
					);
				}}
			</Index>
		</div>
	);
};
