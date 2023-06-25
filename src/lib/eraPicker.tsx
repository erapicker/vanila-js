import deepMerge from 'deepmerge';
import { customAlphabet } from 'nanoid';
import { ErrorBoundary } from 'solid-js';
import { render } from 'solid-js/web';

import App from '~lib/App';
import { defaultOptions } from '~lib/config/defaultOptions';
import { ConfigProvider } from '~lib/context/ConfigProvider';
import type { BaseOptions, InstanceFn, PartialOptions } from '~lib/types';
import { createMainWrapper } from '~lib/utils';

import pkg from '../../package.json';

const eraPicker = (target: HTMLElement | string, config: PartialOptions = {}): Readonly<InstanceFn> => {
	const targetElement: HTMLElement = (typeof target === 'string' ? document.querySelector(target) : target) as HTMLElement;

	if (!targetElement) {
		throw Error('Your element does not have a valid DOM.');
	}

	const options = deepMerge(defaultOptions, config, {
		arrayMerge: (_destinationArray, sourceArray, _options) => sourceArray,
	}) as BaseOptions;

	const uuid = customAlphabet('abcdefghijklmnopqstuvwxyz', 7)();

	const { classNames } = options;

	const mainWrapper = createMainWrapper(targetElement);

	mainWrapper.classList.add(`${classNames?.brand ?? ''}calendar`);

	if (classNames.calendar) {
		mainWrapper.classList.add(classNames.calendar);
	}

	render(
		() => (
			<ErrorBoundary
				fallback={(err) => {
					// eslint-disable-next-line no-console
					console.error(err);

					return <p>{err.toString()}</p>;
				}}
			>
				<ConfigProvider config={options}>
					<App />
				</ConfigProvider>
			</ErrorBoundary>
		),
		mainWrapper
	);

	return Object.freeze({
		target: targetElement,
		wrapper: mainWrapper,
		config: Object.freeze(options),
		uuid,
		version: pkg.version,
	});
};

export default eraPicker;
