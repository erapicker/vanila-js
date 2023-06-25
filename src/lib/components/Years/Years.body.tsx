import styles from './Years.module.scss';

import { type Component, Index, createMemo } from 'solid-js';

import { useConfig } from '~lib/context/ConfigProvider';
import { handleChangeMode } from '~lib/utils';

import type { BodyProps } from './Years.type';

export const Body: Component<BodyProps> = (props) => {
	const { date, setDate, initialViewMode, setInitialViewMode, possibleViewMode } = useConfig();

	const handleChangeYear = (yearNumber: number) => {
		const cloneDate = date().clone();
		setDate(cloneDate.year(yearNumber));

		handleChangeMode({
			initialView: initialViewMode(),
			possibleView: possibleViewMode(),
			handler: setInitialViewMode,
		});
	};

	return (
		<div class={`body-container ${styles.body}`}>
			<Index each={props.rangeYears}>
				{(item) => {
					const monthClasslist = createMemo(() => {
						return {
							'year-item': true,
							[`year${item()}`]: true,
							'current-year': props.currentYear === item(),
						};
					});

					return (
						<button classList={monthClasslist()} onClick={() => handleChangeYear(item())}>
							{item()}
						</button>
					);
				}}
			</Index>
		</div>
	);
};
