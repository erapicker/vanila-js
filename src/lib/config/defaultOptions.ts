import type { PartialOptions } from '~lib/types';

export const defaultOptions: PartialOptions = {
	classNames: {
		brand: 'eraPicker__',
		calendar: '',
	},
	calendar: 'persian',
	isHighlightWeekends: true,
	isShowOffsetMonth: true,
	isHighlightCurrentDay: true,
	locale: {
		persian: {
			weekdays: ['شن', 'یک', 'دو', 'سه', 'چه', 'پن', 'جم'],
			months: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
			weekends: [6],
			startDay: 0,
			holidayDates: [],
		},
		gregorian: {
			weekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
			months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			weekends: [0, 6],
			startDay: 0,
			holidayDates: [],
		},
	},
	icons: {
		nextArrow: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>`,
		prevArrow: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>`,
	},
	initialViewMode: 'days',
	possibleViewMode: ['days', 'months', 'years'],
	numberOfMonths: 1,
	mode: 'single',
	initialSelectedDate: [],
	isShowArrowsInDaysMode: true,
	isShowArrowsInMonthsMode: true,
	isShowArrowsInYearsMode: true,
	isShowWeekdays: true,
	isShowHeader: true,
	disabledDates: [],
};
