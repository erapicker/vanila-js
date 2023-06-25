import styles from './Months.module.scss';

import { type Component, Index, createMemo } from 'solid-js';

import { useConfig } from '~lib/context/ConfigProvider';
import { handleChangeMode } from '~lib/utils';

import type { BodyProps } from './Months.type';

export const Body: Component<BodyProps> = (props) => {
	const { date, setDate, initialViewMode, setInitialViewMode, possibleViewMode } = useConfig();

	const handleChangeMonth = (monthNumber: number) => {
		const cloneDate = date().clone();
		setDate(cloneDate.month(monthNumber));

		handleChangeMode({
			initialView: initialViewMode(),
			possibleView: possibleViewMode(),
			handler: setInitialViewMode,
		});
	};

	return (
		<div class={`body-container ${styles.body}`}>
			<Index each={props.monthName}>
				{(item, index) => {
					const monthClasslist = createMemo(() => {
						return {
							'month-item': true,
							[`month${index + 1}`]: true,
							'current-month': props.currentYear === props.selectedYear && props.currentMonth === index + 1,
						};
					});

					return (
						<button classList={monthClasslist()} onClick={() => handleChangeMonth(index + 1)}>
							{item()}
						</button>
					);
				}}
			</Index>
		</div>
	);
};
