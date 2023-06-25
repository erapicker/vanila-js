import type { PartialDeep } from './utils';

export type CalendarType = 'gregorian' | 'persian';

export type DateType = Date | number | string;

export type InitialViewMode = 'days' | 'months' | 'years';

export type PossibleViewMode = ('days' | 'months' | 'years')[];

export type ModeType = 'multiple' | 'range' | 'single';

export interface LocaleType {
	weekdays: [string, string, string, string, string, string, string];
	months: [string, string, string, string, string, string, string, string, string, string, string, string];
	weekends: number[];
	startDay: number;
	holidayDates: DateType[];
}

export interface Icons {
	nextArrow: string;
	prevArrow: string;
}
export interface Locale {
	persian: LocaleType;
	gregorian: LocaleType;
}

export interface BaseOptions {
	/**
	 * Set the brand class and calendar class.
	 *  - default: `classNames: {brand: 'eraPicker__', calendar: ''}`
	 */
	classNames: {
		brand: string;
		calendar: string;
	};

	/**
	 * The calendar Type
	 *  - Possible values:
	 *    - `gregorian` — for gregorian calendar.
	 *    - `persian` — for persian/jalali/shamsi calendar.
	 *
	 *  - default: `persian`
	 */
	calendar: CalendarType;

	/**
	 * A boolean value that determines whether to highlight weekends or not.
	 *  - default: `true`
	 */
	isHighlightWeekends: boolean;

	/**
	 * A boolean value that determines whether to show offset month or not.
	 *  - default: `true`
	 */
	isShowOffsetMonth: boolean;

	/**
	 * A boolean value that determines whether to highlight the current day or not.
	 *  - default: `true`
	 **/
	isHighlightCurrentDay: boolean;

	/**
	 * Language of the calendar.
	 *  - default:
	 * ```javascript
	 * {
	 *    persian: {
	 *       weekdays: ['شن', 'یک', 'دو', 'سه', 'چه', 'پن', 'جم'],
	 *       months: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
	 *       weekends: [6], // جمعه
	 *       startDay: 0, // شنبه
	 *       holidaysDate: [],
	 *    },
	 *    gregorian: {
	 *       weekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
	 *       months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	 *        weekends: [0, 6], // Sunday, Saturday
	 *        startDay: 0, // Sunday
	 *        holidaysDate: [],
	 *    }
	 * }
	 * ```
	 */
	locale: Locale;

	/**
	 * "Next" and "Previous" button icon.
	 */
	icons: Icons;

	/**
	 * The minimum possible date to select.
	 *  - default: `undefined`
	 */
	minDate?: DateType;

	/**
	 * The maximum possible date to select.
	 *  - default: `undefined`
	 */
	maxDate?: DateType;

	/**
	 * The initial view of the calendar.
	 *  - Possible values:
	 *    - `days` — displaying days of one month
	 *    - `months` — displaying months of one year
	 *    - `years` — displaying the years
	 *
	 *  - default: `days`
	 */
	initialViewMode: InitialViewMode;

	/**
	 * The minimum possible representation of the calendar.
	 * It is used, for example, when you need to provide only a choice of the month.
	 * The possible values are the same as for `initialViewMode`.
	 *
	 * - default: `['days', 'months', 'years']`
	 */
	possibleViewMode: PossibleViewMode;

	/**
	 * The number of months to show in the calendar.
	 * - Possible values:
	 *  - Minimum number : `1`
	 *  - Maximum number : `12`
	 *
	 * - default: `1`
	 */
	numberOfMonths: number;

	/**
	 * The calendar mode.
	 * - Possible values:
	 *  - `multiple` — the ability to select multiple dates
	 *  - `range` — the ability to select range dates
	 *  - `single` — the ability to select single dates
	 *
	 * - default: `single`
	 */
	mode: ModeType;

	/**
	 * Sets the initial selected date(s).
	 * You can supply an array of Date objects or date strings or numbers.
	 * If an invalid date format is passed, this value will be ignored.
	 *
	 * @Note All dates should be passed as gregorian dates.
	 *
	 * - default: `[]`
	 *
	 * @example
	 * 	`initialSelectedDate: [new Date()]` as Date object
	 * 	`initialSelectedDate: ['2023/04/15']` as date string
	 * 	`initialSelectedDate: [Date.now()]` as number
	 */
	initialSelectedDate: DateType[];

	/**
	 * determine whether the arrows button should be shown in the days component
	 * - default: `true`
	 */
	isShowArrowsInDaysMode: boolean;

	/**
	 * determine whether the arrows button should be shown in the months component
	 * - default: `true`
	 */
	isShowArrowsInMonthsMode: boolean;

	/**
	 * determine whether the arrows button should be shown in the years component
	 * - default: `true`
	 */
	isShowArrowsInYearsMode: boolean;

	/**
	 * determine whether the weekdays should be shown in the days component
	 * - default: `true`
	 */
	isShowWeekdays: boolean;

	/**
	 * Determine whether or not the header should be displayed
	 * - default: `true`
	 */
	isShowHeader: boolean;

	/**
	 * Determines which dates are unavailable to select
	 * - default: `[]`
	 */
	disabledDates: DateType[];
}

export type PartialOptions = PartialDeep<BaseOptions>;
