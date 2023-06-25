import styles from './Days.module.scss';

import { type Component, Index, Show, createMemo } from 'solid-js';

import { BtnTitle } from '~lib/components';
import { useConfig } from '~lib/context/ConfigProvider';

import type { HeaderProps } from './Days.type';

export const Header: Component<HeaderProps> = (props) => {
	const { locale, isShowWeekdays, isShowHeader } = useConfig();

	const createWeekdaysByStartDay = createMemo(() => {
		const { weekdays, startDay } = locale();

		return [...weekdays.slice(startDay), ...weekdays.slice(0, startDay)];
	});

	return (
		<Show when={isShowHeader} fallback={null}>
			<div class={`header-container ${styles.header}`}>
				<BtnTitle month={locale().months[props.month]} year={props.year?.toString()} />

				{isShowWeekdays && (
					<div class="weekdays-wrapper">
						<Index each={createWeekdaysByStartDay()}>
							{(item, index) => {
								return <span class={`weekday-item weekday${index + 1}`}>{item()}</span>;
							}}
						</Index>
					</div>
				)}
			</div>
		</Show>
	);
};
