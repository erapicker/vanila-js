import { type Component, createMemo } from 'solid-js';

import { useConfig } from '~lib/context/ConfigProvider';
import { rangeNumber } from '~lib/utils';

import { Body } from './Years.body';
import { Header } from './Years.header';

export const Years: Component = () => {
	const { date, currentDate } = useConfig();

	const rangeYears = createMemo(() => {
		const currentYear = date().year();

		const previousYearsList = rangeNumber(currentYear - 8, currentYear - 1);
		const nextYearsList = rangeNumber(currentYear, currentYear + 7);

		const title = `${previousYearsList[0]}-${nextYearsList[nextYearsList.length - 1]}`;
		const range = [...previousYearsList, ...nextYearsList];

		return {
			title,
			range,
		};
	});

	return (
		<div class="year-picker">
			<Header rangeYears={rangeYears().title} />
			<Body currentYear={currentDate().year} rangeYears={rangeYears().range} />
		</div>
	);
};
