import stypes from './App.module.scss';

import { type Component, Match, Switch, createMemo } from 'solid-js';

import { ArrowsIcons, Days, Months, Years } from '~lib/components';
import { useConfig } from '~lib/context/ConfigProvider';

const App: Component = () => {
	const { calendar, initialViewMode } = useConfig();

	/**
	 * A memoized function that returns an object with class names.
	 **/
	const classNames = createMemo(() => ({
		'inner-calendar': true,
		'persian-calendar': calendar() === 'persian',
		'gregorian-calendar': calendar() === 'gregorian',
		[stypes.persianCalendar]: calendar() === 'persian',
		[stypes.gregorianCalendar]: calendar() === 'gregorian',
		[stypes.innerCalendar]: true,
	}));

	return (
		<div classList={classNames()}>
			<ArrowsIcons />
			<Switch fallback={<p>Something seems to be wrong</p>}>
				<Match when={initialViewMode() === 'days'}>
					<Days />
				</Match>

				<Match when={initialViewMode() === 'months'}>
					<Months />
				</Match>

				<Match when={initialViewMode() === 'years'}>
					<Years />
				</Match>
			</Switch>
		</div>
	);
};

export default App;
