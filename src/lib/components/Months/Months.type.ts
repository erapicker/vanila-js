export interface HeaderProps {
	selectedYear: string;
}

export interface BodyProps {
	monthName: [string, string, string, string, string, string, string, string, string, string, string, string];
	currentMonth: number;
	currentYear: number;
	selectedYear: number;
}
