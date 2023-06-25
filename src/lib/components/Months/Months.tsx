import type { Component } from 'solid-js';

import { useConfig } from '~lib/context/ConfigProvider';

import { Body } from './Months.body';
import { Header } from './Months.header';

export const Months: Component = () => {
	const { locale, date, currentDate } = useConfig();

	return (
		<div class="month-picker">
			<Header selectedYear={`${date().year()}`} />
			<Body monthName={locale().months} currentMonth={currentDate().month} currentYear={currentDate().year} selectedYear={date().year()} />
		</div>
	);
};
