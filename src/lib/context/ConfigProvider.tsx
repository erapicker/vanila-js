/* eslint-disable max-lines-per-function */

/* eslint-disable solid/reactivity */
import { type Accessor, type JSXElement, type Setter, createContext, createMemo, createSignal, useContext } from 'solid-js';

import type { BaseOptions, CalendarType, CurrentDate, Icons, InitialViewMode, LocaleType, ModeType, PossibleViewMode } from '~lib/types';
import { dateFn, isValidateDate, rangeNumber } from '~lib/utils';

interface ConfigContextProps {
	calendar: Accessor<CalendarType>;
	setCalendar: Setter<CalendarType>;
	isHighlightWeekends: boolean;
	isShowOffsetMonth: boolean;
	isHighlightCurrentDay: boolean;
	locale: Accessor<LocaleType>;
	icons: Icons;
	minDate: Accessor<number>;
	maxDate: Accessor<number>;
	date: Accessor<IPersianDate>;
	setDate: Setter<IPersianDate>;
	currentDate: Accessor<CurrentDate>;
	initialViewMode: Accessor<InitialViewMode>;
	setInitialViewMode: Setter<InitialViewMode>;
	possibleViewMode: Accessor<PossibleViewMode>;
	setPossibleViewMode: Setter<PossibleViewMode>;
	numberOfMonths: Accessor<number[]>;
	mode: Accessor<ModeType>;
	setMode: Setter<ModeType>;
	selectedDate: Accessor<number[]>;
	setSelectedDate: Setter<number[]>;
	isShowArrowsInDaysMode: boolean;
	isShowArrowsInMonthsMode: boolean;
	isShowArrowsInYearsMode: boolean;
	isShowWeekdays: boolean;
	isShowHeader: boolean;
	disabledDates: Accessor<number[]>;
}

interface ConfigProviderProps {
	config: BaseOptions;
	children: JSXElement;
}

const ConfigContext = createContext<ConfigContextProps>();

export function ConfigProvider(props: ConfigProviderProps) {
	/**
	 * Static config
	 */
	const {
		isHighlightWeekends,
		isShowOffsetMonth,
		isHighlightCurrentDay,
		icons,
		isShowArrowsInDaysMode,
		isShowArrowsInMonthsMode,
		isShowArrowsInYearsMode,
		isShowWeekdays,
		isShowHeader,
	} = props.config;

	/**
	 * Calendar Signal
	 */
	const [calendar, setCalendar] = createSignal<CalendarType>(props.config.calendar);

	/**
	 * Initial View Mode Signal
	 */
	const [initialViewMode, setInitialViewMode] = createSignal<InitialViewMode>(props.config.initialViewMode);

	/**
	 * Possible View Mode Signal
	 */
	const [possibleViewMode, setPossibleViewMode] = createSignal<PossibleViewMode>(props.config.possibleViewMode);

	/**
	 * Min Date
	 */
	const minDate = createMemo(() => {
		const date = props.config.minDate;

		if (!date || !isValidateDate(date)) return 0;

		return dateFn(date, calendar()).valueOf();
	});

	/**
	 * Max Date
	 */
	const maxDate = createMemo(() => {
		const date = props.config.maxDate;

		if (!date || !isValidateDate(date)) return 0;

		return dateFn(date, calendar()).valueOf();
	});

	/**
	 * Date Signal
	 */
	const [date, setDate] = createSignal<IPersianDate>(dateFn(minDate() || new Date(), props.config.calendar));

	/**
	 * Mode Signal
	 */
	const [mode, setMode] = createSignal<ModeType>(props.config.mode);

	/**
	 * Locale Memo
	 */
	const locale = createMemo(() => {
		const { startDay, weekdays, ...others } = props.config.locale[calendar()];

		const firstDay = startDay > 6 ? startDay % (weekdays.length - 1) : startDay;

		const holidayDates = () => {
			if (others.holidayDates.length === 0) return [];

			// eslint-disable-next-line fp/no-mutating-methods
			return others.holidayDates
				.reduce((acc: number[], currentValue) => {
					if (!isValidateDate(currentValue)) return acc;

					const validDate = currentValue instanceof Date ? currentValue : new Date(currentValue);

					const pDate = dateFn(validDate, calendar());

					return [...acc, pDate.valueOf()];
				}, [])
				.sort((a, b) => a - b);
		};

		return { ...others, startDay: firstDay, weekdays, holidayDates: holidayDates() };
	});

	/**
	 * Information about the current date
	 */
	const currentDate = createMemo(() => {
		const today = dateFn(new Date(), calendar());

		return {
			day: today.date(),
			month: today.month(),
			year: today.year(),
		};
	});

	/**
	 * A memo that is used to create an array of numbers from 1 to the number of months.
	 */
	const numberOfMonths = createMemo(() => {
		const number = props.config.numberOfMonths;

		if (number <= 0) {
			throw new Error(`NumberOfMonths can't be less than 0. Your value: ${number}`);
		}

		if (number > 12) {
			throw new Error(`NumberOfMonths can't be greater than 12. Your value: ${number}`);
		}

		if (number === 1) return [1];

		return rangeNumber(1, number);
	});

	/**
	 * A memo that is used to creates a string date array.
	 */
	const initialSelectedDate = createMemo(() => {
		const _initialSelectedDate = props.config.initialSelectedDate;

		if (!Array.isArray(_initialSelectedDate) || _initialSelectedDate.length === 0) return [];

		// eslint-disable-next-line fp/no-mutating-methods
		const initialDate = _initialSelectedDate
			.reduce((acc: number[], currentValue) => {
				if (!isValidateDate(currentValue)) return acc;

				const validDate = currentValue instanceof Date ? currentValue : new Date(currentValue);

				const pDate = dateFn(validDate, calendar());

				return [...acc, pDate.valueOf()];
			}, [])
			.sort((a, b) => a - b);

		if (initialDate.length === 0) return [];

		if (mode() === 'single') return [initialDate[0]];

		if (mode() === 'range' && initialDate.length >= 2) return [initialDate[0], initialDate[initialDate.length - 1]];

		return initialDate;
	});

	/**
	 * Selected Date Signal
	 * It's creating a signal that is used to store the selected date.
	 */
	const [selectedDate, setSelectedDate] = createSignal<number[]>(initialSelectedDate());

	/**
	 * Disabled Dates
	 */
	const disabledDates = createMemo(() => {
		const _disabledDates = props.config.disabledDates;

		if (!_disabledDates || _disabledDates.length === 0) return [];

		// eslint-disable-next-line fp/no-mutating-methods
		return _disabledDates
			.reduce((acc: number[], currentValue) => {
				if (!isValidateDate(currentValue)) return acc;

				const validDate = currentValue instanceof Date ? currentValue : new Date(currentValue);

				const pDate = dateFn(validDate, calendar());

				return [...acc, pDate.valueOf()];
			}, [])
			.sort((a, b) => a - b);
	});

	return (
		<ConfigContext.Provider
			value={{
				calendar,
				setCalendar,
				isHighlightWeekends,
				isShowOffsetMonth,
				isHighlightCurrentDay,
				locale,
				icons,
				minDate,
				maxDate,
				date,
				setDate,
				currentDate,
				initialViewMode,
				setInitialViewMode,
				possibleViewMode,
				setPossibleViewMode,
				numberOfMonths,
				mode,
				setMode,
				selectedDate,
				setSelectedDate,
				isShowArrowsInDaysMode,
				isShowArrowsInMonthsMode,
				isShowArrowsInYearsMode,
				isShowWeekdays,
				isShowHeader,
				disabledDates,
			}}
		>
			{props.children}
		</ConfigContext.Provider>
	);
}

export function useConfig() {
	return useContext(ConfigContext)!;
}
