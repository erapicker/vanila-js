import type { PartialOptions } from '~lib/types';

export interface InstanceFn {
	target: Readonly<HTMLElement>;
	wrapper: Readonly<HTMLElement>;
	config: Readonly<PartialOptions>;
	uuid: Readonly<string>;
	version: Readonly<string>;
}

declare global {
	interface Window {
		eraPicker: (target: HTMLElement | string, config?: PartialOptions) => Readonly<InstanceFn>;
	}
}
