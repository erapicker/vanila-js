import { type Component, Show } from 'solid-js';

import { useConfig } from '~lib/context/ConfigProvider';
import { handleChangeMode } from '~lib/utils';

import type { BtnTitleProps } from './BtnTitle.type';

export const BtnTitle: Component<BtnTitleProps> = (props) => {
	const { possibleViewMode, initialViewMode, setInitialViewMode } = useConfig();

	return (
		<Show
			when={possibleViewMode().length !== 1}
			fallback={
				<>
					<span class="btn-title">
						<Show when={props.month} fallback={null}>
							<span class="month-name">{props.month}</span>
						</Show>
						<Show when={props.year} fallback={null}>
							<span class="year-name">{props.year}</span>
						</Show>
					</span>
				</>
			}
		>
			<button
				class="btn-title"
				onClick={() => handleChangeMode({ initialView: initialViewMode(), possibleView: possibleViewMode(), handler: setInitialViewMode })}
			>
				<Show when={props.month} fallback={null}>
					<span class="month-name">{props.month}</span>
				</Show>
				<Show when={props.year} fallback={null}>
					<span class="year-name">{props.year}</span>
				</Show>
			</button>
		</Show>
	);
};
