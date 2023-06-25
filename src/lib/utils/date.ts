import type IPersianDate from 'persian-date';
import PersianDate from 'persian-date';

import type { CalculateDaysInMonth, CalendarType, DateType } from '~lib/types';

import { rangeNumber } from './others';

/**
 * It converts a date to a specific calendar and locale
 *
 * @param {DateType | IPersianDate} date - The date you want to convert.
 * @param {CalendarType} calendar - CalendarType
 * @returns A new instance of PersianDate
 */
export const dateFn = (date: DateType | IPersianDate, calendar: CalendarType): IPersianDate => {
	return new PersianDate(date)
		.toCalendar(calendar)
		.toLeapYearMode('astronomical')
		.toLocale('en')
		.hour(1) // For Prevent daylight saving time issue (DST).
		.minute(0)
		.second(0)
		.millisecond(0);
};

/**
 * It returns an object containing information about the current month, the previous month, and the next
 * month
 * @param {IPersianDate} date - IPersianDate
 * @returns An object with three properties: current, prev, and next.
 */
const monthInfo = (date: IPersianDate) => {
	const start = date.startOf('month').hour(1);
	const end = date.endOf('month').hour(1);

	const startWeek = +start.format('d');
	const endWeek = +end.format('d');

	const prevMonth = start.clone().add('month', -1);
	const nextMonth = start.clone().add('month', 1);

	return {
		current: {
			year: start.year(),
			month: {
				index: +start.format('M') - 1,
				number: +start.format('M'),
			},
			start: start.date(),
			end: end.date(),
			weekDay: {
				start: {
					index: startWeek - 1,
					number: startWeek,
				},
				end: {
					index: endWeek - 1,
					number: endWeek,
				},
			},
			millisecond: start.valueOf(),
		},
		prev: {
			year: prevMonth.year(),
			month: {
				index: +prevMonth.format('M') - 1,
				number: +prevMonth.format('M'),
			},
			start: prevMonth.startOf('month').date(),
			end: prevMonth.endOf('month').date(),
			millisecond: prevMonth.valueOf(),
		},
		next: {
			year: nextMonth.year(),
			month: {
				index: +nextMonth.format('M') - 1,
				number: +nextMonth.format('M'),
			},
			start: nextMonth.startOf('month').date(),
			end: nextMonth.endOf('month').date(),
			millisecond: nextMonth.valueOf(),
		},
	};
};

/**
 * It takes a date and a calendar type and returns an object with the days of the month, the current month and the current year (Determines how many days are in a month)
 *
 * @param {IPersianDate} date - IPersianDate - The date you want to get the month info for.
 * @param {'gregorian' | 'persian'} calendar - 'gregorian' | 'persian'
 * @returns An object with three properties: days, currentMonth, and currentYear.
 */
export const calculateDaysInMonth = (date: IPersianDate, calendar: 'gregorian' | 'persian'): CalculateDaysInMonth => {
	const { current, prev, next } = monthInfo(date);
	const today = dateFn(new Date(), calendar);

	const startWeekDay = current.weekDay.start.index;
	const endWeekDay = current.weekDay.end.index;

	const OneDayInMs = 1 * 24 * 60 * 60 * 1000;

	const currentDays = rangeNumber(current.start, current.end).map((day) => {
		return {
			day,
			month: {
				index: current.month.index,
				number: current.month.number,
			},
			year: current.year,
			isOffset: false,
			isToday: current.year === today.year() && current.month.number === today.month() && day === today.date(),
			millisecond: current.millisecond + OneDayInMs * (day - 1),
		};
	});

	const firstOffset = rangeNumber(prev.start, prev.end).map((day) => {
		return {
			day,
			month: {
				index: prev.month.index,
				number: prev.month.number,
			},
			year: prev.year,
			isOffset: true,
			isToday: false,
			millisecond: prev.millisecond + OneDayInMs * (day - 1),
		};
	});

	const endOffset = rangeNumber(next.start, next.end).map((day) => {
		return {
			day,
			month: {
				index: next.month.index,
				number: next.month.number,
			},
			year: next.year,
			isOffset: true,
			isToday: false,
			millisecond: next.millisecond + OneDayInMs * (day - 1),
		};
	});

	return {
		days: { firstOffset, currentDays, endOffset },
		currentWeekday: {
			start: startWeekDay,
			end: endWeekDay,
		},
		currentMonth: current.month,
		currentYear: current.year,
	};
};

/**
 * Date validation
 * It returns true if the value is a valid date, false otherwise
 * @param {Date | number | string} value - Date | number | string
 */
export const isValidateDate = (value: Date | number | string) => {
	if (value instanceof Date && value.toString() !== 'Invalid Date') return true;

	if (new Date(value).toString() !== 'Invalid Date') return true;

	return false;
};
