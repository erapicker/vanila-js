import type { Setter } from 'solid-js';

import type { InitialViewMode, PossibleViewMode } from './options';

export interface HandleChangeMode {
	initialView: InitialViewMode;
	possibleView: PossibleViewMode;
	handler: Setter<InitialViewMode>;
}
