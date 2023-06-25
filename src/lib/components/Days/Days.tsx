import styles from './Days.module.scss';

import { type Component, Index, createMemo } from 'solid-js';

import { useConfig } from '~lib/context/ConfigProvider';
import { calculateDaysInMonth, dateFn } from '~lib/utils';

import { Body } from './Days.body';
import { Header } from './Days.header';

export const Days: Component = () => {
	const { calendar, setCalendar, setDate, date, numberOfMonths, locale } = useConfig();

	/**
	 * A memoized function that returns an object with class names.
	 **/
	const classNames = createMemo(() => ({
		'days-picker': true,
		[styles.daysPicker]: true,
	}));

	return (
		<div classList={classNames()}>
			<Index each={numberOfMonths()}>
				{(_item, index) => {
					const calculateDays = createMemo(() => {
						const { weekdays, startDay } = locale();
						const newCalendar = calendar();
						const cloneDate = date().clone();
						const newDate = index === 0 ? dateFn(cloneDate, newCalendar) : dateFn(cloneDate.add('month', index), newCalendar);

						const {
							currentMonth,
							currentYear,
							currentWeekday,
							days: { firstOffset: _firstOffset, currentDays, endOffset: _endOffset },
						} = calculateDaysInMonth(newDate, newCalendar);

						// calculate days by start day
						const startNumber =
							currentWeekday.start - startDay >= 0 ? currentWeekday.start - startDay : currentWeekday.start - startDay + weekdays.length;

						const firstOffset = _firstOffset.slice(_firstOffset.length - startNumber);

						const length = firstOffset.length + currentDays.length;

						const endOffset = length > 35 ? _endOffset.slice(0, 42 - length) : length <= 35 ? _endOffset.slice(0, 35 - length) : [];

						return { currentMonth, currentYear, days: [...firstOffset, ...currentDays, ...endOffset] };
					});

					return (
						<div class={`item${index + 1}`}>
							<Header year={calculateDays().currentYear} month={calculateDays().currentMonth.index} />
							<Body days={calculateDays().days} />
						</div>
					);
				}}
			</Index>

			<button
				onClick={() => {
					setDate(date().clone().add('month', -1));
				}}
			>
				prev
			</button>
			<button onClick={() => setCalendar(calendar() === 'gregorian' ? 'persian' : 'gregorian')}>change</button>
			<button onClick={() => setDate(date().clone().add('month', 1))}>next</button>
		</div>
	);
};
