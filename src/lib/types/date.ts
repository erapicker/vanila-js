export interface Days {
	day: number;
	month: {
		index: number;
		number: number;
	};
	year: number;
	isOffset: boolean;
	isToday: boolean;
	millisecond: number;
}

export interface CalculateDaysInMonth {
	days: {
		firstOffset: Days[];
		currentDays: Days[];
		endOffset: Days[];
	};
	currentWeekday: {
		start: number;
		end: number;
	};
	currentMonth: {
		index: number;
		number: number;
	};
	currentYear: number;
}

export interface CurrentDate {
	day: number;
	month: number;
	year: number;
}
