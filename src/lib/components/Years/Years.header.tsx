import styles from './Years.module.scss';

import { type Component, Show } from 'solid-js';

import { BtnTitle } from '~lib/components';
import { useConfig } from '~lib/context/ConfigProvider';

import type { HeaderProps } from './Years.type';

export const Header: Component<HeaderProps> = (props) => {
	const { isShowHeader } = useConfig();

	return (
		<Show when={isShowHeader} fallback={null}>
			<div class={`header-container ${styles.header}`}>
				<BtnTitle year={props.rangeYears} />
			</div>
		</Show>
	);
};
